/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/campaignModel',
    'views/componentView',
	'text!templates/campaign_create.html',
    'text!templates/filter_components.html'
], function ($, _, Backbone, CampaignModel, ComponentView, campaignCreateTemplate, filterComponentTemplate) {
	'use strict';

	var CreateCampaignView = Backbone.View.extend({
        el: '.content',
		template: _.template(campaignCreateTemplate),
        templateFilterComponent: _.template(filterComponentTemplate),
        templateParam: {},
        componentList: [],
        events: {
			'click input.create': "evtCreate"
		},
		initialize: function () {
            //this.options.shopsCollection.bind('reset', this.render, this);
			//this.options.usersCollection.bind('reset', this.render, this);

            this.model = new CampaignModel();

            console.log("Campaign Create View initialize", this.model);
            this.render();
		},
		render: function () {
            var self = this;
            console.log("Campaign Detail View Render");
            self.templateParam.shops = self.options.shopsCollection.toJSON();
			self.templateParam.users = self.options.usersCollection.toJSON();
            self.templateParam.geofence_radius_list = GEOFENCE_RADIUS_LIST;
			self.$el.html(self.template(self.templateParam));

			$('#id_min_age_val').slider().on('slide', function(ev){
				self.$el.find('.min_age_lbl').text(ev.value);
			});
			$('#id_max_age_val').slider().on('slide', function(ev){
				self.$el.find('.max_age_lbl').text(ev.value);
			});

			$('.activates_at').datetimepicker({format: 'yyyy-MM-dd hh:mm', pickSeconds: false});
			$('.expires_at').datetimepicker({format: 'yyyy-MM-dd hh:mm', pickSeconds: false});
			$('.start_at').datetimepicker({format: 'hh:mm', pickDate: false, pickSeconds: false});
			$('.end_at').datetimepicker({format: 'hh:mm', pickDate: false, pickSeconds: false});

            $( "#id_filterbox" ).droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                drop: function( event, ui ) {
                    $( this ).find( ".placeholder" ).remove();
                    var view = new ComponentView({type: ui.draggable.attr("id"), shopsCollection: self.options.shopsCollection, usersCollection: self.options.usersCollection, parent: self});
                    self.componentList.push(view);
                    $( view.render().el ).prependTo(this);
                    //$(this).append(self.templateFilterComponent({comid: ui.draggable.attr("id")}));
                }
            }).sortable({
                    items: "div.alert",
                    sort: function() {
                        // gets added unintentionally by droppable interacting with sortable
                        // ussing connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
                        $( this ).removeClass( "ui-state-default" );
                    }
                });

			return this;
		},
        removeComponentView: function(component) {
            var self = this;
            var idxToRemove = -1;
            for ( var i = 0; i < self.componentList.length; i++ ) {
                if(self.componentList[i] == component) {
                    delete self.componentList[i];
                    idxToRemove = i;
                    break;
                }
            }
            if ( idxToRemove > -1) {
                self.componentList = self.componentList.splice(idxToRemove, 1);
            }
        },
		evtCreate: function() {
            var weekdays = "";
            this.$el.find(".weekdays_group input").each(function(idx, obj){
                if ($(obj).is(":checked")) {
                    weekdays += "," + $(obj).val();
                }
            });
            if(weekdays.length > 0){
                weekdays = weekdays.substring(1);
            }
            //if(this.FormValidationCheck()) {
                this.model.set({
                    retailer: 'XFVT8P',
                    title: this.$el.find('#id_campaign_title').val(),
                    status: this.$el.find('#id_enable button').hasClass("btn-warning")?0:1,
                    cuid: '',
                    description: '',
                    activates_at: this.$el.find('#id_activates_at').val(),
                    expires_at: this.$el.find('#id_expires_at').val(),
                    start_at: this.$el.find('#id_start_at').val(),
                    end_at: this.$el.find('#id_end_at').val(),
                    weekdays: weekdays,
                    priority: this.$el.find('#id_priority').val(),
                    target_gender: this.$el.find('#id_target_gender').val(),
                    geofence_radius: this.$el.find('#id_geofence_radius').val(),
                    min_age: parseInt(this.$el.find('#id_min_age_val').val()),
                    max_age: parseInt(this.$el.find('#id_max_age_val').val()),
                    faved_category:  this.$el.find('#id_faved_category').val(),
                    userlist : this.$el.find('#id_userlist').val(),

                    data: this.$el.find("#id_data").val(),
                    shops: this.$el.find('#id_shops').val() == null ? "" : this.$el.find('#id_shops').val().join(','),

                    ios_template: this.$el.find('#id_ios_template').val()
                });
                if(this.$el.find("#id_offer_title").val().trim() != "") {
                    this.model.set({
                        'offer-title': this.$el.find("#id_offer_title").val().trim(),
                        'offer-description': this.$el.find("#id_offer_description").val()
                    })
                }
                this.model.save({}, {
                    success: function(model, response) {
                        if(response.code == 0) {
                            alert("You've created a new campaign successfully.");
                        } else {
                            var errMsg = '';
                            _.each(response.value.errors, function(errorMsgs, errorField){
                                if(errorMsgs.length > 0) {
                                    errMsg += errorField + " - " + errorMsgs[0]+"\n";
                                }
                            });

                            _.each(response.value.offer_form_errors, function(errorMsgs, errorField){
                                if(errorMsgs.length > 0) {
                                    errMsg += "offer " + errorField + " - " + errorMsgs[0]+"\n";
                                }
                            });

                            errMsg = " --- Errors --- \n" + errMsg;
                            alert(errMsg);
                        }

                    }
                });
            //}
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

	return CreateCampaignView;
});
