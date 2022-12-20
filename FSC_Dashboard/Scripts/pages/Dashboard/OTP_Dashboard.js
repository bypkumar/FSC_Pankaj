
var applicationUrl;
var SectorGrid = false, FlightGrid = false
var date_dd = 'Current Day';
var from = '', to = '';
var CurrentTab = 'overallOtp';
var ddfor_sectors = false;
var ddfor_flight_sectors = false;


$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();

    $("#SectorGridSec").hide();
    $("#FlightGridSec").hide();

    //$("#line_chart_overalotp").hide();

    //$("#sltDateRange option").each(function (index, item) {
    //    if (index == 5 || index == 6) {
    //        console.log("option -> item", index, item)
    //        $(item).css("display", 'none')
    //    }
    //});

    // On Chnages Events 
    $("#TxtToDate").change(function () {
        console.log("on date chage");
        if (CurrentTab == 'sectorWise') {

            //GetFlightTypeSector();
            GetSector();
        }
        if (CurrentTab == 'flightWise') {

            GetFlightTypeSector();
            //GetSector();
        }
        
    });

    $("#TxtFromDate").change(function () {
        console.log("on date chage");
        if (CurrentTab == 'sectorWise') {

            //GetFlightTypeSector();
            GetSector();
        }
        if (CurrentTab == 'flightWise') {

            GetFlightTypeSector();
            //GetSector();
        }
    });


    $('#flightTypeSectorDD').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        nonSelectedText: 'Select Flight Sector',
        onChange: function () {
            console.log('EmployeeName lib chnage', $("#flightTypeSectorDD").val());
        },
        onSelectAll: function () {
            //$("#EmployeeName").multiselect("disable");
        },
        onDeselectAll: function () {
            //$("#EmployeeName").multiselect("enable");
        }
    });

    $('#sectorDD').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        nonSelectedText: 'Select Sector',
        onChange: function () {
            console.log('EmployeeName lib chnage', $("#sectorDD").val());
        },
        onSelectAll: function () {
            //$("#EmployeeName").multiselect("disable");
        },
        onDeselectAll: function () {
            //$("#EmployeeName").multiselect("enable");
        }
    });


    $('#flightTypeSectorDD').next().hide();
    $('#sectorDD').next().hide();

    // otp charts
    // otp_overall_chart()
    //line_otp_overall_chart()
    //otp_SectorType_chart()
    //otp_FlightType_chart()
    //otp_RegionType_chart()
    //otp_metro_chart()
    //GetFlightTypeSector()
    //GetSector()
});


$("#sltDateRange").change(function () {
    var date_dd = $("#sltDateRange").val();
    console.log("date_dd", date_dd)

    if (ddfor_sectors == true) {
        GetSector()
    }

    if (ddfor_flight_sectors == true) {
        GetFlightTypeSector()
    }

    //$('#flightTypeSectorDD').next().hide();
    //$('#sectorDD').next().hide();

})

