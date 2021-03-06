(function() {
  define([], function() {
    var AbstractController;
    AbstractController = (function() {
      function AbstractController() {}


      /**
      * For trigger events, that will be listened/casted in any part of program.
      * Format of the triggered event:
      *   'global:{name}:{action}'
      * @param {String} DESCRIPTION
      * @return {String} DESCRIPTION
      *
       */

      AbstractController.prototype.trigger = function(name, action) {
        return this.emit(name);
      };

      AbstractController.prototype.ready = function(callback) {
        if (typeof callback !== 'undefined') {
          return callback.call();
        }
      };

      AbstractController.prototype.start = function() {};

      AbstractController.prototype.stop = function() {};

      return AbstractController;

    })();
    _.extend(AbstractController.prototype, new global.libs.emitter());
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'engine.classes.AbstractController',
      object: AbstractController
    });
  });

}).call(this);
