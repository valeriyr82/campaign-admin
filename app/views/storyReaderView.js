/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
    'collections/storyCollection',
	'text!templates/storySummary.html'
], function ($, _, Backbone, StoryCollection, storySummaryTemplate) {
	'use strict';

	var StoryReaderView = Backbone.View.extend({
        
		template: _.template(storySummaryTemplate),
        events: {
			
		},
        /**
		 * @constructor
		 * The StoryReaderView listens for changes to its model, re-rendering. Since there's
		 * a one-to-one correspondence between a **Story** and a **StoryReaderView** therefore we 
		 * set a direct reference on the model for convenience.
		 */
		initialize: function () {
            this.collection = new StoryCollection();
            console.log("Story Reader View initialize", this.collection);
		},

		render: function () {
            var self = this;
            console.log("Story Reader View Render");
            _(this.collection.models).each(function(story){
			    self.$el.append(this.template(story.toJSON()));
            });
			return this;
		},

		clear: function () {
			this.model.destroy();
		}
	});

	return new Sto ryReaderView();
});
