
/*define [
     *'cs!controller'
     *'cs!view'
     *'regular'
  ], () ->
 */

(function() {
  define(['./static.js'], function() {
    return emo$.Core.Helpers.FileReader = (function() {
      function FileReader() {}

      FileReader.readFile = function(fileName) {
        var file;
        file = null;
        $.ajax({
          url: fileName,
          async: false,
          crossDomain: true,
          success: function(data) {
            return file = data;
          },
          error: function(e) {
            return console.log(e);
          }
        });
        return file;
      };

      FileReader.parseLine = function(line) {
        var ret;
        return ret = null;
      };

      return FileReader;

    })();
  });

}).call(this);
