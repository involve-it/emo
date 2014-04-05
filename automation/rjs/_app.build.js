({
	appDir: "../../source",
	//baseUrl: "js",
	dir: "build-2.0.1.0.1.multi",
	/*   modules: [
        {
            name: "main"
        }
    ]*/
	optimize: "uglify",
	optimizeCss: "standard",

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
	}
})