/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/design', require('./api/design'));

  var mode = 'server';
  if (process.env.PAD_MODE) {
    mode = process.env.PAD_MODE;
  }
  // add application information
  app
    .route('/api/info')
    .get(function(req, res){
      res.json({ version: app.version, kernel: app.kernel, mode: mode });
    });
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
