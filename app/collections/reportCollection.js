/*global define*/
define([
	'underscore',
	'backbone',
	//'models/reportModel'
], function (_, Backbone) { // later , ReportModel
	'use strict';

	var ReportCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		// could just mockup a structure here for demo **    model : ReportModel,
        init: function(param) {
            this.status = param;
        },
		url   : "/api/reports",
        searchCondition: {

        },
        doSearch: function() {
            
        },
        getByID: function(_id) {
            return this.filter(function(report){
                return report.get('suid') == _id;
            });
        }
	});
	return ReportCollection;
});
