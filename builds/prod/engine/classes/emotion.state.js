(function() {
  define(['classes/emotion'], function() {
    var EmotionState;
    EmotionState = (function() {
      var _Emotion;

      _Emotion = global.engine.classes.Emotion;

      EmotionState.prototype._generalWeight = 0.0;

      EmotionState.prototype._valence = 0;

      EmotionState.prototype._previous = null;

      EmotionState.prototype._emotions = [];

      function EmotionState(text, _emotions, _generalWeight, _valence) {
        this.text = text;
        this._generalWeight = _generalWeight;
        this._valence = _valence;
        this._emotions = _emotions || this._emotions;
        if (this._emotions.length === 0) {
          this._emotions.push(new _Emotion(1.0, _Emotion.NEUTRAL));
        }
        this;
      }

      EmotionState.prototype.getStrongestEmotion = function() {
        return _.max(this._emotions, function(emotion) {
          return emotion.weight;
        });
      };

      EmotionState.prototype.getFirstStrongestEmotions = function(stop) {
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

      EmotionState.prototype.getHappiness = function() {
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

      EmotionState.prototype.getHappinessWeight = function() {
        return this.getHappiness().getWeight();
      };

      EmotionState.prototype.getSadness = function() {
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

      EmotionState.prototype.getSadnessWeight = function() {
        return this.getSadness().getWeight();
      };

      EmotionState.prototype.getFear = function() {
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

      EmotionState.prototype.getFearWeight = function() {
        return this.getFear().getWeight();
      };

      EmotionState.prototype.getAnger = function() {
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

      EmotionState.prototype.getAngerWeight = function() {
        return this.getAnger().getWeight();
      };

      EmotionState.prototype.getDisgust = function() {
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

      EmotionState.prototype.getDisgustWeight = function() {
        return this.getDisgust().getWeight();
      };

      EmotionState.prototype.getSurprise = function() {
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

      EmotionState.prototype.getSurpriseWeight = function() {
        return this.getSurprise().getWeight();
      };

      EmotionState.prototype.getPrevious = function() {
        return this.previous;
      };

      EmotionState.prototype.setPrevious = function(_previous) {
        return this.previous = _previous;
      };

      EmotionState.prototype.getValence = function() {
        return this._valence;
      };

      EmotionState.prototype.getGeneralWeight = function() {
        return this._generalWeight;
      };

      EmotionState.prototype.toString = function(separator) {
        var ret;
        if (separator) {
          ret = this.text + separator + this.getGeneralWeight() + separator + this.getValence() + separator + this.getHappinessWeight() + separator + this.getSadnessWeight() + separator + this.getAngerWeight() + separator + this.getFearWeight() + separator + this.getDisgustWeight() + separator + this.getSurpriseWeight();
        } else {
          ret = "Text: " + this.text + "\n General weight: " + this.getGeneralWeight() + "\nValence: " + this.getValence() + "\nhappiness: " + this.getHappinessWeight() + ",\nsadness: " + this.getSadnessWeight() + ",\nanger: " + this.getAngerWeight() + ",\nfear: " + this.getFearWeight() + ",\ndisgust: " + this.getDisgustWeight() + ",\nsurprise: " + this.getSurpriseWeight() + "\n";
        }
        return ret;
      };

      EmotionState.prototype.toHtml = function() {
        var ret;
        ret = "<i>Input text:</i> <b class='htmlText'>" + this.text + "</b><br/> <i>General weight: </i>" + this.getGeneralWeight() + "\n<i>Valence: </i>" + this.getValence() + "\n<i>happiness: </i>" + this.getHappinessWeight() + ",\n<i>sadness: </i>" + this.getSadnessWeight() + ",\n<i>anger: </i>" + this.getAngerWeight() + ",\n<i>fear: </i>" + this.getFearWeight() + ",\n<i>disgust: </i>" + this.getDisgustWeight() + ",\n<i>surprise: </i>" + this.getSurpriseWeight() + "\n";
        return ret;
      };

      return EmotionState;

    })();
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'engine.classes.EmotionState',
      object: EmotionState
    });
  });

}).call(this);
