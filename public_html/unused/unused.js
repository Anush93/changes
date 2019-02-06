pie_pq_sum_apps = new d3pie("pq_sum_app_hldr", {
    "tooltips": {
        "enabled": true,
        "type": "placeholder",
        "string": "{label}: {value}, {percentage}%",
        "placeholderParser": function (index, data) {
            data.value = pq_get_usage(data.value);
        },
        "styles": {
            "fadeInSpeed": 1000,
            "backgroundColor": "#0079dc",
            "backgroundOpacity": 1,
            "borderRadius": 5,
            "padding": 7
        }
    }
});

//        $('#App_Prof_App_List_Edit_Table_wrapper').css({'width': '250px','height': '200px','margin-left': '150px', 'margin-top': '-70px'});
//        $("#addedApp").empty();
//        app_ctrl_prof_list_edit_table.clear().draw();
//        for (var u_item in application_list) {
//            if (application_list[u_item] !== 'Other' && u_item !== 'undefined' && !(app_ctrl_app_ids.indexOf(u_item) > -1)) {
//                app_ctrl_prof_list_edit_table.row.add([u_item, application_list[u_item], 'cat']);
//            }
//        }

