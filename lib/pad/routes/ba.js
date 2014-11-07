
module.exports = ba;

function ba(req, res){
  var data = require('../data/entidades.json');

  var filtered = Object.keys(data).filter(function(an){
    return data[an].encuadre !== undefined;
  });

  var encuadres = filtered.map(function(an){
    var area = data[an];
    return {
        img: '/img/' + area.alias.replace(/\s+/g, '_') + '/encuadre.png',
        alt: 'Encuadre para ' + an,
        href: area.encuadre
      };
  });

  encuadres.push({
    img: '/img/artistica/encuadre.png',
    alt: 'Encuadre para artistica',
    href: '/files/encuadre_artistica.pdf'
  });

  res.render('ba', { encuadres: encuadres } );
}