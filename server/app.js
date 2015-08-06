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

var ProgressBar = require('progress');

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

  var startServer = function(){
    // Start server
    server.listen(config.port, config.ip, function () {
      if (typeof cb === 'function') {
        cb(null, app, config);
      }
    });
  };

  if (process.env.PAD_MODE === 'server'){
    console.log('Loading the repository:');

    console.log();
    var bar = new ProgressBar(' loading repository [:bar] :percent', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: 100
    });

    manager
      .get('local')
      .progress(function(info){
        var p = info.currents === 0 ? 0 : info.progress/info.currents;
        //p = p *100;
        bar.update(p);
        //console.log(p);
      })
      .fail(function(err){
        throw err;
      })
      .done(function(){
        console.log('\n');
        console.log('Local repository ready!');
        startServer();
      });
  } else {
    startServer();
  }
  
  return app;
};