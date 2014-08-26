class ClientProcessor
define [
    'processors/client/client.processor'
    'processors/client/controllers/main'
    'processors/client/classes/affect.word'
], ()->
  global.engine.core.helpers.MakeGlobalNamespaceFromString('engine.processors.client')