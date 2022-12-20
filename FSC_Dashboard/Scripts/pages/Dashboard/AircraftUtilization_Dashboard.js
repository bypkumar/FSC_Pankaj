
var applicationUrl;
var date_dd = 'Current Day';
var from = '', to = '';
$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();
    //$("#line_chart_overalotp").hide();

    //AUAircraft_Utilization_chart();
    //line_AicraftUtilization_chart
    //AUFleetWiseBifurcation_chart();
    //AUAircraftTailNoWise_chart();

       
});

$("#tabs")
    .tabs()
    .on("click", '[role="tab"]', function () {
        $(this).closest("ul") // The current UL
    });

function dateRangeChange() {

    $('#TxtToDate').show();
    var range = $("#sltDateRange").val();
    console.log("range", range);

    var fromDate = '', toDate = '';

    if (range == 'Current Day') {
        fromDate = moment().format('DD-MM-YYYY');
        toDate = moment().clone().format('DD-MM-YYYY');
        console.log("fromDate", fromDate);
        console.log("toDate", toDate);
    } else if (range == 'Previous Day') {
        fromDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
        toDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY')
    } else if (range == 'Current Month') {
        fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().endOf('month').format('DD-MM-YYYY')
    } else if (range == 'Previous Month') {
        fromDate = moment().clone().subtract(1, 'months').startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().subtract(1, 'months').endOf('month').format('DD-MM-YYYY')
    } else if (range == 'Current Quarter') {
        fromDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
        toDate = moment().quarter(moment().quarter()).endOf('quarter').format('DD-MM-YYYY');
    } else if (range == 'Previous Quarter') {
        fromDate = moment().subtract(1, 'Q').startOf('quarter').format('DD-MM-YYYY');
        toDate = moment().subtract(1, 'Q').endOf('quarter').format('DD-MM-YYYY');
    } else if (range == 11) {
        fromDate = moment().month(3).startOf('month').format('DD-MM-YYYY');
        toDate = moment().month(2).endOf('month').add('years', 1).format('DD-MM-YYYY');
    } else if (range == 'Custom Date') {
        fromDate = "";
        toDate = "";
        $('#TxtToDate').hide();
    } else if (range == 'Custom Date Range') {
        //fromDate = "01/01/2021";
        //toDate = "31/01/2021";
        fromDate = "";
        toDate = "";
    }
    else {
        fromDate = "";
        toDate = "";
    }

    console.log("fromDate", fromDate);
    console.log("toDate", toDate);

    $("#TxtFromDate").val(fromDate);
    $("#TxtToDate").val(toDate);
}

$("#btnClearDetails").click(function () {

    $("#overlay").show();

    {
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

    }
    $("#overlay").hide();

});

var firstClick = true;
$("#btnShowDetails").click(function () {

    console.log("date wise")
    date_dd = $("#sltDateRange").val();
    if (date_dd == 'Custom Date') {
        from = $("#TxtFromDate").val();
        to = $("#TxtFromDate").val();
    }
    else {
        from = $("#TxtFromDate").val();
        to = $("#TxtToDate").val();
    }
    if (from != '' && to != '') {
        //if (GridTobe == false) {
        //    LoadStaffWiseGrid();
        //} else {
        //    ReLoadStaffWiseGrid();
        //}
        //GridTobe = true;
        //var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
        //console.log("staffwiseGridwidth", staffwiseGridwidth);
        //$("#staffwiseGrid").jqGrid("setGridWidth", staffwiseGridwidth, true);

    }
    else {
        console.log("date wise")
        alert("please select From Date & To Date.. !!")
    }

    if (!firstClick) {
        console.log("second btn click...");
        line_AicraftUtilization_chart()
        //AUAircraft_Utilization_chart();
        //AUFleetWiseBifurcation_chart();
        //AUAircraftTailNoWise_chart();
        //ReLoadCrewReportGrid();

    } else {
        firstClick = false;
        console.log("first btn click...");
        line_AicraftUtilization_chart()
        //AUAircraft_Utilization_chart();
        //AUFleetWiseBifurcation_chart();
        //AUAircraftTailNoWise_chart();
        //LoadCrewReportGrid()
    }
});

