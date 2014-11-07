@echo off

:: First add remote as dte
:: git remote add dte https://github.com/Dte-ba/pad.git

echo "Rememeber: git remote add dte https://github.com/Dte-ba/pad.git"

echo "WARNING: Este scripts modifica tu repositorio!"
echo "presiona una tecla para continuar"
pause

:: save working copy
git stash

:: make sure is the master
git checkout master

:: fetch upstream
git fetch dte

:: merge with upstream
git merge dte/master

:: restore the working copy
git stash pop

echo.
echo "Ready !"
pause