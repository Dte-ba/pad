
'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var config = require('../../config/environment');

var design = {};

design.encuadres = function(cb){
  var filename = path.join(__dirname, 'areas.json');

  fs.exists(filename, function(exists){

    if (exists) {
     fs.readFile(filename, 'utf-8', function(err, content){
      var areas = JSON.parse(content).areas;

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
      
      cb && cb(null, encuadres);

     });
    } else {
      cb && cb(null, []);
    }

  });

};

design.ejes = function(area, cb){

  var filename = path.join(__dirname, 'areas.json');

  fs.exists(filename, function(exists){

    if (exists) {
     fs.readFile(filename, 'utf-8', function(err, content){
      var areas = JSON.parse(content).areas;
      var a = _.find(areas, { area: area });

      cb && cb(null, a.axis);
     });
    } else {
      cb && cb(null, []);
    }

  });

};

module.exports = design;