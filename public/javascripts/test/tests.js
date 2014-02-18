
var ContentTester = function(uri, method) {
  var self = this;

  self.uri = uri;

  method = method || 'GET';

  self.times = 0;

  self.successHandlers = [];
  self.errorsHandlers = [];

  self.success = function(fn) { 
    self.successHandlers.push(function(){
      fn.apply(self, [this.arguments]);  
    });
    return self; 
  };

  self.error = function(fn) { 
    self.errorsHandlers.push(function(){
      fn.apply(self, [this.arguments]); 
    });
    return self; 
  };

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (self.times++ > 0) return;
    
    for (var i=0; i < self.successHandlers.length; i++) {
      self.successHandlers[i]();
    }
  };
  xhr.onerror = function(){
    if (self.times++ > 0) return;
    
    for (var i=0; i< self.errorsHandlers.length;i++) {
      self.errorsHandlers[i]();
    }
  };
 
  self.test = function(){
    xhr.open(method, self.uri);
    xhr.responseType = 'blob';
    xhr.send();

    return self;
  };

  return self;
};

asyncTest( "getting packages", function() {

  $.get('/metadata/packages', function(data){
    ok( data.length > 0, "packages retrieved!" );
    start();
  });

});

asyncTest( "getting words", function() {

  $.get('/metadata/words', function(data){
    ok( data.length > 0, "words retrieved!" );
    start();
  });

});

var TesterPackage = function(uid) {
  var self = this;

  self.uid = uid;
  //self.data = data;

  self.test = function() {
    asyncTest( "TEST " + self.uid, 4, function() {

      // the metadata
      $.get('/package/' + self.uid, function(data) {
        ok( data.uid === self.uid, "package retrieved!" );
        start();
      });

      // front image
      var front = new ContentTester('/package/' + self.uid + '/image/front');

      front
      .success(function(){
        ok( true, "Image front retrived!" );
      })
      .error(function(){
        ok( false, "Can not retrive the front image!" );
      })
      .test();

      // imgContent image
      var imgContent = new ContentTester('/package/' + self.uid + '/image/content');

      imgContent
      .success(function(){
        ok( true, "Image content retrived!" );
      })
      .error(function(){
        ok( false, "Can not retrive the content image!" );
      })
      .test();

      // content image
      var content = new ContentTester('/package/' + self.uid + '/content');

      content
      .success(function(){
        ok( true, "Image content retrived!" );
      })
      .error(function(){
        ok( false, "Can not retrive the content image!" );
      })
      .test();

    });
  };

  return self;
};

$.get('/metadata/packages', function(data) {
  
  for (var i=0;i < data.length; i++) {
    var p = data[i];
    
    (new TesterPackage(p.uid)).test();
    
  }

});
