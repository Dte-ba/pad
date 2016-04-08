'use strict';

var osenv = require('osenv');
var path = require('path');
var http = require('http');
var fs = require('fs');

var gui = process.env.NW_GUI = require('nw.gui');
var win = gui.Window.get();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PAD_MODE = 'desktop';

var rootPath = process.cwd();

if (process.env.NODE_ENV === 'development') {
  win.showDevTools();
  rootPath = path.join(process.cwd(), '/../');
}

function start(document) {
  
  process.env.REPOSITORY_PATH = path.join(osenv.home(), '/paquetes');

  var cfg = path.join(rootPath, 'server/config/environment/index.js');
  var config = require(cfg);

  var localConfig = path.join(osenv.home(), '.pad');
  
  if (fs.existsSync(localConfig)){
    var cfg = JSON.parse(fs.readFileSync(localConfig, 'utf-8'));
    process.env.REPOSITORY_PATH = cfg.path;
  } else {
    process.env.REPOSITORY_PATH = path.join(process.cwd(), '/paquetes/');
  }

  config.repository = process.env.REPOSITORY_PATH;

  if (process.env.REPOSITORY_PATH === undefined || !fs.existsSync(process.env.REPOSITORY_PATH)) {
    configureRespository(config, function(){
      startPad(config);
    });
  } else {
    startPad(config);
  }

  function startPad(config){
    var pad = require(path.join(rootPath,  'server/app.js'));

    $('#textProgress').html('<i class="fa fa-cog fa-spin"></i> Cargando...   ¡En un momento estaremos listos!');

    $('init-screen').show();

    $('#repositoryPath').text(process.env.REPOSITORY_PATH);

    pad
    .startServer({gui: gui, env: process.env.NODE_ENV})
    .progress(function(info){
      
      // print the current percent
      var percent = Math.round(info.progress * 100);
      $('#progreso').width(percent + '%');
      $('#progreso').attr('aria-valuenow', percent);
      $('#progreso').text(percent + '%');
      //console.log(percent + '%');
    })
    .fail(function(err){
      $('init-screen').hide();
      throw err;
    })
    .done(function(){
      $('init-screen').hide();
      $('#textProgress').hide();
      console.log('Express server listening on %d, in %s mode', pad.config.port, pad.app.get('env'));
      global.window.location.href = 'http://localhost:'+pad.config.port+'/';
    });
  }

  function configureRespository(config, cb){
    // do stuff
    
    $('#selectDirectory').click(function(e){

      e.preventDefault();

      var chooser = $('#folder_dialog_input');
      chooser.unbind('change'); // Needed, otherwise the value will always be "" 
      chooser.change(function(evt) {
          var folder_path = $(this).val();
          $(this).val(''); // Reset value of selected directory (so change event will *always* be triggered)
          
          if (folder_path !== undefined) {
             $('#giveMeRepository').hide();
            config.repository = folder_path;

            // save the configuration
            var localConfig = path.join(osenv.home(), '.pad');
            var data = { path: config.repository };
            process.env.REPOSITORY_PATH = folder_path;
            
            fs.writeFileSync(localConfig, JSON.stringify(data));

            return cb(config);
          }
      });

    });

    chooser.trigger('click'); 

    $('init-screen').hide();
    $('#giveMeRepository').show();
  }

}

win.on('maximize', function(e) {
  // Here can use console.log
  win.removeAllListeners('maximize');

});

win.on('maximize', function(e) {
  var document = win.window.document;
  start(document);

});

win.maximize();
