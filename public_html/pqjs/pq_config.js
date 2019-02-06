var media_config_table;
var slec_cdport_data;
var slec_cdport_row;
var config_med_clicked;
var pq_dev_portc_types = ["10/100/1000 BASE-T", "1000 BASE-X/1000 BASE-T"];

function init_media_config_elements() {

    media_config_table = $('#Media_Config_Table').DataTable({
        select: true,
        columnDefs: [
            {targets: 0, visible: false},
            {width: '30%', targets: 1},
            {width: '30%', targets: 2, visible: false},
            {width: '30%', targets: 3},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: "100px",
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false
    });

    $('#Media_Config_Table').on('click', 'tbody tr', function () {
        var delay = 1;
        setTimeout(function () {
            selectedTableRowCount = media_config_table.rows('.selected').count();
        }, delay);
    });
    
    $('#Media_Config_Table').on('click', 'tbody tr', function () {

        var delay = 1;
        var rowID = media_config_table.row('.selected').data()[0];
        setTimeout(function () {
            if (selectedTableRowCount === 1) {
                if (rowID === 0) {
                    $('#config_wIn_mask').show();
                    $('#config_wOut_mask').hide();
                } else {
                    $('#config_wOut_mask').show();
                    $('#config_wIn_mask').hide();
                }
            } else {
                $('#config_wIn_mask,#config_wOut_mask').hide();
            }
        }, delay);
    });        
}

function display_media_config_table() {

    media_config_table.clear().draw();
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 135, 0); // request device port configuration list

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
            var element = row[i].split("&");
            if (Number(element[0]) === 0) {
                media_config_table.row.add([Number(element[0]), "WAN1 IN", Number(element[1]), set_media_config_type(element[1], i)]);
            } else {
                media_config_table.row.add([Number(element[0]), "WAN1 OUT", Number(element[1]), set_media_config_type(element[1], i)]);
            }
        }
        media_config_table.draw(false);
    }).fail(function () {
        console.error('Problems when posting...');
    });
}

set_media_config_type = function (status, index) {   
    if (status === '0') {        
        return "<select name='dcport_control' class='field_prop' onchange='config_med_clicked = this; show_warning_type_modal(1)' style='width:190px;  margin-right:40px; background:transparent; border:none' id='cdportStatus_" + index + "'>" +
                "<option value='0'>" + pq_dev_portc_types[0] + "</option>" +
                "<option value='1'>" + pq_dev_portc_types[1] + "</option>" +
                " </select>";
    } else {
        return "<select name='dcport_control' class='field_prop' onchange='config_med_clicked = this; show_warning_type_modal(1)' style='width:190px; margin-right:40px; background:transparent; border:none' id='cdportStatus_" + index + "'>" +
                "<option value='1'>" + pq_dev_portc_types[1] + "</option>" +
                "<option value='0'>" + pq_dev_portc_types[0] + "</option>" +
                " </select>";
    }
};

//change_media_config_type(this)

function change_media_config_type(element) {
    document.getElementById("StatusModal").style.display = "none";    
    change_device_media_configurations(+($(element).attr('id')[13]), +(element[element.selectedIndex].value));
}