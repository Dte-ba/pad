/**
 * Index application file
 */

'use strict';

require('./app.js')(function(err, app, config){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});