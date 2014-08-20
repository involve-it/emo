define [], () ->
  class Lexical
    instance = null
    lexiconFilePath = '/lex/lexicon'
    emoticonsFilePath = '/lex/lexicon_emoticons'
    keywordsFilePath = '/lex/keywords'
    ###fileNameLexiconContent = global.modules.datafiles.files.synesketch_lexicon
    fileNameEmoticonsContent = global.modules.datafiles.files.synesketch_lexicon_emoticons
    fileNamePropertiesContent = global.modules.datafiles.files.keywords###
    affectWords = null
    emoticons = null
    negations = null
    intensityModifiers = null
    normalisator = 1

    constructor : () ->
      #affectWords = []
      emoticons = []
      pm = new global.core.helpers.PropertiesManager paletteFilePath, ()->
        #negations = global.core.helpers.Parsing.splitWords(pm.getProperty('negations'), ', ')
        #intensityModifiers = global.core.helpers.Parsing.splitWords(pm.getProperty("intensity.modifiers"), ", ")
        #affectWords = @parseLexiconFile(lexiconFilePath)
        emoticons = @parseLexiconFile(emoticonsFilePath)

    @getInstance : () ->
      if instance == null
        instance = new Lexical()
      instance

    parseLexiconFile : (fileName) ->
      wordList = []
      file = global.core.helpers.FileReader.readFile(fileName)
      lines = file.split('\n')
      for line in lines
        record = @parseLine(line)
        wordList.push(record);
      wordList


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
      value = new global.core.api.AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, normalisator)
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
          if global.core.helpers.Parsing.containsFirst(word, emoticon)
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
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'core.helpers.Lexical'
    object : Lexical
