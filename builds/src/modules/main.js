requirejs.config({
  packages: [
    {
      name: 'modules.core',
      location: './modules/core'
    }, {
      name: 'modules.sketch',
      location: './modules/sketch'
    }
  ]
});

emojs.runtime.helpers.MakeGlobalNamespaceFromString('modules');

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
