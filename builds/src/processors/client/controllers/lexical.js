define([], function() {
  var Lexical, dataServerAddr;
  dataServerAddr = global.engine.core.Config.dataServerRoot;
  Lexical = (function() {
    var affectWords, emoticons, emoticonsFilePath, instance, intensityModifiers, keywordsFilePath, lexiconFilePath, negations, normalisator;

    instance = null;

    keywordsFilePath = '/lex/keywords';

    lexiconFilePath = dataServerAddr + '/lex/lexicon';

    emoticonsFilePath = dataServerAddr + '/lex/lexicon_emoticons';

    affectWords = null;

    emoticons = null;

    negations = null;

    intensityModifiers = null;

    normalisator = 1;

    function Lexical(processor) {
      var pm, that;
      affectWords = [];
      emoticons = [];
      that = this;
      pm = new global.engine.controllers.PropertiesManager(keywordsFilePath, function(data) {
        negations = global.engine.processors.client.controllers.Parsing.splitWords(pm.getProperty('negations'), ', ');
        intensityModifiers = global.engine.processors.client.controllers.Parsing.splitWords(pm.getProperty("intensity.modifiers"), ", ");
        return that.parseLexiconFile(lexiconFilePath, function(data) {
          affectWords = data;
          return that.parseLexiconFile(emoticonsFilePath, function(data) {
            emoticons = data;
            return processor.emit('lexical:ready');
          });
        });
      });
    }

    Lexical.getInstance = function() {
      if (instance === null) {
        instance = new Lexical();
      }
      return instance;
    };

    Lexical.prototype.parseLexiconFile = function(fileName, callback) {
      var parsedFile, that, wordList;
      wordList = [];
      that = this;
      return parsedFile = global.engine.controllers.FileReader.readFile(fileName, function(file) {
        var line, lines, record, _i, _len;
        lines = file.split('\n');
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          line = lines[_i];
          record = that.parseLine(line);
          wordList.push(record);
        }
        if (typeof callback !== 'undefined') {
          return callback(wordList);
        }
      });
    };

    Lexical.prototype.parseLine = function(line) {
      value;
      var angerWeight, disgustWeight, fearWeight, generalWeight, happinessWeight, sadnessWeight, surpriseWeight, text, value, word;
      text = line.split(' ');
      word = text[0];
      generalWeight = parseFloat(text[1]);
      happinessWeight = parseFloat(text[2]);
      sadnessWeight = parseFloat(text[3]);
      angerWeight = parseFloat(text[4]);
      fearWeight = parseFloat(text[5]);
      disgustWeight = parseFloat(text[6]);
      surpriseWeight = parseFloat(text[7]);
      value = new global.engine.classes.AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, normalisator);
      return value;
    };

    Lexical.prototype.getAffectWord = function(word) {
      var affectWord, _i, _len;
      for (_i = 0, _len = affectWords.length; _i < _len; _i++) {
        affectWord = affectWords[_i];
        if (affectWord.getWord() === word) {
          return affectWord.clone();
        }
      }
      return null;
    };

    Lexical.prototype.getEmoticonAffectWord = function(word) {
      var affectWordEmoticon, _fn, _fn1, _i, _j, _len, _len1;
      _fn = function(affectWordEmoticon) {
        if (affectWordEmoticon.getWord() === word) {
          return affectWordEmoticon.clone();
        }
      };
      for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
        affectWordEmoticon = emoticons[_i];
        _fn(affectWordEmoticon);
      }
      _fn1 = function(affectWordEmoticon) {
        var emoticon;
        emoticon = affectWordEmoticon.getWord();
        if (global.engine.processors.client.controllers.Parsing.containsFirst(word, emoticon)) {
          affectWordEmoticon.setStartsWithEmoticon(true);
          return affectWordEmoticon.clone();
        }
      };
      for (_j = 0, _len1 = emoticons.length; _j < _len1; _j++) {
        affectWordEmoticon = emoticons[_j];
        _fn1(affectWordEmoticon);
      }
      return null;
    };

    Lexical.prototype.getEmoticonWords = function(sentence) {
      var emoticon, value, _fn, _i, _len;
      value = [];
      _fn = function(emoticon) {
        var emoticonWord;
        emoticonWord = emoticon.getWord();
        if (sentence.contains(emoticonWord)) {
          emoticon.setStartsWithEmoticon(true);
          return value.push(emoticon);
        }
      };
      for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
        emoticon = emoticons[_i];
        _fn(emoticon);
      }
      return value;
    };

    Lexical.prototype.getAffectWords = function() {
      return affectWords;
    };

    Lexical.prototype.isNegation = function(word) {
      var ret;
      return ret = negations.indexOf(word) > -1;
    };


    /*hasNegation : (sentence) ->
      for negation in negations
        if sentence.indexOf(negation) > -1
          return true
      return false
     */

    Lexical.prototype.isIntensityModifier = function(word) {
      var ret;
      return ret = intensityModifiers.indexOf(word) > -1;
    };

    Lexical.prototype.inTheSamePartOfTheSentence = function(negation, word, sentence) {
      var i, j, k, tmp, _i;
      i = sentence.indexOf(negation);
      j = sentence.indexOf(word);
      if (i < j) {
        i += negation.length;
      } else {
        tmp = i;
        i = j + word.length;
        j = tmp;
      }
      for (k = _i = i; _i < j; k = _i += 1) {
        if ((sentence[k] === ',') || (sentence[k] === '.') || (sentence[k] === ';') || (sentence[k] === ':') || (sentence[k] === '-')) {
          return false;
        }
      }
      return true;
    };

    return Lexical;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.controllers.Lexical',
    object: Lexical
  });
});
