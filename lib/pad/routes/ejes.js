'use strict';

var fs = require('fs')
  , path = require('path');

// /explorar
module.exports = ejes;

function ejes(req, res){
  var area = req.params.area;

  var data = require('../data/entidades.json');

  var as = data[area];

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

  res.render('ejes', { ejes: ejes, owner: area, toExplore: '?area=' + area });
}