define [], () ->
  class State
    constructor: (@text) ->
    getText: ->
      @text
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'core.abstract.State'
    object: State