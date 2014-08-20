#global.engine.helpers.MakeGlobalNamespaceFromString('global.output')
class Output
define [
  'core/output/art/main'
  'core/output/emoticon/emoticon'
  'core/output/chart/d3'
], ()->
  global.engine.helpers.MakeGlobalNamespaceAndObject({
    path: 'core.output'
    object : Output
  })