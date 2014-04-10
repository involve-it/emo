###define [
  #'cs!controller'
  #'cs!view'
  #'regular'
], () ->###

class emo$.Core.Helpers
  @MakeGlobalNamespaceFromString : (path, global, shortcut) ->
    global = global || window || {}
    subPaths = path.split('.').reverse()
    first = subPaths.pop();
    namespace = global[first] = typeof global[first]!='undefined' && global[first] || {}
    retObj = null;
    buildFromName = (paths, ns) ->
      if (paths.length <= 0)
        retObj = ns
        return ns

      first = subPaths.pop()
      retns = typeof ns[first]!='undefined' && ns[first] || {}
      ns[first] = buildFromName(paths, retns)
      return ns

    namespace = buildFromName(subPaths, namespace)
    # need to assign the ns to the shortcut:
    if (shortcut)
      sc = this.MakeGlobalNamespaceFromString(shortcut, window)
      global[shortcut] = retObj
      sc = retObj
    return retObj



