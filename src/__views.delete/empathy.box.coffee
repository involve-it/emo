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
        #$('element').emo('text').emotion();
        #or:

        emotion = $('element').emo(); # parse one emotion from text, equal to 'text' (default value)
        emotion = $('element').emo('text'); # parse one emotion from text OR: emotion = $('element').emoText()
        emotion = $('element').emo('context'); # parse emotions, from context
        emotion = $('element').emo('image'); # parse one emotion from image
        emotion = $('element').emo('link'); # parse one emotion, w/o context
        #or
        emotion = $('element').emo().context().emotion(); # set context to element, and parse one emotion, w/o context

        #processing:
        @synesthesiator = new global.core.api.SynesthesiatorEmotion()
        @synesthesiator.synesthesize(text)
        #output:
        emotion.out(); # output one emotion from text, equal to 'art' (default value)
        emotion.out('art.synemania'); # parse one emotion from text
        #OR
        emotion.art(); # output one emotion from emotion object using 'art' functionality. Default art module is synemania.
        emotion.art('synemania'); # output one emotion from emotion object using 'art' functionality, 'synemania' module
        emotion.chart('bar'); #
        emotion.emoticon(); #
        emotion.emoticon('myOwnPics'); #
        #@applet = new global.output.art.sketch.synemania($canvas)
        #results = $canvas.tetamo().output('applet').draw();
        #results = @applet.draw()

      setInterval(->
        results = that.empathyPanel.applet.draw()
      , 10)
    getAppCanvas: ->
      @empathyPanel # ?= new EmpathyCanvas(100, SynesthesiatorEmotion)
    getTextArea: () ->
      @$textArea