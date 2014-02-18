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
  , panel = require('./routes/panel')
  , test = require('./routes/test')
  , http = require('http')
  , path = require('path')
  , hbs = require('express-hbs')
  , repo = require('pad-repository')
  ;

var logger = require('custom-logger').config({ 
    level: 0,
    format: "\x1b[36m[pad-repo]\x1b[0m %timestamp% - %event% :%padding%%message%"
});


var app = express();

var auth = express.basicAuth('pad', 'pad')
  , testAuth = express.basicAuth('test', 'test');;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

// define Handlebars engine
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout/default.hbs',
  layoutsDir: __dirname + '/views/layout'
}));
app.set('view engine', 'hbs');

app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
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
app.get('/bloques/:lvl/:owner/:target?', routes.bloques);
app.get('/tangibles/:owner/:target?', routes.tangibles);
app.get('/tangible/:uid?', routes.tangible);
app.get('/explorar', routes.explorar);
//panel
app.get('/panel', auth, panel.index);
app.get('/panel/packages/:filter?', auth, panel.packages);
app.get('/panel/package/:uid', auth, panel.package);
app.get('/panel/package/status/:uid/:status', auth, panel.packageStatus);
//test
app.get('/test', testAuth, test.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('PAD aplicaction listening on port ' + app.get('port'));
});

var _repo = new repo.HttpRepo('./repo', app);
  
_repo
.on('init', function(data) {
  logger.info('repository initialized on ' + _repo.path);
})
.on('log', function(msg) {
  logger.info(msg);
});
