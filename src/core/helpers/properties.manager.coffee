
###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###
#global.engine.helpers.MakeGlobalNamespaceFromString('global.core.helpers.PropertiesManager')
dataServerAddr = global.engine.controllers.Config.dataServerRoot
define [
  #'require'
  #'libs'
], () ->
  class PropertiesManager
    properties = null
    constructor : (fileName, callbackFunction) ->
      ###try
        properties = (global.libs.x2js).xml2json(fileContent).properties.entry
      catch e
        properties = (new X2JS()).xml2json(fileContent).properties.entry###
      url = dataServerAddr + fileName + '?callback='
      global.libs.$.ajax({
        url : url,
        async : false,
        #crossDomain: true,
        #jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success : (data)->
          try
            if typeof data != "string"
              properties = (global.libs.x2js).xml2json(data).properties.entry
            else
              properties = (global.libs.x2js).xml_str2json(data).properties.entry
          catch e
            if typeof data != "string"
              properties = (new X2JS()).xml2json(data).properties.entry
            else
              properties = (new X2JS()).xml_str2json(data).properties.entry
          callbackFunction()
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
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path : 'core.helpers.PropertiesManager'
    object : PropertiesManager

