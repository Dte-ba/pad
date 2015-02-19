#!/bin/bash

INITD='/etc/init.d/pad'
echo APP_PATH_DIR="`pwd`"
echo APP_PATH_VAR="`pwd`/desktop.js"
echo NODE_APP="`which node`"

echo "#!/bin/bash" > $INITD
echo "APP_PATH=$APP_PATH_VAR" >> $INITD

echo "case \$1 in" >> $INITD

  echo "  start)" >> $INITD

    echo "echo -n \$\"Starting pad: \"" >> $INITD
    echo "exec 2>&1 $NODE_APP $APP_PATH_VAR >> $APP_PATH_DIR/app.log &"
    echo "echo \" [ OK ]\""
  echo "  ;;" >> $INITD
  echo "  stop)" >> $INITD
    echo "echo -n \$\"Stoping pad: \"" >> $INITD
    echo "pkill -f 'node $APP_PATH_VAR'"
    echo "echo \" [ OK ]\""
  echo "  ;;" >> $INITD

echo "esac" >> $INITD
echo "exit 0" >> $INITD

chmod +x $INITD

update-rc.d pad defaults

echo "Servicio PAD Instalado"