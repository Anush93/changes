var rule_table;
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

        if (ACTIVE_AD) {
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

        if (ACTIVE_DHCP) {
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

//function Update_URL_Prof_List() {
//    var cookie = $.cookie('pqsf');
//    url_prof = [];
//    url_prof_data = [];
//    var req = new Uint32Array(2);
//    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLPROF_LIST, 0);
//
//    $.ajax({
//        data: req.buffer,
//        processData: false,
//        headers: {"PARAQUMTEC": cookie},
//        timeout: 10000,
//        type: 'POST',
//        url: '/'
//    }).done(function (data, textStatus, jqXHR) {
//        url_prof[0] = 'None';
//        var row = data.split(";");
//        for (var i = 0; i < row.length - 1; i++) {
//            url_prof_data[i] = row[i];
//            var element = row[i].split("&");
//            url_prof[element[0]] = element[1];
//        }
//        Display_URL_Prof_Table();
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        console.error('Problems when posting...');
//    });
//}

//function Display_URL_Prof_Table() {
//    url_prof_table.clear().draw();
//    for (var i = 0; i < url_prof_data.length; i++) {
//        element = url_prof_data[i].split("&");
//        url_prof_table.row.add([element[0], element[1], '-', element[2]]);
//    }
//    url_prof_table.draw(false);
//}

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



function New_URL(type) {

    var modal = null;
    var span = null;


    switch (type) {

        case 1:

        case 2:

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

//        init_url_list('#add_url');
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

//        init_url_list('#edit_new_url_to_rule');
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

//function Update_AppCtrl_Prof_List() {
//    var cookie = $.cookie('pqsf');
//    app_ctrl_list = [];
//    app_ctrl_list_data = [];
//    var req = new Uint32Array(2);
//    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_APPPROF_LIST, 0);
//
//    $.ajax({
//        data: req.buffer,
//        processData: false,
//        headers: {"PARAQUMTEC": cookie},
//        timeout: 10000,
//        type: 'POST',
//        url: '/'
//    }).done(function (data, textStatus, jqXHR) {
//        app_ctrl_list[0] = 'None';
//        var row = data.split(";");
//        for (var i = 0; i < row.length - 1; i++) {
//            app_ctrl_list_data[i] = row[i];
//            var element = row[i].split("&");
//            app_ctrl_list[element[0]] = element[1];
//        }
//        Display_App_Ctrl_Prof_Table();
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        console.error('Problems when posting...');
//    });
//}
//
//function Display_App_Ctrl_Prof_Table() {
//    app_prof_table.clear().draw();
//    for (var i = 0; i < app_ctrl_list_data.length; i++) {
//        element = app_ctrl_list_data[i].split("&");
//        app_prof_table.row.add([element[0], element[1], element[2], element[3]]);
//    }
//    app_prof_table.draw(false);
//}

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

        case 2:

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
};

