(function() {
  var AbstractContext;

  global.engine.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractContext',
    object: AbstractContext = (function() {
      function AbstractContext(val) {
        this.val = val;
      }

      return AbstractContext;

    })()
  });

  define([], function() {});

}).call(this);
