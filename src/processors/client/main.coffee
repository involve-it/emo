class ClientProcessor
define [
    'processors/client/client.processor'
    'processors/client/controllers/main'
    'processors/client/classes/affect.word'
], ()->
  processor = new emojs.processors.client.ClientProcessor(emojs.runtime.app)
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path:'runtime.app.processor'
    object: processor
    global: global
    shortcut: 'e$rp'