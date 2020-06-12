#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'

echo Brought to you by: ${cyn}Henry Le${nc}
echo -e Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc}
echo =============================
echo
echo Begin ${red}Git Pushing${nc}. Please wait...
echo ---------------
echo ${yel}Adding files...${nc} & git add .
echo ---------------
echo ${yel}Preparing to push...${nc} 
echo ---------------
echo Please ${red}input message${nc} "(${red}NO ${cyn}double quote${nc} needed)"
read message
echo Adding message... & git commit -m "${cyn}$message${nc}"
echo ---------------
echo ${grn}Message added${nc}, beginning to push ...
echo ---------------
git push
echo
echo ================================
echo
echo "${cyn}FINISHED${nc}. Please hit ${yel}Enter${nc} to exit"
read


