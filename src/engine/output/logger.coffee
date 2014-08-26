#global.engine.helpers.MakeGlobalNamespaceFromString('global.output')
class Logger extends global.engine.classes.AbstractController
define [], ()->
  #get app, listen to new 'feelings' and add logger to runtime:
  global.runtime.app.on 'processor:feel', (state, contextName)->
    #client-side logging:
    console.log(state.toString())
    #server-side logging:
      #ajax request here..
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.output.Logger'
    object : Logger