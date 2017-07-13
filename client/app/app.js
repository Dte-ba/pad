'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import LocalStorageModule from 'angular-local-storage';

import {
  routeConfig,
  appRun
} from './app.config';

import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import dcAngular from '../lib/dc.angular';
import menuRoulette from '../components/menu-roulette/menu-roulette.component';
import padAsideMenu from '../components/pad-aside-menu/pad-aside-menu.component';
// services
import tangible from './services/tangible.service';
import tangibles from './services/tangibles.service';

import './app.scss';

angular.module('padApp', [
	ngCookies, 
	ngResource, 
	ngSanitize, 
	uiRouter, 
	main,
  constants, 
  util,
  dcAngular,
  menuRoulette,
  padAsideMenu,
  LocalStorageModule
])
 .config(routeConfig)
 .run(appRun);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['padApp'], {
      strictDi: true
    });
  });
