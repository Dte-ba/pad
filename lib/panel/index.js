'use strict';

var path = require('path');
var express = require('express');

module.exports = function(ops) {
  var app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  var routes = require('./routes')(app);

  return app;
};