'use strict';

import $ from 'jquery';

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

  Object.equals = function( x, y ) {
    if ( x === y ) return true;
      // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
      // if they are not strictly equal, they both need to be Objects

    if ( x.constructor !== y.constructor ) return false;
      // they must have the exact same prototype chain, the closest we can do is
      // test there constructor.

    for ( var p in x ) {
      if ( ! x.hasOwnProperty( p ) ) continue;
        // other properties were tested using x.constructor === y.constructor

      if ( ! y.hasOwnProperty( p ) ) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

      if ( x[ p ] === y[ p ] ) continue;
        // if they have the same strict value or identity then they are equal

      if ( typeof( x[ p ] ) !== "object" ) return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

      if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
        // Objects and Arrays must be tested recursively
    }

    for ( p in y ) {
      if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        // allows x[ p ] to be set to undefined
    }
    return true;
  }

  String.prototype.scapeRegex = function(){
    var self = this;
    var specialChars = [
      { val:'a', regex: /[áàãâä]/g },
      { val:'e', regex: /[éèêë]/g },
      { val:'i', regex: /[íìîï]/g },
      { val:'o', regex: /[óòõôö]/g },
      { val:'u', regex: /[úùûü]/g },
      { val:'n', regex: /[ñ]/g },
      { val:'A', regex: /[ÁÀÃÂÄ]/g },
      { val:'E', regex: /[ÉÈÊË]/g },
      { val:'I', regex: /[ÍÌÎÏ]/g },
      { val:'O', regex: /[ÓÒÕÔÖ]/g },
      { val:'U', regex: /[ÚÙÛ]/g },
      { val:'N', regex: /[Ñ]/g }
    ];

    specialChars.forEach(function(r){
      self = self.replace(r.regex, r.val);
    });

    return self;
  };

})($, window, document);