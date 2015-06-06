define [
  'processors/server/server.processor'
  'processors/server/controllers/main'
  #'processors/server/classes/affect.word'
], ()->
  processor = new global.processors.server.ServerProcessor(global.runtime.app)
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path:'runtime.app.processor'
    object: processor
    global: global
    shortcut: 'e$rp'
  global.runtime.app.emit('processor:ready')