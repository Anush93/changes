//CJS Request Status
var CJS_REQUEST_START = 1;
var CJS_REQUEST_END = 2;

//Connector Update Status
var LIST_UPDATE = 11;
var GRAPH_UPDATE = 12;
var SESSION_UPDATE = 13;
var DIAGRAM_UPDATE = 14;
var SETTINGS_UPDATE = 15;
var INFORMATION_UPDATE = 16;
var GUI_SHEETS = 20;

//Request Connector Request ID [can collide with live connector]
//var GRAPH_VBH_UPDATE = 5;
//var LIST_VMW_UPDATE = 6;
//var LIST_VHW_UPDATE = 7;
var SESSION_LIST_UPDATE = 8;
var SESSION_SOURCE_UPDATE = 9;
var SESSION_DEST_UPDATE = 10;
var SESSION_APP_UPDATE = 11;
var GRAPH_BH_UPDATE = 12;
//var GRAPH_BHN_UPDATE = 13;
//var GRAPH_BHP_UPDATE = 14;
var SESSION_SVS_UPDATE = 79;

//Diagram Types
var CLIENT_DIAGRAM = 15;
var SERVER_DIAGRAM = 16;
var SESSION_DIAGRAM = 17;
var TRAFFIC_DIAGRAM = 18;
var APP_DIAGRAM = 22;
var SVS_DIAGRAM = 81;

//Summery Updates for Dashboard
var SUMRY_SDC_UPDATE = 19;
var SUMRY_SRC_UPDATE = 20;
var SUMRY_APP_UPDATE = 21;
var SUMRY_DEST_UPDATE = 76;

//Summery Updates for Live Watch
var LSUMRY_UPDATE = 53;

//Live Summery Update Types
var LSUM_SRC_T_APP = 1;
var LSUM_SRC_T_DEST = 2;
var LSUM_APP_T_SRC = 3;
var LSUM_APP_T_DEST = 4;
var LSUM_DES_T_APP = 5;
var LSUM_DES_T_SRC = 6;
var LSUM_SVS_T_SRC = 7;
var LSUM_SVS_T_DEST = 8;
var LSUM_SRC_T_SVS = 9;
var LSUM_DES_T_SVS = 10;

///Detailed Reporting

//var DTR_UPDATE = 21;
//var DTR_GEN_REQUEST = 152;
//var DTR_URL_REQUEST = 153;
//
//var PQDTR_REQ_TOP_SRC = 1;
//var PQDTR_REQ_TOP_DST = 2;
//var PQDTR_REQ_TOP_APP = 3;
//var PQDTR_REQ_TOP_SES = 4;
//var PQDTR_REQ_BANDW = 5;
//var PQDTR_REQ_TOP_PORTS = 6;
//
////Settings Update Types
//var TIMESTAMP_UPDATE = 17;

//Information Request Type
var INFO_MANW_ST_RQ = 20;
var INFO_MANW_CT_RQ = 21;
var INFO_SETW_RQ = 22;
var INFO_DASH_NOTIFIC = 24;

//GUI sheets
var MENUBAR_SHEET = 82;
var PROPERTY_SHEET = 83;

//Live Connector Request ID
//var LBW_UPDATE = 5;
var LMLTS_UBW_UPDATE = 6;
//var LFBW_UPDATE = 7;
var LSES_UPDATE = 8;
var LSRC_UPDATE = 9;
var LDES_UPDATE = 10;
var LMLTAPPU_UPDATE = 11;
var LAPP_UPDATE = 12;
var LABW_UPDATE = 15;
//var LTAPPU_UPDATE = 16;
var LSVS_UPDATE = 18;
//var LTSDROP_UPDATE = 19;
var LURLDATA_UPDATE = 21;
//var LTUSERAPP_UPDATE = 29;
//var LVABW_UPDATE = 30;

//Client DIAGRAM Types
var SCD_TRAFIC = 1;
var SCD_SESSIONS = 2;
var SCD_DELAY = 3;

