define [], () ->
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.AffectWord')

  class emo$.Engine.Emotion.AffectWord
    @::word = null
    @::generalWeight = 0.0
    @::generalValence = 0.0
    @::happinessWeight = 0.0
    @::sadnessWeight = 0.0
    @::angerWeight = 0.0
    @::fearWeight = 0.0
    @::disgustWeight = 0.0
    @::surpriseWeight = 0.0
    @::startsWithEmoticon = false
    constructor : (@word, @generalWeight,@happinessWeight, @sadnessWeight, @angerWeight, @fearWeight, @disgustWeight, @surpriseWeight, @quoficient) ->
      if quoficient
        @generalWeight = @generalWeight * quoficient
        @happinessWeight = @happinessWeight * quoficient
        @sadnessWeight = @sadnessWeight * quoficient
        @angerWeight = @angerWeight * quoficient
        @fearWeight = @fearWeight * quoficient
        @disgustWeight = @disgustWeight * quoficient
        @surpriseWeight = @surpriseWeight * quoficient
      @generalValence = @getValenceSum()

    adjustWeights : (quoficient) ->
      @generalWeight = @generalWeight * quoficient
      @happinessWeight = @happinessWeight * quoficient
      @sadnessWeight = @sadnessWeight * quoficient
      @angerWeight = @angerWeight * quoficient
      @fearWeight = @fearWeight * quoficient
      @disgustWeight = @disgustWeight * quoficient
      @surpriseWeight = @surpriseWeight * quoficient
      @normalise()

    normalise : () ->
      if @generalWeight > 1
        @generalWeight = 1.0
      if @happinessWeight > 1
        @happinessWeight = 1.0
      if @sadnessWeight > 1
        @sadnessWeight = 1.0
      if @angerWeight > 1
        @angerWeight = 1.0
      if @fearWeight > 1
        @fearWeight = 1.0
      if @disgustWeight > 1
        @disgustWeight = 1.0
      if @surpriseWeight > 1
        @surpriseWeight = 1.0

    flipValence : () ->
      @generalValence = -@generalValence
      temp = @happinessWeight
      @happinessWeight = Math.max(Math.max(@sadnessWeight, @angerWeight), Math.max(@fearWeight, @disgustWeight))
      @sadnessWeight = temp
      @angerWeight = temp / 2
      @fearWeight = temp / 2
      @disgustWeight = temp / 2

    clone : () ->
      value = new AffectWord(@word, @generalWeight, @happinessWeight, @sadnessWeight, @angerWeight, @fearWeight, @disgustWeight, @surpriseWeight)
      value.setStartsWithEmoticon(@startsWithEmoticon)
      value

    getStartsWithEmoticon : () ->
      @startsWithEmoticon

    setStartsWithEmoticon : (startsWithEmoticon) ->
      @startsWithEmoticon = startsWithEmoticon

    getAngerWeight : () ->
      @angerWeight

    setAngerWeight : (angerWeight) ->
      @angerWeight = angerWeight

    getDisgustWeight : () ->
      @disgustWeight

    setDisgustWeight : (disgustWeight) ->
      @disgustWeight = disgustWeight

    getFearWeight : () ->
      @fearWeight

    setFearWeight : (fearWeight) ->
      @fearWeight = fearWeight

    getHappinessWeight : () ->
      @happinessWeight

    setHappinessWeight : (happinessWeight) ->
      @happinessWeight = happinessWeight

    getSadnessWeight : () ->
      @sadnessWeight

    setSadnessWeight : (sadnessWeight) ->
      @sadnessWeight = sadnessWeight

    getSurpriseWeight : () ->
      @surpriseWeight

    setSurpriseWeight : (surpriseWeight) ->
      @surpriseWeight = surpriseWeight

    getWord : () ->
      @word

    getGeneralWeight : () ->
      @generalWeight

    setGeneralWeight : (generalWeight) ->
      @generalWeight = generalWeight

    getGeneralValence : () ->
      @generalValence

    setGeneralValence : (generalValence) ->
      @generalValence = generalValence

    isZeroEkman : () ->
      if @getWeightSum() == 0
        return true
      else
        return false

    toString : () ->
      ret = @word + ' ' + @generalWeight + ' ' + @happinessWeight + ' ' + @sadnessWeight + ' ' + @angerWeight + ' ' + @fearWeight + ' ' + @disgustWeight + ' ' + @surpriseWeight

    getValenceSum : () ->
      ret = @happinessWeight - @sadnessWeight - @angerWeight - @fearWeight - @disgustWeight

    getWeightSum : () ->
      ret = @happinessWeight + @sadnessWeight + @angerWeight + @fearWeight + @disgustWeight + @surpriseWeight