require.config({
  paths: {
    'underscore' : './libs/underscore-1.6.0',
    'jquery' : './libs/jquery-2.1.0',
    'xml2json' : './libs/xml2json'
  },
  shim : {
    'underscore': {
      exports: ['_']
    },
    'gui' : {
      deps : [
        'engine'
      ],
      exports: ['emo$.e']
    },
    'art' : {
      deps : [
        'engine',
        'api'
      ]
    },
    'api' : {
      deps : [
        'engine'
      ]
    }
  },
  packages: [
    // api:
    {
      name : 'gui',
      location : './gui/',
      main : '_gui_'
    },
    {
      name : 'engine',
      location : './engine/',
      main : '_engine_'
    },
    {
      name : 'art',
      location : 'art',
      main : '_art_'
    },
    {
      name : 'api',
      location : './api/',
      main : '_api_'
    }
  ],
  timeout : 100
});
window.emo$ = {}
require([
  './libs/_libs_.js'
], function(){
  require([
    'engine'
  ], function(){
    require([
      'api',
      //'/engine/engine-build.js',
      'gui',
      'art'
    ], function (underscore, synesketchState, synesthesiator) {
      require([
        './views/empathy.box.js'
      ], function(EmpathyBoxView) {
        empathyBox = new EmpathyBoxView($('#canvas'), $('#textArea'), $('#butt'));
        // testing only:
        $('#butt').trigger('click');
      });
    });
  });
});
