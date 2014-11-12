;
// common js for each pages

(function($, io, ko, window, document, undefined){
  "use strict";

  var isLoadaded = false;

  var loadedComplete = function(){
    for (var i = 0; i < window.__listeners.length; i++) {
      var func = window.__listeners[i];

      func.apply(window);
    };
  };

  window.__listeners = [];
  window.onLoaded = function(func){
    window.__listeners.push(func);
    if (isLoadaded) {
      loadedComplete();   
    }
  };

  var socket = io();

  $(function(){
    $(document).ready(function(){

      socket.on('status', function(info){
        if (info.status === "complete") {
          $('body').removeClass('loading');
          isLoadaded = true;
          loadedComplete();
        }
      });

      socket.on('users change', function(usersOnline){
        console.log('usersOnline: ' + usersOnline);
        $('.users-online').text('online: ' + usersOnline);
      });
        
      if ($('#main-menu').length > 0){
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

        $('#main-menu ul.roulette li a').click(function(e){

          event.stopPropagation();
        });

        $('#main-menu ul.roulette li').hover(function(e){
          var elem = $(e.currentTarget);

          var area = elem.children('a').children('.item-area').attr('data-area');
          
          var currentArea = $('html').data('area');

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

            if (currentArea !== undefined && !$('body').hasClass('home')) {
              $('.area-cartoon').addClass('active');
              $('html').attr('data-area', currentArea);              
            }
          }
        });

        $('.bg-lock').click(function(){
          $('.bg-lock').removeClass('showing');
          if (menu !== undefined){
            menu.hide();  
          }
          
          event.stopPropagation();
        });

        $('#aside-area-menu').click(function(){
          $('.bg-lock').toggleClass('showing');
        });
      }

      $(document).click(function(){
        if ($('#aside-menu').hasClass('active')) {
          $('#aside-menu').removeClass('active');
        }
      });

      //$('#aside-menu ul li a').tooltip();
      $('a[data-toggle="tooltip"]').tooltip();

      $('#aside-menu').click(function(e){
        $('#aside-menu').toggleClass('active');
        event.stopPropagation();
      });

    });
  });
  
})(jQuery, io, ko, window, document)