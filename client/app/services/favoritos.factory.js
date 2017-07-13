'use strict';

import angular from 'angular';
import LocalStorageModule from 'angular-local-storage';

import _ from 'lodash';

export default angular
  .module('pad.Favoritos', [LocalStorageModule])
  .config((localStorageServiceProvider) => {
    localStorageServiceProvider.setPrefix('padApp');
  })
  .factory('Favoritos', ['localStorageService', '$rootScope', '$q', function(localStorageService, $rootScope, $q) {
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

  }]).name;