$("#tabs")
    .tabs()
    .on("click", '[role="tab"]', function () {
        $(this).closest("ul") // The current UL
        console.log('jquery', $(this).attr("id"))

        //$("#FlightGridSec").hide();
        //$("#SectorGridSec").hide();
        if ($(this).attr("id") == 'overallOtp') {
            CurrentTab = 'overallOtp'
            $("#SectorGridSec").hide();
            $("#FlightGridSec").hide();
        }
        if ($(this).attr("id") == 'metroChart') {
            CurrentTab = 'metroChart'
            $("#SectorGridSec").hide();
            $("#FlightGridSec").hide();
        }
        if ($(this).attr("id") == 'regionWise') {
            CurrentTab = 'regionWise'
            $("#SectorGridSec").hide();
            $("#FlightGridSec").hide();
        }

        if ($(this).attr("id") == 'flightWise') {
            CurrentTab = 'flightWise'
            $("#TxtFromDate").val("");
            $("#TxtToDate").val("");

            $("#flightTypeSectorDD").next().show();

            $("#SectorGridSec").hide();
            ////$("#SectorGridSec").hide();
            $("#FlightGridSec").show();

            ddfor_flight_sectors = true;
        } else {
            $("#flightTypeSectorDD").next().hide();
            ddfor_flight_sectors = false;
        }

        if ($(this).attr("id") == 'sectorWise') {
            CurrentTab = 'sectorWise'
            $("#TxtFromDate").val("");
            $("#TxtToDate").val("");
            $("#sectorDD").next().show();

            $("#FlightGridSec").hide();
            $("#SectorGridSec").show();
            ////$("#FlightGridSec").hide();

            ddfor_sectors = true;
        } else {
            $("#sectorDD").next().hide();
            ddfor_sectors = false;

        }

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
        if (!firstClick) {
            console.log("second btn click...");
            line_otp_overall_chart()
            otp_RegionType_chart()
            otp_metro_chart()



            if (CurrentTab == 'flightWise') {
                otp_FlightType_chart()
                console.log("Sec time clicked and should reload flight type graph");
                $("#SectorGridSec").hide();
                $("#FlightGridSec").show();
                if (FlightGrid == false) {
                    LoadFlightGrid();
                } else {
                    ReLoadFlightGrid();
                }

                FlightGrid = true;

                var FlightGridwidth = $("#FlightGrid").closest(".ui-jqgrid").parent().width();
                $("#FlightGrid").jqGrid("setGridWidth", FlightGridwidth, true);
            } else {
                $("#FlightGridSec").hide();
                console.log("Failed Sec time clicked and should reload flight type graph");
            }
            if (CurrentTab == 'sectorWise') {
                otp_SectorType_chart()
                console.log("Sec time clicked and should reload sector type graph");
                $("#FlightGridSec").hide();
                $("#SectorGridSec").show();
                if (SectorGrid == false) {
                    LoadSectorGrid();
                } else {
                    ReLoadSectorGrid();
                }

                SectorGrid = true;

                var SectorGridwidth = $("#SectorGrid").closest(".ui-jqgrid").parent().width();
                $("#SectorGrid").jqGrid("setGridWidth", SectorGridwidth, true);
            } else {
                $("#SectorGridSec").hide();
                console.log("Failed Sec time clicked and should reload sector type graph");
            }


        }
        else {
            firstClick = false;
            console.log("first btn click...");
            line_otp_overall_chart()
            otp_RegionType_chart()
            otp_metro_chart()

            if (CurrentTab == 'flightWise') {
                otp_FlightType_chart()
                console.log("Sec time clicked and should reload flight type graph");
                $("#SectorGridSec").hide();
                $("#FlightGridSec").show();
                if (FlightGrid == false) {
                    LoadFlightGrid();
                } else {
                    ReLoadFlightGrid();
                }

                FlightGrid = true;

                var FlightGridwidth = $("#FlightGrid").closest(".ui-jqgrid").parent().width();
                $("#FlightGrid").jqGrid("setGridWidth", FlightGridwidth, true);

            } else {
                $("#FlightGridSec").hide();
                console.log("Failed Sec time clicked and should reload flight type graph");
            }
            if (CurrentTab == 'sectorWise') {
                otp_SectorType_chart()
                console.log("Sec time clicked and should reload sector type graph");
                $("#FlightGridSec").hide();
                $("#SectorGridSec").show();
                if (SectorGrid == false) {
                    LoadSectorGrid();
                } else {
                    ReLoadSectorGrid();
                }

                SectorGrid = true;

                var SectorGridwidth = $("#SectorGrid").closest(".ui-jqgrid").parent().width();
                $("#SectorGrid").jqGrid("setGridWidth", SectorGridwidth, true);

            } else {
                $("#SectorGridSec").hide();
                console.log("Failed Sec time clicked and should reload sector type graph");
            }
        }
    }
    else {
        console.log("date wise")
        alert("please select From Date & To Date.. !!")
    }


});

$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        console.log("date wise")


    }
});

