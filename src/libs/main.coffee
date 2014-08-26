define [
  #'jquery',
  'underscore',
  'xml2json',
  'emitter',
  'text'
], (underscorejs, _x2j, _emitter) ->

  class global.libs

  if (typeof xml2json != 'undefined')
    gX2j = xml2json
  if (typeof jQuery != 'undefined' && typeof jQuery.xml2json != 'undefined')
    jqX2j = jQuery.xml2json
  global.libs.x2js ?= (gX2j || jqX2j)
  #need to set namespaced (non-global) variable of jQuery,$:


  #temp stub for jQuery:
  _$ = {}
  _$.fn = function : () ->

  #turn off globals of jquery:
  #_$.noConflict( true )
  global.libs.$ = global.libs.jQuery = _$

  global.libs._ = underscorejs

  global.libs.emitter = _emitter