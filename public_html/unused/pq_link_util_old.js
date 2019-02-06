var app_dlink_util_table;
var app_uplink_util_table;
var prev_tstamp;
var lapp_dlink_buffer = [];
var lapp_ulink_buffer = [];
var checked_app_list_dlink = [0, 1, 2];
var checked_app_list_ulink = [0, 1, 2];
var is_app_grap_init = false;

function init_dlink_utilization() {

    Display_Dlink_Util_Table(0);
    var dash_dl = lapp_bw_util_graph_init("Dash_Dlink_Plot", "Dash_Ulink_Plot", 0);
    if (!is_app_grap_init) {
        var live_bwd_id = lcjs_init_request_connection('lcjsreq');
        var lbw_req_dl = {
            type: GRAPH_UPDATE,
            id: LTAPPU_UPDATE,
            gid: dash_dl,
            link: 0,
            chanel: 1
        };
        lcjs_make_request(live_bwd_id, LTAPPU_UPDATE, lbw_req_dl);
        is_app_grap_init = true;
    }
}

function Display_Dlink_Util_Table(status) {
    var dlink_status = 0;
    var ulink_status = 0;
    var app_dlink_temp = [];

    for (var u_item in application_list) {
        app_dlink_temp.push({id: u_item, label: application_list[u_item]});
    }
    var app_tot = app_dlink_temp.sort(function (a, b) {
        if (a.label.toLowerCase() < b.label.toLowerCase()) {
            return -1;
        }
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    app_dlink_util_table.clear();
    app_uplink_util_table.clear();

    for (var i = 0; i < app_tot.length; i++) {
        if (app_tot[i].id !== 'undefined') {

            if (checked_app_list_dlink.indexOf(parseInt(app_tot[i].id)) > -1) {

                dlink_status = 1;
            } else
                dlink_status = 0;

            if (checked_app_list_ulink.indexOf(parseInt(app_tot[i].id)) > -1) {
                ulink_status = 1;
            } else
                ulink_status = 0;

            app_dlink_util_table.row.add([app_tot[i].id, set_checked(dlink_status, 'dlinkChecked_' + app_tot[i].id), app_tot[i].label, set_link_table_colors(app_tot[i].id)]);
            app_uplink_util_table.row.add([app_tot[i].id, set_checked(ulink_status, 'ulinkChecked_' + app_tot[i].id), app_tot[i].label, set_link_table_colors(app_tot[i].id)]);
        }
    }
    app_dlink_util_table.draw(false);
    app_uplink_util_table.draw(false);
}

set_checked = function (status, id) {
    if (status === 1) {
        return "<input type='checkbox' id='" + id + "' checked onClick='change_visibility(this)' style='margin-left: 2px'>";
    } else {
        return "<input type='checkbox' id='" + id + "' onClick='change_visibility(this)' style='margin-left: 2px'>";
    }
};

set_link_table_colors = function (id) {
    return "<button class='pq_session_wbtn' disabled style='width:40px; height:7px; background-color: " + color_gen[id] + "'></button>";
};

btn_link_util_bw_load_now = function (id) {
    if (id === 2) {
//        if (link_util_flag) {
//            init_ulink_utilization();
//            link_util_flag = false;
//        }
        $("#pq_ulink_util_plot").css("z-index", 100);
        $("#pq_dlink_util_plot").css("z-index", -10);
    } else {
        $("#pq_ulink_util_plot").css("z-index", -10);
        $("#pq_dlink_util_plot").css("z-index", 100);
    }
};

var get_dlink_app_labels = function () {
    var app_dlink_list = ['Time'];
    for (var i = 0; i < application_list.length; i++) {
        app_dlink_list.push(application_list[i]);
    }
//    console.log("LABEL:"+app_dlink_list.length)
    return app_dlink_list;
};

var get_dlink_app_visibility = function (type) {

    var app_dlink_list = [];
    if (type === 1) {
        for (var i = 0; i < application_list.length; i++) {
            if (checked_app_list_dlink.indexOf(i) > -1) {
                app_dlink_list.push(true);
            } else
                app_dlink_list.push(false);
        }
    } else {
        for (var i = 0; i < application_list.length; i++) {
            if (checked_app_list_ulink.indexOf(i) > -1) {
                app_dlink_list.push(true);
            } else
                app_dlink_list.push(false);
        }
    }
    return app_dlink_list;
};

var gd_util;
var gu_util;

var lapp_bw_util_graph_init = function (dlinkDivID, ulinkDivID, gid) {
    var data = [new Date(0)];
    for (var i = 0; i < application_list.length; i++) {
        data.push(0);
    }


    var div_d = document.getElementById(dlinkDivID);
    var div_u = document.getElementById(ulinkDivID);
    if (lapp_bwutil_dbuff[gid] == null) {
        lapp_bwutil_dbuff[gid] = data;
        lapp_bwutil_dbuff[gid + 1] = data;
        lapp_bwutil_color[gid] = [color_gen];
        lapp_bwutil_color[gid + 1] = [color_gen];

        lapp_bwutil_cbuff[gid] = lapp_bwutil_color;
        lapp_bwutil_cbuff[gid + 1] = lapp_bwutil_color;

        lapp_bwutil_last_update_time[gid] = 0;
    }

    gd_util = new Dygraph(div_d, lapp_bwutil_dbuff[lapp_bwutil_dbuff.length - 2], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_labels(),
                stackedGraph: true,
                drawGrid: false,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(1),
                highlightCircleSize: 2,
                axisLabelFontSize: 10,
                axes: {
                    y: {
                        axisLabelWidth: 55,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 1);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });

    gu_util = new Dygraph(div_u, lapp_bwutil_dbuff[lapp_bwutil_dbuff.length - 1], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_labels(),
                stackedGraph: true,
                drawGrid: false,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(2),
                highlightCircleSize: 2,
                axisLabelFontSize: 10,
                axes: {
                    y: {
                        axisLabelWidth: 55,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 1);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });

    lapp_bwutil_plot[gid] = gd_util;
    lapp_bwutil_plot[gid + 1] = gu_util;

    return  (lapp_bwutil_plot.length - 2);
};

function change_visibility(e) {
    var chk_d_id = e.id.split("_");
    if (chk_d_id[0] === "dlinkChecked") {
        if (e.checked) {
            checked_app_list_dlink.push(parseInt(chk_d_id[1]));
        } else {
            var index = checked_app_list_dlink.indexOf(parseInt(chk_d_id[1]));
            checked_app_list_dlink.splice(index, 1);
        }
        gd_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    } else if (chk_d_id[0] === "ulinkChecked") {
        if (e.checked) {
            checked_app_list_ulink.push(parseInt(chk_d_id[1]));
        } else {
            var index = checked_app_list_ulink.indexOf(parseInt(chk_d_id[1]));
            checked_app_list_ulink.splice(index, 1);
        }
        gu_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    }
}

lapp_bwutil_update = function (id, data) {

    if (data.length % 2 === 0) {

        for (var i = 0; i < data.length; i = i + 4) {
            var bw_u = uint32_float(data[i]);
            var bw_d = uint32_float(data[i + 1]);
            var app_id = data[i + 2];
            var tstamp = data[i + 3];

            if (tstamp > 0) {
                
//                if (tstamp > 0 && app_id == 2){
//                    console.log(tstamp +'  '+application_list[app_id]+'  '+bw_d+'  '+bw_u)
//                }
                
                if (tstamp === prev_tstamp) {
                    lapp_dlink_buffer[app_id + 1] = bw_d;
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                } else {
                    if (lapp_dlink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                    }
                    if (lapp_ulink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                    }
                    lapp_dlink_buffer = [];
                    lapp_dlink_buffer.length = application_list.length + 1;
                    prev_tstamp = tstamp;
                    lapp_dlink_buffer.fill(null);
                    lapp_dlink_buffer[0] = new Date(tstamp * 1000);
                    lapp_dlink_buffer[app_id + 1] = bw_d;

                    lapp_ulink_buffer = [];
                    lapp_ulink_buffer.length = application_list.length + 1;
                    lapp_ulink_buffer.fill(null);
                    lapp_ulink_buffer[0] = new Date(tstamp * 1000);
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                }

                //Remove Old Points from Graph
                if (lapp_bwutil_dbuff[id].length > 512) {
                    lapp_bwutil_dbuff[id].shift();
                }

                if (lapp_bwutil_dbuff[id + 1].length > 512) {
                    lapp_bwutil_dbuff[id + 1].shift();
                }
            }
        }

        if ((tstamp - lapp_bwutil_last_update_time[id] >= 100) || data.length < 128) {
//            console.log("Time")
            lapp_bwutil_last_update_time[id] = tstamp;
            if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
                lapp_bwutil_plot[id].updateOptions({'file': lapp_bwutil_dbuff[id]});
                lapp_bwutil_plot[id + 1].updateOptions({'file': lapp_bwutil_dbuff[id + 1]});
            }

        }

    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

var color_gen = [];

set_distributed_col_generator = function (r, g, b) {
    color_gen = [];
    var red_comp = 256 / r;
    var green_comp = 256 / g;
    var blue_comp = 256 / b;

    for (var red = red_comp; red < 256; red += red_comp) {
        for (var green = green_comp; green < 256; green += green_comp) {
            for (var blue = blue_comp; blue < 256; blue += blue_comp) {
                color_gen.push(['#' + red.toString(16) + green.toString(16) + blue.toString(16)]);
            }
        }
    }
    color_gen[0] = "#ffda7f";
    color_gen[1] = pieColorScheme[1];
    color_gen[2] = pieColorScheme[0];
    color_gen[38] = "#c77405";
    color_gen[135] = pieColorScheme[2];
};
         