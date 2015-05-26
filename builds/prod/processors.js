
/**
* ClientProcessor class will be ..
* @namespace engine.controllers
* @class ClientProcessor
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('processors/client/client.processor',[], function() {
  var ClientProcessor;
  ClientProcessor = (function(_super) {
    var lexUtil;

    __extends(ClientProcessor, _super);

    lexUtil = null;

    ClientProcessor.instances = {};

    ClientProcessor.prototype.emotionStates = [];

    function ClientProcessor(app) {
      this.app = app;

      /*@.on 'lexical:ready', ()->
        @app.emit('processor:ready')
        @.ready.call()
       */
      lexUtil = new global.engine.processors.client.controllers.Lexical(this);
      global.runtime.helpers.MakeGlobalNamespaceAndObject({
        path: 'runtime.helpers.lexical',
        object: lexUtil,
        global: global,
        shortcut: 'e$rhl'
      });
    }

    ClientProcessor.prototype.feelText = function(text, context) {
      var affectWords, capsLockCoef, emoWord, emoWordSurprise, emoticonCoef, exclaminationQoef, hasNegation, modifierCoef, negation, previousWord, ret, sentence, sentences, splittedWord, splittedWords, t1, t2, t3, word, words, _i, _j, _k, _len, _len1, _len2;
      ClientProcessor.__super__.feelText.apply(this, arguments);
      if (context == null) {
        context = 'default';
      }
      console.log('client feelText: ' + text);
      t1 = Date.now();
      text = text.replace('\n', ' ');
      affectWords = [];
      sentences = global.engine.processors.client.controllers.Parsing.parseSentences(text);
      for (_i = 0, _len = sentences.length; _i < _len; _i++) {
        sentence = sentences[_i];
        console.log('- ' + sentence);
        exclaminationQoef = global.engine.processors.client.controllers.Heuristics.computeExclaminationQoef(sentence.toLowerCase());
        if (global.engine.processors.client.controllers.Heuristics.hasExclaminationQuestionMarks(sentence)) {
          emoWordSurprise = new global.engine.processors.client.classes.AffectWord("?!");
          emoWordSurprise.setSurpriseWeight(1.0);
          affectWords.push(emoWordSurprise);
        }
        hasNegation = false;
        splittedWords = global.engine.processors.client.controllers.Parsing.splitWords(sentence, ' ');
        previousWord = '';
        negation = '';
        for (_j = 0, _len1 = splittedWords.length; _j < _len1; _j++) {
          splittedWord = splittedWords[_j];
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord);
          if (emoWord === null) {
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase());
          }
          if (emoWord !== null) {
            emoticonCoef = global.engine.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord, emoWord);
            if (emoticonCoef === 1.0) {
              emoticonCoef = global.engine.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);
            }
            emoWord.adjustWeights(exclaminationQoef * emoticonCoef);
            affectWords.push(emoWord);
          } else {
            words = global.engine.processors.client.controllers.Parsing.parseWords(splittedWord);
          }
          for (_k = 0, _len2 = words.length; _k < _len2; _k++) {
            word = words[_k];
            if (global.engine.processors.client.controllers.Heuristics.isNegation(word.toLowerCase())) {
              negation = word;
              hasNegation = true;
            }
            emoWord = lexUtil.getAffectWord(word.toLowerCase());
            if (emoWord === null) {
              emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase());
            }
            if (emoWord !== null) {
              capsLockCoef = global.engine.processors.client.controllers.Heuristics.computeCapsLockQoef(word);
              modifierCoef = global.engine.processors.client.controllers.Heuristics.computeModifier(previousWord);
              if (hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)) {
                emoWord.flipValence();
              }
              emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef);
              console.groupCollapsed('affect word ', word);
              console.dir(emoWord);
              console.groupEnd();
              affectWords.push(emoWord);
            }
            previousWord = word;
          }
        }
      }
      console.dir('all affectWords: ' + affectWords);
      ret = this.createEmotionState(text, affectWords, 'TEXT');
      this.emotionStates.push(ret);
      t2 = Date.now();
      window.t3 = t3 = t2 - t1;
      console.log('Context feelText time: ' + t3 / 1000 + 's');
      this.app.emit('processor:feel:' + context, ret);
      this.app.emit('processor:feel', ret, context);
      return ret;
    };

    ClientProcessor.prototype.createEmotionState = function(text, affectWords, TYPE) {
      var affectWord, angerWeight, disgustWeight, emotions, fearWeight, generalValence, generalWeight, happinessWeight, ret, sadnessWeight, surpriseWeight, valence, _i, _len;
      ClientProcessor.__super__.createEmotionState.apply(this, arguments);

      /*console.dir
        message: 'abstract createEmotionState: '
        affectWords : affectWords
        TYPE : TYPE
       */
      emotions = [];
      generalValence = 0;
      valence = 0.0;
      generalWeight = 0.0;
      happinessWeight = 0.0;
      sadnessWeight = 0.0;
      angerWeight = 0.0;
      fearWeight = 0.0;
      disgustWeight = 0.0;
      surpriseWeight = 0.0;
      for (_i = 0, _len = affectWords.length; _i < _len; _i++) {
        affectWord = affectWords[_i];
        valence += affectWord.getGeneralValence();
        if (affectWord.getGeneralWeight() > generalWeight) {
          generalWeight = affectWord.getGeneralWeight();
        }
        if (affectWord.getHappinessWeight() > happinessWeight) {
          happinessWeight = affectWord.getHappinessWeight();
        }
        if (affectWord.getSadnessWeight() > sadnessWeight) {
          sadnessWeight = affectWord.getSadnessWeight();
        }
        if (affectWord.getAngerWeight() > angerWeight) {
          angerWeight = affectWord.getAngerWeight();
        }
        if (affectWord.getFearWeight() > fearWeight) {
          fearWeight = affectWord.getFearWeight();
        }
        if (affectWord.getDisgustWeight() > disgustWeight) {
          disgustWeight = affectWord.getDisgustWeight();
        }
        if (affectWord.getSurpriseWeight() > surpriseWeight) {
          surpriseWeight = affectWord.getSurpriseWeight();
        }
      }
      if (valence > 0) {
        generalValence = 1;
      } else if (valence < 0) {
        generalValence = -1;
      }
      if (happinessWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(happinessWeight, global.engine.classes.Emotion.HAPPINESS));
      }
      if (sadnessWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(sadnessWeight, global.engine.classes.Emotion.SADNESS));
      }
      if (angerWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(angerWeight, global.engine.classes.Emotion.ANGER));
      }
      if (fearWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(fearWeight, global.engine.classes.Emotion.FEAR));
      }
      if (disgustWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(disgustWeight, global.engine.classes.Emotion.DISGUST));
      }
      if (surpriseWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(surpriseWeight, global.engine.classes.Emotion.SURPRISE));
      }
      if (emotions.length === 0) {
        emotions.push(new global.engine.classes.Emotion((0.2 + generalWeight) / 1.2, global.engine.classes.Emotion.NEUTRAL));
      }
      ret = new global.engine.classes.EmotionState(text, emotions, generalWeight, generalValence, TYPE);
      return ret;
    };

    ClientProcessor.prototype.ready = function(callback) {
      return ClientProcessor.__super__.ready.apply(this, arguments);
    };

    return ClientProcessor;

  })(global.engine.classes.AbstractProcessor);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'processors.client.ClientProcessor',
    object: ClientProcessor,
    global: global,
    shortcut: 'e$pcc'
  });
});

