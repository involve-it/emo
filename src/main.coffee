requirejs.config
  paths:
    'underscore' : './libs/underscore-1.6.0',
    'jquery' : './libs/jquery-2.1.0',
    'xml2json' : './libs/xml2json'
  shim :
    'underscore':
      exports: ['_']
    'gui' :
      deps : [
        'engine'
      ],
      #exports: ['emo$.e']
    'art' :
      deps : [
        'engine',
        'api'
      ]
    'api' :
      deps : [
        'engine'
      ]
  packages: [
    {
      name : 'api',
      location : './api',
      main : '_api_'
    },
    {
      name : 'api.inits',
      location : './api/inits',
      main : '_inits_'
    },
    {
      name : 'api.classes',
      location : './api/classes',
      main : '_classes_'
    },
    {
      name : 'art',
      location : './art',
      main : '_art_'
    },
    {
      name : 'art.sketch',
      location : './art/sketch',
      main : '_sketch_'
    },
    {
      name : 'art.utils',
      location : './art/utils',
      main : '_utils_'
    },
    {
      name : 'core',
      location : './core',
      main : '_core_'
    },
    {
      name : 'core.helpers',
      location : './core/helpers',
      main : '_helpers_'
    },
    {
      name : 'engine',
      location : './engine',
      main : '_engine_'
    },
    {
      name : 'engine.abstract',
      location : './engine/abstract',
      main : '_abstract_'
    },
    {
      name : 'engine.emotion',
      location : './engine/emotion',
      main : '_emotion_'
    },
    {
      name : 'gui',
      location : './gui',
      main : '_gui_'
    },
    {
      name : 'libs',
      location : './libs',
      main : '_libs_'
    }
  ],
  timeout : 100
window.tetamo = {}
require [
  'libs'
  'core'
], () ->
  require [
    'engine'
  ], () ->
    require [
      'api',
      'gui',
      'art'
    ], (underscore, synesketchState, synesthesiator) ->
      require [
        #'./views/empathy.box.js'
      ], () ->

        #empathyBox = new EmpathyBoxView($('#canvas'), $('#textArea'), $('#butt'))
        #$('#butt').trigger('click')
        # moved here from emplathy.box view:
        $('#butt').click (e)->
          #input:
          #emotion = tetamo('#textArea').tetamo('text').context().emotion(); # set context to element, and parse one emotion, w/o context
          #or
          emotion = $('#textArea').emotion() # <- jquery style
          #or
          emotion = new tetamo.input.text.dom.emotion('elementId') # <- pure vanila style

          #processing:
          emotion.
          #@synesthesiator = new emo$.Engine.Emotion.SynesthesiatorEmotion()
          #@synesthesiator.synesthesize(text)
          #output:
          #@applet = new emo$.art.sketch.synemania($canvas)

          results = $canvas.emotion(emotion, 'applet')    # <- jquery style
          #or:
          outputObject = new tetamo.output.art.applet()  # <- pure vanila style
          results = outputObject.draw();
          #or
          #results = @applet.draw()
