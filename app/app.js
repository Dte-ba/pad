'use strict';

function start() {
  
  var osenv = require('osenv');
  var path = require('path');
  var http = require('http');
  var fs = require('fs');
  var $ = require('jquery');

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.PAD_MODE = 'desktop';

  var gui = process.env.NW_GUI = require('nw.gui');

  if (process.env.NODE_ENV === 'development') {
    gui.Window.get().showDevTools();  
  }

  process.env.REPOSITORY_PATH = path.join(osenv.home(), '/repository');

  var cfg = path.join(process.cwd(), '/../server/config/environment/index.js');
  var config = require(cfg);

  var localConfig = path.join(osenv.home(), '.pad');

  if (fs.existsSync(localConfig)){
    var cfg = JSON.parse(fs.readFileSync(localConfig, 'utf-8'));
    process.env.REPOSITORY_PATH = cfg.path;
  }

  if (process.env.REPOSITORY_PATH === undefined) {
    configureRespository();
  }

  startPad(config);

  function startPad(config){
    var pad = require(path.join(process.cwd(),'/../server/app.js'));

    $('#textProgress').html('<i class="fa fa-cog fa-spin"></i> Cargando el contenido, puede tardar varios minutos ...');

    pad
    .startServer(gui)
    .progress(function(info){
      
      // print the current percent
      var percent = info.progress * 100;
      $('#progreso').width(percent + '%');
      $('#progreso').attr('aria-valuenow', percent);
      $('#progreso').text(percent + '%');
      //console.log(percent + '%');
    })
    .fail(function(err){
      throw err;
    })
    .done(function(){
      console.log('Express server listening on %d, in %s mode', pad.config.port, pad.app.get('env'));
      global.window.location.href = "http://localhost:9000/";
    });
  }

  function configureRespository(){
    // do stuff
  }

}

function waitForConsoleThenStart() {
  if (typeof global.window !== 'undefined') {
    
    // Here can use console.log
    start();

  } else {
    setTimeout(waitForConsoleThenStart, 100);
  }
}

waitForConsoleThenStart();