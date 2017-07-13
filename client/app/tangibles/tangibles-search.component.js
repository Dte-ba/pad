import _ from 'lodash';
import $ from 'jquery';

export default class TangiblesSearchComponent {
  /*@ngInject*/
  constructor($scope, $state, $stateParams, $location, $timeout, $http, seoService) {
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.$timeout = $timeout;
    this.$http = $http;
    this.seoService = seoService;

    this.texto = $stateParams.texto;
    this.searchText = this.texto;

    this.trimTexto = _.trim(this.texto);
    this.iniciando = true;
    this.query = {};
  }

  $onInit(){
    this.$timeout(() => {
      //_search();

      this.$scope.$watch(() => { return this.searchText; }, () => {
        this._search();
      });

      this.iniciando = false;
      $('#searchInput').focus();
    }, 500);
  }

  _search(){
    if (this.searchText === undefined) {
      return;
    }
    /*if (this.searchText === trimTexto) {
      return;
    }*/
    //this.$state.go('tangibles.buscar', {texto: this.searchText });
    this.$stateParams['texto'] = this.searchText;
    this.$state.params['texto'] = this.searchText;
    this.$location.search('texto', this.searchText);

    this._realseSearch(this.searchText);
  }

  search(){
    this._search();
  }

  _realseSearch(target){
    this.trimTexto = _.trim(target);
    var texto = _.escapeRegExp(this.trimTexto);

    this.query = { 
      $or: [
        { 'content.tags': { $regex: texto.scapeRegex() } },
        { 'content.content': { $regex: texto.scapeRegex() } },
        { 'content.title': { $regex: texto.scapeRegex() } },
        { 'uid': { $regex: texto.scapeRegex() } }
      ]
    };

    this.seoService.title('Búsqueda para '+target+' | PAD');
    this.seoService.description('Resultados de busqueda para ' + target);
    this.seoService.keyboards(['contenido digital', 'busqueda', 'diseño curricular', 'tag', 'palabra clave', target]);
  }
}