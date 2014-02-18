
var fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , repo = require('pad-repository')
  ;


/*
 * GET index test page.
 */
exports.index = function(req, res) {
  res.render('test', { layout: null });
};