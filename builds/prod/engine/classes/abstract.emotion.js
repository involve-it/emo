(function() {
  var AbstractEmotion;

  global.engine.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractEmotion',
    object: AbstractEmotion = (function() {
      function AbstractEmotion(val) {
        this.val = val;
      }

      return AbstractEmotion;

    })()
  });

  define([], function() {});

}).call(this);
