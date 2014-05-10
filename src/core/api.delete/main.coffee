#class global.api
global.Core.Helpers.MakeGlobalNamespaceFromString('global.api')

###requirejs.config
  packages : [
    {
      name : 'api.inits',
      location : './api/inits',
      main : '_inits_'
    },
    {
      name : 'api.classes',
      location : './api/classes',
      main : '_classes_'
    }
  ]###
define [
  'api.inits',
  'api.classes'
], () ->