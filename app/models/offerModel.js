/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    var OfferModel = Backbone.Model.extend({
		urlRoot: "/api/offers/",
        defaults: {
            "start_at":null,
            "description":"20% of anything in-store if you show this offer on your phone. Pop in over lunchtime!",
            "creator":"3",
            "activates_at":null,
            "retailer":"XFVT8P",
            "available_online":false,
            "expires_at":null,
            "approval_state":0,
            "suid":"FIH67DQ7LD",
            "offer":{},
            "offer_value":"",
            "final_discount":-1,
            "tags_bundle":{},
            "tier":0,
            "offer_type":-1,
            "max_redemptions":-1,
            "size":"",
            "weekdays":null,
            "disclaimer_url":"",
            "created":"2013-05-09 00:56:32",
            "url":"",
            "colour":"",
            "title":"---------",
            "modified":"2013-05-09 11:52:22",
            "unit_price":-1,
            "end_at":null,
            "redemption_method":"",
            "thumbnail_url":"",
            "final_price":-1,
            "tagset":[],
            "time_bw_redemptions":0,
            "hidden":true,
            "final_saving":0
        }
    });
    return OfferModel;
});
