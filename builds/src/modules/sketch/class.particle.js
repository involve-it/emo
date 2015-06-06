var HeartsParticle, SnailParticle, SpiralParticle, retObj;

SpiralParticle = (function() {
  function SpiralParticle(x, y, ctx) {
    this.ctx = ctx;
    this.x = x / 2.1;
    this.y = y / 5;
    this.collide();
  }

  SpiralParticle.prototype.color = '#ff0000';

  SpiralParticle.prototype.vx = null;

  SpiralParticle.prototype.vy = null;

  SpiralParticle.prototype.speed = 1;

  SpiralParticle.prototype.i = 0;

  SpiralParticle.prototype.coords = [];

  SpiralParticle.prototype.collide = function() {
    this.theta = Math.random() * 6.28;
    this.speed = Math.randomRange(1.001, 1.0001);
    this.speedD = 1.001;
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    this.thetaD = 0.1;
    this.color = '#ff0000';
    this.alpha = 1;
    return this.alphaD = 0.0005;
  };

  SpiralParticle.prototype.move = function() {
    var c1;
    c1 = {
      i: ++this.i,
      x: this.x,
      y: this.y,
      a: this.alpha
    };
    this.coords.push(c1);
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.speed *= this.speedD;
    return this.alpha -= this.alphaD;
  };

  SpiralParticle.prototype.draw = function() {
    return this.move();
  };

  return SpiralParticle;

})();

SnailParticle = (function() {
  function SnailParticle(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.collide();
  }

  SnailParticle.prototype.color = '#ff0000';

  SnailParticle.prototype.vx = null;

  SnailParticle.prototype.vy = null;

  SnailParticle.prototype.speed = 1;

  SnailParticle.prototype.collide = function() {
    this.theta = Math.random() * 6.28;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = '#ff0000';
  };

  SnailParticle.prototype.move = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 1, 1);
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    return this.speed *= this.speedD;
  };

  SnailParticle.prototype.draw = function() {
    return this.move();
  };

  return SnailParticle;

})();

HeartsParticle = (function() {
  function HeartsParticle() {}

  return HeartsParticle;

})();

retObj = {
  Hearts: HeartsParticle,
  Spiral: SpiralParticle,
  Snail: SnailParticle
};

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'output.art.particles',
  object: retObj
});
