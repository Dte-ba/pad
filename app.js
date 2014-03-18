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
  , fs = require('fs')
  ;

var members = require('./data/security.json');

var auth = express.basicAuth(members.admin.username, members.admin.password)
  , testAuth = express.basicAuth(members.test.username, members.test.password)
  ;

var logger = module.exports.logger = require('custom-logger').config({ 
    level: 0,
    format: "\x1b[36m[pad-repo]\x1b[0m %timestamp% - %event% :%padding%%message%"
});

// define if is production
var isProd = (process.env.NODE_ENV == 'production');

/**
 * Expose create a server
 */
var createServer = module.exports.createServer = function(ops) {
  var app = express();

  ops = ops || {};
  ops.panelEnabled = (ops.panelEnabled === undefined) ? false : ops.panelEnabled;

  // all environments
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');

  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  configureLogs(app);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  if (!isProd) {
    app.use(express.errorHandler());
  } else {
    process.on('uncaughtException', function (err) {
      logger.error(err);
    });
  }

  configureHbs(app);

  configureRoutes(app, ops);

  var _repo = configureRepository(app);

  return app;
};

//
// private function for configurations

// configure Handlebars
function configureHbs(app) {
  // define Handlebars engine
  app.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layout/default.hbs',
    layoutsDir: __dirname + '/views/layout'
  }));

  app.set('view engine', 'hbs');

  if (!isProd) return;

  var partialsDir = __dirname + '/views/partials';

  var filenames = fs.readdirSync(partialsDir);

  filenames.forEach(function (filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    var name = matches[1];
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
  });

}

// configure log
function configureLogs(app) {

  if (isProd) {
    var logFile = fs.createWriteStream(__dirname + '/expressjs.log', {flags: 'a'});
    app.use(express.logger({stream: logFile}));
  } else {
    app.use(express.logger('dev'));
  }

}

function configureRoutes(app, ops) {

  app.get('/', routes.index);
  app.get('/ejes/:area', routes.ejes);
  app.get('/bloques/:owner/:target', routes.bloques);
  app.get('/tangibles/:owner/:target?', routes.tangibles);
  app.get('/tangible/:uid', routes.tangible);
  app.get('/explorar/:match?', routes.explorar);
  app.get('/ba', routes.ba);

  if (ops.panelEnabled) {
    //panel
    app.get('/panel', auth, panel.index);
    app.get('/panel/packages/:filter?', auth, panel.packages);
    app.get('/panel/package/:uid', auth, panel.package);
    app.get('/panel/package/status/:uid/:status', auth, panel.packageStatus);
    app.get('/panel/clean', auth, panel.cleanCache);
    app.post('/panel/restore', auth, panel.restoreCache);
  }
  
  if (!isProd) return;

  // test only for dev
  app.get('/test', testAuth, test.index);

}

function configureRepository(app) {
  var r = new repo.HttpRepo(__dirname + '/repo', app);

  r
  .on('init', function(data) {
    logger.info('repository initialized on ' + r.path);
  })
  .on('log', function(msg) {
    logger.info(msg);
  });

  return r;

}

function listenServer(app) {

  http.createServer(app).listen(app.get('port'), function() {
    console.log('PAD aplicaction listening on port ' + app.get('port'));
  });

}

if (!isProd) {
  var app = createServer({ panelEnabled: true });

  listenServer(app);
}

