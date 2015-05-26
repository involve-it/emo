
/**
* ClientProcessor class will be ..
* @namespace engine.controllers
* @class ClientProcessor
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define([], function() {
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
