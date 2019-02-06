var appsInBw_table = [
    ["", "Youtube", "0.1176", "2.33 %"],
    ["", "Viber", "0.305", "6.05 %"],
    ["", "Skype", "0.883", "17.51 %"],
    ["", "Facebook", "0.7622", "15.11 %"],
    ["", "Whatsapp", "0.359", "7.12 %"],
    ["", "Twitter", "0.2366", "4.69 %"],
    ["", "Gmail", "0.152", "3.01 %"],
    ["", "Instagram", "0.7727", "15.32 %"],
    ["", "Google Maps", "0.1477", "2.93 %"],
    ["", "LinkedIn", "0.92", "18.24 %"],
    ["", "Other Apps", "0.388", "7.69 %"],
    ["", "Youtube", "0.1176", "2.33 %"],
    ["", "Viber", "0.305", "6.05 %"],
    ["", "Skype", "0.883", "17.51 %"],
    ["", "Facebook", "0.7622", "15.11 %"],
    ["", "Whatsapp", "0.359", "7.12 %"],
    ["", "Twitter", "0.2366", "4.69 %"],
    ["", "Gmail", "0.152", "3.01 %"],
    ["", "Instagram", "0.7727", "15.32 %"],
    ["", "Google Maps", "0.1477", "2.93 %"],
    ["", "LinkedIn", "0.92", "18.24 %"],
    ["", "Other Apps", "0.388", "7.69 %"],
    ["", "Youtube", "0.1176", "2.33 %"],
    ["", "Viber", "0.305", "6.05 %"],
    ["", "Skype", "0.883", "17.51 %"],
    ["", "Facebook", "0.7622", "15.11 %"],
    ["", "Whatsapp", "0.359", "7.12 %"],
    ["", "Twitter", "0.2366", "4.69 %"],
    ["", "Gmail", "0.152", "3.01 %"],
    ["", "Instagram", "0.7727", "15.32 %"],
    ["", "Google Maps", "0.1477", "2.93 %"],
    ["", "LinkedIn", "0.92", "18.24 %"],
    ["", "Other Apps", "0.388", "7.69 %"]
];

var appsCtrl_table = [
    ["1", "Youtube", "Entertainment", "0"],
    ["2", "Viber", "Communication", "0"],
    ["3", "Skype", "Communication", "1"],
    ["4", "Facebook", "Social Media", "1"],
    ["5", "Whatsapp", "Communication", "0"],
    ["6", "Twitter", "Social Media", "0"],
    ["7", "Gmail", "Email", "0"],
    ["8", "Instagram", "Social Media", "1"],
    ["9", "Google Maps", "Maps", "0"],
    ["10", "LinkedIn", "Professional", "0"]
];

