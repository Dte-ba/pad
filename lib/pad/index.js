'use strict';

var path = require('path');
var express = require('express');
var hbs = require('express-hbs');
var fs = require('fs');
var serveIndex = require('serve-index')

module.exports = function(ops) {
  var app = express();
  var routes = require('./routes');

  var epmApp = ops.epm;
  app.cacheIndex = {};

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
  app.get('/tags', routes.tags);
  app.get('/ejes/:area', routes.ejes);
  app.get('/bloques/:owner/:target', routes.bloques);
  app.get('/tangibles', routes.tangibles);
  app.get('/tangible/:uid', routes.tangible);
  app.get('/content/:uid', contentMiddleware);
  app.get('/content/:uid/*', contentFileMiddleware);
  app.get('/bienvenido/:view?', routes.bienvenido);
  app.get('/transversales', routes.transversales);
  app.get('/orientacion', routes.orientacion);

  //app.get('/filter', routes.filter);
  //app.post('/filter', routes.filter);
  //app.get('/arbor', routes.arbor);
  //app.get('/nodes', routes.nodes);
  app.get('/stats', routes.stats.get);
  app.post('/stats', routes.stats.post);
    
  return app;

  function contentMiddleware(req, res, next){
    var uid = req.params.uid;
    var route = '/content/' + uid;

    var p = epmApp.cacheContent[route];
    
    if (p === undefined) {
      return res.redirect('/package?content=' + uid);
    }

    req.url = req.url.replace(route, '/');

    var dfn = serveIndex(p.path, {'icons': true});
    dfn.apply(app, [req, res, next]);
  }

  function contentFileMiddleware(req, res, next){
    var uid = req.params.uid;
    var route = '/content/' + uid;

    //TODO: fix request files before cached

    var p = epmApp.cacheContent[route];
    if (p === undefined) {
      return res.redirect('/package?content=' + uid);
    }

    req.url = req.url.replace(route, '');

    var filename = decodeURIComponent(path.join(p.path, req.url));
    
    fs.stat(filename, function(err, stat){
      if (err) return 'ENOENT' == err.code
        ? next()
        : next(err);

      if (stat.isDirectory()){
        var dfn = serveIndex(filename, { 'icons': true });
        dfn.apply(app, [req, res, next]);
        return;
      }

      res.sendFile(filename);

    });
  }

};