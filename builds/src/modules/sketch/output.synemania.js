
/**
*  Classes which describe emotion-specific particles, that is visual representation of each emotion.
*
* @module Synemania
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['modules.sketch/helper.palette'], function() {
  var AngryParticle, DisgustParticle, FearParticle, HappyParticle, NeutralParticle, Particle, SadParticle, SupriseParticle, Synemania, TWO_PI, dim, palette, retObj;
  dim = 500;
  TWO_PI = 6.28;
  palette = new global.output.art.utils.SynesketchPalette('standard');
  window.testParticles = window.testParticles || [];

  /**
  * Class representing a particle
  *
  * @namespace emo.output.art.sketch
  * @class Particle
  *
   */
  Particle = (function() {
    Particle.prototype.color = null;

    Particle.prototype.x = null;

    Particle.prototype.y = null;

    Particle.prototype.vx = null;

    Particle.prototype.vy = null;

    Particle.prototype.theta = null;

    Particle.prototype.speed = null;

    Particle.prototype.speedD = null;

    Particle.prototype.thetaD = null;

    Particle.prototype.thetaDD = null;

    function Particle(ctx) {
      this.ctx = ctx;
      this.x = dim / 2;
      this.y = dim / 2;
      testParticles.push(this);
    }

    Particle.prototype.collide = function() {
      throw 'abstract';
    };

    Particle.prototype.move = function() {
      throw 'abstract';
    };

    return Particle;

  })();
  NeutralParticle = (function(_super) {
    __extends(NeutralParticle, _super);

    NeutralParticle.prototype.gray = null;

    function NeutralParticle(ctx) {
      NeutralParticle.__super__.constructor.call(this, ctx);
      this.gray = 0xFFFFFF;
      this.count = 0;
    }

    NeutralParticle.prototype.collide = function() {
      var _results;
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      _results = [];
      while (Math.abs(this.thetaDD) < 0.00001) {
        _results.push(this.thetaDD = Math.randomRange(-0.001, 0.001));
      }
      return _results;
    };

    NeutralParticle.prototype.move = function() {
      var col16;
      col16 = this.gray.toString(16);
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',0.2)';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);

      /*if(@x>0)
        debugger
       */
      if ((Math.random() * 1000) > 990) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        this.x = dim / 2;
        this.y = dim / 2;
        return this.collide();
      }
    };

    return NeutralParticle;

  })(Particle);
  HappyParticle = (function(_super) {
    __extends(HappyParticle, _super);

    function HappyParticle() {
      return HappyParticle.__super__.constructor.apply(this, arguments);
    }

    HappyParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomHappinessColor();
    };

    HappyParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return HappyParticle;

  })(Particle);
  SadParticle = (function(_super) {
    __extends(SadParticle, _super);

    function SadParticle() {
      return SadParticle.__super__.constructor.apply(this, arguments);
    }

    SadParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomSadnessColor();
    };

    SadParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return SadParticle;

  })(Particle);
  AngryParticle = (function(_super) {
    __extends(AngryParticle, _super);

    function AngryParticle() {
      return AngryParticle.__super__.constructor.apply(this, arguments);
    }

    AngryParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomAngerColor();
    };

    AngryParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return AngryParticle;

  })(Particle);
  SupriseParticle = (function(_super) {
    __extends(SupriseParticle, _super);

    function SupriseParticle() {
      return SupriseParticle.__super__.constructor.apply(this, arguments);
    }

    SupriseParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomSurpriseColor();
    };

    SupriseParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return SupriseParticle;

  })(Particle);
  FearParticle = (function(_super) {
    __extends(FearParticle, _super);

    function FearParticle() {
      return FearParticle.__super__.constructor.apply(this, arguments);
    }

    FearParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomFearColor();
    };

    FearParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return FearParticle;

  })(Particle);
  DisgustParticle = (function(_super) {
    __extends(DisgustParticle, _super);

    function DisgustParticle() {
      return DisgustParticle.__super__.constructor.apply(this, arguments);
    }

    DisgustParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomDisgustColor();
    };

    DisgustParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return DisgustParticle;

  })(Particle);
  Synemania = (function() {
    var angries, currentEmotionState, currentParticles, currentText, disgusties, fearies, happies, maxAngries, maxDisgusties, maxFearies, maxHappies, maxNeutrals, maxSaddies, maxSurprises, neutrals, sadTheta, saddies, saturationFactor, surprises, syne;

    Synemania.serialVersionUID = '1L';

    maxHappies = 800;

    maxSaddies = 800;

    maxAngries = 800;

    maxSurprises = 800;

    maxFearies = 800;

    maxDisgusties = 800;

    maxNeutrals = 30;

    currentEmotionState = new global.engine.classes.EmotionState();

    syne = null;

    neutrals = [];

    happies = [];

    saddies = [];

    angries = [];

    surprises = [];

    fearies = [];

    disgusties = [];

    currentParticles = [];

    sadTheta = null;

    saturationFactor = 1.0;

    currentText = null;

    function Synemania($el, context, dim) {
      this.$el = $el;
      this.context = context;
      this.dim = dim;
      this.setup();
    }

    Synemania.prototype.setup = function() {
      var x, _i, _j, _k, _l, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      if (this.$el != null) {
        this.$el.width = dim;
        this.$el.height = dim;
      }
      this.ctx = this.$el.getContext("2d");
      for (x = _i = 0, _ref = maxNeutrals - 1; _i < _ref; x = _i += 1) {
        neutrals[x] = new global.modules.sketch.output.synemania.NeutralParticle(this.ctx);
      }
      for (x = _j = 0, _ref1 = maxSaddies - 1; _j < _ref1; x = _j += 1) {
        saddies[x] = new global.modules.sketch.output.synemania.SadParticle(this.ctx);
      }
      for (x = _k = 0, _ref2 = maxHappies - 1; _k < _ref2; x = _k += 1) {
        happies[x] = new global.modules.sketch.output.synemania.HappyParticle(this.ctx);
      }
      for (x = _l = 0, _ref3 = maxAngries - 1; _l < _ref3; x = _l += 1) {
        angries[x] = new global.modules.sketch.output.synemania.AngryParticle(this.ctx);
      }
      for (x = _m = 0, _ref4 = maxSurprises - 1; _m < _ref4; x = _m += 1) {
        surprises[x] = new global.modules.sketch.output.synemania.SupriseParticle(this.ctx);
      }
      for (x = _n = 0, _ref5 = maxFearies - 1; _n < _ref5; x = _n += 1) {
        fearies[x] = new global.modules.sketch.output.synemania.FearParticle(this.ctx);
      }
      for (x = _o = 0, _ref6 = maxDisgusties - 1; _o < _ref6; x = _o += 1) {
        disgusties[x] = new global.modules.sketch.output.synemania.DisgustParticle(this.ctx);
      }
      sadTheta = Math.random() * TWO_PI;
      return currentParticles = neutrals;

      /*try
        syne = new SynesthetiatorEmotion(@)
      catch e
        e.printStackTrace()
       */
    };

    Synemania.prototype.update = function(state) {
      currentEmotionState = state;
      return currentParticles = this.getCurrentParticles(currentEmotionState.getStrongestEmotion());
    };

    Synemania.prototype.draw = function(contextName) {
      var numberOfParticles, strongest, weight, x, _i, _results;
      strongest = currentEmotionState.getStrongestEmotion();
      weight = strongest.getWeight();
      saturationFactor = Math.sqrt(weight);
      numberOfParticles = Math.round(currentParticles.length * saturationFactor);
      _results = [];
      for (x = _i = 0; _i < numberOfParticles; x = _i += 1) {
        _results.push(currentParticles[x].move());
      }
      return _results;
    };

    Synemania.prototype.getCurrentParticles = function(e) {
      var currentEmotion;
      currentEmotion = e.getType();
      if (currentEmotion === global.engine.classes.Emotion.HAPPINESS) {
        return happies;
      } else if (currentEmotion === global.engine.classes.Emotion.SADNESS) {
        return saddies;
      } else if (currentEmotion === global.engine.classes.Emotion.ANGER) {
        return angries;
      } else if (currentEmotion === global.engine.classes.Emotion.FEAR) {
        return fearies;
      } else if (currentEmotion === global.engine.classes.Emotion.DISGUST) {
        return disgusties;
      } else if (currentEmotion === global.engine.classes.Emotion.SURPRISE) {
        return surprises;
      } else {
        return neutrals;
      }
    };

    Synemania.prototype.saturate = function(color) {
      colorMode(HSB, 1.0);
      color = color(hue(color), saturation(color) * 0.98, brightness(color));
      colorMode(RGB, 255);
      return color;
    };

    return Synemania;

  })();
  retObj = {
    Particle: Particle,
    NeutralParticle: NeutralParticle,
    HappyParticle: HappyParticle,
    SadParticle: SadParticle,
    AngryParticle: AngryParticle,
    SupriseParticle: SupriseParticle,
    FearParticle: FearParticle,
    DisgustParticle: DisgustParticle,
    Synemania: Synemania
  };
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'modules.sketch.output.synemania',
    object: retObj
  });

  /*global.engine.helpers.MakeGlobalNamespaceAndObject
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
    object: Synemania
   */
});
