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
          {src: 'src/main.js', dest: 'dist/main.js'},
          {src: 'src/index.html', dest: 'dist/index.html'}
        ]
      dynamic_mappings:
        files: [
          {
            expand: true,
            cwd: 'src/libs/',
            src: ['**/*.js'],
            dest: 'dist/libs'
          },
          {
            expand : true,
            cwd : 'src/views/',
            src : ['**/*.js'],
            dest: 'dist/views'
          }
          #ext: '.min.js',
          #extDot: 'first'
        ]
      #options:
        #banner: '<%= banner %>',
        #stripBanners: true
      #dist:
        #src: ['dist/*.js'],
        #dest: 'dist'
    uglify:
      #options:
        #banner: '<%= banner %>'
      dist:
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest %>.min.js'

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
    requirejs:
      compile:
        options:
          baseUrl: "builders/rjs",
          mainConfigFile: "<%= requirejs.compile.options.baseUrl %>/engine.build.js",
          out: "_engine_.js"

    watch:  # not in use
      coffee:
        files: 'src/coffee/**/*.coffee',
        tasks: ['coffee:compile']#, 'growl:coffee']
      jade:
        files: 'src/jade/**/*.jade'
        tasks: ['jade:compile']#, 'growl:jade']
      sass:
        files: 'src/scss/**/*.scss'
        tasks: ['sass:compile']#, 'growl:sass']
  ###    sass:
        dist:
          options:
            style: 'compressed'
            compass: true
          files:
            'dist/jquery.rondell.min.css': 'src/scss/jquery.<%= pkg.name %>.scss'
        compile:
          options:
            style: 'expanded'
            compass: true
          files:
            'examples/screen.css': 'src/scss/screen.scss'
            'dist/jquery.rondell.css': 'src/scss/jquery.rondell.scss'###
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
  #grunt.registerTask 'default', ['watch']
  #grunt.registerTask('default', ['concat']);
  grunt.registerTask('default', ['_concat_']);
  #grunt.registerTask('default', [ 'uglify']);
  #grunt.registerTask('default', ['requirejs', 'concat', 'uglify']);
  ## Release task to run tests then minify js and css
  #grunt.registerTask 'release', ['qunit', 'uglify', 'sass:dist']