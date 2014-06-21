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
    canvasArt1 = $('#canvas').art();

    #set the emoticons:
    $('#emoticons').emoticon()
    $('#butt').click (e)->
      emotion = $('#textArea').emo()
    setInterval ()->
      res = canvasArt1.draw('default')
      #res = synCanvas.draw()
      #console.log(res)
    ,1


