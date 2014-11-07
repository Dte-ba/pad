'use strict';

var path = require('path');
var express = require('express');
var hbs = require('express-hbs');

module.exports = function(ops) {
  var app = express();
  var routes = require('./routes');

  app.cacheContent = {};

  // VIEWS
  app.engine('hbs', hbs.express3({
    partialsDir: path.join(__dirname, '/views/partials'),
    defaultLayout: path.join(__dirname, '/views/layout/default.hbs'),
    layoutsDir: path.join(__dirname, '/views/layout')
  }));

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  if (app.get('env') === 'production') {

    var partialsDir = path.join(__dirname, '/views/partials');

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

  // ROUTES
  app.get('/', routes.index);
  app.get('/ba', routes.ba);
  app.get('/explorar', routes.explorar);
  app.get('/ejes/:area', routes.ejes);
  app.get('/bloques/:owner/:target', routes.bloques);
  app.get('/tangibles', routes.tangibles);
  app.get('/tangible/:uid', routes.tangible);
  app.get('/content/:uid', contentMiddleware);
  app.get('/content/:uid/*', contentFileMiddleware);

  app.get('/filter', routes.filter);
  app.post('/filter', routes.filter);
  app.get('/arbor', routes.arbor);
  app.get('/nodes', routes.nodes);
  app.get('/stats', routes.stats);
  
  return app;

  function contentMiddleware(req, res, next){
    var uid = req.params.uid;
    var route = '/content/' + uid;

    var p = app.cacheContent[route];
    req.url = req.url.replace(route, '/');
    var dfn = directory(p.path, { 'icons': true });
    dfn.apply(app, [req, res, next]);
  }

  function contentFileMiddleware(req, res, next){
    var uid = req.params.uid;
    var route = '/content/' + uid;

    var p = app.cacheContent[route];

    req.url = req.url.replace(route, '');

    var filename = path.join(p.path, req.url);

    fs.stat(filename, function(err, stat){
      if (err) return 'ENOENT' == err.code
        ? next()
        : next(err);

      if (stat.isDirectory()){
        var dfn = directory(filename, { 'icons': true });
        dfn.apply(app, [req, res, next]);
        return;
      }

      res.sendfile(filename);

    });
  }

};