//function AUFleetWiseBifurcation_chart() {
//    //$(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "AircraftUtilizationDashboard/AUGet_FleetWiseBifurcation_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return $("#TxtFromDate").val(); },
//            toDate: function () { return $("#TxtToDate").val(); },
//            ddValue: function () { return $("#sltDateRange").val(); },
//        },
//        success: function (data) {
//            //console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.Value), 'drilldown': item.FlightType })
//            });
//            //console.log("chart data1..", data1)
//            //var drilldown_count = 0;
//            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';
//            // Bar chart
//            Highcharts.chart('Fleet_wise_bifurcation', {
//                chart: {
//                    type: 'column',
//                    backgroundColor: 'transparent',  
//                    events: {
//                        drilldown: function (e) {
//                            //drilldown_count = drilldown_count + 1;
//                            var chart = this;
//                            console.log("drill down event..", e.point.name)
//                            //chart.showLoading('Loading data ...');
//                            DrilldownValue = e.point.name
//                            //drilldown_val_one = e.point.name                        
//                            console.log("drilldown_count", drilldown_count)
//                            console.log("drilldown_val_one", drilldown_val_one)
//                            console.log("drilldown_val_one", drilldown_val_two)
//                            console.log("drilldown_val_one", drilldown_val_three)
//                            //console.log("drill down one level", DrilldownValue = e.point.name)
//                            //ReLoadOnloadWiseGrid();
//                        }
//                    },
//                },
//                title: false,
//                xAxis: {
//                    type: 'category'
//                },
//                yAxis: {
//                    min: 0,
//                    //max: 100,
//                    //    plotLines: [{
//                    //        value: 15,
//                    //    zIndex: 5,
//                    //    width: 2,
//                    //        color: '#ff0000',
//                    //dashStyle: 'longdashdot'
//                    //}],
//                    title: {
//                        text: ''
//                    }
//                },
//                legend: {
//                    enabled: false
//                },
//                subtitle: {
//                    text: ''
//                },
//                accessibility: {
//                    announceNewData: {
//                        enabled: true
//                    },
//                    point: {
//                        valueSuffix: '%'
//                    }
//                },
//                plotOptions: {
//                    series: {
//                        borderWidth: 0,
//                        dataLabels: {
//                            enabled: false,
//                            format: '{point.name}: {point.y:.1f}%'
//                        }
//                    }
//                },
//                tooltip: {
//                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
//                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
//                },
//                series:
//                    [
//                        {
//                            /*name: "Browsers",*/
//                            colorByPoint: true,
//                            data: data1
//                        }
//                    ],
//                credits: {
//                    enabled: false
//                },
//                exporting: {
//                    enabled: false
//                },
//            },
//                function (chart) { // on complete
//                    //console.log("data chart", chart.series[0].data.length)
//                    //console.log("data1", data1.length)
//                    if (data1.length < 1) { // check series is empty
//                        console.log("Check point 1")
//                        chart.renderer.text('No Data Available', 140, 120)
//                            .css({
//                                color: '#4572A7',
//                                fontSize: '20px'
//                            })
//                            .add();
//                    }
//                });
//        },
//        complete: function () {
//            //console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}
//function AUAircraftTailNoWise_chart() {
//    //$(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "AircraftUtilizationDashboard/AUGet_AircraftTailNoWise_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return $("#TxtFromDate").val(); },
//            toDate: function () { return $("#TxtToDate").val(); },
//            ddValue: function () { return $("#sltDateRange").val(); },
//        },
//        success: function (data) {
//            //console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.Value), 'drilldown': item.FlightType })
//            });
//            //console.log("chart data1..", data1)
//            //var drilldown_count = 0;
//            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';
//            // Bar chart
//            Highcharts.chart('Aircraft_Tail_no_wise', {
//                chart: {
//                    type: 'column',
//                    backgroundColor: 'transparent',
//                    events: {
//                        drilldown: function (e) {
//                            //drilldown_count = drilldown_count + 1;
//                            var chart = this;
//                            console.log("drill down event..", e.point.name)
//                            //chart.showLoading('Loading data ...');
//                            DrilldownValue = e.point.name
//                            //drilldown_val_one = e.point.name
//                            //SelectedChangeType_glob = selectedChangeType
//                            console.log("drilldown_count", drilldown_count)
//                            console.log("drilldown_val_one", drilldown_val_one)
//                            console.log("drilldown_val_one", drilldown_val_two)
//                            console.log("drilldown_val_one", drilldown_val_three)
//                            //console.log("drill down one level", DrilldownValue = e.point.name)
//                            //ReLoadOnloadWiseGrid();
//                        }
//                    },
//                },
//                title: false,
//                xAxis: {
//                    type: 'category'
//                },
//                yAxis: {
//                    min: 0,
//                    max: 100,
//                    //    plotLines: [{
//                    //        value: 15,
//                    //    zIndex: 5,
//                    //    width: 2,
//                    //        color: '#ff0000',
//                    //dashStyle: 'longdashdot'
//                    //}],
//                    title: {
//                        text: ''
//                    }
//                },
//                legend: {
//                    enabled: false
//                },
//                subtitle: {
//                    text: ''
//                },
//                accessibility: {
//                    announceNewData: {
//                        enabled: true
//                    },
//                    point: {
//                        valueSuffix: '%'
//                    }
//                },
//                plotOptions: {
//                    series: {
//                        borderWidth: 0,
//                        dataLabels: {
//                            enabled: false,
//                            format: '{point.name}: {point.y:.1f}%'
//                        }
//                    }
//                },
//                tooltip: {
//                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
//                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
//                },
//                series:
//                    [
//                        {
//                            /*name: "Browsers",*/
//                            colorByPoint: true,
//                            data: data1
//                        }
//                    ],
//                credits: {
//                    enabled: false
//                },
//                exporting: {
//                    enabled: false
//                },
//            },
//                function (chart) { // on complete
//                    //console.log("data chart", chart.series[0].data.length)
//                    //console.log("data1", data1.length)
//                    if (data1.length < 1) { // check series is empty
//                        console.log("Check point 1")
//                        chart.renderer.text('No Data Available', 140, 120)
//                            .css({
//                                color: '#4572A7',
//                                fontSize: '20px'
//                            })
//                            .add();
//                    }
//                });
//        },
//        complete: function () {
//            //console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}

