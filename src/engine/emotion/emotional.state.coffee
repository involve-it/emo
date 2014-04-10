define [
  'engine.SynesketchState'
], () ->
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.EmotionalState')
  class emo$.Engine.Emotion.EmotionalState extends emo$.Engine.SynesketchState
    #pravates:
    _Emotion = emo$.Engine.Emotion.Emotion
    @::_generalWeight = 0.0;
    @::_valence = 0;
    @::_previous = null
    @::_emotions = []
    constructor: (text, _emotions, @_generalWeight, @_valence) ->
      super text
      @_emotions = _emotions || @_emotions
      if @_emotions.length is 0
        @_emotions.push(new _Emotion(1.0, _Emotion.NEUTRAL))
      @

    getStrongestEmotion:() ->
      @_emotions[0]

    getFirstStrongestEmotions: (stop) ->
      value = []
      for e in @_emotions
        if stop <= 0
          break
        value.push e
        stop--
      value

    getHappiness: () ->
      value = new _Emotion 0.0, _Emotion.HAPPINESS
      for e in @_emotions
        if e.getType() == _Emotion.HAPPINESS
          value = e
      value

    getHappinessWeight:() ->
      @getHappiness().getWeight()

    getSadness:() ->
      value = new _Emotion(0.0, _Emotion.SADNESS)
      for e in @_emotions
        if e.getType() == _Emotion.SADNESS
          value = e
      value

    getSadnessWeight : () ->
      @getSadness().getWeight()

    getFear : () ->
      value = new _Emotion(0.0, _Emotion.FEAR)
      for e in @_emotions
        if e.getType() == _Emotion.FEAR
          value = e
      value

    getFearWeight : () ->
      @getFear().getWeight()

    getAnger : () ->
      value = new _Emotion(0.0, _Emotion.ANGER)
      for e in @_emotions
        if e.getType() == _Emotion.ANGER
          value = e
      value

    getAngerWeight : () ->
      @getAnger().getWeight()

    getDisgust : () ->
      value = new _Emotion(0.0, _Emotion.DISGUST)
      for e in @_emotions
        if e.getType() == _Emotion.DISGUST
          value = e

      value;

    getDisgustWeight : () ->
      @getDisgust().getWeight()

    getSurprise : () ->
      value = new _Emotion(0.0, _Emotion.SURPRISE)
      for e in @_emotions
        if e.getType() == _Emotion.SURPRISE
          value = e
      value

    getSurpriseWeight : () ->
      @getSurprise().getWeight()

    getPrevious : () ->
      @previous

    setPrevious : (_previous) ->
      @previous = _previous

    getValence : () ->
      debugger
      @_valence

    getGeneralWeight : () ->
      @_generalWeight

    toString : (separator) ->
      if (separator)
        ret = @text + separator + @getGeneralWeight() + separator + @getValence() +
        separator + @getHappinessWeight() + separator + @getSadnessWeight() + separator + @getAngerWeight() + separator + @getFearWeight() + separator + @getDisgustWeight() + separator + @getSurpriseWeight()
      else
        ret = "Text: " + @text + "\nGeneral weight: " + @getGeneralWeight() + "\nValence: " + @getValence() +
        "\nHappiness weight: " + @getHappinessWeight() + "\nSadness weight: " + @getSadnessWeight() + "\nAnger weight: " + @getAngerWeight() + "\nFear weight: " + @getFearWeight() + "\nDisgust weight: " + @getDisgustWeight() + "\nSurprise weight: " + @getSurpriseWeight() + "\n"
      ret