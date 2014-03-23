// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    return emo$.Engine.Emotion.EmotionalState = (function(_super) {
      var emotions, generalWeight, previous, valence;

      __extends(EmotionalState, _super);

      generalWeight = 0.0;

      valence = 0;

      previous = null;

      emotions = null;

      function EmotionalState(text, emotions, generalWeight, valence) {
        EmotionalState.__super__.constructor.call(this, text);
        emotions = emotions || [];
        this.valence = valence;
        if (emotions.length === 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion(1.0, emo$.Engine.Emotion.Emotion.NEUTRAL));
        }
        this;
      }

      EmotionalState.prototype.getStrongestEmotion = function() {
        return emotions[0];
      };

      EmotionalState.prototype.getFirstStrongestEmotions = function(stop) {
        var e, value, _i, _len;
        value = [];
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (stop <= 0) {
            break;
          }
          value.push(e);
          stop--;
        }
        return value;
      };

      EmotionalState.prototype.getHappiness = function() {
        var e, value, _i, _len;
        value = new Emotion(0.0, Emotion.HAPPINESS);
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (e.getType() === Emotion.HAPPINESS) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getHappinessWeight = function() {
        return getHappiness().getWeight();
      };

      EmotionalState.prototype.getSadness = function() {
        var e, value, _i, _len;
        value = new Emotion(0.0, Emotion.SADNESS);
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (e.getType() === Emotion.SADNESS) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getSadnessWeight = function() {
        return getSadness().getWeight();
      };

      EmotionalState.prototype.getFear = function() {
        var e, value, _i, _len;
        value = new Emotion(0.0, Emotion.FEAR);
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (e.getType() === Emotion.FEAR) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getFearWeight = function() {
        return getFear().getWeight();
      };

      EmotionalState.prototype.getAnger = function() {
        var e, value, _i, _len;
        value = new Emotion(0.0, Emotion.ANGER);
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (e.getType() === Emotion.ANGER) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getAngerWeight = function() {
        return getAnger().getWeight();
      };

      EmotionalState.prototype.getDisgust = function() {
        var e, value, _i, _len;
        value = new Emotion(0.0, Emotion.DISGUST);
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (e.getType() === Emotion.DISGUST) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getDisgustWeight = function() {
        return getDisgust().getWeight();
      };

      EmotionalState.prototype.getSurprise = function() {
        var e, value, _i, _len;
        value = new Emotion(0.0, Emotion.SURPRISE);
        for (_i = 0, _len = emotions.length; _i < _len; _i++) {
          e = emotions[_i];
          if (e.getType() === Emotion.SURPRISE) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getSurpriseWeight = function() {
        return getSurprise().getWeight();
      };

      EmotionalState.prototype.getPrevious = function() {
        return this.previous;
      };

      EmotionalState.prototype.setPrevious = function(previous) {
        return this.previous = previous;
      };

      EmotionalState.prototype.getValence = function() {
        return this.valence;
      };

      EmotionalState.prototype.getGeneralWeight = function() {
        return generalWeight;
      };

      EmotionalState.prototype.toString = function() {
        var ret;
        return ret = "Text: " + text + "\nGeneral weight: " + generalWeight + "\nValence: " + valence + "\nHappiness weight: " + getHappinessWeight() + "\nSadness weight: " + getSadnessWeight() + "\nAnger weight: " + getAngerWeight() + "\nFear weight: " + getFearWeight() + "\nDisgust weight: " + getDisgustWeight() + "\nSurprise weight: " + getSurpriseWeight() + "\n";
      };

      return EmotionalState;

    })(emo$.Engine.SynesketchState);
  });

}).call(this);

//# sourceMappingURL=emotional.state.map
