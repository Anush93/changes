var dashPie_dlink_table;
var dashPie_ulink_table;
var dest_dlink_table;
var dest_uplink_table;
var app_dlink_table;
var app_uplink_table;
var SET_PRIMARY;

var session_table;
var source_table;
var destination_table;
var app_table;
var ses_service_table;

var resourceUsageFlag = false;

var dashPieCat;

var bwh_link_id = 0;

var live_watch_mode = 0;

var live_fl_id = lcjs_init_request_connection('lcjsreq');
var tc_fs_id;

var sb_id;
var srcb_id;
var destb_id;
var apptb_id;
var svstb_id;

var ssd_live_graph_id;
var dashPie_clk_seg;

cjs_init_request_connection('cjsreq');

var live_bwu_id = lcjs_init_request_connection('lcjsreq');
var live_bwd_id = lcjs_init_request_connection('lcjsreq');
var live_vbwu_id = lcjs_init_request_connection('lcjsreq');
var live_vbwd_id = lcjs_init_request_connection('lcjsreq');

var labwd_req;
var labwu_req;
var lbwd_req;
var lbwu_req;

var urlw_graph_id;

var urlw_htopt = {
    valueNames: [
        'wurl',
        'wuip',
        'wuport'
    ]
};

var urlw_http_list;
var urlw_https_list;
var urlw_dns_list;

//request menu sheets

var gsheet_req = {
    type: GUI_SHEETS,
    id: MENUBAR_SHEET,
    gid: 0
};
cjs_make_request(MENUBAR_SHEET, gsheet_req);

gsheet_req = {
    type: GUI_SHEETS,
    id: PROPERTY_SHEET,
    gid: 0
};

cjs_make_request(PROPERTY_SHEET, gsheet_req);

load_home_window = function () {

    CURRENT_WINDOW = WINDOW_LINK_SUMMARY;

//    $('#Content').load('home.html', function () {
    $('#Content').html(home_html);

    $('#home_bw_selector_10s').focus();

    var labw_dash_dl = labwu_graph_init("CHD_av_Plot", '#007399', 0);
    var labw_dash_ul = labwu_graph_init("CHU_av_Plot", '#4c8c32', 1);

    labwd_req = {
        type: GRAPH_UPDATE,
        id: LABW_UPDATE,
        uid: 0,
        gid: labw_dash_dl,
        link: 0,
        chanel: 1
    };
    lcjs_make_request(live_bwd_id, LABW_UPDATE, labwd_req);

    labwu_req = {
        type: GRAPH_UPDATE,
        id: LABW_UPDATE,
        uid: 0,
        gid: labw_dash_ul,
        link: 0,
        chanel: 0
    };
    lcjs_make_request(live_bwu_id, LABW_UPDATE, labwu_req);

    var info_req = {
        type: INFORMATION_UPDATE,
        id: INFO_MANW_ST_RQ,
        uid: 0,
        lid: INFO_MANW_ST_RQ
    };
    cjs_make_request(INFO_MANW_ST_RQ, info_req);
    start_mw_cts_info_update();

    get_dashb_notific();
//    });
};

load_user_sum_window = function () {

    CURRENT_WINDOW = WINDOW_USER_SUMMARY;

//    $('#Content').load('user_sum.html', function () {
    $('#Content').html(user_sum_html);

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    var labw_dash_dl = labwu_user_graph_init("CHU_av_Plot", "CHD_av_Plot", '#4c8c32', '#007399', 2);

    labwd_req = {
        type: GRAPH_UPDATE,
        id: LMLTS_UBW_UPDATE,
        uid: global_rule_user,
        gid: labw_dash_dl
    };
    lcjs_make_request(live_bwd_id, LMLTS_UBW_UPDATE, labwd_req);

    init_summary_dbd_plots();

    var sum_req = {
        type: SESSION_UPDATE,
        id: SUMRY_SDC_UPDATE,
        uid: global_rule_user,
        lid: SESSION_APP_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_SDC_UPDATE, sum_req);

    start_summary_top_update();
//    });
};

load_dash_source_window = function () {

    CURRENT_WINDOW = WINDOW_DASH_SOURCE;

    $('#Content').html(dash_sdas_html);
//    $('#Content').load('dash_sdas.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    dashPieCat = 1;
    dashPie_obj_flag = true;

    $('#dashPie_src_dlink_header').text('Top 10 Sources - Downlink');
    $('#dashPie_src_ulink_header').text('Top 10 Sources - Uplink');

    var ses_req = {
        type: SESSION_UPDATE,
        id: SUMRY_SRC_UPDATE,
        uid: global_rule_user,
        lid: SUMRY_SRC_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_SRC_UPDATE, ses_req);

    init_dashPie_elements();
//    });
};

load_dash_dest_window = function () {

    CURRENT_WINDOW = WINDOW_DASH_DEST;

//    $('#Content').load('dash_sdas.html', function () {
    $('#Content').html(dash_sdas_html);

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    dashPieCat = 2;
    dashPie_obj_flag = true;

    $('#dashPie_src_dlink_header').text('Top 10 Destinations - Downlink');
    $('#dashPie_src_ulink_header').text('Top 10 Destinations - Uplink');

    var ses_req = {
        type: SESSION_UPDATE,
        id: SUMRY_DEST_UPDATE,
        uid: global_rule_user,
        lid: SUMRY_DEST_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_DEST_UPDATE, ses_req);

    init_dashPie_elements();
//    });
};

load_dash_app_window = function () {

    CURRENT_WINDOW = WINDOW_DASH_APP;

    $('#Content').html(dash_sdas_html);
//    $('#Content').load('dash_sdas.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    dashPieCat = 3;
    dashPie_obj_flag = true;

    $('#dashPie_src_dlink_header').text('Top 10 Applications - Downlink');
    $('#dashPie_src_ulink_header').text('Top 10 Applications - Uplink');

    var ses_req = {
        type: SESSION_UPDATE,
        id: SUMRY_APP_UPDATE,
        uid: global_rule_user,
        lid: SUMRY_APP_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_APP_UPDATE, ses_req);

    init_dashPie_elements();
//    });
};

load_app_link_util_window = function () {

    CURRENT_WINDOW = WINDOW_APP_LINK_UTIL;
    $('#Content').html(link_util_app_html);
//    $('#Content').load('link_util_app.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }
    $('#App_Dlink_Util_table_filter :input').css({'width': 'calc(100% - 55px)', 'height': '20px', 'padding-left': '3px', 'font-size': '10px'});

    $('a[href="#app_util_dlink_all"]').on('shown.bs.tab', function (e) {
        app_link_util_table.columns.adjust().draw();
    });

    set_distributed_col_generator(8, 8, 8);
    btn_link_util_bw_load_now(1);
    $('#app_bwm_dlink_btn').focus();
//    });
};

load_ses_ses_window = function () {

    CURRENT_WINDOW = WINDOW_SES_SES;

//    $('#Content').html(ses_sessions_html);
    $('#Content').load('ses_sessions.html', function () {

        if (global_rule_user !== 0) {
            $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
        }

        sb_id = pq_create_flow_bar('#pq_ses_win_filter', 'pq_session_apply_clicked', 'pq_session_refresh_clicked');
        session_table = $('#Session_Table').DataTable({
            select: false,
            columnDefs: [
                {width: '15%', targets: 0},
                {width: '8%', targets: 1},
                {targets: 2, visible: false},
                {targets: 3, visible: false},
                {targets: 4, visible: false},
                {width: '4%', targets: 5},
                {width: '3%', targets: 6},
                {width: '3%', targets: 7},
                {width: '6%', targets: 8},
                {width: '11%', targets: 9},
                {width: '35%', targets: 10, data: null,
                    render: function (data, type, row) {
                        var bar_length = ((100 * (data[10] + data[11])) / data[12]);
                        if (bar_length > 100) {
                            bar_length = 100;
                        }
                        var send_length = (bar_length * data[10] / (data[10] + data[11]));
                        return "<a style='width: 130px;float:left;margin-right: 10px; text-decoration: none;' >" + pq_get_usage(data[10]) + " / " + pq_get_usage(data[11]) + "" + "</a><div id='myProgress' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + send_length + "px'></div></div>";
                    }
                },
                {targets: 11, visible: false},
                {width: '10%', targets: 12, data: null,
                    defaultContent: "<button class='pq_session_wbtn'><span>Live</span></button>"
                },
                {className: 'dt-center', targets: '_all'}
            ],
            scrollY: ($('#Session_Sessions_Holder').height() - 125),
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });

        add_update_indicator('#Session_Sessions_Holder', 'pq_session_ud_indicator', 'Updating ..');

        $('#Session_Table tbody').on('click', 'button', function () {

            var data = session_table.row($(this).parents('tr')).data();
            load_ses_live_watch_window(data);

        });

        show_update_indicator('#pq_session_ud_indicator');
        pq_restore_flow_bar('#pq_ses_win_filter', sb_id);
        pq_session_get_filters();
    });
};

load_ses_live_watch_window = function (data, id) {

    CURRENT_WINDOW = WINDOW_LIVE_SESSION_WATCH;

    $('#Content').html(shadow_session_watch_html);
//    $('#Content').load('shadow_session_watch.html', function () {

    var sses_live_graph_id = create_live_session_watch_graph();
    change_session_watch_head(data[0], data[5], data[3], data[6], data[9], "pending..");

    var protc;
    if (data[7] === 'TCP') {
        protc = 6;
    } else if (data[7] === 'UDP') {
        protc = 17;
    } else {
        protc = 0;
    }
    var sip = send_ip_version_decode(data[2], data[0], 1);
    var dip = send_ip_version_decode(data[4], data[3], 1);

    var lssd_req = {
        type: GRAPH_UPDATE,
        id: LSES_UPDATE,
        uid: global_rule_user,
        gid: sses_live_graph_id,
        sip_t: data[2],
        dip_t: data[4],
        sip1: sip[0],
        sip2: sip[1],
        sip3: sip[2],
        sip4: sip[3],
        dip1: dip[0],
        dip2: dip[1],
        dip3: dip[2],
        dip4: dip[3],
        sport: +data[5],
        dport: +data[6],
        vid: 0,
        prot: protc,
        app: 0
    };

    lcjs_make_request(live_fl_id, LSES_UPDATE, lssd_req);
//    });
};

