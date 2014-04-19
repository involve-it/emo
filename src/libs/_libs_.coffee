define [
  'core.helpers/static',
  'jquery',
  'underscore',
  'xml2json',
], () ->
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Libs')
  #some libs processing:
  emo$.Libs.x2js = new X2JS()
