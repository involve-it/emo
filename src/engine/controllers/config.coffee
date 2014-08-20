define [
  'engine.classes'
], () ->
  class Config extends global.engine.classes.AbstractController
    # flat files url
    #@dataServerRoot = 'https://tetamo.com/data'
    #@dataServerRoot = 'http://localhost:8899'
    @dataServerRoot = 'http://iron-decorator-678.appspot.com/getfile'

    # this flag shows if this is a fully client-side running (all processing and rendering etc. is done in JS) app
    @fullyClientSide = true
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.controllers.Config'
    object: Config