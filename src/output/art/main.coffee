global.core.helpers.MakeGlobalNamespaceFromString('output.art')
###confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)###
define [
  'output/art/sketch/main',
  'output/art/utils/main'
], () ->
