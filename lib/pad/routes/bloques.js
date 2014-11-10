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
  'Orientación PAD': 'eoe',
  'Temas Transversales': 'tt'
};

// /explorar
module.exports = bloques;

function bloques(req, res){
   //var lvl = req.params.lvl;
  var owner = req.params.owner;
  var target = req.params.target;

  var data = require('../data/entidades.json');
  
  area = matches[area];

  var area = data[owner];

  var bc = 'area-' + alias[owner];

  if (area === undefined) {
    res.render('blocks', { blocks: [] });
    return;
  }

  var imgPath = './public/pad/img/';

  var bls;

  var axis = area.axis[target];

  if (axis !== undefined) {
    
    bls = Object.keys(axis.blocks).map(function(bl){
      var blalias = axis.blocks[bl].alias;
        
        var filename = (area.alias + '/' +  axis.alias + '/' + blalias  + '/portada.png').replace(/\s/g, '_');
        filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'portada.png';

        return { 
          area: owner,
          axis: axis.alias,
          name: bl,
          img: filename,
          href: '/tangibles/?area=' + owner + '&axis=' + target + '&block=' + bl
        };
    });

  }

  var showCartoon = owner !== 'Orientación PAD' && owner !== 'Temas Transversales';
  
  var vm = {};
  vm.blocks = bls;
  vm.axis = target;
  vm.owner = owner;
  vm.toExplore = '?area=' + owner + '&axis=' + target;
  vm.areaClass = bc;
  vm.showCartoon = showCartoon;
  vm.area = alias[owner];
  
  if (bls.length == 0) {
    // redirect to tangibles
    return res.redirect('/tangibles/?area=' + owner + '&axis=' + target);
    //vm.isEmpty = true;
  }
  res.render('bloques', vm);
}