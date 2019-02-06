var pqwr_rtime;
var pqwr_timeout = false;
var pqwr_delta = 50;

$(window).resize(function () {
    pqwr_rtime = new Date();
    if (pqwr_timeout === false) {
        pqwr_timeout = true;
        setTimeout(resizeend, pqwr_delta);
    }
});

function resizeend() {
    if (new Date() - pqwr_rtime < pqwr_delta) {
        setTimeout(resizeend, pqwr_delta);
    } else {
        pqwr_timeout = false;

        if (CURRENT_WINDOW === WINDOW_LINK_SUMMARY) {
            pqpie_resize_loading("#pq_sum_src_hldr", pie_pq_sum_srcs);
            pqpie_resize_loading("#pq_sum_dest_hldr", pie_pq_sum_dests);
            pqpie_resize_loading("#pq_sum_app_hldr", pie_pq_sum_apps);
        } else if (CURRENT_WINDOW === WINDOW_SES_SES) {
            $('#Session_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Sessions_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_SOURCE) {
            $('#Source_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Sources_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_DEST) {
            $('#Destination_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Destination_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_APP) {
            $('#Application_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Applications_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_SERV) {
            $('#Ses_Service_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Services_Holder').height() - 125));
            
        } else if (CURRENT_WINDOW === WINDOW_DASH_SOURCE ||
                CURRENT_WINDOW === WINDOW_DASH_DEST ||
                CURRENT_WINDOW === WINDOW_DASH_APP ) {

            pqpie_resize_loading("#dashPie_src_dlink", pie_pq_dashPie_dlink);
            pqpie_resize_loading("#dashPie_src_ulink", pie_pq_dashPie_ulink);
            $('#dashPie_pie_dlink_table').closest('.dataTables_scrollBody').css('height', ($('#dashPie_pie_dlink_table_holder').height() - 15));
            $('#dashPie_pie_ulink_table').closest('.dataTables_scrollBody').css('height', ($('#dashPie_pie_ulink_table_holder').height() - 15));

        } else if (CURRENT_WINDOW === WINDOW_LIVE_SERVER_WATCH) {
            pqpie_resize_loading("#pq_live_usage_pie_hlder", pie_pq_live_usage);
        }
    }
}
