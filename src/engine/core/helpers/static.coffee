###define [
  #'cs!controller'
  #'cs!view'
  #'regular'
], () ->###
define [], () ->
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
    @hexToR = (h) ->
      parseInt((@cutHex(h)).substring(0,2),16)
    @hexToG = (h) ->
      parseInt((@cutHex(h)).substring(2,4),16)
    @hexToB = (h) ->
      parseInt((@cutHex(h)).substring(4,6),16)
    @cutHex = (h) ->
      if (h.charAt(0)=="#") then h.substring(1,7) else h