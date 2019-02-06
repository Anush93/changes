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
        uid: global_rule_user,
        gid: 0,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
};

function refresh_trafic_dgm_now() {
    $('#diagram_tc_out,#diagram_tc_in').empty();
    var fdis = pq_get_flow_descriptor();

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        uid: global_rule_user,
        gid: 0,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
    };
    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
}

function get_prev_trafic_dgm_now() {
    $('#diagram_tc_out,#diagram_tc_in').empty();
    var ssId = 6;
    var fdis = pq_get_flow_prev(ssId);

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        uid: global_rule_user,
        gid: 0,
        sipv: fdis.sipv,
        dipv: fdis.dipv,
        sip0: fdis.sip0,
        sip1: fdis.sip1,
        sip2: fdis.sip2,
        sip3: fdis.sip3,
        dip0: fdis.dip0,
        dip1: fdis.dip1,
        dip2: fdis.dip2,
        dip3: fdis.dip3,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app,
        sipr0: fdis.sipr0,
        sipr1: fdis.sipr1,
        sipr2: fdis.sipr2,
        sipr3: fdis.sipr3,
        dipr0: fdis.dipr0,
        dipr1: fdis.dipr1,
        dipr2: fdis.dipr2,
        dipr3: fdis.dipr3
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
                return +6;
            })
            .text(function (d) {
                return d.key;
            })
            .attr("text-anchor", function (d) {
                return (d.part === "primary" ? "end" : "start");
            });
    g_out[0].selectAll(".mainBars").append("text").attr("class", "perc")
            .attr("x", function (d) {
                return (d.part === "primary" ? -95 : 30);
            })
            .attr("y", function (d) {
                return +6;
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
                return +6;
            })
            .text(function (d) {
                return d.key;
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
    
    var Sip = [0,0,0,0];
    var Dip = [0,0,0,0];
    
    if(validateIP(sip)||validateIPv6(sip)){
        Sip = send_ip_encode(decode_ip_version(sip), sip, 1);
    }
    if(validateIP(sip)||validateIPv6(sip)){
        Dip = send_ip_encode(decode_ip_version(dip), dip, 1);
    }

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        uid: global_rule_user,
        gid: 0,
        sipv: decode_ip_version(sip),
        dipv: decode_ip_version(dip),
        sip0: Sip[0],
        sip1: Sip[1],
        sip2: Sip[2],
        sip3: Sip[3],
        dip0: Dip[0],
        dip1: Dip[1],
        dip2: Dip[2],
        dip3: Dip[3],
        sport: 0,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0,
        sipr0: 0,
        sipr1: 0,
        sipr2: 0,
        sipr3: 0,
        dipr0: 0,
        dipr1: 0,
        dipr2: 0,
        dipr3: 0
    };
    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
}