var appsOutBw_table = [
    ["", "Skype", "0.225", "7.75 %"],
    ["", "Viber", "0.321", "11.05 %"],
    ["", "Google Maps", "0.106", "3.65 %"],
    ["", "Facebook", "0.21", "7.23 %"],
    ["", "BitTorrent", "0.125", "4.30 %"],
    ["", "Netflix", "0.13", "4.48 %"],
    ["", "Gmail", "0.401", "13.80 %"],
    ["", "Facebook", "0.327", "11.26 %"],
    ["", "Youtube", "0.154", "5.30 %"],
    ["", "Instagram", "0.261", "8.98 %"],
    ["", "Other Apps", "0.645", "22.2 %"]
];
var appInBw_table = [["", "Youtube", "352.2 MB", "0.975 Mbps", "0.503 Mbps", ""]];
var appInBw_table_2 = [["", "Skype", "10.2 MB", "0.245 Mbps", "0.204 Mbps", ""]];
var appDownBw_table = [["", "Skype", "10.2 MB", "0.324 Mbps", "0.75 Mbps", ""]];
var appDownBw_table_2 = [["", "Gmail", "3.8 MB", "0.145 Mbps", "0.98 Mbps", ""]];
var usersInBw_table = [
    ["", "192.168.1.111", "0.45 ", "7.76 %"],
    ["", "192.168.1.106", "0.15 ", "2.59 %"],
    ["", "192.168.1.105", "0.74 ", "12.76 %"],
    ["", "192.168.1.120", "0.96 ", "16.55 %"],
    ["", "192.168.1.121", "0.42 ", "7.24 %"],
    ["", "192.168.1.124", "0.78 ", "13.45 %"],
    ["", "192.168.1.128", "0.25 ", "4.31 %"],
    ["", "192.168.1.131", "0.14 ", "2.41 %"],
    ["", "192.168.1.148", "0.87 ", "15.00 %"],
    ["", "192.168.1.153", "0.69 ", "11.90 %"]
];
var usersOutBw_table = [
    ["", "192.168.1.128", "0.75 ", "12.42 %"],
    ["", "192.168.1.129", "0.35 ", "5.79 %"],
    ["", "192.168.1.123", "0.47 ", "7.78 %"],
    ["", "192.168.2.113", "0.86 ", "14.24 %"],
    ["", "192.168.2.2", "0.35 ", "5.79 %"],
    ["", "192.168.1.171", "0.74 ", "12.25 %"],
    ["", "192.168.1.118", "0.92 ", "15.23 %"],
    ["", "192.168.1.114", "0.24 ", "3.97 %"],
    ["", "192.168.1.197", "0.19 ", "3.15 %"],
    ["", "192.168.3.2", "0.68", "11.26 %"]
];
var userInBw_table = [["", "192.168.1.223", "10.2 GB", "0.948 Mbps", "0.674 Mbps", ""]];
var userDownBw_table = [["", "192.168.1.171", "148.3 MB", "0.587 Mbps", "0.25 Mbps", ""]];
var source_dataSet = [
    ["192.168.1.111", "221", "11.76 MB", "11.76 MB"],
    ["192.168.1.138", "137", "14.47 MB", "23.66 MB"],
    ["192.168.1.223", "93", "8.83 MB", "77.27 MB"],
    ["192.168.1.153", "70", "76.22 MB", "11.76 MB"],
    ["192.168.1.194", "65", "3.59 MB", "23.66 MB"],
    ["192.168.1.154", "56", "23.66 MB", "11.76 MB"],
    ["192.168.1.167", "51", "1.52 MB", "11.76 MB"],
    ["192.168.1.106", "221", "77.27 MB", "35.10 KB"],
    ["192.168.1.130", "51", "14.77 MB", "11.76 MB"],
    ["192.168.1.204", "35", "4.44 MB", "46.45 KB"],
    ["192.168.1.165", "23", "19.93 KB", "11.76 MB"],
    ["192.168.1.128", "19", "46.45 KB", "4.44 MB"],
    ["192.168.1.129", "17", "96.34 KB", "46.45 KB"],
    ["192.168.1.123", "11", "35.10 KB", "11.76 MB"],
    ["192.168.2.113", "10", "74 MB", "34.45 KB"],
    ["192.168.2.2", "9", "91.48 KB", "11.76 MB"],
    ["192.168.1.171", "8", "62.46 KB", "24.88 KB"],
    ["192.168.1.118", "7", "30.40 KB", "11.76 MB"],
    ["192.168.1.114", "7", "64.77 KB", "62.46 KB"],
    ["192.168.1.197", "7", "17.67 KB", "11.76 MB"],
    ["192.168.3.2", "4", "24.88 KB", "30.40 KB"],
    ["192.168.1.139", "4", "19.67 KB", "91.48 KB"],
    ["192.168.1.163", "3", "157 B", "11.76 MB"],
    ["192.168.1.112", "1", "62.97 B", "11.76 MB"],
    ["192.168.1.103", "1", "748 B", "62.97 B"],
    ["192.168.1.111", "221", "11.76 MB", "11.76 MB"],
    ["192.168.1.138", "137", "14.47 MB", "23.66 MB"],
    ["192.168.1.223", "93", "8.83 MB", "77.27 MB"],
    ["192.168.1.153", "70", "76.22 MB", "11.76 MB"],
    ["192.168.1.194", "65", "3.59 MB", "23.66 MB"],
    ["192.168.1.154", "56", "23.66 MB", "11.76 MB"],
    ["192.168.1.167", "51", "1.52 MB", "11.76 MB"],
    ["192.168.1.106", "221", "77.27 MB", "35.10 KB"],
    ["192.168.1.130", "51", "14.77 MB", "11.76 MB"],
    ["192.168.1.204", "35", "4.44 MB", "46.45 KB"],
    ["192.168.1.165", "23", "19.93 KB", "11.76 MB"],
    ["192.168.1.128", "19", "46.45 KB", "4.44 MB"],
    ["192.168.1.129", "17", "96.34 KB", "46.45 KB"],
    ["192.168.1.123", "11", "35.10 KB", "11.76 MB"],
    ["192.168.2.113", "10", "74 MB", "34.45 KB"],
    ["192.168.2.2", "9", "91.48 KB", "11.76 MB"],
    ["192.168.1.171", "8", "62.46 KB", "24.88 KB"],
    ["192.168.1.118", "7", "30.40 KB", "11.76 MB"],
    ["192.168.1.114", "7", "64.77 KB", "62.46 KB"],
    ["192.168.1.197", "7", "17.67 KB", "11.76 MB"],
    ["192.168.3.2", "4", "24.88 KB", "30.40 KB"],
    ["192.168.1.139", "4", "19.67 KB", "91.48 KB"],
    ["192.168.1.163", "3", "157 B", "11.76 MB"],
    ["192.168.1.112", "1", "62.97 B", "11.76 MB"],
    ["192.168.1.103", "1", "748 B", "62.97 B"]

];

