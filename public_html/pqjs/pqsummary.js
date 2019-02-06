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

        if (CURRENT_WINDOW === WINDOW_USER_SUMMARY) {
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
        uid: global_rule_user,
        lid: SESSION_APP_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_SDC_UPDATE, sum_req);
}

function redirect_live_watch(name, id, arr_id) {

    var data = [];
    switch (id) {
        case 0:
            var user = 'N/A';
            if (isNaN(dot2num(name))) {
                user = name;
                var index = _globle_pie_mapper[id][name];
                name = data_pq_sum_srcs_ip[index];
            }
            data = [name, user];
            load_src_live_watch_window(data, 0);
            break;
        case 1:
            var url = 0;
            if (isNaN(dot2num(name))) {
                url = name;
                var index = _globle_pie_mapper[id][name];
                name = data_pq_sum_dests_ip[index];
            }
            data = [name, url, 'N/A'];
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
        case 6:
            var url = 0;
            if (isNaN(dot2num(name))) {
                url = name;
                name = data_pq_dash_dlink_items[arr_id];
            }
            data = [name, url, 'N/A'];
            load_dest_live_watch_window(data, 1);
            break;
        case 7:
            var url = 0;
            if (isNaN(dot2num(name))) {
                url = name;
                name = data_pq_dash_ulink_items[arr_id];
            }
            data = [name, url, 'N/A'];
            load_dest_live_watch_window(data, 1);
            break;
    }
}