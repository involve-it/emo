define [
], () ->
  #class:
  class Text
    @emo : (value, contextName)->
      if(!contextName || contextName == '' || contextName == 'default')
        ###if (@text()!='')
          text = @text()
        else
          text = @val()###
        contextName = 'default'
        return @.process(value, contextName)
      else
        return @.process(value, contextName)

    @process : (text, contextName)->
      #mediator = new global.core.api.EmotionMediator(context)
      #mediator.synesthesize(text)

      #context = global.core.api.Context.getInstance(contextName)
      curProc = global.runtime.app.getProcessorInstance()
      processedEmo = curProc.feelText(text)

  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.input.text'
    object: Text
