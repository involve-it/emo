
/*define [
  '../synesketch.state'
], () ->
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.EmotionalState');

  define([], function() {
    return emo$.Engine.Emotion.EmotionalState = (function(_super) {
      var _Emotion;

      __extends(EmotionalState, _super);

      _Emotion = emo$.Engine.Emotion.Emotion;

      EmotionalState.prototype._generalWeight = 0.0;

      EmotionalState.prototype._valence = 0;

      EmotionalState.prototype._previous = null;

      EmotionalState.prototype._emotions = [];

      function EmotionalState(text, _emotions, _generalWeight, _valence) {
        this._generalWeight = _generalWeight;
        this._valence = _valence;
        EmotionalState.__super__.constructor.call(this, text);
        this._emotions = _emotions || this._emotions;
        if (this._emotions.length === 0) {
          this._emotions.push(new _Emotion(1.0, _Emotion.NEUTRAL));
        }
        this;
      }

      EmotionalState.prototype.getStrongestEmotion = function() {
        return this._emotions[0];
      };

      EmotionalState.prototype.getFirstStrongestEmotions = function(stop) {
        var e, value, _i, _len, _ref;
        value = [];
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (stop <= 0) {
            break;
          }
          value.push(e);
          stop--;
        }
        return value;
      };

      EmotionalState.prototype.getHappiness = function() {
        var e, value, _i, _len, _ref;
        value = new _Emotion(0.0, _Emotion.HAPPINESS);
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (e.getType() === _Emotion.HAPPINESS) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getHappinessWeight = function() {
        return this.getHappiness().getWeight();
      };

      EmotionalState.prototype.getSadness = function() {
        var e, value, _i, _len, _ref;
        value = new _Emotion(0.0, _Emotion.SADNESS);
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (e.getType() === _Emotion.SADNESS) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getSadnessWeight = function() {
        return this.getSadness().getWeight();
      };

      EmotionalState.prototype.getFear = function() {
        var e, value, _i, _len, _ref;
        value = new _Emotion(0.0, _Emotion.FEAR);
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (e.getType() === _Emotion.FEAR) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getFearWeight = function() {
        return this.getFear().getWeight();
      };

      EmotionalState.prototype.getAnger = function() {
        var e, value, _i, _len, _ref;
        value = new _Emotion(0.0, _Emotion.ANGER);
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (e.getType() === _Emotion.ANGER) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getAngerWeight = function() {
        return this.getAnger().getWeight();
      };

      EmotionalState.prototype.getDisgust = function() {
        var e, value, _i, _len, _ref;
        value = new _Emotion(0.0, _Emotion.DISGUST);
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (e.getType() === _Emotion.DISGUST) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getDisgustWeight = function() {
        return this.getDisgust().getWeight();
      };

      EmotionalState.prototype.getSurprise = function() {
        var e, value, _i, _len, _ref;
        value = new _Emotion(0.0, _Emotion.SURPRISE);
        _ref = this._emotions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (e.getType() === _Emotion.SURPRISE) {
            value = e;
          }
        }
        return value;
      };

      EmotionalState.prototype.getSurpriseWeight = function() {
        return this.getSurprise().getWeight();
      };

      EmotionalState.prototype.getPrevious = function() {
        return this.previous;
      };

      EmotionalState.prototype.setPrevious = function(_previous) {
        return this.previous = _previous;
      };

      EmotionalState.prototype.getValence = function() {
        debugger;
        return this._valence;
      };

      EmotionalState.prototype.getGeneralWeight = function() {
        return this._generalWeight;
      };

      EmotionalState.prototype.toString = function(separator) {
        var ret;
        if (separator) {
          ret = this.text + separator + this.getGeneralWeight() + separator + this.getValence() + separator + this.getHappinessWeight() + separator + this.getSadnessWeight() + separator + this.getAngerWeight() + separator + this.getFearWeight() + separator + this.getDisgustWeight() + separator + this.getSurpriseWeight();
        } else {
          ret = "Text: " + this.text + "\nGeneral weight: " + this.getGeneralWeight() + "\nValence: " + this.getValence() + "\nHappiness weight: " + this.getHappinessWeight() + "\nSadness weight: " + this.getSadnessWeight() + "\nAnger weight: " + this.getAngerWeight() + "\nFear weight: " + this.getFearWeight() + "\nDisgust weight: " + this.getDisgustWeight() + "\nSurprise weight: " + this.getSurpriseWeight() + "\n";
        }
        return ret;
      };

      return EmotionalState;

    })(emo$.Engine.SynesketchState);
  });

}).call(this);
