define [
  'classes/abstract.controller'
  'classes/abstract.emotion'
  #'classes/abstract.context'
  'classes/abstract.state'
  'classes/abstract.processor'
  #'classes/abstract.mediator'
  'classes/affect.word'
  'classes/emotion'
  'classes/emotion.state'
  #'classes/context'
], () ->
  global.runtime.helpers.MakeGlobalNamespaceFromString('engine.classes')
