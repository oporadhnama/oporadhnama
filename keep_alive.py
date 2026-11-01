#!/usr/bin/env python3
"""
=============================================================================
 Oporadhnama Database & Render Keep-Alive Script
=============================================================================
Prevents:
 1. Aiven Free Tier Database from getting powered off / suspended due to inactivity.
 2. Render Free Tier Web Service from spinning down after 15 minutes of inactivity.

How it works:
 - Mode 'http' (default): Pings https://oporadhnama.onrender.com/api/health/
   Every ping wakes Render (if asleep) AND executes a live 'SELECT 1;' query on
   the Aiven PostgreSQL database, keeping both services permanently active.
 - Mode 'db': Connects directly to Aiven PostgreSQL using DATABASE_URL and executes
   a heartbeat query directly.
 - Mode 'both': Runs both HTTP ping and direct DB query.

Usage:
  python keep_alive.py                    # Run continuous loop every 10 min (600s)
  python keep_alive.py --once             # Run single check and exit (cron / GitHub Actions)
  python keep_alive.py --interval 300     # Run loop every 5 minutes
  python keep_alive.py --mode both        # Ping HTTP and Direct DB
  python keep_alive.py --url http://localhost:8000/api/health/
=============================================================================
"""

import sys
import os
import time
import argparse
import json
import datetime
from urllib import request as url_request
from urllib.error import URLError, HTTPError

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Optional: Try importing dotenv if available to read backend/.env
try:
    from dotenv import load_dotenv
    load_dotenv()
    backend_env = os.path.join(os.path.dirname(__file__), "backend", ".env")
    if os.path.exists(backend_env):
        load_dotenv(backend_env)
except ImportError:
    pass

# Optional: Try importing psycopg for direct database connection mode
try:
    import psycopg
    HAS_PSYCOPG = True
except ImportError:
    try:
        import psycopg2 as psycopg
        HAS_PSYCOPG = True
    except ImportError:
        HAS_PSYCOPG = False

DEFAULT_URL = os.environ.get(
    "KEEP_ALIVE_URL",
    os.environ.get("RENDER_EXTERNAL_HOSTNAME", "https://oporadhnama.onrender.com")
)
if not DEFAULT_URL.startswith("http"):
    DEFAULT_URL = f"https://{DEFAULT_URL}"
if not DEFAULT_URL.endswith("/api/health/"):
    DEFAULT_URL = DEFAULT_URL.rstrip("/") + "/api/health/"

DEFAULT_DB_URL = os.environ.get("DATABASE_URL", "")
DEFAULT_INTERVAL = int(os.environ.get("PING_INTERVAL", 600))  # 10 minutes
DEFAULT_WEBHOOK = os.environ.get("ALERT_WEBHOOK_URL", "")


class Colors:
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    CYAN = "\033[96m"
    BOLD = "\033[1m"
    RESET = "\033[0m"


def now_str():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def send_webhook_alert(webhook_url: str, message: str):
    """Sends an alert notification to a Discord, Slack, or generic webhook."""
    if not webhook_url:
        return
    try:
        payload = json.dumps({"content": message, "text": message}).encode("utf-8")
        req = url_request.Request(
            webhook_url,
            data=payload,
            headers={
                "User-Agent": "Oporadhnama-KeepAlive/1.0",
                "Content-Type": "application/json",
            },
            method="POST"
        )
        with url_request.urlopen(req, timeout=10) as resp:
            pass
    except Exception as e:
        print(f"[{now_str()}] {Colors.RED}Failed to send webhook alert: {e}{Colors.RESET}")


