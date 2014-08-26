define [
  'processors/server/server.processor'
  'processors/server/controllers/main'
  #'processors/server/classes/affect.word'
], ()->
  processor = new emojs.processors.server.ServerProcessor(emojs.runtime.app)
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path:'runtime.app.processor'
    object: processor
    global: global
    shortcut: 'e$rp'
  emojs.runtime.app.emit('processor:ready')