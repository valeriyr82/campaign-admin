/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/campaignModel',
    'text!templates/filter_components.html'
], function ($, _, Backbone, CampaignModel, filterComponentTemplate) {
	'use strict';

	var ComponentView = Backbone.View.extend({
        tagName: 'div',
        className: 'alert alert-info',
		template: _.template(filterComponentTemplate),
        templateParam: {},
        events: {
			'change select#id_userlist': "evtUserlistChange",
            'click #id_enable li a': "evtEnabledChange",
			'change #id_anniversarylist': "evtAnniversarylistChange",
			'change #id_min_age_chk': "evtMinAgeCheck",
			'change #id_max_age_chk': "evtMaxAgeCheck",
			'change #id_min_age_val': "evtMinAgeChange",
			'change #id_max_age_val': "evtMaxAgeChange",
			'click input.create': "evtCreate",
            //'click #id_filterbox .close': "evtDeleteFilter"
            'click .close': "evtClose"
		},
		initialize: function () {
            switch(this.options.type) {
                case 'id_filter_geofence':

                    break;
                case 'id_filter_birthday':
                    break;
                case 'id_filter_anniverssary':
                    break;
                case 'id_filter_age':
                    break;
                case 'id_filter_gender':
                    break;
                case 'id_filter_faved':
                    break;
                case 'id_filter_userlist':
                    break;
                case 'id_filter_device':
                    break;
                case 'id_filter_version':
                    break;
                case 'id_filter_custom':
                    break;
                default:
            }
            /*this.options.shopsCollection.bind('reset', this.render, this);
			this.options.usersCollection.bind('reset', this.render, this);*/
            this.listenTo(this.options.shopsCollection, 'reset', this.render);
            this.listenTo(this.options.usersCollection, 'reset', this.render);

            this.model = new CampaignModel();

            console.log("Campaign Create View initialize", this.model);
            //this.render();
		},
		render: function () {
            var self = this;
            console.log("Campaign Detail View Render");
            self.templateParam.shops = self.options.shopsCollection.toJSON();
			self.templateParam.users = self.options.usersCollection.toJSON();
            self.templateParam.geofence_radius_list = GEOFENCE_RADIUS_LIST;
            self.templateParam.type = self.options.type;
			self.$el.html(self.template(self.templateParam));
			return this;
		},
        evtClose: function(evt) {
            this.options.parent.removeComponentView(this);
            this.remove();
            this.unbind();
        },
		evtUserlistChange: function(evt) {
            if(evt.target.selectedIndex == 0) {
                this.$el.find("#campaign_user_mode").removeClass('out').addClass('in');
            } else {
                this.$el.find("#campaign_user_mode").removeClass('in').addClass('out');
            }
        },
              evtAnniversarylistChange : function(evt) {
              	//alert("HERE2: "+$(evt.currentTarget[evt.target.selectedIndex]).text());
                this.$el.find("#id_anniversary_selected_text").text("Days since "+$(evt.currentTarget[evt.target.selectedIndex]).text());
        },
		evtEnabledChange: function(evt) {
            this.$el.find("#id_enable button").text($(evt.target).text());
            if($(evt.target).text() == "Enabled") {
                this.$el.find("#id_enable button").removeClass('btn-warning').addClass('btn-success');
            }else{
                this.$el.find("#id_enable button").removeClass('btn-success').addClass('btn-warning');
            }
        },
		evtMinAgeCheck: function(evt) {
			if($(evt.target).is(':checked')) {
				$(evt.target).parent().next().show();
				this.$el.find('.min_age_lbl').text(this.$el.find('#id_min_age_val').val());
			} else {
				$(evt.target).parent().next().hide();
				this.$el.find('.min_age_lbl').text('disabled');
			}
		},
		evtMaxAgeCheck: function(evt) {
			if($(evt.target).is(':checked')) {
				$(evt.target).parent().next().show();
				this.$el.find('.max_age_lbl').text(this.$el.find('#id_max_age_val').val());
			} else {
				$(evt.target).parent().next().hide();
				this.$el.find('.max_age_lbl').text('disabled');
			}
		},
		evtMinAgeChange: function() {
			this.$el.find('.min_age_lbl').text(this.$el.find('#id_min_age_val').val());
		},
		evtMaxAgeChange: function() {
			this.$el.find('.max_age_lbl').text(this.$el.find('#id_max_age_val').val());
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

	return ComponentView;
});