//History Data Get Types
var HIST_TYPE_MINE = 11;
var HIST_TYPE_NEXT = 12;
var HIST_TYPE_PREV = 13;

//VLAN Plot types
var VLAN_ONE_MSEC = 0;
var VLAN_TEN_SEC = 1;

//Get Active Directory User List

//var NA_GET_RADDR_ITEM_LIST = 179;
//var NA_GET_RGROUP_ITEM_LIST = 181;

//SET Active Directory Profile Configurations

//var NA_AD_CONF_PROFILE_ADD = 182;
//var NA_AD_CONF_PROFILE_UPDATE = 183;
//var NA_AD_CONF_PROFILE_SETDEF = 184;
//var NA_AD_CONF_PROFILE_DELETE = 185;
//var NA_GET_AD_CONF_PROFILE_LIST = 186;

//DHCP Profile Configurations [ACJS Requests & Replies]

//var NA_DHCP_CONF_PROFILE_ADD = 187;
//var NA_DHCP_CONF_PROFILE_UPDATE = 188;
//var NA_DHCP_CONF_PROFILE_SETDEF = 189;
//var NA_DHCP_CONF_PROFILE_DELETE = 190;
//var NA_GET_DHCP_CONF_PROFILE_LIST = 191;

//Remote addressing types

//var PQ_NA_REMAD_TYPE_AD_USER = 1;
//var PQ_NA_REMAD_TYPE_AD_GROUP = 2;
//var PQ_NA_REMAD_TYPE_DHCP_USER = 3;


//Device sync
var PDEV_HASY_CHANGE_DEVID = 158; 
var PDEV_HASY_CHANGE_VIP = 159; 
var PDEV_HASY_CHANGE_STATE = 160; 
var PDEV_HASY_ADD_RMT_DEV = 161; 
var PDEV_HASY_DEL_RMT_DEV = 162; 
var PDEV_GET_RMT_LIST = 163; 

var HA_UNDEFINED = 0;
var HA_PRIMARY = 1;
var HA_SECONDARY = 2;
var HA_INTERMEDIARY1 = 3;
var HA_INTERMEDIARY2 = 4;

//System Update Operations

//var PDEV_UPDATE_STATE = 136;
//var PDEV_CHECK_UPDATE = 137;
//var PDEV_CHECK_UPDATE_OPERATION = 138;
var WO_GET_VERSION_INFO = 139;
var PDEV_SET_UPDATE_EMAIL = 140;
//var PDEV_UPDATE_RETRY = 141;
var PDEV_INSTALL_OFFLINE_UPDATE = 149;
var PDEV_INSTALL_LICENSE = 150;
//var PDEV_SWITCH_ONLINE_UPDATE = 151;
var PDEV_INSTALL_SIGNATURE_FILE = 212;
var PDEV_GET_DEV_BYPASS_STATUS = 213; 
var PDEV_SET_DEV_BYPASS_STATUS = 214;

//Configuration Backup Configurations

var NA_CNFGBKUP_MOD_SERVER_CFG = 192;
var NA_CNFGBKUP_MOD_CFG_TIME = 193;
var NA_CNFGBKUP_BKUP_NOW = 194;
var NA_CNFGBKUP_RESTORE_NOW = 195;
var NA_CNFGBKUP_DETAIL_LIST = 196;

//Window IDs
var CURRENT_WINDOW = 0;
var WINDOW_LINK_SUMMARY = 1;
var WINDOW_USER_SUMMARY = 2;
var WINDOW_DASH_SOURCE = 3;
var WINDOW_DASH_DEST = 4;
var WINDOW_DASH_APP = 5;
//var WINDOW_DASH_SERV = 5;
var WINDOW_APP_LINK_UTIL = 6;
//var WINDOW_SERV_LINK_UTIL = 7;
var WINDOW_SES_SES = 7;
var WINDOW_SES_SOURCE = 8;
var WINDOW_SES_DEST = 9;
var WINDOW_SES_APP = 10;
var WINDOW_SES_SERV = 11;
var WINDOW_LIVE_SESSION_WATCH = 12;
var WINDOW_LIVE_SERVER_WATCH = 13;
var WINDOW_LIVE_URL_WATCH = 14;
var WINDOW_TRAFFIC = 15;
//var WINDOW_NOTIFIC = 14;

