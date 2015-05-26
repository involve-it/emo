define('modules.core/input.text',[], function() {
  var Text;
  Text = (function() {
    function Text() {}

    Text.emo = function(value, contextName) {
      if (!contextName || contextName === '' || contextName === 'default') {

        /*if (@text()!='')
          text = @text()
        else
          text = @val()
         */
        contextName = 'default';
        return this.process(value, contextName);
      } else {
        return this.process(value, contextName);
      }
    };

    Text.process = function(text, contextName) {
      var curProc, processedEmo;
      curProc = global.runtime.app.getProcessorInstance();
      return processedEmo = curProc.feelText(text);
    };

    return Text;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'modules.core.input.text',
    object: Text
  });
});

define('modules.core/ui.jquery',[], function() {
  var $;
  $ = global.libs && global.libs.$ || window.$;
  $.fn.emo1 = function(contextName) {
    var text;
    if (!contextName || contextName === '' || contextName === 'default') {

      /*if (@text()!='')
        text = @text()
      else
        text = @val()
       */
      text = this[0].value;
      return this.process(text, contextName);
    } else if (contextName === 'user1') {
      return {};
    }
  };

  /*$.fn.feel = ()->
    empathyScope.feel(@val())
   */
  return $.fn.process1 = function(text, contextName) {
    var context, current;
    context = global.core.api.Context.getInstance(contextName);
    return current = context.feel(text);
  };
});


/*
  $.fn.art = (contextName, moduleName) ->
    ret = null
    if(!moduleName || moduleName == '' || moduleName == 'synemania')
       *synemania effect:
      ret = new global.output.art.sketch.Synemania(@, contextName)
      $(window).on 'context:feel:' + contextName, (e, state)->
        ret.update(state)

    else if (moduleName == 'splash')
       *show user waves!
      debugger
    else
      debugger
    ret
 */
;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('modules.core/output.logger',[], function() {
  var Logger;
  Logger = (function(_super) {
    __extends(Logger, _super);

    function Logger() {
      return Logger.__super__.constructor.apply(this, arguments);
    }

    return Logger;

  })(global.engine.classes.AbstractController);
  global.runtime.app.on('processor:feel', function(state, contextName) {
    return console.log(state.toString());
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.output.Logger',
    object: Logger
  });
});

var Input;

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.input', global);

Input = (function() {
  function Input() {}

  return Input;

})();

define('modules.core/main',['modules.core/input.text', 'modules.core/ui.jquery', 'modules.core/output.logger'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.modules.core',
    object: {},
    global: emojs
  });
});

define('modules.core', ['modules.core/main'], function (main) { return main; });

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

emojs.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'output.art.particles',
  object: retObj
});

define("modules.sketch/class.particle", function(){});

emojs.runtime.helpers.MakeGlobalNamespaceFromString('output.art');


/*confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)
 */

