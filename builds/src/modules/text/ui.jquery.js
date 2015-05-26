define([], function() {
  global.libs.$.fn.emo = function(contextName) {
    var text;
    text = this[0].value || this.text();
    Text.emo(text, contextName);
    return empathyScope.feel(this.val());
  };
  return global.libs.$.fn.process = Text.process;
});
