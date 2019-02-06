
function validateEmail(email) {
    var patt = /\w+(\.\w+)*\@(\w+\.)+[a-z]{2,3}/;
    var result = patt.test(email);
    return result;
}

function validateIP(ip) {
    var patt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*$/;
    var result = patt.test(ip);
    return result;
}

function show_acjs_status_modal(code) {
    switch (code) {
        case 2:
            InvalidStatus("Operation failed!");
            break;
        case 4:
            InvalidStatus("New Entry already exists in the System!");
            break;
        case 6:
            InvalidStatus("Invalid File!");
            break;            
        case 7:
            InvalidStatus("Outdated Installation File!");
            break;            
        case 10:
            SuccessStatus("Profile updated successfully");
            break;
        case 11:
            InvalidStatus("You have reached the Maximum Entry Limit!");
            break;
        case 12:
            InvalidStatus("New Entry is Invalid!");
            break;
        case 14:
            InvalidStatus("Entry already exists in database!");
            break;
        case 16:
            InvalidStatus("Cannot delete! Profile is already in use.");
            break;
        case 17:
            InvalidStatus("Invalid Shaper configuration!");
            break;
        case 18:
            InvalidStatus("Invalid Address entry! Collision at source and destination entries!");
            break;
        case 19:
            InvalidStatus("Invalid Address entry to Profile!");
            break;
        case 20:
            InvalidStatus("User limit exceeded!");
            break;
        case 21:
            InvalidStatus("You cannot delete the default user/server");
            break;
        default:
            return -1;
    }
}

function show_warning_type_modal(code) {

    switch (code) {
        case 1:
            WarningStatus(code, "You are about to change the media configuration! Do you want to proceed?");
            $('#statusModalButton').click(function () {
                display_media_config_table();
            });
            break;
//        case 2:
//            WarningStatus("New Entry already exists in the System!");
//            break;
        default:
            return -1;
    }
}

function warning_proceed_func(id) {
    switch (id) {
        case 1:
            change_media_config_type(config_med_clicked);
            break;
        case 99:
            $('#StatusModal').hide();
            $('#'+$('.in').attr('id')).collapse('toggle');
            $('#collapse11').collapse('toggle');
            $('#tab_maint').css({"background": "#6f5e5e"});
            load_window(WINDOW_MAINTENANCE);
            break;
        default:
            return -1;
    }
}

//Success Status Modal              

function SuccessStatus(msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block; margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 15px; margin-top: 32px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:80px; height:30px; margin-left: 76px; margin-top: 30px; background:#21b224 ' >Continue</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Success");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
}

var mbx_loading_cancel_status = 0;
function LoadingStatus(msg) {
    mbx_loading_cancel_status = 0;
    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block; margin-top:10px' src='image/gif/update_bl_cir.gif' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 15px; margin-top: 32px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:80px; height:30px; margin-left: 76px; margin-top: 17px; background:#f44242 ' >Cancel</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("System");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
        mbx_loading_cancel_status = 1;
    });
}

function InvalidStatus(msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block;' src='image/failed.png' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 12px; margin-top: 22px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:80px; height:30px; margin-left: 76px; margin-top: 17px; background:#f44242 ' >Close</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Invalid Operation");
    
    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
}

function AbortStatus(msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block;' src='image/reset.png' alt='your image' height='50' width='50'/>";

    var msg_btn = "<div style='margin-left: 12px; margin-top: 22px; font-family: Courier-New; font-size: 17px;' >" + msg + "</div>" +
            "<button id='abortStatusModalProceed' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Retry</button>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Cancel</button>";


    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Abort");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
}

function WarningStatus(code, msg) {

    $('#userStatusModalImage').children().detach();
    $('#userStatusModalText').children().detach();

    var icon = "<img id='gif'  style='display: inline-block;' src='image/reset.png' alt='your image' height='50' width='60'/>";

    var msg_btn = "<div style='margin-left: 10px; margin-top: 22px; font-family: Courier-New; font-size: 16px;' >" + msg + "</div>" +
            "<button id='warningStatusModalProceed' onclick='warning_proceed_func(" + code + ")' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Proceed</button>" +
            "<button id='statusModalButton' class='statusModalButton' style='width:90px; height:30px; margin-left: 10px; margin-top: 20px; background:#f44242 ' >Cancel</button>";

    $('#userStatusModalImage').append(icon);
    $('#userStatusModalText').append(msg_btn);
    $('#StausText').html("Warning");

    $('#StatusModal').show();

    $('#statusModalButton').click(function () {
        $('#StatusModal').hide();
    });
    
    if(code === 99){
        $('#StatusModalContent').css('height','190px');        
    }
}

//Display Status messages baseed on return value 

function DisplayStatus(code) {
    switch (code) {
        case 2:
            InvalidStatus("Operation Failed");
            break;
        case 4:
            InvalidStatus("IP/Username already exists in the database");
            break;
        case 10:
            SuccessStatus("System updated successfully");
            break;
        case 11:
            InvalidStatus("You have reached the Maximum User Limit");
            break;
        case 12:
            InvalidStatus("You have entered an invalid email to the system");
            break;
        default:
            return -1;
    }
}
