var wordsUtils = require('epm').wordsUtils;
var _ = require('underscore');

var matches = {
  'CEC': 'Centros Educativos Complementarios',
  'Centros Educativos Complementarios': 'Centros Educativos Complementarios',
  'Equipos de Orientación Escolar': 'EOE',
  'EOE': 'EOE',
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
  'Orientación PAD': 'EOE',
  'Temas Transversales': 'Temas Transversales'
};

module.exports = function explorar(req, res){
  var area = req.query.area;
  var axis = req.query.axis;
  var block = req.query.block;
  var tag = req.query.tag;

  var repo = process.REPOSITORY;

  repo.packages.execQuery("all", function(err, data){
    
    if (err) return next(err);

    var filtered = filter.filter(data, area, axis, block, tag);

    if (area === undefined && axis === undefined && block === undefined && tag !== undefined){
      filtered = filter.forTag(data, tag);      
    }

    filtered.forEach(function(t){
      var a = alias[t.content.area];
      t.bg = 'bg-' + a;
    });

    var tags = _.union.apply(
        _, 
        filtered.map(function(p){ 
          
          return wordsUtils.splitTags(p.content.tags); 

        })
      );

    // clear emties
    tags = tags.filter(function(t){
      return t.trim() !== '';
    })

    res.json(tags);
  });
};