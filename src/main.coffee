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
  #turn on jquery global:
  window.$ = global.libs.$

  require [
    'core'
  ], () ->
    ###require [
      'input', 'output'
    ], () ->###
    #synCanvas = global.libs.$('#canvas').art('default')
    #results = global.libs.$('#canvas').art('context1')
    results1 = null
    emotion = global.libs.$('#textArea').emo()
    canvasArt1 = global.libs.$('#canvas').art()
    #canvasTouch1 = global.libs.$('#canvas').emoTouch();

    #set the emoticons:
    global.libs.$('#emoticons').emoticon('default')
    global.libs.$('#d3').d3('default')
    global.libs.$('#butt').click (e)->
      emotion = global.libs.$('#textArea').emo()
    global.libs.$(window).on 'context:feel:default', (e, state)->
      console.log('default context felt: ' + state.toHtml())
      global.libs.$('#parsingResult').html(state.toHtml())
    global.libs.$(window).on 'context:feel:test', (e, state)->
      console.log('test context felt: ' + state.toHtml())
    setInterval ()->
      res1 = canvasArt1.draw('default')
    , 1

    global.libs.$('#addCanvasBtn').click((e)->
      a = global.libs.$('<canvas id="canvasOverlay"></canvas>')
      b = global.libs.$('#contentDiv')
      b.append(a)
      a.attr('style', 'width: ' + b.css('width') + '; height: ' + b.css('height') + ';position: absolute;top:0;')
      #add emo functionality, touch:
      a.emoTouch()
      #setTimeout () ->
        #a.remove()
      #, 3000
    )

    global.libs.$('#addCanvasBtn1').click((e)->
      $('#contentDiv>p').backgroundEmotion('test')
    )
    global.libs.$('#addCanvasBtn2').click((e)->
      #set background of div with emos of the inner text:
      global.libs.$('#contentDiv').background('contentDiv')
      global.libs.$('#contentDiv').emo('contentDiv')
    )

    global.libs.$('#contentDiv>p').hover((e)->
      $(this).clearBackground()
    )
    global.libs.$('#contentDiv>p').mouseleave((e)->
      $(this).backgroundEmotion('test')
    )
    # todo: alternative of semantics:
    #global.libs.$('#contentDiv').input('text')
    #global.libs.$('#contentDiv').output('art.sketch.background')

