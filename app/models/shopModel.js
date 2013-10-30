/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    var ShopModel = Backbone.Model.extend({
        defaults: {
            "phone_number":"4088906372",
            "creator":"3",
            "retailer":"XFVT8P",
            "fax_number":"",
            "tz_offset":0,
            "suid":"VQ9A5Y",
            "cuid":"Fake SF Store for Demos",
            "addr_postcode":"94103",
            "addr_country":"United States",
            "created":"2013-02-10 08:01:56",
            "addr_suburb":"San Francisco",
            "addr_floor":0,
            "title":"Sheridan Downtown on Market",
            "modified":"2013-06-14 09:01:03",
            "longitude":-122.408166,
            "email":"",
            "url":"",
            "latitude":37.783706,
            "addr_state":"CA",
            "addr_street2":"",
            "addr_street1":"863 Market St"
        }
    });
    return ShopModel;
});
