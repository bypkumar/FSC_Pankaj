var applicationUrl;
var from = '', to = '';
var date_dd = 'Current Day';

$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();

    opt_load_factor()
    
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
        opt_load_factor()
        //ReLoadCrewReportGrid();

    } else {
        firstClick = false;
        console.log("first btn click...");
        opt_load_factor()
        //LoadCrewReportGrid()
    }
});

function opt_load_factor() {
    Highcharts.chart('Load_Factor',
        {
            chart: {
                //marginTop: 100,
                type: 'gauge',
                backgroundColor: 'transparent',
                alignTicks: false,
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: false,
            exporting: false,
            credits: false,

            pane: {
                startAngle: -120,
                endAngle: 120,
                size: 270,                         
                //center: ['25%', '145%'],                       
                background: {
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    color:'white',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }

            },

            yAxis: [{
                min: 0,
                max: 160,
                lineColor: '#DDDF0D',
                tickColor: '#933',
                minorTickColor: '#933',   
                offset: -25,
                lineWidth: -10,
                labels: {
                    distance: -15,
                    style: {
                        color: 'white'
                    },
                    rotation: 'auto'
                },
                tickLength: 5,
                minorTickLength: 5,
                endOnTick: false
            }, {
                min: 0,
                max: 240,
                tickPosition: 'outside',
                lineColor: '#339',
                lineWidth: 2,
                color: "white",
                minorTickPosition: 'outside',
                tickColor: '#339',
                minorTickColor: '#339',
                tickLength: 5,
                minorTickLength: 5,
                labels: {
                    distance: 10,
                    style: {
                        color: 'white'
                    },
                    rotation: 'auto'
                },
                offset: -20,
                endOnTick: false
            }],

            series: [{
                name: 'Speed',
                data: [80],
                dial: {
                    backgroundColor: 'transparent',
                    color:'white'
                },
                //dataLabels: {
                //    formatter: function () {
                //        var kmh = this.y,
                //            mph = Math.round(kmh * 0.621);
                //        return '<span style="color:#933">' + kmh + ' km/h</span><br/>' +
                //            '<span style="color:#339">' + mph + ' mph</span>';
                //    },
                //    backgroundColor: {
                //        linearGradient: {
                //            x1: 0,
                //            y1: 0,
                //            x2: 0,
                //            y2: 1
                //        },
                //        stops: [
                //            [0, '#DDD'],
                //            [1, '#FFF']
                //        ]
                //    }
                //},
                //tooltip: {
                //    valueSuffix: ' km/h'
                //}
            }]

        },
        // Add some life
        function (chart) {
            setInterval(function () {
                if (chart.axes) { // not destroyed
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 20);

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }

                    point.update(newVal);
                }
            }, 3000);

        });

}
