(function() {
  define([], function() {
    var D3;
    D3 = (function() {
      function D3() {}

      D3.d3 = function(contextName) {};

      D3.process = function(text, contextName) {
        var context, current;
        context = global.core.api.Context.getInstance(contextName);
        return current = context.feel(text);
      };

      return D3;

    })();
    global.libs.$.fn.d3 = function(contextName) {
      var el, ret;
      contextName = contextName || 'default';
      ret = null;
      el = this[0];
      global.libs.$(window).on('context:feel:' + contextName, function(e, state) {});
      return ret;
    };
    return global.engine.helpers.MakeGlobalNamespaceAndObject({
      path: 'output.d3',
      object: D3
    });
  });

}).call(this);
