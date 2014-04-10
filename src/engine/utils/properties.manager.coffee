  ###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Utils.PropertiesManager')
  class emo$.Engine.Utils.PropertiesManager
    properties = null
    constructor : (fileName) ->
      $.ajax({
        url : fileName,
        async : false,
        crossDomain: true,
        success : (data)->
          properties = emo$.Libs.x2js.xml2json(data).properties.entry
        error : (e) ->
          console.log(e)
      })
    getProperty : (key) ->
      for prop in properties
        if prop['_key'] == key
          return prop['__text']

    getIntArrayProperty : (key) ->
      line = @getProperty(key)
      strings = line.split(', ')
      values = []
      for string in strings
        values.push(parseInt(string, 16))
      values

