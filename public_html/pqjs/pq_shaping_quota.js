var global_rule_user = 0;
var dest_rules;
var url_rules;
var app_rules;
var serv_rules;
var admin_pipe_list = [];
var admin_pipe_list_data = [];
var admin_pipe_list_tt = [];
var user_pipe_list = [];
var user_pipe_list_data = [];
var user_pipe_list_tt = [];
var schedule_list = [];
var schedule_list_data = [];
var schedule_list_tt = [];

var ACTIVE_AD = false;
var ACTIVE_DHCP = false;


function Init_WO_Param(sched_flag, admin_pipe_flag, user_pipe_flag, upd_flag, quota_flag) {
    var user_id = global_rule_user;
    if (sched_flag) {
        schedule_list = [];
        schedule_list_data = [];
        schedule_list_tt = [];
        var cookie = $.cookie('pqsf');

        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SCHD_LIST, 0);
        req[1] = user_id;

        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data, textStatus, jqXHR) {
//            console.log(data)
            schedule_list[0] = 'None';
            var row = data.split(";");
            for (var i = 0; i < row.length - 1; i++) {
                schedule_list_data[i] = row[i];
                var element = row[i].split("&");
                schedule_list[element[1]] = element[2];
                schedule_list_tt[element[1]] = row[i];
            }
            Init_Admin_Pipes();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    } else
        Init_Admin_Pipes();

    function Init_Admin_Pipes() {
        if (admin_pipe_flag) {
            admin_pipe_list = [];
            admin_pipe_list_data = [];
            admin_pipe_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADMIN_SHAPER_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
//                console.log(data)
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    admin_pipe_list_data[i] = row[i];
                    var element = row[i].split("&");
                    admin_pipe_list[element[0]] = element[1];
                    admin_pipe_list_tt[element[0]] = row[i];
                }
                Init_User_Pipes();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_User_Pipes();
    }

    function Init_User_Pipes() {
        if (user_pipe_flag) {
            user_pipe_list = [];
            user_pipe_list_data = [];
            user_pipe_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_USER_SHAPER_LIST, 0);
            req[1] = user_id;

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
//                 console.log(data)
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    user_pipe_list_data[i] = row[i];
                    var element = row[i].split("&");
                    user_pipe_list[element[1]] = element[3];
                    user_pipe_list_tt[element[1]] = row[i];
                }
                if (upd_flag) {
                    reload_user_based_interface();
                }
                Init_User_Quota_Profiles();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_User_Quota_Profiles();
    }

    function Init_User_Quota_Profiles() {
        if (quota_flag) {
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
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        }
    }
}

//Modal operations              

