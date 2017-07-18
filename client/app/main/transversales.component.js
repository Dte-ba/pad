export default class TransversalesComponent {
  /*@ngInject*/
  constructor($http) {
  	this.$http = $http;
    this.areaCollection = [];
  }

  $onInit(){
  	this.$http
      .get('/api/design/transversales')
      .then(response => {
        	this.areaCollection = response.data;
      });
  }

}
