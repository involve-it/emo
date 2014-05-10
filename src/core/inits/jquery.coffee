define [
  #'engine.emotion/empathy-scope.js'
],()->
  ###
  * Returns a random number between min and max
  ###

  empathyScope = global.core.api.EmpathyScope.getInstance()

  $.fn.emo = ()->
    applet = new global.output.art.sketch.Synemania($('canvas'))
    text = @text()
    synesthesiator = new global.core.api.SynesthesiatorEmotion(applet)
    synesthesiator.synesthesize(text)
  $.fn.feel = ()->
    empathyScope.feel(@val())