function Create(table) {

    var modal = null;
    var span = null;

//    $('#appendAddress').children().detach();
//    $('#appendService').children().detach();

    switch (table) {
        case 1:
            modal = '#AddDestRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 2:
            modal = '#AddURLRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 3:
            modal = '#AddAppRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 4:
            modal = '#AddServiceRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 5:
            modal = '#CreateScheduleModal';
            span = document.getElementsByClassName("close")[0];
            setFormatRecur();
            break;
        case 6:
            modal = '#CreateAdminPipeModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 7:
            modal = '#CreateUserPipeModal';
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

function Edit(table) {

    var modal = null;
    var span = null;
    rowData = null;
    portCount = 0;

//    $('#editAddress').children().detach();
//    $('#editService').children().detach();
//    $('#appendService').children().detach();
    $('#editSchedule').children().detach();

    switch (table) {
        case 1:
            modal = '#EditDestRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_dest_rule_edit_modal_elements();
            break;
        case 2:
            modal = '#EditURLRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_url_rule_edit_modal_elements();
            break;
        case 3:
            modal = '#EditAppRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_app_rule_edit_modal_elements();
            break;
        case 4:
            modal = '#EditServiceRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_serv_rule_edit_modal_elements();
            break;
        case 5:
            modal = '#EditScheduleModal';
            span = document.getElementsByClassName("close")[1];
            EditScheduleTableModalElements('editSchedule');
            EditScheduleTableModal();
            break;
        case 6:
            modal = '#EditAdminPipeModal';
            span = document.getElementsByClassName("close")[1];
            set_admin_pipe_table_modal_elements();
            break;
        case 7:
            modal = '#EditUserPipeModal';
            span = document.getElementsByClassName("close")[1];
            set_user_pipe_table_modal_elements();
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
            delete_ml_dest_rule((dest_rule_table.row('.selected').data())[0], (dest_rule_table.row('.selected').data())[1]);
            break;
        case 2:
            delete_ml_url_rule((url_rule_table.row('.selected').data())[0], (url_rule_table.row('.selected').data())[1]);
            break;
        case 3:
            delete_ml_app_rule((app_rule_table.row('.selected').data())[0], (app_rule_table.row('.selected').data())[1]);
            break;
        case 4:
            delete_ml_serv_rule((service_rule_table.row('.selected').data())[0], (service_rule_table.row('.selected').data())[1]);
            break;
        case 5:
            delete_ml_schedule((schedule_table.row('.selected').data())[0], (schedule_table.row('.selected').data())[1]);
            break;
        case 6:
            delete_ml_admin_pipe((admin_pipe_table.row('.selected').data())[0]);
            break;
        case 7:
            delete_ml_user_pipe((user_pipe_table.row('.selected').data())[0], (user_pipe_table.row('.selected').data())[1]);
            break;
//        case 8:
//            delete_nw_user_account((profile_table.row('.selected').data())[0], (profile_table.row('.selected').data())[2]);
//            break;
        case 9:
            delete_ml_url_rule
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
    $('.edit, .reset, .delete').attr('disabled', true);
//    $('.create').attr('disabled', false);
    selectedRowCount = 0;
}

append_sched_def_modal_shapers = function (type, modal, sched_act, def_act, dlink_pipe, ulink_pipe, append_div, sched_append_div, def_append_div, ss_size, sa_size, aa_size) {

//    console.log(type, modal, sched_act, def_act, dlink_pipe, ulink_pipe, append_div, sched_append_div, def_append_div, ss_size, sa_size, aa_size);

    $('#' + append_div).children().detach();

    if ($("#" + def_act + " option:selected").val() === '2') {

        var def_pipes = "<label class='drop_down_label'> " + type + " Downlink Pipe : </label>" +
                "<select id='" + dlink_pipe + "' class='field_prop'>" +
                "</select> <br><br>" +
                "<label class='drop_down_label'> " + type + " Uplink Pipe : </label>" +
                "<select id='" + ulink_pipe + "' class='field_prop'>" +
                "</select> <br><br>";

        if ($("#" + sched_act + " option:selected").val() === '2') {
            $('#' + modal).css({'height': '100%', 'max-height': ss_size});
            $('#' + append_div).append(def_pipes);
        } else {
            $('#' + modal).css({'height': '100%', 'max-height': sa_size});
            $('#' + append_div).append(def_pipes);
            $('#' + sched_append_div).children().detach();
        }

        init_user_pipes('#' + dlink_pipe);
        init_user_pipes('#' + ulink_pipe);
    } else {
        if ($("#" + sched_act + "  option:selected").val() === '2') {
            $('#' + modal).css({'height': '100%', 'max-height': sa_size});
            var def_pipes = "<label class='drop_down_label'> " + type + " Downlink Pipe : </label>" +
                    "<select id='" + dlink_pipe + "' class='field_prop'>" +
                    "</select> <br><br>" +
                    "<label class='drop_down_label'> " + type + " Uplink Pipe : </label>" +
                    "<select id='" + ulink_pipe + "' class='field_prop'>" +
                    "</select> <br><br>";

            $('#' + append_div).append(def_pipes);
            init_user_pipes('#' + dlink_pipe);
            init_user_pipes('#' + ulink_pipe);
            $('#' + def_append_div).children().detach();

        } else {
//            console.log("Innnn")
            $('#' + modal).css({'height': '100%', 'max-height': aa_size});
//            $('#' + append_div).children().detach();
        }
    }
};

append_default_pipe = function (modal, action, dlink_gur_pipe, ulink_gur_pipe, dlink_max_pipe, ulink_max_pipe, append_div) {

    $('#' + append_div).children().detach();

    var def_pipes = "<label class='drop_down_label'> Pipe Type : </label>" +
            "<select id='editDefaultPipeType' class='field_prop'>" +
            "<option value='1'>Per-IP</option>" +
            "<option value='4'>Shared</option>" +
            "</select> <br><br>" +
            "<label class='drop_down_label'> Priority : </label>" +
            "<select id='editDefaultPipePriority' class='field_prop'>" +
            "<option value='1'>Low</option>" +
            "<option value='50'>Medium</option>" +
            "<option value='99'>High</option>" +
            "</select> <br><br>" +
            "<div style = 'width: 100%; height: 20px; border-top: 1px solid #d2cdcd; text-align: center' >" +
            "<span style = 'font-size: 13px; color:#d2cdcd; background-color: white; padding: 10px 10px 0px 10px;'> Guaranteed Bandwidth  </span>" +
            "</div>" +
            "<label class='drop_down_label' style='margin-top: 10px;'>  Downlink (Kbps) : </label>" +
            "<input id='" + dlink_gur_pipe + "' style='margin-top: 10px;' type='text' class='field_prop'><br><br>" +
            "<label class='drop_down_label'> Uplink (Kbps) : </label>" +
            "<input id='" + ulink_gur_pipe + "' type='text' class='field_prop'><br><br>" +
            "<div style = 'width: 100%; height: 20px; border-top: 1px solid #d2cdcd; text-align: center' >" +
            "<span style = 'font-size: 13px; color:#d2cdcd; background-color: white; padding: 10px 10px 0px 10px;'> Maximum Bandwidth </span>" +
            "</div>" +
            "<label class='drop_down_label' style='margin-top: 10px;'>  Downlink (Kbps) : </label>" +
            "<input id='" + dlink_max_pipe + "' style='margin-top: 10px;' type='text' class='field_prop'><br><br>" +
            "<label class='drop_down_label'> Uplink (Kbps) : </label>" +
            "<input id='" + ulink_max_pipe + "' type='text' class='field_prop'><br><br><br>";

    if ($("#" + action + " option:selected").val() === '2') {
        $('#' + modal).css({'height': '100%', 'max-height': '530px'});
        $('#' + append_div).append(def_pipes);
    } else {
        $('#' + modal).css({'height': '100%', 'max-height': '185px'});
        $('#' + append_div).children().detach();
    }
};

function set_rule_table_pipes(window, id) {

    var table;
    var type;

    switch (window) {
        case WINDOW_RULE_DESTINATIONS:
            table = dest_rule_table;
            type = 'dest';
            break;
        case WINDOW_RULE_URL:
            table = url_rule_table;
            type = 'url';
            break;
        case WINDOW_RULE_APPLICATIONS:
            table = app_rule_table;
            type = 'app';
            break;
        case WINDOW_RULE_SERVICE:
            table = service_rule_table;
            type = 'serv';
            break;
    }

    var rule_data = table.row('.selected').data();

//    $('#editPipes').children().detach();
//    console.log(rule_data)

    $("#edit_" + type + "_rule_schedule option").filter(function () {
        return this.text === rule_data[id];
    }).prop('selected', true);

    $("#edit_sched_" + type + "_rule_action option").filter(function () {
        return this.text === rule_data[id + 1];
    }).prop('selected', true);

    $("#edit_def_" + type + "_rule_action option").filter(function () {
        return this.text === rule_data[id + 4];
    }).prop('selected', true);

    switch (window) {
        case WINDOW_RULE_DESTINATIONS:

            append_sched_def_modal_shapers('Scheduled', 'EditDestRuleModalContent', 'edit_sched_dest_rule_action', 'edit_def_dest_rule_action', 'edit_dest_rule_sched_dlink_pipe',
                    'edit_dest_rule_sched_ulink_pipe', 'edit_sched_pipes_dest_rule', 'edit_sched_pipes_dest_rule', 'edit_def_pipes_dest_rule', '505px', '415px', '325px');

            append_sched_def_modal_shapers('Default', 'EditDestRuleModalContent', 'edit_sched_dest_rule_action', 'edit_def_dest_rule_action', 'edit_dest_rule_def_dlink_pipe',
                    'edit_dest_rule_def_ulink_pipe', 'edit_def_pipes_dest_rule', 'edit_sched_pipes_dest_rule', 'edit_def_pipes_dest_rule', '505px', '415px', '325px');
            break;
        case WINDOW_RULE_URL:

            append_sched_def_modal_shapers('Scheduled', 'EditURLRuleModalContent', 'edit_sched_url_rule_action', 'edit_def_url_rule_action', 'edit_url_rule_sched_dlink_pipe',
                    'edit_url_rule_sched_ulink_pipe', 'edit_sched_pipes_url_rule', 'edit_sched_pipes_url_rule', 'edit_def_pipes_url_rule', '555px', '465px', '375px');
            append_sched_def_modal_shapers('Default', 'EditURLRuleModalContent', 'edit_sched_url_rule_action', 'edit_def_url_rule_action', 'edit_url_rule_def_dlink_pipe',
                    'edit_url_rule_def_ulink_pipe', 'edit_def_pipes_url_rule', 'edit_sched_pipes_url_rule', 'edit_def_pipes_url_rule', '555px', '465px', '375px');
            break;
        case WINDOW_RULE_APPLICATIONS:

            append_sched_def_modal_shapers('Scheduled', 'EditAppRuleModalContent', 'edit_sched_app_rule_action', 'edit_def_app_rule_action', 'edit_app_rule_sched_dlink_pipe',
                    'edit_app_rule_sched_ulink_pipe', 'edit_sched_pipes_app_rule', 'edit_sched_pipes_app_rule', 'edit_def_pipes_app_rule', '490px', '400px', '310px');
            append_sched_def_modal_shapers('Default', 'EditAppRuleModalContent', 'edit_sched_app_rule_action', 'edit_def_app_rule_action', 'edit_app_rule_def_dlink_pipe',
                    'edit_app_rule_def_ulink_pipe', 'edit_def_pipes_app_rule', 'edit_sched_pipes_app_rule', 'edit_def_pipes_app_rule', '490px', '400px', '310px');
            break;
        case WINDOW_RULE_SERVICE:

            append_sched_def_modal_shapers('Scheduled', 'EditServiceRuleModalContent', 'edit_sched_serv_rule_action', 'edit_def_serv_rule_action', 'edit_serv_rule_sched_dlink_pipe',
                    'edit_serv_rule_sched_ulink_pipe', 'edit_sched_pipes_serv_rule', 'edit_sched_pipes_serv_rule', 'edit_def_pipes_serv_rule', '535px', '445px', '355px');
            append_sched_def_modal_shapers('Default', 'EditServiceRuleModalContent', 'edit_sched_serv_rule_action', 'edit_def_serv_rule_action', 'edit_serv_rule_def_dlink_pipe',
                    'edit_serv_rule_def_ulink_pipe', 'edit_def_pipes_serv_rule', 'edit_sched_pipes_serv_rule', 'edit_def_pipes_serv_rule', '535px', '445px', '355px');
            break;
    }

    if (rule_data[id + 1] === 'Shape') {
        $("#edit_" + type + "_rule_sched_dlink_pipe option").filter(function () {
            return this.text === rule_data[id + 2];
        }).prop('selected', true);
        $("#edit_" + type + "_rule_sched_ulink_pipe option").filter(function () {
            return this.text === rule_data[id + 3];
        }).prop('selected', true);
    }

    if (rule_data[id + 4] === 'Shape') {
        $("#edit_" + type + "_rule_def_dlink_pipe option").filter(function () {
            return this.text === rule_data[id + 5];
        }).prop('selected', true);
        $("#edit_" + type + "_rule_def_ulink_pipe option").filter(function () {
            return this.text === rule_data[id + 6];
        }).prop('selected', true);
    }

    if (rule_data[id] === 'None') {
        $("#edit_sched_" + type + "_rule_action").attr('disabled', true);
    }
}

// Common functions

function init_admin_pipes(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (admin_pipe_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in admin_pipe_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(admin_pipe_list[u_item]));
    }
}

function init_user_pipes(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (user_pipe_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in user_pipe_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(user_pipe_list[u_item]));
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

function init_rule_user_list(div) {

    if (user_profile_lookup_list.length > 0) {
        $(div).empty();
    }

    $(div).append($('<option selected disabled>', {value: 0})
            .text('--Select User--'));

    for (var u_item in user_profile_lookup_list) {
        $(div).append($('<option>', {value: u_item})
                .text(user_profile_lookup_list[u_item]));
    }
}

function clear_and_init_list(div, list) {

    $(div).empty();

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (list.length > 0) {
        $(div).empty();
    }

    for (var u_item in list) {
        $(div).append($('<option>', {value: u_item})
                .text(list[u_item]));
    }
}

function clear_and_init_sched_quota_list(div) {

    $(div).empty();

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (schedule_list.length > 0) {
        var options = '';
        for (var u_item in schedule_list) {
            if (schedule_list[u_item] !== 'None') {
                options += "<option value='" + u_item + "'>" + schedule_list[u_item] + "</option>";
            }
        }
        var optgroup = "<optgroup value='1' label='Schedules'>" + options + "</optgroup>";
        $(div).append(optgroup);
    }

    if (user_pipe_list.length > 0) {
        var options = '';
        for (var u_item in user_pipe_list) {
            if (user_pipe_list[u_item] !== 'None') {
                options += "<option value='" + u_item + "'>" + user_pipe_list[u_item] + "</option>";
            }
        }
        var optgroup = "<optgroup value='2' label='Quota Profiles'>" + options + "</optgroup>";
        $(div).append(optgroup);
    }
}

enable_table_controls = function (table) {

    $('#' + table).on('click', 'tbody tr', function () {

        var delay = 1;
        setTimeout(function () {
            if (selectedTableRowCount === 1) {
                $('.edit,.delete').removeAttr('disabled');
//                $('.create').attr('disabled', 'disabled');
            } else if (selectedTableRowCount === 0) {
//                $('.create').removeAttr('disabled');
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


// Dest

function Update_Dest_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    dest_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADDR_LIST, 0);
    req[1] = user_id;

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
            dest_rules[i] = row[i];
        }
        Display_Dest_Rule_Table();
        Init_WO_Param(1, 0, 1, 0, 1);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_Dest_Rule_Table() {

    dest_rule_table.clear().draw();

    for (var i = 0; i < dest_rules.length; i++) {
        var element = dest_rules[i].split("&");

        if (element[9] === '4294967295' || element[10] === '4294967295') {
            if (element[11] === '4294967295' || element[12] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[11] === '0' || element[12] === '0') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Block', '-', '-', 'Shape', user_pipe_list[element[11]], user_pipe_list[element[12]]]);
            }
        } else if (element[8] === '0' && (element[9] === '0' || element[10] === '0')) {
            if (element[11] === '4294967295' || element[12] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[11] === '0' || element[12] === '0') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'N/A', '-', '-', 'Shape', user_pipe_list[element[11]], user_pipe_list[element[12]]]);
            }
        } else if (element[8] !== '0' && (element[9] === '0' || element[10] === '0')) {
            if (element[11] === '4294967295' || element[12] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[11] === '0' || element[12] === '0') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Allow', '-', '-', 'Shape', user_pipe_list[element[11]], user_pipe_list[element[12]]]);
            }
        } else {
            if (element[11] === '4294967295' || element[12] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Shape', user_pipe_list[element[9]], user_pipe_list[element[10]], 'Block', '-', '-']);
            } else if (element[11] === '0' || element[12] === '0') {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Shape', user_pipe_list[element[9]], user_pipe_list[element[10]], 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], set_dest_rule_id(element[2], element[3], element[4], element[5], element[6], element[7]), schedule_list[element[8]], 'Shape', user_pipe_list[element[9]], user_pipe_list[element[10]], 'Shape', user_pipe_list[element[11]], user_pipe_list[element[12]]]);
            }
        }
    }
    dest_rule_table.draw(false);
}

set_dest_rule_id = function (ipv, ip0, ip1, ip2, ip3, mask) {
    if (parseInt(mask) !== 32 && parseInt(mask) !== 128) {
        return rec_ip_decode(parseInt(ipv), parseInt(ip0), parseInt(ip1), parseInt(ip2), parseInt(ip3), 1) + '/' + mask;
    } else
        return rec_ip_decode(parseInt(ipv), parseInt(ip0), parseInt(ip1), parseInt(ip2), parseInt(ip3), 1);
};

function set_dest_rule_edit_modal_elements() {
    var rule_data = dest_rule_table.row('.selected').data();
    $("#editDestRuleIP").val(rule_data[2]).attr("disabled", true);
    set_rule_table_pipes(WINDOW_RULE_DESTINATIONS, 3);
}

//URL

function Update_URL_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    url_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLRULE_LIST, 0);
    req[1] = user_id;

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
            url_rules[i] = row[i];
        }
        Display_URL_Rule_Table();
        Init_WO_Param(1, 0, 1, 0, 1);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_URL_Rule_Table() {

    url_rule_table.clear().draw();

    for (var i = 0; i < url_rules.length; i++) {
        var element = url_rules[i].split("&");

        if (element[6] === '4294967295' || element[7] === '4294967295') {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), element[3], get_dns_det(element[4]), schedule_list[element[5]],
                    'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Block', '-', '-', 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        } else if (element[5] === '0' && (element[6] === '0' || element[7] === '0')) {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'N/A', '-', '-', 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        } else if (element[5] !== '0' && (element[6] === '0' || element[7] === '0')) {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Allow', '-', '-', 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        } else {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]], 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]], 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]], 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
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

function set_url_rule_edit_modal_elements() {

    var rule_data = url_rule_table.row('.selected').data();

    $("#edit_url_rule_authen option").filter(function () {
        return this.text === rule_data[2];
    }).prop('selected', true);
    $("#edit_url_rule_authen").attr("disabled", true);

    $("#edit_url_rule_dns_det option").filter(function () {
        return this.text === rule_data[3];
    }).prop('selected', true);
    $("#edit_url_rule_dns_det").attr("disabled", true);

    $("#edit_url_to_rule").val(rule_data[4]).attr("disabled", true);
    set_rule_table_pipes(WINDOW_RULE_URL, 5);
}
// Applications

function Update_App_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    app_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_APPRULE_LIST, 0);
    req[1] = user_id;

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
            app_rules[i] = row[i];
        }
        Display_App_Rule_Table();
        Init_WO_Param(1, 0, 1, 0, 1);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_App_Rule_Table() {

    app_rule_table.clear().draw();

    for (var i = 0; i < app_rules.length; i++) {
        var element = app_rules[i].split("&");

        if (element[3] === '4294967295' || element[4] === '4294967295') {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Block', '-', '-', 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        } else if (element[2] === '0' && (element[3] === '0' || element[4] === '0')) {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'N/A', '-', '-', 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        } else if (element[2] !== '0' && (element[3] === '0' || element[4] === '0')) {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Allow', '-', '-', 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        } else {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Shape', user_pipe_list[element[3]], user_pipe_list[element[4]], 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Shape', user_pipe_list[element[3]], user_pipe_list[element[4]], 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Shape', user_pipe_list[element[3]], user_pipe_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        }
    }
    app_rule_table.draw(false);
}

function set_app_rule_edit_modal_elements() {
    var rule_data = app_rule_table.row('.selected').data();
    $("#editAddedApp").val(rule_data[2]).attr("disabled", true);
    set_rule_table_pipes(WINDOW_RULE_APPLICATIONS, 3);
}

//Services

function Update_Service_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    serv_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSITEM_LIST, 0);
    req[1] = user_id;

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
            serv_rules[i] = row[i];
        }
        Display_Service_Rule_Table();
        Init_WO_Param(1, 0, 1, 0, 1);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_Service_Rule_Table() {

    service_rule_table.clear().draw();

    for (var i = 0; i < serv_rules.length; i++) {
        var element = serv_rules[i].split("&");

        if (element[5] === '4294967295' || element[6] === '4294967295') {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Block', '-', '-', 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        } else if (element[4] === '0' && (element[5] === '0' || element[6] === '0')) {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'N/A', '-', '-', 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        } else if (element[4] !== '0' && (element[5] === '0' || element[6] === '0')) {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Allow', '-', '-', 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        } else {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]], 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]], 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]], 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        }
    }
    service_rule_table.draw(false);
}

