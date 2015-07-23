/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var fs = require('fs');
var path = require('path');
var config = require('./config/environment');

var manager = require('./components/epm-manager');
var empRest = require('./components/epm-rest');

// Expose app
exports = module.exports = function(cb){
  
  // Setup server
  var app = express();
  manager.load();

  var server = require('http').createServer(app);
  require('./config/express')(app);
  app.use('/epm', empRest());
  require('./routes')(app);

  // Start server
  server.listen(config.port, config.ip, function () {
    if (typeof cb === 'function') {
      cb(null, app, config);
    }
  });

  return app;
};