define [
], () ->
  debugger

  #class:
  class Emoticon
    @emo : (contextName)->
      if(!contextName || contextName == '' || contextName == 'default')
        ###if (@text()!='')
          text = @text()
        else
          text = @val()###
        text = @[0].value
        debugger
        @process(text, contextName)
      else if(contextName=='user1')
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
  $.fn.emoticon = (contextName) ->
    contextName = contextName || 'default'
    ret = null
    el = @[0]
    #ret = new global.output.art.sketch.Synemania(@, contextName)
    $(window).on 'context:feel:' + contextName, (e, state)->
      #get strongest emotion:

      emotion = _.max state._emotions, (emotion)->
        return emotion.weight
      debugger
      if(emotion.type !=-1)
        $(el).css('display', 'block')
      else
        $(el).css('display', 'none')

      if(emotion.type ==0) #happy
        $(el).css('background-position-x', '-100px')
        $(el).css('background-position-y', '0')
      else if(emotion.type == 1 ) #sad
        $(el).css('background-position-x', '-100px')
        $(el).css('background-position-y', '130px')
      else if(emotion.type == 2 ) #fear
        $(el).css('background-position-x', '100px')
        $(el).css('background-position-y', '130px')
      else if(emotion.type == 3 ) #anger
        $(el).css('background-position-x', '0')
        $(el).css('background-position-y', '0')
      else if(emotion.type == 4 ) #disgust
        $(el).css('background-position-x', '0')
        $(el).css('background-position-y', '130px')
      else if(emotion.type == 5 ) #surprise
        $(el).css('background-position-x', '100px')
        $(el).css('background-position-y', '0')
    ret

  #add class to global:
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.emoticon'
    object: Emoticon