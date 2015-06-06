var Emotion,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Emotion = (function(_super) {
  __extends(Emotion, _super);

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

  Emotion.prototype.getName = function() {
    switch (this.type) {
      case -1:
        return 'NEUTRAL';
      case 0:
        return 'HAPPINESS';
      case 1:
        return 'SADNESS';
      case 2:
        return 'FEAR';
      case 3:
        return 'ANGER';
      case 4:
        return 'DISGUST';
      case 5:
        return 'SURPRISE';
    }
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

  Emotion.NEUTRAL = -1;

  Emotion.HAPPINESS = 0;

  Emotion.SADNESS = 1;

  Emotion.FEAR = 2;

  Emotion.ANGER = 3;

  Emotion.DISGUST = 4;

  Emotion.SURPRISE = 5;

  Emotion.TYPES = {
    TEXT: "TEXT",
    TOUCH: "TOUCH"
  };

  return Emotion;

})(global.engine.classes.AbstractEmotion);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.Emotion',
  object: Emotion
});
