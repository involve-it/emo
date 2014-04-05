  ###define [
    #'cs!controller'
    #'cs!view'
    #'regular'
  ], () ->###

  class emo$.Engine.Utils.FileReader
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


