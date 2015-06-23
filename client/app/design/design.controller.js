'use strict';

angular.module('padApp')
  .controller('DesignCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    $scope.target = $stateParams.area;
    $scope.axis = $stateParams.axis;
    $scope.block = $stateParams.block;
    $scope.lvl = 0;

    $rootScope.area = $scope.target;
    $rootScope.showCartoon = true;

    $scope.axisCollection = [];

    if ($scope.axis !== undefined && $scope.axis !== ''){
      $scope.lvl=1;
    }

    if ($scope.block !== undefined && $scope.block !== ''){
      $scope.lvl=2;
    }

    /*$http
      .get('http://localhost:9000/epm/query/local/all')
      .success(function(data){
        console.log(
            _.groupBy(
              _.map(data, function(a){ return a.content; })
              , 'area')
          );
      });*/

    $http
      .get('/epm/query/local/select area:EOE || area:Equipos de Orientación Escolar')
      .success(function(data){
        console.log( data);
      });

    if ($scope.lvl === 0){
      $http
        .get('/api/design/ejes/'+$scope.target)
        .success(function(data){
          $scope.axisCollection = data;
          //console.log(data);
        });
    } else if ($scope.lvl === 1){
      $http
        .get('/api/design/bloques/'+$scope.target+'/'+$scope.axis)
        .success(function(data){
          $scope.blocksCollection = data;
          //console.log(data);
        });
    }

  });
