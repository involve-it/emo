(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.SynesthesiatorEmotion');

  define(['../synesthesiator.js'], function() {
    return emo$.Engine.Emotion.SynesthesiatorEmotion = (function(_super) {
      var emotionalStates, empathyScope;

      __extends(SynesthesiatorEmotion, _super);

      emotionalStates = [];

      empathyScope = null;

      function SynesthesiatorEmotion(parentApplet) {
        SynesthesiatorEmotion.__super__.constructor.call(this, parentApplet);
        empathyScope = emo$.Engine.Emotion.EmpathyScope.getInstance();
      }

      SynesthesiatorEmotion.prototype.synesthesize = function(text) {
        var current;
        window.emotionalStates = emotionalStates;
        current = empathyScope.feel(text);
        if (emotionalStates.length !== 0) {
          current.setPrevious(emotionalStates[emotionalStates.length - 1]);
        }
        emotionalStates.push(current);
        return this.notifyPApplet(current);
      };

      return SynesthesiatorEmotion;

    })(emo$.Engine.Synesthesiator);
  });

}).call(this);
