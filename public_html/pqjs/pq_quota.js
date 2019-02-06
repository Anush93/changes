var quota_rules_table;
var quota_app_prof_table;
var quota_app_prof_list_table;
var quota_url_prof_table;
var quota_url_prof_list_table;
var quota_serv_prof_table;
var quota_serv_prof_list_table;
var quota_prof_table;
var quota_usage_table;
var quota_usage_det_table;

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

var quota_usage_list_data = [];
var quota_usage_list_det_data;

var quota_app_prof_id;
var quota_url_prof_id;
var quota_serv_prof_id;

var quota_usage_query_type;
var quota_usage_viz_rule_id;
var quota_usage_viz_prof_id;
var quota_usage_reset_type;

var reset_elem_data;

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
                quota_serv_prof_list[0] = 'None';
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
            timeout: 60000,
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
        quota_rules_table.row.add([element[7], element[0], get_addr_element(element[2], element[1]), quota_app_prof_list[element[3]], quota_url_prof_list[element[4]], quota_serv_prof_list[element[5]], quota_prof_list[element[6]], element[2]]);
    }
    quota_rules_table.draw(false);
}

function Filter_quota_viz_ip() {
    var ip_elem = decode_ip_category($('#quota_viz_ip_search_input').val());
//    console.log(ip_elem)
    if (!isNaN(ip_elem[0])) {
        Get_Quota_Rule_Element_Details(QVIZ_GEN_DISPLAY, quota_usage_viz_rule_id, 0, 0, 0, 0, ip_elem[0], ip_elem[1], ip_elem[2]);
    }
}

