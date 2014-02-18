@echo off

if "%1"=="" goto start
if "%1"=="start" goto start
if "%1"=="server" goto server
if "%1"=="desktop" goto desktop
if "%1"=="install" goto install
if "%1"=="clean" goto clean

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
goto exit
:clean
    rmdir /S /Q repo\.cache
    echo {} > repo\repository.json
:exit
