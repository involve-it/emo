class Logger extends global.engine.classes.AbstractController
#get app, listen to new 'feelings' and add logger to runtime:
global.runtime.app.on 'processor:feel', (state, contextName)->
  #client-side logging:
  console.log(state.toString())
  #server-side logging:
    #ajax request here..

ej$h.MakeGlobalNamespaceAndObject
  path: 'engine.output.Logger'
  object : Logger