function AUAircraft_Utilization_chart() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "AircraftUtilizationDashboard/AUGet_Aircraft_Utilization_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '22/06/2021' },
            toDate: function () { return '22/06/2021' },
            ddValue: function () { return 'Custom Date Range' },
            //fromDate: function () { return $("#TxtFromDate").val(); },
            //toDate: function () { return $("#TxtToDate").val(); },
            //ddValue: function () { return $("#sltDateRange").val(); },
            GetDataFor: function () { return 'F' },
            ACName: function () { return '' },
        },
        success: function (res) {

            console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0, B737_Sum = 0, B737F_Sum = 0, Q400_Sum = 0
            $.each(res, function (i, item) {
                delay_.push(parseInt(item.BlockTimeInHrs))
                delay_data.push([item.AircraftFamily, parseInt(item.BlockTimeInHrs)])



                if (item.AircraftFamily == 'B 737') {
                    var B737_Sumtime = parseInt(item.BlockTimeInHrs);
                    B737_Sum = B737_Sumtime;
                }
                if (item.AircraftFamily == 'B737F') {
                    var B737F_Sumtime = parseInt(item.BlockTimeInHrs);
                    B737F_Sum = B737F_Sumtime
                }
                if (item.AircraftFamily == 'Q400') {
                    var Q400_Sumtime = parseInt(item.BlockTimeInHrs);
                    Q400_Sum = Q400_Sumtime
                }

            });

            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'aircraft_utilization',
                    //marginTop: 20,
                    type: 'pie',
                    backgroundColor: 'transparent',
                    events: {
                        load: function () {
                            var chart = this,
                                x = chart.plotLeft + (chart.series[0].center[0]),
                                y = chart.plotTop + (chart.series[0].center[1]),
                                box;

                            chart.pieCenter = chart.renderer.text('B737 : ' + B737_Sum + "<br>" + 'B737F : ' + B737F_Sum + "<br>" + 'Q400 : ' + Q400_Sum, x, y, true)
                                .css({
                                    'text-align': 'center',
                                    color: 'white',
                                    fontSize: '20px'
                                })
                                .add();

                            box = chart.pieCenter.getBBox();
                            chart.pieCenter.attr({
                                x: x - box.width / 2,
                                y: y - box.height / 4
                            });
                        },
                        redraw: function () {
                            var chart = this,
                                x = chart.plotLeft + (chart.series[0].center[0]),
                                y = chart.plotTop + (chart.series[0].center[1]),
                                box = chart.pieCenter.getBBox();
                            chart.pieCenter.attr({
                                x: x - box.width / 2,
                                y: y - box.height / 4
                            });
                        }
                    }
                },
                title: {
                    text: 'Aircraft Utilization',
                    margin: 10,
                    style: {
                        color: '#eee'
                    },
                },
                exporting: false,
                credits: false,
                plotOptions: {
                    pie: {
                        innerSize: '60%',
                        shadow: false,
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,1)",
                    formatter: function () {
                        var time = this.y;
                        var hours1 = parseInt(time / 60);
                        var mins1 = parseInt((parseInt(time % 60)));
                        return '<b>' + this.point.name + '</b>: ' + hours1 + ':' + mins1;
                        //return '<b>' + this.point.name + '</b>: ' + this.y;
                    }
                },
                legend: {
                    
                    verticalAlign: 'bottom',
                    layout: 'horizontal',                    
                    //y: -175,
                    itemStyle: {
                        color: '#fff'
                    },
                },
                series: [{
                    showInLegend: true,
                    size: '100%',
                    innerSize: '70%',
                    dataLabels: {
                        enabled: false
                    },
                    data: delay_data
                }]
            });

        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });

}

