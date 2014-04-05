
  module.exports = function(grunt) {
    grunt.registerTask("_concat_", "your description", function() {

      // read all subdirectories from your modules folder
     /* grunt.file.expand("./src/*").forEach(function (dir) {

        // get the current concat config
        var concat = grunt.config.get('concat') || {};

        // set the config for this modulename-directory
        console.log('dir is: ' + dir);
        console.dir(arguments);
        concat[dir] = {
          src: ['/src/' + dir + '*//*.js'],
          dest: '/dist/' + dir + '/_dir_.js'
        }

        // save the new concat config
        grunt.config.set('concat', concat);

      });*/
      grunt.file.recurse("./src", function(abspath, rootdir, subdir, filename) {
        // read all subdirectories from your modules folder

         // get the current concat config
         var concat = grunt.config.get('concat') || {};
         if(typeof subdir !== 'undefined' && !concat[subdir] && subdir.indexOf('libs') == -1 ) {
           // set the config for this modulename-directory
           console.log('dir is: ' + subdir);
           console.dir(arguments);
           concat[subdir] = {
             src: ['src/' + subdir + '/*.js'],
             dest: 'dist/' + subdir + '/_' + subdir.split('/').reverse()[0] + '_.js'
           }
         }
         // save the new concat config
         grunt.config.set('concat', concat);

      });
      //console.dir(grunt.config.get('concat'));
      // when finished run the concatinations
      grunt.task.run('concat');

    });
  }
