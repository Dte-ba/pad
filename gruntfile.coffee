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
    watch:
      less:
        files: [ '/pad/css/*.less' ]
        tasks: [ 'less' ]

  grunt.registerTask 'default', ['less', 'watch']