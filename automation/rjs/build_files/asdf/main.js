(function() {
  require.config({
    paths: {
      'underscore': './libs/underscore-1.6.0',
      'jquery': './libs/jquery-2.1.0',
      'xml2json': './libs/xml2json'
    },
    shim: {
      'underscore': {
        exports: ['_']
      },
      'gui': {
        deps: ['engine']
      },
      'art': {
        deps: ['engine', 'api']
      },
      'api': {
        deps: ['engine']
      },
      'engine.emotion': {
        deps: ['engine.emotion/helpers/_helpers_']
      }
    },
    packages: [
      {
        name: 'api',
        location: 'api',
        main: '_api_'
      }, {
        name: 'art',
        location: 'art',
        main: '_art_'
      }, {
        name: 'core',
        location: 'core',
        main: '_core_'
      }, {
        name: 'engine',
        location: 'engine',
        main: '_engine_'
      }, {
        name: 'engine.emotion',
        location: 'engine/emotion',
        main: '_engine_'
      }, {
        name: 'gui',
        location: 'gui',
        main: '_gui_'
      }, {
        name: 'libs',
        location: 'libs',
        main: '_libs_'
      }
    ],
    timeout: 100
  });

  window.emo$ = {};

  require(['libs', 'core'], function() {
    return require(['engine'], function() {
      return require(['api', 'gui', 'art'], function(underscore, synesketchState, synesthesiator) {
        return require(['./views/empathy.box.js'], function(EmpathyBoxView) {
          var empathyBox;
          empathyBox = new EmpathyBoxView($('#canvas'), $('#textArea'), $('#butt'));
          return $('#butt').trigger('click');
        });
      });
    });
  });

}).call(this);
