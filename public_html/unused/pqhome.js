/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var PQ = function () {
    var top_zidx = 10;
    var btm_zidx = -1;
    var visible_index = -1;

    var public_callback;
    var public_hide_callback;

    this.show_window = function (id) {

        if (id === visible_index)
            return;

        if (id === 1) {
//            update_application_list();
            Init_WO_Param();
            $("#Home").css("z-index", top_zidx);
        } else if (id === 2) {
            $("#Dashboard_Applications").css("z-index", top_zidx);
        } else if (id === 3) {
            $("#Dashboard_Sources").css("z-index", top_zidx);
        } else if (id === 4) {
            $("#Session_Sources").css("z-index", top_zidx);
        } else if (id === 5) {
            $("#Session_Destination").css("z-index", top_zidx);
        } else if (id === 6) {
            $("#Session_Sessions").css("z-index", top_zidx);
        } else if (id === 7) {
            $("#Session_Applications").css("z-index", top_zidx);
        } else if (id === 8) {
            $("#Status_Traffic").css("z-index", top_zidx);
        } else if (id === 9) {
            $("#Status_Notifications").css("z-index", top_zidx);
        } else if (id === 10) {
            init_rule_elements();
            Display_Rule_Table();
            $("#Rule_Addition").css("z-index", top_zidx);
        } else if (id === 11) {
            Display_Address_Table();
            $("#Object_Addresses").css("z-index", top_zidx);
        } else if (id === 12) {
            Display_Service_Table();
            $("#Service_Rule").css("z-index", top_zidx);
        } else if (id === 13) {
            Display_Schedule_Table();
            $("#Object_Schedules").css("z-index", top_zidx);
        } else if (id === 14) {
            Display_Admin_Pipe_Table();
            $("#Object_Pipes").css("z-index", top_zidx);
        } else if (id === 15) {
            $("#Rule_Monitor").css("z-index", top_zidx);
            Display_Rule_Monitor_Table();
        } else if (id === 16) {
            $("#Dashboard_Services").css("z-index", top_zidx);
        } else if (id === 17) {
            $("#C_History").css("z-index", top_zidx);
        } else if (id === 18) {
            $("#C_Usage").css("z-index", top_zidx);
        } else if (id === 19) {
            $("#Profile").css("z-index", top_zidx);
        } else if (id === 20) {
            $("#C_Shadow_Session_Watch").css("z-index", top_zidx);
        } else if (id === 21) {
            $("#C_Shadow_Server_Watch").css("z-index", top_zidx);
        } else if (id === 22) {
            $("#AppSignature").css("z-index", top_zidx);
        } else if (id === 23) {
            $("#Basic_Settings").css("z-index", top_zidx);
        } else if (id === 24) {
            Display_App_Ctrl_Prof_Table();
            $("#App_Rule").css("z-index", top_zidx);
        } else if (id === 25) {
            $("#New_App_Control").css("z-index", top_zidx);
        } else if (id === 26) {
            $("#Link_Utilization").css("z-index", top_zidx);

            init_dlink_utilization();
        } else if (id === 27) {
            $("#Session_Services").css("z-index", top_zidx);
        } else if (id === 28) {
            $("#Dashboard_Destinations").css("z-index", top_zidx);
        } else {
            Error("undefined window ID");
        }
        if (visible_index > 0)
            this.hide_window(visible_index);

        visible_index = id;
        if (public_callback) {
            public_callback(id);
        }

    };

    this.hide_window = function (id) {

        if (id === 1) {
            $("#Home").css("z-index", btm_zidx);
        } else if (id === 2) {
            $("#Dashboard_Applications").css("z-index", btm_zidx);
        } else if (id === 3) {
            $("#Dashboard_Sources").css("z-index", btm_zidx);
        } else if (id === 4) {
            $("#Session_Sources").css("z-index", btm_zidx);
        } else if (id === 5) {
            $("#Session_Destination").css("z-index", btm_zidx);
        } else if (id === 6) {
            $("#Session_Sessions").css("z-index", btm_zidx);
        } else if (id === 7) {
            $("#Session_Applications").css("z-index", btm_zidx);
        } else if (id === 8) {
            $("#Status_Traffic").css("z-index", btm_zidx);
        } else if (id === 9) {
            $("#Status_Notifications").css("z-index", btm_zidx);
        } else if (id === 10) {
            $("#Rule_Addition").css("z-index", btm_zidx);
        } else if (id === 11) {
            $("#Object_Addresses").css("z-index", btm_zidx);
        } else if (id === 12) {
            $("#Service_Rule").css("z-index", btm_zidx);
        } else if (id === 13) {
            $("#Object_Schedules").css("z-index", btm_zidx);
        } else if (id === 14) {
            $("#Object_Pipes").css("z-index", btm_zidx);
        } else if (id === 15) {
            $("#Rule_Monitor").css("z-index", btm_zidx);
        } else if (id === 16) {
            $("#Dashboard_Services").css("z-index", btm_zidx);
        } else if (id === 17) {
            $("#C_History").css("z-index", btm_zidx);
        } else if (id === 18) {
            $("#C_Usage").css("z-index", btm_zidx);
        } else if (id === 19) {
            $("#Profile").css("z-index", btm_zidx);
        } else if (id === 20) {
            $("#C_Shadow_Session_Watch").css("z-index", btm_zidx);
        } else if (id === 21) {
            $("#C_Shadow_Server_Watch").css("z-index", btm_zidx);
        } else if (id === 22) {
            $("#AppSignature").css("z-index", btm_zidx);
        } else if (id === 23) {
            $("#Basic_Settings").css("z-index", btm_zidx);
        } else if (id === 24) {
            $("#App_Rule").css("z-index", btm_zidx);
        } else if (id === 25) {
            $("#New_App_Control").css("z-index", btm_zidx);
        } else if (id === 26) {
            $("#Link_Utilization").css("z-index", btm_zidx);
        } else if (id === 27) {
            $("#Session_Services").css("z-index", btm_zidx);
        } else if (id === 28) {
            $("#Dashboard_Destinations").css("z-index", btm_zidx);
        } else {
            Error("undifined window ID");
        }
        if (public_hide_callback) {
            public_hide_callback(id);
        }
    };

    this.windowchange_callback = function (cbk) {
        public_callback = cbk;
    };

    this.windowhide_callback = function (cbk) {
        public_hide_callback = cbk;
    };
};

