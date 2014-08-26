define [
  '../../../builds/prod/core/helpers/main'
  '../../../../builds/src/core/api/main'
  'core/abstract/main'
  'core/inits/main'

  'core/input/main'
  'core/output/main'
], ()->
  class Core
  global.engine.helpers.MakeGlobalNamespaceAndObject({
    path: 'core'
    object : Core
  })