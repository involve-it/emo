define(['processors/client/client.processor', 'processors/client/controllers/main', 'processors/client/classes/affect.word'], function() {
  var processor;
  processor = new global.processors.client.ClientProcessor(global.runtime.app);
  processor.runOrWait('lexical:ready', function() {
    global.runtime.app.emit('processor:ready');
    return processor.ready.call();
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.processor',
    object: processor,
    global: global,
    shortcut: 'e$rp'
  });
});
