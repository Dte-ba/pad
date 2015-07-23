/**
 * Index application file
 */

'use strict';

process.env.PAD_MODE = 'server';
process.env.REPOSITORY_PATH = '/home/nacho/dev/repository';

require('./app.js')(function(err, app, config){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});