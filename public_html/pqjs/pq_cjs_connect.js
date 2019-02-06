var skt_live_bw_con = [];
var live_graph = [];
var lg_data_buff = [];
var lg_color_buff = [];
var blg_clr_keep = [];
var last_lg_ut = [];
var last_bwu_time = [];

var bwhist_prv_ts = [];
var bwhist_prv_csc_cnt = [];

var vlan_enable;

function get_cjs_ws_url() {
    var pcol;
    var u = document.URL;
    if (u.substring(0, 5) == "https") {
        pcol = "wss://";
        u = u.substr(8);
    } else {
        pcol = "ws://";
        if (u.substring(0, 4) == "http")
            u = u.substr(7);
    }
    u = u.split('/');
    return pcol + u[0] + "/xxx";
}

var cjs_make_auth_req = function (req_data) {
    var cmd_buffer = new ArrayBuffer(4 * 1 + req_data.gid.length);
    var req = new Uint32Array(cmd_buffer, 0, 1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, 0, 0);
    var bemail = new Uint8Array(cmd_buffer, 4, req_data.gid.length);
    for (var cit = 0; cit < req_data.gid.length; cit++) {
        bemail[cit] = req_data.gid.charCodeAt(cit);
    }
    return cmd_buffer;
};

//Bandwidth History
var bwh_plot = [];
var bwh_dbuff = [];
var bwh_cbuff = [];
var bwh_color = [];
var bwh_vname = [];
var bwh_ref_time = [];
var bwh_point_buff = [];
var bwh_graph_type = 0;
var bwh_max_free_tspan = 0;
var bwh_prev_tspan = 0;

var bwh_make_request = function (req_data) {
    var req = new Uint32Array(11);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = 0;
    req[2] = req_data.link;
    req[3] = req_data.chanel;
    req[4] = req_data.s_date - (req[4] * 4294967296);
    req[5] = req_data.s_date / 4294967296;
    var rec_time = new Date(4294967296 * req[3] + req[4]);
    req[6] = req_data.e_date - (req[6] * 4294967296);
    req[7] = req_data.e_date / 4294967296;
    req[8] = req_data.min_bw;
    req[9] = req_data.log;
    req[10] = req_data.vid;
    return req.buffer;
};

var bwh_graph_init = function (div, color, gid) {

    if (bwh_dbuff[gid] == null) {
        var data = [];
        data.push([0, 0]);
        bwh_dbuff[gid] = data;
        var clr = [];
        clr.push([color]);
        bwh_cbuff[gid] = clr;
        bwh_color[gid] = [color];
        bwh_vname[gid] = [];
        bwh_ref_time[gid] = 0;
    }
    var graph = new Dygraph(document.getElementById(div), bwh_dbuff[gid], bwh_cbuff[gid], 0, gid,
            {
//                drawPoints: true,
                showRoller: false,
                fillGraph: true,
                axisLabelFontSize: 10,
                drawGrid: false,
                plotter: smoothPlotter,
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {
                    y: {
                        axisLabelWidth: 65,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            return x_axis_av_formatter(x);
                        }
                    }
                },
                pointClickCallback: function (e, p) {
                    bwh_mine_click(e, p);
                }
            });
    bwh_plot[gid] = graph;
    return  gid;
};

bwh_update_start = function (id, data) {
//console.log("Bw hist update start "+data)

    bwh_plot[id].resize();
    bwh_dbuff[id] = [];
    bwh_cbuff[id].length = 0;
    bwh_vname[id].length = 0;
    validate_hist_data_availability(id, data[1]);
    bwh_ref_time[id] = new Date(4294967296 * data[4] + data[3]);

    bwh_plot[id + 1].resize();
    bwh_dbuff[id + 1] = [];
    bwh_cbuff[id + 1].length = 0;
    bwh_vname[id + 1].length = 0;
    validate_hist_data_availability(id + 1, data[1]);
    bwh_ref_time[id + 1] = new Date(4294967296 * data[4] + data[3]);

    bwh_prev_tspan = 0;
    bwh_graph_type = data[2];
    bwhist_prv_ts[id] = 0;
    bwhist_prv_csc_cnt[id] = 0;
    bwh_point_buff.length = 0;

    if (bwh_graph_type === 0) {
        bwh_max_free_tspan = 2000;
    } else if (bwh_graph_type === 1) {
        bwh_max_free_tspan = 60 * 1000 * 2;
    } else if (bwh_graph_type === 2) {
        bwh_max_free_tspan = 60 * 1000 * 5 * 2;
    } else if (bwh_graph_type === 3) {
        bwh_max_free_tspan = 60 * 1000 * 15 * 2;
    } else if (bwh_graph_type === 4) {
        bwh_max_free_tspan = 60 * 1000 * 120 * 2;
    } else if (bwh_graph_type === 4) {
        bwh_max_free_tspan = 60 * 1000 * 120 * 12 * 2;
    }
};

bwh_update = function (id, data) {
//    console.log(data.length, data)
    if (data.length % 4 === 0) {
        for (var i = 0; i < data.length; i = i + 4) {
            var bw_s = uint32_float(data[i]);
            var bw_r = uint32_float(data[i + 1]);
            var comp_id = data[i + 2];
            var tstamp = data[i + 3];
//            console.log(tstamp)
            if (tstamp > 0) {
                //Add Data to Graph
                var time = new Date(bwh_ref_time[id].getTime() + tstamp);
//                console.log(time)
                if (bwh_prev_tspan !== 0) {
//                    console.log(time + "_" + bw_s + "_" + bw_r)
//                    console.log("Tspan "+ (time - bwh_prev_tspan))
                    if ((time - bwh_prev_tspan) >= bwh_max_free_tspan) {

                        var time_p = new Date(bwh_prev_tspan.getTime() + bwh_max_free_tspan / 2);
                        var time_n = new Date(time.getTime() - bwh_max_free_tspan / 2);
//                        console.log("In bw hist adjust: " + time + "_" + time_p + "_" + time_n)
                        bwh_dbuff[id].push([time_p, 0]);
                        bwh_dbuff[id + 1].push([time_p, 0]);
                        bwh_dbuff[id].push([time_n, 0]);
                        bwh_dbuff[id + 1].push([time_n, 0]);

                        if (bwh_cbuff[id].length <= 1400) {
                            bwh_cbuff[id].push(bwh_color[id]);
                            bwh_cbuff[id + 1].push(bwh_color[id + 1]);

                            bwh_cbuff[id].push(bwh_color[id]);
                            bwh_cbuff[id + 1].push(bwh_color[id + 1]);
                        }
                    }
                }

                if (time >= bwhist_prv_ts[id]) {

                    bwhist_prv_ts[id] = time;
                    bwhist_prv_csc_cnt[id] = 0;

                    bwh_prev_tspan = time;
                    bwh_dbuff[id].push([time, bw_s]);
                    bwh_dbuff[id + 1].push([time, bw_r]);
                    bwh_point_buff.push(comp_id);
                    if (bwh_cbuff[id].length <= 1400) {
                        bwh_cbuff[id].push(bwh_color[id]);
                        bwh_cbuff[id + 1].push(bwh_color[id + 1]);
                    }
                    //Remove Old Points from Graph
                    if (bwh_dbuff[id].length > 1400) {
                        bwh_dbuff[id].shift();
                        bwh_dbuff[id + 1].shift();
                        bwh_point_buff.shift();
                    }
//                    console.log("IF time "+ time +" span "+  bwh_prev_tspan)
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = bwh_prev_tspan;
                    bwhist_prv_csc_cnt[id]++;
                    if (bwhist_prv_csc_cnt[id] > 3) {
                        bwh_dbuff[id].pop();
                        bwhist_prv_ts[id] = time;
                    }
//                    console.log("ELSE time "+ time +" span "+  bwh_prev_tspan)
                }
            }
        }
    } else {
        console.log('Invalid Bandwidth History Data');
    }
};

