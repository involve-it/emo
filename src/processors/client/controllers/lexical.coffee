dataServerAddr = global.engine.core.Config.dataServerRoot
define [], () ->
  class Lexical
    instance = null
    keywordsFilePath = '/lex/keywords'
    lexiconFilePath = dataServerAddr + '/lex/lexicon'
    emoticonsFilePath = dataServerAddr + '/lex/lexicon_emoticons'
    affectWords = null
    emoticons = null
    negations = null
    intensityModifiers = null
    normalisator = 1
    constructor : (processor) ->
      affectWords = []
      emoticons = []
      that = @
      pm = new emojs.engine.controllers.PropertiesManager keywordsFilePath, (data)->
        negations = global.engine.processors.client.controllers.Parsing.splitWords(pm.getProperty('negations'), ', ')
        intensityModifiers = global.engine.processors.client.controllers.Parsing.splitWords(pm.getProperty("intensity.modifiers"), ", ")
        #todo: make this async by adding method 'waitForStart/eventsStack' to controller:
        that.parseLexiconFile lexiconFilePath, (data)->
          affectWords = data
          that.parseLexiconFile emoticonsFilePath, (data)->
            emoticons = data
            processor.emit('lexical:ready')

    @getInstance : () ->
      if instance == null
        #deprecated!
        instance = new Lexical()
      instance

    parseLexiconFile : (fileName, callback) ->
      wordList = []
      that = @
      parsedFile = emojs.engine.controllers.FileReader.readFile fileName, (file)->
        lines = file.split('\n')
        for line in lines
          record = that.parseLine(line)
          wordList.push(record);
        if (typeof callback!='undefined')
          callback(wordList)

    parseLine : (line) ->
      value
      text = line.split(' ')
      word = text[0]
      generalWeight = parseFloat(text[1])
      happinessWeight = parseFloat(text[2])
      sadnessWeight = parseFloat(text[3])
      angerWeight = parseFloat(text[4])
      fearWeight = parseFloat(text[5])
      disgustWeight = parseFloat(text[6])
      surpriseWeight = parseFloat(text[7])
      value = new global.engine.classes.AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, normalisator)
      return value

    getAffectWord : (word) ->
      for affectWord in affectWords
        if affectWord.getWord() == word
          return affectWord.clone()
      return null

    getEmoticonAffectWord : (word) ->
      for affectWordEmoticon in emoticons
        do (affectWordEmoticon) ->
          if affectWordEmoticon.getWord() == word
            return affectWordEmoticon.clone()
      for affectWordEmoticon in emoticons
        do (affectWordEmoticon) ->
          emoticon = affectWordEmoticon.getWord();
          if global.engine.processors.client.controllers.Parsing.containsFirst(word, emoticon)
            affectWordEmoticon.setStartsWithEmoticon(true)
            return affectWordEmoticon.clone()
      return null

    getEmoticonWords : (sentence) ->
      value = []
      for emoticon in emoticons
        do (emoticon) ->
          emoticonWord = emoticon.getWord()
          if sentence.contains(emoticonWord)
            emoticon.setStartsWithEmoticon(true)
            value.push(emoticon)
      return value

    getAffectWords : () ->
      affectWords

    isNegation : (word) ->
      ret = negations.indexOf(word) > -1

    ###hasNegation : (sentence) ->
      for negation in negations
        if sentence.indexOf(negation) > -1
          return true
      return false###

    isIntensityModifier : (word) ->
      ret = intensityModifiers.indexOf(word) > -1

    inTheSamePartOfTheSentence : (negation, word, sentence) ->
      i = sentence.indexOf(negation)
      j = sentence.indexOf(word)
      if (i < j)
        i += negation.length
      else
        tmp = i
        i = j + word.length
        j = tmp
      for k in [i...j] by 1
        if ((sentence[k] == ',') || (sentence[k] == '.') || (sentence[k] == ';') || (sentence[k] == ':') || (sentence[k] == '-'))
          return false
      return true
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.processors.client.controllers.Lexical'
    object : Lexical