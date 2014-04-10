(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.Emotion');

  emo$.Engine.Emotion.Emotion = (function() {
    function Emotion(weight, type) {
      this.weight = weight;
      this.type = type;
    }

    Emotion.prototype.compareTo = function(arg0) {
      var value;
      value = 100 * ((arg0.weight != null) - this.weight);
      if (value === 0) {
        return 1;
      }
      return value;
    };

    Emotion.prototype.getType = function() {
      return this.type;
    };

    Emotion.prototype.setType = function(type) {
      this.type = type;
    };

    Emotion.prototype.getWeight = function() {
      return this.weight;
    };

    Emotion.prototype.setWeight = function(weight) {
      this.weight = weight;
    };

    Emotion.prototype.toString = function() {
      return "Type number: " + this.type + ", weight: " + this.weight;
    };

    return Emotion;

  })();

  emo$.Engine.Emotion.Emotion.NEUTRAL = -1;

  emo$.Engine.Emotion.Emotion.HAPPINESS = 0;

  emo$.Engine.Emotion.Emotion.SADNESS = 1;

  emo$.Engine.Emotion.Emotion.FEAR = 2;

  emo$.Engine.Emotion.Emotion.ANGER = 3;

  emo$.Engine.Emotion.Emotion.DISGUST = 4;

  emo$.Engine.Emotion.Emotion.SURPRISE = 5;

}).call(this);
