module.exports = (grunt) ->
  #grunt.registerTask 'build-src', '', () ->
  srcDir = '<%= pkg.directories.builds.src %>'
  destDir = '<%= pkg.directories.builds.prod %>'
  optimizeConst = 'none'
  #optimizeConst = 'uglify'
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      files: [
        {src: srcDir + '/index.html', dest: destDir + '/index.html'},
        {src: srcDir + '/main.js', dest: destDir + '/main.js'},
        {
          expand: true,
          cwd: srcDir + '/libs/',
          src: ['**/*.js'],
          dest: destDir + '/libs'
        }
        {
          expand: true,
          cwd: srcDir + '/views/',
          src: ['**/*.js'],
          dest: destDir + '/views'
        }
      ]
    requirejs:
      api:
        options:
          name: '_api_',
          baseUrl: srcDir + '/api/',
          out: destDir + '/api/_api_.js',
          optimize: optimizeConst
      art:
        options:
          name: '_art_',
          baseUrl: srcDir + '/art/',
          out: destDir + '/art/_art_.js',
          optimize: optimizeConst
      core:
        options:
          name: '_core_',
          baseUrl: srcDir + '/core/',
          mainConfigFile: destDir + '/main.js',
          out: destDir + '/core/_core_.js',
          optimize: optimizeConst
      engine:
        options:
          name: '_engine_',
          baseUrl: srcDir + '/engine/',
          out: destDir + '/engine/_engine_.js',
          optimize: optimizeConst
      gui:
        options:
          name: '_gui_',
          baseUrl: srcDir + '/gui/',
          out: destDir + '/gui/_gui_.js',
          optimize: optimizeConst

  concat = grunt.config.get('requirejs') || {};
  concat['pacreq'] = confObj.concat
  grunt.config.set('concat', concat)

  #requirejs = grunt.config.get('requirejs') || {};
  #requirejs1['require_main1'] = confObj.requirejs
  #requirejs = _.extend(requirejs, confObj.requirejs)
  grunt.config.set('requirejs', confObj.requirejs)

  #grunt.registerMultiTask 'requirejs', 'Builds all concatenated packages as  _[package]_.js for each package (see in main.js), puts it to prod', ()->
  grunt.registerTask 'build-package-require', 'Builds all concatenated packages as  _[package]_.js for each package (see in main.js), puts it to prod', () ->
    #grunt.task.run('concat:pacreq')
    grunt.task.run('requirejs:api')
    grunt.task.run('requirejs:art')
    grunt.task.run('requirejs:core')
    grunt.task.run('requirejs:engine')
    grunt.task.run('requirejs:gui')