$("#btnClearDetails").click(function () {

    $("#overlay").show();

    {
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

        var SectorIds = $("#sectorDD").val();
        var FLTSectorIds = $("#flightTypeSectorDD").val();

        if (SectorIds) {
            if (SectorIds.length > 0) {
                $("#sectorDD").multiselect("clearSelection");
                //$("#sectorDD").multiselect('refresh');
            }
        }

        if (FLTSectorIds) {
            if (FLTSectorIds.length > 0) {
                $("#flightTypeSectorDD").multiselect("clearSelection");
                //$("#EmployeeName").multiselect('refresh');
            }
        }

    }
    $("#overlay").hide();
    SectorGrid = false;
    FlightGrid = false;
    $("#SectorGridSec").hide();
    $("#FlightGridSec").hide();

});

function otp_overall_chart() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/OTPGet_Delay_analysis_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '01/01/2021' },
            toDate: function () { return '31/01/2021' },
            ddValue: function () { return 'Custom Date Range' },
            //fromDate: function () { return $("#TxtFromDate").val(); },
            //toDate: function () { return $("#TxtToDate").val(); },
            //ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Overall OTP' },
            Sector: function () { return '' },
        },
        success: function (res) {

            console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0
            $.each(res, function (i, item) {
                if (item.Sector == 'Overall' || item.Sector == 'Loss') {
                    //delay_sum = item.OTPPercentage
                    delay_.push(parseInt(item.OTPPercentage))
                    delay_data.push([item.Sector, parseInt(item.OTPPercentage)])
                }
                if (item.Sector == 'Overall') {
                    delay_sum = item.OTPPercentage

                }
                //delay_.push(parseInt(item.OTPPercentage))
                //delay_data.push([item.Sector, parseInt(item.OTPPercentage)])
            });

            //for (var i = 0; i < delay_.length; i++) {
            //    delay_sum = delay_[0];
            //}

            console.log("delay_data", delay_sum)

            var chart = new Highcharts.Chart({
                colors: ['#33ee00', '#006622'],
                chart: {
                    renderTo: 'overalotp',
                    marginTop: 20,
                    type: 'pie',
                    backgroundColor: 'transparent',
                    events: {
                        load: function () {
                            var chart = this,
                                x = chart.plotLeft + (chart.series[0].center[0]),
                                y = chart.plotTop + (chart.series[0].center[1]),
                                box;

                            chart.pieCenter = chart.renderer.text(delay_sum + '%', x, y, true)
                                .css({
                                    'text-align': 'center',
                                    color: 'white',
                                    fontSize: '25px'
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
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    backgroundColor: "rgba(255,255,255,1)",
                    //pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}',
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>:' + this.y + '%';
                    }
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                },
                title: {
                    text: '',
                    margin: 10,
                    //y: -40,
                    //verticalAlign: 'middle',
                    style: {
                        color: '#eee'
                    },
                },
                exporting: false,
                credits: false,
                plotOptions: {
                    pie: {
                        //innerSize: '60%',
                        dataLabels: {
                            enabled: false
                        },
                        borderWidth: 0
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
                    type: 'pie',
                    showInLegend: true,
                    size: '100%',
                    innerSize: '70%',
                    data: delay_data
                }]
            });

        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });
    //$('#overalotp').highcharts({
    //    colors: ['#33ee00', '#006622'],
    //    chart: {
    //       /* type: 'pie',*/
    //        backgroundColor: 'transparent',
    //        marginTop: -100,
    //    },
    //    title: {
    //        text: '35%',
    //        y: -40,
    //        verticalAlign: 'middle',
    //        style: {
    //            color: '#eee'
    //        },
    //    },
    //    subtitle: {
    //        text: 'Over All OTP',
    //        style: {
    //            color: '#eee'
    //        },
    //    },
    //    exporting: false,
    //    credits: false,
    //    plotOptions: {
    //        pie: {
    //            dataLabels: {
    //                enabled: false
    //            },
    //            borderWidth: 0
    //        }
    //    },
    //    series: [{
    //        type: 'pie',
    //        name: 'Browser share',
    //        size: '50%',
    //        innerSize: '75%',
    //        data: [65, 35]
    //    }]
    //});
}

function line_otp_overall_chart() {



    $("#overalotp").hide();
    $("#line_chart_overalotp").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/OTPGet_Delay_analysis_Datewisechart",
        dataType: 'json',
        data: {

            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Date Wise Overall OTP' },
            Sector: function () { return '' },
        },
        success: function (res) {

            console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0
            $.each(res, function (i, item) {
                delay_.push({ 'name': item.FlightDate, 'y': parseFloat(item.OTPPercentage), 'drilldown': item.FlightDate })
                //delay_.push(parseInt(item.OTPPercentage))
                //delay_data.push([parseFloat(item.OTPPercentage)])
                delay_data.push({ 'name': item.FlightDate, 'y': parseFloat(item.OTPPercentage) })
            });

            //for (var i = 0; i < delay_.length; i++) {
            //    delay_sum += delay_[i];
            //}

            Highcharts.chart('line_chart_overalotp', {

                chart: {
                    backgroundColor: 'transparent',
                },

                title: {
                    text: '',
                },
                credits: false,
                exporting: false,
                subtitle: false,
                yAxis: {
                    title: {
                        text: 'OTP Percentage',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: 'white'
                        }
                    },
                },

                xAxis: {
                    type: 'category',
                    //accessibility: {
                    //    rangeDescription: 'Range: 2010 to 2017'
                    //}
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: 'white'
                        }
                    },
                },

                legend: false,

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        //pointStart: 2010
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    backgroundColor: "rgba(255,255,255,1)",
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                },
                series: [{
                    name: 'Date',
                    data: delay_data
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });


        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });
}