var WINDOW_RULE_DESTINATIONS = 16;
var WINDOW_RULE_URL = 17;
var WINDOW_RULE_APPLICATIONS = 18;
var WINDOW_RULE_SERVICE = 19;

//var WINDOW_RULES = 15;
//var WINDOW_OBJ_ADDRESS = 16;
//var WINDOW_OBJ_APPLICATIONS = 17;
//var WINDOW_OBJ_PIPE_SCHEDULES = 18;
var WINDOW_OBJ_SCHEDULE = 20;
//var WINDOW_OBJ_SERVICE = 20;
//var WINDOW_OBJ_SERVICE_LIST = 21;
var WINDOW_OBJ_ADMIN_PIPES = 21;
var WINDOW_OBJ_USER_PIPES = 22;
var WINDOW_DEFAULT_PIPE = 23;
//var WINDOW_OBJ_URL = 23;
//var WINDOW_OBJ_URL_LIST = 24;

//var WINDOW_RULE_MON = 25;
//var WINDOW_QUOTA = 26;
//var WINDOW_QUOTA_APP_PROFILES = 27;
//var WINDOW_QUOTA_URL_PROFILES = 28;
//var WINDOW_QUOTA_SERV_PROFILES = 48;
var WINDOW_QUOTA_PROFILES = 24;
//var WINDOW_QUOTA_APP_QUOTA = 30;
var WINDOW_QUOTA_USAGE = 25;
var WINDOW_QUOTA_USAGE_DET = 26;
var WINDOW_BW_HIST = 27;
//var WINDOW_REPORT = 33;
//var WINDOW_IP_USAGE = 34;
var WINDOW_PROFILE = 28;
var WINDOW_PROFILE_IP = 29;
var WINDOW_BILLING = 30;
var WINDOW_MANAGEMENT = 31;
var WINDOW_HIGH_AVAILABILITY = 32;
//var WINDOW_APP_SIG = 37;
//var WINDOW_SETTINGS = 38;
var WINDOW_MAINTENANCE = 33;
//var WINDOW_CONFIGURATION = 40;

//var WINDOW_DETAILED_IP_USAGE = 44;
//var WINDOW_APP_LINK_UTIL_USER = 45;
//var WINDOW_OBJ_APP_LIST = 46;
var WINDOW_SYSTEM_UPDATES = 34;

//var WINDOW_OBJ_ADDRESS_PROFILES = 51;
//var WINDOW_OBJ_ADDRESS_IP = 52;
//var WINDOW_OBJ_ADDRESS_MAC = 53;
//var WINDOW_OBJ_ADDRESS_AD = 54;
//var WINDOW_OBJ_ADDRESS_DHCP = 69;
//
//var WINDOW_QUOTA_USAGE_DET = 55;
//
//var WINDOW_REPORT_BANDWIDTH = 56;
//var WINDOW_REPORT_SUMMARY = 57;
//var WINDOW_REPORT_SRC = 58;
//var WINDOW_REPORT_DES = 59;
//var WINDOW_REPORT_APP = 60;
//var WINDOW_REPORT_PORT = 61;
//var WINDOW_REPORT_DET_SRC = 62;
//var WINDOW_REPORT_DET_DES = 63;
//var WINDOW_REPORT_DET_APP = 64;
//var WINDOW_REPORT_DET_PORT = 65;

//var WINDOW_LDAP_SERVER = 66;
//var WINDOW_DHCP_SERVER = 67;
//var WINDOW_DASH_VLAN = 68;

var DEST_RULE_TABLE = 1;
var URL_RULE_TABLE = 2;
var APP_RULE_TABLE = 3;
var SERV_RULE_TABLE = 4;


var pieColorScheme = ["#690f0f", "#191948", "#012e44", "#af2458", "#cc5216", "#d89c07", "#d8c44e", "#9b5dcc",
    "#438de2", "#1e987a"];

