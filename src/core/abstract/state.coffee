define [], () ->
  class State
    constructor: (@text) ->
    getText: ->
      @text
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'core.abstract.State'
    object: State