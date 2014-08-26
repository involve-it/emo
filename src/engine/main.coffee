engineRequire = requirejs.config
  shim:
    'classes':
      deps: ['core'],
    'controllers':
      deps: ['core', 'classes'],
    'input':
      deps: ['processors']
    'output':
      deps: ['processors']

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
    {
      name : 'processors',
      location : './engine/processors',
    }
    {
      name : 'input',
      location : './engine/input',
    }
    {
      name : 'output',
      location : './engine/output',
    }
  ]
engineRequire [
  'core'
  'classes'
  'controllers'
], () ->
  #all things are loaded, so let's start the show by creating global object for runtime and engine objects:
  global.engine.core.helpers.MakeGlobalNamespaceFromString('engine', global, 'e$e')
  global.engine.core.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r')

  #init new app, setting it's config:
  app = new emo.engine.controllers.App
    processor: 'global.engine.processors.client.ClientProcessor'

  global.runtime.app = app
  require [
    'processors'
    'input'
    'output'
  ], () ->
    #runtime is fully initialized - in/out/proc modules are loaded, so we can kick off the application:
    app.start()


