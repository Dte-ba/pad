var request = require('request');
var socket = require('socket.io-client')('http://localhost:8000');
var async = require('async');

socket.once('status', function(info){
  if (info.status !== "complete") {
    return;
  }
  run();
});

function run(){

  console.log(' * runnig');
  console.log(' - retrieving the packages information');
  request
    .get('http://localhost:8000/package', function(error, response, body){
      if (response.statusCode == 200) {
        var packages = JSON.parse(body);
        console.log('   - %s packages retrieved', packages.length);
        testPackages(packages);
      } else {
        throw new Error('Something wrong!');  
      }
      
    });
};

function testPackages(packages) {
  console.log(' - testing packages content');

  async
    .eachSeries(packages, function(p, callback){

      console.log('   - retrieving %s', p.uid);
      
      request.get('http://186.148.83.3:24580/package?content=' + p.uid, function(error, response, body){
        if (!error && response.statusCode == 200) {
          console.log('      - %s response success!', p.uid);
          callback();
        } else {
          callback(error);
        }
      });

    }, function(err){ 

      process.exit(0);
    });
};