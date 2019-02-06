var ha_device_table;
var ha_device_data = [];
var ha_current_device_states = [];

function haModalBroker(id) {
    switch (id) {
        case 1:
            CreateHaGenericModal('CreateHaDeviceModal', 'CloseNewHaDevice', 'cancelHaDeviceAdd');
            break;
        case 2:
            CreateHaGenericModal('ChangeHaDeviceIDModal', 'closeHaDeviceIDEdit', 'cancelHaDeviceIDEdit');
            break;
        case 3:
            set_ha_device_state(ha_current_device_states[0], 1);
            break;
        case 4:
            CreateHaGenericModal('ChangeHaDeviceVIPModal', 'closeHaDeviceVIPEdit', 'cancelHaDeviceVIPEdit');
            break;
    }
}

function CreateHaGenericModal(modalM, spanM, cancelM) {

    var modal = document.getElementById('' + modalM);
    var span = document.getElementById('' + spanM);
    var cancel = document.getElementById('' + cancelM);
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    cancel.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

add_nw_ha_device = function (add_ha_ip) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_ADD_RMT_DEV, '', add_ha_ip, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_ha_device_id = function (id) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_CHANGE_DEVID, '', id, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_ha_device_vip = function (ip, mask) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_CHANGE_VIP, '', ip, mask, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_ha_device_state = function (id, state) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_CHANGE_STATE, '', id, state, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function DeleteHaDevice() {

    var key = parseInt((ha_device_table.row('.selected').data())[0]);

    var cmd_buffer = update_acjs_elements(PDEV_HASY_DEL_RMT_DEV, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        Clear();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Update_Ha_Device_Data() {
    ha_device_data = [];
    ha_current_device_states = [];
//    user_profile_lookup_list = [];
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, PDEV_GET_RMT_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        ha_device_data = data.split(";");
        Display_Ha_Device_table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Ha_Device_table() {
//    ha_device_data = ['3232235927&150&1&323223592&32&1', '1&3232235926&2&1', '1&3232235926&1&1'];
    ha_device_table.clear().draw();
    for (var i = 0; i < ha_device_data.length - 1; i++) {
        var element = ha_device_data[i].split("&");
        if (i === 0) {
            ha_current_device_states = [element[0], element[1], element[2], element[3], element[4], element[5], element[6]];
            $('#ha_devc_id').text('Device ID : ' + element[0]);
            $('#ha_devc_ip').text('Device IP : ' + num2dot(element[1]));
            $('#ha_devc_state').text('Device State : ' + set_ha_device_state_btn(parseInt(element[2])));
            $('#ha_devc_vip').text('Virtual IP : ' + num2dot(element[3]) + ' / ' + element[4]);
            if (!parseInt(element[5])) {
                $('#ha_device_reset').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            } else {
                $('#ha_device_reset').css({'background': '#208830'}).attr('disabled', false);
            }

        } else {
            ha_device_table.row.add([element[0], element[1], num2dotR(element[2]), set_primary_btn(parseInt(element[3])), set_ha_connction_status(parseInt(element[4]))]);
        }
    }
    ha_device_table.draw(false);
}

set_primary_btn = function (id) {
    switch (id) {
        case 0:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Initializing...</button>";
            break;
        case 1:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Primary</button>";
            break;
        case 2:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Secondary</button>";
            break;
        case 3:
        case 4:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Intermediary</button>";
            break;
    }
};

set_ha_connction_status = function (state) {
    if (state >= parseInt(ha_current_device_states[6])){
        return "<a style='color:#1aca29; margin-right:5px; text-decoration: none; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Online</button>";
    } else
        return "<a style='color:#b3bbb4; margin-right:5px; text-decoration: none; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Offline</button>";
};

set_ha_device_state_btn = function (id) {
    switch (id) {
        case 0:
            $('#set_ha_devc_state_btn').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            return 'Initializing...';
            break;
        case 1:
            $('#set_ha_devc_state_btn').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            return 'Primary';
            break;

        case 2:
            $('#set_ha_devc_state_btn').css({'background': '#ffae00'}).attr('disabled', false);
            return 'Secondary';
            break;
        case 3:
        case 4:
            $('#set_ha_devc_state_btn').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            return 'Intermediary';
            break;
    }
};
