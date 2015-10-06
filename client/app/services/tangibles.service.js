'use strict';

angular
  .module('padApp')
  .service('Tangibles', ['$http', '$rootScope', '$q', 'AreaFactory', function($http, $rootScope, $q, AreaFactory) {
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
  .service('Tangible', ['$http', '$rootScope', '$q', 'AreaFactory', function($http, $rootScope, $q, AreaFactory) {
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
              def.resolve(data);
            })
            .error(function(e){
              def.reject(e);
            });

          return def.promise;
        }
      };

    }]);