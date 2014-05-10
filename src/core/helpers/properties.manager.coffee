###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###
#global.Core.Helpers.MakeGlobalNamespaceFromString('global.Core.Helpers.PropertiesManager')
define [
  'libs'
], () ->
  class PropertiesManager
    properties = null
    constructor : (fileName) ->
      $.ajax({
        url : fileName,
        async : false,
        crossDomain: true,
        success : (data)->
          properties = global.libs.x2js.xml2json(data).properties.entry
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

  #t_h.MakeGlobalNamespaceFromString('engine.core.helpers.properties_manager')
  global.core.helpers.propertiesManager = PropertiesManager