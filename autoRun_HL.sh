#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'



echo
echo +++ Brought to you by: ${cyn}HENRY LE${nc} +++
echo -e +++ Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc} +++
echo =============================
startTime=$(date)
SECONDS=0
echo 
printf "Local Time: %s\n" "${mag}$startTime${nc}"
echo ---------------

echo 
echo
echo ${red}Deactivate${nc} any ${yel}existing Environment${nc}. Please wait...
conda deactivate
echo ---------------
echo ${cyn}Activate new Python Environment${nc}. Please wait...
echo ---------------
source p2env/Scripts/activate
echo ${yel}Done Activating Environment${nc}.
echo ---------------
echo ${red}Starting up ${cyn}Server${nc} and ${cyn}Browser${nc}... Please wait... 
python application.py & sleep 2 & python -mwebbrowser http://127.0.0.1:5000/
echo ---------------
echo ${grn}A NEW SERVER HAS STARTED !!! ${nc}
echo ---------------
echo

now=$(date)

echo ===== ${cyn}THANK YOU${nc} for using my Scripts - ${yel}HENRY LE${grn} ${grn}"(06/2020)"${nc} =====
echo
finishTime=$(date)
sleep 5
printf "  Local Time :: %s\n" "${mag}$finishTime${nc}"
echo "  Script Total Time :: ${mag}$SECONDS${nc} second(s)"
echo
echo  "  Press ${yel}Enter${yel} to Exit..."
echo
echo =============================
echo
echo  




