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
        retObj = ns[first]
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
        global.libs.$.extend(global[first], initialObject)
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
        retObj = ns[foreverFirst] = initialObject.object
      l1 = l1-1

      return ns

    namespace = buildFromName(subPaths, namespace)

    # need to assign the ns to the shortcut:
    if (initialObject.shortcut)
      sc = this.MakeGlobalNamespaceFromString(initialObject.shortcut, window)
      global[initialObject.shortcut] = retObj
      sc = retObj
    return retObj

  ###@hexToR = (h) ->
    parseInt((@cutHex(h)).substring(0,2),16)
  @hexToG = (h) ->
    parseInt((@cutHex(h)).substring(2,4),16)
  @hexToB = (h) ->
    parseInt((@cutHex(h)).substring(4,6),16)
  @cutHex = (h) ->
    if (h.charAt(0)=="#") then h.substring(1,7) else h###

Helpers.MakeGlobalNamespaceAndObject {
  path:'engine.helpers',
  object: Helpers,
  global: global
}

define 'engine/helpers/main', [
], ()->
