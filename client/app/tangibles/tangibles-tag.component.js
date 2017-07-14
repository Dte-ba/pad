
export default class TangiblesTagComponent {
  /*@ngInject*/
  constructor($scope, $stateParams, $timeout, seoService) {
    this.tag = $stateParams.tag;
    this.etag = _.escapeRegExp(_.trim(this.tag));

    this.take = 10;
    this.query = {};
    this.iniciando = true;

    seoService.title('Palabra clave '+$stateParams.tag+' | PAD');
    seoService.description('Resultados para palabra clave ' + $stateParams.tag);
    seoService.keyboards(['contenido digital', 'diseño curricular', 'tag', 'palabra clave', $stateParams.tag]);
  }

  $onInit(){
    this.query = { 'content.tags': { $regex: this.etag } };
    this.iniciando = false;
  }

}