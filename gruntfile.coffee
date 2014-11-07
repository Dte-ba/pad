module.exports = (grunt) ->
  'use strict'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    less:
      pad:
        options:
            compress: false
            clean: false
        files:
          "public/pad/css/pad.css": ['public/pad/css/pad.less']
      panel:
        options:
            compress: true
            clean: false
        files:
          "public/panel/css/panel.css": ['public/panel/css/panel.less']
    coffee:
      panel:
        files:
          'lib/panel/routes.js': 'lib/panel/src/routes.coffee'
          'public/panel/js/panel.js': [
            'lib/panel/src/app/app.coffee'
            'lib/panel/src/app/directives.coffee'
            'lib/panel/src/app/factory.coffee'
            'lib/panel/src/app/controllers.coffee'
            'lib/panel/src/app/services.coffee'
          ]
    uglify:
      qrcode:
        files:
          'public/vendor/js/qr/html5-qrcode.min.js': ['public/vendor/js/qr/html5-qrcode.js']
    watch:
      less:
        files: [ 'public/pad/css/*.less', 'public/panel/css/*.less' ]
        tasks: [ 'less' ]
      coffee:
        files: [ 'lib/panel/src/**/*.coffee' ]
        tasks: [ 'coffee' ]
      uglify:
        files: [ 'public/vendor/js/qr/html5-qrcode.js' ]
        tasks: [ 'uglify' ]

  grunt.registerTask 'default', ['less', 'coffee', 'uglify', 'watch']