define [
  #'engine.emotion/empathy-scope.js'
],()->
  ###
  * Returns a random number between min and max
  ###

  empathyScope = global.Engine.Emotion.EmpathyScope.getInstance()

  $.fn.emo$ = ()->
    @text()
  $.fn.feel$ = ()->
    empathyScope.feel(@val())