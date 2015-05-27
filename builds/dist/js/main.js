var emojsRequire, settings;

emojsRequire = requirejs.config({
  /*paths: {
    'jquery': './libs/jquery-2.1.0'
  },*/
  shim: {
    'engine': {
      deps: ['libs']
    },
    'processors': {
      deps: ['libs', 'engine']
    },
    'modules': {
      deps: ['libs', 'engine']
    }
  },
  /*packages: [
    {
      name: 'libs',
      location: './libs'
    }, {
      name: 'engine',
      location: './engine'
    }, {
      name: 'modules',
      location: './modules'
    }, {
      name: 'processors',
      location: './processors'
    }
  ],*/
  timeout: 10000
});

window.global = window.emojs = {};

settings = {
  dataServerRoot: '/data'
};

window.emojs.settings = settings;

window.document.addEventListener('app:ready', function() {
  var emojsReadyEvent;
  emojsReadyEvent = new Event('emojs:ready');
  document.dispatchEvent(emojsReadyEvent);
  return window.document.removeEventListener('emojs:ready');
});

emojsRequire(['libs', 'engine', 'processors', 'modules'], function() {
  debugger;
});
/*emojsRequire(['emojs'], function() {
  debugger;
});*/
