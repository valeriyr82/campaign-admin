/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/campaignModel',
	'text!templates/campaign_detail.html'
], function ($, _, Backbone, CampaignModel, campaignDetailTemplate) {
	'use strict';

	var CampaignDetailView = Backbone.View.extend({
        el: '.content',
		template: _.template(campaignDetailTemplate),
        templateParam: {},
        events: {
			'change select#id_userlist': "evtUserlistChange",
            'click #id_enable li a': "evtEnabledChange",
			'change #id_min_age_chk': "evtMinAgeCheck",
			'change #id_max_age_chk': "evtMaxAgeCheck",
			'change #id_min_age_val': "evtMinAgeChange",
			'change #id_max_age_val': "evtMaxAgeChange",
			'click input.update': "evtUpdate"
		},
		initialize: function () {
			this.model.on('change', this.updateData, this);

            this.options.shopsCollection.bind('reset', this.render, this);
			this.options.usersCollection.bind('reset', this.render, this);

			this.options.offerModel.on('change', this.render, this);

            console.log("Campaign Detail View initialize", this.model);
            this.render();
		},
        updateData: function() {
            this.options.offerModel.set({id: this.model.get('offer')});
            this.options.offerModel.fetch();
        },
		render: function () {
            var self = this;
            console.log("Campaign Detail View Render");
            self.templateParam.campaign = self.model.toJSON();
            self.templateParam.offer = self.options.offerModel.toJSON();
            self.templateParam.shops = self.options.shopsCollection.toJSON();
			self.templateParam.users = self.options.usersCollection.toJSON();
            self.templateParam.geofence_radius_list = GEOFENCE_RADIUS_LIST;

            if(self.prev_activates_at) {
                if(self.prev_activates_at.data('datetimepicker')) {
                    self.prev_activates_at.data('datetimepicker').destroy();
                    self.prev_expires_at.data('datetimepicker').destroy();
                    self.prev_start_at.data('datetimepicker').destroy();
                    self.prev_end_at.data('datetimepicker').destroy();
                }
            }

			self.$el.html(self.template(self.templateParam));

			$('#id_min_age_val').slider().on('slide', function(ev){
				self.$el.find('.min_age_lbl').text(ev.value);
			});
			$('#id_max_age_val').slider().on('slide', function(ev){
				self.$el.find('.max_age_lbl').text(ev.value);
			});


			self.prev_activates_at = $('.activates_at').datetimepicker({format: 'yyyy-MM-dd hh:mm', pickSeconds: false});
            self.prev_expires_at = $('.expires_at').datetimepicker({format: 'yyyy-MM-dd hh:mm', pickSeconds: false});
            self.prev_start_at = $('.start_at').datetimepicker({format: 'hh:mm', pickDate: false, pickSeconds: false});
            self.prev_end_at = $('.end_at').datetimepicker({format: 'hh:mm', pickDate: false, pickSeconds: false});

			return this;
		},
		evtUserlistChange: function(evt) {
            if(evt.target.selectedIndex == 0) {
                this.$el.find("#campaign_user_mode").removeClass('out').removeClass('hide').addClass('in').addClass('show');
            } else {
                this.$el.find("#campaign_user_mode").removeClass('in').removeClass('show').addClass('out').addClass('hide');
            }
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
		evtUpdate: function() {
			var weekdays = "";
			this.$el.find(".weekdays_group input").each(function(idx, obj){
				if ($(obj).is(":checked")) {
					weekdays += "," + $(obj).val();
				}
			});
			if(weekdays.length > 0){
				weekdays = weekdays.substring(1);
			}
			this.model.set({
				status: this.$el.find('#id_enable button').hasClass("btn-warning")?0:1,
				start_at: this.$el.find('#id_start_at').val(),
				expires_at: this.$el.find('#id_expires_at').val(),
				weekdays: weekdays,
				geofence_radius: this.$el.find('#id_geofence_radius').val(),
				min_age: parseInt(this.$el.find('#id_min_age_val').val()),
				data: this.$el.find("#id_data").val(),
				max_age: parseInt(this.$el.find('#id_max_age_val').val()),
				ios_template: this.$el.find('#id_ios_template').html(),
				end_at: this.$el.find('#id_end_at').val(),
				priority: this.$el.find('#id_priority').val(),
				faved_category:  this.$el.find('#id_faved_category').val(),
				activates_at: this.$el.find('#id_activates_at').val(),
				target_gender: this.$el.find('#id_target_gender').val(),
				shops: this.$el.find('#id_shops').val() == null ? "" : this.$el.find('#id_shops').val().join(',')
			});
			if(this.$el.find('#id_userlist').val() != "") {
				this.model.set({
					userlist : this.$el.find('#id_userlist').val() //{name: this.$el.find('#id_userlist option:selected').text(), suid: this.$el.find('#id_userlist').val()}
				});
			} else {
				this.model.set({
					userlist : ""
				});
			}
			this.options.offerModel.set({
				title: this.$el.find('#id_offer_title').val(),
				description:this.$el.find("#id_offer_description").html(),
				url: this.$el.find('#id_offer_url').val(),
				hidden: this.$el.find('input:radio[name="offer_hidden"]:checked').val(),
				available_online: this.$el.find('input:radio[name="offer_available_online"]:checked').val(),
				thumbnail_url: this.$el.find('#id_offer_thumbnail_url').val(),
				disclaimer_url: this.$el.find('#id_offer_disclaimer_url').val(),
				offer_type: this.$el.find('#id_offer_offer_type').val(),
				offer_value: this.$el.find('#id_offer_offer_value').val()
			});/**/
			this.model.save();
			this.options.offerModel.save();
		},
		clear: function () {
			this.model.destroy();
		},
		destroy: function() {
			//COMPLETELY UNBIND THE VIEW
            var self = this;
            if(self.prev_activates_at) {
                if(self.prev_activates_at.data('datetimepicker')) {
                    self.prev_activates_at.data('datetimepicker').destroy();
                    self.prev_expires_at.data('datetimepicker').destroy();
                    self.prev_start_at.data('datetimepicker').destroy();
                    self.prev_end_at.data('datetimepicker').destroy();
                }
            }

            self.undelegateEvents();
            self.$el.removeData().unbind();

			//Remove view from DOM
            self.$el.html();
		}
	});

	return CampaignDetailView;
});
