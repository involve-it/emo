###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###
#emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Core.Helpers.FileReader')
define [
  './static.js'
], () ->
  class emo$.Core.Helpers.FileReader
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