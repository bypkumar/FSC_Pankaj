
var applicationUrl;
var date_dd = 'Current Day';
var from = '', to = '';

$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();
    $("#daywiseblockhours").hide();
    $("#daywiseblockhoursForB737").hide();
    $("#daywiseblockhoursForB737F").hide();
    $("#daywiseblockhoursForQ400").hide();

    // On Chnages Events 
    $("#TxtToDate").change(function () {
        console.log("on date chage");
        //GetFlightTypeSector();
        //GetSector();
    });

    $("#TxtFromDate").change(function () {
        console.log("on date chage");
        //GetFlightTypeSector();
        //GetSector();
    });
    //plannedVsActual_chart()
    //daywiseblockhours_chart()
    
});


$("#tabs")
    .tabs()
    .on("click", '[role="tab"]', function () {
        $(this).closest("ul") // The current UL
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
        //plannedVsActual_chart()
        daywiseblockhours_chart()
        daywiseblockhours_chartForB737()
        daywiseblockhours_chartForB737F()
        daywiseblockhours_chartForQ400()
        //ReLoadCrewReportGrid();

    } else {
        firstClick = false;
        console.log("first btn click...");
        //plannedVsActual_chart()
        daywiseblockhours_chart()
        daywiseblockhours_chartForB737()
        daywiseblockhours_chartForB737F()
        daywiseblockhours_chartForQ400()
        //LoadCrewReportGrid()
    }
});

function plannedVsActual_chart() {

    $.ajax({
        type: 'POST',
        url: applicationUrl + "PlannedVsActualDashboard/PVAGet_PannedVsActual_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '01/01/2021' },
            toDate: function () { return '31/01/2021' },
            ddValue: function () { return 'Custom Date Range' },
            //fromDate: function () { return $("#TxtFromDate").val(); },
            //toDate: function () { return $("#TxtToDate").val(); },
            //ddValue: function () { return $("#sltDateRange").val(); },
            Mod: function () { return '1' },
        },
        success: function (res) {

            //console.log("delay analysis res", res)

            var planned = [], actual = [], categories = [],planned_sum = 0,actual_sum = 0, chart_data = []

            chart_data.push({ name: 'Planned', y: 0 })
            var count_v = 0
            $.each(res, function (i, item) {

                if (count_v < 10) {
                    //chart_data.push({ name: item.Time, y: item.PlannedFlightTime  })
                    //chart_data.push({ name: item.Time, y: item.ActualFlightTime })
                    chart_data.push({ name: item.Time.toString(), y: Math.floor(parseInt(item.PlannedFlightTime1) / 60) })
                    chart_data.push({ name: item.Time.toString(), y: Math.floor(parseInt(item.ActualFlightTime1) / 60) })

                    planned.push(Math.floor(parseInt(item.PlannedFlightTime1) / 60))
                    actual.push(Math.floor(parseInt(item.ActualFlightTime1) / 60))
                    categories.push([item.Time])
                }
                count_v++;
               
            });

            for (var i = 0; i < planned.length; i++) {
                planned_sum += planned[i];
            }

            for (var i = 0; i < actual.length; i++) {
                actual_sum += actual[i];
            }

            chart_data[0].y = planned_sum;
            chart_data.push({ name: 'Actual', y: actual_sum })

            console.log("planned_sum", planned_sum)
            console.log("actual_sum", actual_sum)
            console.log("planned", planned)
            console.log("actual", actual)
            
            console.log("categories", categories)
            console.log("chart_data", chart_data)

            //chart_data.slice(0)

            Highcharts.chart('plannedVsActual', {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent'
                },
                exporting: false,
                credits: false,
                text: 'Planned Vs Actual Block Hours Dashboard',
                xAxis: {
                    categories: categories,
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },

                    title: {
                        text: 'Hours',
                        style: {
                            color: 'white'
                        }

                    },

                },
                credits: {
                    enabled: false
                },
                legend: {
                    //enabled: true,
                    itemStyle: {
                        color: '#fff'
                    }
                },
                series: [{
                    name: 'Planned',
                    data: planned
                }, {
                    name: 'Actual',
                    data: actual
                }
                ]
            });


         

        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });
}


