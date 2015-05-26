define([], function() {
  var AbstractController;
  AbstractController = (function() {
    function AbstractController() {}

    return AbstractController;

  })();
  ({
    constructor: function() {

      /**
      * For trigger events, that will be listened/casted in any part of program.
      * Format of the triggered event:
      *   'global:{name}:{action}'
      * @param {String} DESCRIPTION
      * @return {String} DESCRIPTION
      *
       */
    },
    trigger: function(name, action) {
      return this.emit(name);
    },
    ready: function(callback) {
      if (typeof callback !== 'undefined') {
        return callback.call();
      }
    },
    start: function() {},
    stop: function() {}
  });
  _.extend(AbstractController.prototype, new global.libs.emitter());
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractController',
    object: AbstractController
  });
});