function otp_metro_chart() {

    //$(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/OTPGet_flight_type_analysis_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Metro Wise Percentage' },
            Sector: function () { return '' },
        },
        success: function (data) {

            //console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.MetroCity, 'y': parseFloat(item.OTPPercentage) })
            });

            console.log("chart data1..", data1)

            //var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            // Bar chart
            Highcharts.chart('metrochart', {
                colors: ['#FCD202', '#9A2FAE', '#FA7070', '#59C9FD', '#0289C8', '#1702C8'],
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {

                            //drilldown_count = drilldown_count + 1;
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name
                            //drilldown_val_one = e.point.name
                            SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_one", drilldown_val_two)
                            console.log("drilldown_val_one", drilldown_val_three)

                            //console.log("drill down one level", DrilldownValue = e.point.name)
                            //ReLoadOnloadWiseGrid();

                        }
                    },
                },
                title: false,
                xAxis: {

                    type: 'category',
                    title: {

                        text: 'Metro City',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: 'white'
                        },

                    }
                },
                yAxis: {
                    title: {
                        text: 'OTP Percentage',
                        style: {
                            color: 'white'
                        }

                    },
                    min: 0,
                    max: 100,
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
                        borderRadius: 10
                    },
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,1)",
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
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
                    console.log("data chart", chart.series[0].data.length)
                    console.log("data1", data1.length)

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
            console.log("in compelete...");
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function otp_RegionType_chart() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/OTPGetRegion_Delay_analysis_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Region Wise Percentage' },
            Sector: function () { return '' },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                //data1.push({ 'name': item.Region, 'y': parseFloat(item.OTPPercentage) })
                data1.push({ 'name': item.Region, 'y': parseFloat(item.OTPPercentage), 'drilldown': item.Region })
            });

            console.log("chart data1..", data1)

            var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            // Bar chart
            Highcharts.chart('regionwise', {
                colors: ['#FCD202', '#9A2FAE', '#FA7070', '#59C9FD', '#0289C8', '#1702C8'],

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
                                drilldown_val_two = e.point.name;
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "OTPDashboard/OTPGetRegionCity_Delay_analysis_chart",
                                    //url: applicationUrl + "CrewRosterReport/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {

                                        fromDate: function () { return from },
                                        toDate: function () { return to },
                                        ddValue: function () { return date_dd },
                                        GetDataFor: function () { return 'Region City Wise Percentage' },
                                        Sector: function () { return drilldown_val_two },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.CityCode, 'y': parseFloat(item.OTPPercentage) })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                //pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                                pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                                            }
                                        }
                                        chart.xAxis[0].update({
                                            title: {
                                                text: e.point.name + ' Region Port ',
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
                            if (drilldown_count >= 4) {
                                drilldown_count = 3
                            }
                            drilldown_count = drilldown_count - 1;
                            console.log("drilldown_count..", drilldown_count)

                            var chart = this;
                            if (drilldown_count == 1) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_two = ''
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: true
                                    },
                                    min: 0,
                                })
                                //$("#OnloadGridSec").hide();
                            } else if (drilldown_count == 2) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: true
                                    },
                                    min: 0,
                                })
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: true
                                    },
                                    min: 0,
                                })

                                //$("#OnloadGridSec").show();
                            } else if (drilldown_count == 3) {
                                console.log("drilldown_count..", drilldown_count)
                                //drilldown_val_four = '';
                                drilldown_val_four = '';
                                //$("#OnloadGridSec").show();
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: true
                                    },
                                    min: 0,
                                })
                            } else if (drilldown_count == 0) {
                                chart.xAxis[0].update({
                                    title: {
                                        text: 'Region',
                                        style: {
                                            color: 'white'
                                        }

                                    },
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: 'white'
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
                title: false,
                xAxis: {
                    //showEmpty: false,
                    title: {
                        text: 'Region',
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
                    //showEmpty: false,
                    min: 0,
                    title: {
                        text: 'OTP Percentage',
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
                legend: false,

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
                        //showInLegend: true,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            //style: {
                            //    "font-family": "'Open Sans', sans-serif",
                            //    "color": "#373737",
                            //    "fontSize": "20px",
                            //    "fontWeight": "bold"
                            //},
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,1)",
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
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
            console.log("data chart", chart.series[0].data.length)
            console.log("data1", data1.length)

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
            console.log("in compelete...");
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function otp_SectorType_chart() {

    $.ajax({

        type: 'POST',
        url: applicationUrl + "OTPDashboard/Get_SectorWise_bubble_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Sector Wise Percentage' },
            Sector: function () { return $("#sectorDD").val(); },
            //Sector: function () { return 'DEL-BOM,BOM-PNQ' },
        },
        success: function (data) {

            console.log("bubble chart data", data)
            console.log("sectorDD", $("#sectorDD").val())


            var bubble_data = [];

            $.each(data, function (i, item) {
                var x_range = item.OTPPercentage;
                //bubble_data.push({ 'x': parseFloat(item.OTPPercentage), 'y': parseFloat(item.OTPPercentage), 'name': item.Sector })
                bubble_data.push({ 'x': parseFloat(item.SectorCount), 'y': parseFloat(item.OTPPercentage), 'z': parseFloat(item.OTPPercentage), 'name': item.Sector })
            });

            console.log("bubble_data", bubble_data)

            $("#SectorGridSec").show();
            var SectorGridwidth = $("#SectorGrid").closest(".ui-jqgrid").parent().width();
            $("#SectorGrid").jqGrid("setGridWidth", SectorGridwidth, true);


            ReLoadSectorGrid();

            Highcharts.chart('sectorchart', {

                chart: {
                    type: 'bubble',
                    backgroundColor: 'transparent',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                title: false,
                subtitle: false,
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
                    }
                },

                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Sector No',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: 'white'
                        }

                    },
                    accessibility: {
                        rangeDescription: 'Range: 0 to 100 %.'
                    }
                },

                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'OTP Percentage',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: 'white'
                        },
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 50,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '',
                            x: -10
                        },
                        zIndex: 3
                    }],
                    accessibility: {
                        rangeDescription: 'Range: 0 to 100.'
                    }
                },

                tooltip: {
                    useHTML: true,
                    //backgroundColor: "rgba(255,255,255,1)",
                    headerFormat: '<table>',
                    //pointFormat: '<tr><th>OTP : </th><td>{point.y}%</td></tr><tr><th>Sector Count : </th><td>{point.x}</td></tr>',
                    //pointFormat: '<tr><th colspan="1"><h2><span class="xaxis-label1">' + (this.value) + '</span></h2></th></tr>' +
                    pointFormat: '<tr><th colspan="1" ><h2 class="xaxis-label1">{point.name}</h2></th></tr>' +
                    //pointFormat: '<tr><th colspan="1"><h2><span class="xaxis-label1">' + (point.name) + '</span></h2></th></tr>' +
                                                   '<tr><th>OTP:</th><td>{point.y}%</td></tr>' +
                                                   '<tr><th>Sector Count:</th><td>{point.x}</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true,


                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },

                series: [{
                    data: bubble_data
                }]

            });

        },
        complete: function () {
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });







}
console.log("flightTypeSectorDD1", $("#flightTypeSectorDD").val())

