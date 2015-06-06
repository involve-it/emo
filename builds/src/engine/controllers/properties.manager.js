var PropertiesManager, dataServerAddr;

dataServerAddr = global.engine.core.Config.dataServerRoot;

PropertiesManager = (function() {
  var properties;

  properties = null;

  function PropertiesManager(fileName, callbackFunction) {

    /*try
      properties = (global.libs.x2js).xml2json(fileContent).properties.entry
    catch e
      properties = (new X2JS()).xml2json(fileContent).properties.entry
     */
    var d, url;
    url = dataServerAddr + fileName;
    d = null;
    global.engine.controllers.FileReader.readFile(url, function(data) {
      properties = global.libs.x2js(data).properties && global.libs.x2js(data).properties.entry;
      return callbackFunction(data);
    });
  }

  PropertiesManager.prototype.getProperty = function(key) {
    var prop, _i, _len;
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      prop = properties[_i];

      /*if prop['_key'] == key
        return prop['__text']
       */
      if (prop.$['key'] === key) {
        return prop._;
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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.PropertiesManager',
  object: PropertiesManager
});
