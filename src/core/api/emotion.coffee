define [
  'core/abstract/main'
], () ->
  class Emotion extends global.core.abstract.Emotion
    @TYPES =
      TEXT : "TEXT"
      TOUCH : "TOUCH"

    constructor:(@weight, @type) ->
    compareTo:(arg0) ->
      value = 100 * (arg0.weight? - @weight)
      if (value == 0)
        return 1
      return value
    getType : ->
      @type
    setType : (@type) ->
    getWeight : ->
      @weight
    setWeight : (@weight) ->
    toString: () ->
      "Type number: " + @type + ", weight: " + @weight
    # Static:
    @NEUTRAL = -1
    @HAPPINESS = 0
    @SADNESS = 1
    @FEAR = 2
    @ANGER = 3
    @DISGUST = 4
    @SURPRISE = 5

  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'core.api.Emotion'
    object: Emotion