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
    {
      name : 'api',
      location : 'api',
      main : '_api_'
    },
    {
      name : 'art',
      location : 'art',
      main : '_art_'
    },
    {
      name : 'engine',
      location : 'engine',
      main : '_engine_'
    },
    {
      name : 'gui',
      location : 'gui',
      main : '_gui_'
    },
    {
      name : 'libs',
      location : 'libs',
      main : '_libs_'
    }
  ],
  timeout : 100
});
window.emo$ = {}
require([
  'libs'
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
