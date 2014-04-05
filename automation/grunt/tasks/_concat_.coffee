module.exports = (grunt) ->
  pkg = grunt.file.readJSON 'package.json'
  grunt.registerTask '_concat_2', "concatenates all js files in a directory into _dirName_.js", () ->
    #grunt.file.expand("./modules/*").forEach (dir)->
    grunt.file.recurse "./" + pkg.directories.build.dir , (abspath, rootdir, subdir, filename) ->
      concat = grunt.config.get('concat') || {};
      if(typeof subdir != 'undefined' && subdir != '' && !concat[subdir] && subdir.indexOf('libs') == -1 )
        console.log('dir is: ' + subdir)
        #console.dir(arguments)
        concat[subdir] =
        {
          src: ['<%= pkg.directories.build.dir %>/' + subdir + '/*.js'],
          #dest: 'dist/' + subdir + '/main.js'
          dest: '<%= pkg.directories.build.prod %>/' + subdir + '/_' + subdir.split('/').reverse()[0] + '_.js'
        }
      grunt.config.set('concat', concat)
    grunt.task.run('concat')