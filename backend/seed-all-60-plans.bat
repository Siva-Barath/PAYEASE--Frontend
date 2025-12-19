@echo off
echo 🚀 Seeding all 60 plans to MongoDB...
cd /d "%~dp0"
node src/seedAll60Plans.js
pause