@echo off

REM --> Fire up the env and application.py
start/b p2env\Scripts\python application.py -out

REM --> Open Chrome and access the main webpage
set url="http://127.0.0.1:5000/"
start/b chrome %url%

exit /b