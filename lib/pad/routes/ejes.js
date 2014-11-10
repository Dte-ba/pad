'use strict';

var fs = require('fs')
  , path = require('path');

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
  'CEC': 'cec',
  'Centros Educativos Complementarios': 'cec',
  'Equipos de Orientación Escolar': 'eoe',
  'EOE': 'eoe',
  'Educación Artística - Teatro': 'edart',
  'Educación Artística - Danza': 'edard',
  'Educación Artística - Música': 'edarm',
  'Ed. Artística - Música': 'edarm',
  'Educación Artística - Plástica': 'edarp',
  'Ed. Artística - Plástica': 'edarp',
  'Prácticas del Lenguaje': 'pdl',
  'Matemática': 'mat',
  'Ciencias Sociales': 'cs',
  'Educación Física': 'ef',
  'Ciencias Naturales': 'cn',
  'Inglés': 'ing',
  'Orientación PAD': 'opad',
  'Temas Transversales': 'tt'
};

// /explorar
module.exports = function ejes(req, res) {

  var area = req.params.area;

  area = matches[area];

  var data = require('../data/entidades.json');

  var as = data[area];
  var bc = 'area-' + alias[area];

  var imgPath = './public/pad/img/';

  var ejes = Object.keys(as.axis).map(function(ax){
    var axis = as.axis[ax];

    var filename = (as.alias + '/' + axis.alias + '/padnet.png').replace(/\s/g, '_');
    filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'portada.png';

    return {
      img: filename,
      alt: ax,
      title: ax,
      level: 2,
      owner: as,
      href: '/bloques/' + area + '/' + ax
    };

  });

  var showCartoon = area !== 'Orientación PAD' && area !== 'Temas Transversales';

  res.render('ejes', { ejes: ejes, owner: area, toExplore: '?area=' + area, areaClass: bc, showCartoon: showCartoon, area: alias[area] });
};