define('modules.sketch/ui.jquery',[], function(_$) {
  $.fn.art = function(contextName, moduleName) {
    var ret;
    contextName = contextName || 'default';
    ret = null;
    if (!moduleName || moduleName === '' || moduleName === 'synemania') {
      ret = new global.output.art.sketch.Synemania(this, contextName);
      global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
        var a;
        a = contextName;
        return ret.update(state);
      });
    } else if (moduleName === 'splash') {
      debugger;
    } else {
      debugger;
    }
    return ret;
  };
  $.fn.backgroundContext = function(contextName, moduleName) {
    var that;
    that = this;
    return global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
      var imgData, ret, tempCanvasEl, x, _i;
      tempCanvasEl = global.libs.$('<canvas id="canvasOverlay"></canvas>');
      tempCanvasEl.attr('style', 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';');
      tempCanvasEl[0].getContext('2d').globalAlpha = 0.4;
      contextName = contextName || 'default';
      ret = null;
      if (!moduleName || moduleName === '' || moduleName === 'synemania') {
        ret = new global.output.art.sketch.Synemania(tempCanvasEl, contextName);
        ret.update(state);
        for (x = _i = 1; _i <= 1000; x = _i += 1) {
          ret.draw(contextName);
        }
      } else if (moduleName === 'splash') {
        debugger;
      } else {
        debugger;
      }
      imgData = tempCanvasEl[0].toDataURL();
      that.css('background', 'url("' + imgData + '")');
      return that.css('background-size', '100% 100%');
    });
  };
  $.fn.drawEmotion = function(contextName, sourceEmotionText) {
    var emotion, i, synemania, tempCanvasEl, text, that, x, _i, _ref, _results;
    contextName = contextName || 'default';
    that = this;
    _results = [];
    for (i = _i = 0, _ref = this.length - 1; _i <= _ref; i = _i += 1) {
      tempCanvasEl = that[i];
      text = sourceEmotionText || that[i].innerText;
      emotion = emojs.modules.core.input.text.emo(text, contextName);
      if (emotion.getStrongestEmotion().getName() === 'HAPPINESS') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.4;
      } else if (emotion.getStrongestEmotion().getName() === 'SURPRISE') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.3;
      } else if (emotion.getStrongestEmotion().getName() === 'NEUTRAL') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      } else {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      }
      emotion.id = 'emo' + Math.floor(Math.random(2) * 100);
      synemania = new emojs.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
      synemania.update(emotion);
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (x = _j = 1; _j <= 1000; x = _j += 1) {
          _results1.push(synemania.draw(contextName));
        }
        return _results1;
      })());
    }
    return _results;
  };
  $.fn.backgroundEmotion = function(contextName, sourceEmotionText) {
    var attr, emotion, i, imgData, synemania, tempCanvasEl, text, that, x, _i, _j, _ref, _results;
    contextName = contextName || 'default';
    that = this;
    _results = [];
    for (i = _i = 0, _ref = this.length - 1; _i <= _ref; i = _i += 1) {
      tempCanvasEl = document.createElement('canvas');
      tempCanvasEl.id = 'canvasOverlay';
      attr = document.createAttribute('style');
      attr.value = 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';';
      tempCanvasEl.setAttributeNode(attr);
      text = sourceEmotionText || that[i].innerText;
      emotion = emojs.modules.core.input.text.emo(text, contextName);
      if (emotion.getStrongestEmotion().getName() === 'HAPPINESS') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.4;
      } else if (emotion.getStrongestEmotion().getName() === 'SURPRISE') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.3;
      } else if (emotion.getStrongestEmotion().getName() === 'NEUTRAL') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      } else {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      }
      emotion.id = 'emo' + Math.floor(Math.random(2) * 100);
      synemania = new emojs.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
      synemania.update(emotion);
      for (x = _j = 1; _j <= 1000; x = _j += 1) {
        synemania.draw(contextName);
      }
      window.tempCanvasEl = tempCanvasEl;
      imgData = tempCanvasEl.toDataURL();
      $(that[i]).css('background-image', 'url("data:' + imgData + '")');
      _results.push($(that[i]).css('background-size', '100% 100%'));
    }
    return _results;
  };
  return $.fn.clearBackground = function() {
    return $(this).css('background-image', global.libs.$(this).prevBackground || 'none');
  };
});

var SynesketchPalette, paletteFilePath;

paletteFilePath = '/palette/standard';

SynesketchPalette = (function() {
  var angerColors, disgustColors, fearColors, happinessColors, randomiser, sadnessColors, surpriseColors;

  fearColors = [];

  angerColors = [];

  disgustColors = [];

  happinessColors = [];

  sadnessColors = [];

  surpriseColors = [];

  randomiser = null;

  function SynesketchPalette(paletteName) {
    var pm;
    pm = new emojs.engine.controllers.PropertiesManager(paletteFilePath, function() {
      happinessColors = pm.getIntArrayProperty('happiness.palette');
      sadnessColors = pm.getIntArrayProperty('sadness.palette');
      angerColors = pm.getIntArrayProperty('anger.palette');
      fearColors = pm.getIntArrayProperty('fear.palette');
      disgustColors = pm.getIntArrayProperty('disgust.palette');
      return surpriseColors = pm.getIntArrayProperty('surprise.palette');
    });
  }

  SynesketchPalette.prototype.getAngerColors = function() {
    return angerColors;
  };

  SynesketchPalette.prototype.getDisgustColors = function() {
    return disgustColors;
  };

  SynesketchPalette.prototype.getFearColors = function() {
    return fearColors;
  };

  SynesketchPalette.prototype.getHappinessColors = function() {
    return happinessColors;
  };

  SynesketchPalette.prototype.getSadnessColors = function() {
    return sadnessColors;
  };

  SynesketchPalette.prototype.getSurpriseColors = function() {
    return surpriseColors;
  };

  SynesketchPalette.prototype.getRandomHappinessColor = function() {
    return happinessColors[Math.floor(Math.random() * happinessColors.length)];
  };

  SynesketchPalette.prototype.getRandomSadnessColor = function() {
    return sadnessColors[Math.floor(Math.random() * sadnessColors.length)];
  };

  SynesketchPalette.prototype.getRandomAngerColor = function() {
    return angerColors[Math.floor(Math.random() * angerColors.length)];
  };

  SynesketchPalette.prototype.getRandomFearColor = function() {
    return fearColors[Math.floor(Math.random() * fearColors.length)];
  };

  SynesketchPalette.prototype.getRandomDisgustColor = function() {
    return disgustColors[Math.floor(Math.random() * disgustColors.length)];
  };

  SynesketchPalette.prototype.getRandomSurpriseColor = function() {
    return surpriseColors[Math.floor(Math.random() * surpriseColors.length)];
  };

  return SynesketchPalette;

})();

