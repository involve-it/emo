###*
*  Classes which describe emotion-specific particles, that is visual representation of each emotion.
*
* @module Synemania
*###
define [
  'modules.sketch/helper.palette'
],() ->
  dim = 500
  TWO_PI = 6.28
  palette = new global.output.art.utils.SynesketchPalette('standard');
  #ctx = null
  window.testParticles = window.testParticles || []
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

    constructor : (@ctx)->
      @x = dim/2
      @y = dim/2
      testParticles.push(@)
    collide : ->
      throw 'abstract'
    move : ->
      throw 'abstract'
  class NeutralParticle extends Particle
    @::gray = null
    constructor : (ctx)->
      super(ctx)
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

      @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',0.2)'
      @ctx.fillRect(@x,@y-1,1,1)

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
        @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        @ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
          #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        @ctx.fillStyle = fillst
        @ctx.fillRect(0, @y + 1,1,1)

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
        col16 = @color.toString(16)
        #debugger
        @count = @count || 0
        @count += 1;
        @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        @ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
        #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        @ctx.fillStyle = fillst
        @ctx.fillRect(0, @y + 1,1,1)
#        @ctx.fillStyle = @color.toString(16)
#        @ctx.fillRect(@x, @y - 1,1,1)
#        @ctx.fillStyle = '#000000' #todo: saturationFactor!!
#        @ctx.fillRect(0, @y + 1,1,1)
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
          #@x = dim/2
          #@y = dim/2
          @collide()
      #if (@x < -dim/2) || (@x > dim/2) || (@y<-dim/2) || (@y>dim*2)
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
        col16 = @color.toString(16)
        #debugger
        @count = @count || 0
        @count += 1;
        @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        @ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
        #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        @ctx.fillStyle = fillst
        @ctx.fillRect(0, @y + 1,1,1)
#        @ctx.fillStyle = @color.toString(16)
#        @ctx.fillRect(@x, @y - 1,1,1)
#        @ctx.fillStyle = '#000000' #todo: saturationFactor!!
#        @ctx.fillRect(0, @y + 1,1,1)
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
        col16 = @color.toString(16)
        #debugger
        @count = @count || 0
        @count += 1;
        @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        @ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
        #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        @ctx.fillStyle = fillst
        @ctx.fillRect(0, @y + 1,1,1)
#        @ctx.fillStyle = @color.toString(16)
#        @ctx.fillRect(@x, @y - 1,1,1)
#        @ctx.fillStyle = '#000000' #todo: saturationFactor!!
#        @ctx.fillRect(0, @y + 1,1,1)
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
        col16 = @color.toString(16)
        #debugger
        @count = @count || 0
        @count += 1;
        @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        @ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
        #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        @ctx.fillStyle = fillst
        @ctx.fillRect(0, @y + 1,1,1)
#        @ctx.fillStyle = @color.toString(16)
#        @ctx.fillRect(@x, @y - 1,1,1)
#        @ctx.fillStyle = '#000000' #todo: saturationFactor!!
#        @ctx.fillRect(0, @y + 1,1,1)
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
        col16 = @color.toString(16)
        #debugger
        @count = @count || 0
        @count += 1;
        @ctx.fillStyle = 'rgba('+ global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50/@count) + ')'
        #ctx.fillStyle = @color.toString(16)
        @ctx.fillRect(@x, @y - 1,1,1)
        #if (@count>1000)
        #debugger

        fillst = '#000000, {a}'.replace('{a}', 1/@speed)
        @ctx.fillStyle = fillst
        @ctx.fillRect(0, @y + 1,1,1)
#        @ctx.fillStyle = @color.toString(16)
#        @ctx.fillRect(@x, @y - 1,1,1)
#        @ctx.fillStyle = '#000000' #todo: saturationFactor!!
#        @ctx.fillRect(0, @y + 1,1,1)
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
    maxHappies = 800
    maxSaddies = 800
    maxAngries = 800
    maxSurprises = 800
    maxFearies = 800
    maxDisgusties = 800
    maxNeutrals = 30

    currentEmotionState = new global.engine.classes.EmotionState()

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
        @$el.width = dim
        @$el.height = dim

      @ctx = @$el.getContext("2d")

      for x in [0...maxNeutrals-1] by 1
        neutrals[x] = new global.modules.sketch.output.synemania.NeutralParticle(@ctx)
      #for x in [0...1] by 1
      for x in [0...maxSaddies-1] by 1
        saddies[x] = new global.modules.sketch.output.synemania.SadParticle(@ctx)

      for x in [0...maxHappies-1] by 1
        happies[x] = new global.modules.sketch.output.synemania.HappyParticle(@ctx)

      for x in [0...maxAngries-1] by 1
        angries[x] = new global.modules.sketch.output.synemania.AngryParticle(@ctx)

      for x in [0...maxSurprises-1] by 1
        surprises[x] = new global.modules.sketch.output.synemania.SupriseParticle(@ctx)

      for x in [0...maxFearies-1] by 1
        fearies[x] = new global.modules.sketch.output.synemania.FearParticle(@ctx)

      for x in [0...maxDisgusties-1] by 1
        disgusties[x] = new global.modules.sketch.output.synemania.DisgustParticle(@ctx)

      sadTheta = Math.random() * TWO_PI
      currentParticles = neutrals
      ###try
        syne = new SynesthetiatorEmotion(@)
      catch e
        e.printStackTrace()###

    update : (state) ->
      currentEmotionState = state
      currentParticles = @getCurrentParticles(currentEmotionState.getStrongestEmotion())
#    drawSingle : (emotion) ->
#      weight = emotion.getWeight()
#      saturationFactor =  Math.sqrt(weight)
#      numberOfParticles = Math.round(currentParticles.length * saturationFactor)
#      for x in [0...numberOfParticles] by 1
#        currentParticles[x].move()
    draw : (contextName) -> #use context name!!
      strongest = currentEmotionState.getStrongestEmotion() #?! review this, it has bad logic!
      weight = strongest.getWeight()
      saturationFactor =  Math.sqrt(weight)
      numberOfParticles = Math.round(currentParticles.length * saturationFactor)
      for x in [0...numberOfParticles] by 1
        currentParticles[x].move()
    getCurrentParticles : (e) ->
      currentEmotion = e.getType()
      if currentEmotion == global.engine.classes.Emotion.HAPPINESS
        return happies
      else if currentEmotion == global.engine.classes.Emotion.SADNESS
        return saddies
      else if currentEmotion == global.engine.classes.Emotion.ANGER
        return angries
      else if currentEmotion == global.engine.classes.Emotion.FEAR
        return fearies
      else if currentEmotion == global.engine.classes.Emotion.DISGUST
        return disgusties
      else if currentEmotion == global.engine.classes.Emotion.SURPRISE
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
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'modules.sketch.output.synemania'
    object: retObj
  #put every class to global namespace:
  ###global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.Particle'
    object: Particle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.NeutralParticle'
    object: NeutralParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.HappyParticle'
    object: HappyParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.SadParticle'
    object: SadParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.AngryParticle'
    object: AngryParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.SupriseParticle'
    object: SupriseParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.FearParticle'
    object: FearParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.DisgustParticle'
    object: DisgustParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.Synemania'
    object: Synemania###
