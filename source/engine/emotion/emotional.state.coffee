define [], () ->
  class emo$.Engine.Emotion.EmotionalState extends emo$.Engine.SynesketchState
    #pravates:
    _generalWeight = 0.0;
    _valence = 0;
    _previous = null
    _emotions = []
    constructor: (text, emotions, generalWeight, valence) ->
      super text
      _emotions = emotions || _emotions
      _generalWeight = generalWeight
      _valence = valence
      if _emotions.length is 0
        _emotions.push(new emo$.Engine.Emotion.Emotion(1.0, emo$.Engine.Emotion.Emotion.NEUTRAL))
      @

    getStrongestEmotion:() ->
      _emotions[0]

    getFirstStrongestEmotions: (stop) ->
      value = []
      for e in _emotions
        if stop <= 0
          break
        value.push e
        stop--
      value

    getHappiness: () ->
      value = new Emotion 0.0, Emotion.HAPPINESS
      for e in _emotions
        if e.getType() == Emotion.HAPPINESS
          value = e
      value

    getHappinessWeight:() ->
      getHappiness().getWeight()

    getSadness:() ->
      value = new Emotion(0.0, Emotion.SADNESS)
      for e in _emotions
        if e.getType() == Emotion.SADNESS
          value = e
      value

    getSadnessWeight : () ->
      return getSadness().getWeight()

    getFear : () ->
      value = new Emotion(0.0, Emotion.FEAR)
      for e in _emotions
        if e.getType() == Emotion.FEAR
          value = e
      return value

    getFearWeight : () ->
      return getFear().getWeight()
    getAnger : () ->
      value = new Emotion(0.0, Emotion.ANGER)
      for e in _emotions
        if e.getType() == Emotion.ANGER
          value = e
      return value

    getAngerWeight : () ->
      return getAnger().getWeight()

    getDisgust : () ->
      value = new Emotion(0.0, Emotion.DISGUST)
      for e in _emotions
        if e.getType() == Emotion.DISGUST
          value = e

      return value;

    getDisgustWeight : () ->
      return getDisgust().getWeight()

    getSurprise : () ->
      value = new Emotion(0.0, Emotion.SURPRISE)
      for e in _emotions
        if e.getType() == Emotion.SURPRISE
          value = e
      return value

    getSurpriseWeight : () ->
      return getSurprise().getWeight()

    getPrevious : () ->
      return @previous

    setPrevious : (_previous) ->
      @previous = _previous

    getValence : () ->
      return @valence

    getGeneralWeight : () ->
      return _generalWeight

    toString : () ->
      ret = "Text: " + text + "\nGeneral weight: " + _generalWeight + "\nValence: " + _valence + "\nHappiness weight: " + getHappinessWeight() + "\nSadness weight: " + getSadnessWeight() + "\nAnger weight: " + getAngerWeight() + "\nFear weight: " + getFearWeight() + "\nDisgust weight: " + getDisgustWeight() + "\nSurprise weight: " + getSurpriseWeight() + "\n"