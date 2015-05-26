(function() {
  var global;

  if (typeof global === 'undefined') {
    global = {};
  }

  if (typeof global.engine === 'undefined') {
    global.engine = {};
  }

  global.engine.core = {};

  define(['core/config', 'core/helpers', 'core/init.javascript'], function() {});

}).call(this);
