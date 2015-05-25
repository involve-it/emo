module.exports = (grunt) ->
  #grunt.registerTask 'build-src', '', () ->
  srcDir = '<%= pkg.directories.builds.src %>'
  destDir = '<%= pkg.directories.builds.prod %>'
  optimizeConst = 'none'
  #optimizeConst = 'uglify'
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      pacreq:
        files: [
          {src: srcDir + '/index.html', dest: destDir + '/index.html'},
          {src: srcDir + '/main.js', dest: destDir + '/main.js'},
          {
            expand: true,
            cwd: srcDir + '/libs/',
            src: ['**/*.js'],
            dest: destDir + '/libs'
          }
        ]
      temp:
        files: [
          #{src: destDir + '/input/main.js', dest: 'builds/dist/js/_input_.js'}
          #{src: destDir + '/core/main.js', dest: 'builds/dist/js/_core_.js'}
          #{src: destDir + '/output/main.js', dest: 'builds/dist/js/_output_.js'}
          #{src: destDir + '/engine/_engine_.js', dest: 'builds/dist/js/_engine_.js'}
          #{src: destDir + '/core/_core_.js', dest: 'builds/dist/js/_core_.js'}
          {src: destDir + '/engine.js', dest: 'builds/dist/js/engine.js'}
          {src: destDir + '/libs.js', dest: 'builds/dist/js/libs.js'}
          {src: destDir + '/processors.js', dest: 'builds/dist/js/processors.js'}
          {src: destDir + '/modules.js', dest: 'builds/dist/js/modules.js'}
          #{src: destDir + '/modules.js', dest: 'builds/dist/js/modules.js'}
          #{src: destDir + '/processors.js', dest: 'builds/dist/processors.js'}

          #{src: destDir + '/emo.js', dest: 'builds/prod/emo.js'}
          #{src: destDir + '/libs.js', dest: 'builds/prod/libs.js'}

        ]
      ###all:
        src: [destDir + '/core/main.js', destDir + '/input/main.js', destDir + '/output/main.js'],
        dest: 'builds/dist/js/emo.js',###

    requirejs:
      options:
        mainConfigFile: srcDir + '/main.js'
      engine:
        options:
          name: 'engine/main',
          baseUrl: srcDir + '/',
          out: destDir + '/engine.js',
          optimize: optimizeConst
          mainConfigFile: srcDir + '/engine/main.js'

      libs:
        options:
          mainConfigFile: srcDir + '/libs/main.js'
          name: 'libs/main',
          baseUrl: srcDir + '/',
          out: destDir + '/libs.js',
          optimize: optimizeConst
          insertRequire: ['libs/main']

      processors:
        options:
          name: 'processors/main',
          baseUrl: srcDir + '/',
          out: destDir + '/processors.js',
          optimize: optimizeConst
          mainConfigFile: srcDir + '/processors/main.js'
          #insertRequire: ['processors/main']

      modules:
        options:
          name: 'modules/main',
          baseUrl: srcDir + '/',
          out: destDir + '/modules.js',
          optimize: optimizeConst
          mainConfigFile: srcDir + '/modules/main.js'
          #insertRequire: ['modules/main']


#      modules:
#        options:
#          mainConfigFile: srcDir + '/libs/main.js'
#          name: 'libs/main',
#          baseUrl: srcDir + '/',
#          out: destDir + '/libs.js',
#          optimize: optimizeConst
#          insertRequire: ['libs/main']


  ###engine:
    options:
      name: 'engine/_engine_',
      baseUrl: srcDir + '/',
      out: destDir + '/engine/_engine_.js',
      optimize: optimizeConst
  gui:
    options:
      name: 'gui/_gui_',
      baseUrl: srcDir + '/',
      out: destDir + '/gui/_gui_.js',
      optimize: optimizeConst
  libs:
    options:
      name: 'libs/_libs_',
      baseUrl: srcDir + '/',
      out: destDir + '/libs/_libs_.js',
      optimize: optimizeConst###

  concat = grunt.config.get('requirejs') || {};
  concat['pacreq'] = confObj.concat.pacreq
  concat['temp'] = confObj.concat.temp
  #concat['all'] = confObj.concat.all
  grunt.config.set('concat', concat)

  requirejs = grunt.config.get('requirejs') || {};
  requirejs['engine'] = confObj.requirejs.engine
  requirejs['libs'] = confObj.requirejs.libs
  requirejs['processors'] = confObj.requirejs.processors
  requirejs['modules'] = confObj.requirejs.modules
  #requirejs = _.extend(requirejs, confObj.requirejs)
  grunt.config.set('requirejs', requirejs)

  #grunt.registerMultiTask 'requirejs', 'Builds all concatenated packages as  _[package]_.js for each package (see in main.js), puts it to prod', ()->
  grunt.registerTask 'build-emo-require', 'Builds all concatenated packages as  main.js for each package (see in main.js), puts it to prod', () ->
    grunt.task.run('concat:pacreq')
    grunt.task.run('requirejs:engine')
    grunt.task.run('requirejs:libs')
    grunt.task.run('requirejs:processors')
    grunt.task.run('requirejs:modules')
    grunt.task.run('concat:temp')