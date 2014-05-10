define ['core/abstract/synesthesiator'], () ->
  class SynesthesiatorEmotion extends global.core.abstract.Mediator
    EmotionStates = []
    empathyScope = null
    #constructor: (parentApplet) ->
    constructor: () ->
      empathyScope = global.core.api.EmpathyScope.getInstance()
    synesthesize:(text)->
      window.EmotionStates = EmotionStates
      current = empathyScope.feel(text)
      current.setPrevious(EmotionStates[EmotionStates.length - 1])  unless EmotionStates.length == 0
      EmotionStates.push current
      #: notify system, that the emotion is synesthesized:
      #x @notifyPApplet current
      $(window).trigger('core:emotion:synthesized')


  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'core.api.SynesthesiatorEmotion'
    object: SynesthesiatorEmotion