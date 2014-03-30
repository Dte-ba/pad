@echo off

rmdir /S /Q repo\.cache
echo {} > repo\repository.json
echo Listo. 
echo Presione una tecla para continuar... 
pause > null