var destination_dataSet = [
    ["74.125.68.188", "Facebook", "221", "11.76 MB", "11.76 MB"],
    ["31.13.79.246", "Youtube", "137", "14.47 MB", "23.66 MB"],
    ["216.35.128.6", "Netflix", "93", "8.83 MB", "77.27 MB"],
    ["91.220.196.250", "Pandora", "70", "76.22 MB", "11.76 MB"],
    ["31.13.78.13", "Google", "65", "3.59 MB", "23.66 MB"],
    ["64.4.23.172", "Teamviewer", "56", "23.66 MB", "11.76 MB"],
    ["40.113.87.220", "Hotmail", "51", "1.52 MB", "11.76 MB"],
    ["157.55.235.176", "Dropbox", "221", "77.27 MB", "35.10 KB"],
    ["66.211.181.192", "Viber", "51", "14.77 MB", "11.76 MB"],
    ["208.91.112.53", "Skype", "35", "4.44 MB", "46.45 KB"],
    ["216.58.221.74", "Gmail", "23", "19.93 KB", "11.76 MB"],
    ["72.30.196.161", "MSN", "19", "46.45 KB", "4.44 MB"],
    ["74.125.200.139", "LinkedIn", "17", "96.34 KB", "46.45 KB"],
    ["204.79.197.217", "Yahoo", "11", "35.10 KB", "11.76 MB"],
    ["209.151.236.22", "Cricinfo", "9", "91.48 KB", "11.76 MB"],
    ["31.13.78.32", "ScienceAlert", "8", "62.46 KB", "24.88 KB"],
    ["94.245.121.251", "Bing", "7", "30.40 KB", "11.76 MB"],
    ["104.25.94.19", "TechCrunch", "7", "64.77 KB", "62.46 KB"],
    ["77.234.43.23", "Netscape", "7", "17.67 KB", "11.76 MB"],
    ["65.54.225.16", "Canon Rumours", "4", "24.88 KB", "30.40 KB"],
    ["104.244.42.193", "Moodle", "4", "19.67 KB", "91.48 KB"]
];
var session_dataSet = [
    ["192.168.1.111", "74.125.68.188", "Facebook", "11.76 MB", "11.76 MB"],
    ["192.168.1.138", "31.13.79.246", "Youtube", "14.47 MB", "23.66 MB"],
    ["192.168.1.223", "216.35.128.6", "Netflix", "8.83 MB", "77.27 MB"],
    ["192.168.1.153", "91.220.196.250", "Pandora", "76.22 MB", "11.76 MB"],
    ["192.168.1.194", "31.13.78.13", "Google", "3.59 MB", "23.66 MB"],
    ["192.168.1.154", "64.4.23.172", "Teamviewer", "23.66 MB", "11.76 MB"],
    ["192.168.1.167", "40.113.87.220", "Hotmail", "1.52 MB", "11.76 MB"],
    ["192.168.1.106", "157.55.235.176", "Dropbox", "25.7 MB", "77.27 MB", "35.10 KB"],
    ["192.168.1.130", "66.211.181.192", "Viber", "14.77 MB", "11.76 MB"],
    ["192.168.1.204", "208.91.112.53", "Skype", "4.44 MB", "46.45 KB"],
    ["192.168.1.165", "216.58.221.74", "Gmail", "19.93 KB", "11.76 MB"],
    ["192.168.1.128", "72.30.196.161", "MSN", "46.45 KB", "4.44 MB"],
    ["192.168.1.129", "74.125.200.139", "LinkedIn", "96.34 KB", "46.45 KB"],
    ["192.168.1.123", "204.79.197.217", "Yahoo", "35.10 KB", "11.76 MB"],
    ["192.168.2.2", "209.151.236.22", "Cricinfo", "91.48 KB", "11.76 MB"],
    ["192.168.1.171", "31.13.78.32", "ScienceAlert", "62.46 KB", "24.88 KB"],
    ["192.168.1.114", "104.25.94.19", "TechCrunch", "64.77 KB", "62.46 KB"],
    ["192.168.1.197", "77.234.43.23", "Netscape", "17.67 KB", "11.76 MB"],
    ["192.168.3.2", "65.54.225.16", "Canon Rumours", "24.88 KB", "30.40 KB"],
    ["192.168.1.139", "104.244.42.193", "Moodle", "19.67 KB", "91.48 KB"]
];
var app_dataSet = [
    ["Facebook", "Social Media", "221", "11.76 MB", "11.76 MB"],
    ["Youtube", "Entertainment", "137", "14.47 MB", "23.66 MB"],
    ["Netflix", "Entertainment", "93", "8.83 MB", "77.27 MB"],
    ["Pandora", "Entertainment", "70", "76.22 MB", "11.76 MB"],
    ["Google", "Search Engine", "65", "3.59 MB", "23.66 MB"],
    ["Teamviewer", "Communication", "56", "23.66 MB", "11.76 MB"],
    ["Hotmail", "Email", "51", "1.52 MB", "11.76 MB"],
    ["Dropbox", "Storage", "62", "77.27 MB", "35.10 KB"],
    ["Viber", "Communication", "51", "14.77 MB", "11.76 MB"],
    ["Skype", "Communication", "35", "4.44 MB", "46.45 KB"],
    ["Gmail", "Email", "23", "19.93 KB", "11.76 MB"],
    ["MSN", "Search Engine", "19", "46.45 KB", "4.44 MB"],
    ["LinkedIn", "Social Media", "17", "96.34 KB", "46.45 KB"],
    ["Yahoo", "Search Engine", "11", "35.10 KB", "11.76 MB"],
    ["Cricinfo", "Sports", "9", "91.48 KB", "11.76 MB"],
    ["ScienceAlert", "Science", "8", "62.46 KB", "24.88 KB"],
    ["Bing", "Search Engine", "7", "30.40 KB", "11.76 MB"],
    ["TechCrunch", "Science", "7", "64.77 KB", "62.46 KB"],
    ["Netscape", "Browser", "7", "17.67 KB", "11.76 MB"],
    ["Canon Rumours", "Entertainment", "4", "24.88 KB", "30.40 KB"],
    ["Moodle", "Communication", "4", "19.67 KB", "91.48 KB"]
];
var i;
var rule_data = [
    ["1", "192.168.1.111", "192.168.1.154", "0.45 ", "7.76 %", "", "", "", "", ""],
    ["2", "192.168.1.138", "192.168.1.167", "0.15 ", "2.59 %", "", "", "", "", ""],
    ["3", "192.168.1.223", "192.168.1.106", "0.74 ", "12.76 %", "", "", "", "", ""],
    ["4", "192.168.1.153", "192.168.1.130", "0.96 ", "16.55 %", "", "", "", "", ""],
    ["5", "192.168.1.194", "192.168.1.204", "0.42 ", "7.24 %", "", "", "", "", ""],
    ["6", "192.168.1.154", "192.168.1.111", "0.78 ", "13.45 %", "", "", "", "", ""],
    ["7", "192.168.1.167", "192.168.1.138", "0.25 ", "4.31 %", "", "", "", "", ""],
    ["8", "192.168.1.106", "192.168.1.223", "0.14 ", "2.41 %", "", "", "", "", ""],
    ["9", "192.168.1.130", "192.168.1.153", "0.87 ", "15.00 %", "", "", "", "", ""],
    ["10", "192.168.1.204", "192.168.1.153", "0.69 ", "11.90 %", "", "", "", "", ""]
];
var address_data = [
    ["Pq_Server_3", "Subnet", "192.168.1.154/32", "1"],
    ["Pq_VPN3", "IP Range", "192.168.1.167 - 192.168.1.192", "2"],
    ["Pq_VPN1", "IP Range", "192.168.1.106 - 192.168.1.152", "3"],
    ["Pq_Server_2", "Subnet", "192.168.1.130/32", "1"],
    ["Google", "FQDN", "twitter.com", "3"],
    ["Pq_Server_4", "Subnet", "192.168.1.111/32", "1"],
    ["Facebook", "FQDN", "facebook.com", "3"],
    ["Pq_Server_5", "Subnet", "192.168.1.223/32", "2"],
    ["Pq_Server_1", "Subnet", "192.168.1.153/32", "2"],
    ["Pq_VPN2", "IP Range", "192.168.1.153 - 192.168.1.187", "1"]
];
var shaper_data = [
    ["Pq_HC", "255.2", "1.56", "Low", "1"],
    ["Pq_HA", "0.538", "2.47", "High", "2"],
    ["Pq_HSDS", "1.56", "29.65", "High", "3"],
    ["Pq_WDF", "1080.3", "6.57", "Medium", "1"],
    ["Pq_YHY", "2.47", "29.65", "Low", "3"],
    ["Pq_ADD", "0.006", "6.57", "Low", "1"],
    ["Pq_Embed", "35.2", "29.65", "High", "3"],
    ["Pq_Dropbox", "45.2", "1.56", "Medium", "2"],
    ["Pq_HEVC", "123", "2.47", "Medium", "2"],
    ["Pq_Wave", "78.635", "6.57", "Medium", "1"]
];
var schedule_data = [
    ["Pq_Holiday", "One Time", "2017-01-02 to 2017-01-03", "00:00:00", "23:59:59", "1"],
    ["Pq_Peak_Hours", "Weekly Recurring", "Monday, Tuesday, Wednesday, Thursday, Friday", "08:00:00", "23:59:59", "2"],
    ["Pq_Off_Peak", "Weekly Recurring", "Monday, Tuesday, Wednesday, Thursday, Friday", "00:00:00", "07:59:59", "3"],
    ["Pq_TD1", "One Time", "2017-03-15 to 2017-04-15", "08:00:00", "17:00:00", "1"],
    ["Pq_BDE", "One Time", "2016-10-15 to 2016-10-16", "18:00:00", "23:59:59", "3"],
    ["Pq_YJT", "Weekly Recurring", "Saturday, Sunday", "08:00:00", "23:59:59", "1"],
    ["Pq_WSA", "Weekly Recurring", "Friday", "12:00:00", "18:00:00", "3"],
    ["Pq_TD2", "Weekly Recurring", "Saturday, Sunday", "00:00:00", "07:59:59", "2"],
    ["Pq_Seasonal", "One Time", "2016-12-15 to 2016-12-16", "00:00:00", "23:59:59", "2"],
    ["Pq_FRR", "Weekly Recurring", "Friday", "21:00:00", "23:59:59", "1"]
];
var service_data = [
    ["Pq_HEVC", "TCP/200-500 UDP/25", "2"],
    ["Pq_HA", "UDP/25", "2"],
    ["Pq_HSDS", "UDP/25 UDP/1-6500 TCP/4000 TCP/200-500 TCP/30 TCP/1640 UDP/5-60 UDP/60", "3"],
    ["Pq_HC", "UDP/25 CP/200-500 TCP/4000", "1"],
    ["Pq_YHY", "TCP/4000", "3"],
    ["Pq_Dropbox", "TCP/200-500 TCP/4000", "2"],
    ["Pq_Embed", "UDP/1-6500 TCP/200 UDP/25", "3"],
    ["Pq_Wave", "TCP/200 UDP/25", "1"],
    ["Pq_ADD", "UDP/25 TCP/200-500 TCP/30 TCP/1640", "1"],
    ["Pq_WDF", "TCP/4000 UDP/1-6500 UDP/25", "1"]
];
var profile_data = [
    ["Administrator", "pq1@paraqum.com", "0.0.0.0", "", 1],
    ["User", "aaef@paraqum.com", "192.168.1.223", "", 2],
    ["User", "hththt@paraqum.com", "192.168.1.154", "", 3],
    ["Administrator", "sggsg@paraqum.com", "0.0.0.0", "", 4],
    ["User", "kgkuig@paraqum.com", "192.168.1.106", "", 5],
    ["Administrator", "pq1@paraqum.com", "0.0.0.0", "", 1],
    ["User", "aaef@paraqum.com", "192.168.1.223", "", 2],
    ["User", "hththt@paraqum.com", "192.168.1.154", "", 3],
    ["Administrator", "sggsg@paraqum.com", "0.0.0.0", "", 4],
    ["User", "kgkuig@paraqum.com", "192.168.1.106", "", 5],
    ["Administrator", "pq1@paraqum.com", "0.0.0.0", "", 1],
    ["User", "aaef@paraqum.com", "192.168.1.223", "", 2],
    ["User", "hththt@paraqum.com", "192.168.1.154", "", 3],
    ["Administrator", "sggsg@paraqum.com", "0.0.0.0", "", 4],
    ["User", "kgkuig@paraqum.com", "192.168.1.106", "", 5],
    ["Administrator", "pq1@paraqum.com", "0.0.0.0", "", 1],
    ["User", "aaef@paraqum.com", "192.168.1.223", "", 2],
    ["Administrator", "sggsg@paraqum.com", "0.0.0.0", "", 4],
    ["User", "kgkuig@paraqum.com", "192.168.1.106", "", 5]
];
var pie_test = [
    {
        "label": "Facebook",
        "value": 50,
        "color": "#961a1a"
    },
    {
        "label": "Youtube",
        "value": 49,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 48,
        "color": "#be00cc"
    },
    {
        "label": "Dropbox",
        "value": 47,
        "color": "#005064"
    },
    {
        "label": "Skype",
        "value": 46,
        "color": "#be66a2"
    },
    {
        "label": "Microsoft Update",
        "value": 45,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 44,
        "color": "#ffbf00"
    },
    {
        "label": "Facebook",
        "value": 43,
        "color": "#00d6e6"
    },
    {
        "label": "Youtube",
        "value": 42,
        "color": "#00ff00"
    },
    {
        "label": "Whatsapp",
        "value": 41,
        "color": "#440080"
    },
    {
        "label": "Dropbox",
        "value": 40,
        "color": "#005064"
    },
    {
        "label": "Skype",
        "value": 39,
        "color": "#be66a2"
    },
    {
        "label": "Microsoft Update",
        "value": 38,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 37,
        "color": "#ffbf00"
    },
    {
        "label": "Facebook",
        "value": 36,
        "color": "#961a1a"
    },
    {
        "label": "Youtube",
        "value": 35,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 34,
        "color": "#be00cc"
    },
    {
        "label": "Dropbox",
        "value": 33,
        "color": "#005064"
    },
    {
        "label": "Skype",
        "value": 32,
        "color": "#be66a2"
    },
    {
        "label": "Microsoft Update",
        "value": 31,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 30,
        "color": "#ffbf00"
    },
    {
        "label": "Facebook",
        "value": 29,
        "color": "#961a1a"
    },
    {
        "label": "Youtube",
        "value": 28,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 27,
        "color": "#be00cc"
    },
    {
        "label": "Dropbox",
        "value": 26,
        "color": "#005064"
    },
    {
        "label": "Skype",
        "value": 25,
        "color": "#be66a2"
    },
    {
        "label": "Microsoft Update",
        "value": 24,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 23,
        "color": "#ffbf00"
    },
    {
        "label": "Facebook",
        "value": 22,
        "color": "#961a1a"
    },
    {
        "label": "Youtube",
        "value": 21,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 20,
        "color": "#be00cc"
    },
    {
        "label": "Dropbox",
        "value": 19,
        "color": "#005064"
    },
    {
        "label": "Skype",
        "value": 18,
        "color": "#be66a2"
    },
    {
        "label": "Microsoft Update",
        "value": 17,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 16,
        "color": "#ffbf00"
    },
    {
        "label": "Youtube",
        "value": 15,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 14,
        "color": "#be00cc"
    },
    {
        "label": "Microsoft Update",
        "value": 13,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 12,
        "color": "#ffbf00"
    },
    {
        "label": "Facebook",
        "value": 11,
        "color": "#961a1a"
    },
    {
        "label": "Youtube",
        "value": 10,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 9,
        "color": "#be00cc"
    },
    {
        "label": "Dropbox",
        "value": 8,
        "color": "#005064"
    },
    {
        "label": "Skype",
        "value": 7,
        "color": "#be66a2"
    },
    {
        "label": "Microsoft Update",
        "value": 6,
        "color": "#65a620"
    },
    {
        "label": "Viber",
        "value": 5,
        "color": "#ffbf00"
    },
    {
        "label": "Youtube",
        "value": 4,
        "color": "#1f79a7"
    },
    {
        "label": "Whatsapp",
        "value": 3,
        "color": "#be00cc"
    },
    {
        "label": "Viber",
        "value": 2,
        "color": "#ffbf00"
    },
    {
        "label": "Netflix",
        "value": 1,
        "color": "#00d6e6"
    }];
