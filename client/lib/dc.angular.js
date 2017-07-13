import angular from 'angular';

export default angular
  .module('dc.angular', [])
  .provider('seoService', function() {
      
      var _config ={
        title: '',
        description: '',
        keyboards: [],
        resetOnChange: true
      };

      this.config = function(ops){
        ops = ops || {};
        
        _config.title = ops.title || '';
        _config.description = ops.description || '';
        _config.keyboards = ops.keyboards || [];
        _config.resetOnChange = ops.resetOnChange || true;
      };

      this.$get = ['$rootScope', '$window', '$document', '$timeout', function($rootScope, $window, $document, $timeout) {
        
        var self = this;

        self.config = _config;

        self.title = '';
        self.description = '';
        self.keyboards = [];

        if (!$document) {
          $document = document;
        } else if ($document[0]) {
          $document = $document[0];
        }

        var title = function(value){

          if (value !== undefined && value !== null){
            self.title = value;

            //set on document
            $timeout(function(){
              $document.title = self.title || $document.title;
            });
          }

          return self.title;
        };

        var description = function(value){
          if (value !== undefined && value !== null){
            self.description = value;

            angular.element('meta[name=description]').remove();
            angular.element('head').append( '<meta name="description" content="'+self.description+'">' );
          }

          return self.description;
        };

        var keyboards = function(value, append){
          append = append || false;

          if (value !== undefined && value !== null){
            if ((self.keyboards instanceof Array) === false) {
              self.keyboards = [];
            }

            //convert to array
            if (typeof value === 'string') {
              value = [value];
            } else if ((value instanceof Array) === false){
              value = [];
            }

            if (append === true){
              self.keyboards = self.keyboards.concat(value);
            } else {
              self.keyboards = value;
            }

            angular.element('meta[name=keyboards]').remove();
            angular.element('head').append( '<meta name="keyboards" content="'+self.keyboards.join(',')+'">' );
          }

          return self.keyboards;
        };

        var reset = function(){
          title(_config.title);
          description(_config.description);
          keyboards(_config.keyboards); 
        };

        reset();

        $rootScope.$on('$stateChangeStart', function () {
          if (self.config.resetOnChange === true) {
           reset();
          }
        });

        $rootScope.$on('$routeChangeStart', function () {
          if (self.config.resetOnChange === true) {
           reset();
          }
        });

        return {
          title: title,
          description: description,
          keyboards: keyboards
        };

      }];

  }).name;