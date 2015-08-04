/**
 * Index application file
 */

'use strict';

var osenv = require('osenv');
var path = require('path');
var fs = require('fs');

var localConfig = path.join(osenv.home(), '.pad');

process.env.PAD_MODE = 'server';
process.env.REPOSITORY_PATH = path.join(osenv.home());

if (fs.existsSync(localConfig)){
  var cfg = JSON.parse(fs.readFileSync(localConfig, 'utf-8'));
  process.env.REPOSITORY_PATH = cfg.path;
}

require('./app.js')(function(err, app, config){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

/*process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});*/