function set_serv_rule_edit_modal_elements() {
    var rule_data = service_rule_table.row('.selected').data();

    $("#edit_serv_rule_port").val(rule_data[1]).attr("disabled", true);

    $("#edit_serv_rule_protocol option").filter(function () {
        return this.text === rule_data[3];
    }).prop('selected', true);

    $("#edit_serv_rule_protocol").attr("disabled", true);

    set_rule_table_pipes(WINDOW_RULE_SERVICE, 4);
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



///////////////////////////////////

function Update_Admin_Pipe_List() {

    admin_pipe_list = [];
    admin_pipe_list_data = [];
    admin_pipe_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADMIN_SHAPER_LIST, 0);

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
            admin_pipe_list_data[i] = row[i];
            var element = row[i].split("&");
            admin_pipe_list[element[0]] = element[1];
            admin_pipe_list_tt[element[0]] = row[i];
        }
        Display_Admin_Pipe_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Admin_Pipe_Table() {
    admin_pipe_table.clear().draw();
    for (var i = 0; i < admin_pipe_list_data.length; i++) {
        var element = admin_pipe_list_data[i].split("&");
        admin_pipe_table.row.add([element[0], element[1], element[2], element[3], pipe_priority(element[4]), element[5]]);
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

function set_admin_pipe_table_modal_elements() {
    var pipe_data = admin_pipe_table.row('.selected').data();
    $("#editAdminPipeName").val(pipe_data[1]);
    $("#editAdminPipeGuarantBW").val(pipe_data[2]);
    $("#editAdminPipeMaxBW").val(pipe_data[3]);
    $("#editPipePriority option").filter(function () {
        return this.text === pipe_data[4];
    }).prop('selected', true);
}

////////////////////

function Update_User_Pipe_List(user_id) {

    user_pipe_list = [];
    user_pipe_list_data = [];
    user_pipe_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_USER_SHAPER_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data)
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            user_pipe_list_data[i] = row[i];
            var element = row[i].split("&");
            user_pipe_list[element[1]] = element[3];
            user_pipe_list_tt[element[1]] = row[i];
        }
        Display_User_Pipe_Table();
        Init_WO_Param(0, 1, 0, 0, 1);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_User_Pipe_Table() {
    user_pipe_table.clear().draw();
    for (var i = 0; i < user_pipe_list_data.length; i++) {
        var element = user_pipe_list_data[i].split("&");
        var pipe_elem = admin_pipe_list_tt[element[2]].split('&');
        user_pipe_table.row.add([element[0], element[1], element[2], element[3], get_pipe_type(element[5], 0), get_pipe_type(element[5], 1), pipe_elem[2], pipe_elem[3], pipe_priority(element[4]), element[6]]);
    }
    user_pipe_table.draw(false);
}

function set_user_pipe_table_modal_elements() {
    var pipe_data = user_pipe_table.row('.selected').data();
    $("#edit_user_admin_pipe option").filter(function () {
        return this.text === admin_pipe_list[pipe_data[2]];
    }).prop('selected', true);
    $("#editUserPipeName").val(pipe_data[3]);
    $("#editUserPipeType option").filter(function () {
        return this.text === pipe_data[4];
    }).prop('selected', true);
    $("#editUserPipeType").attr("disabled", true);
    $("#editUserGroupingType option").filter(function () {
        return this.text === pipe_data[5];
    }).prop('selected', true);
    $("#editUserGroupingType").attr("disabled", true);
    $("#editUserPipeGuarantBW").val(pipe_data[6]).attr("disabled", true);
    $("#editUserPipeMaxBW").val(pipe_data[7]).attr("disabled", true);
    $("#editUserPipePriority").val(pipe_data[8]).attr("disabled", true);
}

/////////

function Update_Default_Pipe(user_id) {

    default_pipe_data = [];

    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, ML_GET_USER_DEF_SPR, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
//        console.log(data,  row.length)
        for (var i = 0; i < row.length - 1; i++) {
            default_pipe_data[i] = row[i];
        }
        Display_Default_Pipe_Table();
//        Init_WO_Param(0, 1, 0, 0);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Default_Pipe_Table() {
    default_pipe_table.clear().draw();
    for (var i = 0; i < default_pipe_data.length; i++) {
        var element = default_pipe_data[i].split("&");
        if (element[1] === '1') {
            default_pipe_table.row.add(['Allow', '-', '-', '-', '-', '-', '-']);
        } else
            default_pipe_table.row.add(['Shape', get_pipe_type(element[3], 0), pipe_priority(element[2]), element[4], element[6], element[5], element[7]]);
//        default_pipe_table.row.add([element[0], element[1], element[2], element[3], get_pipe_type(element[5], 0), get_pipe_type(element[5], 1), pipe_elem[2], pipe_elem[3], pipe_priority(element[4]), element[6]]);
    }
    default_pipe_table.draw(false);
}

function Edit_Default_Pipe() {

    var def_pipe_data = default_pipe_table.row(0).data();
//    var def_pipe_data = ['Shape', 'Shared', 'Low', 1500, 1000, 2500, 3000];
//    var def_pipe_data = ['Allow', '-', '-', '-', '-', '-', '-'];

    $("#edit_licensed_def_pipe_action option").filter(function () {
        return this.text === def_pipe_data[0];
    }).prop('selected', true);

    append_default_pipe('EditDefaultPipeModalContent', 'edit_licensed_def_pipe_action', 'editDefaultGurPipeDlink', 'editDefaultGurPipeUlink', 'editDefaultMaxPipeDlink', 'editDefaultMaxPipeUlink', 'edit_licensed_def_pipe');

    if (def_pipe_data[0] === 'Shape') {

        $("#editDefaultPipeType option").filter(function () {
            return this.text === def_pipe_data[1];
        }).prop('selected', true);

        $("#editDefaultPipePriority option").filter(function () {
            return this.text === def_pipe_data[2];
        }).prop('selected', true);

        $("#editDefaultGurPipeDlink").val(def_pipe_data[3]);
        $("#editDefaultGurPipeUlink").val(def_pipe_data[4]);
        $("#editDefaultMaxPipeDlink").val(def_pipe_data[5]);
        $("#editDefaultMaxPipeUlink").val(def_pipe_data[6]);
    }
    $("#EditDefaultPipeModal").show();
}

////////

function Update_Schedule_List(user_id) {

    schedule_list = [];
    schedule_list_data = [];
    schedule_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SCHD_LIST, 0);
    req[1] = user_id;

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
            schedule_list[element[1]] = element[2];
            schedule_list_tt[element[1]] = row[i];
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
        if (Schedule_Type(element[3]) === "Weekly Recurring") {
            schedule_table.row.add([element[0], element[1], element[2], Schedule_Type(element[3]), decode_days_of_week(element[4]), moment(element[5] * 1000).format("hh:mm a"), moment(element[6] * 1000).format("hh:mm a"), element[7]]);
        } else
            schedule_table.row.add([element[0], element[1], element[2], Schedule_Type(element[3]), Schedule_One_Time_Days(element[5], element[6]), moment(element[5] * 1000).format("hh:mm a"), moment(element[6] * 1000).format("hh:mm a"), element[7]]);
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
    $("#editScheduleName").val(schd_data[2]);
//    $("#editScheduleName").attr('disabled', true);
    $("#ScheduleCodeEdit").val(schd_data[3]);
    $("#ScheduleCodeEdit").attr('disabled', true);

    if (schd_data[3] === "Weekly Recurring") {
        for (var i = 0; i < schd_data[4].length; i++) {
            switch (schd_data[4][i]) {

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
        var st_date = moment(schd_data[5], "hh:mm a").unix();
        var end_date = moment(schd_data[6], "hh:mm a").unix();
        $("#editStartTimeRecur").val(moment(st_date * 1000).format("hh:mmA"));
        $("#editEndTimeRecur").val(moment(end_date * 1000).format("hh:mmA"));
    } else if (schd_data[3] === "One Time") {

        var date = [];
        if (schd_data[4].indexOf('-') > -1) {
            date = schd_data[4].split("- ");
        } else {
            date[0] = schd_data[4];
            date[1] = schd_data[4];
        }
        var st_date = moment(date[0] + ' ' + schd_data[5], "Do MMMM YYYY hh:mm a").unix();
        var end_date = moment(date[1] + ' ' + schd_data[6], "Do MMMM YYYY hh:mm a").unix();
        console.log(moment(st_date * 1000).format("MMMM Do YYYY - hh:mm a"))
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

    var opt = schedule_table.row('.selected').data()[3];
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
};

// User related

function set_user_for_rules() {
    global_rule_user = parseInt($("#rule_user_modal_dropdown option:selected").val());
    $("#rule_user_label").text(user_profile_lookup_list[global_rule_user]);
    document.getElementById('RuleUserModal').style.display = "none";
//    reload_user_based_interface();
    Init_WO_Param(1, 1, 1, 1, 1);
}

get_first_rule_user_index = function (e) {
    var user;
    var index;
    if (user_profile_lookup_list.length) {
        user = user_profile_lookup_list.find(function (e) {
            return !!e
        });
        index = user_profile_lookup_list.indexOf(user);
        return index;
    } else
        return 0;
};


get_user_based_rules = function () {

    switch (CURRENT_WINDOW) {

        case WINDOW_RULE_DESTINATIONS:

            clear_and_init_sched_quota_list('#add_dest_rule_schedule');
            clear_and_init_sched_quota_list('#edit_dest_rule_schedule');
            clear_and_init_list('#add_dest_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_dest_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_dest_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_dest_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_def_ulink_pipe', user_pipe_list);

            Update_Dest_Rules(global_rule_user);
            break;
        case WINDOW_RULE_URL:

            clear_and_init_sched_quota_list('#add_url_rule_schedule');
            clear_and_init_sched_quota_list('#edit_url_rule_schedule');
            clear_and_init_list('#add_url_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_url_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_url_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_url_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_def_ulink_pipe', user_pipe_list);

            Update_URL_Rules(global_rule_user);
            break;
        case WINDOW_RULE_APPLICATIONS:

            clear_and_init_sched_quota_list('#add_app_rule_schedule');
            clear_and_init_sched_quota_list('#edit_app_rule_schedule');
            clear_and_init_list('#add_app_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_app_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_app_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_app_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_def_ulink_pipe', user_pipe_list);

            Update_App_Rules(global_rule_user);
            break;
        case WINDOW_RULE_SERVICE:

            clear_and_init_sched_quota_list('#add_serv_rule_schedule');
            clear_and_init_sched_quota_list('#edit_serv_rule_schedule');
            clear_and_init_list('#add_serv_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_serv_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_serv_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_serv_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_def_ulink_pipe', user_pipe_list);

            Update_Service_Rules(global_rule_user);
            break;
        case WINDOW_OBJ_SCHEDULE:
            Display_Schedule_Table();
            break;
        case WINDOW_OBJ_USER_PIPES:
            Display_User_Pipe_Table();
            break;

        case WINDOW_USER_SUMMARY:
            load_user_sum_window();
            break;

    }
};

reload_user_based_interface = function () {

    if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
        link_util_flag = true;
        is_bwm_app_req_init = false;
        is_app_grap_init = false;
        lapp_bwutil_last_update_time[0] = 0;
        lapp_bwutil_dbuff[0] = [];
        lapp_bwutil_dbuff[1] = [];
        prev_tstamp= 0;
        btn_link_util_bw_load_now(1);
    } else {
        var temp_win = CURRENT_WINDOW;
        CURRENT_WINDOW = 0;
        load_window(temp_win);
    }
};