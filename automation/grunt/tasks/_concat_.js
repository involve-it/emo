// Generated by CoffeeScript 1.7.1
(function() {
  module.exports = function(grunt) {
    return grunt.registerTask('_concat_', "concatenates all js files in a directory into _dirName_.js", function() {
      grunt.file.recurse("./src", function(abspath, rootdir, subdir, filename) {
        var concat;
        concat = grunt.config.get('concat') || {};
        if (typeof subdir !== 'undefined' && subdir !== '' && !concat[subdir] && subdir.indexOf('libs') === -1) {
          console.log('dir is: ' + subdir);
          console.dir(arguments);
          concat[subdir] = {
            src: ['src/' + subdir + '/*.js'],
            dest: 'dist/' + subdir + '/_' + subdir.split('/').reverse()[0] + '_.js'
          };
        }
        return grunt.config.set('concat', concat);
      });
      return grunt.task.run('concat');
    });
  };

}).call(this);

//# sourceMappingURL=_concat_.map
