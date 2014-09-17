module.exports = (app) ->
  app.get '/panel', (req, res) ->
    res.render 'panel.ejs', layout: null
  app.get '/panel/repos', (req, res) ->
    repos = if app.repositories? then Object.keys(app.repositories) else []
    res.json repos
  app.get '/panel/packages/:name', (req, res, next) ->
    {name} = req.params
    if app.repositories
      r = app.repositories[name]
    else
      return next new Error "No repositories loaded"
    return next new Error "Invalid repo name #{r}" if !r
    {instance} = r
    instance
      .on 'error', (er) ->
        return next err
      .once 'ready', () ->
        instance.packages.execQuery 'all', (err, data) ->
          return next err if err
          res.json data
    instance.read false
  app
  app.get '/panel/ipaddress', (req, res, next) ->
    ip = require 'ip'
    res.json ipaddress: ip.address(), port: 3220