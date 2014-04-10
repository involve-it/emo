(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Synesthesiator');

  emo$.Engine.Synesthesiator = (function() {
    function Synesthesiator(parent) {
      this.parent = parent;
      this.updateMethod = parent.synesketchUpdate;
      if (this.updateMethod == null) {
        this.updateMethod = function() {
          throw 'abstract method!';
          return console.log('this is update method');
        };
      }
    }

    Synesthesiator.prototype.notifyPApplet = function(state) {
      if (this.updateMethod !== null && !_.isUndefined(this.updateMethod)) {
        this.updateMethod.call(this.parent, state);
      }
      return this;
    };

    Synesthesiator.prototype.synesthesise = function(text) {
      throw 'abstract-has to be overriden!';
    };

    return Synesthesiator;

  })();

}).call(this);
