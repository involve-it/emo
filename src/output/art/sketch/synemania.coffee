###*
*  Classes which describe emotion-specific particles, that is visual representation of each emotion.
*
* @module Synemania
*###
define [
  'output/art/utils/main'
],() ->
  dim = 500
  TWO_PI = 6.28
  palette = new global.output.art.utils.SynesketchPalette('standard');
  ctx = null
  window.testParticles = []
  ###*
  * Class representing a particle
  *
  * @namespace emo.output.art.sketch
  * @class Particle
  *###
  class Particle
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
      testParticles.push(@)
    collide : ->
      throw 'abstract'
    move : ->
      throw 'abstract'
  class NeutralParticle extends Particle
    @::gray = null
    constructor : ->
      super()
      @gray = 0xFFFFFF
      #new staff:
      @count = 0

      #@gray = (Math.random()*0xFFFFFF<<0).toString(16)
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
      #ctx.fillStyle = @gray.toString(16)
      col16 = @gray.toString(16)

      ctx.fillStyle = 'rgba('+ global.core.helpers.hexToR(col16) + ',' + global.core.helpers.hexToG(col16) + ',' + global.core.helpers.hexToB(col16) + ',0.2)'

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
  class HappyParticle extends Particle
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
        col16 = @color.toString(16)
        #debugger
        @count = @count || 0
        @count += 1;
        ctx.fillStyle = 'rgba('+ global.core.helpers.hexToR(col16) + ',' + global.core.helpers.hexToG(col16) + ',' + global.core.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
          #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        #console.log(fillst)
        ctx.fillStyle = fillst;

        #console.log('speed: ' + @speed+ ', count: ' + @count)
        if(@speed<0.01)
          console.log('speed small now');

        ctx.fillRect(0, @y + 1,1,1)
        #$('textarea').css('background-color', '#' + @color.toString(16))
        #$('div').css('background-color', '#' + @color.toString(16))

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
  class SadParticle extends Particle
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
      @color = palette.getRandomSadnessColor()
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
  class AngryParticle extends Particle
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
      @color = palette.getRandomAngerColor()
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
  class SupriseParticle extends Particle
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
      @color = palette.getRandomSurpriseColor()
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
        #$('textarea').css('background-color', '#' + @color.toString(16))
        #$('div').css('background-color', '#' + @color.toString(16))

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
  class FearParticle extends Particle
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
      @color = palette.getRandomFearColor()
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
        #$('textarea').css('background-color', '#' + @color.toString(16))
        #$('div').css('background-color', '#' + @color.toString(16))

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
  class DisgustParticle extends Particle
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
      @color = palette.getRandomDisgustColor()
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
        #$('textarea').css('background-color', '#' + @color.toString(16))
        #$('div').css('background-color', '#' + @color.toString(16))

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
  class Synemania
    @serialVersionUID = '1L'
    maxHappies = 600
    maxSaddies = 800
    maxAngries = 800
    maxSurprises = 200
    maxFearies = 400
    maxDisgusties = 900
    maxNeutrals = 30

    currentEmotionState = new global.core.api.EmotionState()

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

    constructor: (@$el, @context, @dim) ->
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
        neutrals[x] = new global.output.art.sketch.NeutralParticle()
      for x in [0...maxSaddies-1] by 1
        saddies[x] = new global.output.art.sketch.SadParticle()

      for x in [0...maxHappies-1] by 1
        happies[x] = new global.output.art.sketch.HappyParticle()

      for x in [0...maxAngries-1] by 1
        angries[x] = new global.output.art.sketch.AngryParticle()

      for x in [0...maxSurprises-1] by 1
        surprises[x] = new global.output.art.sketch.SupriseParticle()

      for x in [0...maxFearies-1] by 1
        fearies[x] = new global.output.art.sketch.FearParticle()

      for x in [0...maxDisgusties-1] by 1
        disgusties[x] = new global.output.art.sketch.DisgustParticle()

      sadTheta = Math.random() * TWO_PI
      currentParticles = neutrals
      ###try
        syne = new SynesthetiatorEmotion(@)
      catch e
        e.printStackTrace()###

    update : (state) ->
      currentEmotionState = state
      currentParticles = @getCurrentParticles(currentEmotionState.getStrongestEmotion())
    draw : ->
      strongest = currentEmotionState.getStrongestEmotion()
      weight = strongest.getWeight()
      saturationFactor =  Math.sqrt(weight)
      numberOfParticles = Math.round(currentParticles.length * saturationFactor)
      for x in [0...numberOfParticles] by 1
        currentParticles[x].move()
    getCurrentParticles : (e) ->
      currentEmotion = e.getType()
      if currentEmotion == global.core.api.Emotion.HAPPINESS
        return happies
      else if currentEmotion == global.core.api.Emotion.SADNESS
        return saddies
      else if currentEmotion == global.core.api.Emotion.ANGER
        return angries
      else if currentEmotion == global.core.api.Emotion.FEAR
        return fearies
      else if currentEmotion == global.core.api.Emotion.DISGUST
        return disgusties
      else if currentEmotion == global.core.api.Emotion.SURPRISE
        return surprises
      else
        return neutrals
    saturate : (color) ->
      colorMode(HSB, 1.0)
      color = color(hue(color), saturation(color) * 0.98, brightness(color))
      colorMode(RGB, 255)
      return color
  retObj = {
    Particle : Particle
    NeutralParticle : NeutralParticle
    HappyParticle : HappyParticle
    SadParticle : SadParticle
    AngryParticle : AngryParticle
    SupriseParticle : SupriseParticle
    FearParticle : FearParticle
    DisgustParticle : DisgustParticle
    Synemania : Synemania
  }
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch'
    object: retObj
  #put every class to global namespace:
  ###global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.Particle'
    object: Particle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.NeutralParticle'
    object: NeutralParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.HappyParticle'
    object: HappyParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.SadParticle'
    object: SadParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.AngryParticle'
    object: AngryParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.SupriseParticle'
    object: SupriseParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.FearParticle'
    object: FearParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.DisgustParticle'
    object: DisgustParticle
  global.core.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.Synemania'
    object: Synemania###