function daywiseblockhours_chart() {


    $("#plannedVsActual").hide();
    $("#daywiseblockhours").show();
    //$("#tab_plannedVsActual").text('Day wise block hours');
    

    $.ajax({
        type: 'POST',
        url: applicationUrl + "PlannedVsActualDashboard/PVAGet_DayWiseBlockHours_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            Mod: function () { return '2' },
        },
        success: function (res) {

            ////var delay_data = [], delay_ = [], delay_sum = 0
            ////$.each(res, function (i, item) {
            ////    delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
            ////    delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })
            ////});

            var planned = [], actual = [], categories = [], planned_sum = 0, actual_sum = 0, chart_data = []

            $.each(res, function (i, item) {
                //delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
                //delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })

                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })

                //delay_data.push({ 'name': item.FlightDate, 'y': parseFloat(item.OTPPercentage) })
                planned.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                //planned.push(Math.floor(parseInt(item.PlannedFlightTime) / 60))
                actual.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })
                //actual.push(Math.floor(parseInt(item.ActualFlightTime) / 60))
                categories.push([item.FlightDate])
            });

            console.log("categories", categories)
            console.log("chart_data", chart_data)
            


            Highcharts.chart('daywiseblockhours', {
                chart: {
                    backgroundColor: 'transparent',
                },
                colors: ['#9633f4', '#ec3de6'],
                title: false,
                credits: false,
                exporting: false,
                subtitle: false,
                tooltip: {
                   
                    shared: true
                },
                yAxis: {
                    title: {
                        text: 'Hours',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: 'white'
                        }
                    },
                },

                xAxis: {
                    type: 'category',
                    categories: categories,
                    //accessibility: {
                    //    rangeDescription: 'Range: 2010 to 2017'
                    //}
                    min: 0,
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        enabled: true,
                        //format: '{value}',
                        style: {
                            color: 'white'
                        }
                        //,
                        //enabled: true
                        
                    },
                },

                legend: {
                    //layout: 'vertical',
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: {
                        color: '#eee'
                    },
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: true
                        },
                        //pointStart: 2010
                    }
                },

                series: 
                [{
                    name: 'Planned',
                    data: planned
                }, {
                    name: 'Actual',
                    data: actual
                }
                ],
                //[{
                //    name: 'OTP',
                //    data: delay_data
                //}],

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
function daywiseblockhours_chartForB737() {


    $("#plannedVsActual").hide();
    $("#daywiseblockhours").show();
    $("#daywiseblockhoursForB737").show();
    //$("#tab_plannedVsActual").text('Day wise block hours');


    $.ajax({
        type: 'POST',
        url: applicationUrl + "PlannedVsActualDashboard/PVAGet_DayWiseBlockHours_chartForB737",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            Mod: function () { return '4' },
            AcCode: function () { return '1' },
        },
        success: function (res) {

            ////var delay_data = [], delay_ = [], delay_sum = 0
            ////$.each(res, function (i, item) {
            ////    delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
            ////    delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })
            ////});

            var planned = [], actual = [], categories = [], planned_sum = 0, actual_sum = 0, chart_data = []

            $.each(res, function (i, item) {
                //delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
                //delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })

                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })

                //delay_data.push({ 'name': item.FlightDate, 'y': parseFloat(item.OTPPercentage) })
                planned.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                //planned.push(Math.floor(parseInt(item.PlannedFlightTime) / 60))
                actual.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })
                //actual.push(Math.floor(parseInt(item.ActualFlightTime) / 60))
                categories.push([item.FlightDate])
            });

            console.log("categories", categories)
            console.log("chart_data", chart_data)



            Highcharts.chart('daywiseblockhoursForB737', {
                chart: {
                    backgroundColor: 'transparent',
                },
                colors: ['#9633f4', '#ec3de6'],
                title: false,
                credits: false,
                exporting: false,
                subtitle: false,
                tooltip: {

                    shared: true
                },
                yAxis: {
                    title: {
                        text: 'Hours',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: 'white'
                        }
                    },
                },

                xAxis: {
                    type: 'category',
                    categories: categories,
                    //accessibility: {
                    //    rangeDescription: 'Range: 2010 to 2017'
                    //}
                    min: 0,
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        enabled: true,
                        //format: '{value}',
                        style: {
                            color: 'white'
                        }
                        //,
                        //enabled: true

                    },
                },

                legend: {
                    //layout: 'vertical',
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: {
                        color: '#eee'
                    },
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: true
                        },
                        //pointStart: 2010
                    }
                },

                series:
                [{
                    name: 'Planned',
                    data: planned
                }, {
                    name: 'Actual',
                    data: actual
                }
                ],
                //[{
                //    name: 'OTP',
                //    data: delay_data
                //}],

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
function daywiseblockhours_chartForB737F() {


    $("#plannedVsActual").hide();
    $("#daywiseblockhours").show();
    $("#daywiseblockhoursForB737F").show();
    //$("#tab_plannedVsActual").text('Day wise block hours');


    $.ajax({
        type: 'POST',
        url: applicationUrl + "PlannedVsActualDashboard/PVAGet_DayWiseBlockHours_chartForB737F",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            Mod: function () { return '4' },
            AcCode: function () { return '2' },
        },
        success: function (res) {

            ////var delay_data = [], delay_ = [], delay_sum = 0
            ////$.each(res, function (i, item) {
            ////    delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
            ////    delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })
            ////});

            var planned = [], actual = [], categories = [], planned_sum = 0, actual_sum = 0, chart_data = []

            $.each(res, function (i, item) {
                //delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
                //delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })

                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })

                //delay_data.push({ 'name': item.FlightDate, 'y': parseFloat(item.OTPPercentage) })
                planned.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                //planned.push(Math.floor(parseInt(item.PlannedFlightTime) / 60))
                actual.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })
                //actual.push(Math.floor(parseInt(item.ActualFlightTime) / 60))
                categories.push([item.FlightDate])
            });

            console.log("categories", categories)
            console.log("chart_data", chart_data)



            Highcharts.chart('daywiseblockhoursForB737F', {
                chart: {
                    backgroundColor: 'transparent',
                },
                colors: ['#9633f4', '#ec3de6'],
                title: false,
                credits: false,
                exporting: false,
                subtitle: false,
                tooltip: {

                    shared: true
                },
                yAxis: {
                    title: {
                        text: 'Hours',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: 'white'
                        }
                    },
                },

                xAxis: {
                    type: 'category',
                    categories: categories,
                    //accessibility: {
                    //    rangeDescription: 'Range: 2010 to 2017'
                    //}
                    min: 0,
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        enabled: true,
                        //format: '{value}',
                        style: {
                            color: 'white'
                        }
                        //,
                        //enabled: true

                    },
                },

                legend: {
                    //layout: 'vertical',
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: {
                        color: '#eee'
                    },
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: true
                        },
                        //pointStart: 2010
                    }
                },

                series:
                [{
                    name: 'Planned',
                    data: planned
                }, {
                    name: 'Actual',
                    data: actual
                }
                ],
                //[{
                //    name: 'OTP',
                //    data: delay_data
                //}],

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
function daywiseblockhours_chartForQ400() {


    $("#plannedVsActual").hide();
    $("#daywiseblockhours").show();
    $("#daywiseblockhoursForQ400").show();
    //$("#tab_plannedVsActual").text('Day wise block hours');


    $.ajax({
        type: 'POST',
        url: applicationUrl + "PlannedVsActualDashboard/PVAGet_DayWiseBlockHours_chartForQ400",
        dataType: 'json',
        data: {
            fromDate: function () { return from },
            toDate: function () { return to },
            ddValue: function () { return $("#sltDateRange").val(); },
            Mod: function () { return '4' },
            AcCode: function () { return '3' },
        },
        success: function (res) {

            ////var delay_data = [], delay_ = [], delay_sum = 0
            ////$.each(res, function (i, item) {
            ////    delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
            ////    delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })
            ////});

            var planned = [], actual = [], categories = [], planned_sum = 0, actual_sum = 0, chart_data = []

            $.each(res, function (i, item) {
                //delay_.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)), 'drilldown': item.Time.toString() })
                //delay_data.push({ 'name': item.Time.toString(), 'y': parseFloat(Math.floor(parseInt(item.PlannedFlightTime1) / 60)) })

                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                chart_data.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })

                //delay_data.push({ 'name': item.FlightDate, 'y': parseFloat(item.OTPPercentage) })
                planned.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.PlannedFlightTime) / 60) })
                //planned.push(Math.floor(parseInt(item.PlannedFlightTime) / 60))
                actual.push({ 'name': item.FlightDate, 'y': Math.floor(parseInt(item.ActualFlightTime) / 60) })
                //actual.push(Math.floor(parseInt(item.ActualFlightTime) / 60))
                categories.push([item.FlightDate])
            });

            console.log("categories", categories)
            console.log("chart_data", chart_data)



            Highcharts.chart('daywiseblockhoursForQ400', {
                chart: {
                    backgroundColor: 'transparent',
                },
                colors: ['#9633f4', '#ec3de6'],
                title: false,
                credits: false,
                exporting: false,
                subtitle: false,
                tooltip: {

                    shared: true
                },
                yAxis: {
                    title: {
                        text: 'Hours',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        style: {
                            color: 'white'
                        }
                    },
                },

                xAxis: {
                    type: 'category',
                    categories: categories,
                    //accessibility: {
                    //    rangeDescription: 'Range: 2010 to 2017'
                    //}
                    min: 0,
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white'
                        }

                    },
                    labels: {
                        enabled: true,
                        //format: '{value}',
                        style: {
                            color: 'white'
                        }
                        //,
                        //enabled: true

                    },
                },

                legend: {
                    //layout: 'vertical',
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: {
                        color: '#eee'
                    },
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: true
                        },
                        //pointStart: 2010
                    }
                },

                series:
                [{
                    name: 'Planned',
                    data: planned
                }, {
                    name: 'Actual',
                    data: actual
                }
                ],
                //[{
                //    name: 'OTP',
                //    data: delay_data
                //}],

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