var summary_table = [
    ["Facebook", "11.76 MB", "77.27 MB", "35.10 KB"],
    ["Youtube", "14.47 MB", "14.77 MB", "11.76 MB"],
    ["Dropbox", "8.83 MB", "8.83 MB", "77.27 MB"],
    ["Skype", "76.22 MB", "14.77 MB", "11.76 MB"],
    ["Gmail", "3.59 MB", "8.83 MB", "77.27 MB"],
    ["Whatsapp", "23.66 MB", "77.27 MB", "35.10 KB"],
    ["Facebook", "1.52 MB", "46.45 KB", "4.44 MB"],
    ["Google", "77.27 MB", "14.77 MB", "11.76 MB"],
    ["Viber", "14.77 MB", "46.45 KB", "4.44 MB"],
    ["LinkedIn", "4.44 MB", "14.77 MB", "11.76 MB"],
    ["Twitter", "19.93 KB", "157 B", "11.76 MB"],
    ["Viber", "46.45 KB", "46.45 KB", "4.44 MB"],
    ["Dropbox", "96.34 KB", "46.45 KB", "4.44 MB"],
    ["Twitter", "35.10 KB", "77.27 MB", "35.10 KB"],
    ["Gmail", "74 MB", "748 B", "62.97 B"],
    ["Facebook", "91.48 KB", "46.45 KB", "4.44 MB"],
    ["Viber", "62.46 KB", "8.83 MB", "77.27 MB"],
    ["Skype", "30.40 KB", "46.45 KB", "4.44 MB"],
    ["Twitter", "64.77 KB", "14.77 MB", "11.76 MB"],
    ["LinkedIn", "17.67 KB", "157 B", "11.76 MB"],
    ["LinkedIn", "24.88 KB", "46.45 KB", "4.44 MB"],
    ["Dropbox", "19.67 KB", "14.77 MB", "11.76 MB"],
    ["Whatsapp", "157 B", "46.45 KB", "4.44 MB"],
    ["Twitter", "62.97 B", "8.83 MB", "77.27 MB"],
    ["Gmail", "748 B", "748 B", "62.97 B"],
    ["Skype", "11.76 MB", "748 B", "62.97 B"],
    ["Whatsapp", "14.47 MB", "77.27 MB", "35.10 KB"],
    ["Youtube", "8.83 MB", "157 B", "11.76 MB"],
    ["Whatsapp", "76.22 MB", "14.77 MB", "11.76 MB"],
    ["Facebook", "3.59 MB", "8.83 MB", "77.27 MB"],
    ["Viber", "23.66 MB", "77.27 MB", "35.10 KB"],
    ["Skype", "1.52 MB", "46.45 KB", "4.44 MB"],
    ["Dropbox", "77.27 MB", "157 B", "11.76 MB"],
    ["LinkedIn", "14.77 MB", "14.77 MB", "11.76 MB"],
    ["Twitter", "4.44 MB", "77.27 MB", "35.10 KB"],
    ["Youtube", "19.93 KB", "46.45 KB", "4.44 MB"],
    ["Viber", "46.45 KB", "157 B", "11.76 MB"],
    ["Gmail", "96.34 KB", "14.77 MB", "11.76 MB"],
    ["Skype", "35.10 KB", "8.83 MB", "77.27 MB"],
    ["Facebook", "74 MB", "748 B", "62.97 B"],
    ["Whatsapp", "91.48 KB", "14.77 MB", "11.76 MB"],
    ["Dropbox", "62.46 KB", "77.27 MB", "35.10 KB"],
    ["LinkedIn", "30.40 KB", "46.45 KB", "4.44 MB"],
    ["Facebook", "64.77 KB", "8.83 MB", "77.27 MB"],
    ["Youtube", "17.67 KB", "14.77 MB", "11.76 MB"],
    ["Whatsapp", "24.88 KB", "8.83 MB", "77.27 MB"],
    ["Facebook", "19.67 KB", "77.27 MB", "35.10 KB"],
    ["Skype", "157 B", "14.77 MB", "11.76 MB"],
    ["Dropbox", "62.97 B", "14.77 MB", "11.76 MB"],
    ["Youtube", "748 B", "77.27 MB", "35.10 KB"]

];
var signature_dataSet = [
    ["3", "Netflix", "Recreational", "1", ""],
    ["4", "Pandora", "Recreational", "1", ""],
    ["7", "Hotmail", "Email", "1", ""],
    ["8", "Dropbox", "Professional", "1", ""],
    ["10", "Skype", "Professional", "1", ""]
];
var signature_dataBase = [
    ["1", "Facebook", "Social Media", "1"],
    ["2", "Youtube", "Recreational", "1"],
    ["3", "Netflix", "Recreational", "1"],
    ["4", "Pandora", "Recreational", "1"],
    ["5", "Google", "Search Engine", "1"],
    ["6", "Teamviewer", "Professional", "1"],
    ["7", "Hotmail", "Email", "1", "1"],
    ["8", "Dropbox", "Professional", "1"],
    ["9", "Viber", "Social Media", "1"],
    ["10", "Skype", "Professional", "1"],
    ["11", "Gmail", "Email", "1"],
    ["12", "MSN", "Search Engine", "1"],
    ["13", "LinkedIn", "Professional", "1"],
    ["14", "Yahoo", "Search Engine", "1"],
    ["15", "Cricinfo", "Recreational", "1"],
    ["16", "ScienceAlert", "Education", "1"],
    ["17", "Bing", "Search Engine", "1"],
    ["18", "TechCrunch", "Education", "1"],
    ["19", "Netscape", "Search Engine", "1"],
    ["20", "Canon Rumours", "Education", "1"],
    ["21", "Moodle", "Education", "1"]
];


