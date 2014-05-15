debugger
define [
  'core/helpers/main'
  'core/api/main'
  'core/abstract/main'
  'core/inits/main'

  'core/input/main'
  'core/output/main'
], ()->
  debugger
  class Core
  global.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'core'
    object : Core
  })