(function() {
  define([], function() {
    return window.EmpathyBox = (function() {
      function EmpathyBox($canvas, $textArea, $butt) {
        var that;
        this.$canvas = $canvas;
        this.$textArea = $textArea;
        this.$butt = $butt;
        that = this;
        this.empathyPanel = new emo$.Gui.EmpathyPanel(100, emo$.Engine.Emotion.SynesthesiatorEmotion, 'Synemania', $canvas);
        this.$textArea.keypress(function(e) {
          var text;
          if (e.which === 13) {
            text = $(this).val().trim();
            that.empathyPanel.fireSynesthesiator(text);
          }
        });
        this.$butt.click(function(e) {
          var text;
          text = that.$textArea.val().trim();
          return that.empathyPanel.fireSynesthesiator(text);
        });
        setInterval(function() {
          var results;
          return results = that.empathyPanel.applet.draw();
        }, 10);
      }

      EmpathyBox.prototype.getAppCanvas = function() {
        return this.empathyPanel;
      };

      EmpathyBox.prototype.getTextArea = function() {
        return this.$textArea;
      };

      return EmpathyBox;

    })();
  });

}).call(this);
