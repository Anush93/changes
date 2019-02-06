var pq_flow_filter_clone = [];
var original_pq_flow_dropdown;// = $("#pq_flow_dropdown").clone();
var original_pq_flow_bar = [];// = $(".pq_flow_filter_bar").clone();

var pq_flow_filter = [{valid: false, value: ''},
    {valid: false, value: ''}, //S_IP
    {valid: false, value: ''}, //D_IP
    {valid: false, value: ''}, //S_PORT
    {valid: false, value: ''}, //D_PORT
    {valid: false, value: ''}, //PROT
    {valid: false, value: ''}];//App

pq_flow_filter_clone = pq_flow_filter.slice(0);

var pq_set_default_filter_value = function () {
    var FilterData = pq_flow_filter;
    sessionStorage.setItem("Filter", JSON.stringify(FilterData));
};

var flow_dd_list = [{id: 0, dd_title: 'IP Version', disp_name: 'IPv', max_len: 4},
    {id: 1, dd_title: 'Source IP', disp_name: 'Src_IP', max_len: 90},
    {id: 2, dd_title: 'Destination IP', disp_name: 'Des_IP', max_len: 90},
    {id: 3, dd_title: 'Source Port', disp_name: 'Src_Port', max_len: 5},
    {id: 4, dd_title: 'Destination Port', disp_name: 'Des_Port', max_len: 5},
    {id: 5, dd_title: 'Protocol', disp_name: 'Prot', max_len: 3},
    {id: 6, dd_title: 'Applications', disp_name: 'Applications', max_len: 32}
];

var pq_create_flow_bar = function (div, apply_btn, refresh_button) {
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dropwb'>" +
            "<button class='pq_flow_fadd pq_flow_vcenter' style='font-size:12px' onclick='pq_flow_add_btn_click()'>Add Filter</button><br><br>" +
            "<div class='pq_flow_drop_down'>" +
            "<button class='pq_url_wbtn' style='float:right; display:inline-block; width: 26px; height: 22px; font-size: 11px; background: #c7c5ba url(../image/clear_1.png) 5px no-repeat; text-indent: 20px;' onclick='pq_hide_flow_filter()'></button><br>" +
            "<a id='fd0' onclick='pq_fadd_menu_click(" + div_s + ",0, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>IP Version</a>" +
            "<a id='fd1' onclick='pq_fadd_menu_click(" + div_s + ",1, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>Source IP</a>" +
            "<a id='fd2' onclick='pq_fadd_menu_click(" + div_s + ",2, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>Destination IP</a>" +
            "<a id='fd3' onclick='pq_fadd_menu_click(" + div_s + ",3, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>Source Port</a>" +
            "<a id='fd4' onclick='pq_fadd_menu_click(" + div_s + ",4, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>Destination Port</a>" +
            "<a id='fd5' onclick='pq_fadd_menu_click(" + div_s + ",5, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>Protocol</a>" +
            "<a id='fd7' onclick='pq_fadd_menu_click(" + div_s + ",6, this); pq_hide_flow_filter();' class='pq_flow_drop_down_text'>Application</a>" +
            "</div>" +
            "</div>" +
            "<button class='pq_flow_apply' onclick='" + apply_btn + "()'>Apply Filter</button>" +
            "<button class='pq_flow_refresh' onclick='" + apply_btn + "()'>Refresh</button>" +
            "<button class='pq_flow_remove' onclick='" + refresh_button + "()'>Clear Filter</button>";
    $(div).append(item);

    original_pq_flow_dropdown = $(".pq_flow_drop_down").clone();
    original_pq_flow_bar.push($(div).clone());
    return (original_pq_flow_bar.length - 1);
};

var is_pq_input_item_visible = false;
var id_pq_input_item_visible = -1;

pq_show_input_item = function (div, id) {
    var item;
    if (id === 0) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<select id='protList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 100px' maxlength='" + flow_dd_list[id].max_len + "'>" +
                "<option value='IPv4'>IPv4</option>" +
                "<option value='IPv6'>IPv6</option>" +
                "</select>" +
                "</div>";
    } else if (id === 5) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<select id='protList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 100px' maxlength='" + flow_dd_list[id].max_len + "'>" +
                "<option value='TCP'>TCP</option>" +
                "<option value='UDP'>UDP</option>" +
                "</select>" +
                "</div>";
    } else if (id === 6) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<select id='appList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 125px' maxlength='" + flow_dd_list[id].max_len + "'></select>" +
                "</div>";
    } else {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<input class='pq_flow_input_field pq_flow_vcenter' type='text' maxlength='" + flow_dd_list[id].max_len + "'>" +
                "</div>";
    }
    is_pq_input_item_visible = true;
    id_pq_input_item_visible = id;
    $(div).append(item);

    if (id === 6) {
        $.each(application_list, function (key, app) {
            $('#appList')
                    .append($('<option>', {value: app})
                            .text(app));
        });
        $.each(pq_services_list, function (key, app) {
            if (app !== 'Other') {
                $('#appList')
                        .append($('<option>', {value: app})
                                .text(app));
            }
        });

        var my_options = $("#appList option");
        my_options.sort(function (a, b) {
            if (a.text.toLowerCase() > b.text.toLowerCase())
                return 1;
            if (a.text.toLowerCase() < b.text.toLowerCase())
                return -1;
            return 0;
        });
        $("#appList").empty().append(my_options);
    }

    $('.pq_flow_input_field').focus();

    $('.pq_flow_input_field').focusout(function () {
        pq_hide_input_item(div, id_pq_input_item_visible);
    });

    $(".pq_flow_input_field").keydown(function (event) {
        if (event.which === 13) {
            pq_hide_input_item(div, id_pq_input_item_visible);
        }
    });
};

