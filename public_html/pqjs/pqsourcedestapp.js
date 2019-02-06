/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sc_sd_diagram = {
    "nodes": [],
    "links": []
};

var sc_digram_colors = [];

var sc_cd_type = CLIENT_DIAGRAM;
var sc_cd_ip;
var sc_cd_mask;
var sc_cd_sum_type;
var sc_cd_sum_refresh = true;
var sc_cd_diagram_type;
var sc_window_id = 0; //0 - s-d-a watch window //1 - live user watch window

var scd_windo_data_updater;

function start_live_scd_updates() {
    if (scd_windo_data_updater)
        return;
    scd_windo_data_updater = setInterval(request_scdw_diagram_info, 10000);
}

function end_live_scd_updates() {
    clearInterval(scd_windo_data_updater);
    scd_windo_data_updater = null;
}

function request_scdw_diagram_info() {
    sc_cd_sum_refresh = false;
    load_and_draw_sc_dgrm(sc_cd_diagram_type);
    load_and_draw_sc_sumry(sc_cd_sum_type);
}

var create_live_srcdes_watch_graph = function () {
    return  lssd_graph_init(LSRC_UPDATE, "plot_live_sources_updown",
            "",
            '#a8334d',
            '#008000',
            "#pq_lsd_uplink_usage",
            "#pq_lsd_downlink_usage",
            "#pq_lsd_uplink_pkts",
            "#pq_lsd_downlink_pkts",
            "#pq_lscw_stat_bar", 2);
};

run_diagram = function () {

    $(sc_cd_div).empty();
    var chart = d3.select(sc_cd_div).append("svg").chart("Sankey.Path");
    chart
            .name(sc_cd_label)
            .colorNodes(function (name, node) {
                return sc_digram_colors[node.name] || '#9f9fa3';
            })
            .colorLinks(function (link) {
                return sc_digram_colors[link.source.name] || '#9f9fa3';
            })
            .nodeWidth(20)
            .nodePadding(10)
            .spread(true)
            .iterations(0)
            .draw(sc_sd_diagram);//graph);

    $(sc_cd_div + " svg").css("margin-top", "10px");
};

function sc_cd_label(node) {
//    return  node.name.replace(/\s*\(.*?\)$/, '');
    return  node.name;
}

function load_sc_diagram(type, ip, mask, div, wid) {
    sc_cd_type = type;
    sc_cd_ip = ip;
    sc_cd_div = div;
    sc_cd_mask = mask;
    sc_window_id = wid;
    sc_cd_sum_type = 1;
    btn_sc_load_now(SCD_TRAFIC);

    if (type == CLIENT_DIAGRAM) {
        $('#btn_lw_bt_one').text("Applications");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Sources");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Source Diagram");
        $('#btn_lw_bt_three').show();
        update_live_watch_summery(LSUM_SRC_T_APP, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), mask);
    } else if (type == SERVER_DIAGRAM) {
        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Applications");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Destinations");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Destination Diagram");
        $('#btn_lw_bt_three').show();
        update_live_watch_summery(LSUM_DES_T_SRC, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), mask);
    } else if (type == APP_DIAGRAM) {
        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Applications");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Application Diagram");
        $('#btn_lw_bt_three').hide();
        update_live_watch_summery(LSUM_APP_T_SRC, 0, ip, mask);
    } else if (type == SVS_DIAGRAM) {
        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Services");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Service Diagram");
        $('#btn_lw_bt_three').hide();
        update_live_watch_summery(LSUM_SVS_T_SRC, 0, ip, mask);
    }
    start_live_scd_updates();
}

load_and_draw_sc_dgrm = function (id) {
    sc_sd_diagram.links.length = 0;
    sc_sd_diagram.nodes.length = 0;
    var headder_name;
    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: sc_cd_type,
        uid: global_rule_user,
        gid: id,
        ip: sc_cd_ip,
        mask: sc_cd_mask
    };
    if (sc_cd_type === APP_DIAGRAM) {
        var app_name;
        if (diagram_req.ip < application_list.length) {
            app_name = application_list[diagram_req.ip];
        } else {
            app_name = pq_services_list[diagram_req.ip - application_list.length + 1];
        }
        headder_name = app_name;
        sc_sd_diagram.nodes.push({
            "name": app_name,
            "id": "final_score"
        });
    } else if (sc_cd_type == SVS_DIAGRAM) {
        headder_name = pq_services_list[diagram_req.ip];
        sc_sd_diagram.nodes.push({
            "name": pq_services_list[diagram_req.ip],
            "id": "final_score"
        });
    } else {
        if (sc_cd_mask >= decode_subnet_mask(sc_cd_ip)) {
            headder_name = diagram_req.ip;
        } else {
            headder_name = diagram_req.ip + "/" + sc_cd_mask;
        }
        sc_sd_diagram.nodes.push({
            "name": headder_name,
            "id": "final_score"
        });
    }
    if (sc_digram_colors[headder_name] == null) {
        sc_digram_colors[headder_name] = randomColor({
            luminosity: 'bright'
        });
    }

    cjs_make_request(CLIENT_DIAGRAM, diagram_req);
};

