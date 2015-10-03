'use strict';

var express = require('express');

var manager = require('../epm-manager');

var routes = {};

routes.query = require('./query.js');
routes.asset = require('./asset.js');
routes.metadata = require('./metadata.js');
routes.content = require('./content.js');
routes.stats = require('./stats.js');

module.exports = function(){

  var app = express.Router();
  app.cacheContent = {};

  app.post('/query/:repository', routes.query.query);

  app.post('/queryp/:repository', routes.query.queryp);

  app.get('/asset/:repository/:uid/:type/:name', routes.asset);

  app.get('/metadata/:repository/:uid', routes.metadata);

  app.get('/stats/:repository', routes.stats);

  // /content/:repository/:uid
  // /files/:repository/:uid
  routes.content(app)

  return app;
};