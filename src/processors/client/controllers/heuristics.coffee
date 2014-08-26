define [], () ->
  class Heuristics
    #  privates:
    isCapsLock = (word) ->
      for x in [1...word.length] by 1
        if word[x] == word[x].toLowerCase()
          return false;
      return true;

    isIntensityModifier = (word) ->
      return global.runtime.helpers.lexical.isIntensityModifier(word)

    countChars = (arg, c) ->
      count = 0;
      for i in [1...arg.length] by 1
        if arg[i] == c
          count++
      return count

    # publics (statics)
    @computeEmoticonCoefForSentence : (sentence) ->
      emoticons = global.runtime.helpers.lexical.getEmoticonWords(sentence);
      value = 1.0
      for emot in emoticons
        do (emot) ->
          emotWord = emot.getWord()
          value *= 1.0 + (0.2 * countChars(sentence, emotWord.charAt(emotWord.length - 1)))
      return value

    @computeEmoticonCoef : (word, emoticon) ->
      if emoticon.startsWithEmoticon()
        emotiveWord = emoticon.getWord()
        return 1.0 + (0.2 * countChars(word, emotiveWord.charAt(emotiveWord.length - 1)));
      else
        return 1.0;

    @computeCapsLockQoef : (word) ->
      if (isCapsLock(word))
        return 1.5;
      else
        return 1.0;

    @isNegation : (sentence) ->
      return global.runtime.helpers.lexical.isNegation(sentence)

    @computeModifier : (word) ->
      if isIntensityModifier(word)
        return 1.5
      else
        return 1.0

    @computeCapsLockQoef : (word) ->
      if (isCapsLock(word))
        return 1.5
      else
        return 1.0

    @computeExclaminationQoef : (text) ->
      return 1.0 + (0.2 * countChars(text, '!'))

    ###
    * Returns is there a "!?" or a "?!" in a sentece.
    *
    * @param text {@link String} representing the sentence
    * @return boolean representing the existance of a "!?" or a "?!"
    ###
    @hasExclaminationQuestionMarks : (text) ->
      if ((text.indexOf('?!') > -1) || (text.indexOf('!?') > -1))
        return true
      return false

    isCapsLock : (word) ->
      if (word.toUpperCase() == word)
        return true
      else
        return false

    isIntensityModifier : (word) ->
      return global.runtime.helpers.lexical.isIntensityModifier(word)

    countChars : (arg, c) ->
      count = 0
      for i in [0...arg.length] by 1
        if (arg[i] == c)
          count++
      return count
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.processors.client.controllers.Heuristics'
    object : Heuristics