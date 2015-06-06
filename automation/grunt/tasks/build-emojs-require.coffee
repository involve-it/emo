module.exports = (grunt) ->
  srcDir = '<%= pkg.directories.builds.src %>'
  destDir = '<%= pkg.directories.builds.prod %>'
  distrDir = '<%= pkg.directories.builds.dist %>'
  optimizeConst = 'none'
  #optimizeConst = 'uglify'
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      engine:
        core:
          options:
            process: (src, filepath)->
              console.log(src);
              return src;
            banner: 'ej$.core = function(global) { \n'
            footer: '\n  return global.engine.core; \n}(ej$);'
          files: [
            src: [srcDir + '/engine/core/main.js', srcDir + '/engine/core/helpers.js', srcDir + '/engine/core/config.js', srcDir + '/engine/core/init.javascript.js']
            dest: destDir + '/engine.js'
          ]
      all:
        src: [distrDir + '/js/libs.js', distrDir + '/js/engine.js', distrDir + '/js/processors.js', distrDir + '/js/modules.js'],
        dest: distrDir + '/js/emojs.js'


  concat = grunt.config.get('concat') || {};
  concat['engine.core'] = confObj.concat.engine.core
  concat['all'] = confObj.concat.all
  grunt.config.set('concat', concat)

  grunt.registerTask 'build-emojs-require', 'Builds all concatenated packages without require, puts it to prod', () ->
    grunt.task.run('concat:engine.core')
