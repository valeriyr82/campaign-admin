/*global define*/
define([
	'jquery',
    'jqueryui',
	'underscore',
	'backbone',
    'collections/campaignCollection',
	'text!templates/campaign.html',
	'text!templates/campaign_row.html',
    'text!templates/filter_components.html'
], function ($, jqueryui, _, Backbone, CampaignCollection, campaignTemplate, campaignRowTemplate, filterComponentTemplate) {
	'use strict';

	var CampaignView = Backbone.View.extend({
        el: '.content',
		template: _.template(campaignTemplate),
		templateRow: _.template(campaignRowTemplate),
        templateFilterComponent: _.template(filterComponentTemplate),
        events: {
			"click a.delete": "evtDeleteCampaigns"
		},
		initialize: function () {
            this.collection = new CampaignCollection();
            //this.collection.on('change', this.render, this);
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            //this.collection.bind('reset', this.render, this);
            this.collection.fetch({ data: { status: this.options.viewMode} });

            //this.collection.bind('remove', this.render, this);

            console.log("Campaign View initialize", this.collection);
            this.render();
		},

		render: function () {
            var self = this;
            console.log("Campaign View Render");
			self.$el.html(self.template());

            _(self.collection.models).each(function(campaign){
				if(campaign.get('userlist')) {
					campaign.set('targets', campaign.get('userlist')['name']);
				} else {
					if (campaign.get('target_gender') == 1) {
						campaign.set('targets', "Female");
					} else if (campaign.get('target_gender') == 2) {
						campaign.set('targets', "Mail");
					} else {
						campaign.set('targets', "Anybody");
					}
				}
				self.$el.find("#tbl_campaigns tbody").append(self.templateRow(campaign.toJSON()));
            });

            $( "#id_filterbox" ).droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                drop: function( event, ui ) {
                    this.subview.setElement(this.$('.subview')).render();
                    $(this).html(self.templateFilterComponent({comid: ui.draggable.attr("id")}));
                }
            }).sortable({
                items: "li:not(.placeholder)",
                sort: function() {
                    $( this ).removeClass( "ui-state-default" );
                }
            });
			return this;
		},
		evtDeleteCampaigns: function() {
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

	return CampaignView;
});
