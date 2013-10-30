define([
    'jquery',
    'socketio',
    'cookie'
], function ($, io, Cookie) {
    'use strict';
    /*WEB_SOCKET_SWF_LOCATION = "public/static/WebSocketMain.swf";
    WEB_SOCKET_DEBUG = true;*/
    var StreethawkAPI = function () {

    };
	StreethawkAPI.prototype.logout = function(callbacks){
        eraseCookie('isauth');
		$.ajax({
			type: 'GET',
			url: '/api/logout',
			crossDomain: true,
			dataType: 'json',
			async: false,
			success: function(responseData, textStatus, jqXHR) {
				console.log('POST success.',responseData);

			},
			error: function (responseData, textStatus, errorThrown) {

			},
			complete: function(responseData) {
				console.log('POST complete.',responseData);
			}
		});
		return true;
	}
	StreethawkAPI.prototype.doAuth = function(email, password, callbacks){
        // Send our authentication
		var result = -1;
		$.ajax({
			type: 'GET',
			url: '/api/auth/'+email+'/'+password+'/email',
			crossDomain: true,
//			data: {email : "ericz@streethawk.com", password: "zcire123", login_type: "email"},
			dataType: 'json',
			success: function(responseData, textStatus, jqXHR) {
				//var value = responseData.someKey;
				console.log('POST success.',responseData);
				result = responseData.code;
				if(responseData.code == 0) {
                    createCookie('isauth', 'true', 1);
                    callbacks.success();
                }
			},
			error: function (responseData, textStatus, errorThrown) {
				//alert('POST failed.');
				callbacks.failure();
			},
			complete: function(responseData) {
				console.log('POST complete.',responseData);
			}
		});
    };
	var myJsonMethod = function( param ) {
		console.log("myJsonMethod : ", param);
	}
	StreethawkAPI.prototype.isAuth = function(callback){
		var result = false;
        var strIsAuth = readCookie('isauth');
        if(strIsAuth == 'true') {
            return true;
        } else {
            return false;
        }
        /*
		$.ajax({
			type: 'GET',
			url: '/api/isauth',
			crossDomain: true,
			dataType: 'json',
			async: false,
			success: function(responseData, textStatus, jqXHR) {

				console.log('GET success.', responseData);
				result = responseData.code == 0 ? true : false;
			},
			error: function (responseData, textStatus, errorThrown) {
				console.log('GET failed.', responseData);
				result = false;
			},
			complete: function(responseData) {
				console.log('GET complete.', responseData);
			}
		});
		*/
		return result;
    };
	StreethawkAPI.prototype.getCampaigns = function(callback){
		var result = false;
		$.ajax({
			type: 'GET',
			url: '/api/campaigns',
			crossDomain: true,
			data: {method : "IsAuth"},
			dataType: 'json',
			success: function(responseData, textStatus, jqXHR) {
				console.log('GET success.', responseData);
				result = responseData.code == 0 ? true : false;
			},
			error: function (responseData, textStatus, errorThrown) {
				console.log('GET failed.', responseData);
				result = false;
			},
			complete: function(responseData) {
				console.log('GET complete.', responseData);
			}
		});
	};
	StreethawkAPI.prototype.deleteCampaigns = function(callbacks, data){
		var result = false;
		$.ajax({
			type: 'POST',
			url: '/api/deletecampaigns',
			data: JSON.stringify(data),
            headers: {'Content-Type' : 'application/json; charset=utf-8'},
            dataType: 'json',
            beforeSend: function() {

            },
			success: function(responseData, textStatus, jqXHR) {
				console.log('deletecampaigns GET success.', responseData);
				if(responseData == "OK")
					callbacks.success();
				else
					callbacks.failure();
			},
			error: function (responseData, textStatus, errorThrown) {
				console.log('deletecampaigns GET failed.', responseData);
				callbacks.failure();
			},
			complete: function(responseData) {
				console.log('deletecampaigns GET complete.', responseData);
			}
		});
    };
	StreethawkAPI.prototype.getFacet = function(callback){
        
    };
	StreethawkAPI.prototype.getStory = function(callback){
        
    };
	StreethawkAPI.prototype.getStoryContent = function(callback){
        
    };
	StreethawkAPI.prototype.getUser = function(callback){
        
    };
	StreethawkAPI.prototype.setUser = function(callback){
        
    };
	StreethawkAPI.prototype.createSearchAlert = function(callback){
        
    };
	StreethawkAPI.prototype.getSearchAlert = function(callback){
        
    };
	StreethawkAPI.prototype.setSearchAlert = function(callback){
        
    };
	StreethawkAPI.prototype.createCookie = function (name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

	StreethawkAPI.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

	StreethawkAPI.prototype.eraseCookie = function (name) {
        createCookie(name,"",-1);
    }
    return StreethawkAPI;
});
