'use strict';

angular
  .module('padApp')
  .factory('AreaFactory', [function() {

    var _single = {};
    _single['CEC'] = 'CEC';
    _single['Centros Educativos Complementarios'] = 'CEC';
    _single['Ciencias Naturales'] = 'Ciencias Naturales';
    _single['Ciencias Sociales'] = 'Ciencias Sociales';
    _single['Educación Artística'] = 'Educación Artística';
    _single['Ed. Artística - Danza'] = 'Ed. Artística - Danza';
    _single['Ed. Artística - Música'] = 'Ed. Artística - Música';
    _single['Ed. Artística - Plástica'] = 'Ed. Artística - Plástica';
    _single['Ed. Artística - Música'] = 'Ed. Artística - Música';
    _single['Educación Artística - Música'] = 'Ed. Artística - Música';
    _single['Educación Física'] = 'Educación Física';
    _single['EOE'] = 'EOE';
    _single['Equipos de Orientación Escolar'] = 'EOE';
    _single['Inglés'] = 'Inglés';
    _single['Matemática'] = 'Matemática';
    _single['Orientación PAD'] = 'Orientación PAD';
    _single['PAD en acción'] = 'PAD en acción';
    _single['Prácticas del Lenguaje'] = 'Prácticas del Lenguaje';
    _single['Temas Transversales'] = 'Temas Transversales';

    var _alias ={};
    _alias['PAD en acción'] = 'pea';
    _alias['Inglés'] = 'ing';
    _alias['Ciencias Naturales'] = 'cn';
    _alias['Educación Física'] = 'ef';
    _alias['Ciencias Sociales'] = 'cs';
    _alias['Matemática'] = 'mat';
    _alias['Prácticas del Lenguaje'] = 'pdl';
    _alias['Educación Artística'] = 'edar';
    _alias['Ed. Artística - Plástica'] = 'edarp';
    _alias['Ed. Artística - Música'] = 'edarm';
    _alias['Ed. Artística - Danza'] = 'edard';
    _alias['Ed. Artística - Teatro'] = 'edart';
    _alias['EOE'] = 'eoe';
    _alias['CEC'] = 'cec';
    _alias['Orientación PAD'] = 'op';
    _alias['Temas Transversales'] = 'tt';

    var _query = {};
    _query['PAD en acción'] = [{'content.area': 'PAD en acción'}];
    _query['Inglés'] = [{'content.area':'Inglés'}];
    _query['Ciencias Naturales'] = [{'content.area':'Ciencias Naturales'}];
    _query['Educación Física'] = [{'content.area':'Educación Física'}];
    _query['Ciencias Sociales'] = [{'content.area':'Ciencias Sociales'}];
    _query['Matemática'] = [{'content.area':'Matemática'}];
    _query['Prácticas del Lenguaje'] = [{'content.area':'Prácticas del Lenguaje'}];
    _query['Ed. Artística - Plástica'] = [{'content.area':'Ed. Artística - Plástica'}];
    _query['Ed. Artística - Música'] = [{'content.area':'Ed. Artística - Música'}, {'content.area':'Educación Artística - Música'}];
    _query['Ed. Artística - Danza'] = [{'content.area':'Ed. Artística - Danza'}];
    _query['Ed. Artística - Teatro'] = [{'content.area':'Ed. Artística - Teatro'}];
    _query['EOE'] = [{'content.area':'Equipos de Orientación Escolar'}, {'content.area':'EOE'}];
    _query['CEC'] = [{'content.area':'Centros Educativos Complementarios'}, {'content.area':'CEC'}];
    _query['Orientación PAD'] = [{'content.area':'Orientación PAD'}];
    _query['Temas Transversales'] = [{'content.area':'Temas Transversales'}];

    var single = function(area){
      return _single[area];
    };

    var alias = function(area){
      return _alias[single(area)];
    };
    
    var query = function(area){
      return _query[single(area)];
    };

    var addAlias = function(item){
      if (item === undefined) {
        return;
      }

      var a = 'unknown';
      if (item.hasOwnProperty('area')) {
        a = item.area;
      } else if(item.hasOwnProperty('content')) {
        if(item.content.hasOwnProperty('area')) {
          a = item.content.area;
        }
      }

      item.sarea = alias(a);
    };

    return {
      alias: alias,
      single: single,
      normalize: single,
      query: query,
      addAlias: addAlias
    };
  }]);