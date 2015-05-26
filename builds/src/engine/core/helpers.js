var Helpers;

Helpers = (function() {
  var global1, _;

  function Helpers() {}

  global1 = window;

  _ = _ || window._;

  Helpers.MakeGlobalNamespaceFromString = function(path, _global, shortcut, initialObject) {
    var buildFromName, first, global, l1, l2, namespace, retObj, sc, subPaths;
    global = _global || global1 || {};
    if (global !== window) {
      global1 = global;
    }
    if (typeof global === 'string') {
      global = eval(global);
    }
    subPaths = path.split('.').reverse();
    first = subPaths.pop();
    namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
    if (subPaths.length === 0) {
      namespace;
      return namespace;
    }
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = function(paths, ns) {
      var retns;
      if (paths.length <= 0) {
        return ns;
      }
      first = subPaths.pop();
      retns = typeof ns[first] !== 'undefined' && ns[first] || {};
      ns[first] = buildFromName(paths, retns);
      if (l1 === l2) {
        retObj = _.extend(ns[first] != null ? ns[first] : ns[first] = {}, retObj != null ? retObj : retObj = {});
      }
      return ns;
    };
    namespace = buildFromName(subPaths, namespace);
    if (shortcut) {
      sc = this.MakeGlobalNamespaceFromString(shortcut, window);
      global[shortcut] = retObj;
      sc = retObj;
    }
    return retObj;
  };

  Helpers.MakeGlobalNamespaceAndObject = function(initialObject) {
    var buildFromName, first, foreverFirst, global, l1, l2, namespace, retObj, sc, subPaths;
    global = initialObject.global || global1 || {};
    if (global !== window) {
      global1 = global;
    }
    if (typeof global === 'string') {
      global = eval(global);
    }
    subPaths = initialObject.path.split('.').reverse();
    foreverFirst = subPaths[0];
    first = subPaths.pop();
    namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
    if (subPaths.length === 0) {
      if (typeof global[first] !== 'undefined' && global[first]) {
        _.extend(global[first], initialObject);
      } else {
        global[first] = initialObject.object;
      }
      return namespace;
    }
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = function(paths, ns) {
      var retns;
      if (paths.length <= 0) {
        return ns;
      }
      first = subPaths.pop();
      retns = typeof ns[first] !== 'undefined' && ns[first] || {};
      ns[first] = buildFromName(paths, retns);
      if (l1 === l2) {
        ns[foreverFirst] = _.extend(initialObject.object, ns[foreverFirst]);
        retObj = _.extend(ns[foreverFirst] != null ? ns[foreverFirst] : ns[foreverFirst] = {}, retObj != null ? retObj : retObj = {});
      }
      l1 = l1 - 1;
      return ns;
    };
    namespace = buildFromName(subPaths, namespace);
    if (initialObject.shortcut) {
      sc = this.MakeGlobalNamespaceFromString(initialObject.shortcut, window);
      global[initialObject.shortcut] = retObj;
      sc = retObj;
    }
    return retObj;
  };

  return Helpers;

})();

Helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.core.helpers',
  object: Helpers,
  global: global
});

Helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.helpers',
  object: Helpers,
  global: global
});

Helpers.hexToR = function(h) {
  return parseInt((this.cutHex(h)).substring(0, 2), 16);
};

Helpers.hexToG = function(h) {
  return parseInt((this.cutHex(h)).substring(2, 4), 16);
};

Helpers.hexToB = function(h) {
  return parseInt((this.cutHex(h)).substring(4, 6), 16);
};

Helpers.cutHex = function(h) {
  if (h.charAt(0) === "#") {
    return h.substring(1, 7);
  } else {
    return h;
  }
};


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
global.runtime.helpers.ajax = ajax;
;

define([], function() {});
