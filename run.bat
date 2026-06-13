@echo off
setlocal

echo Starting Oporadhnama application...
echo.

:: Start backend server
echo Starting Django backend server...
cd backend 2>nul || (
    echo Error: Could not find backend directory
    pause
    exit /b 1
)
start "Django Backend" cmd /k "python manage.py runserver"
if errorlevel 1 (
    echo Error: Failed to start Django backend
    pause
    exit /b 1
)
cd ..

:: Start frontend server
echo Starting Vite frontend server...
cd frontend 2>nul || (
    echo Error: Could not find frontend directory
    pause
    exit /b 1
)
start "Vite Frontend" cmd /k "npm run dev"
if errorlevel 1 (
    echo Error: Failed to start Vite frontend
    pause
    exit /b 1
)
cd ..

echo.
echo Both servers should now be running!
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
pause