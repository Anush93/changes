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

function Update_Profile_Data(d_flag, user_flag) {
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
            if (get_profile_type(element[1]) !== 'Administrator' && get_profile_type(element[1]) !== 'Super-Administrator') {
                user_profile_lookup_list[element[0]] = element[2];
            }
        }
        if (d_flag) {
            Display_Prof_Table();
        }
        if (user_flag || Object.keys(user_profile_lookup_list).length === 1) {
            global_rule_user = get_first_rule_user_index();
        }
        Clear();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Prof_Table() {
    profile_table.clear().draw();
    for (var i = 0; i < profile_data.length - 1; i++) {
        var element = profile_data[i].split("&");
        profile_table.row.add([element[0], get_profile_type(element[1]), element[2], element[4], element[5], "", element[3], set_user_status(element[2], element[3], element[0])]);
    }
    profile_table.draw(false);
    set_primary_device(profile_table, true);
}

////////

function Update_Profile_IP_Data(user_id) {
    profile_ip_data = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, ML_GET_USER_IP_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        profile_ip_data = data.split(";");
        Display_Prof_IP_Table();
        Update_Profile_Data(false, false);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Prof_IP_Table() {
    profile_ip_table.clear().draw();
//    profile_ip_data = ['1&3232235878&32', '2&3232235578&27'];
    for (var i = 0; i < profile_ip_data.length - 1; i++) {
        var element = profile_ip_data[i].split("&");
        profile_ip_table.row.add([element[1], element[0], get_prof_user_ip(element[2], parseInt(element[3]), parseInt(element[4]), parseInt(element[5]), parseInt(element[6]), element[7])]);
    }
    profile_ip_table.draw(false);
    set_primary_device(profile_ip_table, true);
}

// Set profile status in the table               
get_profile_type = function (id) {
    if (id === '12') {
        return 'Super-Administrator';
    } else if (id === '14') {
        return 'Administrator';
    } else if (id === '23') {
        return 'User';
    } else
        return 'Error';
};

get_prof_user_ip = function (ipv, ip1, ip2, ip3, ip4, mask) {
    if (ipv === '4') {
        if (mask !== '32')
            return num2dot(ip1) + '/' + mask;
        else
            return num2dot(ip1);
    } else if (ipv === '6') {
        if (mask !== '128')
            return rec_ip_decode(6, ip1, ip2, ip3, ip4, 1) + '/' + mask;
        else
            return rec_ip_decode(6, ip1, ip2, ip3, ip4, 1);
    } else
        return 'Error';
};

set_user_status = function (username, status, index) {
    if (username === 'admin') {
        return 'Active';
    } else {
        if (status === '1') {
            return "<select name='app_control' class='field_prop setPrimary' style='width:65px; margin-right:40px; background:transparent; border:none' id='profileStatus_" + index + "'>" +
                    "<option value='1'>Enable</option>" +
                    "<option value='0'>Disable</option>" +
                    " </select>";
        } else {
            return "<select name='app_control' class='field_prop setPrimary' style='width:65px; margin-right:40px; background:transparent; border:none' id='profileStatus_" + index + "'>" +
                    "<option value='0'>Disable</option>" +
                    "<option value='1'>Enable</option>" +
                    " </select>";
        }
    }
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
    $("#ProfileEditCode option").filter(function () {
        return this.text === edit_user_prof_elements[1];
    }).prop('selected', true);
//    $("#ProfileEditCode").attr("disabled", true);

    $("#profile_edit_email").val(edit_user_prof_elements[2]);

    if (edit_user_prof_elements[3] === '-') {
        $("#profile_edit_IPv4").val('0.0.0.0');
    } else {
        $("#profile_edit_IPv4").val(edit_user_prof_elements[3]);
    }

    if (edit_user_prof_elements[4] === '-') {
        $("#profile_edit_IPv6").val('::');
    } else {
        $("#profile_edit_IPv6").val(edit_user_prof_elements[4]);
    }

    $("#profile_edit_IPBw").val(edit_user_prof_elements[5]);
    if ($("#ProfileEditCode option:selected").val() !== '23') {
        $("#profile_edit_IPv4").attr('disabled', true);
        $("#profile_edit_IPv4").attr('disabled', true);
    } else {
        $("#profile_edit_IPv4").attr('disabled', false);
        $("#profile_edit_IPv4").attr('disabled', false);
    }
}

function ResetProfilePwd() {

    var prof_table_data = profile_table.row('.selected').data();
    var modal = document.getElementById('ResetPwdModal');
    var span = document.getElementById('CloseResetPwd');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    if (prof_table_data[2] !== user_email_address) {
        $("#profile_edit_password_seg").hide();
        $('#ResetPwdModalContent').css({height: '245px'});
    } else {
        $("#profile_edit_password_seg").show();
        $('#ResetPwdModalContent').css({height: '290px'});
    }
}

function DeleteProfile() {
    delete_nw_user_account((profile_table.row('.selected').data())[0], (profile_table.row('.selected').data())[2]);
}

/////////////////

function CreateProfileIP() {
    $("#AddProfileIPModal").show();
}

function EditProfileIP() {
    var prof_ip_table_data = profile_ip_table.row('.selected').data();
    $("#profile_edit_IP").val(prof_ip_table_data[2]);
    $("#EditProfileIPModal").show();
}

function DeleteProfileIP() {
    var prof_ip_table_data = profile_ip_table.row('.selected').data();
    delete_profile_ip(prof_ip_table_data[0], prof_ip_table_data[1]);
}

function show_rule_user_popup() {

    init_rule_user_list('#rule_user_modal_dropdown');
    var modal = document.getElementById('RuleUserModal');
    var span = document.getElementById('CloseRuleUserModal');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        $("#rule_user_search_input").val('');
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    $("#rule_user_modal_dropdown option").filter(function () {
        return this.text === user_profile_lookup_list[global_rule_user];
    }).prop('selected', true);
}

function set_primary_device(table, flag) {
    if (SET_PRIMARY) {
        $('.setPrimary').attr('disabled', false);
    } else {
        if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
            $('.setPrimary').hide();
            $('.setAppBwPrimary').attr('disabled', true).css('pointer-events', 'none');
        } else {
            if (flag) {
                table.select.style('api');
            }
            $('.setPrimary').attr('disabled', true);
        }
    }
}

