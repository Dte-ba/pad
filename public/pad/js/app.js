;
// common js for each pages

!function($, io, ko, window, document, undefined){
  "use strict";

  var socket = io();

  $(function(){
    $(document).ready(function(){

      socket.on('status', function(info){
        if (info.status === "complete") {
          $('body').removeClass('loading');
        }
      });

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
  
}(jQuery, io, ko, window, document)