#global.core.helpers.MakeGlobalNamespaceFromString('global.output')
class Output
define [
  'core/output/art/main'
], ()->
  global.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'core.output'
    object : Output
  })