load_ses_source_window = function () {

    CURRENT_WINDOW = WINDOW_SES_SOURCE;

    $('#Content').html(ses_sources_html);
//    $('#Content').load('ses_sources.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    srcb_id = pq_create_flow_bar('#pq_src_win_filter', 'pq_source_apply_clicked', 'pq_source_refresh_clicked');
    source_table = $('#Source_Table').DataTable({
        select: false,
        columnDefs: [
            {width: '17%', targets: 0},
            {width: '12%', targets: 1, visible: false},
            {width: '20%', targets: 2, data: null,
                render: function (data, type, row) {
                    return "<a style='width: 50px;float:left;margin-right: 10px; text-decoration: none;' >" + data[2] + "</a><div class='pq_session_indicator' style='float: left; margin: 2px;width:" + (150 * data[2] / data[7]) + "px;'><div id='myBar' style='width:" + 0 + "px'></div></div>";
                }},
            {targets: 3, visible: false},
            {targets: 4, visible: false},
            {width: '25%', targets: 5, data: null,
                render: function (data, type, row) {
                    var bar_length = ((100 * (data[5])) / data[6]);
                    if (bar_length > 100) {
                        bar_length = 100;
                    }
                    var send_length = (bar_length * data[3] / (data[5]));
                    return "<a style='width: 120px;float:left;margin-right: 10px; text-decoration: none;' >" + pq_get_usage(data[5]) + "" + "</a><div id='myProgress' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + send_length + "px'></div></div>";
                }
            },
            {width: '15%', targets: 6, data: null,
                defaultContent: "<button class='pq_url_wbtn'><span>URL</span></button>" + "<button class='pq_session_wbtn'><span>Live</span></button>"
            },
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: ($('#pq_sources_table_holder').height() - 40),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    add_update_indicator('#Session_Sources_Holder', 'pq_source_ud_indicator', 'Updating ..');

    $('#Source_Table tbody').on("click", '.pq_session_wbtn', function () {
        var data = source_table.row($(this).parents('tr')).data();
        history.pushState({type: 'Watch', table: 'source_table', data: data}, 'WATCH', '');
        load_src_live_watch_window(data);
    });

    $('#Source_Table tbody').on('click', '.pq_url_wbtn', function () {
        CURRENT_WINDOW = WINDOW_LIVE_URL_WATCH;
        var data = source_table.row($(this).parents('tr')).data();

        $('#Content').html(shadow_url_watch_html);
//            $('#Content').load('shadow_url_watch.html', function () {

        $("#lurl_watch_start").click(function () {
            $("#lurl_watch_start").hide();
            $("#lurl_watch_stop").show();
            URL_WATCH_FLAG = true;
            $('#pq_lurlw_status_ind').css('background-color', '#47d147');
            $('#pq_lurlw_status_text').text('Status: Active');
        });

        $("#lurl_watch_stop").click(function () {
            $("#lurl_watch_stop").hide();
            $("#lurl_watch_start").show();
            URL_WATCH_FLAG = false;
            lurlst_uend();
        });

        URL_WATCH_FLAG = true;

        urlw_http_list = new List('htpu-list', urlw_htopt);
        urlw_http_list.clear();

        urlw_https_list = new List('htpsu-list', urlw_htopt);
        urlw_https_list.clear();

        urlw_dns_list = new List('dns-list', urlw_htopt);
        urlw_dns_list.clear();

        urlw_graph_id = lurl_graph_init('plot_live_url_stat', '#F44B19', '#079338', '#38368A', 0);

        $('#pq_lurlw_sip_text').text('Client IP: ' + data[0]);

        var sip = send_ip_encode(data[8], data[0], 1);

        var lssd_req = {
            type: GRAPH_UPDATE,
            id: LURLDATA_UPDATE,
            uid: global_rule_user,
            gid: urlw_graph_id,
            sip_t: decode_subnet_mask(data[0]),
            dip_t: 0,
            sip1: sip[0],
            sip2: sip[1],
            sip3: sip[2],
            sip4: sip[3],
            dip1: decode_subnet_mask(data[0]),
            dip2: 0,
            dip3: 0,
            dip4: 0,
            sport: 0,
            dport: 0,
            vid: 0,
            prot: 0,
            app: 0
        };
        lcjs_make_request(live_fl_id, LURLDATA_UPDATE, lssd_req);
        live_watch_mode = 0;
//            });
    });

    show_update_indicator('#pq_source_ud_indicator');
    pq_restore_flow_bar('#pq_src_win_filter', srcb_id);
    pq_source_apply_get();
//    });
};

load_src_live_watch_window = function (data, id) {

    CURRENT_WINDOW = WINDOW_LIVE_SERVER_WATCH;

    $('#Content').html(shadow_server_watch_html);
//    $('#Content').load('shadow_server_watch.html', function () {
    if (id === 0) {
        $('#shdw_serv_home_back_btn').css('width', '130px').text('Back to Home');
        $('#shdw_serv_home_back_btn').click(function () {
            load_user_sum_window();
        });
    } else {
        if (id === 1) {
            $('#shdw_serv_home_back_btn').css('width', '150px').text('Back to Top Sources');
            $('#shdw_serv_home_back_btn').click(function () {
                load_dash_source_window();
            });
        } else {
            $('#shdw_serv_home_back_btn').css('width', '130px').text('Back to Sources');
            $('#shdw_serv_home_back_btn').click(function () {
                load_ses_source_window();
            });
        }
    }

    $('#shadow_serv_bw_select_1ms').focus();
    $('#btn_lw_bt_one').focus();
    $('#shadow_serv_traffic').focus();

    ssd_live_graph_id = create_live_srcdes_watch_graph();
    init_live_su_watch_plots(3);

    var sip = send_ip_encode(decode_ip_version(data[0]), data[0], 1);

    var lssd_req = {
        type: GRAPH_UPDATE,
        id: LSRC_UPDATE,
        uid: global_rule_user,
        gid: ssd_live_graph_id,
        sip_t: decode_ip_version(data[0]),
        dip_t: decode_ip_version(data[0]),
        sip1: sip[0],
        sip2: sip[1],
        sip3: sip[2],
        sip4: sip[3],
        dip1: decode_subnet_mask(data[0]),
        dip2: 0,
        dip3: 0,
        dip4: 0,
        sport: 0,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0
    };
    lcjs_make_request(live_fl_id, LSRC_UPDATE, lssd_req);
    change_source_watch_head(data[0], data[1], decode_subnet_mask(data[0]), data[2]);
    load_sc_diagram(CLIENT_DIAGRAM, data[0], decode_subnet_mask(data[0]), '#plot_live_sources_diagram', 0);
    live_watch_mode = 0;
//    });
};

load_ses_dest_window = function () {

    CURRENT_WINDOW = WINDOW_SES_DEST;

    $('#Content').html(ses_dest_html);
//    $('#Content').load('ses_dest.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    destb_id = pq_create_flow_bar('#pq_dest_win_filter', 'pq_dest_apply_clicked', 'pq_dest_refresh_clicked');
    destination_table = $('#Destination_Table').DataTable({
        select: true,
        columnDefs: [
            {width: '16%', targets: 0},
            {width: '16%', targets: 1, visible: true},
            {width: '25%', targets: 2, data: null,
                render: function (data, type, row) {
                    var bar_length = 125 * data[2] / data[7];
                    if (bar_length > 125) {
                        bar_length = 125;
                    }
                    return "<a style='width: 50px;float:left;margin-right: 20px; text-decoration: none;' >" + data[2] + "</a><div class='pq_session_indicator' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + 0 + "px'></div></div>";
                }
            },
            {targets: 3, visible: false},
            {targets: 4, visible: false},
            {width: '28%', targets: 5, data: null,
                render: function (data, type, row) {
                    var bar_length = 125 * (data[5]) / data[6];
                    if (bar_length > 125) {
                        bar_length = 125;
                    }
                    var send_length = (bar_length * data[3] / (data[5]));

                    return "<a style='width: 100px; float:left; margin-right: 20px; text-decoration: none;' >" + pq_get_usage(data[5]) + "" + "</a><div id='myProgress' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + send_length + "px'></div></div>";
                }
            },
            {width: '15%', targets: 6, data: null,
                defaultContent: "<button class='pq_session_wbtn'><span>Live</span></button>"
            },
            {className: 'dt-body-right', targets: [2, 5]},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: ($('#Session_Destination_Holder').height() - 125),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    add_update_indicator('#Session_Destination_Holder', 'pq_destination_ud_indicator', 'Updating ..');

    $('#Destination_Table tbody').on('click', 'button', function () {
        var data = destination_table.row($(this).parents('tr')).data();
        history.pushState({type: 'Watch', table: 'destination_table', data: data}, 'WATCH', '');
        load_dest_live_watch_window(data);
    });

    show_update_indicator('#pq_destination_ud_indicator');
    pq_restore_flow_bar('#pq_dest_win_filter', destb_id);
    pq_dest_apply_get();
//    });
};

load_dest_live_watch_window = function (data, id) {
    CURRENT_WINDOW = WINDOW_LIVE_SERVER_WATCH;

    $('#Content').html(shadow_server_watch_html);
//    $('#Content').load('shadow_server_watch.html', function () {
    if (id === 0) {
        $('#shdw_serv_home_back_btn').css('width', '130px').text('Back to Home');
        $('#shdw_serv_home_back_btn').click(function () {
            load_user_sum_window();
        });
    } else {
        if (id === 1) {
            $('#shdw_serv_home_back_btn').css('width', '170px').text('Back to Top Destinations');
            $('#shdw_serv_home_back_btn').click(function () {
                load_dash_dest_window();
            });
        } else {
            $('#shdw_serv_home_back_btn').css('width', '150px').text('Back to Destinations');
            $('#shdw_serv_home_back_btn').click(function () {
                load_ses_dest_window();
            });
        }
    }

    $('#btn_lw_bt_one').focus();
    $('#shadow_serv_traffic').focus();

    ssd_live_graph_id = create_live_srcdes_watch_graph();

    var dip = send_ip_encode(decode_ip_version(data[0]), data[0], 1);

    var lssd_req = {
        type: GRAPH_UPDATE,
        id: LDES_UPDATE,
        uid: global_rule_user,
        gid: ssd_live_graph_id,
        sip_t: decode_ip_version(data[0]),
        dip_t: decode_ip_version(data[0]),
        sip1: 0,
        sip2: 0,
        sip3: 0,
        sip4: 0,
        dip1: dip[0],
        dip2: dip[1],
        dip3: dip[2],
        dip4: dip[3],
        sport: decode_subnet_mask(data[0]),
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0
    };

    init_live_su_watch_plots(3);
    lcjs_make_request(live_fl_id, LDES_UPDATE, lssd_req);
    change_dest_watch_head(data[0], data[1], decode_subnet_mask(data[0]), data[2]);

    load_sc_diagram(SERVER_DIAGRAM, data[0], decode_subnet_mask(data[0]), '#plot_live_sources_diagram', 0);
    live_watch_mode = 0;
//    });
};

load_ses_app_window = function () {

    CURRENT_WINDOW = WINDOW_SES_APP;

    $('#Content').html(ses_app_html);
//    $('#Content').load('ses_app.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    apptb_id = pq_create_flow_bar('#pq_app_win_filter', 'pq_appt_apply_clicked', 'pq_appt_refresh_clicked');
    app_table = $('#Application_Table').DataTable({
        select: true,
        columnDefs: [
            {width: '18%', targets: 0},
            {width: '33%', targets: 1, data: null,
                render: function (data, type, row) {
                    var bar_length = 125 * data[1] / data[6];
                    if (bar_length > 125) {
                        bar_length = 125;
                    }
                    return "<a style='width: 50px;float:left;margin-right: 20px; text-decoration: none;' >" + data[1] + "</a><div class='pq_session_indicator' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + 0 + "px'></div></div>";
                }
            },
            {targets: [2, 3], visible: false},
            {width: '33%', targets: 4, data: null,
                render: function (data, type, row) {
                    var bar_length = ((125 * (data[4])) / data[5]);
                    if (bar_length > 125) {
                        bar_length = 125;
                    }
                    var send_length = (bar_length * data[2] / (data[4]));
                    return "<a style='width: 100px;float:left;margin-right: 20px; text-decoration: none;' >" + pq_get_usage(data[4]) + "" + "</a><div id='myProgress' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + send_length + "px'></div></div>";
                }
            },
            {width: '16%', targets: 5, data: null,
                defaultContent: "<button class='pq_session_wbtn'><span>Live</span></button>"
            },
            {className: 'dt-body-right', targets: [1, 4]},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: ($('#Session_Applications_Holder').height() - 125),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    add_update_indicator('#Session_Applications_Holder', 'pq_application_ud_indicator', 'Updating ..');

    $('#Application_Table tbody').on('click', 'button', function () {

        var data = app_table.row($(this).parents('tr')).data();
        history.pushState({type: 'Watch', table: 'application_table', data: data}, 'WATCH', '');
        load_app_live_watch_window(data);
    });

    show_update_indicator('#pq_application_ud_indicator');
    pq_restore_flow_bar('#pq_app_win_filter', apptb_id);
    pq_appt_apply_get();
//    });
};

load_app_live_watch_window = function (data, id) {

    CURRENT_WINDOW = WINDOW_LIVE_SERVER_WATCH;
//    $('#Content').load('shadow_server_watch.html', function () {
    $('#Content').html(shadow_server_watch_html);

    if (id === 0) {
        $('#shdw_serv_home_back_btn').css('width', '130px').text('Back to Home');
        $('#shdw_serv_home_back_btn').click(function () {
            load_user_sum_window();
        });
    } else {
        if (id === 1) {
            $('#shdw_serv_home_back_btn').css('width', '170px').text('Back to Top Applications');
            $('#shdw_serv_home_back_btn').click(function () {
                load_dash_app_window();
            });
        } else {
            $('#shdw_serv_home_back_btn').css('width', '150px').text('Back to Applications');
            $('#shdw_serv_home_back_btn').click(function () {
                load_ses_app_window();
            });
        }
    }

    $('#shadow_serv_bw_select_1ms').focus();
    $('#btn_lw_bt_one').focus();
    $('#shadow_serv_traffic').focus();

    ssd_live_graph_id = create_live_srcdes_watch_graph();
    var lssd_req = {
        type: GRAPH_UPDATE,
        id: LAPP_UPDATE,
        uid: global_rule_user,
        gid: ssd_live_graph_id,
        sip_t: 4,
        dip_t: 4,
        sip1: 0,
        sip2: 0,
        sip3: 0,
        sip4: 0,
        dip1: data[7],
        dip2: 0,
        dip3: 0,
        dip4: 0,
        sport: 32,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0
    };
    init_live_su_watch_plots(3);
    lcjs_make_request(live_fl_id, LAPP_UPDATE, lssd_req);
    change_application_watch_head(data[7], data[1]);
    load_sc_diagram(APP_DIAGRAM, data[7], 32, '#plot_live_sources_diagram', 0);
    live_watch_mode = 0;
//    });
};

load_ses_serv_window = function () {

    CURRENT_WINDOW = WINDOW_SES_SERV;

    $('#Content').html(ses_serv_html);
//    $('#Content').load('ses_serv.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    svstb_id = pq_create_flow_bar('#pq_service_win_filter', 'pq_service_apply_clicked', 'pq_service_refresh_clicked');
    ses_service_table = $('#Ses_Service_Table').DataTable({
        select: true,
        columnDefs: [
            {width: '18%', targets: 0},
            {width: '33%', targets: 1, data: null,
                render: function (data, type, row) {
                    var bar_length = 125 * data[1] / data[6];
                    if (bar_length > 125) {
                        bar_length = 125;
                    }
                    return "<a style='width: 50px;float:left;margin-right: 20px; text-decoration: none;' >" + data[1] + "</a><div class='pq_session_indicator' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + 0 + "px'></div></div>";
                }
            },
            {targets: [2, 3], visible: false},
            {width: '33%', targets: 4, data: null,
                render: function (data, type, row) {
                    var bar_length = ((125 * (data[4])) / data[5]);
                    if (bar_length > 125) {
                        bar_length = 125;
                    }
                    var send_length = (bar_length * data[2] / (data[4]));
                    return "<a style='width: 100px;float:left;margin-right: 20px; text-decoration: none;' >" + pq_get_usage(data[4]) + "" + "</a><div id='myProgress' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + send_length + "px'></div></div>";
                }
            },
            {width: '16%', targets: 5, data: null,
                defaultContent: "<button class='pq_session_wbtn'><span>Live</span></button>"
            },
            {className: 'dt-body-right', targets: [1, 4]},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: ($('#Session_Services_Holder').height() - 125),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    add_update_indicator('#Session_Services_Holder', 'pq_service_ud_indicator', 'Updating ..');

    $('#Ses_Service_Table tbody').on('click', 'button', function () {

        var data = ses_service_table.row($(this).parents('tr')).data();
        history.pushState({type: 'Watch', table: 'services_table', data: data}, 'WATCH', '');
        load_serv_live_watch_window(data);
    });

    show_update_indicator('#pq_service_ud_indicator');
    pq_restore_flow_bar('#pq_service_win_filter', svstb_id);
    pq_svst_apply_get();
//    });
};

load_serv_live_watch_window = function (data, id) {

    CURRENT_WINDOW = WINDOW_LIVE_SERVER_WATCH;

    $('#Content').html(shadow_server_watch_html);
//    $('#Content').load('shadow_server_watch.html', function () {

    $('#shdw_serv_home_back_btn').css('width', '130px').text('Back to Services');
    $('#shdw_serv_home_back_btn').click(function () {
        load_ses_serv_window();
    });

    $('#shadow_serv_bw_select_1ms').focus();
    $('#btn_lw_bt_one').focus();
    $('#shadow_serv_traffic').focus();

    ssd_live_graph_id = create_live_srcdes_watch_graph();
    var lssd_req = {
        type: GRAPH_UPDATE,
        id: LSVS_UPDATE,
        uid: global_rule_user,
        gid: ssd_live_graph_id,
        sip_t: 4,
        dip_t: 4,
        sip1: 0,
        sip2: 0,
        sip3: 0,
        sip4: 0,
        dip1: data[7],
        dip2: 0,
        dip3: 0,
        dip4: 0,
        sport: 32,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0
    };
    init_live_su_watch_plots(3);
    lcjs_make_request(live_fl_id, LSVS_UPDATE, lssd_req);
    change_services_watch_head(data[7], data[1]);
    load_sc_diagram(SVS_DIAGRAM, data[7], 32, '#plot_live_sources_diagram', 0);
    live_watch_mode = 0;
//    });
};

load_traffic_diag_window = function () {

    CURRENT_WINDOW = WINDOW_TRAFFIC;

    $('#Content').html(traffic_diag_html);
//    $('#Content').load('traffic_diag.html', function () {

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    tc_fs_id = pq_create_flow_bar('.pq_tc_diagram_filter_bar', 'pq_tc_diagram_apply_clicked', 'pq_tc_diagram_refresh_clicked');
    pq_restore_flow_bar('.pq_tc_diagram_filter_bar', tc_fs_id);
    get_prev_trafic_dgm_now();
//    });
};

//Rules

load_dest_rules = function () {

    CURRENT_WINDOW = WINDOW_RULE_DESTINATIONS;

    $('#Content').html(rule_dest_html);
//    $('#Content').load('rule_dest.html', function () {

    dest_rule_table = $('#Dest_Rule_Table').DataTable({
        columnDefs: [
            {width: '0%', targets: 0, visible: false},
            {width: '0%', targets: 1, visible: false},
            {width: '17%', targets: 2},
            {width: '15%', targets: 3},
            {width: '10%', targets: 4},
            {width: '12%', targets: 5},
            {width: '12%', targets: 6},
            {width: '10%', targets: 7},
            {width: '12%', targets: 8},
            {width: '12%', targets: 9},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        select: true,
        scrollY: ($('#dest_rule_holder').height() - 120),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    set_primary_device(dest_rule_table, true);

    $('#Dest_Rule_Table').on('click', 'tbody tr', function () {

        var selectedAppProfListTableRowCount = 0;
        var delay = 1;
        setTimeout(function () {
            selectedAppProfListTableRowCount = dest_rule_table.rows('.selected').count();
        }, delay);

        setTimeout(function () {
            if (selectedAppProfListTableRowCount === 1) {
                $('#editDestRule, #deleteDestRule').attr('disabled', false);
//                    $('#addDestRule').attr('disabled', true);
            } else if (selectedAppProfListTableRowCount === 0) {
//                    $('#addDestRule').removeAttr('disabled');
                $('#editDestRule, #deleteDestRule').attr('disabled', true);
            } else {
                alert("Incorrect Input");
            }
        }, delay);
    });

    $('#Dest_Rule_Table tbody').on('mouseleave', function (e) {
        $("#tooltip_dt").hide();
    });

    clear_and_init_sched_quota_list('#add_dest_rule_schedule');
    clear_and_init_sched_quota_list('#edit_dest_rule_schedule');

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
        $('.create').attr('disabled', false);
    } else {
        $('.create').attr('disabled', true);
    }

    $('#add_dest_rule_schedule').change(function () {
        if ($("#add_dest_rule_schedule option:selected").val() === '0') {
            $('#append_sched_pipes_dest_rule').children().detach();
            $('#add_sched_dest_rule_action').attr('disabled', true);
            if ($("#add_def_dest_rule_action option:selected").val() !== '2' ||
                    ($("#add_def_dest_rule_action option:selected").val() === '2' && $("#add_sched_dest_rule_action option:selected").val() === '2')) {
                $('#AddDestRuleModalContent').css({'height': '100%', 'max-height': ($('#AddDestRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#add_sched_dest_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#add_sched_dest_rule_action').attr('disabled', false);

            if (document.getElementById("append_sched_pipes_dest_rule").childNodes.length <= 2) {
                $("#add_sched_dest_rule_action option").filter(function () {
                    return this.text === 'Allow';
                }).prop('selected', true);
            }
        }
    });

    $('#edit_dest_rule_schedule').change(function () {
        if ($("#edit_dest_rule_schedule option:selected").val() === '0') {
            $('#edit_sched_pipes_dest_rule').children().detach();
            $('#edit_sched_dest_rule_action').attr('disabled', true);
            if ($("#edit_def_dest_rule_action option:selected").val() !== '2' ||
                    ($("#edit_def_dest_rule_action option:selected").val() === '2' && $("#edit_sched_dest_rule_action option:selected").val() === '2')) {
                $('#EditDestRuleModalContent').css({'height': '100%', 'max-height': ($('#EditDestRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#edit_sched_dest_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#edit_sched_dest_rule_action').attr('disabled', false);

            if (document.getElementById("edit_sched_pipes_dest_rule").childNodes.length <= 2) {
                $("#edit_sched_dest_rule_action option").filter(function () {
                    return this.text === 'Allow';
                }).prop('selected', true);
            }
        }
    });

    $('#add_sched_dest_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'AddDestRuleModalContent', 'add_sched_dest_rule_action', 'add_def_dest_rule_action', 'add_dest_rule_sched_dlink_pipe',
                'add_dest_rule_sched_ulink_pipe', 'append_sched_pipes_dest_rule', 'append_sched_pipes_dest_rule', 'append_def_pipes_dest_rule', '505px', '415px', '325px');
    });

    $('#add_def_dest_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'AddDestRuleModalContent', 'add_sched_dest_rule_action', 'add_def_dest_rule_action', 'add_dest_rule_def_dlink_pipe',
                'add_dest_rule_def_ulink_pipe', 'append_def_pipes_dest_rule', 'append_sched_pipes_dest_rule', 'append_def_pipes_dest_rule', '505px', '415px', '325px');
    });

    $('#edit_sched_dest_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'EditDestRuleModalContent', 'edit_sched_dest_rule_action', 'edit_def_dest_rule_action', 'edit_dest_rule_sched_dlink_pipe',
                'edit_dest_rule_sched_ulink_pipe', 'edit_sched_pipes_dest_rule', 'edit_sched_pipes_dest_rule', 'edit_def_pipes_dest_rule', '505px', '415px', '325px');
    });

    $('#edit_def_dest_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'EditDestRuleModalContent', 'edit_sched_dest_rule_action', 'edit_def_dest_rule_action', 'edit_dest_rule_def_dlink_pipe',
                'edit_dest_rule_def_ulink_pipe', 'edit_def_pipes_dest_rule', 'edit_sched_pipes_dest_rule', 'edit_def_pipes_dest_rule', '505px', '415px', '325px');
    });

    $('#addDestRuleToSystem').click(function () {

        var ip_dec = decode_ip_subnet_mask($("#addDestRuleIP").val());

        var ip = ip_dec[0];
        var mask = ip_dec[1];
        var ipv = decode_ip_version(ip);
        var optg_val;

        var dest_user_id = global_rule_user;
        var optg_val = $("#add_dest_rule_schedule option:selected").closest('optgroup').attr('value');

        if (validateIP(ip) || validateIPv6(ip)) {
            if ($("#add_sched_dest_rule_action option:selected").val() === '2') {

                if ($("#add_def_dest_rule_action option:selected").val() === '2') {
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), parseInt($("#add_dest_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_dest_rule_sched_ulink_pipe option:selected").val()), parseInt($("#add_dest_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_dest_rule_def_ulink_pipe option:selected").val()));
                } else if ($("#add_def_dest_rule_action option:selected").val() === '0') {
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), parseInt($("#add_dest_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_dest_rule_sched_ulink_pipe option:selected").val()), 0, 0);
                } else
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), parseInt($("#add_dest_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_dest_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

            } else if ($("#add_sched_dest_rule_action option:selected").val() === '0' || $("#add_sched_dest_rule_action option:selected").val() === '10') {

                if ($("#add_def_dest_rule_action option:selected").val() === '2') {
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), 0, 0, parseInt($("#add_dest_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_dest_rule_def_ulink_pipe option:selected").val()));
                } else if ($("#add_def_dest_rule_action option:selected").val() === '0') {
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), 0, 0, 0, 0);
                } else
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

            } else {
                if ($("#add_def_dest_rule_action option:selected").val() === '2') {
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#add_dest_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_dest_rule_def_ulink_pipe option:selected").val()));
                } else if ($("#add_def_dest_rule_action option:selected").val() === '0') {
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
                } else
                    add_ml_dest_rule(dest_user_id, ipv, send_ip_encode(ipv, ip, 1), mask, parseInt($("#add_dest_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
            }
            $("#AddDestRuleModal").hide();

        } else {
            InvalidStatus("Invalid IP Address");
        }
    });

    $('#editDestRuleToSystem').click(function () {

        var dest_data = dest_rule_table.row('.selected').data();
        var optg_val = $("#edit_dest_rule_schedule option:selected").closest('optgroup').attr('value');

        if ($("#edit_sched_dest_rule_action option:selected").val() === '2') {
            if ($("#edit_def_dest_rule_action option:selected").val() === '2') {
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), parseInt($("#edit_dest_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_dest_rule_sched_ulink_pipe option:selected").val()), parseInt($("#edit_dest_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_dest_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_dest_rule_action option:selected").val() === '0') {
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), parseInt($("#edit_dest_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_dest_rule_sched_ulink_pipe option:selected").val()), 0, 0);
            } else
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), parseInt($("#edit_dest_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_dest_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

        } else if ($("#edit_sched_dest_rule_action option:selected").val() === '0' || $("#edit_sched_dest_rule_action option:selected").val() === '10') {

            if ($("#edit_def_dest_rule_action option:selected").val() === '2') {
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), 0, 0, parseInt($("#edit_dest_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_dest_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_dest_rule_action option:selected").val() === '0') {
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), 0, 0, 0, 0);
            } else
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

        } else {
            if ($("#edit_def_dest_rule_action option:selected").val() === '2') {
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#edit_dest_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_dest_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_dest_rule_action option:selected").val() === '0') {
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
            } else
                edit_ml_dest_rule(parseInt(dest_data[0]), dest_data[1], parseInt($("#edit_dest_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
        }
        Clear();
        $("#EditDestRuleModal").hide();
    });

    Update_Dest_Rules(global_rule_user);
//    });
};

load_url_rules = function () {

    CURRENT_WINDOW = WINDOW_RULE_URL;

    $('#Content').html(rule_url_html);
//    $('#Content').load('rule_url.html', function () {

    url_rule_table = $('#URL_Rule_Table').DataTable({
        columnDefs: [
            {width: '5%', targets: 0, visible: false},
            {width: '5%', targets: 1, visible: false},
            {width: '5%', targets: 2, visible: true},
            {width: '5%', targets: 3},
            {width: '5%', targets: 4},
            {width: '30%', targets: 5},
            {width: '10%', targets: 6},
            {width: '5%', targets: 7},
            {width: '10%', targets: 8},
            {width: '10%', targets: 9},
            {width: '5%', targets: 10},
            {width: '10%', targets: 11},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        select: true,
        scrollY: ($('#url_rule_holder').height() - 120),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    set_primary_device(url_rule_table, true);

    $('#URL_Rule_Table').on('click', 'tbody tr', function () {

        var selectedAppProfListTableRowCount = 0;
        var delay = 1;
        setTimeout(function () {
            selectedAppProfListTableRowCount = url_rule_table.rows('.selected').count();
        }, delay);

        setTimeout(function () {
            if (selectedAppProfListTableRowCount === 1) {
                $('#editURLRule, #deleteURLRule').attr('disabled', false);
//                    $('#addURLRule').attr('disabled', true);
            } else if (selectedAppProfListTableRowCount === 0) {
//                    $('#addURLRule').removeAttr('disabled');
                $('#editURLRule, #deleteURLRule').attr('disabled', true);
            } else {
                alert("Incorrect Input");
            }
        }, delay);
    });

    $('#URL_Rule_Table tbody').on('mouseenter', 'td', function (e) {

        var colIdx;
        var cell_data;

        if (typeof (url_rule_table.cell(this).data()) === 'string') {
            colIdx = url_rule_table.cell(this).index().column;
            cell_data = url_rule_table.cell(this).data();

            if ((colIdx === 6 || colIdx === 7) && (cell_data !== 'Any' && cell_data !== 'None' && cell_data !== '-')) {

                $("#tooltip_dt").html(set_shaping_tooltips(URL_PROF_TABLE, colIdx, cell_data, url_rule_table.row(this).data())).animate({left: e.pageX, top: e.pageY}, 0);

                if (!$("#tooltip_dt").is(':visible')) {
                    $("#tooltip_dt").show();
                }
            } else
                $("#tooltip_dt").hide();
        }
    });

    $('#URL_Rule_Table tbody').on('mouseleave', function (e) {
        $("#tooltip_dt").hide();
    });

    clear_and_init_sched_quota_list('#add_url_rule_schedule');
    clear_and_init_sched_quota_list('#edit_url_rule_schedule');

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
        $('.create').attr('disabled', false);
    } else {
        $('.create').attr('disabled', true);
    }

    $('#add_url_rule_schedule').change(function () {
        if ($("#add_url_rule_schedule option:selected").val() === '0') {
            $('#append_sched_pipes_url_rule').children().detach();
            $('#add_sched_url_rule_action').attr('disabled', true);
            if ($("#add_def_url_rule_action option:selected").val() !== '2' ||
                    ($("#add_def_url_rule_action option:selected").val() === '2' && $("#add_sched_url_rule_action option:selected").val() === '2')) {
                $('#AddURLRuleModalContent').css({'height': '100%', 'max-height': ($('#AddURLRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#add_sched_url_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#add_sched_url_rule_action').attr('disabled', false);
            $("#add_sched_url_rule_action option").filter(function () {
                return this.text === 'Allow';
            }).prop('selected', true);
        }
    });

    $('#edit_url_rule_schedule').change(function () {
        if ($("#edit_url_rule_schedule option:selected").val() === '0') {

            $('#edit_sched_pipes_url_rule').children().detach();
            $('#edit_sched_url_rule_action').attr('disabled', true);
            if ($("#edit_def_url_rule_action option:selected").val() !== '2' ||
                    ($("#edit_def_url_rule_action option:selected").val() === '2' && $("#edit_sched_url_rule_action option:selected").val() === '2')) {
                $('#EditURLRuleModalContent').css({'height': '100%', 'max-height': ($('#EditURLRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#edit_sched_url_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#edit_sched_url_rule_action').attr('disabled', false);
            $("#edit_sched_url_rule_action option").filter(function () {
                return this.text === 'Allow';
            }).prop('selected', true);
        }
    });

    $('#add_sched_url_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'AddURLRuleModalContent', 'add_sched_url_rule_action', 'add_def_url_rule_action', 'add_url_rule_sched_dlink_pipe',
                'add_url_rule_sched_ulink_pipe', 'append_sched_pipes_url_rule', 'append_sched_pipes_url_rule', 'append_def_pipes_url_rule', '555px', '465px', '375px');
    });

    $('#add_def_url_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'AddURLRuleModalContent', 'add_sched_url_rule_action', 'add_def_url_rule_action', 'add_url_rule_def_dlink_pipe',
                'add_url_rule_def_ulink_pipe', 'append_def_pipes_url_rule', 'append_sched_pipes_url_rule', 'append_def_pipes_url_rule', '555px', '465px', '375px');
    });

    $('#edit_sched_url_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'EditURLRuleModalContent', 'edit_sched_url_rule_action', 'edit_def_url_rule_action', 'edit_url_rule_sched_dlink_pipe',
                'edit_url_rule_sched_ulink_pipe', 'edit_sched_pipes_url_rule', 'edit_sched_pipes_url_rule', 'edit_def_pipes_url_rule', '555px', '465px', '375px');
    });

    $('#edit_def_url_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'EditURLRuleModalContent', 'edit_sched_url_rule_action', 'edit_def_url_rule_action', 'edit_url_rule_def_dlink_pipe',
                'edit_url_rule_def_ulink_pipe', 'edit_def_pipes_url_rule', 'edit_sched_pipes_url_rule', 'edit_def_pipes_url_rule', '555px', '465px', '375px');
    });

    $('#addURLRuleToSystem').click(function () {
        var url_user_id = global_rule_user;
        var optg_val = $("#add_url_rule_schedule option:selected").closest('optgroup').attr('value');

        if ($("#add_sched_url_rule_action option:selected").val() === '2') {

            if ($("#add_def_url_rule_action option:selected").val() === '2') {
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), parseInt($("#add_url_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_url_rule_sched_ulink_pipe option:selected").val()), parseInt($("#add_url_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_url_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#add_def_url_rule_action option:selected").val() === '0') {
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), parseInt($("#add_url_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_url_rule_sched_ulink_pipe option:selected").val()), 0, 0);
            } else
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), parseInt($("#add_url_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_url_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

        } else if ($("#add_sched_url_rule_action option:selected").val() === '0' || $("#add_sched_url_rule_action option:selected").val() === '10') {

            if ($("#add_def_url_rule_action option:selected").val() === '2') {
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), 0, 0, parseInt($("#add_url_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_url_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#add_def_url_rule_action option:selected").val() === '0') {
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), 0, 0, 0, 0);
            } else
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

        } else {
            if ($("#add_def_url_rule_action option:selected").val() === '2') {
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#add_url_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_url_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#add_def_url_rule_action option:selected").val() === '0') {
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
            } else
                add_ml_url_rule(url_user_id, parseInt($("#add_url_rule_authen option:selected").val()), parseInt($("#add_url_rule_dns_det option:selected").val()), $("#add_new_url_to_rule").val(), parseInt($("#add_url_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
        }
        $("#AddURLRuleModal").hide();
    });

    $('#editURLRuleToSystem').click(function () {
        var url_id = url_rule_table.row('.selected').data();
        var optg_val = $("#edit_url_rule_schedule option:selected").closest('optgroup').attr('value');

        if ($("#edit_sched_url_rule_action option:selected").val() === '2') {
            if ($("#edit_def_url_rule_action option:selected").val() === '2') {
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), parseInt($("#edit_url_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_url_rule_sched_ulink_pipe option:selected").val()), parseInt($("#edit_url_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_url_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_url_rule_action option:selected").val() === '0') {
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), parseInt($("#edit_url_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_url_rule_sched_ulink_pipe option:selected").val()), 0, 0);
            } else
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), parseInt($("#edit_url_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_url_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

        } else if ($("#edit_sched_url_rule_action option:selected").val() === '0' || $("#edit_sched_url_rule_action option:selected").val() === '10') {

            if ($("#edit_def_url_rule_action option:selected").val() === '2') {
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), 0, 0, parseInt($("#edit_url_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_url_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_url_rule_action option:selected").val() === '0') {
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), 0, 0, 0, 0);
            } else
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

        } else {
            if ($("#edit_def_url_rule_action option:selected").val() === '2') {
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#edit_url_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_url_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_url_rule_action option:selected").val() === '0') {
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
            } else
                edit_ml_url_rule(parseInt(url_id[0]), parseInt(url_id[1]), parseInt($("#edit_url_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
        }
        Clear();
        $("#EditURLRuleModal").hide();
    });

    Update_URL_Rules(global_rule_user);
//    });
};

load_app_rules = function () {

    CURRENT_WINDOW = WINDOW_RULE_APPLICATIONS;

    $('#Content').html(rule_app_html);
//    $('#Content').load('rule_app.html', function () {

    app_rule_table = $('#App_Rule_Table').DataTable({
        columnDefs: [
            {targets: 0, visible: false},
            {targets: 1, visible: false},
            {width: '10%', targets: 2},
            {width: '10%', targets: 3},
            {width: '10%', targets: 4},
            {width: '15%', targets: 5},
            {width: '15%', targets: 6},
            {width: '10%', targets: 7},
            {width: '15%', targets: 8},
            {width: '15%', targets: 9},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        select: true,
        scrollY: ($('#app_rule_holder').height() - 110),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    set_primary_device(app_rule_table, true);

    $('#App_Rule_Table').on('click', 'tbody tr', function () {

        var selectedAppProfListTableRowCount = 0;
        var delay = 1;

        setTimeout(function () {
            selectedAppProfListTableRowCount = app_rule_table.rows('.selected').count();
        }, delay);

        setTimeout(function () {
            if (selectedAppProfListTableRowCount === 1) {
                $('#editAppRule, #deleteAppRule').attr('disabled', false);
//                    $('#addAppRule').attr('disabled', true);
            } else if (selectedAppProfListTableRowCount === 0) {
//                    $('#addAppRule').attr('disabled', false);
                $('#editAppRule, #deleteAppRule').attr('disabled', true);
            } else {
                alert("Incorrect Input");
            }
        }, delay);
    });

    $('#App_Rule_Table tbody').on('mouseenter', 'td', function (e) {

        var colIdx;
        var cell_data;

        if (typeof (app_rule_table.cell(this).data()) === 'string') {
            colIdx = app_rule_table.cell(this).index().column;
            cell_data = app_rule_table.cell(this).data();

            if ((colIdx === 4 || colIdx === 5) && (cell_data !== 'Any' && cell_data !== 'None' && cell_data !== '-')) {

                $("#tooltip_dt").html(set_shaping_tooltips(APP_PROF_TABLE, colIdx, cell_data, app_rule_table.row(this).data())).animate({left: e.pageX, top: e.pageY}, 0);

                if (!$("#tooltip_dt").is(':visible')) {
                    $("#tooltip_dt").show();
                }
            } else
                $("#tooltip_dt").hide();
        }
    });

    $('#App_Rule_Table tbody').on('mouseleave', function (e) {
        $("#tooltip_dt").hide();
    });

    clear_and_init_sched_quota_list('#add_app_rule_schedule');
    clear_and_init_sched_quota_list('#edit_app_rule_schedule');

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
        $('.create').attr('disabled', false);
    } else {
        $('.create').attr('disabled', true);
    }

    $("#appControlID").empty();
    $.each(application_list, function (key, app) {

        if (app !== 'Other') {
            $('#appControlID')
                    .append($('<option>', {value: app}));
        }
    });

    $("input[list=appControlID]").on('change', function () {
        if (application_list.indexOf($(this).val()) > -1) {
            $("#addedApp").empty();
            $("#addedApp").val($(this).val());
        }
    });

    $('#add_app_rule_schedule').change(function () {
        if ($("#add_app_rule_schedule option:selected").val() === '0') {
            $('#append_sched_pipes_app_rule').children().detach();
            $('#add_sched_app_rule_action').attr('disabled', true);
            if ($("#add_def_app_rule_action option:selected").val() !== '2' ||
                    ($("#add_def_app_rule_action option:selected").val() === '2' && $("#add_sched_app_rule_action option:selected").val() === '2')) {
                $('#AddAppRuleModalContent').css({'height': '100%', 'max-height': ($('#AddAppRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#add_sched_app_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#add_sched_app_rule_action').attr('disabled', false);
            $("#add_sched_app_rule_action option").filter(function () {
                return this.text === 'Allow';
            }).prop('selected', true);
        }
    });

    $('#edit_app_rule_schedule').change(function () {
        if ($("#edit_app_rule_schedule option:selected").val() === '0') {
            $('#edit_sched_pipes_app_rule').children().detach();

            if ($("#edit_def_app_rule_action option:selected").val() !== '2' ||
                    ($("#edit_def_app_rule_action option:selected").val() === '2' && $("#edit_sched_app_rule_action option:selected").val() === '2')) {
                $('#EditAppRuleModalContent').css({'height': '100%', 'max-height': ($('#EditAppRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#edit_sched_app_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
            $('#edit_sched_app_rule_action').attr('disabled', true);
        } else {
            $('#edit_sched_app_rule_action').attr('disabled', false);
            $("#edit_sched_app_rule_action option").filter(function () {
                return this.text === 'Allow';
            }).prop('selected', true);
        }
    });

    $('#add_sched_app_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'AddAppRuleModalContent', 'add_sched_app_rule_action', 'add_def_app_rule_action', 'add_app_rule_sched_dlink_pipe',
                'add_app_rule_sched_ulink_pipe', 'append_sched_pipes_app_rule', 'append_sched_pipes_app_rule', 'append_def_pipes_app_rule', '490px', '400px', '310px');
    });

    $('#add_def_app_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'AddAppRuleModalContent', 'add_sched_app_rule_action', 'add_def_app_rule_action', 'add_app_rule_def_dlink_pipe',
                'add_app_rule_def_ulink_pipe', 'append_def_pipes_app_rule', 'append_sched_pipes_app_rule', 'append_def_pipes_app_rule', '490px', '400px', '310px');
    });

    $('#edit_sched_app_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'EditAppRuleModalContent', 'edit_sched_app_rule_action', 'edit_def_app_rule_action', 'edit_app_rule_sched_dlink_pipe',
                'edit_app_rule_sched_ulink_pipe', 'edit_sched_pipes_app_rule', 'edit_sched_pipes_app_rule', 'edit_def_pipes_app_rule', '490px', '400px', '310px');
    });

    $('#edit_def_app_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'EditAppRuleModalContent', 'edit_sched_app_rule_action', 'edit_def_app_rule_action', 'edit_app_rule_def_dlink_pipe',
                'edit_app_rule_def_ulink_pipe', 'edit_def_pipes_app_rule', 'edit_sched_pipes_app_rule', 'edit_def_pipes_app_rule', '490px', '400px', '310px');
    });

    $('#addAppRuleToSystem').click(function () {
        var app_user_id = global_rule_user;
        var app_id = application_list.indexOf($("#addedApp").val());
        var optg_val = $("#add_app_rule_schedule option:selected").closest('optgroup').attr('value');
//        console.log(app_id)
        if (parseInt(app_id) > -1) {

            if ($("#add_sched_app_rule_action option:selected").val() === '2') {

                if ($("#add_def_app_rule_action option:selected").val() === '2') {
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), parseInt($("#add_app_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_app_rule_sched_ulink_pipe option:selected").val()), parseInt($("#add_app_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_app_rule_def_ulink_pipe option:selected").val()));
                } else if ($("#add_def_app_rule_action option:selected").val() === '0') {
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), parseInt($("#add_app_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_app_rule_sched_ulink_pipe option:selected").val()), 0, 0);
                } else
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), parseInt($("#add_app_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_app_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

            } else if ($("#add_sched_app_rule_action option:selected").val() === '0' || $("#add_sched_app_rule_action option:selected").val() === '10') {

                if ($("#add_def_app_rule_action option:selected").val() === '2') {
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), 0, 0, parseInt($("#add_app_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_app_rule_def_ulink_pipe option:selected").val()));
                } else if ($("#add_def_app_rule_action option:selected").val() === '0') {
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), 0, 0, 0, 0);
                } else
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

            } else {
                if ($("#add_def_app_rule_action option:selected").val() === '2') {
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#add_app_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_app_rule_def_ulink_pipe option:selected").val()));
                } else if ($("#add_def_app_rule_action option:selected").val() === '0') {
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
                } else
                    add_ml_app_rule(app_user_id, app_id, parseInt($("#add_app_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
            }
            $("#AddAppRuleModal").hide();

        } else {
        }

    });

    $('#editAppToProfile').click(function () {
        var app_id = application_list.indexOf($("#editAddedApp").val());
        var app_user_id = app_rule_table.row('.selected').data()[0];
        var optg_val = $("#edit_app_rule_schedule option:selected").closest('optgroup').attr('value');

        if ($("#edit_sched_app_rule_action option:selected").val() === '2') {

            if ($("#edit_def_app_rule_action option:selected").val() === '2') {
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), parseInt($("#edit_app_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_app_rule_sched_ulink_pipe option:selected").val()), parseInt($("#edit_app_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_app_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_app_rule_action option:selected").val() === '0') {
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), parseInt($("#edit_app_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_app_rule_sched_ulink_pipe option:selected").val()), 0, 0);
            } else
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), parseInt($("#edit_app_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_app_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

        } else if ($("#edit_sched_app_rule_action option:selected").val() === '0' || $("#edit_sched_app_rule_action option:selected").val() === '10') {

            if ($("#edit_def_app_rule_action option:selected").val() === '2') {
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), 0, 0, parseInt($("#edit_app_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_app_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_app_rule_action option:selected").val() === '0') {
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), 0, 0, 0, 0);
            } else
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

        } else {
            if ($("#edit_def_app_rule_action option:selected").val() === '2') {
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#edit_app_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_app_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_app_rule_action option:selected").val() === '0') {
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
            } else
                edit_ml_app_rule(app_user_id, app_id, parseInt($("#edit_app_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
        }
        Clear();
        $('#EditAppRuleModal').hide();
    });

    Update_App_Rules(global_rule_user);
//    });
};

load_service_rules = function () {

    CURRENT_WINDOW = WINDOW_RULE_SERVICE;

    $('#Content').html(rule_serv_html);
//    $('#Content').load('rule_serv.html', function () {

    service_rule_table = $('#Service_Rule_Table').DataTable({
        columnDefs: [
            {width: '10%', targets: 0, visible: false},
            {width: '10%', targets: 1},
            {width: '10%', targets: 2, visible: false},
            {width: '10%', targets: 3},
            {width: '20%', targets: 4},
            {width: '20%', targets: 5},
            {width: '10%', targets: 6},
            {width: '10%', targets: 7},
            {width: '20%', targets: 8},
            {width: '10%', targets: 9},
            {width: '10%', targets: 10},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        select: true,
        scrollY: ($('#service_rule_holder').height() - 110),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    set_primary_device(service_rule_table, true);

    $('#Service_Rule_Table').on('click', 'tbody tr', function () {
        var selectedServProfListTableRowCount = 0;
        var delay = 1;
        setTimeout(function () {
            selectedServProfListTableRowCount = service_rule_table.rows('.selected').count();
        }, delay);

        setTimeout(function () {
            if (selectedServProfListTableRowCount === 1) {
                $('#editServiceRule, #deleteServiceRule').attr('disabled', false);
//                    $('#addServiceRule').attr('disabled', true);
            } else if (selectedServProfListTableRowCount === 0) {
//                    $('#addServiceRule').attr('disabled', false);
                $('#editServiceRule, #deleteServiceRule').attr('disabled', true);
            } else {
                alert("Incorrect Input");
            }
        }, delay);
    });

    $('#Service_Rule_Table tbody').on('mouseenter', 'td', function (e) {

        var colIdx;
        var cell_data;

        if (typeof (service_rule_table.cell(this).data()) === 'string') {
            colIdx = service_rule_table.cell(this).index().column;
            cell_data = service_rule_table.cell(this).data();

            if ((colIdx === 6 || colIdx === 7) && (cell_data !== 'Any' && cell_data !== 'None' && cell_data !== '-')) {
                $("#tooltip_dt").html(set_shaping_tooltips(SERV_PROF_TABLE, colIdx, cell_data, service_rule_table.row(this).data())).animate({left: e.pageX, top: e.pageY}, 0);
                if (!$("#tooltip_dt").is(':visible')) {
                    $("#tooltip_dt").show();
                }
            } else
                $("#tooltip_dt").hide();
        }
    });

    $('#Service_Rule_Table tbody').on('mouseleave', function (e) {
        $("#tooltip_dt").hide();
    });

    clear_and_init_sched_quota_list('#add_serv_rule_schedule');
    clear_and_init_sched_quota_list('#edit_serv_rule_schedule');

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
        $('.create').attr('disabled', false);
    } else {
        $('.create').attr('disabled', true);
    }

    $('#add_serv_rule_schedule').change(function () {
        if ($("#add_serv_rule_schedule option:selected").val() === '0') {
            $('#append_sched_pipes_serv_rule').children().detach();
            $('#add_sched_serv_rule_action').attr('disabled', true);
            if ($("#add_def_serv_rule_action option:selected").val() !== '2' ||
                    ($("#add_def_serv_rule_action option:selected").val() === '2' && $("#add_sched_serv_rule_action option:selected").val() === '2')) {
                $('#AddServRuleModalContent').css({'height': '100%', 'max-height': ($('#AddServRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#add_sched_serv_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#add_sched_serv_rule_action').attr('disabled', false);
            $("#add_sched_serv_rule_action option").filter(function () {
                return this.text === 'Allow';
            }).prop('selected', true);
        }
    });

    $('#edit_serv_rule_schedule').change(function () {
        if ($("#edit_serv_rule_schedule option:selected").val() === '0') {
            $('#edit_sched_pipes_serv_rule').children().detach();
            $('#edit_sched_serv_rule_action').attr('disabled', true);
            if ($("#edit_def_serv_rule_action option:selected").val() !== '2' ||
                    ($("#edit_def_serv_rule_action option:selected").val() === '2' && $("#edit_sched_serv_rule_action option:selected").val() === '2')) {
                $('#editServRuleModalContent').css({'height': '100%', 'max-height': ($('#EditServRuleModalContent').outerHeight() - 90) + 'px'});
            }
            $("#Edit_sched_serv_rule_action option").filter(function () {
                return this.text === 'N/A';
            }).prop('selected', true);
        } else {
            $('#edit_sched_serv_rule_action').attr('disabled', false);
            $("#edit_sched_serv_rule_action option").filter(function () {
                return this.text === 'Allow';
            }).prop('selected', true);
        }
    });

    $('#add_sched_serv_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'AddServiceRuleModalContent', 'add_sched_serv_rule_action', 'add_def_serv_rule_action', 'add_serv_rule_sched_dlink_pipe',
                'add_serv_rule_sched_ulink_pipe', 'append_sched_pipes_serv_rule', 'append_sched_pipes_serv_rule', 'append_def_pipes_serv_rule', '535px', '445px', '355px');
    });

    $('#add_def_serv_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'AddServiceRuleModalContent', 'add_sched_serv_rule_action', 'add_def_serv_rule_action', 'add_serv_rule_def_dlink_pipe',
                'add_serv_rule_def_ulink_pipe', 'append_def_pipes_serv_rule', 'append_sched_pipes_serv_rule', 'append_def_pipes_serv_rule', '535px', '445px', '355px');
    });

    $('#edit_sched_serv_rule_action').change(function () {
        append_sched_def_modal_shapers('Scheduled', 'EditServiceRuleModalContent', 'edit_sched_serv_rule_action', 'edit_def_serv_rule_action', 'edit_serv_rule_sched_dlink_pipe',
                'edit_serv_rule_sched_ulink_pipe', 'edit_sched_pipes_serv_rule', 'edit_sched_pipes_serv_rule', 'edit_def_pipes_serv_rule', '535px', '445px', '355px');
    });

    $('#edit_def_serv_rule_action').change(function () {
        append_sched_def_modal_shapers('Default', 'EditServiceRuleModalContent', 'edit_sched_serv_rule_action', 'edit_def_serv_rule_action', 'edit_serv_rule_def_dlink_pipe',
                'edit_serv_rule_def_ulink_pipe', 'edit_def_pipes_serv_rule', 'edit_sched_pipes_serv_rule', 'edit_def_pipes_serv_rule', '535px', '445px', '355px');
    });

    $('#addServiceRuleToSystem').click(function () {
        var serv_user_id = global_rule_user;
        var optg_val = $("#add_serv_rule_schedule option:selected").closest('optgroup').attr('value');

        if ($("#add_sched_serv_rule_action option:selected").val() === '2') {

            if ($("#add_def_serv_rule_action option:selected").val() === '2') {
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), parseInt($("#add_serv_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_serv_rule_sched_ulink_pipe option:selected").val()), parseInt($("#add_serv_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_serv_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#add_def_serv_rule_action option:selected").val() === '0') {
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), parseInt($("#add_serv_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_serv_rule_sched_ulink_pipe option:selected").val()), 0, 0);
            } else
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), parseInt($("#add_serv_rule_sched_dlink_pipe option:selected").val()), parseInt($("#add_serv_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

        } else if ($("#add_sched_serv_rule_action option:selected").val() === '0' || $("#add_sched_serv_rule_action option:selected").val() === '10') {

            if ($("#add_def_serv_rule_action option:selected").val() === '2') {
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), 0, 0, parseInt($("#add_serv_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_serv_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#add_def_serv_rule_action option:selected").val() === '0') {
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), 0, 0, 0, 0);
            } else
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

        } else {
            if ($("#add_def_serv_rule_action option:selected").val() === '2') {
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#add_serv_rule_def_dlink_pipe option:selected").val()), parseInt($("#add_serv_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#add_def_serv_rule_action option:selected").val() === '0') {
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
            } else
                add_ml_serv_rule(serv_user_id, parseInt($("#add_serv_rule_port").val()), parseInt($("#add_serv_rule_protocol").val()), parseInt($("#add_serv_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
        }
        $("#AddServiceRuleModal").hide();
    });

    $('#editServiceRuleToSystem').click(function () {
        var serv_id = service_rule_table.row('.selected').data();
        var optg_val = $("#edit_serv_rule_schedule option:selected").closest('optgroup').attr('value');

        if ($("#edit_sched_serv_rule_action option:selected").val() === '2') {
            if ($("#edit_def_serv_rule_action option:selected").val() === '2') {
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), parseInt($("#edit_serv_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_serv_rule_sched_ulink_pipe option:selected").val()), parseInt($("#edit_serv_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_serv_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_serv_rule_action option:selected").val() === '0') {
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), parseInt($("#edit_serv_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_serv_rule_sched_ulink_pipe option:selected").val()), 0, 0);
            } else
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), parseInt($("#edit_serv_rule_sched_dlink_pipe option:selected").val()), parseInt($("#edit_serv_rule_sched_ulink_pipe option:selected").val()), 65535, 65535);

        } else if ($("#edit_sched_serv_rule_action option:selected").val() === '0' || $("#edit_sched_serv_rule_action option:selected").val() === '10') {

            if ($("#edit_def_serv_rule_action option:selected").val() === '2') {
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), 0, 0, parseInt($("#edit_serv_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_serv_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_serv_rule_action option:selected").val() === '0') {
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), 0, 0, 0, 0);
            } else
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), 0, 0, 65535, 65535);

        } else {
            if ($("#edit_def_serv_rule_action option:selected").val() === '2') {
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), 65535, 65535, parseInt($("#edit_serv_rule_def_dlink_pipe option:selected").val()), parseInt($("#edit_serv_rule_def_ulink_pipe option:selected").val()));
            } else if ($("#edit_def_serv_rule_action option:selected").val() === '0') {
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), 65535, 65535, 0, 0);
            } else
                edit_ml_serv_rule(parseInt(serv_id[0]), parseInt(serv_id[1]), parseInt($("#edit_serv_rule_schedule option:selected").val()), 65535, 65535, 65535, 65535);
        }
        Clear();
        $("#EditServiceRuleModal").hide();
    });

    Update_Service_Rules(global_rule_user);
//    });
};

load_obj_schedule = function () {

    CURRENT_WINDOW = WINDOW_OBJ_SCHEDULE;

    $('#Content').html(obj_sched_html);
//    $('#Content').load('obj_sched.html', function () {

    schedule_table = $('#Schedule_Table').DataTable({
        columnDefs: [
            {targets: 0, visible: false},
            {targets: 1, visible: false},
            {width: '15%', targets: 2},
            {width: '10%', targets: 3},
            {width: '35%', targets: 4},
            {width: '10%', targets: 5},
            {width: '10%', targets: 6},
            {width: '10%', targets: 7},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        select: true,
        scrollY: ($('#Object_Schedules_Holder').height() - 150),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    set_primary_device(schedule_table, true);

    $('#Schedule_Table').on('click', 'tbody tr', function () {
        selectedTableRowCount = 0;
        var delay = 1;
        setTimeout(function () {
            selectedTableRowCount = schedule_table.rows('.selected').count();
        }, delay);
    });
    enable_table_controls('Schedule_Table');
    disable_table_del_ref('Schedule_Table', schedule_table);

    if (global_rule_user !== 0) {
        $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
    }

    if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
        $('.create').attr('disabled', false);
    } else {
        $('.create').attr('disabled', true);
    }

    $('#ScheduleCode').change(function () {
        $('#appendSchedule').children().detach();
        var opt = $("#ScheduleCode option:selected").text();
        SetScheduleTableModalElements(opt, 'appendSchedule');
    });

    $('#ScheduleCodeEdit').change(function () {
        $('#editSchedule').children().detach();
        var opt = $("#ScheduleCode option:selected").text();
        EditScheduleTableModalElements(opt, 'editSchedule');
    });

    $("#addScheduleToSystem").click(function () {

        var opt = $("#ScheduleCode option:selected").text();
        var shd_user = global_rule_user;
        if (opt === "Weekly Recurring") {
            add_ml_schedule(shd_user, $("#addScheduleName").val(), 21, encode_days_of_week(checked_days(1), checked_days(2), checked_days(3), checked_days(4), checked_days(5), checked_days(6), checked_days(7)), recur_st, recur_et);
        } else if (opt === "One Time") {
            var s_time = ((new Date($('#startDateTimePeriod').data("DateTimePicker").date()).getTime()) / 1000).toFixed(0);
            var e_time = ((new Date($('#endDateTimePeriod').data("DateTimePicker").date()).getTime()) / 1000).toFixed(0);
            add_ml_schedule(shd_user, $("#addScheduleName").val(), 22, 0, s_time, e_time);
        }
        document.getElementById('CreateScheduleModal').style.display = "none";
    });

    $("#editScheduleToSystem").click(function () {
        var schd_id = schedule_table.row('.selected').data();
        var opt = $("#ScheduleCodeEdit option:selected").text();

        if (opt === "Weekly Recurring") {
            edit_ml_schedule(parseInt(schd_id[0]), parseInt(schd_id[1]), $("#editScheduleName").val(), encode_days_of_week(checkedE_days(1), checkedE_days(2), checkedE_days(3), checkedE_days(4), checkedE_days(5), checkedE_days(6), checkedE_days(7)), recur_st, recur_et);
        } else if (opt === "One Time") {
            var s_time = ((new Date($('#edit_sched_startDateTimePeriod').data("DateTimePicker").date()).getTime()) / 1000).toFixed(0);
            var e_time = ((new Date($('#edit_sched_endDateTimePeriod').data("DateTimePicker").date()).getTime()) / 1000).toFixed(0);
            edit_ml_schedule(parseInt(schd_id[0]), parseInt(schd_id[1]), $("#editScheduleName").val(), 0, s_time, e_time);
        }
        document.getElementById('EditScheduleModal').style.display = "none";
        Clear();
    });

    Update_Schedule_List(global_rule_user);
//    });
};

load_obj_admin_pipe = function () {

    CURRENT_WINDOW = WINDOW_OBJ_ADMIN_PIPES;

//    $('#Content').html(obj_admin_pipes_html);
    $('#Content').load('obj_admin_pipes.html', function () {

        admin_pipe_table = $('#Admin_Pipe_Table').DataTable({
            columnDefs: [
                {targets: 0, visible: false},
                {width: '20%', targets: 1},
                {width: '20%', targets: 2},
                {width: '20%', targets: 3},
                {width: '20%', targets: 4},
                {width: '20%', targets: 5},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            select: true,
            scrollY: ($('#Object_Admin_Pipes_Holder').height() - 150),
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });

        set_primary_device(admin_pipe_table, true);

        $('#Admin_Pipe_Table').on('click', 'tbody tr', function () {
            var delay = 1;
            setTimeout(function () {
                selectedTableRowCount = admin_pipe_table.rows('.selected').count();
            }, delay);

        });
        enable_table_controls('Admin_Pipe_Table');
        disable_table_del_ref('Admin_Pipe_Table', admin_pipe_table);

        $("#addAdminPipeToSystem").click(function () {
            add_ml_admin_pipe($("#addAdminPipeName").val(), $("#adminPipeGuarantBW").val(), $("#adminPipeMaxBW").val(), $("#addPipePriority option:selected").val());
            document.getElementById('CreateAdminPipeModal').style.display = "none";
        });

        $("#editAdminPipeToSystem").click(function () {
            var shaperID = admin_pipe_table.row('.selected').data()[0];
            update_ml_admin_pipe(shaperID, $("#editAdminPipeName").val(), $("#editAdminPipeGuarantBW").val(), $("#editAdminPipeMaxBW").val(), $("#editPipePriority option:selected").val());
            document.getElementById('EditAdminPipeModal').style.display = "none";
            Clear();
        });

        Display_Admin_Pipe_Table();
    });
};

load_obj_user_pipe = function () {

    CURRENT_WINDOW = WINDOW_OBJ_USER_PIPES;

//    $('#Content').html(obj_user_pipes_html);
    $('#Content').load('obj_user_pipes.html', function () {

        user_pipe_table = $('#User_Pipe_Table').DataTable({
            columnDefs: [
                {width: '10%', targets: 0, visible: false},
                {width: '10%', targets: 1, visible: false},
                {width: '10%', targets: 2, visible: false},
                {width: '20%', targets: 3},
                {width: '20%', targets: 4},
                {width: '15%', targets: 5},
                {width: '15%', targets: 6},
                {width: '20%', targets: 7},
                {width: '10%', targets: 8},
                {width: '10%', targets: 9},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            select: true,
            scrollY: ($('#Object_User_Pipes_Holder').height() - 150),
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });

        set_primary_device(user_pipe_table, true);

        $('#User_Pipe_Table').on('click', 'tbody tr', function () {
            var delay = 1;
            setTimeout(function () {
                selectedTableRowCount = user_pipe_table.rows('.selected').count();
            }, delay);
        });

        enable_table_controls('User_Pipe_Table');
        disable_table_del_ref('User_Pipe_Table', user_pipe_table);
        init_admin_pipes('#add_user_admin_pipe');
        init_admin_pipes('#edit_user_admin_pipe');

        if (global_rule_user !== 0) {
            $('#rule_user_label').text(user_profile_lookup_list[global_rule_user]);
        }

        if (user_profile_lookup_list.length > 0 && SET_PRIMARY && admin_pipe_list.length > 0) {
            $('.create').attr('disabled', false);
        } else {
            $('.create').attr('disabled', true);
        }

        if (admin_pipe_list.length > 0) {
            var admn_pipe = $("#add_user_admin_pipe option:selected").val();
            var pipe_elem = admin_pipe_list_tt[admn_pipe].split('&');

            $('#add_user_admin_pipe').change(function () {
                admn_pipe = $("#add_user_admin_pipe option:selected").val();
                var pipe_elem = admin_pipe_list_tt[admn_pipe].split('&');
                $("#addUserPipeGuarantBW").val(pipe_elem[2]).attr("disabled", true);
                $("#addUserPipeMaxBW").val(pipe_elem[3]).attr("disabled", true);
                $("#addUserPipePriority").val(pipe_priority(pipe_elem[4])).attr("disabled", true);
            });

            $('#edit_user_admin_pipe').change(function () {
                admn_pipe = $("#edit_user_admin_pipe option:selected").val();
                var pipe_elem = admin_pipe_list_tt[admn_pipe].split('&');
                $("#editUserPipeGuarantBW").val(pipe_elem[2]).attr("disabled", true);
                $("#editUserPipeMaxBW").val(pipe_elem[3]).attr("disabled", true);
                $("#editUserPipePriority").val(pipe_priority(pipe_elem[4])).attr("disabled", true);
            });

            $("#addUserPipeToSystem").click(function () {
                var user_id = global_rule_user;
                add_ml_user_pipe(user_id, admn_pipe, $("#addUserPipeName").val(), set_pipe_type("#addUserPipeType option:selected", "#addUserGroupingType option:selected"), 0);
                document.getElementById('CreateUserPipeModal').style.display = "none";
            });

            $("#editUserPipeToSystem").click(function () {
                var shaperDet = user_pipe_table.row('.selected').data();
                update_ml_user_pipe(shaperDet[0], shaperDet[1], $("#edit_user_admin_pipe option:selected").val(), $("#editUserPipeName").val());
                document.getElementById('EditUserPipeModal').style.display = "none";
                Clear();
            });

            $("#addUserPipeGuarantBW").val(pipe_elem[2]).attr("disabled", true);
            $("#addUserPipeMaxBW").val(pipe_elem[3]).attr("disabled", true);
            $("#addUserPipePriority").val(pipe_priority(pipe_elem[4])).attr("disabled", true);
        }

        Update_User_Pipe_List(global_rule_user);
    });
};

load_quota_profile_window = function () {

    CURRENT_WINDOW = WINDOW_QUOTA_PROFILES;

//    $('#Content').html(quota_profiles_html);
    $('#Content').load('quota_profiles.html', function () {

        quota_prof_table = $('#Quota_Prof_Table').DataTable({
            columnDefs: [
                {width: '10%', targets: 0, visible: false},
                {width: '20%', targets: 1},
                {width: '10%', targets: 2},
                {width: '10%', targets: 3},
                {width: '10%', targets: 4},
                {width: '10%', targets: 5},
                {width: '10%', targets: 6},
                {width: '10%', targets: 7},
                {width: '10%', targets: 7},
                {width: '10%', targets: 8},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            select: true,
            scrollY: ($('#Quota_Prof_Holder').height() - 150),
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });

        $('#Quota_Prof_Table').on('click', 'tbody tr', function () {
            var delay = 1;
            setTimeout(function () {
                selectedTableRowCount = quota_prof_table.rows('.selected').count();
            }, delay);
        });

        if (global_rule_user !== 0) {
            $('#rule_user_label').text(user_profile_lookup_list[global_rule_user]);
        }

        if (user_profile_lookup_list.length > 0 && SET_PRIMARY && user_pipe_list.length > 0) {
            $('.create').attr('disabled', false);
        } else {
            $('.create').attr('disabled', true);
        }

        enable_table_controls('Quota_Prof_Table');
        disable_table_del_ref('Quota_Prof_Table', quota_prof_table);

        $('#add_def_quota_action').change(function () {

            $('#append_quota_prof_shapers').children().detach();
            if ($("#add_def_quota_action option:selected").val() === '2') {
                $('#CreateQuotaProfModalContent').css({height: '490px'});
                var pipes = "<label class='drop_down_label'> Downlink Pipe : </label>" +
                        "<select id='add_downlink_def_quota_pipe' class='field_prop'>" +
                        "</select> <br><br>" +
                        "<label class='drop_down_label'> Uplink Pipe : </label>" +
                        "<select id='add_uplink_def_quota_pipe' class='field_prop'>" +
                        "</select><br><br>";

                $('#append_quota_prof_shapers').append(pipes);
                init_user_pipes('#add_downlink_def_quota_pipe');
                init_user_pipes('#add_uplink_def_quota_pipe');
            } else {
                $('#CreateQuotaProfModalContent').css({height: '400px'});
            }
        });

        $('#edit_def_quota_action').change(function () {

            $('#edit_quota_prof_shapers').children().detach();
            if ($("#edit_def_quota_action option:selected").val() === '2') {
                $('#EditQuotaProfModalContent').css({height: '490px'});
                var pipes = "<label class='drop_down_label'> Downlink Pipe : </label>" +
                        "<select id='edit_downlink_def_quota_pipe' class='field_prop'>" +
                        "</select> <br><br>" +
                        "<label class='drop_down_label'> Uplink Pipe : </label>" +
                        "<select id='edit_uplink_def_quota_pipe' class='field_prop'>" +
                        "</select><br><br>";

                $('#edit_quota_prof_shapers').append(pipes);
                init_user_pipes('#edit_downlink_def_quota_pipe');
                init_user_pipes('#edit_uplink_def_quota_pipe');
            } else {
                $('#EditQuotaProfModalContent').css({height: '400px'});
            }
        });

        $("#addQuotaProfToSystem").click(function () {

            if ($("#add_def_quota_action option:selected").val() === '2') {
                add_wo_quota_prof($("#addQuotaProfName").val(), parseInt($("#addQuotaProfType option:selected").val()), parseInt($("#addQuotaProfAmount").val()), set_pipe_type("#addQuotaPipeType option:selected", "#addQuotaGroupingType option:selected"), parseInt($("#add_downlink_def_quota_pipe option:selected").val()), parseInt($("#add_uplink_def_quota_pipe option:selected").val()));
            } else if ($("#add_def_quota_action option:selected").val() === '0') {
                add_wo_quota_prof($("#addQuotaProfName").val(), parseInt($("#addQuotaProfType option:selected").val()), parseInt($("#addQuotaProfAmount").val()), set_pipe_type("#addQuotaPipeType option:selected", "#addQuotaGroupingType option:selected"), 0, 0);
            } else
                add_wo_quota_prof($("#addQuotaProfName").val(), parseInt($("#addQuotaProfType option:selected").val()), parseInt($("#addQuotaProfAmount").val()), set_pipe_type("#addQuotaPipeType option:selected", "#addQuotaGroupingType option:selected"), -1, -1);

            $("#CreateQuotaProfModal").hide();
        });

        $("#editQuotaProfToSystem").click(function () {
            var totQuotaID = quota_prof_table.row('.selected').data()[0];
            if ($("#edit_def_quota_action option:selected").val() === '2') {
                update_wo_quota_prof(totQuotaID, parseInt($("#editQuotaProfAmount").val()), parseInt($("#edit_downlink_def_quota_pipe option:selected").val()), parseInt($("#edit_uplink_def_quota_pipe option:selected").val()));
            } else if ($("#edit_def_quota_action option:selected").val() === '0') {
                update_wo_quota_prof(totQuotaID, parseInt($("#editQuotaProfAmount").val()), 0, 0);
            } else
                update_wo_quota_prof(totQuotaID, parseInt($("#editQuotaProfAmount").val()), -1, -1);

            $("#EditQuotaProfModal").hide();
            Clear();
        });
        Display_Quota_Prof_Table();
    });
};

load_obj_default_pipe = function () {

    CURRENT_WINDOW = WINDOW_DEFAULT_PIPE;

//    $('#Content').html(default_pipe_html);
    $('#Content').load('default_pipe.html', function () {

        default_pipe_table = $('#Default_Pipe_Table').DataTable({
            columnDefs: [
                {width: '12%', targets: 0},
                {width: '12%', targets: 1},
                {width: '12%', targets: 2},
                {width: '16%', targets: 3},
                {width: '16%', targets: 4},
                {width: '16%', targets: 5},
                {width: '16%', targets: 6},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            select: false,
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });

        set_primary_device(default_pipe_table, true);

        if (global_rule_user !== 0) {
            $('#rule_user_label').text(user_profile_lookup_list[global_rule_user])
        }

        if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
            $('.create').attr('disabled', false);
        } else {
            $('.create').attr('disabled', true);
        }

        $('#edit_licensed_def_pipe_action').change(function () {
            append_default_pipe('EditDefaultPipeModalContent', 'edit_licensed_def_pipe_action', 'editDefaultGurPipeDlink', 'editDefaultGurPipeUlink', 'editDefaultMaxPipeDlink', 'editDefaultMaxPipeUlink', 'edit_licensed_def_pipe');
        });

        $("#editDefaultPipeToSystem").click(function () {
            if ($("#edit_licensed_def_pipe_action option:selected").val() === '2') {
                update_ml_default_pipe(global_rule_user, parseInt($("#editDefaultPipePriority option:selected").val()), parseInt($("#editDefaultPipeType option:selected").val()), parseInt($("#editDefaultGurPipeDlink").val()), parseInt($("#editDefaultGurPipeUlink").val()), parseInt($("#editDefaultMaxPipeDlink").val()), parseInt($("#editDefaultMaxPipeUlink").val()));
            } else
                update_ml_default_pipe(global_rule_user, 0, 0, 0, 0, 0, 0);
            $("#EditDefaultPipeModal").hide();
        });

        Update_Default_Pipe(global_rule_user);
    });
};

load_quota_usage_window = function () {

    CURRENT_WINDOW = WINDOW_QUOTA_USAGE;

//    $('#Content').html(quota_usage_html);
    $('#Content').load('quota_usage.html', function () {

        quota_usage_table = $('#Quota_Usage_Table').DataTable({
            columnDefs: [
                {width: '2%', targets: 0, visible: false},
                {width: '15%', targets: 1},
                {width: '15%', targets: 2, data: null,
                    render: function (data, type, row) {
                        if (data[2] !== 'None') {
                            return data[2] + "<br><div class='btn-group'><button id='2_qviz_usage' class='pq_session_wbtn'><span>Usage</span></button>" +
                                    "<button id='2_qviz_reset' class='pq_url_wbtn' style='background: #eea236; width: 40px; margin-left: -1px;'>Reset</button></div>";
                        } else {
                            return data[2];
                        }
                    }
                },
                {width: '15%', targets: 3, data: null,
                    render: function (data, type, row) {
                        if (data[3] !== 'None') {
                            return data[3] + "<br><div class='btn-group'><button id='3_qviz_usage' class='pq_session_wbtn'><span>Usage</span></button>" +
                                    "<button id='3_qviz_reset' class='pq_url_wbtn' style='background: #eea236; width: 40px; margin-left: -1px;'>Reset</button></div>";
                        } else {
                            return data[3];
                        }
                    }
                },
                {width: '15%', targets: 4, data: null,
                    render: function (data, type, row) {
                        if (data[4] !== 'None') {
                            return data[4] + "<br><div class='btn-group'><button id='4_qviz_usage' class='pq_session_wbtn'><span>Usage</span></button>" +
                                    "<button id='4_qviz_reset' class='pq_url_wbtn' style='background: #eea236; width: 40px; margin-left: -1px;'>Reset</button></div>";
                        } else {
                            return data[4];
                        }
                    }
                },
                {width: '15%', targets: 5, data: null,
                    render: function (data, type, row) {
                        return data[5] + "<br><div class='btn-group'><button id='5_qviz_usage' class='pq_session_wbtn'><span>Usage</span></button>" +
                                "<button id='5_qviz_reset' class='pq_url_wbtn' style='background: #eea236; width: 40px; margin-left: -1px;'>Reset</button></div>";
                    }
                },
                {width: '8%', targets: 6, data: null,
                    render: function (data, type, row) {
                        return "<button id='6_qviz_reset' class='pq_url_wbtn' style='background: #eea236 '>Reset All</button>";
                    }
                },
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            select: true,
            scrollY: ($('#Quota_Usage_Holder').height() - 40),
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });

        if (global_rule_user !== 0) {
            $('#rule_user_label').text(user_profile_lookup_list[global_rule_user]);
        }

//        if (user_profile_lookup_list.length > 0 && SET_PRIMARY) {
//            $('.create').attr('disabled', false);
//        } else {
//            $('.create').attr('disabled', true);
//        }

        $('#Quota_Usage_Table').on('click', 'tbody tr', function () {
            var delay = 1;
            setTimeout(function () {
                selectedTableRowCount = quota_usage_table.rows('.selected').count();
            }, delay);
        });

        $('#Quota_Usage_Table tbody').on("click", '.pq_session_wbtn', function () {

            CURRENT_WINDOW = WINDOW_QUOTA_USAGE_DET;

            var quota_rule = quota_usage_table.row($(this).parents('tr')).data();
            var col_id = $(this).attr("id").split('_');
            quota_usage_query_type = parseInt(col_id[0]);

//        $('#Content').html(quota_usage_det_html);
            $('#Content').load('quota_usage_det.html', function () {

                quota_usage_det_table = $('#Quota_Usage_Prof_Det_Table').DataTable({
                    columnDefs: [
                        {width: '10%', targets: 0, visible: false},
                        {width: '10%', targets: 1, visible: false},
                        {width: '10%', targets: 2},
                        {width: '10%', targets: 3},
                        {width: '10%', targets: 4},
                        {width: '10%', targets: 5},
                        {width: '10%', targets: 6},
                        {width: '10%', targets: 7},
                        {width: '10%', targets: 8, data: null,
                            render: function (data, type, row) {
                                return "<button class='pq_url_wbtn' style='background: #eea236'>Reset</button>";
                            }},
                        {orderable: false, targets: '_all'},
                        {className: 'dt-center', targets: '_all'}
                    ],
                    select: false,
                    scrollY: ($('#Quota_Usage_Det_Holder').height() - 150),
                    scrollCollapse: true,
                    paging: false,
                    searching: false,
                    info: false,
                    ordering: false
                });

                $('#reset_qta_prof_btn').click(function () {

                    switch (quota_usage_reset_type) {
                        case QTPROF_RTYPE_DEF:
                            $('#q_usage_reset_show_label').text('Default Quota Profile will be reset! Do you want to proceed?');
                            break;
                        case QTPROF_RTYPE_APP:
                            $('#q_usage_reset_show_label').text('Default Quota of Application Profile will be reset! Do you want to proceed?');
                            break;
                        case QTPROF_RTYPE_URL:
                            $('#q_usage_reset_show_label').text('Default Quota of URL Profile will be reset! Do you want to proceed?');
                            break;
                        case QTPROF_RTYPE_SVS:
                            $('#q_usage_reset_show_label').text('Default Quota of Service Profile will be reset! Do you want to proceed?');
                            break;
                    }
                    $('#q_usage_reset_warning_modal').show();
                });

                $('#Quota_Usage_Prof_Det_Table tbody').on('click', '.pq_url_wbtn', function () {
                    var data = quota_usage_det_table.row($(this).parents('tr')).data();
                    reset_elem_data = data;

                    quota_usage_reset_type = QT_RTYPE_ELEMENT;
                    $('#q_usage_reset_show_label').text('Default Quota of Element will be reset! Do you want to proceed?');
                    $('#q_usage_reset_warning_modal').show();
                });


                quota_usage_viz_rule_id = parseInt(quota_rule[0]);

                switch (parseInt(col_id[0])) {
                    case 2:
                        quota_usage_viz_prof_id = quota_app_prof_list.indexOf(quota_rule[2]);
                        quota_usage_reset_type = QTPROF_RTYPE_APP;
                        $('#quota_rule_vis_label').text('Quota Rule - Application Profile Quota Usage');
                        Get_Quota_Rule_Element_Details(QVIZ_GEN_DISPLAY, parseInt(quota_rule[0]), parseInt(quota_usage_viz_prof_id), 0, 0, 0, 0, [0, 0, 0, 0], [0, 0, 0, 0]);
                        break;
                    case 3:
                        quota_usage_viz_prof_id = quota_url_prof_list.indexOf(quota_rule[3]);
                        quota_usage_reset_type = QTPROF_RTYPE_URL;
                        $('#quota_rule_vis_label').text('Quota Rule - URL Profile Quota Usage');
                        Get_Quota_Rule_Element_Details(QVIZ_GEN_DISPLAY, parseInt(quota_rule[0]), 0, parseInt(quota_usage_viz_prof_id), 0, 0, 0, [0, 0, 0, 0], [0, 0, 0, 0]);
                        break;
                    case 4:
                        quota_usage_viz_prof_id = quota_serv_prof_list.indexOf(quota_rule[4]);
                        quota_usage_reset_type = QTPROF_RTYPE_SVS;
                        $('#quota_rule_vis_label').text('Quota Rule - Service Profile Quota Usage');
                        Get_Quota_Rule_Element_Details(QVIZ_GEN_DISPLAY, parseInt(quota_rule[0]), 0, 0, parseInt(quota_usage_viz_prof_id), 0, 0, [0, 0, 0, 0], [0, 0, 0, 0]);
                        break;
                    case 5:
                        quota_usage_viz_prof_id = quota_prof_list.indexOf(quota_rule[5]);
                        quota_usage_reset_type = QTPROF_RTYPE_DEF;
                        $('#quota_rule_vis_label').text('Quota Rule - Default Quota Usage');
                        Get_Quota_Rule_Element_Details(QVIZ_GEN_DISPLAY, parseInt(quota_rule[0]), 0, 0, 0, 0, 0, [0, 0, 0, 0], [0, 0, 0, 0]);
                        break;
                }
            });
        });

        $('#Quota_Usage_Table tbody').on('click', '.pq_url_wbtn', function () {

            var quota_rule = quota_usage_table.row($(this).parents('tr')).data();
            var col_id = $(this).attr("id").split('_');

            quota_usage_viz_rule_id = parseInt(quota_rule[0]);
            quota_usage_query_type = parseInt(col_id[0]);

            switch (parseInt(col_id[0])) {
                case 2:
                    quota_usage_reset_type = QTPROF_RTYPE_APP;
                    quota_usage_viz_prof_id = quota_app_prof_list.indexOf(quota_rule[2]);
                    $('#q_usage_reset_show_label').text('Default Quota of Application Profile will be reset! Do you want to proceed?');
                    break;
                case 3:
                    quota_usage_reset_type = QTPROF_RTYPE_URL;
                    quota_usage_viz_prof_id = quota_url_prof_list.indexOf(quota_rule[3]);
                    $('#q_usage_reset_show_label').text('Default Quota of URL Profile will be reset! Do you want to proceed?');
                    break;
                case 4:
                    quota_usage_reset_type = QTPROF_RTYPE_SVS;
                    quota_usage_viz_prof_id = quota_serv_prof_list.indexOf(quota_rule[4]);
                    $('#q_usage_reset_show_label').text('Default Quota of Service Profile will be reset! Do you want to proceed?');
                    break;
                case 5:
                    quota_usage_reset_type = QTPROF_RTYPE_DEF;
                    quota_usage_viz_prof_id = quota_prof_list.indexOf(quota_rule[5]);
                    $('#q_usage_reset_show_label').text('Default Quota Profile will be reset! Do you want to proceed?');
                    break;
                case 6:
                    quota_usage_reset_type = QTPROF_RTYPE_RULE;
                    $('#q_usage_reset_show_label').text('Quotas of all Elements in the Rule will be reset! Do you want to proceed?');
                    break;
            }
            $('#q_usage_reset_warning_modal').show();
        });
        Display_Quota_Usage_Table();
    });
};

///

load_bw_hist = function () {

    CURRENT_WINDOW = WINDOW_BW_HIST;

    $('#Content').html(bw_history_html);
//    $('#Content').load('bw_history.html', function () {

    initialize_bwh_window();
//    });
};

/////////////////////////////////

load_profiles = function () {

    CURRENT_WINDOW = WINDOW_PROFILE;

//    $('#Content').html(profiles_html);
    $('#Content').load('profiles.html', function () {

        profile_table = $('#Profile_Table').DataTable({
            select: true,
            columnDefs: [
                {targets: 0, visible: false},
                {targets: 1, width: '20%'},
                {targets: 2, width: '20%'},
                {targets: 3, width: '15%'},
                {targets: 4, width: '15%'},
                {targets: 5, width: '15%', data: null,
                    render: function (data, type, row) {
                        if (data[1] === 'User') {
                            return "<button class='pq_session_wbtn'><span>View IP</span></button>";
                        } else
                            return '-';
                    }
                },
                {targets: 6, visible: false},
                {targets: 7, width: '15%'},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            scrollY: ($('#Profile_Holder').height() - 210),
            scrollCollapse: true,
            paging: false,
            searching: true,
            info: false,
            order: [[1, 'asc'], [2, 'asc']],
            createdRow: function (row, data, dataIndex) {
                if (data[6] === "1" || data[6] === "2") {
                    $('td:eq(5)', row).css('background-color', '#d6ffb2');
                } else if (data[6] === "0") {
                    $('td:eq(5)', row).css('background-color', '#ff9e9e');
                }
            }
        });

        $('#Profile_Table_filter').css('float', 'left');
        $('#Profile_Table_filter :input').css({'width': '150px', 'height': '20px', 'padding-left': '3px', 'font-size': '10px'});

//        set_primary_device(profile_table, true);

        $('#Profile_Table').on('click', 'tbody tr', function () {

            var delay = 1;
            setTimeout(function () {
                selectedProfileTableRowCount = profile_table.rows('.selected').count();

            }, delay);
        });

        $('#Profile_Table').on('click', 'tbody tr', function () {
            var data = profile_table.row('.selected').data();
            var delay = 1;
            setTimeout(function () {
                if (selectedProfileTableRowCount === 1 && data[1] === 'Super-Administrator') {
                    $('.reset').removeAttr('disabled');
                    $('.edit, .delete').attr('disabled', 'disabled');
                } else if (selectedProfileTableRowCount === 1 && data[1] !== 'Super-Administrator') {
                    $('.edit, .reset, .delete').removeAttr('disabled');
                } else if (selectedProfileTableRowCount === 0) {
                    $('.edit, .reset, .delete').attr('disabled', 'disabled');
                } else {
                    alert("Incorrect Input");
                }
            }, delay);
        });

        $('#Profile_Table tbody').on("click", '.pq_session_wbtn', function () {
            var data = profile_table.row($(this).parents('tr')).data();
            load_profile_ip(data[0]);
        });

        //Set IP when an 'Administrator' account is created    

        $('#profileCode').change(function () {
            if ($("#profileCode option:selected").val() === '14') {
                $("#profileBw").val('-').attr('disabled', true);
            } else {
                $("#profileBw").val('').attr('disabled', false);
            }
        });

        //Confirm passwords     

        $('#profile_password_confirm').on('keyup', function () {

            if ($('#profile_password_confirm').val() === '') {
                $('#password_confirm_msg').val('');
            } else {
                if ($('#profile_password').val() === $('#profile_password_confirm').val()) {
                    $('#password_confirm_msg').val('Passwords are Matching').css('color', 'green');
                } else
                    $('#password_confirm_msg').val('Passwords are not Matching').css('color', 'red');
            }
        });

        //Clear text on msg box while typing   

        $('#profileEmail').on('keyup', function () {
            $('#password_confirm_msg').val('');
        });

        // Confirm passwords match while resetting  

        $('#reset_password_confirm').on('keyup', function () {

            if ($('#reset_password_confirm').val() === '') {
                $('#reset_password_confirm_msg').val('');
            } else {
                if ($('#reset_password').val() === $('#reset_password_confirm').val()) {
                    $('#reset_password_confirm_msg').val('Passwords are Matching').css('color', 'green');
                } else
                    $('#reset_password_confirm_msg').val('Passwords are not Matching').css('color', 'red');
            }
        });

        $("#addProfileToSystem").click(function () {
            if (validateEmail($('#profileEmail').val())) {

                var user_bw = 0;
                if ($("#profileCode option:selected").val() === '23') {
                    user_bw = $("#profileBw").val();
                } else {
                    user_bw = 0;
                }
                if ($('#password_confirm_msg').val() === 'Passwords are Matching') {
                    add_nw_user_account(parseInt($("#profileCode option:selected").val()), $("#profileEmail").val(), user_bw, $("#profile_password").val());
                    $('#AddProfileModal').hide();
                } else {
                    $('#profile_password').val('');
                    $('#profile_password_confirm').val('');
                    $('#password_confirm_msg').val('Passwords are not Matching').css('color', 'red');
                }

            } else {
                $('#profileEmail').val('');
                $('#password_confirm_msg').val('Invalid email').css('color', 'red');
            }
        });

        $("#editProfileButton").click(function () {
            var edit_user_prof_elements = profile_table.row('.selected').data();

            if (validateEmail($('#profile_edit_email').val())) {

                var user_bw = 0;
                if ($("#ProfileEditCode option:selected").val() === '23') {
                    user_bw = $("#editProfileBw").val();
                } else {
                    user_bw = 0;
                }
                update_user_account(edit_user_prof_elements[0], $("#profile_edit_email").val(), user_bw);
                $('#EditProfileModal').hide();
            } else {
                $('#profile_edit_email').val('');
                $('#user_prof_edit_confirm_msg').val('Invalid email').css('color', 'red');
            }
            Clear();
        });

        $("#resetProfilePwdButton").click(function () {

            var reset_pwd_elements = profile_table.row('.selected').data();

            if ($('#reset_password_confirm_msg').val() === 'Passwords are Matching') {

                if (reset_pwd_elements[2] === user_email_address) {
                    renew_nw_user_pwd(reset_pwd_elements[0], $("#reset_password").val(), $("#profile_edit_password").val());
                } else {
                    renew_nw_user_pwd(reset_pwd_elements[0], $("#reset_password").val(), '');
                }
                document.getElementById('ResetPwdModal').style.display = "none";
            } else {
                $('#reset_password').val('');
                $('#reset_password_confirm').val('');
                $('#reset_password_confirm_msg').val('Passwords are not Matching').css('color', 'red');
            }

            Clear();
        });

        $("#Profile_Table").on("change", "select", function () {
            var edit_user_prof_elements = profile_table.row($(this).parents('tr')).data();
            enable_disable_nw_user_account(edit_user_prof_elements[0], edit_user_prof_elements[2], $("#profileStatus_" + edit_user_prof_elements[0]).val());
            Clear();
        });

        Display_Prof_Table();
    });
};

load_profile_ip = function (user_id) {

    CURRENT_WINDOW = WINDOW_PROFILE_IP;

//    $('#Content').html(profile_ips_html);
    $('#Content').load('profile_ips.html', function () {

        profile_ip_table = $('#ProfileIP_Table').DataTable({
            select: true,
            columnDefs: [
                {targets: 0, visible: false},
                {targets: 1, visible: false},
                {targets: 2, width: '100%'},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            scrollY: ($('#ProfileIP_Holder').height() - 150),
            scrollCollapse: true,
            paging: false,
            searching: true,
            info: false,
            order: false
        });

        $('#ProfileIP_Table_filter').css('float', 'left');
        $('#ProfileIP_Table_filter :input').css({'width': '150px', 'height': '20px', 'padding-left': '3px', 'font-size': '10px'});

        $('#ProfileIP_Table').on('click', 'tbody tr', function () {
            selectedTableRowCount = 0;
            var delay = 1;
            setTimeout(function () {
                selectedTableRowCount = profile_ip_table.rows('.selected').count();
            }, delay);
        });

        enable_table_controls('ProfileIP_Table')

        $("#addProfileIPToSystem").click(function () {

            var ip = decode_ip_subnet_mask($('#profileIP').val());

            if (validateIP(ip[0]) || validateIPv6(ip[0])) {
                add_profile_ip(user_id, decode_ip_version(ip[0]), send_ip_encode(decode_ip_version(ip[0]), ip[0], 1), ip[1]);
                $('#AddProfileIPModal').hide();
            } else {
                show_acjs_status_modal(12);
            }
        });

        $("#editProfileIPButton").click(function () {

            var ip = decode_ip_subnet_mask($('#profile_edit_IP').val());

            if (validateIP(ip[0]) || validateIPv6(ip[0])) {
                update_profile_ip(user_id, profile_ip_table.row('.selected').data()[1], decode_ip_version(ip[0]), send_ip_encode(decode_ip_version(ip[0]), ip[0], 1), ip[1]);
                $('#EditProfileIPModal').hide();
            } else {
                show_acjs_status_modal(12);
            }
        });

        $("#ProfileIP_label").text('IP List of ' + user_profile_lookup_list[user_id]);

        Update_Profile_IP_Data(user_id);
    });
};

load_billing = function () {

    CURRENT_WINDOW = WINDOW_BILLING;

//    $('#Content').html(billing_html);
    $('#Content').load('billing.html', function () {

        billing_table = $('#Billing_Table').DataTable({
            select: false,
            columnDefs: [
                {targets: 0, width: '35%'},
                {targets: 1, width: '10%'},
                {targets: 2, width: '20%'},
                {targets: 3, width: '35%'},
                {orderable: false, targets: '_all'},
                {className: 'dt-center', targets: '_all'}
            ],
            dom: 'Bfrtip',
            buttons: [
                {text: 'JSON',
                    className: 'jsonButton',
                    action: function (e, dt, button, config) {
                        data_billing_table = dt.buttons.exportData();
                    }
                }
            ],
            scrollY: ($('#Billing_Holder').height() - 285),
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            order: false
        });
        
        $('a.dt-button').css("display", "none");

        $('#billing_month_select').datetimepicker({
            format: 'MMM',
            sideBySide: true,
            viewMode: "months",
//        minDate: device_set_time,
            maxDate: Date.now(),
            showClear: true,
            showClose: true
        });

//        $('#Billing_Table_filter').css('float', 'left');
//        $('#Billing_Table_filter :input').css({'width': '150px', 'height': '20px', 'padding-left': '3px', 'font-size': '10px'});

//        $('#Billing_Table').on('click', 'tbody tr', function () {
//            selectedTableRowCount = 0;
//            var delay = 1;
//            setTimeout(function () {
//                selectedTableRowCount = profile_ip_table.rows('.selected').count();
//            }, delay);
//        });

//        enable_table_controls('ProfileIP_Table')

//        $("#addProfileIPToSystem").click(function () {
//
//            var ip = decode_ip_subnet_mask($('#profileIP').val());
//
//            if (validateIP(ip[0]) || validateIPv6(ip[0])) {
//                add_profile_ip(user_id, decode_ip_version(ip[0]), send_ip_encode(decode_ip_version(ip[0]), ip[0], 1), ip[1]);
//                $('#AddProfileIPModal').hide();
//            } else {
//                show_acjs_status_modal(12);
//            }
//        });
//
//        $("#editProfileIPButton").click(function () {
//
//            var ip = decode_ip_subnet_mask($('#profile_edit_IP').val());
//
//            if (validateIP(ip[0]) || validateIPv6(ip[0])) {
//                update_profile_ip(user_id, profile_ip_table.row('.selected').data()[1], decode_ip_version(ip[0]), send_ip_encode(decode_ip_version(ip[0]), ip[0], 1), ip[1]);
//                $('#EditProfileIPModal').hide();
//            } else {
//                show_acjs_status_modal(12);
//            }
//        });

        Update_Billing_Data();
    });
};

load_management = function () {

    CURRENT_WINDOW = WINDOW_MANAGEMENT;

    $('#Content').html(management_html);
//    $('#Content').load('management.html', function () {

    init_mgmt_ifc_configuration_window();
    display_mgmt_table();
//    });
};

load_high_availability = function () {

    CURRENT_WINDOW = WINDOW_HIGH_AVAILABILITY;

    $('#Content').html(high_availability_html);
//    $('#Content').load('high_availability.html', function () {

    ha_device_table = $('#HA_Device_Table').DataTable({
        select: true,
        columnDefs: [
            {targets: 0, visible: false},
            {targets: 1, width: '25%'},
            {targets: 2, width: '25%'},
            {targets: 3, width: '25%'},
            {targets: 3, width: '25%'},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: ($('#HA_Device_Holder').height() - 150),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    //edit ldap server
    $('#HA_Device_Table').on('click', 'tbody tr', function () {

        var delay = 1;
        setTimeout(function () {
            selectedTableRowCount = ha_device_table.rows('.selected').count();
        }, delay);
    });

    enable_table_controls('HA_Device_Table');

    $('#server2ADList').click(function () {
        load_obj_addr_ad();
    });

    //create ldap server        
    $('#addHaDeviceToSystem').click(function () {

        if (validateIP($("#add_ha_device_ip").val())) {
            add_nw_ha_device(parseInt(dot2numR($("#add_ha_device_ip").val())));
            $('#CreateHaDeviceModal').hide();
        } else {
            alert('Invalid IP');
        }
    });

    $('#editHaDeviceIDToSystem').click(function () {
        set_ha_device_id(parseInt($("#edit_ha_device_id").val()));
        $('#ChangeHaDeviceIDModal').hide();
    });

    $('#editHaDeviceVIPToSystem').click(function () {

        var ip_addr = 0;
        var mask = 32;

        var elmt = ($('#edit_ha_device_vip').val()).split("/");
        if (elmt.length > 1) {
            ip_addr = elmt[0];
            mask = +elmt[1];
        } else {
            ip_addr = $("#edit_ha_device_vip").val();
        }

        if (validateIP(ip_addr)) {
            set_ha_device_vip(parseInt(dot2numR(ip_addr)), mask);
            $('#ChangeHaDeviceVIPModal').hide();
        } else {
            alert('Invalid IP');
        }
    });

    Update_Ha_Device_Data();
//    });
};

load_maintenance = function () {

    CURRENT_WINDOW = WINDOW_MAINTENANCE;

//    $('#Content').html(maintenance_html);
    $('#Content').load('maintenance.html', function () {
        if (get_fallback_status()) {
            $('#ele_pdev_fallback').attr('disabled', true);
        } else
            $('#ele_pdev_fallback').attr('disabled', false);
    });

};

load_system_info = function () {

    CURRENT_WINDOW = WINDOW_SYSTEM_UPDATES;

//    $('#Content').html(system_update_html);
    $('#Content').load('system_update.html', function () {

        init_update_window();
        get_fallback_status();
        get_system_update_info();
        request_sw_info();
    });
};

datatable_bar_length_validation = function (length, val, total) {
    if (val > total) {
        return length;
    } else
        return length * val / total;
};

//----------------Create Inbound Traffic Flow for Selected Source-----------------------------//

function dashPie_bw_plot_init(className) {
    var type = dashPieCat;
    switch (type) {
        case 1:
            var sip = send_ip_encode(decode_ip_version(className), className, 1);
            var lssd_req = {
                type: GRAPH_UPDATE,
                id: LSRC_UPDATE,
                uid: global_rule_user,
                gid: ssd_live_graph_id,
                sip_t: decode_ip_version(className),
                dip_t: decode_ip_version(className),
                sip1: sip[0],
                sip2: sip[1],
                sip3: sip[2],
                sip4: sip[3],
                dip1: decode_subnet_mask(className),
                dip2: 0,
                dip3: 0,
                dip4: 0,
                sport: 0,
                dport: 0,
                vid: 0,
                prot: 0,
                app: 0
            };
            lcjs_make_request(live_fl_id, LSRC_UPDATE, lssd_req);
            break;
        case 2:
            var sip = send_ip_encode(decode_ip_version(className), className, 1);
            var lssd_req = {
                type: GRAPH_UPDATE,
                id: LDES_UPDATE,
                uid: global_rule_user,
                gid: ssd_live_graph_id,
                sip_t: decode_ip_version(className),
                dip_t: decode_ip_version(className),
                sip1: sip[0],
                sip2: sip[1],
                sip3: sip[2],
                sip4: sip[3],
                dip1: decode_subnet_mask(className),
                dip2: 0,
                dip3: 0,
                dip4: 0,
                sport: 0,
                dport: 0,
                vid: 0,
                prot: 0,
                app: 0
            };
            lcjs_make_request(live_fl_id, LDES_UPDATE, lssd_req);
            break;
        case 3:
            var lssd_req = {
                type: GRAPH_UPDATE,
                id: LAPP_UPDATE,
                uid: global_rule_user,
                gid: ssd_live_graph_id,
                sip_t: 4,
                dip_t: 4,
                sip1: application_list.indexOf(className),
                sip2: 0,
                sip3: 0,
                sip4: 0,
                dip1: 0,
                dip2: 0,
                dip3: 0,
                dip4: 0,
                sport: 0,
                dport: 0,
                vid: 0,
                prot: 0,
                app: 0
            };
            lcjs_make_request(live_fl_id, LAPP_UPDATE, lssd_req);
            break;
        case 4:
            var lssd_req = {
                type: GRAPH_UPDATE,
                id: LSVS_UPDATE,
                uid: global_rule_user,
                gid: ssd_live_graph_id,
                sip_t: 4,
                dip_t: 4,
                sip1: pq_services_list.indexOf(className),
                sip2: 0,
                sip3: 0,
                sip4: 0,
                dip1: 0,
                dip2: 0,
                dip3: 0,
                dip4: 0,
                sport: 0,
                dport: 0,
                vid: 0,
                prot: 0,
                app: 0
            };
            lcjs_make_request(live_fl_id, LSVS_UPDATE, lssd_req);
            break;
    }
}

//==== Live Session Watch graphs ================

pq_session_refresh_clicked = function () {
    pq_restore_flow_bar('#pq_ses_win_filter', sb_id);
    show_update_indicator('#pq_session_ud_indicator');
    session_table.clear().draw();
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_LIST_UPDATE,
        uid: global_rule_user,
        lid: SESSION_LIST_UPDATE,
        loc: 1,
        sipv: fdis.sip_v,
        dipv: fdis.dip_v,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_LIST_UPDATE, ses_req);
};

pq_session_apply_clicked = function () {
    var fdis = pq_get_flow_descriptor();
    show_update_indicator('#pq_session_ud_indicator');
    session_table.clear().draw();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_LIST_UPDATE,
        uid: global_rule_user,
        lid: SESSION_LIST_UPDATE,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_LIST_UPDATE, ses_req);
};

pq_session_get_filters = function () {
    var ssId = 1;
    var fdis = pq_get_flow_prev(ssId);
    show_update_indicator('#pq_session_ud_indicator');
    session_table.clear().draw();

    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_LIST_UPDATE,
        uid: global_rule_user,
        lid: SESSION_LIST_UPDATE,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_LIST_UPDATE, ses_req);
};

pq_go_back_all_session_clicked = function () {
    load_window(WINDOW_SES_SES);
};

pq_table_sort_ses_data = function () {
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_LIST_UPDATE,
        uid: global_rule_user,
        lid: 2,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    show_update_indicator('#pq_session_ud_indicator');
    session_table.clear().draw();
    cjs_make_request(SESSION_LIST_UPDATE, ses_req);
};

//==== Live Session-Source Watch graphs ================

pq_source_refresh_clicked = function () {
    source_table.clear().draw();
    show_update_indicator('#pq_source_ud_indicator');
    pq_restore_flow_bar('#pq_src_win_filter', srcb_id);
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};

pq_source_apply_clicked = function () {
    source_table.clear().draw();
    show_update_indicator('#pq_source_ud_indicator');
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        uid: global_rule_user,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};

pq_source_apply_get = function () {
    source_table.clear().draw();
    var ssId = 2;
    var fdis = pq_get_flow_prev(ssId);
    show_update_indicator('#pq_source_ud_indicator');
    //var fdis = pq_get_flow_discripter();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        uid: global_rule_user,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};

//==== Live Session-Destination Watch graphs ================

pq_dest_refresh_clicked = function () {
    destination_table.clear().draw();
    pq_restore_flow_bar('#pq_dest_win_filter', destb_id);
    show_update_indicator('#pq_destination_ud_indicator');
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_DEST_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_DEST_UPDATE, ses_req);
};

pq_dest_apply_clicked = function () {
    destination_table.clear().draw();
    var fdis = pq_get_flow_descriptor();
    show_update_indicator('#pq_destination_ud_indicator');
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_DEST_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_DEST_UPDATE, ses_req);
};

pq_dest_apply_get = function () {
    destination_table.clear().draw();
    var ssId = 3;
    var fdis = pq_get_flow_prev(ssId);
    show_update_indicator('#pq_destination_ud_indicator');
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_DEST_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_DEST_UPDATE, ses_req);
};

//==== Live Session-Application Watch graphs ================

pq_appt_refresh_clicked = function () {
    app_table.clear().draw();
    pq_restore_flow_bar('#pq_app_win_filter', apptb_id);
    show_update_indicator('#pq_application_ud_indicator');
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_APP_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_APP_UPDATE, ses_req);
};

pq_appt_apply_clicked = function () {
    app_table.clear().draw();
    var fdis = pq_get_flow_descriptor();
    show_update_indicator('#pq_application_ud_indicator');
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_APP_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_APP_UPDATE, ses_req);
};

pq_appt_apply_get = function () {
    app_table.clear().draw();
    var ssId = 4;
    var fdis = pq_get_flow_prev(ssId);
    // var fdis = pq_get_flow_discripter();
    show_update_indicator('#pq_application_ud_indicator');
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_APP_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_APP_UPDATE, ses_req);
};

//==== Live Session-Service Watch graphs ================

pq_service_refresh_clicked = function () {
    ses_service_table.clear().draw();
    pq_restore_flow_bar('#pq_service_win_filter', svstb_id);
    show_update_indicator('#pq_service_ud_indicator');
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SVS_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_SVS_UPDATE, ses_req);
};

pq_service_apply_clicked = function () {
    ses_service_table.clear().draw();
    var fdis = pq_get_flow_descriptor();
    show_update_indicator('#pq_service_ud_indicator');
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SVS_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_SVS_UPDATE, ses_req);
};

pq_svst_apply_get = function () {
    ses_service_table.clear().draw();
    var ssId = 5;
    var fdis = pq_get_flow_prev(ssId);
    show_update_indicator('#pq_service_ud_indicator');
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SVS_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(SESSION_SVS_UPDATE, ses_req);
};

//Sesssions Table Sorting

pq_table_sort_ses = function (idx) {
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        uid: global_rule_user,
        lid: 1,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };

    if (idx === 0) { //sources
        show_update_indicator('#pq_source_ud_indicator');
        source_table.clear().draw();
        cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
    } else if (idx === 1) { //destination
        show_update_indicator('#pq_destination_ud_indicator');
        destination_table.clear().draw();
        ses_req.id = SESSION_DEST_UPDATE;
        cjs_make_request(SESSION_DEST_UPDATE, ses_req);
    } else if (idx === 2) { //application
        show_update_indicator('#pq_application_ud_indicator');
        app_table.clear().draw();
        ses_req.id = SESSION_APP_UPDATE;
        cjs_make_request(SESSION_APP_UPDATE, ses_req);
    } else if (idx === 3) { //services
        show_update_indicator('#pq_service_ud_indicator');
        ses_service_table.clear().draw();
        ses_req.id = SESSION_SVS_UPDATE;
        cjs_make_request(SESSION_SVS_UPDATE, ses_req);
    }
};

pq_table_sort_data = function (idx) {
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        uid: global_rule_user,
        lid: 2,
        loc: 1,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    if (idx === 0) { //sources
        show_update_indicator('#pq_source_ud_indicator');
        source_table.clear().draw();
        cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
    } else if (idx === 1) { //destination
        show_update_indicator('#pq_destination_ud_indicator');
        destination_table.clear().draw();
        ses_req.id = SESSION_DEST_UPDATE;
        cjs_make_request(SESSION_DEST_UPDATE, ses_req);
    } else if (idx === 2) { //application
        show_update_indicator('#pq_application_ud_indicator');
        app_table.clear().draw();
        ses_req.id = SESSION_APP_UPDATE;
        cjs_make_request(SESSION_APP_UPDATE, ses_req);
    } else if (idx === 3) { //services
        show_update_indicator('#pq_service_ud_indicator');
        ses_service_table.clear().draw();
        ses_req.id = SESSION_SVS_UPDATE;
        cjs_make_request(SESSION_SVS_UPDATE, ses_req);
    }
};

// ==== Live Session - Go back buttons ================

pq_go_back_sources = function () {
    if (live_watch_mode === 0) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            load_window(WINDOW_SES_SOURCE);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            load_window(WINDOW_SES_DEST);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            load_window(WINDOW_SES_SERV);
        } else {
            load_window(WINDOW_SES_APP);
        }
    } else if (live_watch_mode === 1) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            load_window(WINDOW_DASH_SOURCE);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            load_window(WINDOW_DASH_DEST);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            load_window(WINDOW_DASH_SERV);
        } else {
            load_window(WINDOW_DASH_APP);
        }
    } else {
        load_window(WINDOW_SES_SES);
    }
};

