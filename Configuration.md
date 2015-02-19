# Configuración / Instalación

## Windows

- [Descargar Node.js v0.10.33](http://nodejs.org/download/) o superior de 32 o 64 bit dependiendo el Sistema operativo que se posea.

- Para instalar se debe de desargar el archivo de distribución `Windows Installer (.msi)` 

- Extraer/copiar los archivos del PAD - *se recomienda en el disco de `Datos` si se va a compartir en los dos sistemas operativos*

- Para generar los archivos de configuracion en windows es necesario ejecutar el archivo `win-config.bat`
*Este archivo de configuración genera los scripts necesarios para que se ejecute el PAD al inicio de Windows en la carpeta donde se han extraido los archivos, por eso es importante que estos no sean movidos una vez ejecutado este script.*

- Reiniciar Windows

- Una vez iniciado Windows esperar unos minutos e iniciar en el navegador la URL [http://localhost:8000](http://localhost:8000) para acceder a la aplicación - *se recomienda guardar en favoritos la dirección URL de la misma.*

## GNU/Linux (Debian Based)

**Instalción de Node.js desde la terminal**

- Abrir una terminal como `root` - *Puede abrirse una terminal de usuario y ejecutar el comando `sudo su`*

- Actualizar la lista de repositorios `apt-get update`

- Instalar curl en caso de no poseerla `apt-get install -y curl`

- Ejecutar el comando `curl -sL https://deb.nodesource.com/setup | bash -`

- Luego ejecutar el comando `apt-get install -y nodejs` para instalar Node.js

*Para asegurarnos que esta instalado Node.js podemos ejecutar el comando `node -v` que debería mostrar la versión de Node.js*

*Instalación de la aplicación PAD*

- Extraer/copiar los archivos del PAD - *se recomienda en el disco de `/media/datos` si se va a compartir en los dos sistemas operativos* 

- Ingresar a la carpeta desde una terminal

- Y ejecutar el script `gnu-config.sh` con permisos de ROOT - `sudo bash gnu-config.sh`

- Para corroborar si el servicio se instalo correctamente ejecutar `sudo service pad start`

- Luego de unos minutos ingresar a la URL [http://localhost:8000](http://localhost:8000)