def ping_http(url: str, timeout: int = 65, max_retries: int = 3) -> dict:
    """
    Pings the /api/health/ endpoint.
    Uses 65s timeout because Render free tier may take 30-50s to cold-start from sleep.
    """
    for attempt in range(1, max_retries + 1):
        start = time.time()
        try:
            req = url_request.Request(
                url,
                headers={
                    "User-Agent": "Oporadhnama-KeepAlive-Bot/1.0 (Aiven-Render-ActiveChecker)",
                    "Accept": "application/json",
                }
            )
            with url_request.urlopen(req, timeout=timeout) as response:
                latency = round((time.time() - start) * 1000, 2)
                raw_data = response.read().decode("utf-8")
                try:
                    data = json.loads(raw_data)
                except Exception:
                    data = {"raw": raw_data}

                return {
                    "ok": True,
                    "status_code": response.status,
                    "latency_ms": latency,
                    "data": data,
                    "attempt": attempt,
                }
        except HTTPError as e:
            latency = round((time.time() - start) * 1000, 2)
            error_body = ""
            try:
                error_body = e.read().decode("utf-8")
            except Exception:
                pass
            if attempt < max_retries and e.code in [502, 503, 504]:
                print(f"[{now_str()}] {Colors.YELLOW}[Attempt {attempt}/{max_retries}] Render is waking up (HTTP {e.code}). Retrying in 12s...{Colors.RESET}")
                time.sleep(12)
                continue
            return {
                "ok": False,
                "status_code": e.code,
                "latency_ms": latency,
                "error": f"HTTP {e.code}: {e.reason} ({error_body})",
                "attempt": attempt,
            }
        except URLError as e:
            latency = round((time.time() - start) * 1000, 2)
            if attempt < max_retries:
                print(f"[{now_str()}] {Colors.YELLOW}[Attempt {attempt}/{max_retries}] Connection delayed ({e.reason}). Retrying in 12s...{Colors.RESET}")
                time.sleep(12)
                continue
            return {
                "ok": False,
                "status_code": None,
                "latency_ms": latency,
                "error": f"Connection error: {e.reason}",
                "attempt": attempt,
            }
        except Exception as e:
            latency = round((time.time() - start) * 1000, 2)
            return {
                "ok": False,
                "status_code": None,
                "latency_ms": latency,
                "error": str(e),
                "attempt": attempt,
            }


def ping_direct_db(db_url: str) -> dict:
    """
    Directly connects to Aiven PostgreSQL via psycopg and executes 'SELECT 1;'.
    """
    if not HAS_PSYCOPG:
        return {
            "ok": False,
            "error": "psycopg or psycopg2 library is not installed in the current environment.",
            "latency_ms": 0,
        }

    if not db_url:
        return {
            "ok": False,
            "error": "No DATABASE_URL configured.",
            "latency_ms": 0,
        }

    # Ensure sslmode=require for Aiven
    clean_url = db_url.strip().strip("'\"")
    if "sslmode" not in clean_url:
        delimiter = "&" if "?" in clean_url else "?"
        clean_url = f"{clean_url}{delimiter}sslmode=require"

    start = time.time()
    try:
        with psycopg.connect(clean_url, connect_timeout=15) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1;")
                cur.fetchone()
        latency = round((time.time() - start) * 1000, 2)
        return {
            "ok": True,
            "latency_ms": latency,
        }
    except Exception as e:
        latency = round((time.time() - start) * 1000, 2)
        return {
            "ok": False,
            "latency_ms": latency,
            "error": str(e),
        }


