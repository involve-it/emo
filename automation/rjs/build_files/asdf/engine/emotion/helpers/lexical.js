(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.Helpers.Lexical');

  emo$.Engine.Emotion.Helpers.Lexical = (function() {
    var affectWords, dataServerAddr, emoticons, fileNameEmoticons, fileNameLexicon, fileNameProperties, instance, intensityModifiers, negations, normalisator;

    instance = null;

    dataServerAddr = 'http://localhost:8899';

    fileNameLexicon = dataServerAddr + '/lex/synesketch_lexicon.txt';

    fileNameEmoticons = dataServerAddr + '/lex/synesketch_lexicon_emoticons.txt';

    fileNameProperties = dataServerAddr + '/lex/keywords.xml';

    affectWords = null;

    emoticons = null;

    negations = null;

    intensityModifiers = null;

    normalisator = 1;

    function Lexical() {
      var pm;
      emoticons = [];
      pm = new emo$.Core.Helpers.PropertiesManager(fileNameProperties);
      negations = emo$.Engine.Emotion.Helpers.Parsing.splitWords(pm.getProperty('negations'), ', ');
      intensityModifiers = emo$.Engine.Emotion.Helpers.Parsing.splitWords(pm.getProperty("intensity.modifiers"), ", ");
      affectWords = this.parseLexiconFile(fileNameLexicon);
      emoticons = this.parseLexiconFile(fileNameEmoticons);
    }

    Lexical.getInstance = function() {
      if (instance === null) {
        instance = new Lexical();
      }
      return instance;
    };

    Lexical.prototype.parseLexiconFile = function(fileName) {
      var file, line, lines, record, wordList, _i, _len;
      wordList = [];
      file = emo$.Core.Helpers.FileReader.readFile(fileName);
      lines = file.split('\n');
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        record = this.parseLine(line);
        wordList.push(record);
      }
      return wordList;
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
      value = new emo$.Engine.Emotion.AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, normalisator);
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
        if (emo$.Engine.Emotion.Helpers.Parsing.containsFirst(word, emoticon)) {
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

}).call(this);
