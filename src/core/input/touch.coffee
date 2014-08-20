define [
], () ->
  #class:
  class Touch
    @emo : (contextName)->
      context = global.core.api.Context.getInstance(contextName)

      @.on 'click', (e)->
        current = context.feelTouch(e, this.getContext("2d"))
    @destructor : () ->

  #jquery part:
  global.libs.$.fn.emoTouch = Touch.emo #(contextName)->
  global.libs.$.fn.emoRemove = Touch.destructor
  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  global.libs.$.fn.processTouch = Touch.process
  #add class to global:
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'input.touch'
    object: Touch