var app;

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine',
  object: this,
  global: global,
  shortcut: 'e$e'
});

global.runtime.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r');

app = new global.engine.controllers.App;

global.runtime.app = app;


/*require [
], () ->
 */

app.once('processor:ready', function() {
  var appReadyEvent;
  appReadyEvent = new Event('app:ready');
  window.document.dispatchEvent(appReadyEvent);
  return app.start();
});