bwh_update_end = function (id) {
    bwh_plot[id].updateOptions({'file': bwh_dbuff[id]});
    bwh_plot[id + 1].updateOptions({'file': bwh_dbuff[id + 1]});
    hide_history_loading();
};

// All Sessions List

var max_session_data_point = 0;
var max_session_count = 0;
var url_discovery_count = 0;
var url_discovery_que_id = 0;

var all_sessions_make_request = function (req_data) {
    var req = new Uint32Array(23);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.lid);
    req[1] = req_data.uid;
    req[2] = req_data.loc;
    req[3] = pq_2_16_32(req_data.sipv, req_data.dipv);
    req[4] = req_data.sip0;
    req[5] = req_data.sip1;
    req[6] = req_data.sip2;
    req[7] = req_data.sip3;
    req[8] = req_data.dip0;
    req[9] = req_data.dip1;
    req[10] = req_data.dip2;
    req[11] = req_data.dip3;
    req[12] = pq_2_16_32(req_data.sport, req_data.dport);
    req[13] = pq_2_16_32(req_data.vid, req_data.prot);
    req[14] = req_data.app;
    req[15] = req_data.sipr0;
    req[16] = req_data.sipr1;
    req[17] = req_data.sipr2;
    req[18] = req_data.sipr3;
    req[19] = req_data.dipr0;
    req[20] = req_data.dipr1;
    req[21] = req_data.dipr2;
    req[22] = req_data.dipr3;
//    console.log(req)
    return req.buffer;
};

all_sessions_update_start = function (id, end_point, max_point, ses_que_id, ses_dis_count) {
    url_discovery_count = ses_dis_count;
    url_discovery_que_id = ses_que_id;
    if (session_table) {
        session_table.clear();
    }
    max_session_data_point = (uint32_float(max_point) * 1000000) / 8;
};

all_sessions_update = function (id, data) {

//    console.log(data.length +'_'+data)

    var v_indicate;
    if (data.length % 16 === 0) {

        for (var i = 0; i < data.length; i = i + 16) {
            var sip_type = pq_32_2_16(data[i]).one;
            var dip_type = pq_32_2_16(data[i]).two;

            var protocol = pq_32_2_16(data[i + 10]).two;
//            var vid = pq_32_2_16(data[i + 10]).one;
            if (protocol === 6) {
                protocol = 'TCP';
            } else {
                protocol = 'UDP';
            }
            var app_id = data[i + 11];
            var flow_count = 1;
//            v_indicate = vid + "";

//            if (vid === 8191 || vid === 4095) {
            v_indicate = "non-vlan";
//            }

            var app_name;
            if (data[i + 11] < application_list.length) {
                app_name = application_list[data[i + 11]];
            } else {
                app_name = pq_services_list[data[i + 11] - application_list.length + 1];
            }
            session_table.row.add([rec_ip_decode(sip_type, data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), '-', sip_type, rec_ip_decode(dip_type, data[i + 5], data[i + 6], data[i + 7], data[i + 8], 1), dip_type, (data[i + 9] & 0xFFFF), (data[i + 9] >>> 16), protocol, v_indicate, app_name, data[i + 12], data[i + 13], max_session_data_point, data[i + 15]]);
        }
    } else {
        console.log('Invalid Sesson Data');
    }
};

all_sessions_update_end = function (id) {
//    if (url_discovery_count > 0) {
//        q_sessions_update_with_url(session_table, 1);
//    } else {
    hide_update_indicator('#pq_session_ud_indicator');
    session_table.draw(false);
//    }
};

// Quarried Sessions List

q_sessions_update_start = function (type, max_sessions, max_point, url_que_id, url_dis_count) {
    //alert(max_sessions + " " + max_point);
    if (type === SESSION_SOURCE_UPDATE) {
        url_discovery_count = url_dis_count;
        url_discovery_que_id = url_que_id;
        if (source_table) {
            source_table.clear();
        }
    } else if (type === SESSION_DEST_UPDATE) {
        url_discovery_count = url_dis_count;
        url_discovery_que_id = url_que_id;
        if (destination_table) {
            destination_table.clear();
        }
    } else if (type === SESSION_APP_UPDATE) {
        if (app_table) {
            app_table.clear();
        }
    } else if (type === SESSION_SVS_UPDATE) {
        if (ses_service_table) {
            ses_service_table.clear();
        }
    } else {
        console.log("Error: Unknown Session Type Start");
    }
    max_session_count = max_sessions;
    max_session_data_point = (uint32_float(max_point) * 1000000) / 8;
};

q_sessions_update = function (type, data) {
//    console.log(data.length + '_' + data)
    if (data.length % 8 === 0) {
        if (type === SESSION_SOURCE_UPDATE) {
            for (var i = 0; i < data.length; i = i + 8) {
                source_table.row.add([rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), "_", data[i + 5], (uint32_float(data[i + 6]) * 1000000) / 8, (uint32_float(data[i + 7]) * 1000000) / 8, ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
            }
        } else if (type === SESSION_DEST_UPDATE) {
            for (var i = 0; i < data.length; i = i + 8) {
                destination_table.row.add([rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), '-', data[i + 5], (uint32_float(data[i + 6]) * 1000000) / 8, (uint32_float(data[i + 7]) * 1000000) / 8, ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
            }
        } else if (type === SESSION_APP_UPDATE) {
            for (var i = 0; i < data.length; i = i + 8) {
//                console.log(data[i],data[i + 1], data[i + 2], data[i + 3], data[i + 4],data[i + 5], data[i + 6], data[i + 7]);
                if (data[i + 1] >= application_list.length) {
                    app_table.row.add([pq_services_list[data[i + 1] - application_list.length + 1], data[i + 5], (uint32_float(data[i + 6]) * 1000000) / 8, (uint32_float(data[i + 7]) * 1000000) / 8, ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8, max_session_data_point, max_session_count, data[i + 1]]);
                } else {
                    app_table.row.add([application_list[data[i + 1]], data[i + 5], (uint32_float(data[i + 6]) * 1000000) / 8, (uint32_float(data[i + 7]) * 1000000) / 8, ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8, max_session_data_point, max_session_count, data[i + 1]]);
                }
            }
        } else if (type === SESSION_SVS_UPDATE) {
            for (var i = 0; i < data.length; i = i + 8) {
                ses_service_table.row.add([pq_services_list[data[i + 1]], data[i + 5], (uint32_float(data[i + 6]) * 1000000) / 8, (uint32_float(data[i + 7]) * 1000000) / 8, ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8, max_session_data_point, max_session_count, data[i + 1]]);
            }
        } else {
            console.log("Error: Unknown Session Type Start");
        }
    } else {
        console.log('Invalid Sesson Data');
    }
};

q_sessions_update_with_url = function (table, col_id) {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, url_discovery_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
//        console.log("URL List " + data)
        var element = data.split(";");
        var num_rows = table.rows().count();
        for (var url_count = 0; url_count < element.length - 1; url_count++) {
            if (num_rows >= url_count && element[url_count] !== '') {
                table.cell(url_count, col_id).data(element[url_count]);
            }
        }
        table.draw(false);
        hide_update_indicator('#pq_session_ud_indicator');
        hide_update_indicator('#pq_source_ud_indicator');
        hide_update_indicator('#pq_destination_ud_indicator');
    }).fail(function () {
        table.draw(false);
        hide_update_indicator('#pq_session_ud_indicator');
        hide_update_indicator('#pq_source_ud_indicator');
        hide_update_indicator('#pq_destination_ud_indicator');
    });
};

