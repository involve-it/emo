(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.EmpathyScope');

  define([], function() {
    return emo$.Engine.Emotion.EmpathyScope = (function() {
      var lexUtil;

      lexUtil = null;

      EmpathyScope.instance;

      function EmpathyScope() {
        lexUtil = emo$.Engine.Emotion.Helpers.Lexical.getInstance();
      }

      EmpathyScope.getInstance = function() {
        return EmpathyScope.instance != null ? EmpathyScope.instance : EmpathyScope.instance = new EmpathyScope();
      };

      EmpathyScope.prototype.feel = function(text) {
        var affectWords, capsLockCoef, emoWord, emoWordSurprise, emoticonCoef, exclaminationQoef, hasNegation, modifierCoef, negation, previousWord, ret, sentence, sentences, splittedWord, splittedWords, word, words, _i, _j, _k, _len, _len1, _len2;
        text = text.replace('\n', ' ');
        affectWords = [];
        sentences = emo$.Engine.Emotion.Helpers.Parsing.parseSentences(text);
        for (_i = 0, _len = sentences.length; _i < _len; _i++) {
          sentence = sentences[_i];
          console.log('- ' + sentence);
          exclaminationQoef = emo$.Engine.Emotion.Helpers.Heuristics.computeExclaminationQoef(sentence.toLowerCase());
          if (emo$.Engine.Emotion.Helpers.Heuristics.hasExclaminationQuestionMarks(sentence)) {
            emoWordSurprise = new emo$.Engine.Emotion.AffectWord("?!");
            emoWordSurprise.setSurpriseWeight(1.0);
            affectWords.push(emoWordSurprise);
          }
          hasNegation = false;
          splittedWords = emo$.Engine.Emotion.Helpers.Parsing.splitWords(sentence, ' ');
          previousWord = '';
          negation = '';
          for (_j = 0, _len1 = splittedWords.length; _j < _len1; _j++) {
            splittedWord = splittedWords[_j];
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord);
            if (emoWord === null) {
              emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase());
            }
            if (emoWord !== null) {
              emoticonCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeEmoticonCoef(splittedWord, emoWord);
              if (emoticonCoef === 1.0) {
                emoticonCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);
              }
              emoWord.adjustWeights(exclaminationQoef * emoticonCoef);
              affectWords.push(emoWord);
            } else {
              words = emo$.Engine.Emotion.Helpers.Parsing.parseWords(splittedWord);
            }
            for (_k = 0, _len2 = words.length; _k < _len2; _k++) {
              word = words[_k];
              if (emo$.Engine.Emotion.Helpers.Heuristics.isNegation(word.toLowerCase())) {
                negation = word;
                hasNegation = true;
              }
              emoWord = lexUtil.getAffectWord(word.toLowerCase());
              if (emoWord === null) {
                emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase());
              }
              if (emoWord !== null) {
                capsLockCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeCapsLockQoef(word);
                modifierCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeModifier(previousWord);
                if (hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)) {
                  emoWord.flipValence();
                }
                emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef);
                affectWords.push(emoWord);
              }
              previousWord = word;
            }
          }
        }
        return ret = this.createEmotionalState(text, affectWords);
      };

      EmpathyScope.prototype.createEmotionalState = function(text, affectWords) {
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
          emotions.push(new emo$.Engine.Emotion.Emotion(happinessWeight, emo$.Engine.Emotion.Emotion.HAPPINESS));
        }
        if (sadnessWeight > 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion(sadnessWeight, emo$.Engine.Emotion.Emotion.SADNESS));
        }
        if (angerWeight > 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion(angerWeight, emo$.Engine.Emotion.Emotion.ANGER));
        }
        if (fearWeight > 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion(fearWeight, emo$.Engine.Emotion.Emotion.FEAR));
        }
        if (disgustWeight > 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion(disgustWeight, emo$.Engine.Emotion.Emotion.DISGUST));
        }
        if (surpriseWeight > 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion(surpriseWeight, emo$.Engine.Emotion.Emotion.SURPRISE));
        }
        if (emotions.length === 0) {
          emotions.push(new emo$.Engine.Emotion.Emotion((0.2 + generalWeight) / 1.2, emo$.Engine.Emotion.Emotion.NEUTRAL));
        }
        ret = new emo$.Engine.Emotion.EmotionalState(text, emotions, generalWeight, generalValence);
        console.log(ret.toString());
        return ret;
      };

      return EmpathyScope;

    })();
  });

}).call(this);
