define(['processors/server/server.processor', 'processors/server/controllers/main'], function() {
  var processor;
  processor = new emojs.processors.server.ServerProcessor(emojs.runtime.app);
  global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.processor',
    object: processor,
    global: global,
    shortcut: 'e$rp'
  });
  return emojs.runtime.app.emit('processor:ready');
});
