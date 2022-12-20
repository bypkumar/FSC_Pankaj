
var applicationUrl;
var DivertedGrid = false, CancelledGrid = false
var DrilldownValue = 0;
var date_dd = 'Current Day';
var from = '', to = '';

var drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();

    $("#DivertedGridSec").hide();
    $("#CancelledGridSec").hide();

    //bar_FlightTypeWiseDelay();

    //bar_FlightTypeWiseDiverted();

    //bar_FlightTypeWiseCancelled();

});

$("#tabs")
    .tabs()
    .on("click", '[role="tab"]', function () {
        $(this).closest("ul") // The current UL

        if ($(this).attr("id") == 'delayTab') {
            $("#DivertedGridSec").hide();
            $("#CancelledGridSec").hide();
        }

        if ($(this).attr("id") == 'divertedTab') {
            $("#DivertedGridSec").show();
            $("#CancelledGridSec").hide();
        }

        if ($(this).attr("id") == 'cancelledTab') {
            $("#DivertedGridSec").hide();
            $("#CancelledGridSec").show();

        }
    });

$("#btnClearDetails").click(function () {

    $("#overlay").show();

    {
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

    }
    $("#overlay").hide();
    DivertedGrid = false;
    CancelledGrid = false;
    $("#DivertedGridSec").hide();
    $("#CancelledGridSec").hide();

});
//$(document).keypress(function (event) {
//    var keycode = (event.keyCode ? event.keyCode : event.which);
//    if (keycode == '13') {
//    }
//});


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
        if (DivertedGrid == false) {
            LoadDivertedGrid();
        } else {
            ReLoadDivertedGrid();
        }
        if (CancelledGrid == false) {
            LoadCancelledGrid();
        } else {
            ReLoadCancelledGrid();
        }
        DivertedGrid = true;
        CancelledGrid = true;

        var DivertedGridwidth = $("#DivertedGrid").closest(".ui-jqgrid").parent().width();
        $("#DivertedGrid").jqGrid("setGridWidth", DivertedGridwidth, true);

        var CancelledGridwidth = $("#CancelledGrid").closest(".ui-jqgrid").parent().width();
        $("#CancelledGrid").jqGrid("setGridWidth", CancelledGridwidth, true);
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
    //return;

    if (!firstClick) {
        console.log("second btn click...");
        bar_FlightTypeWiseDelay();
        //bar_DelayWiseFlightCount();
        //bar_FlightWiseDelay();
        bar_FlightTypeWiseDiverted();
        //bar_DivertedFlightDetails();
        bar_FlightTypeWiseCancelled();
        //bar_CancellationFlightDetails();
        //ReLoadCrewReportGrid();

        $("#DivertedGridSec").hide();
        $("#CancelledGridSec").hide();

    }
    else {
        firstClick = false;
        console.log("first btn click...");
        bar_FlightTypeWiseDelay();
        //bar_DelayWiseFlightCount();
        //bar_FlightWiseDelay();
        bar_FlightTypeWiseDiverted();
        //bar_DivertedFlightDetails();
        bar_FlightTypeWiseCancelled();
        //bar_CancellationFlightDetails();
        //LoadCrewReportGrid()

        $("#DivertedGridSec").hide();
        $("#CancelledGridSec").hide();
    }


});

