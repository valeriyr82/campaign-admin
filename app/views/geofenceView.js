/*global define*/
define([
	'jquery',
    'jqueryui',
	'underscore',
	'backbone',
    'collections/shopCollection',
	'text!templates/geofence.html',
	'text!templates/geofence_row.html'
], function ($, jqueryui, _, Backbone, ShopCollection, geofenceTemplate, geofenceRowTemplate) {
	'use strict';

	var GeofenceView = Backbone.View.extend({
        el: '.content',
		template: _.template(geofenceTemplate),
		templateRow: _.template(geofenceRowTemplate),
        events: {
			"click a.delete": "evtDeleteGeofences"
		},
		initialize: function () {
            this.collection = new ShopCollection();
            //this.collection.on('change', this.render, this);
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            //this.collection.bind('reset', this.render, this);
            this.collection.fetch();

            //this.collection.bind('remove', this.render, this);

            console.log("Geofence View initialize", this.collection);
            this.render();
		},

		render: function () {
            var self = this;
            console.log("Campaign View Render");
			self.$el.html(self.template());

            _(self.collection.models).each(function(shop){
				self.$el.find("#tbl_geofence tbody").append(self.templateRow(shop.toJSON()));
            });

			return this;
		},
        evtDeleteGeofences: function() {
			var self = this;
			var campaignArr = {suids: '', cuids: ''};
			var selectedCampains = [];
			var _campaign_id;
			if(confirm("Are you sure you want to delete selected campaigns?")) {
				self.$el.find('input[type="checkbox"]:checked').each(function(idx, obj){
					_campaign_id = $(obj).attr("id");
					selectedCampains.push(_campaign_id);
					campaignArr.suids += ',' + _campaign_id;
					campaignArr.cuids += ',' + self.collection.getByID(_campaign_id)[0].get('cuid');
				});
				if(campaignArr.suids.length > 0) {
					campaignArr.suids = campaignArr.suids.substring(1);
					campaignArr.cuids = campaignArr.cuids.substring(1);
					streethawkAPI.deleteCampaigns({
						success: function(){
							_.each(selectedCampains, function(){
								self.collection.remove(self.collection.getByID(_campaign_id))
							});
							alert("You've removed campaigns successfully.");
						},
						failure: function(){
							alert("You did not remove selected campaigns. Sorry for inconvenient.");
						}}, campaignArr);
				}
			}
		},
		destroy: function() {
			//COMPLETELY UNBIND THE VIEW
            this.off();
            this.collection.off( null, null, this );
			this.undelegateEvents();
			this.$el.removeData().unbind();

			//Remove view from DOM
			this.$el.html('');
		}
	});

	return GeofenceView;
});
