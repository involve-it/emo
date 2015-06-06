requirejs.config
  packages: [
    {
      name : 'modules.core',
      location : './modules/core',
    }
    {
      name : 'modules.sketch',
      location : './modules/sketch',
    }
#    {
#      name : 'modules.datafiles',
#      location : './modules/datafiles',
#    }
#    {
#      name : 'modules.dao',
#      location : './modules/dao',
#    }
  ]
global.runtime.helpers.MakeGlobalNamespaceFromString('modules')
define [
  'modules.core'
  'modules.sketch'
], () ->

###if global.engine.controllers.Config.isFullyClientSide
  define [
    'modules.dao'
  ], () ->
else
  define [
    'modules.datafiles'
  ], () ->###
