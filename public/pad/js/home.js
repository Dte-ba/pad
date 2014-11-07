;
/*
 * PAD home page
 */

!function($, ko, window, document, undefined){
  "use strict";

  var getRotationDegrees = function(obj) {
      var matrix = obj.css("-webkit-transform") ||
      obj.css("-moz-transform")    ||
      obj.css("-ms-transform")     ||
      obj.css("-o-transform")      ||
      obj.css("transform");
      if(matrix !== 'none') {
          var values = matrix.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } else { var angle = 0; }

      if(angle < 0) angle +=360;
      return angle;
  };

  var convertDegs = function (type, num) {
    if (type == "rads") {
      return num*180/Math.PI;
    }

    if (type == "degs") {
      return num*Math.PI/180;
    }
  };

  $(function(){
    $(document).ready(function(){

      $('#main-menu').roulette();

      $('#main-menu').click(function(){
        var rotation = getRotationDegrees($('#main-menu .border-roulette'));
        
        $('#main-menu').toggleClass('inactive');

        $('#main-menu .border-roulette').css({
            //webkitTransform: 'rotate('+now+'deg)',
            //mozTransform: 'rotate('+now+'deg)',
            //msTransform: 'rotate('+now+'deg)',
            //oTransform: 'rotate('+now+'deg)',
            transform: 'rotate('+rotation+'deg)'
        });

        $('#main-menu').roulette({
          initAngle: convertDegs("degs", rotation) 
        });

      });

    });
  });

}(jQuery, ko, window, document)