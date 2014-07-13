global.core.helpers.MakeGlobalNamespaceFromString('output.art')
###confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)###
define [
  'core/api/emotion.state'
  'core/output/art/sketch/main'
  'core/output/art/utils/main'
], (_$) ->
  #$ = window.$ || _$

  global.libs.$.fn.art = (contextName, moduleName) ->
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

  global.libs.$.fn.background = (contextName, moduleName) ->
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
      that.css('background', 'url("data:' + imgData + '")')
      that.css('background-size', '100% 100%')
