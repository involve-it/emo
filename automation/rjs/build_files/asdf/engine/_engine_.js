(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine');

  define(['./emotion/_emotion_.js', './synesketch.state.js', './synesthesiator.js'], function() {
    require([]);
    return emo$.Engine;
  });

}).call(this);
