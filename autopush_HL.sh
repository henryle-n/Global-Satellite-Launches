#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'

echo Brought to you by: ${red}Henry Le${nc}
echo -e Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc}
echo =============================
echo
echo Begins ${red}Git Pushing${nc}. Please wait...
echo ---------------
echo ${yel}Adding files...${nc} & git add .
echo ---------------
echo ${yel}Preparing to push...${nc} 
echo ---------------
echo Please ${red}input message${nc} with double qoute for git push
read message
echo Adding "${cyn}$message${nc}" to package...
git commit -m "$message"
echo ---------------
git push & echo ${yel}FINISHED PUSHING !!!${nc} 
echo ===============================
echo 
read


