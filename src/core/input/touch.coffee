define [
], () ->
  #class:
  class Touch
    @emo : (contextName)->
      debugger
      if(!contextName || contextName == '' || contextName == 'default')
        ###if (@text()!='')
          text = @text()
        else
          text = @val()###
        text = @[0].value
        @process(text, contextName)
      else if(contextName=='user1')
        debugger
    @process : (text, contextName)->
      #mediator = new global.core.api.EmotionMediator(context)
      #mediator.synesthesize(text)

      context = global.core.api.Context.getInstance(contextName)
      current = context.feel(text)
  #jquery part:
  $.fn.touchEmo = Touch.emo #(contextName)->

  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  $.fn.process = Touch.process
  #add class to global:
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'input.touch'
    object: Touch