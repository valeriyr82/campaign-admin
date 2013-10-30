/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/campaignModel',
    'text!templates/side_left_userlist.html'
], function ($, _, Backbone, CampaignModel, sideUserlistTemplate) {
	'use strict';

	var SideUserlistView = Backbone.View.extend({
        el: '.sidebar',
		template: _.template(sideUserlistTemplate),
        viewName: "SideUserlistView",
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

	return SideUserlistView;
});
