;
/*
 * Utils
 */

(function($, window, document, undefined){
  'use strict';
  
  var Math = window.Math;

  Math.convertDegs = function(type, num){
    if (type == "rads") {
      return num*180/Math.PI;
    }

    if (type == "degs") {
      return num*Math.PI/180;
    }
  };

  $.fn.rotation = function(degs){

    if (degs === undefined) {
      var f = this.first();
      var elem  = $(f);
      
      var matrix = elem.css("-webkit-transform") ||
      elem.css("-moz-transform")    ||
      elem.css("-ms-transform")     ||
      elem.css("-o-transform")      ||
      elem.css("transform");

      if(matrix !== 'none') {
          var values = matrix.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } else { 
        var angle = 0; 
      }

      if (angle < 0) {
        angle +=360;
      }

      return angle;
    }

    return this.each(function(){
      var elem  = $(this);
      elem.css({
          '-webkit-transform': 'rotate('+degs+'deg)',
          '-moz-transform': 'rotate('+degs+'deg)',
          '-ms-transform': 'rotate('+degs+'deg)',
          '-o-transform': 'rotate('+degs+'deg)',
          'transform': 'rotate('+degs+'deg)'
      });
    });

  };

})(jQuery, window, document)