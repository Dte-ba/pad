/**
 * Index application file
 */

'use strict';

var osenv = require('osenv');
var path = require('path');
var fs = require('fs');
var util = require('util');
var moment = require('moment');

var ProgressBar = require('progress');

var localConfig = path.join(osenv.home(), '.pad');

process.env.PAD_MODE = 'server';
process.env.REPOSITORY_PATH = path.join(osenv.home());

if (fs.existsSync(localConfig)){
  var cfg = JSON.parse(fs.readFileSync(localConfig, 'utf-8'));
  process.env.REPOSITORY_PATH = cfg.path;
}

var pad = require('./app.js');

var bar = new ProgressBar(' Cargando contenido [:bar] :percent', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 100
});

var started = new Date();

pad
  .startServer()
  .progress(function(info){
    
	var percent = info.progress;
    bar.update(percent);

  })
  .fail(function(err){
    throw err;
  })
  .done(function(){
    console.log('Express server listening on %d, in %s mode', pad.config.port, pad.app.get('env'));
  });

if (pad.app.get('env') === "production") {
  process.on('uncaughtException', function(err) {
    console.log('Caught exception: ');
    console.log(util.inspect(err))
  });
}