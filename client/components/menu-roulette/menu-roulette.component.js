import angular from 'angular';
import $ from 'jquery';
import dteRotation from '../../lib/dte.rotation';
import fnRoulette from '../../lib/roulette.jquery';

export class MenuRouletteComponent {
  opened = false;

  /*@ngInject*/
  constructor($element){
    this.elem = $($element);
    this.menu = this.elem.roulette();
  }

  $onInit(){
    this.configure(this, this.elem);
  }

  configure(scope, element){
    var bubbleHover = $('#bubble_hover')[0];
    //var bubbleClick = $('#bubble_click')[0];

    var areaCartoonActive = false;

    // close the aside menu when 
    // click outside
    angular
      .element(window.document)
      .bind('click', function(e) {
       if ($('#aside-menu').hasClass('active')) {
          $('#aside-menu').removeClass('active');
       }
       if (scope.menu.opened === true) {
         scope.menu.hide();
         element.addClass('inactive');
       }

       e.stopPropagation();
    });
    
    // stop rotation
    element
      .bind('click', function(e) {
        var br = element.children('.border-roulette');

        var rotation = br.rotation();
        br.rotation(rotation);
        element.toggleClass('inactive');
        scope.menu.toggle( window.Math.convertDegs('degs', rotation) );
        e.stopPropagation();
    });

    // on item hover
    element
      .children('ul.roulette')
      .children('li')
      .hover(function(e) {
        // get the hover element
        var elem = $(e.currentTarget);
        // get the area attribute 
        var area = elem.children('a')
                       .children('.item-area')
                       .attr('data-area');

        if(e.type === 'mouseover' || e.type === 'mouseenter' ) {
          bubbleHover.play();

          // hide border (fix that thing)
          element
            .children('.border-roulette')
            .hide();

          // set the current area to the cartoon
          element
            .children('.center-roulette-area')
            .attr('data-area', area);

          // paint the center
          element
            .children('.center-roulette-area')
            .addClass('active');

          // set the current area to the cartoon
          $('#area-cartoon-hover').attr('data-area', area);
          // showthe cartoon
          $('#area-cartoon-hover').addClass('active');

          areaCartoonActive = $('#area-cartoon').hasClass('active');

          if (areaCartoonActive) {
            $('#area-cartoon').removeClass('active');
          }

        } else {
          // remove the center
          element
            .children('.center-roulette-area')
            .removeClass('active');

          // show border (fix that thing)
          element
            .children('.border-roulette')
            .show();
        }

    });
    
    // hide the cartoon when mouse leave the item
    element
      .children('ul.roulette')
      .children('li')
      .on('mouseleave', function() {
          $('#area-cartoon-hover').removeClass('active');
          if (areaCartoonActive) {
            $('#area-cartoon').addClass('active');
          }
      });

    // when item is clicked remove the lock background
    element
    .children('ul.roulette')
    .children('li')
    .click(function(e) {
      //bubbleHover.play();

      $('#area-cartoon-hover').removeClass('active');
      
      if ($('.bg-lock').hasClass('showing')){
        if (scope.menu.opened === true) {
           scope.menu.hide();
        }
        setTimeout(function() {
          $('.bg-lock').removeClass('showing');
        }, 500);
      }
      e.stopPropagation();
    });
  }
}

export default angular.module('directives.menuRoulette', [])
  .component('menuRoulette', {
    template: require('./menu-roulette.html'),
    controller: MenuRouletteComponent,
    controllerAs: 'vm'
  })
  .name;
