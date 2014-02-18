@echo off

if "%1"=="" goto start
if "%1"=="start" goto start

:start
  node app.js
:exit
