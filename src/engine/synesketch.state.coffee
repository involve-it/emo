#define 'engine/synesketch.state', [], () ->
emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.SynesketchState')
define [], () ->
  class emo$.Engine.SynesketchState
    constructor: (@text) ->
    getText: ->
      @text