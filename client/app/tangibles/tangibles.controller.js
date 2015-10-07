'use strict';

angular.module('padApp')
  .controller('TangiblesCtrl', function ($rootScope, $scope, $stateParams, $timeout, AreaFactory) {
    
    $scope.area = $stateParams.area;
    $scope.sarea = AreaFactory.alias($stateParams.area);
    $scope.axis = $stateParams.axis;
    $scope.block = $stateParams.block;

    $scope.iniciando = true;

    $scope.query = {};
    $scope.take = 15;
    
    var q = [];

    if ($scope.area !== undefined){
      q = AreaFactory.query($scope.area);
    }

    if ($scope.axis !== undefined){
      _.each(q, function(a){
        a['content.axis'] = $scope.axis;
      });
    }

    if ($scope.block !== undefined){ 
      _.each(q, function(a){
        a['content.block'] = { $regex: $scope.block };
      });
    }

    if (q.length === 1) {
      q = q[0];
    } else if (q.length > 1) {
      q = { $or: q};
    }

    $timeout(function(){
      $scope.query = q;
      $scope.iniciando = false;
    }, 500);


  })
  .controller('TagTangiblesCtrl', function ($scope, $stateParams, $timeout, $http) {

    $scope.tag = $stateParams.tag;
    var etag = _.escapeRegExp(_.trim($scope.tag));

    $scope.take = 10;
    $scope.query = {};
    $scope.iniciando = true;

    $timeout(function(){
      $scope.query = { 'content.tags': { $regex: etag } };
      $scope.iniciando = false;
    }, 500);
    
  })
  .controller('SearchTangiblesCtrl', function ($scope, $state, $stateParams, $location, $timeout, $http) {
    $scope.texto = $stateParams.texto;
    $scope.searchText = $scope.texto;

    var trimTexto = _.trim($scope.texto);
    
    function _search(){
      if ($scope.searchText === undefined) {
        return;
      }
      if ($scope.searchText === trimTexto) {
        return;
      }
      //$state.go('tangibles.buscar', {texto: $scope.searchText });
      $stateParams['texto'] = $scope.searchText;
      $state.params['texto'] = $scope.searchText;
      $location.search('texto', $scope.searchText);

      _realseSearch($scope.searchText);
    }

    $scope.search = function(){
      _search();
    };

    $scope.$watch('searchText', function(){
      _search();
    });
    
    $scope.query = {};

    function _realseSearch(target){
      trimTexto = _.trim(target);
      var texto = _.escapeRegExp(trimTexto);

      $scope.query = { 
        $or: [
          { 'content.tags': { $regex: texto } },
          { 'content.content': { $regex: texto } },
          { 'content.title': { $regex: texto } },
          { 'uid': { $regex: texto } }
        ]
      };
    }

    $timeout(function(){
      _search();
      $('#searchInput').focus();
    }, 500);
        
  })
  .controller('FavoritosTangiblesCtrl', function ($scope, $rootScope, $stateParams, $timeout, $http, Favoritos) {
    $scope.take = 10;
    $scope.query = {};
    $scope.iniciando = true;

    $timeout(function(){
      var favs = Favoritos.getFavoritos();
      $scope.query = { 'uid': { '$in': $rootScope.favoritos } };
      $scope.iniciando = false;
    }, 500);
  });
  