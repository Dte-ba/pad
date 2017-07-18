/**
 * Main application file
 */

'use strict';

import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import Q from 'q';

var pad = module.exports = {};
// the expressjs app
var app = pad.app = express(); 

// the repository manager
var manager = pad.epmManager = require('./components/epm-manager');
var empRest = require('./components/epm-rest');

// the config
var config = pad.config = require('./config/environment');

app.version = 'v6.2';
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
  console = ops.console;
  let mode = ops.mode || process.env.PAD_MODE || 'server';

  app.set('pad-mode', mode);
  ops = ops || {};
  if (ops.env !== undefined){
    process.env.NODE_ENV = ops.env;
  }

  // the promise for web and repository
  var defer = Q.defer();
  
  var server = pad.server = require('http').createServer(app);

  // then configure the express
  // define the EPM routes
  // define the routes for the app
  require('./config/express').default(app);
  app.use('/epm', empRest());
  require('./routes').default(app);

  manager
      .get('local')
      .progress((info) => {

        defer.notify({
          msg: "Cargando los paquetes de contenido digital.",
          progress: info.progress
        });

      })
      .fail((err) => {
        throw err;
      })
      .done(() => {
        // Start server
        server.listen(config.port, config.ip, function () {
          setTimeout(function(){
            defer.resolve();
          }, 500);
        });

      });

  return defer.promise;
};
