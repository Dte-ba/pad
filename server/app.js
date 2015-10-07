/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var fs = require('fs');
var Q = require('q');
var path = require('path');

var pad = module.exports = {};

// the expressjs app
var app = pad.app = express(); 

// the repository manager
var manager = pad.epmManager = require('./components/epm-manager');
var empRest = require('./components/epm-rest');

// the config
var config = pad.config = require('./config/environment');

app.version = 'v6';
app.kernel = 'EPM';

var j = path.join(__dirname, '/../package.json');
if (fs.existsSync(j)){
  try {
    var info = JSON.parse(fs.readFileSync(j, 'utf-8'));
    app.version = 'v' + info.version; 
  } catch(e){
  }
}

pad.startServer = function(ops){

  ops = ops || {};
  if (ops.env !== undefined){
    process.env.NODE_ENV = ops.env;
  }

  process.env.NW_GUI = ops.gui;
  
  // the promise for web and repository
  var defer = Q.defer();
  
  var server = pad.server = require('http').createServer(app);

  manager
      .get('local')
      .progress(function(info){

        defer.notify({
          msg: "Cargando los paquetes de contenido digital.",
          progress: info.progress
        });

      })
      .fail(function(err){
        throw err;
      })
      .done(function(){

        // then configure the express
        // define the EPM routes
        // define the routes for the app
        require('./config/express')(app);
        app.use('/epm', empRest());
        require('./routes')(app);

        // Start server
        server.listen(config.port, config.ip, function () {
          setTimeout(function(){
            defer.resolve();
          }, 500);
        });

      });

  return defer.promise;
};