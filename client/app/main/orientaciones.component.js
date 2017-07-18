export default class OrientacionesComponent {
  /*@ngInject*/
  constructor($http) {
  	this.$http = $http;
  }

  $onInit(){
  	this.$http
		  .get('/api/info')
		  .then((response) => {
		  	var info = response.data;
		    this.version = info.version;
		    this.kernel = info.kernel;
		    this.repository = info.repository;
		    this.isDesktop = info.mode === 'desktop';
		  });
  }
}
