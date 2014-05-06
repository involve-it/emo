define [], () ->
  class window.EmpathyBox
    constructor:(@$canvas, @$textArea, @$butt)->
      that = @
      # setup textArea:
      ###
      @$textArea.keypress (e)->
        if e.which is 13
          text = $(this).val().trim()
          that.empathyPanel.fireSynesthesiator text
        return
      ###
      @$butt.click (e)->
        text = that.$textArea.val().trim()
        # here goes new empathy panel code:
        #input:
        #$('element').emo$('element').emotion();
        #or:

        emotion = tetamo('element').emotion(); # parse one emotion, w/o context
        #or
        emotion = tetamo('element').context().emotion(); # set context to element, and parse one emotion, w/o context

        #processing:
        @synesthesiator = new emo$.Engine.Emotion.SynesthesiatorEmotion()
        @synesthesiator.synesthesize(text)
        #output:
        #@applet = new emo$.art.sketch.synemania($canvas)
        results = $canvas.tetamo().output('applet').draw();
        #results = @applet.draw()

      setInterval(->
        results = that.empathyPanel.applet.draw()
      , 10)
    getAppCanvas: ->
      @empathyPanel # ?= new EmpathyCanvas(100, SynesthesiatorEmotion)
    getTextArea: () ->
      @$textArea