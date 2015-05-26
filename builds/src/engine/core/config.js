define(['core/helpers'], function() {
  var Config;
  Config = (function() {
    function Config() {}

    Config.dataServerRoot = emojs.settings.dataServerRoot;

    Config.fullyClientSide = true;

    return Config;

  })();
  global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.core.Config',
    object: Config
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.config',
    object: Config
  });
});
