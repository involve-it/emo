
global1 = window
Helpers = {}

`
Helpers.isPlainObject = function(a) {
  var b;
  if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))
    return !1;
  try {
    if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))
      return !1
  } catch (c) {
    return !1
  }
  if (k.ownLast)
    for (b in a)
      return j.call(a, b);
  for (b in a)
    ;
  return void 0 === b || j.call(a, b)
}

Helpers.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && typeof target !== 'function' ) {
    target = {};
  }

  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( helpers.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && helpers.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = helpers.extend( deep, clone, copy );

          // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};
`

Helpers.MakeGlobalNamespaceFromString = (path, _global, shortcut, initialObject) ->
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
        retObj = Helpers.extend(ns[first]?={}, retObj?={})
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

Helpers.MakeGlobalNamespaceAndObject = (initialObject) ->
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
        Helpers.extend(global[first], initialObject)
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
        ns[foreverFirst] = Helpers.extend(initialObject.object, ns[foreverFirst])
        retObj = Helpers.extend(ns[foreverFirst]?={}, retObj?={})
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

Helpers.hexToR = (h) ->
  parseInt((@cutHex(h)).substring(0,2),16)
Helpers.hexToG = (h) ->
  parseInt((@cutHex(h)).substring(2,4),16)
Helpers.hexToB = (h) ->
  parseInt((@cutHex(h)).substring(4,6),16)
Helpers.cutHex = (h) ->
  if (h.charAt(0)=="#") then h.substring(1,7) else h
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
Helpers.ajax = ajax;
`
debugger
# static, so instead of creating instance, just assign to runtime:
Helpers.MakeGlobalNamespaceAndObject {
  path:'runtime.helpers',
  object: Helpers,
  global: global,
  shortcut: 'e$h'
}