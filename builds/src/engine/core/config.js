var Config;

Config = (function() {
  function Config() {}

  Config.dataServerRoot = global.settings.dataServerRoot;

  Config.fullyClientSide = true;

  return Config;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.core.Config',
  object: Config
});

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.config',
  object: Config
});