//=========================================

var create_live_session_watch_graph = function () {
    return  lssd_graph_init(LSES_UPDATE, "plot_live_session_uplink",
            "plot_live_session_downlink",
            '#008000',
            '#008080',
            "#pq_ls_uplink_usage",
            "#pq_ls_downlink_usage",
            "#pq_ls_uplink_pkt",
            "#pq_ls_downlink_pkt",
            "#pq_lses_stat_bar", 0);
};

var create_live_pie_dlink_source_watch_graph = function () {

    return  lssd_graph_init(LSRC_UPDATE, "plot_dashPie_srcdesapp_updown",
            "",
            '#a8334d',
            '#008000',
            "#pq_dashPie_srcdesapp_ulink_usage",
            "#pq_dashPie_srcdesapp_dlink_usage",
            "#pq_dashPie_srcdesapp_ulink_pkts",
            "#pq_dashPie_srcdesapp_dlink_pkts",
            "", 4);
};

change_session_watch_head = function (s_ip, s_port, d_ip, d_port, app, rtt) {
    $('#pq_ls_sip_text').text('Client IP: ' + s_ip);
    $('#pq_ls_sport_text').text('Source Port : ' + s_port);
    $('#pq_ls_dip_text').text('Server IP: ' + d_ip);
    $('#pq_ls_dport_text').text('Destination Port : ' + d_port);
    $('#pq_ls_app_text').text('Application : ' + app);
//    $('#pq_ls_rtt_text').text('Round-Trip Time : ' + rtt + "ms");
};

