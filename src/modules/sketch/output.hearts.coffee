#define [
#  '../../../../../../builds/src/core/output/art/particles'
#], (_$) ->
class Hearts
  particles = []
  ctx = null
  constructor: (@el)->
    ctx = @$el[0].getContext("2d")

  draw: ->
    @draw(ctx)
  @draw: (event, ctx)->
    p = new SpiralParticle(event.offsetX, event.offsetY, ctx)
    particles.push(p)
    x=0
    for x in [0..2000] by 1
      p.move()
    ctx.fillStyle = p.color
    for x in [0..p.coords.length-1] by 1
      c1 = p.coords[x]
      ctx.globalAlpha = c1.a
      ctx.fillRect(c1.x, c1.y, 1, 0.5)
    ###setInterval(()->
      p.draw()
    , 1)###

retObj = Hearts
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.hearts'
  object: retObj