//var pieColorScheme_10 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#db530f",
//    "#8F00FF", "#0000FF"];

var pieColorScheme_10 = ["#690f0f", "#191948", "#012e44", "#af2458", "#cc5216", "#d89c07", "#d8c44e", "#9b5dcc",
    "#438de2", "#1e987a"];

var pieColorScheme_20 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF",
    "#0000FF", "#30D5C8", "#138808", "#FFDB58", "#FF0000", "#8B008B", "#000080", "#007BA7", "#FFB347", "#00755E",
    "#db530f", "#FFFF31"];

var pieColorScheme_30 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF",
    "#0000FF", "#30D5C8", "#138808", "#FFDB58", "#FF5A36", "#FF0000", "#8B008B", "#000080", "#007BA7", "#00755E",
    "#FFFF31", "#FFB347", "#66FF00", "#966FD6", "#FCF75E", "#E52B50", "#9400D3", "#0000EE", "#00FFFF", "#008000",
    "#FF00FF", "#FFBF00"];

var pieColorScheme_40 = ["#800000", "#191970", "#30D5C8", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF", "#007FFF",
    "#00CD00", "#FFDF00", "#FF5A36", "#FF007F", "#6495ED", "#138808", "#966FD6", "#FF0000", "#800080", "#00009C",
    "#00CC99", "#FFFF31", "#FF8C00", "#FFDB58", "#E30022", "#9400D3", "#0000EE", "#00755E", "#FF6700", "#76EE00",
    "#7CFC00", "#E30B5D", "#012e44", "#008000", "#FF1C00", "#A7FC00", "#00FFFF", "#D1E231", "#FCF75E", "#FFBF00",
    "#FF00FF", "#03C03C"];

var pieColorScheme_50 = ["#800000", "#191970", "#012e44", "#00CC99", "#DFFF00", "#B8860B", "#E0115F", "#8F00FF",
    "#0000FF", "#30D5C8", "#138808", "#FFDB58", "#FF5A36", "#FF0000", "#8B008B", "#000080", "#007BA7", "#00755E",
    "#FFFF31", "#FFB347", "#66FF00", "#966FD6", "#FCF75E", "#E52B50", "#9400D3", "#0000EE", "#00FFFF", "#008000",
    "#FFBF00", "#FF6700", "#D1E231", "#7CFC00", "#FF1C00", "#E30022", "#800080", "#00009C", "#6495ED", "#00CD00",
    "#FFDF00", "#FF8C00", "#A7FC00", "#E30B5D", "#007FFF", "#7FFFD4", "#03C03C", "#CB410B", "#FF007F", "#76EE00",
    "#FF00FF", "#FF3800"];

//var application_list = ['Unknown', 'Facebook', 'YouTube', 'Skype', 'Dropbox', 'Twitter', 'Viber', 'WhatsApp',
//    'Google-Analytics', 'Instagram', 'Gmail', 'Amazon', 'Wikipedia', 'Microsoft-Updates', 'Foursquare',
//    'Flickr', 'LinkedIn', 'Yahoo', 'Bing', 'Google Play', 'Google Drive', 'Hangouts', '9Gag', 'Mozilla', 'Netflix',
//    'TeamViewer', 'OneDrive', 'Google Plus', 'ESPN', 'Google Maps'];

var application_list = [];
var pq_services_list = [];

var pq_2_16_32 = function (one, two) {
    var merged = one + (two << 16);
    return merged;
};

var pq_1_16_2_8_32 = function (one, two, three) {
    var merged = one + (two << 16) + (three << 24);
    return merged;
};

var pq_4_8_32 = function (one, two, three, four) {
    var merged = one + (two << 8) + (three << 16) + (four << 24);
    return merged;
};

var pq_2_32_64 = function (one, two) {

};

var pq_32_4_8 = function (val) {
    var d = {
        one: val & 0xFF,
        two: (val >> 8) & 0xFF,
        three: (val >> 16) & 0xFF,
        four: (val >> 24) & 0xFF
    };
    return d;
};

