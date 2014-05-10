###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###
#global.Core.Helpers.MakeGlobalNamespaceFromString('global.Core.Helpers.FileReader')
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
  #t_h.MakeGlobalNamespaceFromString('core.helpers.file_reader')
  global.core.helpers.file_reader = FileReader