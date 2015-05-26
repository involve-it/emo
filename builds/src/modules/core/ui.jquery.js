define([], function() {
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
