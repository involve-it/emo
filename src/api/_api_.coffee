class emo$.api
requirejs.config
  packages : [
    {
      name : 'api.inits',
      location : './api/inits',
      main : '_api_'
    }
  ]
define [
  'api.inits',
  'api.classes'
], () ->