/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    var StoryModel = Backbone.Model.extend({
        defaults: {
            __id__: "",
            __type__: "",
            auth_rank: 0,
            
            byline: "",
            date: "",
            excerpt: "",
            external_id: "",
            headline: "",
            language: "",
            location: "",
            locations: [ ],
            organizations: [ ],
            people: [ ],
            permalink: "",
            photos: [ ],
            pub_type: "",
            publication: {
                Status: "",
                City: "",
                Code: "",
                Name: "",
                Country: "",
                State_Province: "",
                linkback: "",
                __id__: "",
                content_type: "",
                NewstexID: "",
                ID: "" 
            },
            publisher: {
                Status: "",
                City: "",
                Code: "",
                Name: "",
                Country: "",
                State_Province: "",
                linkback: "",
                __id__: "",
                NewstexID: "",
                ID: "" 
            },
            received_at: "",
            source: "",
            status: "",
            subheadline: "",
            thumb_aspect_ratio: "",
            thumb_url: "",
            version: 1
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
    return StoryModel;
});
