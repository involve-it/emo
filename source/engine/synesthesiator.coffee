#Defines common behavior for transfering textual information into visual output and notifying
#Processing applet (PApplet) about that new information.
# todo: make this abstract
define [], () ->
  class emo$.Engine.Synesthesiator
    constructor:()->
      @updateMethod = () ->
        console.log 'this is update method'
    notifyPApplet:(state) ->
      if (@updateMethod != null and !_.isUndefined(@updateMethod))
        try
          @updateMethod(state);
        catch e
          e.printStackTrace();
          @updateMethod = null;
      @

    synesthesise:(text) -> throw 'abstract-has to be overriden!';