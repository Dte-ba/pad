'use strict';

import angular from 'angular';

export default  angular
  .module('pad.AreaFactory', [])
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
    _single['Herramientas Digitales'] = 'Herramientas Digitales';
    _single['Prácticas del Lenguaje'] = 'Prácticas del Lenguaje';
    _single['Temas Transversales'] = 'Temas Transversales';

    var _subarea = {};
    _subarea['Ed. Artística - Plástica'] = 'Educación Artística';
    _subarea['Ed. Artística - Música'] = 'Educación Artística';
    _subarea['Ed. Artística - Danza'] = 'Educación Artística';
    _subarea['Ed. Artística - Teatro'] = 'Educación Artística';

    var _alias ={};
    _alias['PAD en acción'] = 'pea';
    _alias['Herramientas Digitales'] = 'hd';
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
    _query['Herramientas Digitales'] = [{'content.area': 'Herramientas Digitales'}];
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

    var _blockAlias = {};
    _blockAlias['Contexto sociocultural (Ed.Ar. - Música - Materiales)'] = 'Contexto sociocultural';
    _blockAlias['Lenguaje (Ed.Ar. - Música - Materiales)'] = 'Lenguaje';
    _blockAlias['Producción (Ed.Ar. - Música - Materiales)'] = 'Producción';
    _blockAlias['Recepción (Ed.Ar. - Música - Materiales)'] = 'Recepción';

    _blockAlias['Contexto sociocultural (Ed.Ar. - Música - Lenguaje)'] = 'Contexto sociocultural';
    _blockAlias['Lenguaje (Ed.Ar. - Música - Lenguaje)'] = 'Lenguaje';
    _blockAlias['Producción (Ed.Ar. - Música - Lenguaje)'] = 'Producción';
    _blockAlias['Recepción (Ed.Ar. - Música - Lenguaje)'] = 'Recepción';
    
    _blockAlias['Contexto sociocultural (Ed.Ar. - Música - Composición)'] = 'Contexto sociocultural';
    _blockAlias['Lenguaje (Ed.Ar. - Música - Composición)'] = 'Lenguaje';
    _blockAlias['Producción (Ed.Ar. - Música - Composición)'] = 'Producción';
    _blockAlias['Recepción (Ed.Ar. - Música - Composición)'] = 'Recepción';

    _blockAlias['Contexto sociocultural (Ed.Ar. - Danza - El cuerpo)'] = 'Contexto sociocultural';
    _blockAlias['Lenguaje (Ed.Ar. - Danza - El cuerpo)'] = 'Lenguaje';
    _blockAlias['Producción (Ed.Ar. - Danza - El cuerpo)'] = 'Producción';
    _blockAlias['Recepción (Ed.Ar. - Danza - El cuerpo)'] = 'Recepción';
    
    _blockAlias['Contexto sociocultural (Ed.Ar. - Danza - Lenguaje)'] = 'Contexto sociocultural';
    _blockAlias['Lenguaje (Ed.Ar. - Danza - Lenguaje)'] = 'Lenguaje';
    _blockAlias['Recepción (Ed.Ar. - Danza - Lenguaje)'] = 'Recepción';
    _blockAlias['Producción (Ed.Ar. - Danza - Lenguaje)'] = 'Producción';
    
    _blockAlias['Contexto sociocultural (Ed.Ar. - Danza - Discursos)'] = 'Contexto sociocultural';
    _blockAlias['Lenguaje (Ed.Ar. - Danza - Discursos)'] = 'Lenguaje';
    _blockAlias['Producción (Ed.Ar. - Danza - Discursos)'] = 'Producción';
    _blockAlias['Recepción (Ed.Ar. - Danza - Discursos)'] = 'Recepción';

    var _inverseBlockAlias = {};
    _inverseBlockAlias['Ed. Artística - MúsicaSala de DocentesSin Especificar'] = 'Sin Especificar';
    _inverseBlockAlias['Ed. Artística - MúsicaComposiciónProducción'] = 'Producción (Ed.Ar. - Música - Composición)';
    _inverseBlockAlias['Ed. Artística - MúsicaComposiciónContexto sociocultural'] = 'Contexto sociocultural (Ed.Ar. - Música - Composición)';
    _inverseBlockAlias['Ed. Artística - MúsicaComposiciónLenguaje'] = 'Lenguaje (Ed.Ar. - Música - Composición)';
    _inverseBlockAlias['Ed. Artística - MúsicaComposiciónRecepción'] = 'Recepción (Ed.Ar. - Música - Composición)';
    _inverseBlockAlias['Ed. Artística - MúsicaMateriales del Lenguaje MusicalProducción'] = 'Producción (Ed.Ar. - Música - Materiales)';
    _inverseBlockAlias['Ed. Artística - MúsicaMateriales del Lenguaje MusicalContexto sociocultural'] = 'Contexto sociocultural (Ed.Ar. - Música - Materiales)';
    _inverseBlockAlias['Ed. Artística - MúsicaMateriales del Lenguaje MusicalLenguaje'] = 'Lenguaje (Ed.Ar. - Música - Materiales)';
    _inverseBlockAlias['Ed. Artística - MúsicaMateriales del Lenguaje MusicalRecepción'] = 'Recepción (Ed.Ar. - Música - Materiales)';
    _inverseBlockAlias['Ed. Artística - MúsicaOrganización del Lenguaje MusicalProducción'] = 'Producción (Ed.Ar. - Música - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - MúsicaOrganización del Lenguaje MusicalLenguaje (Ed.Ar. - Música - Lenguaje)'] = 'Lenguaje (Ed.Ar. - Música - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - MúsicaOrganización del Lenguaje MusicalLenguaje'] = 'Contexto sociocultural (Ed.Ar. - Música - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - MúsicaOrganización del Lenguaje MusicalRecepción'] = 'Recepción (Ed.Ar. - Música - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - DanzaEl cuerpo en relación con...Contexto sociocultural'] = 'Contexto sociocultural (Ed.Ar. - Danza - El cuerpo)';
    _inverseBlockAlias['Ed. Artística - DanzaEl cuerpo en relación con...Producción'] = 'Producción (Ed.Ar. - Danza - El cuerpo)';
    _inverseBlockAlias['Ed. Artística - DanzaEl cuerpo en relación con...Lenguaje'] = 'Lenguaje (Ed.Ar. - Danza - El cuerpo)';
    _inverseBlockAlias['Ed. Artística - DanzaEl cuerpo en relación con...Recepción'] = 'Recepción (Ed.Ar. - Danza - El cuerpo)';
    _inverseBlockAlias['Ed. Artística - DanzaLa danza como lenguajeRecepción'] = 'Recepción (Ed.Ar. - Danza - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - DanzaLa danza como lenguajeLenguaje (Ed.Ar. - Danza - Lenguaje)'] = 'Lenguaje (Ed.Ar. - Danza - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - DanzaLa danza como lenguajeLenguaje'] = 'Contexto sociocultural (Ed.Ar. - Danza - Lenguaje)';
    _inverseBlockAlias['Ed. Artística - DanzaSala de DocentesSin Especificar'] = 'Sin Especificar';
    _inverseBlockAlias['Ed. Artística - DanzaLos discursos corporales y el contexto socio–culturalContexto sociocultural'] = 'Contexto sociocultural (Ed.Ar. - Danza - Discursos)';
    _inverseBlockAlias['Ed. Artística - DanzaLos discursos corporales y el contexto socio–culturalProducción'] = 'Producción (Ed.Ar. - Danza - Discursos)';
    _inverseBlockAlias['Ed. Artística - DanzaLos discursos corporales y el contexto socio–culturalLenguaje'] = 'Lenguaje (Ed.Ar. - Danza - Discursos)';
    _inverseBlockAlias['Ed. Artística - DanzaLos discursos corporales y el contexto socio–culturalRecepción'] = 'Recepción (Ed.Ar. - Danza - Discursos)';

    var single = function(area){
      return _single[area];
    };

    var alias = function(area){
      return _alias[single(area)];
    };

    var subarea = function(area){
      return _subarea[single(area)];
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

    var blockAlias = function(block){
      var b = _blockAlias[block];
      if (b !== undefined){
        return b;
      }
      return block;
    };

    var inverseBlockAlias = function(area, axis, block){
      var b = _inverseBlockAlias[area+axis+block];
      if (b !== undefined){
        return b;
      }
      return block;
    };

    return {
      alias: alias,
      subarea: subarea,
      single: single,
      normalize: single,
      query: query,
      addAlias: addAlias,
      blockAlias: blockAlias,
      inverseBlockAlias: inverseBlockAlias
    };
  }]).name;