define [
  'core/helpers'
], () ->
  class Config
    # flat files url
    #@dataServerRoot = 'https://tetamo.com/data'
    @dataServerRoot = 'http://localhost:8899'
    #@dataServerRoot = 'http://127.0.0.1:1111/getfile'
    #@dataServerRoot = 'http://iron-decorator-678.appspot.com/getfile'

    # this flag shows if this is a fully client-side running (all processing and rendering etc. is done in JS) app
    @fullyClientSide = true
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.core.Config'
    object: Config
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'runtime.config'
    object: Config