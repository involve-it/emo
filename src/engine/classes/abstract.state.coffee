define [], () ->
  class AbstractState
    constructor: (@text) ->
    getText: ->
      @text
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.classes.AbstractState'
    object: AbstractState