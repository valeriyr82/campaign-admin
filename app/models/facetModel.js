/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    var FacetModel = Backbone.Model.extend({
        defaults: {
            __id__: "organizations/Google",
            __type__: "FacetValue",
            count: 29244,
            code: "Google",
            name: "Google",
            facet: "organizations",
            keywords: "GOOGLE" 
        },
        initialize: function() {
            if (!this.get("content")) {
                this.set({"content": this.defaults.content});
            }
        },
        toggle: function() {
            this.save({done: !this.get("done")});
        },
        clear: function() {
            this.destroy();
            this.view.remove();
        }
    });
    return FacetModel;
});
