define ['core/abstract/mediator'], () ->
  class EmotionMediator extends global.core.abstract.Mediator
    EmotionStates = []
    context = null
    instance = null
    #constructor: (parentApplet) ->
    constructor: (contextName) ->
      context = global.core.api.Context.getInstance(contextName)
    synesthesize:(text)->
      window.EmotionStates = EmotionStates
      debugger
      current = context.feel(text)
      current.setPrevious(EmotionStates[EmotionStates.length - 1])  unless EmotionStates.length == 0
      EmotionStates.push current
      #: notify system, that the emotion is synesthesized:
      #x @notifyPApplet current
      $(window).trigger('core:emotion:synthesized')


  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'core.api.EmotionMediator'
    object: EmotionMediator