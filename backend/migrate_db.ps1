# ============================================================
# Database Migration Script: Neon → Aiven
# ============================================================
# HOW TO USE:
# 1. Replace NEON_URL below with the full DATABASE_URL from Render Dashboard
# 2. Open PowerShell in this folder: d:\oporadhnama\backend\
# 3. Run: .\migrate_db.ps1
# ============================================================

$NEON_URL  = "PASTE_YOUR_NEON_DATABASE_URL_HERE"
$AIVEN_URL = "postgres://avnadmin:REDACTED@pg-137778cf-oporadhnamabd-d849.e.aivencloud.com:25387/defaultdb?sslmode=require"
$DUMP_FILE = "neon_backup.dump"

Write-Host "==> Step 1: Dumping data from Neon..." -ForegroundColor Cyan
pg_dump $NEON_URL -F c -f $DUMP_FILE --no-owner --no-acl

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: pg_dump failed. Make sure pg_dump is installed and your Neon URL is correct." -ForegroundColor Red
    exit 1
}

Write-Host "==> Dump successful! File: $DUMP_FILE" -ForegroundColor Green

Write-Host "`n==> Step 2: Restoring data to Aiven..." -ForegroundColor Cyan
pg_restore -d $AIVEN_URL -1 --no-owner --no-acl $DUMP_FILE

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: pg_restore failed. Check your Aiven URL and make sure the database is empty." -ForegroundColor Red
    exit 1
}

Write-Host "`n==> Migration Complete! Your data is now in Aiven." -ForegroundColor Green
Write-Host "==> You can now update DATABASE_URL on Render with the Aiven URL." -ForegroundColor Green
