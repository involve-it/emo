class emo$.Engine #extends Api.Classes.FolderLoader
define [
  './utils/_utils_.js',
  './emotion/_emotion_.js',
  #'engine/synesketch.state',
  #'./synesthesiator.js'
], () ->
  emo$.Engine