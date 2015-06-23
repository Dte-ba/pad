'use strict';

angular.module('padApp')
  .controller('TangiblesCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    var _query = {};
    _query['PAD en acción'] = "area:PAD en acción";
    _query['Inglés'] = "area:Inglés";
    _query['Ciencias Naturales'] = "area:Ciencias Naturales";
    _query['Educación Física'] = "area:Educación Física";
    _query['Ciencias Sociales'] = "area:Ciencias Sociales";
    _query['Matemática'] = "area:Matemática";
    _query['Prácticas del Lenguaje'] = "area:Prácticas del Lenguaje";
    _query['Ed. Artística - Plástica'] = "area:Ed. Artística - Plástica";
    _query['Ed. Artística - Música'] = "area:Ed. Artística - Música || area:Educación Artística - Música";
    _query['Ed. Artística - Danza'] = "area:Ed. Artística - Danza";
    _query['Ed. Artística - Teatro'] = "area:Ed. Artística - Teatro";
    _query['Equipos de Orientación Escolar'] = "area:Equipos de Orientación Escolar || area:EOE";
    _query['Centros Educativos Complementarios'] = "area:Centros Educativos Complementarios || area:CEC";
    _query['Orientación PAD'] = "area:Orientación PAD";
    _query['Temas Transversales'] = "area:Temas Transversales";

    $scope.area = $stateParams.area;
    $scope.axis = $stateParams.eje;
    $scope.block = $stateParams.bloque;

    var q = 'select';

    if ($scope.area !== undefined){
      q += ' ' + _query[$scope.area];
    }

    if ($scope.axis !== undefined){
      q += ' && axis:' + $scope.axis;
    }

    if ($scope.block !== undefined){ 
      q += ' && block:' + $scope.block;
    }

    $http
      .get('/epm/query/local/' + q)
      .success(function(data){
        $scope.tangibles = data;
      });

  });
