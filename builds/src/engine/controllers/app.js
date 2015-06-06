
/**
* MainController class will be Events Bus
*
* @namespace engine.controllers
* @class MainController
*
 */
var App,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App = (function(_super) {
  var processor;

  __extends(App, _super);

  processor = null;

  App.staticConfig = null;

  function App(config) {
    this.staticConfig = config != null ? config : config = {};
  }


  /**
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *
   */

  App.prototype.trigger = function(name, action) {};

  App.prototype.getProcessorInstance = function() {
    return processor;
  };

  App.prototype.setProcessorInstance = function(ProcessorClassObjectName) {

    /*processorClass = eval(ProcessorClassObjectName)
    processor = new processorClass(@)
    processor.ready ()->
     */
    processor = global.runtime.app.processor;
    return processor.ready(function() {});
  };

  App.prototype.start = function() {
    if (typeof this.staticConfig.processor !== 'undefined') {
      return this.setProcessorInstance(this.staticConfig.processor);
    } else {
      return this.setProcessorInstance('global.processors.client.ClientProcessor');
    }
  };

  return App;

})(global.engine.classes.AbstractController);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.App',
  object: App,
  global: global,
  shortcut: 'e$eca'
});
