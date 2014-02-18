/**
 * The blocks page of PAD
 */
!function($, ko, _, window, undefined){
  "use strict";
  
  var cWidth = 800
    , cHeight = 600;

  function refresh() {

    /*
    $.get('/metadata/words', function(data){
      var words = _.map(data, function(item){
        return { text: item.word, size: 10 + Math.random() * 30 };
      });


      cloud.make({
        width: 1000,
        height: 800,
        font: "Helvetica",
        container: "#cloud-main",
        words: words
      });

    });*/
    
    $('#cloudCanvas').attr('width', cWidth);
    $('#cloudCanvas').attr('height', cHeight);

    if(!$('#cloudCanvas').tagcanvas({
      textColour: '#ffffff',
      outlineColour: '#ff9999',
      reverse: true,
      depth: 1.5,
      maxSpeed: 0.05
    },'wordList')) {
      // something went wrong, hide the canvas container
      $('#cloudContainer').hide();
    }

  }



  $(function(){
    
    cWidth = $('.container').width();

    refresh();

  });

}(jQuery, ko, _, window);

