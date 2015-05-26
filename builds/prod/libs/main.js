requirejs.config({
  paths: {
    'underscore': './libs/underscore-1.6.0',
    'xml2json': './libs/xml2json',
    'emitter': './libs/emitter',
    'text': './libs/require/text'
  },
  shim: {
    'underscore': {
      exports: ['_']
    }
  }
});

define(['underscore', 'xml2json', 'emitter', 'text'], function(underscorejs, _x2j, _emitter) {
  var gX2j, jqX2j, _$, _base;
  global.libs = (function() {
    function libs() {}

    return libs;

  })();
  if (typeof xml2json !== 'undefined') {
    gX2j = xml2json;
  }
  if (typeof jQuery !== 'undefined' && typeof jQuery.xml2json !== 'undefined') {
    jqX2j = jQuery.xml2json;
  }
  if ((_base = global.libs).x2js == null) {
    _base.x2js = gX2j || jqX2j;
  }
  _$ = {};
  _$.fn = {
    "function": function() {}
  };
  global.libs.$ = global.libs.jQuery = _$;
  global.libs._ = underscorejs;
  return global.libs.emitter = _emitter;
});
