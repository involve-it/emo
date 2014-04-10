
/*define [
   *'cs!controller'
   *'cs!view'
   *'regular'
], () ->
 */

(function() {
  define([], function() {
    return emo$.Core.Helpers = (function() {
      function Helpers() {}

      Helpers.MakeGlobalNamespaceFromString = function(path, global, shortcut) {
        var buildFromName, first, namespace, retObj, sc, subPaths;
        global = global || window || {};
        subPaths = path.split('.').reverse();
        first = subPaths.pop();
        namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
        retObj = null;
        buildFromName = function(paths, ns) {
          var retns;
          if (paths.length <= 0) {
            retObj = ns;
            return ns;
          }
          first = subPaths.pop();
          retns = typeof ns[first] !== 'undefined' && ns[first] || {};
          ns[first] = buildFromName(paths, retns);
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

      return Helpers;

    })();
  });

}).call(this);
