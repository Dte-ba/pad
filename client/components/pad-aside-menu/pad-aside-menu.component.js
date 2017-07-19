import angular from 'angular';
import $ from 'jquery';
import bootstrap from 'bootstrap';

export class PadAsideMenu {
  /*@ngInject*/
  constructor($element){
    this.elem = $($element);
  }

  $onInit(){
    // configure
    $('a[data-toggle="tooltip"]').tooltip();
    console.log($('a[data-toggle="tooltip"]'));
    $('a[data-toggle="tooltip"]').each(function() {
      $(this).click(ev => {
        $(this).tooltip('hide');
      });
    });

    this.elem.click((event) => {
      this.elem.toggleClass('active');
      event.stopPropagation();
    });

    angular
      .element(window.document)
      .bind('click', () => {
      
      if (this.elem.hasClass('active')) {
        this.elem.removeClass('active');
      }
    });
  }
}

export default angular.module('pad.padAsideMenu', [])
  .component('padAsideMenu', {
    template: require('./pad-aside-menu.html'),
    controller: PadAsideMenu,
    controllerAs: 'vm'
  })
  .name;
