(function() {
  define([], function() {
    var AbstractState;
    AbstractState = (function() {
      function AbstractState(text) {
        this.text = text;
      }

      AbstractState.prototype.getText = function() {
        return this.text;
      };

      return AbstractState;

    })();
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'engine.classes.AbstractState',
      object: AbstractState
    });
  });

}).call(this);
