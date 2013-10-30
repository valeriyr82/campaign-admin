/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
    'text!templates/side_left_geofence.html'
], function ($, _, Backbone, sideGeofenceTemplate) {
	'use strict';

	var SideGeofenceView = Backbone.View.extend({
        el: '.sidebar',
		template: _.template(sideGeofenceTemplate),
        viewName: "SideGeofenceView",
        events: {
		},
		initialize: function () {
            this.render();
		},
		render: function () {
            var self = this;
			self.$el.html(self.template());

            $( "#category" ).accordion({
                heightStyle: "content"
            });
            $( "#category #id_filtergroup li" ).draggable({
                appendTo: "body",
                helper: "clone"
            });
            $("#category h2 a").on("click", function() {
                if(typeof $(this).attr("href") != 'undefined' && $(this).attr("href") != "") {
                    window.app_router.navigate($(this).attr("href"), {trigger: true})
                }
            });
			return this;
		},
		clear: function () {
			this.model.destroy();
		},
		destroy: function() {
			//COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			//Remove view from DOM
			this.$el.html('');
		}
	});

	return SideGeofenceView;
});
