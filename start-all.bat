@echo off
echo Starting TOPIFY Application...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin
echo.
echo Admin Credentials:
echo Email: admin@gmail.com
echo Password: admin123
echo.
pause