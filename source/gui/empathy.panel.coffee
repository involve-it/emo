define [], () ->
  class emo$.Gui.EmpathyPanel
    constructor:(appletSize, SynClass, $el)->
      @$el = $el
      @synesthesiator = new SynClass()
      @synesthesiator.updateMethod(@$el)
    fireSynesthesiator: (text) ->
      @synesthesiator.synesthesize(text)
