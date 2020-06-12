#!/bin/sh

cyan = '\033[0;31m'
red ='\033[0;31m'
green ='\033[0;32m'
pp = '\033[0;35m'
nc='\033[0m'

echo -e "Brought to you by ${cyan}Henry Le${nc}"
echo -e Version: ${pp}0${nc}, Date: ${pp}Jun, 2020${nc}
echo =============================
echo
echo Begins ${pp}Git Pulling${nc}. Please wait...
echo ---------------
git add .
git commit -am "auto push from Henry"
git push

echo =============================
echo
echo ${green}Git Pushed${nc} Sucessfully
echo
echo Press Enter...
read