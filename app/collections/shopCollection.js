/*global define*/
define([
	'underscore',
	'backbone',
	'models/shopModel'
], function (_, Backbone, ShopModel) {
	'use strict';

	var ShopCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model : ShopModel,
		url   : "/api/shops",
        doSearch: function() {
            
        }
	});
	return ShopCollection;
});
