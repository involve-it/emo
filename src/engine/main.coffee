  #all things are loaded, so let's start the show by creating global object for runtime and engine objects:
  emojs.runtime.helpers.MakeGlobalNamespaceAndObject
    path:'engine'
    object: @
    global: global
    shortcut: 'e$e'
  global.runtime.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r')

  #init new app, setting it's config:
  app = new emojs.engine.controllers.App
    #processor: 'global.processors.server.ServerProcessor'
    #processor: 'emojs.processors.client.ClientProcessor'
    #modules : []
  global.runtime.app = app
  ###require [
  ], () ->###

  #wait for all necessary conditions to start using library and notify all the app is ready:
  app.once 'processor:ready', ()->
    appReadyEvent = new Event('app:ready')
    window.document.dispatchEvent(appReadyEvent)
    #runtime is fully initialized - in/out/proc modules are loaded, so we can kick off the application:
  #app.once 'processor:loaded', ()->
    app.start()