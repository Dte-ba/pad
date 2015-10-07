'use strict';

angular
  .module('padApp')
  .service('Tangibles', ['$http', '$rootScope', '$q', 'AreaFactory', 'Favoritos', function($http, $rootScope, $q, AreaFactory, Favoritos) {
    // loadsh
    var _ = window._;

    return {
      // query plus
      queryp: function(query, take, skip){
        var def = $q.defer();
        var url = '/epm/queryp/' + $rootScope.repository;

        $http
          .post(url, {query:query, take: take, skip: skip})
          .success(function(data){
            data.items = _.map(data.items, function(item){
              AreaFactory.addAlias(item);
              item.like = Favoritos.isFavorito(item.uid);
              item.content.block = AreaFactory.blockAlias(item.content.block);
              return item;
            });
            def.resolve(data);
          })
          .error(function(e){
            def.reject(e);
          });

        return def.promise;
      },
      // regular query
      query: function(query){
        var def = $q.defer();
        var url = '/epm/query/' + $rootScope.repository;

        $http
          .post(url, query)
          .success(function(data){
            data = _.map(data, function(item){
              AreaFactory.addAlias(item);
              item.like = Favoritos.isFavorito(item.uid);
              item.content.block = AreaFactory.blockAlias(item.content.block);
              return item;
            });
            def.resolve(data);
          })
          .error(function(e){
            def.reject(e);
          });

        return def.promise;
      }
    };

  }])
  .service('Tangible', ['$http', '$rootScope', '$q', 'AreaFactory', 'Favoritos', function($http, $rootScope, $q, AreaFactory, Favoritos) {
      // loadsh
      var _ = window._;

      return {
        // query plus
        findByUid: function(uid){
          var def = $q.defer();
          var url = '/epm/metadata/' + $rootScope.repository + '/' + uid;

          $http
            .get(url)
            .success(function(data){
              AreaFactory.addAlias(data);
              data.like = Favoritos.isFavorito(data.uid);
              data.content.block = AreaFactory.blockAlias(data.content.block);
              def.resolve(data);
            })
            .error(function(e){
              def.reject(e);
            });

          return def.promise;
        }
      };

    }])
    .factory('Favoritos', ['localStorageService', '$rootScope', '$q', function(localStorageService, $rootScope, $q) {
      // loadsh
      var _ = window._;

      var getFavoritos = function(){
        return localStorageService.get('favoritos');
      };

      var saveFavoritos = function(){
        localStorageService.set('favoritos', $rootScope.favoritos);
      };

      return {
        // query plus
        toggle: function(uid){
          
          var favs = getFavoritos();
          if (_.includes(favs, uid)){
            _.remove($rootScope.favoritos, function(item){
              return uid === item;
            });
            saveFavoritos();
            return false;
          } else {
            if ($rootScope.favoritos instanceof Array){
              $rootScope.favoritos.push(uid);
              saveFavoritos();
              return true;
            }
          }
        },
        isFavorito: function(uid){
          var favs = getFavoritos();
          return _.includes(favs, uid);
        },
        getFavoritos: function(){
          return  getFavoritos();
        }
      };

    }]);