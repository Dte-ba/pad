
var fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , repo = require('pad-repository')
  ;

/*
 * GET home page.
 */

exports.index = function(req, res){
  var data = JSON.parse(fs.readFileSync('./data/entidades.json', 'utf-8'));

  var barajas = [];

  barajas.push({
    img: 'padnet-ba.png',
    alt: 'Provincia de Buenos Aires',
    title: 'Provincia de Buenos Aires',
    level: 0,
    href: '/ba'
  });

  var imgPath = './public/images/';
  var filename;

  for (var an in data) {
    
    var area = data[an];

    filename = (area.alias + '/padnet.png').replace(/\s/g, '_');
    filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'padnet.png';

    barajas.push({
      img: filename,
      alt: an,
      title: an,
      level: 1,
      owner: '',
      href: '/ejes/' + an
    });

  }

  res.render('index', { barajas: barajas });
};


// /ejes/:area
exports.ejes = function(req, res){
  var area = req.params.area;

  var data = JSON.parse(fs.readFileSync('./data/entidades.json', 'utf-8'));

  var as = data[area];

  var imgPath = './public/images/';
  var filename;
  var ejes = [];

  for (var ax in as.axis) {
    var axis = as.axis[ax];

    filename = (as.alias + '/' + axis.alias + '/padnet.png').replace(/\s/g, '_');
    filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'padnet.png';

    ejes.push({
      img: filename,
      alt: ax,
      title: ax,
      level: 2,
      owner: as,
      href: '/bloques/' + area + '/' + ax
    });

  }

  res.render('ejes', { ejes: ejes });
};
// /bloques/:owner/:target
exports.bloques = function(req, res){
  //var lvl = req.params.lvl;
  var owner = req.params.owner;
  var target = req.params.target;

  var data = JSON.parse(fs.readFileSync('./data/entidades.json', 'utf-8'));

  var area = data[owner];

  if (area === undefined) {
    res.render('blocks', { blocks: [] });
    return;
  }

  var imgPath = './public/images/';

  var bls = [];

  var axis = area.axis[target];

  if (axis !== undefined) {
    
    for (var bl in axis.blocks) {
      var blalias = axis.blocks[bl].alias;
      filename = (area.alias + '/' +  axis.alias + '/' + blalias  + '/portada.png').replace(/\s/g, '_');
      filename = fs.existsSync(path.join(imgPath, filename)) ? filename: 'portada.png';

      bls.push({ 
        area: owner,
        axis: axis.alias,
        name: bl,
        img: filename,
        href: '/tangibles/' + bl
      });
    }

  }
  
  var vm = {};
  vm.blocks = bls;
  if (bls.length == 0) {
    vm.isEmpty = true;
  }

  res.render('blocks', vm);

};

// /tangibles/:owner/:target?
exports.tangibles = function(req, res){
  
  var owner = req.params.owner;
  var target = req.params.target;

  var word = target !== undefined ? target : owner;

  repo.find({ 
    path: path.resolve('./repo'),
    word: word
  }, function(err, data){
    
    var vm = {};
    vm.tangibles = data;
    if (data.length === 0) {
      vm.isEmpty = true;
    }

    res.render('tangibles', vm);
  });

  //res.render('tangibles');
};

// /tangible/:uid
exports.tangible = function(req, res){

  var uid = req.params.uid;

  var _repo = new repo.Repository('./repo');

  _repo.getContent(uid, 'metadata', function(err, data){
    res.render('tangible', { tangible: data } );
  });
 
};

// /explorar
exports.explorar = function(req, res){

  var _repo = new repo.Repository('./repo');



  _repo.getWords({}, function(err, data){
    data = data.filter(function(w){
      return w.word.replace(/\s/g, '') !== '';
    });

    res.render('cloud', { words: data } );
  });
 
};