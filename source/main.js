require.config({
  paths: {
    //cs: '/libs/require/cs',
    //'coffee-script': '/libs/coffee-script'
    'underscore' : '/libs/underscore-1.6.0',
    'jquery' : '/libs/jquery-2.1.0',
    'xml2json' : '/libs/xml2json'
  },
  shim : {
    'underscore' : {
      exports : ['_']
    }
  },
  timeout : 100
});
window.emo$ = {}
require([
  '/libs/_libs_.js',
  '/api/_api_.js',
  '/engine/_engine_.js',
  '/gui/_gui_.js',
  '/art/_art_.js'

], function (underscore, synesketchState, synesthesiator) {
  require([
    '/app/empathy.box.js'
  ], function(EmpathyBox) {
    empathyBox = new EmpathyBox($('#canvas'), $('#textArea'), $('#butt'));
    // testing only:
    $('#butt').trigger('click');
    //aw1 = new synesketch.emotion.AffectWord('word1');
    //e1 = new engine.emotion.Emotion(0.6, 2);
  });

});