function line_AicraftUtilization_chart() {


    $("#aircraft_utilization").hide();
    $("#line_chart_aircraft_utilization").show();
    //$("#aircraftutilization").text('Fleet wise bifurcation');

    $.ajax({
        type: 'POST',
        url: applicationUrl + "AircraftUtilizationDashboard/AUGet_Aircraft_Utilization_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            //fromDate: function () { return '22/06/2021' },
            //toDate: function () { return '22/06/2021' },
            //ddValue: function () { return 'Custom Date Range' },
            //fromDate: function () { return $("#TxtFromDate").val(); },
            //toDate: function () { return $("#TxtToDate").val(); },
            //ddValue: function () { return $("#sltDateRange").val(); },
            GetDataFor: function () { return 'F' },
            ACName: function () { return '' },
        },
        success: function (data) {

            //console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                //data1.push({ 'name': item.AircraftFamily, 'y': parseFloat(item.SumOfBlockTimeInHrs), 'drilldown': item.AircraftFamily })
                data1.push({ 'name': item.AircraftFamily, 'y': parseFloat(item.BlockTimeInHrs), 'drilldown': item.AircraftFamily })
                
            });

            console.log("chart data1..", data1)

            var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            // Bar chart
            Highcharts.chart('line_chart_aircraft_utilization', {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {

                            drilldown_count = drilldown_count + 1;
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name
                            //drilldown_val_one = e.point.name
                            //SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_one", drilldown_val_two)
                            console.log("drilldown_val_one", drilldown_val_three)

                            //console.log("drill down one level", DrilldownValue = e.point.name)
                            //ReLoadOnloadWiseGrid();
                            if (drilldown_count == 1) {
                                chart.showLoading('Loading data ...');
                                drilldown_val_one = e.point.name;
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "AircraftUtilizationDashboard/AUGet_FleetWiseBifurcation_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return from },
                                        toDate: function () { return to },
                                        ddValue: function () { return $("#sltDateRange").val(); },
                                        //fromDate: function () { return '22/06/2021' },
                                        //toDate: function () { return '22/06/2021' },
                                        //ddValue: function () { return 'Custom Date Range' },
                                        //fromDate: function () { return $("#TxtFromDate").val(); },
                                        //toDate: function () { return $("#TxtToDate").val(); },
                                        //ddValue: function () { return $("#sltDateRange").val(); },
                                        GetDataFor: function () { return 'A' },
                                        ACName: function () { return drilldown_val_one },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.AcName, 'y': parseFloat(item.SumOfBlockTimeInHrs), 'drilldown': item.AcName })
                                            //drilldata.push({ 'name': item.AcRegNo, 'y': parseFloat(item.SumOfBlockTimeInHrs) })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                //pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                                pointFormat: '<span style="color:{point.color}"><b>{point.y}'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: ' Aircraft Type - ' + e.point.name  ,
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true
                                            },

                                        })
                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve : ' + ex.toString());
                                    }
                                });
                                //$("#OnloadGridSec").hide();
                                //ReLoadOnloadWiseGrid();
                            }
                            if (drilldown_count == 2) {
                                chart.showLoading('Loading data ...');
                                drilldown_val_two = e.point.name;
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "AircraftUtilizationDashboard/AUGet_AircraftTailNoWise_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return from },
                                        toDate: function () { return to },
                                        ddValue: function () { return $("#sltDateRange").val(); },
                                        //fromDate: function () { return '22/06/2021' },
                                        //toDate: function () { return '22/06/2021' },
                                        //ddValue: function () { return 'Custom Date Range' },
                                        //fromDate: function () { return $("#TxtFromDate").val(); },
                                        //toDate: function () { return $("#TxtToDate").val(); },
                                        //ddValue: function () { return $("#sltDateRange").val(); },
                                        GetDataFor: function () { return 'T' },
                                        ACName: function () { return drilldown_val_two },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.AcRegNo, 'y': parseFloat(item.SumOfBlockTimeInHrs) })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                //pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                                pointFormat: '<span style="color:{point.color}"><b>{point.y}'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: ' Tail No - '+ e.point.name,
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true
                                            },

                                        })
                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve : ' + ex.toString());
                                    }
                                });
                                //$("#OnloadGridSec").hide();
                                //ReLoadOnloadWiseGrid();
                            }
                        },
                        drillup: function (e) {
                            if (drilldown_count >= 3) {
                                drilldown_count = 2
                            }
                            drilldown_count = drilldown_count - 1;
                            console.log("drilldown_count..", drilldown_count)

                            var chart = this;
                            if (drilldown_count == 1) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_two = ''
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                               
                                chart.xAxis[0].update({
                                    title: {
                                        text: 'Aircraft Type ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        style: {
                                            color: '#fff'
                                        }
                                    }
                                })
                                //$("#OnloadGridSec").hide();
                            } else if (drilldown_count == 2) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                                chart.xAxis[0].update({
                                    title: {
                                        text: 'Tail No',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        style: {
                                            color: '#fff'
                                        }
                                    }
                                })

                                //$("#OnloadGridSec").show();
                            }
                            else if (drilldown_count == 0) {
                                chart.xAxis[0].update({
                                    title: {
                                        text: 'Aircraft Family',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        style: {
                                            color: '#fff'
                                        }
                                    }
                                })

                            }
                            else {
                                //$("#OnloadGridSec").show();
                                chart.series[0].setData(data1)
                            }

                            console.log("drilldown_count..", drilldown_count)



                        },
                    },
                },
                title: false,
                xAxis: {
                    title: {
                        text: 'Aircraft Family',
                        style: {
                            color: 'white'
                        }

                    },
                    type: 'category',
                    labels: {
                        useHTML: true,
                        formatter: function () {
                            //return '<span class="xaxis-label"><u>' + (this.value) + '</u></span>';
                            return '<span class="xaxis-label">' + (this.value) + '</span>';
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Utilization Hours',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },

                },
                legend: {
                    enabled: false
                },

                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: ''
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
                    },
                    series: {
                        borderWidth: 0,
                        
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y}'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,1)",
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y}'
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                },

                series:
                    [
                        {
                            /*name: "Browsers",*/
                            colorByPoint: true,
                            data: data1
                        }
                    ],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },

            },
                function (chart) { // on complete
                    //console.log("data chart", chart.series[0].data.length)
                    //console.log("data1", data1.length)

                    if (data1.length < 1) { // check series is empty
                        console.log("Check point 1")
                        chart.renderer.text('No Data Available', 140, 120)
                            .css({
                                color: '#4572A7',
                                fontSize: '20px'
                            })
                            .add();
                    }


                });
        },
        complete: function () {
            //console.log("in compelete...");
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}


