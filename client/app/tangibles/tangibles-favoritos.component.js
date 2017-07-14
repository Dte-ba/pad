
export default class TangiblesFavoritosComponent {
  /*@ngInject*/
  constructor($scope, $rootScope, seoService) {
    this.take = 10;
    this.query = {};
    this.iniciando = true;
    this.$rootScope = $rootScope;
    
    seoService.title('Mis pines | PAD');
    seoService.description('Contenido en favoritos');
    seoService.keyboards(['contenido digital', 'busqueda', 'diseño curricular', 'favoritos']);
  }

  $onInit(){
    //var favs = Favoritos.getFavoritos();
    this.query = { 'uid': { '$in': this.$rootScope.favoritos } };
    this.iniciando = false;
  }

}