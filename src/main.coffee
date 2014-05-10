###*
* @param {String} asdf
* @param {bool} THe asdfa
* @return {String}
*###

requirejs.config
  paths:
    'underscore' : './libs/underscore-1.6.0',
    'jquery' : './libs/jquery-2.1.0',
    'xml2json' : './libs/xml2json'
  shim :
    #project:
    'input' :
      deps : ['core']
    'output' :
      deps : ['core']
    #other
    'underscore':
      exports: ['_']
  packages: [
    {
      name : 'libs',
      location : './libs',
    }
    {
      name : 'core',
      location : './core',
    }
    {
      name : 'input',
      location : './input',
    }
    {
      name : 'output',
      location : './output',
    }
  ]
  timeout : 10000
global = window.Emo = window.emo = {}
require [
  'libs'
], () ->
  require [
    'core', 'input', 'output'
  ], () ->
    #empathyBox = new EmpathyBoxView($('#canvas'), $('#textArea'), $('#butt'))
    #$('#butt').trigger('click')
    # moved here from emplathy.box view:
    $('#butt').click (e)->
      debugger
      #input:
      #emotion = tunder('#textArea').tunder('text').context().emotion(); # set context to element, and parse one emotion, w/o context
      #or
      emotion = $('#textArea').emotion() # <- jquery style
      #or
      emotion = new emo.input.Emotion('elementId') # <- pure vanila style

      #processing:

      #@synesthesiator = new global.Engine.Emotion.SynesthesiatorEmotion()
      #@synesthesiator.synesthesize(text)
      #output:
      #@applet = new global.art.sketch.synemania($canvas)

      results = $canvas.emotion(emotion, 'applet')    # <- jquery style
      #or:
      outputObject = new global.output.art.applet()  # <- pure vanila style
      results = outputObject.draw();
      #or
      #results = @applet.draw()
