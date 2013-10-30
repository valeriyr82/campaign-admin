/*global define*/
define([
	'underscore',
	'backbone',
	'models/facetModel'
], function (_, Backbone, FacetModel) {
	'use strict';

	var FacetCollection = Backbone.Collection.extend({
		model: FacetModel,
	});
	return new FacetCollection();
});
