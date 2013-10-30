/**
 * @todo Started modal view switching...but did not finish
 * @todo Need to fix ghost views and zombie events
 * @todo Need to POST to server.
 * @todo Ask Jerry about POST for users.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'routers/router'
]
/** @lends dashboard view */
, function($, _, Backbone, Router){
    /**
     * Ajax prefilter  - used to add a base URL to all ajax requests.
     * @function
     */

    // $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    // 	//"http://cloud-daostaging.next.att.com/api/" +
    //   options.url = "http://cloud-daostaging.next.att.com/api/" + options.url;
    //   options.crossDomain = true;
    // });

    /**
     * Form serialize  - method is used to serialize a form using ID for each input and return JSON.
     * @function
     */
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.id] !== undefined) {
                if (!o[this.id].push) {
                    o[this.id] = [o[this.id]];
                }
                o[this.id].push(this.value || '');
            } else {
                o[this.id] = this.value || '';
            }
        });
        return o;
    };

    var initialize = function(){
        /**
         * Create and initialize router object. Pass in our Router module and call it's initialize function
         * @function initialize
         * @name initialize
         */
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});