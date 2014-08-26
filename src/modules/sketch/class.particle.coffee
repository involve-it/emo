class SpiralParticle
  constructor:(x, y, @ctx)->
    @x = x/2.1
    @y = y/5
    @collide()
    #@x = 0
    #@y = 0
  @::color = '#ff0000'
  @::vx = null
  @::vy = null
  @::speed = 1
  @::i = 0
  @::coords = []

  collide : ->
    @theta = Math.random() * 6.28
    @speed = Math.randomRange(1.001, 1.0001);
    #@speedD = Math.randomRange(1.001, 1.005);
    @speedD = 1.001
    @thetaD = 0;
    @thetaDD = 0;
    while (Math.abs(@thetaDD) < 0.00001)
      @thetaDD = Math.randomRange(-0.001, 0.001)
    @thetaD = 0.1
    @color = '#ff0000'

    @alpha = 1
    @alphaD = 0.0005

  move: ->
    #if (@color?)
    #@ctx.fillStyle = @color
    #@ctx.globalAlpha = @alpha
    #@ctx.fillRect(@x, @y,1,1)
    c1 = {i:++@i, x:@x, y:@y, a : @alpha}
    @coords.push(c1)

    @x += @vx
    @y += @vy
    @vx = @speed * Math.sin(@theta)
    @vy = @speed * Math.cos(@theta)
    @theta += @thetaD
    #@thetaD += @thetaDD
    @speed *= @speedD
    @alpha -= @alphaD
    #console.log(c1)

  draw: ->
    @move()

class SnailParticle
  constructor:(@x, @y, @ctx)->
    @collide()
  #@x = 0
  #@y = 0
  @::color = '#ff0000'
  @::vx = null
  @::vy = null
  @::speed = 1
  collide : ->
    @theta = Math.random() * 6.28;
    @speed = Math.randomRange(0.5, 3.5);
    @speedD = Math.randomRange(0.996, 1.001);
    @thetaD = 0;
    @thetaDD = 0;
    while (Math.abs(@thetaDD) < 0.00001)
      @thetaDD = Math.randomRange(-0.001, 0.001)
    @color = '#ff0000'

  move: ->

    #if (@color?)
    @ctx.fillStyle = @color
    @ctx.fillRect(@x, @y,1,1)

    @x += @vx
    @y += @vy
    @vx = @speed * Math.sin(@theta)
    @vy = @speed * Math.cos(@theta)
    @theta += @thetaD;
    @thetaD += @thetaDD;
    @speed *= @speedD;
  draw: ->
    @move()
class HeartsParticle

retObj =
  Hearts : HeartsParticle #todo
  Spiral : SpiralParticle
  Snail  : SnailParticle

emojs.runtime.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.particles'
  object: retObj