#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'

date
date +"%FORMAT"
var=$(date)
var=`date`

echo Brought to you by: ${red}Henry Le${nc}
echo -e Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc}
echo =============================
echo
echo Begins ${red}Git Pulling${nc}. Please wait...
echo ---------------
git pull

echo
echo ${grn}Git Pulled${nc} Sucessfully!
now=$(date)
echo
echo === ${cyn}THANK YOU${nc} for using my Scripts - ${yel}HENRY LE${grn} ${grn}"(06/2020)"${nc} ===
echo
printf "Local Time: %s\n" "${mag}$now${nc}"
echo Press ${yel}Enter${yel} to Exit...
echo
echo
read