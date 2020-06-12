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
echo ${red}Activate Environment${nc}. Please wait...
echo ---------------
source p2env/Scripts/activate
echo ${red}Done Activating Environment${nc}.
echo ---------------
echo ${red}Starting up Server and Browser${nc}. Please wait...
python application.py & python -mwebbrowser http://127.0.0.1:5000/

echo =============================
echo
echo ${grn}Server Shut Down...${nc} Sucessfully!
echo
echo Press ${yel}Enter${yel} to Exit...
echo ${grn}Thank you${nc} for using my Scripts - ${grn}Henry${grn} ${grn}(06/2020)${nc}
echo
read



