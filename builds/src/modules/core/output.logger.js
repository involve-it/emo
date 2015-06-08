var Logger,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Logger = (function(_super) {
  __extends(Logger, _super);

  function Logger() {
    return Logger.__super__.constructor.apply(this, arguments);
  }

  return Logger;

})(global.engine.classes.AbstractController);

global.runtime.app.on('processor:feel', function(state, contextName) {
  return console.log(state.toString());
});

ej$h.MakeGlobalNamespaceAndObject({
  path: 'engine.output.Logger',
  object: Logger
});