pq_hide_input_item = function (div, id) {
    var value = $('.pq_flow_input_field').val();
    $('.pq_flow_input_element').remove();
    pq_add_fl_item(div, id, value);
};

pq_add_fl_item = function (div, id, value) {
//    console.log(value)
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dis_element pq_flow_vcenter'>" +
            "<div class='pq_flow_dis_element_image pq_flow_vcenter'  onclick='pq_remove_fl_item(" + div_s + ",this, " + id + ")'></div>" +
            "<a class='pq_flow_dis_element_title pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].disp_name + " :</a>" +
            "<a class='pq_flow_dis_element_value pq_flow_vcenter' style='text-decoration: none;'> " + value + "</a>";
    "</div>";
    $(div).append(item);
    pq_flow_filter[id].valid = true;
    pq_flow_filter[id].value = value;
};

pq_remove_fl_item = function (div, item, id) {
    item.parentElement.remove();
    pq_add_dd_item(div, id);
    pq_flow_filter[id].valid = false;
    pq_flow_filter[id].value = '';
};

pq_add_dd_item = function (div, id) {
    var div_s = "\"" + div + "\"";
    var item = "<a onclick='pq_fadd_menu_click(" + div_s + "," + id + ", this)' class='pq_flow_drop_down_text'>" + flow_dd_list[id].dd_title + "</a>";
    $('.pq_flow_drop_down').append(item);
};

window.onclick = function (event) {
    if (!event.target.matches('.pq_flow_fadd')) {
        if ($(".pq_flow_drop_down").is(':visible')) {
            pq_hide_flow_filter();
        }
    }
};

pq_flow_add_btn_click = function () {
    $(".pq_flow_drop_down").show();
};

pq_fadd_menu_click = function (div, id, element) {
    element.remove();
    pq_show_input_item(div, id);
};

pq_restore_flow_bar = function (div, it_id) {
    $(div).replaceWith(original_pq_flow_bar[it_id]);
    original_pq_flow_bar[it_id] = $(div).clone();
    for (var i = 0; i < 7; i++) {
        if (pq_flow_filter[i].value !== '') {
            pq_flow_filter[i].value = '';
        }
    }
};

pq_hide_flow_filter = function () {
    $('.pq_flow_drop_down').hide();
};

