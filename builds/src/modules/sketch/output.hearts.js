define(['../../../../../../builds/src/core/output/art/particles'], function(_$) {
  var Hearts, retObj;
  Hearts = (function() {
    var ctx, particles;

    particles = [];

    ctx = null;

    function Hearts(el) {
      this.el = el;
      ctx = this.$el[0].getContext("2d");
    }

    Hearts.prototype.draw = function() {
      return this.draw(ctx);
    };

    Hearts.draw = function(event, ctx) {
      var c1, p, x, _i, _j, _ref, _results;
      p = new SpiralParticle(event.offsetX, event.offsetY, ctx);
      particles.push(p);
      x = 0;
      for (x = _i = 0; _i <= 2000; x = _i += 1) {
        p.move();
      }
      ctx.fillStyle = p.color;
      _results = [];
      for (x = _j = 0, _ref = p.coords.length - 1; _j <= _ref; x = _j += 1) {
        c1 = p.coords[x];
        ctx.globalAlpha = c1.a;
        _results.push(ctx.fillRect(c1.x, c1.y, 1, 0.5));
      }
      return _results;

      /*setInterval(()->
        p.draw()
      , 1)
       */
    };

    return Hearts;

  })();
  retObj = Hearts;
  return global.engine.helpers.MakeGlobalNamespaceAndObject({
    path: 'output.art.hearts',
    object: retObj
  });
});