q_sessions_update_end = function (type) {

    if (type === SESSION_SOURCE_UPDATE) {
        if (url_discovery_count > 0) {
            q_sessions_update_with_url(source_table, 1);
        } else {
            source_table.draw(false);
            hide_update_indicator('#pq_source_ud_indicator');
        }
    } else if (type === SESSION_DEST_UPDATE) {
        if (url_discovery_count > 0) {
            q_sessions_update_with_url(destination_table, 1);
        } else {
            destination_table.draw(false);
            hide_update_indicator('#pq_destination_ud_indicator');
        }
    } else if (type === SESSION_APP_UPDATE) {
        app_table.draw(false);
        hide_update_indicator('#pq_application_ud_indicator');
    } else if (type === SESSION_SVS_UPDATE) {
        ses_service_table.draw(false);
        hide_update_indicator('#pq_service_ud_indicator');
    } else {
        console.log("Error: Unknown Session Type End");
    }
};

// Summary Data Updates

var smy_ob_src_items = 0;
var smy_ob_des_items = 0;
var smy_ob_app_items = 0;
var smy_ob_prt_items = 0;
var smy_ob_read_count = 0;
var dash_que_id = 0;
var dash_ad_count = 0;
var data_pq_sum_srcs_ip = [];
var data_pq_sum_dests_ip = [];
var data_pq_dash_dlink_items = [];
var data_pq_dash_ulink_items = [];
var dash_ad_elements = [];

q_smry_update_start = function (data) {
//    console.log("SUmmary data " + data)
    smy_ob_src_items = data[1];
    smy_ob_des_items = data[2] + smy_ob_src_items;
    smy_ob_app_items = data[3] + smy_ob_des_items;
    smy_ob_prt_items = data[4] + smy_ob_app_items;

    dash_que_id = data[5];
    dash_ad_count = data[6];
    dash_ad_elements = [];
    data_pq_sum_srcs_ip = [];
    data_pq_sum_dests_ip = [];

    data_pq_sum_srcs.length = 0;
    data_pq_sum_dests.length = 0;
    data_pq_sum_apps.length = 0;
    smy_ob_read_count = 0;

    $('#pq_mw_session_count span').text(data[7]);
};

q_smry_update = function (data) {

    for (var i = 0; i < data.length; i = i + 8) {
        smy_ob_read_count++;
        if (smy_ob_read_count <= smy_ob_src_items) {
//            console.log("src: " +num2dot(data[i]));
            data_pq_sum_srcs.push({label: rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), value: ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8});
            data_pq_sum_srcs_ip.push(rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1));
        } else if (smy_ob_read_count <= smy_ob_des_items) {
//            console.log((data[i]));
            data_pq_sum_dests.push({label: rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), value: ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8});
            data_pq_sum_dests_ip.push(rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1));
        } else if (smy_ob_read_count <= smy_ob_app_items) {
            if (data[i + 1] > 0) {
                data_pq_sum_apps.push({label: application_list[data[i + 1]], value: ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8});
            }
        } else {
            var prot = data[i] >>> 16;
            var port = data[i] & 0xFFFF;
            //console.log(data[i + 1] + " " + port + "  " + prot);
        }
    }
};

q_smry_update_end = function (data) {

    if (CURRENT_WINDOW !== WINDOW_USER_SUMMARY) {
        return;
    }
    if (smy_ob_src_items > 0) {
        if (dash_ad_count > 0) {
            q_smry_update_with_ad_users();
        } else {
            pq_mod_pie_update(pie_pq_sum_srcs_wrap, 0, 10);
        }
    }
    if (smy_ob_des_items > 0) {
        if (dash_ad_count === 0 || dash_ad_count === undefined) {
            pq_mod_pie_update(pie_pq_sum_dests_wrap, 1, 10);
        }
    }
    if (smy_ob_app_items > 0) {
        pq_mod_pie_update(pie_pq_sum_apps_wrap, 2, 10);
    }
};

q_smry_update_with_ad_users = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, dash_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        dash_ad_elements = data.split(";");
        for (var usr_count = 0; usr_count < dash_ad_elements.length - 1; usr_count++) {
            if (dash_ad_elements[usr_count] !== "") {
                if (usr_count < smy_ob_src_items) {
                    data_pq_sum_srcs[usr_count].label = dash_ad_elements[usr_count];
                } else if (usr_count < smy_ob_des_items) {
                    data_pq_sum_dests[usr_count - smy_ob_src_items].label = dash_ad_elements[usr_count];
                }
            }
        }
        pq_mod_pie_update(pie_pq_sum_srcs_wrap, 0, 10);
        pq_mod_pie_update(pie_pq_sum_dests_wrap, 1, 10);
    }).fail(function () {
        console.error('Problems when posting...');
    });
};

// Dashboard Source Data Updates
var smy_dashPie_ulink_items = 0;
var smy_dashPie_dlink_items = 0;
var smy_dashPie_read_count = 0;
var total_data_sent_dashPie = 0;
var total_data_received_dashPie = 0;
var init_max_srcDestAppServ_dlink = null;
var dashPie_obj_flag = true;

q_smry_dashPie_update_start = function (data) {
//    console.log("q_smry_dashPie_update_start_"+data)

    if (data[1] == 0) {
        $('#dlink').css('display', 'none');
        $('#pq_downlink_no_avil').css('display', 'block');
    } else {
        $('#pq_downlink_no_avil').css('display', 'none');
        $('#dlink').css('display', 'block');
    }
    if (data[2] == 0) {
        $('#uplink').css('display', 'none');
        $('#pq_uplink_no_avil').css('display', 'block');
    } else {
        $('#pq_uplink_no_avil').css('display', 'none');
        $('#uplink').css('display', 'block');
    }

    smy_dashPie_ulink_items = data[1];
    smy_dashPie_dlink_items = data[2] + smy_dashPie_ulink_items;

    dash_que_id = data[5];
    dash_ad_count = data[6];

    data_pq_dash_dlink_items = [];
    data_pq_dash_ulink_items = [];
//    console.log("UPD STRT " + smy_dashPie_ulink_items + '_' + smy_dashPie_dlink_items)
    total_data_sent_dashPie = (uint32_float(data[3]) / 8) * 1000000;
    total_data_received_dashPie = (uint32_float(data[4]) / 8) * 1000000;
    data_dashPie_dlink.length = 0;
    data_dashPie_ulink.length = 0;
    smy_dashPie_read_count = 0;
    smy_ob_src_dlink_read_count = 0;
    dashPie_dlink_table.clear().draw();
    dashPie_ulink_table.clear().draw();
};

