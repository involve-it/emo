(function() {
  var Input;

  global.engine.core.helpers.MakeGlobalNamespaceFromString('engine.input', global);

  Input = (function() {
    function Input() {}

    return Input;

  })();

  define(['modules.sketch/class.particle', 'modules.sketch/ui.jquery', 'modules.sketch/output.synemania']);

}).call(this);
