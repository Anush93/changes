var app_link_util_table;
var prev_tstamp;
var prev_user_tstamp;
//var primary_user_ip;

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

var user_app_watch_prof_lookup = [];

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

function init_link_utilization(type, id, upd_flag) {
//console.log("init_link_utilization")
    if (upd_flag) {
        Display_link_Util_Table(type, id);
    }
    if (!is_app_grap_init) {
        var dash_dl = lapp_bw_util_graph_init("AppBwm_Ntwrk_Dlink_Plot", "AppBwm_Ntwrk_Ulink_Plot", 0);
        is_app_grap_init = true;
    }
    if (!is_bwm_app_req_init) {
        var live_appbwm_id = lcjs_init_request_connection('lcjsreq');
        var lbw_req_dl = {
            type: GRAPH_UPDATE,
            id: LMLTAPPU_UPDATE,
            uid: global_rule_user,
            gid: dash_dl
        };
        lcjs_make_request(live_appbwm_id, LMLTAPPU_UPDATE, lbw_req_dl);
        is_bwm_app_req_init = true;
    }
    set_primary_device(app_link_util_table, false);
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
        return " <a href='#'><img src='image/delete.png' id='" + id + "' style='width:16px;height:16px;margin-left:7px;' class='setAppBwPrimary' onClick=delete_app_bwm_prof_item(" + index + "," + id + ") style='margin-left: 2px'></a>";
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
    return "<input type='button' class='jscolor setAppBwPrimary' id='app_bwm_col_pickr_" + id + "' style='width:40px; height:7px;border:none;font-size:0px;background-color: " + prof_color_codes[id] + " ' value=" + prof_color_codes[id] + " onchange='changeColor(this ," + index + "," + id + ")'>";
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
    if (id === 2) {
        $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", 100);
        $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", -10);
        $("#AppBwm_User_Dlink_Plot").css("z-index", -10);
        $("#AppBwm_User_Ulink_Plot").css("z-index", -10);
        $("#bwm_prof_plot_title").text('Uplink Utilization');
    } else {
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
        prev_tstamp = 0;
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

function change_visibility(e) {

    var chk_d_id = e.id.split("_");
    if (e.checked) {
        checked_link_util_app_list.push(parseInt(chk_d_id[1]));
    } else {
        var index = checked_link_util_app_list.indexOf(parseInt(chk_d_id[1]));
        checked_link_util_app_list.splice(index, 1);
    }
    gd_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    gu_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
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
                console.log(tstamp + '  ' + application_list[app_id] + '  ' + bw_d + '  ' + bw_u)
//                }
                if (tstamp === prev_tstamp) {
                    lapp_dlink_buffer[app_id + 1] = bw_d;
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                } else {
                    if (lapp_dlink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                    }
                    if (lapp_ulink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                    }                    
                    if (prev_tstamp !== 0) {
                        console.log(new Date(tstamp * 10000), tstamp, prev_tstamp, (tstamp - prev_tstamp), bw_d)
                        if ((tstamp - prev_tstamp) >= 2) {
//                            console.log(bw_d)
                            var time_p = prev_tstamp + 0.5;
                            var time_n = tstamp - 0.5;
                            
                            lapp_dlink_buffer = [];
                            lapp_dlink_buffer.length = application_list.length + 1;   
                            lapp_dlink_buffer.fill(0);

                            lapp_dlink_buffer[0] = new Date(time_p * 10000);
//                            console.log(lapp_dlink_buffer)
                            lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                            lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                            
                            lapp_dlink_buffer[0] = new Date(time_n * 10000);
//                            console.log(lapp_dlink_buffer)
                            lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                            lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                        }
                    }

//                    if (lapp_dlink_buffer.length > 0) {
//                        lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
//                    }
//                    if (lapp_ulink_buffer.length > 0) {
//                        lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
//                    }
                    prev_tstamp = tstamp;                    

                    lapp_dlink_buffer = [];
                    lapp_dlink_buffer.length = application_list.length + 1;                    
                    lapp_dlink_buffer.fill(0);
                    lapp_dlink_buffer[0] = new Date(tstamp * 10000);
                    lapp_dlink_buffer[app_id + 1] = bw_d;

                    lapp_ulink_buffer = [];
                    lapp_ulink_buffer.length = application_list.length + 1;
                    lapp_ulink_buffer.fill(0);
                    lapp_ulink_buffer[0] = new Date(tstamp * 10000);
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                }

                if (lapp_bwutil_dbuff[id].length > 360) {
                    lapp_bwutil_dbuff[id].shift();
                }

                if (lapp_bwutil_dbuff[id + 1].length > 360) {
                    lapp_bwutil_dbuff[id + 1].shift();
                }
                
            }
        }

        if ((tstamp - lapp_bwutil_last_update_time[id] >= 1) || data.length < 128) {
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

    var cmd_buffer = update_acjs_elements(WO_AWPROF_LIST_ADD, name, global_rule_user, 0, 0, 0, 0, 0);

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
    var cmd_buffer = update_acjs_elements(WO_AWPROF_LIST_DELETE, '', global_rule_user, user_app_watch_prof_lookup.indexOf(key), 0, 0, 0, 0);

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
//console.log("get_app_bwm_prof")
    app_bwm_prof_list = [];
    app_bwm_prof_list_data = [];
    user_app_watch_prof_lookup = [];

    var cmd_buffer = update_acjs_elements(WO_GET_AWPROF_LIST, '', global_rule_user, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data)
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_bwm_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            user_app_watch_prof_lookup[element[0]] = parseInt(BWM_APP_PROF_COUNT - i);
            app_bwm_prof_list[parseInt(BWM_APP_PROF_COUNT - user_app_watch_prof_lookup[element[0]])] = element[1];
        }
        display_app_bwm_prof();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Add Apps to App profiles

add_app_bwm_prof_item = function (pkey, appId, color) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_ADD, color, global_rule_user, user_app_watch_prof_lookup.indexOf(pkey), appId, 0, 0, 0);

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

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_UPDATE, color, global_rule_user, user_app_watch_prof_lookup.indexOf(pkey), appId, 0, 0, 0);

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

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_DELETE, '', global_rule_user, user_app_watch_prof_lookup.indexOf(pkey), appId, 0, 0, 0);

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
//    console.log("Key " + key + "Look " + user_app_watch_prof_lookup.indexOf(key))
    app_bwm_prof_app_list[parseInt(BWM_APP_PROF_COUNT - key)] = [];

    var cmd_buffer = update_acjs_elements(WO_GET_AWPROF_ITEM_LIST, '', pq_2_16_32(global_rule_user, user_app_watch_prof_lookup.indexOf(key)), 0, 0, 0, 0, 0);
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
            app_bwm_prof_app_list[parseInt(BWM_APP_PROF_COUNT - user_app_watch_prof_lookup[element[0]])].push({appID: element[1], color: element[2]});
        }

        if (status) {
            var index = parseInt(BWM_APP_PROF_COUNT - key);
            init_app_bwm_table(index, 1);
            var app_dlink_util_table_button = new $.fn.dataTable.Buttons(app_link_util_table, {
                "buttons": [{text: 'Add Application',
                        className: 'add_app_prof_button setPrimary',
                        action: function (e, dt, node, config) {
                            init_add_app_bwm_prof(index);
                        }},
                    {text: 'Delete Profile',
                        className: 'del_app_prof_button setPrimary',
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
};