define('processors/client/controllers/heuristics',[], function() {
  var Heuristics;
  Heuristics = (function() {
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
      return global.runtime.helpers.lexical.isIntensityModifier(word);
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
      emoticons = global.runtime.helpers.lexical.getEmoticonWords(sentence);
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
      return global.runtime.helpers.lexical.isNegation(sentence);
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
      return global.runtime.helpers.lexical.isIntensityModifier(word);
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
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.controllers.Heuristics',
    object: Heuristics
  });
});

define('processors/client/controllers/lexical',[], function() {
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
      pm = new emojs.engine.controllers.PropertiesManager(keywordsFilePath, function(data) {
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
      return parsedFile = emojs.engine.controllers.FileReader.readFile(fileName, function(file) {
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

define('processors/client/controllers/parsing',[], function() {
  var Parsing;
  Parsing = (function() {
    function Parsing() {}

    Parsing.parseSentences = function(text) {
      var value;
      value = [];
      value = text.split('.');
      value = value.filter(function(val) {
        return val.trim() !== '';
      });
      return value;
    };

    Parsing.parseWords = function(text) {
      var value;
      value = text.match(/[^\W]+/mig) || [];
      return value;

      /*value = []
      boundary = BreakIterator.getWordInstance()
      boundary.setText(text)
      start = boundary.first()
      for int end = boundary.next(); end != BreakIterator.DONE; start = end, end = boundary.next()
        word = text.substring(start, end)
        value.push(word)
      return value
       */
    };

    Parsing.splitWords = function(text, splitter) {
      return text.split(splitter);
    };

    Parsing.containsFirst = function(container, containee) {
      var x, _i, _ref;
      if (container.length > containee.length) {
        for (x = _i = 1, _ref = containee.length; _i < _ref; x = _i += 1) {
          if (!(containee.charAt(x) === container.charAt(x))) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    };

    return Parsing;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.controllers.Parsing',
    object: Parsing,
    shortcut: 'e$epccp'
  });
});

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.processors.client.controllers');

define('processors/client/controllers/main',['processors/client/controllers/heuristics', 'processors/client/controllers/lexical', 'processors/client/controllers/parsing'], function() {});

define('processors/client/classes/affect.word',[], function() {
  var AffectWord;
  AffectWord = (function() {
    AffectWord.prototype.word = null;

    AffectWord.prototype.generalWeight = 0.0;

    AffectWord.prototype.generalValence = 0.0;

    AffectWord.prototype.happinessWeight = 0.0;

    AffectWord.prototype.sadnessWeight = 0.0;

    AffectWord.prototype.angerWeight = 0.0;

    AffectWord.prototype.fearWeight = 0.0;

    AffectWord.prototype.disgustWeight = 0.0;

    AffectWord.prototype.surpriseWeight = 0.0;

    AffectWord.prototype.startsWithEmoticon = false;

    function AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, quoficient) {
      this.word = word;
      this.generalWeight = generalWeight;
      this.happinessWeight = happinessWeight;
      this.sadnessWeight = sadnessWeight;
      this.angerWeight = angerWeight;
      this.fearWeight = fearWeight;
      this.disgustWeight = disgustWeight;
      this.surpriseWeight = surpriseWeight;
      this.quoficient = quoficient;
      if (quoficient) {
        this.generalWeight = this.generalWeight * quoficient;
        this.happinessWeight = this.happinessWeight * quoficient;
        this.sadnessWeight = this.sadnessWeight * quoficient;
        this.angerWeight = this.angerWeight * quoficient;
        this.fearWeight = this.fearWeight * quoficient;
        this.disgustWeight = this.disgustWeight * quoficient;
        this.surpriseWeight = this.surpriseWeight * quoficient;
      }
      this.generalValence = this.getValenceSum();
    }

    AffectWord.prototype.adjustWeights = function(quoficient) {
      this.generalWeight = this.generalWeight * quoficient;
      this.happinessWeight = this.happinessWeight * quoficient;
      this.sadnessWeight = this.sadnessWeight * quoficient;
      this.angerWeight = this.angerWeight * quoficient;
      this.fearWeight = this.fearWeight * quoficient;
      this.disgustWeight = this.disgustWeight * quoficient;
      this.surpriseWeight = this.surpriseWeight * quoficient;
      return this.normalise();
    };

    AffectWord.prototype.normalise = function() {
      if (this.generalWeight > 1) {
        this.generalWeight = 1.0;
      }
      if (this.happinessWeight > 1) {
        this.happinessWeight = 1.0;
      }
      if (this.sadnessWeight > 1) {
        this.sadnessWeight = 1.0;
      }
      if (this.angerWeight > 1) {
        this.angerWeight = 1.0;
      }
      if (this.fearWeight > 1) {
        this.fearWeight = 1.0;
      }
      if (this.disgustWeight > 1) {
        this.disgustWeight = 1.0;
      }
      if (this.surpriseWeight > 1) {
        return this.surpriseWeight = 1.0;
      }
    };

    AffectWord.prototype.flipValence = function() {
      var temp;
      this.generalValence = -this.generalValence;
      temp = this.happinessWeight;
      this.happinessWeight = Math.max(Math.max(this.sadnessWeight, this.angerWeight), Math.max(this.fearWeight, this.disgustWeight));
      this.sadnessWeight = temp;
      this.angerWeight = temp / 2;
      this.fearWeight = temp / 2;
      return this.disgustWeight = temp / 2;
    };

    AffectWord.prototype.clone = function() {
      var value;
      value = new AffectWord(this.word, this.generalWeight, this.happinessWeight, this.sadnessWeight, this.angerWeight, this.fearWeight, this.disgustWeight, this.surpriseWeight);
      value.setStartsWithEmoticon(this.startsWithEmoticon);
      return value;
    };

    AffectWord.prototype.getStartsWithEmoticon = function() {
      return this.startsWithEmoticon;
    };

    AffectWord.prototype.setStartsWithEmoticon = function(startsWithEmoticon) {
      return this.startsWithEmoticon = startsWithEmoticon;
    };

    AffectWord.prototype.getAngerWeight = function() {
      return this.angerWeight;
    };

    AffectWord.prototype.setAngerWeight = function(angerWeight) {
      return this.angerWeight = angerWeight;
    };

    AffectWord.prototype.getDisgustWeight = function() {
      return this.disgustWeight;
    };

    AffectWord.prototype.setDisgustWeight = function(disgustWeight) {
      return this.disgustWeight = disgustWeight;
    };

    AffectWord.prototype.getFearWeight = function() {
      return this.fearWeight;
    };

    AffectWord.prototype.setFearWeight = function(fearWeight) {
      return this.fearWeight = fearWeight;
    };

    AffectWord.prototype.getHappinessWeight = function() {
      return this.happinessWeight;
    };

    AffectWord.prototype.setHappinessWeight = function(happinessWeight) {
      return this.happinessWeight = happinessWeight;
    };

    AffectWord.prototype.getSadnessWeight = function() {
      return this.sadnessWeight;
    };

    AffectWord.prototype.setSadnessWeight = function(sadnessWeight) {
      return this.sadnessWeight = sadnessWeight;
    };

    AffectWord.prototype.getSurpriseWeight = function() {
      return this.surpriseWeight;
    };

    AffectWord.prototype.setSurpriseWeight = function(surpriseWeight) {
      return this.surpriseWeight = surpriseWeight;
    };

    AffectWord.prototype.getWord = function() {
      return this.word;
    };

    AffectWord.prototype.getGeneralWeight = function() {
      return this.generalWeight;
    };

    AffectWord.prototype.setGeneralWeight = function(generalWeight) {
      return this.generalWeight = generalWeight;
    };

    AffectWord.prototype.getGeneralValence = function() {
      return this.generalValence;
    };

    AffectWord.prototype.setGeneralValence = function(generalValence) {
      return this.generalValence = generalValence;
    };

    AffectWord.prototype.isZeroEkman = function() {
      if (this.getWeightSum() === 0) {
        return true;
      } else {
        return false;
      }
    };

    AffectWord.prototype.toString = function() {
      var ret;
      return ret = this.word + ' ' + this.generalWeight + ' ' + this.happinessWeight + ' ' + this.sadnessWeight + ' ' + this.angerWeight + ' ' + this.fearWeight + ' ' + this.disgustWeight + ' ' + this.surpriseWeight;
    };

    AffectWord.prototype.getValenceSum = function() {
      var ret;
      return ret = this.happinessWeight - this.sadnessWeight - this.angerWeight - this.fearWeight - this.disgustWeight;
    };

    AffectWord.prototype.getWeightSum = function() {
      var ret;
      return ret = this.happinessWeight + this.sadnessWeight + this.angerWeight + this.fearWeight + this.disgustWeight + this.surpriseWeight;
    };

    return AffectWord;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.classes.AffectWord',
    object: AffectWord
  });
});

define('processors/client/main',['processors/client/client.processor', 'processors/client/controllers/main', 'processors/client/classes/affect.word'], function() {
  var processor;
  processor = new emojs.processors.client.ClientProcessor(emojs.runtime.app);
  processor.runOrWait('lexical:ready', function() {
    emojs.runtime.app.emit('processor:ready');
    return processor.ready.call();
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.processor',
    object: processor,
    global: global,
    shortcut: 'e$rp'
  });
});

var Processor;

Processor = (function() {
  function Processor() {}

  return Processor;

})();

define('processors/main',['processors/client/main'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors',
    object: Processor
  });
});


require(["processors/main"]);