q_smry_dashPie_update = function (data) {

//    console.log(data)

    for (var i = 0; i < data.length; i = i + 8) {

        smy_dashPie_read_count++;
        if (smy_dashPie_read_count <= smy_dashPie_ulink_items) {

            if (dashPieCat === 3) {
                data_pq_dash_ulink_items.push(application_list[data[i + 1]]);
                data_dashPie_ulink.push({label: application_list[data[i + 1]], value: (uint32_float(data[i + 6]) * 1000000) / 8, color: pieColorScheme[smy_dashPie_read_count - 1]});
                dashPie_ulink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,5)'>" + application_list[data[i + 1]] + "</a>", pq_get_usage((uint32_float(data[i + 6]) * 1000000) / 8), (((uint32_float(data[i + 6]) * 1000000) / 8) * 100 / total_data_sent_dashPie).toFixed(2) + ' %']);
            } else {
                data_pq_dash_ulink_items.push(rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1));
                data_dashPie_ulink.push({label: rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), value: (uint32_float(data[i + 6]) * 1000000) / 8, color: pieColorScheme[smy_dashPie_read_count - 1]});
                dashPie_ulink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,parseInt(dashPieCat+2))'>" + rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1) + "</a>", pq_get_usage((uint32_float(data[i + 6]) * 1000000) / 8), (((uint32_float(data[i + 6]) * 1000000) / 8) * 100 / total_data_sent_dashPie).toFixed(2) + ' %']);
//                console.log(uint32_float(data[i + 6]), dashPie_ulink_table.rows().count())
            }
        } else if (smy_dashPie_read_count <= smy_dashPie_dlink_items) {

            smy_ob_src_dlink_read_count++;

            if (dashPieCat === 3) {

                if (dashPie_obj_flag) {
                    dashPie_obj_flag = false;
                    init_max_srcDestAppServ_dlink = application_list[data[i + 1]];
                    dashPie_clk_seg = init_max_srcDestAppServ_dlink;
                }
                data_pq_dash_dlink_items.push(application_list[data[i + 1]]);
                data_dashPie_dlink.push({label: application_list[data[i + 1]], value: (uint32_float(data[i + 7]) * 1000000) / 8, color: pieColorScheme[smy_ob_src_dlink_read_count - 1]});
                dashPie_dlink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,5)'>" + application_list[data[i + 1]] + "</a>", pq_get_usage((uint32_float(data[i + 7]) * 1000000) / 8), (((uint32_float(data[i + 7]) * 1000000) / 8) * 100 / total_data_received_dashPie).toFixed(2) + ' %']);
            } else {

                if (dashPie_obj_flag) {
                    dashPie_obj_flag = false;
                    init_max_srcDestAppServ_dlink = rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1);
                    dashPie_clk_seg = init_max_srcDestAppServ_dlink;
                }
                data_pq_dash_dlink_items.push(rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1));
                data_dashPie_dlink.push({label: rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1), value: (uint32_float(data[i + 7]) * 1000000) / 8, color: pieColorScheme[smy_ob_src_dlink_read_count - 1]});
                dashPie_dlink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,parseInt(dashPieCat+2))'>" + rec_ip_decode(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1) + "</a>", pq_get_usage((uint32_float(data[i + 7]) * 1000000) / 8), (((uint32_float(data[i + 7]) * 1000000) / 8) * 100 / total_data_received_dashPie).toFixed(2) + ' %']);
//                console.log(uint32_float(data[i + 7]), dashPie_dlink_table.rows().count())
            }
        } else {
            var prot = data[i] >>> 16;
            var port = data[i] & 0xFFFF;
            //console.log(data[i + 1] + " " + port + "  " + prot);
        }
    }
};

q_smry_src_update_end = function (data) {

    if (smy_dashPie_ulink_items > 0) {
        if (dash_ad_count > 0) {
            q_smry_dashPie_update_with_ad_users();
        } else {
            dashPie_ulink_table.draw(false);
        }
        pie_pq_dashPie_ulink.updateProp("data.content", data_dashPie_ulink);
    }
    if (smy_dashPie_dlink_items > smy_dashPie_ulink_items) {
        if (dash_ad_count === 0 || dash_ad_count === undefined) {
            dashPie_dlink_table.draw(false);
        }
        pie_pq_dashPie_dlink.updateProp("data.content", data_dashPie_dlink);
    }
};

q_smry_dashPie_update_with_ad_users = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, dash_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
//        console.log("AD UPDATE")

        var dashPie_ad_elements = data.split(";");

        var num_rows_tbd = dashPie_dlink_table.rows().count();
        var num_rows_tbu = dashPie_ulink_table.rows().count();

        for (var elm_count = 0; elm_count < num_rows_tbd; elm_count++) {
            if (num_rows_tbd >= elm_count && dashPie_ad_elements[smy_dashPie_ulink_items + elm_count] !== '') {
                dashPie_dlink_table.cell(elm_count, 1).data("<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,6," + elm_count + ")'>" + dashPie_ad_elements[smy_dashPie_ulink_items + elm_count] + "</a>");
            }
        }
        for (var elm_count = 0; elm_count < num_rows_tbu; elm_count++) {
            if (num_rows_tbu >= elm_count && dashPie_ad_elements[elm_count] !== '') {
                dashPie_ulink_table.cell(elm_count, 1).data("<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,7," + elm_count + ")'>" + dashPie_ad_elements[elm_count] + "</a>");
            }
        }
        dashPie_dlink_table.draw(false);
        dashPie_ulink_table.draw(false);

    }).fail(function () {
        console.error('Problems when posting...');
    });
};

var lsumry_que_id = 0;
var lsumry_ad_count = 0;

lsumry_update_start = function (data) {
    lsumry_que_id = data[5];
    lsumry_ad_count = data[6];
    data_pq_live_usage.length = 0;
};

lsumry_update = function (type, data) {

    for (var i = 0; i < data.length; i = i + 8) {
        if (data[i] >= 0) {
            if (type == LSUM_DES_T_APP || type == LSUM_SRC_T_APP) {
                data_pq_live_usage.push({label: application_list[data[i + 1]], value: ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8});
            } else if (type == LSUM_DES_T_SVS || type == LSUM_SRC_T_SVS) {
                data_pq_live_usage.push({label: pq_services_list[data[i + 1]], value: ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8});
            } else {
                data_pq_live_usage.push({label: rec_ip_decode(parseInt(data[i]), parseInt(data[i + 1]), parseInt(data[i + 2]), parseInt(data[i + 3]), parseInt(data[i + 4]), 1), value: ((uint32_float(data[i + 6]) + uint32_float(data[i + 7])) * 1000000) / 8});
            }
        }
    }
};

