;
/*
 * PAD home page
 */

(function($, ko, window, document, undefined){
  "use strict";
  
  $(function(){
    $(document).ready(function(){

      var menu = $('#main-menu').roulette();

      $(document).click(function(){
        if (menu.opened === true) {
          menu.hide();
          $('#main-menu').addClass('inactive');  
        }
      });

      $('#main-menu').click(function(e){
        
        var rotation = $('#main-menu .border-roulette').rotation();
        
        $('#main-menu').toggleClass('inactive');
        $('#main-menu .border-roulette').rotation(rotation);
        
        menu.toggle( window.Math.convertDegs("degs", rotation) );

        event.stopPropagation();
      });

      $('#main-menu ul.roulette li').hover(function(e){
        var elem = $(e.currentTarget);

        var area = elem.children('a').children('.item-area').attr('data-area');
        
        if(e.type === "mouseover" || e.type === "mouseenter" ) {
          $('#main-menu .center-roulette-area').addClass('active');
          $('.area-cartoon').addClass('active');
          
          $('#main-menu .center-roulette-area').attr('data-area', area);
          $('html').attr('data-area', area);
        } else {
          $('#main-menu .center-roulette-area').removeClass('active');
          $('.area-cartoon').removeClass('active');
          $('#main-menu .center-roulette-area').removeAttr('data-area');
          $('html').attr('data-area', area);
        }
      });

    });
  });

})(jQuery, ko, window, document)