function Get_Quota_Rule_Element_Details(def, id, aid, uid, sid, eid, ipv, ip_low, ip_high) {
//    console.log(def, id, aid, uid, sid, eid, ipv, ip_low, ip_high)
    var cmd_buffer = update_quota_viz_acjs_elements(pq_2_16_32(def, id), pq_2_16_32(aid, uid), pq_2_16_32(sid, eid), ipv, ip_low[0], ip_low[1], ip_low[2], ip_low[3], ip_high[0], ip_high[1], ip_high[2], ip_high[3]);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        dataType: 'arraybuffer',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        quota_usage_list_det_data = [];
        quota_usage_list_det_data = new Uint32Array(data);
        var elem_count = quota_usage_list_det_data[0];

        Display_Quota_Usage_Det_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Quota_Usage_Det_Table() {
    quota_usage_det_table.clear();
    var q_rule_id;
    var q_app_id;
    var q_url_id;
    var q_serv_id;
    var cur_usage;
    var max_usage;

    if (((quota_usage_list_det_data.length - 1) % 11) === 0) {
//        quota_usage_det_table.column(3).visible(true);
        for (var i = 1; i < quota_usage_list_det_data.length; i = i + 11) {
            q_rule_id = pq_32_2_16(quota_usage_list_det_data[i]).one;
            q_app_id = pq_32_2_16(quota_usage_list_det_data[i]).two;
            q_url_id = pq_32_2_16(quota_usage_list_det_data[i + 1]).one;
            q_serv_id = pq_32_2_16(quota_usage_list_det_data[i + 1]).two;
            cur_usage = parseFloat((uint32_float(quota_usage_list_det_data[i + 9])) * 1000000);
            max_usage = parseFloat((uint32_float(quota_usage_list_det_data[i + 10])) * 1000000);
//            quota_usage_rule_id = q_rule_id;
//            console.log(q_rule_id, q_app_id, q_url_id, q_serv_id, cur_usage, max_usage)

            switch (quota_usage_query_type) {
                case 2:
                    $(quota_usage_det_table.column(3).header()).text('Application');
                    quota_usage_det_table.row.add([q_rule_id, quota_usage_list_det_data[i + 2], get_quoata_ele_ip(quota_usage_list_det_data[i + 3], quota_usage_list_det_data[i + 4], quota_usage_list_det_data[i + 5], quota_usage_list_det_data[i + 6], quota_usage_list_det_data[i + 7]), application_list[q_app_id], pq_get_usage(cur_usage), pq_get_usage(max_usage), moment(quota_usage_list_det_data[i + 8] * 1000).format("YYYY/MM/DD hh:mm a"), get_quoata_ele_status(cur_usage, max_usage)]);
                    break;
                case 3:
                    $(quota_usage_det_table.column(3).header()).text('URL');
                    quota_usage_det_table.row.add([q_rule_id, quota_usage_list_det_data[i + 2], get_quoata_ele_ip(quota_usage_list_det_data[i + 3], quota_usage_list_det_data[i + 4], quota_usage_list_det_data[i + 5], quota_usage_list_det_data[i + 6], quota_usage_list_det_data[i + 7]), url_list[q_url_id], pq_get_usage(cur_usage), pq_get_usage(max_usage), moment(quota_usage_list_det_data[i + 8] * 1000).format("hh:mm a"), get_quoata_ele_status(cur_usage, max_usage)]);
                    break;
                case 4:
                    $(quota_usage_det_table.column(3).header()).text('Service');
                    quota_usage_det_table.row.add([q_rule_id, quota_usage_list_det_data[i + 2], get_quoata_ele_ip(quota_usage_list_det_data[i + 3], quota_usage_list_det_data[i + 4], quota_usage_list_det_data[i + 5], quota_usage_list_det_data[i + 6], quota_usage_list_det_data[i + 7]), service_list[q_serv_id], pq_get_usage(cur_usage), pq_get_usage(max_usage), moment(quota_usage_list_det_data[i + 8] * 1000).format("hh:mm a"), get_quoata_ele_status(cur_usage, max_usage)]);
                    break;
                case 5:
                    quota_usage_det_table.column(3).visible(false);
                    quota_usage_det_table.row.add([q_rule_id, quota_usage_list_det_data[i + 2], get_quoata_ele_ip(quota_usage_list_det_data[i + 3], quota_usage_list_det_data[i + 4], quota_usage_list_det_data[i + 5], quota_usage_list_det_data[i + 6], quota_usage_list_det_data[i + 7]), 0, pq_get_usage(cur_usage), pq_get_usage(max_usage), moment(quota_usage_list_det_data[i + 8] * 1000).format("YYYY/MM/DD hh:mm a"), get_quoata_ele_status(cur_usage, max_usage)]);
                    break;
            }
        }
    }
    quota_usage_det_table.draw(false);
}

get_quoata_ele_ip = function (version, s1, s2, s3, s4) {
    if (version) {
        return rec_ip_decode(parseInt(version), parseInt(s1), parseInt(s2), parseInt(s3), parseInt(s4), 1);
    } else {
        return 'Shared';
    }
};

get_quoata_ele_status = function (cur, max) {
    if (cur <= max) {
        return 'Active';
    } else {
        return 'Expired';
    }
};

set_quota_reset_btn = function (id, interfc) {
    return "<button id='setQuotReset_" + id + "_" + interfc + "' style='width: 70px; height: 20px; color: white; background: #eea236 url(../image/refresh_on.png) 2px no-repeat; border:none; text-indent: 20px;' onclick='del_devc_mac(this)'>Reset</button>";
};

function Reset_Quota_Profiles() {
    switch (quota_usage_query_type) {
        case 2:
            quota_usage_reset_type = QTPROF_RTYPE_APP;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_APP, parseInt(quota_usage_viz_prof_id));
            break;
        case 3:
            quota_usage_reset_type = QTPROF_RTYPE_URL;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_URL, parseInt(quota_usage_viz_prof_id));
            break;
        case 4:
            quota_usage_reset_type = QTPROF_RTYPE_SVS;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_SVS, parseInt(quota_usage_viz_prof_id));
            break;
        case 5:
            quota_usage_reset_type = QTPROF_RTYPE_DEF;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_DEF, parseInt(quota_usage_viz_prof_id));
            break;
        case 6:
            quota_usage_reset_type = QTPROF_RTYPE_RULE;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_RULE, 0);
            break;
    }
}

function Reset_Quota_Profile_Elements(table_data) {
//    console.log(table_data)
    var item_id;
    quota_usage_reset_type = QT_RTYPE_ELEMENT;
    switch (quota_usage_query_type) {
        case 2:
            item_id = application_list.indexOf(table_data[3]);
            reset_quota_elem(parseInt(table_data[1]), parseInt(table_data[0]), QTPROF_RTYPE_APP, parseInt(item_id));
            break;
        case 3:
            item_id = url_list.indexOf(table_data[3]);
            reset_quota_elem(parseInt(table_data[1]), parseInt(table_data[0]), QTPROF_RTYPE_URL, parseInt(item_id));
            break;
        case 4:
            item_id = service_list.indexOf(table_data[3]);
            reset_quota_elem(parseInt(table_data[1]), parseInt(table_data[0]), QTPROF_RTYPE_SVS, parseInt(item_id));
            break;
        case 5:
            reset_quota_elem(parseInt(table_data[1]), parseInt(table_data[0]), QTPROF_RTYPE_DEF, 0);
            break;
    }
}

