define [
], () ->

  #class:
  class Emoticon
    @emo : (contextName)->
      if(!contextName || contextName == '' || contextName == 'default')
        ###if (@text()!='')
          text = @text()
        else
          text = @val()###
        text = @[0].value
        @process(text, contextName)
      else if(context Name=='user1')
        debugger
    @process : (text, contextName)->
      #mediator = new global.core.api.EmotionMediator(context)
      #mediator.synesthesize(text)

      context = global.core.api.Context.getInstance(contextName)
      current = context.feel(text)
  #jquery part:
  #$.fn.emo = Emoticon.emo #(contextName)->

  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  #$.fn.process = Emoticon.process
  global.libs.$.fn.emoticon = (contextName) ->
    contextName = contextName || 'default'
    ret = null
    el = @[0]
    #ret = new global.output.art.sketch.Synemania(@, contextName)
    global.libs.$(window).on 'context:feel:' + contextName, (e, state)->
      #get strongest emotion:

      emotion = _.max state._emotions, (emotion)->
        return emotion.weight
      if(emotion.type !=-1)
        global.libs.$(el).css('display', 'block')
      else
        global.libs.$(el).css('display', 'none')

      if(emotion.type ==0) #happy
        global.libs.$(el).css('background-position-x', '-100px')
        global.libs.$(el).css('background-position-y', '0')
      else if(emotion.type == 1 ) #sad
        global.libs.$(el).css('background-position-x', '-100px')
        global.libs.$(el).css('background-position-y', '130px')
      else if(emotion.type == 2 ) #fear
        global.libs.$(el).css('background-position-x', '100px')
        global.libs.$(el).css('background-position-y', '130px')
      else if(emotion.type == 3 ) #anger
        global.libs.$(el).css('background-position-x', '0')
        global.libs.$(el).css('background-position-y', '0')
      else if(emotion.type == 4 ) #disgust
        global.libs.$(el).css('background-position-x', '0')
        global.libs.$(el).css('background-position-y', '130px')
      else if(emotion.type == 5 ) #surprise
        global.libs.$(el).css('background-position-x', '100px')
        global.libs.$(el).css('background-position-y', '0')
    ret

  #add class to global:
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.emoticon'
    object: Emoticon