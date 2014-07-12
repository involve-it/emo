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
    #'underscore' : 'empty:',
    #'jquery' : 'empty:',
    #'xml2json' : 'empty:'
  shim :
    #project:
    #'core/output/main'
    #other
    'underscore':
      exports: ['_']
    'core/api/main' :
      deps : ['core/abstract/main']
  packages: [
    {
      name : 'libs',
      location : './libs',
    }
    {
      name : 'core',
      location : './core',
    }
  ]
  timeout : 10000
global = window.Emo = window.emo = {}
require [
  'libs'
], () ->
  require [
    'core'
  ], () ->
    ###require [
      'input', 'output'
    ], () ->###
    #synCanvas = $('#canvas').art('default')
    #results = $('#canvas').art('context1')
    results1 = null
    emotion = $('#textArea').emo()
    canvasArt1 = $('#canvas').art()
    #canvasTouch1 = $('#canvas').emoTouch();

    #set background of div with emos of the inner text:
    $('#contentDiv').background('contentDiv')
    $('#contentDiv').emo('contentDiv')

    #set the emoticons:
    $('#emoticons').emoticon('default')
    $('#d3').d3('default')
    $('#butt').click (e)->
      emotion = $('#textArea').emo()
    $(window).on 'context:feel:default', (e, state)->
      $('#parsingResult').text(state.toString())
    setInterval ()->
      res1 = canvasArt1.draw('default')
    ,1

    $('#addCanvasBtn').click((e)->
      a = $('<canvas id="canvasOverlay"></canvas>')
      b = $('#contentDiv')
      b.append(a)
      a.attr('style', 'width: ' + b.css('width') + '; height: ' + b.css('height') + ';position: absolute;top:0;')
      #add emo functionality, touch:
      a.emoTouch()
      #setTimeout () ->
        #a.remove()
      #, 3000
    )

    #alternative of semantics:
    #$('#contentDiv').input('text')
    #$('#contentDiv').output('art.sketch.background')