function init_dashPie_elements() {

    init_dashPie_piecharts();

    dashPie_dlink_table = $('#dashPie_pie_dlink_table').DataTable({
        columnDefs: [
            {targets: 0, width: '15%', data: null,
                render: function (data, type, row, meta) {
                    return "<button class='pq_session_wbtn' disabled style='width:30px; height:7px; margin:7px 1px 7px 1px ; background-color: " + pieColorScheme[meta.row] + "'></button>";
                }
            },
            {title: "Class", width: '35%', targets: 1},
            {title: "Usage", width: '20%', targets: 2},
            {title: "%", width: '30%', targets: 3},
            {className: 'dt-center', targets
                        : '_all'}
        ],
        paging: false,
        scrollY: ($('#dashPie_pie_dlink_table_holder').height() - 40),
        ordering: false,
        searching: false,
        info: false
    });

    dashPie_ulink_table = $('#dashPie_pie_ulink_table').DataTable({
        columnDefs: [
            {targets: 0, width: '15%',
                render: function (data, type, row, meta) {
                    return "<button class='pq_session_wbtn' disabled style='width:30px; height:7px; margin:7px 1px 7px 1px ; background-color: " + pieColorScheme[meta.row] + "'></button>";
                }
            },
            {title: "Class", width: '35%', targets: 1},
            {title: "Usage", width: '20%', targets: 2},
            {title: "%", width: '30%', targets: 3},
            {className: 'dt-center', targets: '_all'}
        ],
        paging: false,
        scrollY: ($('#dashPie_pie_ulink_table_holder').height() - 40),
        ordering: false,
        searching: false,
        info: false
    });

    ssd_live_graph_id = create_live_pie_dlink_source_watch_graph();

    setTimeout(function () {
        dashPie_bw_plot_init(init_max_srcDestAppServ_dlink);
        $('#dashPie_bw_plot').text('Bandwidth Usage (10s Average) - ' + init_max_srcDestAppServ_dlink);
    }, 2000);

//    start_dashPie_update();
}

