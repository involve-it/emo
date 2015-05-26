(function() {
  define([], function() {
    var Touch;
    Touch = (function() {
      function Touch() {}

      Touch.emo = function(contextName) {
        var context;
        context = global.core.api.Context.getInstance(contextName);
        return this.on('click', function(e) {
          var current;
          return current = context.feelTouch(e, this.getContext("2d"));
        });
      };

      Touch.destructor = function() {};

      return Touch;

    })();
    global.libs.$.fn.emoTouch = Touch.emo;
    global.libs.$.fn.emoRemove = Touch.destructor;

    /*$.fn.feel = ()->
      empathyScope.feel(@val())
     */
    global.libs.$.fn.processTouch = Touch.process;
    return global.engine.helpers.MakeGlobalNamespaceAndObject({
      path: 'input.touch',
      object: Touch
    });
  });

}).call(this);
