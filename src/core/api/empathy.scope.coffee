define [], () ->
  class EmpathyScope
    lexUtil = null
    @instance
    constructor : () ->
      lexUtil = global.core.helpers.Lexical.getInstance()

    @getInstance : () ->
      EmpathyScope.instance ?= new EmpathyScope()
    feel : (text) ->
      text = text.replace('\n', ' ');
      affectWords = []
      sentences = global.core.helpers.Parsing.parseSentences(text);
      for sentence in sentences
        console.log('- ' + sentence)
        #hasNegation = global.core.helpers.Heuristics.hasNegation(sentence.toLowerCase())
        exclaminationQoef = global.core.helpers.Heuristics.computeExclaminationQoef(sentence.toLowerCase())

        # an exclamination mark next to a question mark => emotion of surprise
        if (global.core.helpers.Heuristics.hasExclaminationQuestionMarks(sentence))
          emoWordSurprise = new global.core.api.AffectWord("?!")
          emoWordSurprise.setSurpriseWeight(1.0)
          affectWords.push(emoWordSurprise)
        hasNegation = false

        splittedWords = global.core.helpers.Parsing.splitWords(sentence, ' ')
        previousWord = ''
        negation = ''

        for splittedWord in splittedWords
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord)


          if (emoWord == null)
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase())

          if emoWord != null
            emoticonCoef = global.core.helpers.Heuristics.computeEmoticonCoef(splittedWord, emoWord)

            if (emoticonCoef == 1.0)
              emoticonCoef = global.core.helpers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);


            emoWord.adjustWeights(exclaminationQoef * emoticonCoef)
            affectWords.push(emoWord)
          else
            words = global.core.helpers.Parsing.parseWords(splittedWord)
          for word in words
            # (4) negation in a sentence =>
            # flip valence of the affect words in it
            if (global.core.helpers.Heuristics.isNegation(word.toLowerCase()))
              negation = word
              hasNegation = true

            emoWord = lexUtil.getAffectWord word.toLowerCase()

            if (emoWord == null)
              emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase())

            if emoWord != null
              capsLockCoef = global.core.helpers.Heuristics.computeCapsLockQoef word
              modifierCoef = global.core.helpers.Heuristics.computeModifier previousWord
              if hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)
                emoWord.flipValence()
              emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef)
              affectWords.push emoWord
            previousWord = word
      ret = @createEmotionState(text, affectWords)

    createEmotionState : (text, affectWords) ->
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
        emotions.push(new global.core.api.Emotion(happinessWeight, global.core.api.Emotion.HAPPINESS))
      if sadnessWeight > 0
        emotions.push(new global.core.api.Emotion(sadnessWeight, global.core.api.Emotion.SADNESS))
      if angerWeight > 0
        emotions.push(new global.core.api.Emotion(angerWeight, global.core.api.Emotion.ANGER))
      if fearWeight > 0
        emotions.push(new global.core.api.Emotion(fearWeight, global.core.api.Emotion.FEAR))
      if disgustWeight > 0
        emotions.push(new global.core.api.Emotion(disgustWeight, global.core.api.Emotion.DISGUST))
      if surpriseWeight > 0
        emotions.push(new global.core.api.Emotion(surpriseWeight, global.core.api.Emotion.SURPRISE))
      if emotions.length == 0
        emotions.push(new global.core.api.Emotion((0.2 + generalWeight) / 1.2, global.core.api.Emotion.NEUTRAL))
      ret = new global.core.api.EmotionState(text, emotions, generalWeight, generalValence)
      console.log(ret.toString())
      ret
  global.core.helpers.MakeGlobalNamespaceAndObject
    path : 'core.api.EmpathyScope'
    object : EmpathyScope