//==============================================

add_update_indicator = function (div, id, indication) {
    var item = "<div class='pq_updater_zee' id ='" + id + "' style='position: absolute; width: 100%; height: calc(100% - 105px);background-color: #f4f5f5;'>" +
            "<img src='image/gif/update_bl_beu.gif' style='float: left' class='pq_hvcenter'>" +
            "<a style='float: left; margin-left: 30px;font-size: 16px; color: #1a7cea' class='pq_hvcenter'>" + indication + "</a>" +
            "</div>";
    $(div).append(item);
    $("#" + id).hide();
};

show_update_indicator = function (id) {
    $(id).show();
};

hide_update_indicator = function (id) {
    $(id).hide();
};

update_terminator = function (id) {
    switch (id) {
        case WINDOW_LINK_SUMMARY:
            end_mw_cts_info_update();
            end_summary_top_update();
            break;
        case WINDOW_DASH_SOURCE:
            end_dashPie_update();
            break;
        case WINDOW_DASH_DEST:
            end_dashPie_update();
            break;
        case WINDOW_DASH_APP:
            end_dashPie_update();
            break;
        case WINDOW_LIVE_SERVER_WATCH:
            end_live_scd_updates();
            break;
        case WINDOW_APP_LINK_UTIL:
//            lapp_dlink_buffer = [];
//            checked_app_list_dlink = [];
            link_util_flag = true;
            is_app_grap_init = false;
//            primary_user_ip = 0;
//            is_app_grap_init = false;
            break;

//        case 5: end_mw_cts_info_update();
//                break;
        default:
            return 0;


    }
};

