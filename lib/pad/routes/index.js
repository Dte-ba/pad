
var fs = require('fs')
  , path = require('path');

var routes = module.exports = {};

routes.index = function(req, res){
  var data = require('../data/entidades.json');

  var imgPath = './public/pad/img/';
  var filename;

  var filtered = Object.keys(data).filter(function(an){
    return !(an == 'Temas Transversales' || an == 'Orientación PAD'); 
  });

  var barajas = filtered.map(function(an){
    var area = data[an];

    filename = (area.alias.replace(/\s+/g, '_') + '/padnet.png').replace(/\s/g, '_');
    filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'padnet.png';
    
    return {
      img: filename,
      alt: an,
      title: an,
      level: 1,
      owner: '',
      href: '/ejes/' + an
    };

  });

  barajas.unshift({
    img: 'padnet-ba.png',
    alt: 'Provincia de Buenos Aires',
    title: 'Provincia de Buenos Aires',
    level: 0,
    href: '/ba'
  });

  res.render('index', { title: 'Bienvenidos', barajas: barajas, home : true });
}

routes.ba = require('./ba.js');
routes.ejes = require('./ejes.js');
routes.bloques = require('./bloques.js');
routes.tangibles = require('./tangibles.js');
routes.tangible = require('./tangible.js');

routes.filter = require('./filter.js');
routes.explorar = require('./explorar.js');
routes.arbor = require('./arbor.js');
routes.nodes = require('./nodes.js');
routes.stats = require('./stats.js');

