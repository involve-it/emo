module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    banner: '/*!\n' +
    '<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' Licensed under the <%= pkg.license %> */\n',
    concat:
      static_mappings:
        files: [
          {src: '<%= pkg.directories.source %>/main.js', dest: '<%= pkg.directories.build.prod %>/main.js'},
          {src: '<%= pkg.directories.source %>/index.html', dest: '<%= pkg.directories.build.prod %>/index.html'}
        ]
      dynamic_mappings:
        files: [
          {
            expand: true,
            cwd: '<%= pkg.directories.source %>/libs/',
            src: ['**/*.js'],
            dest: '<%= pkg.directories.build.prod %>/libs'
          },
          {
            expand : true,
            cwd : '<%= pkg.directories.build.dir %>/views/',
            src : ['**/*.js'],
            dest: '<%= pkg.directories.build.prod %>/views'
          }
        ]
    uglify:
      dynamic_mappings:
        files: [
          {
            expand : true,
            cwd : '<%= pkg.directories.build.prod %>/',
            dest: '<%= pkg.directories.build.prod %>/',
            src : ['**/*.js'],
            ext: '.min.js',
            extDot: 'last'
          }
        ]
    jshint:
      options:
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals:
          jQuery: true,
          module : true
      gruntfile:
        src: 'gruntfile.js'
      lib_test:
        src: ['lib/**/*.js', 'test/**/*.js']
    qunit:
      files: ['tests/**/*.html']
#    requirejs:
#      compile:
#        options:
#          baseUrl: "builders/rjs",
#          mainConfigFile: "<%= requirejs.compile.options.baseUrl %>/engine.build.js",
#          out: "_engine_.js"

    watch:
      coffee:
        files: '<%= pkg.directories.source %>/**/*.coffee',
        tasks: ['coffee:compile']
    coffee:
      compile:
        options:
          bare: true
        expand: true
        cwd: '<%= pkg.directories.source %>'
        src: '/**/*.coffee'
        dest: '<%= pkg.directories.build.dist %>'
        ext: '.js'

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-qunit'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-sass'

  grunt.loadTasks('./automation/grunt/tasks')

  # Default task which watches jade, sass and coffee.

  grunt.registerTask 'default', ['watch']

  #run this for development:

  #run this for production (minification):
  grunt.registerTask('default', ['_concat_2', 'uglify']);



  #grunt.registerTask('default', [ 'uglify']);
  #grunt.registerTask('default', ['requirejs', 'concat', 'uglify']);
  ## Release task to run tests then minify js and css
  #grunt.registerTask 'release', ['qunit', 'uglify', 'sass:dist']