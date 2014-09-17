// common js for each pages

!function($, ko, window, document, undefined){
  "use strict";
  
  window.__menu = {};

  var widthLimit = 768;

  function menu(first){

    var cWidth = getWidth();

    if (first === true){
      window.__menu.base = $('#menu').html();
      window.__menu.width = cWidth;
      return draw(window.__menu.width, first);
    }

    var a = calculeAlign(cWidth);
    
    if (window.__menu.align === a) return ;

    draw(cWidth);

    window.__menu.width = cWidth;
  }

  function calculeAlign(width){
    return width > widthLimit ? 'left' : 'top';
  }

  function getWidth(){
    if (window.innerWidth) return window.innerWidth;

    return $(window).width();
  }

  function draw(width, first){

    if (first === undefined){
      $('#menu').html(window.__menu.base);
      $('#menu').attr('style', '');
      $('#menu').attr('class', '');
    }

    var alig = calculeAlign(width);

    window.__menu.align = alig;

    // Initialize the dock
    var dockOptions ={
        align: alig
      , labels: 'br'
      , inactivity: 4000
    };

    $('#menu').jqDock(dockOptions);
  }

  // jQuery ready
  $(function(){

    // DOM ready
    $(document).ready(function($){

      $('#image-gallery-button').click(function (event) {
        event.preventDefault();
        blueimp.Gallery($('#gallery-links a'), $('#blueimp-gallery').data());
      });


      // save the html
      
      menu(true);

    });

    $(window).resize(function(){
      menu();
    });

  });

}(jQuery, ko, window, document);