'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('tangibles', {
      url: '/tangibles',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('tangibles.design', {
      url: '/diseño/:area/:axis/:block',
      template: '<tangibles-design></tangibles-design>'
    })
    .state('tangibles.buscar', {
      url: '/buscar?texto?',
      template: '<tangibles-search></tangibles-search>'
    })
    //.state('tangibles.tag', {
    //  url: '/tag/:tag',
    //  template: '<tangibles-tag></tangibles-tag>'
    //})
    //.state('tangibles.favoritos', {
    //  url: '/favoritos',
    //  template: '<tangibles-favoritos></tangibles-favoritos>'
    //})
    //.state('tangibles.ver', {
    //  url: '/ver/:uid',
    //  template: '<tangibles-ver></tangibles-ver>'
    //});
}
