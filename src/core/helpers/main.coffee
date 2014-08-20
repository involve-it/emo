class Helpers

global.engine.helpers.MakeGlobalNamespaceAndObject {
  path:'core.helpers',
  object: Helpers,
  global: global
}

define 'core/helpers/main', [
  'core/helpers/properties.manager'
  'core/helpers/file.reader'
  #emotions:
  'core/helpers/heuristics'
  'core/helpers/lexical'
  'core/helpers/parsing'
], ()->
