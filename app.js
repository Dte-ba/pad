/*!
 * PAD web application
 *
 * Copyright(c) 2013-2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)
 * GPL Plublic License v3
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , hbs = require('express-hbs')
  ;

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');

// define Handlebars engine
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout/default.hbs'
}));
app.set('view engine', 'hbs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('PAD aplicaction listening on port ' + app.get('port'));
});
