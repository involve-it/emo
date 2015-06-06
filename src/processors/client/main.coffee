  #define [
  #    'processors/client/client.processor'
  #    'processors/client/controllers/main'
  #    'processors/client/classes/affect.word'
  #], ()->
processor = new global.processors.client.ClientProcessor(global.runtime.app)
processor.runOrWait 'lexical:ready', ()->
  global.runtime.app.emit('processor:ready')
  processor.ready.call()
global.runtime.helpers.MakeGlobalNamespaceAndObject
  path:'runtime.app.processor'
  object: processor
  global: global
  shortcut: 'eо$p'