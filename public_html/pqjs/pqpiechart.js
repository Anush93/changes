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
                uid: global_rule_user,
                lid: SUMRY_SRC_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_SRC_UPDATE, sum_req);
            break;
        case 2:
            var sum_req = {
                type: SESSION_UPDATE,
                id: SUMRY_DEST_UPDATE,
                uid: global_rule_user,
                lid: SUMRY_DEST_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_DEST_UPDATE, sum_req);
            break;
        case 3:
            var ses_req = {
                type: SESSION_UPDATE,
                id: SUMRY_APP_UPDATE,
                uid: global_rule_user,
                lid: SUMRY_APP_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_APP_UPDATE, ses_req);
            break;
    }
}
