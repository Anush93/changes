var ip_rep_st;
var ip_rep_et;

function init_detailed_ip_reporting_table(ip) {

    det_ip_usage_id = pq_create_det_usage_bar('#pq_det_ip_usage_filter', 'pq_det_ip_usage_apply_clicked', 'pq_det_ip_usage_clear_clicked');

    $('#detailedIPHeader').append(document.createTextNode(ip));
    
    $('#pq_ip_det_usage_total').append(document.createTextNode('0 MB'));
    $('#pq_ip_det_usage_dlink').append(document.createTextNode('0 MB'));
    $('#pq_ip_det_usage_ulink').append(document.createTextNode('0 MB'));

//    init_ip_usage_pie_plots();
    init_summary_dbd_plots();
//ip_det_usage_table
    source_table = $('#Det_IP_Usage_Table').DataTable({
        select: true,
        columnDefs: [
            {width: '14%', targets: 0},
            {width: '15%', targets: 1},
            {width: '25%', targets: 2},
            {width: '7%', targets: 3},
            {width: '7%', targets: 4},
            {width: '5%', targets: 5, data: null,
                render: function (data, type, row) {
                    return "<a style='width: 100px;float:left; text-decoration: none;' >" + pq_get_usage(data[2]);
                }
            },
            {width: '5%', targets: 6, data: null,
                render: function (data, type, row) {
                    return "<a style='width: 100px;float:left; text-decoration: none;' >" + pq_get_usage(data[3]);
                }
            },
            {width: '22%', targets: 7, data: null,
                render: function (data, type, row) {
                    var bar_length = ((75 * (data[4])) / data[5]);
                    if (bar_length > 75) {
                        bar_length = 75;
                    }
                    var send_length = (bar_length * data[2] / (data[4]));
                    return "<a style='width: 75px;float:left; text-decoration: none;' >" + pq_get_usage(data[4]) + "" + "</a><div id='myProgress' style='float: left; margin: 2px;width:" + bar_length + "px;'><div id='myBar' style='width:" + send_length + "px'></div></div>";
                }
            },
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: ($('#Usage_IP_Holder').height() * 0.6 - 150),
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    add_update_indicator('#det_usage_ip_table_holder', 'pq_det_ip_usage_ud_indicator', 'Updating ..');

    $('#Det_IP_Usage_Table_wrapper').children('.ui-toolbar').css('padding', '0px');
    source_table.draw(false);
//    pq_restore_det_usage_bar('#pq_det_ip_usage_filter', det_ip_usage_id);

//    var sum_req = {
//        type: SESSION_UPDATE,
//        id: SUMRY_SDC_UPDATE,
//        lid: SESSION_APP_UPDATE,
//        loc: 1
//    };
//    cjs_make_request(SUMRY_SDC_UPDATE, sum_req);

    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
}

function get_ip_usage_table() {

//    ip_rep_st
//    ip_rep_et

    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
}

pq_ip_usage_clear_clicked = function () {
//    ip_usage_table
    source_table.clear().draw();
    show_update_indicator('#pq_ip_usage_ud_indicator');
    $('#ipUsageIPFilter').val('');

    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};

pq_ip_usage_apply_clicked = function (ip) {
    source_table.clear().draw();
    show_update_indicator('#pq_source_ud_indicator');
    var fdis = pq_get_flow_descriptor();
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1,
        sip: fdis.sip,
        sipr: fdis.sipr,
        dip: fdis.dip,
        dipr: fdis.dipr,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};


pq_det_ip_usage_clear_clicked = function () {
//    det_ip_usage_id
    pq_restore_det_usage_bar('#pq_det_ip_usage_filter', det_ip_usage_id);
    show_update_indicator('#pq_det_ip_usage_ud_indicator');
    source_table.clear().draw();
    
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};

pq_det_ip_usage_apply_clicked = function () {
    show_update_indicator('#pq_det_ip_usage_ud_indicator');
    source_table.clear().draw();    
    var fdis = pq_get_det_usage_descriptor();   
    
    var ses_req = {
        type: SESSION_UPDATE,
        id: SESSION_SOURCE_UPDATE,
        lid: SESSION_SOURCE_UPDATE,
        loc: 1,
        sip: fdis.sip,
        sipr: fdis.sipr,
        dip: fdis.dip,
        dipr: fdis.dipr,
        dport: fdis.dport,
        app: fdis.app
    };
    cjs_make_request(SESSION_SOURCE_UPDATE, ses_req);
};


var data_pq_ip_dests = [{label: "1", value: 0}];
var pie_pq_ip_dests;
var pie_pq_ip_dests_wrap;

var data_pq_ip_apps = [{label: "1", value: 0}];
var pie_pq_ip_apps;
var pie_pq_ip_apps_wrap;

var data_pq_ip_servs = [{label: "1", value: 0}];
var pie_pq_ip_servs;
var pie_pq_ip_servs_wrap;

init_ip_usage_pie_plots = function () {
    pie_pq_ip_dests = new d3pie("pq_ip_dest_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_ip_dests
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
                "enabled": true,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                $("#pq_sum_src_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_src_legend .pqpie_lble_nme").text(a.data.label);
                $("#pq_sum_src_legend .pqpie_lble_val").text(pq_get_usage(a.data.value));
            }
        }
    });
    pie_pq_ip_dests_wrap = new pq_mod_pie(pie_pq_ip_dests, "#pq_ip_dest_hldr", data_pq_ip_dests, '#pq_ip_dest_legend', 0);
    pqpie_resize_loading("#pq_ip_dest_hldr", pie_pq_ip_dests);

    pie_pq_ip_apps = new d3pie("pq_ip_app_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_ip_apps
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
                "enabled": true,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                $("#pq_sum_dest_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_dest_legend .pqpie_lble_nme").text(a.data.label);
                $("#pq_sum_dest_legend .pqpie_lble_val").text(pq_get_usage(a.data.value));
            }
        }
    });
    pie_pq_ip_apps_wrap = new pq_mod_pie(pie_pq_ip_apps, "#pq_ip_app_hldr", data_pq_ip_apps, '#pq_ip_app_legend', 1);
    pqpie_resize_loading("#pq_ip_app_hldr", pie_pq_ip_apps);

    pie_pq_ip_servs = new d3pie("pq_ip_serv_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_ip_servs
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
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                if (a.data.label.length > 15) {
                    $("#pq_sum_app_legend .pqpie_lble_nme").css({"height": "40px", "top": "calc(20%)"});
                } else
                    $("#pq_sum_app_legend .pqpie_lble_nme").css({"height": "20px", "top": "calc(25%)"});

                $("#pq_sum_app_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_app_legend .pqpie_lble_nme").text(a.data.label);
                $("#pq_sum_app_legend .pqpie_lble_val").text(pq_get_usage(a.data.value));
            }
        }
    });
    pie_pq_ip_servs_wrap = new pq_mod_pie(pie_pq_ip_servs, "#pq_ip_serv_hldr", data_pq_ip_servs, '#pq_ip_serv_legend', 2);
    pqpie_resize_loading("#pq_sum_app_hldr", pie_pq_ip_servs);
};