lsumry_update_end = function (data) {
    if (data_pq_live_usage.length > 0) {
        if (lsumry_ad_count > 0) {
            lsumry_update_with_ad_users();
        } else {
            pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 10);
        }
    }
};

lsumry_update_with_ad_users = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, lsumry_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        var element = data.split(";");
        for (var usr_count = 0; usr_count < element.length - 1; usr_count++) {
            if (element[usr_count] !== "") {
                data_pq_live_usage[usr_count].label = element[usr_count];
            }
        }
        pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 10);

    }).fail(function () {
        console.error('Problems when posting...');
    });
};

//S-C Diagram 
var durl_discovery_count = 0;
var durl_discovery_que_id = 0;
var sc_diagram_mask = 0;
var sc_diagram_start_type = 0;
var sc_diagram_parent_que = [];
var sc_diagram_parent_id = 0;
var sc_diagram_parent_type = 0;
var sc_diagram_url_element = [];

var sc_diagram_make_request = function (req_data) {

    if (req_data.id == APP_DIAGRAM || req_data.id == SVS_DIAGRAM) {
        var ipt = 0;
        var ip = req_data.ip;
    } else {
        var ipt = decode_ip_version(req_data.ip);
        var ip = send_ip_encode(ipt, req_data.ip, 1);
    }

    var req = new Uint32Array(10);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = ipt;
    req[3] = ip[0];
    req[4] = ip[1];
    req[5] = ip[2];
    req[6] = ip[3];
    req[7] = pq_2_16_32(req_data.mask, 0);
    req[8] = 0;
    req[9] = 0;
    return req.buffer;
};

var pre_ip = 0;
var ip_node_id = 0;
var port_node_id = 0;
var sc_port_map = [];

sc_diagram_update_start = function (id, type, mask_type, d_url_que_id, d_url_dis_count) {
    sc_diagram_mask = mask_type;
    sc_diagram_start_type = type;
    durl_discovery_count = d_url_dis_count;
    durl_discovery_que_id = d_url_que_id;
    sc_port_map.length = 0;

    pre_ip = 0;
    ip_node_id = 0;
    port_node_id = 0;
    sc_diagram_parent_que.length = 0;
};

sc_diagram_update = function (id, type, data) {

    var act_length = data.length;
    if (data.length % 13 != 0) {
        act_length--;
    }

    if (act_length % 13 === 0) {
        sc_diagram_parent_que.push(data);
        sc_diagram_parent_id = id;
        sc_diagram_parent_type = type;
    } else {
        console.log('Invalied SC-Diagram Data');
    }
};

sc_diagram_run_collective_update = function () {

    while (sc_diagram_parent_que.length > 0) {
        var data = sc_diagram_parent_que.shift();
        var act_length = data.length;

        if (data.length % 13 != 0) {
            act_length--;
        }

        for (var i = 0; i < act_length; i = i + 13) {
//            console.log(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], data[i + 5], data[i + 6], data[i + 7], data[i + 8], data[i + 9], data[i + 10], data[i + 11], data[i + 12]);
            var url = '';
            if (sc_diagram_url_element.length > 0) {
                url = sc_diagram_url_element.shift();
            }
            var ip1v = parseInt(pq_32_2_16(data[i]).one);
            var ip2v = parseInt(pq_32_2_16(data[i]).two);
            var ip1 = rec_ip_decode(ip1v, data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1);
            var ip2 = rec_ip_decode(ip2v, data[i + 5], data[i + 6], data[i + 7], data[i + 8], 1);
//            console.log(ip1, ip2);
            var count = data[i + 10];// >>> 16;
            var port = data[i + 9];//& 0xFFFF;
            var data_w;
            var d_mask = decode_subnet_mask(ip1);

            var port_id = port;
            if (sc_diagram_parent_id == SCD_TRAFIC) {
                data_w = 1 + ((uint32_float(data[i + 11]) + uint32_float(data[i + 12])) * 1000000) / 8;
                if (sc_diagram_start_type != APP_DIAGRAM && sc_diagram_start_type != SVS_DIAGRAM)
                {
                    if (sc_diagram_mask < d_mask) {
                        port_id = ip2;
                        if (sc_diagram_start_type == CLIENT_DIAGRAM) {
                            if (url != '') {
                                port_id = port_id + " (" + url + ")";
                            }
                        }
//                    console.log(port_id);
                    } else {
                        port_id = "port: " + (pq_pad(port, 5, '0') + "");

                    }
                } else {
                    port_id = "port: " + (pq_pad(port, 5, '0') + "");
                }
            } else if (sc_diagram_parent_id == SCD_SESSIONS) {
                data_w = 1 + count;
                if (sc_diagram_mask < d_mask) {
                    port_id = ip2;
                    if (sc_diagram_start_type == CLIENT_DIAGRAM) {
                        if (url != '') {
                            port_id = port_id + " (" + url + ")";
                        }
                    }
                } else {
                    port_id = "port: " + (pq_pad(port, 5, '0') + "");
                }
            } else {
                data_w = 1 + port;
                if (sc_diagram_mask < d_mask) {
                    port_id = ip2;
                    if (sc_diagram_start_type == CLIENT_DIAGRAM) {
                        if (url != '') {
                            port_id = url + " (" + port_id + ")";
                        }
                    }
                    port_id = port_id + " - " + port;
                }
                port_id = port_id + ' ms'
            }

            if (pre_ip !== ip1) { //New Server Node
                var ip_node_name = (ip1);
                if (sc_diagram_start_type == CLIENT_DIAGRAM && sc_diagram_mask < d_mask) {

                } else {
                    if (url != '') {
                        ip_node_name = ip_node_name + " (" + url + ")";
                    }
                }
                sc_sd_diagram.nodes.push({
                    "name": ip_node_name,
                    "id": (ip1)
                });
                if (sc_digram_colors[(ip1)] == null) {
                    sc_digram_colors[(ip1)] = randomColor({
                        luminosity: 'bright'
                    });
                }
                ip_node_id = sc_sd_diagram.nodes.length - 1;
                sc_sd_diagram.links.push({
                    "source": 0,
                    "value": data_w,
                    "target": ip_node_id
                });
            }

            if (sc_port_map[port] == null) {
                sc_sd_diagram.nodes.push({
                    "name": port_id + "",
                    "id": port + ""
                });
                port_node_id = sc_sd_diagram.nodes.length - 1;
                sc_port_map[port] = port_node_id;
            } else {
                port_node_id = sc_port_map[port];
            }

            if (sc_digram_colors[port_id] == null) {
                sc_digram_colors[port_id] = randomColor({
                    luminosity: 'bright'
                });
            }

            sc_sd_diagram.links.push({
                "source": ip_node_id,
                "value": data_w,
                "target": port_node_id
            });
            pre_ip = ip1;
        }
    }
};

