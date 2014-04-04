define [
  'art/utils/_utils_.js'
],() ->
  ###
 Classes which describe emotion-specific particles, that is visual representation of each emotion.
###
  dim = 500
  TWO_PI = 6.28
  palette = new emo$.art.utils.SynesketchPalette('standard');
  ctx = null

  class  emo$.art.sketch.Particle
    @::color = null
    @::x = null
    @::y = null
    @::vx = null
    @::vy = null
    @::theta = null
    @::speed = null
    @::speedD = null
    @::thetaD = null
    @::thetaDD = null

    constructor : ->
      @x = dim/2
      @y = dim/2
    collide : ->
      throw 'abstract'
    move : ->
      throw 'abstract'

  class emo$.art.sketch.NeutralParticle extends emo$.art.sketch.Particle
    @::gray = null
    constructor : ->
      super()
      @gray = Math.random() * 255
    collide : ->
      @x = dim/2
      @y = dim/2
      @theta = Math.random() * TWO_PI
      @speed = Math.randomRange(0.5, 3.5)
      @speedD = Math.randomRange(0.996, 1.001)
      @thetaD = 0
      @thetaDD = 0
      while (Math.abs(@thetaDD) < 0.00001)
        @thetaDD = Math.randomRange(-0.001, 0.001)
    move : ->
      #stroke(gray, 28)
      #point(x, y-1)
      ctx.fillStyle = @gray.toString(16)
      ctx.fillRect(@x,@y-1,1,1)

      @x += @vx
      @y += @vy
      @vx = @speed * Math.sin(@theta)
      @vy = @speed * Math.cos(@theta)
      ###if(@x>0)
        debugger###
      if (Math.random() * 1000) > 990
        @x = dim/2
        @y = dim/2
        @collide()
      if (@x < -dim) || (@x > dim*2) || (@y<-dim) || (@y>dim*2)
        @x = dim/2
        @y = dim/2
        @collide()
  class emo$.art.sketch.HappyParticle extends emo$.art.sketch.Particle
    collide : ->
      @x = dim/2
      @y = dim/2
      @theta = Math.random() * TWO_PI
      @speed = Math.randomRange(0.5, 3.5)
      @speedD = Math.randomRange(0.996, 1.001)
      @thetaD = 0
      @thetaDD = 0
      while (Math.abs(@thetaDD) < 0.00001)
        @thetaDD = Math.randomRange(-0.001, 0.001)
      @color = palette.getRandomHappinessColor()
    move : ->
      #stroke(red(color), green(color), blue(color), 30*saturationFactor);
      #point(x,y-1);
      #stroke(0, 25*saturationFactor);
      #point(x,y+1);
      if (@color?)
        ctx.fillStyle = @color.toString(16)
        ctx.fillRect(@x, @y - 1,1,1)
        ctx.fillStyle = '#000000' #todo: saturationFactor!!
        ctx.fillRect(0, @y + 1,1,1)
        $('textarea').css('background-color', '#' + @color.toString(16))
        $('div').css('background-color', '#' + @color.toString(16))

      @x += @vx
      @y += @vy
      @vx = @speed * Math.sin(@theta)
      @vy = @speed * Math.cos(@theta)
      @theta += @thetaD;
      @thetaD += @thetaDD;
      @speed *= @speedD;
      if (Math.random() * 1000) > 997
        @speedD = 1.0
        @thetaDD = 0.00001
        if Math.random() * 100 > 70
          @x = dim/2
          @y = dim/2
          @collide()
      if (@x < -dim) || (@x > dim*2) || (@y<-dim) || (@y>dim*2)
        @collide()

  class emo$.art.sketch.Synemania
    @serialVersionUID = '1L'
    maxHappies = 600
    maxSaddies = 800
    maxAngries = 800
    maxSurprises = 200
    maxFearies = 400
    maxDisgusties = 900
    maxNeutrals = 30

    currentEmotionalState = new emo$.Engine.Emotion.EmotionalState()

    syne = null

    neutrals = []
    happies = []
    saddies = []
    angries = []
    surprises = []
    fearies = []
    disgusties = []
    currentParticles = []

    sadTheta = null

    saturationFactor = 1.0

    currentText = null

    constructor: (@$el, @dim) ->
      #super()
      @setup()
    setup : ->
      if @$el?
        @$el.css('width', dim)
        @$el.css('height', dim)
        #size(dim, dim, P3D)
        #background(255)
        #noStroke()

      ctx = @$el[0].getContext("2d")

      for x in [0...maxNeutrals-1] by 1
        neutrals[x] = new emo$.art.sketch.NeutralParticle()
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
        saddies[x] = new emo$.art.sketch.NeutralParticle()

      for x in [0...maxHappies-1] by 1
        happies[x] = new emo$.art.sketch.HappyParticle()

      for x in [0...maxAngries-1] by 1
        angries[x] = new emo$.art.sketch.NeutralParticle()

      for x in [0...maxSurprises-1] by 1
        surprises[x] = new emo$.art.sketch.NeutralParticle()

      for x in [0...maxFearies-1] by 1
        fearies[x] = new emo$.art.sketch.NeutralParticle()

      for x in [0...maxDisgusties-1] by 1
        disgusties[x] = new emo$.art.sketch.NeutralParticle()

      sadTheta = Math.random() * TWO_PI
      currentParticles = neutrals
      ###try
        syne = new SynesthetiatorEmotion(@)
      catch e
        e.printStackTrace()###

    synesketchUpdate : (state) ->
      currentEmotionalState = state
      currentParticles = @getCurrentParticles(currentEmotionalState.getStrongestEmotion())
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
      colorMode(HSB, 1.0)
      color = color(hue(color), saturation(color) * 0.98, brightness(color))
      colorMode(RGB, 255)
      return color


