module.exports = (grunt) ->
  #grunt.registerTask 'build-src', '', () ->
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    coffee: #https://github.com/gruntjs/grunt-contrib-coffee
      files: [
        {
          expand: true,
          options:
            sourceMap: false,
            bare: true,
          cwd: '<%= pkg.directories.source %>/core',
          src: ['**/*.coffee'],
          dest: '<%= pkg.directories.builds.prod %>/core',
          ext: '.js'
        }
      ]
    requirejs:
      options:
        name: '_core_',
        baseUrl: '<%= pkg.directories.builds.src %>/core/',
        #mainConfigFile: '<%= pkg.directories.builds.prod %>/core/core.build.js',
        #mainConfigFile: '<%= pkg.directories.builds.prod %>/core/_core_.js',
        out: '<%= pkg.directories.builds.prod %>/core/_core_.js',
        optimize: 'none'
        #baseUrl: '<%= pkg.directories.builds.prod %>/core',
        #out: '<%= pkg.directories.builds.dist %>/engine/_engine_.js',
        #mainConfigFile: '<%= pkg.directories.automation.rjs.build_files %>/engine.build.js',

  coffee = grunt.config.get('coffee') || {};
  coffee['require_core'] = confObj.coffee
  grunt.config.set('coffee', coffee)

  requirejs = grunt.config.get('requirejs') || {};
  requirejs['require_main'] = confObj.requirejs
  grunt.config.set('requirejs', requirejs)

  grunt.registerTask 'build-core-require', 'Builds concatenated _core_.js, puts it to production', () ->
    grunt.task.run('requirejs:require_main')
    #grunt.task.run('coffee:require_core', 'requirejs:require_main')