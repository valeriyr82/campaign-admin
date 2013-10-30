/*global define*/
define([
	'underscore',
	'backbone',
	'models/campaignModel'
], function (_, Backbone, CampaignModel) {
	'use strict';

	var CampaignCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model : CampaignModel,
        init: function(param) {
            this.status = param;
        },
		url   : "/api/campaigns",
        searchCondition: {

        },
        doSearch: function() {
            
        },
        getByID: function(_id) {
            return this.filter(function(campaign){
                return campaign.get('suid') == _id;
            });
        }
	});
	return CampaignCollection;
});