var pq_32_2_16 = function (val) {
    var d = {
        one: val & 0xFFFF,
        two: (val >> 16) & 0xFFFF
    };
    return d;
};

var pq_32_1_16_2_8 = function (val) {
    var d = {
        one: val & 0xFFFF,
        two: (val >> 16) & 0xFF,
        three: (val >> 24) & 0xFF
    };

    return d;
};

var pq_32_2_8_1_16 = function (val) {
    var d = {
        one: (val >> 16) & 0xFFFF,
        two: (val >> 8) & 0xFF,
        three: (val) & 0xFF
    };

    return d;
};

function dot2num(dot)
{
    var d = dot.split('.');
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}

function dot2numR(dot)
{
    var d = dot.split('.');
    return ((((((+d[3]) * 256) + (+d[2])) * 256) + (+d[1])) * 256) + (+d[0]);
}

function num2dot(num)
{
    var d = num % 256;
    for (var i = 3; i > 0; i--)
    {
        num = Math.floor(num / 256);
        d = num % 256 + '.' + d;
    }
    return d;
}

function num2dotR(num)
{
    var d = num % 256;
    for (var i = 3; i > 0; i--)
    {
        num = Math.floor(num / 256);
        d = d + '.' + num % 256;
    }
    return d;
}

function var2num(st) {
    return +st;
}

function pq_pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var get_T_time = function (date) {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString().slice(0, -5);
};

var get_Ts_time = function (date) {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString().slice(0, -8);
};

var pq_get_usage = function (data) {
    if (data >= 1000000000000) { //T
        return (data / 1000000000000).toFixed(2) + ' TB';
    } else if (data >= 1000000000) { //G
        return (data / 1000000000).toFixed(2) + ' GB';
    } else if (data >= 1000000) { //M
        return (data / 1000000).toFixed(2) + ' MB';
    } else if (data >= 1000) { // K
        return (data / 1000).toFixed(2) + ' KB';
    } else { //Bytes
        return (data / 1.0).toFixed(2) + ' B';
    }
};

