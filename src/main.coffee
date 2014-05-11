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
    synCanvas = $('#canvas').art('default')
    #results = $('#canvas').art('context1')
    $('#butt').click (e)->
      emotion = $('#textArea').emo() # <- jquery style
      results1 = synCanvas.draw();

    setInterval ()->
      res = synCanvas.draw()
      #console.log(res)
    ,1


