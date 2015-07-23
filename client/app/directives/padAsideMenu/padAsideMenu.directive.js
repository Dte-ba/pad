'use strict';

angular.module('padApp')
  .directive('padAsideMenu', function () {
    return {
      template: [
          '  <ul>',
          '    <li data-target="bienvenida">',
          '      <a ui-sref="bienvenido.presentacion" data-toggle="tooltip" data-placement="top" title="Bienvenida"><div class="expand"></div></a>',
          '    </li>',
          '    <li data-target="cloud">',
          '      <a href="#/tangibles/?area=PAD en acción&axis=PAD en acción" data-toggle="tooltip" data-placement="right" title="PAD en acción"><div class="expand"></div></a>',
          '    </li>',
          '    <li data-target="orientaciones">',
          '      <a ui-sref="orientacion" data-toggle="tooltip" data-placement="right" title="Orientaciones"><div class="expand"></div></a>',
          '    </li>',
          '    <li data-target="transversales">',
          '      <a ui-sref="transversales" data-toggle="tooltip" data-placement="right" title="Transversales"><div class="expand"></div></a>',
          '    </li>',
          '    <li data-target="contacto">',
          '      <a href="http://servicios2.abc.gov.ar/lainstitucion/organismos/direccion_de_tecnologia_educativa/pad/contacto.html"  target="_blank"',
          '         data-toggle="tooltip" data-placement="bottom" title="Contacto"><div class="expand"></div></a>',
          '    </li>',
          '  </ul>',
          '  <div class="center-aside-menu"></div>',
        ].join('\n'),
      restrict: 'A',
      link: function (scope, element) {
        $('a[data-toggle="tooltip"]').tooltip();
        
        element.bind('click', function() {
          element.toggleClass('active');
          event.stopPropagation();
        });

        angular
          .element(window.document)
          .bind('click', function() {
          
          if (element.hasClass('active')) {
            element.removeClass('active');
          }

        });
          
      }
    };
  });