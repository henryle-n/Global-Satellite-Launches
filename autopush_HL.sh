#!/bin/sh
echo Brought to you by Henry Le
echo Version: 0, Date: Jun, 2020
echo =============================
echo
echo Begins Git Pulling. Please wait...
echo ---------------
git add .
git commit -am %1
git push

echo =============================
echo Git Pushed Sucessfully
echo
echo Press Enter...
read