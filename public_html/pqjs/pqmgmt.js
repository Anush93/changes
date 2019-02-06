var selectedMgmtTableRowCount;
var selectedMgmtTableRowData;
var rowMgmtIndex;
var mgmt_iface_table;
var maintenance_warning_type = 0;

var init_mgmt_ifc_configuration_window = function () {
    mgmt_iface_table = $('#mgmt_iface_table').DataTable({
        select: true,
        columnDefs: [
            {targets: 0, visible: false},
            {width: '10%', targets: 1},
            {width: '20%', targets: 2},
            {width: '20%', targets: 3},
            {width: '20%', targets: 4},
            {width: '20%', targets: 5},
            {width: '10%', targets: 6},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: "100px",
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        createdRow: function (row, data, dataIndex) {
            if (data[4] === "1" || data[4] === "2") {
                $('td:eq(3)', row).css('background-color', '#d6ffb2');
            } else if (data[4] === "0") {
                $('td:eq(3)', row).css('background-color', '#ff9e9e');
            }
        }
    });   
  
    $('#mgmt_iface_table').on('click', 'tbody tr', function () {
        selectedMgmtTableRowData = (mgmt_iface_table.row(this).data()) + '';
        selectedMgmtTableRowCount = 0;
        rowMgmtIndex = mgmt_iface_table.row(this).index();

        var delay = 1;
        setTimeout(function () {
            selectedMgmtTableRowCount = mgmt_iface_table.rows('.selected').count();
        }, delay);
    });

    $('#mgmt_iface_table').on('click', 'tbody tr', function () {
        var delay = 1;
        setTimeout(function () {
            if (selectedMgmtTableRowCount === 1) {
                $('.edit,.delete').removeAttr('disabled');
                if (rowMgmtIndex === 0) {
                    $('#mgmt_o_mask').show();
                    $('#mgmt_t_mask').hide();
                } else {
                    $('#mgmt_t_mask').show();
                    $('#mgmt_o_mask').hide();
                }
            } else if (selectedMgmtTableRowCount === 0) {
                $('.edit,.delete').attr('disabled', 'disabled');
                $('#mgmt_t_mask,#mgmt_o_mask').hide();
            } else {
                $('.edit,.delete').attr('disabled', 'disabled');
                $('#mgmt_t_mask,#mgmt_o_mask').hide();
            }
        }, delay);
    });

    $("#editMgmtButton").click(function () {
        if (validateIP($('#mgmt_edit_ip').val())) {
            if (validateIP($('#mgmt_edit_subnet').val())) {
                if (validateIP($('#mgmt_edit_dgw').val())) {
                    if (validateIP($('#mgmt_edit_dnss').val())) {
                        var edit_elements = selectedMgmtTableRowData.split(",");
                        send_mgmt_update(edit_elements[0], dot2num($("#mgmt_edit_ip").val()), dot2num($("#mgmt_edit_subnet").val()), dot2num($("#mgmt_edit_dgw").val()), dot2num($("#mgmt_edit_dnss").val()));
                        document.getElementById('editMgmtModal').style.display = "none";
                    } else {
                        $('#mgmt_edit__confirm_msg').val('Invalied DNS server IP').css('color', 'red');
                    }
                } else {
                    $('#mgmt_edit__confirm_msg').val('Invalid Default Gateway').css('color', 'red');
                }
            } else {
                $('#mgmt_edit__confirm_msg').val('Invalid Subnet').css('color', 'red');
            }
        } else {
            $('#mgmt_edit__confirm_msg').val('Invalid IP address').css('color', 'red');
        }
    });
};

function display_mgmt_table() {
    mgmt_iface_table.clear();
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 41, 0); // request management interface list
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            var element = row[i].split("$");
            mgmt_iface_table.row.add([element[0], element[1], num2dot(element[2]), num2dot(element[3]), num2dot(element[4]), num2dot(element[5]), "Active"]).draw(false);
        }
    }).fail(function () {
        console.error('Problems when posting...');
    });
}

function edit_mgmt_interface_prop() {

    var modal = document.getElementById('editMgmtModal');
    var span = document.getElementById('closeEditMgmtModal');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    var edit_elements = mgmt_iface_table.row('.selected').data();

    $("#mgmt_edit_infc").val(edit_elements[1]);
    $("#mgmt_edit_ip").val(edit_elements[2]);
    $("#mgmt_edit_subnet").val(edit_elements[3]);
    $("#mgmt_edit_dgw").val(edit_elements[4]);
    $("#mgmt_edit_dnss").val(edit_elements[5]);
}