var signature_dataSet_d =
        "3&Netflix&Recreational&0;4&Pandora&Recreational&0;7&Hotmail&Email&1;8&Dropbox&Professional&0;10&Skype&Professional&1;";

var signature_dataBase_d =
        "1&Facebook&Social Media&1;2&Youtube&Recreational&0;3&Netflix&Recreational&1;4&Pandora&Recreational&1;7&Hotmail&Email&1&0;8&Dropbox&Professional&1;9&Viber&Social Media&1;10&Skype&Professional&1;11&Gmail&Email&1;12&MSN&Search Engine&1;13&LinkedIn&Professional&0;14&Yahoo&Search Engine&1;15&Cricinfo&Recreational&1;16&ScienceAlert&Education&0;17&Bing&Search Engine&1;18&TechCrunch&Education&1;19&Netscape&Search Engine&0;20&Canon Rumours&Education&1;21&Moodle&Education&1;";




//var rule_data =[
//     {priority: "1", check_box:"", priority: "1", source: "192.168.1.111", destination: "192.168.1.154", app_control: "0.45 ", service: "7.76 %", action: "", stats: "", shapers: ""}, 
//     {priority: "2", check_box:"", priority: "2", source: "192.168.1.138", destination: "192.168.1.167", app_control: "0.15 ", service: "2.59 %", action: "", stats: "", shapers: ""}, 
//     {priority: "3", check_box:"", priority: "3", source: "192.168.1.223", destination: "192.168.1.106", app_control: "0.74 ", service: "12.76 %", action: "", stats: "", shapers: ""},  
//     {priority: "4", check_box:"", priority: "4", source: "192.168.1.153", destination: "192.168.1.130", app_control: "0.96 ", service: "16.55 %", action: "", stats: "", shapers: ""}, 
//     {priority: "5", check_box:"", priority: "5", source: "192.168.1.194", destination: "192.168.1.204", app_control: "0.42 ", service: "7.24 %", action: "", stats: "", shapers: ""}, 
//     {priority: "6", check_box:"", priority: "6", source: "192.168.1.154", destination: "192.168.1.111", app_control: "0.78 ", service: "13.45 %", action: "", stats: "", shapers: ""}, 
//     {priority: "7", check_box:"", priority: "7", source: "192.168.1.167", destination: "192.168.1.138", app_control: "0.25 ", service: "4.31 %", action: "", stats: "", shapers: ""},  
//     {priority: "8", check_box:"", priority: "8", source: "192.168.1.106", destination: "192.168.1.223", app_control: "0.14 ", service: "2.41 %", action: "", stats: "", shapers: ""}, 
//     {priority: "9", check_box:"", priority: "9", source: "192.168.1.130", destination: "192.168.1.153", app_control: "0.87 ", service: "15.00 %", action: "", stats: "", shapers: ""},  
//     {priority: "10", check_box:"", priority: "10", source: "192.168.1.204", destination: "192.168.1.153", app_control: "0.69 ", service: "11.90 %", action: "", stats: "", shapers: ""} 
//
//];


