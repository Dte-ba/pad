jQuery(document).ready(function($){
  // set up the options to be used for jqDock...
  var dockOptions =
    { align: 'left' // vertical menu, with expansion LEFT/RIGHT from the center
    , labels: 'br'  // add labels (override the 'tl' default)
    , inactivity: 4000 // set inactivity timeout to 4 seconds
    };
  // ...and apply...
  $('#menu').jqDock(dockOptions);
});
