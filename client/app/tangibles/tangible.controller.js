'use strict';

angular.module('padApp')
  .controller('TangibleCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    var uid = $stateParams.uid;

    $http
      .post('/epm/query/local', {uid: uid})
      .success(function(data){
        if (data instanceof Array && data.length === 1){
          $scope.tangible = data[0];
          //console.log(data);
        }
      });

  });