//function daywiseblockhours_chart() {
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "PlannedVsActualDashboard/PVAGet_DayWiseBlockHours_chart",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return $("#TxtFromDate").val(); },
//            toDate: function () { return $("#TxtToDate").val(); },
//            ddValue: function () { return $("#sltDateRange").val(); },
//            Mod: function () { return '1' },
//        },
//        success: function (res) {
//            //console.log("delay analysis res", res)
//            var planned = [], actual = [], categories = [],planned_sum = 0,actual_sum = 0, chart_data = []
//            chart_data.push({ name: 'Planned', y: 0 })
//            var count_v = 0
//            $.each(res, function (i, item) {
//                if (count_v < 10) {
//                    //chart_data.push({ name: item.Time, y: item.PlannedFlightTime  })
//                    //chart_data.push({ name: item.Time, y: item.ActualFlightTime })
//                    chart_data.push({ name: item.Time.toString(), y: Math.floor(parseInt(item.PlannedFlightTime1) / 60) })
//                    chart_data.push({ name: item.Time.toString(), y: Math.floor(parseInt(item.ActualFlightTime1) / 60) })
//                    planned.push(Math.floor(parseInt(item.PlannedFlightTime1) / 60))
//                    actual.push(Math.floor(parseInt(item.ActualFlightTime1) / 60))
//                    categories.push([item.Time])
//                }
//                count_v++;             
//            });
//            for (var i = 0; i < planned.length; i++) {
//                planned_sum += planned[i];
//            }
//            for (var i = 0; i < actual.length; i++) {
//                actual_sum += actual[i];
//            }
//            chart_data[0].y = planned_sum;
//            chart_data.push({ name: 'Actual', y: actual_sum })
//            console.log("planned_sum", planned_sum)
//            console.log("actual_sum", actual_sum)
//            console.log("planned", planned)
//            console.log("actual", actual)          
//            console.log("categories", categories)
//            console.log("chart_data", chart_data)
//            //chart_data.slice(0)
//            Highcharts.chart('daywiseblockhours', {
//                chart: {
//                    type: 'column',
//                    backgroundColor: 'transparent'
//                },
//                exporting: false,
//                credits: false,
//                text: 'Day Wise Block Hours',
//                xAxis: {
//                    categories: categories,
//                    labels: {
//                        style: {
//                            color: '#fff'
//                        }
//                    }
//                },
//                yAxis: {
//                    labels: {
//                        style: {
//                            color: '#fff'
//                        }
//                    },
//                    title: {
//                        text: ''
//                    }
//                },
//                legend: {
//                    //enabled: true,
//                    itemStyle: {
//                        color: '#fff'
//                    }
//                },
//                credits: {
//                    enabled: false
//                },
//                series: [{
//                    name: 'Planned',
//                    data: planned
//                }, {
//                    name: 'Actual',
//                    data: actual
//                }
//                ]
//            });
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Delay Analysis data : ' + ex);
//        }
//    });
//}