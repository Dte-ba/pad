'use strict';

angular.module('padApp')
  .controller('TangibleCtrl', function ($rootScope, $scope, $stateParams, $http, $timeout, Tangible, Favoritos, seoService) {

    var uid = $stateParams.uid;
    
    $http
      .get('/api/info')
      .success(function(info){
        $scope.isDesktop = info.mode === 'desktop';
      });

    $scope.accedio = false;

    Tangible
      .findByUid(uid)
      .then(function(data){
        $scope.tangible = data;
        
        if ($scope.tangible === undefined) {
          return;
        }

        var d = $scope.tangible.content.description;
        var s = $scope.tangible.content.source;
        $scope.tangible.hasDescription = d !== '' && d !== undefined && d !== null;
        var hasSource = s !== '' && s !== undefined && s !== null;
        
        if (hasSource){

          $timeout(function(){
            $('#source').linkify();
             $('[data-toggle="tooltip"]').tooltip();
          });
        }

        seoService.title($scope.tangible.content.title + ' | ' + $scope.tangible.content.area);
        seoService.description($scope.tangible.content.content);
        seoService.keyboards($scope.tangible.content.tags);
      });

    $scope.take = 10;
    $scope.query = {};
    $scope.showRel = false;

    $scope.addFavoritos = function(){
      $scope.tangible.like = Favoritos.toggle($scope.tangible.uid);
    };
    

    $scope.relFirst = function(){
      if ($scope.tangible === undefined) {
        return;
      }

      $scope.showRel = true;

      var tags = $scope.tangible.content.tags;

      if (typeof tags === 'string'){
        tags = tags.spli(',');
      }

      var mtags = _.map(tags, function(t){
        return _.escapeRegExp(_.trim(t));
      });

      var etag = '(' + mtags.join('|') + ')';
      
      $scope.query = { 'content.tags': { $regex: etag }, $not: { uid: { $regex: uid } } };
      $('#header-relations').hide();
      
    };

  });
