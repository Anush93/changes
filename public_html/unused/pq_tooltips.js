set_shaping_tooltips = function (table, column, cell_data, row_data) {
    var tooltip_text;
    switch (table) {
        case RULE_TABLE:
            tooltip_text = set_rule_table_tooltips(column, cell_data, row_data);
            break;
        case PIPE_SCHEDULE_TABLE:
            tooltip_text = set_pipe_sched_table_tooltips(column, cell_data, row_data);
            break;
        case URL_PROF_TABLE:
            tooltip_text = set_url_serv_prof_table_tooltips(column, cell_data, row_data);
            break;
        case APP_PROF_TABLE:
            tooltip_text = set_app_prof_table_tooltips(column, cell_data, row_data);
            break;
        case SERV_PROF_TABLE:
            tooltip_text = set_url_serv_prof_table_tooltips(column, cell_data, row_data);
            break;          
    }

    return tooltip_text;
};

function set_rule_table_tooltips(column, cell_data, row_data) {

    if (cell_data === 'Any' || cell_data === 'None' || cell_data === '-') {
        return cell_data;
    } else {
        $("#tooltip_dt").css('width','150px');
        switch (column) {
            case 2:
            case 3:
                var entry = address_list_tt[address_list.indexOf(cell_data)];
                var element = entry.split("&");

                var name = element[1];
                var type = Address_Category_Type(element[2], element[4]);
                var value = Address_Val(element[2], element[3], element[4]);

                return "Name: " + name + "<br>Type: " + type + "<br>Address: " + value;

            case 4:
                var entry = schedule_list_tt[schedule_list.indexOf(cell_data)];
                var element = entry.split("&");

                var name = element[1];
                var type = Schedule_Type(element[2]);
                var s_t = moment(element[4] * 1000).format("hh:mm a");
                var e_t = moment(element[5] * 1000).format("hh:mm a");
                var active_d;

                if (Schedule_Type(element[2]) === "Weekly Recurring") {
                    active_d = decode_days_of_week(element[3]);
                } else
                    active_d = Schedule_One_Time_Days(element[4], element[5]);

                return "Name: " + name + "<br>Type: " + type + "<br>Active Days: " + active_d + "<br>Start Time: " + s_t + "<br>End Time: " + e_t;

            case 5:
//                URL;
                break;
            case 6:
//                APP;
                break;
            case 7:
//                Serv;
                break;
            case 10:
            case 11:
                
                $("#tooltip_dt").css('width','180px');

                var entry;
                var element;

                if (row_data[15] === '0') {
                    return get_simple_shaping_tooltip(cell_data);
                } else {
                    entry = pipe_schedule_list_tt[pipe_schedule_list.indexOf(cell_data)];
                    element = entry.split("&");

                    var name = element[1];
                    var sched = schedule_list[element[2]];

                    if (element[3] === '0') {
                        if (element[5] === '0') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Default Action: Allow";
                        } else if (element[5] === '4294967295') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Default Action: Block";
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Scheduled Downlink Pipe: -  <br>Scheduled Uplink Pipe: -"
                                    + "<br>Default Action: Shape <br>Default Downlink Pipe: - <br>Default Uplink Pipe: -";
                        } else
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Allow <br>Default Action: Shape <br>Default Downlink Pipe: "
                                    + pipe_list[element[5]] + " <br>Default Uplink Pipe: " + pipe_list[element[6]];
                    } else if (element[3] === '4294967295') {
                        if (element[5] === '0') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Action: Allow";
                        } else if (element[5] === '4294967295') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Action: Block";
                        } else
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Action: Shape <br>Default Downlink Pipe: "
                                    + pipe_list[element[5]] + " <br>Default Uplink Pipe: " + pipe_list[element[6]];
                    } else {
                        if (element[5] === '0') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Downlink Pipe:" + pipe_list[element[3]]
                                    + " <br>Default Uplink Pipe: " + pipe_list[element[4]] + "<br>Default Action: Allow";
                        } else if (element[5] === '4294967295') {
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Downlink Pipe:" + pipe_list[element[3]]
                                    + " <br>Default Uplink Pipe: " + pipe_list[element[4]] + " <br>Default Action: Block";
                        } else
                            return "Name: " + name + "<br>Schedule: " + sched + "<br>Scheduled Action: Block <br>Default Downlink Pipe:" + pipe_list[element[3]]
                                    + " <br>Default Uplink Pipe: " + pipe_list[element[4]] + " <br>Default Action: Shape <br>Default Downlink Pipe: "
                                    + pipe_list[element[5]] + " <br>Default Uplink Pipe: " + pipe_list[element[6]];
                    }
                }
        }
    }
}

function set_pipe_sched_table_tooltips(column, cell_data, row_data) {

    switch (column) {
        case 2:
            $("#tooltip_dt").css('width','300px');
            var entry = schedule_list_tt[schedule_list.indexOf(cell_data)];
            var element = entry.split("&");

            var name = element[1];
            var type = Schedule_Type(element[2]);
            var s_t = moment(element[4] * 1000).format("hh:mm a");
            var e_t = moment(element[5] * 1000).format("hh:mm a");
            var active_d;

            if (Schedule_Type(element[2]) === "Weekly Recurring") {
                active_d = decode_days_of_week(element[3]);
            } else
                active_d = Schedule_One_Time_Days(element[4], element[5]);

            return "<div>Name: " + name + "<br>Type: " + type + "<br>Active Days: " + active_d + "<br>Start Time: " + s_t + "<br>End Time: " + e_t+"</div>";

        case 4:
        case 5:
        case 7:
        case 8:
            $("#tooltip_dt").css('width','200px');
            return get_simple_shaping_tooltip(cell_data);
    }
}

function set_url_serv_prof_table_tooltips(column, cell_data, row_data) {

    switch (column) {
        case 6:
        case 7:
            return get_simple_shaping_tooltip(cell_data);
    }
}

function set_app_prof_table_tooltips(column, cell_data, row_data) {

    switch (column) {
        case 4:
        case 5:
            return get_simple_shaping_tooltip(cell_data);
    }
}

get_simple_shaping_tooltip = function (cell_data) {
    var entry = pipe_list_tt[pipe_list.indexOf(cell_data)];
    var element = entry.split("&");

    var name = element[1];
    var type = get_pipe_type(element[5], 0);
    var pipe_genration = get_pipe_type(element[5], 1);
    var g_bw = element[2];
    var max_bw = element[3];

    return "Name: " + name + "<br>Type: " + type + "<br>Pipe Generation: " + pipe_genration + "<br>Guaranteed Bandwidth: " + pq_get_usage(g_bw*1000) + "<br>Maximum Bandwidth: " + pq_get_usage(max_bw*1000);
};