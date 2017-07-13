'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './design.routes';
import _ from 'lodash';

export class DesignComponent {
  /*@ngInject*/
  constructor($rootScope, $stateParams, $http, $timeout, AreaFactory, seoService) {
    this.seoService = seoService;
    
    // area is subarea?
    var rootArea = AreaFactory.subarea($stateParams.area)
    if (rootArea !== undefined){
      $stateParams.axis = $stateParams.subarea;
      $stateParams.subarea = $stateParams.area;
      $stateParams.area = rootArea;
    }

    this.target = $stateParams.area;
    this.area = $stateParams.area;
    this.titleArea = $stateParams.area;
    this.subarea = $stateParams.subarea;
    this.axis = $stateParams.axis;
    this.eje = $stateParams.eje;

    this.lvl = 0;

    this.axisCollection = [];
    this.areaCollection = []; 

    // request the current area
    $http
      .get('/api/design/area/'+this.target)
      .then((response) => {
        let data = response.data;
        $rootScope.area = data.shortname;
        $rootScope.showCartoon = true;  

        // has subareas?
        if (data.subareas !== undefined && data.subareas.length > 0){
          if (this.subarea !== undefined && this.subarea !== null && this.subarea !== '') {

            var a = _.find(data.subareas, { name: this.subarea});

            if (a === undefined) {
              return;
            }

            this.titleArea = a.name;

            // set the area axis
            this.axisCollection = a.axis;
          } else {
            this.areaCollection = data.subareas;
            this.areaCollection = _.map(this.areaCollection, a => {
              a.owner = this.target;
              return a;
            });
            
            this.createMeta(true);
            return;            
          }
        } else {
          this.axis = this.subarea;
          // set the currents axis
          this.axisCollection = data.axis;
        }

        this.axisCollection = _.map(this.axisCollection, a => {
          a.area = this.target;
          return a;
        });
        
        this.createMeta();

        // open the current axis
        $timeout(() => {
          if (this.eje !== undefined) {
            var elem = angular.element('div[data-target="' + this.eje + '"]');
            if (elem.length > 0){
              elem.click();
            }
          }
        });

      });
  }

  createMeta(isSubArea){
    if (isSubArea) {
      this.seoService.title('Area '+this.titleArea+' | PAD');
    } else {
      this.seoService.title('Area '+this.titleArea+' | PAD');
    }

    this.seoService.description('Bloques y ejes correspondientes a el area '+this.titleArea);
    var keys = ['diseño curricular','area','ejes','bloques',this.titleArea];

    var axis = [];

    if (isSubArea) {
      //axis = _.flatten(_.map(this.areaCollection, function(a){ return a.axis; }));
      keys = keys.concat(_.map(this.areaCollection, function(a){ return a.name; }));
    } else {
      axis=this.axisCollection;
    }

    if (axis.length > 0) {
      keys = keys.concat(_.map(axis, function(a){ return a.name; }));
      if (!isSubArea) {
        _.each(axis, function(ax){
          if (ax.blocks !== undefined && ax.blocks.length > 0) {
            keys = keys.concat(_.map(ax.blocks, function(b){ return b.name; }));
          }
        });
      }
    }

    keys = _.uniq(keys);
    
    this.seoService.keyboards(keys);
  }
}

export default angular.module('padApp.design', [uiRouter])
  .config(routes)
  .component('design', {
    template: require('./design.html'),
    controller: DesignComponent,
    controllerAs: 'vm'
  })
  .name;
