emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.art')
###confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)###
define [
  'art.sketch/_sketch_',
  'art.utils/_utils_'
], () ->