btn_sc_load_now = function (id) {
    sc_cd_diagram_type = id;
    load_and_draw_sc_dgrm(id);
};

//btn_dashpie_bw_load_now = function (id) {
//    if (id === 1) {
//        $("#plot_dashPie_srcdesapp_updown").css("z-index", 100);
//        $("#plot_dashPie_srcdesapp_av_updown").css("z-index", 1);
//    } else {
//        $("#plot_dashPie_srcdesapp_updown").css("z-index", 1);
//        $("#plot_dashPie_srcdesapp_av_updown").css("z-index", 100);
//    }
//};

//btn_sc_bw_load_now = function (id) {
//    if (id === 1) {
//        $("#plot_live_sources_updown").css("z-index", 100);
//        $("#plot_live_sources_av_updown").css("z-index", 1);
//    } else {
//        $("#plot_live_sources_updown").css("z-index", 1);
//        $("#plot_live_sources_av_updown").css("z-index", 100);
//    }
//};

//btn_link_bw_load_now = function (id) {
//
//    if (id === 1) {
//        lcjs_make_request(live_bwd_id, LABW_UPDATE, labwd_req);
//        lcjs_make_request(live_bwu_id, LABW_UPDATE, labwu_req);
//        $("#CHD_Plot, #CHU_Plot").css("z-index", -10);
//        $("#CHD_av_Plot, #CHU_av_Plot").css("z-index", 100);
//    } else {
////        if(lv_link_flag){
//        lcjs_make_request(live_bwd_id, LBW_UPDATE, lbwd_req);
//        lcjs_make_request(live_bwu_id, LBW_UPDATE, lbwu_req);
////            lv_link_flag = false;
////        }        
//        $("#CHD_Plot, #CHU_Plot").css("z-index", 100);
//        $("#CHD_av_Plot, #CHU_av_Plot").css("z-index", -10);
//    }
//};

//btn_ses_bw_load_now = function (id) {
//    if (id === 2) {
//        $("#plot_live_session_av_downlink").css("z-index", 100);
//        $("#plot_live_session_av_uplink").css("z-index", 100);
//        $("#plot_live_session_ms_downlink").css("z-index", -10);
//        $("#plot_live_session_ms_uplink").css("z-index", -10);
//        $("#plot_live_session_downlink_header").text('Session Downlink Bandwidth (10 s Average)');
//        $("#plot_live_session_uplink_header").text('Session Uplink Bandwidth (10 s Average)');
//    } else {
//        $("#plot_live_session_av_downlink").css("z-index", -10);
//        $("#plot_live_session_av_uplink").css("z-index", -10);
//        $("#plot_live_session_ms_downlink").css("z-index", 100);
//        $("#plot_live_session_ms_uplink").css("z-index", 100);
//        $("#plot_live_session_downlink_header").text('Session Downlink Bandwidth (1 ms)');
//        $("#plot_live_session_uplink_header").text('Session Uplink Bandwidth (1 ms)');
//    }
//};


load_and_draw_sc_sumry = function (id) {
    if (id === 1) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_APP, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_SRC, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), sc_cd_mask);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            update_live_watch_summery(LSUM_SVS_T_SRC, 0, sc_cd_ip, sc_cd_mask);
        } else {
            update_live_watch_summery(LSUM_APP_T_SRC, 0, sc_cd_ip, sc_cd_mask);
        }
    } else if (id === 3) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_SVS, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_SVS, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), sc_cd_mask);
        }
    } else {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_DEST, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_APP, decode_ip_version(sc_cd_ip), send_ip_encode(decode_ip_version(sc_cd_ip), sc_cd_ip, 1), sc_cd_mask);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            update_live_watch_summery(LSUM_SVS_T_DEST, 0, sc_cd_ip, sc_cd_mask);
        } else {
            update_live_watch_summery(LSUM_APP_T_DEST, 0, sc_cd_ip, sc_cd_mask);
        }
    }
};

btn_sc_sum_load_now = function (id) {
    sc_cd_sum_type = id;
    sc_cd_sum_refresh = true;
    load_and_draw_sc_sumry(id);
};

