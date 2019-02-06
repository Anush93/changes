var bwh_ulg_id;
var bwh_dlg_id;
var last_bwh_req;
var hist_glob_stime;
var hist_glob_end_time;

update_his_search_time_range = function (st_time, end_time) {
    $('#date_input_bw_his_st').data("DateTimePicker").date(moment.utc(get_Ts_time(st_time)).format('MMM Do YYYY - hh:mm:ss A'));
    $('#date_input_bw_his_et').data("DateTimePicker").date(moment.utc(get_Ts_time(end_time)).format('MMM Do YYYY - hh:mm:ss A'));
    hist_glob_stime = st_time;
    hist_glob_end_time = end_time;
};

var hide_history_no_data = function () {
    $('#pq_bwh_ul_plot_no_data').hide();
    $('#pq_bwh_dl_plot_no_data').hide();
};

var hide_history_no_avil = function () {
    $('#pq_bwh_ul_plot_no_avil').hide();
    $('#pq_bwh_dl_plot_no_avil').hide();
};

var hide_history_loading = function () {
    $('#pq_bwh_ul_plot_loading').hide();
    $('#pq_bwh_dl_plot_loading').hide();
};

var show_history_loading = function () {
    $('#pq_bwh_ul_plot_loading').show();
    $('#pq_bwh_dl_plot_loading').show();
};

var validate_hist_data_availability = function (id, count) {
//    console.log(id, count)
    if (id === bwh_ulg_id) {
        $('#pq_bwh_ul_plot_loading').hide();
        if (count === 0) {
            $('#pq_bwh_ul_plot_no_avil').show();
            $('#bw_hist_prev_btn').attr('disabled', true);
            $('#bw_hist_next_btn').attr('disabled', true);
        }
    }
    if (id === bwh_dlg_id) {
        $('#pq_bwh_dl_plot_loading').hide();
        if (count === 0) {
            $('#pq_bwh_dl_plot_no_avil').show();
            $('#bw_hist_prev_btn').attr('disabled', true);
            $('#bw_hist_next_btn').attr('disabled', true);
        }
    }
};

var show_history_no_data = function () {
    $('#pq_bwh_ul_plot_no_data').show();
    $('#pq_bwh_dl_plot_no_data').show();
    $('#bw_hist_prev_btn').attr('disabled', true);
    $('#bw_hist_next_btn').attr('disabled', true);
};

var initialize_bwh_window = function () {

    bwh_ulg_id = bwh_graph_init("pq_bwh_ul_plot", '#32c182', 0);
    bwh_dlg_id = bwh_graph_init("pq_bwh_dl_plot", '#cd790f', 1);

    $('#date_input_bw_his_st').datetimepicker({
        format: "MMM Do YYYY - hh:mm:ss A",
        maxDate: Date.now()
    });
    $('#date_input_bw_his_et').datetimepicker({
        format: "MMM Do YYYY - hh:mm:ss A",
        maxDate: Date.now()
    });

    $("#date_input_bw_his_st,#date_input_bw_his_et").on("dp.change", function () {
        show_history_no_data();
    });

    $("#date_input_bw_his_st").on("dp.change", function (e) {
        if ($("#date_input_bw_his_st").val() !== '') {
            $('#date_input_bw_his_et').data("DateTimePicker").minDate(e.date);
        }
    });

    var startDateTime_temp = moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - hh:mm:ss A');
    var endDateTime_temp = moment().seconds(0).milliseconds(0).format('MMM Do YYYY - hh:mm:ss A');

    $('#date_input_bw_his_st').data('DateTimePicker').date(startDateTime_temp);
    $('#date_input_bw_his_et').data('DateTimePicker').date(endDateTime_temp);

// Trigger action when the contexmenu is about to be shown
    $('#pq_bwh_dl_plot,#pq_bwh_ul_plot').bind("contextmenu", function (event) {
        // Avoid the real one
        event.preventDefault();
        // Show contextmenu
        $(".custom-menu").toggle(10).
                // In the right position (the mouse)
                css({
                    top: (event.pageY - 5) + "px",
                    left: (event.pageX - 5) + "px"
                });
    });
    $('#pq_bwh_dl_plot,#pq_bwh_ul_plot').bind("mousedown", function () {
        $(".custom-menu").hide(100);
    });
    hide_history_no_avil();
    hide_history_no_data();
    show_history_loading();

    bwh_apply_btnclk();
};

bwh_apply_btnclk = function () {
    hide_history_no_avil();
    hide_history_no_data();

    $('#bw_hist_prev_btn').attr('disabled', false);
    $('#bw_hist_next_btn').attr('disabled', false);

    var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
    var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();

    hist_glob_stime = new Date(s_date);
    hist_glob_end_time = new Date(e_date);

    if (hist_glob_stime.getTime() === hist_glob_end_time.getTime()) {
        InvalidStatus("Start and End Time cannot be the same");
        show_history_no_data();
    } else {
//        var vlan_bw_id;
//        if (isNaN(parseInt($("#pq_bwh_vlan_selector option:selected").val())) || parseInt($("#pq_bwh_vlan_selector option:selected").val()) === 4095) {
//            vlan_bw_id = 4095;
            $('#bwhist_dlink_label').text('Network Downlink Bandwidth');
            $('#bwhist_ulink_label').text('Network Uplink Bandwidth');
//        } else if (parseInt($("#pq_bwh_vlan_selector option:selected").val()) === 4096) {
//            vlan_bw_id = parseInt($("#pq_bwh_vlan_selector option:selected").val());
//            $('#bwhist_dlink_label').text('Non-VLAN - Downlink Bandwidth');
//            $('#bwhist_ulink_label').text('Non-VLAN - Uplink Bandwidth');
//        } else {
//            vlan_bw_id = parseInt($("#pq_bwh_vlan_selector option:selected").val());
//            $('#bwhist_dlink_label').text('VLAN ' +vlan_bw_id+ ' - Downlink Bandwidth');
//            $('#bwhist_ulink_label').text('VLAN ' +vlan_bw_id+ ' - Uplink Bandwidth');
//        }

        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(bwh_link_id, 0),
            chanel: 0,
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: 0,
            vid: 4095
        };
        cjs_make_request(GRAPH_BH_UPDATE, req);
        last_bwh_req = req;
    }
};

bwh_refresh_btn_click = function () {
    hide_history_no_avil();
    show_history_no_data();
    update_his_search_time_range(new Date(), new Date());
};

var bwh_mine_click = function (e, p) {
    if (bwh_graph_type != 0) {
        var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
        var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();

        hide_history_no_avil();
        hide_history_no_data();
        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(0, bwh_graph_type),
            chanel: pq_2_16_32(0, HIST_TYPE_MINE),
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: bwh_point_buff[p.idx],
            vid: 4095
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};

bwh_previous_click = function () {
    if (bwh_point_buff.length > 0 && bwh_point_buff[0] > 0) {
        var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
        var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();
        hide_history_no_avil();
        hide_history_no_data();
        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(0, bwh_graph_type),
            chanel: pq_2_16_32(0, HIST_TYPE_PREV),
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: bwh_point_buff[0],
            vid: 4095
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};

bwh_next_click = function () {
    if (bwh_point_buff.length > 0) {
        var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
        var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();
        hide_history_no_avil();
        hide_history_no_data();
        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(0, bwh_graph_type),
            chanel: pq_2_16_32(0, HIST_TYPE_NEXT),
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: bwh_point_buff[bwh_point_buff.length - 1],
            vid: 4095
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};