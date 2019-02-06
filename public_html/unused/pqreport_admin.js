var chartSelected = 'pieChart';
var rangeSelectorID;
var setQStartTime;
var setQEndTime;
var startDateTime;
var endDateTime;
var format;
var range;
var user_id;
var app_report;
var app_report_ud;
var app_count;
var link_id;
var device_set_time_t_temp;
var device_set_time;
var db_set_time;
var bar_data = [];
var pie_color_scheme;
var summaryFlag = false;
var bar_width;
var data_pq_users_report = [{label: "1", value: 0}];
var pie_pq_users_report;
var q_report_mode = 2;

init_report_all_users_plots = function (width) {
    pie_pq_users_report = new d3pie("summaryPlotContainer_pie", {
        "size": {
            "canvasHeight": width,
            "canvasWidth": width,
            "pieOuterRadius": "80%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": data_pq_users_report
        },
        "labels": {
            "outer": {
                "format": "none",
                "hideWhenLessThanPercentage": 1,
                "pieDistance": 7
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 10
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 2
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true,
                "style": "straight",
                "color": "#000000"
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%",
            "placeholderParser": function (index, data) {
                data.value = pq_get_usage(data.value);
            },
            "styles": {
                "fadeInSpeed": 1000,
                "backgroundColor": "#0079dc",
                "backgroundOpacity": 1
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "none",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 79
            }
        }       
    });
    return pie_pq_users_report;
};

init_reporting_var = function () {
    app_count = 10;
    link_id = '1';
    user_id = 98;
    rangeSelectorID = 1;
    bar_width = document.getElementById('summaryPlotContainer').offsetWidth / 48;
};

init_reports_window = function () {

    for (var u_item in user_profile_lookup_list) {
        $('#userID')
                .append($('<option>', {value: user_profile_lookup_list[u_item]})
                        .text(u_item));
    }

    $("input[name=report_mode]").on('change', function () {

        switch ($(this).val()) {
            case '1':
                $("#customReportBar").hide();
                $("#quickReportBar").show();
                set_quick_mode_duration();
                CalcQTimeDiff();
                break;
            case '2':
                $("#quickReportBar").hide();
                $("#customReportBar").show();
                $('#radio_hourly').prop('checked', true);
                var startDateTime_temp = moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - h a');
                var endDateTime_temp = moment().minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - h a');
                rangeSelectorID = 1;
                $('#startDateTime').data('DateTimePicker').date(startDateTime_temp);
                $('#endDateTime').data('DateTimePicker').date(endDateTime_temp);
                CalcTimeDiff();
                break;
        }
    });

    $.each(application_list, function (key, app) {
        $('#appID')
                .append($('<option>', {value: key})
                        .text(app));
    });

    var my_options = $("#appID option");
    var selected = $("#appID").val();
    my_options.sort(function (a, b) {
        if (a.text.toLowerCase() > b.text.toLowerCase())
            return 1;
        if (a.text.toLowerCase() < b.text.toLowerCase())
            return -1;
        return 0;
    });
    $("#appID").empty().append(my_options);
    $("#appID").val(selected);

    pie_color_scheme = set_color_scheme();
// Set the link type      
    $('#userID').on('change', function () {
        user_id = $("#userID option:selected").val();
        $('#summaryPlotContainer').children().detach();
        $('#usageUDPlot').children().detach();

        if ($("input[name=report_mode]:checked").val() === '1') {
            set_quick_mode_duration();
            CalcQTimeDiff();
        } else if ($("input[name=report_mode]:checked").val() === '2') {
            $("#radio_hourly").prop("checked", true);
            attach_dateTimePicker();
            get_eligible_t_range();
            $('#tot_data').val(pq_get_usage(0));
            $('#up_data').val(pq_get_usage(0));
            $('#dwn_data').val(pq_get_usage(0));
            $('#dif').val('0 Day(s) : 0 Hour(s) : 0 Minute(s)');
            summaryFlag = false;
        } else
            alert("Invalid Reporting mode");
    });

// Change the datetimepicker formats based on app type            
    $('#appID').on('change', function () {

        if ($("#appID option:selected").text() !== '~All Applications~') {            

//            $("#radio_q_hour").attr('disabled', true);            
            $('#appCount').attr('disabled', true);
            if (summaryFlag) {
                $('#summaryPlotContainer').children().detach();
                $('#usageUDPlot').children().detach();
                CreateReport();
            }
        } else {       
//            $("#radio_q_hour").attr('disabled', false);
            if (summaryFlag) {
                $('#summaryPlotContainer').children().detach();
                $('#usageUDPlot').children().detach();
                $('#appCount').attr('disabled', false);
                CreateReport();
            }
        }
    });
// Get number of apps to displayed in pie-chart/stacked bar-chart    
    $('#appCount').on('change', function () {
        app_count = parseInt($("#appCount").val());
        pie_color_scheme = set_color_scheme();
        if (summaryFlag) {
            CreateReport();
        }
    });
// Set the link type      
    $('#linkType').on('change', function () {
        link_id = $("#linkType").val();
        if (summaryFlag) {
            CreateReport();
        }
    });
//Set the value of radio button selected to rangeSelector
    $("input[name=quickDurationSelector]").on('change', function () {
        set_quick_mode_duration();
        CalcQTimeDiff();
    });

//Set the value of radio button selected to rangeSelector
    $("input[name=durationSelector]").on('change', function () {
        summaryFlag = false;
        rangeSelectorID = parseInt($("input[name=durationSelector]:checked").val());
        set_start_time(rangeSelectorID);
        $('#tot_data').val(pq_get_usage(0));
        $('#up_data').val(pq_get_usage(0));
        $('#dwn_data').val(pq_get_usage(0));
        $('#dif').val('0 Day(s) : 0 Hour(s) : 0 Minute(s)');
        $('#summaryPlotContainer').children().detach();
        $('#usageUDPlot').children().detach();
//            attach_dateTimeText();         
        defineFormat(rangeSelectorID);
        attach_dateTimePicker();
        setFormat();
    });

    get_eligible_t_range();
    set_quick_mode_duration();
    CalcQTimeDiff();
};

set_quick_mode_duration = function () {
//    var startTimeTemp = moment().minutes(0).seconds(0).milliseconds(0);
//    var endTimeTemp = moment().minutes(0).seconds(0).milliseconds(0);
    if ($("input[name=quickDurationSelector]:checked").val() === '1') {
//        setQStartTime = startTimeTemp.subtract(1, 'hours');
//        setQEndTime = endTimeTemp.subtract(1, 'minutes');
        q_report_mode = 0;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '2') {
//        setQStartTime = startTimeTemp.hours(0);
//        setQEndTime = endTimeTemp.subtract(1, 'minutes');    
        q_report_mode = 1;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '3') {
//        setQStartTime = startTimeTemp.hours(0).subtract(1, 'days');
//        setQEndTime = endTimeTemp.hours(0).subtract(1, 'minutes');
        q_report_mode = 2;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '4') {
//        setQStartTime = startTimeTemp.date(1).hours(0);
//        setQEndTime = endTimeTemp.hours(0).subtract(1, 'minutes');    
        q_report_mode = 3;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '5') {
//        setQStartTime = startTimeTemp.date(1).hours(0).subtract(1, 'months');
//        setQEndTime = endTimeTemp.date(1).hours(0).subtract(1, 'minutes');
        q_report_mode = 4;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '6') {
//        setQStartTime = startTimeTemp.date(1).hours(0).subtract(1, 'months');
//        setQEndTime = endTimeTemp.date(1).hours(0).subtract(1, 'minutes');
        q_report_mode = 5;
    } else
        alert("Invalid Quick Mode time");
};

get_eligible_t_range = function () {
//    console.log(user_id)
    var cookie = $.cookie('pqsf');
    var cmd_buffer = new ArrayBuffer(3 * 4);
    var req = new Uint32Array(cmd_buffer, 0, 3);
    req[0] = pq_4_8_32(1, 19, 52, 0);
    req[1] = pq_2_16_32(52, 0);
    req[2] = user_id;
    $.ajax({
        data: cmd_buffer,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        processData: false,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var req = new Uint32Array(data);
        device_set_time_t_temp = req[1] * 1000 * 60;
        device_set_time_temp = new Date(req[1] * 1000 * 60);
        device_set_time = new Date(req[1] * 1000 * 60 - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
        db_set_time = new Date(req[2] * 1000 * 60);
//        console.log("Device Set Time: " + device_set_time)
//        console.log("DB End Time: " + db_set_time)
        defineFormat(1);
        setFormat();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

set_start_time = function (id) {

    switch (id) {
        case 1:
            device_set_time = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            break;
        case 2:
            device_set_time = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            break;
        case 3:
            var temp_t1 = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            device_set_time = new Date(temp_t1 - 1000 * 60 * 60 * 24 * (device_set_time_temp.getDate() - 1));
            break;
        case 4:
            var temp_t1 = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            var today = new Date(temp_t1);
            var first = new Date(new Date(temp_t1).getFullYear(), 0, 1);
            var theDay = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5);
            device_set_time = new Date(temp_t1 - 1000 * 60 * 60 * 24 * (theDay - 1));
            break;
        default:
            alert("Incorrect range");
    }
};

set_reporting_time = function (date, id) {

    var date_temp;
    switch (id) {
        case 1:
            return date;
            break;
        case 2:
            date_temp = new Date(date);
            return date_temp.setHours(0);
            break;
        case 3:
            date_temp = new Date(date);
            return date_temp.setDate(1);
            break;
        case 4:
            date_temp = new Date(date);
            date_temp = new Date(date_temp.setDate(1));
            return date_temp.setMonth(0);
            break;
        default:
            alert("Incorrect range");
    }
};

get_user_report_pie = function () {

    var ds;
    var de;
    var da_min;
    var da_pas;
    var type;
    var piePlotWidth = 0.9 * document.getElementById('summaryPlotContainer').offsetWidth;

    if ($("input[name=report_mode]:checked").val() === '1') {
        type = 84;
        da_min = q_report_mode;
        da_pas = 0;
//        ds = new Date(setQStartTime);
//        de = new Date(setQEndTime);
//        da_min = (ds.getTime() / 1000).toFixed(0);
//        da_pas = (de.getTime() / 1000).toFixed(0);
    } else if ($("input[name=report_mode]:checked").val() === '2') {
        type = 50;
        ds = new Date(startDateTime);
        de = new Date(endDateTime);
        da_min = (ds.getTime() / 1000).toFixed(0);
        da_pas = ((de.getTime() / 1000) - 60).toFixed(0);
    }
//    console.log("Initial Time: "+ ds);
//    console.log("Last Time: "+ de);    
    var cookie = $.cookie('pqsf');
    var cmd_buffer = new ArrayBuffer(5 * 4);
    var req = new Uint32Array(cmd_buffer, 0, 5);
    req[0] = pq_4_8_32(1, 19, 50, 0);
    req[1] = pq_2_16_32(type, 0);
    req[2] = da_min;
    req[3] = da_pas;
    req[4] = user_id;
    $.ajax({
        data: cmd_buffer,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1500000,
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        processData: false,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var req = new Uint32Array(data);
        var length = req[0];
        var stime = req[1];
        var etime = req[2];
        var ds_tot_data = 0;   //in Mb
        var dr_tot_data = 0;   //in Mb
//        console.log(stime);
//        console.log(etime);
        app_count = parseInt($("#appCount").val());
        var appDeficitFlag = false;
        var app_tot = [];
        var app_up = [];
        var app_down = [];
        var app_tot_temp = [];
        var app_up_temp = [];
        var app_down_temp = [];

        if (length === 0) {
            InvalidStatus("No records found within the selected time period");
            $('#summaryPlotContainer').children().detach();
            $('#usageUDPlot').children().detach();
            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));
        } else {
            data_pq_users_report.length = 0;
            for (var count = 3; count < req.length; count += 3) {
                ds_tot_data += uint32_float(req[count + 1]);
                dr_tot_data += uint32_float(req[count + 2]);
                app_tot_temp.push({label: application_list[req[count]], up_value: parseFloat((uint32_float(req[count + 1]) / 8) * 1000000), down_value: parseFloat((uint32_float(req[count + 2]) / 8) * 1000000), tot_value: parseFloat(((uint32_float(req[count + 1]) + uint32_float(req[count + 2])) / 8) * 1000000)});
            }
            app_up_temp = app_tot_temp.slice();
            app_down_temp = app_tot_temp.slice();

            if ((app_tot_temp.length < app_count) || ((app_tot_temp.length === app_count) && (JSON.stringify(app_tot_temp).indexOf('Other') > -1))) {
                appDeficitFlag = true;
                app_count = app_tot_temp.length;
//                pie_pq_users_report.updateProp("header.title.text", "Top " + app_count + " Applications");
            }
            app_tot = app_tot_temp.sort(function (a, b) {
                if (a.tot_value < b.tot_value) {
                    return 1;
                }
                if (a.tot_value > b.tot_value) {
                    return -1;
                }
                return 0;
            });
            app_up = app_up_temp.sort(function (a, b) {
                if (a.up_value < b.up_value) {
                    return 1;
                }
                if (a.up_value > b.up_value) {
                    return -1;
                }
                return 0;
            });
            app_down = app_down_temp.sort(function (a, b) {
                if (a.down_value < b.down_value) {
                    return 1;
                }
                if (a.down_value > b.down_value) {
                    return -1;
                }
                return 0;
            });

            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));

            if (link_id === '1') {

                var unknownFlag_1 = false;
                fill_sum_table(app_tot, ds_tot_data, dr_tot_data);

//        var delay = 3000;
//        setTimeout(function () {
//            alert("In")
                for (var i = 0; i < app_count; i++) {

                    if (app_tot[i].label === 'Other') {
                        unknownFlag_1 = true;
                        if (!appDeficitFlag) {
                            app_count += 1;
                        }
                    } else {
                        if (unknownFlag_1) {
                            data_pq_users_report.push({label: app_tot[i].label, value: app_tot[i].tot_value, color: pie_color_scheme[i - 1]});
                        } else
                            data_pq_users_report.push({label: app_tot[i].label, value: app_tot[i].tot_value, color: pie_color_scheme[i]});
                    }
                }
//        }, delay);                



            } else if (link_id === '2') {

                var unknownFlag_1 = false;
                fill_sum_table(app_up, ds_tot_data, dr_tot_data);

                for (var i = 0; i < app_count; i++) {

                    if (app_up[i].label === 'Other') {
                        unknownFlag_1 = true;
                        if (!appDeficitFlag) {
                            app_count += 1;
                        }
                    } else {
                        if (unknownFlag_1) {
                            data_pq_users_report.push({label: app_up[i].label, value: app_up[i].up_value, color: pie_color_scheme[i - 1]});
                        } else
                            data_pq_users_report.push({label: app_up[i].label, value: app_up[i].up_value, color: pie_color_scheme[i]});
                    }
                }
            } else if (link_id === '3') {

                var unknownFlag_1 = false;
                fill_sum_table(app_down, ds_tot_data, dr_tot_data);
//                var unknownFlag_2 = false;

                for (var i = 0; i < app_count; i++) {

                    if (app_down[i].label === 'Other') {
                        unknownFlag_1 = true;
                        if (!appDeficitFlag) {
                            app_count += 1;
                        }
                    } else {
                        if (unknownFlag_1) {
                            data_pq_users_report.push({label: app_down[i].label, value: app_down[i].down_value, color: pie_color_scheme[i - 1]});
                        } else
                            data_pq_users_report.push({label: app_down[i].label, value: app_down[i].down_value, color: pie_color_scheme[i]});
                    }
                }
            } else
                return -1;

            init_report_all_users_plots(piePlotWidth);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

get_user_report_bar = function () {

    var ds;
    var de;
    var da_min;
    var da_pas;
    var type;

    if ($("input[name=report_mode]:checked").val() === '1') {
        type = 85;
        da_min = q_report_mode;
        da_pas = 0;
    } else if ($("input[name=report_mode]:checked").val() === '2') {
        type = 51;
        ds = new Date(startDateTime);
        de = new Date(endDateTime);
        da_min = (ds.getTime() / 1000).toFixed(0);
        da_pas = ((de.getTime() / 1000) - 60).toFixed(0);
    }

    var cookie = $.cookie('pqsf');
    var cmd_buffer = new ArrayBuffer(5 * 4);
    var req = new Uint32Array(cmd_buffer, 0, 5);
    req[0] = pq_4_8_32(1, 19, 51, 0);
    req[1] = pq_2_16_32(type, parseInt($("#appID option:selected").val()));
    req[2] = da_min;
    req[3] = da_pas;
    req[4] = user_id;
    $.ajax({
        data: cmd_buffer,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        processData: false,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var req = new Uint32Array(data);
        var length = req[0];  // User ID
        var stime = req[1];   // Start Time
        var etime = req[2];   // End Time
        var ds_tot_data = 0;   //in Mb
        var dr_tot_data = 0;   //in Mb
        bar_data = [];

        if (req.length === 3) {
            InvalidStatus("No records of selected application found within the selected time period");
            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));
            $('#summaryPlotContainer').children().detach();
            $('#usageUDPlot').children().detach();
        } else {
            for (var count = 3; count < req.length; count += 3) {
                ds_tot_data += uint32_float(req[count + 1]);
                dr_tot_data += uint32_float(req[count + 2]);
            }
            app_report.row.add(["-", $("#appID option:selected").text(), pq_get_usage((ds_tot_data / 8) * 1000000), "-",
                pq_get_usage((dr_tot_data / 8) * 1000000), "-", pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000), "-"]).draw(false);

            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));

            if (link_id === '1') {

                for (var count = 3; count < req.length; count += 3) {
                    var x = new Date(req[count] * 1000 * 60);
                    if (x > ds && count === 3) {
                        bar_data.push([ds, 0]);
                    }
                    bar_data.push([x, ((uint32_float(req[count + 1]) + uint32_float(req[count + 2])) / 8)]);
                    if (x < de && (count + 3) >= req.length) {
                        bar_data.push([de, 0]);
                    }
                }
            } else if (link_id === '2') {
                for (var count = 3; count < req.length; count += 3) {
                    var x = new Date(req[count] * 1000 * 60);
                    if (x > ds && count === 3) {
                        bar_data.push([ds, 0]);
                    }
                    bar_data.push([x, uint32_float(req[count + 1]) / 8]);
                    if (x < de && (count + 3) >= req.length) {
                        bar_data.push([de, 0]);
                    }
                }
            } else if (link_id === '3') {
                for (var count = 3; count < req.length; count += 3) {
                    var x = new Date(req[count] * 1000 * 60);
                    if (x > ds && count === 3) {
                        bar_data.push([ds, 0]);
                    }
                    bar_data.push([x, uint32_float(req[count + 2]) / 8]);
                    if (x < de && (count + 3) >= req.length) {
                        bar_data.push([de, 0]);
                    }
                }
            } else
                return -1;

            new Dygraph(document.getElementById('BarChartPlotContainer'), bar_data, '#991f00', 0, 0,
                    {
                        animatedZooms: true,
                        //            drawPoints: true,
                        drawGrid: false,
                        //            colors: '#991f00',
                        showRoller: false,
                        axisLabelFontSize: 10,
                        plotter: chart_plotter,
                        labels: ['Time', 'Usage'],
                        //            pointClickCallback: function(e, p) {
                        //                DrillDown(p.idx);
                        //                            alert(" Point X Coord =  " + p.xval + ": Canvas X =  " + p.canvasx + ": Canvas Y =  " + p.canvasy + ": ID =  " + p.idx );
                        //                            document.getElementById("summaryPlotContainer_table").innerHTML += ": Point X Coord =  " + p.xval + ": Canvas X =  " + p.canvasx + ": Canvas Y =  " + p.canvasy + ": ID =  " + p.idx + "<br/>";
                        //                            document.getElementById("summaryPlotContainer_table").innerHTML += "Point Name = " + p.name + ": Point X Coord =  " + p.xval + ": Canvas X =  " + p.canvasx + ": Canvas Y =  " + p.canvasy + ": ID =  " + p.idx + "<br/>";
                        //            },                       
                        labelsDivStyles: pq_dygraph_tooltip(),
                        labelsSeparateLines: true,
                        axes: {
                            y: {
                                axisLabelWidth: 50,
                                valueFormatter: function (x) {
                                    return y_axis_usage_formatter(x, 1);
                                },
                                axisLabelFormatter: function (x) {
                                    return y_axis_usage_formatter(x, 1);
                                }
                            },
                            x: {
                                valueFormatter: function (x) {
                                    return x_axis_usage_formatter(x);
                                }
                            }
                        }
                    });
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

//detach and attach datepickers for different radio button values 
function attach_dateTimePicker() {
    $('#summary_datetimepicker_container').children().detach();
    var rep_dt_picker = "<label style='margin-left: 93px; color:#fff' class='drop_down_label_reporting'> From : </label>" +
            "<input type='text' id='startDateTime' placeholder='Start date and time' class='field_prop_reporting' style='margin-left:5px; font-size: 10px; color:black; width: 140px; text-indent: 5px; height: 20px;' >" +
            "<label class='drop_down_label_reporting' style='margin-left:28px; color:#fff'> To : </label>" +
            "<input type='text' id='endDateTime' placeholder='End date and time' class='field_prop_reporting' style='margin-left:5px; font-size:10px; color:black; width: 140px; text-indent: 5px; height: 20px;'>";
    $('#summary_datetimepicker_container').append(rep_dt_picker);
//                alert("out")
}

//define the format of date & time  
function defineFormat(id) {
    switch (id) {
        case 1:
            format = 'MMM Do YYYY - h a';
            range = 'day';
//            bar_width = 22;
            break;
        case 2:
            format = 'MMM Do YYYY';
            range = 'month';
//            bar_width = 17;
            break;
        case 3:
            format = 'MMM YYYY';
            range = 'year';
//            bar_width = 40;
            break;
        case 4:
            format = 'YYYY';
            range = 'year';
//            bar_width = 30;
            break;
        case 5:
            format = 'MMM Do YYYY - h a';
            range = 'year';
//            bar_width = 22;
            break;
        default:
            alert("Incorrect range");
    }
}

//set the format of date & time            
function setFormat() {
    $('#startDateTime').datetimepicker({
        format: format,
        sideBySide: true,
        viewMode: "days",
        minDate: device_set_time,
        maxDate: Date.now(),
        showClear: true,
        showClose: true
    });
    $('#endDateTime').datetimepicker({
        format: format,
        sideBySide: true,
        viewMode: "days",
        minDate: device_set_time,
        maxDate: Date.now(),
        showClear: true,
        showClose: true
    });

    $("#startDateTime,#endDateTime").on("dp.change", function () {
        $('#summaryPlotContainer').children().detach();
        $('#usageUDPlot').children().detach();
    });

//get value when datetimepicker value is changed
    $("#startDateTime").on("dp.change", function (e) {

        if ($("#startDateTime").val() !== '') {
            $('#endDateTime').data('DateTimePicker').maxDate('now');
            $('#endDateTime').data("DateTimePicker").minDate(e.date);
            if (rangeSelectorID === 4 || rangeSelectorID === 5) {
                var end_date_res = moment(new Date(e.date)).add(1000, 'year');
                if (end_date_res.endOf(range) > Date.now()) {
                    $('#endDateTime').data('DateTimePicker').maxDate('now');
                } else
                    $('#endDateTime').data('DateTimePicker').maxDate(end_date_res.endOf('year'));
            } else {
                var end_date_res = moment(new Date(e.date)).add(1, range);
                if (end_date_res.endOf(range) > Date.now()) {
                    $('#endDateTime').data('DateTimePicker').maxDate('now');
                } else
                    $('#endDateTime').data('DateTimePicker').maxDate(end_date_res.endOf(range));
            }
            summaryFlag = true;
        }
    });
}

//set type of chart selected from buttons (pie or stacked-bar)------- to be optmised            
//function setChartType(type) {
//    chartSelected = type;
//    if (type === 'pieChart') {
//        defineFormat(1);
//        attach_dateTimePicker();
//        rangeSelectorID = 1;
//        setFormat();
//        $("#radio_yearly,#radio_monthly,#radio_daily,#radio_hourly ").attr('disabled', false);
//    } else {
//        $("#radio_hourly").prop("checked", true);
//        $("#radio_yearly,#radio_monthly,#radio_daily,#radio_hourly ").attr('disabled', true);
//        defineFormat(5);
//        attach_dateTimePicker();
//        rangeSelectorID = 5;
//        setFormat();
//    }
//    if (summaryFlag) {
//        CreateReport();
//    }
//}

//Display the time period in which data should be querried in quick mode
function CalcQTimeDiff() {
    app_count = parseInt($("#appCount").val());
    summaryFlag = true;
    var $input = $('input[name=quickDurationSelector]:checked');
    var text = $('label[for=' + $input.attr('id') + ']').text();
    $('#dif').val(text);
    CreateReport();
}

//Display the time period in which data should be querried in custom mode
function CalcTimeDiff() {
    var startDateTime_temp;
    var endDateTime_temp;
    app_count = parseInt($("#appCount").val());
    if ($("#startDateTime").val() === '' || $("#endDateTime").val() === '') {
        InvalidStatus("Start/End Date & Time cannot be empty");
    } else if ($("#startDateTime").val() === $("#endDateTime").val()) {
        InvalidStatus("Start and End Time cannot be the same");
    } else {
        summaryFlag = true;
        startDateTime_temp = $('#startDateTime').data("DateTimePicker").date();
        endDateTime_temp = $('#endDateTime').data("DateTimePicker").date();
        startDateTime = set_reporting_time(startDateTime_temp, rangeSelectorID);
        endDateTime = set_reporting_time(endDateTime_temp, rangeSelectorID);
        var start_date = moment(new Date(startDateTime), "MMM Do YYYY - h m a");
        var end_date = moment(new Date(endDateTime), "MMM Do YYYY - h m a");
        var diff = moment.duration(end_date.diff(start_date));
//        var duration = diff.get("years") + " Year(s) : " + diff.get("months") + " Month(s) : " + diff.get("days") + " Day(s) : " + diff.get("hours") + " Hour(s)";
        var duration = diff.get("years") + " Year(s) : " + diff.get("months") + " Month(s) : " + diff.get("days") + " Day(s) : " + diff.get("hours") + " Hour(s) : " + diff.get("minutes") + " Minute(s)";
        $('#dif').val(duration);
        CreateReport();
    }
}

function CreateReport() {
    $('#summaryPlotContainer').children().detach();
    $('#usageUDPlot').children().detach();
    app_count = parseInt($("#appCount").val());
    var user_selected = $("#userID option:selected").text();
    var app_selected = $("#appID option:selected").text();
    var innerPlotDescription = "<div class=' BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size: 14px; border:none; width:100%;'>" + $("#userID option:selected").text() + " - " + $("#linkType option:selected").text() + " Usage - " + $("#appID option:selected").text() + "</div>";         //for admin
    var barChartPlotContainer = "<div id='BarChartPlotContainer' class='w3-animate-zoom' style='width: 100%; height:calc(100% - 60px); background:beige;'></div>" +
            "<div id='footnoteText' class=' BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size: 12px; float:bottom; border-radius:0px 0px 15px 15px; height: 30px; width:100%; '></div>";
    var innerPlots = "<div id='summaryPlotContainer_pie' style='width:100%; float:left; height: 97%; background: transparent; '>" + "</div>";
    $('#usageUDPlot').append("<table id='Report_Apps_UD_table' class='display cell-border AppUserTablesFont' style='color:gray'  cellspacing='0' ></table>");
    app_report = $('#Report_Apps_UD_table').DataTable({
        columnDefs: [
            {width: '15%', targets: 0},
            {title: "Application", width: '40%', targets: 1},
            {title: "Uplink", width: '10%', targets: 2},
            {title: "%", width: '5%', targets: 3},
            {title: "Downlink", width: '10%', targets: 4},
            {title: "%", width: '5%', targets: 5},
            {title: "Total", width: '10%', targets: 6},
            {title: "%", width: '5%', targets: 7},
            {className: 'dt-center', targets: '_all'}
        ],
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        buttons: [{extend: 'csv', text: 'Save as CSV', filename: 'Data Usage', title: 'Data Usage', className: 'green'},
            {extend: 'pdf', text: 'Save as PDF', filename: 'Data Usage', title: 'Data Usage', className: 'green', customize: function (doc) {
                    doc.defaultStyle.fontSize = 8;
                }}]
    });
    app_report.buttons(0, null).containers().appendTo('#usageUDPlot');
    if ((user_selected === 'All Users') && (app_selected === '~All Applications~')) {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(innerPlots);
        get_user_report_pie();
//        AppendElementToUsage(chartSelected);
    } else if ((user_selected === 'All Users') && !(app_selected === '~All Applications~')) {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(barChartPlotContainer);
        get_user_report_bar();
//        AppendElementToUsage('barChart');
    } else if (!(user_selected === 'All Users') && (app_selected === '~All Applications~')) {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(innerPlots);
        get_user_report_pie();
//        AppendElementToUsage(chartSelected);
    } else {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(barChartPlotContainer);
        get_user_report_bar();
//        AppendElementToUsage('barChart');
    }
}

function AppendElementToUsage(opt) {
    if (opt === "pieChart") {
        get_user_report_pie();
    } else if (opt === "barChart") {
        get_user_report_bar();
    } else {
        console.error("Unknown Plot Type. Error!");
    }
}

chart_plotter = function (e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
        //if (i > 2 && i < 8) {
        //console.log(e.pqmcolor + " " + p.y + "     " + p.canvasy);
        //}
        ctx.fillStyle = '#991f00';
        ctx.fillRect(center_x - bar_width / 2, p.canvasy,
                bar_width, y_bottom - p.canvasy);
//                      ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
//                      bar_width, y_bottom - p.canvasy);
    }
};

function fill_sum_table(app_tot, ds_tot_data, dr_tot_data) {
    var unknownFlag_2 = false;
    for (var i = 0; i < app_tot.length; i++) {
        if (app_tot[i].label === 'Other') {
            unknownFlag_2 = true;
            app_report.row.add(["", app_tot[i].label, pq_get_usage(app_tot[i].up_value), ((app_tot[i].up_value) * 100 / ((ds_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                pq_get_usage(app_tot[i].down_value), ((app_tot[i].down_value) * 100 / ((dr_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                pq_get_usage(app_tot[i].tot_value), ((app_tot[i].tot_value) * 100 / (((ds_tot_data + dr_tot_data) / 8) * 1000000)).toFixed(2) + ' %']).draw(false);
        } else {
            if (unknownFlag_2) {
                app_report.row.add(["<button class='pq_session_wbtn' disabled style='width:90%; height:7px; background-color: " + pie_color_scheme[i - 1] + "'></button>",
                    app_tot[i].label, pq_get_usage(app_tot[i].up_value), ((app_tot[i].up_value) * 100 / ((ds_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].down_value), ((app_tot[i].down_value) * 100 / ((dr_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].tot_value), ((app_tot[i].tot_value) * 100 / (((ds_tot_data + dr_tot_data) / 8) * 1000000)).toFixed(2) + ' %']).draw(false);
            } else
                app_report.row.add(["<button class='pq_session_wbtn' disabled style='width:90%; height:7px; background-color: " + pie_color_scheme[i] + "'></button>",
                    app_tot[i].label, pq_get_usage(app_tot[i].up_value), ((app_tot[i].up_value) * 100 / ((ds_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].down_value), ((app_tot[i].down_value) * 100 / ((dr_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].tot_value), ((app_tot[i].tot_value) * 100 / (((ds_tot_data + dr_tot_data) / 8) * 1000000)).toFixed(2) + ' %']).draw(false);
        }
    }
}

x_axis_usage_formatter = function (time) {
    var time_stamp = moment(time);
    if (time_stamp.format("H:mm") === '0:00' || time_stamp.format("H:mm") === '5:30' || time_stamp.format("H:mm") === '23:59') {
        return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div>";
    } else
        return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:00") + "</div>";
};

y_axis_usage_formatter = function (usage, precision) {
    var data = (usage * 1000 * 1000);
    var val;
    if (data >= 1000000000) { //G
        val = (data / 1000000000).toFixed(precision) + ' GB';
    } else if (data >= 1000000) { //M
        val = (data / 1000000).toFixed(precision) + ' MB';
    } else if (data >= 1000) { // K
        val = (data / 1000).toFixed(precision) + ' KB';
    } else { //Bytes
        val = (data).toFixed(precision) + ' B';
    }
    return val;
};

set_color_scheme = function () {
    if (app_count === 10) {
        return pieColorScheme_10;
    } else if (app_count === 20) {
        return pieColorScheme_20;
    } else if (app_count === 30) {
        return pieColorScheme_30;
    } else if (app_count === 40) {
        return pieColorScheme_40;
    } else if (app_count === 50) {
        return pieColorScheme_50;
    } else
        return -1;
};

//---------------------------------