//var rule_data =[
//    [ "&&1&192.168.1.111&192.168.1.154&0.45 &7.76 %&&&"], 
//    [ "&&2&192.168.1.138&192.168.1.167&0.15 &2.59 %&&&"], 
//    [ "&&3&192.168.1.223&192.168.1.106&0.74 &12.76 %&&&"],  
//    [ "&&4&192.168.1.153&192.168.1.130&0.96 &16.55 %&&&"], 
//    [ "&&5&192.168.1.194&192.168.1.204&0.42 &7.24 %&&&"], 
//    [ "&&6&192.168.1.154&192.168.1.111&0.78 &13.45 %&&&"], 
//    [ "&&7&192.168.1.167&192.168.1.138&0.25 &4.31 %&&&"],  
//    [ "&&8&192.168.1.106&192.168.1.223&0.14 &2.41 %&&&"], 
//    [ "&&9&192.168.1.130&192.168.1.153&0.87 &15.00 %&&&"],  
//    [ "&&10&192.168.1.204&192.168.1.153&0.69 &11.90 %&&&"] 
//
//];

//var rule_data =[
//    [ "&1&192.168.1.111&192.168.1.154&0.45 &7.76 %&&&"], 
//    [ "&2&192.168.1.138&192.168.1.167&0.15 &2.59 %&&&"], 
//    [ "&3&192.168.1.223&192.168.1.106&0.74 &12.76 %&&&"],  
//    [ "&4&192.168.1.153&192.168.1.130&0.96 &16.55 %&&&"], 
//    [ "&5&192.168.1.194&192.168.1.204&0.42 &7.24 %&&&"], 
//    [ "&6&192.168.1.154&192.168.1.111&0.78 &13.45 %&&&"], 
//    [ "&7&192.168.1.167&192.168.1.138&0.25 &4.31 %&&&"],  
//    [ "&8&192.168.1.106&192.168.1.223&0.14 &2.41 %&&&"], 
//    [ "&9&192.168.1.130&192.168.1.153&0.87 &15.00 %&&&"],  
//    [ "&10&192.168.1.204&192.168.1.153&0.69 &11.90 %&&&"] 
//
//];

//var rule_data =[
//    [ "1&192.168.1.111&192.168.1.154&0.45 &7.76 %&&&"], 
//    [ "2&192.168.1.138&192.168.1.167&0.15 &2.59 %&&&"], 
//    [ "3&192.168.1.223&192.168.1.106&0.74 &12.76 %&&&"],  
//    [ "4&192.168.1.153&192.168.1.130&0.96 &16.55 %&&&"], 
//    [ "5&192.168.1.194&192.168.1.204&0.42 &7.24 %&&&"], 
//    [ "6&192.168.1.154&192.168.1.111&0.78 &13.45 %&&&"], 
//    [ "7&192.168.1.167&192.168.1.138&0.25 &4.31 %&&&"],  
//    [ "8&192.168.1.106&192.168.1.223&0.14 &2.41 %&&&"], 
//    [ "9&192.168.1.130&192.168.1.153&0.87 &15.00 %&&&"],  
//    [ "10&192.168.1.204&192.168.1.153&0.69 &11.90 %&&&"] 
//
//];