var pq_get_flow_descriptor = function () {
    
    sessionStorage.setItem("Filter", JSON.stringify(pq_flow_filter));

    var sip_v = 0;
    var dip_v = 0;

    var ip_v = pq_flow_filter[0].value;

    if (ip_v === 'IPv4') {
        sip_v = 4;
        dip_v = 4;
    } else if (ip_v === 'IPv6') {
        sip_v = 6;
        dip_v = 6;
    } else {
        sip_v = 0;
        dip_v = 0;
    }
    if (pq_flow_filter[1].valid) {
        sip_v = decode_ip_version(pq_flow_filter[1].value);
    }
    if (pq_flow_filter[2].valid) {
        dip_v = decode_ip_version(pq_flow_filter[2].value);
    }

    var _sip_r = pq_flow_filter[1].value.split('-');
    var sip;
    var sipr;

    var _sip_s = pq_flow_filter[1].value.split('/');

    if (_sip_s.length === 2) {

        var s_ip_s = [];
        if (sip_v === 4) {
            s_ip_s = getIpRangeFromAddressAndNetmask(_sip_s[0], _sip_s[1]);
        } else if (sip_v === 6) {
            s_ip_s = getIpv6RangeFromAddressAndNetmask(_sip_s[0], _sip_s[1]);
        }

        sip = send_ip_encode(sip_v, s_ip_s[0], 1);
        sipr = send_ip_encode(sip_v, s_ip_s[1], 1);

    } else if (_sip_r.length === 2) {
        sip = send_ip_encode(sip_v, _sip_r[0], 1);
        if (isNaN(sip[0])) {
            sip.fill(0);
        }
        sipr = send_ip_encode(sip_v, _sip_r[1], 1);
        if (isNaN(sipr[0])) {
            sipr.fill(0);
        }
    } else {
        sip = send_ip_encode(sip_v, pq_flow_filter[1].value, 1);
        if (isNaN(sip[0]) || sip[0] === 0) {
            sip.fill(0);
        }
        sipr = sip.slice(0);
    }

    var _dip_r = pq_flow_filter[2].value.split('-');
    var dip;
    var dipr;

    var _dip_s = pq_flow_filter[2].value.split('/');

    if (_dip_s.length === 2) {
        var d_ip_s = [];
        if (sip_v === 4) {
            d_ip_s = getIpRangeFromAddressAndNetmask(_dip_s[0], _dip_s[1]);
        } else if (sip_v === 6) {
            d_ip_s = getIpv6RangeFromAddressAndNetmask(_dip_s[0], _dip_s[1]);
        }
        dip = send_ip_encode(sip_v, d_ip_s[0], 1);
        dipr = send_ip_encode(sip_v, d_ip_s[1], 1);

    } else if (_dip_r.length === 2) {
        dip = send_ip_encode(dip_v, _dip_r[0], 1);
        if (isNaN(dip[0])) {
            dip.fill(0);
        }
        dipr = send_ip_encode(dip_v, _dip_r[1], 1);
        if (isNaN(dipr[0])) {
            dipr.fill(0);
        }
    } else {
        dip = send_ip_encode(dip_v, pq_flow_filter[2].value, 1);
        if (isNaN(dip[0]) || dip[0] === 0) {
            dip.fill(0);
        }
        dipr = dip.slice(0);
    }

    var sport = var2num(pq_flow_filter[3].value);
    if (isNaN(sport)) {
        sport = 0;
    }
    var dport = var2num(pq_flow_filter[4].value);
    if (isNaN(dport)) {
        dport = 0;
    }
    var prot = pq_flow_filter[5].value;
    if (prot === 'UDP') {
        prot = 17;
    } else if (prot === 'TCP') {
        prot = 6;
    } else {
        prot = 0;
    }

    var app_name = pq_flow_filter[6].value;
    var app_id = application_list.indexOf(app_name);

    if (app_name === 'Other') { //other catogory
        app_id = 65535;
    }

    if (app_id >= 0) {
        app_id = app_id;
    } else {
        var svs_id = pq_services_list.indexOf(app_name);
        if (svs_id > 0) {
            app_id = svs_id + application_list.length - 1;
        } else {
            app_id = 0;
        }
    }

    var disc = {
        sipv: sip_v,
        dipv: dip_v,
        sip0: sip[0],
        sip1: sip[1],
        sip2: sip[2],
        sip3: sip[3],
        dip0: dip[0],
        dip1: dip[1],
        dip2: dip[2],
        dip3: dip[3],
        sport: sport,
        dport: dport,
        vid: 0,
        prot: prot,
        app: app_id,
        sipr0: sipr[0],
        sipr1: sipr[1],
        sipr2: sipr[2],
        sipr3: sipr[3],
        dipr0: dipr[0],
        dipr1: dipr[1],
        dipr2: dipr[2],
        dipr3: dipr[3]
    };
    return disc;
};

