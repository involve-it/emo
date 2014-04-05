({
  //appDir: "../source",
  //dir: "appdirectory-build",
  baseUrl: "../../source/platform",
  name: "main",
  out: "platform-build.js",

  optimize : "none",
  paths: {
    jquery : './platform/libs/jquery/jquery-2.0.3.min',
    'jquery.mobile' : './platform/libs/jquery/jquery.mobile.custom.min-1.3.2',
    'jquery.cookie' : './platform/libs/jquery/jquery.cookie',
    'jquery.jqGrid' : './platform/libs/jqgrid/jquery.jqGrid',
    'jquery.grid.locale-en' : './platform/libs/jqgrid/i18n/grid.locale-en',
    bootstrap : './platform/libs/bootstrap/bootstrap.min',
    'jquery.ui.custom' : './platform/libs/jquery/jquery-ui-1.10.3.custom.min',
    'jquery.ui' : './platform/libs/jquery/jquery-ui-1.10.3.full.min',
    'bootstrap.bootbox' : './platform/libs/bootstrap/bootbox',
    underscore : './platform/libs/backbone/underscore-1.5.2',
    backbone  : './platform/libs/backbone/backbone-1.0.0',
    marionette : './platform/libs/backbone/backbone.marionette-1.1.0',
    'backbone.babysitter' :'./platform/libs/backbone/backbone.babysitter',
    'backbone.wreqr' : './platform/libs/backbone/backbone.wreqr',
    'backbone.localstorage' : './platform/libs/backbone/backbone.localstorage',
    text : './platform/libs/require/text',
    path : './platform/libs/require/path',
    // session:
    'platform.session' : './platform/core/session',
    'platform.session.services' : './services/services'
  },
  packages: [
    {
      name : 'platform.api.inits',
      location : './platform/api/inits',
      main : '_inits_'
    },
    {
      name : 'platform.api.prototypes',
      location : './platform/api/prototypes',
      main : '_prototypes_'
    },
    {
      name : 'platform.api.helpers',
      location : './platform/api/helpers',
      main : '_helpers_'
    },
    {
      name : 'platform',
      location : './platform'
    },
    // core:
    {
      name : 'platform.core',
      location : './platform/core',
      main : '_core_'
    },
    //controllers:
    {
      name : 'platform.controllers',
      location : './platform/controllers',
      main : '_controllers_'
    },
    //extensions:
    {
      name : 'platform.api.extensions',
      location : './platform/api/extensions',
      main : '_extensions_'
    },
    // controls package:
    {
      name : 'platform.controls',
      location : './platform/views'
    }
  ],
  include : {
    'backgrid-path' : './platform/libs/backgrid/',
  'backgrid' : './platform/libs/backgrid/backgrid-0.2.6',
  'backbone-pageable' : './platform/libs/backgrid/backbone-pageable',
  'backgrid-paginator' : './platform/libs/backgrid/extensions/paginator/backgrid-paginator',
  'backgrid-filter' : './platform/libs/backgrid/extensions/filter/backgrid-filter',
  'lunr' : './platform/libs/backgrid/lunr',
  'jquery-validate':'./platform/libs/jquery-validation/jquery.validate.min'
  }

})


// run:
//C:\Users\ashot.arutyunyan\workspace-testing\SocialXtendMobile-2.3\build>node r.js -o main.build.js
// don't forget to change the index.html:
/*	<script src="js/libs/require/require.js"></script>
 <script>
 require.config({
 paths: {
 "main": "js/main-built"
 }
 });
 require(["main"]);
 </script>
 instead of <script type="text/javascript" data-main="js/main" src="js/libs/require/require.js"></script>*/