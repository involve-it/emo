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
            src: [srcDir + '/engine/controllers/main.js', srcDir + '/engine/controllers/app.js']
            dest: destDir + '/engine.controllers.js'
          ]
        all:
          options:
            process: (src, filepath)->
              return src;
            banner: '(function(global) { \n'
            footer: '\n })(ej$);'
          src: [destDir + '/engine.core.js', destDir + '/engine.classes.js', destDir + '/engine.controllers.js', srcDir + '/engine/main.js'],
          dest: destDir + '/engine.js'
      processors:
        options:
          process: (src, filepath)->
            return src;
          banner: '(function(global) { \n'
          footer: '\n })(ej$);'
        files: [
          src: [ srcDir + '/processors/main.js', srcDir + '/processors/client/client.processor.js', srcDir + '/processors/client/controllers/main.js',
                 srcDir + '/processors/client/data/vendor/xml2json.js', srcDir + '/processors/client/data/file.reader.js', srcDir + '/processors/client/data/properties.manager.js', srcDir + '/processors/client/data/lexical.js', #reading data
                 srcDir + '/processors/client/controllers/heuristics.js', srcDir + '/processors/client/controllers/parsing.js', srcDir + '/processors/client/main.js' ]
          dest: destDir + '/processors.js'
        ]
      all:
        options:
          process: (src, filepath)->
            return src;
          banner: '(function(global) { \n'
          footer: '\n })(ej$);'
        src: [destDir + '/libs.js', destDir + '/engine.js', destDir + '/processors.js'],
        dest: destDir + '/emojs.js'
    uglify:
      main:
        static_mappings:
          files: [
            {src: destDir + '/emojs.js', dest: destDir + '/emojs.min.js'},
          ]
  concat = grunt.config.get('concat') || {};
  concat['libs'] = confObj.concat.libs
  concat['engine.core'] = confObj.concat.engine.core
  concat['engine.classes'] = confObj.concat.engine.classes
  concat['engine.controllers'] = confObj.concat.engine.controllers
  concat['engine.all'] = confObj.concat.engine.all
  concat['processors'] = confObj.concat.processors
  concat['all'] = confObj.concat.all
  grunt.config.set('concat', concat)

  uglify = grunt.config.get('uglify') || {};
  uglify['main'] = confObj.uglify.main

  grunt.registerTask 'build-emojs-require', 'Builds all concatenated packages without require, puts it to prod', () ->
    grunt.task.run('concat:libs')
    grunt.task.run('concat:engine.core')
    grunt.task.run('concat:engine.classes')
    grunt.task.run('concat:engine.controllers')
    grunt.task.run('concat:engine.all')
    grunt.task.run('concat:processors')
    grunt.task.run('concat:all')
    #grunt.task.run('uglify:main')

