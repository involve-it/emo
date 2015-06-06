var processor;

processor = new global.processors.client.ClientProcessor(global.runtime.app);

processor.runOrWait('lexical:ready', function() {
  global.runtime.app.emit('processor:ready');
  return processor.ready.call();
});

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.app.processor',
  object: processor,
  global: global,
  shortcut: 'eо$p'
});
