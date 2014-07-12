define [
], () ->
  #class:
  class D3
    @d3 : (contextName)->
        debugger
    @process : (text, contextName)->
      context = global.core.api.Context.getInstance(contextName)
      current = context.feel(text)
  #jquery part:
  $.fn.d3 = (contextName) ->
    contextName = contextName || 'default'
    ret = null
    el = @[0]
    $(window).on 'context:feel:' + contextName, (e, state)->
      #debugger
    ret

  #add class to global:
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.d3'
    object: D3