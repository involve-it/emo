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
  $.fn.emoTouch = Touch.emo #(contextName)->
  $.fn.emoRemove = Touch.destructor
  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  $.fn.processTouch = Touch.process
  #add class to global:
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'input.touch'
    object: Touch