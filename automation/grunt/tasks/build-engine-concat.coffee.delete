module.exports = (grunt) ->

  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      abstract:
        src: ['<%= pkg.directories.builds.prod %>/engine/abstract/*.js'],
        dest: '<%= pkg.directories.builds.tmp %>/engine/abstract/_abstract_.js'
      helpers:
        src: ['<%= pkg.directories.builds.prod %>/engine/emotion/helpers/*.js'],
        dest: '<%= pkg.directories.builds.tmp %>/engine/emotion/helpers/_helpers_.js'
      emotion:
        src: ['<%= pkg.directories.builds.tmp %>/engine/abstract/_abstract_.js', '<%= pkg.directories.builds.tmp %>/engine/emotion/helpers/_helpers_.js', '<%= pkg.directories.builds.prod %>/engine/emotion/*.js'],
        dest: '<%= pkg.directories.builds.tmp %>/engine/emotion/_emotion_.js'
      engine:
        src: ['<%= pkg.directories.builds.tmp %>/engine/emotion/_emotion_.js','<%= pkg.directories.builds.prod %>/engine/*.js'],
        dest: '<%= pkg.directories.builds.prod %>/engine/_engine_.js'
    clean:
      tmp:
        src : [
          "<%= pkg.directories.builds.prod %>"
        ]

  concat = grunt.config.get('concat') || {};
  concat['abstract'] = confObj.concat.abstract
  concat['engine'] = confObj.concat.engine
  concat['emotion'] = confObj.concat.emotion
  concat['helpers'] = confObj.concat.helpers
  grunt.config.set('concat', concat)

  clean = grunt.config.get('clean') || {};
  clean['tmp'] = confObj.clean.tmp
  grunt.config.set('clean', clean)

  grunt.registerTask 'build-engine-concat', '', () ->
    grunt.task.run('concat:abstract', 'concat:helpers', 'concat:emotion', 'concat:engine')
    #grunt.task.run('clean:tmp')
