decode_ip_version = function (ip) {
    if (ip) {
        if (ip.includes(":")) {
            return 6;
        } else if (ip.includes(".")) {
            return 4;
        } else
            return 0;
    } else
        return 0;
};

decode_subnet_mask = function (ip) {
    if (ip) {
        if (ip.includes(":")) {
            return 128;
        } else if (ip.includes(".")) {
            return 32;
        } else
            return 0;
    } else
        return 0;
};

decode_ip_subnet_mask = function (ip) {
    if (ip) {
        var elmt = ip.split("/");
        var ip_addr;
        var mask;
        if (elmt.length > 1) {
            ip_addr = elmt[0];
            mask = +elmt[1];
        } else {
            ip_addr = ip;
            mask = decode_subnet_mask(ip_addr);
        }
        return [ip_addr, mask];
    } else
        return 0;
};

rec_ip_decode = function (version, s1, s2, s3, s4, flag) {
//    console.log(flag, s1, s2, s3, s4, v4_type)
    if (version === 4) {
        if (flag) {
            return num2dot(s1);
        } else
            return num2dotR(s1);
    } else {
        if (flag) {
            return input_to_ipv6(s1, s2, s3, s4);
        } else
            return input_to_ipv6R(s1, s2, s3, s4);
    }
};

send_ip_encode = function (version, ip, flag) {
    console.log(ip)
    if (version === 4) {
        var sip;
        if (flag) {
            sip = [dot2num(ip), 0, 0, 0];
            return sip;
        } else
            sip = [dot2numR(ip), 0, 0, 0];
        return sip;
    } else {
        var sip;
        if (flag) {
            sip = ipv6_to_num(ip);
            return sip;
        } else
            sip = ipv6_to_numR(ip);
        return sip;
    }
};

var matching_index_store = [];
input_to_ipv6 = function (s1, s2, s3, s4) {
    var segments = [s1, s2, s3, s4];
    var hex_quad = [];
    var hex_segments = [];
    for (var i = 0; i < 4; i++) {
        var bnry_len;
        hex_quad[i] = segments[i].toString(16);
        if (hex_quad[i].length < 8) {
            bnry_len = 8 - hex_quad[i].length;
            hex_quad[i] = '00000000'.substr(-bnry_len) + hex_quad[i];
        }
    }
    for (var i = 0; i < 4; i++) {
        hex_segments.push(hex_quad[i].substr(0, 4));
        hex_segments.push(hex_quad[i].substr(4, 4));
    }

    for (var i = 0; i < 8; i++) {
        hex_segments[i] = hex_segments[i].replace(/^0+((\d)|[a-f])/gm, '$1');
    }

    var ipv6_addr = hex_segments[0] + ':' + hex_segments[1] + ':' + hex_segments[2] + ':' + hex_segments[3] + ':' + hex_segments[4] + ':' + hex_segments[5] + ':' + hex_segments[6] + ':' + hex_segments[7];
    var sub_index_store = [];
    var has = true;
    var tempIPV6 = ipv6_addr;

    while (has) {
        var index = tempIPV6.indexOf(':0:');
        if (index == -1) {
            if (tempIPV6.substr(ipv6_addr.length - 2) == ':0') {
                sub_index_store.push(ipv6_addr.length - 2);
            }
            has = false;
            break;
        }
        sub_index_store.push(index);
        tempIPV6 = tempIPV6.substr(0, index) + ':1:' + tempIPV6.substr(index + 3);
    }
    matching_index_store = [];
    find_matching_index(sub_index_store, 0, 0);
    var len = matching_index_store.length;
    var maxlen = 0;
    var maxindex = [];
    for (var i in matching_index_store) {
        if (matching_index_store[i].length > maxlen) {
            maxlen = matching_index_store[i].length;
            maxindex = matching_index_store[i];
        }
    }
    if (maxindex.length > 0) {
        ipv6_addr = ipv6_addr.substr(0, maxindex[0]) + ':' + ipv6_addr.substr(maxindex[maxindex.length - 1] + 2);
    } else {
    }
    return ipv6_addr;
};

