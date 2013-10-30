/*global define*/
define([
	'underscore',
	'backbone',
	'models/userModel'
], function (_, Backbone, UserModel) {
	'use strict';

	var UserCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model : UserModel,
		url   : "/api/users",
        doSearch: function() {
            
        }
	});
	return UserCollection;
});