function info_mgmt_interface_show() {

    var modal = document.getElementById('mgmtInfoProModal');
    var span = document.getElementById('closemgmtInfoModal');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    var edit_elements = mgmt_iface_table.row('.selected').data();
    $("#mgmt_info_infc").val(edit_elements[1]);
    $("#mgmt_info_ip").val(edit_elements[2]);
    $("#mgmt_info_subnet").val(edit_elements[3]);
    $("#mgmt_info_dgw").val(edit_elements[4]);
    $("#mgmt_info_dnss").val(edit_elements[5]);
}

function MgmtDisplayStatus(code) {
    switch (code) {
        case 2:
            InvalidStatus("Failed to configure the Management Interface Settings");
            break;
        case 4:
            InvalidStatus("MGMT1 and MGMT2 IPs should be on different Subnets");
            break;
        case 10:
            SuccessStatus("System updated successfully");
            display_mgmt_table();
        default:
            return -1;
    }
}

send_mgmt_update = function (key, ip, subnet, dgw, dns) {
    var cmd_buffer = new ArrayBuffer(4 * 6);
    var req = new Uint32Array(cmd_buffer, 0, 6);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 42, 0);
    req[1] = key;
    req[2] = ip;
    req[3] = subnet;
    req[4] = dgw;
    req[5] = dns;
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        MgmtDisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

////////////////////////////////

maintenance_do_operation = function (id) {

    if (id === 4) {
        var cmd_buffer = update_acjs_elements(PDEV_SET_DEV_BYPASS_STATUS, '', 0, 0, 0, 0, 0, 0);
        var cookie = $.cookie('pqsf');
        $.ajax({
            data: cmd_buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data, textStatus, jqXHR) {
            if (data.charCodeAt(0)) {
                show_acjs_status_modal(10);
                $('#ele_pdev_fallback').attr('disabled', true);
            } else {
                show_acjs_status_modal(2);
                $('#ele_pdev_fallback').attr('disabled', false);
            }
            $('#maintenance_warning_modal').hide();            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    } else {
        var cmd_buffer = update_acjs_elements(30 + (id - 1), '', 72, 97, 115, 105, 116, 104);
        var cookie = $.cookie('pqsf');
        $.ajax({
            data: cmd_buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data, textStatus, jqXHR) {
            maintenance_show_operation(maintenance_warning_type);
            document.getElementById('maintenance_warning_modal').style.display = "none";
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    }
};

maintenance_show_operation = function (id) {
    var msg;
    $('.dmaintain_operation_label').text("");
    var modal = document.getElementById('maintenance_operation_modal');
    modal.style.display = "block";
    if (id === 1) { // reset
        msg = 'Device will Reset In ';
    } else if (id === 2) { // reboot
        msg = 'Device will Reboot In ';
    } else { // power down
        msg = 'Device will Shut Down In ';
    }
    var n = 10;
    setTimeout(countDown, 1000);

    function countDown() {
        n--;
        if (n > 0) {
            $('.dmaintain_operation_label').text(msg + ' ' + n + " seconds");
            setTimeout(countDown, 1000);
        } else {
            modal.style.display = "none";
        }
    }
};

maintenance_show_warning = function (id, msg) {
    maintenance_warning_type = id;
    var modal = document.getElementById('maintenance_warning_modal');
    var span = document.getElementById('maintenance_cancel_warning_modal');

    modal.style.display = "block";
    $('.dmaintain_show_label').text(msg);
    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
};

maintenance_reset = function () {
    maintenance_show_warning(1, "You are about to reset the Device! Please press Proceed for the Reset.");
};

maintenance_fallback = function () {
    maintenance_show_warning(4, "You are about to transfer the Device into fallback state! Do you want to proceed?");
};

maintenance_reboot = function () {
    maintenance_show_warning(2, "You are about to Reboot the Device! Please press Proceed for the Reboot.");
};

maintenance_poweroff = function () {
    maintenance_show_warning(3, "You are about to Power Down the Device! Please press Proceed for the Power Down.");
};

maintenance_cancel_op = function () {
    $('#maintenance_warning_modal').hide();
};