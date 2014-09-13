# PAD

Plataforma de alfabetización digital


## Como distribuir

**Crear 2 carpetas**

1 - path/to/**app** (archivos del PAD)

Dentro de esta carpeta descargar el repositorio del PAD o una distrubución propia, luego colocar los paquetes dentro de `path/to/app/repo/data/`

*NOTA: si se posee una gran cantidad de contenido se debe generar el cache antes de su distribución*

2 - path/to/**bin** (archivos ejecutables de Node.js)

Dentro de esta carpeta irán los ejetables de Node.js para que sea portable.

**Descargar los archivos [iniciar-en-gnu.sh](https://raw.githubusercontent.com/Dte-ba/pad/dev/iniciar-en-gnu.sh) y [iniciar-windows.bat](https://raw.githubusercontent.com/Dte-ba/pad/dev/iniciar-windows.bat) desde el repositorio y copiarlos a la misma altura que `app` y `bin` de forma que quede:**

```
path/to/
	|-app
	|-bin
	|-iniciar-en-gnu.sh
	|-iniciar-windows.bat
```

**Descargar binarios de Node.js desde el [Sitio Oficial](http://nodejs.org/download/)**

- Windows Binary (.exe) copiar el archivo node.exe en bin/node.exe
- Linux Binaries (.tar.gz) extraer los archivos en bin/gnu-linux

**Como ejecutar la aplicacion: **
  
- Windows: ejecutar el archivos iniciar-windows.bat
- Linux: abrir una terminal en `path/to/` y ejecutar el comando `sh iniciar-en-gnu.sh`  


## LICENSE

Copyright(c) 2013-2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)

Distrubuido bajo la licencia [GNU GPL v3](http://www.gnu.org/licenses/gpl-3.0.html)
