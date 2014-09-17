module.exports = (grunt) ->
  'use strict'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-less'

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    less:
      pad:
        options:
            compress: true
            clean: false
        files:
          "public/pad/css/site.css": ['public/pad/css/bienvenida.less', 'public/pad/css/dock.less', 'public/pad/css/app.less', 'public/pad/css/pad.less']
    coffee:
      panel:
        files:
          'lib/panel/routes.js': 'lib/panel/src/routes.coffee'
          'public/panel/js/app.js': [
            'lib/panel/src/app/app.coffee'
            'lib/panel/src/app/directives.coffee'
            'lib/panel/src/app/factory.coffee'
            'lib/panel/src/app/controllers.coffee'
            'lib/panel/src/app/services.coffee'
          ]
    watch:
      less:
        files: [ '/pad/css/*.less' ]
        tasks: [ 'less' ]
      coffee:
        files: [ 'lib/panel/src/**/*.coffee' ]
        tasks: [ 'coffee' ]

  grunt.registerTask 'default', ['less', 'coffee', 'watch']