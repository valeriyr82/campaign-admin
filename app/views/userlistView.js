/*global define*/
define([
	'jquery',
    'jqueryui',
	'underscore',
	'backbone',
    'collections/userCollection',
	'text!templates/userlist.html',
    'text!templates/userlist_row.html'
], function ($, jqueryui, _, Backbone, UserCollection, userlistTemplate, userlistRowTemplate) {
	'use strict';

	var UserlistView = Backbone.View.extend({
        el: '.content',
		template: _.template(userlistTemplate),
		templateRow: _.template(userlistRowTemplate),
        events: {
			"click a.delete": "evtDeleteUserlist"
		},
		initialize: function () {
            this.collection = new UserCollection();
            //this.collection.on('change', this.render, this);
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            //this.collection.bind('reset', this.render, this);
            this.collection.fetch();

            //this.collection.bind('remove', this.render, this);

            console.log("Userlist View initialize", this.collection);
            this.render();
		},

		render: function () {
            var self = this;
            console.log("Campaign View Render");
			self.$el.html(self.template());

            _(self.collection.models).each(function(user){
				self.$el.find("#tbl_userlist tbody").append(self.templateRow(user.toJSON()));
            });
			return this;
		},
		evtDeleteUserlist: function() {
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
            this.collection.off( null, null, this );
            this.off();
			this.undelegateEvents();
			this.$el.removeData().unbind();

			//Remove view from DOM
			this.$el.html('');
		}
	});

	return UserlistView;
});
