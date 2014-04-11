module.exports = (grunt) ->

  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      core_helpers:
        src: ['<%= pkg.directories.builds.prod %>/core/helpers/*.js'],
        dest: '<%= pkg.directories.builds.tmp %>/core/helpers/_helpers_.js'
      core_main:
        src: ['<%= pkg.directories.builds.tmp %>/core/helpers/_helpers_.js', '<%= pkg.directories.builds.prod %>/core/*.js'],
        dest: '<%= pkg.directories.builds.prod %>/core/_core_.js'

  concat = grunt.config.get('concat') || {};
  concat['core_helpers'] = confObj.concat.core_helpers
  concat['core_main'] = confObj.concat.core_main
  grunt.config.set('concat', concat)

  grunt.registerTask 'build-core-concat', 'Builds concatenated _core_.js, puts it to production', () ->
    grunt.task.run('concat:core_helpers', 'concat:core_main')
