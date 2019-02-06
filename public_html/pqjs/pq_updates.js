var feature_array = [];
var connection_error_status = "Connection to the Server disrupted. Please check your connection and retry";
var update_info;
var offline_file_size;

get_system_update_info = function () {

    var cmd_buffer = update_acjs_elements(WO_GET_VERSION_INFO, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        update_info = data;
        display_system_update_info();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

display_system_update_info = function () {
    var element = update_info.split("&");
    $("#fw_version").text("Firmware Version " + fw_version);
    $("#sw_version").text("Software Version " + sw_version);
    $("#app_signature_info").text("Version " + element[9]);
};

init_update_window = function () {

    $('#offline_file_select').on('change', function () {
        var file = this.files[0];
        offline_file_size = file.size;
        if (file.size > 2 * 1024 * 1024 * 1024) {
        }
        display_file_name(this.value, 'upload_file_name');
        $('#offline_file_upload').attr('disabled', false);
    });

    $('#offline_file_upload').on('click', function () {
        $.ajax({
            url: 'pqsysupdate',
            type: 'POST',
            data: new FormData($('#offline_update_form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    $('#offline_upload_progress').show();

                    myXhr.upload.addEventListener('progress', function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            $('#offline_upload_progress').attr({
                                value: evt.loaded,
                                max: evt.total
                            });
                            $('#offline_upload_progress').html(percentComplete * 100 + ' %');
                        }
                    }, false);

                    myXhr.upload.addEventListener('loadend', function (evt) {
                        $('#Offline_Update_Window').hide();
                        $('#Offline_Update_Install_Window').show();
                        closeModalInit(2);
                    });
                }
                return myXhr;
            }
        });
    });

    $('#app_signaure_file_select').on('change', function () {
        var file = this.files[0];
        offline_file_size = file.size;
        if (file.size > 2 * 1024 * 1024 * 1024) {
//            alert('max upload size is 1k');
        }
        display_file_name(this.value, 'upload_app_sig_file_name');
        $('#app_signaure_file_upload').attr('disabled', false);
    });

    $('#app_signaure_file_upload').on('click', function () {
        $.ajax({
            url: 'pqlicinfo',
            type: 'POST',
//            data: new FormData($('form')[2]),
            data: new FormData($('#app_signature_update_form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('loadend', function (evt) {
                        $('#Signature_Update_Window').hide();
//                        $('#License_Update_Install_Window').show();
                        closeModalInit(2);
                    });
                }
                return myXhr;
            }
        });
    });

    $('#license_file_select').on('change', function () {
        var file = this.files[0];
        offline_file_size = file.size;
        if (file.size > 2 * 1024 * 1024 * 1024) {
//            alert('max upload size is 1k');
        }
        display_file_name(this.value, 'upload_license_name');
        $('#license_file_upload').attr('disabled', false);
    });

    $('#license_file_upload').on('click', function () {
        $.ajax({
            url: 'pqlicinfo',
            type: 'POST',
//            data: new FormData($('form')[2]),
            data: new FormData($('#license_update_form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('loadend', function (evt) {
                        $('#License_Update_Window').hide();
                        $('#License_Update_Install_Window').show();
                        closeModalInit(2);
                    });
                }
                return myXhr;
            }
        });
    });
};

update_offline = function () {
    $('#Offline_Update_Window').show();
    closeModalInit(1);
};

update_license = function () {
    $('#License_Update_Window').show();
    closeModalInit(1);
};

update_app_signature = function () {
    $('#Signature_Update_Window').show();
    closeModalInit(1);
};

function display_file_name(filepath, div) {
    var filename = filepath.split("\\");
    $('#' + div).val(filename[filename.length - 1] + ' (' + pq_get_file_size(offline_file_size) + ')');
}