define('modules.sketch/helper.palette',[], function() {
  return emojs.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'output.art.utils.SynesketchPalette',
    object: SynesketchPalette
  });
});


/**
*  Classes which describe emotion-specific particles, that is visual representation of each emotion.
*
* @module Synemania
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('modules.sketch/output.synemania',['modules.sketch/helper.palette'], function() {
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
      this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',0.2)';
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
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
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
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
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
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
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
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
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
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
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
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
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

    currentEmotionState = new emojs.engine.classes.EmotionState();

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
        neutrals[x] = new emojs.modules.sketch.output.synemania.NeutralParticle(this.ctx);
      }
      for (x = _j = 0, _ref1 = maxSaddies - 1; _j < _ref1; x = _j += 1) {
        saddies[x] = new emojs.modules.sketch.output.synemania.SadParticle(this.ctx);
      }
      for (x = _k = 0, _ref2 = maxHappies - 1; _k < _ref2; x = _k += 1) {
        happies[x] = new emojs.modules.sketch.output.synemania.HappyParticle(this.ctx);
      }
      for (x = _l = 0, _ref3 = maxAngries - 1; _l < _ref3; x = _l += 1) {
        angries[x] = new emojs.modules.sketch.output.synemania.AngryParticle(this.ctx);
      }
      for (x = _m = 0, _ref4 = maxSurprises - 1; _m < _ref4; x = _m += 1) {
        surprises[x] = new emojs.modules.sketch.output.synemania.SupriseParticle(this.ctx);
      }
      for (x = _n = 0, _ref5 = maxFearies - 1; _n < _ref5; x = _n += 1) {
        fearies[x] = new emojs.modules.sketch.output.synemania.FearParticle(this.ctx);
      }
      for (x = _o = 0, _ref6 = maxDisgusties - 1; _o < _ref6; x = _o += 1) {
        disgusties[x] = new emojs.modules.sketch.output.synemania.DisgustParticle(this.ctx);
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
      if (currentEmotion === emojs.engine.classes.Emotion.HAPPINESS) {
        return happies;
      } else if (currentEmotion === emojs.engine.classes.Emotion.SADNESS) {
        return saddies;
      } else if (currentEmotion === emojs.engine.classes.Emotion.ANGER) {
        return angries;
      } else if (currentEmotion === emojs.engine.classes.Emotion.FEAR) {
        return fearies;
      } else if (currentEmotion === emojs.engine.classes.Emotion.DISGUST) {
        return disgusties;
      } else if (currentEmotion === emojs.engine.classes.Emotion.SURPRISE) {
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

var Input;

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.input', global);

Input = (function() {
  function Input() {}

  return Input;

})();

define('modules.sketch/main',['modules.sketch/class.particle', 'modules.sketch/ui.jquery', 'modules.sketch/output.synemania'], function() {});

define('modules.sketch', ['modules.sketch/main'], function (main) { return main; });

requirejs.config({
  packages: [
    {
      name: 'modules.core',
      location: './modules/core'
    }, {
      name: 'modules.sketch',
      location: './modules/sketch'
    }
  ]
});

emojs.runtime.helpers.MakeGlobalNamespaceFromString('modules');

define('modules/main',['modules.core', 'modules.sketch'], function() {});


/*if global.engine.controllers.Config.isFullyClientSide
  define [
    'modules.dao'
  ], () ->
else
  define [
    'modules.datafiles'
  ], () ->
 */
;

require(["modules/main"]);
