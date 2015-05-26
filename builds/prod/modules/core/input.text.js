(function() {
  define([], function() {
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
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'modules.core.input.text',
      object: Text
    });
  });

}).call(this);
