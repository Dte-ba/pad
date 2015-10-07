'use strict';

angular.module('padApp')
  .controller('DesignCtrl', function ($rootScope, $scope, $stateParams, $http, $timeout, AreaFactory) {
    
    var _ = window._;

    // area is subarea?
    var rootArea = AreaFactory.subarea($stateParams.area)
    if (rootArea !== undefined){
      $stateParams.axis = $stateParams.subarea;
      $stateParams.subarea = $stateParams.area;
      $stateParams.area = rootArea;
    }

    $scope.target = $stateParams.area;
    $scope.titleArea = $stateParams.area;
    $scope.subarea = $stateParams.subarea;
    $scope.axis = $stateParams.axis;
    $scope.eje = $stateParams.eje;

    $scope.lvl = 0;

    $scope.axisCollection = [];
    $scope.areaCollection = [];    

    // request the current area
    $http
      .get('/api/design/area/'+$scope.target)
      .success(function(data){

        $rootScope.area = data.shortname;
        $rootScope.showCartoon = true;  

        // has subareas?
        if (data.subareas !== undefined && data.subareas.length > 0){
          if ($scope.subarea !== undefined && $scope.subarea !== null && $scope.subarea !== '') {

            var a = _.findWhere(data.subareas, { name: $scope.subarea});

            if (a === undefined) {
              return;
            }

            $scope.titleArea = a.name;

            // set the area axis
            $scope.axisCollection = a.axis;
          } else {
            $scope.areaCollection = data.subareas;
            return;            
          }
        } else {
          $scope.axis = $scope.subarea;
          // set the currents axis
          $scope.axisCollection = data.axis;
        }
        
        // open the current axis
        $timeout(function () {
          if ($scope.eje !== undefined) {
            var elem = angular.element('div[data-target="' + $scope.eje + '"]');
            if (elem.length > 0){
              elem.click();
            }
          }
        });

      });

  });
