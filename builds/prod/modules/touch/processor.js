
/**
* Processor controller class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system.
* @namespace engine.controllers
* @class Processor
*
 */

(function() {
  var Processor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Processor = (function(_super) {
    __extends(Processor, _super);

    function Processor() {
      debugger;
    }


    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */

    Processor.prototype.trigger = function(name, action) {};

    return Processor;

  })(global.engine.classes.AbstractController);

  global.engine.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.controllers.Processor',
    object: Processor,
    global: global,
    shortcut: 'e$ecp'
  });

  define('controllers/main', [], function() {});

}).call(this);
