#requirejs.config
#  paths:
#    'underscore' : './libs/underscore-1.6.0'
#    #'jquery' : './libs/jquery-2.1.0'
#    'xml2json' : './libs/xml2json'
#    'emitter' : './libs/emitter'
#    'text' : './libs/require/text'
#  shim :
#    'underscore':
#      exports: ['_']
#define [
#  #'jquery',
#  'underscore',
#  'xml2json',
#  'emitter',
#  'text'
#], (underscorejs, _x2j, _emitter) ->
#
#  class global.libs
#
#  if (typeof xml2json != 'undefined')
#    gX2j = xml2json
#  if (typeof jQuery != 'undefined' && typeof jQuery.xml2json != 'undefined')
#    jqX2j = jQuery.xml2json
#  global.libs.x2js ?= (gX2j || jqX2j)
#  #need to set namespaced (non-global) variable of jQuery,$:
#
#
#  #temp stub for jQuery:
#  _$ = {}
#  _$.fn = function : () ->
#
#  #turn off globals of jquery:
#  #_$.noConflict( true )
#  global.libs.$ = global.libs.jQuery = _$
#
#  global.libs._ = underscorejs
#
#  global.libs.emitter = _emitter

global.libs = window.ej$l = {}