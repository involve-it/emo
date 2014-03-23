define [], () ->
  class emo$.Engine.Emotion.EmotionalState extends emo$.Engine.SynesketchState
    #pravates:
    generalWeight = 0.0;
    valence = 0;
    previous = null
    emotions = null
    constructor: (text, emotions, generalWeight, valence) ->
      super text
      emotions = emotions or []
      @valence = valence
      if emotions.length is 0
        emotions.push(new emo$.Engine.Emotion.Emotion(1.0, emo$.Engine.Emotion.Emotion.NEUTRAL))
      @

    getStrongestEmotion:() ->
      emotions[0]

    getFirstStrongestEmotions: (stop) ->
      value = []
      for e in emotions
        if stop <= 0
          break
        value.push e
        stop--
      value

    getHappiness: () ->
      value = new Emotion 0.0, Emotion.HAPPINESS
      for e in emotions
        if e.getType() == Emotion.HAPPINESS
          value = e
      value

    getHappinessWeight:() ->
      getHappiness().getWeight()

    getSadness:() ->
      value = new Emotion(0.0, Emotion.SADNESS)
      for e in emotions
        if e.getType() == Emotion.SADNESS
          value = e
      value

    getSadnessWeight : () ->
      return getSadness().getWeight()

    getFear : () ->
      value = new Emotion(0.0, Emotion.FEAR)
      for e in emotions
        if e.getType() == Emotion.FEAR
          value = e
      return value

    getFearWeight : () ->
      return getFear().getWeight()
    getAnger : () ->
      value = new Emotion(0.0, Emotion.ANGER)
      for e in emotions
        if e.getType() == Emotion.ANGER
          value = e
      return value

    getAngerWeight : () ->
      return getAnger().getWeight()

    getDisgust : () ->
      value = new Emotion(0.0, Emotion.DISGUST)
      for e in emotions
        if e.getType() == Emotion.DISGUST
          value = e

      return value;

    getDisgustWeight : () ->
      return getDisgust().getWeight()

    getSurprise : () ->
      value = new Emotion(0.0, Emotion.SURPRISE)
      for e in emotions
        if e.getType() == Emotion.SURPRISE
          value = e
      return value

    getSurpriseWeight : () ->
      return getSurprise().getWeight()

    getPrevious : () ->
      return @previous

    setPrevious : (previous) ->
      @previous = previous

    getValence : () ->
      return @valence

    getGeneralWeight : () ->
      return generalWeight

    toString : () ->
      ret = "Text: " + text + "\nGeneral weight: " + generalWeight + "\nValence: " + valence + "\nHappiness weight: " + getHappinessWeight() + "\nSadness weight: " + getSadnessWeight() + "\nAnger weight: " + getAngerWeight() + "\nFear weight: " + getFearWeight() + "\nDisgust weight: " + getDisgustWeight() + "\nSurprise weight: " + getSurpriseWeight() + "\n"