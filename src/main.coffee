###*
* @param {String} asdf
* @param {bool} THe asdfa
* @return {String}
*###

requirejs.config
  paths:
    'underscore' : './libs/underscore-1.6.0',
    'jquery' : './libs/jquery-2.1.0',
    'xml2json' : './libs/xml2json',
    'bootstrap' : './libs/bootstrap'
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
  window.jQuery = window.$ = global.libs.$

  require [
    'core', 'bootstrap'
  ], () ->
    ###require [
      'input', 'output'
    ], () ->###
    #synCanvas = global.libs.$('#canvas').art('default')
    #results = global.libs.$('#canvas').art('context1')
    results1 = null
    #emotion = global.libs.$('#textArea').emo()
    #canvasArt1 = global.libs.$('#canvas').art()
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
    #setInterval ()->
      #res1 = canvasArt1.draw('default')
    #, 1

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
      #$(this).backgroundEmotion('test')
    )
#    global.libs.$('#testHoverA').hover((e)->
#      global.libs.$(this).urlEmotion(global.libs.$(this).attr('href'), 'hoverUrl')
#    )
    createTooltip = (event, canvas)->
      $('<div class="tooltip" id="tooltip1">test</div>').appendTo('body')
      canvas.appendTo('#tooltip1')

      positionTooltip(event)


    positionTooltip = (event)->
      tPosX = event.pageX - 10;
      tPosY = event.pageY - 500;
      $('div.tooltip').css({'position': 'absolute', 'top': tPosY, 'left': tPosX})
    i = 0
    global.libs.$('#testHoverA1').hover((event)->
      canvas1 = global.libs.$('<canvas id="canvasHoverTemp"></canvas>')
      canvas1.css(background: 'white', border: '1px orange solid')
      canvasArt1 = canvas1.art('hoverUrl1')
      setInterval ()->
        res1 = canvasArt1.draw('hoverUrl1')
      , 1
      global.libs.$(this).urlEmotion(global.libs.$(this).attr('href'), 'hoverUrl1')
      global.libs.$(window).on 'context:feel:hoverUrl1', (e, state)->
        debugger
        i++
        if (i<2)
          createTooltip(event, canvas1);
    )
    global.libs.$('#testHoverA1').mouseout((e)->
      setTimeout ()->
        debugger
        global.libs.$('#tooltip1').remove()
      , 2000
    )


    global.libs.$('#testHoverA2').hover((e)->
      global.libs.$(this).urlEmotion(global.libs.$(this).attr('href'), 'hoverUrl2')
      global.libs.$(window).on 'context:feel:hoverUrl2', (e, state)->
        debugger
    )

    # todo: alternative of semantics:
    #global.libs.$('#contentDiv').input('text')
    #global.libs.$('#contentDiv').output('art.sketch.background')

