/*global define*/
define([
	'jquery',
	'backbone',
    'backboneRouteFilter',
    'cookie'
], function ($, Backbone, RouteFilter, Cookie) {

	var AppRouter = Backbone.Router.extend({
		routes: {
            "geofence": "geofence",
            "userlist": "userlist",
            "reports": "report",
            "reports/summary": "reportsummary",
            "reports/users": "reportusers",
            "reports/history": "reporthistory",
            "campaigns": "campaign",
            "campaigns?status=:status": "campaign",
            "campaigns/create": "campaigncreate",
            "campaigns/reviewsave": "campaignreviewsave",
            "campaigns/:suid": "campaigndetail",
            "login": "login",
            "logout": "logout",
            "*actions": "defaultRoute"// Backbone will try match the route above first
		},
        before: {
            "*any": "loginFilter",
            "campaigns(?status=:status)": "campaignFilter",
            "campaigns/create": "campaignCreateFilter",
            "campaigns/:suid": "campaignUpdateFilter",
            "reports(/:action)": "reportFilter",
            "userlist(/:action)": "userlistFilter",
            "geofence(/:action)": "geofenceFilter"
        },
        geofenceFilter: function(fragment, args, next) {
            var self = this;
            console.log(" --------- geofenceFilter ----------",fragment, args);
            require(['views/sideGeofenceView'], function(SideGeofenceView) {
                if( self.sideView ) {
                    if(self.sideView.viewName != "SideGeofenceView") {
                        self.sideView.destroy();
                        delete self.sideView;
                    }
                }
                if( !self.sideView ) {
                    var sideView = new SideGeofenceView({
                        viewMode: 'list'
                    });
                    self.sideView = sideView;
                }
                next();
            });
        },
        userlistFilter: function(fragment, args, next) {
            var self = this;
            console.log(" --------- userlistFilter ----------",fragment, args);
            require(['views/sideUserlistView'], function(SideUserlistView) {
                if( self.sideView ) {
                    if(self.sideView.viewName != "SideUserlistView") {
                        self.sideView.destroy();
                        delete self.sideView;
                    }
                }
                if( !self.sideView ) {
                    var sideView = new SideUserlistView({
                        viewMode: 'list'
                    });
                    self.sideView = sideView;
                }
                next();
            });
        },
        reportFilter: function(fragment, args, next) {
            var self = this;
            console.log(" --------- reportFilter ----------",fragment, args);
            require(['views/sideReportView'], function(SideReportView) {
                if( self.sideView ) {
                    if(self.sideView.viewName != "SideReportView") {
                        self.sideView.destroy();
                        delete self.sideView;
                    }
                }
                if( !self.sideView ) {
                    var sideView = new SideReportView({
                        viewMode: 'list'
                    });
                    self.sideView = sideView;
                }
                next();
            });
        },
        campaignFilter: function(fragment, args, next) {
            var self = this;
            console.log(" --------- campaignFilter ----------",fragment, args);
            require(['views/sideCampaignView'], function(SideCampaignView) {
                if( self.sideView ) {
                    if(self.sideView.viewName != "SideCampaignView") {
                        self.sideView.destroy();
                        delete self.sideView;
                    }
                }
                if( !self.sideView ) {
                    var sideView = new SideCampaignView({
                        viewMode: 'list'
                    });
                    self.sideView = sideView;
                }
                next();
            });
        },
        campaignCreateFilter: function(fragment, args, next) {
            console.log(" --------- campaignCreateFilter ----------",fragment, args);
            require(['views/sideCampaignView'], function(SideCampaignView) {
                if( self.sideView ) {
                    if(self.sideView.viewName != "SideCampaignView") {
                        self.sideView.destroy();
                        delete self.sideView;
                    }
                }
                if( !self.sideView ) {
                    var sideView = new SideCampaignView({
                        viewMode: 'list'
                    });
                    self.sideView = sideView;
                }
                next();
            });
        },
        campaignUpdateFilter: function(fragment, args, next) {
            if(args && args.length > 0) {
                console.log(" --------- campaignUpdateFilter ----------",fragment, args);
                require(['views/sideCampaignView'], function(SideCampaignView) {
                    if( self.sideView ) {
                        if(self.sideView.viewName != "SideCampaignView") {
                            self.sideView.destroy();
                            delete self.sideView;
                        }
                    }
                    if( !self.sideView ) {
                        var sideView = new SideCampaignView({
                            viewMode: 'list'
                        });
                        self.sideView = sideView;
                    }
                    next();
                });
            } else {
                next();
            }
        },
        loginFilter: function(fragment, args, next) {
            var self = this;
            if( self.previousView ) {
                self.previousView.destroy();
                delete self.previousView;
            }
            if(fragment != "login" && fragment != "logout") {
                if (streethawkAPI.isAuth()) {
                    if (!self.layoutMain) {
                        require(['views/layoutMain'], function(LayoutMain) {
                            self.layoutMain = new LayoutMain();
                            next();
                        });
                    }else {
                        next();
                    }
                } else {
                    window.app_router.navigate("login", {trigger : true});
                }
            } else {
                if( self.layoutMain ) {
                    self.layoutMain.destroy();
                    delete self.layoutMain;
                }
                next();
            }
        }
	});

    var initialize = function(){
        window.app_router = new AppRouter;
        /*window.app_router.route(/^search\/(.*)?/, "search", function(){
            console.log(' ------------------    search callback    -------------');
        });
        window.app_router.on('route:search', function() {
            console.log(' ------------------    search rout     -------------');
        });*/
        window.app_router.on('route:login', function() {
            var self = this;
            require(['views/loginView'], function(LoginView) {
                var loginView = new LoginView();
                self.previousView = loginView;
            });
        });
        window.app_router.on('route:logout', function() {
			var self = this;
			streethawkAPI.logout();
			Backbone.history.navigate("login", true);
		});
        window.app_router.on('route:geofence', function () {
            var self = this;
            require(['views/geofenceView'], function(GeofenceView) {
                var geofenceView = new GeofenceView();
                self.previousView = geofenceView;
            });
        });
        window.app_router.on('route:userlist', function () {
            var self = this;
            require(['views/userlistView'], function(UserlistView) {
                var userlistView = new UserlistView();
                self.previousView = userlistView;
            });
        });
        window.app_router.on('route:report', function (status) {
            var self = this;
            require(['views/layoutMain','views/reportView'], function(LayoutMain, ReportView) {
                var reportView = new ReportView({
                    viewMode: status
                });
                self.previousView = reportView;
            });
        });
        window.app_router.on('route:report', function () {
            var self = this;
            require(['views/reportView'], function(ReportView) {
                var reportView = new ReportView();
                self.previousView = reportView;
            });
        });
        window.app_router.on('route:reportsummary', function () {
            var self = this;
            require(['views/reportSummaryView'], function(ReportView) {
                var reportView = new ReportView();
                self.previousView = reportView;
            });
        });
        window.app_router.on('route:reportusers', function () {
            var self = this;
            require(['views/reportUsersView'], function(ReportView) {
                var reportView = new ReportView();
                self.previousView = reportView;
            });
        });
        window.app_router.on('route:reporthistory', function () {
            var self = this;
            require(['views/reportHistoryView'], function(ReportView) {
                var reportView = new ReportView();
                self.previousView = reportView;
            });
        });
        window.app_router.on('route:campaign', function (status) {
            var self = this;
            require(['views/layoutMain','views/campaignView','models/campaignModel'], function(LayoutMain, CampaignView,CampaignModel) {
                var campaignView = new CampaignView({
                    SetupModel:CampaignModel,
                    viewMode: status
                });
                self.previousView = campaignView;
            });
        });
        window.app_router.on('route:campaigncreate', function () {
			var self = this;
            require(['views/layoutMain','views/createCampaignView', 'collections/shopCollection', 'collections/userCollection'], function(LayoutMain, CreateCampaignView, ShopCollection, UserCollection) {
                var shopsCollection = new ShopCollection();
                var usersCollection = new UserCollection();

                shopsCollection.fetch();
                usersCollection.fetch();

                var createCampaignView = new CreateCampaignView({
                    shopsCollection : shopsCollection,
                    usersCollection : usersCollection
                });
                self.previousView = createCampaignView;
            });
		});
        window.app_router.on('route:campaignreviewsave', function(){
            var self = this;
            require(['views/layoutMain','views/campaignReviewsaveView'],
                function(LayoutMain, CampaignReviewsaveView) {
                    var campaignDetailView = new CampaignReviewsaveView();
                    self.previousView = campaignDetailView;
                }
            );
        });
        window.app_router.on('route:campaigndetail', function (suid) {
            require(['views/layoutMain','views/campaignDetailView','models/campaignModel','models/offerModel', 'collections/shopCollection', 'collections/userCollection'],
                function(LayoutMain, CampaignDetailView, CampaignModel, OfferModel, ShopCollection, UserCollection) {
                    var campaignModel = new CampaignModel({id: suid});
                    var offerModel = new OfferModel();
                    var shopsCollection = new ShopCollection();
                    var usersCollection = new UserCollection();
                    campaignModel.fetch();
                    shopsCollection.fetch();
                    usersCollection.fetch();
                    var campaignDetailView = new CampaignDetailView({
                        model: campaignModel,
                        offerModel : offerModel,
                        shopsCollection : shopsCollection,
                        usersCollection : usersCollection
                    });
                    self.previousView = campaignDetailView;
                }
            );
        });

        window.app_router.on('route:defaultRoute', function (actions) {
            var self = this;
            if (streethawkAPI.isAuth()) {
                window.app_router.navigate("campaigns", {trigger : true});
            } else {
                window.app_router.navigate("login", {trigger : true});
            }
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
