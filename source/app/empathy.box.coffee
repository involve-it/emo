define [], () ->
  class window.EmpathyBox
    constructor:(@$canvas, @$textArea, @$butt)->
      that = @
      @empathyPanel = new emo$.Gui.EmpathyPanel(100, emo$.Engine.Emotion.SynesthesiatorEmotion, $canvas)
      # setup textArea:
      @$textArea.keypress (e)->
        if e.which is 13
          text = $(this).val().trim()
          that.empathyPanel.fireSynesthesiator text
        return
      @$butt.click (e)->
        text = that.$textArea.val().trim()
        that.empathyPanel.fireSynesthesiator text

    getAppCanvas: ->
      @empathyPanel # ?= new EmpathyCanvas(100, SynesthesiatorEmotion)
    getTextArea: () ->
      @$textArea