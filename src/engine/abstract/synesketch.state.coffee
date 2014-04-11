#define 'engine/synesketch.state', [], () ->
emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Abstract.SynesketchState')

class emo$.Engine.Abstract.SynesketchState
  constructor: (@text) ->
  getText: ->
    @text