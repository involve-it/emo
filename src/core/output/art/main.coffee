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
    ret
