/**
 * Index application file
 */

'use strict';

var osenv = require('osenv');
var path = require('path');

process.env.PAD_MODE = 'server';
process.env.REPOSITORY_PATH = path.join(osenv.home(), '/repository');

require('./app.js')(function(err, app, config){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

/*process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});*/