###*
* @param {String} asdf
* @param {bool} THe asdfa
* @return {String}
*###
emojsRequire = requirejs.config
  paths:
    #'underscore' : './libs/underscore-1.6.0'
    'jquery' : './libs/jquery-2.1.0'
    #'xml2json' : './libs/xml2json'
    #'emitter' : './libs/emitter'
    #'text' : './libs/require/text'
  shim :
    #'underscore':
    #  exports: ['_']
    'engine':
      deps: [
        'libs'
      ]
    'processors':
      deps: [
        'libs', 'engine'
      ]
    'modules':
      deps: [
        'libs', 'engine'
      ]

  packages: [
    {
      name : 'libs',
      location : './libs',
    }
    {
      name : 'engine',
      location : './engine',
    }
    {
      name : 'modules',
      location : './modules',
    }
    {
      name : 'processors',
      location : './processors',
    }
  ]
  timeout : 10000
window.global = window.emojs = {}
settings = {
  dataServerRoot : '/data'
  #dataServerRoot: 'http://127.0.0.1:1111/getfile'
  #@dataServerRoot = 'http://iron-decorator-678.appspot.com/getfile'
  #@dataServerRoot = 'http://localhost:8899'
  #@dataServerRoot = 'https://tetamo.com/data'
}
window.emojs.settings = settings;

#add all necessary conditions to start using library
window.document.addEventListener 'app:ready', ()->
  emojsReadyEvent = new Event('emojs:ready')
  document.dispatchEvent(emojsReadyEvent)
  window.document.removeEventListener('emojs:ready')
emojsRequire [
  'libs', 'engine', 'processors', 'modules'
], () ->
