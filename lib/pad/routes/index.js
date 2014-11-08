
var fs = require('fs')
  , path = require('path');

var routes = module.exports = {};

routes.index = function(req, res){
  res.render('index', { title: 'Bienvenidos', home : true });
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

