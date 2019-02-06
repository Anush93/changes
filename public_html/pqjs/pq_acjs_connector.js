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
//console.log(req)
    if (name !== '') {
        req[5] = name.length;
        var bname = new Uint8Array(cmd_buffer, 4 * 7, name.length);
        for (var cit = 0; cit < name.length; cit++) {
            bname[cit] = name.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};

update_two_strings_acjs_elements = function (def, str1, str2, e0, e1, e2, e3) {
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

update_ipv6_two_strings_acjs_elements = function (def, str1, str2, e0, e1, e2, e3, e4_ar, e5_ar) {
//    console.log(def, str1, str2, e0, e1, e2, e3)
    var cmd_buffer = new ArrayBuffer(4 * 15 + str1.length + str2.length);
    var req = new Uint32Array(cmd_buffer, 0, 15);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, def, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = e4_ar[0];
    req[6] = e4_ar[1];
    req[7] = e4_ar[2];
    req[8] = e4_ar[3];
    req[9] = e5_ar[0];
    req[10] = e5_ar[1];
    req[11] = e5_ar[2];
    req[12] = e5_ar[3];
    req[13] = str1.length;
    req[14] = str2.length;
    console.log(req)
    if (str1 !== '') {
        var bname = new Uint8Array(cmd_buffer, 4 * 15, str1.length);

        for (var cit = 0; cit < str1.length; cit++) {
            bname[cit] = str1.charCodeAt(cit);
        }
    }
    if (str2 !== '') {
        var budn = new Uint8Array(cmd_buffer, 4 * 15 + str1.length, str2.length);

        for (var cit = 0; cit < str2.length; cit++) {
            budn[cit] = str2.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};

//Users
add_nw_user_account = function (type, email, bw, psw) {
    console.log(type, email, bw, psw)

    var cmd_buffer = update_ipv6_two_strings_acjs_elements(NW_USER_LIST_ADD, email, psw, pq_2_16_32(type,1), bw, 0, 0, [0,0,0,0], [0,0,0,0]);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data.charCodeAt(0));
        Update_Profile_Data(true, false);
        show_acjs_status_modal(data.charCodeAt(0));
        $("input").val("");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_user_account = function (key, email, bw) {
//console.log(key, email, ip, mask)
    var cmd_buffer = update_ipv6_two_strings_acjs_elements(NW_USER_LIST_UPDATE, email, '', key, bw, 0, 0, [0,0,0,0], [0,0,0,0]);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, false);
//        console.log(data.charCodeAt(0))
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

renew_nw_user_pwd = function (key, new_pwd, pwd) {
//    console.log("Renew " + key, pwd, new_pwd);
    var cmd_buffer = update_two_strings_acjs_elements(NW_USER_LIST_RESPW, new_pwd, pwd, key, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, false);
        DisplayStatus(data.charCodeAt(0));
        $("input").val("");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

enable_disable_nw_user_account = function (key, email, state) {
//    console.log(key, email, state)
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
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, false);
        DisplayStatus(data.charCodeAt(0));
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
        Update_Profile_Data(true, true);
        DisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// User IPS

add_profile_ip = function (user_id, ipv, ip, mask) {
//    console.log(user_id, ipv, ip, mask)

    var cmd_buffer = update_ipv6_two_strings_acjs_elements(ML_USER_IP_MASK_ADD, '', '', user_id, ipv, mask, 0, [ip[0],ip[1],ip[2],ip[3]], [0,0,0,0]);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_IP_Data(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_profile_ip = function (user_id, key, ipv, ip, mask) {
//    console.log(user_id, key, ipv, ip, mask)

    var cmd_buffer = update_ipv6_two_strings_acjs_elements(ML_USER_IP_MASK_UPDATE, '', '', user_id, key, ipv, mask, [ip[0],ip[1],ip[2],ip[3]], [0,0,0,0]);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_IP_Data(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_profile_ip = function (user_id, key) {
//console.log(user_id, key)
    var cmd_buffer = update_acjs_elements(ML_USER_IP_MASK_DELETE, '', user_id, key, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_IP_Data(user_id);
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


/////////////////////////////////////////////////////////////////////////////////////////////
///////////----------------------- Quota Management ----------------------//////////////////
////////////////////////////////////////////////////////////////////////////////////////////

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

// Quota Usage

reset_quota_prof = function(r_id, prof_type, prof_id) {
//console.log(r_id, prof_type, prof_id)
    var cmd_buffer = update_acjs_elements(QVIZ_RST_PROF,'', r_id, prof_type, prof_id, 0, 0, 0);

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
        if(quota_usage_det_table){
            quota_usage_det_table.clear();
            quota_usage_det_table.draw(false);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

reset_quota_elem = function(ele_id, r_id, prof_type, item_id) {
//console.log(ele_id, r_id, prof_type, item_id)
    var cmd_buffer = update_acjs_elements(QVIZ_RST_ELEM,'', ele_id, r_id, prof_type, item_id, 0, 0);

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
//        quota_usage_det_table.clear();
//        quota_usage_det_table.draw(false);
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
        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, INFO_DASH_NOTIFIC, 0);
        req[1] = 0;
        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data) {
//            console.log("Notific "+data)
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
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_SIGNATURE_FILE, '', 0, 0, 0, 0, 0, 0);
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

get_fallback_status = function (ip, port) {
    var cmd_buffer = update_acjs_elements(PDEV_GET_DEV_BYPASS_STATUS, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {  
        if(data.charCodeAt(0)){         
            $("#fallback_status").text("The system is in Fallback state");            
            return 1;
        } else {
            $("#fallback_status").text("The system is in Active state");
            return 0;
        }
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

///////////////////////////

add_ml_dest_rule = function (user, ipv, ip, mask, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, ipv, ip, mask, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_ipv6_two_strings_acjs_elements(WO_ADDR_LIST_ADD, '', '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), ipv, [ip[0], ip[1], ip[2], ip[3]], [mask, pq_2_16_32(2, sched), 0, 0]);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Dest_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_dest_rule = function (user, id, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, id, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_UPDATE, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), id, pq_2_16_32(2, sched), 0);

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
        Update_Dest_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_dest_rule = function (user, url_rule_key) {

    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_DELETE, '', user, url_rule_key, 0, 0, 0, 0);
//    console.log(user, url_rule_key)
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Dest_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};



add_ml_url_rule = function (user, authen, dns, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, authen, dns, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_URL_RULE_ADD, url, user, pq_1_16_2_8_32(sched, authen, dns), pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_url_rule = function (user, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_URL_RULE_UPDATE, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), pq_2_16_32(url, sched), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_url_rule = function (user, url_rule_key) {

    var cmd_buffer = update_acjs_elements(WO_URLRULE_LIST_DELETE, '', url_rule_key, user, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_ml_app_rule = function (user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_APP_RULE_ADD, '', user, app, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), sched, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_App_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_app_rule = function (user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_APP_RULE_UPDATE, '', user, app, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), sched, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_App_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_app_rule = function (user, app_id) {

    var cmd_buffer = update_acjs_elements(ML_APP_RULE_DELETE, '', app_id, user, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_App_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_ml_serv_rule = function (user, port, prot, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, port, prot, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_SVS_RULE_ADD, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), pq_2_16_32(sched, prot), port, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_serv_rule = function (user, port, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, port, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_SVS_RULE_UPDATE, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), sched, port, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_serv_rule = function (user, serv_id) {

    var cmd_buffer = update_acjs_elements(ML_SVS_RULE_DELETE, '', serv_id, user, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO Admin Pipes

add_ml_admin_pipe = function (name, gbw, mbw, prty) {
//console.log(name, type, gbw, mbw, prty)
    var cmd_buffer = update_acjs_elements(WO_ADMIN_SHAPER_LIST_ADD, name, gbw, mbw, prty, 0, 0, 0);

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

update_ml_admin_pipe = function (key, name, gbw, mbw, prty) {

    var cmd_buffer = update_acjs_elements(WO_ADMIN_SHAPER_LIST_UPDATE, name, key, gbw, mbw, prty, 0, 0);

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

delete_ml_admin_pipe = function (key) {

    var cmd_buffer = update_acjs_elements(WO_ADMIN_SHAPER_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

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

update_ml_default_pipe = function (user, prty, type, d_gbw, u_gbw, d_mbw, u_mbw) {
//console.log(user, prty, type, d_gbw, u_gbw, d_mbw, u_mbw)
    var cmd_buffer = update_acjs_elements(ML_USER_DEF_SPR_UPDATE, '', user, pq_2_16_32(prty, type), pq_2_16_32(d_gbw, d_mbw), pq_2_16_32(u_gbw, u_mbw), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Default_Pipe(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//WO User Pipes

add_ml_user_pipe = function (user_id, admn_pipe, name, type, prty) {
//    console.log(user_id, admn_pipe, name, type, prty)
    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_ADD, name, user_id, admn_pipe, prty, type, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_User_Pipe_List(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_ml_user_pipe = function (user_id, key, shp_id, name) {

    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_UPDATE, name, user_id, key, shp_id, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_User_Pipe_List(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_user_pipe = function (user_id, key) {
//console.log(user, key)
    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_DELETE, '', user_id, key, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_User_Pipe_List(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO Schedulers

add_ml_schedule = function (user, name, type, dates, start_t, end_t) {

    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_ADD, name, user, pq_2_16_32(dates, type), start_t, end_t, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

edit_ml_schedule = function (user, key, name, dates, start_t, end_t) {

//    console.log(user, key, name, dates, start_t, end_t)
    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_UPDATE, name, user, pq_2_16_32(dates, key), start_t, end_t, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

delete_ml_schedule = function (user, key) {
//    console.log(user, key)
    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_DELETE, '', user, key, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};
