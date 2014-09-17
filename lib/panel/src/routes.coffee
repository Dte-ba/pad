module.exports = (app) ->
  app.get '/panel', (req, res) ->
    res.render 'index', layout: null
  app.get '/panel/ipaddress', (req, res, next) ->
    ip = require 'ip'
    res.json ipaddress: ip.address(), port: 3220
  app