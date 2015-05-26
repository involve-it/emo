(function() {
  var Input;

  global.engine.core.helpers.MakeGlobalNamespaceFromString('engine.input', global);

  Input = (function() {
    function Input() {}

    return Input;

  })();

  define(['modules.core/input.text', 'modules.core/ui.jquery', 'modules.core/output.logger'], function() {
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'runtime.app.modules.core',
      object: {},
      global: emojs
    });
  });

}).call(this);
