ns = emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine')#class emo$.Engine #extends Api.Classes.FolderLoader
define [
  'engine.abstract',
  #'engine.emotion'
], () ->
  ns
#we have to add entry point: todo(think how to deal with this)
require(['engine'])