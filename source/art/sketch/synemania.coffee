define [],() ->
  class emo$.art.sketch.Synemania
    @serialVersionUID = '1L'
    dim = 400
    maxHappies = 500
    maxSaddies = 800
    maxAngries = 800
    maxSurprises = 100
    maxFearies = 200
    maxDisgusties = 800
    maxNeutrals = 750

    currentEmotionalState = new emo$.Engine.Emotion.EmotionalState()
    palette = new emo$.art.utils.SynesketchPalette('standard');

    syne = null

    neutrals = new NeutralParticle[maxNeutrals]
    happies = new HappyParticle[maxHappies]
    saddies = new SadParticle[maxSaddies]
    angries = new AngryParticle[maxAngries]
    surprises = new SupriseParticle[maxSurprises]
    fearies = new FearParticle[maxFearies]
    disgusties = new DisgustParticle[maxDisgusties]

    currentParticles = []

    sadTheta = null

    saturationFactor = '1.0f'

    currentText = null

    constructor: (@dim) ->
      super()
    setup : ->
      size(dim, dim, P3D)
      background(255)
      noStroke()

      for x in [0...maxNeutrals-1] by 1
        neutrals[x] = new NeutralParticle()

      ###for x in [0...maxSaddies-1] by 1
        saddies[x] = new SadParticle()

      for x in [0...maxHappies-1] by 1
        happies[x] = new HappyParticle()

      for x in [0...maxAngries-1] by 1
        angries[x] = new AngryParticle()

      for x in [0...maxSurprises-1] by 1
        surprises[x] = new SupriseParticle()

      for x in [0...maxFearies-1] by 1
        fearies[x] = new FearParticle()

      for x in [0...maxDisgusties-1] by 1
        disgusties[x] = new DisgustParticle()###
      for x in [0...maxSaddies-1] by 1
        saddies[x] = new NeutralParticle()

      for x in [0...maxHappies-1] by 1
        happies[x] = new NeutralParticle()

      for x in [0...maxAngries-1] by 1
        angries[x] = new NeutralParticle()

      for x in [0...maxSurprises-1] by 1
        surprises[x] = new NeutralParticle()

      for x in [0...maxFearies-1] by 1
        fearies[x] = new NeutralParticle()

      for x in [0...maxDisgusties-1] by 1
        disgusties[x] = new NeutralParticle()

      sadTheta = random(TWO_PI); #todo change to js
      currentParticles = neutrals
      try
        syne = new SynesthetiatorEmotion(@)
      catch e
        e.printStackTrace()

    synesketchUpdate : (state) ->
      currentEmotionalState = state
      currentParticles = getCurrentParticles(currentEmotionalState.getStrongestEmotion())
    draw : ->
      strongest = currentEmotionalState.getStrongestEmotion()
      weight = strongest.getWeight()
      saturationFactor =  Math.sqrt(weight)
      numberOfParticles = Math.round(currentParticles.length * saturationFactor)
      for x in [0...numberOfParticles] by 1
        currentParticles[x].move()
    getCurrentParticles : (e) ->
      currentEmotion = e.getType()
      if currentEmotion == emo$.Engine.Emotion.Emotion.HAPPINESS
        return happies
      else if currentEmotion == emo$.Engine.Emotion.Emotion.SADNESS
        return saddies
      else if currentEmotion == emo$.Engine.Emotion.Emotion.ANGER
        return angries
      else if currentEmotion == emo$.Engine.Emotion.Emotion.FEAR
        return fearies
      else if currentEmotion == emo$.Engine.Emotion.Emotion.DISGUST
        return disgusties
      else if currentEmotion == emo$.Engine.Emotion.Emotion.SURPRISE
        return surprises
      else
        return neutrals

    saturate : (color) ->
      colorMode(HSB, '1.0f')
      color = color(hue(color), saturation(color) * '0.98f', brightness(color))
      colorMode(RGB, 255)
      return color

  ###
   Classes which describe emotion-specific particles, that is visual representation of each emotion.
  ###
  class  emo$.art.sketch.Particle
    color = null
    x = null
    y = null
    vx = null
    vy = null
    theta = null
    speed = null
    speedD = null
    thetaD = null
    thetaDD = null

    constructor : ->
      x = dim/2
      y = dim/2
    collide : ->
      throw 'abstract'
    move : ->
      throw 'abstract'

  class NeutralParticle extends Particle
    gray = null
    constructor : ->
      super()
      gray = Math.floor(Math.random() * 255)
    collide : ->
      x = dim/2
      y = dim/2
      theta = random(TWO_PI);
      speed = random('0.5f', '3.5f')
      speedD = random('0.996f', '1.001f')
      thetaD = 0
      thetaDD = 0
      while (abs(thetaDD)<0.00001)
        thetaDD = random('-0.001f', '0.001f')
    move : ->
      stroke(gray, 28)
      point(x, y-1)
      x += vx
      y += vy
      vx = speed * sin(theta)
      vy = speed * cos(theta)
      if random(1000) > 990
        x = dim/2
        y = dim/2
        collide()
      if (x<-dim) || (x>dim*2) || (y<-dim) || (y>dim*2)
        x = dim/2
        y = dim/2
        collide()