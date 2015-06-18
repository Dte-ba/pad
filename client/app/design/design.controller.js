'use strict';

angular.module('padApp')
  .controller('DesignCtrl', function ($scope, $stateParams, $http) {
    
    $scope.area = $stateParams.area;
    $scope.axis = $stateParams.axis;
    $scope.block = $stateParams.block;
    $scope.lvl = 0;

    if ($scope.axis !== undefined && $scope.axis !== ''){
      $scope.lvl=1;
    }

    if ($scope.block !== undefined && $scope.block !== ''){
      $scope.lvl=2;
    }

    if ($scope.lvl === 0){
      $http
        .get('/api/design/ejes/'+$scope.area)
        .success(function(data){
          $scope.items = data;
          console.log(data);
        });
    }

  });
