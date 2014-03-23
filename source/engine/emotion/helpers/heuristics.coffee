define [], () ->
  class emo$.Engine.Emotion.Helpers.Heuristics
    #  privates:
    isCapsLock = (word) ->
      for x in [1...word.length] by 1
        if word[x] == word[x].toLowerCase()
          return false;
      return true;

    isIntensityModifier = (word) ->
      return emo$.Engine.Emotion.Helpers.Lexical.getInstance().isIntensityModifier(word)

    countChars = (arg, c) ->
      count = 0;
      for i in [1...arg.length] by 1
        if arg[i] == c
          count++
      return count

    # publics (statics)
    @computeEmoticonCoefForSentence : (sentence) ->
      emoticons = emo$.Engine.Emotion.Helpers.Lexical.getInstance().getEmoticonWords(sentence);
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

    @hasNegation : (sentence) ->
      return emo$.Engine.Emotion.Helpers.Lexical.getInstance().hasNegation(sentence)

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