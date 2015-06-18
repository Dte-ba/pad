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

var design = require('../../components/design');

var router = express.Router();

router.get('/encuadres', function(req, res) {

  design.encuadres(function(err, encuadres){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(encuadres);
  });
  
});

router.get('/ejes/:area', function(req, res) {
  var area = req.params.area;

  design.ejes(area, function(err, ejes){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(ejes);
  });
  
});

module.exports = router;