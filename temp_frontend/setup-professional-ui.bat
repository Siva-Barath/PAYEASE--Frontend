@echo off
echo ========================================
echo TOPIFY Professional UI Setup
echo ========================================
echo.

echo Step 1: Setting up backend with professional plans...
cd backend
call npm run seed-professional-plans
echo.

echo Step 2: Starting backend server...
start "TOPIFY Backend" cmd /k "npm run dev"
echo Backend server starting on http://localhost:3001
echo.

echo Step 3: Starting frontend...
cd ..
start "TOPIFY Frontend" cmd /k "npm run dev"
echo Frontend starting on http://localhost:5173
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:3001
echo Admin Panel: http://localhost:5173/admin
echo.
echo Admin Credentials:
echo Email: admin@gmail.com
echo Password: admin123
echo.
echo Professional UI Features:
echo - 3-layer background depth (#1f2933, #27323d, #2f3b47)
echo - Premium card design with soft shadows
echo - Professional operator pills with gradients
echo - Improved typography and spacing
echo - Clean category filters
echo - Professional color scheme
echo.
pause