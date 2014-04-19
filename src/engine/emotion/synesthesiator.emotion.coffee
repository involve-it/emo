emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.SynesthesiatorEmotion')
define ['engine.abstract/synesthesiator'], () ->
  class emo$.Engine.Emotion.SynesthesiatorEmotion extends emo$.Engine.Abstract.Synesthesiator
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
