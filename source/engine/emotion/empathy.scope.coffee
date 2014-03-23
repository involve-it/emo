###
* Defines logic for transfering textual affect information -- emotional
* manifestations recognised in text -- into visual output.
*
* @author Uros Krcadinac email: uros@krcadinac.com
* @version 1.0
###
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
        hasNegation = emo$.Engine.Emotion.Helpers.Heuristics.hasNegation(sentence.toLowerCase())
        exclaminationQoef = emo$.Engine.Emotion.Helpers.Heuristics.computeExclaminationQoef(sentence.toLowerCase())
        splittedWords = emo$.Engine.Emotion.Helpers.Parsing.splitWords(sentence, ' ')
        previousWord = ''
        for splittedWord in splittedWords
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord)
          if emoWord != null
            emoticonCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeEmoticonCoef(splittedWord, emoWord)
            emoWord.adjustWeights(exclaminationQoef * emoticonCoef)
            affectWords.push(emoWord)
          else
            words = emo$.Engine.Emotion.Helpers.Parsing.parseWords(splittedWord)
          for word in words
            emoWord = lexUtil.getAffectWord word.toLowerCase()
          if emoWord != null
            capsLockCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeCapsLockQoef word
            modifierCoef = emo$.Engine.Emotion.Helpers.Heuristics.computeModifier previousWord
            if hasNegation
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
