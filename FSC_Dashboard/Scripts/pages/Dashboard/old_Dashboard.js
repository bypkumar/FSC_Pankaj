
var applicationUrl;

$(document).ready(function (event) {
    applicationUrl = $("#applicationPath").val();


    flight_section_DomasticDepart_chart();
    //flight_section_InternationDepart_chart();
    flight_type_analysis_chart();
    flight_AircraftUtilization_chart();

    // otp charts
    otp_overall_chart()
    otp_SectorType_chart()
    otp_metro_chart()
    opt_load_factor()
    disruption_chart()
    delay_analysis_chart()
    plannedVsActual_chart()
    
});


// Flifgt Section Charts
function flight_section_DomasticDepart_chart() {

    var domastic_gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor: 'transparent',
        },

        title: null,

        pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:'#4efe61',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [100, '#2c40af'], // green
                [150, '#2c40af'], // yellow
                [200, '#2c40af'] // red
            ],           
            title: {
                y: -90
            },     
            minorTickColor: '#ffffff',
            offset: -53,
            lineWidth: -10,
            labels: {
                distance: -15,
                style: {
                    color: 'white'
                },
                //rotation: 'auto'
            },
            tickLength: 7,
            minorTickLength: 5,
            endOnTick: true
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: -20,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };
    var International_gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor: 'transparent',
        },

        title: null,

        pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#4efe61',                
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },
        yAxis: {
            stops: [
                [50, '#2c40af'], // Blue
                [100, '#2c40af'], // yellow
                [200, '#2c40af'] // red
            ],
            title: {
                y: -90
            },
            minorTickColor: '#ffffff',
            offset: -55,
            lineWidth: -10,
            labels: {
                distance: -15,
                style: {
                    color: 'white'
                },
                rotation: 'auto'
            },
            tickLength: 7,
            minorTickLength: 5,
            endOnTick: true
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: -20,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    var Domastic_chartSpeed, Domastic_chartMaxVal = 0,Domastic_chartData = [];
    var international_chartSpeed, international_chartMaxVal = 0, international_chartData = [];

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_Flight_International_Domastic_Departs",
        dataType: 'json',
        data: {
            fromDate: function () { return '06/22/2021' },
            toDate: function () { return '06/22/2021' },
            ddValue: function () { return 'Custom Date Range' },
        },
        success: function (result) {
            Domastic_chartData = []
            international_chartData = []
            //console.log("ajax result", result.result);

            Domastic_chartMaxVal = result.result.Domestic_Flight;
            Domastic_chartData.push(parseInt(result.result.Domestic_Flight_Departure))

            international_chartMaxVal = result.result.InterNational_Flight;
            international_chartData.push(parseInt(result.result.International_FlightDeparture))

            //console.log("inter chartData", international_chartData)

            // Domastic gauge
            Domastic_chartSpeed = Highcharts.chart('gauge_DomasticDepart', Highcharts.merge(domastic_gaugeOptions, {

                yAxis: {
                    min: 0,
                    max: Domastic_chartMaxVal,
                    title: {
                        style: {
                            color: '#eee',
                            fontSize:'18px',
                        },
                        margin: 50,
                        text: 'Domastic Departure'
                    }
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: 'Domastic Departure',
                    data: Domastic_chartData,
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px;color:rgb(255,255,255,1)">{y}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4;color:"white""></span>' +
                            '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }]

            }));

            // International gauge
            international_chartSpeed = Highcharts.chart('gauge_InternationalDepart', Highcharts.merge(International_gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: international_chartMaxVal,
                    title: {
                        style: {
                            color: '#eee',
                            fontSize: '18px',
                        },
                        text: 'Internation Departure'
                    }
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: 'Internation Departure',
                    data: international_chartData,
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px;color:rgb(255,255,255,1)">{y}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4;color:rgb(255,255,255,1)"></span>' +
                            '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' '
                    }
                }]

            }));

        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

    // Bring life to the dials
    setInterval(function () {

        $.ajax({
            type: 'POST',
            url: applicationUrl + "Dashboard/Get_Flight_International_Domastic_Departs",
            dataType: 'json',
            data: {
                fromDate: function () { return '06/22/2021' },
                toDate: function () { return '06/22/2021' },
                ddValue: function () { return 'Custom Date Range' },
            },
            success: function (result) {
                Domastic_chartData = []
                international_chartData = []
                //console.log("ajax result", result.result);

                Domastic_chartMaxVal = result.result.Domestic_Flight;
                Domastic_chartData.push(parseInt(result.result.Domestic_Flight_Departure))

                international_chartMaxVal = result.result.InterNational_Flight;
                international_chartData.push(parseInt(result.result.International_FlightDeparture))

                // Domastic
                Domastic_chartSpeed.yAxis[0].update({
                    max: Domastic_chartMaxVal,
                })

                //console.log("Domestic_Flight_Departure chartData", Domastic_chartData)                   
                var point,
                    newVal,
                    inc;

                if (Domastic_chartSpeed) {
                    point = Domastic_chartSpeed.series[0].points[0];
                    y = Domastic_chartSpeed.yAxis[0].max;
                    inc = Math.round((Domastic_chartData - 0.5) * 100);
                    newVal = point.y + inc;

                    if (newVal < 0 || newVal > Domastic_chartMaxVal) {
                        newVal = point.y - inc;
                    }                  
                    point.update(newVal);                
                }

                // international
                international_chartSpeed.yAxis[0].update({
                    max: international_chartMaxVal,
                })
                console.log("international_chartData chartData", international_chartData)

                var in_point,
                    in_newVal,
                    in_inc;

                if (Domastic_chartSpeed) {
                    in_point = Domastic_chartSpeed.series[0].points[0];
                    y = Domastic_chartSpeed.yAxis[0].max;
                    in_inc = Math.round((Domastic_chartData - 0.5) * 100);
                    in_newVal = in_point.y + in_inc;

                    if (in_newVal < 0 || in_newVal > Domastic_chartMaxVal) {
                        in_newVal = in_point.y - in_inc;
                    }
                    in_point.update(in_newVal);
                }

            },
            error: function (ex) {
                alert('Failed to retrieve Sector : ' + ex);
            }
        });
    }, 115000);



}

