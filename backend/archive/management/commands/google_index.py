"""
archive/management/commands/google_index.py
────────────────────────────────────────────────────────────────────────────────
Django management command to submit URLs to the Google Indexing API.

Usage examples:
  # Index a single URL
  python manage.py google_index https://oporadhnama.com/news/1234/

  # Index multiple URLs
  python manage.py google_index https://oporadhnama.com/news/1/ https://oporadhnama.com/news/2/

  # Index from a text file (one URL per line)
  python manage.py google_index --file urls.txt

  # Auto-index all published posts from the database
  python manage.py google_index --all-posts

  # Specify a custom service account file
  python manage.py google_index --sa /path/to/service-account.json https://example.com/
────────────────────────────────────────────────────────────────────────────────
"""

from django.core.management.base import BaseCommand, CommandError
from google_indexing.indexing_service import GoogleIndexingService


class Command(BaseCommand):
    help = "Submit one or more URLs to the Google Indexing API (URL_UPDATED notification)"

    def add_arguments(self, parser):
        parser.add_argument(
            "urls",
            nargs="*",
            type=str,
            metavar="URL",
            help="One or more URLs to notify Google about.",
        )
        parser.add_argument(
            "--file",
            "-f",
            type=str,
            dest="url_file",
            metavar="FILE",
            help="Path to a text file containing URLs (one per line).",
        )
        parser.add_argument(
            "--all-posts",
            action="store_true",
            dest="all_posts",
            default=False,
            help="Auto-index all currently published posts from the database.",
        )
        parser.add_argument(
            "--sa",
            type=str,
            dest="service_account",
            default=None,
            metavar="PATH",
            help="Path to service-account.json (overrides auto-discovery).",
        )

    def handle(self, *args, **options):
        urls = list(options["urls"])

        # ── Collect URLs from file ─────────────────────────────────────────────
        if options["url_file"]:
            try:
                with open(options["url_file"], "r", encoding="utf-8") as fh:
                    file_urls = [line.strip() for line in fh if line.strip()]
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Loaded {len(file_urls)} URL(s) from {options['url_file']}"
                    )
                )
                urls.extend(file_urls)
            except FileNotFoundError:
                raise CommandError(f"URL file not found: {options['url_file']}")

        # ── Collect URLs from database (all published posts) ───────────────────
        if options["all_posts"]:
            try:
                from archive.models import Post

                posts = Post.objects.filter(status="published").values_list("slug", flat=True)
                # Construct absolute URLs — adjust base URL as needed
                from django.conf import settings

                base_url = getattr(settings, "SITE_BASE_URL", "https://oporadhnama.com")
                post_urls = [f"{base_url.rstrip('/')}/news/{slug}/" for slug in posts]
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Found {len(post_urls)} published post(s) in database."
                    )
                )
                urls.extend(post_urls)
            except Exception as exc:
                raise CommandError(f"Could not fetch posts from database: {exc}")

        if not urls:
            raise CommandError(
                "No URLs provided. Pass URLs as arguments, use --file, or use --all-posts."
            )

        # ── Deduplicate while preserving order ────────────────────────────────
        seen = set()
        unique_urls = []
        for u in urls:
            if u not in seen:
                seen.add(u)
                unique_urls.append(u)

        self.stdout.write(
            self.style.HTTP_INFO(
                f"\n{'━' * 60}\n"
                f"  Google Indexing API — submitting {len(unique_urls)} URL(s)\n"
                f"{'━' * 60}"
            )
        )

        # ── Run the indexing service ───────────────────────────────────────────
        service = GoogleIndexingService(
            service_account_file=options.get("service_account")
        )
        results = service.notify(unique_urls)

        # ── Print summary table ────────────────────────────────────────────────
        self.stdout.write("\n" + "━" * 60)
        self.stdout.write("  RESULTS SUMMARY")
        self.stdout.write("━" * 60)
        for r in results:
            status_label = (
                self.style.SUCCESS("✔ OK  ")
                if r["success"]
                else self.style.ERROR(f"✘ {r['status_code']}")
            )
            self.stdout.write(f"  {status_label}  {r['url']}")

        successful = sum(1 for r in results if r["success"])
        failed = len(results) - successful
        self.stdout.write("━" * 60)
        if failed == 0:
            self.stdout.write(
                self.style.SUCCESS(
                    f"  All {successful} URL(s) indexed successfully!"
                )
            )
        else:
            self.stdout.write(
                self.style.WARNING(
                    f"  {successful} succeeded, {failed} failed — check logs above."
                )
            )
        self.stdout.write("━" * 60 + "\n")
