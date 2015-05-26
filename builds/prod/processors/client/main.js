(function() {
  define(['processors/client/client.processor', 'processors/client/controllers/main', 'processors/client/classes/affect.word'], function() {
    var processor;
    processor = new emojs.processors.client.ClientProcessor(emojs.runtime.app);
    processor.runOrWait('lexical:ready', function() {
      emojs.runtime.app.emit('processor:ready');
      return processor.ready.call();
    });
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'runtime.app.processor',
      object: processor,
      global: global,
      shortcut: 'e$rp'
    });
  });

}).call(this);
