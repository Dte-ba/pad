
var async = require('async');
var wordsUtils = require('epm').wordsUtils;
var util = require('util');
var PadEngine = require('epm-pad-engine');
var eql = require('eql-engine');
var _ = require('underscore');

var engine = new PadEngine();

module.exports = nodes;

function nodes(req, res){
  createNodes(function(err, nodes){
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(nodes));
  });
}

function createNodes(cb){
  var repo = process.REPOSITORY;

  repo.packages.execQuery("all", function(err, pkgs){

    var ns = pkgs.map(function(p){
      return new Node(p, pkgs);
    });

    var rels = findEdges(ns);

    cb && cb(null, mapNodes(ns));

  });
}

function mapNodes(nodes){
  return nodes.map(function(n){ return n.map(); });
}

function getUids(pkgs){
  return pkgs.map(function(p){ return p.uid; });
}

function findEdges(nodes){

  var res = {
    areas: {},
    axis: {},
    blocks: {},
    tags: {}
  };

  nodes.forEach(function(n){
    
    var earea = wordsUtils.escape(n.content.area);
    var eaxis = wordsUtils.escape(n.content.axis);
    var eblock = wordsUtils.escape(n.content.block);

    res.areas[earea] = [];
    res.axis[util.format("%s>%s", earea, eaxis)] = [];
    res.blocks[util.format("%s>%s>%s", earea, eaxis, eblock)] = [];

    var stags = wordsUtils.splitTags(n.content.tags);
    var etags = stags.map(function(t){
      return wordsUtils.escape(t);
    });
      
    etags.forEach(function(et){
      res.tags[et] = [];
    });
  });

  // rel for areas
  Object.keys(res.areas).forEach(function(a){
    var query = eql.parse(util.format("select area:%s", a));

    res.areas[a] = getUids(nodes.filter(function(n) {
      return engine.isMatch(n, query);
    }));
  });

  // rel for axis
  Object.keys(res.axis).forEach(function(aa){
    var keys = aa.split('>');
    var query = eql.parse(util.format("select area:%s && axis:%s", keys[0], keys[1]));

    res.axis[aa] = getUids(nodes.filter(function(n) {
      return engine.isMatch(n, query);
    }));
  });

  // rel for blocks
  Object.keys(res.blocks).forEach(function(aab){
    var keys = aab.split('>');
    var query = eql.parse(util.format("select area:%s && axis:%s && block:%s", keys[0], keys[1], keys[2]));

    res.blocks[aab] = getUids(nodes.filter(function(n) {
      return engine.isMatch(n, query);
    }));
  });

  // rel for tags
  Object.keys(res.tags).forEach(function(t){
    if (t === undefined || t.trim() === '') {
      return undefined;
    }

    var query = eql.parse(util.format("select tag:%s", t));
    
    res.tags[t] = getUids(nodes.filter(function(n) {
      return engine.isMatch(n, query);
    }));
    
  });

  // fill rels
  nodes.forEach(function(n){

    var earea = wordsUtils.escape(n.content.area)
    n.areaEdges = _.without(res.areas[earea], n.uid);

    var eaxis = wordsUtils.escape(n.content.axis);
    n.axisEdges = _.without(res.axis[util.format("%s>%s", earea, eaxis)], n.uid);

    var eblock = wordsUtils.escape(n.content.block);
    n.blcoksEdges = _.without(res.blocks[util.format("%s>%s>%s", earea, eaxis, eblock)] , n.uid);

    var stags = wordsUtils.splitTags(n.content.tags);
    var etags = stags.map(function(t){
      return wordsUtils.escape(t);
    });

    n.tagsEdges = _.union.apply(
      _
      , etags.map(function(et){
        return _.without(res.tags[et] , n.uid);
      })
    );

    n.edges = _.union(n.areaEdges, n.axisEdges, n.blcoksEdges, n.tagsEdges);
  });

  return res;
}

function Node(p){
  var self = this;

  self.uid = p.uid;
  self.content = p.content;

  self.map = function(){
    return {
      uid: self.uid,
      title: self.content.title,
      area: self.content.area,
      axis: self.content.axis,
      block: self.content.block,
      tags: wordsUtils.splitTags(self.content.tags),
      areaEdges: self.areaEdges,
      //axisEdges: self.axisEdges,
      blcoksEdges: self.blcoksEdges,
      //tagsEdges: self.tagsEdges,
      edges:  self.edges
    }
  };

  return self;
}
