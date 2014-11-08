;
// common js for each pages

!function($, ko, window, document, undefined){
  "use strict";

  $(function(){
    $(document).ready(function(){

      $(document).click(function(){
        if ($('#aside-menu').hasClass('active')) {
          $('#aside-menu').removeClass('active');
        }
      });

      $('#aside-menu ul li a').tooltip();

      $('#aside-menu').click(function(e){
        $('#aside-menu').toggleClass('active');
        event.stopPropagation();
      });

    });
  });
  
}(jQuery, ko, window, document)