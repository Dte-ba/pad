var request = require('request');
var socket = require('socket.io-client')('http://localhost:8000');

var chai = require('chai');
var async = require('async');
var expect = chai.expect;
var assert = chai.assert;

var packages;

describe('PAD', function(){
  "use strict";

  beforeEach(function(done){
    socket.once('status', function(info){
      if (info.status !== "complete") {
        return;
      }
      done();
    });
  });

  describe('get packages', function(){

    it('should get packages without error', function(){
      request
      .get('http://localhost:8000/package', function(error, response, body){
        if (response.statusCode == 200) {
          var info = JSON.parse(body);
          expect(info).to.have.length.above(1);
        }
      });

    });

  });

  describe('#content', function(){
    
    it('should be retrive all packages without error', function(done){


      request
        .get('http://localhost:8000/package', function(error, response, body){
          if (response.statusCode == 200) {
            var packages = JSON.parse(body);
            
            async
            .eachSeries(packages, function(p, callback){
              callback();
            }, function(err){ 
              done();
            });

          } else {
            throw new Error('Unable to connect to server at http://localhost:8000/package');
          }
        });

    });
      
  });

});