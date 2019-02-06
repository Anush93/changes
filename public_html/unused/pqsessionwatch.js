var create_live_session_watch_graph = function () {
    return  lssd_graph_init(LSES_UPDATE, "plot_live_session_ms_uplink",
            "plot_live_session_ms_downlink",
            'plot_live_session_av_uplink',
            'plot_live_session_av_downlink',
            '#008000',
            '#008080',
            "#pq_ls_uplink_usage",
            "#pq_ls_downlink_usage",
            "#pq_lses_stat_bar", 0);
};

//var create_live_session_watch_graph = function () {
//    return  lssd_graph_init(LSES_UPDATE, "plot_live_session_uplink",
//            "plot_live_session_downlink",
//            '#008000',
//            '#008080',
//            "#pq_ls_uplink_usage",
//            "#pq_ls_downlink_usage",
//            "#pq_lses_stat_bar");
//};

//var create_live_pie_dlink_session_watch_graph = function (plot, color) {
//
//    return  lssd_graph_init(LSRC_UPDATE, plot,
//            "",
//            color,
//            '#008000',
//            "#pq_lsd_uplink_usage",
//            "#pq_lsd_downlink_usage",
//            "#pq_lscw_stat_bar");
//};

var create_live_pie_dlink_app_watch_graph = function (plot) {
    return  lp_graph_init(LAPP_UPDATE, plot, '#961a1a');
};

var create_live_pie_dlink_source_watch_graph = function (plot) {
    return  lp_graph_init(LSRC_UPDATE, plot, '#961a1a');
};

var create_live_pie_dlink_dst_watch_graph = function (plot) {
    return  lp_graph_init(LDES_UPDATE, plot, '#961a1a');
};

//var create_live_pie_dlink_session_watch_graph = function (plot, color) {
//    return  lp_graph_init(LSES_UPDATE, plot, color);   
//};


change_session_watch_head = function (s_ip, s_port, d_ip, d_port, app, rtt) {
    $('#pq_ls_sip_text').text('Server IP: ' + s_ip);
    $('#pq_ls_sport_text').text('Source Port : ' + s_port);
    $('#pq_ls_dip_text').text('Client IP: ' + d_ip);
    $('#pq_ls_dport_text').text('Destination Port : ' + d_port);
    $('#pq_ls_app_text').text('Application : ' + app);
    $('#pq_ls_rtt_text').text('Round-Trip Time : ' + rtt + "ms");
};