sc_diagram_update_with_url = function (table, col_id) {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, durl_discovery_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        sc_diagram_url_element = data.split(";");
        sc_diagram_run_collective_update();
        run_diagram();
    }).fail(function () {
        sc_diagram_run_collective_update();
        run_diagram();
    });
};

sc_diagram_update_end = function (type) {
    sc_diagram_url_element.length = 0;
    if ((type === SERVER_DIAGRAM && sc_diagram_mask >= 32) || durl_discovery_count === 0) {
        sc_diagram_run_collective_update();
        run_diagram();
    } else {
        sc_diagram_update_with_url();
    }
};

//T-C Diagram

var turl_discovery_count = 0;
var turl_discovery_que_id = 0;
var tc_diagram_parant_que = [];
var tc_diagram_parant_id = 0;
var tc_diagram_parant_type = 0;
var tc_diagram_url_element = [];
var tc_diagram_ad_user_map = [];

var tc_diagram_make_request = function (req_data) {

    var req = new Uint32Array(22);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = pq_2_16_32(req_data.sipv, req_data.dipv);
    req[3] = req_data.sip0;
    req[4] = req_data.sip1;
    req[5] = req_data.sip2;
    req[6] = req_data.sip3;
    req[7] = req_data.dip0;
    req[8] = req_data.dip1;
    req[9] = req_data.dip2;
    req[10] = req_data.dip3;
    req[11] = pq_2_16_32(req_data.sport, req_data.dport);
    req[12] = pq_2_16_32(req_data.vid, req_data.prot);
    req[13] = req_data.app;
    req[14] = req_data.sipr0;
    req[15] = req_data.sipr1;
    req[16] = req_data.sipr2;
    req[17] = req_data.sipr3;
    req[18] = req_data.dipr0;
    req[19] = req_data.dipr1;
    req[20] = req_data.dipr2;
    req[21] = req_data.dipr3;
//    console.log(req)
    return req.buffer;
};

tc_diagram_update_start = function (type, id, d_url_que_id, d_url_dis_count) {
    turl_discovery_count = d_url_dis_count;
    turl_discovery_que_id = d_url_que_id;
    tc_dgam_data.length = 0;
    tc_diagram_parant_que.length = 0;
    tc_diagram_ad_user_map = [];
};

trafic_diagram_update = function (type, data) {

    var data_length = data.length;
    if (data_length % 11 !== 0) {
        data_length = data_length - 1;
    }

    if (data_length % 11 === 0) {
        tc_diagram_parant_que.push(data);
        tc_diagram_parant_type = type;
    } else {
        console.log('Invalid TC-Diagram Data');
    }
};

tc_diagram_collective_update = function () {
    while (tc_diagram_parant_que.length > 0) {
        var data = tc_diagram_parant_que.shift();

        var data_length = data.length;
        if (data_length % 11 !== 0) {
            data_length = data_length - 1;
        }

        for (var i = 0; i < data_length; i = i + 11) {
            var ipv = pq_32_2_16(data[i]);
            var sip_ver = ipv.one;
            var dip_ver = ipv.two;
//            var user = '';
            var url = '';

            if (tc_diagram_url_element.length > 0) {
//                user = tc_diagram_url_element.shift();
                url = tc_diagram_url_element.shift();
            }
//            var ip_src = num2dot(data[i]);
//            var ip_node_name = num2dot(data[i + 1]);

            var ip_node_name = rec_ip_decode(dip_ver, data[i + 5], data[i + 6], data[i + 7], data[i + 8], 1);
            var sip = rec_ip_decode(sip_ver, data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1);



//            if (user !== '') {
//                ip_src = user;
//                tc_diagram_ad_user_map[user] = num2dot(data[i]);
//                if (tc_dgam_colours[user] == null) {
//                    tc_dgam_colours[user] = randomColor({
//                        luminosity: 'bright'
//                    });
//                }
//            } else {
            if (tc_dgam_colours[rec_ip_decode(sip_ver, data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1)] == null) {
                tc_dgam_colours[rec_ip_decode(sip_ver, data[i + 1], data[i + 2], data[i + 3], data[i + 4], 1)] = randomColor({
                    luminosity: 'bright'
                });
            }
//            }
            if (url !== '') {
                ip_node_name = url + " (" + ip_node_name + ")";
            }
            tc_dgam_data.push([sip, ip_node_name, (uint32_float(data[i + 9]) * 1000000) / 8, (uint32_float(data[i + 10]) * 1000000) / 8]);
        }
    }
};

tc_diagram_update_with_url = function (table, col_id) {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, turl_discovery_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        tc_diagram_url_element = data.split(";");
        tc_diagram_collective_update();
        draw_trafic_diagram();
    }).fail(function () {
        tc_diagram_collective_update();
        draw_trafic_diagram();
    });
};

session_diagram_update = function (type, data) {

};

tc_diagram_update_end = function (type, id) {
    if (type == TRAFFIC_DIAGRAM) {
        if (turl_discovery_count > 0) {
            tc_diagram_update_with_url();
        } else {
            tc_diagram_collective_update();
            draw_trafic_diagram();
        }

    } else if (type == SESSION_DIAGRAM) {

    }
};

//Informations-Request

var info_get_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    return req.buffer;
};

info_get_update = function (type, id, data) {

    if (type == INFO_MANW_ST_RQ) {
        $('#pq_mw_event_count').text('Events: ' + data[0]);
        $('#pq_mw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_mw_session_count').text('Total Sessions: ' + data[2]);
        $('#pq_sw_event_count').text('Events: ' + data[0]);
        $('#pq_sw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_sw_session_count').text('Total Sessions: ' + data[2]);
        var uptime = data[3];
        var days = Math.floor(uptime / (60 * 60 * 24));
        uptime -= days * (60 * 60 * 24);
        var hours = Math.floor(uptime / (60 * 60));
        uptime -= hours * (60 * 60);
        var mins = Math.floor(uptime / (60));
        $('#pq_mw_uptime').text(days + ' day(s) ' + hours + ' hour(s) ' + mins + ' min(s)');
        $('#pq_sw_uptime').text(days + ' day(s) ' + hours + ' hour(s) ' + mins + ' min(s)');

    } else if (type == INFO_MANW_CT_RQ) {
        $('#pq_mw_event_count').text('Events: ' + data[0]);
        $('#pq_mw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_mw_session_count').text('Total Sessions: ' + data[2]);
        $('#pq_sw_event_count').text('Events: ' + data[0]);
        $('#pq_sw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_sw_session_count').text('Total Sessions: ' + data[2]);

    } else if (type === INFO_SETW_RQ) {
        if (data[1] !== 0) {
            $("#license_info").text("Evaluation period ends in " + data[1] + " days");
        }
    } else {
        console.log("unknown info request update");
    }
};

//GUI Sheet Request

var gui_data_get_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    return req.buffer;
};

