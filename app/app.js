'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PAD_MODE = 'desktop';

var path = require('path');
var http = require('http');

var cfg = path.join(process.cwd(), '/../server/config/environment/index.js');
var config = require(cfg);

var options = {
  host: 'localhost',
  port: config.port
};

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

//require('nw.gui').Window.get().showDevTools();

//check if server is already running
http.get(options, function(res) {
  console.log('server is running, redirecting to localhost');
  if (window.location.href.indexOf('localhost') < 0) { 
    window.location = 'http://localhost:' + config.port;
  }
}).on('error', function(e) {
  console.log(e);
  //server is not yet running
  var app = require(path.join(process.cwd(),'/../server/app.js'))(function(err, app){
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    if (window.location.href.indexOf('localhost') < 0) { 
      window.location = 'http://localhost:' + config.port;
    }
  });

});