function flight_section_InternationDepart_chart() {

    var gaugeOptions = {
        chart: {
            type: 'solidgauge',
           backgroundColor: 'transparent',
        },

        title: null,

        pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                //backgroundColor:                   
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            title: {
                y: -90
            },
            minorTickColor: '#933',
            offset: -55,
            lineWidth: -10,
            labels: {
                distance: -15,
                style: {
                    color: 'white'
                },
                rotation: 'auto'
            },
            tickLength: 0,
            minorTickLength: 0,
            endOnTick: false
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: -20,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    var chartSpeed = Highcharts.chart('gauge_InternationalDepart', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                style: {
                    color: '#eee'
                },
                text: 'Internation Departure'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Internation Departure',
            data: [80],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px;color:rgb(255,255,255,1)">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4;color:rgb(255,255,255,1)"></span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' '
            }
        }]

    }));
  

    // Bring life to the dials
    setInterval(function () {
        // Speed
        var point,
            newVal,
            inc;

        if (chartSpeed) {
            point = chartSpeed.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }
       
    }, 2000);

}

function flight_type_analysis_chart() {

    
    //$(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_flight_type_analysis_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '22/06/2021' },
            toDate: function () { return '22/06/2021' },
            ddValue: function () { return 'Custom Date Range' },
        },
        success: function (data) {

            //console.log("load chart data..", data)

            var data1 = []
            var categories = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.FlightType, 'y': parseFloat(item.FlightCount), 'drilldown': item.FlightType })
                if (item.FlightType == 'Commercial') {
                    categories.push('Comm')
                } else if (item.FlightType == 'NonCommercial') {
                    categories.push('N-Comm')
                } else if (item.FlightType == 'FREIGHTER') {
                    categories.push('FRE')
                } else if (item.FlightType == 'Charter') {
                    categories.push('Char')
                }
                
            });

            //console.log("chart data1..", data1)

            //var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            // Bar chart
            Highcharts.chart('bar_flightTypeAnlysis', {
                chart: {
                    type: 'column',
                    //styledMode: false,
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
                title: {
                    text: 'Flight Type Analysis',
                    margin: 10,
                    style: {
                        color: '#eee'
                    },
                },
                xAxis: {
                    //type: 'category',
                    categories: categories,
                    style: {
                        "font-family": "'Open Sans', sans-serif",
                        "color": "#373737",
                        "fontSize": "16px",
                        "fontWeight": "bold"
                    }
                    //itemStyle: { 'font-size': '30px' },
                    //style: {
                    //    color: 'red'
                    //},
                    //labels: {
                    //    style: {
                    //        color: 'red'
                    //    }
                    //}
                },
                yAxis: {
                    min: 0,
                    //max: 100,
                    //    plotLines: [{
                    //        value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //        color: '#ff0000',
                    //dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: ''
                    }

                },
                legend: false,
                subtitle: {
                    text: ''
                },             
                plotOptions: {
                    column: {
                        borderRadius: 5
                    },
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            style: {
                                color: 'white'
                            },
                            format: '{point.name}: {point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
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
                credits:false,                
                exporting:false,              

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


function flight_AircraftUtilization_chart() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_Aircraft_Utilization_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '2021/06/22' },
            toDate: function () { return '2021/06/22' },
            ddValue: function () { return 'Custom Date Range' },
            GetDataFor: function () { return 'F' },
            ACName: function () { return '' },
            
        },
        success: function (res) {

            console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0
            $.each(res, function (i, item) {
                delay_.push(parseInt(item.BlockTimeInHrs))
                delay_data.push([item.AircraftFamily, parseInt(item.BlockTimeInHrs)])
            });

            for (var i = 0; i < delay_.length; i++) {
                delay_sum += delay_[i];
            }

            console.log("delay_data", delay_data)

            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container1',
                    marginTop: -100,
                    type: 'pie',
                    backgroundColor: 'transparent',
                    //events: {
                    //    load: function () {
                    //        var chart = this,
                    //            x = chart.plotLeft + (chart.series[0].center[0]),
                    //            y = chart.plotTop + (chart.series[0].center[1]),
                    //            box;

                    //        chart.pieCenter = chart.renderer.text('Delay<br>' + delay_sum, x, y, true)
                    //            .css({
                    //                'text-align': 'center',
                    //                color: 'white',
                    //                fontSize: '16px'
                    //            })
                    //            .add();

                    //        box = chart.pieCenter.getBBox();
                    //        chart.pieCenter.attr({
                    //            x: x - box.width / 2,
                    //            y: y - box.height / 4
                    //        });
                    //    },
                    //    redraw: function () {
                    //        var chart = this,
                    //            x = chart.plotLeft + (chart.series[0].center[0]),
                    //            y = chart.plotTop + (chart.series[0].center[1]),
                    //            box = chart.pieCenter.getBBox();
                    //        chart.pieCenter.attr({
                    //            x: x - box.width / 2,
                    //            y: y - box.height / 4
                    //        });
                    //    }
                    //}
                },
                title: {
                            text: 'Aircraft utilization',
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
                            formatter: function () {
                                return '<b>' + this.point.name + '</b>: ' + this.y;
                            }
                        },
                legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: -90,
                            y: 75,
                            itemStyle: {
                                color: '#eee'
                            },        
                        },
                series: [{
                    showInLegend: true,
                    size: '70%',
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
    //Highcharts.chart('container1', {
    //    chart: {
    //        type: 'pie',
    //        backgroundColor: 'transparent',     
    //        marginTop:-100,
    //    },
    //    legend: {
    //        align: 'right',
    //        verticalAlign: 'top',
    //        layout: 'vertical',
    //        x: -20,
    //        y: 70,
    //        color: '#eee'          
    //    },
    //    exporting: false,
    //    credits: false,
    //    title: {
    //        text: 'Aircraft utilization',
    //        margin: 10, 
    //        style: {
    //            color: '#eee'
    //        },
    //    },   
    //    plotOptions: {
    //        pie: {
    //            //innerSize: 200,
    //            shadow: false,
    //            //depth: 100
    //        }
    //    },
    //    tooltip: {
    //        formatter: function () {
    //            return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
    //        }
    //    },
    //    series: [{
    //        name: 'Browsers',
    //        data: [["Firefox", 6], ["MSIE", 4], ["Chrome", 7]],
    //        size: '50%',
    //        innerSize: '60%',
    //        showInLegend: true,
    //        dataLabels: {
    //            enabled: false
    //        }
    //    }]
    //});
}


// OTP section Charts

function otp_overall_chart() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_OverAllOTP_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '2021-01-02' },
            toDate: function () { return '2021-01-02' },
            ddValue: function () { return 'Custom Date Range' },
            GetDataFor: function () { return 'Overall OTP' },
            Sector: function () { return '' },
        },
        success: function (res) {

            console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0
            $.each(res, function (i, item) {
                delay_.push(parseInt(item.OTPCount))
                delay_data.push([item.Name, parseInt(item.OTPCount)])
            });

            for (var i = 0; i < delay_.length; i++) {
                delay_sum += delay_[i];
            }

            console.log("delay_data", delay_data)

            var chart = new Highcharts.Chart({
                colors: ['#33ee00', '#006622'],
                chart: {
                    renderTo: 'overalotp',
                    marginTop: -100,
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
                                    fontSize: '16px'
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
                            text: 'Over All OTP',
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
                legend: false,
                series: [{
                    type: 'pie',
                    showInLegend: true,
                    size: '50%',
                    innerSize: '75%',
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

function otp_SectorType_chart() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_SectorTypeOTP_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '' },
            toDate: function () { return '' },
            ddValue: function () { return 'Previous Quarter' },
            GetDataFor: function () { return 'Sector Wise Percentage' },
            Sector: function () { return '' },
        },
        success: function (res) {

            console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0
            $.each(res, function (i, item) {
                delay_.push(parseInt(item.OTPPercentage))
                delay_data.push([item.Sector, parseInt(item.OTPPercentage)])
            });

            for (var i = 0; i < delay_.length; i++) {
                delay_sum += delay_[i];
            }

            console.log("delay_data", delay_data)

            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'otp_sector',
                    marginTop: -100,
                    type: 'pie',
                    backgroundColor: 'transparent',
                        //events: {
                    //    load: function () {
                    //        var chart = this,
                    //            x = chart.plotLeft + (chart.series[0].center[0]),
                    //            y = chart.plotTop + (chart.series[0].center[1]),
                    //            box;
                    //        chart.pieCenter = chart.renderer.text('Delay<br>' + delay_sum, x, y, true)
                    //            .css({
                    //                'text-align': 'center',
                    //                color: 'white',
                    //                fontSize: '16px'
                    //            })
                    //            .add();
                    //        box = chart.pieCenter.getBBox();
                    //        chart.pieCenter.attr({
                    //            x: x - box.width / 2,
                    //            y: y - box.height / 4
                    //        });
                    //    },
                    //    redraw: function () {
                    //        var chart = this,
                    //            x = chart.plotLeft + (chart.series[0].center[0]),
                    //            y = chart.plotTop + (chart.series[0].center[1]),
                    //            box = chart.pieCenter.getBBox();
                    //        chart.pieCenter.attr({
                    //            x: x - box.width / 2,
                    //            y: y - box.height / 4
                    //        });
                    //    }
                    //}
                },
                title: {
                            text: 'Sector Type OTP',
                            margin: 10,
                            style: {
                                color: '#eee'
                            },
                        },
                exporting: false,
                credits: false,
                plotOptions: {
                    pie: {
                        shadow: true,
                    }
                },
                //legend: {
                //    align: 'center',
                //    verticalAlign: 'bottom',
                //    x: 10,
                //    color: '#eee',
                //    y: 70
                //},
                legend:false,
                //{
                //    //align: 'right',
                //    verticalAlign: 'bottom',
                //    layout: 'horizontal',
                //    //x: -90,
                //    y: -175,
                //    itemStyle: {
                //        color: '#eee'
                //    },
                //},
                series: [{
                    showInLegend: true,
                    size: '50%',
                    innerSize: '75%',
                    data: delay_data,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });

        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });
    //Highcharts.chart('otp_sector', {
    //    chart: {
    //        type: 'pie',
    //        backgroundColor: 'transparent',
    //        marginTop: -100,
    //    },
    //    legend: {
    //        //align: 'right',
    //        //verticalAlign: 'top',
    //        //layout: 'vertical',
    //        x: -20,
    //        y: 70,
    //        color: '#eee'
    //    },
    //    exporting: false,
    //    credits: false,
    //    title: {
    //        text: 'Sector Type OTP',
    //        margin: 10,
    //        style: {
    //            color: '#eee'
    //        },
    //    },
    //    plotOptions: {
    //        pie: {
    //            //innerSize: 200,
    //            shadow: false,
    //            //depth: 100
    //        }
    //    },
    //    tooltip: {
    //        formatter: function () {
    //            return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
    //        }
    //    },
    //    series: [{
    //        name: 'Browsers',
    //        data: [["Firefox", 6], ["MSIE", 4], ["Chrome", 7]],
    //        size: '60%',
    //        innerSize: '60%',
    //        showInLegend: true,
    //        dataLabels: {
    //            enabled: false
    //        }
    //    }]
    //});
}

function otp_metro_chart() {

    //$(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_MetroWiseOTP_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '' },
            toDate: function () { return '' },
            ddValue: function () { return 'Previous Quarter' },
            GetDataFor: function () { return 'Metro Wise Percentage' },
            Sector: function () { return '' },
        },
        success: function (data) {

            //console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.MetroCity, 'y': parseFloat(item.OTPPercentage), 'drilldown': item.MetroCity })
            });

            console.log("chart data1..", data1)

            //var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            // Bar chart
            Highcharts.chart('bar_otp_metro', {
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
                title: {
                    text: 'Metro OTP',
                    margin: 10,
                    style: {
                        color: '#eee'
                    },
                },
                xAxis: {
                    type: 'category',
                    color: 'white',
                    labels: {
                        style: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    labels: {
                        style: {
                            color: '#eee'
                        }
                    },
                    //    plotLines: [{
                    //        value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //        color: '#ff0000',
                    //dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: ''
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
                            format: '{point.name}: {point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
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

function opt_load_factor() {
    Highcharts.chart('meter_load_factor',
        {
            chart: {
                marginTop: -50,
                type: 'gauge',
                backgroundColor: 'transparent',
                alignTicks: false,
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Load Factor',
                style: {
                    color: '#eee'
                },
            },
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


// Load factor

function disruption_chart() {
   

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_disruption_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '22-06-2021' },
            toDate: function () { return '22-06-2021' },
            ddValue: function () { return 'Custom Date Range' },
            FlightType: function () { return '' },
            DelayCode: function () { return '' },
            Code: function () { return '' },
            Mod: function () { return 4 },
        },
        success: function (data) {
            console.log("load chart data.. one", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].FlightType]) continue;
                flags[data[i].FlightType] = true;
                categories.push(data[i].FlightType);
            }
            //console.log("categories", categories)

            let Cancelled = [], Diverted = [], Delay = []

            $.each(data, function (j, j_item) {
                if (j_item.Status == 'Cancelled') {
                    Cancelled.push(parseFloat(j_item.FlightCount))
                }
                if (j_item.Status == 'Diverted') {
                    Diverted.push(parseFloat(j_item.FlightCount))
                }
                if (j_item.Status == 'Delay') {
                    Delay.push(parseFloat(j_item.FlightCount))
                }
            });
            chart_data = [
                {
                    name: 'Cancelled',
                    data: Cancelled
                },
                {
                    name: 'Diverted',
                    data: Diverted
                },
                {
                    name: 'Delay',
                    data: Delay
                },
            ]

            //console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('bar_disruption', {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/Get_disruption_chart",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return '' },
                                    toDate: function () { return '' },
                                    ddValue: function () { return 'Previous Quarter' },
                                    FlightType: function () { return '' },
                                    DelayCode: function () { return '' },
                                    Code: function () { return '' },
                                    Mod: function () { return 4 },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        //drilldata.push({ name: item.FlightType, y: parseFloat(item.FlightCount) })
                                        drilldata.push({ name: item.Status, y: parseFloat(item.FlightCount) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                complete: function () {
                                    $("#overlay").hide();
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: '',
                    //text: 'Disruption',
                    //margin: 10,
                    //style: {
                    //    color: '#eee'
                    //}
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
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
                        stacking: 'percent',
                        borderRadius: 5
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y}',
                    shared: true
                },
                series: chart_data,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }

            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });


    //Highcharts.chart('bar_disruption', {
    //    chart: {
    //        type: 'column',
    //        backgroundColor: 'transparent',
    //    },
    //    title: false,
    //    exporting: false,
    //    credits: false,
    //    xAxis: {
    //        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    //    },
    //    yAxis: {
    //        min: 0,
    //        title: {
    //            text: 'Total fruit consumption'
    //        }
    //    },
    //    tooltip: {
    //        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    //        shared: true
    //    },
    //    plotOptions: {
    //        column: {
    //            stacking: 'percent'
    //        }
    //    },
    //    series: [{
    //        name: 'John',
    //        data: [5, 3, 4, 7, 2]
    //    }, {
    //        name: 'Jane',
    //        data: [2, 2, 3, 2, 1]
    //    }, {
    //        name: 'Joe',
    //        data: [3, 4, 4, 2, 5]
    //    }]
    //});
}

function delay_analysis_chart() {

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_Delay_analysis_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '' },
            toDate: function () { return '' },
            ddValue: function () { return 'Current Day' },
        },
        success: function (res) {

            //console.log("delay analysis res", res)

            var delay_data = [], delay_ = [], delay_sum = 0
            $.each(res, function (i, item) {
                delay_.push(parseInt(item.DelayCount))
                delay_data.push([item.GroupCode, parseInt(item.DelayCount)])
            });
          
            for (var i = 0; i < delay_.length; i++) {
                delay_sum += delay_[i];
            }

            console.log("delay_data", delay_data)           

            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'delay_analysis',
                    marginTop: -100,
                    type: 'pie',
                    backgroundColor: 'transparent',
                    events: {
                        load: function () {
                            var chart = this,
                                x = chart.plotLeft + (chart.series[0].center[0]),
                                y = chart.plotTop + (chart.series[0].center[1]),
                                box;

                            chart.pieCenter = chart.renderer.text('Delay<br>' + delay_sum, x, y, true)
                                .css({
                                    'text-align': 'center',
                                    color: 'white',
                                    fontSize: '16px'
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
                title: false,
                exporting: false,
                credits: false,
                plotOptions: {
                    pie: {
                        innerSize: '58%'
                    },  
                    style: {
                        textShadow: false
                    },
                    dataLabels: {
                        enabled: true,
                        //color: 'red',
                        style: {
                            textShadow: false
                        }
                    }
                },
                legend: false,
                series: [{
                    showInLegend: true,
                    itemStyle: {
                        color: '#000000',
                        fontWeight: 'bold',
                        textShadow:false,
                    },
                    size: '33%',
                    data: delay_data
                }]
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });






}

function plannedVsActual_chart() {

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_PannedVsActual_chart",
        dataType: 'json',
        data: {
            fromDate: function () { return '' },
            toDate: function () { return '' },
            ddValue: function () { return 'Current Day' },
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
                title: false,
                xAxis: {
                    categories: categories
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
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


            //Highcharts.chart('plannedVsActual', {
            //    chart: {
            //        type: 'waterfall',
            //        backgroundColor: 'transparent'
            //    },
            //    exporting: false,
            //   credits: false,
            //    title: false,
            //    //xAxis: {
            //    //    type: 'category'
            //    //},
            //    yAxis: {
            //        title: {
            //            text: false
            //        }
            //    },
            //    legend: {
            //        enabled: false
            //    },
            //    tooltip: {
            //        pointFormat: '<b>{point.y:,.2f}</b> '
            //    },
            //    series: [{
            //        upColor: Highcharts.getOptions().colors[2],
            //        color: 'white',
            //        data: chart_data,
            //        //    [{
            //        //    name: 'Start',
            //        //    y: 120000
            //        //}, {
            //        //    name: 'Product Revenue',
            //        //    y: 569000
            //        //}, {
            //        //    name: 'Service Revenue',
            //        //    y: 231000
            //        //}, {
            //        //    name: 'Fixed Costs',
            //        //    y: -342000
            //        //}, {
            //        //    name: 'Variable Costs',
            //        //    y: -233000
            //        //}, {
            //        //    name: 'Balance',
            //        //    isSum: true,
            //        //    color: Highcharts.getOptions().colors[1]
            //        //}],
            //        ////dataLabels: {
            //        //    enabled: true,
            //        //    formatter: function () {
            //        //        return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
            //        //    },
            //        //    style: {
            //        //        fontWeight: 'bold'
            //        //    }
            //        //},
            //        pointPadding: 0
            //    }]
            //});

        },
        error: function (ex) {
            alert('Failed to retrieve Delay Analysis data : ' + ex);
        }
    });


   


}