// Detailed IP Usage Filter

var pq_det_usage_filter = [{valid: false, value: ''}, //S_IP
    {valid: false, value: ''}, //D_IP
    {valid: false, value: ''}, //D_PORT
    {valid: false, value: ''}];//App

var pq_det_usage_filter_clone = [];
pq_det_usage_filter_clone = pq_det_usage_filter.slice(0);
var original_pq_det_usage_dropdown;// = $("#pq_flow_dropdown").clone();
var original_pq_det_usage_bar = [];// = $(".pq_flow_filter_bar").clone();

var det_usage_dd_list = [{id: 0, dd_title: 'Source IP', disp_name: 'Src_IP', max_len: 31},
    {id: 1, dd_title: 'Destination IP', disp_name: 'Des_IP', max_len: 31},
    {id: 2, dd_title: 'Destination Port', disp_name: 'Des_Port', max_len: 5},
    {id: 3, dd_title: 'Applications', disp_name: 'Applications', max_len: 32}
];

var pq_create_det_usage_bar = function (div, apply_btn, clear_button) {
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dropwb'>" +
            "<button class='pq_flow_fadd pq_flow_vcenter' style='font-size:12px' onclick='pq_det_usage_add_btn_click()'>Add Filter</button><br><br>" +
            "<div class='pq_flow_drop_down'>" +
            "<a onclick='pq_det_usage_menu_click(" + div_s + ",0, this)' class='pq_flow_drop_down_text' style='text-decoration:none'>Source IP</a>" +
            "<a onclick='pq_det_usage_menu_click(" + div_s + ",1, this)' class='pq_flow_drop_down_text' style='text-decoration:none'>Destination IP</a>" +
            "<a onclick='pq_det_usage_menu_click(" + div_s + ",2, this)' class='pq_flow_drop_down_text' style='text-decoration:none'>Destination Port</a>" +
            "<a onclick='pq_det_usage_menu_click(" + div_s + ",3, this)' class='pq_flow_drop_down_text' style='text-decoration:none'>Application</a>" +
            "</div>" +
            "</div>" +
            "<div class='pq_flow_apply' onclick='" + apply_btn + "()'></div>" +            
            "<div class='pq_flow_remove' onclick='" + clear_button + "()'></div>";
    $(div).append(item);

    original_pq_det_usage_dropdown = $(".pq_flow_drop_down").clone();
    original_pq_det_usage_bar.push($(div).clone());
    return (original_pq_det_usage_bar.length - 1);
};

var is_pq_det_usage_input_item_visible = false;
var id_pq_det_usage_input_item_visible = -1;

