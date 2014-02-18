
.PHONY : start server desktop install

:start
	node app.js

:server
  node server.js

:desktop
  node desktop.js

:install
  npm install
