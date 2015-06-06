var Processor;

Processor = (function() {
  function Processor() {}

  return Processor;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.processors',
  object: Processor
});
