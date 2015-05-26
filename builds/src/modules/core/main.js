var Input;

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.input', global);

Input = (function() {
  function Input() {}

  return Input;

})();

define(['modules.core/input.text', 'modules.core/ui.jquery', 'modules.core/output.logger'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.modules.core',
    object: {},
    global: emojs
  });
});
