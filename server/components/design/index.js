
'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var config = require('../../config/environment');

var design = {};

design.manager = require('./manager');

var getAreas = function(cb){
  var filename = path.join(__dirname, 'areas.json');

  fs.exists(filename, function(exists){
    
    if (exists) {
      fs.readFile(filename, 'utf-8', function(err, content){
        if (err) { return cb && cb(err); }
        
        var areas = JSON.parse(content).areas;

        cb (null, areas);
      });
    } else {
      cb(null, []);
    }

  });
};

design.encuadres = function(cb){

  getAreas(function(err, areas){
    var result = areas.map(function(a){
    var encode = _.kebabCase(a.area).replace(/\-/ig, '_')
      return { 
        area: a.area,
        alt: 'Encuadre para ' + a.area,
        file: '/assets/files/encuadres/encuadre_' + encode + '.pdf',
        cover: '/assets/img/areas/' + encode + '/encuadre.png'
      };
    });

    var encuadres = result.filter(function(a){
      var client = config.env === 'production' ? 'public' : 'client';
      return fs.existsSync(path.join(config.root, client, a.file));
    });

    encuadres.push({
      area: 'Ed. Artística',
      alt: 'Encuadre para Ed. Artística',
      file: '/assets/files/encuadres/encuadre_artistica.pdf',
      cover: '/assets/img/areas/artistica/encuadre.png'
    });
    
    cb(null, encuadres);
  });

};

design.areaByName = function(name, cb){

  design.manager.areas(false, function(err, areas){
    var a = _.find(areas, { name: name });
    if (a === undefined){
      return cb && cb(null, []);
    }

    cb(null, a);
  });

};

design.ejes = function(area, cb){

  design.manager.areas(false, function(err, areas){
    var a = _.find(areas, { name: area });
    if (a === undefined){
      return cb && cb(null, []);
    }

    cb(null, a.axis);
  });

};

design.bloques = function(area, eje, cb){
  
  var client = config.env === 'production' ? 'public' : 'client';
  var imgFolder = path.join(config.root, client);
  var defaultImg = '/assets/img/areas/portada.png'

  getAreas(function(err, areas){
    var a = _.find(areas, { area: area });
    var e = _.find(a.axis, { name: eje });
    if (e === undefined) {
      return cb && cb(null, []);
    }
    var encodeArea = _.kebabCase(area).replace(/\-/ig, '_');
    var encodeAx = _.kebabCase(eje).replace(/\-/ig, '_');
    var sub = '/assets/img/areas/'

    var blocks = e.blocks.map(function(b){
      var encodeBlock = _.kebabCase(b).replace(/\-/ig, '_');
      var relative = path.join('/assets/img/areas/', encodeArea, encodeAx, encodeBlock, 'portada.png');
      var full = path.join(imgFolder, relative);
      var img = fs.existsSync(full) ? relative.replace(/\\/ig, '/') : defaultImg;

      return {
        area: area,
        eje: eje,
        name: b,
        img: img,
        full: full,
      };
    });

    cb(null, blocks);
  });

};

design.transversales = function(cb){

  design.manager.areas(false, function(err, areas){
    var trans = _.filter(areas, function(item){
      return item.name === "Equipos de Orientación Escolar" || item.name === "Centros Educativos Complementarios";
    });

    if (trans === undefined){
      return cb && cb(null, []);
    }

    cb(null, trans);
  });

};

module.exports = design;