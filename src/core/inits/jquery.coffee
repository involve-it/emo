define [],()->
  #empathyScope = global.core.api.EmpathyScope.getInstance()
  $.fn.emo = (contextName)->
    if(!contextName || contextName == '' || contextName == 'default')
      text = @text()
      @process(text, contextName)
    else if(contextName=='user1')
      debugger
  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  $.fn.process = (text, contextName)->
    #mediator = new global.core.api.EmotionMediator(context)
    #mediator.synesthesize(text)

    context = global.core.api.Context.getInstance(contextName)
    current = context.feel(text)


###
  $.fn.art = (contextName, moduleName) ->
    ret = null
    if(!moduleName || moduleName == '' || moduleName == 'synemania')
      #synemania effect:
      ret = new global.output.art.sketch.Synemania(@, contextName)
      $(window).on 'context:feel:' + contextName, (e, state)->
        ret.update(state)

    else if (moduleName == 'splash')
      #show user waves!
      debugger
    else
      debugger
    ret###