/////////////////////

var data_billing_table;

function Update_Billing_Data(year, month) {
//    console.log(year, month)
    user_billing_data = [];

    var cmd_buffer = update_acjs_elements(ML_GET_BILL_STAT, '', pq_2_16_32(year, month), 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        user_billing_data = data.split(";");
        Display_Billing_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Billing_Table() {
    billing_table.clear().draw();

    $('#billing_s_bw_info').text('Bandwidth at the start of the month : ' + '2 Gbps');
    $('#billing_a_bw_info').text('Bandwidth allocated during the month : ' + '170Mbps');
    $('#billing_f_bw_info').text('Bandwidth freed during the month : ' + '20 Mbps');
    $('#billing_u_bw_info').text('Bandwidth remaining : ' + '1.32 Gbps');

    for (var i = 0; i < user_billing_data.length - 1; i++) {
        var element = user_billing_data[i].split("&");
        billing_table.row.add([element[4], element[5], set_user_billing_status(element[6]), moment(new Date(element[1] * 1000)).format(' Do MMM YYYY hh:mm:ss A')]);
    }
    billing_table.draw(false);
}

set_user_billing_status = function (flag) {
    if (flag === '1') {
        return "<a style='color:#1aca29; margin-right:5px; font-size: 20px;'>+</a><a style='text-decoration:none'>User Created</button>";
    } else if (flag === '2') {
        return "<a style='color:#d80000; margin-right:5px; font-size: 20px;'>x</a><a style='text-decoration:none'>User Deleted</button>";
    } else if (flag === '3') {
        return "<a style='color:#1aca29; margin-right:5px; font-size: 20px;'>&#8593</a><a style='text-decoration:none'>Bandwidth Increased</button>";
    } else
        return "<a style='color:#d80000; margin-right:5px; font-size: 20px;'>&#8595</a><a style='text-decoration:none'>Bandwidth Decreased</button>";
};

// PDF generation
var pq_img = new Image();
pq_img.src = "../image/header.png";
pq_img.onload = function (doc) {
    return this;
};

get_user_billing_report = function () {
    var doc = new jsPDF('p');
//    var imgData;
    var Month = 'January';
    var Title;
    var pagenum = 1;
    $('a.dt-button.jsonButton').click();

    var table = [];
    var dataHeader = [];
    doc.setFont("cambria");
    doc.setFontSize(11);

    Title = "User Billing Information - " + Month;
    var table1_old = data_billing_table.body;
    var dataHeader_s_old = data_billing_table.header;
    for (var i in table1_old) {
        table.push([]);
        for (var j in table1_old[i]) {
            if (j < 4) {
                table[i].push(table1_old[i][j]);
            }
        }
    }
    for (var i in dataHeader_s_old) {
        if (i < 4) {
            dataHeader.push(dataHeader_s_old[i]);
        }
    }


    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(Title, 70, 25);
    doc.setFontSize(9);

    doc.setDrawColor(132, 132, 132);
    doc.line(15, 35, 115, 35);
    doc.line(15, 40, 115, 40);
    doc.line(15, 45, 115, 45);
    doc.line(15, 50, 115, 50);
    doc.line(15, 55, 115, 55);
    doc.line(15, 35, 15, 55);
    doc.line(80, 35, 80, 55);
    doc.line(115, 35, 115, 55);

    doc.text("Bandwidth at the start of the month", 18, 39);
    doc.text("Bandwidth allocated during the month", 18, 44);
    doc.text("Bandwidth freed during the month", 18, 49);
    doc.text("Bandwidth remaining", 18, 54);
    doc.setFontType("italic");

    $('#billing_s_bw_info').text('Bandwidth at the start of the month : ' + '2 Gbps');
    $('#billing_a_bw_info').text('Bandwidth allocated during the month : ' + '170Mbps');
    $('#billing_f_bw_info').text('Bandwidth freed during the month : ' + '20 Mbps');
    $('#billing_u_bw_info').text('Bandwidth remaining : ' + '1.32 Gbps');

//    var id = ['det_rep_sip', 'det_rep_dip', 'det_rep_dport', 'det_rep_vlan', 'det_rep_protocol', 'det_rep_app'];
//    var value = [];
//    for (var i in  id) {
//        value.push($('#' + id[i]).val());
//    }
//    doc.text(act_s_time, 48, 34);
//    doc.text(act_e_time, 48, 39);

//    doc.setFontType("normal");
//    doc.text("(Address)", 18, 49);
//    doc.setFontType("italic");
//    doc.text(value[0], 48, 44);

//    doc.setFontType("normal");
//    doc.text("(Address)", 18, 59);
//    doc.setFontType("italic");
//    doc.text(value[1], 48, 49);
//
//    doc.text(value[2], 48, 54);
//    doc.text(value[3], 48, 59);
//
//    if (value[4] === "6") {
//        doc.text("TCP", 48, 64);
//    } else if (value[4] === "17") {
//        doc.text("UDP", 48, 64);
//    } else {
//        doc.text("Any", 48, 64);
//    }
//
//    value[5] === "0" ? doc.text("All", 48, 69) : doc.text(app_serv_dissect([parseInt(value[5])]), 48, 69);

    doc.setProperties({
        title: 'Traffic Shaper',
        subject: 'USER BILLING REPORT',
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
            doc.addImage(pq_img.onload(doc), 'PNG', 5, 6, 40, 10);
            doc.setFontType("italic");
            doc.text("Paraqum Traffic Shaper", 165, 12);
            doc.setDrawColor(1, 1, 1);
            doc.line(5, 15, 205, 15);
            doc.line(5, height - 15, 205, height - 15);
            doc.text(pagenum.toString(), 200, height - 10);
            pagenum++;
        },
        createdCell: function (cell, data) {
            if (data.column.raw === 'User Bandwidth (Kbps)') {
                cell.styles.halign = 'right';
            }
        }
    });
    doc.save('User Billing Information - ' + Month + '.pdf');
};
