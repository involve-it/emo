module.exports = (grunt) ->
  #grunt.registerTask 'build-src', '', () ->
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    coffee: #https://github.com/gruntjs/grunt-contrib-coffee
      engine:
        files: [
          {
            expand: true,
            options:
              sourceMap: false,
              bare: true,
            cwd: '<%= pkg.directories.source %>/engine',
            src: ['**/*.coffee'],
            dest: '<%= pkg.directories.builds.src %>/engine',
            ext: '.js'
          }
        ]
    requirejs:
      compile:
        options:
          baseUrl: '<%= pkg.directories.builds.src %>/engine',
          name: './_engine_.js',
          #mainConfigFile: '<%= pkg.directories.automation.rjs.build_files %>/engine.build.js',
          out: 'engine/_engine_.js'
          #out: '<%= pkg.directories.builds.dist %>/engine/_engine_.js'
    concat:
      dynamic_mappings:
        files:
          []

  coffee = grunt.config.get('coffee') || {};
  coffee['engine'] = confObj.coffee.engine
  grunt.config.set('coffee', coffee)

  requirejs = grunt.config.get('requirejs') || {};
  requirejs['engine'] = confObj.requirejs
  grunt.config.set('requirejs', requirejs)