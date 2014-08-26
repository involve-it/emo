#global.engine.helpers.MakeGlobalNamespaceFromString('global.output')
class Output
define [
  'output/logger'
], ()->
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.output'
    object : Output