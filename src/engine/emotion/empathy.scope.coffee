emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.EmpathyScope')

define [], () ->
  class emo$.Engine.Emotion.EmpathyScope
    lexUtil = null
    @instance
    constructor : () ->
      lexUtil = emo$.Engine.Emotion.Helpers.Lexical.getInstance()

    @getInstance : () ->
      EmpathyScope.instance ?= new EmpathyScope()
    feel : (text) ->
      text = text.replace('\n', ' ');
      affectWords = []
      sentences = emo$.Engine.Emotion.Helpers.Parsing.parseSentences(text);
      for sentence in sentences
        console.log('- ' + sentence)
        #hasNegation = emo$.Engine.Emotion.Helpers.Heuristics.hasNegation(sentence.toLowerCase())
        exclaminationQoef = emo$.Engine.Emotion.Helpers.Heuristics.computeExclaminationQoef(sentence.toLowerCase())

        # an exclamination mark next to a question mark => emotion of surprise
        if (emo$.Engine.Emotion.Helpers.Heuristics.hasExclaminationQuestionMarks(sentence))
          emoWordSurprise = new emo$.Engine.Emotion.AffectWord("?!")
          emoWordSurprise.setSurpriseWeight(1.0)
          affectWords.push(emoWordSurprise)
        hasNegation = false

        splittedWords = emo$.Engine.Emotion.Helpers.Parsing.splitWords(sentence, ' ')
        previousWord = ''
        negation = ''

        for splittedWord in splittedWords
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord)


          if (emoWord == null)
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase())

          if emoWord != null
            emoticonCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeEmoticonCoef(splittedWord, emoWord)

            if (emoticonCoef == 1.0)
              emoticonCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);


            emoWord.adjustWeights(exclaminationQoef * emoticonCoef)
            affectWords.push(emoWord)
          else
            words = emo$.Engine.Emotion.Helpers.Parsing.parseWords(splittedWord)
          for word in words
            # (4) negation in a sentence =>
            # flip valence of the affect words in it
            if (emo$.Engine.Emotion.Helpers.Heuristics.isNegation(word.toLowerCase()))
              negation = word
              hasNegation = true

            emoWord = lexUtil.getAffectWord word.toLowerCase()

            if (emoWord == null)
              emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase())

            if emoWord != null
              capsLockCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeCapsLockQoef word
              modifierCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeModifier previousWord
              if hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)
                emoWord.flipValence()
              emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef)
              affectWords.push emoWord
            previousWord = word
      ret = @createEmotionalState(text, affectWords)

    createEmotionalState : (text, affectWords) ->
      emotions = []
      generalValence = 0
      valence = 0.0
      generalWeight = 0.0
      happinessWeight = 0.0
      sadnessWeight = 0.0
      angerWeight = 0.0
      fearWeight = 0.0
      disgustWeight = 0.0
      surpriseWeight = 0.0

      for affectWord in affectWords
        valence += affectWord.getGeneralValence()
        if affectWord.getGeneralWeight() > generalWeight
          generalWeight = affectWord.getGeneralWeight()
        if affectWord.getHappinessWeight() > happinessWeight
          happinessWeight = affectWord.getHappinessWeight()
        if affectWord.getSadnessWeight() > sadnessWeight
          sadnessWeight = affectWord.getSadnessWeight()
        if affectWord.getAngerWeight() > angerWeight
          angerWeight = affectWord.getAngerWeight()
        if affectWord.getFearWeight() > fearWeight
          fearWeight = affectWord.getFearWeight()
        if affectWord.getDisgustWeight() > disgustWeight
          disgustWeight = affectWord.getDisgustWeight()
        if affectWord.getSurpriseWeight() > surpriseWeight
          surpriseWeight = affectWord.getSurpriseWeight()
      if valence > 0
        generalValence = 1
      else if valence < 0
        generalValence = -1
      if happinessWeight > 0
        emotions.push(new emo$.Engine.Emotion.Emotion(happinessWeight, emo$.Engine.Emotion.Emotion.HAPPINESS))
      if sadnessWeight > 0
        emotions.push(new emo$.Engine.Emotion.Emotion(sadnessWeight, emo$.Engine.Emotion.Emotion.SADNESS))
      if angerWeight > 0
        emotions.push(new emo$.Engine.Emotion.Emotion(angerWeight, emo$.Engine.Emotion.Emotion.ANGER))
      if fearWeight > 0
        emotions.push(new emo$.Engine.Emotion.Emotion(fearWeight, emo$.Engine.Emotion.Emotion.FEAR))
      if disgustWeight > 0
        emotions.push(new emo$.Engine.Emotion.Emotion(disgustWeight, emo$.Engine.Emotion.Emotion.DISGUST))
      if surpriseWeight > 0
        emotions.push(new emo$.Engine.Emotion.Emotion(surpriseWeight, emo$.Engine.Emotion.Emotion.SURPRISE))
      if emotions.length == 0
        emotions.push(new emo$.Engine.Emotion.Emotion((0.2 + generalWeight) / 1.2, emo$.Engine.Emotion.Emotion.NEUTRAL))
      ret = new emo$.Engine.Emotion.EmotionalState(text, emotions, generalWeight, generalValence)
      console.log(ret.toString())
      ret
