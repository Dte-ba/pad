@echo off

cls

echo Generando archivo vbs

echo @echo off > %CD%\win-run.bat
echo cd "%CD%" >> %CD%\win-run.bat
echo node desktop.js ^> app-win.log ^& >> %CD%\win-run.bat

echo DIM oShell > pad.vbs
echo set oShell=wscript.createObject("wscript.shell") >> pad.vbs
echo iReturn=oShell.Run("%CD%\win-run.bat", 0, TRUE) >> pad.vbs

echo Archivo vbs generado ...

echo Creando acceso directo ...

@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
SET LinkName=Hello
SET Esc_LinkDest=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\pad.lnk
SET Esc_LinkTarget=%CD%\pad.vbs
SET cSctVBS=CreateShortcut.vbs
SET LOG=".\%~N0_runtime.log"
((
  echo Set oWS = WScript.CreateObject^("WScript.Shell"^) 
  echo sLinkFile = oWS.ExpandEnvironmentStrings^("!Esc_LinkDest!"^)
  echo Set oLink = oWS.CreateShortcut^(sLinkFile^) 
  echo oLink.TargetPath = oWS.ExpandEnvironmentStrings^("!Esc_LinkTarget!"^)
  echo oLink.Save
)1>!cSctVBS!
cscript //nologo .\!cSctVBS!
DEL !cSctVBS! /f /q
)1>>!LOG! 2>>&1

echo Acceso directo generado...

pause