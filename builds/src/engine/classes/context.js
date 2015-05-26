var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['classes/abstract.context'], function() {
  var Context;
  Context = (function(_super) {
    var lexUtil;

    __extends(Context, _super);

    lexUtil = null;

    Context.instances = {};

    Context.prototype.emotionStates = [];

    function Context(name) {
      this.name = name;
      lexUtil = global.core.helpers.Lexical.getInstance();
      Context.instances[this.name] = this;
    }

    Context.getInstance = function(contextName) {
      var _base;
      if (contextName == null) {
        contextName = 'default';
      }
      return (_base = Context.instances)[contextName] != null ? _base[contextName] : _base[contextName] = new Context(contextName);
    };

    Context.prototype.feelText = function(text) {
      var affectWords, capsLockCoef, emoWord, emoWordSurprise, emoticonCoef, exclaminationQoef, hasNegation, modifierCoef, negation, previousWord, ret, sentence, sentences, splittedWord, splittedWords, t1, t2, t3, word, words, _i, _j, _k, _len, _len1, _len2;
      t1 = Date.now();
      text = text.replace('\n', ' ');
      affectWords = [];
      sentences = global.core.helpers.Parsing.parseSentences(text);
      for (_i = 0, _len = sentences.length; _i < _len; _i++) {
        sentence = sentences[_i];
        console.log('- ' + sentence);
        exclaminationQoef = global.core.helpers.Heuristics.computeExclaminationQoef(sentence.toLowerCase());
        if (global.core.helpers.Heuristics.hasExclaminationQuestionMarks(sentence)) {
          emoWordSurprise = new global.core.api.AffectWord("?!");
          emoWordSurprise.setSurpriseWeight(1.0);
          affectWords.push(emoWordSurprise);
        }
        hasNegation = false;
        splittedWords = global.core.helpers.Parsing.splitWords(sentence, ' ');
        previousWord = '';
        negation = '';
        for (_j = 0, _len1 = splittedWords.length; _j < _len1; _j++) {
          splittedWord = splittedWords[_j];
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord);
          if (emoWord === null) {
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase());
          }
          if (emoWord !== null) {
            emoticonCoef = global.core.helpers.Heuristics.computeEmoticonCoef(splittedWord, emoWord);
            if (emoticonCoef === 1.0) {
              emoticonCoef = global.core.helpers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);
            }
            emoWord.adjustWeights(exclaminationQoef * emoticonCoef);
            affectWords.push(emoWord);
          } else {
            words = global.core.helpers.Parsing.parseWords(splittedWord);
          }
          for (_k = 0, _len2 = words.length; _k < _len2; _k++) {
            word = words[_k];
            if (global.core.helpers.Heuristics.isNegation(word.toLowerCase())) {
              negation = word;
              hasNegation = true;
            }
            emoWord = lexUtil.getAffectWord(word.toLowerCase());
            if (emoWord === null) {
              emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase());
            }
            if (emoWord !== null) {
              capsLockCoef = global.core.helpers.Heuristics.computeCapsLockQoef(word);
              modifierCoef = global.core.helpers.Heuristics.computeModifier(previousWord);
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
      global.libs.$(window).trigger('context:feel:' + this.name, ret);
      return ret;
    };

    Context.prototype.createEmotionState = function(text, affectWords, TYPE) {
      var affectWord, angerWeight, disgustWeight, emotions, fearWeight, generalValence, generalWeight, happinessWeight, ret, sadnessWeight, surpriseWeight, valence, _i, _len;
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
        emotions.push(new global.core.api.Emotion(happinessWeight, global.core.api.Emotion.HAPPINESS));
      }
      if (sadnessWeight > 0) {
        emotions.push(new global.core.api.Emotion(sadnessWeight, global.core.api.Emotion.SADNESS));
      }
      if (angerWeight > 0) {
        emotions.push(new global.core.api.Emotion(angerWeight, global.core.api.Emotion.ANGER));
      }
      if (fearWeight > 0) {
        emotions.push(new global.core.api.Emotion(fearWeight, global.core.api.Emotion.FEAR));
      }
      if (disgustWeight > 0) {
        emotions.push(new global.core.api.Emotion(disgustWeight, global.core.api.Emotion.DISGUST));
      }
      if (surpriseWeight > 0) {
        emotions.push(new global.core.api.Emotion(surpriseWeight, global.core.api.Emotion.SURPRISE));
      }
      if (emotions.length === 0) {
        emotions.push(new global.core.api.Emotion((0.2 + generalWeight) / 1.2, global.core.api.Emotion.NEUTRAL));
      }
      ret = new global.core.api.EmotionState(text, emotions, generalWeight, generalValence, TYPE);
      console.log(ret.toString());
      return ret;
    };

    return Context;

  })(global.engine.classes.AbstractContext);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.Context',
    object: Context
  });
});
