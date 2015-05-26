(function() {
  requirejs.config({
    shim: {
      'core': {
        deps: ['libs']
      },
      'classes': {
        deps: ['core']
      },
      'controllers': {
        deps: ['core', 'classes']
      }
    },
    packages: [
      {
        name: 'classes',
        location: './engine/classes'
      }, {
        name: 'controllers',
        location: './engine/controllers'
      }, {
        name: 'core',
        location: './engine/core'
      }
    ]
  });

  define(['core', 'classes', 'controllers'], function() {
    var app;
    emojs.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'engine',
      object: this,
      global: global,
      shortcut: 'e$e'
    });
    global.engine.core.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r');
    app = new emojs.engine.controllers.App;
    global.runtime.app = app;

    /*require [
    ], () ->
     */
    return app.once('processor:ready', function() {
      var appReadyEvent;
      appReadyEvent = new Event('app:ready');
      window.document.dispatchEvent(appReadyEvent);
      return app.start();
    });
  });

}).call(this);
