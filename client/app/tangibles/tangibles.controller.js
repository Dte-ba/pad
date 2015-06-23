'use strict';

angular.module('padApp')
  .controller('TangiblesCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    $scope.area = $stateParams.area;
    $scope.axis = $stateParams.axis;
    $scope.block = $stateParams.block;

    console.log($scope.area);
    console.log($scope.axis);
    console.log($scope.block);

  });
