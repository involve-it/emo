define 'engine/synesketch.state', [], () ->
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.SynesketchState')
  class emo$.Engine.SynesketchState
    constructor: (@text) ->
    getText: ->
      @text