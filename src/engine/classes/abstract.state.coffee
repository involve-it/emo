define [], () ->
  class AbstractState
    constructor: (@text) ->
    getText: ->
      @text
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.classes.AbstractState'
    object: AbstractState