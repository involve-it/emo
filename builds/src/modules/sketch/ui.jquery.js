global.runtime.helpers.MakeGlobalNamespaceFromString('output.art');


/*confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)
 */

define([], function(_$) {
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
      emotion = global.modules.core.input.text.emo(text, contextName);
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
      synemania = new global.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
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
      emotion = global.modules.core.input.text.emo(text, contextName);
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
      synemania = new global.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
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
