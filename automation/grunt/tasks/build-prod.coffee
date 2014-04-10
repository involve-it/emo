module.exports = (grunt) ->
  #grunt.registerTask 'build-src', "", () ->
  #pkg = grunt.file.readJSON 'package.json'

  confObj =
    pkg : grunt.file.readJSON 'package.json'
    concat:
      prod:
        files: [
          {src: '<%= pkg.directories.source %>/index.html', dest: '<%= pkg.directories.builds.prod %>/index.html'},
          {
            expand: true,
            cwd: '<%= pkg.directories.source %>/libs/',
            src: ['**/*.js'],
            dest: '<%= pkg.directories.builds.prod %>/libs'
          }
        ]

    coffee: #https://github.com/gruntjs/grunt-contrib-coffee
      prod:
        files: [
          {
            expand: true,
            options:
              sourceMap: false,
              bare: true,
            cwd: '<%= pkg.directories.source %>',
            src: ['**/*.coffee'],
            dest: '<%= pkg.directories.builds.prod %>/',
            ext: '.js'
          }
        ]
    uglify:
      prod:
        files: [
          {
            expand: true,
            cwd: '<%= pkg.directories.builds.prod %>/',
            dest: '<%= pkg.directories.builds.prod %>/',
            src: ['**/*.js'],
            ext: '.js',
            extDot: 'last'
          }
        ]

  concat = grunt.config.get('concat') || {};
  concat['prod'] = confObj.concat.prod
  grunt.config.set('concat', concat)

  coffee = grunt.config.get('coffee') || {};
  coffee['prod'] = confObj.coffee.prod
  grunt.config.set('coffee', coffee)

  uglify = grunt.config.get('uglify') || {};
  uglify['prod'] = confObj.uglify.prod
  grunt.config.set('uglify', uglify)