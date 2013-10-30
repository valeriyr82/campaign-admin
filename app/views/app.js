/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/campaignCollection',
	'views/campaignView',
    'views/loginView'
], function ($, _, Backbone, CampaignCollection, CampaignView, LoginView) {
	'use strict';

	var AppView = Backbone.View.extend({
		/**
		 * Instead of generating a new element, bind to the existing skeleton of
		 * Delegated events for creating new items, and clearing completed ones.
		 */
		el: '#outlet',
		events: {
			
		},
		/**
		 * At initialization we bind to the relevant events on the `StoryCollection`
		 * collection, when items are added or changed. 
		 */
		initialize: function () {
			console.log("APP view initialize");
            this.render();
		},
		render: function () {
            if( streethawkAPI.isAuth() ) {
                this.$el.html(CampaignView.render());
            } else {
                this.$el.html(LoginView.render());
            }
            return this;
		},
		addOne: function () {
			
		},
		addAll: function () {

		}
	});
	return AppView;
});