q_usage_reset_do_operation = function () {
    $('#q_usage_reset_warning_modal').hide();
    switch (quota_usage_reset_type) {
        case QTPROF_RTYPE_DEF:
//            quota_usage_reset_type = QTPROF_RTYPE_DEF;


            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_DEF, parseInt(quota_usage_viz_prof_id));
            break;
        case QTPROF_RTYPE_APP:
//            quota_usage_reset_type = QTPROF_RTYPE_APP;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_APP, parseInt(quota_usage_viz_prof_id));
            break;
        case QTPROF_RTYPE_URL:
//            quota_usage_reset_type = QTPROF_RTYPE_URL;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_URL, parseInt(quota_usage_viz_prof_id));
            break;
        case QTPROF_RTYPE_SVS:
//            quota_usage_reset_type = QTPROF_RTYPE_SVS;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_SVS, parseInt(quota_usage_viz_prof_id));
            break;
        case QTPROF_RTYPE_RULE:
//            quota_usage_reset_type = QTPROF_RTYPE_RULE;
            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_RULE, 0);
            break;
        case QT_RTYPE_ELEMENT:
//            quota_usage_reset_type = QTPROF_RTYPE_RULE;
            Reset_Quota_Profile_Elements(reset_elem_data);
//            reset_quota_prof(parseInt(quota_usage_viz_rule_id), QTPROF_RTYPE_RULE, 0);
            break;
    }
};

q_usage_reset_cancel_op = function (id, interfc) {
    $('#q_usage_reset_warning_modal').hide();
};

///////
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
        quota_app_prof_list[0] = 'None';
        var row = data.split(";");
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
        quota_url_prof_list[0] = 'None';
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
        quota_serv_prof_list[0] = 'None';
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
    quota_usage_table.clear().draw();
    for (var i = 0; i < quota_rule_list.length; i++) {
        var element = quota_rule_list[i].split("&");
        quota_usage_table.row.add([element[0], get_addr_element(element[2], element[1]), quota_app_prof_list[element[3]], quota_url_prof_list[element[4]], quota_serv_prof_list[element[5]], quota_prof_list[element[6]]]);
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
        if (u_item !== '0') {
            $('#add_quota_source')
                    .append($('<option>', {value: u_item})
                            .text(address_list[u_item]));
            $('#edit_quota_source')
                    .append($('<option>', {value: u_item})
                            .text(address_list[u_item]));
        }
    }
    for (var u_item in quota_app_prof_list) {
        $('#add_app_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_app_prof_list[u_item]));
        $('#edit_app_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_app_prof_list[u_item]));
    }
    for (var u_item in quota_serv_prof_list) {
        $('#add_serv_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_serv_prof_list[u_item]));
        $('#edit_serv_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_serv_prof_list[u_item]));
    }
    for (var u_item in quota_url_prof_list) {
        $('#add_url_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_url_prof_list[u_item]));
        $('#edit_url_quota_profile')
                .append($('<option>', {value: u_item})
                        .text(quota_url_prof_list[u_item]));
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

    if (ACTIVE_AD) {
        $('.ad_display').show();
    }
    if (ACTIVE_DHCP) {
        $('.dhcp_display').show();
    }

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

    if (ACTIVE_AD) {
        $('.ad_display').show();
    }
    if (ACTIVE_DHCP) {
        $('.dhcp_display').show();
    }
}

function Delete_Q(table) {

    switch (table) {

        case 1:
            delete_wo_quota_rule((quota_rules_table.row('.selected').data())[1]);
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

    var source_types_edit = ['IP', 'MAC', 'AD-User', 'DHCP-User', 'Profile', 'AD-Group'];
    var quota_data = quota_rules_table.row('.selected').data();
    $('#edit_quota_prof_shapers').children().detach();
    $("#edit_quota_addr_type option").filter(function () {
        return this.text === source_types_edit[quota_data[7]];
    }).prop('selected', true);

    append_addr_element('edit_quota_addr_type', 'edit_quota_source', false);

    $("#edit_quota_source option").filter(function () {
        return this.text === quota_data[2];
    }).prop('selected', true);
    $("#edit_app_quota_profile option").filter(function () {
        return this.text === quota_data[3];
    }).prop('selected', true);
    $("#edit_url_quota_profile option").filter(function () {
        return this.text === quota_data[4];
    }).prop('selected', true);
    $("#edit_serv_quota_profile option").filter(function () {
        return this.text === quota_data[5];
    }).prop('selected', true);
    $("#edit_quota_default_quota option").filter(function () {
        return this.text === quota_data[6];
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
        init_pipes('#edit_downlink_def_quota_pipe');
        init_pipes('#edit_uplink_def_quota_pipe');
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



