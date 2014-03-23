// Generated by CoffeeScript 1.7.1
(function() {
  define([], function() {
    return emo$.Engine.Synesthesiator = (function() {
      function Synesthesiator() {
        this.updateMethod = function() {
          return console.log('this is update method');
        };
      }

      Synesthesiator.prototype.notifyPApplet = function(state) {
        var e;
        if (this.updateMethod !== null && !_.isUndefined(this.updateMethod)) {
          try {
            this.updateMethod(state);
          } catch (_error) {
            e = _error;
            e.printStackTrace();
            this.updateMethod = null;
          }
        }
        return this;
      };

      Synesthesiator.prototype.synesthesise = function(text) {
        throw 'abstract-has to be overriden!';
      };

      return Synesthesiator;

    })();
  });

}).call(this);

//# sourceMappingURL=synesthesiator.map
