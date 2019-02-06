var app_dlink_util_user_table;
var app_uplink_util_user_table;
var prev_user_tstamp;
var lapp_dlink_user_buffer = [];
var lapp_ulink_user_buffer = [];
var checked_app_list_user_dlink = [];
var checked_app_list_user_ulink = [];
//var is_app_grap_user_inited = false;

function init_dlink_user_utilization() {

    var user_ip = ($("#linkUtilAppUserID").val()).split("/");

    if (isNaN(parseInt(user_ip[1]))) {
        user_ip[0] = $("#linkUtilAppUserID").val();
        user_ip[1] = 32;
    }

    if (validateIP(user_ip[0])) {

//        if (app_dlink_util_user_table) {
//            app_dlink_util_user_table.clear().draw();
//        }
//
//        if (app_uplink_util_user_table) {
//            app_uplink_util_user_table.clear().draw();
//        }

        lapp_dlink_user_buffer = [];
        lapp_ulink_user_buffer = [];
        checked_app_list_user_dlink = [0, 1, 2];
        checked_app_list_user_ulink = [0, 1, 2];

        Display_Dlink_Util_User_Table(0);
        var dash_app_util_user = lapp_bw_util_user_graph_init("Dash_Dlink_User_Plot", "Dash_Ulink_User_Plot", 0);
//        if (!is_app_grap_user_inited) {

        var lbw_req_dl = {
            type: GRAPH_UPDATE,
            id: LTUSERAPP_UPDATE,
            gid: dash_app_util_user,
            sip: dot2num(user_ip[0]),
            dip: user_ip[1],
            sport: 0,
            dport: 0,
            vid: 0,
            prot: 0,
            app: 0
        };
        lcjs_make_request(live_bwd_id, LTUSERAPP_UPDATE, lbw_req_dl);
        is_app_grap_user_inited = true;
//        }
    } else
        InvalidStatus("Invalid IP Address");
}

function Display_Dlink_Util_User_Table(status) {
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

    app_dlink_util_user_table.clear();
    app_uplink_util_user_table.clear();

    for (var i = 0; i < app_tot.length; i++) {
        if (app_tot[i].id !== 'undefined') {

            if (checked_app_list_user_dlink.indexOf(parseInt(app_tot[i].id)) > -1) {

                dlink_status = 1;
            } else
                dlink_status = 0;

            if (checked_app_list_user_ulink.indexOf(parseInt(app_tot[i].id)) > -1) {
                ulink_status = 1;
            } else
                ulink_status = 0;

            app_dlink_util_user_table.row.add([app_tot[i].id, set_checked_user(dlink_status, 'dlinkUChecked_' + app_tot[i].id), app_tot[i].label, set_link_table_colors(app_tot[i].id)]);
            app_uplink_util_user_table.row.add([app_tot[i].id, set_checked_user(ulink_status, 'ulinkUChecked_' + app_tot[i].id), app_tot[i].label, set_link_table_colors(app_tot[i].id)]);
        }
    }
    app_dlink_util_user_table.draw(false);
    app_uplink_util_user_table.draw(false);
}

set_checked_user = function (status, id) {
    if (status === 1) {
        return "<input type='checkbox' id='" + id + "' checked onClick='change_user_visibility(this)' style='margin-left: 2px'>";
    } else {
        return "<input type='checkbox' id='" + id + "' onClick='change_user_visibility(this)' style='margin-left: 2px'>";
    }
};
//
//set_link_table_colors = function (id) {
//    return "<button class='pq_session_wbtn' disabled style='width:40px; height:7px; background-color: " + color_gen[id] + "'></button>";
//};

btn_link_util_user_bw_load_now = function (id) {
    if (id === 2) {
//        if (link_util_flag) {
//            init_ulink_utilization();
//            link_util_flag = false;
//        }
        $("#pq_ulink_util_user_plot").css("z-index", 100);
        $("#pq_dlink_util_user_plot").css("z-index", -10);
    } else {
        $("#pq_ulink_util_user_plot").css("z-index", -10);
        $("#pq_dlink_util_user_plot").css("z-index", 100);
    }
};

var get_dlink_app_user_labels = function () {
    var app_dlink_user_list = ['Time'];
    for (var i = 0; i < application_list.length; i++) {
        app_dlink_user_list.push(application_list[i]);
    }
//    console.log("LABEL:"+app_dlink_list.length)
    return app_dlink_user_list;
};

var get_dlink_app_user_visibility = function (type) {

    var app_dlink_user_list = [];
    if (type === 1) {
        for (var i = 0; i < application_list.length; i++) {
            if (checked_app_list_user_dlink.indexOf(i) > -1) {
                app_dlink_user_list.push(true);
            } else
                app_dlink_user_list.push(false);
        }
    } else {
        for (var i = 0; i < application_list.length; i++) {
            if (checked_app_list_user_ulink.indexOf(i) > -1) {
                app_dlink_user_list.push(true);
            } else
                app_dlink_user_list.push(false);
        }
    }
    return app_dlink_user_list;
};

