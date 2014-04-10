(function() {
  emo$.Gui.EmpathyPanel = (function() {
    var appletClassNamePrefix;

    appletClassNamePrefix = 'emo$.art.sketch.';

    function EmpathyPanel(appletSize, SynClass, artType, $el) {
      var appletClass;
      this.$el = $el;
      appletClass = eval(appletClassNamePrefix + artType);
      this.applet = new appletClass($el);
      this.synesthesiator = new SynClass(this.applet);
    }

    EmpathyPanel.prototype.fireSynesthesiator = function(text) {
      return this.synesthesiator.synesthesize(text);
    };

    return EmpathyPanel;

  })();

}).call(this);