input_to_ipv6R = function (s1, s2, s3, s4) {
    var segments = [s1, s2, s3, s4];
    for (var i in segments) {
        segments[i] = segments[i].toString(2);
        var bnry_len = segments[i].length;
        if (bnry_len < 32) {
            segments[i] = reverseString("00000000000000000000000000000000".substr(bnry_len) + segments[i]);

        } else {
            segments[i] = reverseString(segments[i]);
        }
        segments[i] = parseInt((reverseString(segments[i].substr(0, 8)) + reverseString(segments[i].substr(8, 8)) + reverseString(segments[i].substr(16, 8)) + reverseString(segments[i].substr(24, 8))), 2);

    }
//    console.log(segments)
    var hex_quad = [];
    var hex_segments = [];
    for (var i = 0; i < 4; i++) {
        var bnry_len;
        hex_quad[i] = segments[i].toString(16);
        if (hex_quad[i].length < 8) {
            bnry_len = 8 - hex_quad[i].length;
            hex_quad[i] = '00000000'.substr(-bnry_len) + hex_quad[i];
        }

        var hex_quad = [];
        var hex_segments = [];
        for (var i = 0; i < 4; i++) {
            var bnry_len;
            hex_quad[i] = segments[i].toString(16);
            if (hex_quad[i].length < 8) {
                bnry_len = 8 - hex_quad[i].length;
                hex_quad[i] = '00000000'.substr(-bnry_len) + hex_quad[i];
            }
        }

        for (var i = 0; i < 4; i++) {
            hex_segments.push(hex_quad[i].substr(0, 4));
            hex_segments.push(hex_quad[i].substr(4, 4));
        }

        for (var i = 0; i < 8; i++) {
            hex_segments[i] = hex_segments[i].replace(/^0+((\d)|[a-f])/gm, '$1');
        }

        var ipv6_addr = hex_segments[0] + ':' + hex_segments[1] + ':' + hex_segments[2] + ':' + hex_segments[3] + ':' + hex_segments[4] + ':' + hex_segments[5] + ':' + hex_segments[6] + ':' + hex_segments[7];
        var sub_index_store = [];
        var has = true;
        var tempIPV6 = ipv6_addr;

        while (has) {
            var index = tempIPV6.indexOf(':0:');
            if (index == -1) {
                if (tempIPV6.substr(ipv6_addr.length - 2) == ':0') {
                    sub_index_store.push(ipv6_addr.length - 2);
                }
                has = false;
                break;
            }
            sub_index_store.push(index);
            tempIPV6 = tempIPV6.substr(0, index) + ':1:' + tempIPV6.substr(index + 3);
        }
        matching_index_store = [];
        find_matching_index(sub_index_store, 0, 0);
        var len = matching_index_store.length;
        var maxlen = 0;
        var maxindex = [];
        for (var i in matching_index_store) {
            if (matching_index_store[i].length > maxlen) {
                maxlen = matching_index_store[i].length;
                maxindex = matching_index_store[i];
            }
        }
        if (maxindex.length > 0) {
            ipv6_addr = ipv6_addr.substr(0, maxindex[0]) + ':' + ipv6_addr.substr(maxindex[maxindex.length - 1] + 2);
        } else {
        }

        return ipv6_addr;
    }
};

var find_matching_index = function (sub_index_store, m, h) {
    if (matching_index_store.length - 1 < h) {
        matching_index_store.push([]);
    }

    for (var i = m; i < sub_index_store.length; i++) {
        matching_index_store[h].push(sub_index_store[i]);
        if (sub_index_store[i] + 2 == sub_index_store[i + 1]) {
            if (matching_index_store[h].length != 1) {
                matching_index_store[h].pop();
            }
            matching_index_store[h].push(sub_index_store[i + 1]);
            find_matching_index(sub_index_store, i + 1, h);
            break;
        } else {
            if (matching_index_store[h].length != 1) {
                matching_index_store[h].pop();
            }
            i += 1;
            if (i < sub_index_store.length) {
                find_matching_index(sub_index_store, i, h + 1);
            }
            break;

        }
    }
};

