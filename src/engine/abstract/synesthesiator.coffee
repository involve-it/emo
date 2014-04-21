#Defines common behavior for transfering textual information into visual output and notifying
#Processing applet (PApplet) about that new information.
# todo: make this abstract
define [],()->
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Abstract.Synesthesiator')
  class Synesthesiator
    constructor:(@parent)->
      @updateMethod = parent.synesketchUpdate
      @updateMethod ?= () ->
        throw 'abstract method!'
        console.log 'this is update method'

    notifyPApplet:(state) ->
      if (@updateMethod != null and !_.isUndefined(@updateMethod))
        @updateMethod.call(@parent, state);
      @

    synesthesise:(text) -> throw 'abstract-has to be overriden!';
  emo$.Engine.Abstract.Synesthesiator = Synesthesiator