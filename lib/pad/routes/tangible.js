
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
  'Inglés': 'Inglés'
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
  'Inglés': 'ing'
};

// /tangible/:uid
module.exports = tangible;

function tangible(req, res){

  var uid = req.params.uid;

  var query = "select uid:" + uid;

  var repo = process.REPOSITORY;

  repo.packages.execQuery(query, function(err, data){
    var tangible = data[0];

    var area = tangible.content.area;
    area = matches[area];
    var bc = 'area-' + alias[area];

    var vm = {};
    vm.toExplore = req._parsedUrl.search;
    vm.areaClass = bc;
    vm.area = alias[area];
    vm.areaText = area;
    vm.axis = tangible.content.axis;
    vm.bloque = tangible.content.block;

    if (data.length === 0) {
      vm.isEmpty = true;
    } else {
      vm.tangible = tangible;
      vm.tangible.tags = tangible.content.tags.split(',');
    }
   
    res.render('tangible', vm );

  });
 
};