$(window).on("resize", function () {
    console.log("window resize...")
    var DivertedGridwidth = $("#DivertedGrid").closest(".ui-jqgrid").parent().width();
    $("#DivertedGrid").jqGrid("setGridWidth", DivertedGridwidth, true);

    var CancelledGridwidth = $("#CancelledGrid").closest(".ui-jqgrid").parent().width();
    $("#CancelledGrid").jqGrid("setGridWidth", CancelledGridwidth, true);
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
        fromDate = "";
        toDate = "";
        //fromDate = "01/01/2021";
        //toDate = "31/01/2021";
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


// date Range Dropdown
function BindDateRange() {

    $("#overlay").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "DisruptionDashboard/Get_DropdownListForDateRange",
        dataType: 'json',
        data: {
            fromDate: function () { return '' },
            toDate: function () { return '' },
            DateDropDownValue: function () { return '' },
            GetDataFor: function () { return 'Date Range' },
        },
        success: function (data) {
            console.log("Date Range", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#sltDateRange").multiselect('destroy');
            $('#sltDateRange').html('');

            for (var j = 0; j < type.length; j++) {
                $('#sltDateRange').append('<option value="' + type[j].Id + '">' + type[j].DateRange + '</option>');
            }

            $('#sltDateRange').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Date Range',
                onChange: function () {
                    console.log('EmployeeName lib chnage', $("#sltDateRange").val());
                    if ($("#sltDateRange").val() != null) {
                        $("#EmployeeName").multiselect("disable");
                    } else {
                        $("#EmployeeName").multiselect("enable");
                    }
                },
                onSelectAll: function () {
                    $("#EmployeeName").multiselect("disable");
                },
                onDeselectAll: function () {
                    $("#EmployeeName").multiselect("enable");
                }
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function bar_FlightTypeWiseDelay() {

    //$(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "DisruptionDashboard/Get_Flight_Type_Wise_Delay_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            FlightType: function () { return '' },
            DelayCode: function () { return '' },
            Code: function () { return 1 },
            Mod: function () { return 3 },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.FlightCount), 'drilldown': item.FlightType })
            });

            console.log("chart data1..", data1)

            var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            //var OnloadGridwidth = $("#OnloadGrid").closest(".ui-jqgrid").parent().width();
            //$("#OnloadGrid").jqGrid("setGridWidth", OnloadGridwidth, true);

            // Bar chart
            Highcharts.chart('bar_FlightTypeWiseDelay', {
                colors: ['#FCD202', '#9A2FAE', '#FA7070', '#59C9FD'],
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    //styledMode: true,
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {

                            drilldown_count = drilldown_count + 1;
                            var chart = this;
                            //$("#OnloadGridSec").hide();
                            console.log("drill down event..", e.point.name)
                            //chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name

                            //SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_two", drilldown_val_two)
                            console.log("drilldown_val_three", drilldown_val_three)
                            console.log("drilldown_val_four", drilldown_val_four)

                            //console.log("drill down one level", DrilldownValue = e.point.name)
                            //ReLoadOnloadWiseGrid();
                            if (drilldown_count == 1) {
                                chart.showLoading('Loading data ...');

                                drilldown_val_one = e.point.name
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "DisruptionDashboard/Get_SelectedFlight_Type_Wise_Delay_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return from },
                                        toDate: function () { return to },
                                        ddValue: function () { return $("#sltDateRange").val(); },
                                        //SelectedFlightType: function () { return drilldown_val_one },
                                        DelayCode: function () { return '' },
                                        Code: function () { return 2 },
                                        Mod: function () { return 3 },
                                        FlightType: function () { return drilldown_val_one },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.Reason, 'y': parseFloat(item.ReasonCount), 'drilldown': item.Reason })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: ' Delay Reason ',
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true,
                                                style: {
                                                    color: '#fff'
                                                }
                                            },


                                        })
                                        chart.yAxis[0].update({
                                            title: {
                                                text: ' Delay Flight Count ',
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true,
                                                style: {
                                                    color: '#fff'
                                                }
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
                            else if (drilldown_count == 2) {
                                chart.showLoading('Loading data ...');
                                drilldown_val_two = e.point.name;

                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "DisruptionDashboard/Get_SelectedReason_Wise_Flight_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return $("#TxtFromDate").val(); },
                                        toDate: function () { return $("#TxtToDate").val(); },
                                        ddValue: function () { return $("#sltDateRange").val(); },
                                        //SelectedFlightType: function () { return drilldown_val_one },
                                        DelayCode: function () { return e.point.name },
                                        Code: function () { return 3 },
                                        Mod: function () { return 3 },
                                        FlightType: function () { return drilldown_val_one },

                                    },
                                    success: function (data) {
                                        var drilldata = [];

                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.FlightNo, 'y': parseFloat(item.DelayTime), 'FlightDate': item.FlightDate })
                                        });
                                        console.log("drilldata..", drilldata)
                                        console.log("data..", data)

                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.FlightDate:.2f}<b>{point.y}'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: ' Flight No ',
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true,
                                                style: {
                                                    color: '#fff'
                                                }
                                            },

                                        })
                                        chart.yAxis[0].update({
                                            title: {
                                                text: ' Delay Time ',
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true,
                                                style: {
                                                    color: '#fff'
                                                }
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
                                        text: ' Delay Reason ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#fff'
                                        }
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Delay Flight Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#fff'
                                        }
                                    },

                                })
                                //$("#OnloadGridSec").hide();
                            }
                            else if (drilldown_count == 2) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                                chart.xAxis[0].update({
                                    title: {
                                        text: ' Flight No ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Delay Time ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#fff'
                                        }
                                    },

                                })
                                //$("#OnloadGridSec").show();
                            }
                            else if (drilldown_count == 3) {
                                console.log("drilldown_count..", drilldown_count)
                                //drilldown_val_four = '';
                                drilldown_val_four = '';
                                //$("#OnloadGridSec").show();
                                chart.xAxis[0].update({
                                    title: {
                                        text: ' Delay Reason ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Delay Flight Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#fff'
                                        }
                                    },

                                })
                            } else if (drilldown_count == 0) {
                                chart.xAxis[0].update({
                                    title: {
                                        text: ' Flight Type ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#fff'
                                        }
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Delay Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#fff'
                                        }
                                    },

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
                title: {
                    text: 'Flight Type Analysis',
                    margin: 10,
                    style: {
                        color: '#eee'
                    },
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        useHTML: true,
                        formatter: function () {
                            //return '<span class="xaxis-label"><u>' + (this.value) + '</u></span>';
                            return '<span class="xaxis-label">' + (this.value) + '</span>';
                        }
                    },
                    title: {
                        text: 'Flight Type',
                        style: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    //max: 100,
                    //className: 'highcharts-color-0',
                    //    plotLines: [{
                    //        value: 15,
                    //    zIndex: 5,
                    //    width: 2,

                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },

                    title: {
                        text: 'Delay Count',
                        style: {
                            color: 'white'
                        }
                    }

                   ,
                    //        color: '#ff0000',


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
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
                    },
                    series: {
                        turboThreshold: 1000000,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    backgroundColor: "rgba(255,255,255,1)",
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

//function bar_DelayWiseFlightCount() {
//    //$(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "DisruptionDashboard/Get_Delay_Wise_Flight_Count_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return '' },
//            toDate: function () { return '' },
//            ddValue: function () { return 'Current Day' },
//        },
//        success: function (data) {
//            //console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.Value), 'drilldown': item.FlightType })
//            });
//            console.log("chart data1..", data1)
//            //var drilldown_count = 0;
//            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';
//            // Bar chart
//            Highcharts.chart('bar_DelayWiseFlightCount', {
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
//                            SelectedChangeType_glob = selectedChangeType
//                            console.log("drilldown_count", drilldown_count)
//                            console.log("drilldown_val_one", drilldown_val_one)
//                            console.log("drilldown_val_one", drilldown_val_two)
//                            console.log("drilldown_val_one", drilldown_val_three)
//                            //console.log("drill down one level", DrilldownValue = e.point.name)
//                            //ReLoadOnloadWiseGrid();
//                        }
//                    },
//                },
//                title: {
//                    text: 'Flight Type Analysis',
//                    margin: 10,
//                    style: {
//                        color: '#eee'
//                    },
//                },
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
//                    console.log("data chart", chart.series[0].data.length)
//                    console.log("data1", data1.length)
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
//            console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}
//function bar_FlightWiseDelay() {
//    //$(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "DisruptionDashboard/Get_Flight_Wise_Delay_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return '' },
//            toDate: function () { return '' },
//            ddValue: function () { return 'Current Day' },
//        },
//        success: function (data) {
//            //console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.Value), 'drilldown': item.FlightType })
//            });
//            console.log("chart data1..", data1)
//            //var drilldown_count = 0;
//            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';
//            // Bar chart
//            Highcharts.chart('bar_FlightWiseDelay', {
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
//                            SelectedChangeType_glob = selectedChangeType
//                            console.log("drilldown_count", drilldown_count)
//                            console.log("drilldown_val_one", drilldown_val_one)
//                            console.log("drilldown_val_one", drilldown_val_two)
//                            console.log("drilldown_val_one", drilldown_val_three)
//                            //console.log("drill down one level", DrilldownValue = e.point.name)
//                            //ReLoadOnloadWiseGrid();
//                        }
//                    },
//                },
//                title: {
//                    text: 'Flight Type Analysis',
//                    margin: 10,
//                    style: {
//                        color: '#eee'
//                    },
//                },
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
//                },//            },
//                function (chart) { // on complete
//                    console.log("data chart", chart.series[0].data.length)
//                    console.log("data1", data1.length)
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
//            console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}


function bar_FlightTypeWiseDiverted() {

    //$(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "DisruptionDashboard/Get_Flight_Type_Wise_Diverted_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            FlightType: function () { return '' },
            DelayCode: function () { return '' },
            Code: function () { return 1 },
            Mod: function () { return 2 },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.FlightCount), 'drilldown': item.FlightType })
            });

            console.log("chart data1..", data1)

            var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            var DivertedGridwidth = $("#DivertedGrid").closest(".ui-jqgrid").parent().width();
            $("#DivertedGrid").jqGrid("setGridWidth", DivertedGridwidth, true);

            // Bar chart
            Highcharts.chart('bar_FlightTypeWiseDiverted', {
                colors: ['#FCD202', '#9A2FAE', '#FA7070', '#59C9FD'],
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    //styledMode: true,
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {

                            if (drilldown_count < 2) {
                                drilldown_count = drilldown_count + 1;
                            }

                            var chart = this;
                            $("#DivertedGridSec").hide();
                            $("#CancelledGridSec").hide();
                            //$("#CancelledGridSec").hide();
                            console.log("drill down event..", e.point.name)
                            //chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name
                            //drilldown_val_one = e.point.name
                            //SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_two", drilldown_val_two)
                            console.log("drilldown_val_three", drilldown_val_three)
                            console.log("drilldown_val_four", drilldown_val_four)

                            //console.log("drill down one level", DrilldownValue = e.point.name)
                            //ReLoadOnloadWiseGrid();
                            if (drilldown_count == 1) {
                                chart.showLoading('Loading data ...');
                                drilldown_val_one = e.point.name;
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "DisruptionDashboard/Get_SelectedFlight_Type_Wise_Delay_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return from },
                                        toDate: function () { return to },
                                        ddValue: function () { return $("#sltDateRange").val(); },
                                        //SelectedFlightType: function () { return drilldown_val_one },
                                        DelayCode: function () { return '' },
                                        Code: function () { return 2 },
                                        Mod: function () { return 2 },
                                        FlightType: function () { return drilldown_val_one },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.Reason, 'y': parseFloat(item.ReasonCount), 'drilldown': item.Reason })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: ' Diverted Reason - ' + e.point.name,
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true,
                                                color: 'white'
                                            },

                                        })
                                        chart.yAxis[0].update({
                                            title: {
                                                text: ' Diverted Flight Count ',
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
                                $("#DivertedGridSec").hide();
                                $("#CancelledGridSec").hide();
                            }
                            else if (drilldown_count == 2) {
                                //chart.showLoading('Loading data ...');
                                drilldown_val_two = e.point.name;
                                //$.ajax({
                                //    type: 'POST',
                                //    url: applicationUrl + "DisruptionDashboard/Get_SelectedReason_Wise_Flight_chart",
                                //    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                //    dataType: 'json',
                                //    data: {

                                //        fromDate: function () { return $("#TxtFromDate").val(); },
                                //        toDate: function () { return $("#TxtToDate").val(); },
                                //        ddValue: function () { return $("#sltDateRange").val(); },
                                //        //SelectedFlightType: function () { return drilldown_val_one },
                                //        DelayCode: function () { return e.point.name },
                                //        Code: function () { return 3 },
                                //        Mod: function () { return 2 },
                                //        FlightType: function () { return drilldown_val_one },

                                //    },
                                //    success: function (data) {
                                //        var drilldata = [];
                                //        $.each(data, function (i, item) {
                                //            drilldata.push({ 'name': item.Reason, 'y': parseFloat(item.ReasonCount), 'drilldown': item.Reason })
                                //        });
                                //        let chart_d = {
                                //            name: e.point.name, data: drilldata, tooltip: {
                                //                pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                //            }
                                //        }

                                //        chart.hideLoading();
                                //        chart.addSeriesAsDrilldown(e.point, chart_d);
                                //    },
                                //    error: function (ex) {
                                //        alert('Failed to retrieve : ' + ex.toString());
                                //    }
                                //});


                                $("#DivertedGridSec").show();
                                var DivertedGridwidth = $("#DivertedGrid").closest(".ui-jqgrid").parent().width();
                                $("#DivertedGrid").jqGrid("setGridWidth", DivertedGridwidth, true);


                                ReLoadDivertedGrid();
                            }
                        },
                        drillup: function (e) {
                            if (drilldown_count >= 2) {
                                drilldown_count = 1
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
                                        text: ' Diverted Reason ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        color: 'white'
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Diverted Flight Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true
                                    },

                                })
                                $("#DivertedGridSec").show();
                                $("#CancelledGridSec").hide();
                            }

                            else if (drilldown_count == 0) {
                                chart.xAxis[0].update({
                                    title: {
                                        text: ' Flight Type ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        color: 'white'
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Diverted Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true
                                    },

                                })
                                $("#DivertedGridSec").hide();
                                $("#CancelledGridSec").hide();

                            }
                            else {
                                $("#DivertedGridSec").hide();
                                $("#CancelledGridSec").hide();
                                chart.series[0].setData(data1)
                            }

                            console.log("drilldown_count..", drilldown_count)


                        },
                    },
                },
                title: {
                    text: 'Flight Type Analysis',
                    margin: 10,
                    style: {
                        color: '#eee'
                    },
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        useHTML: true,
                        formatter: function () {
                            //return '<span class="xaxis-label"><u>' + (this.value) + '</u></span>';
                            return '<span class="xaxis-label">' + (this.value) + '</span>';
                        }
                    },
                    title: {
                        text: 'Flight Type',
                        style: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Diverted Count',
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
                        valueSuffix: '%'
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
                    pointFormat: '<span style="color:{point.color}"><b>{point.y}'
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

//function bar_DivertedFlightDetails() {
//    //$(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "DisruptionDashboard/Get_Diverted_Flight_Details_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return '' },
//            toDate: function () { return '' },
//            ddValue: function () { return 'Current Day' },
//        },
//        success: function (data) {
//            //console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.Value), 'drilldown': item.FlightType })
//            });
//            console.log("chart data1..", data1)
//            //var drilldown_count = 0;
//            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';
//            // Bar chart
//            Highcharts.chart('bar_DivertedFlightDetails', {
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
//                            SelectedChangeType_glob = selectedChangeType
//                            console.log("drilldown_count", drilldown_count)
//                            console.log("drilldown_val_one", drilldown_val_one)
//                            console.log("drilldown_val_one", drilldown_val_two)
//                            console.log("drilldown_val_one", drilldown_val_three)
//                            //console.log("drill down one level", DrilldownValue = e.point.name)
//                            //ReLoadOnloadWiseGrid();
//                        }
//                    },
//                },
//                title: {
//                    text: 'Flight Type Analysis',
//                    margin: 10,
//                    style: {
//                        color: '#eee'
//                    },
//                },
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
//                    console.log("data chart", chart.series[0].data.length)
//                    console.log("data1", data1.length)
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
//            console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}

function LoadDivertedGrid() {

    $("#DivertedGrid").jqGrid({
        url: applicationUrl + "DisruptionDashboard/Get_DivertedDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            FlightType: function () { return drilldown_val_one },
            DelayCode: function () { return drilldown_val_two },
            Code: function () { return 3 },
            Mod: function () { return 2 },

            //console.log("drilldown_val_one", drilldown_val_one)
            //console.log("drilldown_val_one", drilldown_val_two)
            //console.log("drilldown_val_one", drilldown_val_three)

        },
        colNames: ['Flight Date', 'FlightNo', 'Sector', 'Diverted To', 'Aircraft Type', 'Tail No', 'Diversion Reason'],
        colModel: [
            { hidden: false, name: 'FlightDate', index: 'FlightDate', align: "center" },
            { hidden: false, name: 'FlightNo', index: 'FlightNo', align: "center" },
            { hidden: false, name: 'Sector', index: 'Sector', align: "center" },
            { hidden: false, name: 'DivertedTo', index: 'DivertedTo', align: "center" },
            { hidden: false, name: 'AircraftType', index: 'AircraftType', align: "center" },
            { hidden: false, name: 'TailNo', index: 'TailNo', align: "center" },
            { hidden: false, name: 'DiversionReason', index: 'DiversionReason', align: "center" },

        ],
        pager: jQuery('#pagerDivertedGrid'),
        rowNum: 10,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 300,
        autowidth: true,
        loadonce: true,
        width: '100%',
        shrinkToFit: false,
        viewrecords: true,
        cmTemplate: { title: false },
        // gridview: true,
        sortname: 'FlightDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        //autowidth: true,
        multiselect: false,
    }).navGrid('#pagerDivertedGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#DivertedGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { searchOperators: true });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadDivertedGrid() {
    console.log("on reload...");
    $("#DivertedGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}



function bar_FlightTypeWiseCancelled() {

    //$(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "DisruptionDashboard/Get_Flight_Type_Wise_Cancelled_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            FlightType: function () { return '' },
            DelayCode: function () { return '' },
            Code: function () { return 1 },
            Mod: function () { return 1 },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.FlightCount), 'drilldown': item.FlightType })
            });

            console.log("chart data1..", data1)

            var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            var CancelledGridwidth = $("#CancelledGrid").closest(".ui-jqgrid").parent().width();
            $("#CancelledGrid").jqGrid("setGridWidth", CancelledGridwidth, true);

            // Bar chart
            Highcharts.chart('bar_FlightTypeWiseCancelled', {
                colors: ['#FCD202', '#9A2FAE', '#FA7070', '#59C9FD'],
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    //styledMode: true,
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {

                            if (drilldown_count < 2) {
                                drilldown_count = drilldown_count + 1;
                            }
                            var chart = this;
                            $("#DivertedGridSec").hide();
                            $("#CancelledGridSec").hide();
                            console.log("drill down event..", e.point.name)
                            //chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name
                            //drilldown_val_one = e.point.name
                            //SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_two", drilldown_val_two)
                            console.log("drilldown_val_three", drilldown_val_three)
                            console.log("drilldown_val_four", drilldown_val_four)

                            //console.log("drill down one level", DrilldownValue = e.point.name)
                            //ReLoadOnloadWiseGrid();
                            if (drilldown_count == 1) {
                                chart.showLoading('Loading data ...');
                                drilldown_val_one = e.point.name;
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "DisruptionDashboard/Get_SelectedFlight_Type_Wise_Delay_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return from },
                                        toDate: function () { return to },
                                        ddValue: function () { return $("#sltDateRange").val(); },
                                        //SelectedFlightType: function () { return drilldown_val_one },
                                        DelayCode: function () { return '' },
                                        Code: function () { return 2 },
                                        Mod: function () { return 1 },
                                        FlightType: function () { return drilldown_val_one },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.Reason, 'y': parseFloat(item.ReasonCount), 'drilldown': item.Reason })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: ' Cancelled Reason - ' + e.point.name,
                                                style: {
                                                    color: 'white'
                                                }

                                            },
                                            labels: {
                                                enabled: true,
                                                color: 'white'
                                            },

                                        })
                                        chart.yAxis[0].update({
                                            title: {
                                                text: ' Cancelled Flight Count ',
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
                                $("#DivertedGridSec").hide();
                                $("#CancelledGridSec").hide();
                            }
                            else if (drilldown_count == 2) {
                                drilldown_val_two = e.point.name;
                                //$.ajax({
                                //    type: 'POST',
                                //    url: applicationUrl + "DisruptionDashboard/Get_SelectedReason_Wise_Flight_chart",
                                //    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                //    dataType: 'json',
                                //    data: {

                                //        fromDate: function () { return $("#TxtFromDate").val(); },
                                //        toDate: function () { return $("#TxtToDate").val(); },
                                //        ddValue: function () { return $("#sltDateRange").val(); },
                                //        //SelectedFlightType: function () { return drilldown_val_one },
                                //        DelayCode: function () { return drilldown_val_two },
                                //        Code: function () { return 3 },
                                //        Mod: function () { return 1 },
                                //        FlightType: function () { return drilldown_val_one },

                                //    },
                                //    success: function (data) {
                                //        var drilldata = [];
                                //        $.each(data, function (i, item) {
                                //            drilldata.push({ 'name': item.Reason, 'y': parseFloat(item.ReasonCount), 'drilldown': item.Reason })
                                //        });
                                //        let chart_d = {
                                //            name: e.point.name, data: drilldata, tooltip: {
                                //                pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                //            }
                                //        }

                                //        chart.hideLoading();
                                //        chart.addSeriesAsDrilldown(e.point, chart_d);
                                //    },
                                //    error: function (ex) {
                                //        alert('Failed to retrieve : ' + ex.toString());
                                //    }
                                //});
                                $("#CancelledGridSec").show();
                                var CancelledGridwidth = $("#CancelledGrid").closest(".ui-jqgrid").parent().width();
                                $("#CancelledGrid").jqGrid("setGridWidth", CancelledGridwidth, true);


                                ReLoadCancelledGrid();
                            }
                        },
                        drillup: function (e) {
                            if (drilldown_count >= 2) {
                                drilldown_count = 1
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
                                        text: ' Cancelled Reason ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        color: 'white'
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Cancelled Flight Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true
                                    },

                                })
                                $("#CancelledGridSec").show();
                                $("#DivertedGridSec").hide();
                            }
                            else if (drilldown_count == 0) {
                                chart.xAxis[0].update({
                                    title: {
                                        text: ' Flight Type ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        color: 'white'
                                    },

                                })
                                chart.yAxis[0].update({
                                    title: {
                                        text: ' Cancelled Count ',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true
                                    },

                                })
                                $("#DivertedGridSec").hide();
                                $("#CancelledGridSec").hide();

                            }
                            else {
                                $("#CancelledGridSec").show();
                                $("#DivertedGridSec").hide();
                                chart.series[0].setData(data1)
                            }

                            console.log("drilldown_count..", drilldown_count)


                        },
                    },
                },
                title: {
                    text: 'Flight Type Analysis',
                    margin: 10,
                    style: {
                        color: '#eee'
                    },
                },
                xAxis: {
                    type: 'category',
                    title: {
                        text: 'Flight Type',
                        style: {
                            color: 'white'
                        }
                    },
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
                    max: 100,
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },
                    //className: 'highcharts-color-0',
                    //    plotLines: [{
                    //        value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //        color: '#ff0000',
                    //dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: 'Cancelled Count',
                        style: {
                            color: 'white'
                        }
                    }

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
                        valueSuffix: '%'
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
                    pointFormat: '<span style="color:{point.color}"><b>{point.y}'
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