var pq_get_flow_prev = function (ssId) {

    var pq_flow_filter_prev = JSON.parse(sessionStorage.getItem("Filter"));

    var sip_v = 0;
    var dip_v = 0;

    var ip_v = pq_flow_filter_prev[0].value;

    if (ip_v === 'IPv4') {
        sip_v = 4;
        dip_v = 4;
    } else if (ip_v === 'IPv6') {
        sip_v = 6;
        dip_v = 6;
    } else {
        sip_v = 0;
        dip_v = 0;
    }
    if (pq_flow_filter_prev[1].valid) {
        sip_v = decode_ip_version(pq_flow_filter_prev[1].value);
    }
    if (pq_flow_filter_prev[2].valid) {
        dip_v = decode_ip_version(pq_flow_filter_prev[2].value);
    }

    var _sip_r = pq_flow_filter_prev[1].value.split('-');
    var sip;
    var sipr;

    var _sip_s = pq_flow_filter_prev[1].value.split('/');

    if (_sip_s.length === 2) {

        var s_ip_s = [];
        if (sip_v === 4) {
            s_ip_s = getIpRangeFromAddressAndNetmask(_sip_s[0], _sip_s[1]);
        } else if (sip_v === 6) {
            s_ip_s = getIpv6RangeFromAddressAndNetmask(_sip_s[0], _sip_s[1]);
        }

        sip = send_ip_encode(sip_v, s_ip_s[0], 1);
        sipr = send_ip_encode(sip_v, s_ip_s[1], 1);

    } else if (_sip_r.length === 2) {
        sip = send_ip_encode(sip_v, _sip_r[0], 1);
        if (isNaN(sip[0])) {
            sip.fill(0);
        }
        sipr = send_ip_encode(sip_v, _sip_r[1], 1);
        if (isNaN(sipr[0])) {
            sipr.fill(0);
        }
    } else {
        sip = send_ip_encode(sip_v, pq_flow_filter_prev[1].value, 1);
        if (isNaN(sip[0]) || sip[0] === 0) {
            sip.fill(0);
        }
        sipr = sip.slice(0);
    }

    var _dip_r = pq_flow_filter_prev[2].value.split('-');
    var dip;
    var dipr;

    var _dip_s = pq_flow_filter_prev[2].value.split('/');

    if (_dip_s.length === 2) {
        var d_ip_s = [];
        if (sip_v === 4) {
            d_ip_s = getIpRangeFromAddressAndNetmask(_dip_s[0], _dip_s[1]);
        } else if (sip_v === 6) {
            d_ip_s = getIpv6RangeFromAddressAndNetmask(_dip_s[0], _dip_s[1]);
        }
        dip = send_ip_encode(sip_v, d_ip_s[0], 1);
        dipr = send_ip_encode(sip_v, d_ip_s[1], 1);

    } else if (_dip_r.length === 2) {
        dip = send_ip_encode(dip_v, _dip_r[0], 1);
        if (isNaN(dip[0])) {
            dip.fill(0);
        }
        dipr = send_ip_encode(dip_v, _dip_r[1], 1);
        if (isNaN(dipr[0])) {
            dipr.fill(0);
        }
    } else {
        dip = send_ip_encode(dip_v, pq_flow_filter_prev[2].value, 1);
        if (isNaN(dip[0]) || dip[0] === 0) {
            dip.fill(0);
        }
        dipr = dip.slice(0);
    }

    var sport = var2num(pq_flow_filter_prev[3].value);
    if (isNaN(sport)) {
        sport = 0;
    }
    var dport = var2num(pq_flow_filter_prev[4].value);
    if (isNaN(dport)) {
        dport = 0;
    }
    var prot = pq_flow_filter_prev[5].value;
    if (prot === 'UDP') {
        prot = 17;
    } else if (prot === 'TCP') {
        prot = 6;
    } else {
        prot = 0;
    }

    var app_name = pq_flow_filter_prev[6].value;
    var app_id = application_list.indexOf(app_name);

    if (app_name === 'Other') { //other catogory
        app_id = 65535;
    }

    if (app_id >= 0) {
        app_id = app_id;
    } else {
        var svs_id = pq_services_list.indexOf(app_name);
        if (svs_id > 0) {
            app_id = svs_id + application_list.length - 1;
        } else {
            app_id = 0;
        }
    }

    var disc = {
        sipv: sip_v,
        dipv: dip_v,
        sip0: sip[0],
        sip1: sip[1],
        sip2: sip[2],
        sip3: sip[3],
        dip0: dip[0],
        dip1: dip[1],
        dip2: dip[2],
        dip3: dip[3],
        sport: sport,
        dport: dport,
        vid: 0,
        prot: prot,
        app: app_id,
        sipr0: sipr[0],
        sipr1: sipr[1],
        sipr2: sipr[2],
        sipr3: sipr[3],
        dipr0: dipr[0],
        dipr1: dipr[1],
        dipr2: dipr[2],
        dipr3: dipr[3]
    };
    console.log(disc);
    get_selected_filters(ssId);
    pq_flow_filter = pq_flow_filter_prev.slice();
    return disc;
};

//when clik back to source
var get_selected_filters = function (lsId) {

    var pq_flow_filter_prev = JSON.parse(sessionStorage.getItem("Filter"));

    for (i = 0; i < 7; i++) {
        if (pq_flow_filter_prev[i].valid === true) {
            var d;
            if (lsId === 1) {
                d = "#pq_ses_win_filter";
            } else if (lsId === 2) {
                d = "#pq_src_win_filter";
            } else if (lsId === 3) {
                d = "#pq_dest_win_filter";
            } else if (lsId === 4) {
                d = "#pq_app_win_filter";
            } else if (lsId === 5) {
                d = "#pq_service_win_filter";
            } else if (lsId === 6) {
                d = ".pq_tc_diagram_filter_bar";
            }
            var val = pq_flow_filter_prev[i].value;
            pq_add_fl_item(d, i, val);
            var fdid = "#fd" + i;
            pq_remove_dd_item(fdid);
        }
    }
};

//remove previous filters from flow dd
pq_remove_dd_item = function (fdid) {
    $(fdid).remove();
};
