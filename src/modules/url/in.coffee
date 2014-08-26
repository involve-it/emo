define [
], () ->

  #class:
  class Url
    @urlEmotion : (url, contextName)->
      return Url.getBodyText(url, contextName, @.process)

    @getBodyText : (url, contextName, cbFunction) ->
      $tempDiv = emo.libs.$('<div></div>')
      ret = null
      window.a = $.getJSON 'http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', (data)->
        #alert(data)
        console.dir(data)
        debugger
        Url.process(global.libs.$(data.contents).find('div').text(), contextName)


      ###$.ajax
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
            debugger###
      debugger
      ret

    @process : (text, contextName)->
      #mediator = new global.core.api.EmotionMediator(context)
      #mediator.synesthesize(text)

      context = global.core.api.Context.getInstance(contextName)
      current = context.feelText(text)

  #jquery part:
  global.libs.$.fn.urlEmotion = Url.urlEmotion #(contextName)->

  ###$.fn.feel = ()->
    empathyScope.feel(@val())###
  global.libs.$.fn.urlProcess = Url.process
  #add class to global:
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'input.url'
    object: Url