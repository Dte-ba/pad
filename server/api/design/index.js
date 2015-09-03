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

router.get('/areas', function(req, res) {
  design.manager.areas(false, function(err, areas){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(areas);
  });
  
});

router.get('/area/:name', function(req, res) {
  var name = req.params.name;

  design.areaByName(name, function(err, area){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(area);
  });
  
});

router.get('/ejes/:area', function(req, res) {
  var area = req.params.area;

  design.ejes(area, function(err, ejes){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(ejes);
  });
  
});

router.get('/bloques/:area/:eje', function(req, res) {
  var area = req.params.area;
  var eje = req.params.eje;

  design.bloques(area, eje, function(err, bloques){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(bloques);
  });
  
});

router.get('/transversales', function(req, res) {
  design.transversales(function(err, trans){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(trans);
  });
  
});

module.exports = router;