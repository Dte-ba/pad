
var words =  require('./utils/words.js');
var _ = require('underscore');

module.exports = filter = {}; 

var _areas = require('./routes/areas-alias.js');

var matches = _areas.matches;
var alias = _areas.alias;

filter.filter = function(items, area, axis, block, tag) {

  if (area === undefined) {
    return items;
  }

  var res = filter.forArea(items, area);

  if (axis === undefined) {
    return res;
  }

  res = filter.forAxis(res, axis);

  if (block === undefined) {
    return res;
  }

  res = filter.forBlock(res, block);

  if (tag === undefined) {
    return res;
  }

  return filter.forTag(res, tag);

};

filter.forArea = function(items, area){

  return items.filter(function(item){
    var match = matches[item.content.area];
    if (match === undefined) {
      throw new Error('Not matches for ', item.content.area);
    }
    var res = words.escape(item.content.area) === words.escape(area);
    res = res || words.escape(match) === words.escape(area);

    var va = alias[item.content.area];
    if (va !== undefined) {
      res = res || words.escape(va) === words.escape(area);
    }

    return  res;
  });

};

filter.forAxis = function(items, axis){
  return items.filter(function(item){
    return words.escape(item.content.axis) === words.escape(axis);
  });

};

filter.forBlock = function(items, block){

  return items.filter(function(item){
    return words.escape(item.content.block) === words.escape(block);
  });

};

filter.forTag = function(items, tag){
  var stag = words.escape(tag);

  return items.filter(function(item){
    var tags = item.content.tags.split(',');
    return _.any(tags, function(t){
      return words.escape(t) === stag;
    });
  });

};