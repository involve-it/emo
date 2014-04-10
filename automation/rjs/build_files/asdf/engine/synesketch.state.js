(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.SynesketchState');

  define([], function() {
    return emo$.Engine.SynesketchState = (function() {
      function SynesketchState(text) {
        this.text = text;
      }

      SynesketchState.prototype.getText = function() {
        return this.text;
      };

      return SynesketchState;

    })();
  });

}).call(this);
