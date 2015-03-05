'use strict';

var express = require('express');
var path = require('path');
var Epm  = require('Epm');
var epmMiddleware = require('epm-middleware');
var padEngine = require('epm-pad-engine');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var async = require('async');

var pad = require('./lib/pad');
var panel = require('./lib/panel');

var repodir = path.resolve( JSON.parse(fs.readFileSync('./package.json', 'utf-8')).repository );
var reponames = ['local', 'dev'];

var epmApp = epmMiddleware({
  path: repodir, 
  engines: [{ name: 'epm-pad-engine', engine: padEngine }],
  default: 'local'
});

var padApp = pad({ public: path.join(__dirname, 'public'), epm: epmApp })

var panelApp = panel();

var app = express();

// configure main app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add epm, pad and panel
app.use(epmApp);
app.use(padApp);
// app.use(panelApp);

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/request', function(req, res){
  var uri = req.query.uri;

  if (uri === undefined) return res.end('');

  request(uri).pipe(res);
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log(req.url + ' Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status !== 404) {
      console.error(err.stack);
    }
    if (!res.headersSent) {
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (!res.headersSent) {
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});

var usersOnline = 0;

var status = { status: 'loading', usersOnline: 0 };

var statusSend = function() {
  status.usersOnline = usersOnline;
  io.emit('status', status);
};

io.on('connection', function(socket){
  usersOnline++;
  statusSend();
  io.emit('users change', usersOnline);
  socket.on('disconnect', function(){
    usersOnline--;
    io.emit('users change', usersOnline);
  });
});

process.on("uncaughtException", function(err){
  console.log('Uncaught Exception');
  if (err !== undefined) {
    console.log(err.message);
  }
});

module.exports = function(ops){

  var port = ops.port || process.env.PORT || 8000;

  http.listen(port, function(err){
    console.log('app listen on http://localhost:' + port);
    status = { status: 'loading' };
    statusSend();

    // check if the repo exists or create them
    async.eachSeries(reponames, function(rname, cb){
        var fullpath = path.join(repodir, rname);

        if (!fs.existsSync(fullpath)){
          mkdirp.sync(fullpath);
        }

        var repo = new Epm(fullpath);

        repo.on('error', function(err){
          cb && cb(err)
        });

        repo.on('init', function(info){
          if (info.created){
            console.info('epm repository created at ' + info.path);
          } else {
            console.info('epm repository reinitialized at ' + info.path);
          }

          cb && cb(null);
        });

        repo.init({ name: rname });

      },function(err){
        if (err){
          throw err;
        }

        // then listen
        epmApp.listenRepositories(function(err, info){
          status = { status: 'complete' };
          statusSend();
        });

      });

  });

  return http;
};