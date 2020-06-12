#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
blu=$'\e[1;34m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
white=$'\e[0m'

echo Brought to you by: ${red} Henry Le$'\e[0m'
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
echo -e "${green}Git Pushed${nc} Sucessfully!"
echo
echo Press Enter to Exit...
read