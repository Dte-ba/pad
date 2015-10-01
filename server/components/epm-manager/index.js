'use strict';

var fs = require('fs');
var path = require('path');
var Epm = require('epm');
var Q = require('q');

var manager = {};

var config = require('../../config/environment');

var createDef = Q.defer();
var loading = false;

// keep repository instances
var _repos = {};

manager.load = function(){

  if (config.repository === undefined){
    throw new Error('Repository path is not defined');
  }

  loading = true;

  var repopath = config.repository || process.env.REPOSITORY_PATH;

  if (!fs.existsSync(path.join(repopath, '.epm'))){
    Epm.create({path: repopath, name: 'local', engine: 'epm-pad-engine' }, function(err){
      if (err) {
        console.log(err);
        var e = new Error('Error creating the repository');
        createDef.reject(e)
        throw e;
      }
      createDef.resolve(repopath);
    });
  } else {
    createDef.resolve(repopath);
  }

  return createDef.promise;
};

manager.get = function(name){
  var deferred = Q.defer();

  if (loading===false) {
    manager.load();
  }

  var repopath = config.repository;

  // first wait to create
  createDef
    .promise
    .done(function(){

      if (_repos[name] !== undefined){
        return deferred.resolve(_repos[name]);
      }

      Epm.finder.find(repopath, function(err, repos){
        var list = repos.filter(function(r){
          return r.name === name;
        });
        
        if (list.length === 0) {
          return deferred.reject(new Error('Unknown repository ' + name));
        }

        if (list.length > 1) {
          return deferred.reject(new Error('Multiple matches for ' + name + ' in the repository list'));
        }

        var info = list[0];
        var repo = new Epm(info.path);
        
        repo
          .load(true)
          .progress(deferred.notify)
          .fail(deferred.reject)
          .done(function(){
            _repos[name] = repo;
            deferred.resolve(_repos[name])            
          });
        
      });

    });

  return deferred.promise;
};

module.exports = manager;
