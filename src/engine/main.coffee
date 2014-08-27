requirejs.config
  shim:
    'core' :
      deps: ['libs']
    'classes':
      deps: ['core'],
    'controllers':
      deps: ['core', 'classes'],
  packages: [
    {
      name : 'classes',
      location : './engine/classes',
    }
    {
      name : 'controllers',
      location : './engine/controllers',
    }
    {
      name : 'core',
      location : './engine/core',
    }
  ]
define [
  'core'
  'classes'
  'controllers'
], () ->
  #all things are loaded, so let's start the show by creating global object for runtime and engine objects:
  emojs.engine.core.helpers.MakeGlobalNamespaceAndObject
    path:'engine'
    object: @
    global: global
    shortcut: 'e$e'
  global.engine.core.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r')

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