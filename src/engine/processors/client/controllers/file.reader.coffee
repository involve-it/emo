define [
], () ->
  class FileReader
    @readFile : (fileName, callback) ->
      file = null
      #url, data, callback, sync
      d=null
      global.engine.core.helpers.ajax.get(
        fileName
        {}
        (data)->
          d = data
          if(callback)
            callback(data)
        true
      )
      ###url:fileName
      async : false,
      crossDomain: true,
      contentType: "application/json",
      dataType: 'jsonp',
      success :(data)->
        callback.call(data)
      error : (e) ->
        console.log(e)###
      file
    @parseLine : (line) ->
      ret = null
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path : 'engine.processors.client.controllers.FileReader'
    object : FileReader
