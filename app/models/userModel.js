/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    var UserModel = Backbone.Model.extend({
        defaults: {
			"usernames": ["david.jones@gmail.com", "david@prismism.com"],
			"name": "Inactive Loyalty Members this month",
			"suid": "UKO0F57ON9OA",
			"creator": "3",
			"retailer": "XFVT8P",
			"modified": "2013-06-20 02:16:46",
			"created": "2013-04-11 03:18:01"
        }
    });
    return UserModel;
});
