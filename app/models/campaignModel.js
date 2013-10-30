/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    var CampaignModel = Backbone.Model.extend({
		urlRoot: '/api/campaigns/',
        defaults: {
			suid: -1,
			start_at: null,
			description: "",
			creator: "2",
			retailer: "XFVT8P",
			expires_at: "2013-06-03 15:48:00",
			weekdays: null,
			offer: "7TM5LBOQ0T",
			geofence_radius: -1,
			cuid: null,
			min_age: -1,
			data: null,
			max_age: -1,
			ios_template: "You have a message for: Campaign: {{campaign.id}}, User: {{user.name}} {% if product %}, Product: {{product.suid}}:{{product.title}}{%endif%}",
			created: "2012-11-14 20:43:14",
			title: "--------------",
			modified: "2013-06-03 05:48:42",
			end_at: null,
			priority: 500,
			faved_category: "",
			activates_at: "2012-11-14 20:43:00",
			target_gender: 0,
			shops: "NLUQKY,WPVT4U"
        },
		getByID : function(id) {
			return this.filter(function(val){
				return val.get("suid") === id;
			});
		}
    });
    return CampaignModel;
});
