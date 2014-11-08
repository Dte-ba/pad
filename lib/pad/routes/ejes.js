'use strict';

var fs = require('fs')
  , path = require('path');

var alias = {
  'Centros Educativos Complementarios': 'cec',
  'Equipos de Orientación Escolar': 'eoe',
  'Educación Artística - Teatro': 'edart',
  'Educación Artística - Danza': 'edard',
  'Educación Artística - Música': 'edarm',
  'Educación Artística - Plástica': 'edarp',
  'Prácticas del Lenguaje': 'pdl',
  'Matemática': 'mat',
  'Ciencias Sociales': 'cs',
  'Educación Física': 'ef',
  'Ciencias Naturales': 'cn',
  'Inglés': 'ing'
};

// /explorar
module.exports = function ejes(req, res) {

  var area = req.params.area;

  var data = require('../data/entidades.json');

  var as = data[area];
  var bc = 'area-' + alias[area];

  var imgPath = './public/pad/img/';

  var ejes = Object.keys(as.axis).map(function(ax){
    var axis = as.axis[ax];

    var filename = (as.alias + '/' + axis.alias + '/padnet.png').replace(/\s/g, '_');
    filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'padnet.png';

    return {
      img: filename,
      alt: ax,
      title: ax,
      level: 2,
      owner: as,
      href: '/bloques/' + area + '/' + ax
    };

  });

  res.render('ejes', { ejes: ejes, owner: area, toExplore: '?area=' + area, areaClass: bc, showCartoon: true, area: alias[area] });
};