function otp_FlightType_chart() {

    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/FlightTypeSectorWise_bubble_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Flight Sector Wise Percentage' },
            FSector: function () { return $("#flightTypeSectorDD").val(); },
            //Sector: function () { return $("#flightTypeSectorDD").val(); },
        },
        success: function (data) {

            console.log("bubble chart data", data)
            console.log("flightTypeSectorDD", $("#flightTypeSectorDD").val())
            var bubble_data = [];

            $.each(data, function (i, item) {
                var x_range = item.OTPPercentage;
                bubble_data.push({ 'x': parseFloat(item.FLTSectorCount), 'y': parseFloat(item.OTPPercentage), 'z': parseFloat(item.OTPPercentage), 'name': item.FLTSector })
            });

            console.log("Flight type bubble_data", bubble_data)

            $("#FlightGridSec").show();
            var FlightGridwidth = $("#FlightGrid").closest(".ui-jqgrid").parent().width();
            $("#FlightGrid").jqGrid("setGridWidth", FlightGridwidth, true);


            ReLoadFlightGrid();

            Highcharts.chart('flightchart', {

                chart: {
                    type: 'bubble',
                    backgroundColor: 'transparent',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                title: false,
                subtitle: false,
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
                    }
                },

                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Flight No with Sector',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: 'white'
                        }

                    },
                    accessibility: {
                        rangeDescription: 'Range: 0 to 100 %.'
                    }
                },

                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'OTP Percentage',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: 'white'
                        },
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 50,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '',
                            x: -10
                        },
                        zIndex: 3
                    }],
                    accessibility: {
                        rangeDescription: 'Range: 0 to 100.'
                    }
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    //backgroundColor: "rgba(255,255,255,1)",
                    //pointFormat: '<tr><th>OTP : </th><td>{point.y}%</td></tr><tr><th>Sector Count : </th><td>{point.x}</td></tr>',
                    pointFormat: '<tr><th colspan="1" ><h2 class="xaxis-label1">{point.name}</h2></th></tr>' +
                    //pointFormat: '<tr><th colspan="1"><h2>{point.name}</h2></th></tr>' +
                                '<tr><th>OTP:</th><td>{point.y}%</td></tr>' +
                                '<tr><th>Sector Count:</th><td>{point.x}</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },

                series: [{
                    data: bubble_data
                }]

            });

        },
        complete: function () {
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });


}

