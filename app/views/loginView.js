/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
    'text!templates/loginForm.html'
], function ($, _, Backbone, LoginFormTemplate) {
	'use strict';

	var LoginView = Backbone.View.extend({
        el: '#outlet',
		template: _.template(LoginFormTemplate),
		events: {
			"click #login": "login"
		},
		initialize: function () {
            var self = this;
            console.log("Login Form initialize");
            self.username = '';
            self.password = '';
			self.render();
		},

		render: function () {
            var self = this;
            self.$el.html(this.template());
            return true;
		},
		clear: function () {
			this.model.destroy();
		},
        login: function(){
            this.usernameCtl = $("#username");
            this.passwordCtl = $("#password");
            
            var user= this.usernameCtl.val();
            var pword = this.passwordCtl.val();
			streethawkAPI.doAuth(user, pword,
				{
					success: function() {
						//Backbone.history.navigate('home', true);
                        window.app_router.navigate("campaigns", {trigger: true, replace: true});
					},
					failure: function() {
						alert("user name or password is incorrect.")
						//Backbone.history.navigate('login', true);
					}
				});
			/*streethawkAPI.isAuth({
                    success: function() {
                        Backbone.history.navigate('home', true);
                    },
                    failure: function() {
                        Backbone.history.navigate('login', true);
                    }
                })*/
            return false;
        },
		destroy: function() {
			//COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			//Remove view from DOM
			this.$el.html('');
		}
	});

	return LoginView;
});
