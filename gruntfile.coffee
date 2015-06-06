module.exports = (grunt) ->
  # Project configuration.
  pkgGlobal = grunt.file.readJSON 'package.json'
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    banner: '/*!\n' +
    '<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' Licensed under the <%= pkg.license %> */\n',
    yuidoc:
      compile:
        name: '<%= pkg.name %>'
        description: '<%= pkg.description %>'
        version: '<%= pkg.version %>'
        url: '<%= pkg.homepage %>'
        options:
          paths: '<%= pkg.directories.builds.src%>/'
          themedir: 'path/to/custom/theme/'
          outdir: '<%= pkg.directories.builds.dist %>/docs/'
    docco:
      debug:
        src: ['<%= pkg.directories.builds.src%>/**/*.js']
        options:
          output: '<%= pkg.directories.builds.dist %>/docs1/'

    copy: {
      emojsToMobileApp: {
        src: '<%= pkg.directories.builds.dist %>/js/*.js',
        dest: '<%= pkg.directories.mobileAppJsPath %>/',
      }
    }
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-qunit'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  #grunt.loadNpmTasks 'grunt-jsdoc'
  grunt.loadNpmTasks 'grunt-contrib-yuidoc'
  grunt.loadNpmTasks 'grunt-docco'

  grunt.loadTasks(pkgGlobal.directories.automation.grunt.tasks)
  # Default task which watches jade, sass and coffee.
  #grunt.registerTask('default', ['concat', 'uglify']);
  #grunt.registerTask('build-engine', ['_concat_']); # this questionable task takes all js files from [dir] and concatenates them into _[dir]_.js in the [dir] :)
  #run this for development (src->builds/src)
  #grunt.registerTask('default', ['concat:src', 'coffee:src']);  #  src to builds/src-> localhost:8889,
  grunt.registerTask('default', ['concat:src', 'coffee:src', 'build-emojs-require']); # src to builds/dist ->  localhost:8666
  grunt.registerTask('build-src-coffee', ['concat:src', 'coffee:src']);
  #run this for production (builds/dist->builds/prod):
  grunt.registerTask('build-prod-uglify', ['concat:prod', 'coffee:prod', 'uglify:prod']);
  grunt.registerTask('build-prod-plain', ['concat:prod', 'coffee:prod']);
  #grunt.registerTask('build-prod-uglify', ['concat:prod', 'coffee:prod']);

  #grunt.registerTask('default', ['_concat_2', 'uglify']);
  #grunt.registerTask('default', [ 'uglify']);
  #grunt.registerTask('default', ['requirejs', 'concat', 'uglify']);
  ## Release task to run tests then minify js and css
  #grunt.registerTask 'release', ['qunit', 'uglify', 'sass:dist']