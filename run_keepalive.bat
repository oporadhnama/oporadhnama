@echo off
title Oporadhnama Keep-Alive Bot
echo ============================================================
echo   Oporadhnama Aiven Database ^& Render Keep-Alive Service
echo ============================================================
echo.
echo Running keep-alive loop... (Press Ctrl+C to stop)
echo.

if exist backend\.venv\Scripts\python.exe (
    backend\.venv\Scripts\python.exe keep_alive.py %*
) else (
    python keep_alive.py %*
)

pause