var gd_user_util;
var gu_user_util;

var lapp_bw_util_user_graph_init = function (dlinkDivID, ulinkDivID, gid) {
    var data = [new Date(0)];
    for (var i = 0; i < application_list.length; i++) {
        data.push(0);
    }


    var div_d = document.getElementById(dlinkDivID);
    var div_u = document.getElementById(ulinkDivID);
    if (lapp_bwutil_user_dbuff[gid] == null) {
        lapp_bwutil_user_dbuff[gid] = data;
        lapp_bwutil_user_dbuff[gid + 1] = data;
        lapp_bwutil_user_color[gid] = [color_gen];
        lapp_bwutil_user_color[gid + 1] = [color_gen];

        lapp_bwutil_user_cbuff[gid] = lapp_bwutil_user_color;
        lapp_bwutil_user_cbuff[gid + 1] = lapp_bwutil_user_color;

        lapp_bwutil_user_last_update_time[gid] = 0;
    }

    gd_user_util = new Dygraph(div_d, lapp_bwutil_user_dbuff[lapp_bwutil_user_dbuff.length - 2], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_user_labels(),
                stackedGraph: true,
                drawGrid: false,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_user_visibility(1),
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

    gu_user_util = new Dygraph(div_u, lapp_bwutil_user_dbuff[lapp_bwutil_user_dbuff.length - 1], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_user_labels(),
                stackedGraph: true,
                drawGrid: false,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_user_visibility(2),
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

    lapp_bwutil_user_plot[gid] = gd_user_util;
    lapp_bwutil_user_plot[gid + 1] = gu_user_util;

    return  (lapp_bwutil_user_plot.length - 2);
};

function change_user_visibility(e) {
    var chk_d_id = e.id.split("_");
    if (chk_d_id[0] === "dlinkUChecked") {
        if (e.checked) {
            checked_app_list_user_dlink.push(parseInt(chk_d_id[1]));
        } else {
            var index = checked_app_list_user_dlink.indexOf(parseInt(chk_d_id[1]));
            checked_app_list_user_dlink.splice(index, 1);
        }
        gd_user_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    } else if (chk_d_id[0] === "ulinkUChecked") {
        if (e.checked) {
            checked_app_list_user_ulink.push(parseInt(chk_d_id[1]));
        } else {
            var index = checked_app_list_user_ulink.indexOf(parseInt(chk_d_id[1]));
            checked_app_list_user_ulink.splice(index, 1);
        }
        gu_user_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    }
}

lapp_bwutil_user_update = function (id, data) {

    if (data.length % 2 === 0) {

        for (var i = 0; i < data.length; i = i + 4) {
            var bw_u = uint32_float(data[i]);
            var bw_d = uint32_float(data[i + 1]);
            var app_id = data[i + 2];
            var tstamp = data[i + 3];

            if (tstamp > 0) {
//                console.log(tstamp +'  '+app_id)
                if (tstamp === prev_user_tstamp) {
                    lapp_dlink_user_buffer[app_id + 1] = bw_d;
                    lapp_ulink_user_buffer[app_id + 1] = bw_u;
                } else {
                    if (lapp_dlink_user_buffer.length > 0) {
                        lapp_bwutil_user_dbuff[id].push(lapp_dlink_user_buffer);
                    }
                    if (lapp_ulink_user_buffer.length > 0) {
                        lapp_bwutil_user_dbuff[id + 1].push(lapp_ulink_user_buffer);
                    }
                    lapp_dlink_user_buffer = [];
                    lapp_dlink_user_buffer.length = application_list.length + 1;
                    prev_user_tstamp = tstamp;
                    lapp_dlink_user_buffer.fill(null);
                    lapp_dlink_user_buffer[0] = new Date(tstamp * 1000);
                    lapp_dlink_user_buffer[app_id + 1] = bw_d;

                    lapp_ulink_user_buffer = [];
                    lapp_ulink_user_buffer.length = application_list.length + 1;
                    lapp_ulink_user_buffer.fill(null);
                    lapp_ulink_user_buffer[0] = new Date(tstamp * 1000);
                    lapp_ulink_user_buffer[app_id + 1] = bw_u;
                }

                //Remove Old Points from Graph
                if (lapp_bwutil_user_dbuff[id].length > 512) {
                    lapp_bwutil_user_dbuff[id].shift();
                }

                if (lapp_bwutil_user_dbuff[id + 1].length > 512) {
                    lapp_bwutil_user_dbuff[id + 1].shift();
                }
            }
        }

        if ((tstamp - lapp_bwutil_user_last_update_time[id] >= 100) || data.length < 128) {
//            console.log("Time")
            lapp_bwutil_user_last_update_time[id] = tstamp;
            if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL_USER) {
                lapp_bwutil_user_plot[id].updateOptions({'file': lapp_bwutil_user_dbuff[id]});
                lapp_bwutil_user_plot[id + 1].updateOptions({'file': lapp_bwutil_user_dbuff[id + 1]});
            }

        }

    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

       