// /explorar
module.exports = bienvenido;

function bienvenido(req, res){
  var view = req.params.view;

  var data = require('../data/entidades.json');

  var filtered = Object.keys(data).filter(function(an){
    return data[an].encuadre !== undefined;
  });

  var encuadres = filtered.map(function(an){
    var area = data[an];
    return {
        img: '/pad/img/' + area.alias.replace(/\s+/g, '_') + '/encuadre.png',
        alt: 'Encuadre para ' + an,
        href: '/pad' + area.encuadre
      };
  });

  encuadres.push({
    img: '/pad/img/artistica/encuadre.png',
    alt: 'Encuadre para artistica',
    href: '/pad/files/encuadre_artistica.pdf'
  });

  if (view === undefined) {
    view = 'Presentación'
  }

  var vm = {
    view: view,
    
    isP: view === 'Presentación',
    isA: view === 'Acerca de',
    isM: view === 'Marco General',
    isE: view === 'Encuadre',

    pClass: (view === 'Presentación' ? 'active' : ''),
    aClass: (view === 'Acerca de' ? 'active' : ''),
    mClass: (view === 'Marco General' ? 'active' : ''),
    eClass: (view === 'Encuadre' ? 'active' : ''),

    pHref: (view === 'Presentación' ? '' : '/bienvenido/Presentación'),
    aHref: (view === 'Acerca de' ? '' : '/bienvenido/Acerca de'),
    mHref: (view === 'Marco General' ? '' : '/pad/files/PAD con nomina y bibliografia.pdf'),
    eHref: (view === 'Encuadre' ? '' : '/bienvenido/Encuadre'),

    encuadres: encuadres

  };

  res.render('bienvenido', vm);
}