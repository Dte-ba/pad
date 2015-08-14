'use strict';

angular.module('padApp')
  .controller('TransversalesCtrl', function ($scope, $http, $timeout) {
    
    $scope.areaCollection = [];

    $http
      .get('/api/design/transversales')
      .success(function(data){
        
        $scope.areaCollection = data;

        $timeout(function () {
        
        });
      });
  });
