'use strict';

var express = require('express');
var path = require('path');
var epmMiddleware = require('epm-middleware');
var padEngine = require('epm-pad-engine');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var pad = require('./lib/pad');
var panel = require('./lib/panel');

var epmApp = epmMiddleware({
    path: path.resolve('./repos'), 
    engines: [{ name: 'epm-pad-engine', engine: padEngine }],
    default: 'local'
  });

var padApp = pad({ public: path.join(__dirname, 'public'), epm: epmApp })

var panelApp = panel();

var app = module.exports = express();

// configure main app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add epm, pad and panel
app.use(epmApp);
app.use(padApp);
app.use(panelApp);

app.get('/request', function(req, res){
    var uri = req.query.uri;

    if (uri === undefined) return res.end('');

    request(uri).pipe(res);
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.error(err.stack);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// TODO: fix this, dev? prod?
epmApp.listenRepositories(function(err, info){

  app.listen(8000, function(err){
    console.log('app listen on http://localhost:8000');
  })

});