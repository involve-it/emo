define([], function() {
  var Emoticon;
  Emoticon = (function() {
    function Emoticon() {}

    Emoticon.emo = function(contextName) {
      var text;
      if (!contextName || contextName === '' || contextName === 'default') {

        /*if (@text()!='')
          text = @text()
        else
          text = @val()
         */
        text = this[0].value;
        return this.process(text, contextName);
      } else if (context(Name === 'user1')) {
        debugger;
      }
    };

    Emoticon.process = function(text, contextName) {
      var context, current;
      context = global.core.api.Context.getInstance(contextName);
      return current = context.feel(text);
    };

    return Emoticon;

  })();

  /*$.fn.feel = ()->
    empathyScope.feel(@val())
   */
  global.libs.$.fn.emoticon = function(contextName) {
    var el, ret;
    contextName = contextName || 'default';
    ret = null;
    el = this[0];
    global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
      var emotion;
      emotion = ej$h.max(state._emotions, function(emotion) {
        return emotion.weight;
      });
      if (emotion.type !== -1) {
        global.libs.$(el).css('display', 'block');
      } else {
        global.libs.$(el).css('display', 'none');
      }
      if (emotion.type === 0) {
        global.libs.$(el).css('background-position-x', '-100px');
        return global.libs.$(el).css('background-position-y', '0');
      } else if (emotion.type === 1) {
        global.libs.$(el).css('background-position-x', '-100px');
        return global.libs.$(el).css('background-position-y', '130px');
      } else if (emotion.type === 2) {
        global.libs.$(el).css('background-position-x', '100px');
        return global.libs.$(el).css('background-position-y', '130px');
      } else if (emotion.type === 3) {
        global.libs.$(el).css('background-position-x', '0');
        return global.libs.$(el).css('background-position-y', '0');
      } else if (emotion.type === 4) {
        global.libs.$(el).css('background-position-x', '0');
        return global.libs.$(el).css('background-position-y', '130px');
      } else if (emotion.type === 5) {
        global.libs.$(el).css('background-position-x', '100px');
        return global.libs.$(el).css('background-position-y', '0');
      }
    });
    return ret;
  };
  return global.engine.helpers.MakeGlobalNamespaceAndObject({
    path: 'output.emoticon',
    object: Emoticon
  });
});
