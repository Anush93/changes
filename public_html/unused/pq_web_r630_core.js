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


var pq_pie_update_que = [];
var pqpie_resize = function (div, pie) {
    var width = $(div).width();
    var height = $(div).height();
    var act_size = width * 0.9;
    if (width > height) {
        act_size = height * 0.9;
    }
    pie.options.size.canvasHeight = act_size;
    pie.options.size.canvasWidth = act_size;
    pie.redraw();
    $(div + " svg").css("margin-top", (height - act_size) / 2);
};

var pqpie_update_nresize = function (div, pie) {
    var width = $(div).width();
    var height = $(div).height();
    var act_size = width * 0.9;
    if (width > height) {
        act_size = height * 0.9;
    }
    $(div + " svg").css("margin-top", (height - act_size) / 2);
};

var pqpie_exec_resize_seq = function () {
    setTimeout(function () {
        var ele = pq_pie_update_que.shift();
        pqpie_resize(ele.div, ele.pie);
        if (pq_pie_update_que.length > 0) {
            pqpie_exec_resize_seq();
        }
    }, 10);
};

var pqpie_resize_loading = function (div, pie) {
    pq_pie_update_que.push({"div": div, "pie": pie});
    if (pq_pie_update_que.length === 1) {
        pqpie_exec_resize_seq();
    }
};


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
                CURRENT_WINDOW === WINDOW_DASH_APP ||
                CURRENT_WINDOW === WINDOW_DASH_SERV) {

            pqpie_resize_loading("#dashPie_src_dlink", pie_pq_dashPie_dlink);
            pqpie_resize_loading("#dashPie_src_ulink", pie_pq_dashPie_ulink);
            $('#dashPie_pie_dlink_table').closest('.dataTables_scrollBody').css('height', ($('#dashPie_pie_dlink_table_holder').height() - 15));
            $('#dashPie_pie_ulink_table').closest('.dataTables_scrollBody').css('height', ($('#dashPie_pie_ulink_table_holder').height() - 15));

        } else if (CURRENT_WINDOW === WINDOW_LIVE_SERVER_WATCH) {
            pqpie_resize_loading("#pq_live_usage_pie_hlder", pie_pq_live_usage);
        } else if (CURRENT_WINDOW === WINDOW_REPORT) {
            pqpie_resize_loading("#summaryPlotContainer_pie", pie_pq_users_report);
        }
    }
}
var feature_array = [];
var sys_update_status = "System was updated to the latest version";
var connection_error_status = "Connection to the Server disrupted. Please check your connection and retry";
var update_info;
var is_online_update_on = false;
var offline_file_size;

get_system_update_info = function () {

    var cmd_buffer = update_acjs_elements(WO_GET_VERSION_INFO, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        update_info = data;
        display_system_update_info();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

display_system_update_info = function () {
    var element = update_info.split("&");
    var email = element[1];
    var sw_version = pq_32_2_8_1_16(element[2]);
//        var hw_version = pq_32_1_16_2_8(element[3]);
//        var sig_version = pq_32_1_16_2_8(element[4]);

    var last_upd_check = new Date(+element[5] * 1000);
    var last_updated = new Date(+element[6] * 1000);
    var sched_update = new Date(+element[7] * 1000);

    $("#sw_version").text("Version " + sw_version.one + "." + sw_version.two + "." + sw_version.three);
    $("#last_upd_chk_time").text(last_upd_check);
    $("#last_upd_time").text(last_updated);
    $("#app_signature_info").text(element[9]);

    if (email !== '-') {
        $("#add_sys_admin_email").hide();
        $("#sys_admin_cont_email_group").show();
        $("#sys_admin_cont_email").text(email);
    }
    if (element[5] !== '0') {
        $("#last_upd_chk_time").text(last_upd_check);
    } else
        $("#last_upd_chk_time").text('None');
    if (element[6] !== '0') {
        $("#last_upd_time").text(last_updated);
    } else
        $("#last_upd_time").text('None');
    if (element[7] !== '0') {
        $("#sched_upd_time").text(sched_update);
    } else
        $("#sched_upd_time").text('None');

    is_online_update_on = element[8];

    if (!parseInt(is_online_update_on)) {
        $("#sched_upd_time").text('This feature is unavailable in offline mode');
        $("#last_upd_chk_time").text('This feature is unavailable in offline mode');
    }
    pq_online_update_state_changed(0, parseInt(element[8]));
};

get_new_update = function (flag) {

    feature_array = [];
    var cmd_buffer = update_acjs_elements(PDEV_CHECK_UPDATE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data);
        if (data === 'u') {
            SuccessStatus("System is up to date");
        } else if (data === 'l') {
            AbortStatus("Unable to connect to server. Please check your network connection.");
            $('#abortStatusModalProceed').click(function () {
                $('#StatusModal').hide();
                get_new_update();
            });
        } else if (data === 'f') {
            InvalidStatus("Operation Failed. Please check your settings");
        } else if (data === 'c') {
            LoadingStatus("Checking for updates ...");
            setTimeout(function () {
                $('#StatusModal').hide();
                if (mbx_loading_cancel_status != 1) {
                    get_new_update();
                }
            }, 10000);
        } else if (data === 'r') {
            AbortStatus("Update file corrupted! Retry to update again.");
            $('#abortStatusModalProceed').click(function () {

                var cmd_buffer = update_acjs_elements(PDEV_UPDATE_RETRY, '', 0, 0, 0, 0, 0, 0);
                var cookie = $.cookie('pqsf');

                $.ajax({
                    data: cmd_buffer,
                    processData: false,
                    headers: {"PARAQUMTEC": cookie},
                    timeout: 10000,
                    type: 'POST',
                    url: '/'
                }).done(function (data, textStatus, jqXHR) {

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error('Problems when posting...');
                });

                $('#StatusModal').hide();
                get_new_update();
            });
        } else {
            $('#New_Update_Window').show();
            var update = data.split("#");
            $("#set_new_update_version").text("Version " + update[0]);
            var features = update[1].split("&");
            for (var i = 0; i < features.length; i++) {
                feature_array[i] = features[i];
            }
            new_update_popup();
            $('#New_Update_Window').show();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

new_update_popup = function () {

    $('#Update_Details').css({height: feature_array.length * 25 + 'px'});
    $('#New_Update_Window_Modal').css({height: 185 + $('#Update_Details').height() + 'px'});
    $('#Update_Details').children().detach();
    $('#Update_Details').append("<ul id='up_table'>");

    for (i = 0; i < feature_array.length; i++) {
        $('#up_table').append("<li>" + feature_array[i] + "</li>");
    }

    $('#up_table').append("</ul>");

    $("#update_set_time").click(function () {
        $('#update_now').hide();
        $('#update_later').hide();
        $('#update_set_time').hide();
        $('#set_update_sched').show();
        $('#set_time_ok').show();
        $('#set_time_Cancel').show();
    });
    $("#set_time_Cancel").click(function () {
        $('#update_now').show();
        $('#update_later').show();
        $('#update_set_time').show();
        $('#set_update_sched').hide();
        $('#set_time_ok').hide();
        $('#set_time_Cancel').hide();
    });

    $("#set_time_ok").click(function () {
        schedule_update(parseInt($("#set_update_sched option:selected").val()));
        $('#New_Update_Window').hide();
    });

};

update_system_now = function () {
    schedule_update(0);
    $('#New_Update_Window').hide();
};

init_update_window = function () {
    $("#add_sys_admin_email").click(function () {
        $('#AddSystemAdminEmail').show();
        $("#sys_admin_email_title").text('Add Email');
        $("#addSysAdminEmailToSystem").text('Add to System');
        closeModalInit(1);
    });
    $("#update_sys_admin_email").click(function () {
        $('#AddSystemAdminEmail').show();
        $("#sys_admin_email_title").text('Update Email');
        $("#addSysAdminEmailToSystem").text('Update');
        closeModalInit(1);
    });

    $("#addSysAdminEmailToSystem").click(function () {
        update_sys_admin_email($("#addSysAdminEmail").val());
        $('#AddSystemAdminEmail').hide();
    });

    $('#offline_file_select').on('change', function () {
        var file = this.files[0];
        offline_file_size = file.size;
        if (file.size > 2 * 1024 * 1024 * 1024) {
        }
        display_file_name(this.value, 'upload_file_name');
        $('#offline_file_upload').attr('disabled', false);
    });

    $('#offline_file_upload').on('click', function () {
        $.ajax({
            url: 'pqsysupdate',
            type: 'POST',
            data: new FormData($('#offline_update_form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    $('#offline_upload_progress').show();

                    myXhr.upload.addEventListener('progress', function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            $('#offline_upload_progress').attr({
                                value: evt.loaded,
                                max: evt.total
                            });
                            $('#offline_upload_progress').html(percentComplete * 100 + ' %');
                        }
                    }, false);

                    myXhr.upload.addEventListener('loadend', function (evt) {
                        $('#Offline_Update_Window').hide();
                        $('#Offline_Update_Install_Window').show();
                        closeModalInit(2);
                    });
                }
                return myXhr;
            }
        });
    });

    $('#app_signaure_file_select').on('change', function () {
        var file = this.files[0];
        offline_file_size = file.size;
        if (file.size > 2 * 1024 * 1024 * 1024) {
//            alert('max upload size is 1k');
        }
        display_file_name(this.value, 'upload_app_sig_file_name');
        $('#app_signaure_file_upload').attr('disabled', false);
    });

    $('#app_signaure_file_upload').on('click', function () {
        $.ajax({
            url: 'pqlicinfo',
            type: 'POST',
//            data: new FormData($('form')[2]),
            data: new FormData($('#app_signature_update_form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('loadend', function (evt) {
                        $('#Signature_Update_Window').hide();
//                        $('#License_Update_Install_Window').show();
                        closeModalInit(2);
                    });
                }
                return myXhr;
            }
        });
    });
    
    $('#license_file_select').on('change', function () {
        var file = this.files[0];
        offline_file_size = file.size;
        if (file.size > 2 * 1024 * 1024 * 1024) {
//            alert('max upload size is 1k');
        }
        display_file_name(this.value, 'upload_license_name');
        $('#license_file_upload').attr('disabled', false);
    });

    $('#license_file_upload').on('click', function () {
        $.ajax({
            url: 'pqlicinfo',
            type: 'POST',
//            data: new FormData($('form')[2]),
            data: new FormData($('#license_update_form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('loadend', function (evt) {
                        $('#License_Update_Window').hide();
                        $('#License_Update_Install_Window').show();
                        closeModalInit(2);
                    });
                }
                return myXhr;
            }
        });
    });
};

pq_online_update_state_changed = function (cb, flag) {
    if (cb.checked || flag) {
        is_online_update_on = true;
        $('#online_updt_switch').prop('checked', true);
        $("#online_update_btn").show();
        $("#scheduled_update_header").css({'background': '#035252'});
        $("#last_update_check_header").css({'background': '#035252'});
        if (typeof (flag) === 'undefined') {
            switch_online_update(1);
        }
    } else {
        is_online_update_on = false;
        $("#scheduled_update_header").css({'background': '#ccc'});
        $("#last_update_check_header").css({'background': '#ccc'});
        $("#online_update_btn").hide();
        if (typeof (flag) === 'undefined') {
            switch_online_update(0);
        }
    }
};

update_offline = function () {
    $('#Offline_Update_Window').show();
    closeModalInit(1);
};

update_license = function () {
    $('#License_Update_Window').show();
    closeModalInit(1);
};

update_app_signature = function () {
    $('#Signature_Update_Window').show();
    closeModalInit(1);
};

function display_file_name(filepath, div) {
    var filename = filepath.split("\\");
    $('#' + div).val(filename[filename.length - 1] + ' (' + pq_get_file_size(offline_file_size) + ')');
}
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
var det_rep_stime;
var det_rep_etime;

var det_rep_sum_source_table;
var det_rep_sum_dest_table;
var det_rep_sum_app_table;
var det_rep_sum_port_table;

var det_rep_source_table;
var det_rep_dest_table;
var det_rep_app_table;
var det_rep_port_table;
var det_rep_deep_source_table;
var det_rep_deep_dest_table;
var det_rep_deep_app_table;
var det_rep_deep_port_table;
var det_rep_bw_plot_init = true;

var active_menu = 'source';
//checked
var stored_filter_param;

var data_det_rep_deep_source_table;
var data_det_rep_deep_des_table;
var data_det_rep_deep_app_table;
var data_det_rep_deep_port_table;

var deep_det_query;

var data_det_rep_source_table;
var data_det_rep_des_table;
var data_det_rep_app_table;
var data_det_rep_port_table;

var act_s_time;
var act_e_time;

var data_pdf_one = [];
var ticks_pdf_one = [];
var data_pdf_two = [];
var ticks_pdf_two = [];

init_det_rep_window = function () {

    $("#det_rep_filter_add").click(function () {
        $("#det_rep_filter_add").hide();
        $("#det_rep_filter_hide").show();
        $("#Report_Source_Holder, #Report_Dest_Holder, #Report_App_Holder, #Report_Port_Holder").css('height', 'calc(100% - 180px)');
        $('#Report_Source_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_Source_Holder').height() - 110));
        $('#Report_Dest_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_Dest_Holder').height() - 110));
        $('#Report_App_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_App_Holder').height() - 110));
        $('#Report_Port_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_Port_Holder').height() - 110));
        $('.det_rep_filter_cl ').animate({
            height: 'toggle'
        }, 500, function () {
        });
    });

    $("#det_rep_filter_hide").click(function () {
        $("#det_rep_filter_hide").hide();
        $("#det_rep_filter_add").show();
        $("#Report_Source_Holder, #Report_Dest_Holder, #Report_App_Holder, #Report_Port_Holder").css('height', 'calc(100% - 110px)');

        $('.det_rep_filter_cl ').animate({
            height: 'toggle'
        }, 500, function () {
        });
        $('#Report_Source_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_Source_Holder').height() - 110));
        $('#Report_Dest_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_Dest_Holder').height() - 110));
        $('#Report_App_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_App_Holder').height() - 110));
        $('#Report_Port_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Report_Port_Holder').height() - 110));
    });

    init_det_rep_filter();

    $('#det_rep_custom_StartDateTime').datetimepicker({
        format: 'MMM Do YYYY - hh:mm a',
        sideBySide: true,
        viewMode: "days",
//        minDate: device_set_time,
        maxDate: Date.now(),
        showClear: true,
        showClose: true
    });

    $('#det_rep_custom_EndDateTime').datetimepicker({
        format: 'MMM Do YYYY - hh:mm a',
        sideBySide: true,
        viewMode: "days",
//        minDate: device_set_time,
        maxDate: Date.now(),
        showClear: true,
        showClose: true
    });

    $("#det_rep_custom_StartDateTime").on("dp.change", function (e) {
        if ($("#det_rep_custom_StartDateTime").val() !== '') {
            $('#det_rep_custom_EndDateTime').data('DateTimePicker').maxDate('now');
            $('#det_rep_custom_EndDateTime').data("DateTimePicker").minDate(e.date);
        }
    });

    $("input[name=det_report_mode]").on('change', function () {
        switch ($(this).val()) {
            case '1':
                $("#det_rep_customReportBar").hide();
                $("#det_rep_customReportBar_btn").hide();
                $("#det_rep_quickReportBar").css('display', 'inline-block');
                $('#det_rep_q_hour').prop('checked', true);
                det_rep_stime = moment().minutes(0).seconds(0).milliseconds(0).subtract(1, 'hours');
                det_rep_etime = moment().minutes(0).seconds(0).milliseconds(0).subtract(1, 'minutes');
                break;
            case '2':
                $("#det_rep_customReportBar").css('display', 'inline-block');
                $("#det_rep_quickReportBar").hide();
                var startDateTime_temp = moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - hh:mm a');
                var endDateTime_temp = moment().minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - hh:mm a');

                $('#det_rep_custom_StartDateTime').data('DateTimePicker').date(startDateTime_temp);
                $('#det_rep_custom_EndDateTime').data('DateTimePicker').date(endDateTime_temp);
        }
        switch (CURRENT_WINDOW) {
            case WINDOW_REPORT_BANDWIDTH:
                get_det_rep_top_elements(PQDTR_REQ_BANDW);
                break;
            case WINDOW_REPORT_SRC:
                get_det_rep_top_elements(PQDTR_REQ_TOP_SRC);
                break;
            case WINDOW_REPORT_DES:
                get_det_rep_top_elements(PQDTR_REQ_TOP_DST);
                break;
            case WINDOW_REPORT_APP:
                get_det_rep_top_elements(PQDTR_REQ_TOP_APP);
                break;
            case WINDOW_REPORT_PORT:
                get_det_rep_top_elements(PQDTR_REQ_TOP_PORTS);
                break;
        }
    });

    $("input[name=det_report_quickDurationSelector]").on('change', function () {
        filter_det_reporting();
    });

    det_rep_stime = moment().minutes(0).seconds(0).milliseconds(0).subtract(1, 'hours');
    det_rep_etime = moment().minutes(0).seconds(0).milliseconds(0).subtract(1, 'minutes');

    if (CURRENT_WINDOW === WINDOW_REPORT_BANDWIDTH) {
        $("#det_rep_app option").filter(function () {
            return this.text === 'HTTP';
        }).prop('selected', true);

        hide_det_rep_bw_no_avil();
        hide_det_rep_bw_no_data();
        show_det_rep_bw_history_loading();
    }
};

init_det_rep_filter = function () {
    $('#det_rep_filter_src_type').change(function () {
        if ($("#det_rep_filter_src_type option:selected").val() === '0') {
            $('#det_rep_filter_src_type_label').text('Source Type : ');
            $('#det_rep_sip1_label').css('display', 'inline-block');
            $('#det_rep_sip_div').css('display', 'inline-block');
            $('#det_rep_sip_range_div').hide();
            $('#det_rep_sip_sbnt_div').hide();

        } else if ($("#det_rep_filter_src_type option:selected").val() === '1') {
            $('#det_rep_filter_src_type_label').text('S.Type : ');
            $('#det_rep_sip1_label').hide();
            $('#det_rep_sip_div').hide();
            $('#det_rep_sip_range_div').css('display', 'inline-block');
            $('#det_rep_sip_sbnt_div').hide();
        } else if ($("#det_rep_filter_src_type option:selected").val() === '2') {
            $('#det_rep_filter_src_type_label').text('Source Type : ');
            $('#det_rep_sip1_label').hide();
            $('#det_rep_sip_div').hide();
            $('#det_rep_sip_range_div').hide();
            $('#det_rep_sip_sbnt_div').css('display', 'inline-block');
        }
    });
    $('#det_rep_filter_dest_type').change(function () {
        if ($("#det_rep_filter_dest_type option:selected").val() === '0') {
            $('#det_rep_filter_dest_type_label').text('Destination Type : ');
            $('#det_rep_dip1_label').css('display', 'inline-block');
            $('#det_rep_dip_div').css('display', 'inline-block');
            $('#det_rep_dip_range_div').hide();
            $('#det_rep_dip_sbnt_div').hide();
        } else if ($("#det_rep_filter_dest_type option:selected").val() === '1') {
            $('#det_rep_filter_dest_type_label').text('D.Type : ');
            $('#det_rep_dip1_label').hide();
            $('#det_rep_dip_div').hide();
            $('#det_rep_dip_range_div').css('display', 'inline-block');
            $('#det_rep_dip_sbnt_div').hide();
        } else if ($("#det_rep_filter_dest_type option:selected").val() === '2') {
            $('#det_rep_filter_dest_type_label').text('Destination Type : ');
            $('#det_rep_dip1_label').hide();
            $('#det_rep_dip_div').hide();
            $('#det_rep_dip_range_div').hide();
            $('#det_rep_dip_sbnt_div').css('display', 'inline-block');
        }
    });
    $.each(application_list, function (key, app) {
        if (key > 0) {
            $('#det_rep_app')
                    .append($('<option>', {value: key})
                            .text(app));
        }
    });
    $.each(pq_services_list, function (key, app) {
        if (key > 0) {
            $('#det_rep_app')
                    .append($('<option>', {value: parseInt(key + 65536)})
                            .text(app));
        }
    });

    $.each(rmt_addr_user_list, function (key, user) {
        if (key > 0 && user != undefined) {
            $('#det_rep_ad_usr')
                    .append($('<option>', {value: key})
                            .text(user));
        }
    });

    var my_options = $("#det_rep_app option");
    var selected = $("#det_rep_app").val();
    my_options.sort(function (a, b) {
        if (a.text.toLowerCase() > b.text.toLowerCase())
            return 1;
        if (a.text.toLowerCase() < b.text.toLowerCase())
            return -1;
        return 0;
    });
    $("#det_rep_app").empty().append(my_options);
    $("#det_rep_app").val(selected);
};

function filter_det_reporting() {

    set_det_rep_quick_mode_duration();

//    det_rep_stime = moment().minutes(0).seconds(0).milliseconds(0).subtract(1, 'days');
//    det_rep_etime = moment().minutes(0).seconds(0).milliseconds(0).subtract(1, 'minutes');

    switch (CURRENT_WINDOW) {
        case WINDOW_REPORT_BANDWIDTH:
            get_det_rep_top_elements(PQDTR_REQ_BANDW);
            break;
        case WINDOW_REPORT_SUMMARY:
            get_summary_det_rep_top_elements();
            break;
        case WINDOW_REPORT_SRC:
            get_det_rep_top_elements(PQDTR_REQ_TOP_SRC);
            break;
        case WINDOW_REPORT_DES:
            get_det_rep_top_elements(PQDTR_REQ_TOP_DST);
            break;
        case WINDOW_REPORT_APP:
            get_det_rep_top_elements(PQDTR_REQ_TOP_APP);
            break;
        case WINDOW_REPORT_PORT:
            get_det_rep_top_elements(PQDTR_REQ_TOP_PORTS);
            break;
    }
}

set_det_rep_quick_mode_duration = function () {

    var startTimeTemp = moment().minutes(0).seconds(0).milliseconds(0);
    var endTimeTemp = moment().seconds(0).milliseconds(0);
    if ($("input[name=det_report_quickDurationSelector]:checked").val() === '1') {
        det_rep_stime = startTimeTemp;
        det_rep_etime = endTimeTemp.subtract(1, 'minutes');
    } else if ($("input[name=det_report_quickDurationSelector]:checked").val() === '2') {
        det_rep_stime = startTimeTemp.subtract(1, 'hours');
        det_rep_etime = endTimeTemp.minutes(0).subtract(1, 'minutes');
    } else if ($("input[name=det_report_quickDurationSelector]:checked").val() === '3') {
        det_rep_stime = startTimeTemp.hours(0);
        det_rep_etime = endTimeTemp.subtract(1, 'minutes');
    } else if ($("input[name=det_report_quickDurationSelector]:checked").val() === '4') {
        det_rep_stime = startTimeTemp.hours(0).subtract(1, 'days');
        det_rep_etime = endTimeTemp.hours(0).minutes(0).subtract(1, 'minutes');
    } else if ($("input[name=det_report_quickDurationSelector]:checked").val() === '5') {
        det_rep_stime = startTimeTemp.date(1).hours(0);
        det_rep_etime = endTimeTemp.subtract(1, 'minutes');
    } else if ($("input[name=det_report_quickDurationSelector]:checked").val() === '6') {
        det_rep_stime = startTimeTemp.date(1).hours(0).subtract(1, 'months');
        det_rep_etime = endTimeTemp.date(1).hours(0).minutes(0).subtract(1, 'minutes');
    } else
        alert("Invalid Quick Mode time");
};

get_det_rep_top_elements = function (type) {

    var ds_min;
    var de_min;
    var filt_param = get_det_filter_param();

    if ($("input[name=det_report_mode]:checked").val() === '1') {
        var ds = new Date(det_rep_stime);
        var de = new Date(det_rep_etime);
        ds_min = (ds.getTime() / (1000 * 60)).toFixed(0);
        de_min = (de.getTime() / (1000 * 60)).toFixed(0);

    } else if ($("input[name=det_report_mode]:checked").val() === '2') {
        var startDateTime_temp = $('#det_rep_custom_StartDateTime').data("DateTimePicker").date();
        var endDateTime_temp = $('#det_rep_custom_EndDateTime').data("DateTimePicker").date();
        det_rep_stime = startDateTime_temp;
        det_rep_etime = endDateTime_temp;
        var ds = new Date(startDateTime_temp);
        var de = new Date(endDateTime_temp);
//        console.log(ds, de)
        ds_min = (ds.getTime() / (1000 * 60)).toFixed(0);
        de_min = (de.getTime() / (1000 * 60)).toFixed(0);
    }
//        get_det_rep_data(ds_min, de_min, 0, 0, 0, 0, 0, 0, 4096, 0, type, 0, 0);

    get_det_rep_data(ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, type, filt_param.app, filt_param.user);
};

get_det_rep_data = function (stime, etime, sip_1, dip_1, sip_2, dip_2, sport, dport, vid, prot, type, app_id, user) {

//    console.log(stime + '_' + etime + '_' + sip_1 + '_' + dip_1 + '_' + sip_2 + '_' + dip_2 + '_' + sport + '_' + dport + '_' + vid + '_' + prot + '_' + type + '_' + app_id + '_' + user)

    var cmd_buffer = update_det_rep_acjs_elements(stime, etime, sip_1, dip_1, sip_2, dip_2, pq_2_16_32(sport, parseInt(dport)), pq_1_16_2_8_32(parseInt(vid), parseInt(prot), type), app_id, user);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        timeout: 600000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {

        var req = new Uint32Array(data);
        var length = req[0];
        var stime = req[1];
        var etime = req[2];
        var ses_count;
        var db_type;
        var pkt_sent;
        var pkt_rec;
        var url_q_id;
        var url_count;

        if (type === PQDTR_REQ_BANDW) {
            db_type = req[3];
            pkt_sent = req[6];
            pkt_rec = req[7];
        } else {
            ses_count = req[3];
            url_q_id = req[6];
            url_count = req[7];
        }
        var total_sent = parseFloat((uint32_float(req[4]) / 8) * 1000000);
        var total_rec = parseFloat((uint32_float(req[5]) / 8) * 1000000);

        act_s_time = moment(new Date(stime * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A');
        act_e_time = moment(new Date(etime * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A');

        $('#det_rep_intrfc_ulink_usage').text('Data Sent : ' + pq_get_usage(total_sent));
        $('#det_rep_intrfc_dlink_usage').text('Data Received : ' + pq_get_usage(total_rec));
        $('#det_rep_intrfc_total_usage').text('Total Data Usage : ' + pq_get_usage(total_sent + total_rec));

//        console.log("Start Time: " + moment(new Date(stime * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A'));
//        console.log("End Time: " + moment(new Date(etime * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A'));
//        console.log("Sessions: " + ses_count)
//        console.log("Uplink: " + total_sent)
//        console.log("Downlink: " + total_rec)

        switch (type) {
            case PQDTR_REQ_TOP_SRC:
                $('#Report_Source_Header').text('Sources - ' + act_s_time + ' to ' + act_e_time);
                Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_source_table);
                break;
            case PQDTR_REQ_TOP_DST:
                $('#Report_Dest_Header').text('Destinations - ' + act_s_time + ' to ' + act_e_time);
                var table_data = [type, req, ses_count, total_sent, total_rec, det_rep_dest_table];
                if (url_count !== 0) {
                    Det_Rep_URL_Req(url_q_id, table_data, Display_Det_Rep_Table);
                } else
                    Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_dest_table);
                break;
            case PQDTR_REQ_TOP_APP:
                $('#Report_App_Header').text('Applications - ' + act_s_time + ' to ' + act_e_time);
                Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_app_table);
                break;
            case PQDTR_REQ_TOP_PORTS:
                $('#Report_Port_Header').text('Ports - ' + act_s_time + ' to ' + act_e_time);
                Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_port_table);
                break;
            case PQDTR_REQ_BANDW:
                var tstamp;
                var ulink_d;
                var dlink_d;
                var ulink_pkts;
                var dlink_pkts;

                $('#pq_bw_det_rep_dl_plot').children().detach();
                $('#pq_bw_det_rep_ul_plot').children().detach();

                bwr_dbuff[0] = [];
                bwr_dbuff[1] = [];
                bwr_cbuff[0] = [];
                bwr_cbuff[1] = [];

                $('#Report_Bw_Dlink_Header').text('Downlink Bandwidth - ' + act_s_time + ' to ' + act_e_time);
                $('#Report_Bw_Ulink_Header').text('Uplink Bandwidth - ' + act_s_time + ' to ' + act_e_time);

                if (det_rep_bw_plot_init) {
                    bwr_graph_init("pq_bw_det_rep_dl_plot", '#32c182', 0);
                    bwr_graph_init("pq_bw_det_rep_ul_plot", '#cd790f', 1);
                    det_rep_bw_plot_init = false;
                }

                for (var count = 8; count < req.length; count += 5) {
                    tstamp = new Date(req[count] * 1000 * 60);
                    ulink_d = parseFloat(uint32_float(req[count + 1]) * 8 / (db_type * 60));
                    dlink_d = parseFloat(uint32_float(req[count + 2]) * 8 / (db_type * 60));
                    ulink_pkts = req[count + 3];
                    dlink_pkts = req[count + 4];

                    bwr_dbuff[0].push([tstamp, dlink_d]);
                    bwr_dbuff[1].push([tstamp, ulink_d]);

                    bwr_cbuff[0].push(['#32c182']);
                    bwr_cbuff[1].push(['#32c182']);
                }

                hide_det_rep_bw_history_loading();
                if (bwr_dbuff[0].length < 1 && bwr_dbuff[1].length < 1) {
                    show_det_rep_bw_no_avil();
                } else {
                    hide_det_rep_bw_no_avil();
                }
//                console.log("Initial_0")
//                bwr_graph_init("pq_bw_det_rep_dl_plot", '#32c182', 0);
//                if (det_rep_bw_plot_init) {
//                    console.log("Initial_1")
                bwr_graph_init("pq_bw_det_rep_dl_plot", '#32c182', 0);
//                    console.log("Initial_2")
                bwr_graph_init("pq_bw_det_rep_ul_plot", '#cd790f', 1);
//                    console.log("Initial_3")
//                    det_rep_bw_plot_init = false;
//                }
//                console.log("In")
//                bwr_plot[0].updateOptions({'file': bwr_dbuff[0]});
//                bwr_plot[1].updateOptions({'file': bwr_dbuff[1]});
//                console.log("Out")
                break;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, table, url) {
    table.clear().draw();
    if (((req.length - 8) % 5) === 0) {
        var data_length;
        if (CURRENT_WINDOW !== WINDOW_REPORT_SUMMARY) {
            data_length = req.length;
        } else {
            var set_top_elem_length = 5 * 10 + 8;
            if (req.length < set_top_elem_length) {
                data_length = req.length;
            } else
                data_length = set_top_elem_length;
        }

        switch (type) {
            case PQDTR_REQ_TOP_SRC:
                for (var count = 8; count < data_length; count += 5) {
                    if (req[count + 1] !== 0) {
                        table.row.add([num2dot(req[count]), get_ad_user(req[count + 1]), Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                    } else
                        table.row.add([num2dot(req[count]), '-', Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                }
                break;
            case PQDTR_REQ_TOP_DST:
                if (typeof (url) !== 'undefined') {
                    var element = url.split(";");
                    for (var count = 8; count < data_length; count += 5) {
                        table.row.add([num2dot(req[count]), URL_Revamp(element[(count - 8) / 5]), Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                    }
                } else {
                    for (var count = 8; count < data_length; count += 5) {
                        table.row.add([num2dot(req[count]), '-', Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                    }
                }
                break;
            case PQDTR_REQ_TOP_APP:
                for (var count = 8; count < data_length; count += 5) {
                    if (req[count] >= application_list.length) {
                        table.row.add([req[count], pq_services_list[parseInt(req[count] - 65536)], Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                    } else
                        table.row.add([req[count], application_list[req[count]], Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                }
                break;
            case PQDTR_REQ_TOP_PORTS:
                for (var count = 8; count < data_length; count += 5) {
                    table.row.add([req[count], 'PORT ' + req[count], Session_Count_Revamp(req[count + 2]), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000), parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), parseFloat((uint32_float(req[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 4]) / 8) * 1000000), '', ses_count, total_sent + total_rec]);
                }
                break;
        }
    } else
        console.log("Error in data format");

    table.draw(false);
    function Session_Count_Revamp(val) {
        if (val > 0) {
            return val;
        } else if (val === 0) {
            return 1;
        }
    }

    function URL_Revamp(url) {
        if (url === '') {
            return '-';
        } else
            return url;
    }
}

/////

get_deep_det_rep_elements = function (type, query, filt_param, tb_user) {

    deep_det_query = query;
    init_det_rep_filter();

    var ds;
    var de;
    var ds_min;
    var de_min;

    ds = new Date(det_rep_stime);
    de = new Date(det_rep_etime);
    ds_min = (ds.getTime() / (1000 * 60)).toFixed(0);
    de_min = (de.getTime() / (1000 * 60)).toFixed(0);

    switch (type) {
        case PQDTR_REQ_TOP_SRC:
            get_deep_det_rep_data(type, ds_min, de_min, dot2num(query), filt_param.dip, dot2num(query), filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_DST, filt_param.app, get_tb_user(tb_user));
            get_deep_det_rep_data(type, ds_min, de_min, dot2num(query), filt_param.dip, dot2num(query), filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_APP, filt_param.app, get_tb_user(tb_user));
            get_deep_det_rep_data(type, ds_min, de_min, dot2num(query), filt_param.dip, dot2num(query), filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SES, filt_param.app, get_tb_user(tb_user));
            break;
        case PQDTR_REQ_TOP_DST:
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, dot2num(query), filt_param.sipr, dot2num(query), 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SRC, filt_param.app, filt_param.user);
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, dot2num(query), filt_param.sipr, dot2num(query), 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_PORTS, filt_param.app, filt_param.user);
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, dot2num(query), filt_param.sipr, dot2num(query), 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SES, filt_param.app, filt_param.user);
            break;
        case PQDTR_REQ_TOP_APP:
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SRC, query, filt_param.user);
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_DST, query, filt_param.user);
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, filt_param.dport, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SES, query, filt_param.user);
            break;
        case PQDTR_REQ_TOP_PORTS:
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, query, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SRC, filt_param.app, filt_param.user);
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, query, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_DST, filt_param.app, filt_param.user);
            get_deep_det_rep_data(type, ds_min, de_min, filt_param.sip, filt_param.dip, filt_param.sipr, filt_param.dipr, 0, query, filt_param.vid, filt_param.prot, PQDTR_REQ_TOP_SES, filt_param.app, filt_param.user);
            break;
    }

    function get_tb_user(tb_usr) {

        if (tb_usr !== '-') {
            return rmt_addr_user_list.indexOf(tb_usr);
        } else
            return 4294967295;
    }

};

filter_deep_det_rep_elements = function (type) {

    var query = deep_det_query;

    var ds;
    var de;
    var ds_min;
    var de_min;

    ds = new Date(det_rep_stime);
    de = new Date(det_rep_etime);
    ds_min = (ds.getTime() / (1000 * 60)).toFixed(0);
    de_min = (de.getTime() / (1000 * 60)).toFixed(0);

    var ds_min;
    var de_min;
    var s_ip1;
    var d_ip1;
    var s_ip2;
    var d_ip2;
    var d_port;
    var vlan;

    if (type === PQDTR_REQ_TOP_DST || type === PQDTR_REQ_TOP_APP || type === PQDTR_REQ_TOP_PORTS) {

        if ($("#det_rep_filter_src_type option:selected").val() === '1') {

            if ($("#det_rep_sip1_range").val() !== 'Any') {
                s_ip1 = dot2num($("#det_rep_sip1_range").val());
            } else
                s_ip1 = 0;

            if ($("#det_rep_sip2_range").val() !== 'Any') {
                s_ip2 = dot2num($("#det_rep_sip2_range").val());
            } else
                s_ip2 = s_ip1;

        } else if ($("#det_rep_filter_src_type option:selected").val() === '2') {
            if ($("#det_rep_sip2_subnet").val() !== 'Any') {
                var src_sbnet = getIpRangeFromAddressAndNetmask($("#det_rep_sip1_subnet").val(), $("#det_rep_sip2_subnet").val());
                s_ip1 = dot2num(src_sbnet[0]);
                s_ip2 = dot2num(src_sbnet[1]);
            } else {
                s_ip1 = 0;
                s_ip2 = 0;
            }
        } else {
            if ($("#det_rep_sip1").val() !== 'Any') {
                s_ip1 = dot2num($("#det_rep_sip1").val());
            } else
                s_ip1 = 0;

            s_ip2 = s_ip1;
        }
    }

    if (type === PQDTR_REQ_TOP_SRC || type === PQDTR_REQ_TOP_APP || type === PQDTR_REQ_TOP_PORTS) {

        if ($("#det_rep_filter_dest_type option:selected").val() === '1') {

            if ($("#det_rep_dip1_range").val() !== 'Any') {
                d_ip1 = dot2num($("#det_rep_dip1_range").val());
            } else
                d_ip1 = 0;

            if ($("#det_rep_dip2_range").val() !== 'Any') {
                d_ip2 = dot2num($("#det_rep_dip2_range").val());
            } else
                d_ip2 = d_ip1;

        } else if ($("#det_rep_filter_dest_type option:selected").val() === '2') {
            if ($("#det_rep_dip2_subnet").val() !== 'Any') {
                var dst_sbnet = getIpRangeFromAddressAndNetmask($("#det_rep_dip1_subnet").val(), $("#det_rep_dip2_subnet").val());
                d_ip1 = dot2num(dst_sbnet[0]);
                d_ip2 = dot2num(dst_sbnet[1]);
            } else {
                d_ip1 = 0;
                d_ip2 = 0;
            }
        } else {
            if ($("#det_rep_dip1").val() !== 'Any') {
                d_ip1 = dot2num($("#det_rep_dip1").val());
            } else
                d_ip1 = 0;

            d_ip2 = d_ip1;
        }
    }

    if ($("#det_rep_dport").val() !== 'Any') {
        d_port = $("#det_rep_dport").val();
    } else
        d_port = 0;

    if ($("#det_rep_vlan").val() !== 'None') {
        vlan = $("#det_rep_vlan").val();
    } else
        vlan = 0;

    var prot = $("#det_rep_protocol option:selected").val();
    var app = $("#det_rep_app option:selected").val();
    var user = $("#det_rep_ad_usr option:selected").val();

    switch (type) {
        case PQDTR_REQ_TOP_SRC:
            get_deep_det_rep_data(type, ds_min, de_min, dot2num(query), d_ip1, dot2num(query), d_ip2, 0, d_port, vlan, prot, PQDTR_REQ_TOP_SES, app, user);
            break;
        case PQDTR_REQ_TOP_DST:
            get_deep_det_rep_data(type, ds_min, de_min, s_ip1, dot2num(query), s_ip2, dot2num(query), 0, d_port, vlan, prot, PQDTR_REQ_TOP_SES, app, user);
            break;
        case PQDTR_REQ_TOP_APP:
            get_deep_det_rep_data(type, ds_min, de_min, s_ip1, d_ip1, s_ip2, d_ip2, 0, d_port, vlan, prot, PQDTR_REQ_TOP_SES, query, user);
            break;
        case PQDTR_REQ_TOP_PORTS:
            get_deep_det_rep_data(type, ds_min, de_min, s_ip1, d_ip1, s_ip2, d_ip2, 0, query, vlan, prot, PQDTR_REQ_TOP_SES, app, user);
            break;
    }
};

get_deep_det_rep_data = function (def, stime, etime, sip_1, dip_1, sip_2, dip_2, sport, dport, vid, prot, type, app_id, user) {

//    console.log(stime + '_' + etime + '_' + sip_1 + '_' + dip_1 + '_' + sip_2 + '_' + dip_2 + '_' + sport + '_' + dport + '_' + vid + '_' + prot + '_' + type + '_' + app_id + '_' + user)

    var cmd_buffer = update_det_rep_acjs_elements(stime, etime, sip_1, dip_1, sip_2, dip_2, pq_2_16_32(sport, parseInt(dport)), pq_1_16_2_8_32(parseInt(vid), parseInt(prot), type), app_id, user);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        timeout: 600000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {

        var req = new Uint32Array(data);
        var length = req[0];
        var stime = req[1];
        var etime = req[2];
        var ses_count = req[3];
        var total_sent = parseFloat((uint32_float(req[4]) / 8) * 1000000);
        var total_rec = parseFloat((uint32_float(req[5]) / 8) * 1000000);
        var url_q_id = req[6];
        var url_count = req[7];

        act_s_time = moment(new Date(stime * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A');
        act_e_time = moment(new Date(etime * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A');

        switch (def) {
            case PQDTR_REQ_TOP_SRC:
                $('#det_rep_deep_ulink_usage').text('Data Sent : ' + pq_get_usage(total_sent));
                $('#det_rep_deep_dlink_usage').text('Data Received : ' + pq_get_usage(total_rec));
                $('#det_rep_deep_total_usage').text('Total Data Usage : ' + pq_get_usage(total_sent + total_rec));
                $('#Report_Source_Det_Header').text('Detailed Usage - ' + num2dot(sip_1) + ' - ' + act_s_time + ' to ' + act_e_time);
                if (type === PQDTR_REQ_TOP_DST) {
                    init_plot(PQDTR_REQ_TOP_DST, req, data_pdf_one, ticks_pdf_one);
                } else if (type === PQDTR_REQ_TOP_APP) {
                    init_plot(PQDTR_REQ_TOP_APP, req, data_pdf_two, ticks_pdf_two);
                } else if (type === PQDTR_REQ_TOP_SES) {
                    var table_data = [def, req, ses_count, total_sent, total_rec, det_rep_deep_source_table];
                    if (url_count !== 0) {
                        Det_Rep_URL_Req(url_q_id, table_data, Display_Deep_Det_Rep_Table);
                    } else
                        Display_Deep_Det_Rep_Table(def, req, ses_count, total_sent, total_rec, det_rep_deep_source_table);
                }
                break;
            case PQDTR_REQ_TOP_DST:
                $('#det_rep_deep_ulink_usage').text('Data Sent : ' + pq_get_usage(total_sent));
                $('#det_rep_deep_dlink_usage').text('Data Received : ' + pq_get_usage(total_rec));
                $('#det_rep_deep_total_usage').text('Total Data Usage : ' + pq_get_usage(total_sent + total_rec));
                $('#Report_Dest_Det_Header').text('Detailed Usage - ' + num2dot(dip_1) + ' - ' + act_s_time + ' to ' + act_e_time);
                if (type === PQDTR_REQ_TOP_SRC) {
                    init_plot(PQDTR_REQ_TOP_SRC, req, data_pdf_one, ticks_pdf_one);
                } else if (type === PQDTR_REQ_TOP_PORTS) {
                    init_plot(PQDTR_REQ_TOP_PORTS, req, data_pdf_two, ticks_pdf_two);
                } else if (type === PQDTR_REQ_TOP_SES) {
                    var table_data = [def, req, ses_count, total_sent, total_rec, det_rep_deep_dest_table];
                    if (url_count !== 0) {
                        Det_Rep_URL_Req(url_q_id, table_data, Display_Deep_Det_Rep_Table);
                    } else
                        Display_Deep_Det_Rep_Table(def, req, ses_count, total_sent, total_rec, det_rep_deep_dest_table);
                }
                break;
            case PQDTR_REQ_TOP_APP:
                $('#det_rep_deep_ulink_usage').text('Data Sent : ' + pq_get_usage(total_sent));
                $('#det_rep_deep_dlink_usage').text('Data Received : ' + pq_get_usage(total_rec));
                $('#det_rep_deep_total_usage').text('Total Data Usage : ' + pq_get_usage(total_sent + total_rec));
                $('#Report_App_Det_Header').text('Detailed Usage - ' + app_serv_dissect(app_id) + ' - ' + act_s_time + ' to ' + act_e_time);
                if (type === PQDTR_REQ_TOP_SRC) {
                    init_plot(PQDTR_REQ_TOP_SRC, req, data_pdf_one, ticks_pdf_one);
                } else if (type === PQDTR_REQ_TOP_DST) {
                    init_plot(PQDTR_REQ_TOP_DST, req, data_pdf_two, ticks_pdf_two);
                } else if (type === PQDTR_REQ_TOP_SES) {
                    var table_data = [def, req, ses_count, total_sent, total_rec, det_rep_deep_app_table];
                    if (url_count !== 0) {
                        Det_Rep_URL_Req(url_q_id, table_data, Display_Deep_Det_Rep_Table);
                    } else
                        Display_Deep_Det_Rep_Table(def, req, ses_count, total_sent, total_rec, det_rep_deep_app_table);
                }
                break;
            case PQDTR_REQ_TOP_PORTS:
                $('#det_rep_deep_ulink_usage').text('Data Sent : ' + pq_get_usage(total_sent));
                $('#det_rep_deep_dlink_usage').text('Data Received : ' + pq_get_usage(total_rec));
                $('#det_rep_deep_total_usage').text('Total Data Usage : ' + pq_get_usage(total_sent + total_rec));
                $('#Report_Port_Det_Header').text('Detailed Usage - PORT ' + dport + ' - ' + act_s_time + ' to ' + act_e_time);
                if (type === PQDTR_REQ_TOP_SRC) {
                    init_plot(PQDTR_REQ_TOP_SRC, req, data_pdf_one, ticks_pdf_one);
                } else if (type === PQDTR_REQ_TOP_DST) {
                    init_plot(PQDTR_REQ_TOP_DST, req, data_pdf_two, ticks_pdf_two);
                } else if (type === PQDTR_REQ_TOP_SES) {
                    var table_data = [def, req, ses_count, total_sent, total_rec, det_rep_deep_port_table];
                    if (url_count !== 0) {
                        Det_Rep_URL_Req(url_q_id, table_data, Display_Deep_Det_Rep_Table);
                    } else
                        Display_Deep_Det_Rep_Table(def, req, ses_count, total_sent, total_rec, det_rep_deep_port_table);
                }
                break;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function Display_Deep_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, table, url) {

    table.clear().draw();
    if (((req.length - 8) % 10) === 0) {
        switch (type) {
            case PQDTR_REQ_TOP_SRC:
                if (typeof (url) !== 'undefined') {
                    var element = url.split(";");
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 3]), URL_Revamp(element[(count - 8) / 10]), Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), app_serv_dissect(req[count + 6]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                } else {
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 3]), '-', Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), app_serv_dissect(req[count + 6]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                }
                break;
            case PQDTR_REQ_TOP_DST:

                if (typeof (url) !== 'undefined') {
                    var element = url.split(";");
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 1]), get_ad_user(req[count + 2]), URL_Revamp(element[(count - 8) / 10]), Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), app_serv_dissect(req[count + 6]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                } else {
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 1]), get_ad_user(req[count + 2]), '-', Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), app_serv_dissect(req[count + 6]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                }
                break;
            case PQDTR_REQ_TOP_APP:

                if (typeof (url) !== 'undefined') {
                    var element = url.split(";");
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 1]), get_ad_user(req[count + 2]), num2dot(req[count + 3]), URL_Revamp(element[(count - 8) / 10]), Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                } else {
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 1]), get_ad_user(req[count + 2]), num2dot(req[count + 3]), '-', Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                }
                break;
            case PQDTR_REQ_TOP_PORTS:

                if (typeof (url) !== 'undefined') {
                    var element = url.split(";");
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 1]), get_ad_user(req[count + 2]), num2dot(req[count + 3]), URL_Revamp(element[(count - 8) / 10]), Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                } else {
                    for (var count = 8; count < req.length; count += 10) {
                        table.row.add([num2dot(req[count + 1]), get_ad_user(req[count + 2]), num2dot(req[count + 3]), '-', Session_Count_Revamp(req[count + 7]), req[count + 4], vlan_dissect(req[count]), protocol_dissect(req[count + 5]), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000), parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), parseFloat((uint32_float(req[count + 8]) / 8) * 1000000) + parseFloat((uint32_float(req[count + 9]) / 8) * 1000000), ses_count, total_sent + total_rec]);
                    }
                }
                break;
        }
    } else
        console.log("Error in data format");

    table.draw(false);

    function Session_Count_Revamp(val) {
        if (val > 0) {
            return val;
        } else if (val === 0) {
            return 1;
        }
    }

    function vlan_dissect(id) {
        if (id === 4095) {
            return 'None';
        } else
            return id;
    }

    function protocol_dissect(id) {
        if (id === 6) {
            return 'TCP';
        } else if (id === 17) {
            return 'UDP';
        }
    }

    function URL_Revamp(url) {
        if (url === '') {
            return '-';
        } else
            return url;
    }
}

/// URL Ajax Request
function Det_Rep_URL_Req(q_id, table_data, callback) {
    var cookie = $.cookie('pqsf');
    var url_req = new Uint32Array(1);
    url_req[0] = pq_4_8_32(CJS_REQUEST_START, DTR_UPDATE, DTR_URL_REQUEST, q_id);
    $.ajax({
        data: url_req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        callback(table_data[0], table_data[1], table_data[2], table_data[3], table_data[4], table_data[5], data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

//// Reporting Common ACJS Function
update_det_rep_acjs_elements = function (e0, e1, e2, e3, e4, e5, e6, e7, e8, e9) {
    var cmd_buffer = new ArrayBuffer(4 * 11);
    var req = new Uint32Array(cmd_buffer, 0, 11);
    req[0] = pq_4_8_32(CJS_REQUEST_START, DTR_UPDATE, DTR_GEN_REQUEST, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = e4;
    req[6] = e5;
    req[7] = e6;
    req[8] = e7;
    req[9] = e8;
    req[10] = e9;
//    console.log('Request: '+req[0]+'_'+req[1] +'_'+req[2]+'_'+req[3]+'_'+req[4]+'_'+req[5]+'_'+req[6]+'_'+req[7]+'_'+req[8]+'_'+req[9]+'_'+req[10])
    return cmd_buffer;
};

function init_plot(type, data, data_pdf, ticks_pdf) {

    var xmin_d = -1;
    var xmax_d = 9;
    var plot_d;
    var bar_index;
    var data_d = [];
    var ticks_d = [];

    var plot_div;
    var plot_label;
    var plot_prev_btn;
    var plot_next_btn;

    switch (type) {
        case PQDTR_REQ_TOP_SRC:
            plot_div = 'det_rep_deep_src_holder';
            plot_label = 'det_rep_deep_src_label';
            plot_prev_btn = 'det_rep_deep_src_prev';
            plot_next_btn = 'det_rep_deep_src_nxt';

            for (var count = 8; count < data.length; count += 5) {
                bar_index = (count - 8) / 5;
                if (data[count + 1] !== 0) {
                    ticks_d.push([bar_index, rmt_addr_user_list[data[count + 1]]]);
                } else
                    ticks_d.push([bar_index, num2dot(data[count])]);

                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            data_pdf.length = 0;
            ticks_pdf.length = 0;
            for (var ele = 0; ele < 10; ele++) {
                data_pdf.push(data_d[ele]);
                ticks_pdf.push(ticks_d[ele]);
            }
            break;

        case PQDTR_REQ_TOP_DST:
            plot_div = 'det_rep_deep_dst_holder';
            plot_label = 'det_rep_deep_dst_label';
            plot_prev_btn = 'det_rep_deep_dst_prev';
            plot_next_btn = 'det_rep_deep_dst_nxt';

            for (var count = 8; count < data.length; count += 5) {
                bar_index = (count - 8) / 5;
                ticks_d.push([bar_index, num2dot(data[count])]);
                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            data_pdf.length = 0;
            ticks_pdf.length = 0;
            for (var ele = 0; ele < 10; ele++) {
                data_pdf.push(data_d[ele]);
                ticks_pdf.push(ticks_d[ele]);
            }
            break;

        case PQDTR_REQ_TOP_APP:
            plot_div = 'det_rep_deep_app_holder';
            plot_label = 'det_rep_deep_app_label';
            plot_prev_btn = 'det_rep_deep_app_prvs';
            plot_next_btn = 'det_rep_deep_app_next';

            for (var count = 8; count < data.length; count += 5) {
                bar_index = (count - 8) / 5;
                if (data[count] < 65536) {
                    ticks_d.push([bar_index, application_list[data[count]]]);
                } else
                    ticks_d.push([bar_index, pq_services_list[parseInt(data[count] - 65536)]]);

                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            data_pdf.length = 0;
            ticks_pdf.length = 0;
            for (var ele = 0; ele < 10; ele++) {
                data_pdf.push(data_d[ele]);
                ticks_pdf.push(ticks_d[ele]);
            }
            break;

        case PQDTR_REQ_TOP_PORTS:
            plot_div = 'det_rep_deep_app_holder';
            plot_label = 'det_rep_deep_app_label';
            plot_prev_btn = 'det_rep_deep_app_prvs';
            plot_next_btn = 'det_rep_deep_app_next';

            for (var count = 8; count < data.length; count += 5) {
                bar_index = (count - 8) / 5;
                ticks_d.push([bar_index, 'PORT ' + data[count]]);
                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            data_pdf.length = 0;
            ticks_pdf.length = 0;
            for (var ele = 0; ele < 10; ele++) {
                data_pdf.push(data_d[ele]);
                ticks_pdf.push(ticks_d[ele]);
            }
            break;
    }

    if (data_d.length <= 10) {
        $('#' + plot_prev_btn).hide();
        $('#' + plot_next_btn).hide();
    } else {
        $('#' + plot_prev_btn).hide();
        $('#' + plot_next_btn).show();
    }

    var plot_d = $.plot("#" + plot_div, [data_d], {
        series: {
            bars: {
                show: true,
                align: "center",
                barWidth: 0.5,
                lineWidth: 0,
                fillColor: {
                    colors: ["#944C2D", "#E8E868"]
                }
            }
        },
        grid: {
            hoverable: true,
            borderWidth: 0.2,
            autoHighlight: true
        },
        xaxis: {
            mode: "categories",
            tickLength: 0,
            ticks: ticks_d,
            min: xmin_d,
            max: xmax_d
        },
        yaxis: {
            tickFormatter: function (val, axis) {
                return "<label style='font-size:10px; font-style:Georgia'>" + pq_get_usage_det_rep(val) + "</label>";
            }
        }
    });

    $('#' + plot_prev_btn).click(function () {
        if (xmin_d > 0) {
            $('#' + plot_next_btn).show();
            xmin_d = xmin_d - 10;
            xmax_d = xmax_d - 10;
            $('#' + plot_label).html((xmin_d + 1) + "-" + (xmax_d + 1));
        }

        plot_d.getOptions().xaxes[0].min = xmin_d;
        plot_d.getOptions().xaxes[0].max = xmax_d;

        data_pdf.length = 0;
        ticks_pdf.length = 0;
        var xmin = xmin_d;
        for (var ele = 0; ele < 10; ele++) {
            data_pdf.push(data_d[xmin]);
            ticks_pdf.push(ticks_d[xmin]);
            xmin++;
        }

        plot_d.setupGrid();
        plot_d.draw();
        if (xmin_d < 0) {
            $('#' + plot_prev_btn).hide();
        }
        if (xmin_d === -1) {
            $('#' + plot_label).html((xmin_d + 2) + "-" + (xmax_d + 1));
        } else {
            $('#' + plot_label).html((xmin_d + 1) + "-" + (xmax_d + 1));
        }

    });
    $('#' + plot_next_btn).click(function () {
        if (xmax_d < data_d.length) {
            $('#' + plot_prev_btn).show();
            xmin_d = xmin_d + 10;
            xmax_d = xmax_d + 10;
            $('#' + plot_label).html((xmin_d + 1) + "-" + (xmax_d + 1));
        }

        plot_d.getOptions().xaxes[0].min = xmin_d;
        plot_d.getOptions().xaxes[0].max = xmax_d;

        data_pdf.length = 0;
        ticks_pdf.length = 0;
        var xmin = xmin_d;
        for (var ele = 0; ele < 10; ele++) {
            data_pdf.push(data_d[xmin]);
            ticks_pdf.push(ticks_d[xmin]);
            xmin++;
        }

        plot_d.setupGrid();
        plot_d.draw();
        if (xmax_d > data_d.length - 1) {
            $('#' + plot_next_btn).hide();
        }
        if (xmax_d >= data_d.length) {
            $('#' + plot_label).html((xmin_d + 2) + "-" + (data_d.length));
        } else {
            $('#' + plot_label).html((xmin_d + 1) + "-" + (xmax_d + 1));
        }
    });

    $("#" + plot_div).UseTooltip(ticks_d);
}

var previousPoint = null;

$.fn.UseTooltip = function (data) {
        $(this).bind("plothover", function (event, pos, item) {                         
                if (item) {
                        if (previousPoint !== item.dataIndex) {
                                previousPoint = item.dataIndex;
                                $("#tooltip").remove();
                 
                                var x = item.datapoint[0];
                                var y = item.datapoint[1];                
 
                                showTooltip(item.pageX, item.pageY,
                                          data[x][1] + "<br/>" + "Usage: <strong>" + pq_get_usage(y) + " </strong> ");
                        }
                }
                else {
                        $("#tooltip").remove();
                        previousPoint = null;
                }
        });
};

function showTooltip(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        "backgroundColor": "#FFFFFF",
        "border": "1px solid #006ACB",
        "borderRadius": "5px",
        "boxShadow": "1px 1px 4px #CCCCCC",
        "fontFamily": "Lucida Grande , Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif",
        "fontSize": "12px",
        "fontWeight": "normal",
        "opacity": "0.85",
        "padding": "3px",
        "position": 'absolute',
        "display": 'none',
        "top": y + 5,
        "left": x + 20
    }).appendTo("body").fadeIn(200);
}

// PDF generation
var img = new Image();
img.src = "../image/header.png";
img.onload = function (doc) {
    return this;
};

//Bandwidth plots PDF
var graph_pdf = function () {
    var doc = new jsPDF('l');
    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    var pagenum = 1;

    doc.setFont("cambria");
    doc.setFontType("bold");
    doc.setFontSize(12);
    doc.text("Bandwidth", (width / 2) - 5, 25);
    doc.setFontSize(9);
    doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
    doc.setFontType("italic");
    doc.text("Paraqum Network Analyzer", 250, 12);
    doc.setDrawColor(1, 1, 1);
    doc.line(5, 15, 290, 15);
    doc.line(5, height - 15, 290, height - 15);
    doc.text(pagenum.toString(), 280, height - 10);
    doc.setDrawColor(132, 132, 132);
    doc.line(15, 30, 95, 30);
    doc.line(15, 35, 95, 35);
    doc.line(15, 40, 95, 40);
    doc.line(15, 50, 95, 50);
    doc.line(15, 60, 95, 60);
    doc.line(15, 65, 95, 65);
    doc.line(15, 70, 95, 70);
    doc.line(15, 75, 95, 75);
    doc.line(15, 80, 95, 80);
    doc.line(15, 30, 15, 80);
    doc.line(45, 30, 45, 80);
    doc.line(95, 30, 95, 80);
    doc.setFontType("bold");
    doc.text("Start Time", 18, 34);
    doc.text("End Time", 18, 39);
    doc.text("Source Type", 18, 44);
    doc.text("Destination Type", 18, 54);
    doc.text("D Port", 18, 64);
    doc.text("Vlan", 18, 69);
    doc.text("Protocol", 18, 74);
    doc.text("Application", 18, 79);

    doc.setFontType("italic");

    var stype = $('#det_rep_filter_src_type').val();
    var dtype = $('#det_rep_filter_dest_type').val();
    var id = ['det_rep_sip1', 'det_rep_sip1_range', 'det_rep_sip2_range', 'det_rep_sip1_subnet', 'det_rep_sip2_subnet', 'det_rep_dip1', 'det_rep_dip1_range', 'det_rep_dip2_range', 'det_rep_dip1_subnet', 'det_rep_dip2_subnet', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app'];
    var value = [];
    for (var i in id) {
        value.push($('#' + id[i]).val());
    }
    doc.text(act_s_time, 48, 34);
    doc.text(act_e_time, 48, 39);

    if (stype === "2") {
        doc.setFontType("normal");
        doc.text("(Subnet)", 18, 49);
        doc.setFontType("italic");
        doc.text(value[3], 48, 44);
        doc.text(value[4], 48, 49);
        doc.line(45, 45, 95, 45);
    } else if (stype === "1") {
        doc.setFontType("normal");
        doc.text("(Range)", 18, 49);
        doc.setFontType("italic");
        doc.text(value[1], 48, 44);
        doc.text(value[2], 48, 49);
        doc.line(45, 45, 95, 45);
    } else {
        doc.setFontType("normal");
        doc.text("(Address)", 18, 49);
        doc.setFontType("italic");
        doc.text(value[0], 48, 44);
    }

    if (dtype === "2") {
        doc.setFontType("normal");
        doc.text("(Subnet)", 18, 59);
        doc.setFontType("italic");
        doc.text(value[8], 48, 54);
        doc.text(value[9], 48, 59);
        doc.line(45, 55, 95, 55);
    } else if (dtype === "1") {
        doc.setFontType("normal");
        doc.text("(Range)", 18, 59);
        doc.setFontType("italic");
        doc.text(value[6], 48, 54);
        doc.text(value[7], 48, 59);
        doc.line(45, 55, 95, 55);
    } else {
        doc.setFontType("normal");
        doc.text("(Address)", 18, 59);
        doc.setFontType("italic");
        doc.text(value[5], 48, 54);
    }
    doc.text(value[10], 48, 64);
    doc.text(value[11], 48, 69);

    if (value[12] === "6") {
        doc.text("TCP", 48, 74);
    } else if (value[12] === "17") {
        doc.text("UDP", 48, 74);
    } else {
        doc.text("Any", 48, 74);
    }

    value[13] === "0" ? doc.text("All", 48, 79) : doc.text(app_serv_dissect([parseInt(value[13])]), 48, 79);

    html2canvas($("#Report_Bw_Dlink"), {
        allowTaint: true,
        onrendered: function (canva) {
            var imgData1 = canva.toDataURL('image/png');
            doc.addImage(imgData1, 'PNG', 15, 85, 273.83, 50);
        }
    }).then(function () {
        html2canvas($("#Report_Bw_Ulink"), {
            allowTaint: true,
            onrendered: function (canva) {
                var imgData2 = canva.toDataURL('image/png');
                doc.addImage(imgData2, 'PNG', 15, 140, 273.83, 50);
                doc.save('Bandwidth History.pdf');
            }
        });
    });
};

//Table PDFs

var rep_pdf_gen = function (type) {
    var doc = new jsPDF('p');
    var imgData;
    var Title;
    var pagenum = 1;
    $('a.dt-button.jsonButton').click();

    var table = [];
    var dataHeader = [];
    doc.setFont("cambria");
    doc.setFontSize(11);
    switch (type) {
        case(PQDTR_REQ_TOP_SRC):
            Title = "Sources";
            var table1_old = data_det_rep_source_table.body;
            var dataHeader_s_old = data_det_rep_source_table.header;
            for (var i in table1_old) {
                table.push([]);
                for (var j in table1_old[i]) {
                    if (j < 5) {
                        table[i].push(table1_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_s_old) {
                if (i < 5) {
                    dataHeader.push(dataHeader_s_old[i]);
                }
            }
            break;

        case(PQDTR_REQ_TOP_DST):
            Title = "Destinations";
            var table2_old = data_det_rep_des_table.body;
            var dataHeader_d_old = data_det_rep_des_table.header;
            for (var i in table2_old) {
                table.push([]);
                for (var j in table2_old[i]) {
                    if (j < 6) {
                        table[i].push(table2_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_d_old) {
                if (i < 6) {
                    dataHeader.push(dataHeader_d_old[i]);
                }
            }
            break;

        case(PQDTR_REQ_TOP_APP):
            Title = "Applications";
            var table3_old = data_det_rep_app_table.body;
            var dataHeader_a_old = data_det_rep_app_table.header;
            for (var i in table3_old) {
                table.push([]);
                for (var j in table3_old[i]) {
                    if (j !== '0' && j < 6) {
                        table[i].push(table3_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_a_old) {
                if (i !== '0' && i < 6) {
                    dataHeader.push(dataHeader_a_old[i]);
                }
            }
            break;

        case(PQDTR_REQ_TOP_PORTS):
            Title = "Ports";
            var table4_old = data_det_rep_port_table.body;
            var dataHeader_p_old = data_det_rep_port_table.header;
            for (var i in table4_old) {
                table.push([]);
                for (var j in table4_old[i]) {
                    if (j !== '0' && j < 6) {
                        table[i].push(table4_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_p_old) {
                if (i !== '0' && i < 6) {
                    dataHeader.push(dataHeader_p_old[i]);
                }
            }
            break;
    }

    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(Title, 100, 25);
    doc.setFontSize(9);

    doc.setDrawColor(132, 132, 132);
    doc.line(15, 30, 95, 30);
    doc.line(15, 35, 95, 35);
    doc.line(15, 40, 95, 40);
    doc.line(15, 50, 95, 50);
    doc.line(15, 60, 95, 60);
    doc.line(15, 65, 95, 65);
    doc.line(15, 70, 95, 70);
    doc.line(15, 75, 95, 75);
    doc.line(15, 80, 95, 80);
    doc.line(15, 30, 15, 80);
    doc.line(45, 30, 45, 80);
    doc.line(95, 30, 95, 80);

    doc.text("Start Time", 18, 34);
    doc.text("End Time", 18, 39);
    doc.text("Source Type", 18, 44);
    doc.text("Destination Type", 18, 54);
    doc.text("Destination Port", 18, 64);
    doc.text("Vlan ID", 18, 69);
    doc.text("Protocol", 18, 74);
    doc.text("Application", 18, 79);
    doc.setFontType("italic");

    var stype = $('#det_rep_filter_src_type').val();
    var dtype = $('#det_rep_filter_dest_type').val();
    var id = ['det_rep_sip1', 'det_rep_sip1_range', 'det_rep_sip2_range', 'det_rep_sip1_subnet', 'det_rep_sip2_subnet', 'det_rep_dip1', 'det_rep_dip1_range', 'det_rep_dip2_range', 'det_rep_dip1_subnet', 'det_rep_dip2_subnet', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app'];
    var value = [];
    for (var i in  id) {
        value.push($('#' + id[i]).val());
    }
    doc.text(act_s_time, 48, 34);
    doc.text(act_e_time, 48, 39);

    if (stype === '1') {
        doc.setFontType("normal");
        doc.text("(Range)", 18, 49);
        doc.setFontType("italic");
        doc.text(value[1], 48, 44);
        doc.text(value[2], 48, 49);
        doc.line(45, 45, 95, 45);
    } else if (stype === '2') {
        doc.setFontType("normal");
        doc.text("(Subnet)", 18, 49);
        doc.setFontType("italic");
        doc.text(value[3], 48, 44);
        doc.text(value[4], 48, 49);
        doc.line(45, 45, 95, 45);
    } else {
        doc.setFontType("normal");
        doc.text("(Address)", 18, 49);
        doc.setFontType("italic");
        doc.text(value[0], 48, 44);
    }
    if (dtype === '1') {
        doc.setFontType("normal");
        doc.text("(Range)", 18, 59);
        doc.setFontType("italic");
        doc.text(value[6], 48, 54);
        doc.text(value[7], 48, 59);
        doc.line(45, 55, 95, 55);
    } else if (dtype === 2) {
        doc.setFontType("normal");
        doc.text("(Subnet)", 18, 59);
        doc.setFontType("italic");
        doc.text(value[8], 48, 54);
        doc.text(value[9], 48, 59);
        doc.line(45, 55, 95, 55);
    } else {
        doc.setFontType("normal");
        doc.text("(Address)", 18, 59);
        doc.setFontType("italic");
        doc.text(value[5], 48, 54);
    }
    doc.text(value[10], 48, 64);
    doc.text(value[11], 48, 69);

    if (value[12] === "6") {
        doc.text("TCP", 48, 74);
    } else if (value[12] === "17") {
        doc.text("UDP", 48, 74);
    } else {
        doc.text("Any", 48, 74);
    }

    value[13] === "0" ? doc.text("All", 48, 79) : doc.text(app_serv_dissect([parseInt(value[13])]), 48, 79);

    doc.setProperties({
        title: 'Network Analyzer',
        subject: 'DATA USAGE REPORT',
        author: 'author',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'author'
    });

    doc.autoTable(dataHeader, table, {
        headerStyles: {fillColor: [16, 73, 137], fontSize: 9},
        bodyStyles: {fillColor: [156, 186, 189], fontSize: 9},
        columnStyles: {
            id: {fillColor: 255}
        },
        margin: {top: 20, bottom: 20},
        startY: 85,
        addPageContent: function (data) {
            doc.setFont("cambria");
            doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
            doc.setFontType("italic");
            doc.text("Paraqum Network Analyzer", 165, 12);
            doc.setDrawColor(1, 1, 1);
            doc.line(5, 15, 205, 15);
            doc.line(5, height - 15, 205, height - 15);
            doc.text(pagenum.toString(), 200, height - 10);
            pagenum++;
        }
    });
    doc.save('Usage Report - ' + Title + '.pdf');
};

// Deep Detail PDFs

var det_rep_deep_pdf_generate = function (type) {
    var doc = new jsPDF('l');
    var imgData;
    var pagenum = 1;
    var Time = "Sources - 19th Dec 2017 08:00:00 AM to 19th Dec 2017 08:59:00 AM";
    var DetailRep_Type = [];
    $('a.dt-button.jsonButton').click();

    var table = [];
    var dataHeader = [];

    switch (type) {
        case(PQDTR_REQ_TOP_SRC):
            Time = $('#Report_Source_Det_Header').text();
            var saveword = 'Sources';
            var table1_old = data_det_rep_deep_source_table.body;
            var dataHeader_s_old = data_det_rep_deep_source_table.header;
            for (var i in table1_old) {
                table.push([]);
                for (var j in table1_old[i]) {
                    if (j < 10) {
                        table[i].push(table1_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_s_old) {
                if (i < 10) {
                    dataHeader.push(dataHeader_s_old[i]);
                }
            }
            DetailRep_Type.push("Destinations");
            DetailRep_Type.push("Applications");
            break;

        case(PQDTR_REQ_TOP_DST):
            Time = $('#Report_Dest_Det_Header').text();
            var saveword = 'Destinations';
            var table2_old = data_det_rep_deep_des_table.body;
            var dataHeader_d_old = data_det_rep_deep_des_table.header;
            for (var i in table2_old) {
                table.push([]);
                for (var j in table2_old[i]) {
                    if (j < 9) {
                        table[i].push(table2_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_d_old) {
                if (i < 9) {
                    dataHeader.push(dataHeader_d_old[i]);
                }
            }
            DetailRep_Type.push("Sources");
            DetailRep_Type.push("Ports");
            break;

        case(PQDTR_REQ_TOP_APP):
            Time = $('#Report_App_Det_Header').text();
            var saveword = 'Applications';
            var table3_old = data_det_rep_deep_app_table.body;
            var dataHeader_a_old = data_det_rep_deep_app_table.header;
            for (var i in table3_old) {
                table.push([]);
                for (var j in table3_old[i]) {
                    if (j < 9) {
                        table[i].push(table3_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_a_old) {
                if (i < 9) {
                    dataHeader.push(dataHeader_a_old[i]);
                }
            }
            DetailRep_Type.push("Sources");
            DetailRep_Type.push("Destinations");
            break;

        case(PQDTR_REQ_TOP_PORTS):
            Time = $('#Report_Port_Det_Header').text();
            var saveword = 'Ports';
            var table4_old = data_det_rep_deep_port_table.body;
            var dataHeader_p_old = data_det_rep_deep_port_table.header;
            for (var i in table4_old) {
                table.push([]);
                for (var j in table4_old[i]) {
                    if (j < 9) {
                        table[i].push(table4_old[i][j]);
                    }
                }
            }
            for (var i in dataHeader_p_old) {
                if (i < 9) {
                    dataHeader.push(dataHeader_p_old[i]);
                }
            }
            DetailRep_Type.push("Sources");
            DetailRep_Type.push("Destinations");
            break;
    }

    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    doc.setFont("cambria");
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.setLineWidth(8);
    doc.setDrawColor(47, 122, 154);
    doc.line(5, 28, 290, 28);
    doc.setLineWidth(0.1);
    doc.setTextColor(255, 255, 255);
    doc.text(Time, 90, 29);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
    doc.setFontType("italic");
    doc.text("Paraqum Network Analyzer", 250, 12);
    doc.setDrawColor(1, 1, 1);
    doc.line(5, 15, 290, 15);
    doc.line(5, height - 15, 290, height - 15);
    doc.text(pagenum.toString(), 280, height - 10);
    pagenum++;
    doc.setFontType("bold");
    html2canvas($("#flot_one"), {
        allowTaint: true,
        onrendered: function (canva) {
            var imgData = canva.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 10, 40, 131.52, 50);
            doc.setDrawColor(132, 132, 132);

            for (var i = 105; i <= 171; i = i + 6) {
                doc.line(20, i, 120, i);
            }
            doc.line(20, 105, 20, 171);
            doc.line(120, 105, 120, 171);
            doc.line(80, 105, 80, 171);
            doc.setFontType("bold");
            doc.setFontSize(10);
            doc.text(DetailRep_Type[0], 22, 109);
            doc.text("Usage", 82, 109);
            doc.setFontSize(9);
            doc.setFontType("italic");
            for (var i = 115, j = 0; i <= 169, j < 10; i = i + 6, j++) {
                if (j < ticks_pdf_one.length && ticks_pdf_one[j] != null) {
                    doc.text((ticks_pdf_one[j][1]), 22, i);
                    doc.text(pq_get_usage(data_pdf_one[j][1].toString()), 82, i);
                }
            }
        }
    }).then(function () {
        html2canvas($("#flot_two"), {
            allowTaint: true,
            onrendered: function (canva) {
                var imgData = canva.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 150, 40, 131.52, 50);
                for (var i = 105; i <= 171; i = i + 6) {
                    doc.line(160, i, 260, i);
                }
                doc.line(160, 105, 160, 171);
                doc.line(260, 105, 260, 171);
                doc.line(220, 105, 220, 171);
                doc.setFontType("bold");
                doc.setFontSize(10);
                doc.text(DetailRep_Type[1], 162, 109);
                doc.text("Usage", 222, 109);
                doc.setFontSize(9);
                doc.setFontType("italic");
                for (var i = 115, j = 0; i <= 169, j < 10; i = i + 6, j++) {
                    if (j < ticks_pdf_two.length && ticks_pdf_two[j] != null) {
                        doc.text((ticks_pdf_two[j][1]), 162, i);
                        doc.text(pq_get_usage(data_pdf_two[j][1].toString()), 222, i);
                    }
                }
            }
        }).then(function () {
            doc.addPage();
            doc.setDrawColor(132, 132, 132);
            doc.line(15, 30, 95, 30);
            doc.line(15, 35, 95, 35);
            doc.line(15, 40, 95, 40);
            doc.line(15, 50, 95, 50);
            doc.line(15, 60, 95, 60);
            doc.line(15, 65, 95, 65);
            doc.line(15, 70, 95, 70);
            doc.line(15, 75, 95, 75);
            doc.line(15, 80, 95, 80);
            doc.line(15, 30, 15, 80);
            doc.line(45, 30, 45, 80);
            doc.line(95, 30, 95, 80);
            doc.setFontSize(12);
            doc.setFontType("bold");
            type === PQDTR_REQ_TOP_APP ? doc.text("Session Report of " + app_serv_dissect([parseInt(deep_det_query)]), width / 2 - 10, 25) : type === PQDTR_REQ_TOP_PORTS ? doc.text("Session Report of Port " + deep_det_query.toString(), width / 2 - 10, 25) : doc.text("Session Report of " + deep_det_query, width / 2 - 10, 25);
            doc.setFontSize(9);
            doc.text("Start Time", 18, 34);
            doc.text("End Time", 18, 39);
            doc.text("Source Type", 18, 44);
            doc.text("Destination Type", 18, 54);
            doc.text("D Port", 18, 64);
            doc.text("Vlan", 18, 69);
            doc.text("Protocol", 18, 74);
            doc.text("Application", 18, 79);

            doc.setFontType("italic");

            var stype = $('#det_rep_filter_src_type').val();
            var dtype = $('#det_rep_filter_dest_type').val();
            var id = ['det_rep_sip1', 'det_rep_sip1_range', 'det_rep_sip2_range', 'det_rep_sip1_subnet', 'det_rep_sip2_subnet', 'det_rep_dip1', 'det_rep_dip1_range', 'det_rep_dip2_range', 'det_rep_dip1_subnet', 'det_rep_dip2_subnet', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app'];
            var value = [];
            for (var i in  id) {
                value.push($('#' + id[i]).val());
            }
            doc.text(act_s_time, 48, 34);
            doc.text(act_e_time, 48, 39);
            if (stype != null) {
                if (stype === '2') {
                    doc.setFontType("normal");
                    doc.text("(Subnet)", 18, 49);
                    doc.setFontType("italic");
                    doc.text(value[3], 48, 44);
                    doc.text(value[4], 48, 49);
                    doc.line(45, 45, 95, 45);
                } else if (stype === '1') {
                    doc.setFontType("normal");
                    doc.text("(Range)", 18, 49);
                    doc.setFontType("italic");
                    doc.text(value[1], 48, 44);
                    doc.text(value[2], 48, 49);
                    doc.line(45, 45, 95, 45);
                } else {
                    doc.setFontType("normal");
                    doc.text("(Address)", 18, 49);
                    doc.setFontType("italic");
                    doc.text(value[0], 48, 44);
                }
            } else {
                doc.text(deep_det_query, 48, 44);
            }

            if (dtype != null) {
                if (dtype === '2') {
                    doc.setFontType("normal");
                    doc.text("(Subnet)", 18, 59);
                    doc.setFontType("italic");
                    doc.text(value[8], 48, 54);
                    doc.text(value[9], 48, 59);
                    doc.line(45, 55, 95, 55);
                } else if (dtype === '1') {
                    doc.setFontType("normal");
                    doc.text("(Range)", 18, 59);
                    doc.setFontType("italic");
                    doc.text(value[6], 48, 54);
                    doc.text(value[7], 48, 59);
                    doc.line(45, 55, 95, 55);
                } else {
                    doc.setFontType("normal");
                    doc.text("(Address)", 18, 59);
                    doc.setFontType("italic");
                    doc.text(value[5], 48, 54);
                }
            } else {
                doc.text(deep_det_query, 48, 54);
            }
            if (value[10] != null) {
                doc.text(value[10], 48, 64);
            } else {
                doc.text(deep_det_query.toString(), 48, 64);
            }
            if (value[11] != null) {
                doc.text(value[11], 48, 69);
            } else {
            }
            if (value[12] != null) {
                if (value[12] === "6") {
                    doc.text("TCP", 48, 74);
                } else if (value[12] === "17") {
                    doc.text("UDP", 48, 74);
                } else {
                    doc.text("Any", 48, 74);
                }
            } else {
            }
            if (value[13] != null) {
                value[13] === "0" ? doc.text("All", 48, 79) : doc.text(app_serv_dissect([parseInt(value[13])]), 48, 79);
            } else {
                doc.text(app_serv_dissect([parseInt(deep_det_query)]), 48, 79);
            }
            doc.setProperties({
                title: 'Network Analyzer',
                subject: 'DATA USAGE REPORT',
                author: 'author',
                keywords: 'generated, javascript, web 2.0, ajax',
                creator: 'author'
            });
            doc.autoTable(dataHeader, table, {
                headerStyles: {fillColor: [16, 73, 137], fontSize: 9},
                bodyStyles: {fillColor: [156, 186, 189], fontSize: 9},
                columnStyles: {
                    id: {fillColor: 255}
                },
                margin: {top: 20, bottom: 20},
                startY: 85,
                addPageContent: function (data) {
                    doc.setFont("cambria");
                    doc.setFontSize(9);
                    doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
                    doc.setFontType("italic");
                    doc.text("Paraqum Network Analyzer", 250, 12);
                    doc.setDrawColor(1, 1, 1);
                    doc.line(5, 15, 290, 15);
                    doc.line(5, height - 15, 290, height - 15);
                    doc.text(pagenum.toString(), 280, height - 10);
                    pagenum++;
                }
            });
            doc.save('Detailed Usage Report - ' + saveword + '.pdf');
        });
    });
};

//Summary PDFs

var download_summary = function () {
    var pagenum = 1;
    var Time = $('#Report_Summary_Header').text();
    var doc = new jsPDF('p');

    $('a.dt-button.jsonButton').click();

    var table1_old = data_det_rep_source_table.body;
    var dataHeader_s_old = data_det_rep_source_table.header;
    var table2_old = data_det_rep_des_table.body;
    var dataHeader_d_old = data_det_rep_des_table.header;
    var table3_old = data_det_rep_app_table.body;
    var dataHeader_a_old = data_det_rep_app_table.header;
    var table4_old = data_det_rep_port_table.body;
    var dataHeader_p_old = data_det_rep_port_table.header;

    var table1 = [];
    for (var i in table1_old) {
        table1.push([]);
        for (var j in table1_old[i]) {
            if (j < 5) {
                table1[i].push(table1_old[i][j]);
            }
        }
    }
    var dataHeader_s = [];
    for (var i in dataHeader_s_old) {
        if (i < 5) {
            dataHeader_s.push(dataHeader_s_old[i]);
        }
    }
    var table2 = [];
    for (var i in table2_old) {
        table2.push([]);
        for (var j in table2_old[i]) {
            if (j < 6) {
                table2[i].push(table2_old[i][j]);
            }
        }
    }

    var dataHeader_d = [];
    for (var i in dataHeader_d_old) {
        if (i < 6) {
            dataHeader_d.push(dataHeader_d_old[i]);
        }
    }
    var table3 = [];
    for (var i in table3_old) {
        table3.push([]);
        for (var j in table3_old[i]) {
            if (j != 0 & j < 6) {
                table3[i].push(table3_old[i][j]);
            }
        }
    }
    var dataHeader_a = [];
    for (var i in dataHeader_a_old) {
        if (i != 0 & i < 6) {
            dataHeader_a.push(dataHeader_a_old[i]);
        }
    }
    var table4 = [];
    for (var i in table4_old) {
        table4.push([]);
        for (var j in table4_old[i]) {
            if (j != 0 & j < 6) {
                table4[i].push(table4_old[i][j]);
            }
        }
    }
    var dataHeader_p = [];
    for (var i in dataHeader_p_old) {
        if (i != 0 & i < 6) {
            dataHeader_p.push(dataHeader_p_old[i]);
        }
    }
    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    var imgData0, imgData1, imgData2, imgData3;
    doc.setFont("cambria");
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.setLineWidth(8);
    doc.setDrawColor(47, 122, 154);
    doc.line(5, 28, 205, 28);
    doc.setLineWidth(0.1);
    doc.setTextColor(255, 255, 255);
    doc.text(Time, 30, 30);
    doc.setTextColor(0, 0, 0);
    doc.setFontType("normal");
    doc.setFontSize(9);
    html2canvas($("#sources_flot"), {
        allowTaint: true,
        onrendered: function (canva) {
            imgData0 = canva.toDataURL('image/png');
        }
    }).then(function () {
        html2canvas($("#destinations_flot"), {
            allowTaint: true,
            onrendered: function (canva) {
                imgData1 = canva.toDataURL('image/png');
            }
        }).then(function () {
            html2canvas($("#applications_flot"), {
                allowTaint: true,
                onrendered: function (canva) {
                    imgData2 = canva.toDataURL('image/png');
                }
            }).then(function () {
                html2canvas($("#port_flot"), {
                    allowTaint: true,
                    onrendered: function (canva) {
                        imgData3 = canva.toDataURL('image/png');
                    }
                }).then(function () {
                    doc.setFontType("bold");
                    doc.setFontSize(12);
                    doc.text("Top Sources", 95, 40);
                    doc.addImage(imgData0, 'PNG', 15, 50, 72.5, 60);
                    doc.setProperties({
                        title: 'Top Usage PDF',
                        subject: 'USAGE REPORT',
                        author: 'author',
                        keywords: 'generated, javascript, web 2.0, ajax',
                        creator: 'author'
                    });
                    doc.autoTable(dataHeader_s, table1, {
                        headerStyles: {fillColor: [16, 73, 137], fontSize: 9},
                        bodyStyles: {fillColor: [156, 186, 189], fontSize: 9},
                        columnStyles: {
                            id: {fillColor: 255}
                        },
                        margin: {top: 20, bottom: 20},
                        startY: 120,
                        addPageContent: function (data) {
                            doc.setFontSize(9);
                            doc.setFont("cambria");
                            doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
                            doc.setFontType("italic");
                            doc.text("Paraqum Network Analyzer", 165, 12);
                            doc.setDrawColor(1, 1, 1);
                            doc.line(5, 15, 205, 15);
                            doc.line(5, height - 15, 205, height - 15);
                            doc.text(pagenum.toString(), 200, height - 10);
                            pagenum++;
                        }
                    });
                }).then(function () {
                    doc.addPage();
                    doc.setFontType("bold");
                    doc.setFontSize(12);
                    doc.text("Top Destinations", 95, 30);
                    doc.addImage(imgData1, 'PNG', 15, 50, 72.5, 60);
                    doc.setProperties({
                        title: 'Top Usage PDF',
                        subject: 'USAGE REPORT',
                        author: 'author',
                        keywords: 'generated, javascript, web 2.0, ajax',
                        creator: 'author'
                    });

                    doc.autoTable(dataHeader_d, table2, {
                        headerStyles: {fillColor: [16, 73, 137], fontSize: 9},
                        bodyStyles: {fillColor: [156, 186, 189], fontSize: 9},
                        columnStyles: {
                            id: {fillColor: 255}
                        },
                        margin: {top: 20, bottom: 20},
                        startY: 120,
                        addPageContent: function (data) {
                            doc.setFontSize(9);
                            doc.setFont("cambria");
                            doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
                            doc.setFontType("italic");
                            doc.text("Paraqum Network Analyzer", 165, 12);
                            doc.setDrawColor(1, 1, 1);
                            doc.line(5, 15, 205, 15);
                            doc.line(5, height - 15, 205, height - 15);
                            doc.text(pagenum.toString(), 200, height - 10);
                            pagenum++;
                        }
                    });
                }).then(function () {
                    doc.addPage();
                    doc.setFontType("bold");
                    doc.setFontSize(12);
                    doc.text("Top Applications", 95, 30);
                    doc.addImage(imgData2, 'PNG', 15, 50, 72.5, 60);
                    doc.setProperties({
                        title: 'Top Usage PDF',
                        subject: 'USAGE REPORT',
                        author: 'author',
                        keywords: 'generated, javascript, web 2.0, ajax',
                        creator: 'author'
                    });
                    doc.autoTable(dataHeader_a, table3, {
                        headerStyles: {fillColor: [16, 73, 137], fontSize: 9},
                        bodyStyles: {fillColor: [156, 186, 189], fontSize: 9},
                        columnStyles: {
                            id: {fillColor: 255}
                        },
                        margin: {top: 20, bottom: 20},
                        startY: 120,
                        addPageContent: function (data) {
                            doc.setFontSize(9);
                            doc.setFont("cambria");
                            doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
                            doc.setFontType("italic");
                            doc.text("Paraqum Network Analyzer", 165, 12);
                            doc.setDrawColor(1, 1, 1);
                            doc.line(5, 15, 205, 15);
                            doc.line(5, height - 15, 205, height - 15);
                            doc.text(pagenum.toString(), 200, height - 10);
                            pagenum++;
                        }
                    });
                }).then(function () {
                    doc.addPage();
                    doc.setFontType("bold");
                    doc.setFontSize(12);
                    doc.text("Top Ports", 95, 30);
                    doc.addImage(imgData3, 'PNG', 15, 50, 72.5, 60);
                    doc.setProperties({
                        title: 'Top Usage PDF',
                        subject: 'USAGE REPORT',
                        author: 'author',
                        keywords: 'generated, javascript, web 2.0, ajax',
                        creator: 'author'
                    });
                    doc.autoTable(dataHeader_p, table4, {
                        headerStyles: {fillColor: [16, 73, 137], fontSize: 9},
                        bodyStyles: {fillColor: [156, 186, 189], fontSize: 9},
                        columnStyles: {
                            id: {fillColor: 255}
                        },
                        margin: {top: 20, bottom: 20},
                        startY: 120,
                        addPageContent: function (data) {
                            doc.setFontSize(9);
                            doc.setFont("cambria");
                            doc.addImage(img.onload(doc), 'PNG', 5, 6, 40, 10);
                            doc.setFontType("italic");
                            doc.text("Paraqum Network Analyzer", 165, 12);
                            doc.setDrawColor(1, 1, 1);
                            doc.line(5, 15, 205, 15);
                            doc.line(5, height - 15, 205, height - 15);
                            doc.text(pagenum.toString(), 200, height - 10);
                            pagenum++;
                        }
                    });
                    doc.save('Summary Report.pdf');
                });
            });
        });
    });
};

//// ============= Bandwidth reporting ===========================////////////////////

var bwr_plot = [];
var bwr_dbuff = [];
var bwr_cbuff = [];
var bwr_color = [];

var bwr_graph_init = function (div, color, gid) {

//    if (bwr_dbuff[gid] == null) {
//        bwr_dbuff[gid] = [];
//        var clr = [];
//        clr.push([color]);
//        bwr_cbuff[gid] = clr;
//        lu_vname[gid] = [];
//        bwr_color[gid] = [color];
//        lu_last_update_time[gid] = 0;
//    }
//    console.log(bwr_dbuff[gid])
//    console.log(bwr_cbuff[gid])

    var graph = new Dygraph(document.getElementById(div), bwr_dbuff[gid], bwr_cbuff[gid], 0, gid,
            {
                drawPoints: true,
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
                }
            });

    bwr_plot[gid] = graph;
    return  gid;
};

var validate_hist_data_availability = function (id, count) {
    if (id == bwh_ulg_id) {
        $('#pq_det_rep_bw_ul_plot_loading').hide();
        if (count == 0) {
            $('#pq_det_rep_bw_ul_plot_no_avil').show();
        }
    }
    if (id == bwh_dlg_id) {
        $('#pq_det_rep_bw_dl_plot_loading').hide();
        if (count == 0) {
            $('#pq_det_rep_bw_dl_plot_no_avil').show();
        }
    }
};

var show_det_rep_bw_history_loading = function () {
    $('#pq_det_rep_bw_ul_plot_loading').show();
    $('#pq_det_rep_bw_dl_plot_loading').show();
};

var hide_det_rep_bw_history_loading = function () {
    $('#pq_det_rep_bw_ul_plot_loading').hide();
    $('#pq_det_rep_bw_dl_plot_loading').hide();
};

var show_det_rep_bw_no_data = function () {
    $('#pq_det_rep_bw_ul_plot_no_data ').show();
    $('#pq_det_rep_bw_dl_plot_no_data ').show();
};

var hide_det_rep_bw_no_data = function () {
    $('#pq_det_rep_bw_ul_plot_no_data ').hide();
    $('#pq_det_rep_bw_dl_plot_no_data ').hide();
};

var show_det_rep_bw_no_avil = function () {
    $('#pq_det_rep_bw_ul_plot_no_avil').show();
    $('#pq_det_rep_bw_dl_plot_no_avil').show();
};

var hide_det_rep_bw_no_avil = function () {
    $('#pq_det_rep_bw_ul_plot_no_avil').hide();
    $('#pq_det_rep_bw_dl_plot_no_avil').hide();
};


//// ============= Detiled Report Summary ===========================////////////////////

//get top element

get_summary_det_rep_top_elements = function () {

    var ds_min;
    var de_min;

    if ($("input[name=det_report_mode]:checked").val() === '1') {
        var ds = new Date(det_rep_stime);
        var de = new Date(det_rep_etime);
        ds_min = (ds.getTime() / (1000 * 60)).toFixed(0);
        de_min = (de.getTime() / (1000 * 60)).toFixed(0);

    } else if ($("input[name=det_report_mode]:checked").val() === '2') {
        var startDateTime_temp = $('#det_rep_custom_StartDateTime').data("DateTimePicker").date();
        var endDateTime_temp = $('#det_rep_custom_EndDateTime').data("DateTimePicker").date();
        det_rep_stime = startDateTime_temp;
        det_rep_etime = endDateTime_temp;
        var ds = new Date(startDateTime_temp);
        var de = new Date(endDateTime_temp);
        ds_min = (ds.getTime() / (1000 * 60)).toFixed(0);
        de_min = (de.getTime() / (1000 * 60)).toFixed(0);
    }

    get_summary_det_rep_data(ds_min, de_min, 0, 0, 0, 0, 0, 0, 0, 0, PQDTR_REQ_TOP_SRC, 0, 0);
    get_summary_det_rep_data(ds_min, de_min, 0, 0, 0, 0, 0, 0, 0, 0, PQDTR_REQ_TOP_DST, 0, 0);
    get_summary_det_rep_data(ds_min, de_min, 0, 0, 0, 0, 0, 0, 0, 0, PQDTR_REQ_TOP_APP, 0, 0);
    get_summary_det_rep_data(ds_min, de_min, 0, 0, 0, 0, 0, 0, 0, 0, PQDTR_REQ_TOP_PORTS, 0, 0);
};

//get top element data

get_summary_det_rep_data = function (stime, etime, sip_1, dip_1, sip_2, dip_2, sport, dport, vid, prot, type, app_id, user) {

//    console.log(stime + '_' + etime + '_' + sip_1 + '_' + dip_1 + '_' + sip_2 + '_' + dip_2 + '_' + sport + '_' + dport + '_' + vid + '_' + prot + '_' + type + '_' + app_id + '_' + user)

    var cmd_buffer = update_det_rep_acjs_elements(stime, etime, sip_1, dip_1, sip_2, dip_2, pq_2_16_32(sport, parseInt(dport)), pq_1_16_2_8_32(parseInt(vid), parseInt(prot), type), app_id, user);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        timeout: 600000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {

        var req = new Uint32Array(data);
        var length = req[0];
        var s_time = req[1];
        var e_time = req[2];
        var ses_count = req[3];
        var total_sent = parseFloat((uint32_float(req[4]) / 8) * 1000000);
        var total_rec = parseFloat((uint32_float(req[5]) / 8) * 1000000);
        var url_q_id = req[6];
        var url_count = req[7];
//        var db_type;
//        var pkt_sent;
//        var pkt_rec;

        switch (type) {
            case PQDTR_REQ_TOP_SRC:
                act_s_time = moment(new Date(s_time * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A');
                act_e_time = moment(new Date(e_time * 60 * 1000)).format(' Do MMM YYYY hh:mm:ss A');

                $('#Report_Summary_Header').text('Summary Report - ' + act_s_time + ' to ' + act_e_time);

                Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_sum_source_table);
                break;
            case PQDTR_REQ_TOP_DST:
                var table_data = [type, req, ses_count, total_sent, total_rec, det_rep_sum_dest_table];
                if (url_count !== 0) {
                    Det_Rep_URL_Req(url_q_id, table_data, Display_Det_Rep_Table);
                } else
                    Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_sum_dest_table);
                break;
            case PQDTR_REQ_TOP_APP:
                Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_sum_app_table);
                break;
            case PQDTR_REQ_TOP_PORTS:
                Display_Det_Rep_Table(type, req, ses_count, total_sent, total_rec, det_rep_sum_port_table);
                break;
        }
        init_summary_plot(type, req);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//plot initialize

function init_summary_plot(type, data) {

    var xmin_d = -1;
    var xmax_d = 9;
    var plot_d;
    var bar_index;
    var data_d = [];
    var ticks_d = [];
    var plot_div;

    switch (type) {
        case PQDTR_REQ_TOP_SRC:
            plot_div = 'det_rep_deep_src_holder';

            for (var count = 8; count < data.length; count += 5) {
                bar_index = ((count - 2) / 5) - 1;
                if (data[count + 1] !== 0) {
                    ticks_d.push([bar_index, rmt_addr_user_list[data[count + 1]]]);
                } else
                    ticks_d.push([bar_index, num2dot(data[count])]);

                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            break;

        case PQDTR_REQ_TOP_DST:

            plot_div = 'det_rep_deep_dst_holder';
            for (var count = 8; count < data.length; count += 5) {
                bar_index = ((count - 2) / 5) - 1;
                ticks_d.push([bar_index, num2dot(data[count])]);
                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            break;

        case PQDTR_REQ_TOP_APP:

            plot_div = 'det_rep_deep_app_holder';
            for (var count = 8; count < data.length; count += 5) {
                bar_index = ((count - 2) / 5) - 1;
                if (data[count] < 65536) {
                    ticks_d.push([bar_index, application_list[data[count]]]);
                } else
                    ticks_d.push([bar_index, pq_services_list[parseInt(data[count] - 65536)]]);

                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            break;

        case PQDTR_REQ_TOP_PORTS:

            plot_div = 'det_rep_deep_port_holder';
            for (var count = 8; count < data.length; count += 5) {
                bar_index = ((count - 2) / 5) - 1;
                ticks_d.push([bar_index, 'PORT ' + data[count]]);
                data_d.push([bar_index, parseFloat((uint32_float(data[count + 3]) / 8) * 1000000) + parseFloat((uint32_float(data[count + 4]) / 8) * 1000000)]);
            }
            break;
    }

    var plot_d = $.plot("#" + plot_div, [data_d], {
        series: {
            bars: {
                show: true,
                align: "center",
                barWidth: 0.5,
                lineWidth: 0,
                fillColor: {
                    colors: ["#944C2D", "#E8E868"]
                }
            }
        },
        grid: {
            hoverable: true,
            borderWidth: 0.2,
            autoHighlight: true
        },
        xaxis: {
            mode: "categories",
            tickLength: 0,
            ticks: ticks_d,
            min: xmin_d,
            max: xmax_d
        },
        yaxis: {
            tickFormatter: function (val, axis) {
                return "<label style='font-size:10px; font-style:Georgia'>" + pq_get_usage_det_rep(val) + "</label>";
            }
        }
    });

    $("#" + plot_div).UseTooltip(ticks_d);
}

/////////////////////////// ============ ///////////////


var Get_Input_Data = function () {

//    var id = ['det_rep_sip1', 'det_rep_sip1_range', 'det_rep_sip2_range', 'det_rep_sip1_subnet', 'det_rep_sip2_subnet', 'det_rep_dip1', 'det_rep_dip1_range', 'det_rep_dip2_range', 'det_rep_dip1_subnet', 'det_rep_dip2_subnet', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app'];
//    var data = [];
//    for (var i in id) {
//        data.push($('#' + id[i]).val());
//    }

    var data = get_det_filter_param();

//    console.log(data);
    return data;
};

var Set_Input_Data = function (_prv_input_data) {
    var id = ['det_rep_sip1', 'det_rep_sip1_range', 'det_rep_sip2_range', 'det_rep_sip1_subnet', 'det_rep_sip2_subnet', 'det_rep_dip1', 'det_rep_dip1_range', 'det_rep_dip2_range', 'det_rep_dip1_subnet', 'det_rep_dip2_subnet', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app'];
    if (_prv_input_data !== null) {
        $('#det_rep_filter_add').click();

        for (var i in _prv_input_data) {
            $('#' + id[i]).val(_prv_input_data[i]);
        }
    }
};

get_det_filter_param = function () {

    var s_ip1;
    var d_ip1;
    var s_ip2;
    var d_ip2;
    var d_port;
    var vlan;

    if ($("#det_rep_filter_src_type option:selected").val() === '1') {

        if ($("#det_rep_sip1_range").val() !== 'Any') {
            s_ip1 = dot2num($("#det_rep_sip1_range").val());
        } else
            s_ip1 = 0;

        if ($("#det_rep_sip2_range").val() !== 'Any') {
            s_ip2 = dot2num($("#det_rep_sip2_range").val());
        } else
            s_ip2 = s_ip1;

    } else if ($("#det_rep_filter_src_type option:selected").val() === '2') {
        if ($("#det_rep_sip2_subnet").val() !== 'Any') {
            var src_sbnet = getIpRangeFromAddressAndNetmask($("#det_rep_sip1_subnet").val(), $("#det_rep_sip2_subnet").val());
            s_ip1 = dot2num(src_sbnet[0]);
            s_ip2 = dot2num(src_sbnet[1]);
        } else {
            s_ip1 = 0;
            s_ip2 = 0;
        }
    } else {
        if ($("#det_rep_sip1").val() !== 'Any') {
            s_ip1 = dot2num($("#det_rep_sip1").val());
        } else
            s_ip1 = 0;

        s_ip2 = s_ip1;
    }

    if ($("#det_rep_filter_dest_type option:selected").val() === '1') {

        if ($("#det_rep_dip1_range").val() !== 'Any') {
            d_ip1 = dot2num($("#det_rep_dip1_range").val());
        } else
            d_ip1 = 0;

        if ($("#det_rep_dip2_range").val() !== 'Any') {
            d_ip2 = dot2num($("#det_rep_dip2_range").val());
        } else
            d_ip2 = d_ip1;

    } else if ($("#det_rep_filter_dest_type option:selected").val() === '2') {
        if ($("#det_rep_dip2_subnet").val() !== 'Any') {
            var dst_sbnet = getIpRangeFromAddressAndNetmask($("#det_rep_dip1_subnet").val(), $("#det_rep_dip2_subnet").val());
            d_ip1 = dot2num(dst_sbnet[0]);
            d_ip2 = dot2num(dst_sbnet[1]);
        } else {
            d_ip1 = 0;
            d_ip2 = 0;
        }
    } else {
        if ($("#det_rep_dip1").val() !== 'Any') {
            d_ip1 = dot2num($("#det_rep_dip1").val());
        } else
            d_ip1 = 0;

        d_ip2 = d_ip1;
    }

    if ($("#det_rep_dport").val() !== 'Any') {
        d_port = $("#det_rep_dport").val();
    } else
        d_port = 0;

    if ($("#det_rep_vlan").val() !== 'None') {
        vlan = $("#det_rep_vlan").val();
    } else
        vlan = 0;

    var prot = $("#det_rep_protocol option:selected").val();
    var app = $("#det_rep_app option:selected").val();
    var user = $("#det_rep_ad_usr option:selected").val();

    var param = {
        sip: s_ip1,
        sipr: s_ip2,
        dip: d_ip1,
        dipr: d_ip2,
        dport: d_port,
        vid: vlan,
        prot: prot,
        app: app,
        user: user
    };

    return param;
};

get_det_null_filter_param = function () {

    var param = {
        sip: 0,
        sipr: 0,
        dip: 0,
        dipr: 0,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0,
        user: 0
    };

    return param;
};

get_ad_user = function (id) {
    if (!id) {
        return '-';
    } else {
        if (rmt_addr_user_list[id])
            return rmt_addr_user_list[id];
        else
            return '-';
    }
};

function clear_det_rep_filter() {
    var default_val = ["Any", "Any", "Any", "Any", "32", "Any", "Any", "Any", "Any", "32", "Any", "None", "0", "0", "0"];
    var id = ['det_rep_sip1', 'det_rep_sip1_range', 'det_rep_sip2_range', 'det_rep_sip1_subnet', 'det_rep_sip2_subnet', 'det_rep_dip1', 'det_rep_dip1_range', 'det_rep_dip2_range', 'det_rep_dip1_subnet', 'det_rep_dip2_subnet', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app', 'det_rep_ad_usr'];
    for (var i in default_val) {
        $('#' + id[i]).val(default_val[i]);
    }

    if (CURRENT_WINDOW === WINDOW_REPORT_BANDWIDTH || CURRENT_WINDOW === WINDOW_REPORT_SRC || CURRENT_WINDOW === WINDOW_REPORT_DES || CURRENT_WINDOW === WINDOW_REPORT_APP || CURRENT_WINDOW === WINDOW_REPORT_PORT) {
        filter_det_reporting();
    } else if (CURRENT_WINDOW === WINDOW_REPORT_DET_SRC) {
        filter_deep_det_rep_elements(PQDTR_REQ_TOP_SRC);
    } else if (CURRENT_WINDOW === WINDOW_REPORT_DET_DES) {
        filter_deep_det_rep_elements(PQDTR_REQ_TOP_DST);
    } else if (CURRENT_WINDOW === WINDOW_REPORT_DET_APP) {
        filter_deep_det_rep_elements(PQDTR_REQ_TOP_APP);
    } else if (CURRENT_WINDOW === WINDOW_REPORT_DET_PORT) {
        filter_deep_det_rep_elements(PQDTR_REQ_TOP_PORTS);
    } else
        console.log("Invalid filter type");
}

function click_det_rep_csv_btn() {
    $('a.dt-button.csvButton').click();
}


var ldap_server_table;
var dhcp_server_table;
var ldap_server_data;
var dhcp_server_data;

var ad_user_list_table;
var ad_group_list_table;
var dhcp_list_table;

var rmt_addr_user_list;
var rule_rmt_addr_user_list;
var ad_group_list;

//var ad_user_ip_map;
var rmt_addr_user_list_data;
var ad_group_list_data;

var ldap_add_idlist = ['add_ldap_name', 'add_ldap_ip', 'add_ldap_port', 'add_ldap_udn', 'add_ldap_pswd'];
var ldap_add_reqidlist = ['ldap_namereqd_add', 'ldap_ipreqd_add', 'ldap_portreqd_add', 'ldap_udnreqd_add', 'ldap_pswdreqd_add'];
var ldap_edit_idlist = ['edit_ldap_name', 'edit_ldap_ip', 'edit_ldap_port'];
var ldap_edit_reqidlist = ['ldap_namereqd_edit', 'ldap_ipreqd_edit', 'ldap_portreqd_edit'];

function CreateLdap() {

    var modal = document.getElementById('CreateLdapModal');
    var span = document.getElementById('CloseNewLdap');
    var cancel = document.getElementById('clearLdapAdd');
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    cancel.onclick = function () {
        for (var ele in ldap_add_idlist) {
            $("#" + ldap_add_reqidlist[ele]).hide();
            if (ele !== 2) {
                $('#' + ldap_add_idlist[ele]).val("");
            } else {
                $('#' + ldap_add_idlist[ele]).val("389");
            }
        }
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

add_nw_ldap_server = function (add_ldap_name, add_ldap_ip, add_ldap_port, add_ldap_udn, add_ldap_pswd) {

    var name_udn = add_ldap_name + '$' + add_ldap_udn;

    var cmd_buffer = update_ldap_acjs_elements(NA_AD_CONF_PROFILE_ADD, name_udn, add_ldap_pswd, add_ldap_ip, add_ldap_port, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        DisplayStatus(data.charCodeAt(0));
        $('#clearLdapAdd').click();
        $('#CloseNewLdap').click();
        Update_ldap_Data();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function Update_ldap_Data() {
    ldap_server_data = [];
//    user_profile_lookup_list = [];
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_AD_CONF_PROFILE_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        ldap_server_data = data.split(";");
        Display_ldap_table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_ldap_table() {
    ldap_server_table.clear().draw();
    for (var i = 0; i < ldap_server_data.length - 1; i++) {
        var element = ldap_server_data[i].split("&");
        ldap_server_table.row.add([element[0], element[1], num2dotR(element[2]), element[3], set_default_btn(parseInt(element[4])), set_ad_connction_status(element[5])]);
    }
    ldap_server_table.draw(false);
}

function Ldap_server_set_default(id) {

    var cmd_buffer = update_ldap_acjs_elements(NA_AD_CONF_PROFILE_SETDEF, '', '', id, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_ldap_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

set_default_btn = function (flag) {
    if (flag) {
        return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Default</button>";
    } else
        return "<button class='pq_session_wbtn' >Set Default</button>";
};

function EditLdap() {
    var edit_ldap_server_elements = ldap_server_table.row('.selected').data();
    var modal = document.getElementById('EditLdapModal');
    var span = document.getElementById('CloseEditLdap');
    var clear = document.getElementById('clearLdapEdit');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    clear.onclick = function () {
        for (var ele in ldap_edit_idlist) {
            $("#" + ldap_edit_reqidlist[ele]).hide();
            $('#' + ldap_edit_idlist[ele]).val(edit_ldap_server_elements[parseInt(ele) + 1]);
        }
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    for (var ele in ldap_edit_idlist) {
        $("#" + ldap_edit_reqidlist[ele]).hide();
        $('#' + ldap_edit_idlist[ele]).val(edit_ldap_server_elements[parseInt(ele) + 1]);
    }
    $('#edit_ldap_name').attr('disabled', true);
}

edit_ldap_server = function (id, edit_ldap_ip, edit_ldap_port, edit_ldap_udn, edit_ldap_pswd) {

    var cmd_buffer = update_ldap_acjs_elements(NA_AD_CONF_PROFILE_UPDATE, edit_ldap_udn, edit_ldap_pswd, id, edit_ldap_ip, edit_ldap_port, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_ldap_Data();
        Clear();
        DisplayStatus(data.charCodeAt(0));
        $('#clearLdapEdit').click();
        $('#CloseEditLdap').click();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });

};

function DeleteLdap() {

    var key = parseInt((ldap_server_table.row('.selected').data())[0]);

    var cmd_buffer = update_ldap_acjs_elements(NA_AD_CONF_PROFILE_DELETE, '', '', key, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_ldap_Data();
        Clear();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

////// DHCP //////////

function CreateDhcpServer() {

    var dhcp_add_idlist = ['add_dhcp_name', 'add_dhcp_ip'];
    var dhcp_add_reqidlist = ['dhcp_namereqd_add', 'dhcp_ipreqd_add'];

    var modal = document.getElementById('CreateDHCPServerModal');
    var span = document.getElementById('CloseNewDHCPServerModal');
    var clear = document.getElementById('clearDhcpAdd');
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    clear.onclick = function () {
        for (var ele in dhcp_add_idlist) {
            $("#" + dhcp_add_reqidlist[ele]).hide();
//            if (ele !== 2) {
            $('#' + dhcp_add_idlist[ele]).val("");
//            } else {
//                $('#' + ldap_add_idlist[ele]).val("389");
//            }
        }
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

add_dhcp_server_to_list = function (name, ip) {

    var cmd_buffer = update_acjs_elements(NA_DHCP_CONF_PROFILE_ADD, name, ip, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_DHCP_Data();
        $('#CloseNewDHCPServerModal').click();
        $('#clearDhcpAdd').click();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function Update_DHCP_Data() {
    dhcp_server_data = [];
//    user_profile_lookup_list = [];
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_DHCP_CONF_PROFILE_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        dhcp_server_data = data.split(";");
        Display_dhcp_server_table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_dhcp_server_table() {
    dhcp_server_table.clear().draw();
//    dhcp_server_data = ['1&Himantha&192.168.1.258&1']
    for (var i = 0; i < dhcp_server_data.length - 1; i++) {
        var element = dhcp_server_data[i].split("&");
        dhcp_server_table.row.add([element[0], element[1], num2dot(element[2]), set_default_btn(parseInt(element[3])), set_ad_connction_status(element[4])]);
    }
    dhcp_server_table.draw(false);
}

function Dhcp_server_set_default(id) {

    var cmd_buffer = update_ldap_acjs_elements(NA_DHCP_CONF_PROFILE_SETDEF, '', '', id, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_DHCP_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function EditDhcpServer() {

    var dhcp_edit_idlist = ['dhcp_name_edit', 'dhcp_ip_edit'];
    var dhcp_edit_reqidlist = ['dhcp_namereqd_edit', 'dhcp_ipreqd_edit'];
    var edit_dhcp_server_elements = dhcp_server_table.row('.selected').data();
    var modal = document.getElementById('EditDHCPServerModal');
    var span = document.getElementById('CloseEditDHCPServerModal');
    var cancel = document.getElementById('clearDhcpEdit');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    cancel.onclick = function () {
        for (var ele in dhcp_edit_idlist) {
            $("#" + dhcp_edit_reqidlist[ele]).hide();
            $('#' + dhcp_edit_idlist[ele]).val(edit_dhcp_server_elements[parseInt(ele) + 1]);
        }
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    for (var ele in dhcp_edit_idlist) {
        $("#" + dhcp_edit_reqidlist[ele]).hide();
        $('#' + dhcp_edit_idlist[ele]).val(edit_dhcp_server_elements[parseInt(ele) + 1]);
    }
}

edit_dhcp_server_of_list = function (key, name, ip) {

    var cmd_buffer = update_acjs_elements(NA_DHCP_CONF_PROFILE_UPDATE, name, key, ip, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_DHCP_Data();
        show_acjs_status_modal(data.charCodeAt(0));
        $('#clearDhcpEdit').click();
        $('#CloseEditDHCPServerModal').click();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_dhcp_server_from_list = function () {

    var key = parseInt((dhcp_server_table.row('.selected').data())[0]);

    var cmd_buffer = update_acjs_elements(NA_DHCP_CONF_PROFILE_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_DHCP_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//dhcp_server_status = function (id) {
//    if (id === '1')
//        return "<button style='pointer-events: none' class='pq_session_wbtn'>Active</button>";
//    else
//        return "<button style='pointer-events: none' class='pq_session_wbtn'>Active</button>";
//};

//// AD list

function Update_AD_User_List() {
    var cookie = $.cookie('pqsf');
    rmt_addr_user_list = [];
    rule_rmt_addr_user_list = [];
    rmt_addr_user_list_data = [];
//    ad_user_ip_map = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RADDR_ITEM_LIST, 0);
    req[1] = PQ_NA_REMAD_TYPE_AD_USER;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            rmt_addr_user_list_data[i] = row[i];
            var element = row[i].split("&");
            rule_rmt_addr_user_list[element[0]] = element[2];
            rmt_addr_user_list[element[1]] = element[2];
        }
        if (ad_user_list_table) {
            Display_AD_User_List_Table();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_AD_User_List_Table() {
    ad_user_list_table.clear().draw();
//    rmt_addr_user_list_data = ['0&DMD&3232235816&1', '1&Himantha&0&2'];
    for (var i = 0; i < rmt_addr_user_list_data.length; i++) {
        var element = rmt_addr_user_list_data[i].split("&");

        if (element[3] === '0') {
            ad_user_list_table.row.add([element[1], element[2], '-', element[4], set_ad_active_status(parseInt(element[5])), '']);
        } else
            ad_user_list_table.row.add([element[1], element[2], num2dot(element[3]), element[4], set_ad_active_status(parseInt(element[5])), '']);
    }
    ad_user_list_table.draw(false);
}

function Update_AD_Group_List() {
    var cookie = $.cookie('pqsf');
    ad_group_list = [];
    ad_group_list_data = [];
//    ad_user_ip_map = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RADDR_ITEM_LIST, 0);
    req[1] = PQ_NA_REMAD_TYPE_AD_GROUP;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            ad_group_list_data[i] = row[i];
            var element = row[i].split("&");
//            ad_user_ip_map[element[0]] = [element[1], element[2]];
            ad_group_list[element[0]] = element[2];
        }
        if (ad_group_list_table) {
            Display_AD_Group_List_Table();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_AD_Group_List_Table() {
//    console.log(ad_group_list_data)
    ad_group_list_table.clear().draw();
//    rmt_addr_user_list_data = ['0&DMD&3232235816&1', '1&Himantha&0&2'];
    for (var i = 0; i < ad_group_list_data.length; i++) {
        var element = ad_group_list_data[i].split("&");
        ad_group_list_table.row.add([element[0], element[2], element[3], element[4], set_ad_active_status(parseInt(element[5]))]);
    }
    ad_group_list_table.draw(false);
}

get_ad_group_user_info = function (id) {

    $('#crete_ad_grp_usr_info_content').empty();
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RGROUP_ITEM_LIST, 0);
    req[1] = id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            var element = row[i].split("&");
            if (element[2] !== '0') {
                $('#crete_ad_grp_usr_info_content').append('<a style = "font-family:Helvetica; font-size: 12px; text-decoration:none"> &#9632  ' + rmt_addr_user_list[element[1]] + ' (' + num2dot(element[2]) + ') ' + '</a><br>');
            } else {
                $('#crete_ad_grp_usr_info_content').append('<a style = "font-family:Helvetica; font-size: 12px; text-decoration:none"> &#9632  ' + rmt_addr_user_list[element[1]] + '</a><br>');
            }
        }
//        $('#CreateADGroupUserInfoContent').css('height', parseInt($('#crete_ad_grp_usr_info_content').height() + 130) + 'px');

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function show_ad_group_user_info_modal() {
    var modal = document.getElementById('CreateADGroupUserInfo');
    var span = document.getElementById('CloseADGroupUserInfo');
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

//// DHCP list

function Update_DHCP_List() {
    var cookie = $.cookie('pqsf');
    rmt_addr_user_list = [];
    rule_rmt_addr_user_list = [];
    rmt_addr_user_list_data = [];

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RADDR_ITEM_LIST, 0);
    req[1] = PQ_NA_REMAD_TYPE_DHCP_USER;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            rmt_addr_user_list_data[i] = row[i];
            var element = row[i].split("&");
            rule_rmt_addr_user_list[element[0]] = element[2];
            rmt_addr_user_list[element[1]] = element[2];
        }
        if (dhcp_list_table) {
            Display_DHCP_List_Table();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_DHCP_List_Table() {
    dhcp_list_table.clear().draw();
//    rmt_addr_user_list_data = ['0&DMD&3232235816&1000&2000&2', '1&Himantha&0&3000&5000&1'];
    for (var i = 0; i < rmt_addr_user_list_data.length; i++) {
//        console.log(rmt_addr_user_list_data)
        var element = rmt_addr_user_list_data[i].split("&");
        if (element[3] === '0') {
            dhcp_list_table.row.add([element[1], element[2], '-', IntToMacAddress(Number(element[5]), Number(element[4])), element[6], set_ad_active_status(parseInt(element[7])), '']);
        } else
            dhcp_list_table.row.add([element[1], element[2], num2dot(element[3]), IntToMacAddress(Number(element[5]), Number(element[4])), element[6], set_ad_active_status(parseInt(element[7])), '']);
    }
    dhcp_list_table.draw(false);
}

set_ad_active_status = function (flag) {
    if (!flag) {
        return "<a style='color:#1aca29; margin-right:5px; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Active</button>";
    } else
        return "<a style='color:#b3bbb4; margin-right:5px; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Inactive</button>";
};

set_ad_connction_status = function (flag) {
    if (flag) {
        return "<a style='color:#1aca29; margin-right:5px; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Connected</button>";
    } else
        return "<a style='color:#b3bbb4; margin-right:5px; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Disconnected</button>";
};
function validateEmail(email) {
    var patt = /\w+(\.\w+)*\@(\w+\.)+[a-z]{2,3}/;
    var result = patt.test(email);
    return result;
}

function validateIP(ip) {
    var patt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*$/;
    var result = patt.test(ip);
    return result;
}

function show_acjs_status_modal(code) {
    switch (code) {
        case 2:
            InvalidStatus("Operation failed!");
            break;
        case 4:
            InvalidStatus("New Entry already exists in the System!");
            break;
        case 6:
            InvalidStatus("Invalid File!");
            break;            
        case 7:
            InvalidStatus("Outdated Installation File!");
            break;            
        case 10:
            SuccessStatus("Profile updated successfully");
            break;
        case 11:
            InvalidStatus("You have reached the Maximum Entry Limit!");
            break;
        case 12:
            InvalidStatus("New Entry is Invalid!");
            break;
        case 16:
            InvalidStatus("Cannot delete! Profile is already in use.");
            break;
        case 17:
            InvalidStatus("Invalid Shaper configuration!");
            break;
        case 18:
            InvalidStatus("Invalid Address entry! Collision at source and destination entries!");
            break;
        case 19:
            InvalidStatus("Invalid Address entry to Profile!");
            break;
        case 21:
            InvalidStatus("You cannot delete the default user/server");
            break;
        default:
            return -1;
    }
}

function show_warning_type_modal(code) {

    switch (code) {
        case 1:
            WarningStatus(code, "You are about to change the media configuration! Do you want to proceed?");
            $('#statusModalButton').click(function () {
                display_media_config_table();
            });
            break;
//        case 2:
//            WarningStatus("New Entry already exists in the System!");
//            break;
        default:
            return -1;
    }
}

function warning_proceed_func(id) {
    switch (id) {
        case 1:
            change_media_config_type(config_med_clicked);
            break;
        case 99:
            $('#StatusModal').hide();
            $('#'+$('.in').attr('id')).collapse('toggle');
            $('#collapse11').collapse('toggle');
            $('#tab_maint').css({"background": "#6f5e5e"});
            load_window(WINDOW_MAINTENANCE);
            break;
        default:
            return -1;
    }
}

//Success Status Modal              

function SuccessStatus(msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block; margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 15px; margin-top: 32px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:80px; height:30px; margin-left: 76px; margin-top: 30px; background:#21b224 ' >Continue</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Success");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
}

var mbx_loading_cancel_status = 0;
function LoadingStatus(msg) {
    mbx_loading_cancel_status = 0;
    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block; margin-top:10px' src='image/gif/update_bl_cir.gif' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 15px; margin-top: 32px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:80px; height:30px; margin-left: 76px; margin-top: 17px; background:#f44242 ' >Cancel</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("System");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
        mbx_loading_cancel_status = 1;
    });
}

function InvalidStatus(msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block;' src='image/failed.png' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 12px; margin-top: 22px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:80px; height:30px; margin-left: 76px; margin-top: 17px; background:#f44242 ' >Close</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Invalid Operation");
    
    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
}

function AbortStatus(msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block;' src='image/reset.png' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 12px; margin-top: 22px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='abortStatusModalProceed' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Retry</button>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Cancel</button>";


    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Abort");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
}

function WarningStatus(code, msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block;' src='image/reset.png' alt='your image' height='50' width='60'/>";

    var msg_btn = "<div style='margin-left: 10px; margin-top: 22px; font-family: Courier-New; font-size: 16px;' >" + msg + "</div>" +
            "<button id='warningStatusModalProceed' onclick='warning_proceed_func(" + code + ")' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Proceed</button>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Cancel</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Warning");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
    
    if(code === 99){
        $('#StatusModalContent').css('height','190px');        
    }
}
set_shaping_tooltips = function (table, column, cell_data, row_data) {
    var tooltip_text;
    switch (table) {
        case RULE_TABLE:
            tooltip_text = set_rule_table_tooltips(column, cell_data, row_data);
            break;
        case PIPE_SCHEDULE_TABLE:
            tooltip_text = set_pipe_sched_table_tooltips(column, cell_data, row_data);
            break;
        case URL_PROF_TABLE:
            tooltip_text = set_url_serv_prof_table_tooltips(column, cell_data, row_data);
            break;
        case APP_PROF_TABLE:
            tooltip_text = set_app_prof_table_tooltips(column, cell_data, row_data);
            break;
        case SERV_PROF_TABLE:
            tooltip_text = set_url_serv_prof_table_tooltips(column, cell_data, row_data);
            break;          
    }

    return tooltip_text;
};

function set_rule_table_tooltips(column, cell_data, row_data) {

    if (cell_data === 'Any' || cell_data === 'None' || cell_data === '-') {
        return cell_data;
    } else {
        $("#tooltip_dt").css('width','150px');
        switch (column) {
            case 2:
            case 3:
                var entry = address_list_tt[address_list.indexOf(cell_data)];
                var element = entry.split("&");

                var name = element[1];
                var type = Address_Category_Type(element[2], element[4]);
                var value = Address_Val(element[2], element[3], element[4]);

                return "Name: " + name + "<br>Type: " + type + "<br>Address: " + value;

            case 4:
                var entry = schedule_list_tt[schedule_list.indexOf(cell_data)];
                var element = entry.split("&");

                var name = element[1];
                var type = Schedule_Type(element[2]);
                var s_t = moment(element[4] * 1000).format("hh:mm a");
                var e_t = moment(element[5] * 1000).format("hh:mm a");
                var active_d;

                if (Schedule_Type(element[2]) === "Weekly Recurring") {
                    active_d = decode_days_of_week(element[3]);
                } else
                    active_d = Schedule_One_Time_Days(element[4], element[5]);

                return "Name: " + name + "<br>Type: " + type + "<br>Active Days: " + active_d + "<br>Start Time: " + s_t + "<br>End Time: " + e_t;

            case 5:
//                URL;
                break;
            case 6:
//                APP;
                break;
            case 7:
//                Serv;
                break;
            case 10:
            case 11:
                
                $("#tooltip_dt").css('width','180px');

                var entry;
                var element;

                if (row_data[15] === '0') {
                    return get_simple_shaping_tooltip(cell_data);
                } else {
                    entry = pipe_schedule_list_tt[pipe_schedule_list.indexOf(cell_data)];
                    element = entry.split("&");

                    var name = element[1];
                    var sched = schedule_list[element[2]];

                    if (element[3] === '0') {
                        if (element[5] === '0') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Default Action: Allow";
                        } else if (element[5] === '4294967295') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Default Action: Block";
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Scheduled Downlink Pipe: -  <br>Scheduled Uplink Pipe: -"
                                    + "<br>Default Action: Shape <br>Default Downlink Pipe: - <br>Default Uplink Pipe: -";
                        } else
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Default Action: Shape <br>Default Downlink Pipe: "
                                    + pipe_list[element[5]] + " <br>Default Uplink Pipe: " + pipe_list[element[6]];
                    } else if (element[3] === '4294967295') {
                        if (element[5] === '0') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Action: Allow";
                        } else if (element[5] === '4294967295') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Action: Block";
                        } else
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Action: Shape <br>Default Downlink Pipe: "
                                    + pipe_list[element[5]] + " <br>Default Uplink Pipe: " + pipe_list[element[6]];
                    } else {
                        if (element[5] === '0') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Downlink Pipe:" + pipe_list[element[3]]
                                    + " <br>Default Uplink Pipe: " + pipe_list[element[4]] + "<br>Default Action: Allow";
                        } else if (element[5] === '4294967295') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Downlink Pipe:" + pipe_list[element[3]]
                                    + " <br>Default Uplink Pipe: " + pipe_list[element[4]] + " <br>Default Action: Block";
                        } else
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Downlink Pipe:" + pipe_list[element[3]]
                                    + " <br>Default Uplink Pipe: " + pipe_list[element[4]] + " <br>Default Action: Shape <br>Default Downlink Pipe: "
                                    + pipe_list[element[5]] + " <br>Default Uplink Pipe: " + pipe_list[element[6]];
                    }
                }
        }
    }
}

function set_pipe_sched_table_tooltips(column, cell_data, row_data) {

    switch (column) {
        case 2:
            $("#tooltip_dt").css('width','300px');
            var entry = schedule_list_tt[schedule_list.indexOf(cell_data)];
            var element = entry.split("&");

            var name = element[1];
            var type = Schedule_Type(element[2]);
            var s_t = moment(element[4] * 1000).format("hh:mm a");
            var e_t = moment(element[5] * 1000).format("hh:mm a");
            var active_d;

            if (Schedule_Type(element[2]) === "Weekly Recurring") {
                active_d = decode_days_of_week(element[3]);
            } else
                active_d = Schedule_One_Time_Days(element[4], element[5]);

            return "<div>Name: " + name + "<br>Type: " + type + "<br>Active Days: " + active_d + "<br>Start Time: " + s_t + "<br>End Time: " + e_t+"</div>";

        case 4:
        case 5:
        case 7:
        case 8:
            $("#tooltip_dt").css('width','200px');
            return get_simple_shaping_tooltip(cell_data);
    }
}

function set_url_serv_prof_table_tooltips(column, cell_data, row_data) {

    switch (column) {
        case 6:
        case 7:
            return get_simple_shaping_tooltip(cell_data);
    }
}

function set_app_prof_table_tooltips(column, cell_data, row_data) {

    switch (column) {
        case 4:
        case 5:
            return get_simple_shaping_tooltip(cell_data);
    }
}

get_simple_shaping_tooltip = function (cell_data) {
    var entry = pipe_list_tt[pipe_list.indexOf(cell_data)];
    var element = entry.split("&");

    var name = element[1];
    var type = get_pipe_type(element[5], 0);
    var pipe_genration = get_pipe_type(element[5], 1);
    var g_bw = element[2];
    var max_bw = element[3];

    return "Name: " + name + "<br>Type: " + type + "<br>Pipe Generation: " + pipe_genration + "<br>Guaranteed Bandwidth: " + pq_get_usage(g_bw*1000) + "<br>Maximum Bandwidth: " + pq_get_usage(max_bw*1000);
};var home_html = "<div id='Home'><div class='System' style='height:calc(100% - 30px);'><div id='Pq_System' style='height:calc(100% - 35px);width:100%;background:white;'><div class='SystemStatsPanelHeader' style='border-radius:5px 5px 0 0'> <img class='pq_vcenter' src='image/uptime.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Uptime</div></div><div style='width:100%;height:4%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='pq_mw_uptime' style='font-size:11px;margin-left:30px'>12 day(s) 13 hour(s) 23 min(s)</div></div><div style='margin-top:2%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/statistics.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Session Statistics</div></div><div style='width:100%;height:4%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter panel-title' id='pq_mw_session_ps' style='font-size:11px;margin-left:30px;cursor:auto'>New Sessions Per-Second:0</div></div><div style='width:100%;height:4%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter panel-title' id='pq_mw_session_count' style='font-size:11px;margin-left:30px;cursor:auto'>Total Sessions:0</div></div> <!-- <div style='margin-top:3%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/disk_usage.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Disk Usage</div></div><div style='width:100%;height:10%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='pq_mw_uptime' style='font-size:11px;margin-left:30px'>10.83 GB/ 16 GB</div><svg id='fillgauge1' class='pq_fillGauge' ></svg></div> --><div style='margin-top:4%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/alert.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Events</div></div><div id='notific_area' style='width:100%;height:65%;overflow-y:auto;'></div> <div style='margin-top:2%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/statistics.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Bandwidth Plot Type</div></div><div style='width:100%;height:5%;background:white;'><button id='home_bw_selector_10s' class='create' style='width:44%;background:#1a8cff;font-size:9px;height:20px;margin-top:10px;margin-left:10px' autofocus='autofocus' onclick='btn_link_bw_load_now(1)'>10 s average </button><button class='create' style='width:44%;background:#1a8cff;font-size:9px;height:20px;margin-top:10px' onclick='btn_link_bw_load_now(2)'>1 ms average </button></div> <!-- <div style='margin-top:5%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/disk_usage.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> System Status</div></div> <div style='width:100%;height:5%;'><img style='margin-left:30px;margin-top:0px ' src='image/shut_down.png' /><button class='create' style='width:30%;margin-top:0px;background:#1a8cff;margin-left:0px;font-size:9px;height:20px;margin-top:6%' >Shut Down </button><img style='margin-left:10px;' src='image/restart.png' /><button class='create' style='width:23%;background:#1a8cff;margin-left:0px;font-size:9px;height:20px;margin-top:6% ' >Restart </button></div> --></div></div> <div class='Pq_LinkPlotHolder' style='height:calc(30% - 30px);position:relative;width:79%;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px)' >Downlink Bandwidth</div> <div id='CHD_Plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:-10' ></div> <div id='CHD_av_Plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> </div> <div class='Pq_LinkPlotHolder' style='height:calc(30% - 30px);position:relative;width:79%;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px)'>Uplink Bandwidth</div> <div id='CHU_Plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:-10'></div><div id='CHU_av_Plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> </div><div class='Pq_LinkPlotHolder' style='height:calc(40% - -15px);width:80%;background:transparent;box-shadow:none;border:none;margin-top:10px;'><div class='Pq_LinkPlotHolder' style='height:95%;width:calc(33% - 10px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Top Sources</div> <div id='pq_sum_src_hldr' style='float:left;padding:0;margin:0 auto;margin-top:5%;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div id='pq_sum_src_leg' style='width:122px;height:80%;float:left;overflow-y:auto;margin-left:-10px;margin-top:10px'><div id='pq_sum_src_legend' style='width:100%'> </div></div> </div><div class='Pq_LinkPlotHolder' style='height:95%;width:calc(33% - 10px);margin-left:11px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Top Destinations</div> <div id='pq_sum_dest_hldr' style='float:left;padding:0;margin:0 auto;margin-top:5%;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:122px;height:80%;float:left;overflow-y:auto;margin-left:-10px;margin-top:10px'><div id='pq_sum_dest_legend' style='width:100%'> </div></div> </div><div class='Pq_LinkPlotHolder' style='height:95%;width:calc(33% - 10px);margin-left:11px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Top Applications</div> <div id='pq_sum_app_hldr' style='float:left;padding:0;margin:0 auto;margin-top:5%;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:122px;height:80%;float:left;overflow-y:auto;margin-left:-10px;margin-top:10px'><div id='pq_sum_app_legend' style='width:100%'> </div></div> </div> </div> </div>";
var dash_vlan_html = "<div id='Dashboard_Vlans'><div class='System' style='height:calc(100% - 30px);'><div id='Pq_System' style='height:calc(100% - 0px);width:100%;background:white;'><div style='border-radius:5px 5px 0 0' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/statistics.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Bandwidth Plot Type</div></div><div style='width:100%;height:75px;background:white;'><input id='radio_vlan_one_msec' type='radio' name='dash_vlan_plot_type' value='0' style='margin-left:10px;margin-top:10px;'><label class='timeSelectorText' style='color:black' for='radio_vlan_one_msec' >1 ms average</label><br> <input id='radio_vlan_one_sec' type='radio' name='dash_vlan_plot_type' value='1' style='margin-left:10px' checked><label class='timeSelectorText' style='color:black' for='radio_vlan_one_sec' >10 s average</label><br> <!--<input id='radio_vlan_ten_sec' type='radio' name='dash_vlan_plot_type' value='2' style='margin-left:10px'><label class='timeSelectorText' style='color:black' for='radio_vlan_ten_sec'>10 s average</label>--> </div> <div class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/alert.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> VLANs</div></div><div style='width:100%;height:65%;overflow-y:auto;'><div id='PQ_Vlan_List' style='height:calc(100% - 35px);width:100%;overflow-y:auto;'></div></div> </div></div> <div class='Pq_LinkPlotHolder' style='height:calc(25% - 20px);position:relative;width:79%;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px);font-size:13px;' >Downlink VLAN Maximum Bandwidth</div> <div id='vlan_max_dlink_one_msec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> </div> <div class='Pq_LinkPlotHolder' style='height:calc(25% - 20px);position:relative;width:79%;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px);font-size:13px;'>Uplink VLAN Maximum Bandwidth</div> <div id='vlan_max_ulink_one_msec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div></div><div class='Pq_LinkPlotHolder' style='height:calc(25% - 20px);position:relative;width:79%;'><div id='vlan_bw_dlink_label' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px);font-size:13px;'></div> <!--<div id='vlan_dlink_ten_sec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div>--> <div id='vlan_dlink_one_sec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> <div id='vlan_dlink_one_msec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:-10' ></div> </div> <div class='Pq_LinkPlotHolder' style='height:calc(25% - 20px);position:relative;width:79%;'><div id='vlan_bw_ulink_label' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px);font-size:13px;'>Uplink Bandwidth - VLAN</div> <!--<div id='vlan_ulink_ten_sec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div>--> <div id='vlan_ulink_one_sec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> <div id='vlan_ulink_one_msec_plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:-10' ></div> </div> </div><!--<div id='CHold'><div class='Pq_HMolder'><div class='Pq_MPlotHolder'><div class='Pq_HPlotHolder' style='padding-top:0px;'><div style='height:30px;width:100%;font-size:12px'><div class='pq_suy_wgt_head'> <a class='pq_hvcenter' id='mw_downlink_bw_ind' style='float:left;color:white;margin-right:10px;text-decoration:none;'>Downlink Bandwidth (1 ms)</a></div></div><div style='width:100%;height:calc(100% - 25px);font-size:12px;padding-top:5px'><div id='CHD_Plot' style='width:calc(100% - 20px);height:calc(100% - 10px);padding:2px'></div></div> <div><div id='mw_uplink_bw_ind' class='Pq_Center Pq_HPlotTitle'>Uplink Bandwidth (Mbps - 1 ms)</div></div><div id='CHU_Plot' class='Pq_HPlot'></div></div><div class='Pq_HPlotHolder Pq_HPlotMargin' style='padding-top:0px;'><div style='height:30px;width:100%;font-size:12px'><div class='pq_suy_wgt_head'> <a class='pq_hvcenter' id='mw_uplink_bw_ind' style='float:left;color:white;margin-right:10px;text-decoration:none;'>Uplink Bandwidth (1 ms)</a></div></div><div style='width:100%;height:calc(100% - 25px);font-size:12px;padding-top:5px'><div id='CHU_Plot' style='width:calc(100% - 20px);height:calc(100% - 10px);padding:2px'></div></div> <div><div id='mw_downlink_bw_ind' class='Pq_Center Pq_HPlotTitle'>Downlink Bandwidth (Mbps - 1 ms)</div></div><div id='CHD_Plot' class='Pq_HPlot'></div></div> </div><div class='Pq_HOptions' style='background-color:#222'><div id='Pq_Sopt_Head'><div class='Pq_Center' style='width:100px;text-align:center'>System</div> </div><div id='Pq_System' style='height:calc(100% - 35px);width:100%;background:linear-gradient(#97c0d1 ,#d6f1f4,#97c0d1);'><div style='width:100%;height:40px;background-color:#97c0d1'><img class='pq_vcenter' src='image/event_sh.png' style='float:left;margin-left:5px'/><a class='pq_vcenter' id='pq_mw_event_count' style='font-size:13px;color:#122b40;float:left;margin-left:7px;text-decoration:none;'>Events:0</a></div><div style='width:100%;height:40px;background-color:#cfdce1'><img class='pq_vcenter' src='image/session_details.png' style='margin-left:10px;float:left'/><a class='pq_vcenter' style='font-size:12px;float:left;margin-left:10px;text-decoration:none;'> Session Statistics</a></div><img src='image/bullet.png' style='width:10px;height:10px;margin-top:6px;margin-left:18px;float:left'/><a id='pq_mw_session_ps' style='font-size:11px;margin-left:3px;text-decoration:none;'>New Sessions Per-Second:updating ..</a><img src='image/bullet.png' style='width:10px;height:10px;margin-top:6px;margin-left:18px;float:left'/><a id='pq_mw_session_count' style='font-size:11px;margin-left:3px;text-decoration:none;'>Total Sessions:updating ..</a><div style='width:100%;height:40px;background-color:#cfdce1'><img class='pq_vcenter' src='image/time_up.png' style='margin-left:10px;float:left'/><a class='pq_vcenter' style='font-size:12px;float:left;margin-left:10px;text-decoration:none;'> Uptime</a></div><img src='image/bullet.png' style='width:10px;height:10px;margin-top:6px;margin-left:18px;float:left'/><a id='pq_mw_uptime' style='font-size:11px;margin-left:3px;text-decoration:none;'>updating ..</a><div style='width:100%;height:40px;background-color:#cfdce1'><img class='pq_vcenter' src='image/vlan.png' style='margin-left:10px;float:left'/><a class='pq_vcenter' style='font-size:12px;float:left;margin-left:10px;text-decoration:none;'> VLAN Mode</a></div> <img src='image/bullet.png' style='width:10px;height:10px;margin-top:6px;margin-left:18px;float:left'/><a style='font-size:11px;margin-left:3px;text-decoration:none;'>Stacked Mode</a><label style='float:right;margin-right:30px'><input type='checkbox' name='pq_vtogle' onclick='pq_vlan_state_changed(this)'></label></div></div></div> <div class='Pq_HMolder'><div class='Pq_MPlotHolder' style='position:relative'><div style='width:100%;height:100%;position:absolute'><div class='Pq_HPlotHolder' style='padding-top:0px;'><div style='height:30px;width:100%;font-size:12px'><div class='pq_suy_wgt_head'> <a class='pq_hvcenter' style='float:left;color:white;margin-right:10px;text-decoration:none;'>VLAN Downlink Bandwidth (1 ms)</a></div></div><div style='width:100%;height:calc(100% - 25px);font-size:12px;padding-top:5px'><div id='CHVd_Plot' style='width:calc(100% - 20px);height:calc(100% - 10px);padding:2px'></div><div id='CHVSd_Plot' style='width:calc(100% - 20px);height:calc(100% - 10px);padding:2px'></div></div> <div><div class='Pq_Center Pq_HPlotTitle'>VLAN Uplink Bandwidth (Mbps - 1 ms)</div></div><div class='Pq_HPlot' style='position:relative'><div id='CHVu_Plot' style='width:100%;height:100%;position:absolute'></div><div id='CHVSu_Plot' style='width:100%;height:100%;position:absolute'></div></div></div><div class='Pq_HPlotHolder Pq_HPlotMargin' style='padding-top:0px;'><div style='height:30px;width:100%;font-size:12px'><div class='pq_suy_wgt_head'> <a class='pq_hvcenter' style='float:left;color:white;margin-right:10px;text-decoration:none;'>VLAN Uplink Bandwidth (1 ms)</a></div></div><div style='width:100%;height:calc(100% - 25px);font-size:12px;padding-top:5px'><div id='CHVu_Plot' style='width:calc(100% - 20px);height:calc(100% - 10px);padding:2px'></div><div id='CHVSu_Plot' style='width:calc(100% - 20px);height:calc(100% - 10px);padding:2px'></div></div> <div><div class='Pq_Center Pq_HPlotTitle'>VLAN Downlink Bandwidth (Mbps - 1 ms)</div></div><div class='Pq_HPlot' style='position:relative'><div id='CHVd_Plot' style='width:100%;height:100%;position:absolute'></div><div id='CHVSd_Plot' style='width:100%;height:100%;position:absolute'></div></div></div> </div><div id='uvs_updating_ind' class='pq_updater_zee' style='position:absolute;width:100%;height:100%;background-color:#fafafa;'><img src='image/gif/sg_update.gif' style='float:left' class='pq_hvcenter'><a style='float:left;margin-left:30px;font-size:16px;color:#1a7cea;text-decoration:none;' class='pq_hvcenter'>Switching ..</a></div></div><div class='Pq_HOptions' style='background:linear-gradient(paleturquoise ,paleturquoise,whitesmoke,paleturquoise);margin-top:1px'><div id='Pq_Vopt_Head'><div class='Pq_Center' style='width:100px;text-align:center'>VLAN List</div> </div><div id='PQ_Vlan_List' style='height:calc(100% - 35px);width:100%;background-color:rgba(10,12,43,0.3);overflow-x:auto'></div></div></div></div>-->";
var dash_sdas_html = "<div id='Dashboard_Sources'><div class='Pq_BWHolder'> <div class='Pq_BWPlotHolder' style='height:calc(50% - 10px);width:calc(50% - 30px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='dashPie_src_dlink_header' style='font-size:14px;height:2em'></div> <div class='PieChartContentHolder' style='height:calc(100% - 50px);width:calc(100% - 30px)'> <div id='dashPie_src_dlink' class='PieChartHolder' style='height:calc(100% - 40px);width:calc(50% - 20px);margin-top:30px'></div> <div class='PieChartDetailHolder' id='dashPie_pie_dlink_table_holder'> <table id='dashPie_pie_dlink_table' class='display cell-border AppUserTablesFont' ></table> </div> </div> </div> <div class='Pq_BWPlotHolder' style='height:calc(50% - 10px);width:calc(50% - 30px);display:inline-block;margin-left:20px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='dashPie_src_ulink_header' style='font-size:14px;height:2em'></div> <div class='PieChartContentHolder' style='height:calc(100% - 50px);width:calc(100% - 30px)'> <div id='dashPie_src_ulink' class='PieChartHolder' style='height:calc(100% - 40px);width:calc(50% - 20px);margin-top:30px'></div> <div class='PieChartDetailHolder' id='dashPie_pie_ulink_table_holder'><table id='dashPie_pie_ulink_table' class='display cell-border AppUserTablesFont' ></table> </div> </div> </div> <div class='Pq_BWPlotHolder' style='height:calc(50% - 10px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='dashPie_bw_plot' style='font-size:14px;height:2em'></div> <!--<div id='dashPie_src_bw' class='PieSegmentHolder'></div>--><div style='width:100%;height:28px;background-color:#222'><div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><label class='drop_down_label_reporting' style='margin:7px;color:#fff;float:left;'> Bandwidth :</label><button id='dash_sdas_bw_1ms' onclick='btn_dashpie_bw_load_now(1)' class='btn btn-primary btn-xs' style='margin-top:3px;'>1 ms average</button><button onclick='btn_dashpie_bw_load_now(2)' class='btn btn-primary btn-xs' style='margin-top:3px;'>10 s average</button> <button onclick='extended_dashPie_srcdesapp_analysis()' class='btn btn-primary btn-xs' disabled style='margin-left:20px;margin-top:3px;'>In-depth Analysis</button> </div><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a style='float:left;font-size:12px;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'></a><a id ='pq_dashPie_srcdesapp_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Sent:0 MB</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id ='pq_dashPie_srcdesapp_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Received:0 GB</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> </div><div style='width:100%;height:calc(100% - 75px);background-color:whitesmoke;position:relative'><div id='plot_dashPie_srcdesapp_updown' style='width:calc(100%);height:100%;background-color:whitesmoke;position:absolute;z-index:100'></div><div id='plot_dashPie_srcdesapp_av_updown' style='width:100%;height:100%;background-color:whitesmoke;position:absolute;'></div></div> </div> </div> </div>";
var link_util_app_html = "<div id='Link_Utilization'> <div style='width:100%;height:40px;background-color:#222'><input id='radio_appbwm_ntwrk' type='radio' name='appbwm_mode' value='1' style='margin-left:15px' checked><label class='timeSelectorText' for='radio_r_quick'>Network</label> <input id='radio_appbwm_user' type='radio' name='appbwm_mode' value='2' style='margin-left:10px' ><label class='timeSelectorText' for='radio_r_custom' >User/ Subnet :</label><input id='linkUtilAppUserID' type='text' disabled class='field_prop_reporting' style='height:20px;font-size:12px;font-family:helvetica;margin-left:5px'><button id='linkUtilAppUserWatchBtn' type='button' onclick='validate_input_ip()' disabled class='pq_url_wbtn'>Watch</button><div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><button type='button' id='app_bwm_dlink_btn' onclick='btn_link_util_bw_load_now(1)' class='btn btn-primary btn-xs'>Downlink</button><button type='button' id='app_bwm_ulink_btn' onclick='btn_link_util_bw_load_now(2)' class='btn btn-primary btn-xs'>Uplink</button></div> <label class='drop_down_label_reporting' style='margin:12px;margin-right:10px;color:#fff;float:right'> Link :</label> <a id ='link_util_app_user_status' style='font-size:11px;margin-right:100px;color:#fff;display:inline-block;text-decoration:none;float:right;display:none' class='pq_bwevent_vcenter'>Inactive</a><div id='link_util_app_user_status_col' style='width:15px;height:15px;background-color:grey;margin:0px 10px 9px 10px;display:inline-block;float:right;display:none' class='pq_bwevent_vcenter'></div> <label id ='link_util_app_user_label' class='drop_down_label_reporting' style='margin:12px;color:#fff;float:right;display:none'> User Watch Status :</label> </div><div class='Pq_LinkPlotHolder' style='z-index:100;height:calc(100% - 65px);width:97%;position:absolute'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='bwm_prof_plot_title' style='height:30px;font-size:16px;'></div> <div class='System' id='pq_dlink_util_plot_System' style='width:250px;height:calc(100% - 60px);'><div style='height:calc(100% - 10px);width:100%;'> <div style='border-radius:15px 15px 0 0;height:30px' class='SystemStatsPanelHeader' ><div class='pq_vcenter SystemStatsPanelHeaderText' style='font-size:14px;margin-left:calc(50% - 54px);'>Application List</div> </div><div class='util'><ul class='nav nav-tabs'><li class='active' ><a data-toggle='tab' id='app_bwm_profile_tab' onclick='load_app_bwm_prof_table()' href='#profile_content' style='padding:5px;font-size:12px;'>Profiles</a></li><li ><a id='app_bwm_all_tab' data-toggle='tab' onclick='load_app_bwm_all_table()' href='#app_util_dlink_all' style='padding:5px;font-size:12px;'>All Applications</a></li></ul></div><div class='tab-content' style='width:100%;height:calc(100% - 60px);overflow-y:auto'><div class='all tab-pane' id='app_util_dlink_all'><!-- <input id='stacked_mode_app_util_dlink' type='checkbox' value='1' style='margin-left:15px;margin-top:15px;'><label class='timeSelectorText' style='color:#000;margin-left:3px;' for='stacked_mode_app_util_dlink'>Stacked Mode</label> <input id='select_all_app_util' type='checkbox' value='2' style='margin-left:10px;margin-top:15px' ><label class='timeSelectorText' style='color:#000;margin-left:3px;' for='select_all_app_util' >Select All</label> --><table id='App_Dlink_Util_table' class='display cell-border AppUserTablesFont ' cellspacing='0' width='100%' ></table></div><div class='profile tab-pane active' id='profile_content' ><button id='addProfilebuttonId' class='createprofile' onclick='init_app_bwm_profile_add()'>Create Profile</button><div id='addProfileId' style='display:none;margin-top:10px;'><input type='text' id='profile_input' style='padding-left:5px;margin-left:10px;font-size:11px;font-family:Helvetica;width:calc(100% - 20px)' name='profile' placeholder='Enter New Profile Name' required><br> <button type='button' onclick='add_app_bwm_profile()' style='background:#33469c;border-radius:5px;color:white;height:25px;margin-top:5px;font-size:11px;padding-top:3px;width:60px;margin-left:calc(50% - 63px);' >Create</button><button type='button' onclick='cancelProfile()' style='background:#d65959;border-radius:5px;color:white;height:25px;margin-top:5px;font-size:11px;padding-top:3px;width:60px;'>Cancel</button></div><div id='profile_button_grp' class='btn-group profile_button_grp' style='margin-top:10px;'><div id='sub_profile_button_grp' class='sub_profile_button_grp'></div></div></div></div> </div> </div> <div class='Pq_LinkPlotHolder' id='pq_dlink_util_plot' style='height:calc(100% - 60px);width:calc(100% - 300px);position:absolute;'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText ' style='font-size:14px;height:30px'>Application Bandwidth</div> <div id='AppBwm_Ntwrk_Dlink_Plot' class='Pq_HPlot' style='width:calc(100% - 5px);height:calc(100% - 45px);padding:5px;z-index:100;position:absolute;'></div><div id='AppBwm_Ntwrk_Ulink_Plot' class='Pq_HPlot' style='width:calc(100% - 5px);height:calc(100% - 45px);padding:5px;z-index:-10;position:absolute;'></div><div id='AppBwm_User_Dlink_Plot' class='Pq_HPlot' style='width:calc(100% - 5px);height:calc(100% - 45px);padding:5px;z-index:-10;position:absolute;'></div><div id='AppBwm_User_Ulink_Plot' class='Pq_HPlot' style='width:calc(100% - 5px);height:calc(100% - 45px);padding:5px;z-index:-10;position:absolute;'></div> </div> </div><div id='Add_App_BWM_Prof_Window' class='modal'><div class='modal-content' style=' height:400px;'><span id='CloseAddApplication' class='close'>×</span><label class='modalTitle' style=' margin-left:50px'> Add Applications to Profile </label><br><div id='applist'><input type='text' id='app_search_input' style='margin-top:10px;margin-bottom:10px;font-size:11px;padding:2px;' onkeyup='appsearch()' placeholder='Search Applications..' title='Type in a name'><ul id='app_list_ul' style='height:275px;list-style:none;margin-left:-40px;overflow-y:auto'></ul></div></div></div></div>";
var ses_sessions_html = "<div id='Session_Sessions'> <div class='pq_session_filter_bar' id='pq_ses_win_filter'></div><div id='Session_Sessions_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Session Table</div> <div id='session_table_holder' style='width:100%;padding:20px' ><table id='Session_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Source IP</th><th>User</th><th>Destination IP</th><th>Source Port</th><th>Destination Port</th><th>Protocol</th><th>VLAN ID</th> <th>Application</th><th onclick='pq_table_sort_ses_data()' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data (Sent/Received)</th><th>Data Received</th><th>Watch</th> </tr></thead> </table> </div> </div> </div> ";
var shadow_session_watch_html = "<div id='C_Shadow_Session_Watch'><div id='pq_lses_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#005d00'><button class='pq_url_wbtn' style='float:left;display:inline-block;width:130px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;' onclick='pq_go_back_all_session_clicked()'>Back to Sessions</button> <img src='image/server_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_sip_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Client IP:192.168.1.121</a><img src='image/port.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_sport_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Destination Port:80</a><img src='image/client_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_dip_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Server IP:192.168.1.121</a><img src='image/port.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_dport_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Source Port:5134</a><img src='image/application_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_app_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Application:Unknown</a><div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><button type='button' onclick='btn_ses_bw_load_now(1)' autofocus='autofocus' class='btn btn-primary btn-xs'>bandwidth (1 ms)</button><button type='button' onclick='btn_ses_bw_load_now(2)' class='btn btn-primary btn-xs'>bandwidth (10 s)</button> </div></div><div style='width:100%;height:2px;background-color:lightblue'></div><div style='width:100%;height:calc(100% - 45px);background:#fff;position:absolute;'> <div class='Pq_TableHolder' style='height:calc(50% - 20px);width:calc(100% - 35px);display:inline-block;'><div id='plot_live_session_downlink_header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Session Downlink Bandwidth (1 ms)</div> <div style='width:100%;height:30px;background-color:#222'><img src='image/down_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a id='pq_ls_downlink_pkt' style='float:right;margin-right:100px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Packets:0 </a><div style='width:20px;height:20px;background-color:#1c94c4;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id='pq_ls_downlink_usage' style='float:right;margin-right:100px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Data Received:0 MB</a><div style='width:20px;height:20px;background-color:#1c94c4;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div></div><div style='width:100%;height:calc(100% - 70px);'><div id='plot_live_session_ms_downlink' style='width:calc(100% - 35px);height:calc(50% - 90px);background-color:whitesmoke;position:absolute;z-index:100'></div><div id='plot_live_session_av_downlink' style='width:calc(100% - 35px);height:calc(50% - 90px);background-color:whitesmoke;position:absolute;z-index:-10'></div></div></div><div class='Pq_TableHolder' style='height:calc(50% - 20px);width:calc(100% - 35px);display:inline-block;'><div id='plot_live_session_uplink_header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Session Uplink Bandwidth (1 ms)</div> <div style='width:100%;height:30px;background-color:#222'><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a id='pq_ls_uplink_pkt' style='float:right;margin-right:100px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Packets:0 </a><div style='width:20px;height:20px;background-color:#1c94c4;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id='pq_ls_uplink_usage' style='float:right;margin-right:100px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Data Sent:0 MB</a><div style='width:20px;height:20px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div></div><div style='width:100%;height:calc(100% - 70px);'><div id='plot_live_session_ms_uplink' style='width:calc(100% - 35px);height:calc(50% - 90px);background-color:whitesmoke;position:absolute;z-index:100'></div><div id='plot_live_session_av_uplink' style='width:calc(100% - 35px);height:calc(50% - 90px);background-color:whitesmoke;position:absolute;z-index:-10'></div></div></div></div> </div><!--<div id='C_Shadow_Session_Watch'><div id='pq_lses_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#222222'><div id='lv_sessions_watch_status_bar_back_btn' ><button id='lv_sessions_watch_status_bar_back_btn' class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;' onclick='pq_go_back_all_session_clicked()'>Back to Home</button> <img class='pq_vcenter' src='image/back_act.png' style='cursor:pointer;width:20px;height:20px;float:left;margin-left:5px' onclick='pq_go_back_all_session_clicked()'/><a style='float:left;margin-left:7px;color:#fff;font-weight:bold;cursor:pointer;text-decoration:none' onclick='pq_go_back_all_session_clicked()' class='pq_bwevent_vcenter pq_sessionw_goback_text'>Back To All Sessions</a></div><img src='image/server_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_sip_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Server IP:192.168.1.121</a><img src='image/port.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_sport_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Destination Port:80</a><img src='image/client_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_dip_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Client IP:192.168.1.121</a><img src='image/port.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_dport_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Source Port:5134</a><img src='image/application_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_app_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Application:Unknown</a><img src='image/round_trip_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/> <a id ='pq_ls_rtt_text' style='color:white;float:left;margin-right:10px;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Round-Trip Time:Updating ..</a></div><div style='width:100%;height:2px;background-color:lightblue'></div><div style='width:100%;height:calc(100% - 85px);background:#fff'><div class='Pq_TableHolder' style='height:calc(50% - 0px);width:calc(100% - 35px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Session Downlink Bandwidth</div> <div style='width:100%;height:30px;background-color:#222'><img src='image/down_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a style='float:left;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'> Session Downlink Bandwidth</a><a id='pq_ls_downlink_usage' style='float:right;margin-right:100px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Data Received:0 MB</a><div style='width:20px;height:20px;background-color:#1c94c4;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div></div><div id='plot_live_session_downlink' style='width:100%;height:calc(100% - 70px);background-color:whitesmoke'></div></div><div class='Pq_TableHolder' style='height:calc(50% - 0px);width:calc(100% - 35px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Session Uplink Bandwidth</div> <div style='width:100%;height:30px;background-color:#222'><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a style='float:left;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'> Session Uplink Bandwidth</a><a id='pq_ls_uplink_usage' style='float:right;margin-right:100px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Data Sent:0 MB</a><div style='width:20px;height:20px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div></div><div id='plot_live_session_uplink' style='width:100%;height:calc(100% - 70px);background-color:whitesmoke'></div></div></div></div>-->";
var ses_sources_html = "<div id='Session_Sources'> <div class='pq_session_filter_bar' id='pq_src_win_filter'></div><div id='Session_Sources_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Source Table</div> <div id='source_table_holder' style='width:100%;padding:20px' ><table id='Source_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>IP Address</th><th>User</th> <th onclick='pq_table_sort_ses(0)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Data Sent</th><th>Data Received</th><th onclick='pq_table_sort_data(0)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data (Sent/Received)</th><th>Watch</th> </tr></thead></table> </div> </div> </div> ";
var shadow_server_watch_html = "<div id='C_Shadow_Server_Watch'><div id='pq_lscw_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#222222'><button id='shdw_serv_home_back_btn' class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;'>Back to Home</button> <img class='pq_vcenter' src='image/client_large.png' style='width:20px;height:20px;float:left;margin-right:5px;margin-left:40px;display:inline-block'/><a id='pq_lscw_sip_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px' class='pq_bwevent_vcenter'> Source IP:192.168.1.121</a><img class='pq_vcenter' src='image/sessions.png' style='width:20px;height:20px;float:left ;margin-right:10px;margin-left:20px;display:inline-block'/><a id='pq_lscw_ses_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px' class='pq_bwevent_vcenter'> Sessions:83</a></div><div style='height:40%;width:100%;background:transparent;box-shadow:none;border:none'> <div class='Pq_TableHolder' style='height:100%;width:72%;display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Bandwidth Usage</div> <div style='width:100%;height:28px;background-color:#222'><div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><label class='drop_down_label_reporting' style='margin:7px;color:#fff;float:left;'> Bandwidth :</label> <button id='shadow_serv_bw_select_1ms' onclick='btn_sc_bw_load_now(1)' class='btn btn-primary btn-xs' style='margin-top:4px;height:20px'>1 ms average</button><button onclick='btn_sc_bw_load_now(2)' class='btn btn-primary btn-xs' style='margin-top:4px;height:20px'>10 s average</button> </div><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a style='float:left;font-size:12px;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'></a><a id ='pq_lsd_uplink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Sent:223 MB</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id ='pq_lsd_downlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Received:1.53 GB</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> </div><div style='width:100%;height:calc(100% - 75px);background-color:whitesmoke;position:relative'><div id='plot_live_sources_updown' style='width:calc(100%);height:100%;background-color:whitesmoke;position:absolute;z-index:100'></div><div id='plot_live_sources_av_updown' style='width:100%;height:100%;background-color:whitesmoke;position:absolute'></div></div></div><div class='Pq_TableHolder' style='height:100%;width:23%;display:inline-block;margin-top:0px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Live Usage</div> <!--<div style='width:2px;height:28px;background-color:#D5E4F3;float:left'></div>--><div style='width:calc(100%);height:28px;background-color:#222;'><div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><button id ='btn_lw_bt_one' type='button' onclick='btn_sc_sum_load_now(1)' class='btn btn-primary btn-xs' style='margin-top:2px;height:20px'>Applications</button><button id ='btn_lw_bt_two' type='button' onclick='btn_sc_sum_load_now(2)' class='btn btn-primary btn-xs' style='margin-top:2px;height:20px'>Destinations</button><button id ='btn_lw_bt_three' type='button' onclick='btn_sc_sum_load_now(3)' class='btn btn-primary btn-xs' style='margin-top:2px;height:20px'>Services</button></div><img src='image/applications.png' style='float:left;margin-left:10px;' class='pq_bwevent_vcenter'/><a style='float:left;font-size:12px;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'></a> </div><div id='pq_live_usage_pie_hlder' style='float:left;padding:0;margin:0 ;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:40%;height:calc(100% - 80px);float:left;overflow-y:auto;margin-top:10px;'><div id='pq_live_usage_legend' style='width:100%;top:0px;position:relative;'></div></div></div></div><div class='Pq_TableHolder' style='height:calc(55% - 60px);margin-top:35px '><div id='tc_diag_type' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Source Diagram</div> <div style='width:100%;height:35px;background-color:#222'><img src='image/sd_diagram.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><div style='width:40px;height:100%;float:right'></div><div class='btn-group pq_vcenter' style=' float:right;'><button id='shadow_serv_traffic' type='button' onclick='btn_sc_load_now(1)' class='btn btn-primary btn-xs'>Traffic</button><button type='button' onclick='btn_sc_load_now(2)' class='btn btn-primary btn-xs'>Sessions</button><button type='button' onclick='btn_sc_load_now(3)' class='btn btn-primary btn-xs'>Delay</button></div></div><div id='plot_live_sources_diagram_holder' style='font-size:10px;overflow-y:scroll;width:100%;height:calc(100% - 80px);background-color:whitesmoke'><div id='plot_live_sources_diagram' style='width:98%;background-color:whitesmoke;float:left;padding:0;margin:10px ;display:block;min-height:500px'></div></div></div>";
var shadow_url_watch_html = "<div id='C_Shadow_URL_Watch'><div id='pq_lscw_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#222222'><button id='lv_session_watch_status_bar_back_btn' class='pq_url_wbtn' onclick='pq_go_back_sources()' style='float:left;display:inline-block;width:130px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;'>Back to Sources</button> <img class='pq_vcenter' src='image/url.png' style='width:20px;height:20px;float:left;margin-right:5px;margin-left:40px;display:inline-block'/><a class='pq_vcenter' style='float:left;margin-left:2px;color:whitesmoke;font-size:13px;text-decoration:none'>URL Watch</a> <img class='pq_vcenter' src='image/client_large.png' style='width:20px;height:20px;float:left ;margin-right:10px;margin-left:20px;display:inline-block'/><a id='pq_lurlw_sip_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px' class='pq_bwevent_vcenter'> Source IP:</a> <img class='pq_vcenter' src='image/active.png' style='width:20px;height:20px;float:left ;margin-right:10px;margin-left:20px;display:inline-block'/><a id='pq_lurlw_status_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px;margin-right:10px;' class='pq_bwevent_vcenter'> Status:Active </a></div> <div id = 'pq_lurlw_status_ind' style='width:100%;height:4px;background-color:#47d147'></div><div class='Pq_TableHolder' style='height:35%;width:97%;display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Request Monitor</div> <div id='plot_live_url_stat' style='width:100%;height:calc(100% - 70px);background-color:whitesmoke;margin-top:20px'></div></div> <div class='Pq_TableHolder' style='height:calc(60% - 60px);width:31%;display:inline-block;margin-top:25px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px;padding-top:1.4%'><div style='width:15px;background-color:#ac2925;height:15px;float:left;margin-left:25px;'></div> HTTP Requests</div> <div style='width:95%;height:calc(100% - 55px);float:left;margin-top:10px;margin-left:10px;overflow:auto;'><div style='width:100%;height:20px'><!--<div style='width:5px;height:100%;background-color:#673ab7;float:left'></div>--><div style='width:100%;height:100%;float:left;padding-left:4px;'><div style='background-color:#006666;float:left;min-width:120px;width:40%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>URL</a></div><div style='background-color:#006666;float:left;min-width:108px;width:30%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>IP</a></div><div style='background-color:#006666;float:left;min-width:68px;width:23%;'><a style='margin-left:40%;text-decoration:none;color:whitesmoke;font-size:12px;'>Client</a></div><!-- <div style='min-width:2px;width:1%;background-color:#ac2925;height:20px;float:left'></div> --></div></div><!--<div style='width:5px;height:calc(100% - 46px);background-color:#673ab7;float:left'></div>--><div style='width:100%;height:calc(80% - 10px);min-width:330px;'> <div style='width:100%;height:2px'></div><div id='htpu-list' style='width:100%;height:100%;'><ul class='list' style='width:100%;height:100%;margin:0px;padding:0px;padding-left:4px;'><li style='background-color:#000\9;list-style:none;padding:0px;margin:0px'><div style='background-color:#09547c;float:left;min-width:120px;width:40%;overflow:hidden;margin-bottom:2px;margin-right:2px'><a class='wurl' style='white-space:nowrap;text-decoration:none;font-size:10px;color:whitesmoke;padding-left:5px'></a></div><div style='background-color:#cccccc;float:left;min-width:108px;width:30%;margin-bottom:2px;margin-right:2px'><a class='wuip' style='text-decoration:none;font-size:10px;padding-left:5px'></a></div><div style='background-color:#122b40;float:left;min-width:68px;width:23%;margin-bottom:2px'><a class='wuport' style='text-decoration:none;color:whitesmoke;font-size:10px;padding-left:5px'></a></div><!-- <div style='min-width:2px;width:1%;background-color:#ac2925;height:20px;float:left'></div>--></li></ul></div></div></div></div> <div class='Pq_TableHolder' style='height:calc(60% - 60px);width:31%;display:inline-block;margin-top:25px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px;padding-top:1.4%'><div style='width:15px;background-color:#009688;height:15px;float:left;margin-left:25px'></div> HTTPS Client Requests</div> <div style='width:95%;height:calc(100% - 55px);float:left;margin-top:10px;margin-left:10px;overflow:auto;'><div style='width:100%;height:20px'><!--<div style='width:5px;height:100%;background-color:#673ab7;float:left'></div>--><div style='width:100%;height:100%;float:left;padding-left:4px;'><div style='background-color:#006666;float:left;min-width:120px;width:40%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>URL</a></div><div style='background-color:#006666;float:left;min-width:108px;width:30%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>IP</a></div><div style='background-color:#006666;float:left;min-width:68px;width:23%;'><a style='margin-left:40%;text-decoration:none;color:whitesmoke;font-size:12px;'>Client</a></div><!-- <div style='min-width:2px;width:1%;background-color:#009688;height:20px;float:left'></div> --></div></div><!--<div style='width:5px;height:calc(100% - 46px);background-color:#673ab7;float:left'></div>--><div style='width:100%;height:calc(80% - 10px);min-width:330px'><div style='width:100%;height:2px'></div><div id='htpsu-list' style='width:100%;height:100%;'><ul class='list' style='width:100%;height:100%;margin:0px;padding:0px;padding-left:4px;'><li style='background-color:#000\9;list-style:none;padding:0px;margin:0px'><div style='background-color:#09547c;float:left;min-width:120px;width:40%;overflow:hidden;margin-bottom:2px;margin-right:2px'><a class='wurl' style='white-space:nowrap;text-decoration:none;font-size:10px;color:whitesmoke;padding-left:5px'></a></div><div style='background-color:#cccccc;float:left;min-width:108px;width:30%;margin-bottom:2px;margin-right:2px'><a class='wuip' style='text-decoration:none;font-size:10px;padding-left:5px'></a></div><div style='background-color:#122b40;float:left;min-width:68px;width:23%;margin-bottom:2px'><a class='wuport' style='text-decoration:none;color:whitesmoke;font-size:10px;padding-left:5px'></a></div><!-- <div style='min-width:2px;width:1%;background-color:#009688;height:20px;float:left'></div>--></li></ul></div></div></div></div> <div class='Pq_TableHolder' style='height:calc(60% - 60px);width:31%;display:inline-block;margin-top:25px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px;padding-top:1.4%'><div style='width:15px;background-color:#0066cc;height:15px;float:left;margin-left:25px'></div> DNS Response</div> <div style='width:95%;height:calc(100% - 55px);float:left;margin-top:10px;margin-left:10px;overflow:auto;'><div style='width:100%;height:20px'><!--<div style='width:5px;height:100%;background-color:#673ab7;float:left'></div>--><div style='width:100%;height:100%;float:left;padding-left:4px;'><div style='background-color:#006666;float:left;min-width:120px;width:40%;margin-right:1px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>URL</a></div><div style='background-color:#006666;float:left;min-width:108px;width:30%;margin-right:1px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>IP</a></div><div style='background-color:#006666;float:left;min-width:68px;width:25%;'><a style='margin-left:25%;text-decoration:none;color:whitesmoke;font-size:12px;'>Server IP</a></div><!-- <div style='min-width:2px;width:1%;background-color:#0066cc;height:20px;float:left'></div> --></div></div><!--<div style='width:5px;height:calc(100% - 46px);background-color:#673ab7;float:left'></div>--><div style='width:100%;height:calc(80% - 10px);min-width:330px'><div style='width:100%;height:2px'></div><div id='dns-list' style='width:100%;height:100%;'><ul class='list' style='width:100%;height:100%;margin:0px;padding:0px;padding-left:4px;'><li style='background-color:#000\9;list-style:none;padding:0px;margin:0px'><div style='background-color:#09547c;float:left;min-width:120px;width:40%;overflow:hidden;margin-bottom:2px;margin-right:1px'><a class='wurl' style='white-space:nowrap;text-decoration:none;font-size:10px;color:whitesmoke;padding-left:5px'></a></div><div style='background-color:#cccccc;float:left;min-width:108px;width:30%;margin-bottom:2px;margin-right:1px'><a class='wuip' style='text-decoration:none;font-size:10px;padding-left:5px'></a></div><div style='background-color:#122b40;float:left;min-width:68px;width:25%;margin-bottom:2px'><a class='wuport' style='text-decoration:none;color:whitesmoke;font-size:10px;padding-left:5px'></a></div><!-- <div style='min-width:2px;width:1%;background-color:#0066cc;height:20px;float:left'></div>--></li></ul></div></div></div></div> </div>";
var ses_dest_html = "<div id='Session_Destination'> <div class='pq_session_filter_bar' id='pq_dest_win_filter'></div><div id='Session_Destination_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Destination Table</div> <div id='destination_table_holder' style='width:100%;padding:20px' ><table id='Destination_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Destination</th><th>URL</th><th onclick='pq_table_sort_ses(1)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Bytes Sent</th><th>Bytes Received</th><th onclick='pq_table_sort_data(1)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data</th> <th>Watch</th> </tr></thead></table> </div> </div> </div> ";
var ses_app_html = "<div id='Session_Applications'> <div class='pq_session_filter_bar' id='pq_app_win_filter'></div><div id='Session_Applications_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Application Table</div> <div id='app_table_holder' style='width:100%;padding:20px' ><table id='Application_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Application</th><!--<th>Category</th>--> <th onclick='pq_table_sort_ses(2)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Bytes Sent</th><th>Bytes Received</th><th onclick='pq_table_sort_data(2)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data</th><th>Watch</th> </tr></thead> </table> </div> </div> </div> ";
var ses_serv_html = "<!--<div id='Session_Watch' style='background-color:#e6ecff;'>--><div id='Session_Services'> <div class='pq_session_filter_bar' id='pq_service_win_filter'></div><div id='Session_Services_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Service Table</div> <div id='service_table_holder' style='width:100%;padding:20px' ><table id='Ses_Service_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Services</th> <th onclick='pq_table_sort_ses(3)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Bytes Sent</th><th>Bytes Received</th><th onclick='pq_table_sort_data(3)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data</th><th>Watch</th> </tr></thead> </table> </div> </div> </div> <!--</div>-->";
var traffic_diag_html = "<div id='Status_Traffic'><div class='pq_tc_diagram_filter_bar'></div><div class='Pq_TableHolder' style='height:calc(100% - 70px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Traffic Diagram</div> <div class='PieChartContentHolder' style='height:calc(100% - 60px);width:49%;margin-top:20px'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText ' style='height:5%;font-size:14px;'> Downlink Traffic </div> <div style='height:5%;font-weight:bold;padding-left:5%;padding-top:10px;display:inline-block'> Sources </div> <div style='height:5%;font-weight:bold;margin-left:65%;padding-top:10px;display:inline-block '> Destinations </div> <div id='diagram_tc_in' style='height:calc(90% - 10px);overflow-y:scroll;font-family:Arial;font-size:11px;'></div> </div> <div class='PieChartContentHolder' style='height:calc(100% - 60px);width:48%;margin-left:10px;margin-top:20px'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText ' style='height:5%;font-size:14px;'> Uplink Traffic </div> <div style='height:5%;font-weight:bold;padding-left:5%;padding-top:10px;display:inline-block'> Sources </div> <div style='height:5%;font-weight:bold;margin-left:65%;padding-top:10px;display:inline-block '> Destinations </div> <div id='diagram_tc_out' style='height:calc(90% - 10px);overflow-y:scroll;font-family:Arial;font-size:11px;'></div> </div> </div> </div> ";
var rule_add_html = "<div id='Rule_Addition'> <div id='Rule_Addition_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Rules</div> <div id='rule_table_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' onclick = 'Create(1)' class='create'>Create New</button> <button type='button' disabled onclick = 'Edit(1)' class='edit'>Edit</button> <button type='button' disabled onclick = 'Delete(1)' class='delete'>Delete</button> </div> <table id='Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr style='height:50px;'><th colspan='7' style='text-align:center;font-size:14px'>Rule Parameters</th><th colspan='3' style='text-align:center;font-size:14px'>Assigned Profiles</th><th colspan='4' style='text-align:center;font-size:14px'>Default Behavior</th><th colspan='5' style='text-align:center;font-size:14px'></th></tr> <tr> <th>Priority</th> <th>Rule ID</th> <th>Source Type</th><th>Source</th><th>Destination Type</th><th>Destination</th><th>Rule Schedule</th><th>URL </th><th>Application </th> <th>Service </th> <th>Action ID</th> <th>Action</th> <th>Downlink Pipe</th><th>Uplink Pipe</th><th>Limit at Default</th> <th>Status ID</th> <th>Status</th> <th>Shaper Type</th> <th>Data Stats</th> </tr></thead></table> </div> </div> <div id='CreateRuleModal' class='modal'> <div id='createRuleModalContent' class='modal-content' style='max-height:500px;height:100%;margin-top:-70px;overflow-y:scroll'><div style='min-height:420px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:120px'> Add New Rule </label><br><br><label class='drop_down_label'> Source :</label><select id='add_source' class='field_prop'></select><select id='add_src_addr_type' class='field_prop' style='width:60px;margin-right:2px;'><option value='0'>IP</option><option value='1'>MAC</option> <option class='ad_display' style='display:none' value='2'>AD-User</option><option class='ad_display' style='display:none' value='5'>AD-Group</option><option class='dhcp_display' style='display:none' value='3'>DHCP-User</option><option value='4'>Profile</option></select> <br><br><label class='drop_down_label'> Destination :</label><select id='add_destination' class='field_prop'></select><select id='add_dest_addr_type' class='field_prop' style='width:60px;margin-right:2px;'><option value='0'>IP</option><option value='1'>MAC</option> <option value='4'>Profile</option></select> <br><br> <label class='drop_down_label'> Rule Schedule :</label><select id='add_schedule' class='field_prop'></select> <br><hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> URL Profile :</label><select id='add_url_prof' class='field_prop'></select> <br><br> <label class='drop_down_label'> Application Profile :</label><select id='add_app' class='field_prop'></select> <br><br> <label class='drop_down_label'> Service Profile :</label><select id='add_service_prof' class='field_prop'></select> <br><hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> Default Action :</label><select id='add_action' class='field_prop'><option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select> <br><br> <div id='appendPipes'></div> <button id='addRuleToSystem' class='addUpdateRules'>Add To System</button> </div></div></div> <div id='EditRuleModal' class='modal'><div id='editRuleModalContent' class='modal-content' style='max-height:500px;height:100%;margin-top:-70px;overflow-y:scroll'><div style='min-height:420px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:135px'> Edit Rule </label><br><br><label class='drop_down_label'> Source :</label><select id='edit_source' class='field_prop'></select> <select id='edit_src_addr_type' class='field_prop' style='width:60px;margin-right:2px;'><option value='0'>IP</option><option value='1'>MAC</option> <option class='ad_display' style='display:none' value='2'>AD-User</option><option class='ad_display' style='display:none' value='5'>AD-Group</option><option class='dhcp_display' style='display:none' value='3'>DHCP-User</option><option value='4'>Profile</option></select> <br><br> <label class='drop_down_label'> Destination :</label><select id='edit_destination' class='field_prop'></select> <select id='edit_dest_addr_type' class='field_prop' style='width:60px;margin-right:2px;'><option value='0'>IP</option><option value='1'>MAC</option> <option value='4'>Profile</option></select> <br><br> <label class='drop_down_label'> Rule Schedule :</label><select id='edit_schedule' class='field_prop'></select> <br><hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> URL Profile :</label><select id='edit_url_prof' class='field_prop'></select> <br><br> <label class='drop_down_label'> Application Profile :</label><select id='edit_app' class='field_prop'></select> <br><br> <label class='drop_down_label'> Service Profile :</label><select id='edit_service_prof' class='field_prop'></select> <br><hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> Default Action :</label><select id='edit_action' class='field_prop'><option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select> <br><br> <div id='editPipes'></div> <button id='editRuleToSystem' class='addUpdateRules'>Update</button> </div></div></div> </div>";
var obj_addr_ad_html = "<div id='Object_Addr_AD'> <div id='Object_Addr_AD_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Active Directory</div> <div id='object_addr_ad_holder' style='width:100%;padding:20px'><div class='edit_panel'><button class='pq_back_btn' id='Addr_Ad_back_btn'><span></span></button> <button type='button' onclick = 'Update_AD_User_List();Update_AD_Group_List();' style='background:#1a8cff;font-size:12px;font-family:helvetica;color:#fff;width:150px;border:none;border-radius:5px;height:30px;margin-left:5px;margin-top:5px;' >Refresh</button> </div> <div class='util' style='margin-top:10px'><ul class='nav nav-tabs' style='border-bottom:1.5px solid #005154;'><li class='active'><a data-toggle='tab' style='color:#006666;padding:5px;border-left-color:#004b4e;border-right-color:#005b5d;border-top-color:#004146;' href='#usr_content'>Users</a></li><li class=''><a data-toggle='tab' style='color:#006666;padding:5px;border-left-color:#004b4e;border-right-color:#005b5d;border-top-color:#004146;' href='#grp_content'>Groups</a></li></ul></div><div class='tab-content' style='width:100%;height:calc(100% - 30px);overflow-y:auto;border-left:1.5px solid #006666;border-right:1.5px solid #006263;border-bottom:1.5px solid #006666;'><div class='tab-pane active' id='usr_content'><div id='report_source_holder' style='width:100%;padding:10px' ><table id='Addr_AD_User_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>ID</th> <th>Name</th> <th>IP</th> <th>Occurrences</th> <th>Status</th> <th>Watch</th> </tr></thead></table> </div> </div><div class='tab-pane' id='grp_content'><div id='report_dest_holder' style='width:100%;padding:10px' ><table id='Addr_AD_Group_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>ID</th> <th>Name</th> <th>No. of Users</th> <th>Occurrences</th> <th>Status</th> <th>Watch</th> </tr></thead></table> </div> </div></div> </div> </div> <div id='CreateADGroupUserInfo' class='modal'><div id='CreateADGroupUserInfoContent' class='modal-content' style=' width:300px;height:fit-content;max-height:350px'><span id='CloseADGroupUserInfo' class='close'>×</span><label id='crete_ad_grp_usr_info_header' class='modalTitle' style=' margin-left:10px;margin-bottom:10px'> </label><div id='crete_ad_grp_usr_info_content' style='overflow-y:auto;'></div><button class='addUpdateRules' style='width:100px;margin-top:10px' onclick='$('#CreateADGroupUserInfo').hide()'>Close</button> </div></div> </div>";
var obj_addr_dhcp_html = "<div id='Object_DHCP_User_List'><div id='Object_DHCP_User_List_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>DHCP Users</div> <div id='object_dhcp_user_list_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' class='pq_back_btn' id='Addr_Mac_back_btn' style='display:none' onclick='load_obj_addr_profiles();'><span>Back to Address Profile</span></button> <button type='button' id='dhcp_user_list_back_btn' class='pq_back_btn'><span></span></button> <button type='button' onclick = 'Update_DHCP_List()' style='background:#1a8cff;font-size:12px;font-family:helvetica;color:#fff;width:150px;border:none;border-radius:5px;height:30px;margin-left:5px;margin-top:5px;' >Refresh</button> </div> <table id='Addr_DHCP_User_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>ID</th> <th>User</th> <th>IP</th> <th>MAC</th> <th>Occurrences</th> <th>Status</th> <th>Watch</th> </tr></thead></table> </div> </div> </div>";
var obj_addr_ip_html = "<div id='Object_Addr_IP'> <div id='Object_Addresses_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Addresses</div> <div id='object_address_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' class='pq_back_btn' id='Addr_Ip_back_btn' style='display:none' onclick='load_obj_addr_profiles();'><span>Back to Address Profile</span></button> <button type='button' onclick = 'Create(2)' class=' create'>Create New</button> <button type='button' disabled onclick = 'Edit(2)' class=' edit'>Edit</button> <button type='button' disabled onclick = 'Delete(2)' class=' delete'>Delete</button> </div> <table id='Address_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Address ID</th> <th>Address Name</th> <th>Type</th> <th>VLAN ID</th> <th>IP Addresses</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateAddressModal' class='modal'><div id='CreateAddressModalContent' class='modal-content' style=' height:345px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:95px'> Add New Address </label><br><br><label class='drop_down_label'> Address Name :</label><input id='addAddressName' type='text' class='field_prop'> <br><br> <label class='drop_down_label'> VLAN ID :</label><input id='addVLANID' disabled type='text' value='Any' class='field_prop'><br><br> <label class='drop_down_label'> Category :</label><select id='AddressCode' class='field_prop'> <option>IP Address</option><option>Subnet</option><option>IP Range</option></select><br><br><div id='appendAddress'><label class='drop_down_label'> IP Address :</label><input id='addIP' type='text' value='0.0.0.0' class='field_prop'><br><br> </div> <br><button id='addAddressToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditAddressModal' class='modal'><div id='EditAddressModalContent' class='modal-content' style=' height:395px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:120px'> Edit Address </label><br><br><label class='drop_down_label'> Address Name :</label><input id='editAddressName' required type='text' class='field_prop' pattern='\w{1,24}'> <br><br> <label class='drop_down_label'> VLAN ID :</label><input id='editVLANID' disabled type='text' value='' class='field_prop'><br><br> <label class='drop_down_label'> Category :</label><select id='AddressCodeEdit' class='field_prop'><option>IP Address</option><option>Subnet</option> <option>IP Range</option></select><br><br><div id='editAddress'></div><br><button id='editAddressToSystem' class='addUpdateRules'>Update</button></div></div> </div>";
var obj_addr_mac_html = "<div id='Object_Addr_Mac'> <div id='Object_Addr_Mac_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>MAC Addresses</div> <div id='object_addr_mac_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' class='pq_back_btn' id='Addr_Mac_back_btn' style='display:none' onclick='load_obj_addr_profiles();'><span>Back to Address Profile</span></button> <button type='button' onclick = 'Create(15)' class='create'>Add New MAC</button> <button type='button' disabled onclick = 'Edit(15)' class='edit'>Edit</button> <button type='button' disabled onclick = 'Delete(15)' class='delete'>Delete</button> <button type='button' onclick = 'Update_MAC_List()' style='background:#1a8cff;font-size:12px;font-family:helvetica;color:#fff;width:150px;border:none;border-radius:5px;height:30px;margin-left:5px;margin-top:5px;' >Refresh</button> </div> <table id='Addr_Mac_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Mac ID</th> <th>Name </th> <th>Mac </th> <th>IP </th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateMacModal' class='modal'><div class='modal-content' style=' width:400px;height:245px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:140px'> Add MAC </label><br><br><label class='drop_down_label'> Name of User :</label><input id='createMacName' type='text' class='field_prop' style='width:200px;' > <br><br> <label class='drop_down_label'> MAC Address :</label><input id='createMacAddr' type='text' class='field_prop' style='width:200px;' value='00:00:00:00:00:00'> <br><br> <br><button id='addMacToList' class='addUpdateRules'>Add to List</button> </div></div> <div id='EditMacModal' class='modal'><div class='modal-content' style=' width:400px;height:245px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:140px'> Add MAC </label><br><br><label class='drop_down_label'> Name :</label><input id='editMacName' type='text' class='field_prop' style='width:200px;' > <br><br> <label class='drop_down_label'> MAC :</label><input id='editMacAddr' type='text' class='field_prop' style='width:200px;' > <br><br> <br><button id='editMacToList' class='addUpdateRules'>Add to List</button> </div></div> </div>";
var obj_addr_prof_html = "<div id='Object_Addr_Prof'> <div id='Object_Addr_Prof_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Address Profiles</div> <div id='object_addr_prof_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='newAddrProfCreate' onclick = 'Create(16)' class='create'>Create New</button> <button type='button' disabled id='newAddrProfDelete' onclick = 'Delete(16)' class='delete'>Delete</button> <button type='button' id='addDHCP2List' class='pq_url_wbtn dhcp_display' style='float:right;width:120px;height:30px;font-size:12px;background:#208830;display:none' ><span>DHCP User List</span></button> <button type='button' id='addAD2List' class='pq_url_wbtn ad_display' style='float:right;width:120px;height:30px;font-size:12px;background:#208830;display:none' ><span>Active Directory</span></button> <button type='button' id='addMac2List' class='pq_url_wbtn' style='float:right;width:120px;height:30px;font-size:12px;background:#208830;' ><span>Mac Address List</span></button> <button type='button' id='addIP2List' class='pq_url_wbtn' style='float:right;width:120px;height:30px;font-size:12px;background:#208830' ><span>IP Address List</span></button> </div> <table id='Addr_Prof_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>ID</th> <th>Profile Name</th> <th>Details</th> <th>Occurrences</th> </tr></thead></table> </div> <div id='object_addr_prof_cntnt_holder' class='Pq_TableHolder' style='width:calc(100% - 40px);height:55%;position:absolute;bottom:25px'><div style='width:100%;padding:20px'> <div class='edit_panel'> <button type='button' disabled id='editAddrProfCreate' onclick = 'Create(17)' class='create'>Add Address</button> <button type='button' disabled id='editAddrProfDel' onclick = 'Delete(17)' class='delete'>Delete Address</button> </div> <table id='Addr_Prof_Content_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Addr Rule ID</th> <th>Profile ID</th> <th>Address Type</th> <th>Address ID</th> <th>Address</th> </tr></thead></table> </div> </div> </div> <div id='CreateAddrProfName' class='modal'><div class='modal-content' style='height:200px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add Address Profile </label><br><br><label class='drop_down_label'> Name :</label><input id='addAddrProfName' required type='text' class='field_prop' style='width:300px;' pattern='\w{1,24}'> <br><br> <br><button id='addAddrProfToTable' class='addUpdateRules'>Add to System</button> </div></div> <div id='AddAddrProfModal' class='modal'><div id='AddURLRuleModalContent' class='modal-content' style='height:245px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:38px'> Add Object to Address Profile </label><br><br><label class='drop_down_label'> Type :</label><select id='add_addr_type' class='field_prop' > <option value='0'>IP</option><option value='1'>MAC</option><option class='ad_display' style='display:none' value='2'>AD-User</option><option class='dhcp_display' style='display:none' value='3'>DHCP-User</option></select><br><br> <label class='drop_down_label'> Address :</label><select id='add_addr' class='field_prop'> </select><br><br> <br> <button id='addAddrToProfile' class='addUpdateRules'>Add to System</button> </div></div> </div>";
var obj_app_html = "<div id='App_Rule'> <div id='App_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Application Profiles</div> <div id='object_app_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='newAppProfCreate' onclick = 'Create(3)' class=' create'>Create New</button> <button type='button' disabled id='newAppProfDelete' onclick = 'Delete(3)' class=' delete'>Delete</button> <button type='button' id='addApp2List' class='pq_url_wbtn' style='float:right;width:105px;height:30px;font-size:12px;background:#208830' ><span>Application List</span></button> </div> <table id='App_Prof_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>App Prof ID</th> <th>Profile Name</th> <th>Details</th> <th>Occurrences</th> </tr></thead></table> </div> <div id='app_rule_holder' class='Pq_TableHolder' style='width:calc(100% - 40px);height:55%;position:absolute;bottom:25px'><div style='width:100%;padding:20px'> <div class='edit_panel'> <button type='button' disabled id='addAppRule' onclick = 'New_App_Control(1)' class='create'>Add Application</button> <button type='button' disabled id='editAppRule' onclick = 'New_App_Control(2)' class='edit'>Edit Application</button> <button type='button' disabled id='deleteAppRule' onclick = 'Delete(7)' class='delete'>Delete Application</button> </div> <table id='App_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>App ID</th> <th>Application</th> <th>Category</th> <th>Action</th> <th>Downlink Pipe</th><th>Uplink Pipe</th> </tr></thead></table> </div> </div> </div> <div id='CreateAppProfile' class='modal'><div class='modal-content' style=' width:400px;height:200px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:10%'> Add Application Profile </label><br><br><label class='drop_down_label'> Name :</label><input id='addAppProf' required type='text' class='field_prop' style='width:300px;' pattern='\w{1,24}'> <br><br> <br><button id='addAppProfToTable' class='addUpdateRules'>Add to System</button> </div></div> <div id='AddAppRuleModal' class='modal'><div id='AddAppRuleModalContent' class='modal-content' style=' width:400px;height:250px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:30px'> Add New Application to Profile </label><br><br><label class='drop_down_label'> Application :</label><input type='search' list='appControlID' class='field_prop'><datalist id='appControlID' ></datalist><br><br> <input id='addedApp' hidden type='text' class='field_prop'><label class='drop_down_label'> Action :</label><select id='app_action' class='field_prop'> <option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select><br><br><div id='append_app_pipes'></div><br><button id='addAppRuleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditAppRuleModal' class='modal'><div id='EditAppRuleModalContent' class='modal-content' style=' width:400px;height:250px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:35%'> Edit Application </label><br><br> <label class='drop_down_label'> Application :</label><input id='editAddedApp' type='text' class='field_prop'> <br><br> <label class='drop_down_label'> Action :</label><select id='edit_app_action' class='field_prop'> <option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select><br><br><div id='edit_app_pipes'></div><br><button id='editAppToProfile' class='addUpdateRules'>Update</button> </div></div> </div>";
var obj_app_list_html = "<div id='Object_App_List'><div id='Object_App_List_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Application List</div> <div id='object_app_list_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='appList_back_btn' hidden class='pq_back_btn' onclick='load_obj_app_profiles();'><span>Back to App Profiles</span></button> </div> <table id='App_List_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>App ID</th> <th>ID</th> <th>Application</th> </tr></thead></table> </div> </div> </div>";
var obj_pipe_schedules_html = "<div id='Object_Pipe_Schedules'> <div id='Object_Pipe_Schedules_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Pipe Schedules</div> <div id='object_pipe_schedules_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' onclick = 'Create(14)' class=' create'>Create New</button> <button type='button' disabled onclick = 'Edit(14)' class=' edit'>Edit</button> <button type='button' disabled onclick = 'Delete(14)' class=' delete'>Delete</button> </div> <table id='Pipe_Schedules_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Pipe Schedule ID</th> <th>Name</th> <th>Schedule </th> <th>Scheduled Action </th> <th>Scheduled Downlink Pipe </th> <th>Scheduled Uplink Pipe </th> <th>Default Action </th> <th>Default Downlink Pipe </th> <th>Default Uplink Pipe </th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreatePipeSchedulesModal' class='modal'><div id='CreatePipeSchedulesModalContent' class='modal-content' style='max-height:350px;height:100%;margin-top:-70px;overflow-y:scroll;width:420px'><div style='min-height:280px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:80px'> Add New Pipe Schedule </label><br><br><label class='drop_down_label'> Pipe Schedule Name :</label><input id='addPipeScheduleName' required type='text' value='' pattern='\w{1,24}' class='field_prop' > <br><br> <label class='drop_down_label'> Schedule :</label> <select id='add_sched_to_pipe' class='field_prop'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='add_sched_action' class='field_prop'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='append_pipes_to_schedule'></div> <label class='drop_down_label'> Default Action :</label><select id='add_def_pipe_sched_action' class='field_prop'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='append_def_pipes_to_schedule'></div><br><button id='addPipeScheduleToSystem' class='addUpdateRules'>Add to System</button> </div></div></div> <div id='EditPipeSchedulesModal' class='modal'><div id='EditPipeSchedulesModalContent' class='modal-content' style='max-height:350px;height:100%;margin-top:-70px;overflow-y:scroll;width:420px'><div style='min-height:280px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:70px'> Edit Pipe Schedule </label><br><br><label class='drop_down_label'> Pipe Schedule Name :</label> <input id='editPipeScheduleName' required type='text' class='field_prop' style='font' > <br><br> <label class='drop_down_label'> Schedule :</label> <select id='edit_sched_to_pipe' class='field_prop'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='edit_sched_action' class='field_prop'> <option value='-1'>Block</option><option value='0' >Allow</option><option value='2' >Shape</option></select><br><br> <div id='edit_pipes_to_schedule'></div><label class='drop_down_label'> Default Action :</label><select id='edit_def_pipe_sched_action' class='field_prop'> <option value='-1'>Block</option><option value='0' >Allow</option><option value='2' >Shape</option></select><br><br><div id='edit_def_pipes_to_schedule'></div><br><button id='editPipeScheduleToSystem' class='addUpdateRules'>Update</button> </div></div></div> </div>";
var obj_sched_html = "<div id='Object_Schedules'> <div id='Object_Schedules_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Schedules</div> <div id='object_schedule_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' onclick = 'Create(4)' class=' create'>Create New</button> <button type='button' disabled onclick = 'Edit(4)' class=' edit'>Edit</button> <button type='button' disabled onclick = 'Delete(4)' class=' delete'>Delete</button> </div> <table id='Schedule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Schedule ID</th> <th>Schedule Name</th> <th>Type</th> <th>Active Days</th> <th>Start Time</th> <th>End Time</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateScheduleModal' class='modal'><div class='modal-content' id='CreateScheduleModalContent' style='height:440px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:28%'> Add New Schedule </label><br><br><label class='drop_down_label'> Name :</label><input id='addScheduleName' required type='text' class='field_prop' pattern='\w{1,24}'> <br><br> <label class='drop_down_label'> Type :</label><select id='ScheduleCode' class='field_prop'> <option >Weekly Recurring</option><option >One Time</option></select><br><br><div id='appendSchedule'> <label class='drop_down_label'> Days :</label> <input type='checkbox' style='margin-left:118px' id='Recur_1'> <label class='check_box_prop'>Monday </label> <input type='checkbox' style='margin-left:41px' id='Recur_2'> <label class='check_box_prop'>Tuesday </label><br> <input type='checkbox' style='margin-left:157px' id='Recur_3'> <label class='check_box_prop'>Wednesday </label> <input type='checkbox' style='margin-left:20px' id='Recur_4'> <label class='check_box_prop'>Thursday </label><br> <input type='checkbox' style='margin-left:157px' id='Recur_5'> <label class='check_box_prop'>Friday</label> <input type='checkbox' style='margin-left:51px' id='Recur_6'> <label class='check_box_prop'>Saturday</label><br> <input type='checkbox' style='margin-left:157px' id='Recur_7'> <label class='check_box_prop'>Sunday</label><br><br><label class='drop_down_label'> Start Time :</label> <input type='text' id='startTimeRecur' class='clockpicker field_prop ' placeholder ='Start Time' style='margin-left:90px;text-indent:5px'> <br><br> <label class='drop_down_label'> End Time :</label> <input type='text' id='endTimeRecur' class='clockpicker field_prop' placeholder ='End Time' style='margin-left:90px;text-indent:5px'><br> </div> <br><button id='addScheduleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditScheduleModal' class='modal'><div class='modal-content' id='EditScheduleModalContent' ><span class='close'>×</span><label class='modalTitle' style=' margin-left:35%'> Edit Schedule </label><br><br><label class='drop_down_label'> Name :</label><input id='editScheduleName' required type='text' class='field_prop' pattern='\w{1,24}'> <br><br> <label class='drop_down_label'> Type :</label><select id='ScheduleCodeEdit' class='field_prop'><option >Weekly Recurring</option><option >One Time</option></select><br><br><div id='editSchedule'> </div> <br> <button id='editScheduleToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var obj_serv_html = "<div id='Service_Rule'> <div id='Service_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Service Profiles</div> <div id='object_service_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='newServiceProfCreate' onclick = 'Create(12)' class='create'>Create New</button> <button type='button' disabled id='newServiceProfDelete' onclick = 'Delete(12)' class='delete'>Delete</button> <button type='button' id='addService2List' class='pq_url_wbtn' style='float:right;width:95px;height:30px;font-size:12px;background:#208830' ><span>Service List</span></button> </div> <table id='Service_Prof_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Service ID</th> <th>Profile Name</th> <th>Details</th> <th>Occurrences</th> </tr></thead></table> </div> <div id='service_rule_holder' class='Pq_TableHolder' style='width:calc(100% - 40px);height:55%;position:absolute;bottom:25px'><div style='width:100%;padding:20px'> <div class='edit_panel'> <button type='button' disabled id='addServiceRule' onclick = 'Create(5)' class='create'>Add Service</button> <button type='button' disabled id='editServiceRule' onclick = 'Edit(5)' class='edit'>Edit Service</button> <button type='button' disabled id='deleteServiceRule' onclick = 'Delete(5)' class='delete'>Delete Service</button> </div> <table id='Service_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Service Rule ID</th> <th>Profile ID</th><th>Service ID</th> <th>Service</th> <th>Protocol</th> <th>Action</th> <th>Downlink Pipe</th><th>Uplink Pipe</th> </tr></thead></table> </div> </div> </div> <div id='CreateServiceName' class='modal'><div class='modal-content' style=' width:400px;height:200px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add Service Profile </label><br><br><label class='drop_down_label'> Name :</label><input id='addServiceObjectName' required type='text' class='field_prop' style='width:300px;' pattern='\w{1,24}'> <br><br> <br><button id='addServiceObjectToTable' class='addUpdateRules'>Add to System</button> </div></div> <div id='AddServiceRuleModal' class='modal'><div id='AddServiceRuleModalContent' class='modal-content' style='height:290px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add New Service </label><br><br> <label class='drop_down_label'> Service :</label><select id='add_service' class='field_prop' > </select><br><br> <label class='drop_down_label'> Protocol :</label><select id='add_service_protocol' class='field_prop' > <option value='1'>TCP</option><option value='2'>UDP</option><option value='3'>Any</option></select><br><br> <label class='drop_down_label'> Action :</label><select id='service_action' class='field_prop' > <option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select><br><br><div id='append_service_pipes'></div><br> <button id='addServiceToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditServiceModal' class='modal'><div id='EditServiceModalContent' class='modal-content' style='height:290px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:120px'> Edit Service </label><br><br> <label class='drop_down_label'> Service :</label><select id='edit_service' class='field_prop' > </select><br><br> <label class='drop_down_label'> Protocol :</label><select id='edit_service_protocol' class='field_prop' > <option value='1'>TCP</option><option value='2'>UDP</option><option value='3'>Any</option></select><br><br> <label class='drop_down_label'> Action :</label><select id='edit_service_action' class='field_prop' > <option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select><br><br><div id='edit_service_pipes'></div><br> <button id='editServiceToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var obj_serv_list_html = "<div id='Object_Service_List'><div id='Object_Service_List_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Service List</div> <div id='object_service_list_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='servList_back_btn' hidden class='pq_back_btn' onclick='load_obj_service_profiles();'><span>Back to Service Profile</span></button> <button type='button' id='newServiceCreate' onclick = 'Create(11)' class='create'>Add New Service</button> <button type='button' disabled id='newServiceDelete' onclick = 'Delete(11)' class='delete'>Delete Service</button> </div> <table id='Service_List_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Service ID</th> <th>Service</th> <th>Port/ Port Range </th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateNewService' class='modal'><div id='CreateNewServiceModalContent' class='modal-content' style=' height:290px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add New Service </label><br><br><label class='drop_down_label'> Service :</label><input id='newServiceName' type='text' class='field_prop'> <br><br> <label class='drop_down_label'> Category :</label><select id='ServicePortCode' class='field_prop'> <option value='1'>Port</option><option value='2' disabled>Port Range</option></select><br><br><div id='appendServicePort'><label class='drop_down_label'> Port No :</label><input id='addServPort' type='text' value='0' class='field_prop'><br><br> </div> <br><button id='addServiceToList' class='addUpdateRules'>Add to List</button> </div></div> </div>";
var obj_pipes_html = "<div id='Object_Pipes'> <div id='Object_Pipes_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Pipes</div> <div id='object_pipe_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' onclick = 'Create(6)' class=' create'>Create New</button> <button type='button' disabled onclick = 'Edit(6)' class=' edit'>Edit</button> <button type='button' disabled onclick = 'Delete(6)' class=' delete'>Delete</button> </div> <table id='Pipe_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Pipe ID</th> <th>Pipe Name</th> <th>Pipe Type</th> <th>Pipe Generation</th> <th>Guaranteed Bandwidth (Kbps)</th> <th>Maximum Bandwidth (Kbps)</th> <th>Priority</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateAdminPipeModal' class='modal'><div class='modal-content' style='height:460px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:20%'> Add New Traffic Pipe </label><br><br><label class='drop_down_label'> Pipe Name :</label><input id='addAdminPipeName' type='text' value='' pattern='\w{1,24}' class='field_prop' > <br><br> <label class='drop_down_label'> Pipe Type :</label><select id='adminPipeType' class='field_prop'> <option value='0'>Per-IP</option><option value='1'>Shared</option></select> <br><br><label class='drop_down_label'> Pipe Generation :</label><select id='adminGroupingType' class='field_prop'> <option value='0'>Per-Item</option><option value='1'>Per-Profile</option><option value='2'>Per-Rule</option></select> <br><br> <label class='drop_down_label'> Guaranteed <br> Bandwidth (Kbps) :</label><input id='adminPipeGuarantBW' type='text' class='field_prop' ><br><br> <label class='drop_down_label'> Maximum <br> Bandwidth (Kbps) :</label><input id='adminPipeMaxBW' type='text' class='field_prop' > <br><br> <label class='drop_down_label'> Priority :</label><select id='adminPipePriority' class='field_prop'><option value='1'>Low</option><option value='50'>Medium</option><option value='99'>High</option></select> <br><br><br> <button id='addAdminPipeToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditAdminPipeModal' class='modal'><div class='modal-content' style='height:460px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:27%'> Edit Traffic Pipe </label><br><br><label class='drop_down_label'> Pipe Name :</label> <input id='editAdminPipeName' type='text' class='field_prop' style='font' > <br><br> <label class='drop_down_label'> Pipe Type :</label><select id='editAdminPipeType' class='field_prop'> <option value='0'>Per-IP</option><option value='1'>Shared</option></select> <br><br><label class='drop_down_label'> Pipe Generation :</label><select id='editAdminGroupingType' class='field_prop'> <option value='0'>Per-Item</option><option value='1'>Per-Profile</option><option value='2'>Per-Rule</option></select> <br><br> <label class='drop_down_label'> Guaranteed <br> Bandwidth (Kbps) :</label><input id='editAdminPipeGuarantBW' type='text' class='field_prop' ><br><br> <label class='drop_down_label'> Maximum <br> Bandwidth (Kbps) :</label><input id='editAdminPipeMaxBW' type='text' class='field_prop' > <br><br> <label class='drop_down_label'> Priority :</label><select id='adminPipePriorityEdit' name='destination' class='field_prop'><option value='1'>Low</option><option value='50'>Medium</option><option value='99'>High</option></select> <br><br><br> <button id='editAdminPipeToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var obj_url_html = "<div id='URL_Rule'> <div id='URL_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>URL Profiles</div> <div id='object_url_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='newURLProfCreate' onclick = 'Create(8)' class='create'>Create New</button> <button type='button' disabled id='newURLProfDelete' onclick = 'Delete(8)' class='delete'>Delete</button> <button type='button' id='addURL2List' class='pq_url_wbtn' style='float:right;width:90px;height:30px;font-size:12px;background:#208830' ><span>URL List</span></button> </div> <table id='URL_Prof_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>ID</th> <th>Profile Name</th> <th>Details</th> <th>Occurrences</th> </tr></thead></table> </div> <div id='url_rule_holder' class='Pq_TableHolder' style='width:calc(100% - 40px);height:55%;position:absolute;bottom:25px'><div style='width:100%;padding:20px'> <div class='edit_panel'> <button type='button' disabled id='addURLRule' onclick = 'New_URL(1)' class='create'>Add URL</button> <button type='button' disabled id='editURLRule' onclick = 'New_URL(2)' class='edit'>Edit URL</button> <button type='button' disabled id='deleteURLRule' onclick = 'Delete(9)' class='delete'>Delete URL</button> </div> <table id='URL_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>URL Rule ID</th> <th>Profile ID</th><th>URL ID</th> <th>Authentication</th> <th>URL</th><th>Action</th> <th>Downlink Pipe</th><th>Uplink Pipe</th> </tr></thead></table> </div> </div> </div> <div id='CreateURLName' class='modal'><div class='modal-content' style=' width:400px;height:200px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add URL Profile </label><br><br><label class='drop_down_label'> Name :</label><input id='addURLObjectName' required type='text' class='field_prop' style='width:300px;' pattern='\w{1,24}'> <br><br> <br><button id='addURLObjectToTable' class='addUpdateRules'>Add to System</button> </div></div> <div id='AddURLRuleModal' class='modal'><div id='AddURLRuleModalContent' class='modal-content' style='height:290px;width:500px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:170px'> Add New URL </label><br><br><label class='drop_down_label'> Authentication :</label><select id='url_authen' class='field_prop' style='width:340px;'> <option value='1'>HTTP</option><option value='2'>HTTPS</option><option value='3'>HTTP or HTTPS</option></select><br><br> <label class='drop_down_label'> URL :</label><select id='add_url' class='field_prop' style='width:340px;'> </select><br><br> <label class='drop_down_label'> Action :</label><select id='url_rule_action' class='field_prop' style='width:340px;'> <option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select><br><br><div id='append_url_pipes'></div><br> <button id='addURLRuleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditURLRuleModal' class='modal'><div id='EditURLRuleModalContent' class='modal-content' style='height:290px;width:500px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:190px'> Edit URL </label><br><br><label class='drop_down_label'> Authentication :</label><select id='edit_url_rule_authen' class='field_prop' style='width:340px;'> <option value='1'>HTTP</option><option value='2'>HTTPS</option><option value='3'>HTTP or HTTPS</option></select><br><br> <label class='drop_down_label'> URL :</label><select id='edit_new_url_to_rule' class='field_prop' style='width:340px;'> </select><br><br> <label class='drop_down_label'> Action :</label><select id='url_rule_action' class='field_prop' style='width:340px;'> <option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option><option value='3'>Scheduled Shaping</option></select><br><br><div id='edit_url_pipes'></div><br> <button id='editURLRuleToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var obj_url_list_html = "<div id='Object_URL_List'> <div id='Object_URL_List_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>URL List</div> <div id='object_url_list_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='urlList_back_btn' hidden class='pq_back_btn' onclick='load_obj_url_profiles();'><span>Back to URL Profile</span></button> <button type='button' id='newURLCreate' onclick = 'Create(10)' class='create'>Add New URL</button> <button type='button' disabled id='newURLDelete' onclick = 'Delete(10)' class='delete'>Delete URL</button> </div> <table id='URL_List_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>URL ID</th> <th>URL </th> <th>DNS </th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateNewURL' class='modal'><div class='modal-content' style=' width:400px;height:245px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:140px'> Add URL </label><br><br><label class='drop_down_label'> URL :</label><input id='newURLList' type='text' class='field_prop' style='width:300px;' > <br><br> <label class='drop_down_label'> DNS :</label><select id='add_dns_det' class='field_prop' style='width:300px;'> <option value='0'>Disable</option> <option value='1'>Enable</option> </select><br><br> <br><button id='addURLToList' class='addUpdateRules'>Add to List</button> </div></div> </div>";
var rule_mon_html = "<div id='Rule_Monitor'> <div class='Pq_LinkPlotHolder' style='height:calc(100% - 40px);width:95%'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Rule Monitor</div> <div id='Rule_Monitor_table_holder' style='width:95%;height:calc(40% - 80px);overflow-y:auto;margin:auto'><table id='Rule_Monitor_table' class='display cell-border AppUserTablesFont ' cellspacing='0' width='100%' ><thead><tr> <th>Rule ID</th> <th>Packet Count</th> <th>Downlink Packet Drop</th> <th>Uplink Packet Drop</th> <th>Active Sessions</th> <th>Downlink Usage</th> <th>Uplink Usage</th> <th></th> </tr></thead> </table> </div> <div class='Pq_LinkPlotHolder' style='height:30%;width:96%'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='rule_live_bwm' style='font-size:14px;height:30px'>Live Bandwidth</div> <div id='pq_rule_monitor_bw_stat' style='font-size:11px;width:100%;height:30px;background-color:#222222'><div style='width:15px;height:15px;background-color:green;float:left;margin-right:10px;margin-left:20px' class='pq_bwevent_vcenter'></div> <a id ='pq_rule_monitor_dlink_usage' style='font-size:11px;float:left;margin-right:50px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Received:1.53 GB</a> <div style='width:15px;height:15px;background-color:#a8334d;float:left;margin-right:10px' class='pq_bwevent_vcenter'></div> <a id ='pq_rule_monitor_ulink_usage' style='font-size:11px;float:left;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Sent:223 MB</a> <div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><button type='button' onclick='btn_rule_bw_load_now(1)' autofocus='autofocus' class='btn btn-primary btn-xs'>bandwidth (10 s)</button><button type='button' onclick='btn_rule_bw_load_now(2)' class='btn btn-primary btn-xs'>bandwidth (1 ms)</button></div> <!-- <a id ='pq_rule_monitor_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Received:1.53 GB</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> <a id ='pq_rule_monitor_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Sent:223 MB</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> --></div> <div style='width:100%;height:calc(100% - 85px);background-color:whitesmoke;position:relative'><div id='rule_av_bwm_plot' class='Pq_HPlot' style='width:97%;height:100%;padding:20px;position:absolute;z-index:10'><div style='padding:3%;padding-left:120px;font-size:30px;font-family:Helvetica;font-weight:bold;color:#888;text-align:center;'> Select a Rule and click 'Live' button</div></div><div id='rule_lv_bwm_plot' class='Pq_HPlot' style='width:97%;height:100%;padding:20px;position:absolute;z-index:-10'></div></div></div> <div class='Pq_LinkPlotHolder' style='height:30%;width:96%'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='rule_pkt_drop_monitor' style='font-size:14px;height:30px'>Packet Drop</div> <div id='pq_rule_monitor_pkt_stat' style='font-size:11px;width:100%;height:30px;background-color:#222222'> <div style='width:15px;height:15px;background-color:green;float:left;margin-right:10px;margin-left:20px' class='pq_bwevent_vcenter'></div> <a id ='pq_rule_monitor_dlink_pkt' style='font-size:11px;float:left;margin-right:35px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Downlink Packet Drop:523</a> <div style='width:15px;height:15px;background-color:#a8334d;float:left;margin-right:10px' class='pq_bwevent_vcenter'></div> <a id ='pq_rule_monitor_ulink_pkt' style='font-size:11px;float:left;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Uplink Packet Drop:200</a></div> <div id='rule_pkt_drop_monitor_plot' style='width:100%;height:calc(100% - 75px);background-color:whitesmoke;position:relative'><div style='padding:3%;font-size:30px;font-family:Helvetica;font-weight:bold;color:#888;text-align:center;'> Select a Rule and click 'Live' button</div></div></div> </div></div>";
var quota_rules_html = "<div id='Quota_Management'> <div id='Quota_Management_Holder' class='Pq_TableHolder'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Quota Rule Table</div> <div id='quota_table_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' onclick = 'Create_Q(1)' class='create'>Create New</button> <button type='button' disabled onclick = 'Edit_Q(1)' class='edit'>Edit</button> <button type='button' disabled onclick = 'Delete_Q(1)' class='delete'>Delete</button> </div> <table id='Quota_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Priority</th> <th>Quota ID</th> <th>Address</th><th>Application Profile</th><th>URL Profile</th><th>Service Profile</th><th>Default Quota</th> </tr></thead></table> </div> </div> <div id='CreateQuotaRuleModal' class='modal'><div id='CreateQuotaRuleModalContent' class='modal-content' style='height:350px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:105px'> Add Quota Rule </label><br><br><label class='drop_down_label'> Address :</label><select id='add_quota_source' class='field_prop'></select> <br><br><label class='drop_down_label'> Application Profile :</label><select id='add_app_quota_profile' class='field_prop'></select> <br><br> <label class='drop_down_label'> URL Profile :</label><select id='add_url_quota_profile' class='field_prop'><option value='0'>None</option></select> <br><br> <label class='drop_down_label'> Service Profile :</label><select id='add_serv_quota_profile' class='field_prop'><option value='0'>None</option></select> <br><br> <label class='drop_down_label'> Default Quota :</label><select id='add_quota_default_quota' class='field_prop'></select> <br><br> <button id='addQuotaToSystem' class='addUpdateRules'>Add To System</button> </div></div> <div id='EditQuotaRuleModal' class='modal'><div id='EditQuotaRuleModalContent' class='modal-content' style='height:350px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:105px'> Edit Quota Rule </label><br><br><label class='drop_down_label'> Source :</label><select id='edit_quota_source' class='field_prop'></select> <br><br><label class='drop_down_label'> Application Profile :</label><select id='edit_app_quota_profile' class='field_prop'></select> <br><br> <label class='drop_down_label'> URL Profile :</label><select id='edit_url_quota_profile' class='field_prop'><option value='0'>None</option></select> <br><br> <label class='drop_down_label'> Service Profile :</label><select id='edit_serv_quota_profile' class='field_prop'><option value='0'>None</option></select> <br><br> <label class='drop_down_label'> Default Quota :</label><select id='edit_quota_default_quota' class='field_prop'></select> <br><br> <button id='editQuotaToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var quota_app_profiles_html = "<div id='Quota_App_Profiles'> <div id='Quota_App_Profiles_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 40px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Quota Application Profiles</div> <div id='quota_app_profile_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' id='newQuotaAppProfCreate' onclick = 'Create_Q(3)' class=' create'>Create New</button> <button type='button' disabled id='newQuotaAppProfDelete' onclick = 'Delete_Q(3)' class=' delete'>Delete</button> <button type='button' id='addApp2List' class='pq_url_wbtn' style='float:right;width:105px;height:30px;font-size:12px;background:#208830' ><span>Application List</span></button> </div> <table id='Quota_App_Prof_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>App Prof ID</th> <th>Profile Name</th> <th>Details</th> <th>Occurrences</th> </tr></thead></table> </div> <div id='object_new_quota_app_holder' class='Pq_TableHolder' style='width:calc(100% - 40px);height:55%;position:absolute;bottom:25px'><div id='object_new_quota_application_holder' style='width:100%;padding:20px'> <div class='edit_panel'> <button type='button' disabled id='editQuotaAppProfCreate' onclick = 'New_Quota_App_Control(1)' class='create'>Add Application</button> <button type='button' disabled id='editQuotaAppProfEdit' onclick = 'New_Quota_App_Control(2)' class='edit'>Edit Application</button> <button type='button' disabled id='editQuotaAppProfDel' onclick = 'Delete_Q(4)' class='delete'>Delete Application</button> </div> <table id='Quota_App_Prof_List_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>App ID</th> <th>Application</th> <th>Quota Profile</th> </tr></thead></table> </div> </div> </div> <div id='CreateQuotaAppName' class='modal'><div class='modal-content' style=' height:200px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:40px'> Add Quota Application Profile </label><br><br><label class='drop_down_label'> Name :</label><input id='addQuotaAppObjectName' required type='text' class='field_prop' style='width:300px;' pattern='\w{1,24}'> <br><br> <br><button id='addQuotaAppCtrlNameToTable' class='addUpdateRules'>Add to System</button> </div></div> <div id='CreateQuotaAppModal' class='modal'><div id='CreateQuotaAppModalContent' class='modal-content' style='height:220px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:70px'> Add Application Quota </label><br><br> <label class='drop_down_label'> Application :</label><input type='search' list='addAppQuotaID' class='field_prop'><datalist id='addAppQuotaID' ></datalist><br><br> <input id='addedQuotaApp' hidden type='text' class='field_prop'><label class='drop_down_label'> Quota Profile:</label><select id='add_quota_app_profile' class='field_prop'> </select><br><br><button id='addQuotaAppCtrlToTable' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditQuotaAppModal' class='modal'><div id='EditQuotaAppModalContent' class='modal-content' style='height:220px'><span class='close'>×</span><label class='modalTitle' style='margin-left:75px'> Edit Application Quota</label><br><br> <label class='drop_down_label'> Application :</label><input id='editQuotaAddedApp' type='text' class='field_prop'> <br><br> <label class='drop_down_label'> Quota Profile :</label><select id='edit_quota_app_profile' class='field_prop'> </select><br><br><button id='editQuotaAppCtrlToTable' class='addUpdateRules'>Update</button> </div></div> </div>";
var quota_profiles_html = "<div id='Quota_Prof'> <div id='Quota_Prof_Holder' class='Pq_TableHolder' style='height:calc(100% - 40px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Quota Profiles</div> <div id='quota_prof_holder' style='width:100%;padding:20px'><div class='edit_panel'><button type='button' onclick = 'Create_Q(5)' class='create'>Create New</button> <button type='button' disabled onclick = 'Edit_Q(5)' class='edit'>Edit</button> <button type='button' disabled onclick = 'Delete_Q(5)' class='delete'>Delete</button> </div> <table id='Quota_Prof_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Quota ID</th> <th>Quota Name</th> <th>Quota Limiting Type</th> <th>Quota (MB)</th> <th>Quota Sharing Type</th> <th>Quota Generation</th> <th>Default Action</th> <th>Downlink Shaper</th> <th>Uplink Shaper</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateQuotaProfModal' class='modal'><div id='CreateQuotaProfModalContent' class='modal-content' style='height:400px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:95px'> Add Quota Profile </label><br><br><label class='drop_down_label'> Quota Profile Name :</label><input id='addQuotaProfName' type='text' value='' pattern='\w{1,24}' class='field_prop'><br><br> <label class='drop_down_label'> Quota Limiting Type :</label><select id='addQuotaProfType' class='field_prop'> <option value='1'>Daily</option><option value='2'>Weekly</option><option value='3'>Monthly</option></select> <br><br><label class='drop_down_label'> Maximum Quota (MB) :</label><input id='addQuotaProfAmount' type='text' value='0' class='field_prop' > <br><br> <label class='drop_down_label'> Quota Sharing Type :</label><select id='addQuotaPipeType' class='field_prop'> <option value='0'>Per-IP</option><option value='1'>Shared</option></select> <br><br><label class='drop_down_label'> Quota Generation :</label><select id='addQuotaGroupingType' class='field_prop'> <option value='0'>Per-Item</option><option value='1'>Per-Profile</option><option value='2'>Per-Rule</option></select> <br><br> <label class='drop_down_label'> Default Action :</label><select id='add_def_quota_action' class='field_prop'><option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option></select> <br><br> <div id='append_quota_prof_shapers'> </div> <button id='addQuotaProfToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditQuotaProfModal' class='modal'><div id='EditQuotaProfModalContent' class='modal-content' style='height:400px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:95px'> Edit Quota Profile </label><br><br><label class='drop_down_label'> Quota Profile Name :</label><input id='editQuotaProfName' required type='text' value='' pattern='\w{1,24}' class='field_prop'><br><br> <label class='drop_down_label'> Quota Limiting Type :</label><select id='editQuotaProfType' class='field_prop'> <option value='1'>Daily</option><option value='2'>Weekly</option><option value='3'>Monthly</option></select> <br><br><label class='drop_down_label'> Maximum Quota (MB) :</label><input id='editQuotaProfAmount' required type='text' value='0' class='field_prop' > <br><br> <label class='drop_down_label'> Quota Sharing Type :</label><select id='editQuotaPipeType' class='field_prop'> <option value='0'>Per-IP</option><option value='1'>Shared</option></select> <br><br><label class='drop_down_label'> Quota Generation :</label><select id='editQuotaGroupingType' class='field_prop'> <option value='0'>Per-Item</option><option value='1'>Per-Profile</option><option value='2'>Per-Rule</option></select> <br><br> <label class='drop_down_label'> Default Action :</label><select id='edit_def_quota_action' class='field_prop'><option value='0'>Allow</option><option value='-1'>Block</option> <option value='2'>Simple Shaping</option></select> <br><br> <div id='edit_quota_prof_shapers'> </div> <button id='editQuotaProfToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var quota_usage_html = "<div id='Quota_Usage'> <div id='Quota_Usage_Holder' class='Pq_TableHolder'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Quota Usage Table</div> <div id='quoata_usage_table_holder' style='width:100%;padding:20px'><table id='Quota_Usage_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Quota ID</th> <th>Address</th><th>Application Profile</th><th>URL Profile</th><th>Service Profile</th><th>Default Quota</th> </tr></thead></table> </div> </div> </div>";
var bw_history_html = "<div id='C_History' tabindex='1'><div id='pq_bwh_grap_tool_bar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#222222'><!--<div class='pq_bwh_grap_tool_bar' style='position:relative'>--><button class='pq_flow_apply' onclick='bwh_apply_btnclk()' style='margin-right:10px;width:60px;margin-top:7px;'>Apply</button> <button class='pq_flow_refresh' onclick='bwh_refresh_btn_click()' style='margin-top:7px;'>Refresh</button><input type='text' required placeholder='Select end date and end time' id='date_input_bw_his_et' class='pq_bwh_grapth_endt Pq_Center'><div class='Pq_Center bq_bwh_lend_time'>End Time</div><img src='image/time.png' class='Pq_Center pq_bwh_endtime_png'> <input type='text' required placeholder='Select start date and start time' id='date_input_bw_his_st' class='pq_bwh_grapth_endt Pq_Center'><div class='Pq_Center bq_bwh_lend_time'>Start Time</div><img src='image/time.png' class='Pq_Center pq_bwh_endtime_png'><select id='pq_bwh_vlan_selector' style='margin-right:20px' name='pq_bwh_lselect' class='Pq_Center pq_bwh_link_selection'></select><div class='Pq_Center bq_bwh_lend_time'>VLAN ID</div><img src='image/link.png' class='Pq_Center pq_bwh_endtime_png'></div><div style='width:100%;height:calc(100% - 40px);background:#fff'><div class='Pq_TableHolder' style='position:relative;height:calc(50% - 35px);width:calc(100% - 35px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='bwhist_dlink_label' style='height:35px;font-size:14px'>Network Downlink Bandwidth</div> <div style='position:relative;width:100%;height:calc(100% - 45px);background-color:whitesmoke'><div style='position:absolute;width:100%;height:100%'><div id='pq_bwh_dl_plot' style='width:100%;height:100%;float:left;position:relative'></div></div><div id='pq_bwh_dl_plot_no_data' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/hchart.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:#1a7cea;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>No Data Loaded</a></div></div><div id='pq_bwh_dl_plot_no_avil' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/no_data.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Data Not Available</a></div></div><div id='pq_bwh_dl_plot_loading' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;float:left'><img src='image/gif/loading-48.gif' class='pq_hvcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:30%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Loading Data ...</a></div></div></div></div><div class='Pq_TableHolder' style='height:calc(50% - 35px);width:calc(100% - 35px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='bwhist_ulink_label' style='height:35px;font-size:14px'>Network Uplink Bandwidth</div> <div style='position:relative;width:100%;height:calc(100% - 45px);background-color:whitesmoke'><div style='position:absolute;width:100%;height:100%'><div id='pq_bwh_ul_plot' style='width:100%;height:100%;float:left;position:relative'></div></div><div id='pq_bwh_ul_plot_no_data' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/hchart.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:#1a7cea;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>No Data Loaded</a></div></div><div id='pq_bwh_ul_plot_no_avil' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/no_data.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Data Not Available</a></div></div><div id='pq_bwh_ul_plot_loading' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;float:left'><img src='image/gif/loading-48.gif' class='pq_hvcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:30%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Loading Data ...</a></div></div></div></div><div class='pq_bwh_move_bar' style='background:transparent'><button id='bw_hist_prev_btn' class='Pq_Center bw_hist_nxt_prev_btn' onclick='bwh_previous_click()' style='width:125px;margin-right:0px;top:15px;margin-left:calc(50% - 115px) '>Previous</button><button id='bw_hist_next_btn' class='Pq_Center bw_hist_nxt_prev_btn' onclick='bwh_next_click()' style='width:75px;margin-left:5px;top:15px'>Next</button></div> </div> </div>";
var reports_html = "<div id='C_Usage' tabindex='1'><div id='App_Overall_Usage' style='overflow:scroll;min-width:1130px;min-height:560px'> <!-- <div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#222222'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='report_mode' value='1' style='margin-left:25px' checked><label class='timeSelectorText' for='radio_hourly'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='report_mode' value='2' style='margin-left:20px' ><label class='timeSelectorText' for='radio_daily' >Custom Mode</label> </div>--><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='report_mode' value='1' style='margin-left:15px' checked><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='report_mode' value='2' style='margin-left:10px' ><label class='timeSelectorText' for='radio_r_custom' >Custom Mode</label> <label class='drop_down_label_reporting' style='margin-left:25px;color:#fff'> User :</label> <select id='userID' class='field_prop_reporting' disabled style='width:175px;font-size:10px;height:20px;'><option value='99' disabled>All Users</option></select> <label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> Application :</label><select id='appID' class='field_prop_reporting' style='font-size:10px;height:20px;'><option value=''>~All Applications~</option></select> <label class='drop_down_label_reporting' style='margin-left:28px;color:#fff' > Application Count :</label><select id='appCount' name='source' class='field_prop_reporting' style='width:50px;font-size:10px;height:20px;'><option value='10'>10</option><option value='20'>20</option><option value='30'>30</option><option value='40'>40</option> <option value='50'>50</option></select> <label class='drop_down_label_reporting' style='margin-left:28px;color:#fff'> Link :</label><select id='linkType' name='source' class='field_prop_reporting' style='font-size:10px;width:68px;;height:20px;'><option value='1'>Total</option><option value='2'>Uplink</option><option value='3'>Downlink</option></select> </div> </div><div id='quickReportBar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267;padding-top:5px'><input id='radio_q_this_hour' type='radio' name='quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour' >This Hour</label> <input id='radio_q_hour' type='radio' name='quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_hour' >Last Hour</label> <input id='radio_q_this_day' type='radio' name='quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' checked title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day' >This Day</label> <input id='radio_q_day' type='radio' name='quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day' >Yesterday</label> <input id='radio_q_this_month' type='radio' name='quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month' >This Month</label> <input id='radio_q_month' type='radio' name='quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='customReportBar' hidden style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><input id='radio_hourly' type='radio' name='durationSelector' value='1' style='margin-left:10px' data-container='body' data-toggle='tooltip' title='A time duration within two days in terms of hours can be selected' data-placement='bottom' checked><label class='timeSelectorText ' for='radio_hourly'>Hourly</label> <input id='radio_daily' type='radio' name='durationSelector' value='2' data-container='body' data-toggle='tooltip' title='A time duration within two months in terms of days can be selected' data-placement='bottom' ><label class='timeSelectorText' for='radio_daily' >Daily</label> <input id='radio_monthly' type='radio' name='durationSelector' value='3' data-container='body' data-toggle='tooltip' title='A time duration within two years in terms of months can be selected' data-placement='bottom'><label class='timeSelectorText' for='radio_monthly'>Monthly</label> <input id='radio_yearly' type='radio' name='durationSelector' value='4' data-container='body' data-toggle='tooltip' title='A time duration between years can be selected' data-placement='bottom'><label class='timeSelectorText' for='radio_yearly'>Yearly</label> <div id='summary_datetimepicker_container' style='display:inline-block'><label style='margin-left:92px;color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='startDateTime' placeholder='Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='endDateTime' placeholder='End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;'> </div><!--<label style='float:right;margin-right:50px;color:#fff;cursor:pointer;display:inline-block' class='drop_down_label_reporting'> Go </label>--> <!--<div class='pq_flow_apply' style='float:right;margin-right:20px;cursor:pointer;display:inline-block;color:whitesmoke;font-weight:bold' onclick='CalcTimeDiff();'>Generate</div>--> <!-- <button type='button' id='createProfile' onclick = 'CreateProfile()' class='create'>Create New</button>--><button class='pq_flow_apply' style='float:right;margin-right:70px;display:inline-block;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;padding-left:30px' onclick='CalcTimeDiff();'>Generate</button></div><div class='Pq_TableHolder' id='usage_t_holder' style='width:97%;height:calc(100% - 100px);min-height:510px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Usage Report</div> <div id='ReportSummaryHolder' style='display:inline-block;margin:15px;width:50%;height:calc(97% - 40px)'><div id='ReportSummaryHolderHeader' class=' BWPlotHolderHeaderText' style='font-size:14px;border:none'>Usage Summary</div> <div class=' ReportSummaryContainers ReportSummaryHeaderText' style='font-size:12px;padding-top:5px'>Reporting Duration<br><input id='dif' type='text' class='rep_field_prop' style='border:none;background:transparent;color:goldenrod;font-family:verdana;font-size:12px;margin-top:1%;width:470px;text-align:center;' disabled> </div><div class=' ReportSummaryContainers ReportSummaryHeaderText' style='font-size:12px;padding-top:5px'>Total Data Usage<br><input id='tot_data' type='text' class='rep_field_prop' style='border:none;background:transparent;color:goldenrod;font-family:verdana;font-size:12px;margin-top:1%;margin-right:20px;width:340px;text-align:center' disabled > </div> <div class=' ReportSummaryContainers ReportSummaryHeaderText' style='font-size:12px;width:48%;display:inline-block;margin-right:1px;padding-top:5px'>Total Data Sent<br><input id='up_data' type='text' class='rep_field_prop' style='border:none;background:transparent;color:goldenrod;font-family:verdana;font-size:12px;margin-top:1%;margin-right:15px;width:160px;text-align:center' disabled > </div> <div class=' ReportSummaryContainers ReportSummaryHeaderText' style='font-size:12px;width:48%;display:inline-block;margin-left:1px;padding-top:5px'>Total Data Received<br><input id='dwn_data' type='text' class='rep_field_prop' style='border:none;background:transparent;color:goldenrod;font-family:verdana;font-size:12px;margin-top:1%;margin-right:15px;width:160px;text-align:center' disabled > </div><div id='usageUDPlot' class=' ReportSummaryContainers ReportSummaryHeaderText' style='font-size:12px;height:calc(70% - 120px);overflow-y:scroll;padding-top:5px;'>Application Usage<br><br></div> </div><div id='summaryPlotContainer' class='Pq_TableHolder' style='width:45%;float:left;height:calc(97% - 45px);margin-left:1%;'> </div> </div> </div> </div>";
var rep_bw_html = "<div id='Det_Rep_Bw'><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block;width:350px;'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='det_report_mode' value='1' style='margin-left:15px' checked=''><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='det_report_mode' value='2' style='margin-left:10px'><label class='timeSelectorText' for='radio_r_custom'>Custom Mode</label> </div><div id='det_rep_quickReportBar' style='font-size:11px;width:calc(100% - 510px);display:inline-block;margin-left:20px'><input id='det_rep_q_this_hour' type='radio' name='det_report_quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour'>This Hour</label> <input id='det_rep_q_hour' type='radio' name='det_report_quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom' checked=''><label class='timeSelectorText' for='radio_q_hour'>Last Hour</label> <input id='det_rep_q_this_day' type='radio' name='det_report_quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day'>This Day</label> <input id='det_rep_q_day' type='radio' name='det_report_quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day'>Yesterday</label> <input id='det_rep_q_this_month' type='radio' name='det_report_quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month'>This Month</label> <input id='det_rep_q_month' type='radio' name='det_report_quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='det_rep_customReportBar' style='width:500px;display:none;margin-left:20px'><label style='color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='det_rep_custom_StartDateTime' placeholder='Set Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='det_rep_custom_EndDateTime' placeholder='Set End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <button class='pq_flow_apply' style='height:35px;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;' onclick='get_det_rep_top_elements(PQDTR_REQ_BANDW);'></button></div> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:110px;height:25px;font-size:11px;margin-right:16px;margin-top:10px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='graph_pdf()'>Download PDF</button></div><!--<div id='det_rep_filter' class='det_rep_filter_cl animation' style='position:relative;font-size:11px;width:100%;height:70px;background-color:#455267;margin-top:1px;display:block;'>--><div id='det_rep_filter' class='det_rep_filter_cl' style='display:block'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:345px;height:30px;background:transparent;display:inline-block;margin-left:350px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 690px);height:30px;background:transparent;margin-left:690px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> D.Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Prot :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select><label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> App :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_det_reporting();'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div><div style='width:100%;height:calc(100% - 125px);background:#fff'><div id='Report_Bw_Dlink' class='Pq_TableHolder' style='position:relative;height:calc(50% - 15px);width:calc(100% - 40px);display:inline-block;margin-left:20px;'><div id='Report_Bw_Dlink_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Downlink Bandwidth</div> <div style='position:relative;width:100%;height:calc(100% - 45px);background-color:whitesmoke'><div style='position:absolute;width:100%;height:100%'><div id='pq_bw_det_rep_dl_plot' style='width:100%;height:100%;float:left;position:relative'></div></div><div id='pq_det_rep_bw_dl_plot_no_data' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/hchart.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:#1a7cea;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>No Data Loaded</a></div></div><div id='pq_det_rep_bw_dl_plot_no_avil' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/no_data.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Data Not Available</a></div></div><div id='pq_det_rep_bw_dl_plot_loading' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;float:left'><img src='image/gif/loading-48.gif' class='pq_hvcenter' style='position:absolute;bottom:0'></div><div class='progress pq_hcenter' style='width:200px;height:18px;background-color:gray;'><div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:40%'>40%</div></div><div style='width:100%;height:30%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Loading Data ...</a></div></div></div></div><div id='Report_Bw_Ulink' class='Pq_TableHolder' style='height:calc(50% - 15px);width:calc(100% - 40px);display:inline-block;'><div id='Report_Bw_Ulink_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Uplink Bandwidth</div> <div style='position:relative;width:100%;height:calc(100% - 45px);background-color:whitesmoke'><div style='position:absolute;width:100%;height:100%'><div id='pq_bw_det_rep_ul_plot' style='width:100%;height:100%;float:left;position:relative'></div></div><div id='pq_det_rep_bw_ul_plot_no_data' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/hchart.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:#1a7cea;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>No Data Loaded</a></div></div><div id='pq_det_rep_bw_ul_plot_no_avil' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/no_data.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Data Not Available</a></div></div><div id='pq_det_rep_bw_ul_plot_loading' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;float:left'><img src='image/gif/loading-48.gif' class='pq_hvcenter' style='position:absolute;bottom:0'></div><div class='progress pq_hcenter' style='width:200px;height:18px;background-color:gray;'><div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:40%'>40%</div></div><div style='width:100%;height:30%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Loading Data ...</a></div></div></div></div></div> </div>";
var rep_summary_html = "<div id='Det_Rep_Summary'><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block;width:350px;'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='det_report_mode' value='1' style='margin-left:15px' checked=''><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='det_report_mode' value='2' style='margin-left:10px'><label class='timeSelectorText' for='radio_r_custom'>Custom Mode</label> </div><div id='det_rep_quickReportBar' style='font-size:11px;width:calc(100% - 500px);display:inline-block;margin-left:20px'><input id='det_rep_q_this_hour' type='radio' name='det_report_quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour'>This Hour</label> <input id='det_rep_q_hour' type='radio' name='det_report_quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom' checked=''><label class='timeSelectorText' for='radio_q_hour'>Last Hour</label> <input id='det_rep_q_this_day' type='radio' name='det_report_quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day'>This Day</label> <input id='det_rep_q_day' type='radio' name='det_report_quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day'>Yesterday</label> <input id='det_rep_q_this_month' type='radio' name='det_report_quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month'>This Month</label> <input id='det_rep_q_month' type='radio' name='det_report_quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='det_rep_customReportBar' style='width:500px;display:none;margin-left:40px'><label style='color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='det_rep_custom_StartDateTime' placeholder='Set Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='det_rep_custom_EndDateTime' placeholder='Set End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <button class='pq_flow_apply' style='height:35px;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;' onclick='get_summary_det_rep_top_elements();'></button></div> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:110px;height:25px;font-size:11px;margin-right:10px;margin-top:7px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='download_summary()'>Download PDF</button></div><div id='Usage_IP_Holdeo' class='Pq_TableHolder' style='height:calc(100% - 70px);margin-left:20px;'><div id='Report_Summary_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Summary Report</div> <div class='Pq_TableHolder' style='height:calc(50% - 20px);box-shadow:none;'> <div class='Pq_LinkPlotHolder noSelect' style='height:calc(100% - 25px);width:calc(100% - 10px);background:transparent;box-shadow:none;border:none;margin-top:10px;margin-left:0px;'><div id='sources_flot' class='Pq_LinkPlotHolder noSelect' style='height:95%;width:calc(25% - 15px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Top Sources<label style='float:right;margin-right:50px;margin-top:-2px;'>1-10</label></div><div id='det_rep_deep_src_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:calc(100% - 95px);width:calc(100% - 0px);overflow:visible'></div></div><div id='destinations_flot' class='Pq_LinkPlotHolder' style='height:95%;width:calc(25% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Top Destination<label style='float:right;margin-right:50px;margin-top:-2px;'>1-10</label></div> <div id='det_rep_deep_dst_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:calc(100% - 95px);width:calc(100% - 0px);overflow:visible'></div></div><div id='applications_flot' class='Pq_LinkPlotHolder noSelect' style='height:95%;width:calc(25% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Top Applications<label style='float:right;margin-right:50px;margin-top:-2px;'>1-10</label></div><div id='det_rep_deep_app_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:calc(100% - 70px);width:calc(100% - 0px);overflow:visible'></div></div><div id='port_flot' class='Pq_LinkPlotHolder noSelect' style='height:95%;width:calc(25% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Top Ports<label style='float:right;margin-right:50px;margin-top:-2px;'>1-10</label></div><div id='det_rep_deep_port_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:calc(100% - 85px);width:calc(100% - 0px);overflow:visible'></div></div></div> </div> <div class='Pq_TableHolder' style='height:calc(50% - 40px);box-shadow:none;margin-top:5px'><div class='util' ><ul class='nav nav-tabs' style='border-bottom:1.5px solid #005154;'><li class='active'><a data-toggle='tab' style='color:#006666;padding:5px;border-left-color:#004b4e;border-right-color:#005b5d;border-top-color:#004146;' href='#sou_content'>Top Sources</a></li><li class=''><a data-toggle='tab' style='color:#006666;padding:5px;border-left-color:#004b4e;border-right-color:#005b5d;border-top-color:#004146;' href='#des_content'>Top Destinations</a></li><li class=''><a data-toggle='tab' style='color:#006666;padding:5px;border-left-color:#004b4e;border-right-color:#005b5d;border-top-color:#004146;' href='#app_content'>Top Applications</a></li><li class=''><a data-toggle='tab' style='color:#006666;padding:5px;border-left-color:#004b4e;border-right-color:#005b5d;border-top-color:#004146;' href='#port_content'>Top Ports</a></li></ul></div><div class='tab-content' style='width:100%;height:calc(100% - 30px);overflow-y:auto;border-left:1.5px solid #006666;border-right:1.5px solid #006263;border-bottom:1.5px solid #006666;'><div class='tab-pane active' id='sou_content'><div id='report_source_holder' style='width:100%;padding:10px' ><table id='Report_Source_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Source</th><th>User</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div><div class='tab-pane' id='des_content'><div id='report_dest_holder' style='width:100%;padding:10px' ><table id='Report_Dest_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Destination</th><th>URL</th> <th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div><div class='tab-pane' id='app_content'><div id='report_app_holder' style='width:100%;padding:10px' ><table id='Report_App_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>AppID</th><th>Application</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div><div class='tab-pane' id='port_content'><div id='report_sum_port_holder' style='width:100%;padding:10px' ><table id='Report_Sum_Port_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>PortID</th><th>Port</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div></div> </div></div></div> <div id='gif' style=''></div>";
var rep_sources_html = "<div id='Det_Rep_Sources'> <div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block;width:350px;'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='det_report_mode' value='1' style='margin-left:15px' checked><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='det_report_mode' value='2' style='margin-left:10px' ><label class='timeSelectorText' for='radio_r_custom' >Custom Mode</label> </div><div id='det_rep_quickReportBar' style='font-size:11px;width:calc(100% - 500px);display:inline-block;margin-left:100px'><input id='det_rep_q_this_hour' type='radio' name='det_report_quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour' >This Hour</label> <input id='det_rep_q_hour' type='radio' name='det_report_quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom' checked><label class='timeSelectorText' for='radio_q_hour' >Last Hour</label> <input id='det_rep_q_this_day' type='radio' name='det_report_quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day' >This Day</label> <input id='det_rep_q_day' type='radio' name='det_report_quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day' >Yesterday</label> <input id='det_rep_q_this_month' type='radio' name='det_report_quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month' >This Month</label> <input id='det_rep_q_month' type='radio' name='det_report_quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='det_rep_customReportBar' style='width:500px;display:none;margin-left:100px'><label style='color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='det_rep_custom_StartDateTime' placeholder='Set Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='det_rep_custom_EndDateTime' placeholder='Set End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <button class='pq_flow_apply' style='height:35px;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;' onclick='get_det_rep_top_elements(PQDTR_REQ_TOP_SRC);'></button></div> </div><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><button id='det_rep_filter_add' class='pq_url_wbtn' style='float:left;display:block;width:110px;height:25px;font-size:11px;margin-left:15px;background:#21b955 url(../image/add_list.png) 5px no-repeat;' onclick=''>Add Filter</button><button id='det_rep_filter_hide' class='pq_url_wbtn' style='float:left;display:none;width:110px;height:25px;font-size:11px;margin-left:15px;background:#e29030 url(../image/clear.png) 5px no-repeat;' onclick=''>Hide Filter</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='rep_pdf_gen(PQDTR_REQ_TOP_SRC)'>Download PDF</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#e841d2 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='click_det_rep_csv_btn()'>Download CSV</button> <a id ='det_rep_intrfc_total_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_dlink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_ulink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='det_rep_filter' class='det_rep_filter_cl'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:345px;height:30px;background:transparent;display:inline-block;margin-left:350px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 690px);height:30px;background:transparent;margin-left:690px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> D.Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Prot :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select><label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> App :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_det_reporting();'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div><div id='Report_Source_Holder' class='Pq_TableHolder' style='height:calc(100% - 110px);margin-left:20px;'><div id='Report_Source_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText'></div> <div id='report_source_holder' style='width:100%;padding:20px' ><table id='Report_Source_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Source IP</th><th>User</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var rep_sources_det_html = "<div id='Det_Rep_Det_Sources'> <div id='IPReportBar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#2a3338'> <button id='det_rep_deep_src_back_btn' onclick='load_report_src(stored_filter_param)' class='pq_url_wbtn' style='float:left;margin-top:7px;margin-right:10px;display:inline-block;font-weight:bolder;width:150px;height:25px;font-size:12px;margin-left:5px;background:transparent url(../image/back_act.png) 5px no-repeat;text-indent:20px;' >Back To Sources</button><button id='pdf_sources' class='pq_url_wbtn' style='float:right;margin-top:7px;margin-right:10px;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='det_rep_deep_pdf_generate(PQDTR_REQ_TOP_SRC)'>Download PDF</button><a id ='det_rep_deep_total_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='Report_Source_Det_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);margin-left:20px;'><div id='Report_Source_Det_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size:14px;height:30px;cursor:default'></div> <div class='Pq_LinkPlotHolder noSelect' style='height:calc(40% - 5px);width:calc(100% - 40px);background:transparent;box-shadow:none;border:none;margin-top:10px;'><div class='Pq_LinkPlotHolder' id='flot_one' style='height:95%;width:calc(50% - 15px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Destinations<div class='flot noSelect' ><div id='det_rep_deep_dst_prev' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_dst_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_dst_nxt' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div> <div id='det_rep_deep_dst_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div><div class='Pq_LinkPlotHolder noSelect' id='flot_two' style='height:95%;width:calc(50% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Applications<div class='flot noSelect' ><div id='det_rep_deep_app_prvs' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_app_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_app_next' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div><div id='det_rep_deep_app_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div></div> <div id='report_source_det_holder' style='width:100%;padding:20px;height:calc(60% - 40px);' ><div id='det_rep_filter' class='' style='position:relative;font-size:11px;width:100%;height:70px;background-color:#455267;margin-top:1px;'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 400px);height:30px;background:transparent;margin-left:350px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> Destination Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Protocol :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Application :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_deep_det_rep_elements(PQDTR_REQ_TOP_SRC);'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div> <table id='Report_Source_Det_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Destination</th><th>URL</th><th>Sessions</th><th>Destination Port</th><th>VLAN ID</th><th>Protocol</th><th>Application</th> <th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var rep_dests_html = "<div id='Det_Rep_Dests'> <div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block;width:350px;'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='det_report_mode' value='1' style='margin-left:15px' checked><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='det_report_mode' value='2' style='margin-left:10px' ><label class='timeSelectorText' for='radio_r_custom' >Custom Mode</label> </div><div id='det_rep_quickReportBar' style='font-size:11px;width:calc(100% - 500px);display:inline-block;margin-left:100px'><input id='det_rep_q_this_hour' type='radio' name='det_report_quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour' >This Hour</label> <input id='det_rep_q_hour' type='radio' name='det_report_quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom' checked><label class='timeSelectorText' for='radio_q_hour' >Last Hour</label> <input id='det_rep_q_this_day' type='radio' name='det_report_quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day' >This Day</label> <input id='det_rep_q_day' type='radio' name='det_report_quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day' >Yesterday</label> <input id='det_rep_q_this_month' type='radio' name='det_report_quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month' >This Month</label> <input id='det_rep_q_month' type='radio' name='det_report_quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='det_rep_customReportBar' style='width:500px;display:none;margin-left:100px'><label style='color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='det_rep_custom_StartDateTime' placeholder='Set Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='det_rep_custom_EndDateTime' placeholder='Set End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <button class='pq_flow_apply' style='height:35px;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;' onclick='get_det_rep_top_elements(PQDTR_REQ_TOP_DST);'></button></div> </div><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><button id='det_rep_filter_add' class='pq_url_wbtn' style='float:left;display:block;width:110px;height:25px;font-size:11px;margin-left:15px;background:#21b955 url(../image/add_list.png) 5px no-repeat;' onclick=''>Add Filter</button><button id='det_rep_filter_hide' class='pq_url_wbtn' style='float:left;display:none;width:110px;height:25px;font-size:11px;margin-left:15px;background:#e29030 url(../image/clear.png) 5px no-repeat;' onclick=''>Hide Filter</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='rep_pdf_gen(PQDTR_REQ_TOP_DST)'>Download PDF</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#e841d2 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='click_det_rep_csv_btn()'>Download CSV</button> <a id ='det_rep_intrfc_total_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_dlink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_ulink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='det_rep_filter' class='det_rep_filter_cl'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:345px;height:30px;background:transparent;display:inline-block;margin-left:350px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 680px);height:30px;background:transparent;margin-left:680px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> D.Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Prot :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select><label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> App :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_det_reporting();'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div><div id='Report_Dest_Holder' class='Pq_TableHolder' style='height:calc(100% - 110px);margin-left:20px;'><div id='Report_Dest_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText'></div> <div id='report_dest_holder' style='width:100%;padding:20px' ><table id='Report_Dest_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Destination</th><th>URL</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var rep_dests_det_html = "<div id='Det_Rep_Det_Dests'> <div id='IPReportBar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#2a3338'> <button id='det_rep_deep_dest_back_btn' onclick='load_report_dest()' class='pq_url_wbtn' style='float:left;margin-top:7px;margin-right:10px;display:inline-block;font-weight:bolder;width:170px;height:25px;font-size:12px;margin-left:5px;background:transparent url(../image/back_act.png) 5px no-repeat;text-indent:20px;' >Back To Destinations</button><button id='pdf_sources' class='pq_url_wbtn' style='float:right;margin-top:7px;margin-right:10px;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='det_rep_deep_pdf_generate(PQDTR_REQ_TOP_DST)'>Download PDF</button><a id ='det_rep_deep_total_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='Report_Dest_Det_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);margin-left:20px;'><div id='Report_Dest_Det_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size:14px;height:30px;cursor:default' ></div> <div class='Pq_LinkPlotHolder noSelect' style='height:calc(40% - 5px);width:calc(100% - 40px);background:transparent;box-shadow:none;border:none;margin-top:10px;'><div class='Pq_LinkPlotHolder' id='flot_one' style='height:95%;width:calc(50% - 15px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Sources<div class='flot noSelect' ><div id='det_rep_deep_src_prev' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_src_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_src_nxt' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div> <div id='det_rep_deep_src_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div><div class='Pq_LinkPlotHolder noSelect' id='flot_two' style='height:95%;width:calc(50% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Ports<div class='flot noSelect' ><div id='det_rep_deep_app_prvs' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_app_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_app_next' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div><div id='det_rep_deep_app_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div> </div> <div id='report_dest_det_holder' style='width:100%;padding:20px;height:calc(60% - 40px);' ><div id='det_rep_filter' class='' style='position:relative;font-size:11px;width:100%;height:70px;background-color:#455267;margin-top:1px;'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div> <div style='width:calc(100% - 400px);height:30px;background:transparent;margin-left:350px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> Destination Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Protocol :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Application :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_deep_det_rep_elements(PQDTR_REQ_TOP_DST);'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div> <table id='Report_Dest_Det_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Source</th><th>User</th><th>URL</th><th>Sessions</th><th>Destination Port</th><th>VLAN ID</th><th>Protocol</th><th>Application</th> <th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div></div> ";
var rep_apps_html = "<div id='Det_Rep_Apps'> <div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block;width:350px;'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='det_report_mode' value='1' style='margin-left:15px' checked><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='det_report_mode' value='2' style='margin-left:10px' ><label class='timeSelectorText' for='radio_r_custom' >Custom Mode</label> </div><div id='det_rep_quickReportBar' style='font-size:11px;width:calc(100% - 500px);display:inline-block;margin-left:100px'><input id='det_rep_q_this_hour' type='radio' name='det_report_quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour' >This Hour</label> <input id='det_rep_q_hour' type='radio' name='det_report_quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom' checked><label class='timeSelectorText' for='radio_q_hour' >Last Hour</label> <input id='det_rep_q_this_day' type='radio' name='det_report_quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day' >This Day</label> <input id='det_rep_q_day' type='radio' name='det_report_quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day' >Yesterday</label> <input id='det_rep_q_this_month' type='radio' name='det_report_quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month' >This Month</label> <input id='det_rep_q_month' type='radio' name='det_report_quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='det_rep_customReportBar' style='width:500px;display:none;margin-left:100px'><label style='color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='det_rep_custom_StartDateTime' placeholder='Set Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='det_rep_custom_EndDateTime' placeholder='Set End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <button class='pq_flow_apply' style='height:35px;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;' onclick='get_det_rep_top_elements(PQDTR_REQ_TOP_APP);'></button></div> </div><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><button id='det_rep_filter_add' class='pq_url_wbtn' style='float:left;display:block;width:110px;height:25px;font-size:11px;margin-left:15px;background:#21b955 url(../image/add_list.png) 5px no-repeat;' onclick=''>Add Filter</button><button id='det_rep_filter_hide' class='pq_url_wbtn' style='float:left;display:none;width:110px;height:25px;font-size:11px;margin-left:15px;background:#e29030 url(../image/clear.png) 5px no-repeat;' onclick=''>Hide Filter</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='rep_pdf_gen(PQDTR_REQ_TOP_APP)'>Download PDF</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#e841d2 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='click_det_rep_csv_btn()'>Download CSV</button> <a id ='det_rep_intrfc_total_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_dlink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_ulink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='det_rep_filter' class='det_rep_filter_cl'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:345px;height:30px;background:transparent;display:inline-block;margin-left:350px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 680px);height:30px;background:transparent;margin-left:680px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> D.Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Prot :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select><label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> App :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_det_reporting();'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div><div id='Report_App_Holder' class='Pq_TableHolder' style='height:calc(100% - 110px);margin-left:20px;'><div id='Report_App_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText'></div> <div id='report_app_holder' style='width:100%;padding:20px' ><table id='Report_App_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>AppID</th><th>Application</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var rep_apps_det_html = "<div id='Det_Rep_Det_Apps'> <div id='IPReportBar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#2a3338'> <button id='det_rep_deep_app_back_btn' onclick='load_report_app()' class='pq_url_wbtn' style='float:left;margin-top:7px;margin-right:10px;display:inline-block;font-weight:bolder;width:170px;height:25px;font-size:12px;margin-left:5px;background:transparent url(../image/back_act.png) 5px no-repeat;text-indent:20px;' >Back To Applications</button><button id='pdf_sources' class='pq_url_wbtn' style='float:right;margin-top:7px;margin-right:10px;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='det_rep_deep_pdf_generate(PQDTR_REQ_TOP_APP)'>Download PDF</button><a id ='det_rep_deep_total_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='Report_App_Det_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);margin-left:20px;'><div id='Report_App_Det_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size:14px;height:30px;cursor:default' ></div> <div class='Pq_LinkPlotHolder noSelect' style='height:calc(40% - 5px);width:calc(100% - 40px);background:transparent;box-shadow:none;border:none;margin-top:10px;'><div class='Pq_LinkPlotHolder' id='flot_one' style='height:95%;width:calc(50% - 15px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Sources<div class='flot noSelect' ><div id='det_rep_deep_src_prev' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_src_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_src_nxt' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div><div id='det_rep_deep_src_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div><div class='Pq_LinkPlotHolder' id='flot_two' style='height:95%;width:calc(50% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Destinations<div class='flot noSelect' ><div id='det_rep_deep_dst_prev' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_dst_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_dst_nxt' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div> <div id='det_rep_deep_dst_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div> </div> <div id='report_app_det_holder' style='width:100%;padding:20px;height:calc(60% - 40px);' ><div id='det_rep_filter' class='' style='position:relative;font-size:11px;width:100%;height:70px;background-color:#455267;margin-top:1px;'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div> <div style='width:345px;height:30px;background:transparent;display:inline-block;margin-left:350px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 670px);height:30px;background:transparent;margin-left:680px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> Destination Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Protocol :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_deep_det_rep_elements(PQDTR_REQ_TOP_APP);'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div> <table id='Report_App_Det_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Source</th><th>User</th><th>Destination</th><th>URL</th><th>Sessions</th><th>Destination Port</th><th>VLAN ID</th><th>Protocol</th> <th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var rep_ports_html = "<div id='Det_Rep_Ports'> <div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><div id='summary_opt_container' style='display:inline-block;width:350px;'><label class='drop_down_label_reporting' style='margin-left:15px;color:#fff'> Reporting Mode :</label> <input id='radio_r_quick' type='radio' name='det_report_mode' value='1' style='margin-left:15px' checked><label class='timeSelectorText' for='radio_r_quick'>Quick Mode</label> <input id='radio_r_custom' type='radio' name='det_report_mode' value='2' style='margin-left:10px' ><label class='timeSelectorText' for='radio_r_custom' >Custom Mode</label> </div><div id='det_rep_quickReportBar' style='font-size:11px;width:calc(100% - 500px);display:inline-block;margin-left:100px'><input id='det_rep_q_this_hour' type='radio' name='det_report_quickDurationSelector' value='1' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this hour is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_hour' >This Hour</label> <input id='det_rep_q_hour' type='radio' name='det_report_quickDurationSelector' value='2' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last completed hour is displayed' data-placement='bottom' checked><label class='timeSelectorText' for='radio_q_hour' >Last Hour</label> <input id='det_rep_q_this_day' type='radio' name='det_report_quickDurationSelector' value='3' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this day is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_day' >This Day</label> <input id='det_rep_q_day' type='radio' name='det_report_quickDurationSelector' value='4' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only yesterday is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_day' >Yesterday</label> <input id='det_rep_q_this_month' type='radio' name='det_report_quickDurationSelector' value='5' style='margin-left:20px' data-container='body' data-toggle='tooltip' title='Data Usage of only this month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_this_month' >This Month</label> <input id='det_rep_q_month' type='radio' name='det_report_quickDurationSelector' value='6' style='margin-left:15px' data-container='body' data-toggle='tooltip' title='Data Usage of only the last month is displayed' data-placement='bottom'><label class='timeSelectorText' for='radio_q_month'>Last Month</label> </div> <div id='det_rep_customReportBar' style='width:500px;display:none;margin-left:100px'><label style='color:#fff' class='drop_down_label_reporting'> From :</label> <input type='text' id='det_rep_custom_StartDateTime' placeholder='Set Start date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <label class='drop_down_label_reporting' style='color:#fff;margin-left:30px;'> To :</label> <input type='text' id='det_rep_custom_EndDateTime' placeholder='Set End date and time' class='field_prop_reporting' style='font-size:10px;color:black;width:140px;text-indent:5px;height:20px;margin-top:0px'> <button class='pq_flow_apply' style='height:35px;color:whitesmoke;border:none;font-weight:bold;background-color:transparent;padding-right:10px;' onclick='get_det_rep_top_elements(PQDTR_REQ_TOP_PORTS);'></button></div> </div><div style='position:relative;font-size:11px;width:100%;height:40px;background-color:#455267'><button id='det_rep_filter_add' class='pq_url_wbtn' style='float:left;display:block;width:110px;height:25px;font-size:11px;margin-left:15px;background:#21b955 url(../image/add_list.png) 5px no-repeat;' onclick=''>Add Filter</button><button id='det_rep_filter_hide' class='pq_url_wbtn' style='float:left;display:none;width:110px;height:25px;font-size:11px;margin-left:15px;background:#e29030 url(../image/clear.png) 5px no-repeat;' onclick=''>Hide Filter</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='rep_pdf_gen(PQDTR_REQ_TOP_PORTS)'>Download PDF</button><button class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#e841d2 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='click_det_rep_csv_btn()'>Download CSV</button> <a id ='det_rep_intrfc_total_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_dlink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_intrfc_ulink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='det_rep_filter' class='det_rep_filter_cl'><div style='width:345px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:345px;height:30px;background:transparent;display:inline-block;margin-left:350px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:200px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 680px);height:30px;background:transparent;margin-left:680px;display:inline-block;'><label class='drop_down_label_reporting' style='margin-left:30px;color:#fff'> D.Port :</label><input type='text' placeholder='' id='det_rep_dport' value='Any' style='width:50px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Prot :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select><label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> App :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_det_reporting();'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='filter_det_reporting();'>Clear Filter</button></div><div id='Report_Port_Holder' class='Pq_TableHolder' style='height:calc(100% - 110px);margin-left:20px;'><div id='Report_Port_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText'></div> <div id='report_port_holder' style='width:100%;padding:20px' ><table id='Report_Port_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>PortID</th><th>Port</th><th>Sessions</th><th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Watch</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var rep_ports_det_html = "<div id='Det_Rep_Det_Ports'> <div id='IPReportBar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#2a3338'> <button id='det_rep_deep_port_back_btn' onclick='load_report_port()' class='pq_url_wbtn' style='float:left;margin-top:7px;margin-right:10px;display:inline-block;font-weight:bolder;width:150px;height:25px;font-size:12px;margin-left:5px;background:transparent url(../image/back_act.png) 5px no-repeat;text-indent:20px;' >Back To Ports</button><button id='pdf_sources' class='pq_url_wbtn' style='float:right;margin-top:7px;margin-right:10px;display:inline-block;width:110px;height:25px;font-size:11px;margin-left:5px;background:#7f41e8 url(../image/download_1.png) 5px no-repeat;text-indent:20px;' onclick='det_rep_deep_pdf_generate(PQDTR_REQ_TOP_PORTS)'>Download PDF</button><a id ='det_rep_deep_total_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Total Data Usage :</a><div style='width:15px;height:15px;background-color:#1a7cea;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Received :</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> <a id ='det_rep_deep_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;cursor:default' class='pq_bwevent_vcenter'>Data Sent :</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:5px' class='pq_bwevent_vcenter'></div> </div><div id='Report_Port_Det_Holder' class='Pq_TableHolder' style='height:calc(100% - 65px);margin-left:20px;'><div id='Report_Port_Det_Header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size:14px;height:30px;cursor:default' ></div> <div class='Pq_LinkPlotHolder noSelect' style='height:calc(40% - 5px);width:calc(100% - 40px);background:transparent;box-shadow:none;border:none;margin-top:10px;'><div class='Pq_LinkPlotHolder' id='flot_one' style='height:95%;width:calc(50% - 15px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Sources<div class='flot noSelect' ><div id='det_rep_deep_src_prev' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_src_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_src_nxt' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div><div id='det_rep_deep_src_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div><div class='Pq_LinkPlotHolder' id='flot_two' style='height:95%;width:calc(50% - 15px);margin-left:15px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);font-size:14px;height:30px'>Destinations<div class='flot noSelect' ><div id='det_rep_deep_dst_prev' class='flot-next_before flot-arrow_before noSelect' style='cursor:pointer'></div> </div><label id='det_rep_deep_dst_label' style='float:right;margin-right:-56px;margin-top:-2px;'>1-10</label><div id='det_rep_deep_dst_nxt' class='flot-next flot-arrow noSelect' style='cursor:pointer'></div></div> <div id='det_rep_deep_dst_holder' class='noSelect' style='float:left;padding:0;margin:0 auto;margin-top:1%;display:block;text-align:center;height:60%;width:calc(100% - 40px);overflow:visible'></div></div> </div> <div id='report_port_det_holder' style='width:100%;padding:20px;height:calc(60% - 40px);' ><div id='det_rep_filter' class='' style='position:relative;font-size:11px;width:100%;height:70px;background-color:#455267;margin-top:1px;'><div style='width:340px;height:30px;background:transparent;display:inline-block;position:absolute;margin-left:5px;'><label id='det_rep_filter_src_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Source Type :</label><select id='det_rep_filter_src_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select><div id='det_rep_sip_div' style='display:inline-block;width:150px;'><label id='det_rep_sip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_sip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_range_div' style='display:none;width:195px;'><input type='text' placeholder='' id='det_rep_sip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_sip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_sip_sbnt_div' style='display:none;width:150px;'><input type='text' placeholder='' id='det_rep_sip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_sip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div> <div style='width:335px;height:30px;background:transparent;display:inline-block;margin-left:335px;position:absolute'><label id='det_rep_filter_dest_type_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Destination Type :</label><select id='det_rep_filter_dest_type' class='field_prop_reporting' style='font-size:10px;height:20px;width:80px'> <option value='0'>Address</option><option value='1'>Range</option><option value='2'>Subnet</option></select> <div id='det_rep_dip_div' style='display:inline-block;width:130px;'><label id='det_rep_dip1_label' class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> IP :</label><input type='text' placeholder='' id='det_rep_dip1' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_range_div' style='display:none;width:195px;'><input type='text' placeholder='' id='det_rep_dip1_range' value='Any' style='width:90px;text-align:center;'> <a style='font-size:20px;color:white'>-</a><input type='text' placeholder='' id='det_rep_dip2_range' value='Any' style='width:90px;text-align:center;'> </div><div id='det_rep_dip_sbnt_div' style='display:none;width:140px;'><input type='text' placeholder='' id='det_rep_dip1_subnet' value='Any' style='width:90px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:2px;color:#fff'> / </label><input type='text' placeholder='' id='det_rep_dip2_subnet' value='32' style='width:30px;text-align:center;'> </div> </div><div style='width:calc(100% - 660px);height:30px;background:transparent;margin-left:680px;display:inline-block;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Vlan :</label><input type='text' placeholder='' id='det_rep_vlan' value='None' style='width:45px;text-align:center;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Protocol :</label><select id='det_rep_protocol' class='field_prop_reporting' style='font-size:10px;height:20px;width:50px'> <option value='0'>Any</option><option value='6'>TCP</option><option value='17'>UDP</option></select> <label class='drop_down_label_reporting' style='margin-left:10px;color:#fff'> Application :</label><select id='det_rep_app' class='field_prop_reporting' style='font-size:10px;height:20px;width:100px;'><option value='0'>~All~</option></select> </div><br><label class='drop_down_label_reporting' style='float:left;margin-left:15px;color:#fff'> User :</label><select id='det_rep_ad_usr' class='field_prop_reporting' style='float:left;font-size:10px;height:20px;width:100px;display:inline-block;'><option value='0'>~All~</option></select> <button class='pq_url_wbtn' style='float:right;display:inline-block;width:70px;height:22px;font-size:11px;margin:8px 15px 0px 5px;background:#1ba590 url(../image/filter.png) 5px no-repeat;text-indent:20px;' onclick='filter_deep_det_rep_elements(PQDTR_REQ_TOP_PORTS);'>Filter</button><button class='pq_url_wbtn' style='float:right;display:inline-block;width:90px;height:22px;font-size:11px;margin:8px 5px 0px 5px;background:#a58f1b url(../image/clear_1.png) 5px no-repeat;text-indent:20px;' onclick='clear_det_rep_filter();'>Clear Filter</button></div> <table id='Report_Port_Det_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Source</th><th>User</th><th>Destination</th><th>URL</th><th>Sessions</th><th>Destination Port</th><th>VLAN ID</th><th>Protocol</th> <th>Data Sent</th><th>Data Received</th><th>Total Data</th> <th>Total Sessions</th><th>Total Data</th> </tr></thead> </table> </div> </div> </div> ";
var profile_html = "<div id='Profile'> <div id='Profile_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Profiles</div> <div id='profile_table_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button type='button' id='editProfile' disabled onclick = 'EditProfile()' class='edit'>Reset Password</button> </div> <table id='Profile_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Key</th> <th>Category</th> <th>User Name</th> <th>IP Address</th> <th>Status_val</th> <th>Status</th> </tr></thead></table> </div> </div> <div id='AddProfileModal' class='modal'><div class='modal-content' style=' height:420px;'><span id='CloseAddProfile' class='close'>×</span><label style='color:black;font-size:20px;margin-left:88px'> Add New Profile </label><br><br><label class='drop_down_label'> Category :</label><select required name='category' id='profileCode' class='field_prop'><option value=''>-- Select --</option> <option value='12'>Administrator</option><option value='23'>User</option></select><br><br><label class='drop_down_label'> Email :</label><input id='profileEmail' required type='email' placeholder='Enter your Email' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input id='profileIP' required type='text' placeholder='Enter your IP Address' pattern= '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*' class='field_prop'><br><br> <label class='drop_down_label'> Password :</label><input id='profile_password' required type='password' placeholder='Enter your Password' class='field_prop'> <br><br> <label class='drop_down_label'> Confirm Password :</label><input id='profile_password_confirm' required type='password' placeholder='Confirm your Password' class='field_prop'> <br><br> <input id='password_confirm_msg' disabled type='text' class='field_prop' style='margin-top:-15px;border:none;background:transparent'> <br><br> <br><button id='addProfileToSystem' class='addUpdateRules' style='margin-top:-30px;'>Add Profile</button></div></div> <div id='EditProfileModal' class='modal'><div class='modal-content' style=' height:340px;'><span id='CloseEditProfile' class='close'>×</span> <label style='color:#5f5c5c;font-size:20px;margin-left:130px'> Edit Profile </label><br><br><label class='drop_down_label'> Category :</label><select required disabled name='category' id='ProfileEditCode' class='field_prop'><option value=''>None</option> <option>Administrator</option></select><br><br><label class='drop_down_label'> Email :</label><input disabled id='profile_edit_email' required type='email' class='field_prop'> <br><br> <label class='drop_down_label'> New Password :</label><input id='new_password' required type='password' class='field_prop'> <br><br> <label class='drop_down_label'> Confirm New Password :</label><input id='new_password_confirm' required type='password' class='field_prop'><br><br> <input id='password_reset_confirm_msg' disabled type='text' class='field_prop' style='margin-top:-15px;border:none;background:transparent'> <br> <button id='editProfileButton' class='addUpdateRules' style='margin-top:5px;'>Update</button></div></div> </div>";
var ldap_server_html = "<div id='C_LDAP_Server'> <div id='LDAP_Server_Holder' class='Pq_TableHolder' style='height:calc(100% - 40px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText'>LDAP Server</div> <div id='ldap_server_table_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button type='button' id='createLdap' class='create' style='margin:0px;' onclick='CreateLdap()'>Create New</button> <button type='button' id='editLdap' class='edit' style='margin:0px;' disabled onclick='EditLdap()'>Edit</button> <button type='button' id='deleteLdap' class='delete' style='margin:0px;' disabled onclick='DeleteLdap()'>Delete</button> <button type='button' id='server2ADList' class='pq_url_wbtn' style='float:right;width:120px;height:30px;font-size:12px;background:#208830;margin:0px' ><span>Active Directory</span></button> </div> <table id='LDAP_Server_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Id</th> <th>Name</th> <th>Server IP</th> <th>Port</th> <th>Status</th> <th>Connection Status</th> </tr></thead></table> </div> </div> <div id='CreateLdapModal' class='modal'><div class='modal-content' style='width:410px;height:350px;'><span id='CloseNewLdap' class='close'>×</span><label class='modalTitle' style=' margin-left:105px'> Add LDAP Server </label><br><br><label class='drop_down_label'> Name :</label><input id='add_ldap_name' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_namereqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Server IP :</label><input id='add_ldap_ip' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_ipreqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Server Port :</label><input id='add_ldap_port' required type='text' placeholder='' class='field_prop' value='389'><label hidden id='ldap_portreqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><!-- <label class='drop_down_label'> Common Name identifier :</label><input id='add_ldap_cni' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_cnreqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br> <label class='drop_down_label'> Distinguished Name :</label><input id='add_ldap_dn' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_dnreqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><button id='add_fetchdn' style='height:25px;font-size:11px;border:none;background-color:#d3d3d3;' onclick='fetchDN(ldap_add_idlist, ldap_add_reqidlist, 'add_fetchdntext')'>Fetch DN</button><label id='add_fetchdntext' class='drop_down_label' style='float:right;color:green'></label><br><br>--><label class='drop_down_label'> User DN :</label><input id='add_ldap_udn' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_udnreqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Password :</label><input id='add_ldap_pswd' required type='password' placeholder='' class='field_prop' style='margin-bottom:25px;'><label hidden id='ldap_pswdreqd_add' style='float:right;color:red;font-size:19px;'>*</label> <br> <br><button id='addLdapToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block'>Add</button><button id='clearLdapAdd' class='addUpdateRules' style='width:100px;height:30px;margin-left:10px;margin-right:-220px;display:inline-block'>Clear</button></div></div> <div id='EditLdapModal' class='modal'><div class='modal-content' style='width:410px;height:350px;'><span id='CloseEditLdap' class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Edit LDAP Server </label><br><br><label class='drop_down_label'> Name :</label><input id='edit_ldap_name' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_namereqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Server IP :</label><input id='edit_ldap_ip' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_ipreqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Server Port :</label><input id='edit_ldap_port' required type='text' placeholder='' class='field_prop' value='389'><label hidden id='ldap_portreqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><!-- <label class='drop_down_label'> Common Name identifier :</label><input id='edit_ldap_cni' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_cnreqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br> <label class='drop_down_label'> Distinguished Name :</label><input id='edit_ldap_dn' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_dnreqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><button id='edit_fetchdn' style='height:25px;font-size:11px;border:none;background-color:#d3d3d3;' onclick='fetchDN(ldap_edit_idlist, ldap_edit_reqidlist, 'edit_fetchdntext')' >Fetch DN</button><label id='edit_fetchdntext' class='drop_down_label' style='float:right;color:green'></label><br><br>--><label class='drop_down_label'> User DN :</label><input id='edit_ldap_udn' required type='text' placeholder='' class='field_prop'><label hidden id='ldap_udnreqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Password :</label><input id='edit_ldap_pswd' required type='password' placeholder='' class='field_prop' style='margin-bottom:25px;'><label hidden id='ldap_pwsdreqd_edit' style='float:right;color:red;font-size:19px;'>*</label> <br> <br><button id='editLdapToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block'>Update</button><button id='clearLdapEdit' class='addUpdateRules' style='width:100px;margin-left:10px;height:30px;margin-right:-220px;display:inline-block'>Clear</button></div></div> </div>";
var dhcp_server_html = "<div id='DHCP_Server'> <div id='DHCP_Server_Holder' class='Pq_TableHolder' style='height:calc(100% - 40px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText'>DHCP Server</div> <div id='ldap_server_table_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button type='button' id='createLdap' class='create' onclick='CreateDhcpServer()'>Create New</button> <button type='button' id='editLdap' class='edit' disabled onclick='EditDhcpServer()'>Edit</button> <button type='button' id='deleteLdap' class='delete' disabled onclick='delete_dhcp_server_from_list()'>Delete</button> <button type='button' id='server2DHCPList' class='pq_url_wbtn' style='float:right;width:120px;height:30px;font-size:12px;background:#208830;' ><span>DHCP Users</span></button> </div> <table id='DHCP_Server_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Id</th> <th>Name</th> <th>Server IP</th> <th>Status</th> <th>Connection Status</th> </tr></thead></table> </div> </div> <div id='CreateDHCPServerModal' class='modal'><div class='modal-content' style='height:215px;'><span id='CloseNewDHCPServerModal' class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add DHCP Server </label><br><br><label class='drop_down_label'> Name :</label><input id='add_dhcp_name' required type='text' placeholder='' class='field_prop'><label hidden id='dhcp_namereqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Server IP :</label><input id='add_dhcp_ip' required type='text' placeholder='' class='field_prop'><label hidden id='dhcp_ipreqd_add' style='float:right;color:red;font-size:19px'>*</label> <br><br><button id='addDhcpServerToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block;margin-right:5px;'>Add</button><button id='clearDhcpAdd' class='addUpdateRules' style='width:100px;height:30px;margin-right:-220px;display:inline-block'>Clear</button> </div></div> <div id='EditDHCPServerModal' class='modal'><div class='modal-content' style=' height:215px;'><span id='CloseEditDHCPServerModal' class='close'>×</span><label class='modalTitle' style='margin-left:100px'> Edit DHCP Server </label><br><br><label class='drop_down_label'> Name :</label><input id='dhcp_name_edit' required type='text' placeholder='' class='field_prop'><label hidden id='dhcp_namereqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><label class='drop_down_label'> Server IP :</label><input id='dhcp_ip_edit' required type='text' placeholder='' class='field_prop'><label hidden id='dhcp_ipreqd_edit' style='float:right;color:red;font-size:19px'>*</label> <br><br><button id='editDhcpServerToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block;margin-right:5px;'>Update</button><button id='clearDhcpEdit' class='addUpdateRules' style='width:100px;height:30px;margin-right:-220px;display:inline-block'>Clear</button></div></div> </div>";
var management_r630_html = "<div id='Interface_Management'><div id='Interface_Management_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Management Interface Configurations</div> <div style='width:100%;height:30px'> </div><div><div style='width:698px;height:100px;position:relative;margin:auto;background-color:white;background-image:url(image/pdev_r630_front.png);background-repeat:no-repeat;background-size:100%;'><div id='mgmt_o_mask' class='alpha60' style='width:38px;display:none;height:35px;position:absolute;top:35px;left:235px;border:2px #00FF00;border-style:solid;'></div></div></div> <div id='mgmt_prop' style='width:100%;height:calc(100% - 305px)'> <div class='mgmt_table_plane'> <div id='mgmt_table_holder' style='width:100%;'><div class='edit_panel'><button type='button' id='deleteProfile' style='float:right;background:#245580 url(image/info.png) no-repeat 10px center;' disabled onclick = 'info_mgmt_interface_show()' class='delete'>Interface info</button> <button type='button' id='createProfile' style='float:right' onclick = 'edit_mgmt_interface_prop()' class='edit' disabled>Edit</button></div><table id='mgmt_iface_table' class='hover row-border order-column StatusTablesFont display' cellspacing='0' width='100%'> <thead><tr style='height:5px;padding:0px;margin:15px;font-size:12px;background-color:#122b40;color:#ffffff'> <th>Key</th> <th>Interface</th> <th>IP Address</th> <th>Subnet</th> <th>Default Gateway</th> <th>DNS Server</th> <th>Status</th> </tr></thead></table></div> </div></div><div id='editMgmtModal' class='modal'><div class='modal-content' style=' height:390px;'><span id='closeEditMgmtModal' class='close'>×</span> <label style='font-size:16px;margin-left:35%'> Edit Interface </label><br><br><label class='drop_down_label'> Interface :</label><input disabled id='mgmt_edit_infc' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input id='mgmt_edit_ip' required type='text' value='0.0.0.0' title='hello' class='field_prop'><br><br> <label class='drop_down_label'> Subnet :</label><input id='mgmt_edit_subnet' required type='text' value='0.0.0.0' class='field_prop'><br><br> <label class='drop_down_label'> Default Gateway :</label><input id='mgmt_edit_dgw' required type='text' value='0.0.0.0' class='field_prop'><br><br> <label class='drop_down_label'> DNS Server :</label><input id='mgmt_edit_dnss' required type='text' value='0.0.0.0' class='field_prop'><br> <input id='mgmt_edit__confirm_msg' type='text' disabled class='field_prop' style='margin-top:5px;border:none;background:transparent'> <br> <br><button id='editMgmtButton' class='addUpdateRules' style='margin-top:10px;'>Edit Interface</button></div></div><div id='mgmtInfoProModal' class='modal'><div class='modal-content' style=' height:300px;'><span id='closemgmtInfoModal' class='close'>×</span> <label style='font-size:16px;margin-left:35%'> Interface Info</label><br><br><label class='drop_down_label'> Interface :</label><input disabled id='mgmt_info_infc' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input disabled id='mgmt_info_ip' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> Subnet :</label><input disabled id='mgmt_info_subnet' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> Default Gateway :</label><input disabled id='mgmt_info_dgw' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> DNS Server :</label><input disabled id='mgmt_info_dnss' required type='text' class='field_prop'><br><br> </div></div></div></div>";
var management_html = "<div id='Interface_Management'><div id='Interface_Management_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Management Interface Configurations</div> <div style='width:100%;height:30px'> </div><div><div style='width:698px;height:100px;position:relative;margin:auto;background-color:white;background-image:url(image/pdev_r630_front.png);background-repeat:no-repeat;background-size:100%;'><div id='mgmt_o_mask' class='alpha60' style='width:38px;display:none;height:35px;position:absolute;top:35px;left:235px;border:2px #00FF00;border-style:solid;'></div></div></div> <div id='mgmt_prop' style='width:100%;height:calc(100% - 305px)'> <div class='mgmt_table_plane'> <div id='mgmt_table_holder' style='width:100%;'><div class='edit_panel'><button type='button' id='deleteProfile' style='float:right;background:#245580 url(image/info.png) no-repeat 10px center;' disabled onclick = 'info_mgmt_interface_show()' class='delete'>Interface info</button> <button type='button' id='createProfile' style='float:right' onclick = 'edit_mgmt_interface_prop()' class='edit' disabled>Edit</button></div><table id='mgmt_iface_table' class='hover row-border order-column StatusTablesFont display' cellspacing='0' width='100%'> <thead><tr style='height:5px;padding:0px;margin:15px;font-size:12px;background-color:#122b40;color:#ffffff'> <th>Key</th> <th>Interface</th> <th>IP Address</th> <th>Subnet</th> <th>Default Gateway</th> <th>DNS Server</th> <th>Status</th> </tr></thead></table></div> </div></div><div id='editMgmtModal' class='modal'><div class='modal-content' style=' height:390px;'><span id='closeEditMgmtModal' class='close'>×</span> <label style='font-size:16px;margin-left:35%'> Edit Interface </label><br><br><label class='drop_down_label'> Interface :</label><input disabled id='mgmt_edit_infc' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input id='mgmt_edit_ip' required type='text' value='0.0.0.0' title='hello' class='field_prop'><br><br> <label class='drop_down_label'> Subnet :</label><input id='mgmt_edit_subnet' required type='text' value='0.0.0.0' class='field_prop'><br><br> <label class='drop_down_label'> Default Gateway :</label><input id='mgmt_edit_dgw' required type='text' value='0.0.0.0' class='field_prop'><br><br> <label class='drop_down_label'> DNS Server :</label><input id='mgmt_edit_dnss' required type='text' value='0.0.0.0' class='field_prop'><br> <input id='mgmt_edit__confirm_msg' type='text' disabled class='field_prop' style='margin-top:5px;border:none;background:transparent'> <br> <br><button id='editMgmtButton' class='addUpdateRules' style='margin-top:10px;'>Edit Interface</button></div></div><div id='mgmtInfoProModal' class='modal'><div class='modal-content' style=' height:300px;'><span id='closemgmtInfoModal' class='close'>×</span> <label style='font-size:16px;margin-left:35%'> Interface Info</label><br><br><label class='drop_down_label'> Interface :</label><input disabled id='mgmt_info_infc' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input disabled id='mgmt_info_ip' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> Subnet :</label><input disabled id='mgmt_info_subnet' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> Default Gateway :</label><input disabled id='mgmt_info_dgw' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> DNS Server :</label><input disabled id='mgmt_info_dnss' required type='text' class='field_prop'><br><br> </div></div></div></div>";
var config_html = "<div id='Media_Config'><div id='Media_Config_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Device Media Configurations</div> <div style='width:100%;height:30px'> </div><div><div style='width:698px;height:100px;position:relative;margin:auto;background-color:whitesmoke;background-image:url(image/pdev_front.png);background-repeat:no-repeat;background-size:100%;'><div id='config_wIn_mask' class='alpha60' style='width:30px;display:none;height:35px;position:absolute;top:10px;left:581px;border:2px #00FF00;border-style:solid;'></div><div id='config_wOut_mask' class='alpha60' style='width:30px;display:none;height:35px;position:absolute;top:10px;left:560px;border:2px #00FF00;border-style:solid;'></div> </div></div> <div style='width:100%;height:calc(100% - 305px)'> <div class='mgmt_table_plane'> <div id='media_config_table_holder' style='width:100%;'><table id='Media_Config_Table' class='hover row-border order-column StatusTablesFont display' cellspacing='0' width='100%'> <thead><tr style='height:5px;padding:0px;margin:15px;font-size:12px;background-color:#122b40;color:#ffffff'> <th>Key</th> <th>Interface</th> <th>Status</th> <th>Media</th> </tr></thead></table></div> </div></div> </div></div>";
var maintenance_html = "<div id='Maintenance'><div id='Maintenance_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Device Maintenance</div> <div style='width:100%;height:100px;'><div style='width:100%;height:20px'></div><div class='edit_panel'><button type='button' id='ele_pdev_reset' class='delete' style='float:left;height:200px;background:#1e2d35 url(image/reset.png) 15px 70px/120px 100px no-repeat;margin:10px;margin-left:calc(50% - 235px);position:relative' onclick = 'maintenance_reset()' ><span style=' display:block;position:absolute;top:10px;left:55px;font-size:15px;'>Refresh</span></button> <button type='button' id='ele_pdev_reboot' class='delete' style='float:left;height:200px;background:#1e2d35 url(image/restart.png) 25px 70px/100px 100px no-repeat;margin:10px;position:relative' onclick = 'maintenance_reboot()'><span style=' display:block;position:absolute;top:10px;left:50px;font-size:15px;'>Restart</span></button><button type='button' id='ele_pdev_powerdown' class='delete' style='float:left;height:200px;background:#1e2d35 url(image/power.png) 25px 70px/100px 100px no-repeat;position:relative;margin:10px;' onclick = 'maintenance_poweroff()'><span style=' display:block;position:absolute;top:10px;left:40px;font-size:15px;'>Power Off</span></button></div></div><div id='maintenance_warning_modal' class='modal'><div class='modal-content' style=' height:180px;'><span id='maintenance_cancel_warning_modal' class='close'>×</span> <label style='color:#d43f3a;font-size:16px;margin-left:35%'> Attention!</label><br><br><label class='dmaintain_show_label'></label><br><br><button class='addUpdateRules' onclick='$('#maintenance_warning_modal').hide();' style='margin-top:10px;width:100px;height:30px;font-size:14px;float:right;background-color:gray;margin-left:10px'>Cancel</button><button class='addUpdateRules' onclick='maintenance_do_operation(maintenance_warning_type);' style='margin-top:10px;width:100px;height:30px;font-size:14px;float:right'>Proceed</button></div></div><div id='maintenance_operation_modal' class='modal' style='z-index:1000'><div id='createDisconnectModalContent' class='modal-content' style='height:200px;'><label class='modalTitle' style='margin-left:160px'> Done </label><br><br><div style='width:100%;height:5px'></div><label class='dmaintain_operation_label' style='margin-left:60px'> </label> </div></div> </div></div>";
var system_update_html = "<div id='System_Info'><div id='System_Info_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 25px);min-height:580px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>System Update</div> <div style='width:100%;height:50px;'><div style='margin-top:10px;'><img src='image/bullet.png' style='width:10px;height:10px;margin-top:13px;margin-left:18px;float:left'/><a style='font-size:12px;margin-top:11px;margin-left:5px;text-decoration:none;color:black;position:absolute'>Online Update</a><label class='switch' style='margin-top:10px;margin-left:90px'><input type='checkbox' id='online_updt_switch' onclick='pq_online_update_state_changed(this)'><span class='slider round'></span></label></div> <div class='edit_panel' style='background:transparent'><button id='online_update_btn' class='edit' onclick='get_new_update();' style='float:right;margin-right:20px;width:170px;' hidden>Check for Updates Online</button></div> </div><div class='Pq_LinkPlotHolder' style='height:calc(100% - 150px);width:calc(100% - 50px);overflow-y:auto;margin-top:35px;'><div class='SystemStatsPanelHeader' style='height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Current Version</div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='sw_version' style='font-size:11px;margin-left:30px;width:70%'></div><button id='2' class='edit' onclick='update_offline();' style='float:right;margin-right:20px;width:100px;margin-top:-12px;height:25px'>Update Offline</button></div><div class='SystemStatsPanelHeader' id='scheduled_update_header' style='margin-top:10px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Scheduled Update </div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='sched_upd_time' style='font-size:11px;margin-left:30px'></div></div> <div class='SystemStatsPanelHeader' style='margin-top:10px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Last Update </div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='last_upd_time' style='font-size:11px;margin-left:30px'></div></div> <div class='SystemStatsPanelHeader' id='last_update_check_header' style='margin-top:10px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Last Update Check</div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='last_upd_chk_time' style='font-size:11px;margin-left:30px'></div></div> <div class='SystemStatsPanelHeader' style='margin-top:10px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Application Signature Database</div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='app_signature_info' style='font-size:11px;margin-left:3px;width:70%;float:left'></div><button class='edit' onclick='update_app_signature();' style='float:right;margin-right:20px;width:120px;height:25px;'>Update Signatures</button></div> <div class='SystemStatsPanelHeader' style='margin-top:10px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> License Information</div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='license_info' style='font-size:11px;margin-left:3px;width:70%;float:left;'></div><button class='edit' onclick='update_license();' style='float:right;margin-right:20px;width:100px;height:25px'>Update License</button></div> <div class='SystemStatsPanelHeader' style='margin-top:10px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Contact Information</div></div><div style='width:100%;height:25px;margin-top:5px'> <div style='display:none' id='sys_admin_cont_email_group'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:11px;margin-left:18px;float:left;margin-top:10px;'/><div class='pq_vcenter' id='sys_admin_cont_email' style='font-size:11px;margin-left:2px;display:inline;width:200px'>himantha@paraqum.com</div> <button id='update_sys_admin_email' class='addUpdateRules' style='width:70px;height:20px;font-size:10px;background:#208830;display:inline;margin-left:20px;' >Update</button> </div><button id='add_sys_admin_email' class='addUpdateRules' style='width:90px;height:20px;font-size:10px;background:#208830;display:inline;margin-left:20px;' >+ Add Email</button> </div> </div> <div id='Offline_Update_Window' class='modal'><div id='Offline_Update_Window_Modal' class='modal-content' style=' height:220px;'><span class='close'>×</span><div style='float:left;margin-left:15px;margin-bottom:20px'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style='margin-top:5px;margin-left:60px;'> Offline Update </label> </div><form enctype='multipart/form-data' id='offline_update_form' onsubmit='return false'><br><br><br><label class='fileLabel' style=''><input type='file' name='file' id='offline_file_select' required accept='.pqupd'/><span>Select File</span></label><input id='upload_file_name' type='text' value='No File Selected' style='border:none;width:260px;font-size:12px;'><progress id='offline_upload_progress' style='margin-top:10px;height:20px;width:100%' hidden></progress><input type='submit' style='margin-top:20px;width:150px' id='offline_file_upload' class='addUpdateRules' disabled value='Upload'> </form></div></div> <div id='Signature_Update_Window' class='modal'><div id='Signature_Update_Window_Modal' class='modal-content' style=' height:190px;width:420px;'><span class='close'>×</span><div style='float:left;margin-left:15px;margin-bottom:20px'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style='margin-top:5px;margin-left:10px;'> Application Signature Update </label> </div><form enctype='multipart/form-data' id='app_signature_update_form' onsubmit='return false'><br><br><br><label class='fileLabel' style=''><input type='file' name='file' id='app_signaure_file_select' required accept='.pqsig'/><span>Select File</span></label><input type='text' id='upload_app_sig_file_name' disabled value='No File Selected' style='border:none;width:260px;font-size:12px;background:transparent'><input type='submit' style='margin-top:20px;width:150px' id='app_signaure_file_upload' class='addUpdateRules' disabled value='Upload'></form></div></div><div id='License_Update_Window' class='modal'><div id='License_Update_Window_Modal' class='modal-content' style=' height:190px;'><span class='close'>×</span><div style='float:left;margin-left:15px;margin-bottom:20px'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style='margin-top:5px;margin-left:60px;'> License Update </label> </div><form enctype='multipart/form-data' id='license_update_form' onsubmit='return false'><br><br><br><label class='fileLabel' style=''><input type='file' name='file' id='license_file_select' required accept='.lic'/><span>Select File</span></label><input id='upload_license_name' type='text' value='No File Selected' style='border:none;width:260px;font-size:12px;'><input type='submit' style='margin-top:20px;width:150px' id='license_file_upload' class='addUpdateRules' disabled value='Upload'></form></div></div> <div id='Offline_Update_Install_Window' class='modal'><div class='modal-content' style='width:370px;height:170px;margin:auto;border-radius:17px;padding:0px;background:whitesmoke'><div class='StatusContentHolderHeader StatusContentHolderHeaderText '>File Status</div> <div style='display:inline-block;float:left;margin:12px;'><img id='gif' style='display:inline-block;margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/></div> <div style='display:inline-block;width:280px;height:120px;'><div style='margin-left:15px;margin-top:32px;font-family:Courier-New;font-size:17px;' >File Uploaded Successfully</div><button class='statusModalButton' onclick='install_offline_update()' style='width:80px;height:30px;margin-left:28px;margin-top:30px;background:#21b224'>Install</button><button class='statusModalButton' onclick='$('#Offline_Update_Install_Window').hide();' style='width:80px;height:30px;margin-top:17px;background:#f44242;margin-left:5px;'>Cancel</button></div> </div></div> <div id='App_Signature_Update_Install_Window' class='modal'><div class='modal-content' style='width:370px;height:170px;margin:auto;border-radius:17px;padding:0px;background:whitesmoke'><div class='StatusContentHolderHeader StatusContentHolderHeaderText '>File Status</div> <div style='display:inline-block;float:left;margin:12px;'><img id='gif' style='display:inline-block;margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/></div> <div style='display:inline-block;width:280px;height:120px;'><div style='margin-left:15px;margin-top:32px;font-family:Courier-New;font-size:17px;' >File Uploaded Successfully</div><button class='statusModalButton' onclick='install_app_sig_update()' style='width:80px;height:30px;margin-left:28px;margin-top:30px;background:#21b224'>Install</button><button class='statusModalButton' onclick='$('#App_Signature_Update_Install_Window').hide();' style='width:80px;height:30px;margin-top:17px;background:#f44242;;margin-left:5px;'>Cancel</button></div> </div></div> <div id='License_Update_Install_Window' class='modal'><div class='modal-content' style='width:370px;height:170px;margin:auto;border-radius:17px;padding:0px;background:whitesmoke'><div class='StatusContentHolderHeader StatusContentHolderHeaderText '>File Status</div> <div style='display:inline-block;float:left;margin:12px;'><img id='gif' style='display:inline-block;margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/></div> <div style='display:inline-block;width:280px;height:120px;'><div style='margin-left:15px;margin-top:32px;font-family:Courier-New;font-size:17px;' >File Uploaded Successfully</div><button class='statusModalButton' onclick='install_license_update()' style='width:80px;height:30px;margin-left:28px;margin-top:30px;background:#21b224'>Install</button><button class='statusModalButton' onclick='$('#License_Update_Install_Window').hide();' style='width:80px;height:30px;margin-top:17px;background:#f44242;;margin-left:5px;'>Cancel</button></div> </div></div> <div id='Updating_modal' class='modal' style='background:rgba(254, 251, 251, 0.9)'><img style='display:inline-block;margin-top:40px;height:50px;width:50px;margin-left:calc(50% - 25px)' src='image/gif/v-loader.gif' alt='your image'/><div style='font-family:Georgia;font-size:25px;text-align:center;margin-top:15px;'> Updating ...</div></div> <div id='AddSystemAdminEmail' class='modal'><div class='modal-content' style=' width:400px;height:200px;'><span class='close'>×</span><label class='modalTitle' id='sys_admin_email_title' style=' margin-left:130px'> </label><br><br><label class='drop_down_label'> Email :</label><input id='addSysAdminEmail' required type='text' class='field_prop' style='width:300px;' pattern='\w{1,24}'> <br><br> <br><button id='addSysAdminEmailToSystem' class='addUpdateRules'>Add to System</button> </div></div> </div></div>";
var ele_pqpie_label_html = "<div class='pqpie_lble pqpie_modal '><div class='pqpie_cmodal' style=' height:100%;width:100%'><div class='pqpie_lble_nme' style='position:relative;width:100%;height:20px;background-color:transparent;top:calc(25%);text-align:center;padding-top:3px;color:black;font-size:11px;'></div><div class='pqpie_lble_val' style='position:relative;width:100%;height:20px;background-color:transparent;top:calc(25% + 15px);text-align:center;color:black;font-size:11px;'></div> </div></div>";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
create_modal = function (ele, modal, msg) {
    var item = "<div id='" + modal + "' class='pq_modal'>" +
            "<div class='pq_modal-content'>" +
            "<img src='image/dribbble_material_preloader.gif' style='width: 80px;float: left'>" +
            "<p class='pq_mdl_vcenter'>" + msg + "</p>" +
            "</div>" +
            "</div>";
    $(ele).append(item);
};

hide_modal = function (modal) {
    $(modal).hide();
};

show_modal = function (modal) {
    $(modal).show();
};

add_update_indicator = function (div, id, indication) {
    var item = "<div class='pq_updater_zee' id ='" + id + "' style='position: absolute; width: 100%; height: 100%;background-color: #f4f5f5;'>" +
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
var quota_rules_table;
var quota_app_prof_table;
var quota_app_prof_list_table;
var quota_url_prof_table;
var quota_url_prof_list_table;
var quota_serv_prof_table;
var quota_serv_prof_list_table;
var quota_prof_table;

var quota_rule_list = [];
var quota_app_prof_list = [];
var quota_app_prof_list_data = [];
var quota_app_prof_apps = [];
var quota_url_prof_list = [];
var quota_url_prof_list_data = [];
var quota_url_prof_urls = [];
var quota_serv_prof_list = [];
var quota_serv_prof_list_data = [];
var quota_serv_prof_servs = [];
var quota_prof_list = [];
var quota_prof_list_data = [];

var quota_app_prof_id;
var quota_url_prof_id;
var quota_serv_prof_id;

//Update and Display tables 

function Init_WO_Quota_Param(q_app_prof, q_app_prof_apps, q_url_prof, q_url_prof_urls,
        q_serv_prof, q_serv_prof_servs, q_quota) {

    if (q_app_prof) {
        var cookie = $.cookie('pqsf');
        quota_app_prof_list = [];
        quota_app_prof_list_data = [];
        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_APPPROF_LIST, 0);

        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data, textStatus, jqXHR) {
            quota_app_prof_list[0] = 'None';
            var row = data.split(";");
            for (var i = 0; i < row.length - 1; i++) {
//                quota_app_prof_list[0] = 'None';
                quota_app_prof_list_data[i] = row[i];
                var element = row[i].split("&");
                quota_app_prof_list[element[0]] = element[1];
            }
            Init_Quota_App_Prof_Apps();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    } else
        Init_Quota_App_Prof_Apps();

    function Init_Quota_App_Prof_Apps() {

        if (q_app_prof_apps) {
            var cookie = $.cookie('pqsf');
            quota_app_prof_apps = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_APPRULE_LIST, 0);
            req[1] = quota_app_prof_id;
            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    quota_app_prof_apps[i] = row[i];
                }
                Init_Quota_URL_Prof_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Quota_URL_Prof_List();
    }

    function Init_Quota_URL_Prof_List() {

        if (q_url_prof) {
            var cookie = $.cookie('pqsf');
            quota_url_prof_list = [];
            quota_url_prof_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_URLPROF_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                quota_url_prof_list[0] = 'None';
                for (var i = 0; i < row.length - 1; i++) {
                    quota_url_prof_list_data[i] = row[i];
                    var element = row[i].split("&");
                    quota_url_prof_list[element[0]] = element[1];
                }
                Init_Quota_URL_Prof_URLs();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Quota_URL_Prof_URLs();
    }

    function Init_Quota_URL_Prof_URLs() {

        if (q_url_prof_urls) {
            var cookie = $.cookie('pqsf');
            quota_url_prof_urls = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_URLRULE_LIST, 0);
            req[1] = quota_url_prof_id;
            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    quota_url_prof_urls[i] = row[i];
                }
                Init_Quota_Serv_Prof_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Quota_Serv_Prof_List();
    }

    function Init_Quota_Serv_Prof_List() {

        if (q_serv_prof) {
            var cookie = $.cookie('pqsf');
            quota_serv_prof_list = [];
            quota_serv_prof_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_SVSPROF_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    quota_serv_prof_list_data[i] = row[i];
                    var element = row[i].split("&");
                    quota_serv_prof_list[element[0]] = element[1];
                }
                Init_Quota_Serv_Prof_Servs();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Quota_Serv_Prof_Servs();
    }

    function Init_Quota_Serv_Prof_Servs() {

        if (q_serv_prof_servs) {
            var cookie = $.cookie('pqsf');
            quota_serv_prof_servs = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_SVSRULE_LIST, 0);
            req[1] = quota_serv_prof_id;
            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    quota_serv_prof_servs[i] = row[i];
                }
                Init_Quota_Prof_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Quota_Prof_List();
    }

    function Init_Quota_Prof_List() {

        if (q_quota) {

            quota_prof_list = [];
            quota_prof_list_data = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTAELE_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                console.log(data)
                for (var i = 0; i < row.length - 1; i++) {
                    quota_prof_list_data[i] = row[i];
                    var element = row[i].split("&");
                    quota_prof_list[element[0]] = element[1];
                }
                Init_Quota_Rule_List();

            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Quota_Rule_List();
    }

    function Init_Quota_Rule_List() {

        quota_rule_list = [];
        var cookie = $.cookie('pqsf');

        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_RULE_LIST, 0); //WO_GET_EVENT_LIST

        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 1000,
            type: 'POST',
            url: '/'

        }).done(function (data, textStatus, jqXHR) {
            var row = data.split(";");
            for (var i = 0; i < row.length - 1; i++) {
                quota_rule_list[i] = row[i];
            }
            if (quota_rules_table) {
                Display_Quota_Rule_Table();
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    }
}

function Display_Quota_Rule_Table() {
    quota_rules_table.clear().draw();
    for (var i = 0; i < quota_rule_list.length; i++) {
        var element = quota_rule_list[i].split("&");
        quota_rules_table.row.add([element[0], element[1], address_list[element[2]], quota_app_prof_list[element[3]], element[4], element[5], quota_prof_list[element[6]]]);
    }
    quota_rules_table.draw(false);
}

function Update_Quota_App_Prof_List() {
    var cookie = $.cookie('pqsf');
    quota_app_prof_list = [];
    quota_app_prof_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_APPPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        quota_app_prof_list[0] = 'None';
        for (var i = 0; i < row.length - 1; i++) {
            quota_app_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            quota_app_prof_list[element[0]] = element[1];
        }
        Display_Quota_App_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_App_Prof_Table() {
    var element;
//    quota_app_prof_list_data = ['1&Q_prof_1&2', '2&Q_prof_2&3'];
    quota_app_prof_table.clear().draw();
    for (var i = 0; i < quota_app_prof_list_data.length; i++) {
        element = quota_app_prof_list_data[i].split("&");
        quota_app_prof_table.row.add([element[0], element[1], '-', element[2]]);
    }
    quota_app_prof_table.draw(false);
}

function Update_Quota_App_Prof_Apps() {
    var cookie = $.cookie('pqsf');
    quota_app_prof_apps = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_APPRULE_LIST, 0);
    req[1] = quota_app_prof_id;
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            quota_app_prof_apps[i] = row[i];
        }
        Display_Quota_App_Prof_Apps_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_App_Prof_Apps_Table() {
    var element;
//    quota_ctrl_app_ids = [];
    quota_app_prof_list_table.clear().draw();
    for (var i = 0; i < quota_app_prof_apps.length; i++) {
        var element = quota_app_prof_apps[i].split("&");
//        quota_ctrl_app_ids.push(element[2]);
        quota_app_prof_list_table.row.add([element[0], application_list[element[2]], quota_prof_list[element[3]]]);
    }
    quota_app_prof_list_table.draw(false);
}

////////////////////////

function Update_Quota_URL_Prof_List() {
    var cookie = $.cookie('pqsf');
    quota_url_prof_list = [];
    quota_url_prof_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_URLPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");

        for (var i = 0; i < row.length - 1; i++) {
            quota_url_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            quota_url_prof_list[element[0]] = element[1];
        }
        Display_Quota_URL_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_URL_Prof_Table() {
    var element;
//    quota_url_prof_list_data = ['1&Q_prof_1&2', '2&Q_prof_2&3'];
    quota_url_prof_table.clear().draw();
    for (var i = 0; i < quota_url_prof_list_data.length; i++) {
        element = quota_url_prof_list_data[i].split("&");
        quota_url_prof_table.row.add([element[0], element[1], '-', element[2]]);
    }
    quota_url_prof_table.draw(false);
}

function Update_Quota_URL_Prof_URLs() {
    var cookie = $.cookie('pqsf');
    quota_url_prof_urls = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_URLRULE_LIST, 0);
    req[1] = quota_url_prof_id;
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            quota_url_prof_urls[i] = row[i];
        }
        Display_Quota_URL_Prof_URLs_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_URL_Prof_URLs_Table() {
    var element;
//    quota_url_prof_urls = ['1&1&2040&0', '2&2&2036&255'];
    quota_url_prof_list_table.clear().draw();
    for (var i = 0; i < quota_url_prof_urls.length; i++) {
        var element = quota_url_prof_urls[i].split("&");
        quota_url_prof_list_table.row.add([element[0], element[1], get_authentiation(element[3]), url_list[element[2]], quota_prof_list[element[4]]]);
    }
    quota_url_prof_list_table.draw(false);
}

////////////////////////

function Update_Quota_Serv_Prof_List() {
    var cookie = $.cookie('pqsf');
    quota_serv_prof_list = [];
    quota_serv_prof_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_SVSPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            quota_serv_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            quota_serv_prof_list[element[0]] = element[1];
        }
        Display_Quota_Serv_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_Serv_Prof_Table() {
    var element;
//    quota_serv_prof_list_data = ['1&Q_prof_1&2', '2&Q_prof_2&3'];
    quota_serv_prof_table.clear().draw();
    for (var i = 0; i < quota_serv_prof_list_data.length; i++) {
        element = quota_serv_prof_list_data[i].split("&");
        quota_serv_prof_table.row.add([element[0], element[1], '-', element[2]]);
    }
    quota_serv_prof_table.draw(false);
}

function Update_Quota_Serv_Prof_Servs() {
    var cookie = $.cookie('pqsf');
    quota_serv_prof_servs = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTA_SVSRULE_LIST, 0);
    req[1] = quota_serv_prof_id;
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            quota_serv_prof_servs[i] = row[i];
        }
        Display_Quota_Serv_Prof_Servs_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_Serv_Prof_Servs_Table() {
    var element;
//    quota_serv_prof_servs = ['1&1&443&0', '2&2&443&255'];
    quota_serv_prof_list_table.clear().draw();
    for (var i = 0; i < quota_serv_prof_servs.length; i++) {
        var element = quota_serv_prof_servs[i].split("&");
        quota_serv_prof_list_table.row.add([element[0], element[1], service_list[element[2]], get_service_type(element[3]), quota_prof_list[element[4]]]);
    }
    quota_serv_prof_list_table.draw(false);
}
////////////////////////

function Update_Quota_Prof_List() {

    quota_prof_list = [];
    quota_prof_list_data = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_QUTAELE_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        quota_prof_list[0] = 'No Quota';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            quota_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            quota_prof_list[element[0]] = element[1];
        }
        Display_Quota_Prof_Table();

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_Prof_Table() {
    quota_prof_table.clear().draw();
    for (var i = 0; i < quota_prof_list_data.length; i++) {
        var element = quota_prof_list_data[i].split("&");
        if (element[5] === '4294967295' || element[5] === '0') {
            quota_prof_table.row.add([element[0], element[1], get_quota_type(element[3]), element[2], get_pipe_type(element[4], 0), get_pipe_type(element[4], 1), set_action(0, element[5]), '-', '-', element[7]]);
        } else
            quota_prof_table.row.add([element[0], element[1], get_quota_type(element[3]), element[2], get_pipe_type(element[4], 0), get_pipe_type(element[4], 1), 'Simple Shaping', pipe_list[element[6]], pipe_list[element[5]], element[7]]);
    }
    quota_prof_table.draw(false);
}

get_quota_type = function (id) {
    if (id === '1') {
        return 'Daily';
    } else if (id === '2') {
        return 'Weekly';
    } else if (id === '3') {
        return 'Monthly';
    }
};

///////

function Display_Quota_Usage_Table() {
    quota_rule_list = ['1&Adr_prof&App_prof&URL_prof&Serv_prof&50 MB'];
    quota_usage_table.clear().draw();
    for (var i = 0; i < quota_rule_list.length; i++) {
        var element = quota_rule_list[i].split("&");
         quota_usage_table.row.add([element[0],element[1],element[2],element[3],element[4],element[5]]);
//        quota_usage_table.row.add([element[0], address_list[element[1]], quota_app_prof_list[element[2]], element[3], element[4], quota_prof_list[element[5]]]);
    }
    quota_usage_table.draw(false);
}

//////

function init_quota_rule_elements() {
    $('#add_quota_source,#add_app_quota_profile, #add_quota_default_quota').empty();
    $('#edit_quota_source,#edit_app_quota_profile, #add_quota_default_quota').empty();

    $('#add_quota_source, #edit_quota_source').append($('<option>', {value: 0})
            .text('No Source Object'));

    if (address_list.length > 0) {
        $('#add_quota_source, #edit_quota_source').empty();
    }

    for (var u_item in address_list) {
        $('#add_quota_source')
                .append($('<option>', {value: u_item})
                        .text(address_list[u_item]));
        $('#edit_quota_source')
                .append($('<option>', {value: u_item})
                        .text(address_list[u_item]));
    }
    for (var u_item in quota_app_prof_list) {
        $('#add_app_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_app_prof_list[u_item]));
        $('#edit_app_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_app_prof_list[u_item]));
    }
    for (var u_item in quota_prof_list) {
        $('#add_quota_default_quota')
                .append($('<option>', {value: u_item})
                        .text(quota_prof_list[u_item]));
        $('#edit_quota_default_quota')
                .append($('<option>', {value: u_item})
                        .text(quota_prof_list[u_item]));
    }

//    $.each(application_list, function (key, app) {
//        $('#add_quota_profile_apps')
//                .append($('<option>', {value: key})
//                        .text(app));
//    });
//
//    var my_options = $("#add_quota_profile_apps option");
//    var selected = $("#add_quota_profile_apps").val();
//    my_options.sort(function (a, b) {
//        if (a.text.toLowerCase() > b.text.toLowerCase())
//            return 1;
//        if (a.text.toLowerCase() < b.text.toLowerCase())
//            return -1;
//        return 0;
//    });
//    $("#add_quota_profile_apps").empty().append(my_options);
//    $("#edit_quota_profile_apps").append(my_options);
//    $("#add_quota_profile_apps").val(selected);
//    $("#edit_quota_profile_apps").val(selected);
}

function init_quota_prof(div) {

//    $(div).append($('<option>', {value: 0})
//            .text('None'));

    if (quota_prof_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in quota_prof_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(quota_prof_list[u_item]));
    }

}


//Modal operations              

function Create_Q(table) {

    var modal = null;
    var span = null;

    switch (table) {
        case 1:
            modal = '#CreateQuotaRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 3:
            modal = '#CreateQuotaAppName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 5:
            modal = '#CreateQuotaProfModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 7:
            modal = '#CreateQuotaURLName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 9:
            modal = '#CreateQuotaServName';
            span = document.getElementsByClassName("close")[0];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };
}

function Edit_Q(table) {

    var modal = null;
    var span = null;
//    rowData = null;
    $('#editQuotaAddress').children().detach();

    switch (table) {
        case 1:
            modal = '#EditQuotaRuleModal';
            span = document.getElementsByClassName("close")[1];
            SetQuotaTableModalElements();
            break;
        case 5:
            modal = '#EditQuotaProfModal';
            span = document.getElementsByClassName("close")[1];
            SetQuotaProfTableModalElements();
            break;
        case 6:
            modal = '#EditAppQuotaModal';
            span = document.getElementsByClassName("close")[1];
            SetAppQuotaTableModalElements();
            break;

        default:
            alert("Unable to Delete entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };
}

function Delete_Q(table) {

    switch (table) {

        case 1:
            delete_wo_quota_rule((quota_rules_table.row('.selected').data())[0]);
            break;
        case 3:
            delete_wo_app_quota_prof((quota_app_prof_table.row('.selected').data())[0]);
            break;
        case 4:
            delete_wo_app_quota((quota_app_prof_list_table.row('.selected').data())[0], quota_app_prof_id);
            break;
        case 5:
            delete_wo_quota_prof((quota_prof_table.row('.selected').data())[0]);
            break;
        case 7:
            delete_wo_url_quota_prof((quota_url_prof_table.row('.selected').data())[0]);
            break;
        case 8:
            delete_wo_url_quota((quota_url_prof_list_table.row('.selected').data())[0], (quota_url_prof_list_table.row('.selected').data())[1]);
            break;
        case 9:
            delete_wo_serv_quota_prof((quota_serv_prof_table.row('.selected').data())[0]);
            break;
        case 10:
            delete_wo_serv_quota((quota_serv_prof_list_table.row('.selected').data())[0], (quota_serv_prof_list_table.row('.selected').data())[1]);
            break;
        default:
            alert("Unable to delete data!");
    }
    Clear();
}


//App Control list Modal Initialisation             

function SetQuotaTableModalElements() {
    var quota_data = quota_rules_table.row('.selected').data();
    $('#edit_quota_prof_shapers').children().detach();

    $("#edit_quota_source option").filter(function () {
        return this.text === quota_data[1];
    }).prop('selected', true);
    $("#edit_app_quota_profile option").filter(function () {
        return this.text === quota_data[2];
    }).prop('selected', true);
    $("#edit_url_quota_profile option").filter(function () {
        return this.text === quota_data[3];
    }).prop('selected', true);
    $("#edit_serv_quota_profile option").filter(function () {
        return this.text === quota_data[4];
    }).prop('selected', true);
    $("#edit_quota_default_quota option").filter(function () {
        return this.text === quota_data[5];
    }).prop('selected', true);
}

function New_Quota_App_Control(type) {

    var modal = null;
    var span = null;

    switch (type) {
        case 1:
            modal = '#CreateQuotaAppModal';
            span = document.getElementsByClassName("close")[1];
            break;
        case 2:
            modal = '#EditQuotaAppModal';
            span = document.getElementsByClassName("close")[2];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (type === 1) {
        $("#addAppQuotaID").empty();
        $.each(application_list, function (key, app) {
            if (app !== 'Other') {
                $('#addAppQuotaID')
                        .append($('<option>', {value: app}));
            }
        });
        init_quota_prof('#add_quota_app_profile');

    } else if (type === 2) {  //If Editing Applications included in profile
        init_quota_prof('#edit_quota_app_profile');
        var sel_app_ctrl_app_data = quota_app_prof_list_table.row('.selected').data();
        $("#editQuotaAddedApp").val(sel_app_ctrl_app_data[1]).attr('disabled', true);
        $("#edit_quota_app_profile option").filter(function () {
            return this.text === sel_app_ctrl_app_data[2];
        }).prop('selected', true);
    }
}

function New_Quota_URL_Control(type) {

    var modal = null;
    var span = null;

    switch (type) {
        case 1:
            modal = '#CreateQuotaURLModal';
            span = document.getElementsByClassName("close")[1];
            break;
        case 2:
            modal = '#EditQuotaURLModal';
            span = document.getElementsByClassName("close")[2];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (type === 1) {
        init_url_list('#add_quota_url');
        init_quota_prof('#add_quota_url_profile');

    } else if (type === 2) {  //If Editing Applications included in profile
        init_url_list('#edit_quota_url');
        init_quota_prof('#edit_quota_url_profile');
        var sel_url_data = quota_url_prof_list_table.row('.selected').data();
//        $("#editQuotaAddedApp").val(sel_url_data[1]).attr('disabled', true);
        $("#edit_quota_url_authen option").filter(function () {
            return this.text === sel_url_data[2];
        }).prop('selected', true);
        $("#edit_quota_url_authen").attr('disabled', true);
        $("#edit_quota_url option").filter(function () {
            return this.text === sel_url_data[3];
        }).prop('selected', true);
        $("#edit_quota_url").attr('disabled', true);
        $("#edit_quota_url_profile option").filter(function () {
            return this.text === sel_url_data[4];
        }).prop('selected', true);
    }
}

function New_Quota_Serv_Control(type) {

    var modal = null;
    var span = null;

    switch (type) {
        case 1:
            modal = '#CreateQuotaServModal';
            span = document.getElementsByClassName("close")[1];
            break;
        case 2:
            modal = '#EditQuotaServModal';
            span = document.getElementsByClassName("close")[2];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (type === 1) {
        init_service_list('#add_quota_serv');
        init_quota_prof('#add_quota_serv_profile');

    } else if (type === 2) {  //If Editing Applications included in profile
        init_service_list('#edit_quota_serv');
        init_quota_prof('#edit_quota_serv_profile');
        var sel_serv_data = quota_serv_prof_list_table.row('.selected').data();
//        $("#editQuotaAddedServ").val(sel_serv_data[1]).attr('disabled', true);
        $("#edit_quota_serv_prot option").filter(function () {
            return this.text === sel_serv_data[3];
        }).prop('selected', true);
        $("#edit_quota_serv_prot").attr('disabled', true);
        $("#edit_quota_serv option").filter(function () {
            return this.text === sel_serv_data[2];
        }).prop('selected', true);
        $("#edit_quota_serv").attr('disabled', true);
        $("#edit_quota_serv_profile option").filter(function () {
            return this.text === sel_serv_data[4];
        }).prop('selected', true);
    }
}

function SetQuotaProfTableModalElements() {
    var tot_quota_data = quota_prof_table.row('.selected').data();
    $("#editQuotaProfName").val(tot_quota_data[1]).attr("disabled", true);
    $("#editQuotaProfType option").filter(function () {
        return this.text === tot_quota_data[2];
    }).prop('selected', true);
    $("#editQuotaProfType").attr("disabled", true);
    $("#editQuotaProfAmount").val(tot_quota_data[3]);
    $("#editQuotaPipeType option").filter(function () {
        return this.text === tot_quota_data[4];
    }).prop('selected', true);
    $("#editQuotaPipeType").attr("disabled", true);
    $("#editQuotaGroupingType option").filter(function () {
        return this.text === tot_quota_data[5];
    }).prop('selected', true);
    $("#editQuotaGroupingType").attr("disabled", true);
    $("#edit_def_quota_action option").filter(function () {
        return this.text === tot_quota_data[6];
    }).prop('selected', true);

    $('#edit_quota_prof_shapers').children().detach();

    if (tot_quota_data[6] === 'Simple Shaping') {
        $('#edit_quota_prof_shapers').children().detach();
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
        $("#edit_downlink_def_quota_pipe option").filter(function () {
            return this.text === tot_quota_data[7];
        }).prop('selected', true);
        $("#edit_uplink_def_quota_pipe option").filter(function () {
            return this.text === tot_quota_data[8];
        }).prop('selected', true);
    } else {
        $('#EditQuotaProfModalContent').css({height: '400px'});
    }
}



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*Rule Tyepe Indications*/
var PQ_WO_ADDR_SUNET = 2;
var PQ_WO_ADDR_IPRNG = 3;

/* WO command types */
var WO_SETTINGS_UPDATE = 18;

var WO_GET_EVENT_LIST = 24;
var WO_ADDR_LIST_ADD = 25;
var WO_ADDR_LIST_UPDATE = 26;
var WO_ADDR_LIST_DELETE = 27;
var WO_GET_ADDR_LIST = 28;

/*WO Rule Adreess Operation Status*/

var PQ_OP_SUCCESS = 10;
var PQ_OP_FAIL = 2;
var PQ_OP_DUPLICATE = 4;
var PQ_OP_MAXR = 11;
var PQ_OP_INVID = 12;

/*WO services*/
//var WO_SERVIS_LIST_ADD = 29;
//var WO_SERVIS_LIST_UPDATE = 30;
//var WO_SERVIS_LIST_DELETE = 31;
//var WO_GET_SERVIS_LIST = 32;

/*WO Services Protocol Types*/

var PQ_SPROT_TCP = 6;
var PQ_SPROT_UDP = 17;

//MAC address objects [ACJS Requests & Replies]

var TS_MACADR_LIST_ADD = 166; 
var TS_MACADR_LIST_UPDATE = 167;
var TS_MACADR_LIST_DELETE = 168; 
var TS_MACADR_GET_LIST = 169;


//Address Group Profiles

var TS_ADRPROF_LIST_ADD = 170;
var TS_ADRPROF_LIST_DELETE = 171;
var TS_GET_ADRPROF_LIST = 172;

var TS_ADRPELE_LIST_ADD = 173;
var TS_ADRPELE_LIST_DELETE = 174;
var TS_GET_ADRPELE_LIST = 175;

//Address types
var PQ_TS_ADRS_TYPE_IP = 0;
var PQ_TS_ADRS_TYPE_MAC = 1;
var PQ_TS_ADRS_TYPE_AD_USER = 2;
var PQ_TS_ADRS_TYPE_DHCP = 3;
var PQ_TS_ADRS_TYPE_ADDRGROUP = 4;
var PQ_TS_ADRS_TYPE_AD_GROUP = 5;

//WO Schedule Variables
var WO_SCHD_LIST_ADD = 65;
var WO_SCHD_LIST_UPDATE = 66;
var WO_SCHD_LIST_DELETE = 67;
var WO_GET_SCHD_LIST = 68;

//WO Schedule Types
var WO_SCHD_RECURRING = 21;
var WO_SCHD_TIMEPERIOD = 22;

//WO Shapers
var WO_SHAPER_LIST_ADD = 53;
var WO_SHAPER_LIST_UPDATE = 54;
var WO_SHAPER_LIST_DELETE = 55;
var WO_GET_SHAPER_LIST = 56;

//WO Shaper Priority
var WO_SPR_PR_LOW = 1;
var WO_SPR_PR_MEDIUM = 50;
var WO_SPR_PR_HEIGH = 99;

//Shadule Shaper Profile

var WO_SHEDSPR_LIST_ADD = 118;
var WO_SHEDSPR_LIST_UPDATE = 119;
var WO_SHEDSPR_LIST_DELETE = 120;
var WO_GET_SHEDSPR_LIST = 121;

//WO Rules
var WO_RULE_LIST_ADD = 57;
var WO_RULE_LIST_UPDATE = 58;
var WO_RULE_LIST_DELETE = 59;
var WO_GET_RULE_LIST = 60;
var WO_RULE_LIST_SWAP = 88;

//WO Application Profiles
var WO_APPPROF_LIST_ADD = 69;
var WO_APPPROF_LIST_DELETE = 70;
var WO_GET_APPPROF_LIST = 71;

//WO Application Rule Profile
var WO_APPRULE_LIST_ADD = 72;
var WO_APPRULE_LIST_UPDATE = 73;
var WO_APPRULE_LIST_DELETE = 74;
var WO_GET_APPRULE_LIST = 75;

//WO Service Profiles
//GET-SET SVS Items
var WO_SVSITEM_LIST_ADD = 108;
var WO_SVSITEM_LIST_DELETE = 109;
var WO_GET_SVSITEM_LIST = 110;

//GET-SET SVS Profiles
var WO_SVSPROF_LIST_ADD = 111;
var WO_SVSPROF_LIST_DELETE = 112;
var WO_GET_SVSPROF_LIST = 113;

//GET-SET SVS Rules
var WO_SVSRULE_LIST_ADD = 114;
var WO_SVSRULE_LIST_DELETE = 115;
var WO_SVSRULE_LIST_UPDATE = 116;
var WO_GET_SVSRULE_LIST = 117;

//WO ACTIONS
var WO_ACT_BLOCK = 1;
var WO_ACT_ALLOW = 2;

// GET-SET URL Items
var WO_URLITEM_LIST_ADD = 90;  
var WO_URLITEM_LIST_DELETE = 91;
var WO_GET_URLITEM_LIST = 92;

//GET-SET URL Profiles
var WO_URLPROF_LIST_ADD = 93;
var WO_URLPROF_LIST_DELETE = 94;
var WO_GET_URLPROF_LIST = 95;

//GET-SET URL Rules
var WO_URLRULE_LIST_ADD = 96; 
var WO_URLRULE_LIST_DELETE = 97; 
var WO_URLRULE_LIST_UPDATE = 98; 
var WO_GET_URLRULE_LIST = 99; 

//Quota Rules

var WO_QUTA_RULE_LIST_ADD = 129;
var WO_QUTA_RULE_LIST_UPDATE = 130;
var WO_QUTA_RULE_LIST_DELETE = 131;
var WO_QUTA_RULE_LIST_SWAP = 132;
var WO_GET_QUTA_RULE_LIST = 133;

// Quota App Profiles

var WO_QUTA_APPPROF_LIST_ADD = 122;
var WO_QUTA_APPPROF_LIST_DELETE = 123; 
var WO_GET_QUTA_APPPROF_LIST = 124; 

var WO_QUTA_APPRULE_LIST_ADD = 125; 
var WO_QUTA_APPRULE_LIST_UPDATE = 126; 
var WO_QUTA_APPRULE_LIST_DELETE = 127; 
var WO_GET_QUTA_APPRULE_LIST = 128; 

// Quota URL Profiles

var WO_QUTA_URLPROF_LIST_ADD = 152;
var WO_QUTA_URLPROF_LIST_DELETE = 153; 
var WO_GET_QUTA_URLPROF_LIST = 154; 

var WO_QUTA_URLRULE_LIST_ADD = 155; 
var WO_QUTA_URLRULE_LIST_UPDATE = 156; 
var WO_QUTA_URLRULE_LIST_DELETE = 157; 
var WO_GET_QUTA_URLRULE_LIST = 158; 

// Quota Service Profiles

var WO_QUTA_SVSPROF_LIST_ADD = 159;
var WO_QUTA_SVSPROF_LIST_DELETE = 160; 
var WO_GET_QUTA_SVSPROF_LIST = 161; 

var WO_QUTA_SVSRULE_LIST_ADD = 162; 
var WO_QUTA_SVSRULE_LIST_UPDATE = 163; 
var WO_QUTA_SVSRULE_LIST_DELETE = 164; 
var WO_GET_QUTA_SVSRULE_LIST = 165; 

//Quota Profiles

var WO_QUTAELE_LIST_ADD = 104;
var WO_QUTAELE_LIST_DELETE = 105;
var WO_QUTAELE_LIST_UPDATE = 106;
var WO_GET_QUTAELE_LIST = 107;

//hShaping table definitions

var RULE_TABLE = 0;
var PIPE_SCHEDULE_TABLE = 1;
var URL_PROF_TABLE = 2;
var APP_PROF_TABLE = 3;
var SERV_PROF_TABLE = 4;

//Add Application Watch Profiles

var WO_AWPROF_LIST_ADD = 142; 
var WO_AWPROF_LIST_DELETE = 143;
var WO_GET_AWPROF_LIST = 144;
var WO_AWPROF_ITEM_ADD = 145;
var WO_AWPROF_ITEM_UPDATE = 146;
var WO_AWPROF_ITEM_DELETE = 147;
var WO_GET_AWPROF_ITEM_LIST = 148;

//Schedule Functions
var encode_days_of_week = function (mon, tue, wed, thu, fri, sat, sun) {
    var out = mon + (tue << 2) + (wed << 4) + (thu << 6) + (fri << 8) + (sat << 10) + (sun << 12);
//    console.log(out)
    return out;
};

var decode_days_of_week = function (val) {
    var days = [];
    var d = {
        Monday: val & 0x3,
        Tuesday: (val >> 2) & 0x3,
        Wednesday: (val >> 4) & 0x3,
        Thursday: (val >> 6) & 0x3,
        Friday: (val >> 8) & 0x3,
        Saturday: (val >> 10) & 0x3,
        Sunday: (val >> 12) & 0xFFFFF
    };

    for (var u_item in d) {
        if (d[u_item] === 1) {
            days.push(u_item);
        }
    }
    return days;
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PQ_ADMIN_TYPE = 12;
var PQ_USER_TYPE = 23;


var NW_USER_LIST_ADD = 33;
var NW_USER_LIST_RESPW = 34;
var NW_USER_LIST_DELETE = 35;
var NW_GET_USER_LIST = 36;
var NW_USER_LIST_ENBDIS = 38;
//Common Functions
update_acjs_elements = function (def, name, e0, e1, e2, e3, e4, e5) {
    var cmd_buffer = new ArrayBuffer(4 * 7 + name.length);
    var req = new Uint32Array(cmd_buffer, 0, 7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, def, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = e4;
    req[6] = e5;

    if (name !== '') {
        req[5] = name.length;
        var bname = new Uint8Array(cmd_buffer, 4 * 7, name.length);
        for (var cit = 0; cit < name.length; cit++) {
            bname[cit] = name.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};

//Users
add_nw_user_account = function (type, email, psw, ip) {
    var cmd_buffer = new ArrayBuffer(4 * 5 + email.length + psw.length);
    var req = new Uint32Array(cmd_buffer, 0, 5);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_ADD, 0);
    req[1] = type;
    req[2] = ip;
    req[3] = email.length;
    req[4] = psw.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 5, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var bpsw = new Uint8Array(cmd_buffer, 4 * 5 + email.length, psw.length);

    for (var cit = 0; cit < psw.length; cit++) {
        bpsw[cit] = psw.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        DisplayStatus(data.charCodeAt(0));
        $("input").val("");
        Update_Profile_Data();
        Display_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });

};

reset_nw_user_account = function (key, email, psw) {
    var cmd_buffer = new ArrayBuffer(4 * 4 + email.length + psw.length);
    var req = new Uint32Array(cmd_buffer, 0, 4);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_RESPW, 0);
    req[1] = key;
    req[2] = email.length;
    req[3] = psw.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 4, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var bpsw = new Uint8Array(cmd_buffer, 4 * 4 + email.length, psw.length);

    for (var cit = 0; cit < psw.length; cit++) {
        bpsw[cit] = psw.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        DisplayStatus(data.charCodeAt(0));
        $("input").val("");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });


};

enable_disable_nw_user_account = function (key, email, state) {
    var cmd_buffer = new ArrayBuffer(4 * 4 + email.length);
    var req = new Uint32Array(cmd_buffer, 0, 4);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_ENBDIS, 0);
    req[1] = key;
    req[2] = state;
    req[3] = email.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 4, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        DisplayStatus(data.charCodeAt(0));
        Update_Profile_Data();
        Display_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_nw_user_account = function (key, email) {
    var cmd_buffer = new ArrayBuffer(4 * 3 + email.length);
    var req = new Uint32Array(cmd_buffer, 0, 3);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_DELETE, 0);
    req[1] = key;
    req[2] = email.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 3, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        DisplayStatus(data.charCodeAt(0));
        Update_Profile_Data();
        Display_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//Rules

add_wo_rule = function (src_type, src_id, dest_type, dest_id, app_id, sched_id, serv_id, url_prof, d_shp_id, u_shp_id, shpr_type, merge) {

    if(src_id === 0){
        src_type = 0;
    } else if(dest_id === 0){
        dest_type = 0;
    }    
    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_ADD, '', pq_2_16_32(src_id, dest_id), pq_2_16_32(d_shp_id, u_shp_id), pq_2_16_32(app_id, url_prof), pq_2_16_32(serv_id, sched_id), pq_4_8_32(src_type, dest_type, shpr_type, merge), 0);
    
//    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_ADD, '', pq_2_16_32(src_id, dest_id), pq_2_16_32(d_shp_id, u_shp_id), pq_2_16_32(app_id, url_prof), pq_2_16_32(serv_id, sched_id), pq_2_16_32(shpr_type, merge), 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Param(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_rule = function (key, src_type, src_id, dest_type, dest_id, app_id, sched_id, serv_id, url_prof, d_shp_id, u_shp_id, shpr_type, merge) {
    
    if(src_id === 0){
        src_type = 0;
    } else if(dest_id === 0){
        dest_type = 0;
    }  
    
    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_UPDATE, '', key, pq_2_16_32(src_id, dest_id), pq_2_16_32(d_shp_id, u_shp_id), pq_2_16_32(app_id, url_prof), pq_2_16_32(serv_id, sched_id), pq_4_8_32(src_type, dest_type, shpr_type, merge));

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Param(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_rule = function (key) {

    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_DELETE, '', key, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Param(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

swap_wo_rule = function (drag, drop) {

    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_SWAP, '', drag, drop, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Param(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_rule_old = function (src_id, dest_id, app_id, sched_id, serv_id, url_prof, d_shp_id, u_shp_id, shpr_type, merge) {

    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_ADD, '', pq_2_16_32(src_id, dest_id), pq_2_16_32(d_shp_id, u_shp_id), pq_2_16_32(app_id, url_prof), pq_2_16_32(serv_id, sched_id), pq_2_16_32(shpr_type, merge), 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Param(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_rule_old = function (key, src_id, dest_id, app_id, sched_id, serv_id, url_prof, d_shp_id, u_shp_id, shpr_type, merge) {

    var cmd_buffer = update_acjs_elements(WO_RULE_LIST_UPDATE, '', key, pq_2_16_32(src_id, dest_id), pq_2_16_32(d_shp_id, u_shp_id), pq_2_16_32(app_id, url_prof), pq_2_16_32(serv_id, sched_id), pq_2_16_32(shpr_type, merge));

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Param(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//Adresses

add_wo_address = function (type, name, vlan, ip_low, ip_high) {
//console.log(type+'_'+name+'_'+vlan+'_'+ip_low+'_'+ip_high)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_ADD, name, pq_2_16_32(type, vlan), ip_low, ip_high, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Address_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_address = function (key, type, vlan, ip_low, ip_high) {
//console.log(key+'_'+type+'_'+vlan+'_'+ip_low+'_'+ip_high)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_UPDATE, '', key, pq_2_16_32(type, vlan), ip_low, ip_high, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Address_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_address = function (key) {

    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Address_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO MAC

add_wo_mac_to_list = function (name, mac_1, mac_2) {

    var cmd_buffer = update_acjs_elements(TS_MACADR_LIST_ADD, name, mac_1, mac_2, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_MAC_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_wo_mac_of_list = function (key, mac_1, mac_2) {

    var cmd_buffer = update_acjs_elements(TS_MACADR_LIST_UPDATE, '', key, mac_1, mac_2, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_MAC_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_mac_from_list = function (key) {

    var cmd_buffer = update_acjs_elements(TS_MACADR_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_MAC_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

/// Address Profiles

add_wo_addr_prof = function (name) {

    var cmd_buffer = update_acjs_elements(TS_ADRPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_addr_prof = function (key) {

    var cmd_buffer = update_acjs_elements(TS_ADRPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_List();
        $('#editAddrProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_addr_to_prof = function (prof_id, adr_type, adr_id) {
//console.log(prof_id+'_'+ adr_type+'_'+ adr_id)
    var cmd_buffer = update_acjs_elements(TS_ADRPELE_LIST_ADD, '', prof_id, adr_type, adr_id, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_Addrs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_addr_from_prof = function (addr_rule_key, prof_id) {
//console.log(addr_rule_key+'_'+ prof_id)
    var cmd_buffer = update_acjs_elements(TS_ADRPELE_LIST_DELETE, '', addr_rule_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_Addrs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//App Control

add_wo_app_ctrl_name = function (name) {

    var cmd_buffer = update_acjs_elements(WO_APPPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_AppCtrl_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_app_ctrl_name = function (key) {

    var cmd_buffer = update_acjs_elements(WO_APPPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_AppCtrl_Prof_List();
        $('#addAppRule').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_app_ctrl = function (prof_id, app_id, cat_id, action, shaper_dlink, shaper_ulink, shaper_type) {

    var cmd_buffer = update_acjs_elements(WO_APPRULE_LIST_ADD, '', prof_id, pq_1_16_2_8_32(app_id, cat_id, action), shaper_dlink, shaper_ulink, shaper_type, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_AppCtrl_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_wo_app_ctrl = function (app_ctrl_key, app_id, cat_id, action, shaper_dlink, shaper_ulink, shaper_type) {

    var cmd_buffer = update_acjs_elements(WO_APPRULE_LIST_UPDATE, '', app_ctrl_key, pq_1_16_2_8_32(app_id, cat_id, action), shaper_dlink, shaper_ulink, shaper_type, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_AppCtrl_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_app_ctrl = function (prof_id, app_ctrl_key) {

    var cmd_buffer = update_acjs_elements(WO_APPRULE_LIST_DELETE, '', app_ctrl_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_AppCtrl_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//WO Scheduled Shapers

add_wo_pipe_sched = function (name, sched, dlink_pipe_sched, ulink_pipe_sched, dlink_def_shpr, ulink_def_shpr) {

    var cmd_buffer = update_acjs_elements(WO_SHEDSPR_LIST_ADD, name, sched, pq_2_16_32(dlink_pipe_sched, ulink_pipe_sched), pq_2_16_32(dlink_def_shpr, ulink_def_shpr), 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Pipe_Schedule_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_pipe_sched = function (id, sched, dlink_pipe_sched, ulink_pipe_sched, dlink_def_shpr, ulink_def_shpr) {

    var cmd_buffer = update_acjs_elements(WO_SHEDSPR_LIST_UPDATE, '', id, sched, pq_2_16_32(dlink_pipe_sched, ulink_pipe_sched), pq_2_16_32(dlink_def_shpr, ulink_def_shpr), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Pipe_Schedule_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_sched_shaper = function (id) {

    var cmd_buffer = update_acjs_elements(WO_SHEDSPR_LIST_DELETE, '', id, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Pipe_Schedule_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//WO Schedulers

add_ml_schedule = function (name, type, dates, start_t, end_t) {

    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_ADD, name, type, dates, start_t, end_t, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

edit_ml_schedule = function (key, dates, start_t, end_t) {

    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_UPDATE, '', key, dates, start_t, end_t, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

delete_ml_schedule = function (key) {

    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

//WO Services

add_wo_service_to_list = function (name, pLow, pHigh) {

    var cmd_buffer = update_acjs_elements(WO_SVSITEM_LIST_ADD, name, pLow, pLow, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_service_from_list = function (key) {

    var cmd_buffer = update_acjs_elements(WO_SVSITEM_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_service_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_SVSPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_service_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_SVSPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Prof_List();
        $('#addServiceRule').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_service_to_prof = function (prof_id, service_id, type, shaper_dlink, shaper_ulink, shaper_type) {

    var cmd_buffer = update_acjs_elements(WO_SVSRULE_LIST_ADD, '', prof_id, service_id, type, shaper_dlink, shaper_ulink, shaper_type);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Prof_Services();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_wo_service_of_prof = function (service_rule_id, shaper_dlink, shaper_ulink, shaper_type) {

    var cmd_buffer = update_acjs_elements(WO_SVSRULE_LIST_UPDATE, '', service_rule_id, shaper_dlink, shaper_ulink, shaper_type, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Prof_Services();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_service_from_prof = function (service_rule_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_SVSRULE_LIST_DELETE, '', service_rule_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Prof_Services();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//WO Shapers

add_wo_shaper = function (name, type, gbw, mbw, prty) {

    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_ADD, name, gbw, mbw, prty, type, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Admin_Pipe_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_shaper = function (key, type, gbw, mbw, prty) {

    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_UPDATE, '', key, gbw, mbw, prty, type, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Admin_Pipe_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_shaper = function (key) {

    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Admin_Pipe_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO URL

add_wo_url_to_list = function (url, dns) {

    var cmd_buffer = update_acjs_elements(WO_URLITEM_LIST_ADD, url, dns, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_from_list = function (key) {

    var cmd_buffer = update_acjs_elements(WO_URLITEM_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_url_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_URLPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_URLPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Prof_List();
        $('#addURLRule').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_url_to_prof = function (prof_id, url_id, authen, shaper_dlink, shaper_ulink, shaper_type) {

    var cmd_buffer = update_acjs_elements(WO_URLRULE_LIST_ADD, '', prof_id, url_id, authen, shaper_dlink, shaper_ulink, shaper_type);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_wo_url_of_prof = function (url_rule_id, shaper_dlink, shaper_ulink, shaper_type) {

    var cmd_buffer = update_acjs_elements(WO_URLRULE_LIST_UPDATE, '', url_rule_id, shaper_dlink, shaper_ulink, shaper_type, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_from_prof = function (url_rule_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_URLRULE_LIST_DELETE, '', url_rule_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////
///////////----------------------- Quota Management ----------------------//////////////////
////////////////////////////////////////////////////////////////////////////////////////////

add_wo_quota_rule = function (q_addrs_id, q_app_prof_id, q_url_prof_id, q_serv_prof_id, q_def_quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_ADD, '', q_addrs_id, pq_2_16_32(q_app_prof_id, q_url_prof_id), pq_2_16_32(q_serv_prof_id, q_def_quota), 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(0, 0, 0, 0, 0, 0, 0);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_quota_rule = function (id, q_addrs_id, q_app_prof_id, q_url_prof_id, q_serv_prof_id, q_def_quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_UPDATE, '', id, q_addrs_id, pq_2_16_32(q_app_prof_id, q_url_prof_id), pq_2_16_32(q_serv_prof_id, q_def_quota), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(1, 1, 1, 1, 1, 1, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

swap_wo_quota_rule = function (drag, drop) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_SWAP, '', drag, drop, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(1, 1, 1, 1, 1, 1, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_quota_rule = function (id) {
    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_DELETE, '', id, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(1, 1, 1, 1, 1, 1, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota App Profile

add_wo_app_quota_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_app_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_List();
        $('#editQuotaAppProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_app_quota = function (prof_key, app_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPRULE_LIST_ADD, '', prof_key, app_id, quota, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_app_quota = function (rule_key, app_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPRULE_LIST_UPDATE, '', rule_key, app_id, quota, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_app_quota = function (app_ctrl_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPRULE_LIST_DELETE, '', app_ctrl_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota URL Profile

add_wo_url_quota_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_List();
        $('#editQuotaURLProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_url_quota = function (prof_key, authen, url_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLRULE_LIST_ADD, '', prof_key, url_id, authen, quota, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_url_quota = function (rule_key, url_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLRULE_LIST_UPDATE, '', rule_key, url_id, quota, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_quota = function (url_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLRULE_LIST_DELETE, '', url_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota Service Profile

add_wo_serv_quota_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_serv_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_List();
        $('#editQuotaServProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_serv_quota = function (prof_key, prot, serv_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSRULE_LIST_ADD, '', prof_key, serv_id, prot, quota, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_Servs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_serv_quota = function (rule_key, serv_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSRULE_LIST_UPDATE, '', rule_key, serv_id, quota, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_Servs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_serv_quota = function (serv_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSRULE_LIST_DELETE, '', serv_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_Servs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota Profile

add_wo_quota_prof = function (name, type, quota, group_type, d_shp_id, u_shp_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_ADD, name, quota, pq_2_16_32(type, group_type), u_shp_id, d_shp_id, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_quota_prof = function (key, quota, d_shp_id, u_shp_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_UPDATE, '', key, quota, u_shp_id, d_shp_id, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

/////////// Setup, Config & Management  ////////////////

//user profile

var user_email_address = ""; // u[0]
get_user_id = function () {
    setTimeout(function () {
        var cookie = $.cookie('pqsf');
        var req = new Uint32Array(1);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 47, 0); // request user name
        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data) {
            $("#pq_user_prof_name").text(data);
            user_ID = data.split("@");
            user_email_address = data;
            setTimeout(function () {

            }, 1000);
        }).fail(function () {
        });
    }, 1000);
};

init_user_reporting_list = function () {
    setTimeout(function () {
        init_reporting_var();
        init_reports_window();
    }, 1000);
};

update_application_list = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 42, 48, 0); // request application
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        application_list[0] = 'Other';
        var element = data.split(";"); //
        for (var app_count = 0; app_count < element.length; app_count++) {
            var app_split = element[app_count].split("&");
            application_list[app_split[1]] = app_split[0];
        }

        setTimeout(function () {
            update_services_list();
        }, 1000);

    }).fail(function () {
        alert("Application list initialisation failed")
    });
};

update_services_list = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 42, 80, 0); // request services
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        pq_services_list[0] = 'Other';
        var element = data.split(";"); //
        for (var svs_count = 0; svs_count < element.length; svs_count++) {
            var svs_split = element[svs_count].split("&");
            pq_services_list[svs_split[1]] = svs_split[0];
        }
    }).fail(function () {

    });
};

get_dashb_notific = function () {
    setTimeout(function () {
        var cookie = $.cookie('pqsf');
        var req = new Uint32Array(1);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, INFO_DASH_NOTIFIC, 0);
        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data) {
            var msgs = data.split(";");
            for (var count = 0; count < msgs.length - 1; count++) {
                var time_data = msgs[count].split(":");
                var event_time = moment.unix(time_data[0]).format('MMM Do YYYY - hh:mm:ss A');
                var nfy = $('<img src="image/bullet.png" style="width: 10px;height: 10px;margin-left: 18px; float: left;margin-top: 10px; "/>' +
                        '<div style="font-size: 11px; margin-left: 30px; margin-top: 10px;">' + event_time + ' : ' + time_data[1] + '</div>');
                $('#notific_area').append(nfy);
            }
        }).fail(function () {
            console.log("Notification Update failed");
        });
    }, 1000);
};

//Change Configuration Type
change_device_media_configurations = function (port_id, type) {

    var cmd_buffer = update_acjs_elements(134, '', port_id, type, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        display_media_config_table();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//System Updates

check_update_state = function () {

    var cmd_buffer = update_acjs_elements(PDEV_UPDATE_STATE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data.charCodeAt(0))
        if (data.charCodeAt(0) === 1) {
            SuccessStatus("System updated successfully");
        } else if (data.charCodeAt(0) === 2) {
            get_new_update();
        } else if (data.charCodeAt(0) === 99) {
            WarningStatus(99, 'The system has transferred to Fail-safe Mode! Please go to Maintenance Tab & click Refresh');
        } else if (data.charCodeAt(0) === 0) {
//            console.log("Already updated");
        } else
            return 'Error';

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_sys_admin_email = function (email) {

    var cmd_buffer = update_acjs_elements(PDEV_SET_UPDATE_EMAIL, email, 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_system_update_info();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

schedule_update = function (delay) {

    var cmd_buffer = update_acjs_elements(PDEV_CHECK_UPDATE_OPERATION, '', delay, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        get_system_update_info();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

switch_online_update = function (flag) {

    var cmd_buffer = update_acjs_elements(PDEV_SWITCH_ONLINE_UPDATE, '', flag, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_system_update_info();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

install_offline_update = function () {
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_OFFLINE_UPDATE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        $('#Offline_Update_Install_Window').hide();
        if (data.charCodeAt(0) === 10) {
            $('#Updating_modal').show();
        } else
            show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

install_app_sig_update = function () {
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_SIGNATURE_FILE , '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        $('#App_Signature_Update_Install_Window').hide();
        if (data.charCodeAt(0) === 10) {
            $('#Updating_modal').show();
        } else
            show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

install_license_update = function () {
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_LICENSE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        $('#License_Update_Install_Window').hide();
        if (data.charCodeAt(0) === 10) {
            $('#Updating_modal').show();
        } else
            show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

///// Ldap generic ACJS

update_ldap_acjs_elements = function (def, str1, str2, e0, e1, e2, e3) {
//    console.log(def, str1, str2, e0, e1, e2, e3)
    var cmd_buffer = new ArrayBuffer(4 * 7 + str1.length + str2.length);
    var req = new Uint32Array(cmd_buffer, 0, 7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, def, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = str1.length;
    req[6] = str2.length;

    if (str1 !== '') {
        var bname = new Uint8Array(cmd_buffer, 4 * 7, str1.length);

        for (var cit = 0; cit < str1.length; cit++) {
            bname[cit] = str1.charCodeAt(cit);
        }
    }
    if (str2 !== '') {
        var budn = new Uint8Array(cmd_buffer, 4 * 7 + str1.length, str2.length);

        for (var cit = 0; cit < str2.length; cit++) {
            budn[cit] = str2.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};


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

//var create_live_srcdes_watch_graph = function () {
//
//    return  lssd_graph_init(LSRC_UPDATE, "plot_live_sources_updown",
//            "plot_live_sources_av_updown",
//            '#a8334d',
//            '#008000',
//            "#pq_lsd_uplink_usage",
//            "#pq_lsd_downlink_usage",
//            "#pq_lscw_stat_bar");
//};

var create_live_srcdes_watch_graph = function () {
    return  lssd_graph_init(LSRC_UPDATE, "plot_live_sources_updown",
            "plot_live_sources_av_updown", 0, 0,
            '#a8334d',
            '#008000',
            "#pq_lsd_uplink_usage",
            "#pq_lsd_downlink_usage",
            "#pq_lscw_stat_bar", 2);
};

run_diagram = function () {

//    if (CURRENT_WINDOW != WINDOW_LIVE_SERVER_WATCH) {
//        return;
//    }
    
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

    if (type === CLIENT_DIAGRAM) {

        $('#btn_lw_bt_one').text("Applications");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Sources");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Sources");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Source Diagram");
        $('#btn_lw_bt_three').show();
        update_live_watch_summery(LSUM_SRC_T_APP, dot2num(num2dot(ip)), mask);

    } else if (type === SERVER_DIAGRAM) {

        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Applications");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Destinations");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Destinations");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Destination Diagram");
        $('#btn_lw_bt_three').show();
        update_live_watch_summery(LSUM_DES_T_SRC, dot2num(num2dot(ip)), mask);

    } else if (type === APP_DIAGRAM) {

        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Applications");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Applications");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Application Diagram");
        $('#btn_lw_bt_three').hide();
        update_live_watch_summery(LSUM_APP_T_SRC, ip, mask);

    } else if (type == SVS_DIAGRAM) {

        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Services");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Services");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Service Diagram");
        $('#btn_lw_bt_three').hide();
        update_live_watch_summery(LSUM_SVS_T_SRC, ip, mask);
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
        if (sc_cd_mask >= 32) {
            headder_name = num2dot(diagram_req.ip);
        } else {
            headder_name = num2dot(diagram_req.ip) + "/" + sc_cd_mask;
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

btn_dashpie_bw_load_now = function (id) {
    if (id === 1) {
        $("#plot_dashPie_srcdesapp_updown").css("z-index", 100);
        $("#plot_dashPie_srcdesapp_av_updown").css("z-index", 1);
    } else {
        $("#plot_dashPie_srcdesapp_updown").css("z-index", 1);
        $("#plot_dashPie_srcdesapp_av_updown").css("z-index", 100);
    }
};

btn_sc_bw_load_now = function (id) {
    if (id === 1) {
        $("#plot_live_sources_updown").css("z-index", 100);
        $("#plot_live_sources_av_updown").css("z-index", 1);
    } else {
        $("#plot_live_sources_updown").css("z-index", 1);
        $("#plot_live_sources_av_updown").css("z-index", 100);
    }
};

btn_link_bw_load_now = function (id) {

    if (id === 1) {
        lcjs_make_request(live_bwd_id, LABW_UPDATE, labwd_req);
        lcjs_make_request(live_bwu_id, LABW_UPDATE, labwu_req);
        $("#CHD_Plot, #CHU_Plot").css("z-index", -10);
        $("#CHD_av_Plot, #CHU_av_Plot").css("z-index", 100);
    } else {
//        if(lv_link_flag){
        lcjs_make_request(live_bwd_id, LBW_UPDATE, lbwd_req);
        lcjs_make_request(live_bwu_id, LBW_UPDATE, lbwu_req);
//            lv_link_flag = false;
//        }        
        $("#CHD_Plot, #CHU_Plot").css("z-index", 100);
        $("#CHD_av_Plot, #CHU_av_Plot").css("z-index", -10);
    }
};

btn_ses_bw_load_now = function (id) {
    if (id === 2) {
        $("#plot_live_session_av_downlink").css("z-index", 100);
        $("#plot_live_session_av_uplink").css("z-index", 100);
        $("#plot_live_session_ms_downlink").css("z-index", -10);
        $("#plot_live_session_ms_uplink").css("z-index", -10);
        $("#plot_live_session_downlink_header").text('Session Downlink Bandwidth (10 s Average)');
        $("#plot_live_session_uplink_header").text('Session Uplink Bandwidth (10 s Average)');
    } else {
        $("#plot_live_session_av_downlink").css("z-index", -10);
        $("#plot_live_session_av_uplink").css("z-index", -10);
        $("#plot_live_session_ms_downlink").css("z-index", 100);
        $("#plot_live_session_ms_uplink").css("z-index", 100);
        $("#plot_live_session_downlink_header").text('Session Downlink Bandwidth (1 ms)');
        $("#plot_live_session_uplink_header").text('Session Uplink Bandwidth (1 ms)');
    }
};


load_and_draw_sc_sumry = function (id) {
    if (id === 1) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_APP, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_SRC, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            update_live_watch_summery(LSUM_SVS_T_SRC, sc_cd_ip, sc_cd_mask);
        } else {
            update_live_watch_summery(LSUM_APP_T_SRC, sc_cd_ip, sc_cd_mask);
        }
    } else if (id === 3) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_SVS, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_SVS, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        }
    } else {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_DEST, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_APP, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            update_live_watch_summery(LSUM_SVS_T_DEST, sc_cd_ip, sc_cd_mask);
        } else {
            update_live_watch_summery(LSUM_APP_T_DEST, sc_cd_ip, sc_cd_mask);
        }
    }
};

btn_sc_sum_load_now = function (id) {
    sc_cd_sum_type = id;
    sc_cd_sum_refresh = true;
    load_and_draw_sc_sumry(id);
};

change_source_watch_head = function (s_ip, mask, sessions) {
    
    if (mask >= 32) {
        $('#pq_lscw_sip_text').text('Client IP: ' + s_ip);
    } else {
        $('#pq_lscw_sip_text').text('Client IP: ' + s_ip + '/' + mask);
    }
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions); 
};

change_dest_watch_head = function (d_ip, mask, sessions) {
    
    if (mask >= 32) {
        $('#pq_lscw_sip_text').text('Server IP: ' + d_ip);
    } else {
        $('#pq_lscw_sip_text').text('Server IP: ' + d_ip + '/' + mask);
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

update_live_watch_summery = function (type, data, mask) {

    data_pq_live_usage.length = 0;
    data_pq_live_usage.push({label: "1", value: 0});

    pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 1);
    $('#pq_live_usage_legend').children().remove();

    var lsum_req = {
        type: SESSION_UPDATE,
        id: LSUMRY_UPDATE,
        lid: type,
        loc: 1,
        sip: data,
        dip: mask

    };
    cjs_make_request(LSUMRY_UPDATE, lsum_req);
};

var data_dashPie_dlink = [{label: "1", value: 0}];
var pie_pq_dashPie_dlink;

var data_dashPie_ulink = [{label: "1", value: 0}];
var pie_pq_dashPie_ulink;

init_dashPie_piecharts = function () {
    pie_pq_dashPie_dlink = new d3pie("dashPie_src_dlink", {
        "size": {
            "canvasHeight": $('#dashPie_src_dlink').width()*0.9,
            "canvasWidth": $('#dashPie_src_dlink').width()*0.9,
            "pieOuterRadius": "100%"

        },
        "data": {
            "sortOrder": "value-desc",
            "content": data_dashPie_dlink
        },
        "labels": {
            "outer": {
                "format": "none"
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 8
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 2
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%",
            "placeholderParser": function (index, data) {
                data.value = pq_get_usage(data.value);
            },
            "styles": {
                "fadeInSpeed": 1000,
                "backgroundColor": "#0079dc",
                "backgroundOpacity": 1
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
                "enabled": false,
                "percentage": 79
            }
        },
        "callbacks": {
            "onClickSegment": function (a) {
                dashPie_bw_plot_init(a.data.label);
                $('#dashPie_bw_plot').text('Bandwidth Usage - ' + a.data.label);
                dashPie_clk_seg = a.data.label;
            }
        }
    });

    pie_pq_dashPie_ulink = new d3pie("dashPie_src_ulink", {
        "size": {
            "canvasHeight": $('#dashPie_src_ulink').width()*0.9,
            "canvasWidth": $('#dashPie_src_ulink').width()*0.9,
            "pieOuterRadius": "100%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": data_dashPie_ulink
        },
        "labels": {
            "outer": {
                "format": "none"
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 8
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 2
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": false,
                "style": "straight",
                "color": "#000000"
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%",
            "placeholderParser": function (index, data) {
                data.value = pq_get_usage(data.value);
            },
            "styles": {
                "fadeInSpeed": 1000,
                "backgroundColor": "#0079dc",
                "backgroundOpacity": 1
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
                "enabled": false,
                "percentage": 79
            }
        },
        "callbacks": {
            "onClickSegment": function (a) {
                dashPie_bw_plot_init(a.data.label);
                $('#dashPie_bw_plot').text('Bandwidth Usage - ' + a.data.label);
                dashPie_clk_seg = a.data.label;
            }
        }
    });
};

//Source Updates

var summary_dashPie_updater;

function start_dashPie_update() {
    if (summary_dashPie_updater)
        return;
    summary_dashPie_updater = setInterval(request_dashPie_update, 15000);
}

function end_dashPie_update() {
    clearInterval(summary_dashPie_updater);
    summary_dashPie_updater = null;
}

function request_dashPie_update() {

    var type = dashPieCat;

    switch (type) {
        case 1:
            var sum_req = {
                type: SESSION_UPDATE,
                id: SUMRY_SRC_UPDATE,
                lid: SUMRY_SRC_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_SRC_UPDATE, sum_req);
            break;
        case 2:
            var sum_req = {
                type: SESSION_UPDATE,
                id: SUMRY_DEST_UPDATE,
                lid: SUMRY_DEST_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_DEST_UPDATE, sum_req);
            break;
        case 3:
            var ses_req = {
                type: SESSION_UPDATE,
                id: SUMRY_APP_UPDATE,
                lid: SUMRY_APP_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_APP_UPDATE, ses_req);
            break;
        case 4:
            var ses_req = {
                type: SESSION_UPDATE,
                id: SUMRY_APP_UPDATE,
                lid: SUMRY_APP_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_APP_UPDATE, ses_req);            
            break;
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var _globle_summery_pie_chart = [];
var _globle_pie_mapper = [];
var _globle_pie_data_array = [];
var _globle_pie_div_array = [];

var pq_mod_pie = function (pie, hdiv, pie_data_array, legend_dev, id) {
    var pie_mapper = [];
    var _legend = legend_dev;

    _globle_pie_mapper[id] = pie_mapper;//.push(pie_mapper);
    _globle_summery_pie_chart[id] = pie;
    _globle_pie_data_array[id] = pie_data_array;
    _globle_pie_div_array[id] = hdiv;

    var pie_sort_data = function (data) {
        var data_clone = data.slice(0);
        data_clone.sort(function (a, b) {
            if (a.value < b.value) {
                return 1;
            }
            if (a.value > b.value) {
                return -1;
            }
            return 0;
        });
        return data_clone;
    };

    this.add_pq_pie_legend = function (div, name, color, click_cbk) {
        var offset = 0;
        var name_star = "\"" + name + "\"";
        
        if (CURRENT_WINDOW === WINDOW_LINK_SUMMARY) {
            item = "<div class='pie_elem_leg' style='width: 105px; height: 24px;cursor: pointer;background-color: whitsmoke' onclick= '" + click_cbk + "(" + name_star + "," + id + ")'> " +
                    "<div class='pq_vcenter' style='float: left; width: 11px;height: 10px;margin-left: " + offset + "px; margin-top:5px; background-color: " + color + "'>" +
                    "</div>" +
                    "<a class='pq_vcenter' style='margin-left: 5px; width: 85px; float: left; margin-top:5px; font-size: 10px;overflow: hidden; text-decoration:none;'>" + name + "</a>" +
                    "</div>";
        } else {
            item = "<div class='pie_elem_leg' style='width: 105px; height: 24px;cursor: default;background-color: whitsmoke'> " +
                    "<div class='pq_vcenter' style='float: left; width: 11px;height: 10px;margin-left: " + offset + "px; margin-top:5px; background-color: " + color + "'>" +
                    "</div>" +
                    "<a class='pq_vcenter' style='margin-left: 5px; width: 85px; float: left; margin-top:5px; font-size: 10px;overflow: hidden; text-decoration:none;'>" + name + "</a>" +
                    "</div>";
        }         

        $(div).append(item);
    };

    pq_legend_clicked = function (name, id) {

        redirect_live_watch(name, id);
//        _globle_summery_pie_chart[id].openSegment(_globle_pie_mapper[id][name]);
//        console.log(id + " : " + name + " : " + _globle_pie_mapper[id][name]);
    };

    clear_pq_pie_legends = function (div) {

        $(div).children().remove();
        $(div).append(ele_pqpie_label_html);

        if ($('#pq_sum_src_legend').height() > ($('#pq_sum_src_hldr').height() + 50)) {
            $('.pqpie_modal').height($('#pq_sum_src_hldr').height() + 20);
        } else
            $('.pqpie_modal').height($('#pq_sum_src_legend').height());

        $('.pqpie_modal').width($('#pq_sum_src_legend').width());
    };

    this.update_summery_pie = function (id, len) {
        var dl_clone = pie_sort_data(_globle_pie_data_array[id]);
        if (dl_clone.length > len) {
            dl_clone = dl_clone.slice(0, len);
        }
        var id_pie = 0;
        clear_pq_pie_legends(legend_dev);
        _globle_pie_mapper[id].length = 0;
        for (var cc = 0; cc < dl_clone.length; cc++) {
            dl_clone[cc].color = pieColorScheme_10[cc];
            this.add_pq_pie_legend(legend_dev, dl_clone[cc].label, dl_clone[cc].color, 'pq_legend_clicked');
            _globle_pie_mapper[id][dl_clone[cc].label] = id_pie;
            id_pie++;
        }
        _globle_summery_pie_chart[id].updateProp("data.content", dl_clone);
        pqpie_update_nresize(_globle_pie_div_array[id], _globle_summery_pie_chart[id]);
    };

    this.clear_summery_pie = function (id, len) {
        var dl_clone = pie_sort_data(pie_data_array);
        if (dl_clone.length > len) {
            dl_clone = dl_clone.slice(0, len);
        }
        var id_pie = 0;
        clear_pq_pie_legends(legend_dev);
        _globle_summery_pie_chart[id].upddateProp("data.content", dl_clone);
    };
};

var pq_mod_pie_update_que = [];

var pq_mod_pie_sequence = function () {
    setTimeout(function () {
        var ele = pq_mod_pie_update_que.shift();
        ele.w.update_summery_pie(ele.i, ele.c);
        if (pq_mod_pie_update_que.length > 0) {
            pq_mod_pie_sequence();
        }
    }, 2000);
};

var pq_mod_pie_update = function (wrap, id, count) {
    pq_mod_pie_update_que.push({"w": wrap, "i": id, "c": count});
    if (pq_mod_pie_update_que.length === 1) {
        pq_mod_pie_sequence();
    }
};

var data_pq_sum_srcs = [{label: "1", value: 0}];
var pie_pq_sum_srcs;
var pie_pq_sum_srcs_wrap;

var data_pq_sum_dests = [{label: "1", value: 0}];
var pie_pq_sum_dests;
var pie_pq_sum_dests_wrap;

var data_pq_sum_apps = [{label: "1", value: 0}];
var pie_pq_sum_apps;
var pie_pq_sum_apps_wrap;

init_summary_dbd_plots = function () {
    pie_pq_sum_srcs = new d3pie("pq_sum_src_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_sum_srcs
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
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
//                $("#pq_sum_src_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_src_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_sum_src_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
                $("#pq_sum_src_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
            }
        }
    });
    pie_pq_sum_srcs_wrap = new pq_mod_pie(pie_pq_sum_srcs, "#pq_sum_src_hldr", data_pq_sum_srcs, '#pq_sum_src_legend', 0);
    pqpie_resize_loading("#pq_sum_src_hldr", pie_pq_sum_srcs);

    pie_pq_sum_dests = new d3pie("pq_sum_dest_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_sum_dests
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
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
//                $("#pq_sum_dest_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_dest_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_sum_dest_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 25px #000"});
                $("#pq_sum_dest_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 25px #000"});
            }
        }
    });
    pie_pq_sum_dests_wrap = new pq_mod_pie(pie_pq_sum_dests, "#pq_sum_dest_hldr", data_pq_sum_dests, '#pq_sum_dest_legend', 1);
    pqpie_resize_loading("#pq_sum_dest_hldr", pie_pq_sum_dests);

    pie_pq_sum_apps = new d3pie("pq_sum_app_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_sum_apps
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
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                if (a.data.label.length > 15) {
                    $("#pq_sum_app_legend .pqpie_lble_nme").css({"height": "40px", "top": "calc(20%)"});
                } else
                    $("#pq_sum_app_legend .pqpie_lble_nme").css({"height": "20px", "top": "calc(25%)"});

//                $("#pq_sum_app_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_app_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_sum_app_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
                $("#pq_sum_app_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
            }
        }
    });
    pie_pq_sum_apps_wrap = new pq_mod_pie(pie_pq_sum_apps, "#pq_sum_app_hldr", data_pq_sum_apps, '#pq_sum_app_legend', 2);
    pqpie_resize_loading("#pq_sum_app_hldr", pie_pq_sum_apps);
};

//Automated Updates

var summery_top_updater;

function start_summary_top_update() {
    if (summery_top_updater)
        return;
    summery_top_updater = setInterval(request_summary_top_update, 15000);
}

function end_summary_top_update() {
    clearInterval(summery_top_updater);
    summery_top_updater = null;
}

function request_summary_top_update() {
    //make sumarry update request
    var sum_req = {
        type: SESSION_UPDATE,
        id: SUMRY_SDC_UPDATE,
        lid: SESSION_APP_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_SDC_UPDATE, sum_req);
}

function redirect_live_watch(name, id) {

    var data = [];
    switch (id) {
        case 0:
            if (isNaN(dot2num(name))) {
                var index = _globle_pie_mapper[id][name];
                name = data_pq_sum_srcs_ip[index];
            }
            data = [name, 'N/A'];
            load_src_live_watch_window(data, 0);
            break;
        case 1:
            if (isNaN(dot2num(name))) {
                var index = _globle_pie_mapper[id][name];
                name = data_pq_sum_dests_ip[index];
            }
            data = [name, 0, 'N/A'];
            load_dest_live_watch_window(data, 0);
            break;
        case 2:
            var app_id = application_list.indexOf(name);
            data = [0, 'N/A', 0, 0, 0, 0, 0, app_id];
            load_app_live_watch_window(data, 0);
            break;
        case 3:
            data = [name, 'N/A'];
            load_src_live_watch_window(data, 1);
            break;
        case 4:
            data = [name, 0, 'N/A'];
            load_dest_live_watch_window(data, 1);
            break;
        case 5:
            var app_id = application_list.indexOf(name);
            data = [0, 'N/A', 0, 0, 0, 0, 0, app_id];
            load_app_live_watch_window(data, 1);
            break;
    }
}var bwh_ulg_id;
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
        var vlan_bw_id;
        if (isNaN(parseInt($("#pq_bwh_vlan_selector option:selected").val())) || parseInt($("#pq_bwh_vlan_selector option:selected").val()) === 4095) {
            vlan_bw_id = 4095;
            $('#bwhist_dlink_label').text('Network Downlink Bandwidth');
            $('#bwhist_ulink_label').text('Network Uplink Bandwidth');
        } else if (parseInt($("#pq_bwh_vlan_selector option:selected").val()) === 4096) {
            vlan_bw_id = parseInt($("#pq_bwh_vlan_selector option:selected").val());
            $('#bwhist_dlink_label').text('Non-VLAN - Downlink Bandwidth');
            $('#bwhist_ulink_label').text('Non-VLAN - Uplink Bandwidth');
        } else {
            vlan_bw_id = parseInt($("#pq_bwh_vlan_selector option:selected").val());
            $('#bwhist_dlink_label').text('VLAN ' +vlan_bw_id+ ' - Downlink Bandwidth');
            $('#bwhist_ulink_label').text('VLAN ' +vlan_bw_id+ ' - Uplink Bandwidth');
        }

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
            vid: vlan_bw_id
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
            vid: parseInt($("#pq_bwh_vlan_selector option:selected").val())
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
            vid: parseInt($("#pq_bwh_vlan_selector option:selected").val())
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
            vid: parseInt($("#pq_bwh_vlan_selector option:selected").val())
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};var rule_table;
var app_prof_table;
var pipe_schedules_table;
var schedule_table;
var service_prof_table;
var service_rule_table;
var service_list_table;
var admin_pipe_table;
var app_ctrl_prof_list_edit_table;
var rule_monitor_table;
var url_prof_table;
var url_rule_table;
var url_list_table;
var mac_list_table;
var address_table;
//var ad_user_list_table;
//var ad_group_list_table;
//var dhcp_user_list_table;
var addr_prof_table;
var addr_prof_content_table;

var ACTIVE_AD = false;
var ACTIVE_DHCP = false;

var selectedTableRowCount = 0;
var portCount = 0;
var rule_list = [];
var address_list = [];
var address_list_data = [];
var address_list_tt = [];  //for tooltips
var pipe_schedule_list = [];
var pipe_schedule_list_data = [];
var pipe_schedule_list_tt = [];
var service_prof_id;
var service_prof = [];
var service_prof_data = [];
var service_prof_data_services = [];
var service_list = [];
var service_list_data = [];
var schedule_list = [];
var schedule_list_tt = [];
var schedule_list_data = [];
var pipe_list = [];
var pipe_list_data = [];
var pipe_list_tt = [];
var app_ctrl_list_table;
var app_ctrl_list = [];
var app_ctrl_list_data = [];
var app_ctrl_list_apps = [];
var app_ctrl_app_ids = [];
var app_list_table;
var rule_mon_list = [];
var app_ctrl_prof_id;
var url_prof_id;
var url_prof = [];
var url_prof_data = [];
var url_prof_data_urls = [];
var url_list = [];
var url_list_data = [];
var mac_list = [];
var mac_list_data = [];

var addr_prof = [];
var addr_prof_id;
var addr_prof_data = [];
var addr_prof_data_addrs = [];

//Update and Display tables 

function Init_WO_Param(addr_flag, mac_flag, addr_ad_usr, addr_ad_grp, addr_dhcp, addr_profs, app_flag, serv_list_flag, serv_flag, schd_shpr_flag,
        schd_flag, shpr_flag, url_list_flag, url_flag, ruleMon_flag, rule_flag) {

    if (addr_flag) {
        address_list = [];
        address_list_data = [];
        address_list_tt = [];
        var cookie = $.cookie('pqsf');

        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADDR_LIST, 0);

        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 1000,
            type: 'POST',
            url: '/'
        }).done(function (data, textStatus, jqXHR) {
            address_list[0] = 'Any';
            var row = data.split(";");
            for (var i = 0; i < row.length - 1; i++) {
                address_list_data[i] = row[i];
                var element = row[i].split("&");
                address_list[element[0]] = element[1];
                address_list_tt[element[0]] = row[i];
            }
            Init_Addr_MAC_List();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    } else
        Init_Addr_MAC_List();

    function Init_Addr_MAC_List() {

        if (mac_flag) {
            var cookie = $.cookie('pqsf');
            mac_list = [];
            mac_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, TS_MACADR_GET_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    mac_list_data[i] = row[i];
                    var element = row[i].split("&");
                    mac_list[element[0]] = element[1];
                }
                Init_Addr_AD_User_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Addr_AD_User_List();
    }

    function Init_Addr_AD_User_List() {

        if (addr_ad_usr) {
            var cookie = $.cookie('pqsf');
            rmt_addr_user_list = [];
            rule_rmt_addr_user_list = [];
            rmt_addr_user_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RADDR_ITEM_LIST, 0);
            req[1] = PQ_NA_REMAD_TYPE_AD_USER;

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    rmt_addr_user_list_data[i] = row[i];
                    var element = row[i].split("&");
                    rule_rmt_addr_user_list[element[0]] = element[2];
                    rmt_addr_user_list[element[1]] = element[2];
                }
                Init_Addr_AD_Group_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Addr_AD_Group_List();
    }

    function Init_Addr_AD_Group_List() {

        if (addr_ad_grp) {
            var cookie = $.cookie('pqsf');
            ad_group_list = [];
            ad_group_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RADDR_ITEM_LIST, 0);
            req[1] = PQ_NA_REMAD_TYPE_AD_GROUP;

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    ad_group_list_data[i] = row[i];
                    var element = row[i].split("&");
                    ad_group_list[element[0]] = element[2];
                }
                Init_Addr_DHCP_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Addr_DHCP_List();
    }

    function Init_Addr_DHCP_List() {

        if (addr_dhcp) {
            var cookie = $.cookie('pqsf');
            rmt_addr_user_list = [];
            rule_rmt_addr_user_list = [];
            rmt_addr_user_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NA_GET_RADDR_ITEM_LIST, 0);
            req[1] = PQ_NA_REMAD_TYPE_DHCP_USER;

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    rmt_addr_user_list_data[i] = row[i];
                    var element = row[i].split("&");
                    rule_rmt_addr_user_list[element[0]] = element[2];
                    rmt_addr_user_list[element[1]] = element[2];
                }
                Init_Addr_Prof_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Addr_Prof_List();
    }

    function Init_Addr_Prof_List() {

        if (addr_profs) {
            var cookie = $.cookie('pqsf');
            addr_prof = [];
            addr_prof_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, TS_GET_ADRPROF_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    addr_prof_data[i] = row[i];
                    var element = row[i].split("&");
                    addr_prof[element[0]] = element[1];
                }
                Init_AppCtrl_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_AppCtrl_List();
    }

    function Init_AppCtrl_List() {

        if (app_flag) {
            var cookie = $.cookie('pqsf');
            app_ctrl_list = [];
            app_ctrl_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_APPPROF_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                app_ctrl_list[0] = 'None';
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    app_ctrl_list_data[i] = row[i];
                    var element = row[i].split("&");
                    app_ctrl_list[element[0]] = element[1];
                }
                Init_Service_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Service_List();
    }

    function Init_Service_List() {

        if (serv_list_flag) {
            var cookie = $.cookie('pqsf');
            service_list = [];
            service_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSITEM_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    service_list_data[i] = row[i];
                    var element = row[i].split("&");
                    service_list[element[0]] = element[1];
                }
                Init_Service_Prof_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Service_Prof_List();
    }

    function Init_Service_Prof_List() {

        if (serv_flag) {
            var cookie = $.cookie('pqsf');
            service_prof = [];
            service_prof_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSPROF_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                service_prof[0] = 'None';
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    service_prof_data[i] = row[i];
                    var element = row[i].split("&");
                    service_prof[element[0]] = element[1];
                }
                Init_Scheduled_Shaper_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Scheduled_Shaper_List();
    }

    function Init_Scheduled_Shaper_List() {

        if (schd_shpr_flag) {

            pipe_schedule_list = [];
            pipe_schedule_list_data = [];
            pipe_schedule_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SHEDSPR_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    pipe_schedule_list_data[i] = row[i];
                    var element = row[i].split("&");
                    pipe_schedule_list[element[0]] = element[1];
                    pipe_schedule_list_tt[element[0]] = row[i];
                }
                Init_Schedule_List();

            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Schedule_List();
    }

    function Init_Schedule_List() {

        if (schd_flag) {

            schedule_list = [];
            schedule_list_data = [];
            schedule_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SCHD_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                schedule_list[0] = 'None';
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    schedule_list_data[i] = row[i];
                    var element = row[i].split("&");
                    schedule_list[element[0]] = element[1];
                    schedule_list_tt[element[0]] = row[i];
                }
                Init_Shaper_List();

            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Shaper_List();
    }

    function Init_Shaper_List() {

        if (shpr_flag) {
            pipe_list = [];
            pipe_list_data = [];
            pipe_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SHAPER_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    pipe_list_data[i] = row[i];
                    var element = row[i].split("&");
                    pipe_list[element[0]] = element[1];
                    pipe_list_tt[element[0]] = row[i];
                }
                Init_URL_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_URL_List();
    }

    function Init_URL_List() {

        if (url_list_flag) {
            var cookie = $.cookie('pqsf');
            url_list = [];
            url_list_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLITEM_LIST, 0);
            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    url_list_data[i] = row[i];
                    var element = row[i].split("&");
                    url_list[element[0]] = element[1];
                }
                Init_URL_Prof_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_URL_Prof_List();
    }

    function Init_URL_Prof_List() {

        if (url_flag) {
            var cookie = $.cookie('pqsf');
            url_prof = [];
            url_prof_data = [];
            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLPROF_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
                url_prof[0] = 'None';
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    url_prof_data[i] = row[i];
                    var element = row[i].split("&");
                    url_prof[element[0]] = element[1];
                }
                Init_Rule_Mon_List();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Rule_Mon_List();
    }

    function Init_Rule_Mon_List() {

        if (ruleMon_flag) {
            rule_mon_list = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_RULE_LIST, 0); //WO_GET_EVENT_LIST

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'

            }).done(function (data, textStatus, jqXHR) {
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    rule_mon_list[i] = row[i];
                }

                Init_Rule_List();

            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_Rule_List();
    }

    function Init_Rule_List() {

        if (rule_flag) {
            rule_list = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_RULE_LIST, 0); //WO_GET_EVENT_LIST

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'

            }).done(function (data, textStatus, jqXHR) {

                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    rule_list[i] = row[i];
                }
                if (rule_table) {
                    Display_Rule_Table();
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else {
            if (rule_table) {
                Display_Rule_Table();
            }
        }
    }
}

function Display_Rule_Table() {
    rule_table.clear().draw();
//    console.log("Rule List: " + rule_list)
    for (var i = 0; i < rule_list.length; i++) {
        var element = rule_list[i].split("&");

        if (element[9] === '1') {
            rule_table.row.add([element[13], element[0], element[11], get_addr_element(element[11], element[1]), element[12], get_addr_element(element[12], element[2]), schedule_list[element[8]], url_prof[element[6]], app_ctrl_list[element[5]], service_prof[element[7]], element[3], set_action(element[9], element[3], i), pipe_schedule_list[element[3]], pipe_schedule_list[element[4]], set_merged(element[10]), 1, set_rule_status(1, i), element[9], '-']);

        } else {
            if (element[3] === '4294967295' || element[3] === '0') {
                rule_table.row.add([element[13], element[0], element[11], get_addr_element(element[11], element[1]), element[12], get_addr_element(element[12], element[2]), schedule_list[element[8]], url_prof[element[6]], app_ctrl_list[element[5]], service_prof[element[7]], element[3], set_action(element[9], element[3], i), '-', '-', '-', 1, set_rule_status(1, i), element[9], '-']);
            } else
                rule_table.row.add([element[13], element[0], element[11], get_addr_element(element[11], element[1]), element[12], get_addr_element(element[12], element[2]), schedule_list[element[8]], url_prof[element[6]], app_ctrl_list[element[5]], service_prof[element[7]], element[3], set_action(element[9], element[3], i), pipe_list[element[3]], pipe_list[element[4]], set_merged(element[10]), 1, set_rule_status(1, i), element[9], '-']);
        }
    }
    rule_table.draw(false);
}

set_rule_status = function (status, index) {
    if (status === 1) {
        return "<select class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' disabled id='profileStatus_" + index + "'>" +
                "<option value='1'>Enable</option>" +
                "<option value='0'>Disable</option>" +
                " </select>";
    } else {
        return "<select class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' disabled id='profileStatus_" + index + "'>" +
                "<option value='0'>Disable</option>" +
                "<option value='1'>Enable</option>" +
                " </select>";
    }
};

set_action = function (type, action, index) {

    if (type === '1') {
//        return "<select class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' disabled id='profileStatus_" + index + "'>" +
//                "<option value='3'>Schedule-Shape</option>" +
//                "<option value='0'>Allow</option>" +
//                "<option value='-1'>Block</option>" +                
//                "<option value='2'>Shape</option>" +
//                " </select>";
        return "Scheduled Shaping";
    } else {
        if (action === '0') {
            return "Allow";
//            return "<select class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' disabled id='profileStatus_" + index + "'>" +
//                    "<option value='0'>Allow</option>" +
//                    "<option value='-1'>Block</option>" +
//                    "<option value='2'>Shape</option>" +
//                    "<option value='3'>Schedule-Shape</option>" +                    
//                    " </select>";
        } else if (action === '4294967295') {
            return "Block";
//            return "<select class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' disabled id='profileStatus_" + index + "'>" +
//                    "<option value='-1'>Block</option>" +                    
//                    "<option value='2'>Shape</option>" +
//                    "<option value='3'>Schedule-Shape</option>" +
//                    "<option value='0'>Allow</option>" +
//                    " </select>";
        } else {
            return "Simple Shaping";
//            return "<select class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' disabled id='profileStatus_" + index + "'>" +
//                    "<option value='2'>Shape</option>" +
//                    "<option value='3'>Schedule-Shape</option>" +
//                    "<option value='0'>Allow</option>" +
//                    "<option value='-1'>Block</option>" +                    
//                    " </select>";
        }
    }
};

set_merged = function (index) {
    if (index === '1') {
        return 'Enabled';
    } else
        return 'Disabled';
};

function EditRuleTableModal() {

    var source_types_edit = ['IP', 'MAC', 'AD-User', 'DHCP-User', 'Profile', 'AD-Group'];

    var rule_data = rule_table.row('.selected').data();
    $('#editPipes').children().detach();
//    console.log(rule_data)

    if (rule_data[17] === '0') {
        if (rule_data[10] === '4294967295') {
            $('#editRuleModalContent').css({height: '490px'});
            $("#edit_action").val(-1);
        } else if (rule_data[10] === '0') {
            $('#editRuleModalContent').css({height: '490px'});
            $("#edit_action").val(0);
        } else {
            $('#editRuleModalContent').css({height: '630px'});
            var shapers = "<label class='drop_down_label'> Downlink Pipe : </label>" +
                    "<select id='edit_downlink_pipe' class='field_prop'>" +
                    "</select> <br><br>" +
                    "<label class='drop_down_label'> Uplink Pipe : </label>" +
                    "<select id='edit_uplink_pipe' class='field_prop'>" +
                    "</select><br><br>" +
                    "<label class='drop_down_label'> Limit at Default : </label>" +
                    "<select id='edit_merge_pipes' class='field_prop'>" +
                    "<option value='0'>Disable</option>" +
                    "<option value='1'>Enable</option>" +
                    "</select><br><br>";

            $('#editPipes').append(shapers);
            init_user_pipes('#edit_downlink_pipe');
            init_user_pipes('#edit_uplink_pipe');
            $("#edit_action").val(2);
        }
    } else {
        $('#editRuleModalContent').css({height: '585px'});
        var pipes = "<label class='drop_down_label'> Pipe Schedule : </label>" +
                "<select id='edit_sched_pipe' class='field_prop'>" +
                "</select> <br><br>" +
                "<label class='drop_down_label'> Limit at Default : </label>" +
                "<select id='edit_merge_pipes' class='field_prop'>" +
                "<option value='0'>Disable</option>" +
                "<option value='1'>Enable</option>" +
                "</select><br><br>";

        $('#editPipes').append(pipes);
        init_pipe_schedules('#edit_sched_pipe');
        $("#edit_action").val(3);
        $("#edit_scheduled_shaper option").filter(function () {
            return this.text === rule_data[12];
        }).prop('selected', true);
    }


    $("#edit_src_addr_type option").filter(function () {
        return this.text === source_types_edit[rule_data[2]];
    }).prop('selected', true);

    append_addr_element('edit_src_addr_type', 'edit_source');


    $("#edit_dest_addr_type option").filter(function () {
        return this.text === source_types_edit[rule_data[4]];
    }).prop('selected', true);

    append_addr_element('edit_dest_addr_type', 'edit_destination');

    $("#edit_source option").filter(function () {
        return this.text === rule_data[3];
    }).prop('selected', true);

    $("#edit_destination option").filter(function () {
        return this.text === rule_data[5];
    }).prop('selected', true);
    $("#edit_schedule option").filter(function () {
        return this.text === rule_data[6];
    }).prop('selected', true);
    $("#edit_url_prof option").filter(function () {
        return this.text === rule_data[7];
    }).prop('selected', true);
    $("#edit_app option").filter(function () {
        return this.text === rule_data[8];
    }).prop('selected', true);
    $("#edit_service_prof option").filter(function () {
        return this.text === rule_data[9];
    }).prop('selected', true);
    $("#edit_downlink_pipe option").filter(function () {
        return this.text === rule_data[12];
    }).prop('selected', true);
    $("#edit_uplink_pipe option").filter(function () {
        return this.text === rule_data[13];
    }).prop('selected', true);
    if (rule_data[14] === 'Enabled') {
        $("#edit_merge_pipes option").filter(function () {
            return this.text === 'Enable';
        }).prop('selected', true);
    } else {
        $("#edit_merge_pipes option").filter(function () {
            return this.text === 'Disable';
        }).prop('selected', true);
    }
}

///////////////////////////////

function Update_Address_List() {
    address_list = [];
    address_list_data = [];
    address_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADDR_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        address_list[0] = 'Any';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            address_list_data[i] = row[i];
            var element = row[i].split("&");
            address_list[element[0]] = element[1];
            address_list_tt[element[0]] = row[i];
        }
        Display_Address_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Address_Table() {
    address_table.clear().draw();
    for (var i = 0; i < address_list_data.length; i++) {
        var element = address_list_data[i].split("&");
        address_table.row.add([element[0], element[1], Address_Category_Type(element[2], element[5]), get_addr_vlan_id(element[3]), Address_Val(element[2], element[4], element[5]), element[6]]);
    }
    address_table.draw(false);
}

Address_Category_Type = function (id, ip_high) {
    if (id === '2') {
        if (ip_high === '32') {
            return 'IP Address';
        } else
            return 'Subnet';
    } else
        return 'IP Range';
};

Address_Val = function (id, ip_1, ip_2) {
    if (id === '2') {
        if (ip_2 === '32') {
            return num2dot(ip_1);
        } else
            return num2dot(ip_1) + ' / ' + ip_2;
    } else
        return num2dot(ip_1) + ' - ' + num2dot(ip_2);
};

function SetAddressTableModalElements(opt, type, append_div, submit) {

//    opt = address_table.row('.selected').data()[2];
    var modal_type;
    var plot = null;

    if (type === 'add') {
        modal_type = 'Create';
    } else
        modal_type = 'Edit';

    if (opt === "Subnet") {

        plot = "<label class='drop_down_label'> Subnet : </label>" +
                "<input id='" + type + "Subnet' type='text' value='0.0.0.0/00' class='field_prop'> <br><br>";
        $('#' + modal_type + 'AddressModalContent').css({height: '345px'});
//        $('#' + submit).removeAttr('disabled');
    } else if (opt === "IP Address") {

        plot = "<label class='drop_down_label'> IP Address : </label>" +
                "<input id='" + type + "IP' type='text' value='0.0.0.0' class='field_prop'><br><br>";
        $('#' + modal_type + 'AddressModalContent').css({height: '345px'});
//        $('#' + submit).removeAttr('disabled');

    } else if (opt === "IP Range") {

        plot = "<label class='drop_down_label'> IP Range : </label>" +
                "<input id='" + type + "LowIP' type='text' value='0.0.0.0' class='field_prop'><br>" +
                "<label style='margin-left: 250px' class='drop_down_label'> to </label><br>" +
                "<input id='" + type + "HighIP' type='text' value='0.0.0.0' class='field_prop'><br><br>";
        $('#' + modal_type + 'AddressModalContent').css({height: '395px'});
//        $('#' + submit).removeAttr('disabled');

    } else {
        $('#' + submit).attr('disabled', 'disabled');
        alert("Please select one option from the Field!");
    }
    $('#' + append_div).append(plot);
}

function EditAddressTableModal() {

    var addr_data = address_table.row('.selected').data();
    $("#editAddressName").val(addr_data[1]).attr('disabled', true);
//    $("#editAddressName").attr('disabled', true);
    $("#AddressCodeEdit").val(addr_data[2]);
    $("#AddressCodeEdit").attr('disabled', true);
    $("#editVLANID").val(addr_data[3]);

    if (addr_data[2] === "Subnet") {
        $("#editSubnet").val(addr_data[4]);
    } else if (addr_data[2] === "IP Address") {
        var ip_hl = addr_data[4];
        $("#editIP").val(ip_hl);
    } else if (addr_data[2] === "IP Range") {
        var ip_hl = (addr_data[4]).split(" ");
        $("#editLowIP").val(ip_hl[0]);
        $("#editHighIP").val(ip_hl[2]);
    } else {
        alert("Error");
    }
}

get_addr_vlan_id = function (id) {
    if (id === '4095') {
        return 'Any';
    } else
        return id;
};

//////////////////////////////

function Update_MAC_List() {
    var cookie = $.cookie('pqsf');
    mac_list = [];
    mac_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, TS_MACADR_GET_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            mac_list_data[i] = row[i];
            var element = row[i].split("&");
            mac_list[element[0]] = element[1];
        }
        Display_MAC_List_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_MAC_List_Table() {
    mac_list_table.clear().draw();
    for (var i = 0; i < mac_list_data.length; i++) {
        var element = mac_list_data[i].split("&");
        mac_list_table.row.add([element[0], element[1], IntToMacAddress(Number(element[3]), Number(element[2])), num2dotR(element[4]), element[5]]).draw(false);
    }
    mac_list_table.draw(false);
}

function set_mac_table_modal_elements() {
    var mac_data = mac_list_table.row('.selected').data();
    $("#editMacName").val(mac_data[1]).attr("disabled", true);
    $("#editMacAddr").val(mac_data[2]);
}

//////////////////////////////
function Update_Addr_Prof_List() {
    var cookie = $.cookie('pqsf');
    addr_prof = [];
    addr_prof_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, TS_GET_ADRPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        url_prof[0] = 'None';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            addr_prof_data[i] = row[i];
            var element = row[i].split("&");
            addr_prof[element[0]] = element[1];
        }
        Display_Addr_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Addr_Prof_Table() {
    addr_prof_table.clear().draw();
    for (var i = 0; i < addr_prof_data.length; i++) {
        var element = addr_prof_data[i].split("&");
        addr_prof_table.row.add([element[0], element[1], '-', element[2]]);
    }
    addr_prof_table.draw(false);
}

function Update_Addr_Prof_Addrs() {
    var cookie = $.cookie('pqsf');
    addr_prof_data_addrs = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, TS_GET_ADRPELE_LIST, 0);
    req[1] = addr_prof_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        //console.log(data)
        for (var i = 0; i < row.length - 1; i++) {
            addr_prof_data_addrs[i] = row[i];
        }
        Display_Addr_Prof_Addr_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Addr_Prof_Addr_Table() {

    addr_prof_content_table.clear().draw();

    for (var i = 0; i < addr_prof_data_addrs.length; i++) {
        var element = addr_prof_data_addrs[i].split("&");
        addr_prof_content_table.row.add([element[0], element[1], get_addr_types(element[2]), element[3], get_addr_element(element[2], element[3])]);
    }
    addr_prof_content_table.draw(false);
}

get_addr_types = function (id) {
    if (id === '0') {
        return 'IP';
    } else if (id === '1') {
        return 'MAC';
    } else if (id === '2') {
        return 'AD-User';
    } else if (id === '3') {
        return 'DHCP-User';
    } else if (id === '4') {
        return 'Profile';
    } else if (id === '5') {
        return 'AD-Group';
    } else
        return 'Error';
};

get_addr_element = function (cat, id) {
    var ind = parseInt(id);
    if (cat === '0') {
        return address_list[ind];
    } else if (cat === '1') {
        return mac_list[ind];
    } else if (cat === '2') {
        return rule_rmt_addr_user_list[ind];
    } else if (cat === '3') {
        return rule_rmt_addr_user_list[ind];
    } else if (cat === '4') {
        return addr_prof[ind];
    } else if (cat === '5') {
        return ad_group_list[ind];
    } else
        return 'Error';
};

append_addr_element = function (opt, cont) {
    $('#' + cont).empty();
    if ($("#" + opt + " option:selected").text() === 'IP') {
        init_addr_ip('#' + cont, true);
    } else if ($("#" + opt + " option:selected").text() === 'MAC') {
        init_addr_mac('#' + cont, true);
    } else if ($("#" + opt + " option:selected").text() === 'AD-User') {
        init_addr_ad_user('#' + cont, true);
    } else if ($("#" + opt + " option:selected").text() === 'AD-Group') {
        init_addr_ad_group('#' + cont, true);
    } else if ($("#" + opt + " option:selected").text() === 'DHCP-User') {
        init_addr_dhcp('#' + cont, true);
    } else if ($("#" + opt + " option:selected").text() === 'Profile') {
        init_addr_profile('#' + cont, true);
    }
};

///////////////////////////////////

function Update_Admin_Pipe_List() {

    pipe_list = [];
    pipe_list_data = [];
    pipe_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SHAPER_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            pipe_list_data[i] = row[i];
            var element = row[i].split("&");
            pipe_list[element[0]] = element[1];
            pipe_list_tt[element[0]] = row[i];
        }
        Display_Admin_Pipe_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Admin_Pipe_Table() {
    admin_pipe_table.clear().draw();
    for (var i = 0; i < pipe_list_data.length; i++) {
        var element = pipe_list_data[i].split("&");
        admin_pipe_table.row.add([element[0], element[1], get_pipe_type(element[5], 0), get_pipe_type(element[5], 1), element[2], element[3], pipe_priority(element[4]), element[6]]);
    }
    admin_pipe_table.draw(false);
}

pipe_priority = function (id) {
    if (id === '1') {
        return 'Low';
    } else if (id === '50') {
        return 'Medium';
    } else if (id === '99') {
        return 'High';
    } else
        return 'Error';
};

set_pipe_type = function (sel_1, sel_2) {
    var sh_type = $(sel_1).val();
    var grp_type = $(sel_2).val();

    if (sh_type === '0') {
        if (grp_type === '0')
            return 1;
        else if (grp_type === '1')
            return 2;
        else
            return 3;
    } else {
        if (grp_type === '0')
            return 4;
        else if (grp_type === '1')
            return 5;
        else
            return 6;
    }
};

get_pipe_type = function (id, flag) {

    if (flag === 0) {
        switch (parseInt(id)) {
            case 1:
            case 2:
            case 3:
                return 'Per-IP';
            case 4:
            case 5:
            case 6:
                return 'Shared';
        }
    } else {
        switch (parseInt(id)) {
            case 1:
            case 4:
                return 'Per-Item';
                break;
            case 2:
            case 5:
                return 'Per-Profile';
                break;
            case 3:
            case 6:
                return 'Per-Rule';
                break;
        }
    }
};

function set_pipe_table_modal_elements() {
    var pipe_data = admin_pipe_table.row('.selected').data();
    $("#editAdminPipeName").val(pipe_data[1]).attr("disabled", true);
    $("#editAdminPipeType option").filter(function () {
        return this.text === pipe_data[2];
    }).prop('selected', true);
    $("#editAdminPipeType").attr("disabled", true);
    $("#editAdminGroupingType option").filter(function () {
        return this.text === pipe_data[3];
    }).prop('selected', true);
    $("#editAdminGroupingType").attr("disabled", true);
    $("#editAdminPipeGuarantBW").val(pipe_data[4]);
    $("#editAdminPipeMaxBW").val(pipe_data[5]);
    $("#adminPipePriorityEdit option").filter(function () {
        return this.text === pipe_data[6];
    }).prop('selected', true);
}

///////////////////////////////////

function Update_Schedule_List() {

    schedule_list = [];
    schedule_list_data = [];
    schedule_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SCHD_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        schedule_list[0] = 'None';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            schedule_list_data[i] = row[i];
            var element = row[i].split("&");
            schedule_list[element[0]] = element[1];
            schedule_list_tt[element[0]] = row[i];
        }
        Display_Schedule_Table();

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Schedule_Table() {
    schedule_table.clear().draw();
    for (var i = 0; i < schedule_list_data.length; i++) {
        var element = schedule_list_data[i].split("&");
        if (Schedule_Type(element[2]) === "Weekly Recurring") {
            schedule_table.row.add([element[0], element[1], Schedule_Type(element[2]), decode_days_of_week(element[3]), moment(element[4] * 1000).format("hh:mm a"), moment(element[5] * 1000).format("hh:mm a"), element[6]]);
        } else
            schedule_table.row.add([element[0], element[1], Schedule_Type(element[2]), Schedule_One_Time_Days(element[4], element[5]), moment(element[4] * 1000).format("hh:mm a"), moment(element[5] * 1000).format("hh:mm a"), element[6]]);
    }
    schedule_table.draw(false);
}

Schedule_Type = function (id) {
    if (id === '21') {
        return 'Weekly Recurring';
    } else if (id === '22') {
        return 'One Time';
    } else
        return 'Error';
};

Schedule_One_Time_Days = function (start, end) {
    var start_date = moment(start * 1000).format("Do MMMM YYYY");
    var end_date = moment(end * 1000).format("Do MMMM YYYY");
    if (start_date === end_date) {
        return start_date;
    } else
        return start_date + " - " + end_date;
};

function EditScheduleTableModal() {

    var schd_data = schedule_table.row('.selected').data();
    $("#editScheduleName").val(schd_data[1]);
    $("#editScheduleName").attr('disabled', true);
    $("#ScheduleCodeEdit").val(schd_data[2]);
    $("#ScheduleCodeEdit").attr('disabled', true);

    if (schd_data[2] === "Weekly Recurring") {
        for (var i = 0; i < schd_data[3].length; i++) {
            switch (schd_data[3][i]) {

                case 'Monday':
                    $('#RecurE_1').prop('checked', true);
                    break;
                case 'Tuesday':
                    $('#RecurE_2').prop('checked', true);
                    break;
                case 'Wednesday':
                    $('#RecurE_3').prop('checked', true);
                    break;
                case 'Thursday':
                    $('#RecurE_4').prop('checked', true);
                    break;
                case 'Friday':
                    $('#RecurE_5').prop('checked', true);
                    break;
                case 'Saturday':
                    $('#RecurE_6').prop('checked', true);
                    break;
                case 'Sunday':
                    $('#RecurE_7').prop('checked', true);
                    break;
                default:
                    return -1;
            }
        }
        var st_date = moment(schd_data[4], "hh:mm a").unix();
        var end_date = moment(schd_data[5], "hh:mm a").unix();
        $("#editStartTimeRecur").val(moment(st_date * 1000).format("hh:mmA"));
        $("#editEndTimeRecur").val(moment(end_date * 1000).format("hh:mmA"));
    } else if (schd_data[2] === "One Time") {

        var date = [];
        if (schd_data[3].indexOf('-') > -1) {
            date = schd_data[3].split("- ");
        } else {
            date[0] = schd_data[3];
            date[1] = schd_data[3];
        }
        var st_date = moment(date[0] + schd_data[4], "Do MMMM YYYY hh:mm a").unix();
        var end_date = moment(date[1] + ' ' + schd_data[5], "Do MMMM YYYY hh:mm a").unix();
        $("#edit_sched_startDateTimePeriod").val(moment(st_date * 1000).format("MMMM Do YYYY - hh:mm a"));
        $("#edit_sched_endDateTimePeriod").val(moment(end_date * 1000).format("MMMM Do YYYY - hh:mm a"));

    } else {
        alert("Error");
    }
}

function SetScheduleTableModalElements(opt, append_div) {

    var plot = null;
    if (opt === "Weekly Recurring") {

        $('#CreateScheduleModalContent').css({height: '440px'});

        plot = "<label class='drop_down_label'> Days : </label>" +
                "<input type='checkbox' style='margin-left: 118px' id='Recur_1'> <label class='check_box_prop'>Monday </label>" +
                "<input type='checkbox' style='margin-left: 41px' id='Recur_2'> <label class='check_box_prop'>Tuesday</label><br>" +
                "<input type='checkbox' style='margin-left: 154px' id='Recur_3'> <label class='check_box_prop'>Wednesday</label>" +
                "<input type='checkbox' style='margin-left: 20px' id='Recur_4'> <label class='check_box_prop'>Thursday</label><br>" +
                "<input type='checkbox' style='margin-left: 154px' id='Recur_5'> <label class='check_box_prop'>Friday</label>" +
                "<input type='checkbox' style='margin-left: 50px' id='Recur_6'> <label class='check_box_prop'>Saturday</label><br>" +
                "<input type='checkbox' style='margin-left: 154px' id='Recur_7'> <label class='check_box_prop'>Sunday</label><br><br>" +
                "<label class='drop_down_label'> Start Time : </label>" +
                "<input type='text' id='startTimeRecur' class='clockpicker field_prop' placeholder='Start Time' style='margin-left: 90px; text-indent: 5px'><br><br>" +
                "<label class='drop_down_label'> End Time : </label>" +
                "<input type='text' id='endTimeRecur' class='clockpicker field_prop' placeholder='End Time' style='margin-left: 90px; text-indent: 5px'><br>";

        $('#' + append_div).append(plot);
        setFormatRecur();
    } else if (opt === "One Time") {

        $('#CreateScheduleModalContent').css({height: '350px'});

        plot = "<label class='drop_down_label'> Start Date & Time : </label>" +
                "<input type='text' id='startDateTimePeriod' placeholder='Start date and time' class='field_prop_reporting' style='margin-left: 50px; font-size: 12px; color:black; width: 200px; text-indent: 5px' ><br><br>" +
                "<label class='drop_down_label'> End Date & Time : </label>" +
                "<input type='text' id='endDateTimePeriod' placeholder='End date and time' class='field_prop_reporting'  style='margin-left: 55px; font-size: 12px; color:black; width: 200px; text-indent: 5px'> <br><br>";

        $('#' + append_div).append(plot);
        setFormatPeriod('#startDateTimePeriod', '#endDateTimePeriod');
    } else {
        alert("Please select one option from the Field!");
    }
}

function EditScheduleTableModalElements(append_div) {

    var opt = schedule_table.row('.selected').data()[2];
    var plot = null;
    if (opt === "Weekly Recurring") {

        $('#EditScheduleModalContent').css({height: '440px'});

        plot = "<label class='drop_down_label'> Days : </label>" +
                "<input type='checkbox' style='margin-left: 121px' id='RecurE_7'> <label class='check_box_prop'>Sunday</label>" +
                "<input type='checkbox' style='margin-left: 41px' id='RecurE_4'> <label class='check_box_prop'>Thursday</label><br>" +
                "<input type='checkbox' style='margin-left: 159px' id='RecurE_1'> <label class='check_box_prop'>Monday </label>" +
                "<input type='checkbox' style='margin-left: 38px' id='RecurE_5'> <label class='check_box_prop'>Friday</label><br>" +
                "<input type='checkbox' style='margin-left: 159px' id='RecurE_2'> <label class='check_box_prop'>Tuesday</label>" +
                "<input type='checkbox' style='margin-left: 35px' id='RecurE_6'> <label class='check_box_prop'>Saturday</label><br>" +
                "<input type='checkbox' style='margin-left: 159px' id='RecurE_3'> <label class='check_box_prop'>Wednesday</label><br><br>" +
                "<label class='drop_down_label'> Start Time : </label>" +
                "<input type='text' id='editStartTimeRecur' class='clockpicker field_prop' placeholder='Start Time' style='margin-left: 90px; text-indent: 5px'><br><br>" +
                "<label class='drop_down_label'> End Time : </label>" +
                "<input type='text' id='editEndTimeRecur' class='clockpicker field_prop' placeholder='End Time' style='margin-left: 90px; text-indent: 5px'><br>";

        $('#' + append_div).append(plot);
        editFormatRecur();
    } else if (opt === "One Time") {

        $('#EditScheduleModalContent').css({height: '350px'});

        plot = "<label class='drop_down_label'> Start Date & Time : </label>" +
                "<input type='text' id='edit_sched_startDateTimePeriod' placeholder='Start date and time' class='field_prop_reporting' style='margin-left: 50px; font-size: 12px; color:black; width: 200px; text-indent: 5px' ><br><br>" +
                "<label class='drop_down_label'> End Date & Time : </label>" +
                "<input type='text' id='edit_sched_endDateTimePeriod' placeholder='End date and time' class='field_prop_reporting'  style='margin-left: 55px; font-size: 12px; color:black; width: 200px; text-indent: 5px'> <br><br>";

        $('#' + append_div).append(plot);
        setFormatPeriod('#edit_sched_startDateTimePeriod', '#edit_sched_endDateTimePeriod');
    } else {
        alert("Error in Schedule!");
    }
}

var recur_st = null;
var recur_et = null;

function setFormatRecur() {

    $('#startTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time',
        'default': 'now'
    }).change(function () {
        recur_st = moment(this.value, "hh-mm-A") / 1000;
    });

    $('#endTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time',
        'default': 'now'
    }).change(function () {
        recur_et = moment(this.value, "hh-mm-A") / 1000;
    });
}

function editFormatRecur() {

    $('#editStartTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time'
    }).change(function () {
        recur_st = moment(this.value, "hh-mm-A") / 1000;
    });

    $('#editEndTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time'
    }).change(function () {
        recur_et = moment(this.value, "hh-mm-A") / 1000;
    });
}

function setFormatPeriod(s_t, e_t) {

    $(s_t).datetimepicker({
        format: "MMM Do YYYY - h:mm a",
        sideBySide: true,
        viewMode: "days",
        minDate: Date.now(),
        showClear: true,
        showClose: true
    });
    $(e_t).datetimepicker({
        format: "MMM Do YYYY - h:mm a",
        sideBySide: true,
        viewMode: "days",
        minDate: Date.now(),
        showClear: true,
        showClose: true
    });

//get value when datetimepicker value is changed

    $(s_t).on("dp.change", function (e) {
        if ($(s_t).val() !== '') {
            $(e_t).data("DateTimePicker").minDate(e.date);
        }
    });
}

checked_days = function (id) {
    if ($("#Recur_" + id).is(":checked")) {
        return 1;
    } else
        return 0;
};

checkedE_days = function (id) {
    if ($("#RecurE_" + id).is(":checked")) {
        return 1;
    } else
        return 0;
};

////////////////////////////

function Update_Pipe_Schedule_List() {

    pipe_schedule_list = [];
    pipe_schedule_list_data = [];
    pipe_schedule_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SHEDSPR_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            pipe_schedule_list_data[i] = row[i];
            var element = row[i].split("&");
            pipe_schedule_list[element[0]] = element[1];
            pipe_schedule_list_tt[element[0]] = row[i];
        }
        Display_Pipe_Schedules_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Pipe_Schedules_Table() {
    pipe_schedules_table.clear().draw();

    for (var i = 0; i < pipe_schedule_list_data.length; i++) {
        var element = pipe_schedule_list_data[i].split("&");

        if (element[3] === '0') {
            if (element[5] === '0') {
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Allow', '-', '-', 'Allow', '-', '-', element[7]]);
            } else if (element[5] === '4294967295') {
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Allow', '-', '-', 'Block', '-', '-', element[7]]);
            } else
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Allow', '-', '-', 'Shape', pipe_list[element[5]], pipe_list[element[6]], element[7]]);
        } else if (element[3] === '4294967295') {
            if (element[5] === '0') {
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Block', '-', '-', 'Allow', '-', '-', element[7]]);
            } else if (element[5] === '4294967295') {
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Block', '-', '-', 'Block', '-', '-', element[7]]);
            } else
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Block', '-', '-', 'Shape', pipe_list[element[5]], pipe_list[element[6]], element[7]]);
        } else {
            if (element[5] === '0') {
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Shape', pipe_list[element[3]], pipe_list[element[4]], 'Allow', '-', '-', element[7]]);
            } else if (element[5] === '4294967295') {
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Shape', pipe_list[element[3]], pipe_list[element[4]], 'Block', '-', '-', element[7]]);
            } else
                pipe_schedules_table.row.add([element[0], element[1], schedule_list[element[2]], 'Shape', pipe_list[element[3]], pipe_list[element[4]], 'Shape', pipe_list[element[5]], pipe_list[element[6]], element[7]]);
        }
    }
    pipe_schedules_table.draw(false);
}

function SetPipeScheduleTableModalElements() {

//    init_user_pipes('#edit_shaper_to_sched');

    init_schedule_list('#edit_sched_to_pipe');

    var pipe_sched_data = pipe_schedules_table.row('.selected').data();
    $('#edit_pipes_to_schedule').children().detach();
    $('#edit_def_pipes_to_schedule').children().detach();

    $("#editPipeScheduleName").val(pipe_sched_data[1]).attr("disabled", true);

    $("#edit_sched_to_pipe option").filter(function () {
        return this.text === pipe_sched_data[2];
    }).prop('selected', true);

    $("#edit_sched_action option").filter(function () {
        return this.text === pipe_sched_data[3];
    }).prop('selected', true);

    $("#edit_def_pipe_sched_action option").filter(function () {
        return this.text === pipe_sched_data[6];
    }).prop('selected', true);

    if (pipe_sched_data[3] === 'Shape') {

        if ($("#edit_def_pipe_sched_action option:selected").val() === '2') {
            $('#EditPipeSchedulesModalContent').css({height: '520px'});
        } else
            $('#EditPipeSchedulesModalContent').css({height: '420px'});

        var pipes = "<label class='drop_down_label'> Scheduled Downlink Pipe : </label>" +
                "<select id='edit_sched_downlink_pipe' class='field_prop'>" +
                "</select> <br><br>" +
                "<label class='drop_down_label'> Scheduled Uplink Pipe : </label>" +
                "<select id='edit_sched_uplink_pipe' class='field_prop'>" +
                "</select> <br><br>";

        $('#edit_pipes_to_schedule').append(pipes);
        init_user_pipes('#edit_sched_downlink_pipe');
        init_user_pipes('#edit_sched_uplink_pipe');

        $("#edit_sched_downlink_pipe option").filter(function () {
            return this.text === pipe_sched_data[4];
        }).prop('selected', true);
        $("#edit_sched_uplink_pipe option").filter(function () {
            return this.text === pipe_sched_data[5];
        }).prop('selected', true);

    } else {
        if ($("#edit_def_pipe_sched_action option:selected").val() === '2') {
            $('#EditPipeSchedulesModalContent').css({height: '420px'});
        } else
            $('#EditPipeSchedulesModalContent').css({height: '330px'});

        $('#edit_pipes_to_schedule').children().detach();
    }

    if (pipe_sched_data[6] === 'Shape') {

        if ($("#edit_sched_action option:selected").val() === '2') {
            $('#EditPipeSchedulesModalContent').css({height: '520px'});
        } else
            $('#EditPipeSchedulesModalContent').css({height: '420px'});

        var def_pipes = "<label class='drop_down_label'> Default Downlink Pipe : </label>" +
                "<select id='edit_def_downlink_pipe' class='field_prop'>" +
                "</select> <br><br>" +
                "<label class='drop_down_label'> Default Uplink Pipe : </label>" +
                "<select id='edit_def_uplink_pipe' class='field_prop'>" +
                "</select> <br><br>";

        $('#edit_def_pipes_to_schedule').append(def_pipes);
        init_user_pipes('#edit_def_downlink_pipe');
        init_user_pipes('#edit_def_uplink_pipe');

        $("#edit_def_downlink_pipe option").filter(function () {
            return this.text === pipe_sched_data[7];
        }).prop('selected', true);
        $("#edit_def_uplink_pipe option").filter(function () {
            return this.text === pipe_sched_data[8];
        }).prop('selected', true);

    } else {
        if ($("#edit_sched_action option:selected").val() === '2') {
            $('#EditPipeSchedulesModalContent').css({height: '420px'});
        } else
            $('#EditPipeSchedulesModalContent').css({height: '330px'});

        $('#edit_def_pipes_to_schedule').children().detach();
    }
}

//////////////////////////////

function Update_URL_List() {
    var cookie = $.cookie('pqsf');
    url_list = [];
    url_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLITEM_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            url_list_data[i] = row[i];
            var element = row[i].split("&");
            url_list[element[0]] = element[1];
        }
        Display_URL_List_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_URL_List_Table() {
    url_list_table.clear().draw();
    for (var i = 0; i < url_list_data.length; i++) {
        var element = url_list_data[i].split("&");
        url_list_table.row.add([element[0], element[1], get_dns_det(element[2]), element[3]]);
    }
    url_list_table.draw(false);
}

function Update_URL_Prof_List() {
    var cookie = $.cookie('pqsf');
    url_prof = [];
    url_prof_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        url_prof[0] = 'None';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            url_prof_data[i] = row[i];
            var element = row[i].split("&");
            url_prof[element[0]] = element[1];
        }
        Display_URL_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_URL_Prof_Table() {
    url_prof_table.clear().draw();
    for (var i = 0; i < url_prof_data.length; i++) {
        element = url_prof_data[i].split("&");
        url_prof_table.row.add([element[0], element[1], '-', element[2]]);
    }
    url_prof_table.draw(false);
}

function Update_URL_Prof_URLs() {
    var cookie = $.cookie('pqsf');
    url_prof_data_urls = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLRULE_LIST, 0);
    req[1] = url_prof_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            url_prof_data_urls[i] = row[i];
        }
        Display_URL_Prof_URL_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_URL_Prof_URL_Table() {

    url_rule_table.clear().draw();

    for (var i = 0; i < url_prof_data_urls.length; i++) {
        var element = url_prof_data_urls[i].split("&");
        if (element[6] === '1') {
            url_rule_table.row.add([element[0], element[1], element[2], get_authentiation(element[3]), url_list[element[2]], 'Scheduled Shaping', pipe_schedule_list[element[4]], pipe_schedule_list[element[5]]]);
        } else {
            if (element[4] === '4294967295' || element[5] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], element[2], get_authentiation(element[3]), url_list[element[2]], 'Block', '-', '-']);
            } else if (element[4] === '0' || element[5] === '0') {
                url_rule_table.row.add([element[0], element[1], element[2], get_authentiation(element[3]), url_list[element[2]], 'Allow', '-', '-']);
            } else
                url_rule_table.row.add([element[0], element[1], element[2], get_authentiation(element[3]), url_list[element[2]], 'Simple Shaping', pipe_list[element[4]], pipe_list[element[5]]]);
        }
    }
    url_rule_table.draw(false);
}

get_authentiation = function (id) {
    switch (id) {
        case '1':
            return 'HTTP';
            break;
        case '2':
            return 'HTTPS';
            break;
        case '3':
            return 'HTTP or HTTPS';
            break;
    }

};

get_dns_det = function (id) {
    switch (id) {
        case '0':
            return 'Disabled';
            break;
        case '1':
            return 'Enabled';
            break;
    }
};

function New_URL(type) {

    var modal = null;
    var span = null;


    switch (type) {

        case 1:
            modal = document.getElementById('AddURLRuleModal');
            span = document.getElementsByClassName("close")[1];
            break;
        case 2:
            modal = document.getElementById('EditURLRuleModal');
            span = document.getElementsByClassName("close")[2];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
//        app_ctrl_prof_list_edit_table.clear();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    if (type === 1) {

        init_url_list('#add_url');
//        if (app_ctrl_init_flag) {
//            app_ctrl_prof_list_edit_table = $('#App_Prof_App_List_Edit_Table').DataTable({
//                columnDefs: [
//                    {width: '10%', targets: 0, visible: false},
//                    {width: '70%', targets: 1},
//                    {width: '20%', targets: 2, visible: false},
//                    {orderable: false, targets: '_all'},
//                    {className: 'dt-center', targets: '_all'}
//                ],
//                select: true,
//                scrollY: ($('#AddAppRuleModalContent').height() - 273),
////                scrollY: ($('#AddAppRuleModalContent').height() - 450),
//                scrollCollapse: true,
//                paging: false,
//                searching: false,
//                info: false
//            });
//        }
//        $("#addedApp").empty();
//        app_ctrl_prof_list_edit_table.clear().draw();
//        for (var u_item in application_list) {
//            if (application_list[u_item] !== 'Other' && u_item !== 'undefined' && !(app_ctrl_app_ids.indexOf(u_item) > -1)) {
//                app_ctrl_prof_list_edit_table.row.add([u_item, application_list[u_item], 'cat']);
//            }
//        }
//        app_ctrl_prof_list_edit_table.draw(false);
//        app_ctrl_init_flag = false;
    } else if (type === 2) {  //If Editing Applications included in profile

        init_url_list('#edit_new_url_to_rule');
        var sel_url_prof_content_data = url_rule_table.row('.selected').data();
        $("#edit_url_rule_authen option").filter(function () {
            return this.text === sel_url_prof_content_data[3];
        }).prop('selected', true);
        $("#edit_url_rule_authen").attr('disabled', true);
        $("#edit_new_url_to_rule option").filter(function () {
            return this.text === sel_url_prof_content_data[4];
        }).prop('selected', true);
        $("#edit_new_url_to_rule").attr('disabled', true);
        $("#url_rule_action option").filter(function () {
            return this.text === sel_url_prof_content_data[6];
        }).prop('selected', true);

        $('#edit_url_pipes').children().detach();

        if (sel_url_prof_content_data[6] === 'Simple Shaping') {

            $('#EditURLRuleModalContent').css({height: '360px'});
            var shapers = "<label class='drop_down_label'> Downlink Pipe : </label>" +
                    "<select id='edit_url_dlink_pipe' class='field_prop' style='width: 340px;'>" +
                    "</select><br><br>" +
                    "<label class='drop_down_label'> Uplink Pipe : </label>" +
                    "<select id='edit_url_ulink_pipe' class='field_prop' style='width: 340px;'>" +
                    "</select>";

            $('#edit_url_pipes').append(shapers);
            init_user_pipes('#edit_url_dlink_pipe');
            init_user_pipes('#edit_url_ulink_pipe');

            $("#edit_url_dlink_pipe option").filter(function () {
                return this.text === sel_url_prof_content_data[6];
            }).prop('selected', true);
            $("#edit_url_ulink_pipe option").filter(function () {
                return this.text === sel_url_prof_content_data[7];
            }).prop('selected', true);

        } else if (sel_url_prof_content_data[6] === 'Scheduled Shaping') {
            $('#EditURLRuleModalContent').css({height: '315px'});
            var shapers = "<label class='drop_down_label'> Scheduled Shaper : </label>" +
                    "<select id='edit_url_pipe_schedule' class='field_prop' style='width: 340px;'>" +
                    "</select> <br>";

            $('#edit_url_pipes').append(shapers);
            init_pipe_schedules('#edit_url_pipe_schedule');

            $("#edit_url_pipe_schedule option").filter(function () {
                return this.text === sel_url_prof_content_data[7];
            }).prop('selected', true);

        } else {
            $('#EditURLRuleModalContent').css({height: '290px'});
        }
    }
}

///////////////////////////////

function Update_AppCtrl_Prof_List() {
    var cookie = $.cookie('pqsf');
    app_ctrl_list = [];
    app_ctrl_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_APPPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        app_ctrl_list[0] = 'None';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_ctrl_list_data[i] = row[i];
            var element = row[i].split("&");
            app_ctrl_list[element[0]] = element[1];
        }
        Display_App_Ctrl_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_App_Ctrl_Prof_Table() {
    app_prof_table.clear().draw();
    for (var i = 0; i < app_ctrl_list_data.length; i++) {
        element = app_ctrl_list_data[i].split("&");
        app_prof_table.row.add([element[0], element[1], element[2], element[3]]);
    }
    app_prof_table.draw(false);
}

function Update_AppCtrl_Prof_Apps() {
    var cookie = $.cookie('pqsf');
    app_ctrl_list_apps = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_APPRULE_LIST, 0);
    req[1] = app_ctrl_prof_id;
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_ctrl_list_apps[i] = row[i];
        }
        Display_AppCtrl_Prof_Apps_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_AppCtrl_Prof_Apps_Table() {
    app_ctrl_app_ids = [];
    app_rule_table.clear().draw();

    for (var i = 0; i < app_ctrl_list_apps.length; i++) {
        var element = app_ctrl_list_apps[i].split("&");
        app_ctrl_app_ids.push(element[2]);

        if (element[7] === '1') {
            app_rule_table.row.add([element[0], application_list[element[2]], 'cat', 'Scheduled Shaping', pipe_schedule_list[element[5]], pipe_schedule_list[element[6]]]);
        } else {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], application_list[element[2]], 'cat', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], application_list[element[2]], 'cat', 'Allow', '-', '-']);
            } else
                app_rule_table.row.add([element[0], application_list[element[2]], 'cat', 'Simple Shaping', pipe_list[element[5]], pipe_list[element[6]]]);
        }

    }
    app_rule_table.draw(false);
}

function New_App_Control(type) {

    var modal = null;
    var span = null;

    switch (type) {

        case 1:
            modal = document.getElementById('AddAppRuleModal');
            span = document.getElementsByClassName("close")[1];
            break;
        case 2:
            modal = document.getElementById('EditAppRuleModal');
            span = document.getElementsByClassName("close")[2];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
//        app_ctrl_prof_list_edit_table.clear();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    if (type === 1) {
        $("#appControlID").empty();
        $.each(application_list, function (key, app) {

            if (app !== 'Other') {
                $('#appControlID')
                        .append($('<option>', {value: app}));
//                .append($('<option>', {'data-value': key, 'value': app}));
//                        .text(app));                
            }
        });

//    var my_options = $("#appControlID option");
//    var selected = $("#appControlID").val();
//    my_options.sort(function (a, b) {
//        if (a.text.toLowerCase() > b.text.toLowerCase())
//            return 1;
//        if (a.text.toLowerCase() < b.text.toLowerCase())
//            return -1;
//        return 0;
//    });
//    $("#appControlID").empty().append(my_options);
//    $("#appControlID").val(selected);        

    } else if (type === 2) {  //If Editing Applications included in profile

        var sel_app_ctrl_app_data = app_rule_table.row('.selected').data();
        $("#editAddedApp").val(sel_app_ctrl_app_data[1]);
        $("#editAddedApp").attr('disabled', true);
        $("#edit_app_action option").filter(function () {
            return this.text === sel_app_ctrl_app_data[3];
        }).prop('selected', true);

        $('#edit_app_pipes').children().detach();

        if (sel_app_ctrl_app_data[3] === 'Simple Shaping') {

            $('#EditAppRuleModalContent').css({height: '310px'});
            var shapers = "<label class='drop_down_label'> Downlink Pipe : </label>" +
                    "<select id='edit_app_dlink_pipe' class='field_prop'>" +
                    "</select><br><br>" +
                    "<label class='drop_down_label'> Uplink Pipe : </label>" +
                    "<select id='edit_app_ulink_pipe' class='field_prop'>" +
                    "</select>";

            $('#edit_app_pipes').append(shapers);
            init_user_pipes('#edit_app_dlink_pipe');
            init_user_pipes('#edit_app_ulink_pipe');

            $("#edit_app_dlink_pipe option").filter(function () {
                return this.text === sel_app_ctrl_app_data[4];
            }).prop('selected', true);
            $("#edit_app_ulink_pipe option").filter(function () {
                return this.text === sel_app_ctrl_app_data[5];
            }).prop('selected', true);

        } else if (sel_app_ctrl_app_data[3] === 'Scheduled Shaping') {
            $('#EditAppRuleModalContent').css({height: '270px'});
            var shapers = "<label class='drop_down_label'> Scheduled Shaper : </label>" +
                    "<select id='edit_app_pipe_schedule' class='field_prop'>" +
                    "</select> <br>";

            $('#edit_app_pipes').append(shapers);
            init_pipe_schedules('#edit_app_pipe_schedule');

            $("#edit_app_pipe_schedule option").filter(function () {
                return this.text === sel_app_ctrl_app_data[4];
            }).prop('selected', true);

        } else {
            $('#EditAppRuleModalContent').css({height: '250px'});
        }
    }
}

/////////////////////////////

function Update_Service_List() {
    var cookie = $.cookie('pqsf');
    service_list = [];
    service_list_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSITEM_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            service_list_data[i] = row[i];
            var element = row[i].split("&");
            service_list[element[0]] = element[1];
        }
        Display_Service_List_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Service_List_Table() {
    service_list_table.clear().draw();
    for (var i = 0; i < service_list_data.length; i++) {
        element = service_list_data[i].split("&");
        service_list_table.row.add([element[0], element[1], element[2], element[3]]);
    }
    service_list_table.draw(false);
}

function Update_Service_Prof_List() {
    var cookie = $.cookie('pqsf');
    service_prof = [];
    service_prof_data = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSPROF_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        service_prof[0] = 'None';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            service_prof_data[i] = row[i];
            var element = row[i].split("&");
            service_prof[element[0]] = element[1];
        }
        Display_Service_Prof_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Service_Prof_Table() {
    service_prof_table.clear().draw();
    for (var i = 0; i < service_prof_data.length; i++) {
        element = service_prof_data[i].split("&");
        service_prof_table.row.add([element[0], element[1], '-', element[2]]);
    }
    service_prof_table.draw(false);
}

function Update_Service_Prof_Services() {
    var cookie = $.cookie('pqsf');
    service_prof_data_services = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSRULE_LIST, 0);
    req[1] = service_prof_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            service_prof_data_services[i] = row[i];
        }
        Display_Service_Prof_Service_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Service_Prof_Service_Table() {

    service_rule_table.clear().draw();

    for (var i = 0; i < service_prof_data_services.length; i++) {
        var element = service_prof_data_services[i].split("&");
        if (element[6] === '1') {
            service_rule_table.row.add([element[0], element[1], element[2], service_list[element[2]], get_service_type(element[3]), 'Scheduled Shaping', pipe_schedule_list[element[4]], pipe_schedule_list[element[5]]]);
        } else {
            if (element[4] === '4294967295' || element[5] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], service_list[element[2]], get_service_type(element[3]), 'Block', '-', '-']);
            } else if (element[4] === '0' || element[5] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], service_list[element[2]], get_service_type(element[3]), 'Allow', '-', '-']);
            } else
                service_rule_table.row.add([element[0], element[1], element[2], service_list[element[2]], get_service_type(element[3]), 'Simple Shaping', pipe_list[element[4]], pipe_list[element[5]]]);
        }
    }
    service_rule_table.draw(false);
}

get_service_type = function (id) {
    if (id === '1') {
        return 'TCP';
    } else if (id === '2') {
        return 'UDP';
    } else if (id === '3') {
        return 'Any';
    }
};

function SetServiceTableModalElements() {
    init_service_list('#edit_service');
    var service_data = service_rule_table.row('.selected').data();
    $("#edit_service option").filter(function () {
        return this.text === service_data[3];
    }).prop('selected', true);
    $("#edit_service").attr('disabled', true);
    $("#edit_service_protocol option").filter(function () {
        return this.text === service_data[4];
    }).prop('selected', true);
    $("#edit_service_protocol").attr('disabled', true);
    $("#edit_service_action option").filter(function () {
        return this.text === service_data[5];
    }).prop('selected', true);

    $('#edit_service_pipes').children().detach();

    if (service_data[5] === 'Simple Shaping') {

        $('#edit_service_pipes').children().detach();
        $('#EditServiceModalContent').css({height: '360px'});
        var shapers = "<label class='drop_down_label'> Downlink Pipe : </label>" +
                "<select id='edit_service_dlink_pipe' class='field_prop'>" +
                "</select><br><br>" +
                "<label class='drop_down_label'> Uplink Pipe : </label>" +
                "<select id='edit_service_ulink_pipe' class='field_prop'>" +
                "</select>";

        $('#edit_service_pipes').append(shapers);
        init_user_pipes('#edit_service_dlink_pipe');
        init_user_pipes('#edit_service_ulink_pipe');
        $("#edit_service_dlink_pipe option").filter(function () {
            return this.text === service_data[6];
        }).prop('selected', true);
        $("#edit_service_ulink_pipe option").filter(function () {
            return this.text === service_data[7];
        }).prop('selected', true);


    } else if (service_data[5] === 'Scheduled Shaping') {
        $('#EditServiceModalContent').css({height: '310px'});
        var shapers = "<div id='edit_service_pipes'>" +
                "<label class='drop_down_label'> Scheduled Shaper : </label>" +
                "<select id='edit_service_pipe_schedule' class='field_prop'>" +
                "</select> <br>" +
                "</div>";

        $('#edit_service_pipes').append(shapers);
        init_pipe_schedules('#edit_service_pipe_schedule');

        $("#edit_service_pipe_schedule option").filter(function () {
            return this.text === service_data[6];
        }).prop('selected', true);

    } else {
        $('#EditServiceModalContent').css({height: '290px'});
    }
}

function setServiceListPortType(opt) {
    var plot = null;
    if (opt === "Port Range") {
        plot = "<label class='drop_down_label'> Port Range : </label>" +
                "<input id='addServLowPort' type='text' value='0' class='field_prop'><br>" +
                "<label style='margin-left: 250px' class='drop_down_label'> to </label><br>" +
                "<input id='addServHighPort' type='text' value='0' class='field_prop'><br><br>";
        $('#CreateNewServiceModalContent').css({height: '380px'});
    } else {
        plot = "<label class='drop_down_label'> Port No : </label>" +
                "<input id='addServPort' type='text' value='0' class='field_prop'> <br><br>";
        $('#CreateNewServiceModalContent').css({height: '335px'});
    }
    $('#appendServicePort').append(plot);
}

//Select element intialization            

function init_rule_elements() {
    $('#add_source,#add_destination,#add_app,#add_service_prof,#add_schedule').empty();
    $('#edit_source,#edit_destination,#edit_app,#edit_service_prof,#edit_schedule').empty();
    for (var u_item in address_list) {
        $('#add_source, #add_destination')
                .append($('<option>', {value: u_item})
                        .text(address_list[u_item]));
        $('#edit_source, #edit_destination')
                .append($('<option>', {value: u_item})
                        .text(address_list[u_item]));
    }

    for (var u_item in app_ctrl_list) {
        $('#add_app')
                .append($('<option>', {value: u_item})
                        .text(app_ctrl_list[u_item]));
        $('#edit_app')
                .append($('<option>', {value: u_item})
                        .text(app_ctrl_list[u_item]));
    }

//    $('#add_schedule')
//            .append($('<option>', {value: 0})
//                    .text('Anytime'));
//    $('#edit_schedule')
//            .append($('<option>', {value: 0})
//                    .text('Anytime'));

    for (var u_item in schedule_list) {
        $('#add_schedule')
                .append($('<option>', {value: u_item})
                        .text(schedule_list[u_item]));
        $('#edit_schedule')
                .append($('<option>', {value: u_item})
                        .text(schedule_list[u_item]));
    }

//    $('#add_service_prof')
//            .append($('<option>', {value: 0})
//                    .text('All'));
//    $('#edit_service_prof')
//            .append($('<option>', {value: 0})
//                    .text('All'));

    for (var u_item in service_prof) {
        $('#add_service_prof')
                .append($('<option>', {value: u_item})
                        .text(service_prof[u_item]));
        $('#edit_service_prof')
                .append($('<option>', {value: u_item})
                        .text(service_prof[u_item]));
    }

//    $('#add_url_prof')
//            .append($('<option>', {value: 0})
//                    .text('None'));
//    $('#edit_url_prof')
//            .append($('<option>', {value: 0})
//                    .text('None'));

    for (var u_item in url_prof) {
        $('#add_url_prof')
                .append($('<option>', {value: u_item})
                        .text(url_prof[u_item]));
        $('#edit_url_prof')
                .append($('<option>', {value: u_item})
                        .text(url_prof[u_item]));
    }
}

function init_service_list(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (service_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in service_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(service_list[u_item]));
    }
}

function init_user_pipes(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (pipe_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in pipe_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(pipe_list[u_item]));
    }
}

function init_pipe_schedules(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (pipe_schedule_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in pipe_schedule_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(pipe_schedule_list[u_item]));
    }
}

function init_url_list(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (url_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in url_list) {
        $(div).append($('<option>', {value: u_item})
                .text(url_list[u_item]));
    }
}

function init_schedule_list(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (schedule_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in schedule_list) {
        $(div).append($('<option>', {value: u_item})
                .text(schedule_list[u_item]));
    }
}

function init_addr_ip(div, any) {

    if (address_list.length > 0) {
        $(div).empty();
    }
    if (any) {
        $(div).append($('<option>', {value: 0})
                .text('Any'));
    }
    for (var u_item in address_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(address_list[u_item]));
    }
}

function init_addr_mac(div, any) {

    if (mac_list.length > 0) {
        $(div).empty();
    }
    if (any) {
        $(div).append($('<option>', {value: 0})
                .text('Any'));
    }
    for (var u_item in mac_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(mac_list[u_item]));
    }
}

function init_addr_ad_user(div, any) {

    if (rule_rmt_addr_user_list.length > 0) {
        $(div).empty();
    }
    if (any) {
        $(div).append($('<option>', {value: 0})
                .text('Any'));
    }
    for (var u_item in rule_rmt_addr_user_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(rule_rmt_addr_user_list[u_item]));
    }
}

function init_addr_ad_group(div, any) {

    if (ad_group_list.length > 0) {
        $(div).empty();
    }
    if (any) {
        $(div).append($('<option>', {value: 0})
                .text('Any'));
    }
    for (var u_item in ad_group_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(ad_group_list[u_item]));
    }
}

function init_addr_dhcp(div, any) {

    if (rule_rmt_addr_user_list.length > 0) {
        $(div).empty();
    }
    if (any) {
        $(div).append($('<option>', {value: 0})
                .text('Any'));
    }
    for (var u_item in rule_rmt_addr_user_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(rule_rmt_addr_user_list[u_item]));
    }
}

function init_addr_profile(div, any) {

    if (addr_prof.length > 0) {
        $(div).empty();
    }
    if (any) {
        $(div).append($('<option>', {value: 0})
                .text('Any'));
    }
    for (var u_item in addr_prof) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(addr_prof[u_item]));
    }
}

//Modal operations              

function Create(table) {

    var modal = null;
    var span = null;

//    $('#appendAddress').children().detach();
    $('#appendService').children().detach();

    switch (table) {
        case 1:
            modal = '#CreateRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 2:
            modal = '#CreateAddressModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 3:
            modal = '#CreateAppProfile';
            span = document.getElementsByClassName("close")[0];
            break;
        case 4:
            modal = '#CreateScheduleModal';
            span = document.getElementsByClassName("close")[0];
            setFormatRecur();
            break;
        case 5:
            modal = '#AddServiceRuleModal';
            span = document.getElementsByClassName("close")[1];
            init_service_list('#add_service');
            break;
        case 6:
            modal = '#CreateAdminPipeModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 8:
            modal = '#CreateURLName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 10:
            modal = '#CreateNewURL';
            span = document.getElementsByClassName("close")[0];
            break;
        case 11:
            modal = '#CreateNewService';
            span = document.getElementsByClassName("close")[0];
            break;
        case 12:
            modal = '#CreateServiceName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 14:
            modal = '#CreatePipeSchedulesModal';
            span = document.getElementsByClassName("close")[0];
            init_user_pipes('#add_shaper_to_sched');
            $("#add_shaper_to_sched option[value='0']").remove();
            $("#add_sched_to_pipe option[value='0']").remove();
            break;
        case 15:
            modal = '#CreateMacModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 16:
            modal = '#CreateAddrProfName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 17:
            modal = '#AddAddrProfModal';
            span = document.getElementsByClassName("close")[1];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (ACTIVE_AD) {
        $('.ad_display').show();
    }
    if (ACTIVE_DHCP) {
        $('.dhcp_display').show();
    }
}

function Edit(table) {

    var modal = null;
    var span = null;
    rowData = null;
    portCount = 0;

    $('#editAddress').children().detach();
//    $('#editService').children().detach();
//    $('#appendService').children().detach();
    $('#editSchedule').children().detach();

    switch (table) {
        case 1:
            modal = '#EditRuleModal';
            span = document.getElementsByClassName("close")[1];
            EditRuleTableModal();
            break;
        case 2:
            modal = '#EditAddressModal';
            span = document.getElementsByClassName("close")[1];
            SetAddressTableModalElements(address_table.row('.selected').data()[2], 'edit', 'editAddress', 'editAddressToSystem');
            EditAddressTableModal();
            break;

        case 4:
            modal = '#EditScheduleModal';
            span = document.getElementsByClassName("close")[1];
            EditScheduleTableModalElements('editSchedule');
            EditScheduleTableModal();
            break;

        case 5:
            modal = '#EditServiceModal';
            span = document.getElementsByClassName("close")[2];
            SetServiceTableModalElements();
            break;

        case 6:
            modal = '#EditAdminPipeModal';
            span = document.getElementsByClassName("close")[1];
            set_pipe_table_modal_elements();
            break;
        case 14:
            modal = '#EditPipeSchedulesModal';
            span = document.getElementsByClassName("close")[1];
            SetPipeScheduleTableModalElements();
            $("#add_shaper_to_sched option[value='0']").remove();
            $("#edit_sched_to_pipe option[value='0']").remove();
            break;
        case 15:
            modal = '#EditMacModal';
            span = document.getElementsByClassName("close")[1];
            set_mac_table_modal_elements();
            break;
        default:
            alert("Unable to Delete entry in the Table!");
    }
//    console.log(document.getElementsByClassName("close"))
    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (ACTIVE_AD) {
        $('.ad_display').show();
    }
    if (ACTIVE_DHCP) {
        $('.dhcp_display').show();
    }
}

function Delete(table) {

    switch (table) {
        case 1:
            delete_wo_rule((rule_table.row('.selected').data())[1]);
            break;
        case 2:
            delete_wo_address((address_table.row('.selected').data())[0]);
            break;
        case 3:
            delete_wo_app_ctrl_name((app_prof_table.row('.selected').data())[0]);
            app_rule_table.clear().draw();
            break;
        case 4:
            delete_ml_schedule((schedule_table.row('.selected').data())[0]);
            break;
        case 5:
            delete_wo_service_from_prof((service_rule_table.row('.selected').data())[0], service_prof_id);
            break;
        case 6:
            delete_wo_shaper((admin_pipe_table.row('.selected').data())[0]);
            break;
        case 7:
            delete_wo_app_ctrl(app_ctrl_prof_id, (app_rule_table.row('.selected').data())[0]);
            break;
        case 8:
            delete_wo_url_prof((url_prof_table.row('.selected').data())[0]);
            url_rule_table.clear().draw();
            break;
        case 9:
            delete_wo_url_from_prof((url_rule_table.row('.selected').data())[0], url_prof_id);
            break;
        case 10:
            delete_wo_url_from_list((url_list_table.row('.selected').data())[0]);
            break;
        case 11:
            delete_wo_service_from_list((service_list_table.row('.selected').data())[0]);
            break;
        case 12:
            delete_wo_service_prof((service_prof_table.row('.selected').data())[0]);
            break;
        case 13:
//            delete_wo_service_from_prof((service_rule_table.row('.selected').data())[0], service_prof_id);
//            break;
        case 14:
            delete_wo_sched_shaper((pipe_schedules_table.row('.selected').data())[0]);
            break;
        case 15:
            delete_wo_mac_from_list((mac_list_table.row('.selected').data())[0]);
            break;
        case 16:
            delete_wo_addr_prof((addr_prof_table.row('.selected').data())[0]);
            break;
        case 17:
            delete_wo_addr_from_prof((addr_prof_content_table.row('.selected').data())[0], (addr_prof_content_table.row('.selected').data())[1]);
            break;
        default:
            alert("Unable to delete data!");
    }
    Clear();
}

function Clear() {
    $('.edit, .delete').attr('disabled', true);
    $('.create').attr('disabled', false);
    selectedRowCount = 0;
}

///////////////////////////////////     

function Display_Rule_Monitor_Table() {
    rule_monitor_table.clear().draw();

    for (var i = 0; i < rule_mon_list.length; i++) {
        var element = rule_mon_list[i].split("&");
        rule_monitor_table.row.add([element[0], 0, 0, 0, 0, 0, 0, '']);
    }
    rule_monitor_table.draw(false);
}

btn_rule_bw_load_now = function (id) {
    if (id === 2) {
        $("#rule_lv_bwm_plot").css("z-index", 10);
        $("#rule_av_bwm_plot").css("z-index", -10);
    } else {
        $("#rule_av_bwm_plot").css("z-index", 10);
        $("#rule_lv_bwm_plot").css("z-index", -10);
    }
};

create_live_rule_mon_graph = function () {

    return  lssd_graph_init(LSRC_UPDATE, "rule_lv_bwm_plot",
            "rule_av_bwm_plot",
            '#a8334d',
            '#008000',
            "#pq_rule_monitor_ulink_usage",
            "#pq_rule_monitor_dlink_usage",
            "");
};

enable_table_controls = function (table) {

    $('#' + table).on('click', 'tbody tr', function () {

        var delay = 1;
        setTimeout(function () {
            if (selectedTableRowCount === 1) {
                $('.edit,.delete').removeAttr('disabled');
                $('.create').attr('disabled', 'disabled');
            } else if (selectedTableRowCount === 0) {
                $('.create').removeAttr('disabled');
                $('.edit,.delete').attr('disabled', 'disabled');
            } else {
                alert("Incorrect Input");
            }
        }, delay);
    });
};

disable_table_del_ref = function (table, table_name, disable_secondary) {

    $('#' + table).on('click', 'tbody tr', function () {

        var delay = 1;
        setTimeout(function () {

            var data = table_name.row('.selected').data();
            if (data) {
                if (parseInt(data[data.length - 1]) > 0) {
                    $('.delete').attr('disabled', true);
                } else {
                    $('.delete').attr('disabled', false);
                }
            }
            if (disable_secondary) {
                $('#' + disable_secondary).attr('disabled', true);
            }
        }, delay);
    });
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//CJS Request Status
var CJS_REQUEST_START = 1;
var CJS_REQUEST_END = 2;

//Connector Update Status
var LIST_UPDATE = 11;
var GRAPH_UPDATE = 12;
var SESSION_UPDATE = 13;
var DIAGRAM_UPDATE = 14;
var SETTINGS_UPDATE = 15;
var INFORMATION_UPDATE = 16;
var GUI_SHEETS = 20;

//Request Connector Request ID [can collide with live connector]
var GRAPH_VBH_UPDATE = 5;
var LIST_VMW_UPDATE = 6;
var LIST_VHW_UPDATE = 7;
var SESSION_LIST_UPDATE = 8;
var SESSION_SOURCE_UPDATE = 9;
var SESSION_DEST_UPDATE = 10;
var SESSION_APP_UPDATE = 11;
var GRAPH_BH_UPDATE = 12;
var GRAPH_BHN_UPDATE = 13;
var GRAPH_BHP_UPDATE = 14;
var SESSION_SVS_UPDATE = 79;

//Diagram Types
var CLIENT_DIAGRAM = 15;
var SERVER_DIAGRAM = 16;
var SESSION_DIAGRAM = 17;
var TRAFFIC_DIAGRAM = 18;
var APP_DIAGRAM = 22;
var SVS_DIAGRAM = 81;

//Summery Updates for Dashboard
var SUMRY_SDC_UPDATE = 19;
var SUMRY_SRC_UPDATE = 20;
var SUMRY_APP_UPDATE = 21;
var SUMRY_DEST_UPDATE = 76;

//Summery Updates for Live Watch
var LSUMRY_UPDATE = 53;

//Live Summery Update Types
var LSUM_SRC_T_APP = 1;
var LSUM_SRC_T_DEST = 2;
var LSUM_APP_T_SRC = 3;
var LSUM_APP_T_DEST = 4;
var LSUM_DES_T_APP = 5;
var LSUM_DES_T_SRC = 6;
var LSUM_SVS_T_SRC = 7;
var LSUM_SVS_T_DEST = 8;
var LSUM_SRC_T_SVS = 9;
var LSUM_DES_T_SVS = 10;

///Detailed Reporting

var DTR_UPDATE = 21;
var DTR_GEN_REQUEST = 152;
var DTR_URL_REQUEST = 153;

var PQDTR_REQ_TOP_SRC = 1;
var PQDTR_REQ_TOP_DST = 2;
var PQDTR_REQ_TOP_APP = 3;
var PQDTR_REQ_TOP_SES = 4;
var PQDTR_REQ_BANDW = 5;
var PQDTR_REQ_TOP_PORTS = 6;

//Settings Update Types
var TIMESTAMP_UPDATE = 17;

//Information Request Type
var INFO_MANW_ST_RQ = 20;
var INFO_MANW_CT_RQ = 21;
var INFO_SETW_RQ = 22;
var INFO_DASH_NOTIFIC = 24;

//GUI sheets
var MENUBAR_SHEET = 82;
var PROPERTY_SHEET = 83;

//Live Connector Request ID
var LBW_UPDATE = 5;
var LVBW_UPDATE = 6;
var LFBW_UPDATE = 7;
var LSES_UPDATE = 8;
var LSRC_UPDATE = 9;
var LDES_UPDATE = 10;
var LSVBW_UPDATE = 11;
var LAPP_UPDATE = 12;
var LABW_UPDATE = 15;
var LTAPPU_UPDATE = 16;
var LSVS_UPDATE = 18;
var LTSDROP_UPDATE = 19;
var LURLSTAT_UPDATE = 20;
var LURLDATA_UPDATE = 21;
var LTUSERAPP_UPDATE = 29;
var LVABW_UPDATE = 30;

//Client DIAGRAM Types
var SCD_TRAFIC = 1;
var SCD_SESSIONS = 2;
var SCD_DELAY = 3;

//History Data Get Types
var HIST_TYPE_MINE = 11;
var HIST_TYPE_NEXT = 12;
var HIST_TYPE_PREV = 13;

//VLAN Plot types
var VLAN_ONE_MSEC = 0;
var VLAN_TEN_SEC = 1;

//Get Active Directory User List

var NA_GET_RADDR_ITEM_LIST = 179;
var NA_GET_RGROUP_ITEM_LIST = 181;

//SET Active Directory Profile Configurations

var NA_AD_CONF_PROFILE_ADD = 182;
var NA_AD_CONF_PROFILE_UPDATE = 183;
var NA_AD_CONF_PROFILE_SETDEF = 184;
var NA_AD_CONF_PROFILE_DELETE = 185;
var NA_GET_AD_CONF_PROFILE_LIST = 186;

//DHCP Profile Configurations [ACJS Requests & Replies]

var NA_DHCP_CONF_PROFILE_ADD = 187; 
var NA_DHCP_CONF_PROFILE_UPDATE = 188; 
var NA_DHCP_CONF_PROFILE_SETDEF = 189;
var NA_DHCP_CONF_PROFILE_DELETE = 190; 
var NA_GET_DHCP_CONF_PROFILE_LIST = 191; 

//Remote addressing types

var PQ_NA_REMAD_TYPE_AD_USER = 1;
var PQ_NA_REMAD_TYPE_AD_GROUP = 2;
var PQ_NA_REMAD_TYPE_DHCP_USER = 3;

//System Update Operations

var PDEV_UPDATE_STATE = 136;
var PDEV_CHECK_UPDATE = 137;
var PDEV_CHECK_UPDATE_OPERATION = 138;
var WO_GET_VERSION_INFO = 139;
var PDEV_SET_UPDATE_EMAIL = 140;
var PDEV_UPDATE_RETRY = 141;
var PDEV_INSTALL_OFFLINE_UPDATE = 149;
var PDEV_INSTALL_LICENSE = 150;
var PDEV_SWITCH_ONLINE_UPDATE = 151;
var PDEV_INSTALL_SIGNATURE_FILE = 163; 

//Window IDs
var CURRENT_WINDOW = 0;
var WINDOW_LINK_SUMMARY = 1;
var WINDOW_DASH_SOURCE = 2;
var WINDOW_DASH_DEST = 3;
var WINDOW_DASH_APP = 4;
var WINDOW_DASH_SERV = 5;
var WINDOW_APP_LINK_UTIL = 6;
var WINDOW_SERV_LINK_UTIL = 7;
var WINDOW_SES_SES = 8;
var WINDOW_SES_SOURCE = 9;
var WINDOW_SES_DEST = 10;
var WINDOW_SES_APP = 11;
var WINDOW_SES_SERV = 12;
var WINDOW_TRAFFIC = 13;
var WINDOW_NOTIFIC = 14;
var WINDOW_RULES = 15;
var WINDOW_OBJ_ADDRESS = 16;
var WINDOW_OBJ_APPLICATIONS = 17;
var WINDOW_OBJ_PIPE_SCHEDULES = 18;
var WINDOW_OBJ_SCHEDULE = 19;
var WINDOW_OBJ_SERVICE = 20;
var WINDOW_OBJ_SERVICE_LIST = 21;
var WINDOW_OBJ_PIPES = 22;
var WINDOW_OBJ_URL = 23;
var WINDOW_OBJ_URL_LIST = 24;
var WINDOW_RULE_MON = 25;
var WINDOW_QUOTA = 26;
var WINDOW_QUOTA_APP_PROFILES = 27;
var WINDOW_QUOTA_URL_PROFILES = 28;
var WINDOW_QUOTA_SERV_PROFILES = 48;
var WINDOW_QUOTA_PROFILES = 29;
var WINDOW_QUOTA_APP_QUOTA = 30;
var WINDOW_QUOTA_USAGE = 31;
var WINDOW_BW_HIST = 32;
var WINDOW_REPORT = 33;
var WINDOW_IP_USAGE = 34;
var WINDOW_MANAGEMENT = 35;
var WINDOW_PROFILE = 36;
var WINDOW_APP_SIG = 37;
var WINDOW_SETTINGS = 38;
var WINDOW_MAINTENANCE = 39;
var WINDOW_CONFIGURATION = 40;
var WINDOW_LIVE_SESSION_WATCH = 41;
var WINDOW_LIVE_SERVER_WATCH = 42;
var WINDOW_LIVE_URL_WATCH = 43;
var WINDOW_DETAILED_IP_USAGE = 44;
var WINDOW_APP_LINK_UTIL_USER = 45;
var WINDOW_OBJ_APP_LIST = 46;
var WINDOW_SYSTEM_UPDATES = 47;

var WINDOW_OBJ_ADDRESS_PROFILES = 51;
var WINDOW_OBJ_ADDRESS_IP = 52;
var WINDOW_OBJ_ADDRESS_MAC = 53;
var WINDOW_OBJ_ADDRESS_AD = 54;
var WINDOW_OBJ_ADDRESS_DHCP = 69;

var WINDOW_QUOTA_USAGE_DET = 55;

var WINDOW_REPORT_BANDWIDTH = 56;
var WINDOW_REPORT_SUMMARY = 57;
var WINDOW_REPORT_SRC = 58;
var WINDOW_REPORT_DES = 59;
var WINDOW_REPORT_APP = 60;
var WINDOW_REPORT_PORT = 61;
var WINDOW_REPORT_DET_SRC = 62;
var WINDOW_REPORT_DET_DES = 63;
var WINDOW_REPORT_DET_APP = 64;
var WINDOW_REPORT_DET_PORT = 65;

var WINDOW_LDAP_SERVER = 66;
var WINDOW_DHCP_SERVER = 67;
var WINDOW_DASH_VLAN = 68;

//Bar Chart Drill-down
//var YEARLY = 1;
//var MONTHLY = 2;
//var DAILY = 3;
//var HOURLY = 4;

var pieColorScheme = ["#690f0f", "#191948", "#012e44", "#af2458", "#cc5216", "#d89c07", "#d8c44e", "#9b5dcc", 
    "#438de2", "#1e987a"];

//var pieColorScheme_10 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#db530f",
//    "#8F00FF", "#0000FF"];

var pieColorScheme_10 = ["#690f0f", "#191948", "#012e44", "#af2458", "#cc5216", "#d89c07", "#d8c44e", "#9b5dcc", 
    "#438de2", "#1e987a"];

var pieColorScheme_20 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF",
    "#0000FF", "#30D5C8", "#138808", "#FFDB58", "#FF0000", "#8B008B", "#000080", "#007BA7", "#FFB347", "#00755E",
    "#db530f", "#FFFF31"];

var pieColorScheme_30 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF",
    "#0000FF", "#30D5C8", "#138808", "#FFDB58", "#FF5A36", "#FF0000", "#8B008B", "#000080", "#007BA7", "#00755E",
    "#FFFF31", "#FFB347", "#66FF00", "#966FD6", "#FCF75E", "#E52B50", "#9400D3", "#0000EE", "#00FFFF", "#008000",
    "#FF00FF", "#FFBF00"];

var pieColorScheme_40 = ["#800000", "#191970", "#30D5C8", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF", "#007FFF",
    "#00CD00", "#FFDF00", "#FF5A36", "#FF007F", "#6495ED", "#138808", "#966FD6", "#FF0000", "#800080", "#00009C",
    "#00CC99", "#FFFF31", "#FF8C00", "#FFDB58", "#E30022", "#9400D3", "#0000EE", "#00755E", "#FF6700", "#76EE00",
    "#7CFC00", "#E30B5D", "#012e44", "#008000", "#FF1C00", "#A7FC00", "#00FFFF", "#D1E231", "#FCF75E", "#FFBF00",
    "#FF00FF", "#03C03C"];

var pieColorScheme_50 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF",
    "#0000FF", "#30D5C8", "#138808", "#FFDB58", "#FF5A36", "#FF0000", "#8B008B", "#000080", "#007BA7", "#00755E",
    "#FFFF31", "#FFB347", "#66FF00", "#966FD6", "#FCF75E", "#E52B50", "#9400D3", "#0000EE", "#00FFFF", "#008000",
    "#FFBF00", "#FF6700", "#D1E231", "#7CFC00", "#FF1C00", "#E30022", "#800080", "#00009C", "#6495ED", "#00CD00",
    "#FFDF00", "#FF8C00", "#A7FC00", "#E30B5D", "#007FFF", "#7FFFD4", "#03C03C", "#CB410B", "#FF007F", "#76EE00",
    "#FF00FF", "#FF3800"];

//var application_list = ['Unknown', 'Facebook', 'YouTube', 'Skype', 'Dropbox', 'Twitter', 'Viber', 'WhatsApp',
//    'Google-Analytics', 'Instagram', 'Gmail', 'Amazon', 'Wikipedia', 'Microsoft-Updates', 'Foursquare',
//    'Flickr', 'LinkedIn', 'Yahoo', 'Bing', 'Google Play', 'Google Drive', 'Hangouts', '9Gag', 'Mozilla', 'Netflix',
//    'TeamViewer', 'OneDrive', 'Google Plus', 'ESPN', 'Google Maps'];

var application_list = [];
var pq_services_list = [];

var pq_2_16_32 = function (one, two) {
    var merged = one + (two << 16);
    return merged;
};

var pq_1_16_2_8_32 = function (one, two, three) {
    var merged = one + (two << 16) + (three << 24);
    return merged;
};

var pq_4_8_32 = function (one, two, three, four) {
    var merged = one + (two << 8) + (three << 16) + (four << 24);
    return merged;
};

var pq_2_32_64 = function (one, two) {

};

var pq_32_4_8 = function (val) {
    var d = {
        one: val & 0xFF,
        two: (val >> 8) & 0xFF,
        three: (val >> 16) & 0xFF,
        four: (val >> 24) & 0xFF
    };
    return d;
};

var pq_32_2_16 = function (val) {
    var d = {
        one: val & 0xFFFF,
        two: (val >> 16) & 0xFFFF
    };
    return d;
};

var pq_32_1_16_2_8 = function (val) {
    var d = {
        one: val & 0xFFFF,
        two: (val >> 16) & 0xFF,
        three: (val >> 24) & 0xFF
    };

    return d;
};

var pq_32_2_8_1_16 = function (val) {
    var d = {
        one: (val >> 16) & 0xFFFF,
        two: (val >> 8) & 0xFF,
        three: (val) & 0xFF
    };

    return d;
};

function dot2num(dot)
{
    var d = dot.split('.');
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}

function dot2numR(dot)
{
    var d = dot.split('.');
    return ((((((+d[3]) * 256) + (+d[2])) * 256) + (+d[1])) * 256) + (+d[0]);
}

function num2dot(num)
{
    var d = num % 256;
    for (var i = 3; i > 0; i--)
    {
        num = Math.floor(num / 256);
        d = num % 256 + '.' + d;
    }
    return d;
}

function num2dotR(num)
{
    var d = num % 256;
    for (var i = 3; i > 0; i--)
    {
        num = Math.floor(num / 256);
        d = d + '.' + num % 256;
    }
    return d;
}

function var2num(st) {
    return +st;
}

function pq_pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var get_T_time = function (date) {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString().slice(0, -5);
};

var get_Ts_time = function (date) {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString().slice(0, -8);
};

var pq_get_usage = function (data) {
    if (data >= 1000000000000) { //T
        return (data / 1000000000000).toFixed(2) + ' TB';
    } else if (data >= 1000000000) { //G
        return (data / 1000000000).toFixed(2) + ' GB';
    } else if (data >= 1000000) { //M
        return (data / 1000000).toFixed(2) + ' MB';
    } else if (data >= 1000) { // K
        return (data / 1000).toFixed(2) + ' KB';
    } else { //Bytes
        return (data / 1.0).toFixed(2) + ' B';
    }
};

var pq_get_file_size = function (data) {
    if (data >= 1024 * 1024 * 1024 * 1024) { //T
        return (data / 1024 * 1024 * 1024 * 1024).toFixed(2) + ' TB';
    } else if (data >= (1024 * 1024 * 1024)) { //G
        return (data / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (data >= 1024 * 1024) { //M
        return (data / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (data >= 1024) { // K
        return (data / 1024).toFixed(2) + ' KB';
    } else { //Bytes
        return (data / 1.0).toFixed(2) + ' B';
    }
};

var pq_get_usage_det_rep = function (data) {
    if (data >= 1000000000000) { //T
        return (data / 1000000000000).toFixed(0) + ' TB';
    } else if (data >= 1000000000) { //G
        return (data / 1000000000).toFixed(0) + ' GB';
    } else if (data >= 1000000) { //M
        return (data / 1000000).toFixed(0) + ' MB';
    } else if (data >= 1000) { // K
        return (data / 1000).toFixed(0) + ' KB';
    } else { //Bytes
        return (data / 1.0).toFixed(0) + ' B';
    }
};

function gen_random_colour() {
    var color = '#' + Math.random().toString(16).substr(2, 6);
    return  color;
}

pq_rgbToHex = function(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

function rgbToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};


var bw_decode = function (bw) {
    var type = bw >> 30;
    var a_bw = bw && 0x3FFFFFFF;
    var bw_c = {
        type: type,
        bw: a_bw
    };
    return bw_c;
};

var uint32_float = function (val) {
    var uvals = new Uint32Array(1);
    uvals[0] = val;
    var fvals = new Float32Array(uvals.buffer);
    return  fvals[0];
};

function validateMac(mac) {
    var patt = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
    var result = patt.test(mac);
    return result;
}

var MacAddressToInt = function (mac) {
    var mac_elements = mac.split(":");
    if (mac_elements.length === 6) {
        var one = (parseInt(mac_elements[0], 16) << 8) + parseInt(mac_elements[1], 16);
        var two = (parseInt(mac_elements[2], 16) << 24) + (parseInt(mac_elements[3], 16) << 16) + (parseInt(mac_elements[4], 16) << 8) + parseInt(mac_elements[5], 16);
        var d = {
            uo: one,
            ut: two
        };
        return d;
    }
    return 'error';
};

var IntToMacAddress = function (mo, mt) {
    var mac = pq_pad((mt >> 8).toString(16), 2) + ':' + pq_pad((mt & 0x00FF).toString(16), 2) + ":" +
            pq_pad((mo >>> 24).toString(16), 2) + ':' + pq_pad(((mo >> 16) & 0x00FF).toString(16), 2) + ':' + pq_pad(((mo >> 8) & 0x00FF).toString(16), 2) +
            ':' + pq_pad(((mo) & 0x00FF).toString(16), 2);
    return mac;
};

pq_dygraph_tooltip = function () {
    return {"backgroundColor": "#FFFFFF",
        "border": "1px solid #006ACB",
        "borderRadius": "5px",
        "boxShadow": "1px 1px 4px #CCCCCC",
        "fontFamily": "Lucida Grande , Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif",
        "fontSize": "12px",
        "fontWeight": "normal",
        "opacity": "0.85",
        "padding": "3px"};
};

y_axis_bw_val_formatter = function (bw, precision) {
    var data = (bw * 1000 * 1000);
    var val;
    if (data >= 1000000000) { //G
        val = (data / 1000000000).toFixed(precision) + ' Gbps';
    } else if (data >= 1000000) { //M
        val = (data / 1000000).toFixed(precision) + ' Mbps';
    } else if (data >= 1000) { // K
        val = (data / 1000).toFixed(precision) + ' Kbps';
    } else { //Bytes
        val = (data).toFixed(precision) + ' bps';
    }
    return val;
};

function closeModalInit(type) {
    switch (type) {
        case 1:
            $('.close').on('click', function () {
                $('.close').parent().parent().hide();
            });
            break;
        case 2:
            $('.statusModalButton').on('click', function () {
                $('.statusModalButton').parent().parent().parent().hide();
            });
            break;            
    }
}

function app_serv_dissect(id) {
    if (id >= application_list.length) {
        return pq_services_list[parseInt(id - 65536)];
    } else
        return application_list[id];
}

function getIpRangeFromAddressAndNetmask(ip, subnet) {
    var ipaddress = ip.split('.');
    var netmaskblocks = ["0", "0", "0", "0"];
    if (!/\d+\.\d+\.\d+\.\d+/.test(subnet)) {
        // part[1] has to be between 0 and 32
        netmaskblocks = ("1".repeat(parseInt(subnet, 10)) + "0".repeat(32 - parseInt(subnet, 10))).match(/.{1,8}/g);
        netmaskblocks = netmaskblocks.map(function (el) {
            return parseInt(el, 2);
        });
    } else {
        // xxx.xxx.xxx.xxx
        netmaskblocks = subnet.split('.').map(function (el) {
            return parseInt(el, 10);
        });
    }
      var invertedNetmaskblocks = netmaskblocks.map(function(el) { return el ^ 255; });
      var baseAddress = ipaddress.map(function(block, idx) { return block & netmaskblocks[idx]; });
      var broadcastaddress = ipaddress.map(function(block, idx) { return block | invertedNetmaskblocks[idx]; });
      return [baseAddress.join('.'), broadcastaddress.join('.')];    
}
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
    /*
     * We open the websocket encrypted if this page came on an
     * https:// url itself, otherwise unencrypted
     */
    if (u.substring(0, 5) == "https") {
        pcol = "wss://";
        u = u.substr(8);
    } else {
        pcol = "ws://";
        if (u.substring(0, 4) == "http")
            u = u.substr(7);
    }
    u = u.split('/');
    /* + "/xxx" bit is for IE10 workaround */
//    return pcol + "192.168.1.232:8081" + "/xxx"
//    return pcol + "192.168.1.232:8081" + "/xxx"    
//    return pcol + "192.168.1.234:8081" + "/xxx"        
//    return pcol + "192.248.9.46:8081" + "/xxx"
//    if (u[0] === "192.168.1.128:8383" || u[0] === "localhost:8383") {
//        return pcol + "192.168.1.128:8081" + "/xxx"
//    }
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
    var req = new Uint32Array(10);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.link;
    req[2] = req_data.chanel;
    req[4] = req_data.s_date / 4294967296;
    req[3] = req_data.s_date - (req[4] * 4294967296);
    var rec_time = new Date(4294967296 * req[3] + req[4]);
    req[6] = req_data.e_date / 4294967296;
    req[5] = req_data.e_date - (req[6] * 4294967296);
    req[7] = req_data.min_bw;
    req[8] = req_data.log;
    req[9] = req_data.vid;
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
                drawPoints: true,
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

    bwh_plot[id].resize();
    bwh_dbuff[id] = [];
    bwh_cbuff[id].length = 0;
    bwh_vname[id].length = 0;
    validate_hist_data_availability(id, data[1]);
    bwh_ref_time[id] = new Date(4294967296 * data[4] + data[3]);
    bwh_prev_tspan = 0;
    bwh_graph_type = data[2];
    bwhist_prv_ts[id] = 0;
    bwhist_prv_csc_cnt[id] = 0;

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


    bwh_plot[id + 1].resize();
    bwh_dbuff[id + 1] = [];
    bwh_cbuff[id + 1].length = 0;
    bwh_vname[id + 1].length = 0;
    validate_hist_data_availability(id + 1, data[1]);
    bwh_ref_time[id + 1] = new Date(4294967296 * data[4] + data[3]);
    bwh_point_buff.length = 0;
};

bwh_update = function (id, data) {
    if (data.length % 4 === 0) {
        for (var i = 0; i < data.length; i = i + 4) {
            var bw_s = uint32_float(data[i]);
            var bw_r = uint32_float(data[i + 1]);
            var comp_id = data[i + 2];
            var tstamp = data[i + 3];
            if (tstamp > 0) {
                //Add Data to Graph
                var time = new Date(bwh_ref_time[id].getTime() + tstamp);

                if (bwh_prev_tspan !== 0) {
                    if ((time - bwh_prev_tspan) >= bwh_max_free_tspan) {
                        var time_p = new Date(bwh_prev_tspan.getTime() + bwh_max_free_tspan / 2);
                        var time_n = new Date(time.getTime() - bwh_max_free_tspan / 2);
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
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = bwh_prev_tspan;
                    bwhist_prv_csc_cnt[id]++;
                    if (bwhist_prv_csc_cnt[id] > 3) {
                        bwh_dbuff[id].pop();
                        bwhist_prv_ts[id] = time;
                    }
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

// VLAN List
var vlan_discovary_count = 0;
var vlan_discovary_lable = [];
var vlan_mw_show_status = [];
var vlan_list = [];

var vlist_make_request = function (req_data) {
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.lid);
    return req.buffer;
};

vlist_update_start = function (id) {
    if (id === LIST_VHW_UPDATE) {
        //clear_pq_vlan_indicator_item('.pq_vlan_ind_holder');
    } else if (id === LIST_VMW_UPDATE) {
//        pqitem.clear_vlan_items('#PQ_Vlan_List');
        vlan_discovary_count = 0;
        vlan_list = [];
        vlan_discovary_lable.length = 0;
        vlan_mw_show_status.length = 0;
    } else {
        console.log('undefined vlan List update');
    }
};

vlist_update = function (id, data) {
    if (id === LIST_VHW_UPDATE) {
        if (data.length % 2 === 0) {
            for (var i = 0; i < data.length; i = i + 2) {
                var vid = data[i];
                var vcolor = data[i + 1];
                //console.log("vid : " + vid + "  color: " + vcolor);
                if (vid !== 0 && vid < 4095) {
                    //Add Data to List
                    var vclr = pq_rgbToHex(vcolor & 0xFF, (vcolor & 0xFF00) >>> 8, (vcolor & 0xFF0000) >>> 16);
                    //add_pq_vlan_indicator_item('.pq_vlan_ind_holder', 'vlan ' + vid, vclr);
                    $('#pq_bwh_vlan_selector')
                            .append($('<option>', {value: vid})
                                    .text("VLAN " + vid));
                }
            }
        } else {
            console.log('Invalied Vlan List Data');
        }
    } else if (id === LIST_VMW_UPDATE) {
        if (data.length % 2 === 0) {
            for (var i = 0; i < data.length; i = i + 2) {
                var vid = data[i];
                var vcolor = data[i + 1];
                vlan_list.push(vid);
//                console.log("vid : " + vid + "  color: " + vcolor + typeof vid);

                if (vid !== 0 && vid !== 4095) {
                    vlan_discovary_count++;
                    vlan_discovary_lable.push(vid);
                    //Add Data to List
                    var vclr = pq_rgbToHex(vcolor & 0xFF, (vcolor & 0xFF00) >>> 8, (vcolor & 0xFF0000) >>> 16);
//                    var vclr = rgbToHex(vcolor);

                    vlan_mw_show_status[vid] = 1;
                    if (vid !== 8191) {
                        $("#PQ_Vlan_List").append("<input type='radio' style='margin-left: 10px; margin-top: 5px' id='vlanid_" + get_vlan_id(vid) + "' name='vlan_ids' value='" + get_vlan_id(vid) + "'><label for='vlanid_" + get_vlan_id(vid) + "'>vlan " + get_vlan_id(vid) + "</label><br>");
//                        pqitem.add_vlan_item("#PQ_Vlan_List", vid, 'vlan_item_change', "vlan [" + vid + "]", vclr, true);
//                        $('#pq_bwh_vlan_selector')
//                                .append($('<option>', {value: vid})
//                                        .text("vlan [" + vid + "]"));
                    } else {
                        vlan_mw_show_status[4095] = 1;
//                        pqitem.add_vlan_item("#PQ_Vlan_List", vid, 'vlan_item_change', "non-vlan", vclr, true);
                        $("#PQ_Vlan_List").append("<input type='radio' style='margin-left: 10px; margin-top: 5px;' id='vlanid_" + get_vlan_id(vid) + "' name='vlan_ids' value='" + get_vlan_id(vid) + "'><label for='vlanid_" + get_vlan_id(vid) + "'>Non-vlan</label><br>");
                    }
                }
            }
        } else {
            console.log('Invalied Vlan List Data');
        }

    } else {
        console.log('undifine vlan List update');
    }
};

vlist_update_end = function (id) {
    if (id === LIST_VHW_UPDATE) {

    } else if (id === LIST_VMW_UPDATE) {

        if (CURRENT_WINDOW === WINDOW_DASH_VLAN) {
            init_dash_vlan_window();
        } else if (CURRENT_WINDOW === WINDOW_BW_HIST) {

            if (vlan_list.length > 0) {
                $('#pq_bwh_vlan_selector').empty();
            }
            $('#pq_bwh_vlan_selector').append($('<option>', {value: 4095})
                    .text('None'));

            for (var i = 0; i < vlan_list.length; i++) {

                if (vlan_list[i] > 4095) {
                    $('#pq_bwh_vlan_selector')
                            .append($('<option>', {value: 4096})
                                    .text("Non-VLAN"));
                } else {
                    $('#pq_bwh_vlan_selector')
                            .append($('<option>', {value: vlan_list[i]})
                                    .text("VLAN " + vlan_list[i]));
                }
            }
        } else {
            console.log('undifine vlan List update');
        }
    }
};

// All Sessions List

var max_session_data_point = 0;
var max_session_count = 0;
var url_discovery_count = 0;
var url_discovery_que_id = 0;

var all_sessions_make_request = function (req_data) {
    var req = new Uint32Array(9);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.lid);
    req[1] = 0;
    req[2] = req_data.loc;
    req[3] = req_data.sip;
    req[4] = req_data.dip;
    req[5] = pq_2_16_32(req_data.sport, req_data.dport);
    req[6] = pq_1_16_2_8_32(req_data.vid, req_data.prot, req_data.app);
    req[7] = req_data.sipr;
    req[8] = req_data.dipr;
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
    var v_indicate;
    if (data.length % 8 === 0) {
        for (var i = 0; i < data.length; i = i + 8) {
            var protocol = (data[i + 3] >>> 16) & 0xFF;
            var vid = data[i + 3] & 0xFFFF
            if (protocol === 6) {
                protocol = 'TCP';
            } else {
                protocol = 'UDP';
            }
            var app_id = data[i + 3] >>> 24;
            var flow_count = 1;
            v_indicate = vid + "";

            if (vid === 8191 || vid === 4095) {
                v_indicate = "non-vlan";
            }

            var app_name;
            if (data[i + 6] < application_list.length) {
                app_name = application_list[data[i + 6]];
            } else {
                app_name = pq_services_list[data[i + 6] - application_list.length + 1];
            }
            session_table.row.add([num2dot(data[i]), '-', num2dot(data[i + 1]), (data[i + 2] & 0xFFFF), (data[i + 2] >>> 16), protocol, v_indicate, app_name, data[i + 4], data[i + 5], max_session_data_point, data[i + 6]]);
        }
    } else {
        console.log('Invalid Sesson Data');
    }
};

all_sessions_update_end = function (id) {
    if (url_discovery_count > 0) {
        q_sessions_update_with_url(session_table, 1);
    } else {
        hide_update_indicator('#pq_session_ud_indicator');
        session_table.draw(false);
    }
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
    if (data.length % 4 === 0) {
        if (type === SESSION_SOURCE_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                source_table.row.add([num2dot(data[i]), "_", data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count]);
            }
        } else if (type === SESSION_DEST_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                destination_table.row.add([num2dot(data[i]), "_", data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count]);
            }
        } else if (type === SESSION_APP_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                if (data[i] >= application_list.length) {
                    app_table.row.add([pq_services_list[data[i] - application_list.length + 1], data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
                } else {
                    app_table.row.add([application_list[data[i]], data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
                }
            }
        } else if (type === SESSION_SVS_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                ses_service_table.row.add([pq_services_list[data[i]], data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
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

q_smry_update_start = function (data) {
//console.log(data)
    smy_ob_src_items = data[1];
    smy_ob_des_items = data[2] + smy_ob_src_items;
    smy_ob_app_items = data[3] + smy_ob_des_items;
    smy_ob_prt_items = data[4] + smy_ob_app_items;

    dash_que_id = data[5];
    dash_ad_count = data[6];
    data_pq_sum_srcs_ip = [];
    data_pq_sum_dests_ip = [];

    data_pq_sum_srcs.length = 0;
    data_pq_sum_dests.length = 0;
    data_pq_sum_apps.length = 0;
    smy_ob_read_count = 0;
};

q_smry_update = function (data) {

    for (var i = 0; i < data.length; i = i + 4) {
        smy_ob_read_count++;
        if (smy_ob_read_count <= smy_ob_src_items) {
//            console.log("src: " +num2dot(data[i]));
            data_pq_sum_srcs.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            data_pq_sum_srcs_ip.push(num2dot(data[i]));
        } else if (smy_ob_read_count <= smy_ob_des_items) {
//            console.log(num2dot(data[i]));
            data_pq_sum_dests.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            data_pq_sum_dests_ip.push(num2dot(data[i]));
        } else if (smy_ob_read_count <= smy_ob_app_items) {
            //console.log(num2dotR(data[i]));
            if (data[i] > 0) {
                data_pq_sum_apps.push({label: application_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            }
        } else {
            var prot = data[i] >>> 16;
            var port = data[i] & 0xFFFF;
            //console.log(data[i + 1] + " " + port + "  " + prot);
        }
    }
};

q_smry_update_end = function (data) {

    if (CURRENT_WINDOW !== WINDOW_LINK_SUMMARY) {
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
        var ad_elements = data.split(";");
        for (var usr_count = 0; usr_count < ad_elements.length - 1; usr_count++) {
            if (ad_elements[usr_count] !== "") {
                if (usr_count < 10) {
                    data_pq_sum_srcs[usr_count].label = ad_elements[usr_count];
                } else if (usr_count < 20) {
                    data_pq_sum_dests[usr_count - 10].label = ad_elements[usr_count];
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
//    console.log(data)
    smy_dashPie_ulink_items = data[1];
    smy_dashPie_dlink_items = data[2] + smy_dashPie_ulink_items;

    dash_que_id = data[5];
    dash_ad_count = data[6];

    total_data_sent_dashPie = (uint32_float(data[3]) / 8) * 1000000;
    total_data_received_dashPie = (uint32_float(data[4]) / 8) * 1000000;
    data_dashPie_dlink.length = 0;
    data_dashPie_ulink.length = 0;
    smy_dashPie_read_count = 0;
    smy_ob_src_dlink_read_count = 0;
};

q_smry_dashPie_update = function (data) {

    dashPie_dlink_table.clear().draw();
    dashPie_ulink_table.clear().draw();

    for (var i = 0; i < data.length; i = i + 4) {

        smy_dashPie_read_count++;
        if (smy_dashPie_read_count <= smy_dashPie_ulink_items) {

            if (dashPieCat === 3) {
                data_dashPie_ulink.push({label: application_list[data[i]], value: (uint32_float(data[i + 2]) * 1000000) / 8, color: pieColorScheme[smy_dashPie_read_count - 1]});
                dashPie_ulink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,5)'>" + application_list[data[i]] + "</a>", pq_get_usage((uint32_float(data[i + 2]) * 1000000) / 8), (((uint32_float(data[i + 2]) * 1000000) / 8) * 100 / total_data_sent_dashPie).toFixed(2) + ' %']);
            } else {
                data_dashPie_ulink.push({label: num2dot(data[i]), value: (uint32_float(data[i + 2]) * 1000000) / 8, color: pieColorScheme[smy_dashPie_read_count - 1]});
                dashPie_ulink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,parseInt(dashPieCat+2))'>" + num2dot(data[i]) + "</a>", pq_get_usage((uint32_float(data[i + 2]) * 1000000) / 8), (((uint32_float(data[i + 2]) * 1000000) / 8) * 100 / total_data_sent_dashPie).toFixed(2) + ' %']);
            }

        } else if (smy_dashPie_read_count <= smy_dashPie_dlink_items) {

            smy_ob_src_dlink_read_count++;

            if (dashPieCat === 3) {

                if (dashPie_obj_flag) {
                    dashPie_obj_flag = false;
                    init_max_srcDestAppServ_dlink = application_list[data[i]];
                    dashPie_clk_seg = init_max_srcDestAppServ_dlink;
                }
                data_dashPie_dlink.push({label: application_list[data[i]], value: (uint32_float(data[i + 3]) * 1000000) / 8, color: pieColorScheme[smy_ob_src_dlink_read_count - 1]});
                dashPie_dlink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,5)'>" + application_list[data[i]] + "</a>", pq_get_usage((uint32_float(data[i + 3]) * 1000000) / 8), (((uint32_float(data[i + 3]) * 1000000) / 8) * 100 / total_data_received_dashPie).toFixed(2) + ' %']);
            } else {

                if (dashPie_obj_flag) {
                    dashPie_obj_flag = false;
                    init_max_srcDestAppServ_dlink = num2dot(data[i]);
                    dashPie_clk_seg = init_max_srcDestAppServ_dlink;
                }
                data_dashPie_dlink.push({label: num2dot(data[i]), value: (uint32_float(data[i + 3]) * 1000000) / 8, color: pieColorScheme[smy_ob_src_dlink_read_count - 1]});
                dashPie_dlink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,parseInt(dashPieCat+2))'>" + num2dot(data[i]) + "</a>", pq_get_usage((uint32_float(data[i + 3]) * 1000000) / 8), (((uint32_float(data[i + 3]) * 1000000) / 8) * 100 / total_data_received_dashPie).toFixed(2) + ' %']);
            }

        } else {
            var prot = data[i] >>> 16;
            var port = data[i] & 0xFFFF;
            //console.log(data[i + 1] + " " + port + "  " + prot);
        }
    }
};

q_smry_src_update_end = function (data) {

//    var tbd = null;
//    var tbu = null;
//
//    if (CURRENT_WINDOW !== WINDOW_DASH_SOURCE) {
//        tbd = null;
//        tbu = null;
//    } else if (CURRENT_WINDOW !== WINDOW_DASH_DEST) {
//
//    }


    if (smy_dashPie_ulink_items > 0) {
        if (dash_ad_count > 0) {
            q_smry_dashPie_update_with_ad_users();
        } else {
            dashPie_ulink_table.draw(false);
            pie_pq_dashPie_ulink.updateProp("data.content", data_dashPie_ulink);
        }
    }
    if (smy_dashPie_dlink_items > smy_dashPie_ulink_items) {
        dashPie_dlink_table.draw(false);
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
//        console.log(data)
//        var element = data.split(";");
//        dash_ad_elements = data.split(";");
        var dashPie_ad_elements = data.split(";");

        var num_rows_tbd = dashPie_dlink_table.rows().count();
        var num_rows_tbu = dashPie_ulink_table.rows().count();

        for (var elm_count = 0; elm_count < num_rows_tbd; elm_count++) {
            if (num_rows_tbd >= elm_count && dashPie_ad_elements[smy_dashPie_ulink_items + elm_count] !== '') {
                dashPie_dlink_table.cell(elm_count, 1).data(dashPie_ad_elements[smy_dashPie_ulink_items + elm_count]);
            }
        }
        for (var elm_count = 0; elm_count < num_rows_tbu; elm_count++) {
            if (num_rows_tbu >= elm_count && dashPie_ad_elements[elm_count] !== '') {
                dashPie_ulink_table.cell(elm_count, 1).data(dashPie_ad_elements[elm_count]);
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
    for (var i = 0; i < data.length; i = i + 4) {
        if (data[i] >= 0) {
            if (type == LSUM_DES_T_APP || type == LSUM_SRC_T_APP) {
                data_pq_live_usage.push({label: application_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            } else if (type == LSUM_DES_T_SVS || type == LSUM_SRC_T_SVS) {
                data_pq_live_usage.push({label: pq_services_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            } else {
                data_pq_live_usage.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            }
        }
    }
};

lsumry_update_end = function (data) {
    if (data_pq_live_usage.length > 0) {
//        if (CURRENT_WINDOW != WINDOW_LIVE_SERVER_WATCH) {
//            return;
//        }
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


//
//lsumry_update_start = function (data) {
//    var applications = data[1];
//    data_pq_live_usage.length = 0;
//};
//
//lsumry_update = function (type, data) {
//    for (var i = 0; i < data.length; i = i + 4) {
//        if (data[i] >= 0) {
//            if (type == LSUM_DES_T_APP || type == LSUM_SRC_T_APP) {
//                data_pq_live_usage.push({label: application_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
//            } else if (type == LSUM_DES_T_SVS || type == LSUM_SRC_T_SVS) {
//                data_pq_live_usage.push({label: pq_services_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
//            } else {
//                data_pq_live_usage.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
//            }
//        }
//    }
//};
//
//lsumry_update_end = function (data) {
//    if (data_pq_live_usage.length > 0) {
////        if (sc_window_id == 0) {
//        pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 10);
////        } else if (sc_window_id == 1) {
////            pie_pq_lruw_usage_wrap.update_summery_pie(pie_pq_lruw_usage_id, 10);
////        }
//    }
//};


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
    var req = new Uint32Array(3);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.ip;
    req[2] = pq_2_16_32(req_data.mask, 0);
    return req.buffer;
    //console.log(req_data.mask,req[2])
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
    if (data.length % 5 != 0) {
        act_length--;
    }
    if (act_length % 5 === 0) {
        sc_diagram_parent_que.push(data);
        sc_diagram_parent_id = id;
        sc_diagram_parent_type = type;
    } else {
        console.log('Invalid SC-Diagram Data');
    }
};

sc_diagram_run_collective_update = function () {

    while (sc_diagram_parent_que.length > 0) {
        var data = sc_diagram_parent_que.shift();
        var act_length = data.length;
        if (data.length % 5 !== 0) {
            act_length--;
        }

        for (var i = 0; i < act_length; i = i + 5) {
            //console.log(data[i]);
            var url = '';
            if (sc_diagram_url_element.length > 0) {
                url = sc_diagram_url_element.shift();
            }
            var ip = data[i];
            var count = data[i + 2];// >>> 16;
            var port = data[i + 1];//& 0xFFFF;
            var data_w;
            var port_id = port;

            if (sc_diagram_parent_id === SCD_TRAFIC) {
                data_w = 1 + ((uint32_float(data[i + 3]) + uint32_float(data[i + 4])) * 1000000) / 8;
                if (sc_diagram_mask < 32) {
                    port_id = num2dot(port);
                    if (sc_diagram_start_type === CLIENT_DIAGRAM) {
                        if (url !== '') {
                            port_id = port_id + " (" + url + ")";
                        }
                    }
                } else {
                    port_id = "port: " + (pq_pad(port, 5, '0') + "");
                }
                //console.log(port_id)
            } else if (sc_diagram_parent_id === SCD_SESSIONS) {
                data_w = 1 + count;
                if (sc_diagram_mask < 32) {
                    port_id = num2dot(port);
                    if (sc_diagram_start_type === CLIENT_DIAGRAM) {
                        if (url !== '') {
                            port_id = port_id + " (" + url + ")";
                        }
                    }
                } else {
                    port_id = "port: " + (pq_pad(port, 5, '0') + "");
                }
            } else {
                data_w = 1 + port;
                if (sc_diagram_mask < 32) {
                    port_id = num2dot(count);
                    if (sc_diagram_start_type === CLIENT_DIAGRAM) {
                        if (url !== '') {
                            port_id = url + " (" + port_id + ")";
                        }
                    }
                    port_id = port_id + " - " + port;
                }
                port_id = port_id + ' ms';
            }

            if (pre_ip !== ip) { //New Server Node
                var ip_node_name = num2dot(ip);
                if (sc_diagram_start_type === CLIENT_DIAGRAM && sc_diagram_mask < 32) {

                } else {
                    if (url !== '') {
                        ip_node_name = ip_node_name + " (" + url + ")";
                    }
                }
                sc_sd_diagram.nodes.push({
                    "name": ip_node_name,
                    "id": num2dot(ip)
                });
                if (sc_digram_colors[num2dot(ip)] == null) {
                    sc_digram_colors[num2dot(ip)] = randomColor({
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
            pre_ip = ip;
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

    var req = new Uint32Array(7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.sip;
    req[2] = req_data.dip;
    req[3] = pq_2_16_32(req_data.sport, req_data.dport);
    req[4] = pq_1_16_2_8_32(req_data.vid, req_data.prot, req_data.app);
    req[5] = req_data.sipr;
    req[6] = req_data.dipr;
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
    if (data.length % 4 === 0) {
        tc_diagram_parant_que.push(data);
        tc_diagram_parant_type = type;
    } else {
        console.log('Invalid TC-Diagram Data');
    }
};

tc_diagram_collective_update = function () {
    while (tc_diagram_parant_que.length > 0) {
        var data = tc_diagram_parant_que.shift();
        for (var i = 0; i < data.length; i = i + 4) {
            var user = '';
            var url = '';
            if (tc_diagram_url_element.length > 0) {
                user = tc_diagram_url_element.shift();
                url = tc_diagram_url_element.shift();
            }
            var ip_src = num2dot(data[i]);
            var ip_node_name = num2dot(data[i + 1]);
            if (user !== '') {
                ip_src = user;
                tc_diagram_ad_user_map[user] = num2dot(data[i]);
                if (tc_dgam_colours[user] == null) {
                    tc_dgam_colours[user] = randomColor({
                        luminosity: 'bright'
                    });
                }
            } else {
                if (tc_dgam_colours[num2dot(data[i])] == null) {
                    tc_dgam_colours[num2dot(data[i])] = randomColor({
                        luminosity: 'bright'
                    });
                }
            }
            if (url !== '') {
                ip_node_name = url + " (" + ip_node_name + ")";
            }
            tc_dgam_data.push([ip_src, ip_node_name, (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8]);
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


//var turl_discovery_count = 0;
//var turl_discovery_que_id = 0;
//var tc_diagram_parant_que = [];
//var tc_diagram_parant_id = 0;
//var tc_diagram_parant_type = 0;
//var tc_diagram_url_element = [];
//
//var tc_diagram_make_request = function (req_data) {
//
//    var req = new Uint32Array(7);
//    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
//    req[1] = req_data.sip;
//    req[2] = req_data.dip;
//    req[3] = pq_2_16_32(req_data.sport, req_data.dport);
//    req[4] = pq_1_16_2_8_32(req_data.vid, req_data.prot, req_data.app);
//    req[5] = req_data.sipr;
//    req[6] = req_data.dipr;
//    return req.buffer;
//};
//
//tc_diagram_update_start = function (type, id, d_url_que_id, d_url_dis_count) {
//    turl_discovery_count = d_url_dis_count;
//    turl_discovery_que_id = d_url_que_id;
//    tc_dgam_data.length = 0;
//    tc_diagram_parant_que.length = 0;
//};
//
//trafic_diagram_update = function (type, data) {
//    if (data.length % 4 === 0) {
//        tc_diagram_parant_que.push(data);
//        tc_diagram_parant_type = type;
//    } else {
//        console.log('Invalid TC-Diagram Data');
//    }
//};
//
//tc_diagram_collective_update = function () {
//    while (tc_diagram_parant_que.length > 0) {
//        var data = tc_diagram_parant_que.shift();
//        for (var i = 0; i < data.length; i = i + 4) {
//            var url = '';
//            if (tc_diagram_url_element.length > 0) {
//                url = tc_diagram_url_element.shift();
//            }
//            var ip_node_name = num2dot(data[i + 1]);
//            if (url != '') {
//                ip_node_name = url + " (" + ip_node_name + ")";
//            }
//            tc_dgam_data.push([num2dot(data[i]), ip_node_name, (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8]);
//            if (tc_dgam_colours[num2dot(data[i])] == null) {
//                tc_dgam_colours[num2dot(data[i])] = randomColor({
//                    luminosity: 'bright'
//                });
//                //console.log(num2dot(data[i]));
//            }
//        }
//    }
//};
//
//tc_diagram_update_with_url = function (table, col_id) {
//    var cookie = $.cookie('pqsf');
//    var req = new Uint32Array(1);
//    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, turl_discovery_que_id); // request url listing
//    $.ajax({
//        data: req.buffer,
//        processData: false,
//        headers: {"PARAQUMTEC": cookie},
//        timeout: 1000,
//        type: 'POST',
//        url: '/'
//    }).done(function (data) {
//        tc_diagram_url_element = data.split(";");
//        tc_diagram_collective_update();
//        draw_trafic_diagram();
//    }).fail(function () {
//        tc_diagram_collective_update();
//        draw_trafic_diagram();
//    });
//};
//
//session_diagram_update = function (type, data) {
//
//};
//
//tc_diagram_update_end = function (type, id) {
//    sc_diagram_parent_que
//    if (type == TRAFFIC_DIAGRAM) {
//        if (turl_discovery_count > 0) {
//            tc_diagram_update_with_url();
//        } else {
//            tc_diagram_collective_update();
//            draw_trafic_diagram();
//        }
//
//    } else if (type == SESSION_DIAGRAM) {
//
//    }
//
//};

//Settings - Time GAP Update

//var tgap_change_request = function (req_data) {
//    var req = new Uint32Array(2);
//    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
//    req[1] = req_data.tgap;
//    return req.buffer;
//};
//tgap_update_start = function (type) {
//    console.log("time_gap_update_start");
//};
//tgap_update_end = function (type) {
//    console.log("time_gap_update_end");
//};

//Informations-Request

var info_get_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
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
    var data_c = new Uint8Array(row_data);
    if (type === MENUBAR_SHEET) {
//        console.log(data_c)
        if (data_c[0] === 11) {
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
                $('#Reports_Panel').show();
            }
            if (data_c[8]) {
                $('#Quota_Panel').show();
            }
            if (data_c[9]) {
                vlan_enable = true;
                $('#dash_vlan').show();
            }
            if (data_c[10]) {
                $('.ad_display').show();
                ACTIVE_AD = true;
            }
            if (data_c[11]) {
                $('.dhcp_display').show();
                ACTIVE_DHCP = true;
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

        if (type === GRAPH_VBH_UPDATE) {
            cjs_req_conn.send(bwvh_make_request(request));
        } else if (type === LIST_VMW_UPDATE || type === LIST_VHW_UPDATE) {
            cjs_req_conn.send(vlist_make_request(request));
        } else if (type === SESSION_LIST_UPDATE ||
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
        } else if (type === TIMESTAMP_UPDATE) {
            cjs_req_conn.send(tgap_change_request(request));
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
            if (req[0] === GRAPH_VBH_UPDATE) {
                cjs_req_conn.send(bwvh_make_request(req[1]));
            } else if (req[0] === LIST_VMW_UPDATE || req[0] === LIST_VHW_UPDATE) {
                cjs_req_conn.send(vlist_make_request(req[1]));
            } else if (req[0] === SESSION_LIST_UPDATE ||
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
            } else if (req[0] === TIMESTAMP_UPDATE) {
                cjs_req_conn.send(tgap_change_request(req[1]));
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
    if (data_q.length === 1 || data_q.length === 3 || data_q.length === 5 || data_q.length === 7) { //request component
        var rep = pq_32_4_8(data_q[0]);
        if (rep.one === CJS_REQUEST_START) {
            cjs_request_type = rep;
            if (rep.two === GRAPH_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === GRAPH_VBH_UPDATE) {
                    bwvh_update_start(rep.four, data_q);
                } else if (rep.three === GRAPH_BH_UPDATE) {
                    bwh_update_start(rep.four, data_q);
                }
            } else if (rep.two === LIST_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === LIST_VHW_UPDATE || rep.three === LIST_VMW_UPDATE) {
                    vlist_update_start(rep.four);
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
            } else if (rep.two === SETTINGS_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === TIMESTAMP_UPDATE) {
                    tgap_update_start(rep.four);
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
                console.log("unknown request start");
            }

        } else if (rep.one === CJS_REQUEST_END) {
            cjs_request_type = rep;
            if (rep.two === GRAPH_UPDATE) {
                if (rep.three === GRAPH_VBH_UPDATE) {
                    bwvh_update_end(rep.four);
                } else if (rep.three === GRAPH_BH_UPDATE) {
                    bwh_update_end(rep.four);
                }
            } else if (rep.two === LIST_UPDATE) {
                if (rep.three === LIST_VHW_UPDATE || rep.three === LIST_VMW_UPDATE) {
                    vlist_update_end(rep.four);
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
        if (cjs_request.two === GRAPH_UPDATE) { //graph update

            if (cjs_request.three === GRAPH_VBH_UPDATE) { //update graph type
                var graph_id = cjs_request.four;
                bwvh_update(graph_id, data_q);
            } else if (cjs_request.three === GRAPH_BH_UPDATE) { //update graph type
                var graph_id = cjs_request.four;
                bwh_update(graph_id, data_q);
            }

        } else if (cjs_request.two === LIST_UPDATE) {
            if (cjs_request.three === LIST_VHW_UPDATE || cjs_request.three === LIST_VMW_UPDATE) {
                vlist_update(cjs_request.four, data_q);
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
};var lu_plot = [];
var lu_dbuff = [];
var lu_cbuff = [];
var lu_color = [];
var lu_vname = [];
var lu_ref_time = [];
var lu_last_update_time = [];
//var lu_vlan_id = [];
var lu_vlan_d_id = [];
var lu_vlan_u_id = [];

var lu_bwg_prv_ts = [];
var lu_bwg_prv_csc_cnt = [];

var lcju_make_auth_req = function (req_data) {
    var cmd_buffer = new ArrayBuffer(4 * 1 + req_data.gid.length);
    var req = new Uint32Array(cmd_buffer, 0, 1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, 0, 0);
    var bemail = new Uint8Array(cmd_buffer, 4, req_data.gid.length);
    for (var cit = 0; cit < req_data.gid.length; cit++) {
        bemail[cit] = req_data.gid.charCodeAt(cit);
    }
    return cmd_buffer;
};

//Live Bandwidth Updates

var lbwu_make_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = pq_2_16_32(req_data.link, req_data.chanel);
    return req.buffer;
};

var lbwu_graph_init = function (div, color, gid) {

    if (lu_dbuff[gid] == null) {
        var data = [];
        data.push([0, 0]);
        lu_dbuff[gid] = data;
        lu_ref_time[gid] = 0;
        var clr = [];
        clr.push([color]);
        lu_cbuff[gid] = clr;
        lu_vname[gid] = [];
        lu_color[gid] = [color];
        lu_last_update_time[gid] = 0;
    }

    var graph = new Dygraph(document.getElementById(div), lu_dbuff[gid], lu_cbuff[gid], 0, gid,
            {
                animatedZooms: true,
                drawPoints: true,
                drawGrid: false,
                showRoller: false,
                axisLabelFontSize: 10,
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {
                    y: {
                        axisLabelWidth: 55,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            return x_axis_formatter(x);
                        }
                    }
                }
            });

    lu_plot[gid] = graph;
    return  gid;
};

var labwu_graph_init = function (div, color, gid) {

    if (lu_dbuff[gid] == null) {
        var data = [];
        data.push([0, 0]);
        lu_dbuff[gid] = data;
        lu_ref_time[gid] = 0;
        var clr = [];
        clr.push([color]);
        lu_cbuff[gid] = clr;
        lu_vname[gid] = [];
        lu_color[gid] = [color];
        lu_last_update_time[gid] = 0;
    }

    var graph = new Dygraph(document.getElementById(div), lu_dbuff[gid], lu_cbuff[gid], 0, gid,
            {
                animatedZooms: true,
                drawGrid: false,
                showRoller: false,
                fillGraph: true,
                plotter: smoothPlotter,
                color: color,
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axisLabelFontSize: 10,
                axes: {
                    y: {
                        axisLabelWidth: 55,
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
                }
            });
    lu_plot[gid] = graph;
    return  gid;
};

lbwu_update_start = function (id, data) {
    lu_plot[id].resize();
    lu_ref_time[id] = new Date(4294967296 * data[4] + data[3]);
//    console.log('lbwu - lvbwu time update: ' + lu_ref_time[id]);
    lu_dbuff[id] = [];
    lu_cbuff[id].length = 0;
    lu_bwg_prv_ts[id] = 0;
    lu_bwg_prv_csc_cnt[id] = 0;
    lu_last_update_time[id] = 0;
//    lu_vlan_id[id] = [];
//    lu_vlan_d_id = [];
//    lu_vlan_u_id = [];
};

lbwu_update_lables = function (tstamp) {
    $("#mw_uplink_bw_ind").text("Uplink Bandwidth (Mbps - " + tstamp + " ms)");
    $("#mw_downlink_bw_ind").text("Downlink Bandwidth (Mbps - " + tstamp + " ms)");
    $("#sw_uplink_bw_ind").text("Uplink Bandwidth (Mbps - " + tstamp + " ms)");
    $("#sw_downlink_bw_ind").text("Downlink Bandwidth (Mbps - " + tstamp + " ms)");
};

lbwu_update = function (id, data) {
    if (data.length % 2 === 0) {
        var time;
        for (var i = 0; i < data.length; i = i + 2) {
            var bw = uint32_float(data[i]); //(data[i] * 8 / (1000));
            //var bw_f = uint32_float(data[i]);
            var tstamp = data[i + 1];
            if (tstamp > 0 && bw < 60000) {
                //Add Data to Graph
                time = new Date(lu_ref_time[id].getTime() + tstamp);
                if (bw < 30000) {
                    lu_dbuff[id].push([time, bw]);
                }
                if (lu_cbuff[id].length <= 1400) {
                    lu_cbuff[id].push(lu_color[id]);
                }
                //Remove Old Points from Graph
                if (lu_dbuff[id].length > 1400) {
                    lu_dbuff[id].shift();
                }
            }
            if (bw == 60000) {
                lu_dbuff[id] = [];
                lbwu_update_lables(tstamp);
            }
        }
        //Render the Graph
        if (time - lu_last_update_time[id] >= 1000) {
            lu_last_update_time[id] = time;
            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

labwu_update = function (id, data) {
    if (data.length % 2 === 0) {
        var time;
        for (var i = 0; i < data.length; i = i + 2) {
            var bw = uint32_float(data[i]); //(data[i] * 8 / (1000));
            //var bw_f = uint32_float(data[i]);
            var tstamp = data[i + 1];
//            console.log(tstamp)
            if (tstamp > 0 && bw < 60000) {
                //Add Data to Graph
                time = new Date(tstamp * 1000);

                if (lu_bwg_prv_ts[id] !== 0) {
                    if ((time - lu_bwg_prv_ts[id]) >= 30000) {
                        var time_p = new Date(lu_bwg_prv_ts[id] + 10000 / 2);
                        var time_n = new Date(time.getTime() - 10000 / 2);
                        lu_dbuff[id].push([time_p, 0]);
                        lu_dbuff[id].push([time_n, 0]);
                    }
                }
                if (time >= lu_bwg_prv_ts[id]) {
                    lu_bwg_prv_ts[id] = time;
                    lu_bwg_prv_csc_cnt[id] = 0;
                    lu_dbuff[id].push([time, bw]);

                    if (lu_cbuff[id].length <= 1400) {
                        lu_cbuff[id].push(lu_color[id]);
                    }
                    //Remove Old Points from Graph
                    if (lu_dbuff[id].length > 1400) {
                        lu_dbuff[id].shift();
                    }
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = lu_last_update_time[id];
                    lu_bwg_prv_csc_cnt[id]++;
                    if (lu_bwg_prv_csc_cnt[id] > 3) {
                        lu_dbuff[id].pop();
                        lu_bwg_prv_ts[id] = time;
                    }
                }
            }
        }
        //Render the Graph
        if (time - lu_last_update_time[id] >= 1000) {
            lu_last_update_time[id] = time;
            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

lbwu_update_end = function (id) {
};

/// LOLC temp
//
//labwu_update_temp = function (id, data) {
//    if (data.length % 2 === 0) {
//        var time;
//        for (var i = 0; i < data.length; i = i + 2) {
//            var bw = uint32_float(data[i]); //(data[i] * 8 / (1000));
//            //var bw_f = uint32_float(data[i]);
//            var tstamp = data[i + 1];
////            console.log(tstamp)
//            if (tstamp > 0 && bw < 60000) {
//                //Add Data to Graph
//                time = new Date(tstamp * 10000);
//
//                if (lu_bwg_prv_ts[id] !== 0) {
//                    if ((time - lu_bwg_prv_ts[id]) >= 30000) {
//                        var time_p = new Date(lu_bwg_prv_ts[id] + 10000 / 2);
//                        var time_n = new Date(time.getTime() - 10000 / 2);
//                        lu_dbuff[id].push([time_p, 0]);
//                        lu_dbuff[id].push([time_n, 0]);
//                    }
//                }
//                if (time >= lu_bwg_prv_ts[id]) {
//                    lu_bwg_prv_ts[id] = time;
//                    lu_bwg_prv_csc_cnt[id] = 0;
//                    lu_dbuff[id].push([time, bw]);
//
//                    if (lu_cbuff[id].length <= 1400) {
//                        lu_cbuff[id].push(lu_color[id]);
//                    }
//                    //Remove Old Points from Graph
//                    if (lu_dbuff[id].length > 1400) {
//                        lu_dbuff[id].shift();
//                    }
//                } else {
////                    console.log("tstamp_skip: " + time);
//                    time = lu_last_update_time[id];
//                    lu_bwg_prv_csc_cnt[id]++;
//                    if (lu_bwg_prv_csc_cnt[id] > 3) {
//                        lu_dbuff[id].pop();
//                        lu_bwg_prv_ts[id] = time;
//                    }
//                }
//            }
//        }
//        //Render the Graph
//        if (time - lu_last_update_time[id] >= 1000) {
//            lu_last_update_time[id] = time;
//            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
//        }
//    } else {
//        console.log('Invalid Live Bandwidth Data');
//    }
//};




// Vlan plot update

var lvabwu_make_request = function (req_data) {
    var req = new Uint32Array(3);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = pq_2_16_32(req_data.link, req_data.chanel);
    req[2] = pq_2_16_32(req_data.vid, req_data.vtype);
    return req.buffer;
};

var lvbwu_graph_init = function (div, color, gid) {

    if (lu_dbuff[gid] == null) {
        var data = [];
        data.push([0, 0]);
        lu_dbuff[gid] = data;
        lu_ref_time[gid] = 0;
        var clr = [];
        clr.push([color]);
        lu_cbuff[gid] = clr;
        lu_vname[gid] = [];
        lu_color[gid] = [color];
        lu_last_update_time[gid] = 0;
    }

    var graph = new Dygraph(document.getElementById(div), lu_dbuff[gid], lu_cbuff[gid], 0, gid,
            {
                animatedZooms: true,
                drawPoints: true,
                drawGrid: false,
                showRoller: false,
                axisLabelFontSize: 10,
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {
                    y: {
                        axisLabelWidth: 55,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            return vlan_x_axis_formatter(x, gid);
                        }
                    }
                }
            });

    lu_plot[gid] = graph;
    return  gid;
};

var lv_data_keep = [];
lvbwu_update = function (id, data) {
//    if (CURRENT_WINDOW != WINDOW_DASH_VLAN) {
//        return;
//    }
    if (data.length % 4 === 0) {
        var time;
        for (var i = 0; i < data.length; i = i + 4) {
            var bw = (data[i] * 8 / 1000);
            var tstamp = data[i + 1];
            var vcount = data[i + 2] >> 16;
            var vid = data[i + 2] & 0xFFF;
            var vcolor = data[i + 3];
//            console.log("VID " + vid)
            if (tstamp > 0 && vid != 0) {
                if (vlan_mw_show_status[vid] != 1) {
                    bw = 0;
                }

                //Add Data to Graph
                time = new Date(lu_ref_time[id].getTime() + tstamp);
                lu_dbuff[id].push([time, bw]);
//                lu_vlan_id[id].push([time, vid]);

                if (id === 4) {
                    lu_vlan_d_id.push([lu_ref_time[id].getTime() + tstamp, vid]);
                } else {
                    lu_vlan_u_id.push([lu_ref_time[id].getTime() + tstamp, vid]);
                }

                if (lv_data_keep.length < vcount) {
                    //Fill The Array
                    for (var vc = lv_data_keep.length; vc < vcount + 1; vc++) {
                        lv_data_keep.push("none");
                    }
                }

                if (lv_data_keep[vcount] === "none") { //vlan discovary
                    if (color_gen[vcount] != undefined) {
                        lv_data_keep[vcount] = color_gen[vcount];
                    } else
                        lv_data_keep[vcount] = pq_rgbToHex(vcolor & 0xFF, (vcolor & 0xFF00) >> 8, (vcolor & 0xFF0000) >> 16);
                    //console.log("vlan :" + vid + "  " + lv_data_keep[vcount]);
                }

                lu_cbuff[id].push([lv_data_keep[vcount]]);
                //Remove Old Points from Graph
                if (lu_dbuff[id].length > 1400) {
                    lu_dbuff[id].shift();
                    lu_cbuff[id].shift();
                }
                if (lu_vlan_d_id.length > 2000) {
                    lu_vlan_d_id.shift();
                }
                if (lu_vlan_u_id.length > 2000) {
                    lu_vlan_u_id.shift();
                }
            }
        }
        //Rander the Graph
        if (time - lu_last_update_time[id] >= 1000 && CURRENT_WINDOW == WINDOW_DASH_VLAN) {
            lu_last_update_time[id] = time;
            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

//Live SSD Updates
var lssd_plot = [];
var lssd_dbuff = [];
var lssd_cbuff = [];
var lssd_color = [];
var lssd_label = [];
var lssd_status_bar = [];
var lssd_tbw = [];
var lssd_pkt = [];
var lssd_ref_time = [];
var lssd_last_update_time = [];
var lssd_update_status = [];
var lssd_prev_tspan = 0;
var lssd_remove_points = [];

lssd_chart_plotter = function (e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    // This should really be based on the minimum gap
    var bar_width = 2;// 2 / 3 * (points[1].canvasx - points[0].canvasx);
    //ctx.fillStyle = e.color;

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
        ctx.fillStyle = e.dygraph.pqcolor[i][e.pqmcolor];
        ctx.fillRect(center_x - bar_width / 2, p.canvasy,
                bar_width, y_bottom - p.canvasy);
//        ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
//                bar_width, y_bottom - p.canvasy);
    }
};

var lssd_make_request = function (req_data) {

    var req = new Uint32Array(5);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.sip;
    req[2] = req_data.dip;
    req[3] = pq_2_16_32(req_data.sport, req_data.dport);
    req[4] = pq_1_16_2_8_32(req_data.vid, req_data.prot, req_data.app);
//    console.log(req)
    return req.buffer;
};

var lssd_graph_init = function (type, div_s, div_r, div_s_av, div_r_av, color_s, color_r, lbl_s, lbl_r, status_bar, gid) {

    var data = [];
    var clr_s = [];
    var clr_r = [];
    if (type == LSES_UPDATE) {
        data.push([0, 0]);
        clr_s.push([color_s]);
        clr_r.push([color_r]);
        lssd_color[gid] = [color_s];
        lssd_color[gid + 1] = [color_r];
        lssd_color[gid + 2] = [color_s];
        lssd_color[gid + 3] = [color_r];
    } else {
        data.push([0, 0, 0]);
        clr_s.push([color_r, color_s]);
        clr_r.push([color_r, color_s]);
        lssd_color[gid] = [color_r, color_s];
        lssd_color[gid + 1] = [color_s, color_r];
    }
    lssd_dbuff[gid] = data;
    lssd_dbuff[gid + 1] = data;
    lssd_dbuff[gid + 2] = data;
    lssd_dbuff[gid + 3] = data;
    lssd_ref_time[gid] = 0;
    lssd_cbuff[gid] = clr_s;
    lssd_cbuff[gid + 1] = clr_r;
    lssd_cbuff[gid + 2] = clr_s;
    lssd_cbuff[gid + 3] = clr_r;
    lssd_label[gid] = [$(lbl_s)];
    lssd_label[gid + 1] = [$(lbl_r)];
    lssd_status_bar[gid] = [$(status_bar)];
    lssd_status_bar[gid + 1] = [$(status_bar)];
    lssd_tbw[gid] = 0;
    lssd_tbw[gid + 1] = 0;
    lssd_update_status[gid] = false;
    lssd_update_status[gid + 1] = false;
    lssd_last_update_time[gid] = 0;
    lssd_last_update_time[gid + 1] = 0;

    if (type == LSES_UPDATE) {

        var ms_graph_send = new Dygraph(document.getElementById(div_s), lssd_dbuff[gid], lssd_cbuff[gid], 0, gid,
                {
                    drawPoints: true,
                    showRoller: false,
                    plotter: lssd_chart_plotter,
                    labels: ['Time', 'Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 55,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });

        var ms_graph_receive = new Dygraph(document.getElementById(div_r), lssd_dbuff[gid + 1], lssd_cbuff[gid + 1], 0, (gid + 1),
                {
                    drawPoints: true,
                    showRoller: false,
                    plotter: lssd_chart_plotter,
                    labels: ['Time', 'Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 55,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });

        var av_graph_send = new Dygraph(document.getElementById(div_s_av), lssd_dbuff[gid + 2], lssd_cbuff[gid + 2], 0, (gid + 2),
                {
                    //drawPoints: true,
                    showRoller: false,
                    fillGraph: true,
                    plotter: smoothPlotter,
//                    colors: [color_s, color_r],
                    labels: ['Time', 'Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_av_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 60,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });

        var av_graph_receive = new Dygraph(document.getElementById(div_r_av), lssd_dbuff[gid + 3], lssd_cbuff[gid + 3], 0, (gid + 3),
                {
                    //drawPoints: true,
                    showRoller: false,
                    fillGraph: true,
                    plotter: smoothPlotter,
//                    colors: [color_s, color_r],
                    labels: ['Time', 'Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_av_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 60,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });

        lssd_plot[gid] = ms_graph_send;
        lssd_plot[gid + 1] = ms_graph_receive;
        lssd_plot[gid + 2] = av_graph_send;
        lssd_plot[gid + 3] = av_graph_receive;
    } else {
        var graph_send_rec = new Dygraph(document.getElementById(div_s), lssd_dbuff[gid], lssd_cbuff[gid], 0, gid,
                {
                    drawPoints: true,
                    showRoller: false,
                    plotter: lssd_chart_plotter,
                    labels: ['Time', 'Downlink Bandwidth', 'Uplink Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    axisLabelFontSize: 10,
                    labelsSeparateLines: true,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 50,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });
        var graph_av_send_rec = new Dygraph(document.getElementById(div_r), lssd_dbuff[gid + 1], lssd_cbuff[gid + 1], 0, (gid + 1),
                {
                    //drawPoints: true,
                    showRoller: false,
                    fillGraph: true,
                    plotter: smoothPlotter,
                    colors: [color_s, color_r],
                    labels: ['Time', 'Uplink Bandwidth', 'Downlink Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_av_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 60,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });
        lssd_plot[gid] = graph_send_rec;
        lssd_plot[gid + 1] = graph_av_send_rec;
    }
    return  gid;
};

lssd_update_start = function (type, id, data) {
//    console.log(id)
    lssd_dbuff[id] = [];
    lssd_cbuff[id].length = 0;
    lssd_dbuff[id + 1] = [];
    lssd_cbuff[id + 1].length = 0;
    lssd_dbuff[id + 2] = [];
    lssd_cbuff[id + 2].length = 0;
    lssd_dbuff[id + 3] = [];
    lssd_cbuff[id + 3].length = 0;
    lssd_tbw[id] = 0;
    lssd_tbw[id + 1] = 0;
    lssd_pkt[id] = 0;
    lssd_pkt[id + 1] = 0;
    lssd_label[id][0].text('Sent     : 0 MB');
    lssd_label[id + 1][0].text('Received : 0 MB');
    lssd_status_bar[id][0].css('background-color', '#005d00');
    lssd_update_status[id] = false;
    lssd_update_status[id + 1] = false;
    lssd_remove_points[id] = 0;
    lssd_remove_points[id + 1] = 0;
    if (data.length === 5) {
        lssd_ref_time[id] = new Date(4294967296 * data[4] + data[3]);
        if (type === LSES_UPDATE) {
            lssd_dbuff[id].push([new Date(lssd_ref_time[id] - 15000), 0]);
            lssd_dbuff[id + 1].push([new Date(lssd_ref_time[id] - 15000), 0]);
            lssd_cbuff[id].push(lssd_color[id]);
            lssd_cbuff[id + 1].push(lssd_color[id + 1]);
            lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
            lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
        } else {
            lssd_dbuff[id].push([new Date(lssd_ref_time[id] - 15000), 0, 0]);
            lssd_cbuff[id].push(lssd_color[id]);
            lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
            lssd_dbuff[id + 1].push([new Date(lssd_ref_time[id] - 15000), 0, 0]);
            lssd_cbuff[id + 1].push(lssd_color[id + 1]);
            lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
        }
//        lssd_dbuff[id + 1].length = 0;
//        lssd_dbuff[id + 1].length = 0;

        //console.log("lssd update time: " + lssd_ref_time[id]);
    } else {
        console.log('Invalid LSSD Starter Detail Received');
    }
};

lses_update = function (id, data) {
    if (data.length % 4 === 0) {
        for (var i = 0; i < data.length; i = i + 4) {
            var bw = data[i];
            var channel = data[i + 1];
            var pkt_count = data[i + 2];
            var tstamp = data[i + 3];
            if (channel != 3) {
                var dlink_pkt = 0;
                var ulink_pkt;
                if (lssd_dbuff[id].length == 1 && !lssd_update_status[id]) {
                    lssd_dbuff[id].shift();
                    lssd_dbuff[id + 1].shift();
                    lssd_dbuff[id].push([(new Date(lssd_ref_time[id].getTime() + tstamp - 400 * 100)), 0]);
                    lssd_dbuff[id + 1].push([(new Date(lssd_ref_time[id].getTime() + tstamp - 400 * 100)), 0]);
                    lssd_cbuff[id].push(lssd_color[id]);
                    lssd_cbuff[id + 1].push(lssd_color[id + 1]);
                    lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                    lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
                    lssd_update_status[id] = true;
                }

                //Add Data to Graph
                if (channel == 1) {//Send
                    lssd_dbuff[id].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), (bw * 8) / 1000]);
                    lssd_tbw[id] += bw;
                    lssd_pkt[id] += pkt_count;
                } else {
                    lssd_dbuff[id + 1].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), (bw * 8 / 1000)]);
                    lssd_tbw[id + 1 ] += bw;
                    lssd_pkt[id + 1] += pkt_count;
                }

                if (lssd_cbuff[id].length < 1400) {
                    lssd_cbuff[id].push(lssd_color[id]);
                    lssd_cbuff[id + 1].push(lssd_color[id + 1]);
                }

                if (lssd_dbuff[id].length > 1400) {
                    lssd_dbuff[id].shift();
                }
                if (lssd_dbuff[id + 1].length > 1400) {
                    lssd_dbuff[id + 1].shift();
                }

                if (tstamp - lssd_last_update_time[id] > 100 || lssd_last_update_time[id] > tstamp) {
                    lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                    lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
                    lssd_label[id][0].text('Sent     : ' + pq_get_usage(lssd_tbw[id]));
                    lssd_label[id + 1][0].text('Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                    $('#pq_ls_uplink_pkt').text('Packets : ' + lssd_pkt[id]);
                    $('#pq_ls_downlink_pkt').text('Packets : ' + lssd_pkt[id + 1]);

                    lssd_last_update_time[id] = tstamp;
                }
            } else {
                lssd_dbuff[id + 2].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), uint32_float(bw)]);
                lssd_dbuff[id + 3].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), uint32_float(pkt_count)]);

                if (lssd_cbuff[id + 2].length < 1400) {
                    lssd_cbuff[id + 2].push(lssd_color[id + 2]);
                    lssd_cbuff[id + 3].push(lssd_color[id + 3]);
                }

                if (lssd_dbuff[id + 2].length > 1400) {
                    lssd_dbuff[id + 2].shift();
                }
                if (lssd_dbuff[id + 3].length > 1400) {
                    lssd_dbuff[id + 3].shift();
                }

                if (tstamp - lssd_last_update_time[id] > 100 || lssd_last_update_time[id] > tstamp) {
                    lssd_plot[id + 2].updateOptions({'file': lssd_dbuff[id + 2]});
                    lssd_plot[id + 3].updateOptions({'file': lssd_dbuff[id + 3]});
                    lssd_last_update_time[id] = tstamp;
                }
            }
        }
    } else {
        console.log('Invalid SSD Bandwidth Data');
    }
};

lssc_update = function (id, data) {
    if (data.length % 4 === 0) {
        for (var i = 0; i < data.length; i = i + 4) {
            var bw = data[i];
            var channel = data[i + 1];
            var pkt_count = data[i + 2];
            var tstamp = data[i + 3];
            if (channel !== 3) {  //Non-averaged data
                if (lssd_dbuff[id].length == 1) {
                    lssd_dbuff[id].shift();
                    lssd_dbuff[id].push([(new Date(lssd_ref_time[id].getTime() + tstamp - 1400 * 100)), 0, 0]);
                    lssd_cbuff[id].push(lssd_color[id]);
                    lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                }

                //Add Data to Graph
                if (channel == 1) {//Send
                    lssd_dbuff[id].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), null, (bw * 8) / 1000]);
                    //lssd_tbw[id] += bw;
                    //console.log("send: " + tstamp);
                } else { // Received
                    lssd_dbuff[id].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), (bw * 8) / 1000, null]);
                    //lssd_tbw[id + 1 ] += bw;
                    //console.log("rec: " + tstamp);
                }

                if (lssd_cbuff[id].length < 1400) {
                    lssd_cbuff[id].push(lssd_color[id]);
                }

                if (lssd_dbuff[id].length > 1400) {
                    lssd_dbuff[id].shift();
                }

                if (tstamp - lssd_last_update_time[id] > 100) {
                    lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                    lssd_label[id][0].text('Data Sent     : ' + pq_get_usage(lssd_tbw[id]));
                    lssd_label[id + 1][0].text('Data Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                    lssd_last_update_time[id] = tstamp;
                    //console.log("last: " + lssd_last_update_time[id]);
                }
            } else {
                if (lssd_dbuff[id + 1].length == 1) {
                    lssd_dbuff[id + 1].shift();
                    lssd_dbuff[id + 1].push([(new Date(lssd_ref_time[id].getTime() + tstamp - 1400 * 100)), 0, 0]);
                    lssd_cbuff[id + 1].push(lssd_color[id + 1]);
                    lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
                }

                if (lssd_prev_tspan !== 0) {
                    if (tstamp - lssd_prev_tspan >= 20000) {
                        var time_next = new Date((lssd_ref_time[id].getTime() + tstamp - 1000));
                        var time_prev = new Date((lssd_ref_time[id].getTime() + lssd_prev_tspan + 1000));
                        lssd_dbuff[id + 1].push([time_prev, 0, 0]);
                        lssd_dbuff[id + 1].push([time_next, 0, 0]);
                    }
                }
                lssd_prev_tspan = tstamp;

                //Add Data to Graph
                lssd_dbuff[id + 1].push([(new Date(lssd_ref_time[id].getTime() + tstamp)), uint32_float(bw), uint32_float(pkt_count)]);
                lssd_tbw[id] += uint32_float(bw) * 1000 * 1000 * 10 / 8;
                lssd_tbw[id + 1] += uint32_float(pkt_count) * 1000 * 1000 * 10 / 8;

                if (lssd_cbuff[id + 1].length < 1400) {
                    lssd_cbuff[id + 1].push(lssd_color[id]);
                }

                if (lssd_dbuff[id + 1].length > 1400) {
                    lssd_dbuff[id + 1].shift();
                }

                if (tstamp - lssd_last_update_time[id + 1] > 100) {
                    lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
                    //lssd_label[id][0].text('Data Sent     : ' + pq_get_usage(lssd_tbw[id]));
                    //lssd_label[id + 1][0].text('Data Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                    lssd_last_update_time[id + 1] = tstamp;
                    //console.log("last: " + lssd_last_update_time[id]);
                }
            }
        }
    } else {
        console.log('Invalid SSD Bandwidth Data');
    }
};

lssd_update_end = function (type, id) {
    $('#LiveWatchDisconnectModal').show();
    if (type === LSES_UPDATE) {
        lssd_status_bar[id][0].css('background-color', 'gray');
    } else if (type === LDES_UPDATE || type === LSRC_UPDATE || type === LAPP_UPDATE || type === LSVS_UPDATE) {
        lssd_status_bar[id][0].css('background-color', 'gray');
    } else {
        console.log("Unknown ssd end type");
    }
};

// Live bandwidth util plots

var lapp_bwutil_plot = [];
var lapp_bwutil_dbuff = [];
var lapp_bwutil_cbuff = [];
var lapp_bwutil_color = [];
var lapp_bwutil_graph = [];
var lapp_bwutil_last_update_time = [];

lapp_bwutil_update_start = function (id, data) {
    lapp_bwutil_plot[id].resize();
    lapp_bwutil_plot[id + 1].resize();
    lapp_bwutil_dbuff[id] = [];
    lapp_bwutil_dbuff[id + 1] = [];
    lapp_bwutil_cbuff[id] = [];
};

// Live bandwidth util user plots

var lapp_bwutil_user_plot = [];
var lapp_bwutil_user_dbuff = [];
var lapp_bwutil_user_cbuff = [];
var lapp_bwutil_user_color = [];
var lapp_bwutil_user_graph = [];

//var lapp_bwutil_ref_time = [];
var lapp_bwutil_user_last_update_time = [];
//var lapp_bwutil_update_status = [];

lapp_bwutil_user_update_start = function (id, data) {

    $('#link_util_app_user_status').text('Active');
    $('#link_util_app_user_status_col').css('background-color', 'green');

    lapp_bwutil_user_plot[id].resize();
    lapp_bwutil_user_plot[id + 1].resize();
    lapp_bwutil_user_dbuff[id] = [];
    lapp_bwutil_user_dbuff[id + 1] = [];
    lapp_bwutil_user_cbuff[id] = [];
};

lapp_bwutil_user_update_end = function (type, id) {
    if (type === LTUSERAPP_UPDATE) {
        $('#link_util_app_user_status').text('Inactive');
        $('#link_util_app_user_status_col').css('background-color', 'gray');
    } else {
        console.log("unknown ssd end type");
    }
};

//Live Packet Drop

var lrbwm_plot = [];
var lrbwm_dbuff = [];
var lrbwm_cbuff = [];
var lrbwm_color = [];
var lrbwm_label = [];
var lrbwm_tdrop = [];
var lrbwm_ref_time = [];
var lrbwm_ref_timlrbwm_tde = [];
var lrbwm_last_update_time = [];
var lrbwm_update_status = [];

pkt_drop_plotter = function (e) {
    var pkt_bar_width = 5;
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
        ctx.fillStyle = e.dygraph.pqcolor[i][e.pqmcolor];
        ctx.fillRect(center_x - pkt_bar_width / 2, p.canvasy,
                pkt_bar_width, y_bottom - p.canvasy);
    }
};

var lrbwm_graph_init = function (div, color_d, color_u, lbl_d, lbl_u) {

    var data = [];
    var clr_d = [];
    var clr_u = [];

    data.push([0, 0, 0]);
    clr_d.push([color_d, color_u]);
    clr_u.push([color_d, color_u]);

    lrbwm_color.push([color_d, color_u]);
    lrbwm_color.push([color_u, color_d]);

    lrbwm_cbuff.push(clr_d);
    lrbwm_cbuff.push(clr_u);

    lrbwm_dbuff.push(data);
    lrbwm_ref_time.push(0);

    lrbwm_label.push([$(lbl_d)]);
    lrbwm_label.push([$(lbl_u)]);

    lrbwm_tdrop.push(0);
    lrbwm_tdrop.push(0);

    lrbwm_update_status.push(false);
    lrbwm_last_update_time.push(0);

//    var g_id = lu_dbuff.length - 1;

    var graph = new Dygraph(document.getElementById(div), lrbwm_dbuff[lrbwm_dbuff.length - 1], lrbwm_cbuff[lrbwm_cbuff.length - 2], 0, (lrbwm_dbuff.length - 1),
            {
                animatedZooms: true,
                drawPoints: true,
                drawGrid: false,
                showRoller: false,
                stackedGraph: true,
                plotter: pkt_drop_plotter,
                axisLabelFontSize: 10,
                colors: [color_d, color_u],
//                color: lrbwm_cbuff[lrbwm_cbuff.length - 2],
                labels: ['Time', 'Downlink Packet Drop', 'Uplink Packet Drop'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {
//                        y: {
//                            axisLabelWidth: 55,
//                            valueFormatter: function (x) {
//                                return y_axis_formatter(x,0);
//                            },
//                            axisLabelFormatter: function (x) {
//                                return y_axis_formatter(x,0);
//                            }
//                        },                    
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });
    lrbwm_plot.push(graph);
    return  (lrbwm_plot.length - 1);
};


lrbwm_update_start = function (id, data) {

    lrbwm_dbuff[id] = [];
    lrbwm_cbuff[id].length = 0;

    lrbwm_tdrop[id] = 0;
    lrbwm_tdrop[id + 1] = 0;

    lrbwm_label[id][0].text('Downlink Packet Drop : 0 ');
    lrbwm_label[id + 1][0].text('Uplink Packet Drop: 0 ');

    lrbwm_update_status[id] = false;

    lrbwm_dbuff[id].push([new Date(lrbwm_ref_time[id]), 0, 0]);
    lrbwm_cbuff[id].push(lrbwm_color[id]);
    lrbwm_plot[id].updateOptions({'file': lrbwm_dbuff[id]});
};

lrbwm_update = function (id, data) {

    if (data.length % 2 === 0) {

        var act_length = data.length;

        if (data.length % 3 !== 0) {
            act_length--;
        }
        for (var i = 0; i < act_length; i = i + 3) {
            var drop_u = data[i];
            var drop_d = data[i + 1];
            var tstamp = data[i + 2];
            //Add Data to Graph
            if (tstamp > 0) {
                if (lrbwm_dbuff[id].length === 1 && !lrbwm_update_status[id]) {
                    lrbwm_dbuff[id].shift();
                    lrbwm_dbuff[id].push([new Date(tstamp * 10 * 1000), 0, 0]);
                    lrbwm_cbuff[id].push(lrbwm_color[id]);
                    lrbwm_plot[id].updateOptions({'file': lrbwm_dbuff[id]});
                    lrbwm_update_status[id] = true;
                }
                //Add Data to Graph
                lrbwm_dbuff[id].push([(new Date(tstamp * 10 * 1000)), drop_d, drop_u]);
                lrbwm_tdrop[id] += drop_d;
                lrbwm_tdrop[id + 1 ] += drop_u;

                if (lrbwm_cbuff[id].length < 512) {
                    lrbwm_cbuff[id].push(lrbwm_color[id]);
                }
                if (lrbwm_dbuff[id].length > 512) {
                    lrbwm_dbuff[id].shift();
                }

                if (tstamp - lrbwm_last_update_time[id] > 0.9) {
                    lrbwm_plot[id].updateOptions({'file': lrbwm_dbuff[id]});
                    lrbwm_label[id][0].text('Downlink Packet Drop     : ' + lrbwm_tdrop[id]);
                    lrbwm_label[id + 1][0].text('Uplink Packet Drop : ' + lrbwm_tdrop[id + 1]);
                    lrbwm_last_update_time[id] = tstamp;
                }
            }
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};


//Live URL Watch
var lurl_plot = [];
var lurl_dbuff = [];
var lurl_cbuff = [];
var lurl_color = [];
var lurl_prev_tspan = 0;
var lurl_remove_count = [];

var lurl_graph_init = function (div, color_ht, color_hs, color_ds, gid) {
    var data = [];
    var clr_s = [];
    data.push([0, 0, 0, 0]);
    clr_s.push([color_ht, color_hs, color_ds]);
    lurl_color[gid] = [color_ht, color_hs, color_ds];
    lurl_dbuff[gid] = data;
    lurl_cbuff[gid] = [color_ht, color_hs, color_ds];
    var graph_lurl = new Dygraph(document.getElementById(div), lurl_dbuff[gid], lurl_cbuff[gid], 0, gid,
            {
                drawPoints: true,
                animatedZooms: true,
                showRoller: false,
                axisLabelFontSize: 10,
                plotter: lssd_chart_plotter,
                colors: [color_ht, color_hs, color_ds],
                labels: ['Time', 'HTTP Requests', 'HTTPS Client Requests', 'DNS responses'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {
//                        y: {
//                            axisLabelWidth: 55,
//                            valueFormatter: function (x) {
//                                return y_axis_formatter(x,0);
//                            },
//                            axisLabelFormatter: function (x) {
//                                return y_axis_formatter(x,0);
//                            }
//                        },                    
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });

    lurl_plot[gid] = graph_lurl;
    return gid;
};

lurlst_ustart = function (type, id, data) {
    sc_cd_type = CLIENT_DIAGRAM;
    lurl_dbuff[id] = [];
    lurl_cbuff[id].length = 0;
    lurl_remove_count[id] = 0;
    var lssd_req = {
        type: GRAPH_UPDATE,
        id: LURLDATA_UPDATE,
        gid: data[2],
        ip_or_sid: 0
    };
    lcjs_make_request(live_bwd_id, LURLDATA_UPDATE, lssd_req);
};

lurlst_update = function (id, data) {
    if (data.length % 4 === 0) {
        for (var url_sc = 0; url_sc < data.length; url_sc += 4) {
            if (data[url_sc + 3] > 0) {
                time = new Date(data[url_sc + 3] * 1000);
                lurl_dbuff[id].push([time, data[url_sc], data[url_sc + 1], data[url_sc + 2]]);
                if (lurl_cbuff[id].length < 512) {
                    lurl_cbuff[id].push(lurl_color[id]);
                    if (lurl_remove_count[id] < 3) {
                        lurl_dbuff[id].shift();
                        lurl_remove_count[id]++;
                    }
                } else {
                    lurl_dbuff[id].shift();
                }
            }
        }
        if (lurl_dbuff[id].length > 0) {
            lurl_plot[id].updateOptions({'file': lurl_dbuff[id]});
        }
    } else {
        console.log("url statistc error");
    }
};

lurlst_uend = function (id) {
    $('#pq_lurlw_status_ind').css('background-color', 'gray');
    $('#pq_lurlw_status_text').text('Status: Inactive');
};


lurldata_ustart = function (type, id) {
    urlw_http_list.clear();
    urlw_https_list.clear();
    urlw_dns_list.clear();
};

lurldata_update = function (id, data, row_data) {
    if (CURRENT_WINDOW !== WINDOW_LIVE_URL_WATCH) {
        return;
    }
    if (data.length % 14 === 0) {
        for (var urldc = 0; urldc < data.length; urldc += 14) {
            var tl = pq_32_2_16(data[urldc]);
            var type = tl.one;
            var length = tl.two;
            var ip = data[urldc + 1];
            var ip_o_p = data[urldc + 2];
            var url = String.fromCharCode.apply(null, new Uint8Array(row_data, (urldc + 3) * 4, length));
            if (type === 0) {
                if (urlw_http_list.size() > 32) {
                    urlw_http_list.items.shift();
                }
                urlw_http_list.add({wurl: url, wuip: '' + num2dotR(ip), wuport: 'port: ' + ip_o_p});
            } else if (type === 1) {
                if (urlw_https_list.size() > 32) {
                    urlw_https_list.items.shift();
                }
                urlw_https_list.add({wurl: url, wuip: '' + num2dotR(ip), wuport: 'port: ' + ip_o_p});
            } else {
                if (urlw_dns_list.size() > 32) {
                    urlw_dns_list.items.shift();
                }
                urlw_dns_list.add({wurl: url, wuip: '' + num2dotR(ip), wuport: '' + num2dotR(ip_o_p)});
            }
        }
    } else {
        console.log("Invalid url data");
    }
};

//Live Request Updater

var lcjs_req_conn = [];
var lcjs_request = [];
var lcjs_request_que = [];
var lcjs_request_status = [];

var lcjs_make_request = function (id, type, request) {
    if (lcjs_request_status[id] === 'relax') {
        if (type === LFBW_UPDATE) {
            lcjs_req_conn[id].send(lfu_make_request(request));
        } else if (type === LBW_UPDATE || type === LVBW_UPDATE || type === LABW_UPDATE || type === LTAPPU_UPDATE || type === LTSDROP_UPDATE) {
            lcjs_req_conn[id].send(lbwu_make_request(request));
        } else if (type === LVABW_UPDATE) {
            lcjs_req_conn[id].send(lvabwu_make_request(request));
        } else if (type === LSES_UPDATE || type === LSRC_UPDATE || type === LDES_UPDATE || type === LAPP_UPDATE || type === LSVS_UPDATE || type === LURLDATA_UPDATE || type === LURLSTAT_UPDATE || type === LTUSERAPP_UPDATE) {
            lcjs_req_conn[id].send(lssd_make_request(request));
        } else if (type === 200) {
            lcjs_req_conn[id].send(lcju_make_auth_req(request));
        }
    } else {
        lcjs_request_que[id].push([type, request]);
    }
};

var lcjs_try_make_request = function (id) {
    if (lcjs_request_status[id] === 'relax') {
        if (lcjs_request_que[id].length > 0) {
            var req = lcjs_request_que[id].shift();
            if (req[0] === LFBW_UPDATE) {
                lcjs_req_conn[id].send(lfu_make_request(req[1]));
            } else if (req[0] === LBW_UPDATE || req[0] === LVBW_UPDATE || req[0] === LABW_UPDATE || req[0] === LTAPPU_UPDATE || req[0] === LTSDROP_UPDATE) {
                lcjs_req_conn[id].send(lbwu_make_request(req[1]));
            } else if (req[0] === LVABW_UPDATE) {
                lcjs_req_conn[id].send(lvabwu_make_request(req[1]));
            } else if (req[0] === LSES_UPDATE || req[0] === LSRC_UPDATE || req[0] === LDES_UPDATE || req[0] === LAPP_UPDATE || req[0] === LSVS_UPDATE || req[0] === LURLDATA_UPDATE || req[0] === LURLSTAT_UPDATE || req[0] === LTUSERAPP_UPDATE) {
                lcjs_req_conn[id].send(lssd_make_request(req[1]));
            } else if (req[0] === 200) {
                lcjs_req_conn[id].send(lcju_make_auth_req(req[1]));
            }
        }
    }
};

var lcjs_request_cbk = function (id, data) {
    var data_q = new Uint32Array(data);
    if (data_q.length % 2 !== 0) { //request component
        var rep = pq_32_4_8(data_q[0]);
        if (rep.one === CJS_REQUEST_START) {
            if (rep.two === GRAPH_UPDATE) {
                lcjs_request[id] = rep;
                if (rep.three === LFBW_UPDATE) {
                    lfu_update_start(rep.four, data_q);
                } else if (rep.three === LTSDROP_UPDATE) {
                    lrbwm_update_start(rep.four, data_q);
                } else if (rep.three === LTAPPU_UPDATE) {
                    lapp_bwutil_update_start(rep.four, data_q);
                } else if (rep.three === LTUSERAPP_UPDATE) {
                    lapp_bwutil_user_update_start(rep.four, data_q);
                } else if (rep.three === LBW_UPDATE || rep.three === LABW_UPDATE || rep.three === LVBW_UPDATE || rep.three === LVABW_UPDATE) {
                    lbwu_update_start(rep.four, data_q);
//                } else if (rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE) {
//                    lp_update_start(rep.three, rep.four, data_q);
                } else if (rep.three === LSES_UPDATE || rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE || rep.three == LSVS_UPDATE) {
                    lssd_update_start(rep.three, rep.four, data_q);
                } else if (rep.three === LURLSTAT_UPDATE) {
                    lurlst_ustart(rep.three, rep.four, data_q);
                } else if (rep.three === LURLDATA_UPDATE) {
                    lurldata_ustart(rep.three, rep.four);
                }
            } else {
                console.log("unknown live request start");
            }
        } else if (rep.one === CJS_REQUEST_END) {
            if (rep.two === GRAPH_UPDATE) {
                if (rep.three === LFBW_UPDATE) {
                    lfu_update_end(rep.four);
                } else if (rep.three === LTSDROP_UPDATE) {
                    lbwu_update_end(rep.four);
                } else if (rep.three === LTAPPU_UPDATE) {
                    lbwu_update_end(rep.four);
                } else if (rep.three === LTUSERAPP_UPDATE) {
                    lapp_bwutil_user_update_end(rep.three, rep.four);
                } else if (rep.three === LBW_UPDATE || rep.three === LVBW_UPDATE || rep.three === LVABW_UPDATE || rep.three === LABW_UPDATE) {
                    lbwu_update_end(rep.four);
                } else if (rep.three === LSES_UPDATE || rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE || rep.three == LSVS_UPDATE) {
                    lssd_update_end(rep.three, rep.four);
                } else if (rep.three === LURLSTAT_UPDATE || rep.three === LURLDATA_UPDATE) {
                    lurlst_uend(rep.three, rep.four);
                }
            } else if (rep.two === 200) {
            } else {
                console.log("unknown live request end");
            }

            lcjs_request_status[id] = 'relax';
            lcjs_try_make_request(id);
        } else {
            console.log('undefined lcjs request');
        }
    } else {
        if (lcjs_request[id].two === GRAPH_UPDATE) { //graph update
            if (lcjs_request[id].three === LFBW_UPDATE) { //update graph type
                var graph_id = lcjs_request[id].four;
                lfu_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LBW_UPDATE || lcjs_request[id].three === LABW_UPDATE || lcjs_request[id].three === LVABW_UPDATE) {
                var graph_id = lcjs_request[id].four;
                if (graph_id === 2 || graph_id === 3 || graph_id === 8 || graph_id === 9) {
                    lbwu_update(graph_id, data_q);
                } else if (graph_id === 0 || graph_id === 1) {
                    labwu_update(graph_id, data_q);
                } else if(graph_id === 6 || graph_id === 7){
//                    labwu_update_temp(graph_id, data_q);
//                }
                if (lcjs_request[id].three === LBW_UPDATE) {
                    lbwu_update(graph_id, data_q);
                } else {
                    labwu_update(graph_id, data_q);
                }
            }
            } else if (lcjs_request[id].three === LVBW_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lvbwu_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LTSDROP_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lrbwm_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LTAPPU_UPDATE) {
                var graph_id = lcjs_request[id].four;
//                console.log("Graph ID: "+graph_id)
                lapp_bwutil_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LTUSERAPP_UPDATE) {
                var graph_id = lcjs_request[id].four;
//                console.log("Graph ID: "+graph_id)
                lapp_bwutil_user_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LSES_UPDATE) {
//                console.log("Lses Update")
                var graph_id = lcjs_request[id].four;
                lses_update(graph_id, data_q);
//            } else if ((lcjs_request[id].three === LSRC_UPDATE || lcjs_request[id].three === LDES_UPDATE) && dlink) {
//                var graph_id = lcjs_request[id].four;
//                lp_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LSRC_UPDATE ||
                    lcjs_request[id].three === LDES_UPDATE ||
                    lcjs_request[id].three === LAPP_UPDATE ||
                    lcjs_request[id].three === LSVS_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lssc_update(graph_id, data_q);
//            } else if (lcjs_request[id].three === LAPP_UPDATE && dlink) {
//                var graph_id = lcjs_request[id].four;
//                lp_update(graph_id, data_q);
//            } else if (lcjs_request[id].three === LAPP_UPDATE && !dlink) {
//                var graph_id = lcjs_request[id].four;
//                lssc_update(graph_id, data_q);
//            } else if (lcjs_request[id].three === LSVS_UPDATE) {
//                var graph_id = lcjs_request[id].four;
//                lssc_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LURLSTAT_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lurlst_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LURLDATA_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lurldata_update(graph_id, data_q, data);
            } else {
                console.log("unknown lcjs m-update");
            }
        } else {
            console.log('undefined lcjs mass update');
        }
    }
    data_q = null;
};

var lcjs_init_request_connection = function (def) {

    if (typeof MozWebSocket !== "undefined") {
        lcjs_req_conn.push(new MozWebSocket(get_cjs_ws_url(), def));
    } else {
        lcjs_req_conn.push(new WebSocket(get_cjs_ws_url(), def));
    }
    var con_id = (lcjs_req_conn.length - 1);
    lcjs_req_conn[con_id].binaryType = 'arraybuffer';
    lcjs_request_status.push('none');
    lcjs_request_que.push([]);
    lcjs_make_request(con_id, 200, {
        type: 200,
        gid: $.cookie('pqsf')
    });
    try {
        lcjs_req_conn[con_id].onopen = function () {
            console.log(def + " connected");
            lcjs_request_status[con_id] = 'relax';
            lcjs_try_make_request(con_id);
        };
        lcjs_req_conn[con_id].onmessage = function got_message(msg) {
            lcjs_request_cbk(con_id, msg.data);
        };
        lcjs_req_conn[con_id].onclose = function () {
            console.log(def + " connection closed " + con_id);
            lcjs_request_status[con_id] = 'none';
        };
    } catch (exception) {
        alert('<p>Error' + exception);
    }
    return con_id;
};

x_axis_formatter = function (time) {
    var time_stamp = moment(time);
    return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss.SSS") + "</div>";
};

x_axis_av_formatter = function (time) {
    var time_stamp = moment(time);
    return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
};

vlan_x_axis_formatter = function (time, gid) {
    var time_stamp = moment(time);
    return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss.SSS") + "</div>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold; margin-left: 5px'>VLAN:</div> <div style ='color:#000; display:inline-block'>" + get_vlan_label_id(time, gid) + "</div>";
};


var tc_dgam_data = [];
var tc_dgam_colours = [];

pq_tc_diagram_refresh_clicked = function () {
    pq_restore_flow_bar('.pq_tc_diagram_filter_bar', tc_fs_id);
    refresh_trafic_dgm_now();
};

pq_tc_diagram_apply_clicked = function () {
    $('#diagram_tc_out,#diagram_tc_in').empty();
    var fdis = pq_get_flow_descriptor();
    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        gid: 0,
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

    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
};

function refresh_trafic_dgm_now() {
    $('#diagram_tc_out,#diagram_tc_in').empty();
    var fdis = pq_get_flow_descriptor();

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        gid: 0,
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
    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
}

function draw_trafic_diagram() {

    var r_height = ((tc_dgam_data.length / 50) - 1) * 900 + 1000;
    var svg_out = d3.select("#diagram_tc_out").append("svg").attr("id", "trafic_dig_out").attr("width", (document.getElementById("diagram_tc_out").offsetWidth - 20)).attr("height", r_height);
    var svg_in = d3.select("#diagram_tc_in").append("svg").attr("id", "trafic_dig_in").attr("width", (document.getElementById("diagram_tc_in").offsetWidth - 20)).attr("height", r_height);
    $("#trafic_dig_out").addClass('pq_session_hcenter');
    $("#trafic_dig_in").addClass('pq_session_hcenter');

    var g_out = [svg_out.append("g").attr("transform", "translate(110,25)")];

    var g_in = [svg_in.append("g").attr("transform", "translate(110,25)")];

    var bp_out = [viz.bP()
                .data(tc_dgam_data)
                .min(12)
                .pad(1)
                .height(r_height - 200)
                .width(document.getElementById("diagram_tc_out").offsetWidth * 0.8 - 270)
                .barSize(35)
                .fill(function (d) {
                    return tc_dgam_colours[d.primary];
                })];
    var bp_in = [viz.bP()
                .data(tc_dgam_data)
                .value(function (d) {
                    return d[3];
                })
                .min(12)
                .pad(1)
                .height(r_height - 200)
                .width(document.getElementById("diagram_tc_in").offsetWidth * 0.8 - 270)
                .barSize(35)
                .fill(function (d) {
                    return tc_dgam_colours[d.primary];
                })
    ];

//Outbound Traffic Labels         

    g_out[0].call(bp_out[0]);

    g_out[0].append("line").attr("x1", -100).attr("x2", 0);
    g_out[0].append("line").attr("x1", 200).attr("x2", 300);

    g_out[0].selectAll(".mainBars")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", mouseClick);

    g_out[0].selectAll(".mainBars").append("text").attr("class", "label")
            .attr("x", function (d) {
                return  (d.part === "primary" ? -30 : 60);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d.key
            })
            .attr("text-anchor", function (d) {
                return (d.part === "primary" ? "end" : "start");
            });
    g_out[0].selectAll(".mainBars").append("text").attr("class", "perc")
            .attr("x", function (d) {
                return (d.part === "primary" ? -95 : 30);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d3.format("0.0%")(d.percent);
            })
            .attr("text-anchor", function (d) {
                return(d.part === "primary" ? "end" : "start");
            });

//Inbound Traffic Labels               

    g_in[0].call(bp_in[0]);

    g_in[0].append("line").attr("x1", -100).attr("x2", 0);
    g_in[0].append("line").attr("x1", 200).attr("x2", 300);

    g_in[0].selectAll(".mainBars")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", mouseClick);

    g_in[0].selectAll(".mainBars").append("text").attr("class", "label")
            .attr("x", function (d) {
                return  (d.part === "primary" ? -30 : 60);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d.key
            })
            .attr("text-anchor", function (d) {
                return (d.part === "primary" ? "end" : "start");
            });
    g_in[0].selectAll(".mainBars").append("text").attr("class", "perc")
            .attr("x", function (d) {
                return (d.part === "primary" ? -95 : 30);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d3.format("0.0%")(d.percent);
            })
            .attr("text-anchor", function (d) {
                return(d.part === "primary" ? "end" : "start");
            });

    function mouseover(d) {

        bp_out[0].mouseover(d);
        g_out[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });

        bp_in[0].mouseover(d);
        g_in[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });
    }

    function mouseout(d) {

        bp_out[0].mouseout(d);

        g_out[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });

        bp_in[0].mouseout(d);

        g_in[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });
    }

    function mouseClick(d) {
        if (d.part === 'primary') {
            navigate_below(d.key, "");
        } else {
            navigate_below("", d.key);
        }
    }
//    d3.select(self.frameElement).style("height", "800px");
}

function navigate_below(sip, dip) {
    $('#diagram_tc_out,#diagram_tc_in').empty();

    var ip_s = sip.indexOf("(");
    var ip_e = sip.indexOf(")");
    if (ip_e > -1 && ip_s > -1) {
        sip = sip.substring(ip_s + 1, ip_e);
    }

    ip_s = dip.indexOf("(");
    ip_e = dip.indexOf(")");
    if (ip_e > -1 && ip_s > -1) {
        dip = dip.substring(ip_s + 1, ip_e);
    }

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        gid: 0,
        sip: dot2num(sip),
        sipr: dot2num(sip),
        dip: dot2num(dip),
        dipr: dot2num(dip),
        sport: 0,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0
    };

    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * *****************************************************************************
 * ********************* Designs for BWM Flow Filter ***************************
 * *****************************************************************************
 * *****************************************************************************
 */

var pq_flow_filter = [{valid: false, value: ''}, //S_IP
    {valid: false, value: ''}, //D_IP
    {valid: false, value: ''}, //S_PORT
    {valid: false, value: ''}, //D_PORT
    {valid: false, value: ''}, //PROT
    {valid: false, value: ''}, //VLAN
    //{valid: false, value: ''}, //Channel
    {valid: false, value: ''}];//App

var pq_flow_filter_clone = [];
pq_flow_filter_clone = pq_flow_filter.slice(0);
var original_pq_flow_dropdown;// = $("#pq_flow_dropdown").clone();
var original_pq_flow_bar = [];// = $(".pq_flow_filter_bar").clone();

var flow_dd_list = [{id: 0, dd_title: 'Source IP', disp_name: 'Src_IP', max_len: 31},
    {id: 1, dd_title: 'Destination IP', disp_name: 'Des_IP', max_len: 31},
    {id: 2, dd_title: 'Source Port', disp_name: 'Src_Port', max_len: 5},
    {id: 3, dd_title: 'Destination Port', disp_name: 'Des_Port', max_len: 5},
    {id: 4, dd_title: 'Protocol', disp_name: 'Prot', max_len: 3},
    {id: 5, dd_title: 'Applications', disp_name: 'Applications', max_len: 32}
];

var pq_create_flow_bar = function (div, apply_btn, refresh_button) {
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dropwb'>" +
            "<button class='pq_flow_fadd pq_flow_vcenter' style='font-size:12px' onclick='pq_flow_add_btn_click()'>Add Filter</button><br><br>" +
            "<div class='pq_flow_drop_down'>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",0, this)' class='pq_flow_drop_down_text'>Source IP</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",1, this)' class='pq_flow_drop_down_text'>Destination IP</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",2, this)' class='pq_flow_drop_down_text'>Source Port</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",3, this)' class='pq_flow_drop_down_text'>Destination Port</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",4, this)' class='pq_flow_drop_down_text'>Protocol</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",5, this)' class='pq_flow_drop_down_text'>Application</a>" +
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
    if (id === 4) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<select id='protList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 100px' maxlength='" + flow_dd_list[id].max_len + "'>" +
                "<option value='TCP'>TCP</option>" +
                "<option value='UDP'>UDP</option>" +
                "</select>" +
                "</div>";
    } else if (id === 5) {
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

    if (id === 5) {
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
            $(".pq_flow_drop_down").toggle();
        }
    }
};

pq_flow_add_btn_click = function () {
    $(".pq_flow_drop_down").toggle();
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

var pq_get_flow_descriptor = function () {

    var sip;
    var sipr;
    var dip;
    var dipr;
    var _sip_r = pq_flow_filter[0].value.split('-');
    var _dip_r = pq_flow_filter[1].value.split('-');
    var sport = var2num(pq_flow_filter[2].value);
    var dport = var2num(pq_flow_filter[3].value);
    var prot = pq_flow_filter[4].value;
    var app_name = pq_flow_filter[5].value;
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
        sip = dot2num(pq_flow_filter[0].value);
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
        dip = dot2num(pq_flow_filter[1].value);
        if (isNaN(dip)) {
            dip = 0;
        }
        dipr = dip;
    }

    if (isNaN(sport)) {
        sport = 0;
    }

    if (isNaN(dport)) {
        dport = 0;
    }

    if (prot === 'UDP') {
        prot = 17;
    } else if (prot === 'TCP') {
        prot = 6;
    } else {
        prot = 0;
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
        sip: sip,
        sipr: sipr,
        dip: dip,
        dipr: dipr,
        sport: sport,
        dport: dport,
        vid: 0,
        prot: prot,
        app: app_id
    };
    return disc;
};



/*
 * *****************************************************************************
 * ****************** Designs for BWM Flow NotSeleted **************************
 * *****************************************************************************
 * *****************************************************************************
 */

pq_add_pq_flow_not_selected = function (div) {
    var item = "<div class='pq_flow_not_selected Pq_Center'>" +
            "<div class='pq_flow_not_selected_thumb'></div>" +
            "<div class='pq_flow_not_selected_img pq_flow_vcenter'></div>" +
            "<a class='pq_flow_not_selected_txt pq_flow_vcenter' style='text-decoration: none;'> Please Add Flow details and Apply to display</a>" +
            "</div>";
    $(div).append(item);
};

pq_remove_pq_flow_not_selected = function () {
    $('.pq_flow_not_selected').remove();
};


/*
 * *****************************************************************************
 * *************** Designs for BWM Flow Filter Display *************************
 * *****************************************************************************
 * *****************************************************************************
 */

pq_create_flowfilter_view = function (div, src_ip, des_ip, src_port, des_port, prot, v_id, chnl, bw, pts, tval) {
    var item = "<div class='pq_flow_details_element'>" +
            "<div class='pq_flow_details_element_filter'>" +
            "<div class='pq_flow_details_element_bar'>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Source IP -</a>" +
            "<a id='pf_ele_sip' class='pq_flow_details_element_val pq_flow_vcenter'>" + src_ip + "</a>" +
            "</div>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Dest IP -</a>" +
            "<a id='pf_ele_dip' class='pq_flow_details_element_val pq_flow_vcenter'>" + des_ip + "</a>" +
            "</div>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Source Port -</a>" +
            "<a id='pf_ele_sport' class='pq_flow_details_element_val pq_flow_vcenter'>" + src_port + "</a>" +
            "</div>" +
            "</div>" +
            "<div class='pq_flow_details_element_bar'>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Dest Port -</a>" +
            "<a id='pf_ele_dport' class='pq_flow_details_element_val pq_flow_vcenter'>" + des_port + "</a>" +
            "</div>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Protocol -</a>" +
            "<a id='pf_ele_prot' class='pq_flow_details_element_val pq_flow_vcenter'>" + prot + "</a>" +
            "</div>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Vlan ID -</a>" +
            "<a id='pf_ele_vid' class='pq_flow_details_element_val pq_flow_vcenter'>" + v_id + "</a>" +
            "</div>" +
            "</div>" +
            "<div class='pq_flow_details_element_bar'>" +
            "<div class='pq_flow_details_element_cell'>" +
            "<div class='pq_flow_details_element_thumb pq_flow_vcenter'></div>" +
            "<a class='pq_flow_details_element_ttl pq_flow_vcenter'>Channel -</a>" +
            "<a id='pf_ele_link' class='pq_flow_details_element_val pq_flow_vcenter'>" + chnl + "</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='pq_flow_info_element'>" +
            "<div class='pq_flow_info_speed_element'>" +
            "<div class='pq_flow_info_speed_val'>" +
            "<a class='pq_flow_info_speed_val_txt pq_flow_hvcenter' id='pq_flow_bw_val'>" + bw + "</a>" +
            "</div>" +
            "<div class='pq_flow_info_speed_ttl'>" +
            "<a class='pq_flow_info_speed_ttl_txt pq_flow_hvcenter'>Bandwidth (10 fps) </a>" +
            "</div>" +
            "</div>" +
            "<div class='pq_flow_info_other_element'>" +
            "<div class='pq_flow_info_packet_element'>" +
            "<div class='pq_flow_info_other_val'>" +
            "<a class='pq_flow_info_other_val_txt pq_flow_hvcenter' id='pq_flow_pts_val'>" + pts + "</a>" +
            "</div>" +
            "<div class='pq_flow_info_other_ttl'>" +
            "<a class='pq_flow_info_other_ttl_txt pq_flow_hvcenter'>packets </a>" +
            "</div>" +
            "</div>" +
            "<div class='pq_flow_info_packet_element'>" +
            "<div class='pq_flow_info_other_val'>" +
            "<a class='pq_flow_info_other_val_txt pq_flow_hvcenter' id='pq_flow_tval_value'>" + tval + "</a>" +
            "</div>" +
            "<div class='pq_flow_info_other_ttl'>" +
            "<a class='pq_flow_info_other_ttl_txt pq_flow_hvcenter'>data </a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    $(div).append(item);
};

pq_lflow_update_element = function (bw, pts, tval) {
    $("#pq_flow_bw_val").text(bw + " Mbps");
    $("#pq_flow_pts_val").text(pts);
    $("#pq_flow_tval_value").text(tval + " MB");
};

pq_lflow_update_element = function (sip, dip, sport, dport, prot, vid, link) {
    $("#pf_ele_sip").text(sip);
    $("#pf_ele_dip").text(dip);
    $("#pf_ele_sport").text(sport);
    $("#pf_ele_dport").text(dport);
    $("#pf_ele_prot").text(prot);
    $("#pf_ele_vid").text(vid);
    $("#pf_ele_link").text(link);
};

pq_remove_flowfilter_view = function () {
    $('.pq_flow_details_element').remove();
};

pq_create_flow_filter_graph = function (div) {
    var item = "<div class='pq_flow_filter_graph_container'>" +
            "<div class='pq_flow_filter_graph_item' id='flow_filter_graph'></div>" +
            "</div>";
    $(div).append(item);
};

pq_remove_flow_filter_graph = function () {
    $('.pq_flow_filter_graph_container').remove();
};


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var main_window_data_updater;

function start_mw_cts_info_update() {
    if (main_window_data_updater) {
        return;
    }
    main_window_data_updater = setInterval(request_mw_ct_info, 6000);
}

function end_mw_cts_info_update() {
    clearInterval(main_window_data_updater);
    main_window_data_updater = null;
}

function request_mw_ct_info() {
    //make information update request
    var vup_req = {
        type: INFORMATION_UPDATE,
        id: INFO_MANW_CT_RQ,
        lid: INFO_MANW_CT_RQ
    };
    cjs_make_request(INFO_MANW_CT_RQ, vup_req);   
}

function request_sw_info() {
    //make information update request
    var vup_req = {
        type: INFORMATION_UPDATE,
        id: INFO_SETW_RQ,
        lid: INFO_SETW_RQ
    };
    cjs_make_request(INFO_SETW_RQ, vup_req);
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Get data of selected row    
var profile_table;
var profile_data = [];
var user_profile_lookup_list = [];

//Initialise modal for creating a new profile

function CreateProfile() {

    var modal = document.getElementById('AddProfileModal');
    var span = document.getElementById('CloseAddProfile');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Retrieve user profile data from database and display on table   

function Update_Profile_Data() {
    profile_data = [];
    user_profile_lookup_list = [];
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_GET_USER_LIST, 0); 

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        profile_data = data.split(";");
        for (var i = 0; i < profile_data.length - 1; i++) {
            var element = profile_data[i].split("&");
            if (get_profile_type(element[1]) === 'Administrator' ||
                    get_profile_type(element[1]) === 'Super Administrator') {
                if (element[2] === user_email_address) {
                    user_profile_lookup_list['All Users'] = element[6];
                }
            } else {
                user_profile_lookup_list[element[2]] = element[6];
//                ruser_profile_lookup_list[element[6]] = num2dot(element[3]);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });    
}

function Display_Prof_Table() {
    profile_table.clear().draw();
    for (var i = 0; i < profile_data.length - 1; i++) {
        var element = profile_data[i].split("&");
        profile_table.row.add([element[0], get_profile_type(element[1]), element[2], num2dot(element[3]), element[4], set_user_status(element[2], element[4], i)]).draw(false);
    }
    profile_table.draw(false);
}

set_user_status = function (username, status, index) {
    if (username === 'admin') {
        return 'Active';
    } else {
        if (status === '1') {
            return "<select name='app_control' class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' id='profileStatus_" + index + "'>" +
                    "<option value='1'>Enable</option>" +
                    "<option value='0'>Disable</option>" +
                    " </select>";
        } else {
            return "<select name='app_control' class='field_prop' style='width:65px; margin-right:40px; background:transparent; border:none' id='profileStatus_" + index + "'>" +
                    "<option value='0'>Disable</option>" +
                    "<option value='1'>Enable</option>" +
                    " </select>";
        }
    }
};

// Set profile status in the table               
get_profile_type = function (id) {
    if (id === '12') {
        return 'Administrator';
    } else if (id === '23') {
        return 'User';
    } else
        return 'Error';
};

// Initialise modal for password reset              

function EditProfile() {
    
    var edit_user_prof_elements = profile_table.row('.selected').data();

    var modal = document.getElementById('EditProfileModal');
    var span = document.getElementById('CloseEditProfile');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
   
    $("#ProfileEditCode").val(edit_user_prof_elements[1]);
    $("#profile_edit_email").val(edit_user_prof_elements[2]);
}

//Display Status messages baseed on return value 

function DisplayStatus(code) {
    switch (code) {
        case 2:
            InvalidStatus("Failed to add new user account into the system");
            break;
        case 4:
            InvalidStatus("IP/Username already exists in the database");
            break;
        case 10:
            SuccessStatus("System updated successfully");
            break;
        case 11:
            InvalidStatus("You have reached the Maximum User Limit");
            break;
        case 12:
            InvalidStatus("You have entered an invalid email to the system");
            break;
        default:
            return -1;
    }
}


var app_link_util_table;
var prev_tstamp;
var prev_user_tstamp;
var primary_user_ip;

var lapp_dlink_buffer = [];
var lapp_ulink_buffer = [];
var checked_link_util_app_list = [];
var app_bwm_prof_list = [];
var app_bwm_prof_list_data = [];
var app_bwm_prof_app_list = [];
var app_bwm_prof_app_list_data = [];

var link_util_flag = true;
var is_app_grap_init = false;
var is_app_grap_user_inited = false;
var is_bwm_app_req_init = false;
var is_stacked_dlink = true;
var is_stacked_ulink = true;

var BWM_APP_PROF_COUNT = 16;
var BWM_APP_PROF_APP_COUNT = 16;

init_app_bwm_window = function () {
    $("input[name=appbwm_mode]").on('change', function () {
        switch ($(this).val()) {
            case '1':
                $("#linkUtilAppUserID").attr('disabled', true);
                $("#linkUtilAppUserWatchBtn").attr('disabled', true);
                $("#link_util_app_user_status").hide();
                $("#link_util_app_user_status_col").hide();
                $("#link_util_app_user_label").hide();
                btn_link_util_bw_load_now(1);
                break;
            case '2':
                $("#linkUtilAppUserID").attr('disabled', false);
                $("#linkUtilAppUserWatchBtn").attr('disabled', false);
                $("#link_util_app_user_status").show();
                $("#link_util_app_user_status_col").show();
                $("#link_util_app_user_label").show();
                validate_input_ip();
                break;
        }
    });
    $("#radio_appbwm_ntwrk").prop("checked", true);
};

init_app_bwm_table = function (index, type) {
    app_link_util_table = $('#App_Dlink_Util_table').DataTable({
        columnDefs: [
            {title: "ID", width: '5%', targets: 0, visible: false},
            {title: "", width: '10%', targets: 1},
            {title: "Application", width: '70%', targets: 2},
            {title: "", width: '10%', targets: 3},
            {title: "", width: '1%', targets: 4},
            {className: 'dt-center', targets: '_all'}
        ],
        paging: false,
        scrollY: set_app_bwm_table_scroll(index),
        ordering: false,
        searching: true,
        info: false
    });
};

set_app_bwm_table_scroll = function (index) {
    if (index > -1) {
        if (parseInt(app_bwm_prof_app_list[index].length) === 0) {
            return '40px';
        } else
            return '' + parseInt(app_bwm_prof_app_list[index].length * 28 + 15) + 'px';
    } else
        return ($('#pq_dlink_util_plot_System').height() - 150);
};

validate_input_ip = function () {
    if (validateIP(($("#linkUtilAppUserID").val().split("/"))[0])) {
        btn_link_util_bw_load_now(1);
    }
};

function init_link_utilization(type, id, upd_flag) {

    if (upd_flag) {
        Display_link_Util_Table(type, id);
    }

    if ($("input[name=appbwm_mode]:checked").val() === '2') {

        var user_ip = ($("#linkUtilAppUserID").val()).split("/");

        if (isNaN(parseInt(user_ip[1]))) {
            user_ip[0] = $("#linkUtilAppUserID").val();
            user_ip[1] = 32;
        }
        if (validateIP(user_ip[0])) {
            if (user_ip[0] !== primary_user_ip) {
                lapp_dlink_user_buffer = [];
                lapp_ulink_user_buffer = [];
                is_app_grap_user_inited = false;
            }
            primary_user_ip = user_ip[0];

            var dash_app_util_user = lapp_bw_util_user_graph_init("AppBwm_User_Dlink_Plot", "AppBwm_User_Ulink_Plot", 0);
            if (!is_app_grap_user_inited) {
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
            }
        } else
            InvalidStatus("Invalid IP Address");
    } else {
        if (!is_app_grap_init) {
            var dash_dl = lapp_bw_util_graph_init("AppBwm_Ntwrk_Dlink_Plot", "AppBwm_Ntwrk_Ulink_Plot", 0);
            is_app_grap_init = true;
        }
        if (!is_bwm_app_req_init) {
            var live_appbwm_id = lcjs_init_request_connection('lcjsreq');
            var lbw_req_dl = {
                type: GRAPH_UPDATE,
                id: LTAPPU_UPDATE,
                gid: dash_dl,
                link: 0,
                chanel: 1
            };
            lcjs_make_request(live_appbwm_id, LTAPPU_UPDATE, lbw_req_dl);
            is_bwm_app_req_init = true;
        }
    }
}

function load_app_bwm_prof_table() {
    app_link_util_table.search('').draw();
    uncheck_profile_apps();
    get_app_bwm_prof();
}

function load_app_bwm_all_table() {
    app_link_util_table.search('').draw();
    uncheck_profile_apps();

    $("#App_Dlink_Util_table_wrapper").remove();
    $("#app_util_dlink_all").append('<table  id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
    
    init_app_bwm_table(-1, 2);
    Display_link_Util_Table(0, 0);

    checked_link_util_app_list = [0, 1, 2];
    check_profile_apps();   
    
//    $("#stacked_mode_app_util_dlink").on('change', function () {
//        if ($("#stacked_mode_app_util_dlink").is(':checked')) {
//            console.log("In_1")
//            console.log(lapp_bwutil_plot)
//            lapp_bwutil_plot.length = 0;
//            console.log(lapp_bwutil_plot)
//            is_stacked_dlink = true;
//            is_stacked_ulink = true;
//            lapp_bw_util_graph_init("AppBwm_Ntwrk_Dlink_Plot", "AppBwm_Ntwrk_Ulink_Plot", 0, 'all');
//            console.log(lapp_bwutil_plot)
//        } else {
//            console.log("In_2")
//            console.log(lapp_bwutil_plot)
//            lapp_bwutil_plot.length = 0;
//            console.log(lapp_bwutil_plot)
//            is_stacked_dlink = false;
//            is_stacked_ulink = false;
//            lapp_bw_util_graph_init("AppBwm_Ntwrk_Dlink_Plot", "AppBwm_Ntwrk_Ulink_Plot", 0, 'all');
//            console.log(lapp_bwutil_plot)
//        }
//    });

//    $("#select_all_app_util").on('change', function () {
//        if ($("#select_all_app_util").is(':checked')) {
//            for (var i = 0; i < application_list.length; i++) {
//                $('#appBwmChecked_' + i).prop("checked", true).change();
//            }
//        } else {
//            for (var i = 0; i < application_list.length; i++) {
//                $('#appBwmChecked_' + i).prop("checked", false).change();
//            }
//        }
//    });
}

function init_app_bwm_profile_add() {
    $('#addProfileId').show();
    $('#addProfilebuttonId').hide();
}

function add_app_bwm_profile() {

    var app_bwm_prof_name = $("#profile_input").val();

    if (app_bwm_prof_name !== "") {
        $('#addProfileId').hide();
        $('#addProfilebuttonId').show();
        add_app_bwm_prof(app_bwm_prof_name);
    } else {
        $('#profile_input').css('border-color', 'red');
    }
    $('#profile_input').focus(function () {
        $('#profile_input').css('border', '2px solid black');
    });
}

function delete_profile(index) {
    delete_app_bwm_prof(parseInt(BWM_APP_PROF_COUNT - index));
}

function display_app_bwm_prof() {
    var undef_prof_flag = false;
    $("#sub_profile_button_grp").children().remove();
    for (var i = 0; i < app_bwm_prof_list.length; i++) {
        if (typeof (app_bwm_prof_list[i]) !== 'undefined') {
            $("#sub_profile_button_grp").append("<div id='" + i + "_bwm_app_prof_group' style='border:2px solid #d2dcdb'> <button id='" + i + "_bwm_app_prof_toggle' class='profile_button' style='font-family: Georgia' onclick=dropdown(" + i + ",'" + i + "_bwm_prof_content')>" + app_bwm_prof_list[i] + "</button>" +
                    "<div id='" + i + "_bwm_prof_content' class='default_content' hidden >" +
                    "</div></div>");
        } else
            undef_prof_flag = true;
    }
    if (app_bwm_prof_list.length >= 16 && !undef_prof_flag) {
        $("#addProfilebuttonId").attr('disabled', true);
    } else {
        $("#addProfilebuttonId").attr('disabled', false);
    }
    dropdown(0, '0_bwm_prof_content');
    $('#0_bwm_app_prof_toggle').addClass("active");

    $(".profile_button").click(function () {
        var bwm_prof = this.id.split("_");
        if (!($(this).hasClass('active'))) {
            $(this).addClass("active");
//            $('#'+bwm_prof[0]+'_bwm_app_prof_group').css('border', '2px solid #d2dcdb');
        } else {
            $(this).removeClass("active");
        }
    });
}

function dropdown(index, id) {

    if ($('#' + id).is(':hidden')) {

        uncheck_profile_apps();
        $(".default_content").css("display", "none");

        if ($('.profile_button').hasClass('active')) {
            $('.profile_button').removeClass("active");
        }

        $('#' + id).show();
        $("table").remove();
        $("#App_Dlink_Util_table_wrapper").remove();
        $("#app_list_ul").remove();
        $("#" + id).append('<table  id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
        $("#applist").append('<ul id="app_list_ul" style="list-style:none;margin-left: -40px; height: 275px;overflow-y: auto"></ul>');

        get_app_bwm_prof_item(parseInt(BWM_APP_PROF_COUNT - index), true);
    } else {
        $('#' + id).hide();
    }
}

function get_application_list_array(index) {
    $("#app_list_ul").children().remove();
    var app_flag = true;
    for (var app in application_list) {
        if (typeof (app_bwm_prof_app_list[index]) !== 'undefined') {
            for (var i = 0; i < app_bwm_prof_app_list[index].length; i++) {
                if (app == app_bwm_prof_app_list[index][i].appID) {
                    app_flag = false;
                }
            }
        }
        if (app_flag === true && app < application_list.length) {
            $("#app_list_ul").append("<li id='appId_" + app + "' style='text-align:left;height:30px; border-bottom: solid 0.6px lightgrey; margin-top: 5px'><a style='text-decoration:none; font-size: 13px;'>" + application_list[app] + "</a><img src='image/add.png' style='width:25px; height:25px; float:right; cursor:pointer;' onclick=add_app_bwm_prof_item(" + parseInt(BWM_APP_PROF_COUNT - index) + "," + app + ",'" + color_gen[app] + "')></li>");
        }
        app_flag = true;
    }
}

function init_add_app_bwm_prof(index) {
    get_application_list_array(index);
    $('#Add_App_BWM_Prof_Window').show();
    $('#app_search_input').val('');
    var span = document.getElementById('CloseAddApplication');
    $('#pq_dlink_util_plot').css('position', 'initial');

    span.onclick = function () {
        $('#Add_App_BWM_Prof_Window').hide();
        $('#pq_dlink_util_plot').css('position', 'absolute');
    };
    window.onclick = function (event) {
        if (event.target === $('#Add_App_BWM_Prof_Window')) {
            $('#Add_App_BWM_Prof_Window').hide();
            $('#pq_dlink_util_plot').css('position', 'absolute');
        }
    };
}

function cancelProfile() {
    $("#addProfileId").hide();
    $("#addProfilebuttonId").show();
}

var app_bwm_prof_init_flag = false;

function Display_link_Util_Table(status, index) {
//    uncheck_profile_apps();
    var dlink_status = 0;
    var app_dlink_temp = [];
    checked_link_util_app_list = [];
    if (status === 1) {
        if (app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index].length > 0) {
            for (var i = 0; i < app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index].length; i++) {
                app_dlink_temp.push({id: app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index][i].appID, label: application_list[app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index][i].appID]});
                checked_link_util_app_list.push(parseInt(app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index][i].appID));
            }
        }
    } else {
        for (var u_item in application_list) {
            app_dlink_temp.push({id: u_item, label: application_list[u_item]});
        }
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

    app_link_util_table.clear();

    for (var i = 0; i < app_tot.length; i++) {
        if (app_tot[i].id !== 'undefined') {

            if (checked_link_util_app_list.indexOf(parseInt(app_tot[i].id)) > -1) {
                dlink_status = 1;
            } else
                dlink_status = 0;

            if (status === 1) {
                app_link_util_table.row.add([app_tot[i].id, set_checked(1, 'appBwmChecked_' + app_tot[i].id), app_tot[i].label, set_bwm_prof_app_colors(index, app_tot[i].id), set_delete_button(status, index, app_tot[i].id)]);
            } else {
                app_link_util_table.column(4).visible(false);
                app_link_util_table.row.add([app_tot[i].id, set_checked(dlink_status, 'appBwmChecked_' + app_tot[i].id), app_tot[i].label, set_bwm_all_app_colors(app_tot[i].id), '']);
            }
        }
    }
    app_link_util_table.draw(false);
    
    jscolor.installByClassName("jscolor");
    if (index === 16) {
        app_link_util_table.buttons(1).remove();
    }

    if (app_bwm_prof_init_flag && status === 1) {
        check_profile_apps();
    }
    app_bwm_prof_init_flag = true;
}

set_delete_button = function (status, index, id) {
    if (status === 1) {
        return " <a href='#'><img src='image/delete.png' id='" + id + "' style='width:16px;height:16px;margin-left:7px;'  onClick=delete_app_bwm_prof_item(" + index + "," + id + ") style='margin-left: 2px'></a>";
    }
};

check_profile_apps = function () {
    var checked_list = checked_link_util_app_list.length;
    for (var i = 0; i < checked_list; i++) {
        $('#appBwmChecked_' + checked_link_util_app_list[i]).prop("checked", true).change();
    }
};

uncheck_profile_apps = function () {

    var app_buf_size = checked_link_util_app_list.length;

    for (var i = 0; i < app_buf_size; i++) {   //Hide plots of previously watched profile
        $('#appBwmChecked_' + checked_link_util_app_list[0]).prop("checked", false).change();
    }
};

set_checked = function (status, id) {
    if (status === 1) {
        return "<input type='checkbox' id='" + id + "' class='app_bw_util_all' checked onchange='change_visibility(this)' style='margin-left: 9px'>";
    } else {
        return "<input type='checkbox' id='" + id + "' class='app_bw_util_all' onchange='change_visibility(this)' style='margin-left: 9px'>";
    }
};

set_bwm_prof_app_colors = function (index, id) {

    var app_index = app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index];

    if (app_index.length > 0) {
        for (var i = 0; i < app_index.length; i++) {
            prof_color_codes[app_index[i].appID] = app_index[i].color;
        }
    }
    return "<input type='button' class='jscolor' id='app_bwm_col_pickr_" + id + "' style='width:40px; height:7px;border:none;font-size:0px;background-color: " + prof_color_codes[id] + " ' value=" + prof_color_codes[id] + " onchange='changeColor(this ," + index + "," + id + ")'>";
};

set_bwm_all_app_colors = function (id) {
    return "<button class='pq_session_wbtn' disabled style='width:40px; height:7px; background-color: " + color_gen[id] + "'></button>";
};

changeColor = function (picker, index, id) {

    var rgb_color = $('#app_bwm_col_pickr_' + id).css('background-color');
    var color;

    if (rgb_color.indexOf("#") > -1) {
        color = rgb_color;
    } else {
        color = rgbToHex(rgb_color);
    }
    update_app_bwm_prof_item(index, id, color);
    document.getElementById('app_bwm_col_pickr_' + id).jscolor.hide();
};

btn_link_util_bw_load_now = function (id) {

    if ($("input[name=appbwm_mode]:checked").val() === '2') {
        if (id === 2) {
            $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", -10);
            $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", -10);
            $("#AppBwm_User_Dlink_Plot").css("z-index", -10);
            $("#AppBwm_User_Ulink_Plot").css("z-index", 100);
            $("#bwm_prof_plot_title").text('Uplink Utilization');
        } else {
            init_link_utilization(1, 0, false);
            $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", -10);
            $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", -10);
            $("#AppBwm_User_Dlink_Plot").css("z-index", 100);
            $("#AppBwm_User_Ulink_Plot").css("z-index", -10);
            $("#bwm_prof_plot_title").text('Downlink Utilization');
        }
    } else if ($("input[name=appbwm_mode]:checked").val() === '1') {
        if (id === 2) {
            $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", 100);
            $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", -10);
            $("#AppBwm_User_Dlink_Plot").css("z-index", -10);
            $("#AppBwm_User_Ulink_Plot").css("z-index", -10);
            $("#bwm_prof_plot_title").text('Uplink Utilization');
        } else {
//            link_util_user_flag = true;
            if (link_util_flag) {
                get_app_bwm_prof();
                link_util_flag = false;
            }
            $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", -10);
            $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", 100);
            $("#AppBwm_User_Dlink_Plot").css("z-index", -10);
            $("#AppBwm_User_Ulink_Plot").css("z-index", -10);
            $("#bwm_prof_plot_title").text('Downlink Utilization');
        }
    }
};

var get_dlink_app_labels = function () {
    var app_dlink_list = ['Time'];
    for (var i = 0; i < application_list.length; i++) {
        app_dlink_list.push(application_list[i]);
    }
//    console.log("LABEL:"+app_dlink_list.length)
    return app_dlink_list;
};

var get_dlink_app_visibility = function () {

    var app_dlink_list = [];
    for (var i = 0; i < application_list.length; i++) {
        if (checked_link_util_app_list.indexOf(i) > -1) {
            app_dlink_list.push(true);
        } else
            app_dlink_list.push(false);
    }
    return app_dlink_list;
};

var gd_util;
var gu_util;
var gd_user_util;
var gu_user_util;

var lapp_bw_util_graph_init = function (dlinkDivID, ulinkDivID, gid) {

    var data = [new Date(0)];
    for (var i = 0; i < application_list.length; i++) {
        data.push(0);
    }
    var div_d = document.getElementById(dlinkDivID);
    var div_u = document.getElementById(ulinkDivID);

    if (lapp_bwutil_dbuff[gid] == null) {
        lapp_bwutil_dbuff[gid] = data;
        lapp_bwutil_dbuff[gid + 1] = data;
        lapp_bwutil_color[gid] = [color_gen];
        lapp_bwutil_color[gid + 1] = [color_gen];

        lapp_bwutil_cbuff[gid] = lapp_bwutil_color;
        lapp_bwutil_cbuff[gid + 1] = lapp_bwutil_color;

        lapp_bwutil_last_update_time[gid] = 0;
    }

    gd_util = new Dygraph(div_d, lapp_bwutil_dbuff[lapp_bwutil_dbuff.length - 2], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_labels(),
                stackedGraph: is_stacked_dlink,
                drawGrid: false,
                fillGraph: true,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(),
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

    gu_util = new Dygraph(div_u, lapp_bwutil_dbuff[lapp_bwutil_dbuff.length - 1], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_labels(),
                stackedGraph: is_stacked_ulink,
                drawGrid: false,
                fillGraph: true,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(),
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

    lapp_bwutil_plot[gid] = gd_util;
    lapp_bwutil_plot[gid + 1] = gu_util;

    return  (lapp_bwutil_plot.length - 2);
};

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
                labels: get_dlink_app_labels(),
                stackedGraph: is_stacked_dlink,
                drawGrid: false,
                fillGraph: true,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(1),
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
                labels: get_dlink_app_labels(),
                stackedGraph: is_stacked_ulink,
                drawGrid: false,
                fillGraph: true,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(2),
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

function change_visibility(e) {

    var chk_d_id = e.id.split("_");
    if (e.checked) {
        checked_link_util_app_list.push(parseInt(chk_d_id[1]));
    } else {
        var index = checked_link_util_app_list.indexOf(parseInt(chk_d_id[1]));
        checked_link_util_app_list.splice(index, 1);
    }
    if ($("input[name=appbwm_mode]:checked").val() === '2') {
        gd_user_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
        gu_user_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    } else {
        gd_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
        gu_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    }
}

lapp_bwutil_update = function (id, data) {

    if (data.length % 2 === 0) {

        for (var i = 0; i < data.length; i = i + 4) {
            var bw_u = uint32_float(data[i]);
            var bw_d = uint32_float(data[i + 1]);
            var app_id = data[i + 2];
            var tstamp = data[i + 3];

            if (tstamp > 0) {
//                if (tstamp > 0 && app_id == 2){
//                    console.log(tstamp +'  '+application_list[app_id]+'  '+bw_d+'  '+bw_u)
//                }
                if (tstamp === prev_tstamp) {
                    lapp_dlink_buffer[app_id + 1] = bw_d;
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                } else {
                    if (lapp_bwutil_last_update_time[id] !== 0) {
                        if ((tstamp - lapp_bwutil_last_update_time[id]) >= 110) {
                            var time_p = lapp_bwutil_last_update_time[id] + 0.5;
                            var time_n = tstamp - 0.5;

                            lapp_dlink_buffer.fill(null);
                            lapp_dlink_buffer[0] = new Date(time_p * 1000);
                            lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                            lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);


                            lapp_dlink_buffer[0] = new Date(time_n * 1000);
                            lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                            lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                        }
                    }

                    if (lapp_dlink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                    }
                    if (lapp_ulink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                    }

                    lapp_dlink_buffer = [];
                    lapp_dlink_buffer.length = application_list.length + 1;
                    prev_tstamp = tstamp;
                    lapp_dlink_buffer.fill(null);
                    lapp_dlink_buffer[0] = new Date(tstamp * 1000);
                    lapp_dlink_buffer[app_id + 1] = bw_d;

                    lapp_ulink_buffer = [];
                    lapp_ulink_buffer.length = application_list.length + 1;
                    lapp_ulink_buffer.fill(null);
                    lapp_ulink_buffer[0] = new Date(tstamp * 1000);
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                }

                if (lapp_bwutil_dbuff[id].length > 512) {
                    lapp_bwutil_dbuff[id].shift();
                }

                if (lapp_bwutil_dbuff[id + 1].length > 512) {
                    lapp_bwutil_dbuff[id + 1].shift();
                }
            }
        }

        if ((tstamp - lapp_bwutil_last_update_time[id] >= 100) || data.length < 128) {
//            console.log("Time")
            lapp_bwutil_last_update_time[id] = tstamp;
            if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
                lapp_bwutil_plot[id].updateOptions({'file': lapp_bwutil_dbuff[id]});
                lapp_bwutil_plot[id + 1].updateOptions({'file': lapp_bwutil_dbuff[id + 1]});
            }
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

lapp_bwutil_user_update = function (id, data) {

    if (data.length % 2 === 0) {

        for (var i = 0; i < data.length; i = i + 4) {
            var bw_u = uint32_float(data[i]);
            var bw_d = uint32_float(data[i + 1]);
            var app_id = data[i + 2];
            var tstamp = data[i + 3];

            if (tstamp > 0) {
//                console.log(tstamp + '  ' + application_list[app_id] + '  ' + bw_d + '  ' + bw_u)
                if (tstamp === prev_user_tstamp) {
                    lapp_dlink_user_buffer[app_id + 1] = bw_d;
                    lapp_ulink_user_buffer[app_id + 1] = bw_u;
                } else {

                    if (lapp_bwutil_user_last_update_time[id] !== 0) {
                        if ((tstamp - lapp_bwutil_user_last_update_time[id]) >= 110) {
                            var time_p = lapp_bwutil_user_last_update_time[id] + 0.5;
                            var time_n = tstamp - 0.5;

                            lapp_dlink_user_buffer.fill(null);
                            lapp_dlink_user_buffer[0] = new Date(time_p * 1000);
                            lapp_bwutil_user_dbuff[id].push(lapp_dlink_user_buffer);
                            lapp_bwutil_user_dbuff[id + 1].push(lapp_ulink_user_buffer);


                            lapp_dlink_user_buffer[0] = new Date(time_n * 1000);
                            lapp_bwutil_user_dbuff[id].push(lapp_dlink_user_buffer);
                            lapp_bwutil_user_dbuff[id + 1].push(lapp_ulink_user_buffer);
                        }
                    }

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
            if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
                lapp_bwutil_user_plot[id].updateOptions({'file': lapp_bwutil_user_dbuff[id]});
                lapp_bwutil_user_plot[id + 1].updateOptions({'file': lapp_bwutil_user_dbuff[id + 1]});
            }
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

var color_gen = [];
var prof_color_codes = [];

set_distributed_col_generator = function (r, g, b) {
    color_gen = [];
    var red_comp = 256 / r;
    var green_comp = 256 / g;
    var blue_comp = 256 / b;

    for (var red = red_comp; red < 256; red += red_comp) {
        for (var green = green_comp; green < 256; green += green_comp) {
            for (var blue = blue_comp; blue < 256; blue += blue_comp) {
                color_gen.push(['#' + red.toString(16) + green.toString(16) + blue.toString(16)]);
            }
        }
    }
    color_gen[0] = "#ffda7f";
    color_gen[1] = pieColorScheme[1];
    color_gen[2] = pieColorScheme[0];
    color_gen[38] = "#c77405";
    color_gen[135] = pieColorScheme[2];

    prof_color_codes = color_gen;
};

function appsearch() {
    var filter, ul, li, a, i;
    filter = $('#app_search_input').val().toUpperCase();
    ul = document.getElementById("app_list_ul");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//////////// Application Util bw Profile ACJS ///////////////////

add_app_bwm_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_app_bwm_prof();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_app_bwm_prof = function (key) {
    var cmd_buffer = update_acjs_elements(WO_AWPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_app_bwm_prof();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

get_app_bwm_prof = function () {

    app_bwm_prof_list = [];
    app_bwm_prof_list_data = [];

    var cmd_buffer = update_acjs_elements(WO_GET_AWPROF_LIST, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_bwm_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            app_bwm_prof_list[parseInt(BWM_APP_PROF_COUNT - element[0])] = element[1];
        }
        display_app_bwm_prof();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Add Apps to App profiles

add_app_bwm_prof_item = function (pkey, appId, color) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_ADD, color, pkey, appId, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        show_acjs_status_modal(data.charCodeAt(0));
        $("#appId_" + appId).addClass('removed');
        $(document).on('transitionend', '.removed', function () {
            $("#appId_" + appId).remove();
        });

        var id = '' + (BWM_APP_PROF_COUNT - pkey) + '_bwm_prof_content';
        $("table").remove();
        $("#App_Dlink_Util_table_wrapper").remove();
        $("#" + id).append('<table id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
        get_app_bwm_prof_item(pkey, true);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_app_bwm_prof_item = function (pkey, appId, color) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_UPDATE, color, pkey, appId, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_app_bwm_prof_item(pkey);
//        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_app_bwm_prof_item = function (pkey, appId) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_DELETE, '', pkey, appId, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        show_acjs_status_modal(data.charCodeAt(0));
        uncheck_profile_apps();
        var id = '' + (BWM_APP_PROF_COUNT - pkey) + '_bwm_prof_content';
        $("table").remove();
        $("#App_Dlink_Util_table_wrapper").remove();
        $("#" + id).append('<table id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
        get_app_bwm_prof_item(pkey, true);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

get_app_bwm_prof_item = function (key, status) {

    app_bwm_prof_app_list[parseInt(BWM_APP_PROF_COUNT - key)] = [];

    var cmd_buffer = update_acjs_elements(WO_GET_AWPROF_ITEM_LIST, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_bwm_prof_app_list_data[i] = row[i];
            var element = row[i].split("&");
            app_bwm_prof_app_list[parseInt(BWM_APP_PROF_COUNT - element[0])].push({appID: element[1], color: element[2]});
        }

        if (status) {
            var index = parseInt(BWM_APP_PROF_COUNT - key);
            init_app_bwm_table(index, 1);
            var app_dlink_util_table_button = new $.fn.dataTable.Buttons(app_link_util_table, {
                "buttons": [{text: 'Add Application',
                        className: 'add_app_prof_button',
                        action: function (e, dt, node, config) {
                            init_add_app_bwm_prof(index);
                        }},
                    {text: 'Delete Profile',
                        className: 'del_app_prof_button',
                        action: function (e, dt, node, config) {
                            delete_profile(index);
                        }}
                ]
            }).container().appendTo($('#App_Dlink_Util_table_wrapper'));
        }

        if (app_bwm_prof_app_list[BWM_APP_PROF_COUNT - key].length > (BWM_APP_PROF_APP_COUNT - 1)) {
            $('#Add_App_BWM_Prof_Window').hide();
            $('#pq_dlink_util_plot').css('position', 'absolute');
            app_link_util_table.buttons(0).disable();
        } else {
            app_link_util_table.buttons(0).enable();
        }
        init_link_utilization(1, key, true);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};var selectedMgmtTableRowCount;
var selectedMgmtTableRowData;
var rowMgmtIndex;
var mgmt_iface_table;
var maintenance_warning_type = 0;

var init_mgmt_ifc_configuration_window = function () {
    mgmt_iface_table = $('#mgmt_iface_table').DataTable({
        select: true,
        columnDefs: [
            {targets: 0, visible: false},
            {width: '10%', targets: 1},
            {width: '20%', targets: 2},
            {width: '20%', targets: 3},
            {width: '20%', targets: 4},
            {width: '20%', targets: 5},
            {width: '10%', targets: 6},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: "100px",
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        createdRow: function (row, data, dataIndex) {
            if (data[4] === "1" || data[4] === "2") {
                $('td:eq(3)', row).css('background-color', '#d6ffb2');
            } else if (data[4] === "0") {
                $('td:eq(3)', row).css('background-color', '#ff9e9e');
            }
        }
    });   
  
    $('#mgmt_iface_table').on('click', 'tbody tr', function () {
        selectedMgmtTableRowData = (mgmt_iface_table.row(this).data()) + '';
        selectedMgmtTableRowCount = 0;
        rowMgmtIndex = mgmt_iface_table.row(this).index();

        var delay = 1;
        setTimeout(function () {
            selectedMgmtTableRowCount = mgmt_iface_table.rows('.selected').count();
        }, delay);
    });

    $('#mgmt_iface_table').on('click', 'tbody tr', function () {
        var delay = 1;
        setTimeout(function () {
            if (selectedMgmtTableRowCount === 1) {
                $('.edit,.delete').removeAttr('disabled');
                if (rowMgmtIndex === 0) {
                    $('#mgmt_o_mask').show();
//                    $('#mgmt_t_mask').hide();
                } else {
//                    $('#mgmt_t_mask').show();
                    $('#mgmt_o_mask').hide();
                }
            } else if (selectedMgmtTableRowCount === 0) {
                $('.edit,.delete').attr('disabled', 'disabled');
                $('#mgmt_t_mask,#mgmt_o_mask').hide();
            } else {
                $('.edit,.delete').attr('disabled', 'disabled');
                $('#mgmt_t_mask,#mgmt_o_mask').hide();
            }
        }, delay);
    });

    $("#editMgmtButton").click(function () {
        if (validateIP($('#mgmt_edit_ip').val())) {
            if (validateIP($('#mgmt_edit_subnet').val())) {
                if (validateIP($('#mgmt_edit_dgw').val())) {
                    if (validateIP($('#mgmt_edit_dnss').val())) {
                        var edit_elements = selectedMgmtTableRowData.split(",");
                        send_mgmt_update(edit_elements[0], dot2num($("#mgmt_edit_ip").val()), dot2num($("#mgmt_edit_subnet").val()), dot2num($("#mgmt_edit_dgw").val()), dot2num($("#mgmt_edit_dnss").val()));
                        document.getElementById('editMgmtModal').style.display = "none";
                    } else {
                        $('#mgmt_edit__confirm_msg').val('Invalied DNS server IP').css('color', 'red');
                    }
                } else {
                    $('#mgmt_edit__confirm_msg').val('Invalid Default Gateway').css('color', 'red');
                }
            } else {
                $('#mgmt_edit__confirm_msg').val('Invalid Subnet').css('color', 'red');
            }
        } else {
            $('#mgmt_edit__confirm_msg').val('Invalid IP address').css('color', 'red');
        }
    });
};

function display_mgmt_table() {
    mgmt_iface_table.clear();
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 41, 0); // request management interface list
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            var element = row[i].split("$");
            mgmt_iface_table.row.add([element[0], element[1], num2dot(element[2]), num2dot(element[3]), num2dot(element[4]), num2dot(element[5]), "Active"]).draw(false);
        }
    }).fail(function () {
        console.error('Problems when posting...');
    });
}

function edit_mgmt_interface_prop() {

    var modal = document.getElementById('editMgmtModal');
    var span = document.getElementById('closeEditMgmtModal');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    var edit_elements = mgmt_iface_table.row('.selected').data();

    $("#mgmt_edit_infc").val(edit_elements[1]);
    $("#mgmt_edit_ip").val(edit_elements[2]);
    $("#mgmt_edit_subnet").val(edit_elements[3]);
    $("#mgmt_edit_dgw").val(edit_elements[4]);
    $("#mgmt_edit_dnss").val(edit_elements[5]);
}

function info_mgmt_interface_show() {

    var modal = document.getElementById('mgmtInfoProModal');
    var span = document.getElementById('closemgmtInfoModal');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    var edit_elements = mgmt_iface_table.row('.selected').data();
    $("#mgmt_info_infc").val(edit_elements[1]);
    $("#mgmt_info_ip").val(edit_elements[2]);
    $("#mgmt_info_subnet").val(edit_elements[3]);
    $("#mgmt_info_dgw").val(edit_elements[4]);
    $("#mgmt_info_dnss").val(edit_elements[5]);
}

function MgmtDisplayStatus(code) {
    switch (code) {
        case 2:
            InvalidStatus("Failed to configure the Management Interface Settings");
            break;
        case 4:
            InvalidStatus("MGMT1 and MGMT2 IPs should be on different Subnets");
            break;
        case 10:
            SuccessStatus("System updated successfully");
            display_mgmt_table();
        default:
            return -1;
    }
}

send_mgmt_update = function (key, ip, subnet, dgw, dns) {
    var cmd_buffer = new ArrayBuffer(4 * 6);
    var req = new Uint32Array(cmd_buffer, 0, 6);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 42, 0);
    req[1] = key;
    req[2] = ip;
    req[3] = subnet;
    req[4] = dgw;
    req[5] = dns;
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        MgmtDisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

////////////////////////////////

maintenance_do_operation = function (id) {
    var cmd_buffer = update_acjs_elements(30 + (id - 1), '', 72, 97, 115, 105, 116, 104);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        maintenance_show_operation(maintenance_warning_type);
        document.getElementById('maintenance_warning_modal').style.display = "none";
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

maintenance_show_operation = function (id) {
    var msg;
    $('.dmaintain_operation_label').text("");
    var modal = document.getElementById('maintenance_operation_modal');
    modal.style.display = "block";
    if (id === 1) { // reset
        msg = 'Device will Reset In ';
    } else if (id === 2) { // reboot
        msg = 'Device will Reboot In ';
    } else { // power down
        msg = 'Device will Shut Down In ';
    }
    var n = 10;
    setTimeout(countDown, 1000);

    function countDown() {
        n--;
        if (n > 0) {
            $('.dmaintain_operation_label').text(msg + ' ' + n + " seconds");
            setTimeout(countDown, 1000);
        } else {
            modal.style.display = "none";
        }
    }
};

maintenance_show_warning = function (id, msg) {
    maintenance_warning_type = id;
    var modal = document.getElementById('maintenance_warning_modal');
    var span = document.getElementById('maintenance_cancel_warning_modal');

    modal.style.display = "block";
    $('.dmaintain_show_label').text(msg);
    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
};

maintenance_reset = function () {
    maintenance_show_warning(1, "You are about to reset the Device! Please press Proceed for the Reset.");
};

maintenance_reboot = function () {
    maintenance_show_warning(2, "You are about to Reboot the Device! Please press Proceed for the Reboot.");
};

maintenance_poweroff = function () {
    maintenance_show_warning(3, "You are about to Power Down the Device! Please press Proceed for the Power Down.");
};
var media_config_table;
var slec_cdport_data;
var slec_cdport_row;
var config_med_clicked;
var pq_dev_portc_types = ["10/100/1000 BASE-T", "1000 BASE-X/1000 BASE-T"];

function init_media_config_elements() {

    media_config_table = $('#Media_Config_Table').DataTable({
        select: true,
        columnDefs: [
            {targets: 0, visible: false},
            {width: '30%', targets: 1},
            {width: '30%', targets: 2, visible: false},
            {width: '30%', targets: 3},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: "100px",
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    $('#Media_Config_Table').on('click', 'tbody tr', function () {
        var delay = 1;
        setTimeout(function () {
            selectedTableRowCount = media_config_table.rows('.selected').count();
        }, delay);
    });
    
    $('#Media_Config_Table').on('click', 'tbody tr', function () {

        var delay = 1;
        var rowID = media_config_table.row('.selected').data()[0];
        setTimeout(function () {
            if (selectedTableRowCount === 1) {
                if (rowID === 0) {
                    $('#config_wIn_mask').show();
                    $('#config_wOut_mask').hide();
                } else {
                    $('#config_wOut_mask').show();
                    $('#config_wIn_mask').hide();
                }
            } else {
                $('#config_wIn_mask,#config_wOut_mask').hide();
            }
        }, delay);
    });        
}

function display_media_config_table() {

    media_config_table.clear().draw();
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 135, 0); // request device port configuration list

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            var element = row[i].split("&");
            if (Number(element[0]) === 0) {
                media_config_table.row.add([Number(element[0]), "WAN1 IN", Number(element[1]), set_media_config_type(element[1], i)]);
            } else {
                media_config_table.row.add([Number(element[0]), "WAN1 OUT", Number(element[1]), set_media_config_type(element[1], i)]);
            }
        }
        media_config_table.draw(false);
    }).fail(function () {
        console.error('Problems when posting...');
    });
}

set_media_config_type = function (status, index) {   
    if (status === '0') {        
        return "<select name='dcport_control' class='field_prop' onchange='config_med_clicked = this; show_warning_type_modal(1)' style='width:190px;  margin-right:40px; background:transparent; border:none' id='cdportStatus_" + index + "'>" +
                "<option value='0'>" + pq_dev_portc_types[0] + "</option>" +
                "<option value='1'>" + pq_dev_portc_types[1] + "</option>" +
                " </select>";
    } else {
        return "<select name='dcport_control' class='field_prop' onchange='config_med_clicked = this; show_warning_type_modal(1)' style='width:190px; margin-right:40px; background:transparent; border:none' id='cdportStatus_" + index + "'>" +
                "<option value='1'>" + pq_dev_portc_types[1] + "</option>" +
                "<option value='0'>" + pq_dev_portc_types[0] + "</option>" +
                " </select>";
    }
};

//change_media_config_type(this)

function change_media_config_type(element) {
    document.getElementById("StatusModal").style.display = "none";    
    change_device_media_configurations(+($(element).attr('id')[13]), +(element[element.selectedIndex].value));
}var chartSelected = 'pieChart';
var rangeSelectorID;
var setQStartTime;
var setQEndTime;
var startDateTime;
var endDateTime;
var format;
var range;
var user_id;
var app_report;
var app_report_ud;
var app_count;
var link_id;
var device_set_time_t_temp;
var device_set_time;
var db_set_time;
var bar_data = [];
var pie_color_scheme;
var summaryFlag = false;
var bar_width;
var data_pq_users_report = [{label: "1", value: 0}];
var pie_pq_users_report;
var q_report_mode = 2;

init_report_all_users_plots = function (width) {
    pie_pq_users_report = new d3pie("summaryPlotContainer_pie", {
        "size": {
            "canvasHeight": width,
            "canvasWidth": width,
            "pieOuterRadius": "80%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": data_pq_users_report
        },
        "labels": {
            "outer": {
                "format": "none",
                "hideWhenLessThanPercentage": 1,
                "pieDistance": 7
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 10
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 2
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true,
                "style": "straight",
                "color": "#000000"
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%",
            "placeholderParser": function (index, data) {
                data.value = pq_get_usage(data.value);
            },
            "styles": {
                "fadeInSpeed": 1000,
                "backgroundColor": "#0079dc",
                "backgroundOpacity": 1
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "none",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 79
            }
        }       
    });
    return pie_pq_users_report;
};

init_reporting_var = function () {
    app_count = 10;
    link_id = '1';
    user_id = 98;
    rangeSelectorID = 1;
    bar_width = document.getElementById('summaryPlotContainer').offsetWidth / 48;
};

init_reports_window = function () {

    for (var u_item in user_profile_lookup_list) {
        $('#userID')
                .append($('<option>', {value: user_profile_lookup_list[u_item]})
                        .text(u_item));
    }

    $("input[name=report_mode]").on('change', function () {

        switch ($(this).val()) {
            case '1':
                $("#customReportBar").hide();
                $("#quickReportBar").show();
                set_quick_mode_duration();
                CalcQTimeDiff();
                break;
            case '2':
                $("#quickReportBar").hide();
                $("#customReportBar").show();
                $('#radio_hourly').prop('checked', true);
                var startDateTime_temp = moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - h a');
                var endDateTime_temp = moment().minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - h a');
                rangeSelectorID = 1;
                $('#startDateTime').data('DateTimePicker').date(startDateTime_temp);
                $('#endDateTime').data('DateTimePicker').date(endDateTime_temp);
                CalcTimeDiff();
                break;
        }
    });

    $.each(application_list, function (key, app) {
        $('#appID')
                .append($('<option>', {value: key})
                        .text(app));
    });

    var my_options = $("#appID option");
    var selected = $("#appID").val();
    my_options.sort(function (a, b) {
        if (a.text.toLowerCase() > b.text.toLowerCase())
            return 1;
        if (a.text.toLowerCase() < b.text.toLowerCase())
            return -1;
        return 0;
    });
    $("#appID").empty().append(my_options);
    $("#appID").val(selected);

    pie_color_scheme = set_color_scheme();
// Set the link type      
    $('#userID').on('change', function () {
        user_id = $("#userID option:selected").val();
        $('#summaryPlotContainer').children().detach();
        $('#usageUDPlot').children().detach();

        if ($("input[name=report_mode]:checked").val() === '1') {
            set_quick_mode_duration();
            CalcQTimeDiff();
        } else if ($("input[name=report_mode]:checked").val() === '2') {
            $("#radio_hourly").prop("checked", true);
            attach_dateTimePicker();
            get_eligible_t_range();
            $('#tot_data').val(pq_get_usage(0));
            $('#up_data').val(pq_get_usage(0));
            $('#dwn_data').val(pq_get_usage(0));
            $('#dif').val('0 Day(s) : 0 Hour(s) : 0 Minute(s)');
            summaryFlag = false;
        } else
            alert("Invalid Reporting mode");
    });

// Change the datetimepicker formats based on app type            
    $('#appID').on('change', function () {

        if ($("#appID option:selected").text() !== '~All Applications~') {            

//            $("#radio_q_hour").attr('disabled', true);            
            $('#appCount').attr('disabled', true);
            if (summaryFlag) {
                $('#summaryPlotContainer').children().detach();
                $('#usageUDPlot').children().detach();
                CreateReport();
            }
        } else {       
//            $("#radio_q_hour").attr('disabled', false);
            if (summaryFlag) {
                $('#summaryPlotContainer').children().detach();
                $('#usageUDPlot').children().detach();
                $('#appCount').attr('disabled', false);
                CreateReport();
            }
        }
    });
// Get number of apps to displayed in pie-chart/stacked bar-chart    
    $('#appCount').on('change', function () {
        app_count = parseInt($("#appCount").val());
        pie_color_scheme = set_color_scheme();
        if (summaryFlag) {
            CreateReport();
        }
    });
// Set the link type      
    $('#linkType').on('change', function () {
        link_id = $("#linkType").val();
        if (summaryFlag) {
            CreateReport();
        }
    });
//Set the value of radio button selected to rangeSelector
    $("input[name=quickDurationSelector]").on('change', function () {
        set_quick_mode_duration();
        CalcQTimeDiff();
    });

//Set the value of radio button selected to rangeSelector
    $("input[name=durationSelector]").on('change', function () {
        summaryFlag = false;
        rangeSelectorID = parseInt($("input[name=durationSelector]:checked").val());
        set_start_time(rangeSelectorID);
        $('#tot_data').val(pq_get_usage(0));
        $('#up_data').val(pq_get_usage(0));
        $('#dwn_data').val(pq_get_usage(0));
        $('#dif').val('0 Day(s) : 0 Hour(s) : 0 Minute(s)');
        $('#summaryPlotContainer').children().detach();
        $('#usageUDPlot').children().detach();
//            attach_dateTimeText();         
        defineFormat(rangeSelectorID);
        attach_dateTimePicker();
        setFormat();
    });

    get_eligible_t_range();
    set_quick_mode_duration();
    CalcQTimeDiff();
};

set_quick_mode_duration = function () {
//    var startTimeTemp = moment().minutes(0).seconds(0).milliseconds(0);
//    var endTimeTemp = moment().minutes(0).seconds(0).milliseconds(0);
    if ($("input[name=quickDurationSelector]:checked").val() === '1') {
//        setQStartTime = startTimeTemp.subtract(1, 'hours');
//        setQEndTime = endTimeTemp.subtract(1, 'minutes');
        q_report_mode = 0;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '2') {
//        setQStartTime = startTimeTemp.hours(0);
//        setQEndTime = endTimeTemp.subtract(1, 'minutes');    
        q_report_mode = 1;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '3') {
//        setQStartTime = startTimeTemp.hours(0).subtract(1, 'days');
//        setQEndTime = endTimeTemp.hours(0).subtract(1, 'minutes');
        q_report_mode = 2;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '4') {
//        setQStartTime = startTimeTemp.date(1).hours(0);
//        setQEndTime = endTimeTemp.hours(0).subtract(1, 'minutes');    
        q_report_mode = 3;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '5') {
//        setQStartTime = startTimeTemp.date(1).hours(0).subtract(1, 'months');
//        setQEndTime = endTimeTemp.date(1).hours(0).subtract(1, 'minutes');
        q_report_mode = 4;
    } else if ($("input[name=quickDurationSelector]:checked").val() === '6') {
//        setQStartTime = startTimeTemp.date(1).hours(0).subtract(1, 'months');
//        setQEndTime = endTimeTemp.date(1).hours(0).subtract(1, 'minutes');
        q_report_mode = 5;
    } else
        alert("Invalid Quick Mode time");
};

get_eligible_t_range = function () {
//    console.log(user_id)
    var cookie = $.cookie('pqsf');
    var cmd_buffer = new ArrayBuffer(3 * 4);
    var req = new Uint32Array(cmd_buffer, 0, 3);
    req[0] = pq_4_8_32(1, 19, 52, 0);
    req[1] = pq_2_16_32(52, 0);
    req[2] = user_id;
    $.ajax({
        data: cmd_buffer,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        processData: false,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var req = new Uint32Array(data);
        device_set_time_t_temp = req[1] * 1000 * 60;
        device_set_time_temp = new Date(req[1] * 1000 * 60);
        device_set_time = new Date(req[1] * 1000 * 60 - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
        db_set_time = new Date(req[2] * 1000 * 60);
//        console.log("Device Set Time: " + device_set_time)
//        console.log("DB End Time: " + db_set_time)
        defineFormat(1);
        setFormat();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

set_start_time = function (id) {

    switch (id) {
        case 1:
            device_set_time = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            break;
        case 2:
            device_set_time = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            break;
        case 3:
            var temp_t1 = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            device_set_time = new Date(temp_t1 - 1000 * 60 * 60 * 24 * (device_set_time_temp.getDate() - 1));
            break;
        case 4:
            var temp_t1 = new Date(device_set_time_t_temp - 1000 * 60 * 60 * (device_set_time_temp.getHours()));
            var today = new Date(temp_t1);
            var first = new Date(new Date(temp_t1).getFullYear(), 0, 1);
            var theDay = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5);
            device_set_time = new Date(temp_t1 - 1000 * 60 * 60 * 24 * (theDay - 1));
            break;
        default:
            alert("Incorrect range");
    }
};

set_reporting_time = function (date, id) {

    var date_temp;
    switch (id) {
        case 1:
            return date;
            break;
        case 2:
            date_temp = new Date(date);
            return date_temp.setHours(0);
            break;
        case 3:
            date_temp = new Date(date);
            return date_temp.setDate(1);
            break;
        case 4:
            date_temp = new Date(date);
            date_temp = new Date(date_temp.setDate(1));
            return date_temp.setMonth(0);
            break;
        default:
            alert("Incorrect range");
    }
};

get_user_report_pie = function () {

    var ds;
    var de;
    var da_min;
    var da_pas;
    var type;
    var piePlotWidth = 0.9 * document.getElementById('summaryPlotContainer').offsetWidth;

    if ($("input[name=report_mode]:checked").val() === '1') {
        type = 84;
        da_min = q_report_mode;
        da_pas = 0;
//        ds = new Date(setQStartTime);
//        de = new Date(setQEndTime);
//        da_min = (ds.getTime() / 1000).toFixed(0);
//        da_pas = (de.getTime() / 1000).toFixed(0);
    } else if ($("input[name=report_mode]:checked").val() === '2') {
        type = 50;
        ds = new Date(startDateTime);
        de = new Date(endDateTime);
        da_min = (ds.getTime() / 1000).toFixed(0);
        da_pas = ((de.getTime() / 1000) - 60).toFixed(0);
    }
//    console.log("Initial Time: "+ ds);
//    console.log("Last Time: "+ de);    
    var cookie = $.cookie('pqsf');
    var cmd_buffer = new ArrayBuffer(5 * 4);
    var req = new Uint32Array(cmd_buffer, 0, 5);
    req[0] = pq_4_8_32(1, 19, 50, 0);
    req[1] = pq_2_16_32(type, 0);
    req[2] = da_min;
    req[3] = da_pas;
    req[4] = user_id;
    $.ajax({
        data: cmd_buffer,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1500000,
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        processData: false,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var req = new Uint32Array(data);
        var length = req[0];
        var stime = req[1];
        var etime = req[2];
        var ds_tot_data = 0;   //in Mb
        var dr_tot_data = 0;   //in Mb
//        console.log(stime);
//        console.log(etime);
        app_count = parseInt($("#appCount").val());
        var appDeficitFlag = false;
        var app_tot = [];
        var app_up = [];
        var app_down = [];
        var app_tot_temp = [];
        var app_up_temp = [];
        var app_down_temp = [];

        if (length === 0) {
            InvalidStatus("No records found within the selected time period");
            $('#summaryPlotContainer').children().detach();
            $('#usageUDPlot').children().detach();
            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));
        } else {
            data_pq_users_report.length = 0;
            for (var count = 3; count < req.length; count += 3) {
                ds_tot_data += uint32_float(req[count + 1]);
                dr_tot_data += uint32_float(req[count + 2]);
                app_tot_temp.push({label: application_list[req[count]], up_value: parseFloat((uint32_float(req[count + 1]) / 8) * 1000000), down_value: parseFloat((uint32_float(req[count + 2]) / 8) * 1000000), tot_value: parseFloat(((uint32_float(req[count + 1]) + uint32_float(req[count + 2])) / 8) * 1000000)});
            }
            app_up_temp = app_tot_temp.slice();
            app_down_temp = app_tot_temp.slice();

            if ((app_tot_temp.length < app_count) || ((app_tot_temp.length === app_count) && (JSON.stringify(app_tot_temp).indexOf('Other') > -1))) {
                appDeficitFlag = true;
                app_count = app_tot_temp.length;
//                pie_pq_users_report.updateProp("header.title.text", "Top " + app_count + " Applications");
            }
            app_tot = app_tot_temp.sort(function (a, b) {
                if (a.tot_value < b.tot_value) {
                    return 1;
                }
                if (a.tot_value > b.tot_value) {
                    return -1;
                }
                return 0;
            });
            app_up = app_up_temp.sort(function (a, b) {
                if (a.up_value < b.up_value) {
                    return 1;
                }
                if (a.up_value > b.up_value) {
                    return -1;
                }
                return 0;
            });
            app_down = app_down_temp.sort(function (a, b) {
                if (a.down_value < b.down_value) {
                    return 1;
                }
                if (a.down_value > b.down_value) {
                    return -1;
                }
                return 0;
            });

            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));

            if (link_id === '1') {

                var unknownFlag_1 = false;
                fill_sum_table(app_tot, ds_tot_data, dr_tot_data);

//        var delay = 3000;
//        setTimeout(function () {
//            alert("In")
                for (var i = 0; i < app_count; i++) {

                    if (app_tot[i].label === 'Other') {
                        unknownFlag_1 = true;
                        if (!appDeficitFlag) {
                            app_count += 1;
                        }
                    } else {
                        if (unknownFlag_1) {
                            data_pq_users_report.push({label: app_tot[i].label, value: app_tot[i].tot_value, color: pie_color_scheme[i - 1]});
                        } else
                            data_pq_users_report.push({label: app_tot[i].label, value: app_tot[i].tot_value, color: pie_color_scheme[i]});
                    }
                }
//        }, delay);                



            } else if (link_id === '2') {

                var unknownFlag_1 = false;
                fill_sum_table(app_up, ds_tot_data, dr_tot_data);

                for (var i = 0; i < app_count; i++) {

                    if (app_up[i].label === 'Other') {
                        unknownFlag_1 = true;
                        if (!appDeficitFlag) {
                            app_count += 1;
                        }
                    } else {
                        if (unknownFlag_1) {
                            data_pq_users_report.push({label: app_up[i].label, value: app_up[i].up_value, color: pie_color_scheme[i - 1]});
                        } else
                            data_pq_users_report.push({label: app_up[i].label, value: app_up[i].up_value, color: pie_color_scheme[i]});
                    }
                }
            } else if (link_id === '3') {

                var unknownFlag_1 = false;
                fill_sum_table(app_down, ds_tot_data, dr_tot_data);
//                var unknownFlag_2 = false;

                for (var i = 0; i < app_count; i++) {

                    if (app_down[i].label === 'Other') {
                        unknownFlag_1 = true;
                        if (!appDeficitFlag) {
                            app_count += 1;
                        }
                    } else {
                        if (unknownFlag_1) {
                            data_pq_users_report.push({label: app_down[i].label, value: app_down[i].down_value, color: pie_color_scheme[i - 1]});
                        } else
                            data_pq_users_report.push({label: app_down[i].label, value: app_down[i].down_value, color: pie_color_scheme[i]});
                    }
                }
            } else
                return -1;

            init_report_all_users_plots(piePlotWidth);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

get_user_report_bar = function () {

    var ds;
    var de;
    var da_min;
    var da_pas;
    var type;

    if ($("input[name=report_mode]:checked").val() === '1') {
        type = 85;
        da_min = q_report_mode;
        da_pas = 0;
    } else if ($("input[name=report_mode]:checked").val() === '2') {
        type = 51;
        ds = new Date(startDateTime);
        de = new Date(endDateTime);
        da_min = (ds.getTime() / 1000).toFixed(0);
        da_pas = ((de.getTime() / 1000) - 60).toFixed(0);
    }

    var cookie = $.cookie('pqsf');
    var cmd_buffer = new ArrayBuffer(5 * 4);
    var req = new Uint32Array(cmd_buffer, 0, 5);
    req[0] = pq_4_8_32(1, 19, 51, 0);
    req[1] = pq_2_16_32(type, parseInt($("#appID option:selected").val()));
    req[2] = da_min;
    req[3] = da_pas;
    req[4] = user_id;
    $.ajax({
        data: cmd_buffer,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        dataType: 'arraybuffer',
        contentType: 'application/octet-stream',
        processData: false,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var req = new Uint32Array(data);
        var length = req[0];  // User ID
        var stime = req[1];   // Start Time
        var etime = req[2];   // End Time
        var ds_tot_data = 0;   //in Mb
        var dr_tot_data = 0;   //in Mb
        bar_data = [];

        if (req.length === 3) {
            InvalidStatus("No records of selected application found within the selected time period");
            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));
            $('#summaryPlotContainer').children().detach();
            $('#usageUDPlot').children().detach();
        } else {
            for (var count = 3; count < req.length; count += 3) {
                ds_tot_data += uint32_float(req[count + 1]);
                dr_tot_data += uint32_float(req[count + 2]);
            }
            app_report.row.add(["-", $("#appID option:selected").text(), pq_get_usage((ds_tot_data / 8) * 1000000), "-",
                pq_get_usage((dr_tot_data / 8) * 1000000), "-", pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000), "-"]).draw(false);

            $('#tot_data').val(pq_get_usage(((ds_tot_data + dr_tot_data) / 8) * 1000000));
            $('#up_data').val(pq_get_usage((ds_tot_data / 8) * 1000000));
            $('#dwn_data').val(pq_get_usage((dr_tot_data / 8) * 1000000));

            if (link_id === '1') {

                for (var count = 3; count < req.length; count += 3) {
                    var x = new Date(req[count] * 1000 * 60);
                    if (x > ds && count === 3) {
                        bar_data.push([ds, 0]);
                    }
                    bar_data.push([x, ((uint32_float(req[count + 1]) + uint32_float(req[count + 2])) / 8)]);
                    if (x < de && (count + 3) >= req.length) {
                        bar_data.push([de, 0]);
                    }
                }
            } else if (link_id === '2') {
                for (var count = 3; count < req.length; count += 3) {
                    var x = new Date(req[count] * 1000 * 60);
                    if (x > ds && count === 3) {
                        bar_data.push([ds, 0]);
                    }
                    bar_data.push([x, uint32_float(req[count + 1]) / 8]);
                    if (x < de && (count + 3) >= req.length) {
                        bar_data.push([de, 0]);
                    }
                }
            } else if (link_id === '3') {
                for (var count = 3; count < req.length; count += 3) {
                    var x = new Date(req[count] * 1000 * 60);
                    if (x > ds && count === 3) {
                        bar_data.push([ds, 0]);
                    }
                    bar_data.push([x, uint32_float(req[count + 2]) / 8]);
                    if (x < de && (count + 3) >= req.length) {
                        bar_data.push([de, 0]);
                    }
                }
            } else
                return -1;

            new Dygraph(document.getElementById('BarChartPlotContainer'), bar_data, '#991f00', 0, 0,
                    {
                        animatedZooms: true,
                        //            drawPoints: true,
                        drawGrid: false,
                        //            colors: '#991f00',
                        showRoller: false,
                        axisLabelFontSize: 10,
                        plotter: chart_plotter,
                        labels: ['Time', 'Usage'],
                        //            pointClickCallback: function(e, p) {
                        //                DrillDown(p.idx);
                        //                            alert(" Point X Coord =  " + p.xval + ": Canvas X =  " + p.canvasx + ": Canvas Y =  " + p.canvasy + ": ID =  " + p.idx );
                        //                            document.getElementById("summaryPlotContainer_table").innerHTML += ": Point X Coord =  " + p.xval + ": Canvas X =  " + p.canvasx + ": Canvas Y =  " + p.canvasy + ": ID =  " + p.idx + "<br/>";
                        //                            document.getElementById("summaryPlotContainer_table").innerHTML += "Point Name = " + p.name + ": Point X Coord =  " + p.xval + ": Canvas X =  " + p.canvasx + ": Canvas Y =  " + p.canvasy + ": ID =  " + p.idx + "<br/>";
                        //            },                       
                        labelsDivStyles: pq_dygraph_tooltip(),
                        labelsSeparateLines: true,
                        axes: {
                            y: {
                                axisLabelWidth: 50,
                                valueFormatter: function (x) {
                                    return y_axis_usage_formatter(x, 1);
                                },
                                axisLabelFormatter: function (x) {
                                    return y_axis_usage_formatter(x, 1);
                                }
                            },
                            x: {
                                valueFormatter: function (x) {
                                    return x_axis_usage_formatter(x);
                                }
                            }
                        }
                    });
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

//detach and attach datepickers for different radio button values 
function attach_dateTimePicker() {
    $('#summary_datetimepicker_container').children().detach();
    var rep_dt_picker = "<label style='margin-left: 93px; color:#fff' class='drop_down_label_reporting'> From : </label>" +
            "<input type='text' id='startDateTime' placeholder='Start date and time' class='field_prop_reporting' style='margin-left:5px; font-size: 10px; color:black; width: 140px; text-indent: 5px; height: 20px;' >" +
            "<label class='drop_down_label_reporting' style='margin-left:28px; color:#fff'> To : </label>" +
            "<input type='text' id='endDateTime' placeholder='End date and time' class='field_prop_reporting' style='margin-left:5px; font-size:10px; color:black; width: 140px; text-indent: 5px; height: 20px;'>";
    $('#summary_datetimepicker_container').append(rep_dt_picker);
//                alert("out")
}

//define the format of date & time  
function defineFormat(id) {
    switch (id) {
        case 1:
            format = 'MMM Do YYYY - h a';
            range = 'day';
//            bar_width = 22;
            break;
        case 2:
            format = 'MMM Do YYYY';
            range = 'month';
//            bar_width = 17;
            break;
        case 3:
            format = 'MMM YYYY';
            range = 'year';
//            bar_width = 40;
            break;
        case 4:
            format = 'YYYY';
            range = 'year';
//            bar_width = 30;
            break;
        case 5:
            format = 'MMM Do YYYY - h a';
            range = 'year';
//            bar_width = 22;
            break;
        default:
            alert("Incorrect range");
    }
}

//set the format of date & time            
function setFormat() {
    $('#startDateTime').datetimepicker({
        format: format,
        sideBySide: true,
        viewMode: "days",
        minDate: device_set_time,
        maxDate: Date.now(),
        showClear: true,
        showClose: true
    });
    $('#endDateTime').datetimepicker({
        format: format,
        sideBySide: true,
        viewMode: "days",
        minDate: device_set_time,
        maxDate: Date.now(),
        showClear: true,
        showClose: true
    });

    $("#startDateTime,#endDateTime").on("dp.change", function () {
        $('#summaryPlotContainer').children().detach();
        $('#usageUDPlot').children().detach();
    });

//get value when datetimepicker value is changed
    $("#startDateTime").on("dp.change", function (e) {

        if ($("#startDateTime").val() !== '') {
            $('#endDateTime').data('DateTimePicker').maxDate('now');
            $('#endDateTime').data("DateTimePicker").minDate(e.date);
            if (rangeSelectorID === 4 || rangeSelectorID === 5) {
                var end_date_res = moment(new Date(e.date)).add(1000, 'year');
                if (end_date_res.endOf(range) > Date.now()) {
                    $('#endDateTime').data('DateTimePicker').maxDate('now');
                } else
                    $('#endDateTime').data('DateTimePicker').maxDate(end_date_res.endOf('year'));
            } else {
                var end_date_res = moment(new Date(e.date)).add(1, range);
                if (end_date_res.endOf(range) > Date.now()) {
                    $('#endDateTime').data('DateTimePicker').maxDate('now');
                } else
                    $('#endDateTime').data('DateTimePicker').maxDate(end_date_res.endOf(range));
            }
            summaryFlag = true;
        }
    });
}

//set type of chart selected from buttons (pie or stacked-bar)------- to be optmised            
//function setChartType(type) {
//    chartSelected = type;
//    if (type === 'pieChart') {
//        defineFormat(1);
//        attach_dateTimePicker();
//        rangeSelectorID = 1;
//        setFormat();
//        $("#radio_yearly,#radio_monthly,#radio_daily,#radio_hourly ").attr('disabled', false);
//    } else {
//        $("#radio_hourly").prop("checked", true);
//        $("#radio_yearly,#radio_monthly,#radio_daily,#radio_hourly ").attr('disabled', true);
//        defineFormat(5);
//        attach_dateTimePicker();
//        rangeSelectorID = 5;
//        setFormat();
//    }
//    if (summaryFlag) {
//        CreateReport();
//    }
//}

//Display the time period in which data should be querried in quick mode
function CalcQTimeDiff() {
    app_count = parseInt($("#appCount").val());
    summaryFlag = true;
    var $input = $('input[name=quickDurationSelector]:checked');
    var text = $('label[for=' + $input.attr('id') + ']').text();
    $('#dif').val(text);
    CreateReport();
}

//Display the time period in which data should be querried in custom mode
function CalcTimeDiff() {
    var startDateTime_temp;
    var endDateTime_temp;
    app_count = parseInt($("#appCount").val());
    if ($("#startDateTime").val() === '' || $("#endDateTime").val() === '') {
        InvalidStatus("Start/End Date & Time cannot be empty");
    } else if ($("#startDateTime").val() === $("#endDateTime").val()) {
        InvalidStatus("Start and End Time cannot be the same");
    } else {
        summaryFlag = true;
        startDateTime_temp = $('#startDateTime').data("DateTimePicker").date();
        endDateTime_temp = $('#endDateTime').data("DateTimePicker").date();
        startDateTime = set_reporting_time(startDateTime_temp, rangeSelectorID);
        endDateTime = set_reporting_time(endDateTime_temp, rangeSelectorID);
        var start_date = moment(new Date(startDateTime), "MMM Do YYYY - h m a");
        var end_date = moment(new Date(endDateTime), "MMM Do YYYY - h m a");
        var diff = moment.duration(end_date.diff(start_date));
//        var duration = diff.get("years") + " Year(s) : " + diff.get("months") + " Month(s) : " + diff.get("days") + " Day(s) : " + diff.get("hours") + " Hour(s)";
        var duration = diff.get("years") + " Year(s) : " + diff.get("months") + " Month(s) : " + diff.get("days") + " Day(s) : " + diff.get("hours") + " Hour(s) : " + diff.get("minutes") + " Minute(s)";
        $('#dif').val(duration);
        CreateReport();
    }
}

function CreateReport() {
    $('#summaryPlotContainer').children().detach();
    $('#usageUDPlot').children().detach();
    app_count = parseInt($("#appCount").val());
    var user_selected = $("#userID option:selected").text();
    var app_selected = $("#appID option:selected").text();
    var innerPlotDescription = "<div class=' BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size: 14px; border:none; width:100%;'>" + $("#userID option:selected").text() + " - " + $("#linkType option:selected").text() + " Usage - " + $("#appID option:selected").text() + "</div>";         //for admin
    var barChartPlotContainer = "<div id='BarChartPlotContainer' class='w3-animate-zoom' style='width: 100%; height:calc(100% - 60px); background:beige;'></div>" +
            "<div id='footnoteText' class=' BWPlotHolderHeader BWPlotHolderHeaderText' style='font-size: 12px; float:bottom; border-radius:0px 0px 15px 15px; height: 30px; width:100%; '></div>";
    var innerPlots = "<div id='summaryPlotContainer_pie' style='width:100%; float:left; height: 97%; background: transparent; '>" + "</div>";
    $('#usageUDPlot').append("<table id='Report_Apps_UD_table' class='display cell-border AppUserTablesFont' style='color:gray'  cellspacing='0' ></table>");
    app_report = $('#Report_Apps_UD_table').DataTable({
        columnDefs: [
            {width: '15%', targets: 0},
            {title: "Application", width: '40%', targets: 1},
            {title: "Uplink", width: '10%', targets: 2},
            {title: "%", width: '5%', targets: 3},
            {title: "Downlink", width: '10%', targets: 4},
            {title: "%", width: '5%', targets: 5},
            {title: "Total", width: '10%', targets: 6},
            {title: "%", width: '5%', targets: 7},
            {className: 'dt-center', targets: '_all'}
        ],
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        buttons: [{extend: 'csv', text: 'Save as CSV', filename: 'Data Usage', title: 'Data Usage', className: 'green'},
            {extend: 'pdf', text: 'Save as PDF', filename: 'Data Usage', title: 'Data Usage', className: 'green', customize: function (doc) {
                    doc.defaultStyle.fontSize = 8;
                }}]
    });
    app_report.buttons(0, null).containers().appendTo('#usageUDPlot');
    if ((user_selected === 'All Users') && (app_selected === '~All Applications~')) {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(innerPlots);
        get_user_report_pie();
//        AppendElementToUsage(chartSelected);
    } else if ((user_selected === 'All Users') && !(app_selected === '~All Applications~')) {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(barChartPlotContainer);
        get_user_report_bar();
//        AppendElementToUsage('barChart');
    } else if (!(user_selected === 'All Users') && (app_selected === '~All Applications~')) {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(innerPlots);
        get_user_report_pie();
//        AppendElementToUsage(chartSelected);
    } else {
        $('#summaryPlotContainer').append(innerPlotDescription);
        $('#summaryPlotContainer').append(barChartPlotContainer);
        get_user_report_bar();
//        AppendElementToUsage('barChart');
    }
}

function AppendElementToUsage(opt) {
    if (opt === "pieChart") {
        get_user_report_pie();
    } else if (opt === "barChart") {
        get_user_report_bar();
    } else {
        console.error("Unknown Plot Type. Error!");
    }
}

chart_plotter = function (e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
        //if (i > 2 && i < 8) {
        //console.log(e.pqmcolor + " " + p.y + "     " + p.canvasy);
        //}
        ctx.fillStyle = '#991f00';
        ctx.fillRect(center_x - bar_width / 2, p.canvasy,
                bar_width, y_bottom - p.canvasy);
//                      ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
//                      bar_width, y_bottom - p.canvasy);
    }
};

function fill_sum_table(app_tot, ds_tot_data, dr_tot_data) {
    var unknownFlag_2 = false;
    for (var i = 0; i < app_tot.length; i++) {
        if (app_tot[i].label === 'Other') {
            unknownFlag_2 = true;
            app_report.row.add(["", app_tot[i].label, pq_get_usage(app_tot[i].up_value), ((app_tot[i].up_value) * 100 / ((ds_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                pq_get_usage(app_tot[i].down_value), ((app_tot[i].down_value) * 100 / ((dr_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                pq_get_usage(app_tot[i].tot_value), ((app_tot[i].tot_value) * 100 / (((ds_tot_data + dr_tot_data) / 8) * 1000000)).toFixed(2) + ' %']).draw(false);
        } else {
            if (unknownFlag_2) {
                app_report.row.add(["<button class='pq_session_wbtn' disabled style='width:90%; height:7px; background-color: " + pie_color_scheme[i - 1] + "'></button>",
                    app_tot[i].label, pq_get_usage(app_tot[i].up_value), ((app_tot[i].up_value) * 100 / ((ds_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].down_value), ((app_tot[i].down_value) * 100 / ((dr_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].tot_value), ((app_tot[i].tot_value) * 100 / (((ds_tot_data + dr_tot_data) / 8) * 1000000)).toFixed(2) + ' %']).draw(false);
            } else
                app_report.row.add(["<button class='pq_session_wbtn' disabled style='width:90%; height:7px; background-color: " + pie_color_scheme[i] + "'></button>",
                    app_tot[i].label, pq_get_usage(app_tot[i].up_value), ((app_tot[i].up_value) * 100 / ((ds_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].down_value), ((app_tot[i].down_value) * 100 / ((dr_tot_data / 8) * 1000000)).toFixed(2) + ' %',
                    pq_get_usage(app_tot[i].tot_value), ((app_tot[i].tot_value) * 100 / (((ds_tot_data + dr_tot_data) / 8) * 1000000)).toFixed(2) + ' %']).draw(false);
        }
    }
}

x_axis_usage_formatter = function (time) {
    var time_stamp = moment(time);
    if (time_stamp.format("H:mm") === '0:00' || time_stamp.format("H:mm") === '5:30' || time_stamp.format("H:mm") === '23:59') {
        return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div>";
    } else
        return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:00") + "</div>";
};

y_axis_usage_formatter = function (usage, precision) {
    var data = (usage * 1000 * 1000);
    var val;
    if (data >= 1000000000) { //G
        val = (data / 1000000000).toFixed(precision) + ' GB';
    } else if (data >= 1000000) { //M
        val = (data / 1000000).toFixed(precision) + ' MB';
    } else if (data >= 1000) { // K
        val = (data / 1000).toFixed(precision) + ' KB';
    } else { //Bytes
        val = (data).toFixed(precision) + ' B';
    }
    return val;
};

set_color_scheme = function () {
    if (app_count === 10) {
        return pieColorScheme_10;
    } else if (app_count === 20) {
        return pieColorScheme_20;
    } else if (app_count === 30) {
        return pieColorScheme_30;
    } else if (app_count === 40) {
        return pieColorScheme_40;
    } else if (app_count === 50) {
        return pieColorScheme_50;
    } else
        return -1;
};

//---------------------------------