var load_window_buff = [];

change_window = function (id) {

    if (CURRENT_WINDOW === id) {
        //dispance load window buffer
        load_window_buff.shift();
        if (load_window_buff.length > 0) {
            change_window(load_window_buff[0]);
        }
        return;
    }
    setTimeout(function () {
        update_terminator(CURRENT_WINDOW);
        if (id === WINDOW_LINK_SUMMARY) {
            load_home_window();
        } else if (id === WINDOW_USER_SUMMARY) {
            load_user_sum_window();
        } else if (id === WINDOW_DASH_SOURCE) {
            load_dash_source_window();
        } else if (id === WINDOW_DASH_DEST) {
            load_dash_dest_window();
        } else if (id === WINDOW_DASH_APP) {
            load_dash_app_window();
        } else if (id === WINDOW_APP_LINK_UTIL) {
            load_app_link_util_window();
        } else if (id === WINDOW_SES_SES) {
            load_ses_ses_window();
        } else if (id === WINDOW_SES_SOURCE) {
            load_ses_source_window();
        } else if (id === WINDOW_SES_DEST) {
            load_ses_dest_window();
        } else if (id === WINDOW_SES_APP) {
            load_ses_app_window();
        } else if (id === WINDOW_SES_SERV) {
            load_ses_serv_window();
        } else if (id === WINDOW_TRAFFIC) {
            load_traffic_diag_window();
        } else if (id === WINDOW_RULE_DESTINATIONS) {
            load_dest_rules();
        } else if (id === WINDOW_RULE_URL) {
            load_url_rules();
        } else if (id === WINDOW_RULE_APPLICATIONS) {
            load_app_rules();
        } else if (id === WINDOW_RULE_SERVICE) {
            load_service_rules();
        } else if (id === WINDOW_OBJ_SCHEDULE) {
            load_obj_schedule();
        } else if (id === WINDOW_OBJ_ADMIN_PIPES) {
            load_obj_admin_pipe();
        } else if (id === WINDOW_OBJ_USER_PIPES) {
            load_obj_user_pipe();
        } else if (id === WINDOW_QUOTA_PROFILES) {
            load_quota_profile_window();
        } else if (id === WINDOW_DEFAULT_PIPE) {
            load_obj_default_pipe();
        } else if (id === WINDOW_QUOTA_USAGE) {
            load_quota_usage_window();
        } else if (id === WINDOW_BW_HIST) {
            load_bw_hist();
        } else if (id === WINDOW_PROFILE) {
            load_profiles();
        } else if (id === WINDOW_BILLING) {
            load_billing();
        } else if (id === WINDOW_MANAGEMENT) {
            load_management();
        } else if (id === WINDOW_HIGH_AVAILABILITY) {
            load_high_availability();
        } else if (id === WINDOW_MAINTENANCE) {
            load_maintenance();
        } else if (id === WINDOW_SYSTEM_UPDATES) {
            load_system_info();
        } else {
            console.log("Invalid window change");
        }

        //dispance load window buffer
        load_window_buff.shift();
        if (load_window_buff.length > 0) {
            change_window(load_window_buff[0]);
        }
    }, 200);
};

load_window = function (id) {
    load_window_buff.push(id);
    if (load_window_buff.length === 1) {
        change_window(load_window_buff[0]);
    }
};

function reload() {
    sessionStorage.removeItem("Filter");//clear filters
    pq_set_default_filter_value();//set default value for filters when it loading
}

window.onbeforeunload = reload();
