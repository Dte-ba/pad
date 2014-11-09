
var words =  require('./utils/words.js');
var _ = require('underscore');

module.exports = filter = {}; 

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
    return item.content.area === area;
  });

};

filter.forAxis = function(items, axis){

  return items.filter(function(item){
    return item.content.axis === axis;
  });

};

filter.forBlock = function(items, block){

  return items.filter(function(item){
    return item.content.block === block;
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