def run_single_check(url: str, db_url: str, mode: str, webhook: str) -> bool:
    """Executes a single check according to the selected mode."""
    success = True
    print(f"\n{Colors.CYAN}{'='*60}{Colors.RESET}")
    print(f"[{now_str()}] {Colors.BOLD}Triggering keep-alive check (Mode: {mode.upper()})...{Colors.RESET}")

    if mode in ["http", "both"]:
        print(f"[{now_str()}] Pinging HTTP: {url}")
        res = ping_http(url)

        # Graceful fallback: If /api/health/ is 404 (e.g. backend not redeployed yet),
        # automatically fallback to /api/posts/ so Render and Aiven stay awake immediately!
        if not res["ok"] and res.get("status_code") == 404 and "/api/health/" in url:
            fallback_url = url.replace("/api/health/", "/api/posts/")
            print(f"[{now_str()}] {Colors.YELLOW}Notice: {url} returned 404 (deploy pending).{Colors.RESET}")
            print(f"[{now_str()}] {Colors.YELLOW}Falling back to existing endpoint: {fallback_url}{Colors.RESET}")
            res = ping_http(fallback_url)

        if res["ok"]:
            db_status = res.get("data", {}).get("database", "ok")
            db_engine = res.get("data", {}).get("engine", "database")
            db_lat = res.get("data", {}).get("latency_ms", "N/A")
            print(f"[{now_str()}] {Colors.GREEN}[OK] [HTTP {res['status_code']}] Render Web Service is AWAKE!{Colors.RESET}")
            print(f"[{now_str()}] {Colors.GREEN}[OK] [DATABASE ALIVE] Engine: {db_engine} | DB Latency: {db_lat}ms | Total Latency: {res['latency_ms']}ms{Colors.RESET}")
        else:
            success = False
            msg = f"Keep-alive ping failed to {url}: {res.get('error')}"
            print(f"[{now_str()}] {Colors.RED}[FAIL] {msg}{Colors.RESET}")
            send_webhook_alert(webhook, msg)

    if mode in ["db", "both"]:
        masked_url = db_url.split("@")[-1] if "@" in db_url else "database"
        print(f"[{now_str()}] Testing direct connection to Aiven: {masked_url}")
        res_db = ping_direct_db(db_url)
        if res_db["ok"]:
            print(f"[{now_str()}] {Colors.GREEN}[OK] [DIRECT DB OK] Executed SELECT 1 on Aiven ({res_db['latency_ms']}ms){Colors.RESET}")
        else:
            success = False
            msg = f"Direct Aiven PostgreSQL connection failed: {res_db.get('error')}"
            print(f"[{now_str()}] {Colors.RED}[FAIL] {msg}{Colors.RESET}")
            send_webhook_alert(webhook, msg)

    print(f"{Colors.CYAN}{'='*60}{Colors.RESET}")
    return success


def main():
    parser = argparse.ArgumentParser(
        description="Oporadhnama Aiven Database & Render Keep-Alive Loop"
    )
    parser.add_argument(
        "--url",
        default=DEFAULT_URL,
        help=f"Target health check URL (default: {DEFAULT_URL})"
    )
    parser.add_argument(
        "--db-url",
        default=DEFAULT_DB_URL,
        help="PostgreSQL connection string for direct DB mode"
    )
    parser.add_argument(
        "--mode",
        choices=["http", "db", "both"],
        default="http",
        help="Keep-alive mode: 'http' pings Render & Aiven via /api/health/, 'db' pings Aiven directly, 'both' does both."
    )
    parser.add_argument(
        "--interval",
        type=int,
        default=DEFAULT_INTERVAL,
        help=f"Interval between pings in seconds (default: {DEFAULT_INTERVAL}s = 10 min)"
    )
    parser.add_argument(
        "--webhook",
        default=DEFAULT_WEBHOOK,
        help="Discord / Slack webhook URL for down alerts (optional)"
    )
    parser.add_argument(
        "--once",
        action="store_true",
        help="Run a single keep-alive check and exit (useful for cron jobs or GitHub Actions)"
    )

    args = parser.parse_args()

    print(f"{Colors.BOLD}{Colors.CYAN}")
    print("+----------------------------------------------------------+")
    print("|         OPORADHNAMA AIVEN & RENDER KEEP-ALIVE            |")
    print("|     Prevents Aiven DB and Render from sleeping           |")
    print("+----------------------------------------------------------+")
    print(f"{Colors.RESET}")
    print(f" Target URL : {args.url}")
    print(f" Mode       : {args.mode.upper()}")
    print(f" Interval   : {args.interval}s ({args.interval // 60} minutes)")
    if args.webhook:
        print(f" Webhook    : Configured")
    print(f"{Colors.CYAN}{'-'*60}{Colors.RESET}")

    if args.once:
        ok = run_single_check(args.url, args.db_url, args.mode, args.webhook)
        sys.exit(0 if ok else 1)

    # Continuous loop mode
    loop_count = 0
    try:
        while True:
            loop_count += 1
            print(f"\n[Loop #{loop_count}]")
            run_single_check(args.url, args.db_url, args.mode, args.webhook)
            print(f"[{now_str()}] Sleeping for {args.interval}s until next keep-alive ping (Press Ctrl+C to stop)...")
            time.sleep(args.interval)
    except KeyboardInterrupt:
        print(f"\n[{now_str()}] Keep-alive loop stopped by user.")
        sys.exit(0)


if __name__ == "__main__":
    main()