ipv6_insert_leading_zeros = function (ip_string) {

    // take care of leading and trailing ::
    ip_string = ip_string.replace(/^:|:$/g, '');

    var ipv6 = ip_string.split(':');

    for (var i = 0; i < ipv6.length; i++) {
        var hex = ipv6[i];
        if (hex != "") {
            // normalize leading zeros
            ipv6[i] = ("0000" + hex).substr(-4);
        } else {
            // normalize grouped zeros ::
            hex = [];
            for (var j = ipv6.length; j <= 8; j++) {
                hex.push('0000');
            }
            ipv6[i] = hex.join(':');
        }
    }
    return ipv6.join(':');
};

ipv6_to_num = function (ip) {
    if (ip.includes('::') || ip.includes(':', ip.length - 1)) {
        var count = 0;
        var substring = ip;
        var index = 0;
        while (index != -1) {
            index = substring.indexOf(':');
            count++;
            substring = substring.substr(0, index) + ',' + substring.substr(index + 1);
        }
        var ind;
        if (ip.includes(':', ip.length - 1)) {
            var firstStrn = ip.substr(0, ip.length - 1);
            var medStrng = '';
            for (var i = 0; i <= 8 - count; i++) {
                medStrng = ':0000' + medStrng;
            }
            ip = firstStrn + medStrng;
        } else {
            ind = ip.indexOf('::');
            var firstStrn = ip.substr(0, ind);
            var secStrng = ip.substr(ind + 2);
            var medStrng = ':';
            for (var i = 0; i <= 8 - count; i++) {
                medStrng = ':0000' + medStrng;
            }
            ip = firstStrn + medStrng + secStrng;
        }
    }
    var parts = [];
    var dec_quad = [];
    ip.split(":").forEach(function (it) {
        var bin = parseInt(it, 16).toString(2);
        while (bin.length < 16) {
            bin = "0" + bin;
        }
        parts.push(bin);
    });
//    console.log(parts);
    for (var i = 0; i < 8; i = i + 2) {
        dec_quad[i / 2] = parseInt((parts[i] + parts[i + 1]), 2);
    }
    return dec_quad;
};

ipv6_to_numR = function (ip) {
    if (ip.includes('::') || ip.includes(':', ip.length - 1)) {
        var count = 0;
        var substring = ip;
        var index = 0;
        while (index != -1) {
            index = substring.indexOf(':');
            count++;
            substring = substring.substr(0, index) + ',' + substring.substr(index + 1);
        }
        var ind;
        if (ip.includes(':', ip.length - 1)) {
            var firstStrn = ip.substr(0, ip.length - 1);
            var medStrng = '';
            for (var i = 0; i <= 8 - count; i++) {
                medStrng = ':0000' + medStrng;
            }
            ip = firstStrn + medStrng;
        } else {
            ind = ip.indexOf('::');
            var firstStrn = ip.substr(0, ind);
            var secStrng = ip.substr(ind + 2);
            var medStrng = ':';
            for (var i = 0; i <= 8 - count; i++) {
                medStrng = ':0000' + medStrng;
            }
            ip = firstStrn + medStrng + secStrng;
        }
    }
    var parts = [];
    var dec_quad = [];
    ip.split(":").forEach(function (it) {
        var bin = parseInt(it, 16).toString(2);
        while (bin.length < 16) {
            bin = "0" + bin;
        }
        parts.push(bin);
    });


    for (var i = 0; i < 8; i = i + 2) {
        dec_quad[i / 2] = reverseString(parts[i] + parts[i + 1]);
        dec_quad[i / 2] = parseInt(reverseString(dec_quad[i / 2].substr(0, 8)) + reverseString(dec_quad[i / 2].substr(8, 8)) + reverseString(dec_quad[i / 2].substr(16, 8)) + reverseString(dec_quad[i / 2].substr(24, 8)), 2);
    }

    return dec_quad;
};

function validateIPv6(ip) {
    var element = ip.split("/");
    if (element.length > 1) {
        ip = element[0];
        if (element[1] > 128) {
            return false;
        }
    }
    var patt = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\s*$/;
    var result = patt.test(ip);
    return result;
}

function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