function LoadCancelledGrid() {

    $("#CancelledGrid").jqGrid({
        url: applicationUrl + "DisruptionDashboard/Get_CancelledDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            FlightType: function () { return 'Commercial' },
            DelayCode: function () { return 'Admin' },
            Code: function () { return 3 },
            Mod: function () { return 1 },

        },
        colNames: ['Flight Date', 'FlightNo', 'Sector', 'Aircraft Type', 'Tail No', 'Reason'],
        colModel: [
            { hidden: false, name: 'FlightDate', index: 'FlightDate', align: "center" },
            { hidden: false, name: 'FlightNo', index: 'FlightNo', align: "center" },
            { hidden: false, name: 'Sector', index: 'Sector', align: "center" },
            { hidden: false, name: 'AircraftType', index: 'AircraftType', align: "center" },
            { hidden: false, name: 'TailNo', index: 'TailNo', align: "center" },
            { hidden: false, name: 'Reason', index: 'Reason', align: "center" },

        ],
        pager: jQuery('#pagerCancelledGrid'),
        rowNum: 10,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 300,
        autowidth: true,
        loadonce: true,
        width: '100%',
        shrinkToFit: false,
        viewrecords: true,
        cmTemplate: { title: false },
        // gridview: true,
        sortname: 'FlightDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        //autowidth: true,
        multiselect: false,
    }).navGrid('#pagerCancelledGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#CancelledGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { searchOperators: true });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadCancelledGrid() {
    console.log("on reload...");
    $("#CancelledGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}


//function bar_CancellationFlightDetails() {
//    //$(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "DisruptionDashboard/Get_Cancellation_Flight_Details_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return '' },
//            toDate: function () { return '' },
//            ddValue: function () { return 'Current Day' },
//        },
//        success: function (data) {
//            //console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.Value), 'drilldown': item.FlightType })
//            });
//            console.log("chart data1..", data1)
//            //var drilldown_count = 0;
//            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';
//            // Bar chart
//            Highcharts.chart('bar_CancellationFlightDetails', {
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
//                            SelectedChangeType_glob = selectedChangeType
//                            console.log("drilldown_count", drilldown_count)
//                            console.log("drilldown_val_one", drilldown_val_one)
//                            console.log("drilldown_val_one", drilldown_val_two)
//                            console.log("drilldown_val_one", drilldown_val_three)
//                            //console.log("drill down one level", DrilldownValue = e.point.name)
//                            //ReLoadOnloadWiseGrid();
//                        }
//                    },
//                },
//                title: {
//                    text: 'Flight Type Analysis',
//                    margin: 10,
//                    style: {
//                        color: '#eee'
//                    },
//                },
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
//                    console.log("data chart", chart.series[0].data.length)
//                    console.log("data1", data1.length)
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
//            console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}

