class emo$.art
###confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)###
define [
  './sketch/_sketch_',
  './utils/_utils_'
], () ->
