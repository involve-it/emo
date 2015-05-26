
/**
* AbstractProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class AbstractProcessor
*
 */

(function() {
  var AbstractProcessor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractProcessor = (function(_super) {
    __extends(AbstractProcessor, _super);

    function AbstractProcessor() {}

    AbstractProcessor.prototype.feelText = function(text, context) {
      return console.log('abstract feelText: ' + text);
    };

    AbstractProcessor.prototype.createEmotionState = function(text, affectWords, TYPE) {
      return console.dir({
        message: 'abstract createEmotionState: ',
        affectWords: affectWords,
        TYPE: TYPE
      });
    };


    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */

    return AbstractProcessor;

  })(global.engine.classes.AbstractController);

  global.engine.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractProcessor',
    object: AbstractProcessor,
    global: global,
    shortcut: 'e$ecp'
  });

  define('controllers/main', [], function() {});

}).call(this);
