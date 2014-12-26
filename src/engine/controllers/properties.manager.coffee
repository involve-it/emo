dataServerAddr = global.engine.core.Config.dataServerRoot
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
      url = dataServerAddr + fileName
      d = null
      #url = dataServerAddr + fileName + '?callback='
      emojs.engine.controllers.FileReader.readFile(url, (data)->
        properties = global.libs.x2js(data).properties && global.libs.x2js(data).properties.entry
        callbackFunction(data)
        #callback
      )
    getProperty : (key) ->
      for prop in properties
        ###if prop['_key'] == key
          return prop['__text']###
        if prop.$['key'] == key
          return prop._

    getIntArrayProperty : (key) ->
      line = @getProperty(key)
      strings = line.split(', ')
      values = []
      for string in strings
        values.push(parseInt(string, 16))
      values
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path : 'engine.controllers.PropertiesManager'
    object : PropertiesManager