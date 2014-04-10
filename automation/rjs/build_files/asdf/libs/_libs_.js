(function() {
  emo$.Libs = (function() {
    function Libs() {}

    return Libs;

  })();

  define(['jquery', 'underscore', 'xml2json'], function() {
    return emo$.Libs.x2js = new X2JS();
  });

}).call(this);
