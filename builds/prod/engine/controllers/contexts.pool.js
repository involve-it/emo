(function() {
  var ContextsPool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ContextsPool = (function(_super) {
    var processor;

    __extends(ContextsPool, _super);

    processor = null;

    ContextsPool.config = null;

    ContextsPool.contextsPool = [];

    function ContextsPool(config) {
      this.config = config != null ? config : config = {};
    }


    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */

    ContextsPool.prototype.trigger = function(name, action) {};

    ContextsPool.prototype.getProcessorInstance = function() {
      return processor;
    };

    ContextsPool.prototype.setProcessorInstance = function(ProcessorClassObjectName) {
      var processorClass;
      processorClass = eval(ProcessorClassObjectName);
      processor = new processorClass(this);
      return processor.ready(function() {});
    };

    ContextsPool.prototype.start = function() {
      if (typeof this.config.processor !== 'undefined') {
        return this.setProcessorInstance(this.config.processor);
      } else {
        return this.setProcessorInstance('global.engine.processors.client.ServerProcessor');
      }
    };

    return ContextsPool;

  })(global.engine.classes.AbstractController);

  global.engine.core.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.controllers.App',
    object: App,
    global: global,
    shortcut: 'e$eca'
  });

  define([], function() {});

}).call(this);
