###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###
define [
], () ->
  class FileReader
    @readFile : (fileName) ->
      file = null
      $.ajax({
        url : fileName,
        async : false,
        crossDomain: true,
        success : (data)->
          file = data
        error : (e) ->
          console.log(e)
      })
      file
    @parseLine : (line) ->
      ret = null
  global.core.helpers.MakeGlobalNamespaceAndObject
    path : 'core.helpers.FileReader'
    object : FileReader
