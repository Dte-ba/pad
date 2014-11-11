
var words =  require('./utils/words.js');
var _ = require('underscore');

module.exports = filter = {}; 

var matches = {
  'CEC': 'Centros Educativos Complementarios',
  'Centros Educativos Complementarios': 'Centros Educativos Complementarios',
  'Equipos de Orientación Escolar': 'Equipos de Orientación Escolar',
  'EOE': 'Equipos de Orientación Escolar',
  'Educación Artística - Teatro': 'Educación Artística - Teatro',
  'Educación Artística - Danza': 'Educación Artística - Danza',
  'Educación Artística - Música': 'Educación Artística - Música',
  'Ed. Artística - Música': 'Educación Artística - Música',
  'Educación Artística - Plástica': 'Educación Artística - Plástica',
  'Ed. Artística - Plástica': 'Educación Artística - Plástica',
  'Prácticas del Lenguaje': 'Prácticas del Lenguaje',
  'Matemática': 'Matemática',
  'Ciencias Sociales': 'Ciencias Sociales',
  'Educación Física': 'Educación Física',
  'Ciencias Naturales': 'Ciencias Naturales',
  'Inglés': 'Inglés',
  'Orientación PAD': 'EOE',
  'Temas Transversales': 'Temas Transversales'
};

var alias = {
  'CEC': 'Centros Educativos Complementarios',
  'Equipos de Orientación Escolar': 'EOE',
  'EOE': 'Equipos de Orientación Escolar',
  'Educación Artística - Música': 'Ed. Artística - Música'
};


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
    var res = words.escape(item.content.area) === words.escape(area);
    res = res || words.escape(matches[item.content.area]) === words.escape(area);

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