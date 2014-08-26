define [
], () ->
  #class:
  #jquery extention:
  global.libs.$.fn.emo = (contextName)->
    text = @[0].value || @.text()
    Text.emo(text, contextName)
  ######$.fn.feel = ()->
    empathyScope.feel(@val())
  global.libs.$.fn.process = Text.process
  #add class to global:
