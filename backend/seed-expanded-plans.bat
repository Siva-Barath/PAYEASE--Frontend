@echo off
echo Seeding expanded plans with 5-10 plans per category...
cd /d "d:\TOPIFY\backend"
node src/seedExpandedPlans.js
pause