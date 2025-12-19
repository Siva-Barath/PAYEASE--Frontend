@echo off
echo Seeding new plans...
cd /d "%~dp0"
node src/seedNewPlans.js
pause