define [], () ->
  ns1 = emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Abstract.SynesketchState')

  class SynesketchState
    constructor: (@text) ->
    getText: ->
      @text
  emo$.Engine.Abstract.SynesketchState  = SynesketchState