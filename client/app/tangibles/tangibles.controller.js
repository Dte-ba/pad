'use strict';

angular.module('padApp')
  .controller('TangiblesCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    /*$scope.imgLoadedEvents = {

        always: function(always) {
            // Do stuff
            console.log(always);
        },

        done: function(instance) {
            console.log(instance);
            //angular.element(instance.elements[0]).addClass('loaded');
        },

        fail: function(instance) {
            // Do stuff
            console.log(instance);
        }

    };*/

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
    _query['Equipos de Orientación Escolar'] = [{'content.area':'Equipos de Orientación Escolar'}, {'content.area':'EOE'}];
    _query['Centros Educativos Complementarios'] = [{'content.area':'Centros Educativos Complementarios'}, {'content.area':'CEC'}];
    _query['Orientación PAD'] = [{'content.area':'Orientación PAD'}];
    _query['Temas Transversales'] = [{'content.area':'Temas Transversales'}];

    $scope.area = $stateParams.area;
    $scope.axis = $stateParams.eje;
    $scope.block = $stateParams.bloque;

    var q = [];

    if ($scope.area !== undefined){
      q = _query[$scope.area];
    }

    if ($scope.axis !== undefined){
      _.each(q, function(a){
        a['content.axis'] = $scope.axis;
      });
    }

    if ($scope.block !== undefined){ 
      _.each(q, function(a){
        a['content.block'] = $scope.block;
      });
    }

    if (q.length === 1) {
      q = q[0];
    } else if (q.length > 1) {
      q = { $or: q};
    }
    
    $http
      .post('/epm/query/local', q)
      .success(function(data){
        $scope.tangibles = data;
      })
      .error(function(){
        
      });

  });
