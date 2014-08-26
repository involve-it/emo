contextReq = require.config
  context: 'widget.blogspot'
  packages: [
    {
      name : 'modules.datafiles',
      location : './modules/datafiles',
    }
    {
      name : 'modules.dao',
      location : './modules/dao',
    }
  ]
global.engine.helpers.MakeGlobalNamespaceFromString('modules')

if global.engine.controllers.Config.isFullyClientSide
  define [
    'modules.dao'
  ], () ->
else
  define [
    'modules.datafiles'
  ], () ->
