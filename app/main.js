/**
 * Global requirment to use strict mode
 */
'use strict';
/**
 * Require.js allows us to configure shortcut alias
 */
var streethawkAPI = null;
var APIhostName = "http://api.streethawk.co";
var GEOFENCE_RADIUS_LIST = [
    {value: -1, label: 'Ignore'},
    {value: 500, label: '500 meters'},
    {value: 1000, label: '1 kilometer'},
    {value: 5000, label: '5 kilometers'},
    {value: 10000, label: '10 kilometers'},
    {value: 50000, label: '50 kilometers'},
    {value: 100000, label: '100 kilometers'}
]
require.config({
	/**
	 * The shim config allows us to configure dependencies for scripts that do not call define() to register a module
	 */
	shim: {
		'socketio': {
		    exports: 'io'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
        backboneRouteFilter: {
            deps: [
                'underscore',
                'backbone'
            ],
            exports: 'BackboneRouterFilter'
        },
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		bootstrap: {
			deps: ['jquery']
		},
		bootstrapslider: {
			deps: [
				'jquery',
				'bootstrap'
			]
		},
		bootstrapdatetimepicker: {
			deps: [
				'jquery',
				'bootstrap'
			]
		},
		jqueryui: {
		    deps: [
			'jquery'
		    ]
		}
	},
	paths: {
		jquery: '../public/js/jquery/jquery',
        	jqueryui: '../public/js/jquery/jquery-ui.custom',
		underscore: '../public/js/underscore/underscore',
		backbone: '../public/js/backbone/backbone',
        backboneRouteFilter: '../public/js/backbone/backbone.routefilter',
		backboneLocalstorage: '../public/js/backbone.localStorage/backbone.localStorage',
		text: '../public/js/requirejs-text/text',
        	socketio: '../public/static/socket.io',
		bootstrap: '../public/js/bootstrap',
		bootstrapslider: '../public/js/bootstrap-slider',
		bootstrapdatetimepicker: '../public/js/bootstrap-datetimepicker',
        cookie: '../public/js/cookie'
	}
    //,urlArgs: "bust=" + (new Date()).getTime()
});

require([
	'app',
    'streethawkAPI',
	'bootstrap',
	'bootstrapslider',
	'bootstrapdatetimepicker'
], function (App, SHAPI) {
    streethawkAPI = new SHAPI();
    App.initialize();

});
