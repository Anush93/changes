set_shaping_tooltips = function (table, column, cell_data, row_data) {
    var tooltip_text;
    switch (table) {
        case DEST_RULE_TABLE:
        case URL_RULE_TABLE:
        case APP_RULE_TABLE:
        case SERV_RULE_TABLE:
            tooltip_text = set_rule_table_tooltips(column, cell_data, row_data);
            break;
    }
console.log(tooltip_text)
    return tooltip_text;
};

function set_rule_table_tooltips(column, cell_data, row_data) {

    if (cell_data === 'None' || cell_data === '-') {
        return cell_data;
    } else {
        $("#tooltip_dt").css('width', '150px');
        switch (column) {
            case 3:
                var entry = schedule_list_tt[schedule_list.indexOf(cell_data)];
                var element = entry.split("&");

                var name = element[2];
                var type = Schedule_Type(element[3]);
                var s_t = moment(element[5] * 1000).format("hh:mm a");
                var e_t = moment(element[6] * 1000).format("hh:mm a");
                var active_d;

                if (Schedule_Type(element[3]) === "Weekly Recurring") {
                    active_d = decode_days_of_week(element[4]);
                } else
                    active_d = Schedule_One_Time_Days(element[5], element[6]);

                return "Name: " + name + "<br>Type: " + type + "<br>Active Days: " + active_d + "<br>Start Time: " + s_t + "<br>End Time: " + e_t;

            case 5:
            case 6:
            case 8:
            case 9:

                $("#tooltip_dt").css('width', '180px');
                return get_simple_shaping_tooltip(cell_data);
                break;
        }
    }
}

get_simple_shaping_tooltip = function (cell_data) {
    var u_entry = user_pipe_list_tt[user_pipe_list.indexOf(cell_data)];
    var u_element = u_entry.split("&");

    var admin_pipe_id = u_element[2];
    var ad_entry = admin_pipe_list_tt[admin_pipe_id];
    var ad_element = ad_entry.split("&");

    var name = u_element[3];
    var type = get_pipe_type(u_element[5], 0);
    var pipe_genration = get_pipe_type(u_element[5], 1);
    var g_bw = ad_element[2];
    var max_bw = ad_element[3];
    var priority = pipe_priority(ad_element[4]);
//console.log("Name: " + name + " Type: " + type + " Pipe Generation: " + pipe_genration + " Priority: " + priority + " Guaranteed Bandwidth: " + y_axis_bw_val_formatter(g_bw / 1000) + " Maximum Bandwidth: " + y_axis_bw_val_formatter(max_bw / 1000))
    return "Name: " + name + "<br>Type: " + type + "<br>Pipe Generation: " + pipe_genration + "<br>Priority: " + priority + "<br>Guaranteed Bandwidth: " + y_axis_bw_val_formatter(g_bw / 1000) + "<br>Maximum Bandwidth: " + y_axis_bw_val_formatter(max_bw / 1000);
};