"""
google_indexing/indexing_service.py
------------------------------------------------------------
Reusable Google Indexing API service for Django (Python/Django REST Framework).

Handles:
  - JWT authentication via service-account.json
  - Broadcasting URL_UPDATED notifications to Google Indexing API
  - Accepts a single URL or a list of URLs
  - Detailed success/error terminal logging

Usage:
  from google_indexing.indexing_service import GoogleIndexingService

  service = GoogleIndexingService()
  service.notify(["https://example.com/page1", "https://example.com/page2"])
------------------------------------------------------------
"""

import os
import json
import logging
import tempfile
from pathlib import Path
from typing import Union

import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request as GoogleAuthRequest

# ── Logging setup ──────────────────────────────────────────────────────────────
logger = logging.getLogger(__name__)

# Console handler so output appears in terminal even if Django logging is minimal
if not logger.handlers:
    _handler = logging.StreamHandler()
    _handler.setFormatter(
        logging.Formatter(
            "[%(asctime)s] %(levelname)s [GoogleIndexing] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
    )
    logger.addHandler(_handler)
    logger.setLevel(logging.DEBUG)
    logger.propagate = False  # Prevent duplicate output when root logger is also configured

# ── Constants ──────────────────────────────────────────────────────────────────
INDEXING_API_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing"

# Resolve service account file — check both possible locations / filenames
_BASE_DIR = Path(__file__).resolve().parent.parent  # backend/
_ROOT_DIR = _BASE_DIR.parent                         # project root

_CANDIDATE_PATHS = [
    # Project root candidates (covers both naming variants)
    _ROOT_DIR / "service-account.json",
    _ROOT_DIR / "service-account.json.json",
    # Backend directory candidates
    _BASE_DIR / "service-account.json",
    _BASE_DIR / "service-account.json.json",
]


def _find_service_account_file() -> Path:
    """
    Locate the service account JSON file.

    Priority order:
      1. GOOGLE_SERVICE_ACCOUNT_FILE env var  (explicit file path)
      2. Auto-discovery of well-known filenames in project root / backend dir

    NOTE: On Render (or any cloud host), prefer setting
    GOOGLE_SERVICE_ACCOUNT_JSON (the full JSON string) instead of a file path.
    That env var is handled separately in GoogleIndexingService._get_credentials().
    """
    env_path = os.environ.get("GOOGLE_SERVICE_ACCOUNT_FILE")
    if env_path:
        p = Path(env_path)
        if p.exists():
            return p
        raise FileNotFoundError(
            f"[GoogleIndexing] GOOGLE_SERVICE_ACCOUNT_FILE env var points to "
            f"non-existent path: {env_path}"
        )

    for candidate in _CANDIDATE_PATHS:
        if candidate.exists():
            logger.debug("Service account file found: %s", candidate)
            return candidate

    raise FileNotFoundError(
        "[GoogleIndexing] Could not find service-account.json. "
        "Checked paths:\n  " + "\n  ".join(str(p) for p in _CANDIDATE_PATHS) +
        "\nOptions:\n"
        "  A) Set GOOGLE_SERVICE_ACCOUNT_FILE=/path/to/file\n"
        "  B) Set GOOGLE_SERVICE_ACCOUNT_JSON=<full JSON content> (recommended on Render)"
    )


class GoogleIndexingService:
    """
    Service class for submitting URL_UPDATED notifications to Google Indexing API.

    Attributes:
        service_account_file (Path): Path to the service account JSON credential file.
        credentials: Authenticated Google credentials (lazy-loaded).
    """

    def __init__(self, service_account_file: Union[str, Path, None] = None):
        """
        Initialise the service.

        Args:
            service_account_file: Optional explicit path to service-account.json.
                                  If omitted, auto-discovery is used.
        """
        if service_account_file:
            self.service_account_file = Path(service_account_file)
        else:
            self.service_account_file = _find_service_account_file()

        logger.info("Using service account file: %s", self.service_account_file)
        self._credentials = None

    # ── Authentication ─────────────────────────────────────────────────────────

    def _get_credentials(self) -> service_account.Credentials:
        """
        Load and refresh Google service account credentials with the Indexing API scope.
        Credentials are cached per-instance and refreshed when expired.

        Supports two modes:
          1. GOOGLE_SERVICE_ACCOUNT_JSON env var  (Render / cloud — paste full JSON)
          2. service-account.json file on disk     (local development)
        """
        if self._credentials is None or not self._credentials.valid:
            logger.debug("Loading/refreshing Google service account credentials ...")

            # ── Mode 1: JSON content from environment variable (Render/cloud) ──
            json_env = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
            if json_env:
                logger.debug("Loading credentials from GOOGLE_SERVICE_ACCOUNT_JSON env var.")
                try:
                    service_account_info = json.loads(json_env)
                except json.JSONDecodeError as exc:
                    raise ValueError(
                        "[GoogleIndexing] GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON. "
                        f"Parse error: {exc}"
                    )
                self._credentials = service_account.Credentials.from_service_account_info(
                    service_account_info,
                    scopes=[INDEXING_SCOPE],
                )
            else:
                # ── Mode 2: Load from file (local dev) ────────────────────────
                logger.debug("Loading credentials from file: %s", self.service_account_file)
                self._credentials = service_account.Credentials.from_service_account_file(
                    str(self.service_account_file),
                    scopes=[INDEXING_SCOPE],
                )

            # Force a refresh to obtain a valid access token immediately
            self._credentials.refresh(GoogleAuthRequest())
            logger.info(
                "[OK] Credentials obtained. Service account: %s",
                self._credentials.service_account_email,
            )
        return self._credentials

    def _get_headers(self) -> dict:
        """Return HTTP headers with a fresh Bearer token."""
        creds = self._get_credentials()
        return {
            "Authorization": f"Bearer {creds.token}",
            "Content-Type": "application/json",
        }

    # ── Core API call ──────────────────────────────────────────────────────────

    def _notify_single(self, url: str) -> dict:
        """
        Send a URL_UPDATED notification for a single URL.

        Args:
            url: The canonical URL to notify Google about.

        Returns:
            dict with keys: url, success (bool), status_code, response_body.
        """
        payload = {"url": url, "type": "URL_UPDATED"}
        result = {"url": url, "success": False, "status_code": None, "response_body": None}

        try:
            logger.info("--> Notifying Google Indexing API for: %s", url)
            response = requests.post(
                INDEXING_API_ENDPOINT,
                headers=self._get_headers(),
                json=payload,
                timeout=15,
            )
            result["status_code"] = response.status_code
            result["response_body"] = response.json() if response.content else {}

            if response.status_code == 200:
                result["success"] = True
                logger.info(
                    "[SUCCESS] HTTP %d | URL_UPDATED sent for: %s | Response: %s",
                    response.status_code,
                    url,
                    json.dumps(result["response_body"], ensure_ascii=True),
                )
            else:
                logger.error(
                    "[FAILED] HTTP %d | URL: %s | Error: %s",
                    response.status_code,
                    url,
                    json.dumps(result["response_body"], ensure_ascii=True),
                )

        except requests.exceptions.Timeout:
            logger.error("[TIMEOUT] Notifying Google for URL: %s", url)
            result["response_body"] = {"error": "Request timed out after 15 seconds"}

        except requests.exceptions.ConnectionError as exc:
            logger.error("[CONNECTION ERROR] URL: %s | %s", url, exc)
            result["response_body"] = {"error": str(exc)}

        except Exception as exc:  # noqa: BLE001
            logger.error("[UNEXPECTED ERROR] URL: %s | %s", url, exc, exc_info=True)
            result["response_body"] = {"error": str(exc)}

        return result

    # ── Public API ─────────────────────────────────────────────────────────────

    def notify(self, urls: Union[str, list]) -> list:
        """
        Send URL_UPDATED notifications to Google Indexing API.

        Args:
            urls: A single URL string or a list of URL strings.

        Returns:
            List of result dicts, each containing:
              - url (str)
              - success (bool)
              - status_code (int | None)
              - response_body (dict | None)

        Example:
            service = GoogleIndexingService()
            results = service.notify([
                "https://oporadhnama.com/news/1234/",
                "https://oporadhnama.com/news/5678/",
            ])
        """
        if isinstance(urls, str):
            urls = [urls]

        if not urls:
            logger.warning("No URLs provided -- nothing to index.")
            return []

        logger.info("=" * 60)
        logger.info("Starting Google Indexing API batch | %d URL(s)", len(urls))
        logger.info("=" * 60)

        results = []
        for url in urls:
            url = url.strip()
            if not url:
                logger.warning("Skipping empty URL entry.")
                continue
            results.append(self._notify_single(url))

        # ── Summary ────────────────────────────────────────────────────────────
        successful = [r for r in results if r["success"]]
        failed = [r for r in results if not r["success"]]

        logger.info("=" * 60)
        logger.info(
            "Indexing complete -- [OK] %d succeeded | [FAIL] %d failed out of %d total",
            len(successful),
            len(failed),
            len(results),
        )
        if failed:
            logger.error("Failed URLs:")
            for r in failed:
                logger.error("  * %s (HTTP %s)", r["url"], r["status_code"])
        logger.info("=" * 60)

        return results
