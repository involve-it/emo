module.exports = (grunt) ->
  srcDir = '<%= pkg.directories.builds.src %>'
  destDir = '<%= pkg.directories.builds.prod %>'
  distrDir = '<%= pkg.directories.builds.dist %>'
  optimizeConst = 'none'
  #optimizeConst = 'uglify'
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      libs:
        options:
          process: (src, filepath)->
            #console.log(src);
            return src;
          banner: '(function(global) { \n'
          footer: '\n })(ej$);'
        files: [
          src: [srcDir + '/libs/main.js', srcDir + '/libs/emitter.js']
          dest: destDir + '/libs.js'
        ]
      engine:
        core:
          options:
            process: (src, filepath)->
              console.log(src);
              return src;
            banner: '(function(global) { \n'
            footer: '\n })(ej$);'
          files: [
            src: [srcDir + '/engine/core/main.js', srcDir + '/engine/core/helpers.js', srcDir + '/engine/core/config.js', srcDir + '/engine/core/init.javascript.js']
            dest: destDir + '/engine.core.js'
          ]
        classes:
          options:
            process: (src, filepath)->
              #console.log(src);
              return src;
            banner: '(function(global) { \n'
            footer: '\n })(ej$);'
          files: [
            src: [srcDir + '/engine/classes/abstract.controller.js', srcDir + '/engine/classes/abstract.context.js', srcDir + '/engine/classes/abstract.emotion.js', srcDir + '/engine/classes/abstract.processor.js',
              srcDir + '/engine/classes/abstract.state.js', srcDir + '/engine/classes/affect.word.js', srcDir + '/engine/classes/emotion.js', srcDir + '/engine/classes/emotion.state.js']
            dest: destDir + '/engine.classes.js'
          ]
        controllers:
          options:
            process: (src, filepath)->
              return src;
            banner: '(function(global) { \n'
            footer: '\n })(ej$);'
          files: [
            src: [srcDir + '/engine/controllers/main.js', srcDir + '/engine/controllers/app.js', srcDir + '/engine/controllers/properties.manager.js']
            dest: destDir + '/engine.controllers.js'
          ]
      all:
        src: [distrDir + '/js/libs.js', distrDir + '/js/engine.js', distrDir + '/js/processors.js', distrDir + '/js/modules.js'],
        dest: distrDir + '/js/emojs.js'


  concat = grunt.config.get('concat') || {};
  concat['libs'] = confObj.concat.libs
  concat['engine.core'] = confObj.concat.engine.core
  concat['engine.classes'] = confObj.concat.engine.classes
  concat['engine.controllers'] = confObj.concat.engine.controllers
  concat['all'] = confObj.concat.all
  grunt.config.set('concat', concat)

  grunt.registerTask 'build-emojs-require', 'Builds all concatenated packages without require, puts it to prod', () ->
    grunt.task.run('concat:libs')
    grunt.task.run('concat:engine.core')
    grunt.task.run('concat:engine.classes')
    grunt.task.run('concat:engine.controllers')
