(function() {
  var Processor;

  Processor = (function() {
    function Processor() {}

    return Processor;

  })();

  define(['processors/client/main'], function() {
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'engine.processors',
      object: Processor
    });
  });

}).call(this);
