'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import LocalStorageModule from 'angular-local-storage';
import ngLoader from 'angular-loading-bar';
import angularLinkify from 'angular-linkify';

import {
  routeConfig,
  appRun
} from './app.config';

// components
import main from './main/main.component';
import design from './design/design.component';
import bienvenido from './bienvenido/bienvenido';
import contacto from './contacto/contacto.component';
import tangibles from './tangibles/tangibles';

// directives
import tangiblesScroller from '../components/tangibles-scroller/tangibles-scroller.directive';
import pinPreload from '../components/pin-preload/pin-preload.directive';
import padMenuAreas from '../components/pad-menu-areas/pad-menu-areas.directive';

import constants from './app.constants';
import util from '../components/util/util.module';
import dcAngular from '../lib/dc.angular';
import menuRoulette from '../components/menu-roulette/menu-roulette.component';
import padAsideMenu from '../components/pad-aside-menu/pad-aside-menu.component';

// services
import areaFactory from './services/area.factory';
import tangibleService from './services/tangible.service';
import tangiblesService from './services/tangibles.service';

// TODO: please change me
import ngGridPanel from 'ng-grid-panel';
import 'ng-grid-panel/ng-grid-panel.css';

import 'angular-loading-bar/build/loading-bar.css'
import './app.scss';

angular.module('padApp', [
	ngCookies, 
	ngResource, 
	ngSanitize, 
	uiRouter, 
	
  main,
  design,
  bienvenido,
  contacto,
  tangibles,

  tangiblesScroller,
  pinPreload,
  padMenuAreas,

  constants, 
  util,
  dcAngular,
  menuRoulette,
  padAsideMenu,
  LocalStorageModule,
  ngLoader,

  areaFactory,
  tangibleService,
  tangiblesService,

  'linkify',
  'ngGridPanel'
])
 .config(routeConfig)
 .run(appRun);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['padApp'], {
      strictDi: true
    });
  });
