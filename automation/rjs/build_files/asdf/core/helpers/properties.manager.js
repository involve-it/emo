
/*define [
     *'cs!controller'
     *'cs!view'
     *'regular'
  ], () ->
 */

(function() {
  define(['./static.js'], function() {
    return emo$.Core.Helpers.PropertiesManager = (function() {
      var properties;

      properties = null;

      function PropertiesManager(fileName) {
        $.ajax({
          url: fileName,
          async: false,
          crossDomain: true,
          success: function(data) {
            return properties = emo$.Libs.x2js.xml2json(data).properties.entry;
          },
          error: function(e) {
            return console.log(e);
          }
        });
      }

      PropertiesManager.prototype.getProperty = function(key) {
        var prop, _i, _len;
        for (_i = 0, _len = properties.length; _i < _len; _i++) {
          prop = properties[_i];
          if (prop['_key'] === key) {
            return prop['__text'];
          }
        }
      };

      PropertiesManager.prototype.getIntArrayProperty = function(key) {
        var line, string, strings, values, _i, _len;
        line = this.getProperty(key);
        strings = line.split(', ');
        values = [];
        for (_i = 0, _len = strings.length; _i < _len; _i++) {
          string = strings[_i];
          values.push(parseInt(string, 16));
        }
        return values;
      };

      return PropertiesManager;

    })();
  });

}).call(this);
