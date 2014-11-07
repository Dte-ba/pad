/**
 * The arbor page of PAD
 */

(function($, ko, arbor, window, document, undefined){
  "use strict";
  
  var Renderer = function(canvas){
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem

    var that = {
      init:function(system){
        particleSystem = system
        particleSystem.screenSize(canvas.width, canvas.height) 
        particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side
        that.initMouseHandling()
      },
      
      redraw:function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.fillStyle = "white"
        //ctx.fillRect(0,0, canvas.width, canvas.height)
        
        particleSystem.eachEdge(function(edge, pt1, pt2){
          ctx.strokeStyle = "rgba(0,0,0, .333)"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.stroke()
        })

        particleSystem.eachNode(function(node, pt){
          var w = 10
          ctx.fillStyle = (node.data.alone) ? "orange" : "black"
          ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w)
        })          
      },
      
      initMouseHandling:function(){
        var dragged = null;
        var _mouseP;

        var handler = {
          clicked:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null){
              // while we're dragging, don't let physics move the node
              dragged.node.fixed = true
            }

            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }
        
        // start listening
        $(canvas).mousedown(handler.clicked);

      },
      
    }
    return that
  }

  function init(){
    var sys = arbor.ParticleSystem(1000, 600, 0.5);
    sys.parameters({gravity:true});
    sys.renderer = Renderer("#arborCanvas");

    $.getJSON('/nodes')
      .fail(function(err){
        console.error(err);
      })
      .done(function(data){
        
        console.log(data.length);
        data.forEach(function(p){
          sys.addNode(p.uid);
          p.blcoksEdges.forEach(function(u){
            sys.addEdge(p.uid, u);
          });
        })
      })

  }

  var cWidth = 800
    , cHeight = 600;

  function refresh() {

    cWidth = $('#content').width();

    $('#arborCanvas').attr('width', cWidth);
    $('#arborCanvas').attr('height', cHeight);

  }

  // jQuery ready
  $(function(){

    // DOM ready
    $(document).ready(function($){
      refresh();
      init();
    });

    $(window).resize(function($){
      refresh();
    });

  });

})(jQuery, ko, arbor, window, document);

