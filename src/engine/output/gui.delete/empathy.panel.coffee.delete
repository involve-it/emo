emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Gui.EmpathyPanel')
define [], () ->
  class emo$.Gui.EmpathyPanel
    appletClassNamePrefix = 'emo$.art.sketch.'

    constructor:(appletSize, SynClass, artType, $el)->
      @$el = $el
      appletClass = eval(appletClassNamePrefix + artType)
      @applet = new appletClass($el)
      @synesthesiator = new SynClass(@applet)
    fireSynesthesiator: (text) ->
      @synesthesiator.synesthesize(text)