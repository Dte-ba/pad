export default class TangiblesDesignComponent {
  /*@ngInject*/
  constructor($rootScope, $stateParams, $timeout, AreaFactory, seoService) {
    this.$rootScope = $rootScope;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.AreaFactory = AreaFactory;
		this.seoService = seoService;
  }

  $onInit(){
    this.area = this.$stateParams.area;
    this.sarea = this.AreaFactory.alias(this.$stateParams.area);
    this.axis = this.$stateParams.axis;
    this.block = this.$stateParams.block;

    var regex = /sin\sespecificar/i;
    this.blockSinEspecificar = regex.test(this.block);

    this.iniciando = true;

    this.query = {};
    this.take = 15;
    
    var sections = [this.area];

    var q = [];

    if (this.area !== undefined){
      q = this.AreaFactory.query(this.area);
    }

    if (this.axis !== undefined){
      _.each(q, (a) => {
        a['content.axis'] = this.axis;
      });
      sections.push(this.axis);
    }

    if (this.block !== undefined){ 
      _.each(q, (a) => {
        var ba = this.AreaFactory.inverseBlockAlias(this.area, this.axis, this.block);
        if (ba !== this.block){
          a['content.block'] = { $in: [ba, this.block]};
        } else {
          a['content.block'] = this.block;  
        }
        
      });
      sections.push(this.block);
    }

    if (q.length === 1) {
      q = q[0];
    } else if (q.length > 1) {
      q = { $or: q};
    }

    this.$timeout(() => {
      this.query = q;
      this.iniciando = false;
    }, 500);

    this.seoService.title(sections.join(' - ') + ' | PAD');
    this.seoService.description('Contenido correspondiente a  ' + sections.join(' - '));
    this.seoService.keyboards(['contenido digital', 'diseño curricular'].concat(sections));
  }
}