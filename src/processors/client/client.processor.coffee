###*
* ClientProcessor class will be ..
* @namespace engine.controllers
* @class ClientProcessor
*###
define [
], () ->
  class ClientProcessor extends global.engine.classes.AbstractProcessor
    lexUtil = null
    @instances = {}
    emotionStates : []
    #@app = emojs.runtime.app
    #@app.emit('processor:loaded')


    constructor:(app)->
      @app = app
      ###@.on 'lexical:ready', ()->
        @app.emit('processor:ready')
        @.ready.call()###
      lexUtil = new global.engine.processors.client.controllers.Lexical(@)
      #let's add the lexical to the runtime helpers:

      global.runtime.helpers.MakeGlobalNamespaceAndObject
        path:'runtime.helpers.lexical'
        object: lexUtil
        global: global
        shortcut: 'e$rhl'
    feelText : (text, context) ->
      super
      context ?= 'default'
      console.log('client feelText: ' + text)

      t1 = Date.now()
      text = text.replace('\n', ' ');
      affectWords = []
      sentences = global.engine.processors.client.controllers.Parsing.parseSentences(text);
      for sentence in sentences
        console.log('- ' + sentence)
        #hasNegation = global.core.helpers.Heuristics.hasNegation(sentence.toLowerCase())
        exclaminationQoef = global.engine.processors.client.controllers.Heuristics.computeExclaminationQoef(sentence.toLowerCase())

        # an exclamination mark next to a question mark => emotion of surprise
        if (global.engine.processors.client.controllers.Heuristics.hasExclaminationQuestionMarks(sentence))
          emoWordSurprise = new global.engine.processors.client.classes.AffectWord("?!")
          emoWordSurprise.setSurpriseWeight(1.0)
          affectWords.push(emoWordSurprise)
        hasNegation = false

        splittedWords = global.engine.processors.client.controllers.Parsing.splitWords(sentence, ' ')
        previousWord = ''
        negation = ''

        for splittedWord in splittedWords
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord)


          if (emoWord == null)
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase())

          if emoWord != null
            emoticonCoef = global.engine.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord, emoWord)

            if (emoticonCoef == 1.0)
              emoticonCoef = global.engine.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);

            emoWord.adjustWeights(exclaminationQoef * emoticonCoef)
            affectWords.push(emoWord)
          else
            words = global.engine.processors.client.controllers.Parsing.parseWords(splittedWord)
          for word in words
            # (4) negation in a sentence =>
            # flip valence of the affect words in it
            if (global.engine.processors.client.controllers.Heuristics.isNegation(word.toLowerCase()))
              negation = word
              hasNegation = true

            emoWord = lexUtil.getAffectWord word.toLowerCase()

            if (emoWord == null)
              emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase())

            if emoWord != null
              capsLockCoef = global.engine.processors.client.controllers.Heuristics.computeCapsLockQoef word
              modifierCoef = global.engine.processors.client.controllers.Heuristics.computeModifier previousWord
              if hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)
                emoWord.flipValence()
              emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef)
              console.groupCollapsed('affect word ', word)
              console.dir(emoWord)

              console.groupEnd()

              affectWords.push emoWord
            previousWord = word
      console.dir('all affectWords: ' + affectWords)
      ret = @createEmotionState(text, affectWords, 'TEXT')
      @emotionStates.push(ret)

      #log time:
      t2 = Date.now()
      window.t3 = t3 = t2-t1
      console.log('Context feelText time: ' + t3/1000 + 's')

      @app.emit('processor:feel:' + context, ret)
      @app.emit('processor:feel', ret, context)

      ret
    createEmotionState : (text, affectWords, TYPE) ->
      super
      ###console.dir
        message: 'abstract createEmotionState: '
        affectWords : affectWords
        TYPE : TYPE###
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
        emotions.push(new global.engine.classes.Emotion(happinessWeight, global.engine.classes.Emotion.HAPPINESS))
      if sadnessWeight > 0
        emotions.push(new global.engine.classes.Emotion(sadnessWeight, global.engine.classes.Emotion.SADNESS))
      if angerWeight > 0
        emotions.push(new global.engine.classes.Emotion(angerWeight, global.engine.classes.Emotion.ANGER))
      if fearWeight > 0
        emotions.push(new global.engine.classes.Emotion(fearWeight, global.engine.classes.Emotion.FEAR))
      if disgustWeight > 0
        emotions.push(new global.engine.classes.Emotion(disgustWeight, global.engine.classes.Emotion.DISGUST))
      if surpriseWeight > 0
        emotions.push(new global.engine.classes.Emotion(surpriseWeight, global.engine.classes.Emotion.SURPRISE))
      if emotions.length == 0
        emotions.push(new global.engine.classes.Emotion((0.2 + generalWeight) / 1.2, global.engine.classes.Emotion.NEUTRAL))
      ret = new global.engine.classes.EmotionState(text, emotions, generalWeight, generalValence, TYPE)
      #console.log(ret.toString())
      ret
    ready : (callback)->
      super

  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path:'processors.client.ClientProcessor'
    object: ClientProcessor
    global: global
    shortcut: 'e$pcc'

#define 'controllers/main', [
#], ()->
