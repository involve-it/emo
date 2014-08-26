class Helpers
  global1 = window
  @MakeGlobalNamespaceFromString : (path, _global, shortcut, initialObject) ->
    #g1 = global
    global = _global || global1 || {}
    if (global != window)
      global1 = global
    if typeof global == 'string'
      global = eval(global)

    subPaths = path.split('.').reverse()
    first = subPaths.pop();
    namespace = global[first] = typeof global[first]!='undefined' && global[first] || {}
    if subPaths.length == 0
      namespace
      return namespace
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = (paths, ns) ->
      if (paths.length <= 0)
        #retObj = ns
        return ns

      first = subPaths.pop()
      retns = typeof ns[first]!='undefined' && ns[first] || {}
      ns[first] = buildFromName(paths, retns)
      if (l1 == l2)
        retObj = global.libs._.extend(ns[first]?={}, retObj?={})
      return ns
    namespace = buildFromName(subPaths, namespace)
    # need to assign the ns to the shortcut:
    if (shortcut)
      sc = this.MakeGlobalNamespaceFromString(shortcut, window)
      global[shortcut] = retObj
      sc = retObj
    #todo: finish to assign to initial object (based on eval of the path)
    #if (initialObject)
    #retObj = initialObject
    return retObj
  @MakeGlobalNamespaceAndObject : (initialObject) ->
    #g1 = global
    global = initialObject.global || global1 || {}
    if (global != window)
      global1 = global
    if typeof global == 'string'
      global = eval(global)

    subPaths = initialObject.path.split('.').reverse()
    foreverFirst = subPaths[0]
    first = subPaths.pop();
    namespace = global[first] = typeof global[first]!='undefined' && global[first] || {}
    if subPaths.length == 0
      if (typeof global[first] != 'undefined' && global[first])
        global.libs._.extend(global[first], initialObject)
      else
        global[first] = initialObject.object
      return namespace
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = (paths, ns) ->
      if (paths.length <= 0)
        #retObj = ns
        return ns

      first = subPaths.pop()
      retns = typeof ns[first]!='undefined' && ns[first] || {}
      ns[first] = buildFromName(paths, retns)
      if (l1 == l2)
        ns[foreverFirst] = global.libs._.extend(initialObject.object, ns[foreverFirst])
        retObj = global.libs._.extend(ns[foreverFirst]?={}, retObj?={})
      #retObj = ns[foreverFirst] = initialObject.object
      l1 = l1-1

      return ns

    namespace = buildFromName(subPaths, namespace)

    # need to assign the ns to the shortcut:
    if (initialObject.shortcut)
      sc = this.MakeGlobalNamespaceFromString(initialObject.shortcut, window)
      global[initialObject.shortcut] = retObj
      sc = retObj
    return retObj
Helpers.MakeGlobalNamespaceAndObject {
  path:'engine.core.helpers',
  object: Helpers,
  global: global
}
`
var ajax = {};
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('dataType', 'jsonp');
    }
    /*if (method == 'GET') {
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('dataType', 'json');
    }*/
    x.send(data)
};

ajax.get = function(url, data, callback, sync) {
    var callback = typeof callback == 'undefined' ? function(){} : callback;
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'GET', null, sync)
    //ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
};

ajax.post = function(url, data, callback, sync) {
    var callback = typeof callback == 'undefined' ? function(){} : callback;
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), sync)
}
global.engine.core.helpers.ajax = ajax;
`