'use strict';

const {app, BrowserWindow, Tray} = require('electron');
const path = require('path');
const osenv = require('osenv');
const http = require('http');
const fs = require('fs');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PAD_MODE = 'desktop';
global.PAD_MODE = 'desktop';

var rootPath = process.cwd();

if (process.env.NODE_ENV === 'development') {
  rootPath = path.join(process.cwd(), '/../');
}

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

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, nodeIntegration: false });
  
  win.setMenu(null); 

  win.needSetFolder = function(){
    return process.env.REPOSITORY_PATH === undefined || !fs.existsSync(process.env.REPOSITORY_PATH);
  };

  win.setPadFolder = function(dir){
    var data = { path: dir };
    process.env.REPOSITORY_PATH = dir;
    
    fs.writeFileSync(localConfig, JSON.stringify(data));
  };

  win.startPad = function(cbFolder, cbNotify, cbDone, cbError){
    var pad = require(path.join(rootPath,  'server/app.js'));

    cbFolder(process.env.REPOSITORY_PATH);

    pad
    .startServer({env: process.env.NODE_ENV})
    .progress(function(info){
      cbNotify(info);     
    })
    .fail(function(err){
      cbError(err);
      $('init-screen').hide();
      throw err;
    })
    .done(function(){
      cbDone({ port: pad.config.port, env: pad.app.get('env')});
      console.log('Express server listening on %d, in %s mode', pad.config.port, pad.app.get('env'));
    });
  }

  win.maximize();

  let index = `file://${__dirname}/index.html`;
  win.loadURL(index);

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  const tray = new Tray('assets/img/favicon24.png')
  tray.setTitle('PAD')
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});