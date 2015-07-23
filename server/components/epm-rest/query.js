'use strict';

var _ = require('lodash');

var manager = require('../epm-manager');

var transformQuery = function(part){

  if (_.isArray(part)){
    var a = [];
    part.forEach(function(p){
      a.push(transformQuery(p))
    });
    return a;
  }

  var q = {};

  _.forIn(part, function(value, key) {

    if (_.isObject(value) || _.isArray(value)) {
      q[key] = transformQuery(value);
    } else if (key === '$regex') {
      q[key] = new RegExp(value, 'ig');
    } else {
      q[key] = value;
    }

  });

  return q;
};

module.exports =  function(req, res, next){
  var rname = req.params.repository;

  manager
    .get(rname)
    .progress(function(info){

    })
    .fail(function(err){
      next(err);
    })
    .done(function(repo){
      var q = transformQuery(req.body);

      repo
      .find(q, function(err, items){
        if (err) {
          return next(err);
        }
        res.json(items);
      });
    });

};