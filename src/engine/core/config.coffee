  #define [
  #  'core/helpers'
  #], () ->
  class Config
    # flat files url
    @dataServerRoot = emojs.settings.dataServerRoot

    # this flag shows if this is a fully client-side running (all processing and rendering etc. is done in JS) app
    @fullyClientSide = true
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.core.Config'
    object: Config
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'runtime.config'
    object: Config