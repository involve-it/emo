(function() {
  define([], function() {
    var Url;
    Url = (function() {
      function Url() {}

      Url.urlEmotion = function(url, contextName) {
        return Url.getBodyText(url, contextName, this.process);
      };

      Url.getBodyText = function(url, contextName, cbFunction) {
        var $tempDiv, ret;
        $tempDiv = emo.libs.$('<div></div>');
        ret = null;
        window.a = $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data) {
          console.dir(data);
          debugger;
          return Url.process(global.libs.$(data.contents).find('div').text(), contextName);
        });

        /*$.ajax
          url :  url,
          type: 'GET',
          dataType: 'text/plain',
          async : false,
          crossDomain: true,
          xhrFields:
            withCredentials: false
          success : (data, textStatus, jqXHR) ->
            debugger
            ret = cbFunction(data, contextName)
        
          error: (jqXHR, textStatus, errorThrown) ->
            if(jqXHR.status == 401)
              debugger
         */
        debugger;
        return ret;
      };

      Url.process = function(text, contextName) {
        var context, current;
        context = global.core.api.Context.getInstance(contextName);
        return current = context.feelText(text);
      };

      return Url;

    })();
    global.libs.$.fn.urlEmotion = Url.urlEmotion;

    /*$.fn.feel = ()->
      empathyScope.feel(@val())
     */
    global.libs.$.fn.urlProcess = Url.process;
    return global.engine.helpers.MakeGlobalNamespaceAndObject({
      path: 'input.url',
      object: Url
    });
  });

}).call(this);
