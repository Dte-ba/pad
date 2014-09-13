@echo off

:: Configure the window
set vancho=80
set valto=40
MODE CON COLS=%vancho% LINES=%valto% 

:: Initialize the vars
set linecoment=###############################################################################
set linecomentempty=#                                                                             #

CALL :MSG
CALL :START
CALL :WAIT
CALL :BROWSER

:EXIT
	pause
	exit
	
:MSG

	echo %linecoment%
	echo %linecomentempty%
	echo #                   PAD - Direccion de Tecnologia Educativa                   #
	echo %linecomentempty%
	echo %linecoment%
	echo.

GOTO END
	
:START

	echo Iniciando la aplicación, por favor espere...
	set binpath="%CD%\bin\node.exe"
	cd "%CD%\app"
	start /B "" "%binpath%" "desktop.js"

GOTO END
	
:WAIT
	ping -n 5 localhost > NUL
GOTO END

:BROWSER
	echo "Abriendo el navegador ..."
	start http://localhost:8000
GOTO END

:END
