'use strict';

import angular from 'angular';

import AreaFactory from './area.factory';
import Favoritos from './favoritos.factory';

import _ from 'lodash';

export default angular
  .module('pad.Tangibles', [Favoritos, AreaFactory])
  .service('Tangibles', ['$http', '$rootScope', '$q','AreaFactory', 'Favoritos', function($http, $rootScope, $q, AreaFactory, Favoritos) {

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
              item.content.tags = item.content.tags.split(',');
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
              item.content.tags = item.content.tags.split(',');
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

  }]).name;