var lu_plot = [];
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

var URL_WATCH_FLAG;

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

var labwu_make_request = function (req_data) {
    var req = new Uint32Array(3);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = pq_2_16_32(req_data.link, req_data.chanel);
    return req.buffer;
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
                }
            });
    lu_plot[gid] = graph;
    return  gid;
};

labwu_update_start = function (id, data) {
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

labwu_update_end = function (id) {
};


/// USer bw

var labwu_user_make_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
//    console.log("labwu_user_make_request "+req[1])
    return req.buffer;
};

var labwu_user_graph_init = function (div_s, div_r, color_s, color_r, gid) {

    if (lu_dbuff[gid] == null) {

        var data = [];
        var clr_s = [];
        var clr_r = [];
        data.push([0, 0]);
        clr_s.push([color_s]);
        clr_r.push([color_r]);
        lu_color[gid] = [color_s];
        lu_color[gid + 1] = [color_r];
        lu_dbuff[gid] = data;
        lu_dbuff[gid + 1] = data;
        lssd_ref_time[gid] = 0;
        lu_cbuff[gid] = clr_s;
        lu_cbuff[gid + 1] = clr_r;
        lu_last_update_time[gid] = 0;
        lu_last_update_time[gid + 1] = 0;

    }
    var av_graph_send = new Dygraph(document.getElementById(div_s), lu_dbuff[gid], lu_cbuff[gid], 0, gid,
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

    var av_graph_receive = new Dygraph(document.getElementById(div_r), lu_dbuff[gid + 1], lu_cbuff[gid + 1], 0, (gid + 1),
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

    lu_plot[gid] = av_graph_send;
    lu_plot[gid + 1] = av_graph_receive;

    return  gid;
};

labwu_user_update_start = function (id, data) {

    lu_plot[id].resize();
    lu_plot[id + 1].resize();
    lu_dbuff[id] = [];
    lu_cbuff[id].length = 0;
    lu_dbuff[id + 1] = [];
    lu_cbuff[id + 1].length = 0;
    lu_bwg_prv_ts[id] = 0;
    lu_bwg_prv_ts[id + 1] = 0;
    lu_bwg_prv_csc_cnt[id] = 0;
    lu_bwg_prv_csc_cnt[id + 1] = 0;
    lu_last_update_time[id] = 0;
    lu_last_update_time[id + 1] = 0;
};

labwu_user_update = function (id, data) {
//    console.log(id, data)
    var data_len;

    if (!(data.length % 3)) {
        data_len = data.length;
    } else {
        data_len = data.length - 1;
    }

    if (data_len % 3 === 0) {
        var time;
        for (var i = 0; i < data_len; i = i + 3) {
            var bw_s = uint32_float(data[i]);
            var bw_r = uint32_float(data[i + 1]);//(data[i] * 8 / (1000));
            //var bw_f = uint32_float(data[i]);
            var tstamp = data[i + 2];
//            console.log(tstamp, bw_s, bw_r)
            if (tstamp > 0) {
                //Add Data to Graph
                time = new Date(tstamp * 10 * 1000);

                if (lu_bwg_prv_ts[id] !== 0) {
                    if ((time - lu_bwg_prv_ts[id]) >= 30000) {
                        var time_p = new Date(lu_bwg_prv_ts[id] + 10000 / 2);
                        var time_n = new Date(time.getTime() - 10000 / 2);
                        lu_dbuff[id].push([time_p, 0]);
                        lu_dbuff[id].push([time_n, 0]);
                    }
                }

                if (lu_bwg_prv_ts[id + 1] !== 0) {
                    if ((time - lu_bwg_prv_ts[id + 1]) >= 30000) {
                        var time_p = new Date(lu_bwg_prv_ts[id + 1] + 10000 / 2);
                        var time_n = new Date(time.getTime() - 10000 / 2);
                        lu_dbuff[id + 1].push([time_p, 0]);
                        lu_dbuff[id + 1].push([time_n, 0]);
                    }
                }


                if (time >= lu_bwg_prv_ts[id]) {
                    lu_bwg_prv_ts[id] = time;
                    lu_bwg_prv_csc_cnt[id] = 0;
                    lu_dbuff[id].push([time, bw_s]);

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

                if (time >= lu_bwg_prv_ts[id + 1]) {
                    lu_bwg_prv_ts[id + 1] = time;
                    lu_bwg_prv_csc_cnt[id + 1] = 0;
                    lu_dbuff[id + 1].push([time, bw_r]);

                    if (lu_cbuff[id + 1].length <= 1400) {
                        lu_cbuff[id + 1].push(lu_color[id + 1]);
                    }
                    //Remove Old Points from Graph
                    if (lu_dbuff[id + 1].length > 1400) {
                        lu_dbuff[id + 1].shift();
                    }
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = lu_last_update_time[id + 1];
                    lu_bwg_prv_csc_cnt[id + 1]++;
                    if (lu_bwg_prv_csc_cnt[id + 1] > 3) {
                        lu_dbuff[id + 1].pop();
                        lu_bwg_prv_ts[id + 1] = time;
                    }
                }
            }
        }
        //Render the Graph

        if (time - lu_last_update_time[id] >= 1000) {
            lu_last_update_time[id] = time;
            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
        }

        if (time - lu_last_update_time[id + 1] >= 1000) {
            lu_last_update_time[id + 1] = time;
            lu_plot[id + 1].updateOptions({'file': lu_dbuff[id + 1]});
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
var lssd_prev_tspan = 0;

var lssd_make_request = function (req_data) {

    var req = new Uint32Array(14);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = pq_2_16_32(req_data.sip_t, req_data.dip_t);    
    req[3] = req_data.sip1;
    req[4] = req_data.sip2;
    req[5] = req_data.sip3;
    req[6] = req_data.sip4;
    req[7] = req_data.dip1;
    req[8] = req_data.dip2;
    req[9] = req_data.dip3;
    req[10] = req_data.dip4;
    req[11] = pq_2_16_32(req_data.sport, req_data.dport);
    req[12] = pq_2_16_32(req_data.vid, req_data.prot);
    req[13] = req_data.app;
//    console.log(req)
    return req.buffer;
};

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

var lssd_graph_init = function (type, div_s, div_r, color_s, color_r, lbl_s, lbl_r, pkt_s, pkt_r, status_bar, gid) {

    var data = [];
    var clr_s = [];
    var clr_r = [];
    if (type == LSES_UPDATE) {
        data.push([0, 0]);
        clr_s.push([color_s]);
        clr_r.push([color_r]);
        lssd_color[gid] = [color_s];
        lssd_color[gid + 1] = [color_r];
    } else {
        data.push([0, 0, 0]);
        clr_s.push([color_r, color_s]);
        clr_r.push([color_r, color_s]);
        lssd_color[gid] = [color_r, color_s];
//        lssd_color[gid + 1] = [color_s, color_r];
    }
    lssd_dbuff[gid] = data;
    lssd_dbuff[gid + 1] = data;
    lssd_ref_time[gid] = 0;
    lssd_cbuff[gid] = clr_s;
    lssd_cbuff[gid + 1] = clr_r;
    lssd_label[gid] = [$(lbl_s), $(pkt_s)];
    lssd_label[gid + 1] = [$(lbl_r), $(pkt_r)];
    lssd_status_bar[gid] = [$(status_bar)];
    lssd_status_bar[gid + 1] = [$(status_bar)];
    lssd_tbw[gid] = 0;
    lssd_tbw[gid + 1] = 0;
    lssd_last_update_time[gid] = 0;
    lssd_last_update_time[gid + 1] = 0;

    if (type == LSES_UPDATE) {

        var av_graph_send = new Dygraph(document.getElementById(div_s), lssd_dbuff[gid], lssd_cbuff[gid], 0, (gid),
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

        var av_graph_receive = new Dygraph(document.getElementById(div_r), lssd_dbuff[gid + 1], lssd_cbuff[gid + 1], 0, (gid + 1),
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
        lssd_plot[gid] = av_graph_send;
        lssd_plot[gid + 1] = av_graph_receive;

    } else {
        var graph_send_rec = new Dygraph(document.getElementById(div_s), lssd_dbuff[gid], lssd_cbuff[gid], 0, gid,
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
    }
    return  gid;
};

lssd_update_start = function (type, id, data) {
//    console.log(type, id, data)
    lssd_dbuff[id] = [];
    lssd_cbuff[id].length = 0;
    lssd_dbuff[id + 1] = [];
    lssd_cbuff[id + 1].length = 0;
    lssd_tbw[id] = 0;
    lssd_tbw[id + 1] = 0;
    lssd_pkt[id] = 0;
    lssd_pkt[id + 1] = 0;
    lssd_label[id][0].text('Data Sent : 0 MB');
    lssd_label[id][1].text('Packets Sent : 0');
    lssd_label[id + 1][0].text('Data Received : 0 MB');
    lssd_label[id + 1][1].text('Packets Received : 0');
    lssd_status_bar[id][0].css('background-color', '#005d00');
};

lses_update = function (id, data) {
//    console.log(data)    
    if (!(data.length % 5)) {
        data_len = data.length;
    } else {
        data_len = data.length - 1;
    }

    if (data_len % 5 === 0) {
        for (var i = 0; i < data_len; i = i + 5) {
            var bw_s = data[i];
            var bw_r = data[i + 1];
            var pkt_s = data[i + 2];
            var pkt_r = data[i + 3];
            var tstamp = data[i + 4] * 10 * 1000;

            lssd_dbuff[id].push([(new Date(tstamp)), uint32_float(bw_s)]);
            lssd_dbuff[id + 1].push([(new Date(tstamp)), uint32_float(bw_r)]);

            lssd_tbw[id] += uint32_float(bw_s) * 1000 * 1000 * 10 / 8;
            lssd_tbw[id + 1] += uint32_float(bw_r) * 1000 * 1000 * 10 / 8;

            lssd_pkt[id] += pkt_s;
            lssd_pkt[id + 1] += pkt_r;

            if (lssd_cbuff[id].length < 100) {
                lssd_cbuff[id].push(lssd_color[id]);
                lssd_cbuff[id + 1].push(lssd_color[id + 1]);
            }

            if (lssd_dbuff[id].length > 100) {
                lssd_dbuff[id].shift();
            }
            if (lssd_dbuff[id + 1].length > 100) {
                lssd_dbuff[id + 1].shift();
            }
            if (tstamp - lssd_last_update_time[id] > 1000 || lssd_last_update_time[id] > tstamp) {
                lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
                lssd_label[id][0].text('Data Sent : ' + pq_get_usage(lssd_tbw[id]));
                lssd_label[id][1].text('Packets Sent : ' + lssd_pkt[id]);
                lssd_label[id + 1][0].text('Data Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                lssd_label[id + 1][1].text('Packets Received : ' + lssd_pkt[id + 1]);

                lssd_last_update_time[id] = tstamp;
            }
        }
    } else {
        console.log('Invalid SSD Bandwidth Data');
    }
};

lssc_update = function (id, data) {
//    console.log(data.length+'_'+data)
    var data_len;

    if (!(data.length % 5)) {
        data_len = data.length;
    } else {
        data_len = data.length - 1;
    }

    if (data_len % 5 === 0) {
        for (var i = 0; i < data_len; i = i + 5) {
            var bw_s = data[i];
            var bw_r = data[i + 1];
            var pkt_s = data[i + 2];
            var pkt_r = data[i + 3];
            var tstamp = data[i + 4] * 10 * 1000;
//            console.log(bw_s, bw_r, pkt_s, pkt_r, tstamp)

            if (lssd_dbuff[id].length == 1) {
                lssd_dbuff[id].shift();
                lssd_dbuff[id].push([(new Date(tstamp - 1400 * 100)), 0, 0]);
                lssd_cbuff[id].push(lssd_color[id]);
                lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
            }
            if (lssd_prev_tspan !== 0) {
                if (tstamp - lssd_prev_tspan >= 20000) {
                    var time_next = new Date((tstamp - 1000));
                    var time_prev = new Date((lssd_prev_tspan + 1000));
                    lssd_dbuff[id].push([time_prev, 0, 0]);
                    lssd_dbuff[id].push([time_next, 0, 0]);
                }
            }
            lssd_prev_tspan = tstamp;

            //Add Data to Graph
            lssd_dbuff[id].push([(new Date(tstamp)), uint32_float(bw_s), uint32_float(bw_r)]);

            lssd_tbw[id] += uint32_float(bw_s) * 1000 * 1000 * 10 / 8;
            lssd_tbw[id + 1] += uint32_float(bw_r) * 1000 * 1000 * 10 / 8;
            lssd_pkt[id] += pkt_s;
            lssd_pkt[id + 1] += pkt_r;

            if (lssd_cbuff[id].length < 100) {
                lssd_cbuff[id].push(lssd_color[id]);
            }
            if (lssd_dbuff[id].length > 100) {
                lssd_dbuff[id].shift();
            }

            if (tstamp - lssd_last_update_time[id] > 1000) {
                lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                lssd_label[id][0].text('Data Sent : ' + pq_get_usage(lssd_tbw[id]));
                lssd_label[id][1].text('Packets Sent : ' + lssd_pkt[id]);
                lssd_label[id + 1][0].text('Data Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                lssd_label[id + 1][1].text('Packets Received : ' + lssd_pkt[id + 1]);
                lssd_last_update_time[id] = tstamp;
                //console.log("last: " + lssd_last_update_time[id]);
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
    lapp_dlink_buffer = [];
    lapp_ulink_buffer = [];
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

lurlst_uend = function (id) {
    $('#pq_lurlw_status_ind').css('background-color', 'gray');
    $('#pq_lurlw_status_text').text('Status: Inactive');
};

lurldata_ustart = function (type, id) {
//    console.log("LURL DAT UP_" + type + "_" + id)
    sc_cd_type = CLIENT_DIAGRAM;
    lurl_dbuff[id] = [];
    lurl_cbuff[id].length = 0;
    lurl_remove_count[id] = 0;

    urlw_http_list.clear();
    urlw_https_list.clear();
    urlw_dns_list.clear();
};

lurldata_update = function (id, data, row_data) {
    if (CURRENT_WINDOW !== WINDOW_LIVE_URL_WATCH) {
        return;
    }
//    console.log('URL WATCH: ' + data + "_" + row_data + "_" + data.length)
    var data_length = data.length;
    if(data_length % 21 !== 0){
        data_length = data_length-1;
    } 
    
    if (data_length % 21 === 0) {
        for (var urldc = 0; urldc < data_length; urldc += 21) {
            var tl = pq_32_2_16(data[urldc]);
            var ip_type = pq_32_2_16(data[urldc + 1]);
            var type = tl.one;
            var length = tl.two;

            var ip = [];
            var ip_o_p = [];
            ip[0] = data[urldc + 2];
            ip[1] = data[urldc + 3];
            ip[2] = data[urldc + 4];
            ip[3] = data[urldc + 5];
            ip_o_p[0] = data[urldc + 6];
            ip_o_p[1] = data[urldc + 7];
            ip_o_p[2] = data[urldc + 8];
            ip_o_p[3] = data[urldc + 9];

            var url = String.fromCharCode.apply(null, new Uint8Array(row_data, (urldc + 10) * 4, length));

            if (URL_WATCH_FLAG) {
                if (type == 0) {
                    if (urlw_http_list.size() > 32) {
                        urlw_http_list.items.shift();
                    }
                    urlw_http_list.add({wurl: url, wuip: '' + rec_ip_decode(ip_type.two, ip[0], ip[1], ip[2], ip[3], 0), wuport: 'port: ' + ip_o_p[0]});
                } else if (type == 1) {
                    if (urlw_https_list.size() > 32) {
                        urlw_https_list.items.shift();
                    }
                    urlw_https_list.add({wurl: url, wuip: '' + rec_ip_decode(ip_type.two, ip[0], ip[1], ip[2], ip[3], 0), wuport: 'port: ' + ip_o_p[0]});
                } else if (type == 2) {
                    if (urlw_dns_list.size() > 32) {
                        urlw_dns_list.items.shift();
                    }
                    urlw_dns_list.add({wurl: url, wuip: '' + rec_ip_decode(ip_type.one, ip[0], ip[1], ip[2], ip[3], 0), wuport: '' + rec_ip_decode(ip_type.one, ip_o_p[0], ip_o_p[1], ip_o_p[2], ip_o_p[3], 0)});
               } else {
                    var time = new Date(data[urldc + 13] * 1000 * 10);
                    lurl_dbuff[id].push([time, data[urldc + 10], data[urldc + 11], data[urldc + 12]]);
                    if (lurl_cbuff[id].length < 512) {
                        lurl_cbuff[id].push(lurl_color[id]);
                        if (lurl_remove_count[id] < 3) {
                            lurl_dbuff[id].shift();
                            lurl_remove_count[id]++;
                        }
                    } else {
                        lurl_dbuff[id].shift();
                    }
                    if (lurl_dbuff[id].length > 0) {
                        lurl_plot[id].updateOptions({'file': lurl_dbuff[id]});
                    }
                }
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
        if (type === LABW_UPDATE) {
            lcjs_req_conn[id].send(labwu_make_request(request));
        } else if (type === LMLTS_UBW_UPDATE || type === LMLTAPPU_UPDATE) {
            lcjs_req_conn[id].send(labwu_user_make_request(request));
        } else if (type === LSES_UPDATE || type === LSRC_UPDATE || type === LDES_UPDATE || type === LAPP_UPDATE || type === LSVS_UPDATE || type === LURLDATA_UPDATE) {
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
            if (req[0] === LABW_UPDATE) {
                lcjs_req_conn[id].send(labwu_make_request(req[1]));
            } else if (req[0] === LMLTS_UBW_UPDATE || req[0] === LMLTAPPU_UPDATE) {
                lcjs_req_conn[id].send(labwu_user_make_request(req[1]));
            } else if (req[0] === LSES_UPDATE || req[0] === LSRC_UPDATE || req[0] === LDES_UPDATE || req[0] === LAPP_UPDATE || req[0] === LSVS_UPDATE || req[0] === LURLDATA_UPDATE) {
                lcjs_req_conn[id].send(lssd_make_request(req[1]));
            } else if (req[0] === 200) {
                lcjs_req_conn[id].send(lcju_make_auth_req(req[1]));
            }
        }
    }
};

var lcjs_request_cbk = function (id, data) {
    var data_q = new Uint32Array(data);
//    console.log("LCJ_CBK " + data_q.length)
    if (data_q.length % 2 !== 0) { //request component
        var rep = pq_32_4_8(data_q[0]);
//        console.log(rep)
        if (rep.one === CJS_REQUEST_START) {
            if (rep.two === GRAPH_UPDATE) {
                lcjs_request[id] = rep;
                if (rep.three === LMLTAPPU_UPDATE) {
                    lapp_bwutil_update_start(rep.four, data_q);
                } else if (rep.three === LMLTS_UBW_UPDATE) {
                    labwu_user_update_start(rep.four, data_q);
                } else if (rep.three === LABW_UPDATE) {
                    labwu_update_start(rep.four, data_q);
                } else if (rep.three === LSES_UPDATE || rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE || rep.three == LSVS_UPDATE) {
                    lssd_update_start(rep.three, rep.four, data_q);
                } else if (rep.three === LURLDATA_UPDATE) {
                    lurldata_ustart(rep.three, rep.four);
                }
            } else {
                console.log("unknown live request start");
            }
        } else if (rep.one === CJS_REQUEST_END) {
            if (rep.two === GRAPH_UPDATE) {
                if (rep.three === LMLTAPPU_UPDATE) {
                    labwu_update_end(rep.four);
                } else if (rep.three === LMLTS_UBW_UPDATE) {
                    labwu_update_end(rep.four);
                } else if (rep.three === LSES_UPDATE || rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE || rep.three == LSVS_UPDATE) {
                    lssd_update_end(rep.three, rep.four);
                } else if (rep.three === LURLDATA_UPDATE) {
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
//        console.log("Req " + id + " " + lcjs_request[id].two + " " + lcjs_request[id].three)
        if (lcjs_request[id].two === GRAPH_UPDATE) {
            if (lcjs_request[id].three === LABW_UPDATE) {
                var graph_id = lcjs_request[id].four;
                labwu_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LMLTAPPU_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lapp_bwutil_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LSES_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lses_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LSRC_UPDATE ||
                    lcjs_request[id].three === LDES_UPDATE ||
                    lcjs_request[id].three === LAPP_UPDATE ||
                    lcjs_request[id].three === LSVS_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lssc_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LMLTS_UBW_UPDATE) {
                var graph_id = lcjs_request[id].four;
                labwu_user_update(graph_id, data_q);
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
            var modal = document.getElementById('DisconnectModal');
            modal.style.display = "block";            
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