function GetSector() {
    date_dd = $("#sltDateRange").val();
    if (date_dd == 'Custom Date') {
        from = $("#TxtFromDate").val();
        to = $("#TxtFromDate").val();
    }
    else {
        from = $("#TxtFromDate").val();
        to = $("#TxtToDate").val();
    }

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/Get_SectorListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Sector' }
        },
        success: function (data) {
            console.log("GetSector", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#sectorDD").multiselect('destroy');
            $('#sectorDD').html('');

            for (var j = 0; j < type.length; j++) {
                $('#sectorDD').append('<option value="' + type[j].SectorName + '">' + type[j].SectorName + '</option>');
            }

            $('#sectorDD').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Sector',
                onChange: function () {
                    console.log('EmployeeName lib chnage', $("#sectorDD").val());
                },
                onSelectAll: function () {
                    //$("#EmployeeName").multiselect("disable");
                },
                onDeselectAll: function () {
                    //$("#EmployeeName").multiselect("enable");
                }
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function GetFlightTypeSector() {

    date_dd = $("#sltDateRange").val();

    if (date_dd == 'Custom Date') {
        from = $("#TxtFromDate").val();
        to = $("#TxtFromDate").val();
    }
    else {
        from = $("#TxtFromDate").val();
        to = $("#TxtToDate").val();
    }

    $.ajax({
        type: 'POST',
        url: applicationUrl + "OTPDashboard/Get_FlightSectorListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'FLTSector' },
        },
        success: function (data) {
            console.log("GetFlightTypeSector", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#flightTypeSectorDD").multiselect('destroy');
            $('#flightTypeSectorDD').html('');

            for (var j = 0; j < type.length; j++) {
                $('#flightTypeSectorDD').append('<option value="' + type[j].flight_Type_Sector + '">' + type[j].flight_Type_Sector + '</option>');
            }

            $('#flightTypeSectorDD').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Flight Sector',
                onChange: function () {
                    console.log('EmployeeName lib chnage', $("#flightTypeSectorDD").val());
                },
                onSelectAll: function () {
                    //$("#EmployeeName").multiselect("disable");
                },
                onDeselectAll: function () {
                    //$("#EmployeeName").multiselect("enable");
                }
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function LoadSectorGrid() {

    $("#SectorGrid").jqGrid({
        url: applicationUrl + "OTPDashboard/Get_SectorDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Sector Wise Percentage' },
            Sector: function () { return $("#sectorDD").val(); },
            //Sector: function () { return 'DEL-BOM,BOM-PNQ' },

        },
        colNames: ['Sector', 'SectorCount'
            //, 'FromcityCode', 'ToCityCode'
            , 'OTPPercentage'],
        colModel: [
            { hidden: false, name: 'Sector', index: 'Sector', align: "center" },
            { hidden: false, name: 'SectorCount', index: 'SectorCount', align: "center" },
            //{ hidden: false, name: 'FromcityCode', index: 'FromcityCode', align: "center" },
            //{ hidden: false, name: 'ToCityCode', index: 'ToCityCode', align: "center" },
            { hidden: false, name: 'OTPPercentage', index: 'OTPPercentage', align: "center" },

        ],
        pager: jQuery('#pagerSectorGrid'),
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
        sortname: 'Sector',
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
    }).navGrid('#pagerSectorGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#SectorGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { searchOperators: true });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadSectorGrid() {
    console.log("on reload...");
    $("#SectorGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}

function LoadFlightGrid() {

    $("#FlightGrid").jqGrid({
        url: applicationUrl + "OTPDashboard/Get_FlightDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {

            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return date_dd },
            GetDataFor: function () { return 'Flight Sector Wise Percentage' },
            FSector: function () { return $("#flightTypeSectorDD").val(); },
            //Sector: function () { return $("#flightTypeSectorDD").val(); },


        },
        colNames: ['FLTSector', 'FLTSectorCount', 'OTPPercentage'],
        colModel: [
            { hidden: false, name: 'FLTSector', index: 'FLTSector', align: "center" },
            { hidden: false, name: 'FLTSectorCount', index: 'FLTSectorCount', align: "center" },

            { hidden: false, name: 'OTPPercentage', index: 'OTPPercentage', align: "center" },

        ],
        pager: jQuery('#pagerFlightGrid'),
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
        sortname: 'FLTSector',
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
    }).navGrid('#pagerFlightGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#FlightGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { searchOperators: true });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadFlightGrid() {
    console.log("on reload...");
    $("#FlightGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}