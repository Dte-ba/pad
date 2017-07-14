import $ from 'jquery';

export default class TangiblesVerComponent {
  /*@ngInject*/
  constructor($rootScope, $state, $stateParams, $http, $timeout, Tangible, Favoritos, seoService) {

  	this.Tangible = Tangible;
  	this.$http = $http;
  	this.seoService = seoService;
  	this.$timeout = $timeout;
    this.Favoritos = Favoritos;
  	this.uid = $stateParams.uid;
    
    $http
      .get('/api/info')
      .then((response) => {
      	let info = response.data;
        this.isDesktop = info.mode === 'desktop';
      });

    this.accedio = false;
  }

  $onInit(){
    this.Tangible
      .findByUid(this.uid)
      .then((data) => {
        this.tangible = data;
       
        if (this.tangible === undefined) {
        	this.noTangible = true;
          return;
        }

        var d = this.tangible.content.observations;
        var s = this.tangible.content.source;
        this.tangible.hasObservations = d !== '' && d !== undefined && d !== null;
        var hasSource = s !== '' && s !== undefined && s !== null;
        
        if (hasSource){
          this.$timeout(() => {
            //$('#source').linkify();
            $('[data-toggle="tooltip"]').tooltip();
          });
        }

        var b = this.tangible.content.block;

        var regex = /sin\sespecificar/i;
        this.tangible.content.blockSinEspecificar = regex.test(b);

        this.seoService.title(this.tangible.content.title + ' | ' + this.tangible.content.area);
        this.seoService.description(this.tangible.content.content);
        this.seoService.keyboards(this.tangible.content.tags);
      });

    this.take = 10;
    this.query = {};
    this.showRel = false;
  }

  addFavoritos(){
    this.tangible.like = this.Favoritos.toggle(this.tangible.uid);
  }
  
  relFirst(){
    if (this.tangible === undefined) {
      return;
    }

    this.showRel = true;

    var tags = this.tangible.content.tags;

    if (typeof tags === 'string'){
      tags = tags.spli(',');
    }

    var mtags = _.map(tags, function(t){
      return _.escapeRegExp(_.trim(t));
    });

    var etag = '(' + mtags.join('|') + ')';
    
    this.query = { 'content.tags': { $regex: etag }, $not: { uid: { $regex: this.uid } } };
    $('#header-relations').hide();
  };

}