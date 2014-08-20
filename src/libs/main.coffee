define [
  'jquery',
  'underscore',
  'xml2json',
  'text'
], (_$) ->
  #turn off globals of jquery:
  _$.noConflict( true )
  class global.libs
  global.libs.x2js = new X2JS()
  #need to set namespaced (non-global) variable of jQuery,$:
  global.libs.$ = global.libs.jQuery = _$
