var FileReader;

FileReader = (function() {
  function FileReader() {}

  FileReader.readFile = function(fileName, callback) {
    var d, file;
    file = null;
    d = null;
    global.runtime.helpers.ajax.get(fileName, {}, function(data) {
      d = data;
      if (callback) {
        return callback(data);
      }
    }, true);

    /*url:fileName
    async : false,
    crossDomain: true,
    contentType: "application/json",
    dataType: 'jsonp',
    success :(data)->
      callback.call(data)
    error : (e) ->
      console.log(e)
     */
    return file;
  };

  FileReader.parseLine = function(line) {
    var ret;
    return ret = null;
  };

  return FileReader;

})();

ej$h.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.FileReader',
  object: FileReader
});
