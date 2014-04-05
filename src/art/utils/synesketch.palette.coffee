dataServerAddr = 'http://localhost:8899'
define [], () ->
  class emo$.art.utils.SynesketchPalette
    fearColors = []
    angerColors = []
    disgustColors = []
    happinessColors = []
    sadnessColors = []
    surpriseColors = []
    randomiser = null

    constructor : (paletteName) ->
      pm = new emo$.Engine.Utils.PropertiesManager(dataServerAddr + '/palette/' + paletteName.toLowerCase() + '.xml')
      happinessColors = pm.getIntArrayProperty('happiness.palette')
      sadnessColors = pm.getIntArrayProperty('sadness.palette')
      angerColors = pm.getIntArrayProperty('anger.palette')
      fearColors = pm.getIntArrayProperty('fear.palette')
      disgustColors = pm.getIntArrayProperty('disgust.palette')
      surpriseColors = pm.getIntArrayProperty('surprise.palette')
      #randomiser = new Math.random()

    getAngerColors : ->
      angerColors
    getDisgustColors: ->
      disgustColors
    getFearColors : ->
      fearColors
    getHappinessColors : ->
      happinessColors
    getSadnessColors : ->
      sadnessColors
    getSurpriseColors : ->
      surpriseColors
    getRandomHappinessColor : ->
      happinessColors[Math.floor(Math.random() * happinessColors.length)]
    getRandomSadnessColor : ->
      sadnessColors[Math.floor(Math.random() * sadnessColors.length)]
    getRandomAngerColor : ->
      angerColors[Math.floor(Math.random() * angerColors.length)]
    getRandomFearColor : ->
      fearColors[Math.floor(Math.random() * fearColors.length)]
    getRandomDisgustColor : ->
      disgustColors[Math.floor(Math.random() * disgustColors.length)]
    getRandomSurpriseColor : ->
      surpriseColors[Math.floor(Math.random() * surpriseColors.length)]