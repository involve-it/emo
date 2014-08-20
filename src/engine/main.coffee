requirejs.config
  packages: [
    {
      name : 'engine.classes',
      location : './engine/classes',
    }
    {
      name : 'engine.controllers',
      location : './engine/controllers',
    }
    {
      name : 'engine.helpers',
      location : './engine/helpers',
    }
  ]
define [
  'engine.classes'
  'engine.helpers'
  'engine.controllers'
], () ->
  global.engine.helpers.MakeGlobalNamespaceFromString('engine')
