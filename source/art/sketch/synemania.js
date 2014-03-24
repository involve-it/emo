// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['art/utils/_utils_.js'], function() {

    /*
     Classes which describe emotion-specific particles, that is visual representation of each emotion.
     */
    var TWO_PI, ctx, dim, palette;
    dim = 500;
    TWO_PI = 6.28;
    palette = new emo$.art.utils.SynesketchPalette('standard');
    ctx = null;
    emo$.art.sketch.Particle = (function() {
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

      function Particle() {
        this.x = dim / 2;
        this.y = dim / 2;
      }

      Particle.prototype.collide = function() {
        throw 'abstract';
      };

      Particle.prototype.move = function() {
        throw 'abstract';
      };

      return Particle;

    })();
    emo$.art.sketch.NeutralParticle = (function(_super) {
      __extends(NeutralParticle, _super);

      NeutralParticle.prototype.gray = null;

      function NeutralParticle() {
        NeutralParticle.__super__.constructor.call(this);
        this.gray = Math.random() * 255;
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
        ctx.fillStyle = this.gray.toString(16);
        ctx.fillRect(this.x, this.y - 1, 1, 1);
        this.x += this.vx;
        this.y += this.vy;
        this.vx = this.speed * Math.sin(this.theta);
        this.vy = this.speed * Math.sin(this.theta);

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

    })(emo$.art.sketch.Particle);
    emo$.art.sketch.HappyParticle = (function(_super) {
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
        if ((this.color != null)) {
          ctx.fillStyle = this.color.toString(16);
          ctx.fillRect(this.x, this.y - 1, 1, 1);
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, this.y + 1, 1, 1);
          $('textarea').css('background-color', '#' + this.color.toString(16));
          $('div').css('background-color', '#' + this.color.toString(16));
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx = this.speed * Math.sin(this.theta);
        this.vy = this.speed * Math.sin(this.theta);
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

    })(emo$.art.sketch.Particle);
    return emo$.art.sketch.Synemania = (function() {
      var angries, currentEmotionalState, currentParticles, currentText, disgusties, fearies, happies, maxAngries, maxDisgusties, maxFearies, maxHappies, maxNeutrals, maxSaddies, maxSurprises, neutrals, sadTheta, saddies, saturationFactor, surprises, syne;

      Synemania.serialVersionUID = '1L';

      maxHappies = 500;

      maxSaddies = 800;

      maxAngries = 800;

      maxSurprises = 100;

      maxFearies = 200;

      maxDisgusties = 800;

      maxNeutrals = 750;

      currentEmotionalState = new emo$.Engine.Emotion.EmotionalState();

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

      function Synemania($el, dim) {
        this.$el = $el;
        this.dim = dim;
        this.setup();
      }

      Synemania.prototype.setup = function() {
        var x, _i, _j, _k, _l, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
        if (this.$el != null) {
          this.$el.css('width', dim);
          this.$el.css('height', dim);
        }
        ctx = this.$el[0].getContext("2d");
        for (x = _i = 0, _ref = maxNeutrals - 1; _i < _ref; x = _i += 1) {
          neutrals[x] = new emo$.art.sketch.NeutralParticle();
        }

        /*for x in [0...maxSaddies-1] by 1
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
          disgusties[x] = new DisgustParticle()
         */
        for (x = _j = 0, _ref1 = maxSaddies - 1; _j < _ref1; x = _j += 1) {
          saddies[x] = new emo$.art.sketch.NeutralParticle();
        }
        for (x = _k = 0, _ref2 = maxHappies - 1; _k < _ref2; x = _k += 1) {
          happies[x] = new emo$.art.sketch.HappyParticle();
        }
        for (x = _l = 0, _ref3 = maxAngries - 1; _l < _ref3; x = _l += 1) {
          angries[x] = new emo$.art.sketch.NeutralParticle();
        }
        for (x = _m = 0, _ref4 = maxSurprises - 1; _m < _ref4; x = _m += 1) {
          surprises[x] = new emo$.art.sketch.NeutralParticle();
        }
        for (x = _n = 0, _ref5 = maxFearies - 1; _n < _ref5; x = _n += 1) {
          fearies[x] = new emo$.art.sketch.NeutralParticle();
        }
        for (x = _o = 0, _ref6 = maxDisgusties - 1; _o < _ref6; x = _o += 1) {
          disgusties[x] = new emo$.art.sketch.NeutralParticle();
        }
        sadTheta = Math.random() * TWO_PI;
        return currentParticles = neutrals;

        /*try
          syne = new SynesthetiatorEmotion(@)
        catch e
          e.printStackTrace()
         */
      };

      Synemania.prototype.synesketchUpdate = function(state) {
        currentEmotionalState = state;
        return currentParticles = this.getCurrentParticles(currentEmotionalState.getStrongestEmotion());
      };

      Synemania.prototype.draw = function() {
        var numberOfParticles, strongest, weight, x, _i, _results;
        strongest = currentEmotionalState.getStrongestEmotion();
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
        if (currentEmotion === emo$.Engine.Emotion.Emotion.HAPPINESS) {
          return happies;
        } else if (currentEmotion === emo$.Engine.Emotion.Emotion.SADNESS) {
          return saddies;
        } else if (currentEmotion === emo$.Engine.Emotion.Emotion.ANGER) {
          return angries;
        } else if (currentEmotion === emo$.Engine.Emotion.Emotion.FEAR) {
          return fearies;
        } else if (currentEmotion === emo$.Engine.Emotion.Emotion.DISGUST) {
          return disgusties;
        } else if (currentEmotion === emo$.Engine.Emotion.Emotion.SURPRISE) {
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
  });

}).call(this);

//# sourceMappingURL=synemania.map
