@echo off

if "%1"=="" goto start
if "%1"=="start" goto start
if "%1"=="install" goto install

:start
  node app.js
goto exit
:install
    npm install
:exit
