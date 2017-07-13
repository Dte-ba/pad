'use strict';

import angular from 'angular';
import AreaFactory from './area.factory';
import Favoritos from './favoritos.factory';

export default angular
  .module('pad.Tangible', [Favoritos, AreaFactory])
  .service('Tangible', ['$http', '$rootScope', '$q', 'AreaFactory', 'Favoritos', function($http, $rootScope, $q, AreaFactory, Favoritos) {
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
              data.content.tags = data.content.tags.split(',');
              def.resolve(data);
            })
            .error(function(e){
              def.reject(e);
            });

          return def.promise;
        }
      };

  }]).name;