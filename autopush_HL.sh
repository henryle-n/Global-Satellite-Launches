#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
blu=$'\e[1;34m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'

echo Brought to you by: ${red}Henry Le${nc}
echo -e Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc}
echo =============================
echo
echo Begins ${red}Git Pulling${nc}. Please wait...
echo ---------------
git add .
git commit -am "auto push from Henry"
git push

echo =============================
echo
echo ${grn}Git Pushed${nc} Sucessfully!
echo
echo Press ${blu}Enter${blu} to Exit...
read