var pq_get_file_size = function (data) {
    if (data >= 1024 * 1024 * 1024 * 1024) { //T
        return (data / 1024 * 1024 * 1024 * 1024).toFixed(2) + ' TB';
    } else if (data >= (1024 * 1024 * 1024)) { //G
        return (data / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (data >= 1024 * 1024) { //M
        return (data / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (data >= 1024) { // K
        return (data / 1024).toFixed(2) + ' KB';
    } else { //Bytes
        return (data / 1.0).toFixed(2) + ' B';
    }
};

var pq_get_usage_det_rep = function (data) {
    if (data >= 1000000000000) { //T
        return (data / 1000000000000).toFixed(0) + ' TB';
    } else if (data >= 1000000000) { //G
        return (data / 1000000000).toFixed(0) + ' GB';
    } else if (data >= 1000000) { //M
        return (data / 1000000).toFixed(0) + ' MB';
    } else if (data >= 1000) { // K
        return (data / 1000).toFixed(0) + ' KB';
    } else { //Bytes
        return (data / 1.0).toFixed(0) + ' B';
    }
};

function gen_random_colour() {
    var color = '#' + Math.random().toString(16).substr(2, 6);
    return  color;
}

pq_rgbToHex = function (r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

function rgbToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
}
;


var bw_decode = function (bw) {
    var type = bw >> 30;
    var a_bw = bw && 0x3FFFFFFF;
    var bw_c = {
        type: type,
        bw: a_bw
    };
    return bw_c;
};

var uint32_float = function (val) {
    var uvals = new Uint32Array(1);
    uvals[0] = val;
    var fvals = new Float32Array(uvals.buffer);
    return  fvals[0];
};

function validateMac(mac) {
    var patt = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
    var result = patt.test(mac);
    return result;
}

var MacAddressToInt = function (mac) {
    var mac_elements = mac.split(":");
    if (mac_elements.length === 6) {
        var one = (parseInt(mac_elements[0], 16) << 8) + parseInt(mac_elements[1], 16);
        var two = (parseInt(mac_elements[2], 16) << 24) + (parseInt(mac_elements[3], 16) << 16) + (parseInt(mac_elements[4], 16) << 8) + parseInt(mac_elements[5], 16);
        var d = {
            uo: one,
            ut: two
        };
        return d;
    }
    return 'error';
};

var IntToMacAddress = function (mo, mt) {
    var mac = pq_pad((mt >> 8).toString(16), 2) + ':' + pq_pad((mt & 0x00FF).toString(16), 2) + ":" +
            pq_pad((mo >>> 24).toString(16), 2) + ':' + pq_pad(((mo >> 16) & 0x00FF).toString(16), 2) + ':' + pq_pad(((mo >> 8) & 0x00FF).toString(16), 2) +
            ':' + pq_pad(((mo) & 0x00FF).toString(16), 2);
    return mac;
};

pq_dygraph_tooltip = function () {
    return {"backgroundColor": "#FFFFFF",
        "border": "1px solid #006ACB",
        "borderRadius": "5px",
        "boxShadow": "1px 1px 4px #CCCCCC",
        "fontFamily": "Lucida Grande , Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif",
        "fontSize": "12px",
        "fontWeight": "normal",
        "opacity": "0.85",
        "padding": "3px"};
};

y_axis_bw_val_formatter = function (bw, precision) {
    var data = (bw * 1000 * 1000);
    var val;
    if (data >= 1000000000) { //G
        val = (data / 1000000000).toFixed(precision) + ' Gbps';
    } else if (data >= 1000000) { //M
        val = (data / 1000000).toFixed(precision) + ' Mbps';
    } else if (data >= 1000) { // K
        val = (data / 1000).toFixed(precision) + ' Kbps';
    } else { //Bytes
        val = (data).toFixed(precision) + ' bps';
    }
    return val;
};

function closeModalInit(type) {
    switch (type) {
        case 1:
            $('.close').on('click', function () {
                $('.close').parent().parent().hide();
            });
            break;
        case 2:
            $('.statusModalButton').on('click', function () {
                $('.statusModalButton').parent().parent().parent().hide();
            });
            break;
    }
}

function closeModal(){
    $('.close').parent().parent().hide();
}

function app_serv_dissect(id) {
    if (id >= application_list.length) {
        return pq_services_list[parseInt(id - 65536)];
    } else
        return application_list[id];
}

function getIpRangeFromAddressAndNetmask(ip, subnet) {
    var ipaddress = ip.split('.');
    var netmaskblocks = ["0", "0", "0", "0"];
    if (!/\d+\.\d+\.\d+\.\d+/.test(subnet)) {
        // part[1] has to be between 0 and 32
        netmaskblocks = ("1".repeat(parseInt(subnet, 10)) + "0".repeat(32 - parseInt(subnet, 10))).match(/.{1,8}/g);
        netmaskblocks = netmaskblocks.map(function (el) {
            return parseInt(el, 2);
        });
    } else {
        // xxx.xxx.xxx.xxx
        netmaskblocks = subnet.split('.').map(function (el) {
            return parseInt(el, 10);
        });
    }
    var invertedNetmaskblocks = netmaskblocks.map(function (el) {
        return el ^ 255;
    });
    var baseAddress = ipaddress.map(function (block, idx) {
        return block & netmaskblocks[idx];
    });
    var broadcastaddress = ipaddress.map(function (block, idx) {
        return block | invertedNetmaskblocks[idx];
    });
    return [baseAddress.join('.'), broadcastaddress.join('.')];
}

function search_dropdown_list(searchBox, opts, user) {
    var text = user;
    var options = opts.options;
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        var optionText = option.text;
        var lowerOptionText = optionText.toLowerCase();
        var lowerText = text.toLowerCase();
        var regex = new RegExp("^" + text, "i");
        var match = optionText.match(regex);
        var contains = lowerOptionText.indexOf(lowerText) !== -1;
        if (match || contains) {
            option.selected = true;
            return;
        }
        searchBox.selectedIndex = 0;
    }
}
