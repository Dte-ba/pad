@echo off

if "%1"=="" goto start
if "%1"=="start" goto start
if "%1"=="server" goto server
if "%1"=="desktop" goto desktop
if "%1"=="install" goto install

:start
	node app.js
goto exit

:server
  node server.js
goto exit

:desktop
  node desktop.js
goto exit

:install
    npm install
:exit
