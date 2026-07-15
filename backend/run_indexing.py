"""
run_indexing.py
────────────────────────────────────────────────────────────────────────────────
Standalone execution wrapper for the Google Indexing API service.
No Django environment required — run directly with Python.

Usage:
  # Test with one URL
  python run_indexing.py https://oporadhnama.com/news/some-story/

  # Test with multiple URLs
  python run_indexing.py https://oporadhnama.com/news/a/ https://oporadhnama.com/news/b/

  # Test using demo URLs defined inside this file
  python run_indexing.py
────────────────────────────────────────────────────────────────────────────────
"""

import sys
import os
import logging

# ── Make sure the backend directory is in the Python path ─────────────────────
# This lets us import google_indexing regardless of where the script is called from.
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
if _THIS_DIR not in sys.path:
    sys.path.insert(0, _THIS_DIR)

# ── Root-level logging so everything prints to the console ────────────────────
logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] %(levelname)s [%(name)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[logging.StreamHandler(sys.stdout)],
)

from google_indexing.indexing_service import GoogleIndexingService  # noqa: E402

# ─────────────────────────────────────────────────────────────────────────────
# DEMO URLs — edit these or pass URLs as command-line arguments
# ─────────────────────────────────────────────────────────────────────────────
DEMO_URLS = [
    "https://oporadhnama.com/",
    # Add more URLs here for batch testing, e.g.:
    # "https://oporadhnama.com/news/some-article-slug/",
]


def main():
    # Prefer URLs from command-line args, fall back to DEMO_URLS
    urls = sys.argv[1:] if len(sys.argv) > 1 else DEMO_URLS

    print()
    print("=" * 65)
    print("  Google Indexing API — Standalone Test Runner")
    print("=" * 65)
    print(f"  URLs to index: {len(urls)}")
    for u in urls:
        print(f"  • {u}")
    print("=" * 65)
    print()

    try:
        service = GoogleIndexingService()
        results = service.notify(urls)
    except FileNotFoundError as exc:
        print(f"\n[ERROR] {exc}\n")
        sys.exit(1)
    except Exception as exc:
        print(f"\n[ERROR] Unexpected failure: {exc}\n")
        sys.exit(1)

    # ── Exit code: non-zero if any URL failed ──────────────────────────────────
    failed = [r for r in results if not r["success"]]
    if failed:
        print(f"\n[WARN] {len(failed)} URL(s) failed. See logs above for details.\n")
        sys.exit(1)
    else:
        print(f"\n[OK] All {len(results)} URL(s) indexed successfully.\n")
        sys.exit(0)


if __name__ == "__main__":
    main()
