'use strict';

var fs = require('fs')
  , path = require('path')
  , _areas = require('./areas-alias.js');

var matches = _areas.matches;
var alias = _areas.alias;

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