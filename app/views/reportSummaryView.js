function makeStackedChart(data_array, div) {
    var colors = d3.scale.category20();
    keyColor = function(d, i) {return colors(d.key)};
    var chart;
    nv.addGraph(function() {
        chart = nv.models.stackedAreaChart()
            // .width(600).height(500)
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .color(keyColor)
            .transitionDuration(300);
        //.clipEdge(true);

        chart.xAxis
            .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

        chart.yAxis
            .tickFormat(d3.format(',.2f'));

        d3.select(div)
            .datum(data_array)
            .transition().duration(0)
            .call(chart);

        //  nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
    });
}

function makePie(data, div) {
    nv.addGraph(function() {
        var width = 250,
            height = 250;

        var chart = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
            .color(d3.scale.category10().range())
            .width(width)
            .height(height);

        d3.select(div)
            .datum(data)
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);

        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
    });
}

function makeBarChart(data, div) {
    nv.addGraph(function() {
        var width = 250,
            height = 250;
        var chart = nv.models.discreteBarChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .staggerLabels(true)
                //.staggerLabels(historicalBarChart[0].values.length > 8)
                .tooltips(false)
                .showValues(true)
                .transitionDuration(250)
            ;

        //chart.xAxis
        //    .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
        d3.select(div)
            .datum([{key: "Installs History" , "values":data}])
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


/*global define*/
define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'text!templates/report_summary.html',
//    'collections/reportCollection',
//	'text!templates/report_row.html',
], function ($, jqueryui, _, Backbone,  reportSummaryTemplate) { // later ReportCollection, reportRowTemplate,
    'use strict';
    var locationpiedata = [];
    var pushpiedata = [];
    var genderpiedata = [];
    var stats_barchart0 = []
    var  total_users, new_users, total_actives, total_sessions, total_shares, rate_stats
    var stats_chart0 = [];
    var stats_chart1 = [];
    var stats_chart2 = [];
    var stacked_chart_array = [];
    var ReportView = Backbone.View.extend({
        //el: 'id_reports_static',
        el: '.content',
        template: _.template(reportSummaryTemplate),
        events: {
        },
        initialize: function () {
            //this.collection = new ReportCollection();
            //this.collection.on('change', this.render, this);
            //this.collection.bind('reset', this.render, this);
            //this.collection.fetch({ data: { status: this.options.viewMode} });

            //this.collection.bind('remove', this.render, this);

            //console.log("Report View initialize", this.collection);
            locationpiedata = [
                {
                    key: "Location denied",
                    y: stats[stats.length-1]['installlocationdenied']
                },
                {
                    key: "Location Allowed",
                    y: Math.abs(stats[stats.length-1]['installstotal'] - stats[stats.length-1]['installlocationdenied'])
                },
            ];

            pushpiedata= [
                {
                    key: "Push denied",
                    y: stats[stats.length-1]['installpushdenied']
                },
                {
                    key: "Push Allowed",
                    y: Math.abs(stats[stats.length-1]['installstotal'] - stats[stats.length-1]['installpushdenied'])
                },
            ];

            genderpiedata= [
                {
                    key: "Male",
                    y: stats[stats.length-1]['gendercountm']
                },
                {
                    key: "Female",
                    y: stats[stats.length-1]['gendercountf']
                },
                {
                    key: "Unregistered/Unknown",
                    y: stats[stats.length-1]['gendercountu']
                },
            ];
            var count = 0
            total_sessions = 0
            for (var i = stats.length-1; i > 0;  i--) {
                total_sessions += parseInt(stats[stats.length-1]['appforegroundstoday']);
                var pointDate = new Date(stats[i]['date']).getTime();
                if (i%7 == 0) {
                    stats_barchart0.push({"label":"Week Ending "+stats[i]['date'], "value":count});
                    count = 0;
                }
                else {
                    count += parseInt(stats[i]['installstoday']);
                }
            }
		total_users = stats[stats.length-1]['installstotal'];
		new_users = stats[stats.length-1]['installslast30'];
		total_actives= stats[stats.length-1]['uniqueforegroundslast30'];
		total_shares = stats[stats.length-1]['sharestotal'];
		rate_stats= stats[stats.length-1]['ratepromptdismiss']+"|"+stats[stats.length-1]['ratelater']+"|"+stats[stats.length-1]['rateclickthru'];
            var chart_selector = ['installslast30', 'appforegroundstoday', 'registrationslast30'];
            for (var i = 0; i < stats.length; i++) {
                var pointDate = new Date(stats[i]['date']).getTime();
                stats_chart0.push([pointDate, parseInt(stats[i][chart_selector[0]])]);
                stats_chart1.push([pointDate, parseInt(stats[i][chart_selector[1]])]);
                stats_chart2.push([pointDate, parseInt(stats[i][chart_selector[2]])]);
            }
            stacked_chart_array = [
                {"key":chart_selector[0],"values": stats_chart0},
                {"key":chart_selector[1],"values": stats_chart1},
                {"key":chart_selector[2],"values": stats_chart2},
            ];
            console.log("Report View initialize");
            this.render();
        },

        render: function () {
            var self = this;
            makeBarChart(stats_barchart0,"#barchart1 svg");
            console.log("Report View Render");
            self.$el.html(self.template());
            self.$el.find('#id_total_users').text(total_users);
            self.$el.find('#id_new_users').text(new_users);
		self.$el.find('#id_total_actives').text(total_actives);
		self.$el.find('#id_total_sessions').text(total_sessions);
		self.$el.find('#id_total_shares').text(total_shares);
		self.$el.find('#id_rate_stats').text(rate_stats);

            return this;
        },
        destroy: function() {
            //COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
            this.$el.removeData().unbind();

            //Remove view from DOM
            this.$el.html('');
        }
    });

    return ReportView;
});
