/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

var empRest = require('epm-rest')({path: 'D:/dev/repository'});

// Expose app
exports = module.exports = function(cb){
  
  // Setup server
  var app = express();
  app.use(empRest);

  var server = require('http').createServer(app);
  require('./config/express')(app);
  require('./routes')(app);

  // Start server
  server.listen(config.port, config.ip, function () {
    if (typeof cb === 'function') {
      cb(null, app, config);
    }
  });

  return app;
};