change_source_watch_head = function (s_ip, user, mask, sessions) {
    if (mask >= decode_subnet_mask(s_ip)) {
        if (user !== '_' && user !== 'N/A' && user !== undefined) {
            $('#pq_lscw_sip_text').text('Client: ' + s_ip + ' (' + user + ')');
        } else
            $('#pq_lscw_sip_text').text('Client IP: ' + s_ip);
    } else {
        if (isNaN(mask)) {
            $('#pq_lscw_sip_text').text('Client IP: ' + s_ip);
        } else {
            $('#pq_lscw_sip_text').text('Client IP: ' + s_ip + '/' + mask);
        }
    }
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};

change_dest_watch_head = function (d_ip, url, mask, sessions) {
//    console.log(d_ip, url, mask, sessions)
    if (mask >= decode_subnet_mask(d_ip)) {
        if (url !== '_' && url !== 0 && url !== undefined) {
            $('#pq_lscw_sip_text').text('Server: ' + d_ip + ' (' + url + ')');
        } else
            $('#pq_lscw_sip_text').text('Server IP: ' + d_ip);
    } else {
        if (isNaN(mask)) {
            $('#pq_lscw_sip_text').text('Server IP: ' + d_ip);
        } else {
            $('#pq_lscw_sip_text').text('Server IP: ' + d_ip + '/' + mask);
        }
    }
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};


change_application_watch_head = function (app_id, sessions) {
    var app_name;
    if (app_id < application_list.length) {
        app_name = application_list[app_id];
    } else {
        app_name = pq_services_list[app_id - application_list.length + 1];
    }
    $('#pq_lscw_sip_text').text('Application : ' + app_name);
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};

change_services_watch_head = function (sev_id, sessions) {
    $('#pq_lscw_sip_text').text('Service: ' + pq_services_list[sev_id]);
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};

var data_pq_live_usage = [{label: "1", value: 0}];
var pie_pq_live_usage;
var pie_pq_live_usage_wrap;
var pie_pq_live_usage_id = 3;

create_live_su_pie = function (id, div, ctnt) {
    var width = document.getElementById('' + div).offsetWidth;
    return new d3pie(div, {
        "size": {
            "canvasHeight": width,
            "canvasWidth": width,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": ctnt
        },
        "labels": {
            "outer": {
                "format": "none"
//                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 9
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 8
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
//        "tooltips": {
//            "enabled": true,
//            "type": "placeholder",
//            "string": "{label}: {value}, {percentage}%",
//            "placeholderParser": function (index, data) {
//                data.value = pq_get_usage(data.value);
//            },
//            "styles": {
//                "fadeInSpeed": 1000,
//                "backgroundColor": "#0079dc",
//                "backgroundOpacity": 1
//            }
//        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 40,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                if (a.data.label.length > 15) {
                    $("#pq_live_usage_legend .pqpie_lble_nme").css({"height": "40px", "top": "calc(20%)"});
                } else
                    $("#pq_live_usage_legend .pqpie_lble_nme").css({"height": "20px", "top": "calc(25%)"});

                $("#pq_live_usage_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_live_usage_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
                $("#pq_live_usage_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
            }
        }
    });
};


init_live_su_watch_plots = function (id) {
    pie_pq_live_usage_id = id;
    if (pie_pq_live_usage_wrap != null) {
        data_pq_live_usage.length = 0;
        data_pq_live_usage.push({label: "1", value: 0});
        //pie_pq_lruw_usage_wrap.update_summery_pie(id, 1);
    }
    pie_pq_live_usage = create_live_su_pie(id, 'pq_live_usage_pie_hlder', data_pq_live_usage);
    pie_pq_live_usage_wrap = new pq_mod_pie(pie_pq_live_usage, "#pq_live_usage_pie_hlder", data_pq_live_usage, '#pq_live_usage_legend', id);
    pqpie_resize_loading("#pq_live_usage_pie_hlder", pie_pq_live_usage);
};

update_live_watch_summery = function (type, ipt, data, mask) {

    data_pq_live_usage.length = 0;
    data_pq_live_usage.push({label: "1", value: 0});

    pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 1);
    $('#pq_live_usage_legend').children().remove();

    var lsum_req = {
        type: SESSION_UPDATE,
        id: LSUMRY_UPDATE,
        uid: global_rule_user,
        lid: type,
        loc: 1,
        sipv: ipt,
        dipv: 0,
        sip0: data[0],
        sip1: data[1],
        sip2: data[2],
        sip3: data[3],
        dip0: mask,
        dip1: 0,
        dip2: 0,
        dip3: 0,
        sport: 0,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0,
        sipr0: 0,
        sipr1: 0,
        sipr2: 0,
        sipr3: 0,
        dipr0: 0,
        dipr1: 0,
        dipr2: 0,
        dipr3: 0
    };
//    console.log(lsum_req);
    cjs_make_request(LSUMRY_UPDATE, lsum_req);
};
