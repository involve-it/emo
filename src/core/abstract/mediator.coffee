#Defines common behavior for transfering textual information into visual output and notifying
#Processing applet (PApplet) about that new information.
define [],()->
  class Mediator
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
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'core.abstract.Mediator'
    object: Mediator