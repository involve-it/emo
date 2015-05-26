var Processor;

Processor = (function() {
  function Processor() {}

  return Processor;

})();

define(['processors/client/main'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors',
    object: Processor
  });
});