guid_data_update = function (type, id, data, row_data) {
//    console.log(type, id, data, row_data)
    var data_c = new Uint8Array(row_data);
    if (type === MENUBAR_SHEET) {
//        console.log("GUI Sheets " + data_c)
        if (data_c[0] === 9) {
            if (data_c[1]) {
                $('#set_prof_win').show();
            }
            if (data_c[2]) {
                $('#tab_config').show();
            }
            if (data_c[3]) {
                $('#set_mgmt_win').show();
            }
            if (data_c[4]) {
                $('#tab_set').show();
            }
            if (data_c[5]) {
                $('#set_info_win').show();
            }
            if (data_c[6]) {
                $('#set_maint_win').show();
            }
            if (data_c[7]) {
                if (data_c[7] === 1) {
                    SET_PRIMARY = true;
                } else {
                    SET_PRIMARY = false;
                }
            }
            if (data_c[8]) {
                $('#Quota_Panel').show();
            }
            if (data_c[9]) {
                $('#set_ha_win').show();
            }
        }
    } else if (type === PROPERTY_SHEET) {
        if (id === 0) { //user table propaties
            user_add_proprty_sheet = String.fromCharCode.apply(null, new Uint8Array(row_data, 1, data_c[0]));
        } else {
            console.log('invalied property sheet type');
        }
    } else {
        console.log('invalied gui sheet type');
    }
};

//Request Reply Updater

var cjs_req_conn;
var cjs_request;
var cjs_request_type = 0;
var cjs_request_que = [];
var cjs_request_status = 'none';

var cjs_make_request = function (type, request) {

    if (cjs_request_status === 'relax') {
        cjs_request_status = 'busy';
        if (type === SESSION_LIST_UPDATE ||
                type === SESSION_SOURCE_UPDATE ||
                type === SESSION_DEST_UPDATE ||
                type === SESSION_APP_UPDATE ||
                type === SESSION_SVS_UPDATE ||
                type === SUMRY_SRC_UPDATE ||
                type === SUMRY_DEST_UPDATE ||
                type === SUMRY_APP_UPDATE ||
                type === SUMRY_SDC_UPDATE ||
                type === LSUMRY_UPDATE) {
            cjs_req_conn.send(all_sessions_make_request(request));
        } else if (type === GRAPH_BH_UPDATE) {
            cjs_req_conn.send(bwh_make_request(request));
//        } else if (type === TIMESTAMP_UPDATE) {
//            cjs_req_conn.send(tgap_change_request(request));
        } else if (type === SERVER_DIAGRAM ||
                type === CLIENT_DIAGRAM) {
            cjs_req_conn.send(sc_diagram_make_request(request));
        } else if (type === TRAFFIC_DIAGRAM ||
                type === SESSION_DIAGRAM) {
            cjs_req_conn.send(tc_diagram_make_request(request));
        } else if (type === INFO_MANW_CT_RQ ||
                type === INFO_MANW_ST_RQ ||
                type === INFO_SETW_RQ) {
            cjs_req_conn.send(info_get_request(request));
        } else if (type === MENUBAR_SHEET ||
                type === PROPERTY_SHEET) {
            cjs_req_conn.send(gui_data_get_request(request));
        } else if (type === 200) {
            cjs_req_conn.send(cjs_make_auth_req(request));
        } else {
            console.log("unidentified cjs request!");
        }
    } else {
        cjs_request_que.push([type, request]);
    }
};

var cjs_try_make_request = function () {
    if (cjs_request_status === 'relax') {
        if (cjs_request_que.length > 0) {
            cjs_request_status = 'busy';
            var req = cjs_request_que.shift();
            if (req[0] === SESSION_LIST_UPDATE ||
                    req[0] === SESSION_SOURCE_UPDATE ||
                    req[0] === SESSION_DEST_UPDATE ||
                    req[0] === SESSION_APP_UPDATE ||
                    req[0] === SESSION_SVS_UPDATE ||
                    req[0] === SUMRY_SRC_UPDATE ||
                    req[0] === SUMRY_DEST_UPDATE ||
                    req[0] === SUMRY_APP_UPDATE ||
                    req[0] === SUMRY_SDC_UPDATE ||
                    req[0] === LSUMRY_UPDATE) {
                cjs_req_conn.send(all_sessions_make_request(req[1]));
            } else if (req[0] === GRAPH_BH_UPDATE) {
                cjs_req_conn.send(bwh_make_request(req[1]));
//            } else if (req[0] === TIMESTAMP_UPDATE) {
//                cjs_req_conn.send(tgap_change_request(req[1]));
            } else if (req[0] === SERVER_DIAGRAM ||
                    req[0] === CLIENT_DIAGRAM) {
                cjs_req_conn.send(sc_diagram_make_request(req[1]));
            } else if (req[0] === TRAFFIC_DIAGRAM ||
                    req[0] === SESSION_DIAGRAM) {
                cjs_req_conn.send(tc_diagram_make_request(req[1]));
            } else if (req[0] === INFO_MANW_CT_RQ ||
                    req[0] === INFO_MANW_ST_RQ ||
                    req[0] === INFO_SETW_RQ) {
                cjs_req_conn.send(info_get_request(req[1]));
            } else if (req[0] === MENUBAR_SHEET ||
                    req[0] === PROPERTY_SHEET) {
                cjs_req_conn.send(gui_data_get_request(req[1]));
            } else if (req[0] === 200) {
//                console.log("In_2")
                cjs_req_conn.send(cjs_make_auth_req(req[1]));
            } else {
                console.log("unidentified cjs request!");
            }
        }
    }
};

