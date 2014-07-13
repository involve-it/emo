define [
], () ->

  #class:
  class Text
    @emo : (contextName)->
      if(!contextName || contextName == '' || contextName == 'default')
        ###if (@text()!='')
          text = @text()
        else
          text = @val()###
        text = @[0].value || @.text()
        return @.process(text, contextName)
      else if(contextName=='user1')
        debugger
      else
        text = @[0].value || @.text()
        return @.process(text, contextName)

    @process : (text, contextName)->
      #mediator = new global.core.api.EmotionMediator(context)
      #mediator.synesthesize(text)

      context = global.core.api.Context.getInstance(contextName)
      current = context.feelText(text)

  #jquery part:
  global.libs.$.fn.emo = Text.emo #(contextName)->

  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  global.libs.$.fn.process = Text.process
  #add class to global:
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'input.text'
    object: Text