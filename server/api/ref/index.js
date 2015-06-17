/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var express = require('express');

var router = express.Router();

router.get('/encuadres', function(req, res) {
  var filename = path.join(__dirname, 'encuadres.json');

  fs.exists(filename, function(exists){

    if (exists) {
     fs.readFile(filename, 'utf-8', function(err, content){
      var areas = JSON.parse(content).areas;
      res.set({ 'content-type': 'application/json; charset=utf-8' });
      var result = areas.map(function(a){
        return { 
          area: a.area,
          kebabCase: _.kebabCase(a.area),
          deburr: _.deburr(a.area),
          both: _.kebabCase(_.deburr(a.area)),
        };
      });
      res.json(result);
     });
    } else {
      res.json([]);
    }

  });
});

module.exports = router;