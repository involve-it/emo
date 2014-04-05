#define [], () ->
  class emo$.Engine.Emotion.Emotion
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
  emo$.Engine.Emotion.Emotion.NEUTRAL = -1
  emo$.Engine.Emotion.Emotion.HAPPINESS = 0
  emo$.Engine.Emotion.Emotion.SADNESS = 1
  emo$.Engine.Emotion.Emotion.FEAR = 2
  emo$.Engine.Emotion.Emotion.ANGER = 3
  emo$.Engine.Emotion.Emotion.DISGUST = 4
  emo$.Engine.Emotion.Emotion.SURPRISE = 5
