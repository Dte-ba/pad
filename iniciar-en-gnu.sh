#! /bin/bash


runpad(){
	cd app

	node desktop.js >> log.txt &
	echo "Ejecutando aplicación"
	waitrun
	xdg-open http://localhost:8000 
}

waitrun(){
	ping localhost -c 5 > /dev/null
}

installnode(){
	sudo cp -r bin/gnu-linux/lib/node_modules/ /usr/lib/ # copy the node modules folder to the /lib/ folder
	sudo cp -r bin/gnu-linux/include/node /usr/include/ # copy the /include/node folder to /usr/local/include folder
	sudo mkdir /usr/local/man/man1 # create the man folder
	sudo cp bin/gnu-linux/share/man/man1/node.1 /usr/local/man/man1/ # copy the man file
	sudo cp bin/gnu-linux/bin/node /usr/bin/ # copy node to the bin folder
	sudo chmod +x /usr/bin/node
}

# Make sure only root can run our script
if [ "$(id -u)" != "0" ]; then
   echo "Debe ser root para ejecutar este script" 1>&2
   exit 1
fi

if which node >/dev/null; then
    runpad 
else
    echo " Node.js no esta instalado en el equipo"
    echo " Pof favor espere miestras se instala Node.js"
    installnode
    runpad
fi
