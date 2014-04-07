#define [], () ->
  class emo$.Engine.Emotion.Helpers.Parsing
    @parseSentences : (text) ->
      value = []
      value = text.split('.')
      value = value.filter (val)->
        return val.trim() != ''

      #boundary = BreakIterator.getSentenceInstance()
      #boundary.setText(text)
      #start = boundary.first()
      #for (int end = boundary.next(); end != BreakIterator.DONE; start = end, end = boundary.next())
        #word = text.substring(start, end);
        #value.push(word)
      value

    @parseWords : (text) ->
      value = text.match(/[^\W]+/mig) || []
      value
      ###value = []
      boundary = BreakIterator.getWordInstance()
      boundary.setText(text)
      start = boundary.first()
      for int end = boundary.next(); end != BreakIterator.DONE; start = end, end = boundary.next()
        word = text.substring(start, end)
        value.push(word)
      return value###

    @splitWords : (text, splitter) ->
      return text.split(splitter)

    @containsFirst : (container, containee) ->
      if container.length > containee.length
        for x in [1...containee.length] by 1
          if !(containee.charAt(x) == container.charAt(x))
            return false
        return true
      else
        return false