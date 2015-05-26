
/**
* ServerProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class ServerProcessor
*
 */
var ServerProcessor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ServerProcessor = (function(_super) {
  __extends(ServerProcessor, _super);

  function ServerProcessor(app) {
    this.app = app;
  }


  /**
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *
   */

  ServerProcessor.prototype.trigger = function(name, action) {};

  ServerProcessor.prototype.feelText = function(text, context) {
    debugger;
    return ServerProcessor.__super__.feelText.apply(this, arguments);
  };

  return ServerProcessor;

})(emojs.engine.classes.AbstractProcessor);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'processors.server.ServerProcessor',
  object: ServerProcessor,
  global: global,
  shortcut: 'e$pcs'
});

define('controllers/main', [], function() {});
