(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.Helpers.Heuristics');

  emo$.Engine.Emotion.Helpers.Heuristics = (function() {
    var countChars, isCapsLock, isIntensityModifier;

    function Heuristics() {}

    isCapsLock = function(word) {
      var x, _i, _ref;
      for (x = _i = 1, _ref = word.length; _i < _ref; x = _i += 1) {
        if (word[x] === word[x].toLowerCase()) {
          return false;
        }
      }
      return true;
    };

    isIntensityModifier = function(word) {
      return emo$.Engine.Emotion.Helpers.Lexical.getInstance().isIntensityModifier(word);
    };

    countChars = function(arg, c) {
      var count, i, _i, _ref;
      count = 0;
      for (i = _i = 1, _ref = arg.length; _i < _ref; i = _i += 1) {
        if (arg[i] === c) {
          count++;
        }
      }
      return count;
    };

    Heuristics.computeEmoticonCoefForSentence = function(sentence) {
      var emot, emoticons, value, _fn, _i, _len;
      emoticons = emo$.Engine.Emotion.Helpers.Lexical.getInstance().getEmoticonWords(sentence);
      value = 1.0;
      _fn = function(emot) {
        var emotWord;
        emotWord = emot.getWord();
        return value *= 1.0 + (0.2 * countChars(sentence, emotWord.charAt(emotWord.length - 1)));
      };
      for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
        emot = emoticons[_i];
        _fn(emot);
      }
      return value;
    };

    Heuristics.computeEmoticonCoef = function(word, emoticon) {
      var emotiveWord;
      if (emoticon.startsWithEmoticon()) {
        emotiveWord = emoticon.getWord();
        return 1.0 + (0.2 * countChars(word, emotiveWord.charAt(emotiveWord.length - 1)));
      } else {
        return 1.0;
      }
    };

    Heuristics.computeCapsLockQoef = function(word) {
      if (isCapsLock(word)) {
        return 1.5;
      } else {
        return 1.0;
      }
    };

    Heuristics.isNegation = function(sentence) {
      return emo$.Engine.Emotion.Helpers.Lexical.getInstance().isNegation(sentence);
    };

    Heuristics.computeModifier = function(word) {
      if (isIntensityModifier(word)) {
        return 1.5;
      } else {
        return 1.0;
      }
    };

    Heuristics.computeCapsLockQoef = function(word) {
      if (isCapsLock(word)) {
        return 1.5;
      } else {
        return 1.0;
      }
    };

    Heuristics.computeExclaminationQoef = function(text) {
      return 1.0 + (0.2 * countChars(text, '!'));
    };


    /*
    * Returns is there a "!?" or a "?!" in a sentece.
    *
    * @param text {@link String} representing the sentence
    * @return boolean representing the existance of a "!?" or a "?!"
     */

    Heuristics.hasExclaminationQuestionMarks = function(text) {
      if ((text.indexOf('?!') > -1) || (text.indexOf('!?') > -1)) {
        return true;
      }
      return false;
    };

    Heuristics.prototype.isCapsLock = function(word) {
      if (word.toUpperCase() === word) {
        return true;
      } else {
        return false;
      }
    };

    Heuristics.prototype.isIntensityModifier = function(word) {
      return emo$.Engine.Emotion.Helpers.Lexical.getInstance().isIntensityModifier(word);
    };

    Heuristics.prototype.countChars = function(arg, c) {
      var count, i, _i, _ref;
      count = 0;
      for (i = _i = 0, _ref = arg.length; _i < _ref; i = _i += 1) {
        if (arg[i] === c) {
          count++;
        }
      }
      return count;
    };

    return Heuristics;

  })();

}).call(this);
