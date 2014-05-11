define [
  'core/helpers/main',
  './affect.word',
  './emotion',
  './emotion.state',
  './context',
  #'./emotion.mediator'
], () ->
  global.core.helpers.MakeGlobalNamespaceFromString('core.api')