pq_show_det_usage_input_item = function (div, id) {
    var item;
    if (id === 3) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + det_usage_dd_list[id].dd_title + ": </a>" +
                "<select id='detAppList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 125px; text-decoration: none;' maxlength='" + det_usage_dd_list[id].max_len + "'></select>" +
                "</div>";
    } else {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + det_usage_dd_list[id].dd_title + ": </a>" +
                "<input class='pq_flow_input_field pq_flow_vcenter' type='text' maxlength='" + det_usage_dd_list[id].max_len + "'>" +
                "</div>";
    }
    is_pq_det_usage_input_item_visible = true;
    id_pq_det_usage_input_item_visible = id;
    $(div).append(item);

    if (id === 3) {
        $.each(application_list, function (key, app) {
            $('#detAppList')
                    .append($('<option>', {value: app})
                            .text(app));
        });
        $.each(pq_services_list, function (key, app) {
            if (app !== 'Other') {
                $('#detAppList')
                        .append($('<option>', {value: app})
                                .text(app));
            }
        });

        var my_options = $("#detAppList option");
        my_options.sort(function (a, b) {
            if (a.text.toLowerCase() > b.text.toLowerCase())
                return 1;
            if (a.text.toLowerCase() < b.text.toLowerCase())
                return -1;
            return 0;
        });
        $("#detAppList").empty().append(my_options);
    }

    $('.pq_flow_input_field').focus();

    $('.pq_flow_input_field').focusout(function () {
        pq_hide_det_usage_input_item(div, id_pq_det_usage_input_item_visible);
    });

    $(".pq_flow_input_field").keydown(function (event) {
        if (event.which === 13) {
            pq_hide_det_usage_input_item(div, id_pq_det_usage_input_item_visible);
        }
    });
};

pq_hide_det_usage_input_item = function (div, id) {
    var value = $('.pq_flow_input_field').val();
    $('.pq_flow_input_element').remove();
    pq_add_det_usage_item(div, id, value);
};

pq_add_det_usage_item = function (div, id, value) {
//    console.log(value)
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dis_element pq_flow_vcenter'>" +
            "<div class='pq_flow_dis_element_image pq_flow_vcenter'  onclick='pq_remove_det_usage_item(" + div_s + ",this, " + id + ")'></div>" +
            "<a class='pq_flow_dis_element_title pq_flow_vcenter'>" + det_usage_dd_list[id].disp_name + " :</a>" +
            "<a class='pq_flow_dis_element_value pq_flow_vcenter'> " + value + "</a>";
    "</div>";
    $(div).append(item);
    pq_det_usage_filter[id].valid = true;
    pq_det_usage_filter[id].value = value;
};

pq_remove_det_usage_item = function (div, item, id) {
    item.parentElement.remove();
    pq_add_det_usage_dd_item(div, id);
    pq_det_usage_filter[id].valid = false;
    pq_det_usage_filter[id].value = '';
};

pq_add_det_usage_dd_item = function (div, id) {
    var div_s = "\"" + div + "\"";
    var item = "<a onclick='pq_det_usage_menu_click(" + div_s + "," + id + ", this)' class='pq_flow_drop_down_text' style='text-decoration:none'>" + det_usage_dd_list[id].dd_title + "</a>";
    $('.pq_flow_drop_down').append(item);
};

window.onclick = function (event) {
    if (!event.target.matches('.pq_flow_fadd')) {
        if ($(".pq_flow_drop_down").is(':visible')) {
            $(".pq_flow_drop_down").toggle();
        }
    }
};

pq_det_usage_add_btn_click = function () {
    $(".pq_flow_drop_down").toggle();
};

pq_det_usage_menu_click = function (div, id, element) {
    element.remove();
    pq_show_det_usage_input_item(div, id);
};

pq_restore_det_usage_bar = function (div, it_id) {
    $(div).replaceWith(original_pq_det_usage_bar[it_id]);
    original_pq_det_usage_bar[it_id] = $(div).clone();
    for (var i = 0; i < 4; i++) {
        if (pq_det_usage_filter[i].value !== '') {
            pq_det_usage_filter[i].value = '';
        }
    }
};

var pq_get_det_usage_descriptor = function () {

    var sip;
    var sipr;
    var dip;
    var dipr;
    var _sip_r = pq_det_usage_filter[0].value.split('-');
    var _dip_r = pq_det_usage_filter[1].value.split('-');
    var dport = var2num(pq_det_usage_filter[3].value);
    var app_name = pq_det_usage_filter[5].value;
    var app_id = application_list.indexOf(app_name);

    if (_sip_r.length === 2) {
        sip = dot2num(_sip_r[0]);
        if (isNaN(sip)) {
            sip = 0;
        }
        sipr = dot2num(_sip_r[1]);
        if (isNaN(sipr)) {
            sipr = 0;
        }
    } else {
        sip = dot2num(pq_det_usage_filter[0].value);
        if (isNaN(sip)) {
            sip = 0;
        }
        sipr = sip;
    }

    if (_dip_r.length === 2) {
        dip = dot2num(_dip_r[0]);
        if (isNaN(dip)) {
            dip = 0;
        }
        dipr = dot2num(_dip_r[1]);
        if (isNaN(dipr)) {
            dipr = 0;
        }
    } else {
        dip = dot2num(pq_det_usage_filter[1].value);
        if (isNaN(dip)) {
            dip = 0;
        }
        dipr = dip;
    }

    if (isNaN(dport)) {
        dport = 0;
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

    var desc = {
        sip: sip,
        sipr: sipr,
        dip: dip,
        dipr: dipr,
        dport: dport,
        app: app_id
    };
    return desc;
};


