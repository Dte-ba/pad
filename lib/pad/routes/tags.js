var wordsUtils = require('epm').wordsUtils;
var _ = require('underscore')
  , _areas = require('./areas-alias.js');

var matches = _areas.matches;
var alias = _areas.alias;

module.exports = function explorar(req, res){
  var area = req.query.area;
  var axis = req.query.axis;
  var block = req.query.block;
  var tag = req.query.tag;

  var repo = process.REPOSITORY;

  repo.packages.execQuery("all", function(err, data){
    
    if (err) return next(err);

    var filtered = filter.filter(data, area, axis, block, tag);

    if (area === undefined && axis === undefined && block === undefined && tag !== undefined){
      filtered = filter.forTag(data, tag);      
    }

    filtered.forEach(function(t){
      var a = alias[t.content.area];
      t.bg = 'bg-' + a;
    });

    var tags = _.union.apply(
        _, 
        filtered.map(function(p){ 
          
          return wordsUtils.splitTags(p.content.tags); 

        })
      );

    // clear emties
    tags = tags.filter(function(t){
      return t.trim() !== '';
    })

    res.json(tags);
  });
};