function getIpv6RangeFromAddressAndNetmask(ipv6, subnet) {

    var ip = ipv6_insert_leading_zeros(ipv6);
    var ipaddress = ip.split(':').map(function (el) {
        return parseInt(el, 16);
    });
//        console.log(ipaddress)
    var netmaskblocks = ["0", "0", "0", "0", "0", "0", "0", "0"];
    if (!/\d+\:\d+\:\d+\:\d+\:\d+\:\d+\:\d+\:\d+/.test(subnet)) {
        // part[1] has to be between 0 and 128
        netmaskblocks = ("1".repeat(parseInt(subnet, 10)) + "0".repeat(128 - parseInt(subnet, 10))).match(/.{1,16}/g);
//        console.log(netmaskblocks)
        netmaskblocks = netmaskblocks.map(function (el) {
            return parseInt(el, 2);
        });
    } else {
        // xxx:xxx:xxx:xxx:xxx:xxx:xxx:xxx
        netmaskblocks = subnet.split(':').map(function (el) {
            return parseInt(el, 10);
        });
    }
    var invertedNetmaskblocks = netmaskblocks.map(function (el) {
        return el ^ 65535;
    });
    var baseAddress = ipaddress.map(function (block, idx) {
        return block & netmaskblocks[idx];
    });
    baseAddress = baseAddress.map(function (el) {
        return (el + 0x10000).toString(16).substr(-4);
    });
//    console.log(baseAddress);
    var broadcastaddress = ipaddress.map(function (block, idx) {
        return block | invertedNetmaskblocks[idx];
    });
    broadcastaddress = broadcastaddress.map(function (el) {
        return (el + 0x10000).toString(16).substr(-4);
    });
//    console.log(broadcastaddress);
    return [baseAddress.join(':'), broadcastaddress.join(':')];
}


decode_ip_category = function (ipval) {

    var ip_v;
    var ip;
    var ipr;
    var _ip_s = ipval.split('/');
    var _ip_r = ipval.split('-');

    if (_ip_s.length === 2) {
        var ip_s = [];
        ip_v = decode_ip_version(_ip_s[0]);
        if (ip_v === 4) {
            if (validateIP(_ip_s[0])) {
                ip_s = getIpRangeFromAddressAndNetmask(_ip_s[0], _ip_s[1]);
                ip = send_ip_encode(ip_v, ip_s[0], 1);
                ipr = send_ip_encode(ip_v, ip_s[1], 1);
                return [ip_v, ip, ipr];
            } else
                InvalidStatus("Invalid IP Address");
        } else if (ip_v === 6) {
            if (validateIPv6(_ip_s[0])) {
                ip_s = getIpv6RangeFromAddressAndNetmask(_ip_s[0], _ip_s[1]);
                ip = send_ip_encode(ip_v, ip_s[0], 1);
                return [ip_v, ip, ipr];
                ipr = send_ip_encode(ip_v, ip_s[1], 1);
            } else
                InvalidStatus("Invalid IP Address");
        }
    } else if (_ip_r.length === 2) {
        ip_v = decode_ip_version(_ip_r[0]);
        if ((validateIP(_ip_r[0]) && validateIP(_ip_r[1])) || (validateIPv6(_ip_r[0]) && validateIPv6(_ip_r[1]))) {
            ip = send_ip_encode(ip_v, _ip_r[0], 1);
            ipr = send_ip_encode(ip_v, _ip_r[1], 1);
            if (isNaN(ip[0])) {
                ip.fill(0);
            }
            if (isNaN(ipr[0])) {
                ipr.fill(0);
            }
            return [ip_v, ip, ipr];
        } else
            InvalidStatus("Invalid IP Address");

    } else {
        ip_v = decode_ip_version(ipval);

        if (validateIP(ipval) || validateIPv6(ipval)) {
            ip = send_ip_encode(ip_v, ipval, 1);
            if (isNaN(ip[0]) || ip[0] === 0) {
                ip.fill(0);
            }
            ipr = ip.slice(0);
            return [ip_v, ip, ipr];
        } else
            InvalidStatus("Invalid IP Address");
    }
};