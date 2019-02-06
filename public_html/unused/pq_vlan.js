var dash_vlan_type;
var dash_vlan_id;

var vlan_dash_dl;
var vlan_dash_ul;

var vlan_chkd_id = '1';

init_dash_vlan_window = function () {

//    var dash_vlan_type = VLAN_TEN_SEC;
//    var dash_vlan_id = get_vlan_id(vlan_list[0]);

    dash_vlan_type = VLAN_TEN_SEC;
    dash_vlan_id = get_vlan_id(vlan_list[0]);

    var vlan_bw_req;

    var vlan_dash_dl_one_sec = labwu_graph_init("vlan_dlink_one_sec_plot", '#007399', 6);
    var vlan_dash_ul_one_sec = labwu_graph_init("vlan_ulink_one_sec_plot", '#4c8c32', 7);
    var vlan_dash_dl_one_msec = lbwu_graph_init("vlan_dlink_one_msec_plot", '#007399', 8);
    var vlan_dash_ul_one_msec = lbwu_graph_init("vlan_ulink_one_msec_plot", '#4c8c32', 9);
//        var vlan_dash_dl_ten_sec = labwu_graph_init("vlan_dlink_ten_sec_plot", '#007399', 6);
//        var vlan_dash_ul_ten_sec = labwu_graph_init("vlan_ulink_ten_sec_plot", '#4c8c32', 7);      

//    var vlan_dash_dl = vlan_dash_dl_one_sec;
//    var vlan_dash_ul = vlan_dash_ul_one_sec;

    vlan_dash_dl = vlan_dash_dl_one_sec;
    vlan_dash_ul = vlan_dash_ul_one_sec

    vlan_bw_req = {
        type: GRAPH_UPDATE,
        id: LVABW_UPDATE,
        vtype: VLAN_TEN_SEC,
        vid: dash_vlan_id,
        gid: vlan_dash_dl,
        link: 0,
        chanel: 1
    };
    lcjs_make_request(live_bwd_id, LVABW_UPDATE, vlan_bw_req);

    vlan_bw_req = {
        type: GRAPH_UPDATE,
        id: LVABW_UPDATE,
        vtype: VLAN_TEN_SEC,
        vid: dash_vlan_id,
        gid: vlan_dash_ul,
        link: 0,
        chanel: 0
    };
    lcjs_make_request(live_bwu_id, LVABW_UPDATE, vlan_bw_req);

//    $('#radio_vlan_one_sec').prop({'checked': true});
    $('#vlanid_' + get_vlan_id(vlan_list[0])).css('margin-top', '10px').prop({'checked': true});

    if (get_vlan_id(vlan_list[0]) !== 4096) {
        $('#vlan_bw_dlink_label').text('Downlink Bandwidth - VLAN ' + get_vlan_id(vlan_list[0]));
        $('#vlan_bw_ulink_label').text('Uplink Bandwidth - VLAN ' + get_vlan_id(vlan_list[0]));
    } else {
        $('#vlan_bw_dlink_label').text('Downlink Bandwidth - Non VLAN');
        $('#vlan_bw_ulink_label').text('Uplink Bandwidth - Non VLAN');
    }

    

    $("input[name = dash_vlan_plot_type]").on('change', function (e) {
        if (vlan_chkd_id === $(this).val()) {
            return;
        } else {
            switch ($(this).val()) {
                case '0':
                    vlan_dash_dl = vlan_dash_dl_one_msec;
                    vlan_dash_ul = vlan_dash_ul_one_msec;
                    dash_vlan_type = VLAN_ONE_MSEC;
                    $("#vlan_dlink_one_msec_plot,#vlan_ulink_one_msec_plot").css("z-index", 100);
                    $("#vlan_dlink_one_sec_plot, #vlan_ulink_one_sec_plot").css("z-index", -10);
                    break;
                case '1':
                    vlan_dash_dl = vlan_dash_dl_one_sec;
                    vlan_dash_ul = vlan_dash_ul_one_sec;
                    dash_vlan_type = VLAN_TEN_SEC;
                    $("#vlan_dlink_one_sec_plot, #vlan_ulink_one_sec_plot").css("z-index", 100);
                    $("#vlan_dlink_one_msec_plot, #vlan_ulink_one_msec_plot").css("z-index", -10);
                    break;
            }
//            console.log('Here')
            vlan_chkd_id = $(this).val();
            send_vlan_request(dash_vlan_type, dash_vlan_id, vlan_dash_dl, vlan_dash_ul);
        }
    });

    $("input[name = vlan_ids]").on('change', function () {

        dash_vlan_id = get_vlan_id($(this).val());
        send_vlan_request(dash_vlan_type, dash_vlan_id, vlan_dash_dl, vlan_dash_ul);

        if (get_vlan_id(dash_vlan_id) !== 4096) {
            $('#vlan_bw_dlink_label').text('Downlink Bandwidth - VLAN ' + get_vlan_id(dash_vlan_id));
            $('#vlan_bw_ulink_label').text('Uplink Bandwidth - VLAN ' + get_vlan_id(dash_vlan_id));
        } else {
            $('#vlan_bw_dlink_label').text('Downlink Bandwidth - Non VLAN');
            $('#vlan_bw_ulink_label').text('Uplink Bandwidth - Non VLAN');
        }
    });
};

function send_vlan_request(dash_vlan_type, dash_vlan_id, vlan_dash_dl, vlan_dash_ul) {

//    console.log(dash_vlan_type + '_' + dash_vlan_id + '_' + vlan_dash_dl + '_' + vlan_dash_ul);

    var vlan_bw_req;

    vlan_bw_req = {
        type: GRAPH_UPDATE,
        id: LVABW_UPDATE,
        vtype: dash_vlan_type,
        vid: parseInt(dash_vlan_id),
        gid: vlan_dash_dl,
        link: 0,
        chanel: 1
    };
    lcjs_make_request(live_bwd_id, LVABW_UPDATE, vlan_bw_req);

    vlan_bw_req = {
        type: GRAPH_UPDATE,
        id: LVABW_UPDATE,
        vtype: dash_vlan_type,
        vid: parseInt(dash_vlan_id),
        gid: vlan_dash_ul,
        link: 0,
        chanel: 0
    };
    lcjs_make_request(live_bwu_id, LVABW_UPDATE, vlan_bw_req);
}

get_vlan_id = function (id) {
    if (id === 8191 || id > 4095) {
        return 4096;
    } else
        return id;
};

get_vlan_label_id = function (tstamp, gid) {

    if (gid === 4) {
        var index_d;
        for (var i = 0; i < lu_vlan_d_id.length; i++) {
            if (tstamp == lu_vlan_d_id[i][0]) {
                index_d = i;
                break;
            }
        }
//        console.log("Plot A " + index_d)
        if (lu_vlan_d_id[index_d][1] == 4095) {
            return 'Non-vlan';
        } else
            return lu_vlan_d_id[index_d][1];

    } else if (gid === 5) {
        var index_u;
        for (var i = 0; i < lu_vlan_u_id.length; i++) {
            if (tstamp == lu_vlan_u_id[i][0]) {
                index_u = i;
                break;
            }
        }
//        console.log("Plot B " + index_u)        
        if (lu_vlan_u_id[index_u][1] == 4095) {
            return 'Non-vlan';
        } else
            return lu_vlan_u_id[index_u][1];
    }
};
