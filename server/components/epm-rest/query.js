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
    if (key === '$in') {
      q[key] = value;
    } else if (_.isObject(value) || _.isArray(value)) {
      q[key] = transformQuery(value);
    } else if (key === '$regex') {
      q[key] = new RegExp(value, 'ig');
    } else {
      q[key] = value;
    }

  });

  return q;
};

module.exports =  {

query: function(req, res, next){
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
  },
  queryp: function(req, res, next){
    var rname = req.params.repository;

    manager
      .get(rname)
      .progress(function(info){

      })
      .fail(function(err){
        next(err);
      })
      .done(function(repo){
        var qobj = req.body;

        var q = transformQuery(qobj.query);
        var take = qobj.take;
        var skip = qobj.skip;

        repo
        .find(q, function(err, items){
          if (err) {
            return next(err);
          }
          var total = items.length;
          if (take !== undefined && skip !== undefined) {
            var taked = _(items).slice(skip, skip+take).value();
            
            //console.log('items.length ', taked.length);
            //console.log('skip ', skip);
            //console.log('take ', take);

            res.json({items: taked, total: total, skip: skip});
          } else {
            res.json({items: items, total: total, take: take });  
          }
          
        });
        
      });
    }

};