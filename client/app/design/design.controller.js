'use strict';

angular.module('padApp')
  .controller('DesignCtrl', function ($rootScope, $scope, $stateParams, $http, $timeout) {
    
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

    /*$http
      .post('/epm/query/local/select area:EOE || area:Equipos de Orientación Escolar')
      .success(function(data){
        console.log( data);
      });*/

    if ($scope.lvl === 0 || $scope.lvl === 1){
      $http
        .get('/api/design/ejes/'+$scope.target)
        .success(function(data){
          $scope.axisCollection = data;
          //console.log(data);
          $timeout(function () {
            if ($scope.axis !== undefined) {
              var elem = angular.element('div[data-target="' + $scope.axis + '"]');
              if (elem.length > 0){
                elem.click();
              }
            }
          });
        });
    } /*else if ($scope.lvl === 1){
      $http
        .get('/api/design/bloques/'+$scope.target+'/'+$scope.axis)
        .success(function(data){
          $scope.blocksCollection = data;
          //console.log(data);
        });
    }*/

  });
