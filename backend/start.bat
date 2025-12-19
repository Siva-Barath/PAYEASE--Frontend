@echo off
echo Starting TOPIFY Backend...
echo.

echo Installing dependencies...
npm install

echo.
echo Seeding database with sample data...
npm run seed

echo.
echo Starting development server...
npm run dev