$('.my-popup').magnificPopup({ 
  // Delay in milliseconds before popup is removed
  removalDelay: 300,

  // Class that is added to popup wrapper and background
  // make it unique to apply your CSS animations just to this exact popup
  mainClass: 'mfp-fade'
});

$('#open-popup').magnificPopup({
    items: [
      {
        src: 'images/bienvenida/1.jpg',
      },
      {
        src: 'images/bienvenida/2.jpg',
        
      },
      {
        src: 'images/bienvenida/3.jpg',
        
      },
      {
        src: 'images/bienvenida/4.jpg',
        
      },
      {
        src: 'images/bienvenida/5.jpg',
        
      },
      {
        src: 'images/bienvenida/6.jpg',
        
      },
      {
        src: 'images/bienvenida/7.jpg',
        
      }      
    ],
    gallery: {
      enabled: true
    },
    type: 'image', // this is a default type
     mainClass: 'mfp-fade'
});

