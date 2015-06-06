global.runtime.helpers.MakeGlobalNamespaceFromString('output.art')
###confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)###
define [
#  '../../../../../builds/prod/core/api/emotion.state.js'
#  '../../../builds/src/core/output/art/sketch/main'
#  'core/output/art/utils/main'
], (_$) ->
  #$ = window.$ || _$

  $.fn.art = (contextName, moduleName) ->
    contextName = contextName || 'default'
    ret = null
    if(!moduleName || moduleName == '' || moduleName == 'synemania')
      #synemania effect:
      ret = new global.output.art.sketch.Synemania(@, contextName)
      global.libs.$(window).on 'context:feel:' + contextName, (e, state)->
        a = contextName
        ret.update(state)

    else if (moduleName == 'splash')
      #show user waves!
      debugger
    else
      debugger
    ret

  $.fn.backgroundContext = (contextName, moduleName) ->
    that = this
    global.libs.$(window).on 'context:feel:' + contextName, (e, state)->
      tempCanvasEl = global.libs.$('<canvas id="canvasOverlay"></canvas>')
      tempCanvasEl.attr('style', 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';')
      tempCanvasEl[0].getContext('2d').globalAlpha = 0.4

      contextName = contextName || 'default'
      ret = null
      if(!moduleName || moduleName == '' || moduleName == 'synemania')
        #synemania effect:
        ret = new global.output.art.sketch.Synemania(tempCanvasEl, contextName)
        ret.update(state)

        for x in [1..1000] by 1
          ret.draw(contextName)
      else if (moduleName == 'splash')
        #show user waves!
        debugger
      else
        debugger

      imgData = tempCanvasEl[0].toDataURL()
      that.css('background', 'url("' + imgData + '")')
      #that.css('background', 'url("data:' + imgData + '")')
      that.css('background-size', '100% 100%')
  # Function to draw emotion on canvas elements:
  $.fn.drawEmotion = (contextName, sourceEmotionText) ->
    contextName = contextName || 'default'
    that = this
    for i in [0.. this.length-1] by 1

      tempCanvasEl = that[i]
      #get the emotion for this element (remember to do this in the context):
      text = sourceEmotionText || that[i].innerText
      emotion = global.modules.core.input.text.emo(text, contextName)
      if (emotion.getStrongestEmotion().getName() == 'HAPPINESS')
        tempCanvasEl.getContext('2d').globalAlpha = 0.4
      else if (emotion.getStrongestEmotion().getName() == 'SURPRISE')
        tempCanvasEl.getContext('2d').globalAlpha = 0.3
      else if (emotion.getStrongestEmotion().getName() == 'NEUTRAL')
        tempCanvasEl.getContext('2d').globalAlpha = 0.1
      else
        tempCanvasEl.getContext('2d').globalAlpha = 0.1

      emotion.id = 'emo' + Math.floor(Math.random(2)*100)
      synemania = new global.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName)
      synemania.update(emotion)
      for x in [1..1000] by 1
        synemania.draw(contextName)


  $.fn.backgroundEmotion = (contextName, sourceEmotionText) ->
    contextName = contextName || 'default'
    that = this
    for i in [0.. this.length-1] by 1

      #tempCanvasEl = global.libs.$('<canvas id="canvasOverlay"></canvas>')
      #tempCanvasEl.attr('style', 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';')

      tempCanvasEl=document.createElement 'canvas'
      tempCanvasEl.id = 'canvasOverlay'
      attr = document.createAttribute('style');
      attr.value = 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';';
      tempCanvasEl.setAttributeNode(attr);
      #get the emotion for this element (remember to do this in the context):
      text = sourceEmotionText || that[i].innerText
      emotion = global.modules.core.input.text.emo(text, contextName)
      if (emotion.getStrongestEmotion().getName() == 'HAPPINESS')
        tempCanvasEl.getContext('2d').globalAlpha = 0.4
      else if (emotion.getStrongestEmotion().getName() == 'SURPRISE')
        tempCanvasEl.getContext('2d').globalAlpha = 0.3
      else if (emotion.getStrongestEmotion().getName() == 'NEUTRAL')
        tempCanvasEl.getContext('2d').globalAlpha = 0.1
      else
        tempCanvasEl.getContext('2d').globalAlpha = 0.1

      emotion.id = 'emo' + Math.floor(Math.random(2)*100)
      synemania = new global.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName)
      synemania.update(emotion)
      for x in [1..1000] by 1
        synemania.draw(contextName)
      window.tempCanvasEl = tempCanvasEl
      imgData = tempCanvasEl.toDataURL()

      $(that[i]).css('background-image', 'url("data:' + imgData + '")')
      $(that[i]).css('background-size', '100% 100%' )
      #that[i].prevBackground = that[i].style.backgroundImage
      #that[i].backgroundImage = 'url("data:' + imgData + '")'
      #that[i].backgroundSize = '100% 100%'
  $.fn.clearBackground = () ->
    #that = this
    #for i in [0.. this.length-1] by 1
    $(this).css('background-image', global.libs.$(this).prevBackground || 'none')

