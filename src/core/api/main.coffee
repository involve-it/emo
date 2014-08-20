define [
  'core/helpers/main',
  'core/api/affect.word',
  'core/api/emotion',
  'core/api/emotion.state',
  'core/api/context',
  #'./emotion.mediator'
], () ->
  global.engine.helpers.MakeGlobalNamespaceFromString('core.api')