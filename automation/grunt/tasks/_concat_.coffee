module.exports = (grunt) ->
  grunt.registerTask '_concat_', "concatenates all js files in a directory into _dirName_.js", () ->
    #grunt.file.expand("./modules/*").forEach (dir)->
    grunt.file.recurse "./src", (abspath, rootdir, subdir, filename) ->
      concat = grunt.config.get('concat') || {};
      if(typeof subdir != 'undefined' && subdir != '' && !concat[subdir] && subdir.indexOf('libs') == -1 )
        console.log('dir is: ' + subdir)
        console.dir(arguments)
        concat[subdir] =
        {
          src: ['src/' + subdir + '/*.js'],
          #dest: 'dist/' + subdir + '/main.js'
          dest: 'dist/' + subdir + '/_' + subdir.split('/').reverse()[0] + '_.js'
        }
      grunt.config.set('concat', concat)
    grunt.task.run('concat')