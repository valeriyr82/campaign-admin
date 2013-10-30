/*global define*/
define([
	'jquery',
    'jqueryui',
	'underscore',
	'backbone',
    'collections/campaignCollection',
	'text!templates/layout_main.html'
], function ($, jqueryui, _, Backbone, CampaignCollection, layoutTemplate) {
	'use strict';

	var LayoutMain = Backbone.View.extend({
        el: '#outlet',
		template: _.template(layoutTemplate),
        events: {
			'click #id_filter_custom': "evtNavigate"
		},
		initialize: function () {
            this.render();
		},

		render: function () {
            var self = this;
            self.$el.html(self.template());
            /*
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
            */
            //this.othersubview.setElement(this.$('.othersubview')).render();
			return this;
		},
        evtNavigate: function() {

            //window.app_router.navigate("help/troubleshooting", {trigger: true});
        },
		destroy: function() {
			//COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();
			//Remove view from DOM
			this.$el.html('');
		}
	});

	return LayoutMain;
});