var cjs_request_cbk = function (data) {
    var data_q = new Uint32Array(data);
//    console.log("Length: " + data_q.length)
    if (data_q.length === 1 || data_q.length === 3 || data_q.length === 5 || data_q.length === 7 || data_q.length === 9) { //request component
        var rep = pq_32_4_8(data_q[0]);
//        console.log(rep.one, rep.two, rep.three)
        if (rep.one === CJS_REQUEST_START) {
//            console.log("REP: " + rep.one, rep.two, rep.three)
            cjs_request_type = rep;
            if (rep.two === GRAPH_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === GRAPH_BH_UPDATE) {
                    bwh_update_start(rep.four, data_q);
                }
            } else if (rep.two === SESSION_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === SESSION_LIST_UPDATE) {
                    all_sessions_update_start(rep.four, data_q[1], data_q[2], data_q[3], data_q[4]);
                } else if (rep.three === SESSION_SOURCE_UPDATE ||
                        rep.three === SESSION_DEST_UPDATE ||
                        rep.three === SESSION_APP_UPDATE || rep.three === SESSION_SVS_UPDATE) {
                    q_sessions_update_start(rep.three, data_q[1], data_q[2], data_q[3], data_q[4]);
                } else if (rep.three === SUMRY_SRC_UPDATE ||
                        rep.three === SUMRY_DEST_UPDATE ||
                        rep.three === SUMRY_APP_UPDATE) {
                    q_smry_dashPie_update_start(data_q);
//                } else if (rep.three === SUMRY_DEST_UPDATE) {
//                    q_smry_dst_update_start(data_q);
//                } else if (rep.three === SUMRY_APP_UPDATE) {
//                    q_smry_app_update_start(data_q);
                } else if (rep.three === SUMRY_SDC_UPDATE) {
                    q_smry_update_start(data_q);
                } else if (rep.three === LSUMRY_UPDATE) {
                    lsumry_update_start(data_q);
                }

            } else if (rep.two === DIAGRAM_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === SERVER_DIAGRAM || rep.three === CLIENT_DIAGRAM || rep.three === APP_DIAGRAM || rep.three === SVS_DIAGRAM) {
                    sc_diagram_update_start(rep.four, rep.three, data_q[2], data_q[3], data_q[4]);
                } else if (rep.three === SESSION_DIAGRAM || rep.three === TRAFFIC_DIAGRAM) {
                    tc_diagram_update_start(rep.three, rep.four, data_q[3], data_q[4]);
                }
            } else if (rep.two === INFORMATION_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
            } else if (rep.two === GUI_SHEETS) {
                cjs_request = rep;
                cjs_request_type = rep.three;
            } else {
//                console.log(rep.one, rep.two, rep.three)
                console.log("unknown request start");
            }

        } else if (rep.one === CJS_REQUEST_END) {
            cjs_request_type = rep;
            if (rep.two === GRAPH_UPDATE) {
                if (rep.three === GRAPH_BH_UPDATE) {
                    bwh_update_end(rep.four);
                }
            } else if (rep.two === SESSION_UPDATE) {
                if (rep.three === SESSION_LIST_UPDATE) {
                    all_sessions_update_end(rep.four);
                } else if (rep.three === SESSION_SOURCE_UPDATE ||
                        rep.three === SESSION_DEST_UPDATE ||
                        rep.three === SESSION_APP_UPDATE ||
                        rep.three === SESSION_SVS_UPDATE) {
                    q_sessions_update_end(rep.three);
                } else if (rep.three === SUMRY_SRC_UPDATE ||
                        rep.three === SUMRY_DEST_UPDATE ||
                        rep.three === SUMRY_APP_UPDATE) {
                    q_smry_src_update_end(data_q);
//                } else if (rep.three === SUMRY_DEST_UPDATE) {
//                    q_smry_dst_update_end(data_q);
//                } else if (rep.three === SUMRY_APP_UPDATE) {
//                    q_smry_app_update_end(data_q);
                } else if (rep.three === SUMRY_SDC_UPDATE) {
                    q_smry_update_end(data_q);
                } else if (rep.three === LSUMRY_UPDATE) {
                    lsumry_update_end(data_q);
                }
            } else if (rep.two === SETTINGS_UPDATE) {
                if (rep.three === TIMESTAMP_UPDATE) {
                    tgap_update_end(rep.four);
                }
            } else if (rep.two === DIAGRAM_UPDATE) {
                if (rep.three === SERVER_DIAGRAM || rep.three === CLIENT_DIAGRAM || rep.three === APP_DIAGRAM || rep.three === SVS_DIAGRAM) {
                    sc_diagram_update_end(rep.four);
                } else if (rep.three === SESSION_DIAGRAM || rep.three === TRAFFIC_DIAGRAM) {
                    tc_diagram_update_end(rep.three, rep.four);
                }
            } else if (rep.two === INFORMATION_UPDATE) {
                //Nothing to do here             
            } else if (rep.two === GUI_SHEETS) {
                //Nothing to do here                    
            } else if (rep.two === 200) {
//                console.log("In_3")
                //Nothing to do here
            } else {
                console.log("unknown request end");
            }

            cjs_request_status = 'relax';
            cjs_try_make_request();
        } else {
            console.log('undefined cjs request');
        }
    } else {
//        console.log(cjs_request.one, cjs_request.two)
        if (cjs_request.two === GRAPH_UPDATE) { //graph update
            if (cjs_request.three === GRAPH_BH_UPDATE) { //update graph type
                var graph_id = cjs_request.four;
                bwh_update(graph_id, data_q);
            }
        } else if (cjs_request.two === SESSION_UPDATE) { //graph update

            if (cjs_request.three === SESSION_LIST_UPDATE) { //update graph type
                var slist_id = cjs_request.four;
                all_sessions_update(slist_id, data_q);
            } else if (cjs_request.three === SESSION_SOURCE_UPDATE ||
                    cjs_request.three === SESSION_DEST_UPDATE ||
                    cjs_request.three === SESSION_APP_UPDATE ||
                    cjs_request.three === SESSION_SVS_UPDATE) {
                q_sessions_update(cjs_request.three, data_q);
            } else if (cjs_request.three === SUMRY_SRC_UPDATE ||
                    cjs_request.three === SUMRY_DEST_UPDATE ||
                    cjs_request.three === SUMRY_APP_UPDATE) {
                q_smry_dashPie_update(data_q);
//            } else if (cjs_request.three === SUMRY_DEST_UPDATE) {
//                q_smry_dst_update(data_q);
//            } else if (cjs_request.three === SUMRY_APP_UPDATE) {
//                q_smry_app_update(data_q);
            } else if (cjs_request.three === SUMRY_SDC_UPDATE) {
                q_smry_update(data_q);
            } else if (cjs_request.three === LSUMRY_UPDATE) {
                lsumry_update(cjs_request.four, data_q);
            }

        } else if (cjs_request.two === DIAGRAM_UPDATE) { //graph update
            if (cjs_request.three === SERVER_DIAGRAM ||
                    cjs_request.three === CLIENT_DIAGRAM ||
                    cjs_request.three === APP_DIAGRAM ||
                    cjs_request.three === SVS_DIAGRAM) {
                sc_diagram_update(cjs_request.four, cjs_request.three, data_q);
            } else if (cjs_request.three === SESSION_DIAGRAM) {
                session_diagram_update(cjs_request.three, data_q);
            } else if (cjs_request.three === TRAFFIC_DIAGRAM) {
                trafic_diagram_update(cjs_request.three, data_q);
            }
        } else if (cjs_request.two === INFORMATION_UPDATE) {
            info_get_update(cjs_request.three, cjs_request.four, data_q);
        } else if (cjs_request.two === GUI_SHEETS) {
            guid_data_update(cjs_request.three, cjs_request.four, data_q, data);
        } else {
            console.log('undifine cjs mass update');
        }
    }
    data_q = null;
};

var cjs_init_request_connection = function (def) {
    if (typeof MozWebSocket != "undefined") {
        cjs_req_conn = new MozWebSocket(get_cjs_ws_url(), def);
    } else {
        cjs_req_conn = new WebSocket(get_cjs_ws_url(), def);
    }
    cjs_req_conn.binaryType = 'arraybuffer';
    cjs_make_request(200, {
        type: 200,
        gid: $.cookie('pqsf')
    });
    try {
        cjs_req_conn.onopen = function () {
            console.log(def + " connected");
            cjs_request_status = 'relax';
            cjs_try_make_request();
        };

        cjs_req_conn.onmessage = function got_message(msg) {
            cjs_request_cbk(msg.data);
        };
        cjs_req_conn.onclose = function () {
            var modal = document.getElementById('DisconnectModal');
            modal.style.display = "block";
            console.log(def + " connection closed");
            cjs_request_status = 'none';
        };

    } catch (exception) {
        alert('<p>Error' + exception);
    }
};