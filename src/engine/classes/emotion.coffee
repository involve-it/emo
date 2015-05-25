define [
  'classes/abstract.emotion'
], () ->
  class Emotion extends global.engine.classes.AbstractEmotion
    constructor:(@weight, @type) ->
    compareTo:(arg0) ->
      value = 100 * (arg0.weight? - @weight)
      if (value == 0)
        return 1
      return value
    getType : ->
      @type
    setType : (@type) ->
    getName : ->
      switch(@type)
        when -1
          return 'NEUTRAL'
        when 0
          return 'HAPPINESS'
        when 1
          return 'SADNESS'
        when 2
          return 'FEAR'
        when 3
          return 'ANGER'
        when 4
          return 'DISGUST'
        when 5
          return 'SURPRISE'

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

    @TYPES =
      TEXT : "TEXT"
      TOUCH : "TOUCH"
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.classes.Emotion'
    object: Emotion