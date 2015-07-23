'use strict';

angular.module('padApp')
  .controller('TangibleCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    var uid = $stateParams.uid;

    $http
      .get('/epm/metadata/local/' + uid)
      .success(function(data){
        $scope.tangible = data;
      });

  });
