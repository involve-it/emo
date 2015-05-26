(function() {
  requirejs.config({
    packages: [
      {
        name: 'modules.core',
        location: './modules/core'
      }, {
        name: 'modules.sketch',
        location: './modules/sketch'
      }, {
        name: 'modules.datafiles',
        location: './modules/datafiles'
      }, {
        name: 'modules.dao',
        location: './modules/dao'
      }
    ]
  });

  emojs.engine.core.helpers.MakeGlobalNamespaceFromString('modules');

  define(['modules.core', 'modules.sketch'], function() {});


  /*if global.engine.controllers.Config.isFullyClientSide
    define [
      'modules.dao'
    ], () ->
  else
    define [
      'modules.datafiles'
    ], () ->
   */

}).call(this);
