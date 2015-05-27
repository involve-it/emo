module.exports = (grunt) ->
  #grunt.registerTask 'build-src', "", () ->
  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      src:
        files: [
          {src: '<%= pkg.directories.source %>/index.html', dest: '<%= pkg.directories.builds.src %>/index.html'},
          {
            expand: true,
            cwd: '<%= pkg.directories.source %>/libs/',
            src: ['**/*.js'],
            dest: '<%= pkg.directories.builds.src %>/libs'
          }
        ]

    coffee: #https://github.com/gruntjs/grunt-contrib-coffee
      src:
        options:
          sourceMap: false,
          bare: true,
        files: [
          {
            expand: true,
            options:
              sourceMap: false,
              bare: true,
            cwd: '<%= pkg.directories.source %>',
            src: ['**/*.coffee'],
            dest: '<%= pkg.directories.builds.src %>/',
            extDot : 'last',
            ext: '.js'
          }
        ]

  concat = grunt.config.get('concat') || {};
  concat['src'] = confObj.concat.src
  grunt.config.set('concat', concat)

  coffee = grunt.config.get('coffee') || {};
  coffee['src'] = confObj.coffee.src
  grunt.config.set('coffee', coffee)
