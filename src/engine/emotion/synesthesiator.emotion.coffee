emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.SynesthesiatorEmotion')
define ['../synesthesiator.js'], () ->
  class emo$.Engine.Emotion.SynesthesiatorEmotion extends emo$.Engine.Synesthesiator
    emotionalStates = []
    empathyScope = null
    constructor: (parentApplet) ->
      super parentApplet
      empathyScope = emo$.Engine.Emotion.EmpathyScope.getInstance()
    synesthesize:(text)->
      window.emotionalStates = emotionalStates
      current = empathyScope.feel(text)
      current.setPrevious(emotionalStates[emotionalStates.length - 1])  unless emotionalStates.length == 0
      emotionalStates.push current
      @notifyPApplet current
