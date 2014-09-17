/**
 * The cloud page of PAD
 */

(function($, ko, window, document, undefined){
  "use strict";
  
  var cWidth = 800
    , cHeight = 600;

  function refresh() {

    cWidth = $('#content').width();

    $('#cloudCanvas').attr('width', cWidth);
    $('#cloudCanvas').attr('height', cHeight);

    if(!$('#cloudCanvas').tagcanvas({
      textColour: '#FDDFB3',
      outlineColour: '#1F7988',
      freezeActive: false,
      freezeDecel: false,
      clickToFront: false,
      reverse: true,
      depth: 1,
      frontSelect: true,
      maxSpeed: 0.015
    },'wordList')) {
      // something went wrong, hide the canvas container
      $('#cloudContainer').hide();
    }

  }

  // jQuery ready
  $(function(){

    // DOM ready
    $(document).ready(function($){
      refresh();
    });

    $(window).resize(function($){
      refresh();
    });

  });

})(jQuery, ko, window, document);

