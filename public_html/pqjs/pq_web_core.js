var home_html = "<div id='Home'><div class='System' style='height:calc(100% - 30px);'><div id='Pq_System' style='height:calc(100% - 35px);width:100%;background:white;'><div class='SystemStatsPanelHeader' style='border-radius:5px 5px 0 0'> <img class='pq_vcenter' src='image/uptime.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Uptime</div></div><div style='width:100%;height:4%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='pq_mw_uptime' style='font-size:11px;margin-left:30px'>12 day(s) 13 hour(s) 23 min(s)</div></div><div style='margin-top:2%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/statistics.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Session Statistics</div></div><div style='width:100%;height:4%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter panel-title' id='pq_mw_session_ps' style='font-size:11px;margin-left:30px;cursor:auto'>New Sessions Per-Second:0</div></div><div style='width:100%;height:4%;'><img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter panel-title' id='pq_mw_session_count' style='font-size:11px;margin-left:30px;cursor:auto'>Total Sessions:0</div></div> <div style='margin-top:4%' class='SystemStatsPanelHeader'><img class='pq_vcenter' src='image/alert.png' style='margin-left:10px;float:left'/><div class='pq_vcenter SystemStatsPanelHeaderText'> Events</div></div><div id='notific_area' style='width:100%;height:65%;overflow-y:auto;'></div> </div></div> <div class='Pq_LinkPlotHolder' style='height:calc(50% - 22px);position:relative;width:79%;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px)' >Downlink Bandwidth (10 s Average)</div> <div id='CHD_av_Plot' class='Pq_HPlot' style='width:97%;height:80%;padding:10px;position:absolute;z-index:100' ></div> </div> <div class='Pq_LinkPlotHolder' style='height:calc(50% - 22px);position:relative;width:79%;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px)'>Uplink Bandwidth (10 s Average)</div> <div id='CHU_av_Plot' class='Pq_HPlot' style='width:97%;height:80%;padding:10px;position:absolute;z-index:100' ></div> </div></div>";
var user_sum_html = "<div id='User_Summary'><div class='edit_panel' style='margin-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div class='Pq_LinkPlotHolder' style='height:calc(30% - 30px);margin-top:5px;position:relative;width:calc(100% - 40px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px)' >Downlink Bandwidth (10 s Average)</div> <div id='CHD_av_Plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> </div> <div class='Pq_LinkPlotHolder' style='height:calc(30% - 30px);position:relative;width:calc(100% - 40px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:calc(10% + 10px)'>Uplink Bandwidth (10 s Average)</div> <div id='CHU_av_Plot' class='Pq_HPlot' style='width:97%;height:75%;padding:10px;position:absolute;z-index:100' ></div> </div><div class='Pq_LinkPlotHolder' style='height:calc(40% - 25px);width:calc(100% - 220px);background:transparent;box-shadow:none;border:none;margin-top:10px;display:inline-block;'><div class='Pq_LinkPlotHolder' style='height:95%;width:calc(33% - 15px);margin-left:0px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Top Sources</div> <div id='pq_sum_src_hldr' style='float:left;padding:0;margin:0 auto;margin-top:5%;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:125px;height:80%;float:left;overflow-y:auto;margin-left:-10px;margin-top:10px'><div id='pq_sum_src_legend' style='width:100%'> </div></div> </div><div class='Pq_LinkPlotHolder' style='height:95%;width:calc(33% - 15px);margin-left:11px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Top Destinations</div> <div id='pq_sum_dest_hldr' style='float:left;padding:0;margin:0 auto;margin-top:5%;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:125px;height:80%;float:left;overflow-y:auto;margin-left:-10px;margin-top:10px'><div id='pq_sum_dest_legend' style='width:100%'> </div></div> </div><div class='Pq_LinkPlotHolder' style='height:95%;width:calc(33% - 15px);margin-left:11px;display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Top Applications</div> <div id='pq_sum_app_hldr' style='float:left;padding:0;margin:0 auto;margin-top:5%;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:125px;height:80%;float:left;overflow-y:auto;margin-left:-10px;margin-top:10px'><div id='pq_sum_app_legend' style='width:100%'> </div></div> </div> </div> <div class='Pq_LinkPlotHolder' style='height:calc(40% - 25px);margin-left:0px;width:185px;background:transparent;box-shadow:none;border:none;margin-top:10px;display:inline-grid;'><div class='Pq_LinkPlotHolder' style='height:95%;width:177px;margin-left:0px;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='padding-top:7px;height:calc(10% + 10px);'>Session Stats</div> <label id='pq_mw_session_count' style='font-family:Segoe UI REGULAR;font-size:15px;color:gray;display:flow-root;letter-spacing:5px;text-align:center;padding-top:50%;'><span style='color:#353434'></span><br><br>Total<br>Sessions</label></div></div> </div>";
var dash_sdas_html = "<div id='Dashboard_Sources'><div class='Pq_BWHolder'> <div class='edit_panel' style='margin-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div class='Pq_BWPlotHolder' style='height:calc(50% - 30px);width:calc(50% - 30px);display:inline-block;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='dashPie_src_dlink_header' style='font-size:14px;height:2em'></div> <div class='PieChartContentHolder' style='height:calc(100% - 50px);width:calc(100% - 30px)'> <div id='dashPie_src_dlink' class='PieChartHolder' style='height:calc(100% - 40px);width:calc(50% - 20px);margin-top:30px'></div> <div class='PieChartDetailHolder' id='dashPie_pie_dlink_table_holder' style='height:calc(100% - 30px)'> <table id='dashPie_pie_dlink_table' class='display cell-border AppUserTablesFont' style='height:100%;overflow:scroll'></table> <a style='font-size:10px;text-decoration:none;color:gray'>* % on piechart is based only on top ten elements, while % on table is based on total downlink traffic</a></div> </div> </div> <div class='Pq_BWPlotHolder' style='height:calc(50% - 30px);width:calc(50% - 30px);display:inline-block;margin-left:20px;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='dashPie_src_ulink_header' style='font-size:14px;height:2em'></div> <div class='PieChartContentHolder' style='height:calc(100% - 50px);width:calc(100% - 30px)'> <div id='dashPie_src_ulink' class='PieChartHolder' style='height:calc(100% - 40px);width:calc(50% - 20px);margin-top:30px'></div> <div class='PieChartDetailHolder' id='dashPie_pie_ulink_table_holder' style='height:calc(100% - 30px)'> <table id='dashPie_pie_ulink_table' class='display cell-border AppUserTablesFont' style='height:100%;overflow:scroll'></table> <a style='font-size:10px;text-decoration:none;color:gray'>* % on piechart is based only on top ten elements, while % on table is based on total uplink traffic</a></div> </div> </div> <div class='Pq_BWPlotHolder' style='height:calc(50% - 40px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='dashPie_bw_plot' style='font-size:14px;height:2em'></div> <div style='width:100%;height:28px;background-color:#222'><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a style='float:left;font-size:12px;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'></a><a id ='pq_dashPie_srcdesapp_ulink_pkts' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Packets Sent:0 </a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> <a id ='pq_dashPie_srcdesapp_ulink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Sent:0 MB</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id ='pq_dashPie_srcdesapp_dlink_pkts' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Packets Received:0 </a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> <a id ='pq_dashPie_srcdesapp_dlink_usage' style='font-size:11px;float:right;margin-right:100px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Received:0 MB</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> </div><div style='width:100%;height:calc(100% - 75px);background-color:whitesmoke;position:relative'><div id='plot_dashPie_srcdesapp_updown' style='width:calc(100%);height:100%;background-color:whitesmoke;position:absolute;z-index:100'></div></div> </div> </div> </div>";
var link_util_app_html = "<div id='Link_Utilization'> <div style='width:100%;height:40px;background-color:#222'><label class='drop_down_label_reporting' style='color:#fff;margin-left:20px'> Link :</label> <div class='btn-group' style='margin-left:2px;margin-top:2px'><button type='button' id='app_bwm_dlink_btn' onclick='btn_link_util_bw_load_now(1)' class='btn btn-primary btn-xs'>Downlink</button><button type='button' id='app_bwm_ulink_btn' onclick='btn_link_util_bw_load_now(2)' class='btn btn-primary btn-xs'>Uplink</button></div> </div><div class='edit_panel' style='margin-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div class='Pq_LinkPlotHolder' style='z-index:100;height:calc(100% - 110px);width:97%;position:absolute;margin-top:10px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='bwm_prof_plot_title' style='height:30px;font-size:16px;'></div> <div class='System' id='pq_dlink_util_plot_System' style='width:250px;height:calc(100% - 60px);'><div style='height:calc(100% - 10px);width:100%;'> <div style='border-radius:5px 5px 0 0;height:30px' class='SystemStatsPanelHeader' ><div class='pq_vcenter SystemStatsPanelHeaderText' style='font-size:14px;margin-left:calc(50% - 54px);'>Application List</div> </div><div class='util'><ul class='nav nav-tabs'><li class='active' ><a data-toggle='tab' id='app_bwm_profile_tab' onclick='load_app_bwm_prof_table()' href='#profile_content' style='padding:5px;font-size:12px;'>Profiles</a></li><li ><a id='app_bwm_all_tab' data-toggle='tab' onclick='load_app_bwm_all_table()' href='#app_util_dlink_all' style='padding:5px;font-size:12px;'>All Applications</a></li></ul></div><div class='tab-content' style='width:100%;height:calc(100% - 60px);overflow-y:auto'><div class='all tab-pane' id='app_util_dlink_all'><!-- <input id='stacked_mode_app_util_dlink' type='checkbox' value='1' style='margin-left:15px;margin-top:15px;'><label class='timeSelectorText' style='color:#000;margin-left:3px;' for='stacked_mode_app_util_dlink'>Stacked Mode</label> <input id='select_all_app_util' type='checkbox' value='2' style='margin-left:10px;margin-top:15px' ><label class='timeSelectorText' style='color:#000;margin-left:3px;' for='select_all_app_util' >Select All</label> --><table id='App_Dlink_Util_table' class='display cell-border AppUserTablesFont ' cellspacing='0' width='100%' ></table></div><div class='profile tab-pane active' id='profile_content' ><button id='addProfilebuttonId' class='createprofile setPrimary' onclick='init_app_bwm_profile_add()'>Create Profile</button><div id='addProfileId' style='display:none;margin-top:10px;'><input type='text' id='profile_input' style='padding-left:5px;margin-left:10px;font-size:11px;font-family:Helvetica;width:calc(100% - 20px)' name='profile' placeholder='Enter New Profile Name' required><br> <button type='button' onclick='add_app_bwm_profile()' style='background:#33469c;border-radius:5px;color:white;height:25px;margin-top:5px;font-size:11px;padding-top:3px;width:60px;margin-left:calc(50% - 63px);' >Create</button><button type='button' onclick='cancelProfile()' style='background:#d65959;border-radius:5px;color:white;height:25px;margin-top:5px;font-size:11px;padding-top:3px;width:60px;'>Cancel</button></div><div id='profile_button_grp' class='btn-group profile_button_grp' style='margin-top:10px;'><div id='sub_profile_button_grp' class='sub_profile_button_grp'></div></div></div></div> </div> </div> <div class='Pq_LinkPlotHolder' id='pq_dlink_util_plot' style='height:calc(100% - 60px);width:calc(100% - 300px);position:absolute;'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText ' style='font-size:14px;height:30px'>Application Bandwidth (10 s Average)</div> <div id='AppBwm_Ntwrk_Dlink_Plot' class='Pq_HPlot' style='width:calc(100% - 5px);height:calc(100% - 45px);padding:5px;z-index:100;position:absolute;'></div><div id='AppBwm_Ntwrk_Ulink_Plot' class='Pq_HPlot' style='width:calc(100% - 5px);height:calc(100% - 45px);padding:5px;z-index:-10;position:absolute;'></div> </div> </div><div id='Add_App_BWM_Prof_Window' class='modal'><div class='modal-content' style=' height:400px;'><span id='CloseAddApplication' class='close'>×</span><label class='modalTitle' style=' margin-left:50px'> Add Applications to Profile </label><br><div id='applist'><input type='text' id='app_search_input' style='margin-top:10px;margin-bottom:10px;font-size:11px;padding:2px;' onkeyup='appsearch()' placeholder='Search Applications..' title='Type in a name'><ul id='app_list_ul' style='height:275px;list-style:none;margin-left:-40px;overflow-y:auto'></ul></div></div></div></div>";
var ses_sessions_html = "<div id='Session_Sessions'> <div class='pq_session_filter_bar' id='pq_ses_win_filter'></div><div class='edit_panel' style='padding-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div id='Session_Sessions_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 105px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Session Table</div> <div id='session_table_holder' style='position:absolute;width:100%;padding:20px;height:calc(100% - 30px);' ><table id='Session_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Source IP</th><th>User</th><th>Destination IP</th><th>Source Port</th><th>Destination Port</th><th>Protocol</th><th>VLAN ID</th> <th>Application</th><th onclick='pq_table_sort_ses_data()' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data (Sent/Received)</th><th>Data Received</th><th>Watch</th> </tr></thead> </table> </div> </div> </div> ";
var shadow_session_watch_html = "<div id='C_Shadow_Session_Watch'><div id='pq_lses_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#005d00'><button class='pq_url_wbtn' style='float:left;display:inline-block;width:130px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;' onclick='pq_go_back_all_session_clicked()'>Back to Sessions</button> <img src='image/server_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_sip_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Client IP:192.168.1.121</a><img src='image/port.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_sport_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Destination Port:80</a><img src='image/client_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_dip_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Server IP:192.168.1.121</a><img src='image/port.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_dport_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Source Port:5134</a><img src='image/application_large.png' style='float:left;margin:10px 5px 10px 20px;width:20px;height:20px;'/><a id ='pq_ls_app_text' style='color:white;float:left;text-decoration:none;font-size:11px' class='pq_bwevent_vcenter'> Application:Unknown</a></div><div style='width:100%;height:2px;background-color:lightblue'></div><div style='width:100%;height:calc(100% - 45px);background:#fff;position:absolute;'> <div class='Pq_TableHolder' style='height:calc(50% - 20px);width:calc(100% - 35px);display:inline-block;'><div id='plot_live_session_downlink_header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Session Downlink Bandwidth (10 s Average)</div> <div style='width:100%;height:30px;background-color:#222'><img src='image/down_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a id='pq_ls_downlink_pkt' style='float:right;width:220px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Packets:0 </a><div style='width:20px;height:20px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id='pq_ls_downlink_usage' style='float:right;width:220px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Data Received:0 MB</a><div style='width:20px;height:20px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div></div><div style='width:100%;height:calc(100% - 70px);'><div id='plot_live_session_downlink' style='width:calc(100% - 35px);height:calc(50% - 90px);background-color:whitesmoke;position:absolute;z-index:100'></div></div></div><div class='Pq_TableHolder' style='height:calc(50% - 20px);width:calc(100% - 35px);display:inline-block;'><div id='plot_live_session_uplink_header' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Session Uplink Bandwidth (10 s Average)</div> <div style='width:100%;height:30px;background-color:#222'><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a id='pq_ls_uplink_pkt' style='float:right;width:220px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Packets:0 </a><div style='width:20px;height:20px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id='pq_ls_uplink_usage' style='float:right;width:220px;color:whitesmoke;text-decoration:none;font-size:12px' class='pq_bwevent_vcenter'>Data Sent:0 MB</a><div style='width:20px;height:20px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div></div><div style='width:100%;height:calc(100% - 70px);'><div id='plot_live_session_uplink' style='width:calc(100% - 35px);height:calc(50% - 90px);background-color:whitesmoke;position:absolute;z-index:100'></div></div></div></div> </div>";
var ses_sources_html = "<div id='Session_Sources'> <div class='pq_session_filter_bar' id='pq_src_win_filter'></div> <div class='edit_panel' style='padding-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div id='Session_Sources_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 105px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Source Table</div> <div id='source_table_holder' style='position:absolute;width:100%;padding:20px' ><table id='Source_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>IP Address</th><th>User</th> <th onclick='pq_table_sort_ses(0)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Data Sent</th><th>Data Received</th><th onclick='pq_table_sort_data(0)' style='cursor:pointer'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data (Sent/Received)</th><th>Watch</th> </tr></thead></table> </div> </div> </div> ";
var shadow_server_watch_html = "<div id='C_Shadow_Server_Watch'><div id='pq_lscw_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#222222'><button id='shdw_serv_home_back_btn' class='pq_url_wbtn' style='float:left;display:inline-block;width:110px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;'>Back to Home</button> <img class='pq_vcenter' src='image/client_large.png' style='width:20px;height:20px;float:left;margin-right:5px;margin-left:40px;display:inline-block'/><a id='pq_lscw_sip_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px' class='pq_bwevent_vcenter'> Source IP:192.168.1.121</a><img class='pq_vcenter' src='image/sessions.png' style='width:20px;height:20px;float:left ;margin-right:10px;margin-left:20px;display:inline-block'/><a id='pq_lscw_ses_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px' class='pq_bwevent_vcenter'> Sessions:83</a></div><div style='height:40%;width:100%;background:transparent;box-shadow:none;border:none'> <div class='Pq_TableHolder' style='height:100%;width:72%;display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Bandwidth Usage (10 s Average)</div> <div style='width:100%;height:28px;background-color:#222'><img src='image/up_ch.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><a style='float:left;font-size:12px;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'></a><a id ='pq_lsd_uplink_pkts' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Packets Sent :0</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> <a id ='pq_lsd_uplink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Sent :0 MB</a><div style='width:15px;height:15px;background-color:#a8334d;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div><a id ='pq_lsd_downlink_pkts' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Packets Received:0</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> <a id ='pq_lsd_downlink_usage' style='font-size:11px;float:right;margin-right:30px;color:whitesmoke;text-decoration:none;' class='pq_bwevent_vcenter'>Data Received:0 MB</a><div style='width:15px;height:15px;background-color:green;float:right;margin-right:20px' class='pq_bwevent_vcenter'> </div> </div><div style='width:100%;height:calc(100% - 75px);background-color:whitesmoke;position:relative'><div id='plot_live_sources_updown' style='width:calc(100%);height:100%;background-color:whitesmoke;position:absolute;z-index:100'></div></div></div><div class='Pq_TableHolder' style='height:100%;width:23%;display:inline-block;margin-top:0px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Live Usage</div> <!--<div style='width:2px;height:28px;background-color:#D5E4F3;float:left'></div>--><div style='width:calc(100%);height:28px;background-color:#222;'><div class='btn-group pq_vcenter' style=' float:right;margin-right:20px'><button id ='btn_lw_bt_one' type='button' onclick='btn_sc_sum_load_now(1)' class='btn btn-primary btn-xs' style='margin-top:2px;height:20px'>Applications</button><button id ='btn_lw_bt_two' type='button' onclick='btn_sc_sum_load_now(2)' class='btn btn-primary btn-xs' style='margin-top:2px;height:20px'>Destinations</button><button id ='btn_lw_bt_three' type='button' onclick='btn_sc_sum_load_now(3)' class='btn btn-primary btn-xs' style='margin-top:2px;height:20px'>Services</button></div><img src='image/applications.png' style='float:left;margin-left:10px;' class='pq_bwevent_vcenter'/><a style='float:left;font-size:12px;color:#D5E4F3;text-decoration:none;' class='pq_bwevent_vcenter'></a> </div><div id='pq_live_usage_pie_hlder' style='float:left;padding:0;margin:0 ;display:block;text-align:center;height:70%;width:60%;overflow:visible'></div><div style='width:40%;height:calc(100% - 80px);float:left;overflow-y:auto;margin-top:10px;'><div id='pq_live_usage_legend' style='width:100%;top:0px;position:relative;'></div></div></div></div><div class='Pq_TableHolder' style='height:calc(55% - 60px);margin-top:35px '><div id='tc_diag_type' class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Source Diagram</div> <div style='width:100%;height:35px;background-color:#222'><img src='image/sd_diagram.png' style='float:left;margin-right:15px;margin-left:10px' class='pq_bwevent_vcenter'/><div style='width:40px;height:100%;float:right'></div><div class='btn-group pq_vcenter' style=' float:right;'><button id='shadow_serv_traffic' type='button' onclick='btn_sc_load_now(1)' class='btn btn-primary btn-xs'>Traffic</button><button type='button' onclick='btn_sc_load_now(2)' class='btn btn-primary btn-xs'>Sessions</button></div></div><div id='plot_live_sources_diagram_holder' style='font-size:10px;overflow-y:scroll;width:100%;height:calc(100% - 80px);background-color:whitesmoke'><div id='plot_live_sources_diagram' style='width:98%;background-color:whitesmoke;float:left;padding:0;margin:10px ;display:block;min-height:500px'></div></div></div>";
var shadow_url_watch_html = "<div id='C_Shadow_URL_Watch'><div id='pq_lscw_stat_bar' style='font-size:11px;width:100%;height:40px;background-color:#222222'><button id='lv_session_watch_status_bar_back_btn' class='pq_url_wbtn' onclick='pq_go_back_sources()' style='float:left;display:inline-block;width:130px;height:30px;font-size:11px;margin-left:5px;background:#00bcd4 url(../image/back_act.png) 5px no-repeat;text-indent:25px;'>Back to Sources</button> <button id='lurl_watch_stop' class='pq_url_wbtn' style='float:left;display:block;padding-left:25px;margin-top:8px;width:80px;height:25px;font-size:11px;margin-left:15px;background:#e29030 url(../image/pause.png) 5px no-repeat;' onclick=''>Pause</button><button id='lurl_watch_start' class='pq_url_wbtn' style='float:left;display:none;padding-left:25px;margin-top:8px;width:80px;height:25px;font-size:11px;margin-left:15px;background:#21b955 url(../image/play.png) 5px no-repeat;' onclick=''>Restart</button><img class='pq_vcenter' src='image/client_large.png' style='width:20px;height:20px;float:left ;margin-right:10px;margin-left:20px;display:inline-block'/><a id='pq_lurlw_sip_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px' class='pq_bwevent_vcenter'> Source IP:</a> <img class='pq_vcenter' src='image/active.png' style='width:20px;height:20px;float:left ;margin-right:10px;margin-left:20px;display:inline-block'/><a id='pq_lurlw_status_text' style='color:white;float:left;text-decoration:none;display:inline-block;padding:10px 0px;margin-right:10px;' class='pq_bwevent_vcenter'> Status:Active </a></div> <div id = 'pq_lurlw_status_ind' style='width:100%;height:4px;background-color:#47d147'></div><div class='Pq_TableHolder' style='height:35%;width:97%;display:inline-block;margin-top:15px;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px'>Request Monitor</div> <div id='plot_live_url_stat' style='width:100%;height:calc(100% - 70px);background-color:whitesmoke;margin-top:20px'></div></div> <div class='Pq_TableHolder' style='height:calc(60% - 70px);width:31%;display:inline-block;margin-top:25px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px;padding-top:1.4%'><div style='width:15px;background-color:#ac2925;height:15px;float:left;margin-left:25px;margin-top:3px;'></div> HTTP Requests</div> <div style='width:95%;height:calc(100% - 55px);float:left;margin-top:10px;margin-left:10px;overflow:auto;'><div style='width:100%;height:20px'><div style='width:100%;height:100%;float:left;padding-left:4px;'><div style='background-color:#006666;float:left;min-width:120px;width:40%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>URL</a></div><div style='background-color:#006666;float:left;min-width:108px;width:30%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>IP</a></div><div style='background-color:#006666;float:left;min-width:68px;width:23%;'><a style='margin-left:40%;text-decoration:none;color:whitesmoke;font-size:12px;'>Client</a></div></div></div><div style='width:100%;height:calc(80% - 10px);min-width:330px;'> <div style='width:100%;height:2px'></div><div id='htpu-list' style='width:100%;height:100%;'><ul class='list' style='width:100%;height:100%;margin:0px;padding:0px;padding-left:4px;'><li style='background-color:#000\9;list-style:none;padding:0px;margin:0px'><div style='background-color:#09547c;float:left;min-width:120px;width:40%;overflow:hidden;margin-bottom:2px;margin-right:2px'><a class='wurl' style='white-space:nowrap;text-decoration:none;font-size:10px;color:whitesmoke;padding-left:5px'></a></div><div style='background-color:#cccccc;float:left;min-width:108px;width:30%;margin-bottom:2px;margin-right:2px'><a class='wuip' style='text-decoration:none;font-size:10px;padding-left:5px'></a></div><div style='background-color:#122b40;float:left;min-width:68px;width:23%;margin-bottom:2px'><a class='wuport' style='text-decoration:none;color:whitesmoke;font-size:10px;padding-left:5px'></a></div></li></ul></div></div></div></div> <div class='Pq_TableHolder' style='height:calc(60% - 70px);width:31%;display:inline-block;margin-top:25px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px;padding-top:1.4%'><div style='width:15px;background-color:#009688;height:15px;float:left;margin-left:25px;margin-top:3px;'></div> HTTPS Client Requests</div> <div style='width:95%;height:calc(100% - 55px);float:left;margin-top:10px;margin-left:10px;overflow:auto;'><div style='width:100%;height:20px'><div style='width:100%;height:100%;float:left;padding-left:4px;'><div style='background-color:#006666;float:left;min-width:120px;width:40%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>URL</a></div><div style='background-color:#006666;float:left;min-width:108px;width:30%;margin-right:2px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>IP</a></div><div style='background-color:#006666;float:left;min-width:68px;width:23%;'><a style='margin-left:40%;text-decoration:none;color:whitesmoke;font-size:12px;'>Client</a></div></div></div><div style='width:100%;height:calc(80% - 10px);min-width:330px'><div style='width:100%;height:2px'></div><div id='htpsu-list' style='width:100%;height:100%;'><ul class='list' style='width:100%;height:100%;margin:0px;padding:0px;padding-left:4px;'><li style='background-color:#000\9;list-style:none;padding:0px;margin:0px'><div style='background-color:#09547c;float:left;min-width:120px;width:40%;overflow:hidden;margin-bottom:2px;margin-right:2px'><a class='wurl' style='white-space:nowrap;text-decoration:none;font-size:10px;color:whitesmoke;padding-left:5px'></a></div><div style='background-color:#cccccc;float:left;min-width:108px;width:30%;margin-bottom:2px;margin-right:2px'><a class='wuip' style='text-decoration:none;font-size:10px;padding-left:5px'></a></div><div style='background-color:#122b40;float:left;min-width:68px;width:23%;margin-bottom:2px'><a class='wuport' style='text-decoration:none;color:whitesmoke;font-size:10px;padding-left:5px'></a></div></li></ul></div></div></div></div> <div class='Pq_TableHolder' style='height:calc(60% - 70px);width:31%;display:inline-block;margin-top:25px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' style='height:35px;font-size:14px;padding-top:1.4%'><div style='width:15px;background-color:#0066cc;height:15px;float:left;margin-left:25px;margin-top:3px;'></div> DNS Response</div> <div style='width:95%;height:calc(100% - 55px);float:left;margin-top:10px;margin-left:10px;overflow:auto;'><div style='width:100%;height:20px'><div style='width:100%;height:100%;float:left;padding-left:4px;'><div style='background-color:#006666;float:left;min-width:120px;width:40%;margin-right:1px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>URL</a></div><div style='background-color:#006666;float:left;min-width:108px;width:30%;margin-right:1px'><a style='margin-left:45%;text-decoration:none;font-size:12px;color:whitesmoke;'>IP</a></div><div style='background-color:#006666;float:left;min-width:68px;width:25%;'><a style='margin-left:25%;text-decoration:none;color:whitesmoke;font-size:12px;'>Server IP</a></div></div></div><div style='width:100%;height:calc(80% - 10px);min-width:330px'><div style='width:100%;height:2px'></div><div id='dns-list' style='width:100%;height:100%;'><ul class='list' style='width:100%;height:100%;margin:0px;padding:0px;padding-left:4px;'><li style='background-color:#000\9;list-style:none;padding:0px;margin:0px'><div style='background-color:#09547c;float:left;min-width:120px;width:40%;overflow:hidden;margin-bottom:2px;margin-right:1px'><a class='wurl' style='white-space:nowrap;text-decoration:none;font-size:10px;color:whitesmoke;padding-left:5px'></a></div><div style='background-color:#cccccc;float:left;min-width:108px;width:30%;margin-bottom:2px;margin-right:1px'><a class='wuip' style='text-decoration:none;font-size:10px;padding-left:5px'></a></div><div style='background-color:#122b40;float:left;min-width:68px;width:25%;margin-bottom:2px'><a class='wuport' style='text-decoration:none;color:whitesmoke;font-size:10px;padding-left:5px'></a></div></li></ul></div></div></div></div> </div>";
var ses_dest_html = "<div id='Session_Destination'> <div class='pq_session_filter_bar' id='pq_dest_win_filter'></div><div class='edit_panel' style='padding-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div id='Session_Destination_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 105px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Destination Table</div> <div id='destination_table_holder' style='position:absolute;width:100%;padding:20px' ><table id='Destination_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Destination</th><th>URL</th><th onclick='pq_table_sort_ses(1)' class='' style='cursor:pointer;text-align:center'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Bytes Sent</th><th>Bytes Received</th><th onclick='pq_table_sort_data(1)' class='' style='cursor:pointer;text-align:center'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data</th> <th>Watch</th> </tr></thead></table> </div> </div> </div> ";
var ses_app_html = "<div id='Session_Applications'> <div class='pq_session_filter_bar' id='pq_app_win_filter'></div><div class='edit_panel' style='padding-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div id='Session_Applications_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 105px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Application Table</div> <div id='app_table_holder' style='position:absolute;width:100%;padding:20px' ><table id='Application_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Application</th><!--<th>Category</th>--> <th onclick='pq_table_sort_ses(2)' class='' style='cursor:pointer;text-align:center'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Bytes Sent</th><th>Bytes Received</th><th onclick='pq_table_sort_data(2)' class='' style='cursor:pointer;text-align:center'><img style='margin-top:-10px;cursor:pointer;' src='image/sort_desc.png'/>Data</th><th>Watch</th> </tr></thead> </table> </div> </div> </div> ";
var ses_serv_html = "<div id='Session_Services'> <div class='pq_session_filter_bar' id='pq_service_win_filter'></div><div class='edit_panel' style='padding-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div id='Session_Services_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 105px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Service Table</div> <div id='service_table_holder' style='position:absolute;width:100%;padding:20px' ><table id='Ses_Service_Table' class='display cell-border StatusTablesFont' cellspacing='0' width='100%'><thead><tr> <th>Services</th> <th onclick='pq_table_sort_ses(3)' class='' style='cursor:pointer;text-align:center'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Sessions</th><th>Bytes Sent</th><th>Bytes Received</th><th onclick='pq_table_sort_data(3)' class='' style='cursor:pointer;text-align:center'><img style='margin-top:-10px;cursor:pointer' src='image/sort_desc.png'/>Data</th><th>Watch</th> </tr></thead> </table> </div> </div> </div> ";
var traffic_diag_html = "<div id='Status_Traffic'><div class='pq_tc_diagram_filter_bar'></div><div class='edit_panel' style='padding-top:10px;'><button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;margin-right:15px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <div class='Pq_TableHolder' style='height:calc(100% - 110px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Traffic Diagram</div> <div class='PieChartContentHolder' style='height:calc(100% - 60px);width:49%;margin-top:20px'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText ' style='height:5%;font-size:14px;'> Downlink Traffic </div> <div style='height:5%;font-weight:bold;padding-left:5%;padding-top:10px;display:inline-block'> Sources </div> <div style='height:5%;font-weight:bold;margin-left:65%;padding-top:10px;display:inline-block '> Destinations </div> <div id='diagram_tc_in' style='height:calc(90% - 10px);overflow-y:scroll;font-family:Arial;font-size:11px;'></div> </div> <div class='PieChartContentHolder' style='height:calc(100% - 60px);width:48%;margin-left:10px;margin-top:20px'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText ' style='height:5%;font-size:14px;'> Uplink Traffic </div> <div style='height:5%;font-weight:bold;padding-left:5%;padding-top:10px;display:inline-block'> Sources </div> <div style='height:5%;font-weight:bold;margin-left:65%;padding-top:10px;display:inline-block '> Destinations </div> <div id='diagram_tc_out' style='height:calc(90% - 10px);overflow-y:scroll;font-family:Arial;font-size:11px;'></div> </div> </div> </div> ";
var rule_dest_html = "<div id='App_Rule'> <div id='Dest_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Destination Rules</div> <div id='app_rule_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button id='addDestRule' onclick = 'Create(1)' class='create setPrimary'>Add Destination</button> <button disabled id='editDestRule' onclick = 'Edit(1)' class='edit'>Edit Destination</button> <button disabled id='deleteDestRule' onclick = 'Delete(1)' class='delete'>Delete Destination</button> <button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <table id='Dest_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr style='height:50px;'><th colspan='3' style='text-align:center;font-size:14px'>Destination Details</th><th colspan='4' style='text-align:center;font-size:14px'>Scheduled Behavior</th><th colspan='3' style='text-align:center;font-size:14px'>Default Behavior</th></tr> <tr> <th>User ID</th><th>Dest ID</th><th>Destination</th><th>Schedule </th> <th>Scheduled Action </th> <th>Scheduled Downlink Pipe </th> <th>Scheduled Uplink Pipe </th> <th>Default Action </th> <th>Default Downlink Pipe </th> <th>Default Uplink Pipe </th> </tr> </thead></table> </div> </div> <div id='AddDestRuleModal' class='modal'><div id='AddDestRuleModalContent' class='modal-content' style='height:325px;width:460px;min-height:325px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:110px'> Add Destination Rule</label><br><br><!-- <label class='drop_down_label' style='float:left;'> Category :</label><select id='destAddressCode' class='field_prop' style='width:130px;float:none;margin-left:28px;'> <option value='0'>IP Address</option><option value='1'>Subnet</option><option value='2'>IP Range</option></select><br><br>--><label class='drop_down_label' id='dest_rule_addr_type_label'> IP Address :</label><input id='addDestRuleIP' type='text' style='width:331px;' placeholder='0.0.0.0' class='field_prop'> <hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> Rule Schedule :</label><select id='add_dest_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='add_sched_dest_rule_action' disabled class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='append_sched_pipes_dest_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='add_def_dest_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='append_def_pipes_dest_rule'></div><button id='addDestRuleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditDestRuleModal' class='modal'><div id='EditDestRuleModalContent' class='modal-content' style='height:325px;width:460px;min-height:325px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:95px'> Update Destination Rule</label><br><br> <!-- <label class='drop_down_label'> Category :</label><select id='destAddressCodeEdit' class='field_prop' style='width:130px;float:none;margin-left:28px;'> <option value='0'>IP Address</option><option value='1'>Subnet</option><option value='2'>IP Range</option></select><br><br>--><label class='drop_down_label' id='edit_dest_rule_addr_type_label'> IP Address :</label><input id='editDestRuleIP' type='text' style='width:331px;' placeholder='0.0.0.0' class='field_prop'> <hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> Rule Schedule :</label><select id='edit_dest_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='edit_sched_dest_rule_action' class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='edit_sched_pipes_dest_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='edit_def_dest_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='edit_def_pipes_dest_rule'></div> <button id='editDestRuleToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var rule_url_html = "<div id='URL_Rule'> <div id='URL_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>URL Rules</div> <div id='url_rule_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button onclick = 'Create(2)' class='create setPrimary'>Add URL</button> <button disabled id='editURLRule' onclick = 'Edit(2)' class='edit'>Edit URL</button> <button disabled id='deleteURLRule' onclick = 'Delete(2)' class='delete'>Delete URL</button> <button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <table id='URL_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr style='height:50px;'><th colspan='6' style='text-align:center;font-size:14px'>URL Rule Parameters</th><th colspan='3' style='text-align:center;font-size:14px'>Scheduled Behavior</th><th colspan='3' style='text-align:center;font-size:14px'>Default Behavior</th></tr> <tr> <th>User ID</th> <th>URL ID</th> <th>Authentication</th> <th>DNS</th><th>URL</th><th>Schedule </th> <th>Scheduled Action </th> <th>Scheduled Downlink Pipe </th> <th>Scheduled Uplink Pipe </th> <th>Default Action </th> <th>Default Downlink Pipe </th> <th>Default Uplink Pipe </th> </tr></thead></table> </div> </div> <div id='AddURLRuleModal' class='modal'><div id='AddURLRuleModalContent' class='modal-content' style='height:375px;width:460px;min-height:375px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:140px'> Add URL Rule</label><br><br><label class='drop_down_label' style='float:left;'> Authentication :</label><select id='add_url_rule_authen' class='field_prop' style='width:150px;float:none;margin-left:28px;'> <option value='1'>HTTP</option><option value='2'>HTTPS</option><option value='3'>HTTP or HTTPS</option></select><label class='drop_down_label' style='margin-left:25px;'> DNS :</label><select id='add_url_rule_dns_det' class='field_prop' style='width:80px;'> <option value='0'>Disable</option> <option value='1'>Enable</option> </select> <br><br><label class='drop_down_label'> URL :</label><input id='add_new_url_to_rule' type='text' class='field_prop' style='width:300px;' ><hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> Rule Schedule :</label><select id='add_url_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='add_sched_url_rule_action' disabled class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='append_sched_pipes_url_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='add_def_url_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='append_def_pipes_url_rule'></div><button id='addURLRuleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditURLRuleModal' class='modal'><div id='EditURLRuleModalContent' class='modal-content' style='height:375px;width:460px;min-height:375px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:127px'> Update URL Rule</label><br><br><label class='drop_down_label' style='float:left;'> Authentication :</label><select id='edit_url_rule_authen' class='field_prop' style='width:150px;float:none;margin-left:28px;'> <option value='1'>HTTP</option><option value='2'>HTTPS</option><option value='3'>HTTP or HTTPS</option></select><label class='drop_down_label' style='margin-left:25px;'> DNS :</label><select id='edit_url_rule_dns_det' class='field_prop' style='width:80px;'> <option value='0'>Disable</option> <option value='1'>Enable</option> </select> <br><br><label class='drop_down_label'> URL :</label><input id='edit_url_to_rule' type='text' class='field_prop' style='width:300px;' ><hr style='border-color:#d2cdcd;'> <label class='drop_down_label'> Rule Schedule :</label><select id='edit_url_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='edit_sched_url_rule_action' class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='edit_sched_pipes_url_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='edit_def_url_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='edit_def_pipes_url_rule'></div><!--<br>--><button id='editURLRuleToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var rule_app_html = "<div id='App_Rule'> <div id='App_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Application Rules</div> <div id='app_rule_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button id='addAppRule' onclick = 'Create(3)' class='create setPrimary'>Add Application</button> <button disabled id='editAppRule' onclick = 'Edit(3)' class='edit'>Edit Application</button> <button disabled id='deleteAppRule' onclick = 'Delete(3)' class='delete'>Delete Application</button> <button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <table id='App_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr style='height:50px;'><th colspan='4' style='text-align:center;font-size:14px'>Application Rule Parameters</th><th colspan='3' style='text-align:center;font-size:14px'>Scheduled Behavior</th><th colspan='3' style='text-align:center;font-size:14px'>Default Behavior</th></tr> <tr> <th>User ID</th> <th>App ID</th> <th>Application</th><th>Schedule </th> <th>Scheduled Action </th> <th>Scheduled Downlink Pipe </th> <th>Scheduled Uplink Pipe </th> <th>Default Action </th> <th>Default Downlink Pipe </th> <th>Default Uplink Pipe </th> </tr> </thead></table> </div> </div> <div id='AddAppRuleModal' class='modal'><div id='AddAppRuleModalContent' class='modal-content' style='height:310px;width:400px;min-height:310px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:80px'> Add Application Rule </label><br><br><label class='drop_down_label'> Application :</label><input type='search' list='appControlID' class='field_prop'><datalist id='appControlID' ></datalist><br><br> <input id='addedApp' hidden type='text' class='field_prop'><label class='drop_down_label'> Rule Schedule :</label><select id='add_app_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='add_sched_app_rule_action' disabled class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='append_sched_pipes_app_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='add_def_app_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='append_def_pipes_app_rule'></div> <button id='addAppRuleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditAppRuleModal' class='modal'><div id='EditAppRuleModalContent' class='modal-content' style='height:310px;width:400px;min-height:310px;'><span class='close'>×</span><label class='modalTitle' style='margin-left:65px'> Update Application Rule</label><br><br> <label class='drop_down_label'> Application :</label><input id='editAddedApp' type='text' class='field_prop'> <br><br> <label class='drop_down_label'> Rule Schedule :</label><select id='edit_app_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='edit_sched_app_rule_action' class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='edit_sched_pipes_app_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='edit_def_app_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='edit_def_pipes_app_rule'></div> <button id='editAppToProfile' class='addUpdateRules'>Update</button> </div></div> </div>";
var rule_serv_html = "<div id='Service_Rule'> <div id='Service_Rule_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Service Rules</div> <div id='service_rule_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button id='addServiceRule' onclick = 'Create(4)' class='create setPrimary'>Add Service</button> <button disabled id='editServiceRule' onclick = 'Edit(4)' class='edit'>Edit Service</button> <button disabled id='deleteServiceRule' onclick = 'Delete(4)' class='delete'>Delete Service</button> <button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <table id='Service_Rule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr style='height:50px;'><th colspan='4' style='text-align:center;font-size:14px'>Service Rule Parameters</th><th colspan='4' style='text-align:center;font-size:14px'>Scheduled Behavior</th><th colspan='3' style='text-align:center;font-size:14px'>Default Behavior</th></tr> <tr> <th>User ID</th> <th>Port</th><th>Global ID</th> <th>Type</th><th>Schedule </th> <th>Scheduled Action </th> <th>Scheduled Downlink Pipe </th> <th>Scheduled Uplink Pipe </th> <th>Default Action </th> <th>Default Downlink Pipe </th> <th>Default Uplink Pipe </th> </tr></thead></table></div> </div> <div id='AddServiceRuleModal' class='modal'><div id='AddServiceRuleModalContent' class='modal-content' style='height:355px;min-height:355px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add Service Rule</label><br><br> <label class='drop_down_label'> Port No :</label><input id='add_serv_rule_port' type='text' value='0' class='field_prop'><br><br> <label class='drop_down_label'> Protocol :</label><select id='add_serv_rule_protocol' class='field_prop' > <option value='1'>TCP</option><option value='2'>UDP</option><option value='3'>Any</option></select><br><br> <label class='drop_down_label'> Rule Schedule :</label><select id='add_serv_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='add_sched_serv_rule_action' disabled class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='append_sched_pipes_serv_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='add_def_serv_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='append_def_pipes_serv_rule'></div> <button id='addServiceRuleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditServiceRuleModal' class='modal'><div id='EditServiceRuleModalContent' class='modal-content' style='height:355px;min-height:355px;'><span class='close'>×</span><label class='modalTitle' style=' margin-left:82px'> Update Service Rule</label><br><br> <label class='drop_down_label'> Port No :</label><input id='edit_serv_rule_port' type='text' value='0' class='field_prop'><br><br> <label class='drop_down_label'> Protocol :</label><select id='edit_serv_rule_protocol' class='field_prop' > <option value='1'>TCP</option><option value='2'>UDP</option><option value='3'>Any</option></select><br><br> <label class='drop_down_label'> Rule Schedule :</label><select id='edit_serv_rule_schedule' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> Scheduled Action :</label><select id='edit_sched_serv_rule_action' class='field_prop' style='width:200px;'> <option selected disabled value='10' >N/A</option><option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br> <div id='edit_sched_pipes_serv_rule'></div> <label class='drop_down_label'> Default Action :</label><select id='edit_def_serv_rule_action' class='field_prop' style='width:200px;'> <option value='0' >Allow</option><option value='-1'>Block</option> <option value='2' >Shape</option></select><br><br><div id='edit_def_pipes_serv_rule'></div> <button id='editServiceRuleToSystem' class='addUpdateRules'>Update</button> </div></div> </div>";
var obj_sched_html = "<div id='Object_Schedules'> <div id='Object_Schedules_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Schedules</div> <div id='object_schedule_holder' style='width:100%;padding:20px'><div class='edit_panel'><button disabled onclick = 'Create(5)' class='create setPrimary'>Create New</button> <button disabled onclick = 'Edit(5)' class='edit'>Edit</button> <button disabled onclick = 'Delete(5)' class='delete'>Delete</button> <button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <table id='Schedule_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>User</th> <th>Schedule ID</th> <th>Schedule Name</th> <th>Type</th> <th>Active Days</th> <th>Start Time</th> <th>End Time</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateScheduleModal' class='modal'><div class='modal-content' id='CreateScheduleModalContent' style='height:440px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:110px;'> Add Schedule </label><br><br><label class='drop_down_label'> Name :</label><input id='addScheduleName' required type='text' class='field_prop' pattern='\w{1,24}'> <br><br> <label class='drop_down_label'> Type :</label><select id='ScheduleCode' class='field_prop'> <option >Weekly Recurring</option><option >One Time</option></select><br><br><div id='appendSchedule'> <label class='drop_down_label'> Days :</label> <input type='checkbox' style='margin-left:118px' id='Recur_1'> <label class='check_box_prop'>Monday </label> <input type='checkbox' style='margin-left:41px' id='Recur_2'> <label class='check_box_prop'>Tuesday </label><br> <input type='checkbox' style='margin-left:157px' id='Recur_3'> <label class='check_box_prop'>Wednesday </label> <input type='checkbox' style='margin-left:20px' id='Recur_4'> <label class='check_box_prop'>Thursday </label><br> <input type='checkbox' style='margin-left:157px' id='Recur_5'> <label class='check_box_prop'>Friday</label> <input type='checkbox' style='margin-left:51px' id='Recur_6'> <label class='check_box_prop'>Saturday</label><br> <input type='checkbox' style='margin-left:157px' id='Recur_7'> <label class='check_box_prop'>Sunday</label><br><br><label class='drop_down_label'> Start Time :</label> <input type='text' id='startTimeRecur' class='clockpicker field_prop ' placeholder ='Start Time' style='margin-left:90px;text-indent:5px'> <br><br> <label class='drop_down_label'> End Time :</label> <input type='text' id='endTimeRecur' class='clockpicker field_prop' placeholder ='End Time' style='margin-left:90px;text-indent:5px'><br> </div> <br><button id='addScheduleToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditScheduleModal' class='modal'><div class='modal-content' id='EditScheduleModalContent' ><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Update Schedule </label><br><br><label class='drop_down_label'> Name :</label><input id='editScheduleName' required type='text' class='field_prop' pattern='\w{1,24}'> <br><br> <label class='drop_down_label'> Type :</label><select id='ScheduleCodeEdit' class='field_prop'><option >Weekly Recurring</option><option >One Time</option></select><br><br><div id='editSchedule'> </div> <br> <button id='editScheduleToSystem' class='addUpdateRules' style='width:150px;'>Update</button> </div></div> </div>";
var obj_admin_pipes_html = "<div id='Object_Admin_Pipes'> <div id='Object_Admin_Pipes_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Admin Pipes</div> <div id='object_admin_pipe_holder' style='width:100%;padding:20px'><div class='edit_panel'><button onclick = 'Create(6)' class=' create setPrimary'>Create New</button> <button disabled onclick = 'Edit(6)' class=' edit'>Edit</button> <button disabled onclick = 'Delete(6)' class=' delete'>Delete</button> </div> <table id='Admin_Pipe_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Pipe ID</th> <th>Pipe Name</th> <th>Guaranteed Bandwidth (Kbps)</th> <th>Maximum Bandwidth (Kbps)</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateAdminPipeModal' class='modal'><div class='modal-content' style='height:290px;width:450px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:125px'> Add Admin Pipe </label><br><br><label class='drop_down_label'> Pipe Name :</label><input id='addAdminPipeName' type='text' value='' pattern='\w{1,24}' class='field_prop' > <br><br> <label class='drop_down_label'> Guaranteed Bandwidth (Kbps) :</label><input id='adminPipeGuarantBW' type='text' class='field_prop' ><br><br> <label class='drop_down_label'> Maximum Bandwidth (Kbps) :</label><input id='adminPipeMaxBW' type='text' class='field_prop' > <br><br><br> <button id='addAdminPipeToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditAdminPipeModal' class='modal'><div class='modal-content' style='height:290px;width:450px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:113px'> Update Admin Pipe </label><br><br><label class='drop_down_label'> Pipe Name :</label><input id='editAdminPipeName' type='text' value='' pattern='\w{1,24}' class='field_prop' > <br><br> <label class='drop_down_label'> Guaranteed Bandwidth (Kbps) :</label><input id='editAdminPipeGuarantBW' type='text' class='field_prop' ><br><br> <label class='drop_down_label'> Maximum Bandwidth (Kbps) :</label><input id='editAdminPipeMaxBW' type='text' class='field_prop' > <br><br><br> <button id='editAdminPipeToSystem' class='addUpdateRules' style='width:150px;'>Update</button> </div></div> </div>";
var obj_user_pipes_html = "<div id='Object_User_Pipes'> <div id='Object_User_Pipes_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>User Pipes</div> <div id='object_user_pipe_holder' style='width:100%;padding:20px'><div class='edit_panel'><button disabled onclick = 'Create(7)' class='create setPrimary'>Create New</button> <button disabled onclick = 'Edit(7)' class='edit'>Edit</button> <button disabled onclick = 'Delete(7)' class='delete'>Delete</button> <button onclick = 'show_rule_user_popup()' class='userRule' style='float:right;background:#009688;width:100px;'>Change User</button> <label class='drop_down_label' style='width:200px;float:right;text-align:end;margin-top:12px;' id='rule_user_label'></label></div> <table id='User_Pipe_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>User ID</th> <th>User Pipe ID</th> <th>Admin Pipe ID</th> <th>Pipe Name</th> <th>Pipe Type</th> <th>Pipe Generation</th> <th>Guaranteed Bandwidth (Kbps)</th> <th>Maximum Bandwidth (Kbps)</th> <th>Priority</th> <th>Occurrences</th> </tr></thead></table> </div> </div> <div id='CreateUserPipeModal' class='modal'><div class='modal-content' style='height:505px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:115px'> Add User Pipe </label><br><br><label class='drop_down_label'> Admin Pipe :</label><select id='add_user_admin_pipe' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> User Pipe Name :</label><input id='addUserPipeName' type='text' value='' pattern='\w{1,24}' class='field_prop' > <br><br> <label class='drop_down_label'> Pipe Type :</label><select id='addUserPipeType' class='field_prop'> <option value='0'>Per-IP</option><option value='1'>Shared</option></select> <br><br><label class='drop_down_label'> Pipe Generation :</label><select id='addUserGroupingType' class='field_prop'> <option value='0'>Per-Item</option><option value='1'>Per-Profile</option><option value='2'>Per-Rule</option></select> <br><br> <label class='drop_down_label'> Guaranteed <br> Bandwidth (Kbps) :</label><input id='addUserPipeGuarantBW' type='text' class='field_prop' ><br><br> <label class='drop_down_label'> Maximum <br> Bandwidth (Kbps) :</label><input id='addUserPipeMaxBW' type='text' class='field_prop' > <br><br> <label class='drop_down_label'> Priority :</label><select id='addUserPipePriority' class='field_prop'><option value='1'>Low</option><option value='50'>Medium</option><option value='99'>High</option></select> <br><br><br> <button id='addUserPipeToSystem' class='addUpdateRules'>Add to System</button> </div></div> <div id='EditUserPipeModal' class='modal'><div class='modal-content' style='height:505px'><span class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Update User Pipe </label><br><br><label class='drop_down_label'> Admin Pipe :</label><select id='edit_user_admin_pipe' class='field_prop' style='width:200px;'></select> <br><br> <label class='drop_down_label'> User Pipe Name :</label><input id='editUserPipeName' type='text' value='' pattern='\w{1,24}' class='field_prop' > <br><br> <label class='drop_down_label'> Pipe Type :</label><select id='editUserPipeType' class='field_prop'> <option value='0'>Per-IP</option><option value='1'>Shared</option></select> <br><br><label class='drop_down_label'> Pipe Generation :</label><select id='editUserGroupingType' class='field_prop'> <option value='0'>Per-Item</option><option value='1'>Per-Profile</option><option value='2'>Per-Rule</option></select> <br><br> <label class='drop_down_label'> Guaranteed <br> Bandwidth (Kbps) :</label><input id='editUserPipeGuarantBW' type='text' class='field_prop' ><br><br> <label class='drop_down_label'> Maximum <br> Bandwidth (Kbps) :</label><input id='editUserPipeMaxBW' type='text' class='field_prop' > <br><br> <label class='drop_down_label'> Priority :</label><select id='editUserPipePriority' class='field_prop'><option value='1'>Low</option><option value='50'>Medium</option><option value='99'>High</option></select> <br><br><br> <button id='editUserPipeToSystem' class='addUpdateRules' style='width:150px;'>Update</button> </div></div> </div>";
var bw_history_html = "<div id='C_History' tabindex='1'><div id='pq_bwh_grap_tool_bar' style='position:relative;font-size:11px;width:100%;height:40px;background-color:#222222'><!--<div class='pq_bwh_grap_tool_bar' style='position:relative'>--><button class='pq_flow_apply' onclick='bwh_apply_btnclk()' style='margin-right:10px;width:60px;margin-top:7px;'>Apply</button> <button class='pq_flow_refresh' onclick='bwh_refresh_btn_click()' style='margin-top:7px;'>Refresh</button><input type='text' required placeholder='Select end date and end time' id='date_input_bw_his_et' class='pq_bwh_grapth_endt Pq_Center'><div class='Pq_Center bq_bwh_lend_time'>End Time</div><img src='image/time.png' class='Pq_Center pq_bwh_endtime_png'> <input type='text' required placeholder='Select start date and start time' id='date_input_bw_his_st' class='pq_bwh_grapth_endt Pq_Center'><div class='Pq_Center bq_bwh_lend_time'>Start Time</div><img src='image/time.png' class='Pq_Center pq_bwh_endtime_png'></div><div style='width:100%;height:calc(100% - 45px);background:#fff'><div class='Pq_TableHolder' style='position:relative;height:calc(50% - 40px);width:calc(100% - 35px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='bwhist_dlink_label' style='height:35px;font-size:14px'>Network Downlink Bandwidth</div> <div style='position:relative;width:100%;height:calc(100% - 45px);background-color:whitesmoke'><div style='position:absolute;width:100%;height:100%'><div id='pq_bwh_dl_plot' style='width:100%;height:100%;float:left;position:relative'></div></div><div id='pq_bwh_dl_plot_no_data' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/hchart.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:#1a7cea;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>No Data Loaded</a></div></div><div id='pq_bwh_dl_plot_no_avil' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/no_data.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Data Not Available</a></div></div><div id='pq_bwh_dl_plot_loading' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;float:left'><img src='image/gif/loading-48.gif' class='pq_hvcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:30%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Loading Data ...</a></div></div></div></div><div class='Pq_TableHolder' style='height:calc(50% - 35px);width:calc(100% - 35px);display:inline-block;'><div class='BWPlotHolderHeader BWPlotHolderHeaderText' id='bwhist_ulink_label' style='height:35px;font-size:14px'>Network Uplink Bandwidth</div> <div style='position:relative;width:100%;height:calc(100% - 45px);background-color:whitesmoke'><div style='position:absolute;width:100%;height:100%'><div id='pq_bwh_ul_plot' style='width:100%;height:100%;float:left;position:relative'></div></div><div id='pq_bwh_ul_plot_no_data' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/hchart.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:#1a7cea;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>No Data Loaded</a></div></div><div id='pq_bwh_ul_plot_no_avil' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;'><img src='image/no_data.png' class='pq_hcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:40%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Data Not Available</a></div></div><div id='pq_bwh_ul_plot_loading' style='position:absolute;width:100%;height:100%;z-index:100;background-color:whitesmoke'><div style='width:100%;height:60%;position:relative;float:left'><img src='image/gif/loading-48.gif' class='pq_hvcenter' style='position:absolute;bottom:0'></div><div style='width:100%;height:30%;position:relative'><a style='font-size:13px;color:lightslategray;margin-left:calc(50% - 50px);top:0%;text-decoration:none;'>Loading Data ...</a></div></div></div></div><div class='pq_bwh_move_bar' style='background:transparent'><button id='bw_hist_prev_btn' class='Pq_Center bw_hist_nxt_prev_btn' onclick='bwh_previous_click()' style='width:125px;margin-right:0px;top:15px;margin-left:calc(50% - 115px) '>Previous</button><button id='bw_hist_next_btn' class='Pq_Center bw_hist_nxt_prev_btn' onclick='bwh_next_click()' style='width:75px;margin-left:5px;top:15px'>Next</button></div> </div> </div>";
var profiles_html = "<div id='Profile'> <div id='Profile_Holder' class='Pq_TableHolder' style='height:calc(100% - 30px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText'>User Profiles</div> <div id='profile_table_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button type='button' onclick = 'CreateProfile()' class='create setPrimary'>Add Profile</button> <button type='button' disabled onclick = 'EditProfile()' class='edit'>Update Profile</button> <button type='button' disabled onclick = 'DeleteProfile()' class='delete'>Delete Profile</button> <button type='button' disabled onclick = 'ResetProfilePwd()' class='reset'>Reset Password</button> </div> <table id='Profile_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>Key</th> <th>Category</th> <th>User Name</th> <th>IP Address</th> <th>Status_val</th> <th>Status</th> </tr></thead></table> </div> </div> <div id='AddProfileModal' class='modal'><div class='modal-content' style=' height:390px;'><span id='CloseAddProfile' class='close'>×</span><label class='modalTitle' style=' margin-left:100px'> Add New Profile </label><br><br><label class='drop_down_label'> Category :</label><select id='profileCode' class='field_prop'><option value='23'>User</option> <option value='14'>Administrator</option> </select><br><br><label class='drop_down_label'> Email :</label><input id='profileEmail' type='email' placeholder='Enter your Email' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input id='profileIP' type='text' placeholder='Enter your IP Address/Subnet' class='field_prop'> <select id='addProfileIpType' hidden class='field_prop' style='width:50px;margin-right:2px'><option value='0'>IPv4</option> <option value='1'>IPv6</option> </select><br><br> <label class='drop_down_label'> Password :</label><input id='profile_password' type='password' placeholder='Enter your Password' class='field_prop'> <br><br> <label class='drop_down_label'> Confirm Password :</label><input id='profile_password_confirm' type='password' placeholder='Confirm your Password' class='field_prop'> <br><br> <input id='password_confirm_msg' disabled type='text' class='field_prop' style='margin-top:-15px;border:none;background:transparent'> <br><br> <br><button id='addProfileToSystem' class='addUpdateRules' style='margin-top:-30px;'>Add Profile</button></div> </div> <div id='EditProfileModal' class='modal'><div class='modal-content' style=' height:290px;'><span id='CloseEditProfile' class='close'>×</span> <label class='modalTitle' style=' margin-left:112px'> Update Profile </label><br><br><label class='drop_down_label'> Category :</label><select disabled id='ProfileEditCode' class='field_prop'><option value='23'>User</option> <option value='12'>Super-Administrator</option> <option value='14'>Administrator</option> </select><br><br><label class='drop_down_label'> Email :</label><input id='profile_edit_email' type='email' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input id='profile_edit_IP' type='text' class='field_prop'> <select id='editProfileIpType' hidden class='field_prop' style='width:50px;margin-right:2px'><option value='0'>IPv4</option> <option value='1'>IPv6</option> </select><br> <input id='user_prof_edit_confirm_msg' readonly type='text' class='field_prop' style='margin-top:5px;border:none;cursor:default'><br><br><button id='editProfileButton' class='addUpdateRules' style='margin-top:5px;width:150px;'>Update</button></div> </div> <div id='ResetPwdModal' class='modal'><div id='ResetPwdModalContent' class='modal-content' style=' height:290px;'><span id='CloseResetPwd' class='close'>×</span> <label class='modalTitle' style=' margin-left:105px'> Reset Password </label><br><br><div id='profile_edit_password_seg' ><label class='drop_down_label'> Password :</label><input id='profile_edit_password' placeholder='Enter the current password' type='password' class='field_prop'> <br><br> </div><label class='drop_down_label'> New Password :</label><input id='reset_password' type='password' placeholder='Enter the new password' class='field_prop'> <br><br> <label class='drop_down_label'> Confirm New Password :</label><input id='reset_password_confirm' type='password' placeholder='Confirm the new password' class='field_prop'><br> <input id='reset_password_confirm_msg' readonly type='text' class='field_prop' style='margin-top:5px;border:none;cursor:default'><br><br><button id='resetProfilePwdButton' class='addUpdateRules' style='margin-top:5px;width:150px;'>Update</button></div> </div> </div>";
var management_html = "<div id='Interface_Management'><div id='Interface_Management_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Management Interface Configurations</div> <div style='width:100%;height:30px'> </div><div><div style='width:698px;height:160px;position:relative;margin:auto;background-color:white;background-image:url(image/pdev_740.png);background-repeat:no-repeat;background-size:100%;'><div id='mgmt_o_mask' class='alpha60' style='width:45px;display:none;height:45px;position:absolute;top:100px;left:223px;border:2px #00FF00;border-style:solid;'></div><div id='mgmt_t_mask' class='alpha60' style='width:45px;display:none;height:45px;position:absolute;top:100px;left:260px;border:2px #00FF00;border-style:solid;'></div></div></div> <div id='mgmt_prop' style='width:100%;height:calc(100% - 305px)'> <div class='mgmt_table_plane'> <div id='mgmt_table_holder' style='width:100%;'><div class='edit_panel'><button type='button' id='deleteProfile' style='float:right;background:#245580 url(image/info.png) no-repeat 10px center;' disabled onclick = 'info_mgmt_interface_show()' class='delete'>Interface info</button> <button type='button' id='createProfile' style='float:right' onclick = 'edit_mgmt_interface_prop()' class='edit' disabled>Edit</button></div><table id='mgmt_iface_table' class='hover row-border order-column StatusTablesFont display' cellspacing='0' width='100%'> <thead><tr style='height:5px;padding:0px;margin:15px;font-size:12px;background-color:#122b40;color:#ffffff'> <th>Key</th> <th>Interface</th> <th>IP Address</th> <th>Subnet</th> <th>Default Gateway</th> <th>DNS Server</th> <th>Status</th> </tr></thead></table></div> </div></div><div id='editMgmtModal' class='modal'><div class='modal-content' style=' height:390px;'><span id='closeEditMgmtModal' class='close'>×</span> <label style='font-size:16px;margin-left:35%'> Edit Interface </label><br><br><label class='drop_down_label'> Interface :</label><input disabled id='mgmt_edit_infc' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input id='mgmt_edit_ip' required type='text' value='0.0.0.0' title='hello' class='field_prop'><br><br> <label class='drop_down_label'> Subnet :</label><input id='mgmt_edit_subnet' required type='text' value='0.0.0.0' class='field_prop'><br><br> <label class='drop_down_label'> Default Gateway :</label><input id='mgmt_edit_dgw' required type='text' value='0.0.0.0' class='field_prop'><br><br> <label class='drop_down_label'> DNS Server :</label><input id='mgmt_edit_dnss' required type='text' value='0.0.0.0' class='field_prop'><br> <input id='mgmt_edit__confirm_msg' type='text' disabled class='field_prop' style='margin-top:5px;border:none;background:transparent'> <br> <br><button id='editMgmtButton' class='addUpdateRules' style='margin-top:10px;'>Update</button></div></div><div id='mgmtInfoProModal' class='modal'><div class='modal-content' style=' height:300px;'><span id='closemgmtInfoModal' class='close'>×</span> <label style='font-size:16px;margin-left:35%'> Interface Info</label><br><br><label class='drop_down_label'> Interface :</label><input disabled id='mgmt_info_infc' class='field_prop'> <br><br> <label class='drop_down_label'> IP Address :</label><input disabled id='mgmt_info_ip' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> Subnet :</label><input disabled id='mgmt_info_subnet' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> Default Gateway :</label><input disabled id='mgmt_info_dgw' required type='text' class='field_prop'><br><br> <label class='drop_down_label'> DNS Server :</label><input disabled id='mgmt_info_dnss' required type='text' class='field_prop'><br><br> </div></div></div></div>";
var high_availability_html = "<div id='HA_Device'> <div id='HA_Device_Holder' class='Pq_TableHolder' style='height:calc(100% - 40px);'> <div class='BWPlotHolderHeader BWPlotHolderHeaderText'>High Availability</div> <div id='ha_device_table_holder' style='width:100%;padding:20px'><div class='edit_panel'> <button id='ha_devc_ip' class='create' style='margin:0px;pointer-events:none;background:transparent;color:black;font-family:monospace;width:200px' >Device IP :192.168.1.25</button> <button id='ha_devc_id' class='create' style='margin:0px;margin-left:20px;pointer-events:none;background:transparent;font-family:monospace;color:black;width:120px' >Device ID :1 </button> <button class='pq_session_wbtn' style='background:#ffae00' onclick='haModalBroker(2)'>Change ID</button><button id='ha_devc_state' class='create' style='margin:0px;margin-left:20px;pointer-events:none;background:transparent;font-family:monospace;color:black;width:210px' >Device State :Primary </button> <button id='set_ha_devc_state_btn' class='pq_session_wbtn' style='background:#ffae00;width:80px;' onclick='haModalBroker(3)'>Change State</button><button id='ha_devc_vip' class='create' style='margin:0px;margin-left:20px;pointer-events:none;background:transparent;font-family:monospace;color:black;width:230px' >Virtual IP :192.168.1.25/28</button> <button class='pq_session_wbtn' style='background:#ffae00' onclick='haModalBroker(4)'>Change IP</button></div> <div class='edit_panel' style='margin-top:20px'> <button class='create' style='margin:0px;' onclick='haModalBroker(1)'>Add Device</button> <button class='delete' style='margin:0px;' disabled onclick='DeleteHaDevice()'>Remove</button> <button id='ha_device_reset' class='pq_url_wbtn' disabled style='float:right;width:120px;height:30px;font-size:12px;background:#208830;margin:0px' onclick = 'maintenance_reset()'>Reset Device</button> </div> <table id='HA_Device_Table' class='hover row-border order-column StatusTablesFont' cellspacing='0' width='100%'> <thead><tr> <th>HA Id</th> <th>Device Id</th> <th>IP Address</th> <th>State</th> <th>Connection Status</th> </tr></thead></table> </div> </div> <div id='CreateHaDeviceModal' class='modal'><div class='modal-content' style='height:185px;'><span id='CloseNewHaDevice' class='close'>×</span><label class='modalTitle' style='margin-left:130px'> Add Device </label><br><br><label class='drop_down_label'> Device IP :</label><input type='text' id='add_ha_device_ip' class='field_prop' style='width:280px' placeholder='Add Device IP'><br><br><br><button id='addHaDeviceToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block'>Add</button><button id='cancelHaDeviceAdd' class='addUpdateRules' style='width:100px;height:30px;margin-left:10px;margin-right:-220px;display:inline-block'>Cancel</button></div></div> <div id='ChangeHaDeviceIDModal' class='modal'><div class='modal-content' style='height:185px;'><span id='closeHaDeviceIDEdit' class='close'>×</span><label class='modalTitle' style='margin-left:130px'> Edit Device ID </label><br><br><label class='drop_down_label'> Device ID :</label><input type='text' id='edit_ha_device_id' class='field_prop' style='width:280px' placeholder='Add Device ID'><br><br><br><button id='editHaDeviceIDToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block'>Add</button><button id='cancelHaDeviceIDEdit' class='addUpdateRules' style='width:100px;height:30px;margin-left:10px;margin-right:-220px;display:inline-block'>Cancel</button></div></div> <div id='ChangeHaDeviceVIPModal' class='modal'><div class='modal-content' style='height:185px;'><span id='closeHaDeviceVIPEdit' class='close'>×</span><label class='modalTitle' style='margin-left:130px'> Edit Virtual IP </label><br><br><label class='drop_down_label'> Virtual IP :</label><input type='text' id='edit_ha_device_vip' class='field_prop' style='width:280px' placeholder='Add Virtual IP'><br><br><br><button id='editHaDeviceVIPToSystem' class='addUpdateRules' style='width:100px;height:30px;margin-left:85px;display:inline-block'>Add</button><button id='cancelHaDeviceVIPEdit' class='addUpdateRules' style='width:100px;height:30px;margin-left:10px;margin-right:-220px;display:inline-block'>Cancel</button></div></div> </div>";
var maintenance_html = "<div id='Maintenance'><div id='Maintenance_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 30px);'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>Device Maintenance</div> <div style='width:100%;height:100px;'><div style='width:100%;height:20px'></div><div class='edit_panel'><button type='button' id='ele_pdev_reset' class='delete' style='float:left;height:200px;background:#1e2d35 url(image/reset.png) 15px 70px/120px 100px no-repeat;margin:10px;margin-left:calc(50% - 235px);position:relative' onclick = 'maintenance_reset()' ><span style=' display:block;position:absolute;top:10px;left:55px;font-size:15px;'>Refresh</span></button> <button type='button' id='ele_pdev_reboot' class='delete' style='float:left;height:200px;background:#1e2d35 url(image/restart.png) 25px 70px/100px 100px no-repeat;margin:10px;position:relative' onclick = 'maintenance_reboot()'><span style=' display:block;position:absolute;top:10px;left:50px;font-size:15px;'>Restart</span></button><button type='button' id='ele_pdev_powerdown' class='delete' style='float:left;height:200px;background:#1e2d35 url(image/power.png) 25px 70px/100px 100px no-repeat;position:relative;margin:10px;' onclick = 'maintenance_poweroff()'><span style=' display:block;position:absolute;top:10px;left:40px;font-size:15px;'>Power Off</span></button></div></div><div id='maintenance_warning_modal' class='modal'><div class='modal-content' style=' height:180px;'><span id='maintenance_cancel_warning_modal' class='close'>×</span> <label style='color:#d43f3a;font-size:16px;margin-left:35%'> Attention!</label><br><br><label class='dmaintain_show_label'></label><br><br><button class='addUpdateRules' onclick='maintenance_cancel_op()' style='margin-top:10px;width:100px;height:30px;font-size:14px;float:right;background-color:gray;margin-left:10px'>Cancel</button><button class='addUpdateRules' onclick='maintenance_do_operation(maintenance_warning_type);' style='margin-top:10px;width:100px;height:30px;font-size:14px;float:right'>Proceed</button></div></div><div id='maintenance_operation_modal' class='modal' style='z-index:1000'><div id='createDisconnectModalContent' class='modal-content' style='height:200px;'><label class='modalTitle' style='margin-left:160px'> Done </label><br><br><div style='width:100%;height:5px'></div><label class='dmaintain_operation_label' style='margin-left:60px'> </label> </div></div> </div></div>";
var system_update_html = "<div id='System_Info'><div id='System_Info_Holder' class='Pq_TableHolder' style='position:relative;height:calc(100% - 25px);min-height:580px'><div class='BWPlotHolderHeader BWPlotHolderHeaderText'>System Update</div> <div class='Pq_LinkPlotHolder' style='height:150px;width:calc(100% - 50px);overflow-y:auto;margin-top:45px;'><div class='SystemStatsPanelHeader' style='height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> Current Version</div></div><div style='width:100%;height:40px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left;top:10px;'/><div class='pq_vcenter' id='fw_version' style='font-size:11px;margin-left:30px;width:70%;top:10px;'></div><img src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left;margin-top:7px;'/><div id='sw_version' style='font-size:11px;margin-left:30px;width:70%;margin-top:5px;'></div><button id='2' class='edit' onclick='update_offline();' style='float:right;margin-right:20px;width:120px;margin-top:-20px;height:22px'>Update Offline</button></div><div class='SystemStatsPanelHeader' style='margin-top:5px;height:25px;'> <div class='pq_vcenter SystemStatsPanelHeaderText'> License Information</div></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:18px;float:left'/><div class='pq_vcenter' id='license_info' style='font-size:11px;margin-left:3px;width:70%;float:left;'></div><button class='edit' onclick='update_license();' style='float:right;margin-right:20px;width:120px;height:22px'>Update License</button></div> </div> <div id='Offline_Update_Window' class='modal'><div id='Offline_Update_Window_Modal' class='modal-content' style=' height:220px;'><span class='close'>×</span><div style='float:left;margin-left:15px;margin-bottom:20px'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style='margin-top:5px;margin-left:60px;'> Offline Update </label> </div><form enctype='multipart/form-data' id='offline_update_form' onsubmit='return false'><br><br><br><label class='fileLabel' style=''><input type='file' name='file' id='offline_file_select' required accept='.pqupd'/><span>Select File</span></label><input id='upload_file_name' type='text' value='No File Selected' style='border:none;width:260px;font-size:12px;'><progress id='offline_upload_progress' style='margin-top:10px;height:20px;width:100%' hidden></progress><input type='submit' style='margin-top:20px;width:150px' id='offline_file_upload' class='addUpdateRules' disabled value='Upload'> </form></div></div> <div id='Signature_Update_Window' class='modal'><div id='Signature_Update_Window_Modal' class='modal-content' style=' height:190px;width:420px;'><span class='close'>×</span><div style='float:left;margin-left:15px;margin-bottom:20px'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style='margin-top:5px;margin-left:10px;'> Application Signature Update </label> </div><form enctype='multipart/form-data' id='app_signature_update_form' onsubmit='return false'><br><br><br><label class='fileLabel' style=''><input type='file' name='file' id='app_signaure_file_select' required accept='.pqsig'/><span>Select File</span></label><input type='text' id='upload_app_sig_file_name' disabled value='No File Selected' style='border:none;width:260px;font-size:12px;background:transparent'><input type='submit' style='margin-top:20px;width:150px' id='app_signaure_file_upload' class='addUpdateRules' disabled value='Upload'></form></div></div><div id='Configuration_Backup_Window' class='modal'><div id='Configuration_Backup_Window_Modal' class='modal-content' style=' height:330px;max-height:380px;min-height:330px'><span class='close' onclick='$('#Configuration_Backup_Window').hide()'>×</span><div id='Update_Version_Name' style='float:left;margin-left:15px;'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style=' margin-top:5px;margin-left:30px;'> Configuration Backup </label> </div><label class='modalTitle' id='set_new_update_version' style='margin-top:20px;margin-left:30px;;font-size:12px'></label><br> <div id='Update_Details' class='update_detail'></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:0px;float:left'/><div class='pq_vcenter' id='app_signature_info' style='font-size:12px;margin-left:3px;width:200px;float:left;font-weight:bold;'>Backup configurations now</div><button class='addUpdateRules' onclick='set_config_backup_now();' style='float:right;margin-right:10px;width:90px;height:22px;font-size:12px;margin-top:3px'>Backup</button></div> <div id='last_conf_backup_info' style='width:100%;font-size:10px;margin-left:13px;height:20px;'></div><div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:0px;float:left'/><div class='pq_vcenter' id='app_signature_info' style='font-size:12px;margin-left:3px;width:200px;float:left;font-weight:bold;'>Schedule configurations backup</div><button id='sched_config_add' class='addUpdateRules' onclick='' style='float:right;display:block;margin-right:10px;width:90px;height:22px;font-size:12px;margin-top:3px'>Schedule</button><button id='sched_config_hide' class='addUpdateRules' onclick='' style='background:#e29030;float:right;display:none;margin-right:10px;width:90px;height:22px;font-size:12px;margin-top:3px'>Hide</button></div> <div id='current_conf_backup_sched_info' style='width:100%;font-size:10px;margin-left:13px;height:20px;'></div><div class='pq_upd_config_bck_sched'><div class='update_button_area' style='margin-top:10px;'><select id='set_bck_sched' style='height:25px;width:100px;margin-right:5px;margin-left:82px;font-size:11px;'><option value='0'>Never backup</option><option value='1'>Every 1 hour</option><option value='2'>Every 2 hours</option><option value='3'>Every 3 hours</option><option value='4'>Every 4 hours</option><option value='6'>Every 6 hours</option><option value='12'>Every 12 hours</option><option value='24'>Every 24 hours</option></select><button id='set_bck_sched_ok' style='margin-right:5px;height:25px;width:50px;'>Set</button></div> </div> <div style='width:100%;height:25px;margin-top:5px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:0px;float:left'/><div class='pq_vcenter' id='app_signature_info' style='font-size:12px;margin-left:3px;width:200px;float:left;font-weight:bold;'>Restore configurations</div><button class='addUpdateRules' onclick='restore_config_backup();' style='float:right;margin-right:10px;width:90px;height:22px;font-size:12px;margin-top:3px'>Restore</button></div> <div style='width:100%;height:25px;margin-top:10px'> <img class='pq_vcenter' src='image/bullet.png' style='width:10px;height:10px;margin-left:0px;float:left'/><div class='pq_vcenter' id='app_signature_info' style='font-size:12px;margin-left:3px;width:200px;float:left;font-weight:bold;'>Configure backup server</div><button id='bck_serv_config_add' class='addUpdateRules' onclick='' style='float:right;display:block;margin-right:10px;width:90px;height:22px;font-size:12px;margin-top:3px'>Configure</button><button id='bck_serv_config_hide' class='addUpdateRules' onclick='' style='background:#e29030;float:right;display:none;margin-right:10px;width:90px;height:22px;font-size:12px;margin-top:3px'>Hide</button></div><div id='current_conf_backup_serv_info' style='width:100%;font-size:10px;margin-left:13px;height:20px;'></div><div class='pq_upd_config_bck_serv'><div class='update_button_area' style='margin-top:10px;'><label class='drop_down_label_reporting' style='margin-left:0px;color:#000'> IP :</label><input type='text' placeholder='' id='config_bck_ip' value='0' style='width:120px;text-align:center;height:25px;font-size:11px;'> <label class='drop_down_label_reporting' style='margin-left:10px;color:#000'> Port :</label><input type='text' placeholder='' id='config_bck_port' value='0' style='width:50px;text-align:center;height:25px;font-size:11px;'> <button id='set_bck_serv_config_ok' style='margin-right:5px;width:50px;margin-left:15px;height:25px;'>Set</button></div> </div> <div class='pq_vcenter' id='current_conf_backup_serv_info' style='font-size:12px;margin-left:3px;width:330px;float:left;height:25px;'></div><button class='addUpdateRules' style=' width:100px;margin-top:20px;' onclick='$('#Configuration_Backup_Window').hide()'>Cancel</button></div></div> <div id='License_Update_Window' class='modal'><div id='License_Update_Window_Modal' class='modal-content' style=' height:190px;'><span class='close'>×</span><div style='float:left;margin-left:15px;margin-bottom:20px'><img src='image/update_2.png' style='width:40px;height:40px;float:left;'><label class='modalTitle' style='margin-top:5px;margin-left:60px;'> License Update </label> </div><form enctype='multipart/form-data' id='license_update_form' onsubmit='return false'><br><br><br><label class='fileLabel' style=''><input type='file' name='file' id='license_file_select' required accept='.lic'/><span>Select File</span></label><input id='upload_license_name' type='text' value='No File Selected' style='border:none;width:260px;font-size:12px;'><input type='submit' style='margin-top:20px;width:150px' id='license_file_upload' class='addUpdateRules' disabled value='Upload'></form></div></div> <div id='Offline_Update_Install_Window' class='modal'><div class='modal-content' style='width:370px;height:170px;margin:auto;border-radius:17px;padding:0px;background:whitesmoke'><div class='StatusContentHolderHeader StatusContentHolderHeaderText '>File Status</div> <div style='display:inline-block;float:left;margin:12px;'><img id='gif' style='display:inline-block;margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/></div> <div style='display:inline-block;width:280px;height:120px;'><div style='margin-left:15px;margin-top:32px;font-family:Courier-New;font-size:17px;' >File Uploaded Successfully</div><button class='statusModalButton' onclick='install_offline_update()' style='width:80px;height:30px;margin-left:28px;margin-top:30px;background:#21b224'>Install</button><button class='statusModalButton' onclick='$('#Offline_Update_Install_Window').hide();' style='width:80px;height:30px;margin-top:17px;background:#f44242;margin-left:5px;'>Cancel</button></div> </div></div> <div id='App_Signature_Update_Install_Window' class='modal'><div class='modal-content' style='width:370px;height:170px;margin:auto;border-radius:17px;padding:0px;background:whitesmoke'><div class='StatusContentHolderHeader StatusContentHolderHeaderText '>File Status</div> <div style='display:inline-block;float:left;margin:12px;'><img id='gif' style='display:inline-block;margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/></div> <div style='display:inline-block;width:280px;height:120px;'><div style='margin-left:15px;margin-top:32px;font-family:Courier-New;font-size:17px;' >File Uploaded Successfully</div><button class='statusModalButton' onclick='install_app_sig_update()' style='width:80px;height:30px;margin-left:28px;margin-top:30px;background:#21b224'>Install</button><button class='statusModalButton' onclick='$('#App_Signature_Update_Install_Window').hide();' style='width:80px;height:30px;margin-top:17px;background:#f44242;;margin-left:5px;'>Cancel</button></div> </div></div> <div id='License_Update_Install_Window' class='modal'><div class='modal-content' style='width:370px;height:170px;margin:auto;border-radius:17px;padding:0px;background:whitesmoke'><div class='StatusContentHolderHeader StatusContentHolderHeaderText '>File Status</div> <div style='display:inline-block;float:left;margin:12px;'><img id='gif' style='display:inline-block;margin-top:10px' src='image/success.png' alt='your image' height='50' width='50'/></div> <div style='display:inline-block;width:280px;height:120px;'><div style='margin-left:15px;margin-top:32px;font-family:Courier-New;font-size:17px;' >File Uploaded Successfully</div><button class='statusModalButton' onclick='install_license_update()' style='width:80px;height:30px;margin-left:28px;margin-top:30px;background:#21b224'>Install</button><button class='statusModalButton' onclick='$('#License_Update_Install_Window').hide();' style='width:80px;height:30px;margin-top:17px;background:#f44242;;margin-left:5px;'>Cancel</button></div> </div></div> <div id='Updating_modal' class='modal' style='background:rgba(254, 251, 251, 0.9)'><img style='display:inline-block;margin-top:40px;height:50px;width:50px;margin-left:calc(50% - 25px)' src='image/gif/v-loader.gif' alt='your image'/><div style='font-family:Georgia;font-size:25px;text-align:center;margin-top:15px;'> Updating ...</div></div> </div></div>";
var ele_pqpie_label_html = "<div class='pqpie_lble pqpie_modal '><div class='pqpie_cmodal' style=' height:100%;width:100%'><div class='pqpie_lble_nme' style='position:relative;width:100%;height:20px;background-color:transparent;top:calc(25%);text-align:center;padding-top:3px;color:black;font-size:11px;'></div><div class='pqpie_lble_val' style='position:relative;width:100%;height:20px;background-color:transparent;top:calc(25% + 15px);text-align:center;color:black;font-size:11px;'></div> </div></div>";
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

var PDEV_UPDATE_STATE = 136;
var PDEV_CHECK_UPDATE = 137;
var PDEV_CHECK_UPDATE_OPERATION = 138;
var WO_GET_VERSION_INFO = 139;
var PDEV_SET_UPDATE_EMAIL = 140;
var PDEV_UPDATE_RETRY = 141;
var PDEV_INSTALL_OFFLINE_UPDATE = 149;
var PDEV_INSTALL_LICENSE = 150;
var PDEV_SWITCH_ONLINE_UPDATE = 151;
var PDEV_INSTALL_SIGNATURE_FILE = 163;

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
//var WINDOW_OBJ_URL = 23;
//var WINDOW_OBJ_URL_LIST = 24;

//var WINDOW_RULE_MON = 25;
//var WINDOW_QUOTA = 26;
//var WINDOW_QUOTA_APP_PROFILES = 27;
//var WINDOW_QUOTA_URL_PROFILES = 28;
//var WINDOW_QUOTA_SERV_PROFILES = 48;
//var WINDOW_QUOTA_PROFILES = 29;
//var WINDOW_QUOTA_APP_QUOTA = 30;
//var WINDOW_QUOTA_USAGE = 31;
var WINDOW_BW_HIST = 23;
//var WINDOW_REPORT = 33;
//var WINDOW_IP_USAGE = 34;
var WINDOW_PROFILE = 24;
var WINDOW_MANAGEMENT = 25;
var WINDOW_HIGH_AVAILABILITY = 26;
//var WINDOW_APP_SIG = 37;
//var WINDOW_SETTINGS = 38;
var WINDOW_MAINTENANCE = 27;
//var WINDOW_CONFIGURATION = 40;

//var WINDOW_DETAILED_IP_USAGE = 44;
//var WINDOW_APP_LINK_UTIL_USER = 45;
//var WINDOW_OBJ_APP_LIST = 46;
var WINDOW_SYSTEM_UPDATES = 28;

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



//Bar Chart Drill-down
//var YEARLY = 1;
//var MONTHLY = 2;
//var DAILY = 3;
//var HOURLY = 4;

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
}/*Rule Tyepe Indications*/
var PQ_WO_ADDR_SUNET = 2;
var PQ_WO_ADDR_IPRNG = 3;

/* WO command types */
var WO_SETTINGS_UPDATE = 18;

var WO_GET_EVENT_LIST = 24;

/*WO Rule Adreess Operation Status*/

var PQ_OP_SUCCESS = 10;
var PQ_OP_FAIL = 2;
var PQ_OP_DUPLICATE = 4;
var PQ_OP_MAXR = 11;
var PQ_OP_INVID = 12;

//MAC address objects [ACJS Requests & Replies]

var TS_MACADR_LIST_ADD = 166; 
var TS_MACADR_LIST_UPDATE = 167;
var TS_MACADR_LIST_DELETE = 168; 
var TS_MACADR_GET_LIST = 169;

//WO Schedule Types
var WO_SCHD_RECURRING = 21;
var WO_SCHD_TIMEPERIOD = 22;

//WO Shaper Priority
var WO_SPR_PR_LOW = 1;
var WO_SPR_PR_MEDIUM = 50;
var WO_SPR_PR_HEIGH = 99;

//WO ACTIONS
var WO_ACT_BLOCK = 1;
var WO_ACT_ALLOW = 2;

//Quota Rules

var WO_QUTA_RULE_LIST_ADD = 129;
var WO_QUTA_RULE_LIST_UPDATE = 130;
var WO_QUTA_RULE_LIST_DELETE = 131;
var WO_QUTA_RULE_LIST_SWAP = 132;
var WO_GET_QUTA_RULE_LIST = 133;

// Quota App Profiles

var WO_QUTA_APPPROF_LIST_ADD = 122;
var WO_QUTA_APPPROF_LIST_DELETE = 123; 
var WO_GET_QUTA_APPPROF_LIST = 124; 

var WO_QUTA_APPRULE_LIST_ADD = 125; 
var WO_QUTA_APPRULE_LIST_UPDATE = 126; 
var WO_QUTA_APPRULE_LIST_DELETE = 127; 
var WO_GET_QUTA_APPRULE_LIST = 128; 

// Quota URL Profiles

var WO_QUTA_URLPROF_LIST_ADD = 152;
var WO_QUTA_URLPROF_LIST_DELETE = 153; 
var WO_GET_QUTA_URLPROF_LIST = 154; 

var WO_QUTA_URLRULE_LIST_ADD = 155; 
var WO_QUTA_URLRULE_LIST_UPDATE = 156; 
var WO_QUTA_URLRULE_LIST_DELETE = 157; 
var WO_GET_QUTA_URLRULE_LIST = 158; 

// Quota Service Profiles

var WO_QUTA_SVSPROF_LIST_ADD = 159;
var WO_QUTA_SVSPROF_LIST_DELETE = 160; 
var WO_GET_QUTA_SVSPROF_LIST = 161; 

var WO_QUTA_SVSRULE_LIST_ADD = 162; 
var WO_QUTA_SVSRULE_LIST_UPDATE = 163; 
var WO_QUTA_SVSRULE_LIST_DELETE = 164; 
var WO_GET_QUTA_SVSRULE_LIST = 165; 

//Quota Profiles

var WO_QUTAELE_LIST_ADD = 104;
var WO_QUTAELE_LIST_DELETE = 105;
var WO_QUTAELE_LIST_UPDATE = 106;
var WO_GET_QUTAELE_LIST = 107;

//hShaping table definitions

var RULE_TABLE = 0;
var PIPE_SCHEDULE_TABLE = 1;
var URL_PROF_TABLE = 2;
var APP_PROF_TABLE = 3;
var SERV_PROF_TABLE = 4;

//Add Application Watch Profiles

var WO_AWPROF_LIST_ADD = 142; 
var WO_AWPROF_LIST_DELETE = 143;
var WO_GET_AWPROF_LIST = 144;
var WO_AWPROF_ITEM_ADD = 145;
var WO_AWPROF_ITEM_UPDATE = 146;
var WO_AWPROF_ITEM_DELETE = 147;
var WO_GET_AWPROF_ITEM_LIST = 148;

////

var WO_ADDR_LIST_ADD = 25;
var WO_ADDR_LIST_UPDATE = 26;
var WO_ADDR_LIST_DELETE = 27;
var WO_GET_ADDR_LIST = 28;

var WO_ADMIN_SHAPER_LIST_ADD = 253;
var WO_ADMIN_SHAPER_LIST_UPDATE = 54;
var WO_ADMIN_SHAPER_LIST_DELETE = 254;
var WO_GET_ADMIN_SHAPER_LIST = 56;

var WO_SHAPER_LIST_ADD = 53;
var WO_SHAPER_LIST_UPDATE = 252;
var WO_SHAPER_LIST_DELETE = 55;
var WO_GET_USER_SHAPER_LIST = 255;

var WO_SCHD_LIST_ADD = 65;
var WO_SCHD_LIST_UPDATE = 66;
var WO_SCHD_LIST_DELETE = 67;
var WO_GET_SCHD_LIST = 68;

var ML_APP_RULE_ADD = 150;
var ML_APP_RULE_UPDATE = 151;
var ML_APP_RULE_DELETE = 152;
var WO_GET_APPRULE_LIST = 75;
var ML_URL_RULE_ADD = 96;
var ML_URL_RULE_UPDATE = 98;
var WO_URLRULE_LIST_DELETE = 97;
var WO_GET_URLRULE_LIST = 99;
var ML_SVS_RULE_ADD = 156;
var ML_SVS_RULE_UPDATE = 157;
var ML_SVS_RULE_DELETE = 115;
var WO_GET_SVSITEM_LIST = 110;

var feature_array = [];
var sys_update_status = "System was updated to the latest version";
var connection_error_status = "Connection to the Server disrupted. Please check your connection and retry";
var update_info;
var is_online_update_on = false;
var offline_file_size;
var config_backup_data = [];

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
        get_config_backup_details();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

display_system_update_info = function () {
    var element = update_info.split("&");
    var email = element[1];
//    var fw_version = pq_32_2_8_1_16(element[2]);
//        var hw_version = pq_32_1_16_2_8(element[3]);
//        var sig_version = pq_32_1_16_2_8(element[4]);

    var last_upd_check = new Date(+element[5] * 1000);
    var last_updated = new Date(+element[6] * 1000);
    var sched_update = new Date(+element[7] * 1000);
    var config_backup = moment(new Date(+element[10] * 1000)).format(' Do MMM YYYY hh:mm:ss A');

    $("#fw_version").text("Firmware Version " + fw_version);
    $("#sw_version").text("Software Version " + sw_version);
    $("#last_upd_chk_time").text(last_upd_check);
    $("#last_upd_time").text(last_updated);
    $("#app_signature_info").text("Version " + element[9]);
    $("#config_backup_info").text('Last configuration backup: ' + config_backup);

    if (email !== '-') {
        $("#add_sys_admin_email").hide();
        $("#sys_admin_cont_email_group").show();
        $("#sys_admin_cont_email").text(email);
    }
    if (element[5] !== '0') {
        $("#last_upd_chk_time").text(last_upd_check);
    } else
        $("#last_upd_chk_time").text('None');
    if (element[6] !== '0') {
        $("#last_upd_time").text(last_updated);
    } else
        $("#last_upd_time").text('None');
    if (element[7] !== '0') {
        $("#sched_upd_time").text(sched_update);
    } else
        $("#sched_upd_time").text('None');

    is_online_update_on = element[8];

    if (!parseInt(is_online_update_on)) {
        $("#sched_upd_time").text('This feature is unavailable in offline mode');
        $("#last_upd_chk_time").text('This feature is unavailable in offline mode');
    }
    pq_online_update_state_changed(0, parseInt(element[8]));
};

get_new_update = function (flag) {

    feature_array = [];
    var cmd_buffer = update_acjs_elements(PDEV_CHECK_UPDATE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data);
        if (data === 'u') {
            SuccessStatus("System is up to date");
        } else if (data === 'l') {
            AbortStatus("Unable to connect to server. Please check your network connection.");
            $('#abortStatusModalProceed').click(function () {
                $('#StatusModal').hide();
                get_new_update();
            });
        } else if (data === 'f') {
            InvalidStatus("Operation Failed. Please check your settings");
        } else if (data === 'c') {
            LoadingStatus("Checking for updates ...");
            setTimeout(function () {
                $('#StatusModal').hide();
                if (mbx_loading_cancel_status != 1) {
                    get_new_update();
                }
            }, 10000);
        } else if (data === 'r') {
            AbortStatus("Update file corrupted! Retry to update again.");
            $('#abortStatusModalProceed').click(function () {

                var cmd_buffer = update_acjs_elements(PDEV_UPDATE_RETRY, '', 0, 0, 0, 0, 0, 0);
                var cookie = $.cookie('pqsf');

                $.ajax({
                    data: cmd_buffer,
                    processData: false,
                    headers: {"PARAQUMTEC": cookie},
                    timeout: 10000,
                    type: 'POST',
                    url: '/'
                }).done(function (data, textStatus, jqXHR) {

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error('Problems when posting...');
                });

                $('#StatusModal').hide();
                get_new_update();
            });
        } else {
            $('#New_Update_Window').show();
            var update = data.split("#");
            $("#set_new_update_version").text("Version " + update[0]);
            var features = update[1].split("&");
            for (var i = 0; i < features.length; i++) {
                feature_array[i] = features[i];
            }
            new_update_popup();
            $('#New_Update_Window').show();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

new_update_popup = function () {

    $('#Update_Details').css({height: feature_array.length * 25 + 'px'});
    $('#New_Update_Window_Modal').css({height: 185 + $('#Update_Details').height() + 'px'});
    $('#Update_Details').children().detach();
    $('#Update_Details').append("<ul id='up_table'>");

    for (i = 0; i < feature_array.length; i++) {
        $('#up_table').append("<li>" + feature_array[i] + "</li>");
    }

    $('#up_table').append("</ul>");

    $("#update_set_time").click(function () {
        $('#update_now').hide();
        $('#update_later').hide();
        $('#update_set_time').hide();
        $('#set_update_sched').show();
        $('#set_time_ok').show();
        $('#set_time_Cancel').show();
    });
    $("#set_time_Cancel").click(function () {
        $('#update_now').show();
        $('#update_later').show();
        $('#update_set_time').show();
        $('#set_update_sched').hide();
        $('#set_time_ok').hide();
        $('#set_time_Cancel').hide();
    });

    $("#set_time_ok").click(function () {
        schedule_update(parseInt($("#set_update_sched option:selected").val()));
        $('#New_Update_Window').hide();
    });

};

update_system_now = function () {
    schedule_update(0);
    $('#New_Update_Window').hide();
};

init_update_window = function () {
    $("#add_sys_admin_email").click(function () {
        $('#AddSystemAdminEmail').show();
        $("#sys_admin_email_title").text('Add Email');
        $("#addSysAdminEmailToSystem").text('Add to System');
        closeModalInit(1);
    });
    $("#update_sys_admin_email").click(function () {
        $('#AddSystemAdminEmail').show();
        $("#sys_admin_email_title").text('Update Email');
        $("#addSysAdminEmailToSystem").text('Update');
        closeModalInit(1);
    });

    $("#addSysAdminEmailToSystem").click(function () {
        update_sys_admin_email($("#addSysAdminEmail").val());
        $('#AddSystemAdminEmail').hide();
    });

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

    $("#sched_config_add").click(function () {
        if ($("#bck_serv_config_hide").is(":visible")) {
            $('.pq_upd_config_bck_serv ').animate({
                height: 'toggle'
            }, 500, function () {});
            $("#bck_serv_config_hide").hide();
            $("#bck_serv_config_add").show();
        }
        $('.pq_upd_config_bck_serv ').hide();
        $('#Configuration_Backup_Window_Modal').css({height: '380px'});
        $("#sched_config_add").hide();
        $("#sched_config_hide").show();
        $('.pq_upd_config_bck_sched ').animate({
            height: 'toggle'
        }, 500, function () {});
    });

    $("#sched_config_hide").click(function () {
        $('#Configuration_Backup_Window_Modal').css({height: '330px'});
        $("#sched_config_hide").hide();
        $("#sched_config_add").show();
        $('.pq_upd_config_bck_sched ').animate({
            height: 'toggle'
        }, 500, function () {});
    });

    $("#bck_serv_config_add").click(function () {
        if ($("#sched_config_hide").is(":visible")) {
            $('.pq_upd_config_bck_sched ').animate({
                height: 'toggle'
            }, 500, function () {});
            $("#sched_config_hide").hide();
            $("#sched_config_add").show();
        }

        $('#Configuration_Backup_Window_Modal').css({height: '380px'});
        $("#bck_serv_config_add").hide();
        $("#bck_serv_config_hide").show();
        $('.pq_upd_config_bck_serv ').animate({
            height: 'toggle'
        }, 500, function () {});
    });

    $("#bck_serv_config_hide").click(function () {
        $('#Configuration_Backup_Window_Modal').css({height: '330px'});
        $("#bck_serv_config_hide").hide();
        $("#bck_serv_config_add").show();
        $('.pq_upd_config_bck_serv ').animate({
            height: 'toggle'
        }, 500, function () {});
    });

    $("#set_bck_sched_ok").click(function () {
        set_config_backup_sched(parseInt($("#set_bck_sched option:selected").val()));
    });

    $("#set_bck_serv_config_ok").click(function () {
        set_config_backup_serv(dot2num($("#config_bck_ip").val()), parseInt($("#config_bck_port").val()));
    });
};

pq_online_update_state_changed = function (cb, flag) {
    if (cb.checked || flag) {
        is_online_update_on = true;
        $('#online_updt_switch').prop('checked', true);
        $("#online_update_btn").show();
        $("#scheduled_update_header").css({'background': '#035252'});
        $("#last_update_check_header").css({'background': '#035252'});
        if (typeof (flag) === 'undefined') {
            switch_online_update(1);
        }
    } else {
        is_online_update_on = false;
        $("#scheduled_update_header").css({'background': '#ccc'});
        $("#last_update_check_header").css({'background': '#ccc'});
        $("#online_update_btn").hide();
        if (typeof (flag) === 'undefined') {
            switch_online_update(0);
        }
    }
};

update_offline = function () {
    $('#Offline_Update_Window').show();
    closeModalInit(1);
};

backup_configuration = function () {
    $('#Configuration_Backup_Window').show();
    closeModalInit(1);
};

update_backup_conf_info = function () {
    var element = config_backup_data.split("&");
    $("#current_conf_backup_serv_info").text('Server IP: ' + num2dot(element[1]) + ' Port: ' + element[2]);
    $("#current_conf_backup_sched_info").text('Current schedule frequency: ' + element[3] + ' hour(s)');
    $("#last_conf_backup_info").text('Last configuration backup: ' + moment(new Date(+element[4] * 1000)).format(' Do MMM YYYY hh:mm:ss A'));
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
var global_rule_user = 0;
var dest_rules;
var url_rules;
var app_rules;
var serv_rules;
var admin_pipe_list = [];
var admin_pipe_list_data = [];
var admin_pipe_list_tt = [];
var user_pipe_list = [];
var user_pipe_list_data = [];
var user_pipe_list_tt = [];
var schedule_list = [];
var schedule_list_data = [];
var schedule_list_tt = [];

var ACTIVE_AD = false;
var ACTIVE_DHCP = false;


function Init_WO_Param(sched_flag, admin_pipe_flag, user_pipe_flag, upd_flag) {
    var user_id = global_rule_user;
    if (sched_flag) {
        schedule_list = [];
        schedule_list_data = [];
        schedule_list_tt = [];
        var cookie = $.cookie('pqsf');

        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SCHD_LIST, 0);
        req[1] = user_id;

        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data, textStatus, jqXHR) {
//            console.log(data)
            schedule_list[0] = 'None';
            var row = data.split(";");
            for (var i = 0; i < row.length - 1; i++) {
                schedule_list_data[i] = row[i];
                var element = row[i].split("&");
                schedule_list[element[1]] = element[2];
                schedule_list_tt[element[1]] = row[i];
            }
            Init_Admin_Pipes();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Problems when posting...');
        });
    } else
        Init_Admin_Pipes();

    function Init_Admin_Pipes() {
        if (admin_pipe_flag) {
            admin_pipe_list = [];
            admin_pipe_list_data = [];
            admin_pipe_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADMIN_SHAPER_LIST, 0);

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
//                console.log(data)
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    admin_pipe_list_data[i] = row[i];
                    var element = row[i].split("&");
                    admin_pipe_list[element[0]] = element[1];
                    admin_pipe_list_tt[element[0]] = row[i];
                }
                Init_User_Pipes();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        } else
            Init_User_Pipes();
    }

    function Init_User_Pipes() {
        if (user_pipe_flag) {
            user_pipe_list = [];
            user_pipe_list_data = [];
            user_pipe_list_tt = [];
            var cookie = $.cookie('pqsf');

            var req = new Uint32Array(2);
            req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_USER_SHAPER_LIST, 0);
            req[1] = user_id;

            $.ajax({
                data: req.buffer,
                processData: false,
                headers: {"PARAQUMTEC": cookie},
                timeout: 10000,
                type: 'POST',
                url: '/'
            }).done(function (data, textStatus, jqXHR) {
//                 console.log(data)
                var row = data.split(";");
                for (var i = 0; i < row.length - 1; i++) {
                    user_pipe_list_data[i] = row[i];
                    var element = row[i].split("&");
                    user_pipe_list[element[1]] = element[3];
                    user_pipe_list_tt[element[1]] = row[i];
                }
                if (upd_flag) {
                    reload_user_based_interface();
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Problems when posting...');
            });
        }
    }
}


//Modal operations              

function Create(table) {

    var modal = null;
    var span = null;

//    $('#appendAddress').children().detach();
//    $('#appendService').children().detach();

    switch (table) {
        case 1:
            modal = '#AddDestRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 2:
            modal = '#AddURLRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 3:
            modal = '#AddAppRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 4:
            modal = '#AddServiceRuleModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 5:
            modal = '#CreateScheduleModal';
            span = document.getElementsByClassName("close")[0];
            setFormatRecur();
            break;
        case 6:
            modal = '#CreateAdminPipeModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 7:
            modal = '#CreateUserPipeModal';
            span = document.getElementsByClassName("close")[0];
            break;
//        case 8:
//            modal = '#AddProfileModal';
//            span = document.getElementsByClassName("close")[0];
//            break;
        case 10:
            modal = '#CreateNewURL';
            span = document.getElementsByClassName("close")[0];
            break;
        case 11:
            modal = '#CreateNewService';
            span = document.getElementsByClassName("close")[0];
            break;
        case 12:
            modal = '#CreateServiceName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 14:
            modal = '#CreatePipeSchedulesModal';
            span = document.getElementsByClassName("close")[0];
            init_user_pipes('#add_shaper_to_sched');
            $("#add_shaper_to_sched option[value='0']").remove();
            $("#add_sched_to_pipe option[value='0']").remove();
            break;
        case 15:
            modal = '#CreateMacModal';
            span = document.getElementsByClassName("close")[0];
            break;
        case 16:
            modal = '#CreateAddrProfName';
            span = document.getElementsByClassName("close")[0];
            break;
        case 17:
            modal = '#AddAddrProfModal';
            span = document.getElementsByClassName("close")[1];
            break;
        default:
            alert("Unable to Create new entry in the Table!");
    }

    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (ACTIVE_AD) {
        $('.ad_display').show();
    }
    if (ACTIVE_DHCP) {
        $('.dhcp_display').show();
    }
}

function Edit(table) {

    var modal = null;
    var span = null;
    rowData = null;
    portCount = 0;

//    $('#editAddress').children().detach();
//    $('#editService').children().detach();
//    $('#appendService').children().detach();
    $('#editSchedule').children().detach();

    switch (table) {
        case 1:
            modal = '#EditDestRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_dest_rule_edit_modal_elements();
            break;
        case 2:
            modal = '#EditURLRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_url_rule_edit_modal_elements();
            break;
        case 3:
            modal = '#EditAppRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_app_rule_edit_modal_elements();
            break;
        case 4:
            modal = '#EditServiceRuleModal';
            span = document.getElementsByClassName("close")[1];
            set_serv_rule_edit_modal_elements();
            break;
        case 5:
            modal = '#EditScheduleModal';
            span = document.getElementsByClassName("close")[1];
            EditScheduleTableModalElements('editSchedule');
            EditScheduleTableModal();
            break;
        case 6:
            modal = '#EditAdminPipeModal';
            span = document.getElementsByClassName("close")[1];
            set_admin_pipe_table_modal_elements();
            break;
        case 7:
            modal = '#EditUserPipeModal';
            span = document.getElementsByClassName("close")[1];
            set_user_pipe_table_modal_elements();
            break;
//        case 8:
//            modal = '#EditProfileModal';
//            span = document.getElementsByClassName("close")[1];
//            break;
        case 14:
            modal = '#EditPipeSchedulesModal';
            span = document.getElementsByClassName("close")[1];
            SetPipeScheduleTableModalElements();
            $("#add_shaper_to_sched option[value='0']").remove();
            $("#edit_sched_to_pipe option[value='0']").remove();
            break;
        case 15:
            modal = '#EditMacModal';
            span = document.getElementsByClassName("close")[1];
            set_mac_table_modal_elements();
            break;
        default:
            alert("Unable to Delete entry in the Table!");
    }
//    console.log(document.getElementsByClassName("close"))
    $(modal).show();

    span.onclick = function () {
        $(modal).hide();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            $(modal).hide();
        }
    };

    if (ACTIVE_AD) {
        $('.ad_display').show();
    }
    if (ACTIVE_DHCP) {
        $('.dhcp_display').show();
    }
}

function Delete(table) {

    switch (table) {
        case 1:
            delete_ml_dest_rule((dest_rule_table.row('.selected').data())[0], (dest_rule_table.row('.selected').data())[1]);
            break;
        case 2:
            delete_ml_url_rule((url_rule_table.row('.selected').data())[0], (url_rule_table.row('.selected').data())[1]);
            break;
        case 3:
            delete_ml_app_rule((app_rule_table.row('.selected').data())[0], (app_rule_table.row('.selected').data())[1]);
            break;
        case 4:
            delete_ml_serv_rule((service_rule_table.row('.selected').data())[0], (service_rule_table.row('.selected').data())[1]);
            break;
        case 5:
            delete_ml_schedule((schedule_table.row('.selected').data())[0], (schedule_table.row('.selected').data())[1]);
            break;
        case 6:
            delete_ml_admin_pipe((admin_pipe_table.row('.selected').data())[0]);
            break;
        case 7:
            delete_ml_user_pipe((user_pipe_table.row('.selected').data())[0], (user_pipe_table.row('.selected').data())[1]);
            break;
//        case 8:
//            delete_nw_user_account((profile_table.row('.selected').data())[0], (profile_table.row('.selected').data())[2]);
//            break;
        case 9:
            delete_ml_url_rule
            delete_wo_url_from_prof((url_rule_table.row('.selected').data())[0], url_prof_id);
            break;
        case 10:
            delete_wo_url_from_list((url_list_table.row('.selected').data())[0]);
            break;
        case 11:
            delete_wo_service_from_list((service_list_table.row('.selected').data())[0]);
            break;
        case 12:
            delete_wo_service_prof((service_prof_table.row('.selected').data())[0]);
            break;
        case 13:
//            delete_wo_service_from_prof((service_rule_table.row('.selected').data())[0], service_prof_id);
//            break;
        case 14:
            delete_wo_sched_shaper((pipe_schedules_table.row('.selected').data())[0]);
            break;
        case 15:
            delete_wo_mac_from_list((mac_list_table.row('.selected').data())[0]);
            break;
        case 16:
            delete_wo_addr_prof((addr_prof_table.row('.selected').data())[0]);
            break;
        case 17:
            delete_wo_addr_from_prof((addr_prof_content_table.row('.selected').data())[0], (addr_prof_content_table.row('.selected').data())[1]);
            break;
        default:
            alert("Unable to delete data!");
    }
    Clear();
}

function Clear() {
    $('.edit, .reset, .delete').attr('disabled', true);
//    $('.create').attr('disabled', false);
    selectedRowCount = 0;
}

append_sched_def_modal_shapers = function (type, modal, sched_act, def_act, dlink_pipe, ulink_pipe, append_div, sched_append_div, def_append_div, ss_size, sa_size, aa_size) {

//    console.log(type, modal, sched_act, def_act, dlink_pipe, ulink_pipe, append_div, sched_append_div, def_append_div, ss_size, sa_size, aa_size);

    $('#' + append_div).children().detach();

    if ($("#" + def_act + " option:selected").val() === '2') {

        var def_pipes = "<label class='drop_down_label'> " + type + " Downlink Pipe : </label>" +
                "<select id='" + dlink_pipe + "' class='field_prop'>" +
                "</select> <br><br>" +
                "<label class='drop_down_label'> " + type + " Uplink Pipe : </label>" +
                "<select id='" + ulink_pipe + "' class='field_prop'>" +
                "</select> <br><br>";

        if ($("#" + sched_act + " option:selected").val() === '2') {
            $('#' + modal).css({'height': '100%', 'max-height': ss_size});
            $('#' + append_div).append(def_pipes);
        } else {
            $('#' + modal).css({'height': '100%', 'max-height': sa_size});
            $('#' + append_div).append(def_pipes);
            $('#' + sched_append_div).children().detach();
        }

        init_user_pipes('#' + dlink_pipe);
        init_user_pipes('#' + ulink_pipe);
    } else {
        if ($("#" + sched_act + "  option:selected").val() === '2') {
            $('#' + modal).css({'height': '100%', 'max-height': sa_size});
            var def_pipes = "<label class='drop_down_label'> " + type + " Downlink Pipe : </label>" +
                    "<select id='" + dlink_pipe + "' class='field_prop'>" +
                    "</select> <br><br>" +
                    "<label class='drop_down_label'> " + type + " Uplink Pipe : </label>" +
                    "<select id='" + ulink_pipe + "' class='field_prop'>" +
                    "</select> <br><br>";

            $('#' + append_div).append(def_pipes);
            init_user_pipes('#' + dlink_pipe);
            init_user_pipes('#' + ulink_pipe);
            $('#' + def_append_div).children().detach();

        } else {
//            console.log("Innnn")
            $('#' + modal).css({'height': '100%', 'max-height': aa_size});
//            $('#' + append_div).children().detach();
        }
    }
};

function set_rule_table_pipes(window, id) {

    var table;
    var type;

    switch (window) {
        case WINDOW_RULE_DESTINATIONS:
            table = dest_rule_table;
            type = 'dest';
            break;
        case WINDOW_RULE_URL:
            table = url_rule_table;
            type = 'url';
            break;
        case WINDOW_RULE_APPLICATIONS:
            table = app_rule_table;
            type = 'app';
            break;
        case WINDOW_RULE_SERVICE:
            table = service_rule_table;
            type = 'serv';
            break;
    }

    var rule_data = table.row('.selected').data();

//    $('#editPipes').children().detach();
//    console.log(rule_data)

    $("#edit_" + type + "_rule_schedule option").filter(function () {
        return this.text === rule_data[id];
    }).prop('selected', true);

    $("#edit_sched_" + type + "_rule_action option").filter(function () {
        return this.text === rule_data[id + 1];
    }).prop('selected', true);

    $("#edit_def_" + type + "_rule_action option").filter(function () {
        return this.text === rule_data[id + 4];
    }).prop('selected', true);

    switch (window) {
        case WINDOW_RULE_DESTINATIONS:

            append_sched_def_modal_shapers('Scheduled', 'EditDestRuleModalContent', 'edit_sched_dest_rule_action', 'edit_def_dest_rule_action', 'edit_dest_rule_sched_dlink_pipe',
                    'edit_dest_rule_sched_ulink_pipe', 'edit_sched_pipes_dest_rule', 'edit_sched_pipes_dest_rule', 'edit_def_pipes_dest_rule', '505px', '415px', '325px');

            append_sched_def_modal_shapers('Default', 'EditDestRuleModalContent', 'edit_sched_dest_rule_action', 'edit_def_dest_rule_action', 'edit_dest_rule_def_dlink_pipe',
                    'edit_dest_rule_def_ulink_pipe', 'edit_def_pipes_dest_rule', 'edit_sched_pipes_dest_rule', 'edit_def_pipes_dest_rule', '505px', '415px', '325px');
            break;
        case WINDOW_RULE_URL:

            append_sched_def_modal_shapers('Scheduled', 'EditURLRuleModalContent', 'edit_sched_url_rule_action', 'edit_def_url_rule_action', 'edit_url_rule_sched_dlink_pipe',
                    'edit_url_rule_sched_ulink_pipe', 'edit_sched_pipes_url_rule', 'edit_sched_pipes_url_rule', 'edit_def_pipes_url_rule', '555px', '465px', '375px');
            append_sched_def_modal_shapers('Default', 'EditURLRuleModalContent', 'edit_sched_url_rule_action', 'edit_def_url_rule_action', 'edit_url_rule_def_dlink_pipe',
                    'edit_url_rule_def_ulink_pipe', 'edit_def_pipes_url_rule', 'edit_sched_pipes_url_rule', 'edit_def_pipes_url_rule', '555px', '465px', '375px');
            break;
        case WINDOW_RULE_APPLICATIONS:

            append_sched_def_modal_shapers('Scheduled', 'EditAppRuleModalContent', 'edit_sched_app_rule_action', 'edit_def_app_rule_action', 'edit_app_rule_sched_dlink_pipe',
                    'edit_app_rule_sched_ulink_pipe', 'edit_sched_pipes_app_rule', 'edit_sched_pipes_app_rule', 'edit_def_pipes_app_rule', '490px', '400px', '310px');
            append_sched_def_modal_shapers('Default', 'EditAppRuleModalContent', 'edit_sched_app_rule_action', 'edit_def_app_rule_action', 'edit_app_rule_def_dlink_pipe',
                    'edit_app_rule_def_ulink_pipe', 'edit_def_pipes_app_rule', 'edit_sched_pipes_app_rule', 'edit_def_pipes_app_rule', '490px', '400px', '310px');
            break;
        case WINDOW_RULE_SERVICE:

            append_sched_def_modal_shapers('Scheduled', 'EditServiceRuleModalContent', 'edit_sched_serv_rule_action', 'edit_def_serv_rule_action', 'edit_serv_rule_sched_dlink_pipe',
                    'edit_serv_rule_sched_ulink_pipe', 'edit_sched_pipes_serv_rule', 'edit_sched_pipes_serv_rule', 'edit_def_pipes_serv_rule', '535px', '445px', '355px');
            append_sched_def_modal_shapers('Default', 'EditServiceRuleModalContent', 'edit_sched_serv_rule_action', 'edit_def_serv_rule_action', 'edit_serv_rule_def_dlink_pipe',
                    'edit_serv_rule_def_ulink_pipe', 'edit_def_pipes_serv_rule', 'edit_sched_pipes_serv_rule', 'edit_def_pipes_serv_rule', '535px', '445px', '355px');
            break;
    }

    if (rule_data[id + 1] === 'Shape') {
        $("#edit_" + type + "_rule_sched_dlink_pipe option").filter(function () {
            return this.text === rule_data[id + 2];
        }).prop('selected', true);
        $("#edit_" + type + "_rule_sched_ulink_pipe option").filter(function () {
            return this.text === rule_data[id + 3];
        }).prop('selected', true);
    }

    if (rule_data[id + 4] === 'Shape') {
        $("#edit_" + type + "_rule_def_dlink_pipe option").filter(function () {
            return this.text === rule_data[id + 5];
        }).prop('selected', true);
        $("#edit_" + type + "_rule_def_ulink_pipe option").filter(function () {
            return this.text === rule_data[id + 6];
        }).prop('selected', true);
    }

    if (rule_data[id] === 'None') {
        $("#edit_sched_" + type + "_rule_action").attr('disabled', true);
    }
}

// Common functions

function init_admin_pipes(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (admin_pipe_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in admin_pipe_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(admin_pipe_list[u_item]));
    }
}

function init_user_pipes(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (user_pipe_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in user_pipe_list) {
        $(div)
                .append($('<option>', {value: u_item})
                        .text(user_pipe_list[u_item]));
    }
}

function init_schedule_list(div) {

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (schedule_list.length > 0) {
        $(div).empty();
    }
    for (var u_item in schedule_list) {
        $(div).append($('<option>', {value: u_item})
                .text(schedule_list[u_item]));
    }
}

function init_rule_user_list(div) {

    if (user_profile_lookup_list.length > 0) {
        $(div).empty();
    }

    $(div).append($('<option selected disabled>', {value: 0})
            .text('--Select User--'));

    for (var u_item in user_profile_lookup_list) {
        $(div).append($('<option>', {value: u_item})
                .text(user_profile_lookup_list[u_item]));
    }
}

function clear_and_init_list(div, list) {

    $(div).empty();

    $(div).append($('<option>', {value: 0})
            .text('None'));

    if (list.length > 0) {
        $(div).empty();
    }

    for (var u_item in list) {
        $(div).append($('<option>', {value: u_item})
                .text(list[u_item]));
    }
}

enable_table_controls = function (table) {

    $('#' + table).on('click', 'tbody tr', function () {

        var delay = 1;
        setTimeout(function () {
            if (selectedTableRowCount === 1) {
                $('.edit,.delete').removeAttr('disabled');
//                $('.create').attr('disabled', 'disabled');
            } else if (selectedTableRowCount === 0) {
//                $('.create').removeAttr('disabled');
                $('.edit,.delete').attr('disabled', 'disabled');
            } else {
                alert("Incorrect Input");
            }
        }, delay);
    });
};

disable_table_del_ref = function (table, table_name, disable_secondary) {

    $('#' + table).on('click', 'tbody tr', function () {

        var delay = 1;
        setTimeout(function () {

            var data = table_name.row('.selected').data();
            if (data) {
                if (parseInt(data[data.length - 1]) > 0) {
                    $('.delete').attr('disabled', true);
                } else {
                    $('.delete').attr('disabled', false);
                }
            }
            if (disable_secondary) {
                $('#' + disable_secondary).attr('disabled', true);
            }
        }, delay);
    });
};


// Dest

function Update_Dest_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    dest_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADDR_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            dest_rules[i] = row[i];
        }
        Display_Dest_Rule_Table();
        Init_WO_Param(1, 0, 1, 0);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_Dest_Rule_Table() {

    dest_rule_table.clear().draw();

    for (var i = 0; i < dest_rules.length; i++) {
        var element = dest_rules[i].split("&");

        if (element[4] === '4294967295' || element[5] === '4294967295') {
            if (element[6] === '4294967295' || element[7] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[6] === '0' || element[7] === '0') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Block', '-', '-', 'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]]]);
            }
        } else if (element[3] === '0' && (element[4] === '0' || element[5] === '0')) {
            if (element[6] === '4294967295' || element[7] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[6] === '0' || element[7] === '0') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'N/A', '-', '-', 'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]]]);
            }
        } else if (element[3] !== '0' && (element[4] === '0' || element[5] === '0')) {
            if (element[6] === '4294967295' || element[7] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[6] === '0' || element[7] === '0') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Allow', '-', '-', 'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]]]);
            }
        } else {
            if (element[6] === '4294967295' || element[7] === '4294967295') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Shape', user_pipe_list[element[4]], user_pipe_list[element[5]], 'Block', '-', '-']);
            } else if (element[6] === '0' || element[7] === '0') {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Shape', user_pipe_list[element[4]], user_pipe_list[element[5]], 'Allow', '-', '-']);
            } else {
                dest_rule_table.row.add([element[0], element[1], num2dot(element[2]), schedule_list[element[3]], 'Shape', user_pipe_list[element[4]], user_pipe_list[element[5]], 'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]]]);
            }
        }
    }
    dest_rule_table.draw(false);
}

function set_dest_rule_edit_modal_elements() {
    var rule_data = dest_rule_table.row('.selected').data();
    $("#editDestRuleIP").val(rule_data[2]).attr("disabled", true);
    set_rule_table_pipes(WINDOW_RULE_DESTINATIONS, 3);
}

//URL

function Update_URL_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    url_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_URLRULE_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            url_rules[i] = row[i];
        }
        Display_URL_Rule_Table();
        Init_WO_Param(1, 0, 1, 0);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_URL_Rule_Table() {

    url_rule_table.clear().draw();

    for (var i = 0; i < url_rules.length; i++) {
        var element = url_rules[i].split("&");

        if (element[6] === '4294967295' || element[7] === '4294967295') {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), element[3], get_dns_det(element[4]), schedule_list[element[5]],
                    'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Block', '-', '-', 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        } else if (element[5] === '0' && (element[6] === '0' || element[7] === '0')) {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'N/A', '-', '-', 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        } else if (element[5] !== '0' && (element[6] === '0' || element[7] === '0')) {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Allow', '-', '-', 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        } else {
            if (element[8] === '4294967295' || element[9] === '4294967295') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]], 'Block', '-', '-']);
            } else if (element[8] === '0' || element[9] === '0') {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]], 'Allow', '-', '-']);
            } else {
                url_rule_table.row.add([element[0], element[1], get_authentiation(element[2]), get_dns_det(element[3]), element[4], schedule_list[element[5]],
                    'Shape', user_pipe_list[element[6]], user_pipe_list[element[7]], 'Shape', user_pipe_list[element[8]], user_pipe_list[element[9]]]);
            }
        }
    }
    url_rule_table.draw(false);
}

get_authentiation = function (id) {
    switch (id) {
        case '1':
            return 'HTTP';
            break;
        case '2':
            return 'HTTPS';
            break;
        case '3':
            return 'HTTP or HTTPS';
            break;
    }

};

get_dns_det = function (id) {
    switch (id) {
        case '0':
            return 'Disabled';
            break;
        case '1':
            return 'Enabled';
            break;
    }
};

function set_url_rule_edit_modal_elements() {

    var rule_data = url_rule_table.row('.selected').data();

    $("#edit_url_rule_authen option").filter(function () {
        return this.text === rule_data[2];
    }).prop('selected', true);
    $("#edit_url_rule_authen").attr("disabled", true);

    $("#edit_url_rule_dns_det option").filter(function () {
        return this.text === rule_data[3];
    }).prop('selected', true);
    $("#edit_url_rule_dns_det").attr("disabled", true);

    $("#edit_url_to_rule").val(rule_data[4]).attr("disabled", true);
    set_rule_table_pipes(WINDOW_RULE_URL, 5);
}
// Applications

function Update_App_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    app_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_APPRULE_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_rules[i] = row[i];
        }
        Display_App_Rule_Table();
        Init_WO_Param(1, 0, 1, 0);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_App_Rule_Table() {

    app_rule_table.clear().draw();

    for (var i = 0; i < app_rules.length; i++) {
        var element = app_rules[i].split("&");

        if (element[3] === '4294967295' || element[4] === '4294967295') {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Block', '-', '-', 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        } else if (element[2] === '0' && (element[3] === '0' || element[4] === '0')) {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'N/A', '-', '-', 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        } else if (element[2] !== '0' && (element[3] === '0' || element[4] === '0')) {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Allow', '-', '-', 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        } else {
            if (element[5] === '4294967295' || element[6] === '4294967295') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Shape', user_pipe_list[element[3]], user_pipe_list[element[4]], 'Block', '-', '-']);
            } else if (element[5] === '0' || element[6] === '0') {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Shape', user_pipe_list[element[3]], user_pipe_list[element[4]], 'Allow', '-', '-']);
            } else {
                app_rule_table.row.add([element[0], element[1], application_list[element[1]], schedule_list[element[2]], 'Shape', user_pipe_list[element[3]], user_pipe_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]]]);
            }
        }
    }
    app_rule_table.draw(false);
}

function set_app_rule_edit_modal_elements() {
    var rule_data = app_rule_table.row('.selected').data();
    $("#editAddedApp").val(rule_data[2]).attr("disabled", true);
    set_rule_table_pipes(WINDOW_RULE_APPLICATIONS, 3);
}

//Services

function Update_Service_Rules(user_id) {
    var cookie = $.cookie('pqsf');
    serv_rules = [];
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SVSITEM_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            serv_rules[i] = row[i];
        }
        Display_Service_Rule_Table();
        Init_WO_Param(1, 0, 1, 0);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
}

function Display_Service_Rule_Table() {

    service_rule_table.clear().draw();

    for (var i = 0; i < serv_rules.length; i++) {
        var element = serv_rules[i].split("&");

        if (element[5] === '4294967295' || element[6] === '4294967295') {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Block', '-', '-', 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Block', '-', '-', 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Block', '-', '-', 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        } else if (element[4] === '0' && (element[5] === '0' || element[6] === '0')) {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'N/A', '-', '-', 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'N/A', '-', '-', 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'N/A', '-', '-', 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        } else if (element[4] !== '0' && (element[5] === '0' || element[6] === '0')) {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Allow', '-', '-', 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Allow', '-', '-', 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Allow', '-', '-', 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        } else {
            if (element[7] === '4294967295' || element[8] === '4294967295') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]], 'Block', '-', '-']);
            } else if (element[7] === '0' || element[8] === '0') {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]], 'Allow', '-', '-']);
            } else {
                service_rule_table.row.add([element[0], element[1], element[2], get_service_type(element[3]), schedule_list[element[4]], 'Shape', user_pipe_list[element[5]], user_pipe_list[element[6]], 'Shape', user_pipe_list[element[7]], user_pipe_list[element[8]]]);
            }
        }
    }
    service_rule_table.draw(false);
}

function set_serv_rule_edit_modal_elements() {
    var rule_data = service_rule_table.row('.selected').data();

    $("#edit_serv_rule_port").val(rule_data[1]).attr("disabled", true);

    $("#edit_serv_rule_protocol option").filter(function () {
        return this.text === rule_data[3];
    }).prop('selected', true);

    $("#edit_serv_rule_protocol").attr("disabled", true);

    set_rule_table_pipes(WINDOW_RULE_SERVICE, 4);
}

get_service_type = function (id) {
    if (id === '1') {
        return 'TCP';
    } else if (id === '2') {
        return 'UDP';
    } else if (id === '3') {
        return 'Any';
    }
};



///////////////////////////////////

function Update_Admin_Pipe_List() {

    admin_pipe_list = [];
    admin_pipe_list_data = [];
    admin_pipe_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_ADMIN_SHAPER_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            admin_pipe_list_data[i] = row[i];
            var element = row[i].split("&");
            admin_pipe_list[element[0]] = element[1];
            admin_pipe_list_tt[element[0]] = row[i];
        }
        Display_Admin_Pipe_Table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Admin_Pipe_Table() {
    admin_pipe_table.clear().draw();
    for (var i = 0; i < admin_pipe_list_data.length; i++) {
        var element = admin_pipe_list_data[i].split("&");
        admin_pipe_table.row.add([element[0], element[1], element[2], element[3], element[4]]);
    }
    admin_pipe_table.draw(false);
}

pipe_priority = function (id) {
    if (id === '1') {
        return 'Low';
    } else if (id === '50') {
        return 'Medium';
    } else if (id === '0') {
        return 'High';
    } else
        return 'Error';
};

set_pipe_type = function (sel_1, sel_2) {
    var sh_type = $(sel_1).val();
    var grp_type = $(sel_2).val();

    if (sh_type === '0') {
        if (grp_type === '0')
            return 1;
        else if (grp_type === '1')
            return 2;
        else
            return 3;
    } else {
        if (grp_type === '0')
            return 4;
        else if (grp_type === '1')
            return 5;
        else
            return 6;
    }
};

get_pipe_type = function (id, flag) {

    if (flag === 0) {
        switch (parseInt(id)) {
            case 1:
            case 2:
            case 3:
                return 'Per-IP';
            case 4:
            case 5:
            case 6:
                return 'Shared';
        }
    } else {
        switch (parseInt(id)) {
            case 1:
            case 4:
                return 'Per-Item';
                break;
            case 2:
            case 5:
                return 'Per-Profile';
                break;
            case 3:
            case 6:
                return 'Per-Rule';
                break;
        }
    }
};

function set_admin_pipe_table_modal_elements() {
    var pipe_data = admin_pipe_table.row('.selected').data();
    $("#editAdminPipeName").val(pipe_data[1]);
    $("#editAdminPipeGuarantBW").val(pipe_data[2]);
    $("#editAdminPipeMaxBW").val(pipe_data[3]);
}

////////////////////

function Update_User_Pipe_List(user_id) {

    user_pipe_list = [];
    user_pipe_list_data = [];
    user_pipe_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_USER_SHAPER_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data)
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            user_pipe_list_data[i] = row[i];
            var element = row[i].split("&");
            user_pipe_list[element[1]] = element[3];
            user_pipe_list_tt[element[1]] = row[i];
        }
        Display_User_Pipe_Table();
        Init_WO_Param(0, 1, 0, 0);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_User_Pipe_Table() {
    user_pipe_table.clear().draw();
    for (var i = 0; i < user_pipe_list_data.length; i++) {
        var element = user_pipe_list_data[i].split("&");
        var pipe_elem = admin_pipe_list_tt[element[2]].split('&');
        user_pipe_table.row.add([element[0], element[1], element[2], element[3], get_pipe_type(element[5], 0), get_pipe_type(element[5], 1), pipe_elem[2], pipe_elem[3], pipe_priority(element[4]), element[6]]);
    }
    user_pipe_table.draw(false);
}

function set_user_pipe_table_modal_elements() {
    var pipe_data = user_pipe_table.row('.selected').data();
    $("#edit_user_admin_pipe option").filter(function () {
        return this.text === admin_pipe_list[pipe_data[2]];
    }).prop('selected', true);
    $("#editUserPipeName").val(pipe_data[3]);
    $("#editUserPipeType option").filter(function () {
        return this.text === pipe_data[4];
    }).prop('selected', true);
    $("#editUserPipeType").attr("disabled", true);
    $("#editUserGroupingType option").filter(function () {
        return this.text === pipe_data[5];
    }).prop('selected', true);
    $("#editUserGroupingType").attr("disabled", true);
    $("#editUserPipeGuarantBW").val(pipe_data[6]).attr("disabled", true);
    $("#editUserPipeMaxBW").val(pipe_data[7]).attr("disabled", true);
    $("#editUserPipePriority option").filter(function () {
        return this.text === pipe_data[8];
    }).prop('selected', true);
    $("#editUserPipePriority").attr("disabled", true);
}
////////

function Update_Schedule_List(user_id) {

    schedule_list = [];
    schedule_list_data = [];
    schedule_list_tt = [];
    var cookie = $.cookie('pqsf');

    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, WO_GET_SCHD_LIST, 0);
    req[1] = user_id;

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        schedule_list[0] = 'None';
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            schedule_list_data[i] = row[i];
            var element = row[i].split("&");
            schedule_list[element[1]] = element[2];
            schedule_list_tt[element[1]] = row[i];
        }
        Display_Schedule_Table();

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Schedule_Table() {
    schedule_table.clear().draw();
    for (var i = 0; i < schedule_list_data.length; i++) {
        var element = schedule_list_data[i].split("&");
        if (Schedule_Type(element[3]) === "Weekly Recurring") {
            schedule_table.row.add([element[0], element[1], element[2], Schedule_Type(element[3]), decode_days_of_week(element[4]), moment(element[5] * 1000).format("hh:mm a"), moment(element[6] * 1000).format("hh:mm a"), element[7]]);
        } else
            schedule_table.row.add([element[0], element[1], element[2], Schedule_Type(element[3]), Schedule_One_Time_Days(element[5], element[6]), moment(element[5] * 1000).format("hh:mm a"), moment(element[6] * 1000).format("hh:mm a"), element[7]]);
    }
    schedule_table.draw(false);
}

Schedule_Type = function (id) {
    if (id === '21') {
        return 'Weekly Recurring';
    } else if (id === '22') {
        return 'One Time';
    } else
        return 'Error';
};

Schedule_One_Time_Days = function (start, end) {
    var start_date = moment(start * 1000).format("Do MMMM YYYY");
    var end_date = moment(end * 1000).format("Do MMMM YYYY");
    if (start_date === end_date) {
        return start_date;
    } else
        return start_date + " - " + end_date;
};

function EditScheduleTableModal() {

    var schd_data = schedule_table.row('.selected').data();
    $("#editScheduleName").val(schd_data[2]);
//    $("#editScheduleName").attr('disabled', true);
    $("#ScheduleCodeEdit").val(schd_data[3]);
    $("#ScheduleCodeEdit").attr('disabled', true);

    if (schd_data[3] === "Weekly Recurring") {
        for (var i = 0; i < schd_data[4].length; i++) {
            switch (schd_data[4][i]) {

                case 'Monday':
                    $('#RecurE_1').prop('checked', true);
                    break;
                case 'Tuesday':
                    $('#RecurE_2').prop('checked', true);
                    break;
                case 'Wednesday':
                    $('#RecurE_3').prop('checked', true);
                    break;
                case 'Thursday':
                    $('#RecurE_4').prop('checked', true);
                    break;
                case 'Friday':
                    $('#RecurE_5').prop('checked', true);
                    break;
                case 'Saturday':
                    $('#RecurE_6').prop('checked', true);
                    break;
                case 'Sunday':
                    $('#RecurE_7').prop('checked', true);
                    break;
                default:
                    return -1;
            }
        }
        var st_date = moment(schd_data[5], "hh:mm a").unix();
        var end_date = moment(schd_data[6], "hh:mm a").unix();
        $("#editStartTimeRecur").val(moment(st_date * 1000).format("hh:mmA"));
        $("#editEndTimeRecur").val(moment(end_date * 1000).format("hh:mmA"));
    } else if (schd_data[3] === "One Time") {

        var date = [];
        if (schd_data[4].indexOf('-') > -1) {
            date = schd_data[4].split("- ");
        } else {
            date[0] = schd_data[4];
            date[1] = schd_data[4];
        }
        var st_date = moment(date[0] + schd_data[5], "Do MMMM YYYY hh:mm a").unix();
        var end_date = moment(date[1] + ' ' + schd_data[6], "Do MMMM YYYY hh:mm a").unix();
        $("#edit_sched_startDateTimePeriod").val(moment(st_date * 1000).format("MMMM Do YYYY - hh:mm a"));
        $("#edit_sched_endDateTimePeriod").val(moment(end_date * 1000).format("MMMM Do YYYY - hh:mm a"));

    } else {
        alert("Error");
    }
}

function SetScheduleTableModalElements(opt, append_div) {

    var plot = null;
    if (opt === "Weekly Recurring") {

        $('#CreateScheduleModalContent').css({height: '440px'});

        plot = "<label class='drop_down_label'> Days : </label>" +
                "<input type='checkbox' style='margin-left: 118px' id='Recur_1'> <label class='check_box_prop'>Monday </label>" +
                "<input type='checkbox' style='margin-left: 41px' id='Recur_2'> <label class='check_box_prop'>Tuesday</label><br>" +
                "<input type='checkbox' style='margin-left: 154px' id='Recur_3'> <label class='check_box_prop'>Wednesday</label>" +
                "<input type='checkbox' style='margin-left: 20px' id='Recur_4'> <label class='check_box_prop'>Thursday</label><br>" +
                "<input type='checkbox' style='margin-left: 154px' id='Recur_5'> <label class='check_box_prop'>Friday</label>" +
                "<input type='checkbox' style='margin-left: 50px' id='Recur_6'> <label class='check_box_prop'>Saturday</label><br>" +
                "<input type='checkbox' style='margin-left: 154px' id='Recur_7'> <label class='check_box_prop'>Sunday</label><br><br>" +
                "<label class='drop_down_label'> Start Time : </label>" +
                "<input type='text' id='startTimeRecur' class='clockpicker field_prop' placeholder='Start Time' style='margin-left: 90px; text-indent: 5px'><br><br>" +
                "<label class='drop_down_label'> End Time : </label>" +
                "<input type='text' id='endTimeRecur' class='clockpicker field_prop' placeholder='End Time' style='margin-left: 90px; text-indent: 5px'><br>";

        $('#' + append_div).append(plot);
        setFormatRecur();
    } else if (opt === "One Time") {

        $('#CreateScheduleModalContent').css({height: '350px'});

        plot = "<label class='drop_down_label'> Start Date & Time : </label>" +
                "<input type='text' id='startDateTimePeriod' placeholder='Start date and time' class='field_prop_reporting' style='margin-left: 50px; font-size: 12px; color:black; width: 200px; text-indent: 5px' ><br><br>" +
                "<label class='drop_down_label'> End Date & Time : </label>" +
                "<input type='text' id='endDateTimePeriod' placeholder='End date and time' class='field_prop_reporting'  style='margin-left: 55px; font-size: 12px; color:black; width: 200px; text-indent: 5px'> <br><br>";

        $('#' + append_div).append(plot);
        setFormatPeriod('#startDateTimePeriod', '#endDateTimePeriod');
    } else {
        alert("Please select one option from the Field!");
    }
}

function EditScheduleTableModalElements(append_div) {

    var opt = schedule_table.row('.selected').data()[3];
    var plot = null;
    if (opt === "Weekly Recurring") {

        $('#EditScheduleModalContent').css({height: '440px'});

        plot = "<label class='drop_down_label'> Days : </label>" +
                "<input type='checkbox' style='margin-left: 121px' id='RecurE_7'> <label class='check_box_prop'>Sunday</label>" +
                "<input type='checkbox' style='margin-left: 41px' id='RecurE_4'> <label class='check_box_prop'>Thursday</label><br>" +
                "<input type='checkbox' style='margin-left: 159px' id='RecurE_1'> <label class='check_box_prop'>Monday </label>" +
                "<input type='checkbox' style='margin-left: 38px' id='RecurE_5'> <label class='check_box_prop'>Friday</label><br>" +
                "<input type='checkbox' style='margin-left: 159px' id='RecurE_2'> <label class='check_box_prop'>Tuesday</label>" +
                "<input type='checkbox' style='margin-left: 35px' id='RecurE_6'> <label class='check_box_prop'>Saturday</label><br>" +
                "<input type='checkbox' style='margin-left: 159px' id='RecurE_3'> <label class='check_box_prop'>Wednesday</label><br><br>" +
                "<label class='drop_down_label'> Start Time : </label>" +
                "<input type='text' id='editStartTimeRecur' class='clockpicker field_prop' placeholder='Start Time' style='margin-left: 90px; text-indent: 5px'><br><br>" +
                "<label class='drop_down_label'> End Time : </label>" +
                "<input type='text' id='editEndTimeRecur' class='clockpicker field_prop' placeholder='End Time' style='margin-left: 90px; text-indent: 5px'><br>";

        $('#' + append_div).append(plot);
        editFormatRecur();
    } else if (opt === "One Time") {

        $('#EditScheduleModalContent').css({height: '350px'});

        plot = "<label class='drop_down_label'> Start Date & Time : </label>" +
                "<input type='text' id='edit_sched_startDateTimePeriod' placeholder='Start date and time' class='field_prop_reporting' style='margin-left: 50px; font-size: 12px; color:black; width: 200px; text-indent: 5px' ><br><br>" +
                "<label class='drop_down_label'> End Date & Time : </label>" +
                "<input type='text' id='edit_sched_endDateTimePeriod' placeholder='End date and time' class='field_prop_reporting'  style='margin-left: 55px; font-size: 12px; color:black; width: 200px; text-indent: 5px'> <br><br>";

        $('#' + append_div).append(plot);
        setFormatPeriod('#edit_sched_startDateTimePeriod', '#edit_sched_endDateTimePeriod');
    } else {
        alert("Error in Schedule!");
    }
}

var recur_st = null;
var recur_et = null;

function setFormatRecur() {

    $('#startTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time',
        'default': 'now'
    }).change(function () {
        recur_st = moment(this.value, "hh-mm-A") / 1000;
    });

    $('#endTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time',
        'default': 'now'
    }).change(function () {
        recur_et = moment(this.value, "hh-mm-A") / 1000;
    });
}

function editFormatRecur() {

    $('#editStartTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time'
    }).change(function () {
        recur_st = moment(this.value, "hh-mm-A") / 1000;
    });

    $('#editEndTimeRecur').clockpicker({
        twelvehour: true,
        placement: 'bottom',
        align: 'left',
        donetext: 'Add Time'
    }).change(function () {
        recur_et = moment(this.value, "hh-mm-A") / 1000;
    });
}

function setFormatPeriod(s_t, e_t) {

    $(s_t).datetimepicker({
        format: "MMM Do YYYY - h:mm a",
        sideBySide: true,
        viewMode: "days",
        minDate: Date.now(),
        showClear: true,
        showClose: true
    });
    $(e_t).datetimepicker({
        format: "MMM Do YYYY - h:mm a",
        sideBySide: true,
        viewMode: "days",
        minDate: Date.now(),
        showClear: true,
        showClose: true
    });

//get value when datetimepicker value is changed

    $(s_t).on("dp.change", function (e) {
        if ($(s_t).val() !== '') {
            $(e_t).data("DateTimePicker").minDate(e.date);
        }
    });
}

checked_days = function (id) {
    if ($("#Recur_" + id).is(":checked")) {
        return 1;
    } else
        return 0;
};

checkedE_days = function (id) {
    if ($("#RecurE_" + id).is(":checked")) {
        return 1;
    } else
        return 0;
};

var encode_days_of_week = function (mon, tue, wed, thu, fri, sat, sun) {
    var out = mon + (tue << 2) + (wed << 4) + (thu << 6) + (fri << 8) + (sat << 10) + (sun << 12);
//    console.log(out)
    return out;
};

var decode_days_of_week = function (val) {
    var days = [];
    var d = {
        Monday: val & 0x3,
        Tuesday: (val >> 2) & 0x3,
        Wednesday: (val >> 4) & 0x3,
        Thursday: (val >> 6) & 0x3,
        Friday: (val >> 8) & 0x3,
        Saturday: (val >> 10) & 0x3,
        Sunday: (val >> 12) & 0xFFFFF
    };

    for (var u_item in d) {
        if (d[u_item] === 1) {
            days.push(u_item);
        }
    }
    return days;
};

// User related

function set_user_for_rules() {
    global_rule_user = parseInt($("#rule_user_modal_dropdown option:selected").val());
    $("#rule_user_label").text(user_profile_lookup_list[global_rule_user]);
    document.getElementById('RuleUserModal').style.display = "none";
//    reload_user_based_interface();
    Init_WO_Param(1, 1, 1, 1);
}

get_first_rule_user_index = function (e) {
    var user;
    var index;
    if (user_profile_lookup_list.length) {
        user = user_profile_lookup_list.find(function (e) {
            return !!e
        });
        index = user_profile_lookup_list.indexOf(user);
        return index;
    } else
        return 0;
};


get_user_based_rules = function () {

    switch (CURRENT_WINDOW) {

        case WINDOW_RULE_DESTINATIONS:

            clear_and_init_list('#add_dest_rule_schedule', schedule_list);
            clear_and_init_list('#edit_dest_rule_schedule', schedule_list);
            clear_and_init_list('#add_dest_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_dest_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_dest_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_dest_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_dest_rule_def_ulink_pipe', user_pipe_list);

            Update_Dest_Rules(global_rule_user);
            break;
        case WINDOW_RULE_URL:

            clear_and_init_list('#add_url_rule_schedule', schedule_list);
            clear_and_init_list('#edit_url_rule_schedule', schedule_list);
            clear_and_init_list('#add_url_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_url_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_url_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_url_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_url_rule_def_ulink_pipe', user_pipe_list);

            Update_URL_Rules(global_rule_user);
            break;
        case WINDOW_RULE_APPLICATIONS:

            clear_and_init_list('#add_app_rule_schedule', schedule_list);
            clear_and_init_list('#edit_app_rule_schedule', schedule_list);
            clear_and_init_list('#add_app_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_app_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_app_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_app_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_app_rule_def_ulink_pipe', user_pipe_list);

            Update_App_Rules(global_rule_user);
            break;
        case WINDOW_RULE_SERVICE:

            clear_and_init_list('#add_serv_rule_schedule', schedule_list);
            clear_and_init_list('#edit_serv_rule_schedule', schedule_list);
            clear_and_init_list('#add_serv_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_sched_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_serv_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_sched_ulink_pipe', user_pipe_list);
            clear_and_init_list('#add_serv_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_def_dlink_pipe', user_pipe_list);
            clear_and_init_list('#add_serv_rule_def_ulink_pipe', user_pipe_list);
            clear_and_init_list('#edit_serv_rule_def_ulink_pipe', user_pipe_list);

            Update_Service_Rules(global_rule_user);
            break;
        case WINDOW_OBJ_SCHEDULE:
            Display_Schedule_Table();
            break;
        case WINDOW_OBJ_USER_PIPES:
            Display_User_Pipe_Table();
            break;

        case WINDOW_USER_SUMMARY:
            load_user_sum_window();
            break;

    }
};

reload_user_based_interface = function () {

    if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
        link_util_flag = true;
        is_bwm_app_req_init = false;
        is_app_grap_init = false;
        btn_link_util_bw_load_now(1);
    } else {
        var temp_win = CURRENT_WINDOW;
        CURRENT_WINDOW = 0;
        load_window(temp_win);
    }
};var pq_pie_update_que = [];
var pqpie_resize = function (div, pie) {
    var width = $(div).width();
    var height = $(div).height();
    var act_size = width * 0.9;
    if (width > height) {
        act_size = height * 0.9;
    }
    pie.options.size.canvasHeight = act_size;
    pie.options.size.canvasWidth = act_size;
    pie.redraw();
    $(div + " svg").css("margin-top", (height - act_size) / 2);
};

var pqpie_update_nresize = function (div, pie) {
    var width = $(div).width();
    var height = $(div).height();
    var act_size = width * 0.9;
    if (width > height) {
        act_size = height * 0.9;
    }
    $(div + " svg").css("margin-top", (height - act_size) / 2);
};

var pqpie_exec_resize_seq = function () {
    setTimeout(function () {
        var ele = pq_pie_update_que.shift();
        pqpie_resize(ele.div, ele.pie);
        if (pq_pie_update_que.length > 0) {
            pqpie_exec_resize_seq();
        }
    }, 10);
};

var pqpie_resize_loading = function (div, pie) {
    pq_pie_update_que.push({"div": div, "pie": pie});
    if (pq_pie_update_que.length === 1) {
        pqpie_exec_resize_seq();
    }
};


var pqwr_rtime;
var pqwr_timeout = false;
var pqwr_delta = 50;

$(window).resize(function () {
    pqwr_rtime = new Date();
    if (pqwr_timeout === false) {
        pqwr_timeout = true;
        setTimeout(resizeend, pqwr_delta);
    }
});

function resizeend() {
    if (new Date() - pqwr_rtime < pqwr_delta) {
        setTimeout(resizeend, pqwr_delta);
    } else {
        pqwr_timeout = false;

        if (CURRENT_WINDOW === WINDOW_LINK_SUMMARY) {
            pqpie_resize_loading("#pq_sum_src_hldr", pie_pq_sum_srcs);
            pqpie_resize_loading("#pq_sum_dest_hldr", pie_pq_sum_dests);
            pqpie_resize_loading("#pq_sum_app_hldr", pie_pq_sum_apps);
        } else if (CURRENT_WINDOW === WINDOW_SES_SES) {
            $('#Session_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Sessions_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_SOURCE) {
            $('#Source_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Sources_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_DEST) {
            $('#Destination_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Destination_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_APP) {
            $('#Application_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Applications_Holder').height() - 125));
        } else if (CURRENT_WINDOW === WINDOW_SES_SERV) {
            $('#Ses_Service_Table').closest('.dataTables_scrollBody').css('max-height', ($('#Session_Services_Holder').height() - 125));
            
        } else if (CURRENT_WINDOW === WINDOW_DASH_SOURCE ||
                CURRENT_WINDOW === WINDOW_DASH_DEST ||
                CURRENT_WINDOW === WINDOW_DASH_APP ) {

            pqpie_resize_loading("#dashPie_src_dlink", pie_pq_dashPie_dlink);
            pqpie_resize_loading("#dashPie_src_ulink", pie_pq_dashPie_ulink);
            $('#dashPie_pie_dlink_table').closest('.dataTables_scrollBody').css('height', ($('#dashPie_pie_dlink_table_holder').height() - 15));
            $('#dashPie_pie_ulink_table').closest('.dataTables_scrollBody').css('height', ($('#dashPie_pie_ulink_table_holder').height() - 15));

        } else if (CURRENT_WINDOW === WINDOW_LIVE_SERVER_WATCH) {
            pqpie_resize_loading("#pq_live_usage_pie_hlder", pie_pq_live_usage);
        }
    }
}

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
var selectedMgmtTableRowCount;
var selectedMgmtTableRowData;
var rowMgmtIndex;
var mgmt_iface_table;
var maintenance_warning_type = 0;

var init_mgmt_ifc_configuration_window = function () {
    mgmt_iface_table = $('#mgmt_iface_table').DataTable({
        select: true,
        columnDefs: [
            {targets: 0, visible: false},
            {width: '10%', targets: 1},
            {width: '20%', targets: 2},
            {width: '20%', targets: 3},
            {width: '20%', targets: 4},
            {width: '20%', targets: 5},
            {width: '10%', targets: 6},
            {orderable: false, targets: '_all'},
            {className: 'dt-center', targets: '_all'}
        ],
        scrollY: "100px",
        scrollCollapse: true,
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        createdRow: function (row, data, dataIndex) {
            if (data[4] === "1" || data[4] === "2") {
                $('td:eq(3)', row).css('background-color', '#d6ffb2');
            } else if (data[4] === "0") {
                $('td:eq(3)', row).css('background-color', '#ff9e9e');
            }
        }
    });   
  
    $('#mgmt_iface_table').on('click', 'tbody tr', function () {
        selectedMgmtTableRowData = (mgmt_iface_table.row(this).data()) + '';
        selectedMgmtTableRowCount = 0;
        rowMgmtIndex = mgmt_iface_table.row(this).index();

        var delay = 1;
        setTimeout(function () {
            selectedMgmtTableRowCount = mgmt_iface_table.rows('.selected').count();
        }, delay);
    });

    $('#mgmt_iface_table').on('click', 'tbody tr', function () {
        var delay = 1;
        setTimeout(function () {
            if (selectedMgmtTableRowCount === 1) {
                $('.edit,.delete').removeAttr('disabled');
                if (rowMgmtIndex === 0) {
                    $('#mgmt_o_mask').show();
                    $('#mgmt_t_mask').hide();
                } else {
                    $('#mgmt_t_mask').show();
                    $('#mgmt_o_mask').hide();
                }
            } else if (selectedMgmtTableRowCount === 0) {
                $('.edit,.delete').attr('disabled', 'disabled');
                $('#mgmt_t_mask,#mgmt_o_mask').hide();
            } else {
                $('.edit,.delete').attr('disabled', 'disabled');
                $('#mgmt_t_mask,#mgmt_o_mask').hide();
            }
        }, delay);
    });

    $("#editMgmtButton").click(function () {
        if (validateIP($('#mgmt_edit_ip').val())) {
            if (validateIP($('#mgmt_edit_subnet').val())) {
                if (validateIP($('#mgmt_edit_dgw').val())) {
                    if (validateIP($('#mgmt_edit_dnss').val())) {
                        var edit_elements = selectedMgmtTableRowData.split(",");
                        send_mgmt_update(edit_elements[0], dot2num($("#mgmt_edit_ip").val()), dot2num($("#mgmt_edit_subnet").val()), dot2num($("#mgmt_edit_dgw").val()), dot2num($("#mgmt_edit_dnss").val()));
                        document.getElementById('editMgmtModal').style.display = "none";
                    } else {
                        $('#mgmt_edit__confirm_msg').val('Invalied DNS server IP').css('color', 'red');
                    }
                } else {
                    $('#mgmt_edit__confirm_msg').val('Invalid Default Gateway').css('color', 'red');
                }
            } else {
                $('#mgmt_edit__confirm_msg').val('Invalid Subnet').css('color', 'red');
            }
        } else {
            $('#mgmt_edit__confirm_msg').val('Invalid IP address').css('color', 'red');
        }
    });
};

function display_mgmt_table() {
    mgmt_iface_table.clear();
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 41, 0); // request management interface list
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
            var element = row[i].split("$");
            mgmt_iface_table.row.add([element[0], element[1], num2dot(element[2]), num2dot(element[3]), num2dot(element[4]), num2dot(element[5]), "Active"]).draw(false);
        }
    }).fail(function () {
        console.error('Problems when posting...');
    });
}

function edit_mgmt_interface_prop() {

    var modal = document.getElementById('editMgmtModal');
    var span = document.getElementById('closeEditMgmtModal');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    var edit_elements = mgmt_iface_table.row('.selected').data();

    $("#mgmt_edit_infc").val(edit_elements[1]);
    $("#mgmt_edit_ip").val(edit_elements[2]);
    $("#mgmt_edit_subnet").val(edit_elements[3]);
    $("#mgmt_edit_dgw").val(edit_elements[4]);
    $("#mgmt_edit_dnss").val(edit_elements[5]);
}

function info_mgmt_interface_show() {

    var modal = document.getElementById('mgmtInfoProModal');
    var span = document.getElementById('closemgmtInfoModal');

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    var edit_elements = mgmt_iface_table.row('.selected').data();
    $("#mgmt_info_infc").val(edit_elements[1]);
    $("#mgmt_info_ip").val(edit_elements[2]);
    $("#mgmt_info_subnet").val(edit_elements[3]);
    $("#mgmt_info_dgw").val(edit_elements[4]);
    $("#mgmt_info_dnss").val(edit_elements[5]);
}

function MgmtDisplayStatus(code) {
    switch (code) {
        case 2:
            InvalidStatus("Failed to configure the Management Interface Settings");
            break;
        case 4:
            InvalidStatus("MGMT1 and MGMT2 IPs should be on different Subnets");
            break;
        case 10:
            SuccessStatus("System updated successfully");
            display_mgmt_table();
        default:
            return -1;
    }
}

send_mgmt_update = function (key, ip, subnet, dgw, dns) {
    var cmd_buffer = new ArrayBuffer(4 * 6);
    var req = new Uint32Array(cmd_buffer, 0, 6);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 42, 0);
    req[1] = key;
    req[2] = ip;
    req[3] = subnet;
    req[4] = dgw;
    req[5] = dns;
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        MgmtDisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

////////////////////////////////

maintenance_do_operation = function (id) {
    var cmd_buffer = update_acjs_elements(30 + (id - 1), '', 72, 97, 115, 105, 116, 104);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        maintenance_show_operation(maintenance_warning_type);
        document.getElementById('maintenance_warning_modal').style.display = "none";
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

maintenance_show_operation = function (id) {
    var msg;
    $('.dmaintain_operation_label').text("");
    var modal = document.getElementById('maintenance_operation_modal');
    modal.style.display = "block";
    if (id === 1) { // reset
        msg = 'Device will Reset In ';
    } else if (id === 2) { // reboot
        msg = 'Device will Reboot In ';
    } else { // power down
        msg = 'Device will Shut Down In ';
    }
    var n = 10;
    setTimeout(countDown, 1000);

    function countDown() {
        n--;
        if (n > 0) {
            $('.dmaintain_operation_label').text(msg + ' ' + n + " seconds");
            setTimeout(countDown, 1000);
        } else {
            modal.style.display = "none";
        }
    }
};

maintenance_show_warning = function (id, msg) {
    maintenance_warning_type = id;
    var modal = document.getElementById('maintenance_warning_modal');
    var span = document.getElementById('maintenance_cancel_warning_modal');

    modal.style.display = "block";
    $('.dmaintain_show_label').text(msg);
    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
};

maintenance_reset = function () {
    maintenance_show_warning(1, "You are about to reset the Device! Please press Proceed for the Reset.");
};

maintenance_reboot = function () {
    maintenance_show_warning(2, "You are about to Reboot the Device! Please press Proceed for the Reboot.");
};

maintenance_poweroff = function () {
    maintenance_show_warning(3, "You are about to Power Down the Device! Please press Proceed for the Power Down.");
};

maintenance_cancel_op = function () {
    $('#maintenance_warning_modal').hide();
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
create_modal = function (ele, modal, msg) {
    var item = "<div id='" + modal + "' class='pq_modal'>" +
            "<div class='pq_modal-content'>" +
            "<img src='image/dribbble_material_preloader.gif' style='width: 80px;float: left'>" +
            "<p class='pq_mdl_vcenter'>" + msg + "</p>" +
            "</div>" +
            "</div>";
    $(ele).append(item);
};

hide_modal = function (modal) {
    $(modal).hide();
};

show_modal = function (modal) {
    $(modal).show();
};

add_update_indicator = function (div, id, indication) {
    var item = "<div class='pq_updater_zee' id ='" + id + "' style='position: absolute; width: 100%; height: 100%;background-color: #f4f5f5;'>" +
            "<img src='image/gif/update_bl_beu.gif' style='float: left' class='pq_hvcenter'>" +
            "<a style='float: left; margin-left: 30px;font-size: 16px; color: #1a7cea' class='pq_hvcenter'>" + indication + "</a>" +
            "</div>";
    $(div).append(item);
    $("#" + id).hide();
};

show_update_indicator = function (id) {
    $(id).show();
};

hide_update_indicator = function (id) {
    $(id).hide();
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PQ_ADMIN_TYPE = 12;
var PQ_USER_TYPE = 23;


var NW_USER_LIST_ADD = 33;
var NW_USER_LIST_RESPW = 34;
var NW_USER_LIST_UPDATE = 39;
var NW_USER_LIST_DELETE = 35;
var NW_GET_USER_LIST = 36;
var NW_USER_LIST_ENBDIS = 38;
//Common Functions
update_acjs_elements = function (def, name, e0, e1, e2, e3, e4, e5) {
    var cmd_buffer = new ArrayBuffer(4 * 7 + name.length);
    var req = new Uint32Array(cmd_buffer, 0, 7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, def, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = e4;
    req[6] = e5;

    if (name !== '') {
        req[5] = name.length;
        var bname = new Uint8Array(cmd_buffer, 4 * 7, name.length);
        for (var cit = 0; cit < name.length; cit++) {
            bname[cit] = name.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};

update_two_strings_acjs_elements = function (def, str1, str2, e0, e1, e2, e3) {
//    console.log(def, str1, str2, e0, e1, e2, e3)
    var cmd_buffer = new ArrayBuffer(4 * 7 + str1.length + str2.length);
    var req = new Uint32Array(cmd_buffer, 0, 7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, def, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = str1.length;
    req[6] = str2.length;

    if (str1 !== '') {
        var bname = new Uint8Array(cmd_buffer, 4 * 7, str1.length);

        for (var cit = 0; cit < str1.length; cit++) {
            bname[cit] = str1.charCodeAt(cit);
        }
    }
    if (str2 !== '') {
        var budn = new Uint8Array(cmd_buffer, 4 * 7 + str1.length, str2.length);

        for (var cit = 0; cit < str2.length; cit++) {
            budn[cit] = str2.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};

//Users
add_nw_user_account = function (type, email, psw, ip, mask) {
//    console.log(type, email, psw, ip, mask)
    var cmd_buffer = new ArrayBuffer(4 * 7 + email.length + psw.length);
    var req = new Uint32Array(cmd_buffer, 0, 7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_ADD, 0);
    req[1] = type;
    req[2] = ip;
    req[3] = mask;
    req[4] = 1;
    req[5] = email.length;
    req[6] = psw.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 7, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var bpsw = new Uint8Array(cmd_buffer, 4 * 7 + email.length, psw.length);

    for (var cit = 0; cit < psw.length; cit++) {
        bpsw[cit] = psw.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data.charCodeAt(0));
        Update_Profile_Data(true, false);
        DisplayStatus(data.charCodeAt(0));
        $("input").val("");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_user_account = function (key, email, ip, mask) {
//console.log(key, email, ip, mask)
    var cmd_buffer = update_acjs_elements(NW_USER_LIST_UPDATE, email, key, ip, mask, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, false);
//        console.log(data.charCodeAt(0))
        DisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

renew_nw_user_pwd = function (key, new_pwd, pwd) {
//    console.log("Renew " + key, pwd, new_pwd);
    var cmd_buffer = update_two_strings_acjs_elements(NW_USER_LIST_RESPW, new_pwd, pwd, key, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, false);
        DisplayStatus(data.charCodeAt(0));
        $("input").val("");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

enable_disable_nw_user_account = function (key, email, state) {
//    console.log(key, email, state)
    var cmd_buffer = new ArrayBuffer(4 * 4 + email.length);
    var req = new Uint32Array(cmd_buffer, 0, 4);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_ENBDIS, 0);
    req[1] = key;
    req[2] = state;
    req[3] = email.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 4, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, false);
        DisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_nw_user_account = function (key, email) {

    var cmd_buffer = new ArrayBuffer(4 * 3 + email.length);
    var req = new Uint32Array(cmd_buffer, 0, 3);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_USER_LIST_DELETE, 0);
    req[1] = key;
    req[2] = email.length;

    var bemail = new Uint8Array(cmd_buffer, 4 * 3, email.length);

    for (var cit = 0; cit < email.length; cit++) {
        bemail[cit] = email.charCodeAt(cit);
    }

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Profile_Data(true, true);
        DisplayStatus(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//Rules

//Adresses

add_wo_address = function (type, name, vlan, ip_low, ip_high) {
//console.log(type+'_'+name+'_'+vlan+'_'+ip_low+'_'+ip_high)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_ADD, name, pq_2_16_32(type, vlan), ip_low, ip_high, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Address_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_address = function (key, type, vlan, ip_low, ip_high) {
//console.log(key+'_'+type+'_'+vlan+'_'+ip_low+'_'+ip_high)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_UPDATE, '', key, pq_2_16_32(type, vlan), ip_low, ip_high, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Address_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_address = function (key) {

    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Address_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO MAC

add_wo_mac_to_list = function (name, mac_1, mac_2) {

    var cmd_buffer = update_acjs_elements(TS_MACADR_LIST_ADD, name, mac_1, mac_2, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_MAC_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_wo_mac_of_list = function (key, mac_1, mac_2) {

    var cmd_buffer = update_acjs_elements(TS_MACADR_LIST_UPDATE, '', key, mac_1, mac_2, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_MAC_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_mac_from_list = function (key) {

    var cmd_buffer = update_acjs_elements(TS_MACADR_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_MAC_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

/// Address Profiles

add_wo_addr_prof = function (name) {

    var cmd_buffer = update_acjs_elements(TS_ADRPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_addr_prof = function (key) {

    var cmd_buffer = update_acjs_elements(TS_ADRPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_List();
        $('#editAddrProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_addr_to_prof = function (prof_id, adr_type, adr_id) {
//console.log(prof_id+'_'+ adr_type+'_'+ adr_id)
    var cmd_buffer = update_acjs_elements(TS_ADRPELE_LIST_ADD, '', prof_id, adr_type, adr_id, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_Addrs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_addr_from_prof = function (addr_rule_key, prof_id) {
//console.log(addr_rule_key+'_'+ prof_id)
    var cmd_buffer = update_acjs_elements(TS_ADRPELE_LIST_DELETE, '', addr_rule_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Addr_Prof_Addrs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


/////////////////////////////////////////////////////////////////////////////////////////////
///////////----------------------- Quota Management ----------------------//////////////////
////////////////////////////////////////////////////////////////////////////////////////////

add_wo_quota_rule = function (q_addrs_type, q_addrs_id, q_app_prof_id, q_url_prof_id, q_serv_prof_id, q_def_quota) {
//console.log(q_addrs_type, q_addrs_id, q_app_prof_id, q_url_prof_id, q_serv_prof_id, q_def_quota)
    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_ADD, '', q_addrs_id, q_addrs_type, pq_2_16_32(q_app_prof_id, q_url_prof_id), pq_2_16_32(q_serv_prof_id, q_def_quota), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(0, 0, 0, 0, 0, 0, 0);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_quota_rule = function (id, q_addrs_type, q_addrs_id, q_app_prof_id, q_url_prof_id, q_serv_prof_id, q_def_quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_UPDATE, '', id, pq_2_16_32(q_addrs_id, q_addrs_type), pq_2_16_32(q_app_prof_id, q_url_prof_id), pq_2_16_32(q_serv_prof_id, q_def_quota), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(1, 1, 1, 1, 1, 1, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

swap_wo_quota_rule = function (drag, drop) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_SWAP, '', drag, drop, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(1, 1, 1, 1, 1, 1, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_quota_rule = function (id) {
    var cmd_buffer = update_acjs_elements(WO_QUTA_RULE_LIST_DELETE, '', id, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Init_WO_Quota_Param(1, 1, 1, 1, 1, 1, 1);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota App Profile

add_wo_app_quota_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_app_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_List();
        $('#editQuotaAppProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_app_quota = function (prof_key, app_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPRULE_LIST_ADD, '', prof_key, app_id, quota, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_app_quota = function (rule_key, app_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPRULE_LIST_UPDATE, '', rule_key, app_id, quota, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_app_quota = function (app_ctrl_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_APPRULE_LIST_DELETE, '', app_ctrl_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_App_Prof_Apps();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota URL Profile

add_wo_url_quota_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_List();
        $('#editQuotaURLProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_url_quota = function (prof_key, authen, url_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLRULE_LIST_ADD, '', prof_key, url_id, authen, quota, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_url_quota = function (rule_key, url_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLRULE_LIST_UPDATE, '', rule_key, url_id, quota, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_url_quota = function (url_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_URLRULE_LIST_DELETE, '', url_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_URL_Prof_URLs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota Service Profile

add_wo_serv_quota_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSPROF_LIST_ADD, name, 0, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 100000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_serv_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSPROF_LIST_DELETE, '', key, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_List();
        $('#editQuotaServProfCreate').attr('disabled', true);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_wo_serv_quota = function (prof_key, prot, serv_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSRULE_LIST_ADD, '', prof_key, serv_id, prot, quota, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_Servs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_serv_quota = function (rule_key, serv_id, quota) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSRULE_LIST_UPDATE, '', rule_key, serv_id, quota, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_Servs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_serv_quota = function (serv_key, prof_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTA_SVSRULE_LIST_DELETE, '', serv_key, prof_id, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Serv_Prof_Servs();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota Profile

add_wo_quota_prof = function (name, type, quota, group_type, d_shp_id, u_shp_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_ADD, name, quota, pq_2_16_32(type, group_type), u_shp_id, d_shp_id, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_wo_quota_prof = function (key, quota, d_shp_id, u_shp_id) {

    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_UPDATE, '', key, quota, u_shp_id, d_shp_id, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_wo_quota_prof = function (key) {

    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Quota_Prof_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Quota Usage

reset_wo_quota_rule = function (cat, key) {

//    var cmd_buffer = update_acjs_elements(WO_QUTAELE_LIST_UPDATE, '', key, 0, 0, 0, 0, 0);
//
//    var cookie = $.cookie('pqsf');
//    $.ajax({
//        data: cmd_buffer,
//        processData: false,
//        headers: {"PARAQUMTEC": cookie},
//        timeout: 10000,
//        type: 'POST',
//        url: '/'
//    }).done(function (data, textStatus, jqXHR) {
    Update_Quota_Reset_Element();
//        show_acjs_status_modal(data.charCodeAt(0));
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        console.error('Problems when posting...');
//    });
};



/////////// Setup, Config & Management  ////////////////

//user profile

var user_email_address = ""; // u[0]
get_user_id = function () {
    setTimeout(function () {
        var cookie = $.cookie('pqsf');
        var req = new Uint32Array(1);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, 47, 0); // request user name
        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data) {
            $("#pq_user_prof_name").text(data);
            user_ID = data.split("@");
            user_email_address = data;
            setTimeout(function () {

            }, 1000);
        }).fail(function () {
        });
    }, 1000);
};

init_user_reporting_list = function () {
    setTimeout(function () {
        init_reporting_var();
        init_reports_window();
    }, 1000);
};

update_application_list = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 42, 48, 0); // request application
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        application_list[0] = 'Other';
        var element = data.split(";"); //
        for (var app_count = 0; app_count < element.length; app_count++) {
            var app_split = element[app_count].split("&");
            application_list[app_split[1]] = app_split[0];
        }

        setTimeout(function () {
            update_services_list();
        }, 1000);

    }).fail(function () {
        alert("Application list initialisation failed")
    });
};

update_services_list = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 42, 80, 0); // request services
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        pq_services_list[0] = 'Other';
        var element = data.split(";"); //
        for (var svs_count = 0; svs_count < element.length; svs_count++) {
            var svs_split = element[svs_count].split("&");
            pq_services_list[svs_split[1]] = svs_split[0];
        }
    }).fail(function () {

    });
};

get_dashb_notific = function () {
    setTimeout(function () {
        
        var cookie = $.cookie('pqsf');
        var req = new Uint32Array(2);
        req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, INFO_DASH_NOTIFIC, 0);
        req[1] = 0;
        $.ajax({
            data: req.buffer,
            processData: false,
            headers: {"PARAQUMTEC": cookie},
            timeout: 10000,
            type: 'POST',
            url: '/'
        }).done(function (data) {
//            console.log("Notific "+data)
            var msgs = data.split(";");
            for (var count = 0; count < msgs.length - 1; count++) {
                var time_data = msgs[count].split(":");
                var event_time = moment.unix(time_data[0]).format('MMM Do YYYY - hh:mm:ss A');
                var nfy = $('<img src="image/bullet.png" style="width: 10px;height: 10px;margin-left: 18px; float: left;margin-top: 10px; "/>' +
                        '<div style="font-size: 11px; margin-left: 30px; margin-top: 10px;">' + event_time + ' : ' + time_data[1] + '</div>');
                $('#notific_area').append(nfy);
            }
        }).fail(function () {
            console.log("Notification Update failed");
        });
    }, 1000);
};

//Change Configuration Type
change_device_media_configurations = function (port_id, type) {

    var cmd_buffer = update_acjs_elements(134, '', port_id, type, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        display_media_config_table();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

//System Updates

check_update_state = function () {

    var cmd_buffer = update_acjs_elements(PDEV_UPDATE_STATE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data.charCodeAt(0))
        if (data.charCodeAt(0) === 1) {
            SuccessStatus("System updated successfully");
        } else if (data.charCodeAt(0) === 2) {
            get_new_update();
        } else if (data.charCodeAt(0) === 99) {
            WarningStatus(99, 'The system has transferred to Fail-safe Mode! Please go to Maintenance Tab & click Refresh');
        } else if (data.charCodeAt(0) === 0) {
//            console.log("Already updated");
        } else
            return 'Error';

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_sys_admin_email = function (email) {

    var cmd_buffer = update_acjs_elements(PDEV_SET_UPDATE_EMAIL, email, 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_system_update_info();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

schedule_update = function (delay) {

    var cmd_buffer = update_acjs_elements(PDEV_CHECK_UPDATE_OPERATION, '', delay, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        get_system_update_info();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

switch_online_update = function (flag) {

    var cmd_buffer = update_acjs_elements(PDEV_SWITCH_ONLINE_UPDATE, '', flag, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_system_update_info();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

install_offline_update = function () {
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_OFFLINE_UPDATE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        $('#Offline_Update_Install_Window').hide();
        if (data.charCodeAt(0) === 10) {
            $('#Updating_modal').show();
        } else
            show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

install_app_sig_update = function () {
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_SIGNATURE_FILE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        $('#App_Signature_Update_Install_Window').hide();
        if (data.charCodeAt(0) === 10) {
            $('#Updating_modal').show();
        } else
            show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

install_license_update = function () {
    var cmd_buffer = update_acjs_elements(PDEV_INSTALL_LICENSE, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        $('#License_Update_Install_Window').hide();
        if (data.charCodeAt(0) === 10) {
            $('#Updating_modal').show();
        } else
            show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_config_backup_now = function () {
    var cmd_buffer = update_acjs_elements(NA_CNFGBKUP_BKUP_NOW, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_config_backup_details();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_config_backup_sched = function (sched) {
    var cmd_buffer = update_acjs_elements(NA_CNFGBKUP_MOD_CFG_TIME, '', sched, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_config_backup_details();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

restore_config_backup = function () {
    var cmd_buffer = update_acjs_elements(NA_CNFGBKUP_RESTORE_NOW, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_config_backup_details();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_config_backup_serv = function (ip, port) {
    var cmd_buffer = update_acjs_elements(NA_CNFGBKUP_MOD_SERVER_CFG, '', ip, port, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_config_backup_details();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

get_config_backup_details = function () {
    var cmd_buffer = update_acjs_elements(NA_CNFGBKUP_DETAIL_LIST, '', 0, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        config_backup_data = row[0];
        update_backup_conf_info();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

///// Ldap generic ACJS

update_ldap_acjs_elements = function (def, str1, str2, e0, e1, e2, e3) {
//    console.log(def, str1, str2, e0, e1, e2, e3)
    var cmd_buffer = new ArrayBuffer(4 * 7 + str1.length + str2.length);
    var req = new Uint32Array(cmd_buffer, 0, 7);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, def, 0);
    req[1] = e0;
    req[2] = e1;
    req[3] = e2;
    req[4] = e3;
    req[5] = str1.length;
    req[6] = str2.length;

    if (str1 !== '') {
        var bname = new Uint8Array(cmd_buffer, 4 * 7, str1.length);

        for (var cit = 0; cit < str1.length; cit++) {
            bname[cit] = str1.charCodeAt(cit);
        }
    }
    if (str2 !== '') {
        var budn = new Uint8Array(cmd_buffer, 4 * 7 + str1.length, str2.length);

        for (var cit = 0; cit < str2.length; cit++) {
            budn[cit] = str2.charCodeAt(cit);
        }
    }
    return cmd_buffer;
};

///////////////////////////

add_ml_dest_rule = function (user, ip, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, ip, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
//    console.log(typeof user, typeof sched, typeof sched_dlink_shpr, typeof sched_ulink_shpr, typeof def_dlink_shpr, typeof def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_ADD, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), ip, pq_2_16_32(2, sched), 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Dest_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_dest_rule = function (user, id, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, id, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_UPDATE, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), id, pq_2_16_32(2, sched), 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data.charCodeAt(0))
        Update_Dest_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_dest_rule = function (user, url_rule_key) {

    var cmd_buffer = update_acjs_elements(WO_ADDR_LIST_DELETE, '', user, url_rule_key, 0, 0, 0, 0);
//    console.log(user, url_rule_key)
    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Dest_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};



add_ml_url_rule = function (user, authen, dns, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, authen, dns, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_URL_RULE_ADD, url, user, pq_1_16_2_8_32(sched, authen, dns), pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_url_rule = function (user, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, url, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_URL_RULE_UPDATE, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), pq_2_16_32(url, sched), 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_url_rule = function (user, url_rule_key) {

    var cmd_buffer = update_acjs_elements(WO_URLRULE_LIST_DELETE, '', url_rule_key, user, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_URL_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_ml_app_rule = function (user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_APP_RULE_ADD, '', user, app, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), sched, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_App_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_app_rule = function (user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, app, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_APP_RULE_UPDATE, '', user, app, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), sched, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_App_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_app_rule = function (user, app_id) {

    var cmd_buffer = update_acjs_elements(ML_APP_RULE_DELETE, '', app_id, user, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_App_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

add_ml_serv_rule = function (user, port, prot, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, port, prot, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_SVS_RULE_ADD, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), pq_2_16_32(sched, prot), port, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

edit_ml_serv_rule = function (user, port, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr) {
//    console.log(user, port, sched, sched_dlink_shpr, sched_ulink_shpr, def_dlink_shpr, def_ulink_shpr)
    var cmd_buffer = update_acjs_elements(ML_SVS_RULE_UPDATE, '', user, pq_2_16_32(sched_dlink_shpr, sched_ulink_shpr), pq_2_16_32(def_dlink_shpr, def_ulink_shpr), sched, port, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_serv_rule = function (user, serv_id) {

    var cmd_buffer = update_acjs_elements(ML_SVS_RULE_DELETE, '', serv_id, user, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Service_Rules(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO Admin Pipes

add_ml_admin_pipe = function (name, gbw, mbw) {
//console.log(name, type, gbw, mbw, prty)
    var cmd_buffer = update_acjs_elements(WO_ADMIN_SHAPER_LIST_ADD, name, gbw, mbw, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Admin_Pipe_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_ml_admin_pipe = function (key, name, gbw, mbw) {

    var cmd_buffer = update_acjs_elements(WO_ADMIN_SHAPER_LIST_UPDATE, name, key, gbw, mbw, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Admin_Pipe_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_admin_pipe = function (key) {

    var cmd_buffer = update_acjs_elements(WO_ADMIN_SHAPER_LIST_DELETE, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Admin_Pipe_List();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO User Pipes

add_ml_user_pipe = function (user_id, admn_pipe, name, type, prty) {
//    console.log(user_id, admn_pipe, name, type, prty)
    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_ADD, name, user_id, admn_pipe, prty, type, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_User_Pipe_List(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_ml_user_pipe = function (user_id, user_pipe, admn_pipe, name) {

    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_UPDATE, name, user_id, user_pipe, admn_pipe, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_User_Pipe_List(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_ml_user_pipe = function (user_id, key) {
//console.log(user, key)
    var cmd_buffer = update_acjs_elements(WO_SHAPER_LIST_DELETE, '', user_id, key, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_User_Pipe_List(user_id);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};


//WO Schedulers

add_ml_schedule = function (user, name, type, dates, start_t, end_t) {

    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_ADD, name, user, pq_2_16_32(dates, type), start_t, end_t, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

edit_ml_schedule = function (user, key, name, dates, start_t, end_t) {

//    console.log(user, key, name, dates, start_t, end_t)
    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_UPDATE, name, user, pq_2_16_32(dates, key), start_t, end_t, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000000000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};

delete_ml_schedule = function (user, key) {
//    console.log(user, key)
    var cmd_buffer = update_acjs_elements(WO_SCHD_LIST_DELETE, '', user, key, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Schedule_List(user);
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
        alert('Problems when posting...');
    });
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sc_sd_diagram = {
    "nodes": [],
    "links": []
};

var sc_digram_colors = [];

var sc_cd_type = CLIENT_DIAGRAM;
var sc_cd_ip;
var sc_cd_mask;
var sc_cd_sum_type;
var sc_cd_sum_refresh = true;
var sc_cd_diagram_type;
var sc_window_id = 0; //0 - s-d-a watch window //1 - live user watch window

var scd_windo_data_updater;

function start_live_scd_updates() {
    if (scd_windo_data_updater)
        return;
    scd_windo_data_updater = setInterval(request_scdw_diagram_info, 10000);
}

function end_live_scd_updates() {
    clearInterval(scd_windo_data_updater);
    scd_windo_data_updater = null;
}

function request_scdw_diagram_info() {
    sc_cd_sum_refresh = false;
    load_and_draw_sc_dgrm(sc_cd_diagram_type);
    load_and_draw_sc_sumry(sc_cd_sum_type);
}

//var create_live_srcdes_watch_graph = function () {
//
//    return  lssd_graph_init(LSRC_UPDATE, "plot_live_sources_updown",
//            "plot_live_sources_av_updown",
//            '#a8334d',
//            '#008000',
//            "#pq_lsd_uplink_usage",
//            "#pq_lsd_downlink_usage",
//            "#pq_lscw_stat_bar");
//};

var create_live_srcdes_watch_graph = function () {
    return  lssd_graph_init(LSRC_UPDATE, "plot_live_sources_updown",
            "",
            '#a8334d',
            '#008000',
            "#pq_lsd_uplink_usage",
            "#pq_lsd_downlink_usage",
            "#pq_lsd_uplink_pkts",
            "#pq_lsd_downlink_pkts",
            "#pq_lscw_stat_bar", 2);
};

run_diagram = function () {

//    if (CURRENT_WINDOW != WINDOW_LIVE_SERVER_WATCH) {
//        return;
//    }

    $(sc_cd_div).empty();
    var chart = d3.select(sc_cd_div).append("svg").chart("Sankey.Path");
    chart
            .name(sc_cd_label)
            .colorNodes(function (name, node) {
                return sc_digram_colors[node.name] || '#9f9fa3';
            })
            .colorLinks(function (link) {
                return sc_digram_colors[link.source.name] || '#9f9fa3';
            })
            .nodeWidth(20)
            .nodePadding(10)
            .spread(true)
            .iterations(0)
            .draw(sc_sd_diagram);//graph);

    $(sc_cd_div + " svg").css("margin-top", "10px");
};

function sc_cd_label(node) {
//    return  node.name.replace(/\s*\(.*?\)$/, '');
    return  node.name;
}

function load_sc_diagram(type, ip, mask, div, wid) {
    sc_cd_type = type;
    sc_cd_ip = ip;
    sc_cd_div = div;
    sc_cd_mask = mask;
    sc_window_id = wid;
    sc_cd_sum_type = 1;
    btn_sc_load_now(SCD_TRAFIC);

    if (type === CLIENT_DIAGRAM) {

        $('#btn_lw_bt_one').text("Applications");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Sources");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Sources");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Source Diagram");
        $('#btn_lw_bt_three').show();
        update_live_watch_summery(LSUM_SRC_T_APP, dot2num(num2dot(ip)), mask);

    } else if (type === SERVER_DIAGRAM) {

        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Applications");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Destinations");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Destinations");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Destination Diagram");
        $('#btn_lw_bt_three').show();
        update_live_watch_summery(LSUM_DES_T_SRC, dot2num(num2dot(ip)), mask);

    } else if (type === APP_DIAGRAM) {

        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Applications");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Applications");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Application Diagram");
        $('#btn_lw_bt_three').hide();
        update_live_watch_summery(LSUM_APP_T_SRC, ip, mask);

    } else if (type == SVS_DIAGRAM) {

        $('#btn_lw_bt_one').text("Sources");
        $('#btn_lw_bt_two').text("Destinations");
        if (live_watch_mode === 0) {
            $('#pq_lsrc_go_back_text').text("Back To Services");
        } else if (live_watch_mode === 1) {
            $('#pq_lsrc_go_back_text').text("Back To Top Services");
        } else {
            $('#pq_lsrc_go_back_text').text("Back To Watch");
        }
        $('#tc_diag_type').text("Service Diagram");
        $('#btn_lw_bt_three').hide();
        update_live_watch_summery(LSUM_SVS_T_SRC, ip, mask);
    }
    start_live_scd_updates();
}

load_and_draw_sc_dgrm = function (id) {
    sc_sd_diagram.links.length = 0;
    sc_sd_diagram.nodes.length = 0;
    var headder_name;
    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: sc_cd_type,
        uid: global_rule_user,
        gid: id,
        ip: sc_cd_ip,
        mask: sc_cd_mask
    };
    if (sc_cd_type === APP_DIAGRAM) {
        var app_name;
        if (diagram_req.ip < application_list.length) {
            app_name = application_list[diagram_req.ip];
        } else {
            app_name = pq_services_list[diagram_req.ip - application_list.length + 1];
        }
        headder_name = app_name;
        sc_sd_diagram.nodes.push({
            "name": app_name,
            "id": "final_score"
        });
    } else if (sc_cd_type == SVS_DIAGRAM) {
        headder_name = pq_services_list[diagram_req.ip];
        sc_sd_diagram.nodes.push({
            "name": pq_services_list[diagram_req.ip],
            "id": "final_score"
        });
    } else {
        if (sc_cd_mask >= 32) {
            headder_name = num2dot(diagram_req.ip);
        } else {
            headder_name = num2dot(diagram_req.ip) + "/" + sc_cd_mask;
        }
        sc_sd_diagram.nodes.push({
            "name": headder_name,
            "id": "final_score"
        });
    }
    if (sc_digram_colors[headder_name] == null) {
        sc_digram_colors[headder_name] = randomColor({
            luminosity: 'bright'
        });
    }

    cjs_make_request(CLIENT_DIAGRAM, diagram_req);
};

btn_sc_load_now = function (id) {
    sc_cd_diagram_type = id;
    load_and_draw_sc_dgrm(id);
};

//btn_dashpie_bw_load_now = function (id) {
//    if (id === 1) {
//        $("#plot_dashPie_srcdesapp_updown").css("z-index", 100);
//        $("#plot_dashPie_srcdesapp_av_updown").css("z-index", 1);
//    } else {
//        $("#plot_dashPie_srcdesapp_updown").css("z-index", 1);
//        $("#plot_dashPie_srcdesapp_av_updown").css("z-index", 100);
//    }
//};

//btn_sc_bw_load_now = function (id) {
//    if (id === 1) {
//        $("#plot_live_sources_updown").css("z-index", 100);
//        $("#plot_live_sources_av_updown").css("z-index", 1);
//    } else {
//        $("#plot_live_sources_updown").css("z-index", 1);
//        $("#plot_live_sources_av_updown").css("z-index", 100);
//    }
//};

//btn_link_bw_load_now = function (id) {
//
//    if (id === 1) {
//        lcjs_make_request(live_bwd_id, LABW_UPDATE, labwd_req);
//        lcjs_make_request(live_bwu_id, LABW_UPDATE, labwu_req);
//        $("#CHD_Plot, #CHU_Plot").css("z-index", -10);
//        $("#CHD_av_Plot, #CHU_av_Plot").css("z-index", 100);
//    } else {
////        if(lv_link_flag){
//        lcjs_make_request(live_bwd_id, LBW_UPDATE, lbwd_req);
//        lcjs_make_request(live_bwu_id, LBW_UPDATE, lbwu_req);
////            lv_link_flag = false;
////        }        
//        $("#CHD_Plot, #CHU_Plot").css("z-index", 100);
//        $("#CHD_av_Plot, #CHU_av_Plot").css("z-index", -10);
//    }
//};

//btn_ses_bw_load_now = function (id) {
//    if (id === 2) {
//        $("#plot_live_session_av_downlink").css("z-index", 100);
//        $("#plot_live_session_av_uplink").css("z-index", 100);
//        $("#plot_live_session_ms_downlink").css("z-index", -10);
//        $("#plot_live_session_ms_uplink").css("z-index", -10);
//        $("#plot_live_session_downlink_header").text('Session Downlink Bandwidth (10 s Average)');
//        $("#plot_live_session_uplink_header").text('Session Uplink Bandwidth (10 s Average)');
//    } else {
//        $("#plot_live_session_av_downlink").css("z-index", -10);
//        $("#plot_live_session_av_uplink").css("z-index", -10);
//        $("#plot_live_session_ms_downlink").css("z-index", 100);
//        $("#plot_live_session_ms_uplink").css("z-index", 100);
//        $("#plot_live_session_downlink_header").text('Session Downlink Bandwidth (1 ms)');
//        $("#plot_live_session_uplink_header").text('Session Uplink Bandwidth (1 ms)');
//    }
//};


load_and_draw_sc_sumry = function (id) {
    if (id === 1) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_APP, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_SRC, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            update_live_watch_summery(LSUM_SVS_T_SRC, sc_cd_ip, sc_cd_mask);
        } else {
            update_live_watch_summery(LSUM_APP_T_SRC, sc_cd_ip, sc_cd_mask);
        }
    } else if (id === 3) {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_SVS, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_SVS, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        }
    } else {
        if (sc_cd_type == CLIENT_DIAGRAM) {
            update_live_watch_summery(LSUM_SRC_T_DEST, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SERVER_DIAGRAM) {
            update_live_watch_summery(LSUM_DES_T_APP, dot2num(num2dot(sc_cd_ip)), sc_cd_mask);
        } else if (sc_cd_type == SVS_DIAGRAM) {
            update_live_watch_summery(LSUM_SVS_T_DEST, sc_cd_ip, sc_cd_mask);
        } else {
            update_live_watch_summery(LSUM_APP_T_DEST, sc_cd_ip, sc_cd_mask);
        }
    }
};

btn_sc_sum_load_now = function (id) {
    sc_cd_sum_type = id;
    sc_cd_sum_refresh = true;
    load_and_draw_sc_sumry(id);
};

change_source_watch_head = function (s_ip, user, mask, sessions) {
    if (mask >= 32) {
        if (user !== '_' && user !== 'N/A' && user !== undefined) {
            $('#pq_lscw_sip_text').text('Client: ' + s_ip + ' (' + user + ')');
        } else
            $('#pq_lscw_sip_text').text('Client IP: ' + s_ip);
    } else {
        if (isNaN(mask)) {
            $('#pq_lscw_sip_text').text('Client IP: ' + s_ip);
        } else {
            $('#pq_lscw_sip_text').text('Client IP: ' + s_ip + '/' + mask);
        }
    }
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};

change_dest_watch_head = function (d_ip, url, mask, sessions) {
//    console.log(d_ip, url, mask, sessions)
    if (mask >= 32) {
        if (url !== '_' && url !== 0 && url !== undefined) {
            $('#pq_lscw_sip_text').text('Server: ' + d_ip + ' (' + url + ')');
        } else
            $('#pq_lscw_sip_text').text('Server IP: ' + d_ip);
    } else {
        if (isNaN(mask)) {
            $('#pq_lscw_sip_text').text('Server IP: ' + d_ip);
        } else {
            $('#pq_lscw_sip_text').text('Server IP: ' + d_ip + '/' + mask);
        }
    }
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};


change_application_watch_head = function (app_id, sessions) {
    var app_name;
    if (app_id < application_list.length) {
        app_name = application_list[app_id];
    } else {
        app_name = pq_services_list[app_id - application_list.length + 1];
    }
    $('#pq_lscw_sip_text').text('Application : ' + app_name);
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};

change_services_watch_head = function (sev_id, sessions) {
    $('#pq_lscw_sip_text').text('Service: ' + pq_services_list[sev_id]);
    $('#pq_lscw_ses_text').text('Sessions : ' + sessions);
};

var data_pq_live_usage = [{label: "1", value: 0}];
var pie_pq_live_usage;
var pie_pq_live_usage_wrap;
var pie_pq_live_usage_id = 3;

create_live_su_pie = function (id, div, ctnt) {
    var width = document.getElementById('' + div).offsetWidth;
    return new d3pie(div, {
        "size": {
            "canvasHeight": width,
            "canvasWidth": width,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": ctnt
        },
        "labels": {
            "outer": {
                "format": "none"
//                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 9
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 8
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
//        "tooltips": {
//            "enabled": true,
//            "type": "placeholder",
//            "string": "{label}: {value}, {percentage}%",
//            "placeholderParser": function (index, data) {
//                data.value = pq_get_usage(data.value);
//            },
//            "styles": {
//                "fadeInSpeed": 1000,
//                "backgroundColor": "#0079dc",
//                "backgroundOpacity": 1
//            }
//        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 40,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                if (a.data.label.length > 15) {
                    $("#pq_live_usage_legend .pqpie_lble_nme").css({"height": "40px", "top": "calc(20%)"});
                } else
                    $("#pq_live_usage_legend .pqpie_lble_nme").css({"height": "20px", "top": "calc(25%)"});

                $("#pq_live_usage_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_live_usage_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
                $("#pq_live_usage_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
            }
        }
    });
};


init_live_su_watch_plots = function (id) {
    pie_pq_live_usage_id = id;
    if (pie_pq_live_usage_wrap != null) {
        data_pq_live_usage.length = 0;
        data_pq_live_usage.push({label: "1", value: 0});
        //pie_pq_lruw_usage_wrap.update_summery_pie(id, 1);
    }
    pie_pq_live_usage = create_live_su_pie(id, 'pq_live_usage_pie_hlder', data_pq_live_usage);
    pie_pq_live_usage_wrap = new pq_mod_pie(pie_pq_live_usage, "#pq_live_usage_pie_hlder", data_pq_live_usage, '#pq_live_usage_legend', id);
    pqpie_resize_loading("#pq_live_usage_pie_hlder", pie_pq_live_usage);
};

update_live_watch_summery = function (type, data, mask) {

    data_pq_live_usage.length = 0;
    data_pq_live_usage.push({label: "1", value: 0});

    pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 1);
    $('#pq_live_usage_legend').children().remove();

    var lsum_req = {
        type: SESSION_UPDATE,
        id: LSUMRY_UPDATE,
        uid: global_rule_user,
        lid: type,
        loc: 1,
        sip: data,
        dip: mask

    };
    cjs_make_request(LSUMRY_UPDATE, lsum_req);
};

var data_dashPie_dlink = [{label: "1", value: 0}];
var pie_pq_dashPie_dlink;

var data_dashPie_ulink = [{label: "1", value: 0}];
var pie_pq_dashPie_ulink;

init_dashPie_piecharts = function () {
    pie_pq_dashPie_dlink = new d3pie("dashPie_src_dlink", {
        "size": {
            "canvasHeight": $('#dashPie_src_dlink').width()*0.9,
            "canvasWidth": $('#dashPie_src_dlink').width()*0.9,
            "pieOuterRadius": "100%"

        },
        "data": {
            "sortOrder": "value-desc",
            "content": data_dashPie_dlink
        },
        "labels": {
            "outer": {
                "format": "none"
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 8
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 2
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "truncation": {
                "enabled": true
            }
        },
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
                "backgroundOpacity": 1
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 79
            }
        },
        "callbacks": {
            "onClickSegment": function (a) {
                dashPie_bw_plot_init(a.data.label);
                $('#dashPie_bw_plot').text('Bandwidth Usage - ' + a.data.label);
                dashPie_clk_seg = a.data.label;
            }
        }
    });

    pie_pq_dashPie_ulink = new d3pie("dashPie_src_ulink", {
        "size": {
            "canvasHeight": $('#dashPie_src_ulink').width()*0.9,
            "canvasWidth": $('#dashPie_src_ulink').width()*0.9,
            "pieOuterRadius": "100%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": data_dashPie_ulink
        },
        "labels": {
            "outer": {
                "format": "none"
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 8
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 2
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": false,
                "style": "straight",
                "color": "#000000"
            },
            "truncation": {
                "enabled": true
            }
        },
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
                "backgroundOpacity": 1
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 79
            }
        },
        "callbacks": {
            "onClickSegment": function (a) {
                dashPie_bw_plot_init(a.data.label);
                $('#dashPie_bw_plot').text('Bandwidth Usage - ' + a.data.label);
                dashPie_clk_seg = a.data.label;
            }
        }
    });
};

//Source Updates

var summary_dashPie_updater;

function start_dashPie_update() {
    if (summary_dashPie_updater)
        return;
    summary_dashPie_updater = setInterval(request_dashPie_update, 15000);
}

function end_dashPie_update() {
    clearInterval(summary_dashPie_updater);
    summary_dashPie_updater = null;
}

function request_dashPie_update() {

    var type = dashPieCat;

    switch (type) {
        case 1:
            var sum_req = {
                type: SESSION_UPDATE,
                id: SUMRY_SRC_UPDATE,
                uid: global_rule_user,
                lid: SUMRY_SRC_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_SRC_UPDATE, sum_req);
            break;
        case 2:
            var sum_req = {
                type: SESSION_UPDATE,
                id: SUMRY_DEST_UPDATE,
                uid: global_rule_user,
                lid: SUMRY_DEST_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_DEST_UPDATE, sum_req);
            break;
        case 3:
            var ses_req = {
                type: SESSION_UPDATE,
                id: SUMRY_APP_UPDATE,
                uid: global_rule_user,
                lid: SUMRY_APP_UPDATE,
                loc: 1
            };
            cjs_make_request(SUMRY_APP_UPDATE, ses_req);
            break;
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var _globle_summery_pie_chart = [];
var _globle_pie_mapper = [];
var _globle_pie_data_array = [];
var _globle_pie_div_array = [];

var pq_mod_pie = function (pie, hdiv, pie_data_array, legend_dev, id) {
    var pie_mapper = [];
    var _legend = legend_dev;

    _globle_pie_mapper[id] = pie_mapper;//.push(pie_mapper);
    _globle_summery_pie_chart[id] = pie;
    _globle_pie_data_array[id] = pie_data_array;
    _globle_pie_div_array[id] = hdiv;

    var pie_sort_data = function (data) {
        var data_clone = data.slice(0);
        data_clone.sort(function (a, b) {
            if (a.value < b.value) {
                return 1;
            }
            if (a.value > b.value) {
                return -1;
            }
            return 0;
        });
        return data_clone;
    };

    this.add_pq_pie_legend = function (div, name, color, click_cbk) {
        var offset = 0;
        var name_star = "\"" + name + "\"";

        if (CURRENT_WINDOW === WINDOW_USER_SUMMARY) {
            item = "<div class='pie_elem_leg' style='width: 105px; height: 24px;cursor: pointer;background-color: whitsmoke' onclick= '" + click_cbk + "(" + name_star + "," + id + ")'> " +
                    "<div class='pq_vcenter' style='float: left; width: 11px;height: 10px;margin-left: " + offset + "px; margin-top:5px; background-color: " + color + "'>" +
                    "</div>" +
                    "<a class='pq_vcenter' style='margin-left: 5px; width: 85px; float: left; margin-top:5px; font-size: 10px;overflow: hidden; text-decoration:none;'>" + name + "</a>" +
                    "</div>";
        } else {
            item = "<div class='pie_elem_leg' style='width: 105px; height: 24px;cursor: default;background-color: whitsmoke'> " +
                    "<div class='pq_vcenter' style='float: left; width: 11px;height: 10px;margin-left: " + offset + "px; margin-top:5px; background-color: " + color + "'>" +
                    "</div>" +
                    "<a class='pq_vcenter' style='margin-left: 5px; width: 85px; float: left; margin-top:5px; font-size: 10px;overflow: hidden; text-decoration:none;'>" + name + "</a>" +
                    "</div>";
        }

        $(div).append(item);
    };

    pq_legend_clicked = function (name, id) {

        redirect_live_watch(name, id);
//        _globle_summery_pie_chart[id].openSegment(_globle_pie_mapper[id][name]);
//        console.log(id + " : " + name + " : " + _globle_pie_mapper[id][name]);
    };

    clear_pq_pie_legends = function (div) {

        $(div).children().remove();
        $(div).append(ele_pqpie_label_html);

        if ($('#pq_sum_src_legend').height() > ($('#pq_sum_src_hldr').height() + 50)) {
            $('.pqpie_modal').height($('#pq_sum_src_hldr').height() + 20);
        } else
            $('.pqpie_modal').height($('#pq_sum_src_legend').height());

        $('.pqpie_modal').width($('#pq_sum_src_legend').width());
    };

    this.update_summery_pie = function (id, len) {
        var dl_clone = pie_sort_data(_globle_pie_data_array[id]);
        if (dl_clone.length > len) {
            dl_clone = dl_clone.slice(0, len);
        }
        var id_pie = 0;
        clear_pq_pie_legends(legend_dev);
        _globle_pie_mapper[id].length = 0;
        for (var cc = 0; cc < dl_clone.length; cc++) {
            dl_clone[cc].color = pieColorScheme_10[cc];
            this.add_pq_pie_legend(legend_dev, dl_clone[cc].label, dl_clone[cc].color, 'pq_legend_clicked');
            _globle_pie_mapper[id][dl_clone[cc].label] = id_pie;
            id_pie++;
        }
        _globle_summery_pie_chart[id].updateProp("data.content", dl_clone);
        pqpie_update_nresize(_globle_pie_div_array[id], _globle_summery_pie_chart[id]);
    };

    this.clear_summery_pie = function (id, len) {
        var dl_clone = pie_sort_data(pie_data_array);
        if (dl_clone.length > len) {
            dl_clone = dl_clone.slice(0, len);
        }
        var id_pie = 0;
        clear_pq_pie_legends(legend_dev);
        _globle_summery_pie_chart[id].upddateProp("data.content", dl_clone);
    };
};

var pq_mod_pie_update_que = [];

var pq_mod_pie_sequence = function () {
    setTimeout(function () {
        var ele = pq_mod_pie_update_que.shift();
        ele.w.update_summery_pie(ele.i, ele.c);
        if (pq_mod_pie_update_que.length > 0) {
            pq_mod_pie_sequence();
        }
    }, 2000);
};

var pq_mod_pie_update = function (wrap, id, count) {
    pq_mod_pie_update_que.push({"w": wrap, "i": id, "c": count});
    if (pq_mod_pie_update_que.length === 1) {
        pq_mod_pie_sequence();
    }
};

var data_pq_sum_srcs = [{label: "1", value: 0}];
var pie_pq_sum_srcs;
var pie_pq_sum_srcs_wrap;

var data_pq_sum_dests = [{label: "1", value: 0}];
var pie_pq_sum_dests;
var pie_pq_sum_dests_wrap;

var data_pq_sum_apps = [{label: "1", value: 0}];
var pie_pq_sum_apps;
var pie_pq_sum_apps_wrap;

init_summary_dbd_plots = function () {
    pie_pq_sum_srcs = new d3pie("pq_sum_src_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_sum_srcs
        },
        "labels": {
            "outer": {
                "format": "none"
//                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 9
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 8
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 40,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
//                $("#pq_sum_src_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_src_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_sum_src_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
                $("#pq_sum_src_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
            }
        }
    });
    pie_pq_sum_srcs_wrap = new pq_mod_pie(pie_pq_sum_srcs, "#pq_sum_src_hldr", data_pq_sum_srcs, '#pq_sum_src_legend', 0);
    pqpie_resize_loading("#pq_sum_src_hldr", pie_pq_sum_srcs);

    pie_pq_sum_dests = new d3pie("pq_sum_dest_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_sum_dests
        },
        "labels": {
            "outer": {
                "format": "none"
//                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 9
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 8
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 40,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
//                $("#pq_sum_dest_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_dest_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_sum_dest_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 25px #000"});
                $("#pq_sum_dest_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 25px #000"});
            }
        }
    });
    pie_pq_sum_dests_wrap = new pq_mod_pie(pie_pq_sum_dests, "#pq_sum_dest_hldr", data_pq_sum_dests, '#pq_sum_dest_legend', 1);
    pqpie_resize_loading("#pq_sum_dest_hldr", pie_pq_sum_dests);

    pie_pq_sum_apps = new d3pie("pq_sum_app_hldr", {
        "size": {
            "canvasHeight": 200,
            "canvasWidth": 200,
            "pieOuterRadius": "100%"
        },
        "data": {
//            "sortOrder": "value-desc",
            "content": data_pq_sum_apps
        },
        "labels": {
            "outer": {
                "format": "none"
//                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 5
            },
            "mainLabel": {
                "fontSize": 9
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 8
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "load": {
                "speed": 10
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 100
            }
        },
        "callbacks": {
            onMouseoverSegment: function (a) {
                if (a.data.label.length > 15) {
                    $("#pq_sum_app_legend .pqpie_lble_nme").css({"height": "40px", "top": "calc(20%)"});
                } else
                    $("#pq_sum_app_legend .pqpie_lble_nme").css({"height": "20px", "top": "calc(25%)"});

//                $("#pq_sum_app_legend .pqpie_lble").css({"border": "5px solid " + a.data.color, "display": "block"}).delay(2000).hide(0);
                $("#pq_sum_app_legend .pqpie_lble").css({"display": "block"}).delay(2000).hide(0);
                $("#pq_sum_app_legend .pqpie_lble_nme").text(a.data.label).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
                $("#pq_sum_app_legend .pqpie_lble_val").text(pq_get_usage(a.data.value)).css({"color": a.data.color, "text-shadow": "0 0 10px #000"});
            }
        }
    });
    pie_pq_sum_apps_wrap = new pq_mod_pie(pie_pq_sum_apps, "#pq_sum_app_hldr", data_pq_sum_apps, '#pq_sum_app_legend', 2);
    pqpie_resize_loading("#pq_sum_app_hldr", pie_pq_sum_apps);
};

//Automated Updates

var summery_top_updater;

function start_summary_top_update() {
    if (summery_top_updater)
        return;
    summery_top_updater = setInterval(request_summary_top_update, 15000);
}

function end_summary_top_update() {
    clearInterval(summery_top_updater);
    summery_top_updater = null;
}

function request_summary_top_update() {
    //make sumarry update request
    var sum_req = {
        type: SESSION_UPDATE,
        id: SUMRY_SDC_UPDATE,
        uid: global_rule_user,
        lid: SESSION_APP_UPDATE,
        loc: 1
    };
    cjs_make_request(SUMRY_SDC_UPDATE, sum_req);
}

function redirect_live_watch(name, id, arr_id) {

    var data = [];
    switch (id) {
        case 0:
            var user = 'N/A';
            if (isNaN(dot2num(name))) {
                user = name;
                var index = _globle_pie_mapper[id][name];
                name = data_pq_sum_srcs_ip[index];
            }
            data = [name, user];
            load_src_live_watch_window(data, 0);
            break;
        case 1:
            var url = 0;
            if (isNaN(dot2num(name))) {
                url = name;
                var index = _globle_pie_mapper[id][name];
                name = data_pq_sum_dests_ip[index];
            }
            data = [name, url, 'N/A'];
            load_dest_live_watch_window(data, 0);
            break;
        case 2:
            var app_id = application_list.indexOf(name);
            data = [0, 'N/A', 0, 0, 0, 0, 0, app_id];
            load_app_live_watch_window(data, 0);
            break;
        case 3:
            data = [name, 'N/A'];
            load_src_live_watch_window(data, 1);
            break;
        case 4:
            data = [name, 0, 'N/A'];
            load_dest_live_watch_window(data, 1);
            break;
        case 5:
            var app_id = application_list.indexOf(name);
            data = [0, 'N/A', 0, 0, 0, 0, 0, app_id];
            load_app_live_watch_window(data, 1);
            break;
        case 6:
            var url = 0;
            if (isNaN(dot2num(name))) {
                url = name;
                name = data_pq_dash_dlink_items[arr_id];
            }
            data = [name, url, 'N/A'];
            load_dest_live_watch_window(data, 1);
            break;
        case 7:
            var url = 0;
            if (isNaN(dot2num(name))) {
                url = name;
                name = data_pq_dash_ulink_items[arr_id];
            }
            data = [name, url, 'N/A'];
            load_dest_live_watch_window(data, 1);
            break;
    }
}var bwh_ulg_id;
var bwh_dlg_id;
var last_bwh_req;
var hist_glob_stime;
var hist_glob_end_time;

update_his_search_time_range = function (st_time, end_time) {
    $('#date_input_bw_his_st').data("DateTimePicker").date(moment.utc(get_Ts_time(st_time)).format('MMM Do YYYY - hh:mm:ss A'));
    $('#date_input_bw_his_et').data("DateTimePicker").date(moment.utc(get_Ts_time(end_time)).format('MMM Do YYYY - hh:mm:ss A'));
    hist_glob_stime = st_time;
    hist_glob_end_time = end_time;
};

var hide_history_no_data = function () {
    $('#pq_bwh_ul_plot_no_data').hide();
    $('#pq_bwh_dl_plot_no_data').hide();
};

var hide_history_no_avil = function () {
    $('#pq_bwh_ul_plot_no_avil').hide();
    $('#pq_bwh_dl_plot_no_avil').hide();
};

var hide_history_loading = function () {
    $('#pq_bwh_ul_plot_loading').hide();
    $('#pq_bwh_dl_plot_loading').hide();
};

var show_history_loading = function () {
    $('#pq_bwh_ul_plot_loading').show();
    $('#pq_bwh_dl_plot_loading').show();
};

var validate_hist_data_availability = function (id, count) {
//    console.log(id, count)
    if (id === bwh_ulg_id) {
        $('#pq_bwh_ul_plot_loading').hide();
        if (count === 0) {
            $('#pq_bwh_ul_plot_no_avil').show();
            $('#bw_hist_prev_btn').attr('disabled', true);
            $('#bw_hist_next_btn').attr('disabled', true);
        }
    }
    if (id === bwh_dlg_id) {
        $('#pq_bwh_dl_plot_loading').hide();
        if (count === 0) {
            $('#pq_bwh_dl_plot_no_avil').show();
            $('#bw_hist_prev_btn').attr('disabled', true);
            $('#bw_hist_next_btn').attr('disabled', true);
        }
    }
};

var show_history_no_data = function () {
    $('#pq_bwh_ul_plot_no_data').show();
    $('#pq_bwh_dl_plot_no_data').show();
    $('#bw_hist_prev_btn').attr('disabled', true);
    $('#bw_hist_next_btn').attr('disabled', true);
};

var initialize_bwh_window = function () {

    bwh_ulg_id = bwh_graph_init("pq_bwh_ul_plot", '#32c182', 0);
    bwh_dlg_id = bwh_graph_init("pq_bwh_dl_plot", '#cd790f', 1);

    $('#date_input_bw_his_st').datetimepicker({
        format: "MMM Do YYYY - hh:mm:ss A",
        maxDate: Date.now()
    });
    $('#date_input_bw_his_et').datetimepicker({
        format: "MMM Do YYYY - hh:mm:ss A",
        maxDate: Date.now()
    });

    $("#date_input_bw_his_st,#date_input_bw_his_et").on("dp.change", function () {
        show_history_no_data();
    });

    $("#date_input_bw_his_st").on("dp.change", function (e) {
        if ($("#date_input_bw_his_st").val() !== '') {
            $('#date_input_bw_his_et').data("DateTimePicker").minDate(e.date);
        }
    });

    var startDateTime_temp = moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('MMM Do YYYY - hh:mm:ss A');
    var endDateTime_temp = moment().seconds(0).milliseconds(0).format('MMM Do YYYY - hh:mm:ss A');

    $('#date_input_bw_his_st').data('DateTimePicker').date(startDateTime_temp);
    $('#date_input_bw_his_et').data('DateTimePicker').date(endDateTime_temp);

// Trigger action when the contexmenu is about to be shown
    $('#pq_bwh_dl_plot,#pq_bwh_ul_plot').bind("contextmenu", function (event) {
        // Avoid the real one
        event.preventDefault();
        // Show contextmenu
        $(".custom-menu").toggle(10).
                // In the right position (the mouse)
                css({
                    top: (event.pageY - 5) + "px",
                    left: (event.pageX - 5) + "px"
                });
    });
    $('#pq_bwh_dl_plot,#pq_bwh_ul_plot').bind("mousedown", function () {
        $(".custom-menu").hide(100);
    });
    hide_history_no_avil();
    hide_history_no_data();
    show_history_loading();

    bwh_apply_btnclk();
};

bwh_apply_btnclk = function () {
    hide_history_no_avil();
    hide_history_no_data();

    $('#bw_hist_prev_btn').attr('disabled', false);
    $('#bw_hist_next_btn').attr('disabled', false);

    var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
    var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();

    hist_glob_stime = new Date(s_date);
    hist_glob_end_time = new Date(e_date);

    if (hist_glob_stime.getTime() === hist_glob_end_time.getTime()) {
        InvalidStatus("Start and End Time cannot be the same");
        show_history_no_data();
    } else {
//        var vlan_bw_id;
//        if (isNaN(parseInt($("#pq_bwh_vlan_selector option:selected").val())) || parseInt($("#pq_bwh_vlan_selector option:selected").val()) === 4095) {
//            vlan_bw_id = 4095;
            $('#bwhist_dlink_label').text('Network Downlink Bandwidth');
            $('#bwhist_ulink_label').text('Network Uplink Bandwidth');
//        } else if (parseInt($("#pq_bwh_vlan_selector option:selected").val()) === 4096) {
//            vlan_bw_id = parseInt($("#pq_bwh_vlan_selector option:selected").val());
//            $('#bwhist_dlink_label').text('Non-VLAN - Downlink Bandwidth');
//            $('#bwhist_ulink_label').text('Non-VLAN - Uplink Bandwidth');
//        } else {
//            vlan_bw_id = parseInt($("#pq_bwh_vlan_selector option:selected").val());
//            $('#bwhist_dlink_label').text('VLAN ' +vlan_bw_id+ ' - Downlink Bandwidth');
//            $('#bwhist_ulink_label').text('VLAN ' +vlan_bw_id+ ' - Uplink Bandwidth');
//        }

        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(bwh_link_id, 0),
            chanel: 0,
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: 0,
            vid: 4095
        };
        cjs_make_request(GRAPH_BH_UPDATE, req);
        last_bwh_req = req;
    }
};

bwh_refresh_btn_click = function () {
    hide_history_no_avil();
    show_history_no_data();
    update_his_search_time_range(new Date(), new Date());
};

var bwh_mine_click = function (e, p) {
    if (bwh_graph_type != 0) {
        var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
        var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();

        hide_history_no_avil();
        hide_history_no_data();
        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(0, bwh_graph_type),
            chanel: pq_2_16_32(0, HIST_TYPE_MINE),
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: bwh_point_buff[p.idx],
            vid: 4095
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};

bwh_previous_click = function () {
    if (bwh_point_buff.length > 0 && bwh_point_buff[0] > 0) {
        var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
        var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();
        hide_history_no_avil();
        hide_history_no_data();
        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(0, bwh_graph_type),
            chanel: pq_2_16_32(0, HIST_TYPE_PREV),
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: bwh_point_buff[0],
            vid: 4095
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};

bwh_next_click = function () {
    if (bwh_point_buff.length > 0) {
        var s_date = $('#date_input_bw_his_st').data("DateTimePicker").date();
        var e_date = $('#date_input_bw_his_et').data("DateTimePicker").date();
        hide_history_no_avil();
        hide_history_no_data();
        show_history_loading();
        var req = {
            type: GRAPH_UPDATE,
            id: GRAPH_BH_UPDATE,
            gid: bwh_ulg_id,
            link: pq_2_16_32(0, bwh_graph_type),
            chanel: pq_2_16_32(0, HIST_TYPE_NEXT),
            s_date: s_date,
            e_date: e_date,
            min_bw: 0,
            log: bwh_point_buff[bwh_point_buff.length - 1],
            vid: 4095
        };
        last_bwh_req = req;
        cjs_make_request(GRAPH_BH_UPDATE, req);
    }
};var skt_live_bw_con = [];
var live_graph = [];
var lg_data_buff = [];
var lg_color_buff = [];
var blg_clr_keep = [];
var last_lg_ut = [];
var last_bwu_time = [];

var bwhist_prv_ts = [];
var bwhist_prv_csc_cnt = [];

var vlan_enable;

function get_cjs_ws_url() {
    var pcol;
    var u = document.URL;
    if (u.substring(0, 5) == "https") {
        pcol = "wss://";
        u = u.substr(8);
    } else {
        pcol = "ws://";
        if (u.substring(0, 4) == "http")
            u = u.substr(7);
    }
    u = u.split('/');
    return pcol + u[0] + "/xxx";
}

var cjs_make_auth_req = function (req_data) {
    var cmd_buffer = new ArrayBuffer(4 * 1 + req_data.gid.length);
    var req = new Uint32Array(cmd_buffer, 0, 1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, 0, 0);
    var bemail = new Uint8Array(cmd_buffer, 4, req_data.gid.length);
    for (var cit = 0; cit < req_data.gid.length; cit++) {
        bemail[cit] = req_data.gid.charCodeAt(cit);
    }
    return cmd_buffer;
};

//Bandwidth History
var bwh_plot = [];
var bwh_dbuff = [];
var bwh_cbuff = [];
var bwh_color = [];
var bwh_vname = [];
var bwh_ref_time = [];
var bwh_point_buff = [];
var bwh_graph_type = 0;
var bwh_max_free_tspan = 0;
var bwh_prev_tspan = 0;

var bwh_make_request = function (req_data) {
    var req = new Uint32Array(11);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = 0;
    req[2] = req_data.link;
    req[3] = req_data.chanel;
    req[4] = req_data.s_date - (req[4] * 4294967296);
    req[5] = req_data.s_date / 4294967296;
    var rec_time = new Date(4294967296 * req[3] + req[4]);
    req[6] = req_data.e_date - (req[6] * 4294967296);
    req[7] = req_data.e_date / 4294967296;
    req[8] = req_data.min_bw;
    req[9] = req_data.log;
    req[10] = req_data.vid;
    return req.buffer;
};

var bwh_graph_init = function (div, color, gid) {

    if (bwh_dbuff[gid] == null) {
        var data = [];
        data.push([0, 0]);
        bwh_dbuff[gid] = data;
        var clr = [];
        clr.push([color]);
        bwh_cbuff[gid] = clr;
        bwh_color[gid] = [color];
        bwh_vname[gid] = [];
        bwh_ref_time[gid] = 0;
    }
    var graph = new Dygraph(document.getElementById(div), bwh_dbuff[gid], bwh_cbuff[gid], 0, gid,
            {
//                drawPoints: true,
                showRoller: false,
                fillGraph: true,
                axisLabelFontSize: 10,
                drawGrid: false,
                plotter: smoothPlotter,
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {
                    y: {
                        axisLabelWidth: 65,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            return x_axis_av_formatter(x);
                        }
                    }
                },
                pointClickCallback: function (e, p) {
                    bwh_mine_click(e, p);
                }
            });
    bwh_plot[gid] = graph;
    return  gid;
};

bwh_update_start = function (id, data) {
//console.log("Bw hist update start "+data)

    bwh_plot[id].resize();
    bwh_dbuff[id] = [];
    bwh_cbuff[id].length = 0;
    bwh_vname[id].length = 0;
    validate_hist_data_availability(id, data[1]);
    bwh_ref_time[id] = new Date(4294967296 * data[4] + data[3]);

    bwh_plot[id + 1].resize();
    bwh_dbuff[id + 1] = [];
    bwh_cbuff[id + 1].length = 0;
    bwh_vname[id + 1].length = 0;
    validate_hist_data_availability(id + 1, data[1]);
    bwh_ref_time[id + 1] = new Date(4294967296 * data[4] + data[3]);

    bwh_prev_tspan = 0;
    bwh_graph_type = data[2];
    bwhist_prv_ts[id] = 0;
    bwhist_prv_csc_cnt[id] = 0;
    bwh_point_buff.length = 0;

    if (bwh_graph_type === 0) {
        bwh_max_free_tspan = 2000;
    } else if (bwh_graph_type === 1) {
        bwh_max_free_tspan = 60 * 1000 * 2;
    } else if (bwh_graph_type === 2) {
        bwh_max_free_tspan = 60 * 1000 * 5 * 2;
    } else if (bwh_graph_type === 3) {
        bwh_max_free_tspan = 60 * 1000 * 15 * 2;
    } else if (bwh_graph_type === 4) {
        bwh_max_free_tspan = 60 * 1000 * 120 * 2;
    } else if (bwh_graph_type === 4) {
        bwh_max_free_tspan = 60 * 1000 * 120 * 12 * 2;
    }
};

bwh_update = function (id, data) {
//    console.log(data.length, data)
    if (data.length % 4 === 0) {
        for (var i = 0; i < data.length; i = i + 4) {
            var bw_s = uint32_float(data[i]);
            var bw_r = uint32_float(data[i + 1]);
            var comp_id = data[i + 2];
            var tstamp = data[i + 3];
//            console.log(tstamp)
            if (tstamp > 0) {
                //Add Data to Graph
                var time = new Date(bwh_ref_time[id].getTime() + tstamp);
//                console.log(time)
                if (bwh_prev_tspan !== 0) {
//                    console.log("Tspan "+ (time - bwh_prev_tspan))
                    if ((time - bwh_prev_tspan) >= bwh_max_free_tspan) {
//                        console.log("In bw hist adjust")
                        var time_p = new Date(bwh_prev_tspan.getTime() + bwh_max_free_tspan / 2);
                        var time_n = new Date(time.getTime() - bwh_max_free_tspan / 2);
                        bwh_dbuff[id].push([time_p, 0]);
                        bwh_dbuff[id + 1].push([time_p, 0]);
                        bwh_dbuff[id].push([time_n, 0]);
                        bwh_dbuff[id + 1].push([time_n, 0]);

                        if (bwh_cbuff[id].length <= 1400) {
                            bwh_cbuff[id].push(bwh_color[id]);
                            bwh_cbuff[id + 1].push(bwh_color[id + 1]);

                            bwh_cbuff[id].push(bwh_color[id]);
                            bwh_cbuff[id + 1].push(bwh_color[id + 1]);
                        }
                    }
                }

                if (time >= bwhist_prv_ts[id]) {

                    bwhist_prv_ts[id] = time;
                    bwhist_prv_csc_cnt[id] = 0;

                    bwh_prev_tspan = time;
                    bwh_dbuff[id].push([time, bw_s]);
                    bwh_dbuff[id + 1].push([time, bw_r]);
                    bwh_point_buff.push(comp_id);
                    if (bwh_cbuff[id].length <= 1400) {
                        bwh_cbuff[id].push(bwh_color[id]);
                        bwh_cbuff[id + 1].push(bwh_color[id + 1]);
                    }
                    //Remove Old Points from Graph
                    if (bwh_dbuff[id].length > 1400) {
                        bwh_dbuff[id].shift();
                        bwh_dbuff[id + 1].shift();
                        bwh_point_buff.shift();
                    }
//                    console.log("IF time "+ time +" span "+  bwh_prev_tspan)
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = bwh_prev_tspan;
                    bwhist_prv_csc_cnt[id]++;
                    if (bwhist_prv_csc_cnt[id] > 3) {
                        bwh_dbuff[id].pop();
                        bwhist_prv_ts[id] = time;
                    }
//                    console.log("ELSE time "+ time +" span "+  bwh_prev_tspan)
                }
            }
        }
    } else {
        console.log('Invalid Bandwidth History Data');
    }
};

bwh_update_end = function (id) {
    bwh_plot[id].updateOptions({'file': bwh_dbuff[id]});
    bwh_plot[id + 1].updateOptions({'file': bwh_dbuff[id + 1]});
    hide_history_loading();
};

// All Sessions List

var max_session_data_point = 0;
var max_session_count = 0;
var url_discovery_count = 0;
var url_discovery_que_id = 0;

var all_sessions_make_request = function (req_data) {
    var req = new Uint32Array(9);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.lid);
    req[1] = req_data.uid;
    req[2] = req_data.loc;
    req[3] = req_data.sip;
    req[4] = req_data.dip;
    req[5] = pq_2_16_32(req_data.sport, req_data.dport);
    req[6] = pq_2_16_32(req_data.prot, req_data.app);
    req[7] = req_data.sipr;
    req[8] = req_data.dipr;
    return req.buffer;
};

all_sessions_update_start = function (id, end_point, max_point, ses_que_id, ses_dis_count) {
    url_discovery_count = ses_dis_count;
    url_discovery_que_id = ses_que_id;
    if (session_table) {
        session_table.clear();
    }
    max_session_data_point = (uint32_float(max_point) * 1000000) / 8;
};

all_sessions_update = function (id, data) {
    var v_indicate;
//    console.log(data)
    if (data.length % 8 === 0) {
        for (var i = 0; i < data.length; i = i + 8) {
            var protocol = data[i + 3] & 0xFF;
//            var vid = data[i + 3] & 0xFFFF;
            if (protocol === 6) {
                protocol = 'TCP';
            } else {
                protocol = 'UDP';
            }
            var app_id = data[i + 3] >>> 16;
            var flow_count = 1;
//            v_indicate = vid + "";

//            if (vid === 8191 || vid === 4095) {
            v_indicate = "non-vlan";
//            }

            var app_name;
            if (data[i + 6] < application_list.length) {
                app_name = application_list[data[i + 6]];
            } else {
                app_name = pq_services_list[data[i + 6] - application_list.length + 1];
            }
            session_table.row.add([num2dot(data[i]), '-', num2dot(data[i + 1]), (data[i + 2] & 0xFFFF), (data[i + 2] >>> 16), protocol, v_indicate, app_name, data[i + 4], data[i + 5], max_session_data_point, data[i + 6]]);
        }
    } else {
        console.log('Invalid Sesson Data');
    }
};

all_sessions_update_end = function (id) {
//    if (url_discovery_count > 0) {
//        q_sessions_update_with_url(session_table, 1);
//    } else {
    hide_update_indicator('#pq_session_ud_indicator');
    session_table.draw(false);
//    }
};

// Quarried Sessions List

q_sessions_update_start = function (type, max_sessions, max_point, url_que_id, url_dis_count) {
    //alert(max_sessions + " " + max_point);
    if (type === SESSION_SOURCE_UPDATE) {
        url_discovery_count = url_dis_count;
        url_discovery_que_id = url_que_id;
        if (source_table) {
            source_table.clear();
        }
    } else if (type === SESSION_DEST_UPDATE) {
        url_discovery_count = url_dis_count;
        url_discovery_que_id = url_que_id;
        if (destination_table) {
            destination_table.clear();
        }
    } else if (type === SESSION_APP_UPDATE) {
        if (app_table) {
            app_table.clear();
        }
    } else if (type === SESSION_SVS_UPDATE) {
        if (ses_service_table) {
            ses_service_table.clear();
        }
    } else {
        console.log("Error: Unknown Session Type Start");
    }
    max_session_count = max_sessions;
    max_session_data_point = (uint32_float(max_point) * 1000000) / 8;
};

q_sessions_update = function (type, data) {
    if (data.length % 4 === 0) {
        if (type === SESSION_SOURCE_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                source_table.row.add([num2dot(data[i]), "_", data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count]);
            }
        } else if (type === SESSION_DEST_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                destination_table.row.add([num2dot(data[i]), "_", data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count]);
            }
        } else if (type === SESSION_APP_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                if (data[i] >= application_list.length) {
                    app_table.row.add([pq_services_list[data[i] - application_list.length + 1], data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
                } else {
                    app_table.row.add([application_list[data[i]], data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
                }
            }
        } else if (type === SESSION_SVS_UPDATE) {
            for (var i = 0; i < data.length; i = i + 4) {
                ses_service_table.row.add([pq_services_list[data[i]], data[i + 1], (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8, ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8, max_session_data_point, max_session_count, data[i]]);
            }
        } else {
            console.log("Error: Unknown Session Type Start");
        }
    } else {
        console.log('Invalid Sesson Data');
    }
};

q_sessions_update_with_url = function (table, col_id) {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, url_discovery_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
//        console.log("URL List " + data)
        var element = data.split(";");
        var num_rows = table.rows().count();
        for (var url_count = 0; url_count < element.length - 1; url_count++) {
            if (num_rows >= url_count && element[url_count] !== '') {
                table.cell(url_count, col_id).data(element[url_count]);
            }
        }
        table.draw(false);
        hide_update_indicator('#pq_session_ud_indicator');
        hide_update_indicator('#pq_source_ud_indicator');
        hide_update_indicator('#pq_destination_ud_indicator');
    }).fail(function () {
        table.draw(false);
        hide_update_indicator('#pq_session_ud_indicator');
        hide_update_indicator('#pq_source_ud_indicator');
        hide_update_indicator('#pq_destination_ud_indicator');
    });
};

q_sessions_update_end = function (type) {

    if (type === SESSION_SOURCE_UPDATE) {
        if (url_discovery_count > 0) {
            q_sessions_update_with_url(source_table, 1);
        } else {
            source_table.draw(false);
            hide_update_indicator('#pq_source_ud_indicator');
        }
    } else if (type === SESSION_DEST_UPDATE) {
        if (url_discovery_count > 0) {
            q_sessions_update_with_url(destination_table, 1);
        } else {
            destination_table.draw(false);
            hide_update_indicator('#pq_destination_ud_indicator');
        }
    } else if (type === SESSION_APP_UPDATE) {
        app_table.draw(false);
        hide_update_indicator('#pq_application_ud_indicator');
    } else if (type === SESSION_SVS_UPDATE) {
        ses_service_table.draw(false);
        hide_update_indicator('#pq_service_ud_indicator');
    } else {
        console.log("Error: Unknown Session Type End");
    }
};

// Summary Data Updates

var smy_ob_src_items = 0;
var smy_ob_des_items = 0;
var smy_ob_app_items = 0;
var smy_ob_prt_items = 0;
var smy_ob_read_count = 0;
var dash_que_id = 0;
var dash_ad_count = 0;
var data_pq_sum_srcs_ip = [];
var data_pq_sum_dests_ip = [];
var data_pq_dash_dlink_items = [];
var data_pq_dash_ulink_items = [];
var dash_ad_elements = [];

q_smry_update_start = function (data) {
//    console.log("SUmmary data " + data)
    smy_ob_src_items = data[1];
    smy_ob_des_items = data[2] + smy_ob_src_items;
    smy_ob_app_items = data[3] + smy_ob_des_items;
    smy_ob_prt_items = data[4] + smy_ob_app_items;

    dash_que_id = data[5];
    dash_ad_count = data[6];
    dash_ad_elements = [];
    data_pq_sum_srcs_ip = [];
    data_pq_sum_dests_ip = [];

    data_pq_sum_srcs.length = 0;
    data_pq_sum_dests.length = 0;
    data_pq_sum_apps.length = 0;
    smy_ob_read_count = 0;

    $('#pq_mw_session_count span').text(data[7]);
};

q_smry_update = function (data) {

    for (var i = 0; i < data.length; i = i + 4) {
        smy_ob_read_count++;
        if (smy_ob_read_count <= smy_ob_src_items) {
//            console.log("src: " +num2dot(data[i]));
            data_pq_sum_srcs.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            data_pq_sum_srcs_ip.push(num2dot(data[i]));
        } else if (smy_ob_read_count <= smy_ob_des_items) {
//            console.log(num2dot(data[i]));
            data_pq_sum_dests.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            data_pq_sum_dests_ip.push(num2dot(data[i]));
        } else if (smy_ob_read_count <= smy_ob_app_items) {
            //console.log(num2dotR(data[i]));
            if (data[i] > 0) {
                data_pq_sum_apps.push({label: application_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            }
        } else {
            var prot = data[i] >>> 16;
            var port = data[i] & 0xFFFF;
            //console.log(data[i + 1] + " " + port + "  " + prot);
        }
    }
};

q_smry_update_end = function (data) {

    if (CURRENT_WINDOW !== WINDOW_USER_SUMMARY) {
        return;
    }
    if (smy_ob_src_items > 0) {
        if (dash_ad_count > 0) {
            q_smry_update_with_ad_users();
        } else {
            pq_mod_pie_update(pie_pq_sum_srcs_wrap, 0, 10);
        }
    }
    if (smy_ob_des_items > 0) {
        if (dash_ad_count === 0 || dash_ad_count === undefined) {
            pq_mod_pie_update(pie_pq_sum_dests_wrap, 1, 10);
        }
    }
    if (smy_ob_app_items > 0) {
        pq_mod_pie_update(pie_pq_sum_apps_wrap, 2, 10);
    }
};

q_smry_update_with_ad_users = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, dash_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        dash_ad_elements = data.split(";");
        for (var usr_count = 0; usr_count < dash_ad_elements.length - 1; usr_count++) {
            if (dash_ad_elements[usr_count] !== "") {
                if (usr_count < smy_ob_src_items) {
                    data_pq_sum_srcs[usr_count].label = dash_ad_elements[usr_count];
                } else if (usr_count < smy_ob_des_items) {
                    data_pq_sum_dests[usr_count - smy_ob_src_items].label = dash_ad_elements[usr_count];
                }
            }
        }
        pq_mod_pie_update(pie_pq_sum_srcs_wrap, 0, 10);
        pq_mod_pie_update(pie_pq_sum_dests_wrap, 1, 10);
    }).fail(function () {
        console.error('Problems when posting...');
    });
};

// Dashboard Source Data Updates
var smy_dashPie_ulink_items = 0;
var smy_dashPie_dlink_items = 0;
var smy_dashPie_read_count = 0;
var total_data_sent_dashPie = 0;
var total_data_received_dashPie = 0;
var init_max_srcDestAppServ_dlink = null;
var dashPie_obj_flag = true;

q_smry_dashPie_update_start = function (data) {
//    console.log("q_smry_dashPie_update_start_"+data)
    smy_dashPie_ulink_items = data[1];
    smy_dashPie_dlink_items = data[2] + smy_dashPie_ulink_items;

    dash_que_id = data[5];
    dash_ad_count = data[6];

    data_pq_dash_dlink_items = [];
    data_pq_dash_ulink_items = [];

    total_data_sent_dashPie = (uint32_float(data[3]) / 8) * 1000000;
    total_data_received_dashPie = (uint32_float(data[4]) / 8) * 1000000;
    data_dashPie_dlink.length = 0;
    data_dashPie_ulink.length = 0;
    smy_dashPie_read_count = 0;
    smy_ob_src_dlink_read_count = 0;
};

q_smry_dashPie_update = function (data) {

    dashPie_dlink_table.clear().draw();
    dashPie_ulink_table.clear().draw();

    for (var i = 0; i < data.length; i = i + 4) {

        smy_dashPie_read_count++;
        if (smy_dashPie_read_count <= smy_dashPie_ulink_items) {

            if (dashPieCat === 3) {
                data_pq_dash_ulink_items.push(application_list[data[i]]);
                data_dashPie_ulink.push({label: application_list[data[i]], value: (uint32_float(data[i + 2]) * 1000000) / 8, color: pieColorScheme[smy_dashPie_read_count - 1]});
                dashPie_ulink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,5)'>" + application_list[data[i]] + "</a>", pq_get_usage((uint32_float(data[i + 2]) * 1000000) / 8), (((uint32_float(data[i + 2]) * 1000000) / 8) * 100 / total_data_sent_dashPie).toFixed(2) + ' %']);
            } else {
                data_pq_dash_ulink_items.push(num2dot(data[i]));
                data_dashPie_ulink.push({label: num2dot(data[i]), value: (uint32_float(data[i + 2]) * 1000000) / 8, color: pieColorScheme[smy_dashPie_read_count - 1]});
                dashPie_ulink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,parseInt(dashPieCat+2))'>" + num2dot(data[i]) + "</a>", pq_get_usage((uint32_float(data[i + 2]) * 1000000) / 8), (((uint32_float(data[i + 2]) * 1000000) / 8) * 100 / total_data_sent_dashPie).toFixed(2) + ' %']);
            }

        } else if (smy_dashPie_read_count <= smy_dashPie_dlink_items) {

            smy_ob_src_dlink_read_count++;

            if (dashPieCat === 3) {

                if (dashPie_obj_flag) {
                    dashPie_obj_flag = false;
                    init_max_srcDestAppServ_dlink = application_list[data[i]];
                    dashPie_clk_seg = init_max_srcDestAppServ_dlink;
                }
                data_pq_dash_dlink_items.push(application_list[data[i]]);
                data_dashPie_dlink.push({label: application_list[data[i]], value: (uint32_float(data[i + 3]) * 1000000) / 8, color: pieColorScheme[smy_ob_src_dlink_read_count - 1]});
                dashPie_dlink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,5)'>" + application_list[data[i]] + "</a>", pq_get_usage((uint32_float(data[i + 3]) * 1000000) / 8), (((uint32_float(data[i + 3]) * 1000000) / 8) * 100 / total_data_received_dashPie).toFixed(2) + ' %']);
            } else {

                if (dashPie_obj_flag) {
                    dashPie_obj_flag = false;
                    init_max_srcDestAppServ_dlink = num2dot(data[i]);
                    dashPie_clk_seg = init_max_srcDestAppServ_dlink;
                }
                data_pq_dash_dlink_items.push(num2dot(data[i]));
                data_dashPie_dlink.push({label: num2dot(data[i]), value: (uint32_float(data[i + 3]) * 1000000) / 8, color: pieColorScheme[smy_ob_src_dlink_read_count - 1]});
                dashPie_dlink_table.row.add(["", "<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,parseInt(dashPieCat+2))'>" + num2dot(data[i]) + "</a>", pq_get_usage((uint32_float(data[i + 3]) * 1000000) / 8), (((uint32_float(data[i + 3]) * 1000000) / 8) * 100 / total_data_received_dashPie).toFixed(2) + ' %']);
            }

        } else {
            var prot = data[i] >>> 16;
            var port = data[i] & 0xFFFF;
            //console.log(data[i + 1] + " " + port + "  " + prot);
        }
    }
};

q_smry_src_update_end = function (data) {

    if (smy_dashPie_ulink_items > 0) {
        if (dash_ad_count > 0) {
            q_smry_dashPie_update_with_ad_users();
        } else {
            dashPie_ulink_table.draw(false);            
        }
        pie_pq_dashPie_ulink.updateProp("data.content", data_dashPie_ulink);
    }
    if (smy_dashPie_dlink_items > smy_dashPie_ulink_items) {
        if (dash_ad_count === 0 || dash_ad_count === undefined) {
            dashPie_dlink_table.draw(false);            
        }
        pie_pq_dashPie_dlink.updateProp("data.content", data_dashPie_dlink);
    }
};

q_smry_dashPie_update_with_ad_users = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, dash_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
//        console.log(data)

        var dashPie_ad_elements = data.split(";");

        var num_rows_tbd = dashPie_dlink_table.rows().count();
        var num_rows_tbu = dashPie_ulink_table.rows().count();

        for (var elm_count = 0; elm_count < num_rows_tbd; elm_count++) {
            if (num_rows_tbd >= elm_count && dashPie_ad_elements[smy_dashPie_ulink_items + elm_count] !== '') {
                dashPie_dlink_table.cell(elm_count, 1).data("<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,6," + elm_count + ")'>" + dashPie_ad_elements[smy_dashPie_ulink_items + elm_count] + "</a>");
            }
        }
        for (var elm_count = 0; elm_count < num_rows_tbu; elm_count++) {
            if (num_rows_tbu >= elm_count && dashPie_ad_elements[elm_count] !== '') {
                dashPie_ulink_table.cell(elm_count, 1).data("<a style='cursor:pointer; text-decoration: none' onclick='redirect_live_watch(this.text,7," + elm_count + ")'>" + dashPie_ad_elements[elm_count] + "</a>");
            }
        }

        dashPie_dlink_table.draw(false);
        dashPie_ulink_table.draw(false);

    }).fail(function () {
        console.error('Problems when posting...');
    });
};

var lsumry_que_id = 0;
var lsumry_ad_count = 0;

lsumry_update_start = function (data) {
    lsumry_que_id = data[5];
    lsumry_ad_count = data[6];
    data_pq_live_usage.length = 0;
};

lsumry_update = function (type, data) {
    for (var i = 0; i < data.length; i = i + 4) {
        if (data[i] >= 0) {
            if (type == LSUM_DES_T_APP || type == LSUM_SRC_T_APP) {
                data_pq_live_usage.push({label: application_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            } else if (type == LSUM_DES_T_SVS || type == LSUM_SRC_T_SVS) {
                data_pq_live_usage.push({label: pq_services_list[data[i]], value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            } else {
                data_pq_live_usage.push({label: num2dot(data[i]), value: ((uint32_float(data[i + 2]) + uint32_float(data[i + 3])) * 1000000) / 8});
            }
        }
    }
};

lsumry_update_end = function (data) {
    if (data_pq_live_usage.length > 0) {
//        if (CURRENT_WINDOW != WINDOW_LIVE_SERVER_WATCH) {
//            return;
//        }
        if (lsumry_ad_count > 0) {
            lsumry_update_with_ad_users();
        } else {
            pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 10);
        }
    }
};

lsumry_update_with_ad_users = function () {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, lsumry_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        var element = data.split(";");
        for (var usr_count = 0; usr_count < element.length - 1; usr_count++) {
            if (element[usr_count] !== "") {
                data_pq_live_usage[usr_count].label = element[usr_count];
            }
        }
        pie_pq_live_usage_wrap.update_summery_pie(pie_pq_live_usage_id, 10);

    }).fail(function () {
        console.error('Problems when posting...');
    });
};

//S-C Diagram 
var durl_discovery_count = 0;
var durl_discovery_que_id = 0;
var sc_diagram_mask = 0;
var sc_diagram_start_type = 0;
var sc_diagram_parent_que = [];
var sc_diagram_parent_id = 0;
var sc_diagram_parent_type = 0;
var sc_diagram_url_element = [];

var sc_diagram_make_request = function (req_data) {
    var req = new Uint32Array(4);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = req_data.ip;
    req[3] = pq_2_16_32(req_data.mask, 0);
    return req.buffer;
    //console.log(req_data.mask,req[2])
};

var pre_ip = 0;
var ip_node_id = 0;
var port_node_id = 0;
var sc_port_map = [];

sc_diagram_update_start = function (id, type, mask_type, d_url_que_id, d_url_dis_count) {
    sc_diagram_mask = mask_type;
    sc_diagram_start_type = type;
    durl_discovery_count = d_url_dis_count;
    durl_discovery_que_id = d_url_que_id;
    sc_port_map.length = 0;

    pre_ip = 0;
    ip_node_id = 0;
    port_node_id = 0;
    sc_diagram_parent_que.length = 0;
};

sc_diagram_update = function (id, type, data) {
    var act_length = data.length;
    if (data.length % 5 != 0) {
        act_length--;
    }
    if (act_length % 5 === 0) {
        sc_diagram_parent_que.push(data);
        sc_diagram_parent_id = id;
        sc_diagram_parent_type = type;
    } else {
        console.log('Invalid SC-Diagram Data');
    }
};

sc_diagram_run_collective_update = function () {

    while (sc_diagram_parent_que.length > 0) {
        var data = sc_diagram_parent_que.shift();
        var act_length = data.length;
        if (data.length % 5 !== 0) {
            act_length--;
        }

        for (var i = 0; i < act_length; i = i + 5) {
            //console.log(data[i]);
            var url = '';
            if (sc_diagram_url_element.length > 0) {
                url = sc_diagram_url_element.shift();
            }
            var ip = data[i];
            var count = data[i + 2];// >>> 16;
            var port = data[i + 1];//& 0xFFFF;
            var data_w;
            var port_id = port;

            if (sc_diagram_parent_id === SCD_TRAFIC) {
                data_w = 1 + ((uint32_float(data[i + 3]) + uint32_float(data[i + 4])) * 1000000) / 8;
                if (sc_diagram_mask < 32) {
                    port_id = num2dot(port);
                    if (sc_diagram_start_type === CLIENT_DIAGRAM) {
                        if (url !== '') {
                            port_id = port_id + " (" + url + ")";
                        }
                    }
                } else {
                    port_id = "port: " + (pq_pad(port, 5, '0') + "");
                }
                //console.log(port_id)
            } else if (sc_diagram_parent_id === SCD_SESSIONS) {
                data_w = 1 + count;
                if (sc_diagram_mask < 32) {
                    port_id = num2dot(port);
                    if (sc_diagram_start_type === CLIENT_DIAGRAM) {
                        if (url !== '') {
                            port_id = port_id + " (" + url + ")";
                        }
                    }
                } else {
                    port_id = "port: " + (pq_pad(port, 5, '0') + "");
                }
            } else {
                data_w = 1 + port;
                if (sc_diagram_mask < 32) {
                    port_id = num2dot(count);
                    if (sc_diagram_start_type === CLIENT_DIAGRAM) {
                        if (url !== '') {
                            port_id = url + " (" + port_id + ")";
                        }
                    }
                    port_id = port_id + " - " + port;
                }
                port_id = port_id + ' ms';
            }

            if (pre_ip !== ip) { //New Server Node
                var ip_node_name = num2dot(ip);
                if (sc_diagram_start_type === CLIENT_DIAGRAM && sc_diagram_mask < 32) {

                } else {
                    if (url !== '') {
                        ip_node_name = ip_node_name + " (" + url + ")";
                    }
                }
                sc_sd_diagram.nodes.push({
                    "name": ip_node_name,
                    "id": num2dot(ip)
                });
                if (sc_digram_colors[num2dot(ip)] == null) {
                    sc_digram_colors[num2dot(ip)] = randomColor({
                        luminosity: 'bright'
                    });
                }

                ip_node_id = sc_sd_diagram.nodes.length - 1;

                sc_sd_diagram.links.push({
                    "source": 0,
                    "value": data_w,
                    "target": ip_node_id
                });
            }

            if (sc_port_map[port] == null) {
                sc_sd_diagram.nodes.push({
                    "name": port_id + "",
                    "id": port + ""
                });
                port_node_id = sc_sd_diagram.nodes.length - 1;
                sc_port_map[port] = port_node_id;
            } else {
                port_node_id = sc_port_map[port];
            }

            if (sc_digram_colors[port_id] == null) {
                sc_digram_colors[port_id] = randomColor({
                    luminosity: 'bright'
                });
            }

            sc_sd_diagram.links.push({
                "source": ip_node_id,
                "value": data_w,
                "target": port_node_id
            });
            pre_ip = ip;
        }
    }
};

sc_diagram_update_with_url = function (table, col_id) {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, durl_discovery_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        sc_diagram_url_element = data.split(";");
        sc_diagram_run_collective_update();
        run_diagram();
    }).fail(function () {
        sc_diagram_run_collective_update();
        run_diagram();
    });
};

sc_diagram_update_end = function (type) {
    sc_diagram_url_element.length = 0;
    if ((type === SERVER_DIAGRAM && sc_diagram_mask >= 32) || durl_discovery_count === 0) {
        sc_diagram_run_collective_update();
        run_diagram();
    } else {
        sc_diagram_update_with_url();
    }
};

//T-C Diagram

var turl_discovery_count = 0;
var turl_discovery_que_id = 0;
var tc_diagram_parant_que = [];
var tc_diagram_parant_id = 0;
var tc_diagram_parant_type = 0;
var tc_diagram_url_element = [];
var tc_diagram_ad_user_map = [];

var tc_diagram_make_request = function (req_data) {

    var req = new Uint32Array(8);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = req_data.sip;
    req[3] = req_data.dip;
    req[4] = pq_2_16_32(req_data.sport, req_data.dport);
    req[5] = pq_1_16_2_8_32(req_data.vid, req_data.prot, req_data.app);
    req[6] = req_data.sipr;
    req[7] = req_data.dipr;
    return req.buffer;
};

tc_diagram_update_start = function (type, id, d_url_que_id, d_url_dis_count) {
    turl_discovery_count = d_url_dis_count;
    turl_discovery_que_id = d_url_que_id;
    tc_dgam_data.length = 0;
    tc_diagram_parant_que.length = 0;
    tc_diagram_ad_user_map = [];
};

trafic_diagram_update = function (type, data) {
    if (data.length % 4 === 0) {
        tc_diagram_parant_que.push(data);
        tc_diagram_parant_type = type;
    } else {
        console.log('Invalid TC-Diagram Data');
    }
};

tc_diagram_collective_update = function () {
    while (tc_diagram_parant_que.length > 0) {
        var data = tc_diagram_parant_que.shift();
        for (var i = 0; i < data.length; i = i + 4) {
            var user = '';
            var url = '';
            if (tc_diagram_url_element.length > 0) {
                user = tc_diagram_url_element.shift();
                url = tc_diagram_url_element.shift();
            }
            var ip_src = num2dot(data[i]);
            var ip_node_name = num2dot(data[i + 1]);
            if (user !== '') {
                ip_src = user;
                tc_diagram_ad_user_map[user] = num2dot(data[i]);
                if (tc_dgam_colours[user] == null) {
                    tc_dgam_colours[user] = randomColor({
                        luminosity: 'bright'
                    });
                }
            } else {
                if (tc_dgam_colours[num2dot(data[i])] == null) {
                    tc_dgam_colours[num2dot(data[i])] = randomColor({
                        luminosity: 'bright'
                    });
                }
            }
            if (url !== '') {
                ip_node_name = url + " (" + ip_node_name + ")";
            }
            tc_dgam_data.push([ip_src, ip_node_name, (uint32_float(data[i + 2]) * 1000000) / 8, (uint32_float(data[i + 3]) * 1000000) / 8]);
        }
    }
};

tc_diagram_update_with_url = function (table, col_id) {
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, 43, 75, turl_discovery_que_id); // request url listing
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 1000,
        type: 'POST',
        url: '/'
    }).done(function (data) {
        tc_diagram_url_element = data.split(";");
        tc_diagram_collective_update();
        draw_trafic_diagram();
    }).fail(function () {
        tc_diagram_collective_update();
        draw_trafic_diagram();
    });
};

session_diagram_update = function (type, data) {

};

tc_diagram_update_end = function (type, id) {
    if (type == TRAFFIC_DIAGRAM) {
        if (turl_discovery_count > 0) {
            tc_diagram_update_with_url();
        } else {
            tc_diagram_collective_update();
            draw_trafic_diagram();
        }

    } else if (type == SESSION_DIAGRAM) {

    }
};

//Informations-Request

var info_get_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    return req.buffer;
};

info_get_update = function (type, id, data) {

    if (type == INFO_MANW_ST_RQ) {
        $('#pq_mw_event_count').text('Events: ' + data[0]);
        $('#pq_mw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_mw_session_count').text('Total Sessions: ' + data[2]);
        $('#pq_sw_event_count').text('Events: ' + data[0]);
        $('#pq_sw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_sw_session_count').text('Total Sessions: ' + data[2]);
        var uptime = data[3];
        var days = Math.floor(uptime / (60 * 60 * 24));
        uptime -= days * (60 * 60 * 24);
        var hours = Math.floor(uptime / (60 * 60));
        uptime -= hours * (60 * 60);
        var mins = Math.floor(uptime / (60));
        $('#pq_mw_uptime').text(days + ' day(s) ' + hours + ' hour(s) ' + mins + ' min(s)');
        $('#pq_sw_uptime').text(days + ' day(s) ' + hours + ' hour(s) ' + mins + ' min(s)');

    } else if (type == INFO_MANW_CT_RQ) {
        $('#pq_mw_event_count').text('Events: ' + data[0]);
        $('#pq_mw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_mw_session_count').text('Total Sessions: ' + data[2]);
        $('#pq_sw_event_count').text('Events: ' + data[0]);
        $('#pq_sw_session_ps').text('New Sessions Per-Second: ' + data[1]);
        $('#pq_sw_session_count').text('Total Sessions: ' + data[2]);

    } else if (type === INFO_SETW_RQ) {
        if (data[1] !== 0) {
            $("#license_info").text("Evaluation period ends in " + data[1] + " days");
        }
    } else {
        console.log("unknown info request update");
    }
};

//GUI Sheet Request

var gui_data_get_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    return req.buffer;
};

guid_data_update = function (type, id, data, row_data) {
//    console.log(type, id, data, row_data)
    var data_c = new Uint8Array(row_data);
    if (type === MENUBAR_SHEET) {
//        console.log("GUI Sheets " + data_c)
        if (data_c[0] === 9) {
            if (data_c[1]) {
                $('#set_prof_win').show();
            }
            if (data_c[2]) {
                $('#tab_config').show();
            }
            if (data_c[3]) {
                $('#set_mgmt_win').show();
            }
            if (data_c[4]) {
                $('#tab_set').show();
            }
            if (data_c[5]) {
                $('#set_info_win').show();
            }
            if (data_c[6]) {
                $('#set_maint_win').show();
            }
            if (data_c[7]) {
                if (data_c[7] === 1) {
                    SET_PRIMARY = true;
                } else {
                    SET_PRIMARY = false;
                }
            }
            if (data_c[8]) {
                $('#Quota_Panel').show();
            }
            if (data_c[9]) {
                $('#set_ha_win').show();
            }
        }
    } else if (type === PROPERTY_SHEET) {
        if (id === 0) { //user table propaties
            user_add_proprty_sheet = String.fromCharCode.apply(null, new Uint8Array(row_data, 1, data_c[0]));
        } else {
            console.log('invalied property sheet type');
        }
    } else {
        console.log('invalied gui sheet type');
    }
};

//Request Reply Updater

var cjs_req_conn;
var cjs_request;
var cjs_request_type = 0;
var cjs_request_que = [];
var cjs_request_status = 'none';

var cjs_make_request = function (type, request) {

    if (cjs_request_status === 'relax') {
        cjs_request_status = 'busy';
        if (type === SESSION_LIST_UPDATE ||
                type === SESSION_SOURCE_UPDATE ||
                type === SESSION_DEST_UPDATE ||
                type === SESSION_APP_UPDATE ||
                type === SESSION_SVS_UPDATE ||
                type === SUMRY_SRC_UPDATE ||
                type === SUMRY_DEST_UPDATE ||
                type === SUMRY_APP_UPDATE ||
                type === SUMRY_SDC_UPDATE ||
                type === LSUMRY_UPDATE) {
            cjs_req_conn.send(all_sessions_make_request(request));
        } else if (type === GRAPH_BH_UPDATE) {
            cjs_req_conn.send(bwh_make_request(request));
//        } else if (type === TIMESTAMP_UPDATE) {
//            cjs_req_conn.send(tgap_change_request(request));
        } else if (type === SERVER_DIAGRAM ||
                type === CLIENT_DIAGRAM) {
            cjs_req_conn.send(sc_diagram_make_request(request));
        } else if (type === TRAFFIC_DIAGRAM ||
                type === SESSION_DIAGRAM) {
            cjs_req_conn.send(tc_diagram_make_request(request));
        } else if (type === INFO_MANW_CT_RQ ||
                type === INFO_MANW_ST_RQ ||
                type === INFO_SETW_RQ) {
            cjs_req_conn.send(info_get_request(request));
        } else if (type === MENUBAR_SHEET ||
                type === PROPERTY_SHEET) {
            cjs_req_conn.send(gui_data_get_request(request));
        } else if (type === 200) {
            cjs_req_conn.send(cjs_make_auth_req(request));
        } else {
            console.log("unidentified cjs request!");
        }
    } else {
        cjs_request_que.push([type, request]);
    }
};

var cjs_try_make_request = function () {
    if (cjs_request_status === 'relax') {
        if (cjs_request_que.length > 0) {
            cjs_request_status = 'busy';
            var req = cjs_request_que.shift();
            if (req[0] === SESSION_LIST_UPDATE ||
                    req[0] === SESSION_SOURCE_UPDATE ||
                    req[0] === SESSION_DEST_UPDATE ||
                    req[0] === SESSION_APP_UPDATE ||
                    req[0] === SESSION_SVS_UPDATE ||
                    req[0] === SUMRY_SRC_UPDATE ||
                    req[0] === SUMRY_DEST_UPDATE ||
                    req[0] === SUMRY_APP_UPDATE ||
                    req[0] === SUMRY_SDC_UPDATE ||
                    req[0] === LSUMRY_UPDATE) {
                cjs_req_conn.send(all_sessions_make_request(req[1]));
            } else if (req[0] === GRAPH_BH_UPDATE) {
                cjs_req_conn.send(bwh_make_request(req[1]));
//            } else if (req[0] === TIMESTAMP_UPDATE) {
//                cjs_req_conn.send(tgap_change_request(req[1]));
            } else if (req[0] === SERVER_DIAGRAM ||
                    req[0] === CLIENT_DIAGRAM) {
                cjs_req_conn.send(sc_diagram_make_request(req[1]));
            } else if (req[0] === TRAFFIC_DIAGRAM ||
                    req[0] === SESSION_DIAGRAM) {
                cjs_req_conn.send(tc_diagram_make_request(req[1]));
            } else if (req[0] === INFO_MANW_CT_RQ ||
                    req[0] === INFO_MANW_ST_RQ ||
                    req[0] === INFO_SETW_RQ) {
                cjs_req_conn.send(info_get_request(req[1]));
            } else if (req[0] === MENUBAR_SHEET ||
                    req[0] === PROPERTY_SHEET) {
                cjs_req_conn.send(gui_data_get_request(req[1]));
            } else if (req[0] === 200) {
//                console.log("In_2")
                cjs_req_conn.send(cjs_make_auth_req(req[1]));
            } else {
                console.log("unidentified cjs request!");
            }
        }
    }
};

var cjs_request_cbk = function (data) {
    var data_q = new Uint32Array(data);
//    console.log("Length: " + data_q.length)
    if (data_q.length === 1 || data_q.length === 3 || data_q.length === 5 || data_q.length === 7 || data_q.length === 9) { //request component
        var rep = pq_32_4_8(data_q[0]);
//        console.log(rep.one, rep.two, rep.three)
        if (rep.one === CJS_REQUEST_START) {
//            console.log("REP: " + rep.one, rep.two, rep.three)
            cjs_request_type = rep;
            if (rep.two === GRAPH_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === GRAPH_BH_UPDATE) {
                    bwh_update_start(rep.four, data_q);
                }
            } else if (rep.two === SESSION_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === SESSION_LIST_UPDATE) {
                    all_sessions_update_start(rep.four, data_q[1], data_q[2], data_q[3], data_q[4]);
                } else if (rep.three === SESSION_SOURCE_UPDATE ||
                        rep.three === SESSION_DEST_UPDATE ||
                        rep.three === SESSION_APP_UPDATE || rep.three === SESSION_SVS_UPDATE) {
                    q_sessions_update_start(rep.three, data_q[1], data_q[2], data_q[3], data_q[4]);
                } else if (rep.three === SUMRY_SRC_UPDATE ||
                        rep.three === SUMRY_DEST_UPDATE ||
                        rep.three === SUMRY_APP_UPDATE) {
                    q_smry_dashPie_update_start(data_q);
//                } else if (rep.three === SUMRY_DEST_UPDATE) {
//                    q_smry_dst_update_start(data_q);
//                } else if (rep.three === SUMRY_APP_UPDATE) {
//                    q_smry_app_update_start(data_q);
                } else if (rep.three === SUMRY_SDC_UPDATE) {
                    q_smry_update_start(data_q);
                } else if (rep.three === LSUMRY_UPDATE) {
                    lsumry_update_start(data_q);
                }

            } else if (rep.two === DIAGRAM_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
                if (rep.three === SERVER_DIAGRAM || rep.three === CLIENT_DIAGRAM || rep.three === APP_DIAGRAM || rep.three === SVS_DIAGRAM) {
                    sc_diagram_update_start(rep.four, rep.three, data_q[2], data_q[3], data_q[4]);
                } else if (rep.three === SESSION_DIAGRAM || rep.three === TRAFFIC_DIAGRAM) {
                    tc_diagram_update_start(rep.three, rep.four, data_q[3], data_q[4]);
                }
            } else if (rep.two === INFORMATION_UPDATE) {
                cjs_request = rep;
                cjs_request_type = rep.three;
            } else if (rep.two === GUI_SHEETS) {
                cjs_request = rep;
                cjs_request_type = rep.three;
            } else {
//                console.log(rep.one, rep.two, rep.three)
                console.log("unknown request start");
            }

        } else if (rep.one === CJS_REQUEST_END) {
            cjs_request_type = rep;
            if (rep.two === GRAPH_UPDATE) {
                if (rep.three === GRAPH_BH_UPDATE) {
                    bwh_update_end(rep.four);
                }
            } else if (rep.two === SESSION_UPDATE) {
                if (rep.three === SESSION_LIST_UPDATE) {
                    all_sessions_update_end(rep.four);
                } else if (rep.three === SESSION_SOURCE_UPDATE ||
                        rep.three === SESSION_DEST_UPDATE ||
                        rep.three === SESSION_APP_UPDATE ||
                        rep.three === SESSION_SVS_UPDATE) {
                    q_sessions_update_end(rep.three);
                } else if (rep.three === SUMRY_SRC_UPDATE ||
                        rep.three === SUMRY_DEST_UPDATE ||
                        rep.three === SUMRY_APP_UPDATE) {
                    q_smry_src_update_end(data_q);
//                } else if (rep.three === SUMRY_DEST_UPDATE) {
//                    q_smry_dst_update_end(data_q);
//                } else if (rep.three === SUMRY_APP_UPDATE) {
//                    q_smry_app_update_end(data_q);
                } else if (rep.three === SUMRY_SDC_UPDATE) {
                    q_smry_update_end(data_q);
                } else if (rep.three === LSUMRY_UPDATE) {
                    lsumry_update_end(data_q);
                }
            } else if (rep.two === SETTINGS_UPDATE) {
                if (rep.three === TIMESTAMP_UPDATE) {
                    tgap_update_end(rep.four);
                }
            } else if (rep.two === DIAGRAM_UPDATE) {
                if (rep.three === SERVER_DIAGRAM || rep.three === CLIENT_DIAGRAM || rep.three === APP_DIAGRAM || rep.three === SVS_DIAGRAM) {
                    sc_diagram_update_end(rep.four);
                } else if (rep.three === SESSION_DIAGRAM || rep.three === TRAFFIC_DIAGRAM) {
                    tc_diagram_update_end(rep.three, rep.four);
                }
            } else if (rep.two === INFORMATION_UPDATE) {
                //Nothing to do here             
            } else if (rep.two === GUI_SHEETS) {
                //Nothing to do here                    
            } else if (rep.two === 200) {
//                console.log("In_3")
                //Nothing to do here
            } else {
                console.log("unknown request end");
            }

            cjs_request_status = 'relax';
            cjs_try_make_request();
        } else {
            console.log('undefined cjs request');
        }
    } else {
//        console.log(cjs_request.one, cjs_request.two)
        if (cjs_request.two === GRAPH_UPDATE) { //graph update
            if (cjs_request.three === GRAPH_BH_UPDATE) { //update graph type
                var graph_id = cjs_request.four;
                bwh_update(graph_id, data_q);
            }
        } else if (cjs_request.two === SESSION_UPDATE) { //graph update

            if (cjs_request.three === SESSION_LIST_UPDATE) { //update graph type
                var slist_id = cjs_request.four;
                all_sessions_update(slist_id, data_q);
            } else if (cjs_request.three === SESSION_SOURCE_UPDATE ||
                    cjs_request.three === SESSION_DEST_UPDATE ||
                    cjs_request.three === SESSION_APP_UPDATE ||
                    cjs_request.three === SESSION_SVS_UPDATE) {
                q_sessions_update(cjs_request.three, data_q);
            } else if (cjs_request.three === SUMRY_SRC_UPDATE ||
                    cjs_request.three === SUMRY_DEST_UPDATE ||
                    cjs_request.three === SUMRY_APP_UPDATE) {
                q_smry_dashPie_update(data_q);
//            } else if (cjs_request.three === SUMRY_DEST_UPDATE) {
//                q_smry_dst_update(data_q);
//            } else if (cjs_request.three === SUMRY_APP_UPDATE) {
//                q_smry_app_update(data_q);
            } else if (cjs_request.three === SUMRY_SDC_UPDATE) {
                q_smry_update(data_q);
            } else if (cjs_request.three === LSUMRY_UPDATE) {
                lsumry_update(cjs_request.four, data_q);
            }

        } else if (cjs_request.two === DIAGRAM_UPDATE) { //graph update
            if (cjs_request.three === SERVER_DIAGRAM ||
                    cjs_request.three === CLIENT_DIAGRAM ||
                    cjs_request.three === APP_DIAGRAM ||
                    cjs_request.three === SVS_DIAGRAM) {
                sc_diagram_update(cjs_request.four, cjs_request.three, data_q);
            } else if (cjs_request.three === SESSION_DIAGRAM) {
                session_diagram_update(cjs_request.three, data_q);
            } else if (cjs_request.three === TRAFFIC_DIAGRAM) {
                trafic_diagram_update(cjs_request.three, data_q);
            }
        } else if (cjs_request.two === INFORMATION_UPDATE) {
            info_get_update(cjs_request.three, cjs_request.four, data_q);
        } else if (cjs_request.two === GUI_SHEETS) {
            guid_data_update(cjs_request.three, cjs_request.four, data_q, data);
        } else {
            console.log('undifine cjs mass update');
        }
    }
    data_q = null;
};

var cjs_init_request_connection = function (def) {
    if (typeof MozWebSocket != "undefined") {
        cjs_req_conn = new MozWebSocket(get_cjs_ws_url(), def);
    } else {
        cjs_req_conn = new WebSocket(get_cjs_ws_url(), def);
    }
    cjs_req_conn.binaryType = 'arraybuffer';
    cjs_make_request(200, {
        type: 200,
        gid: $.cookie('pqsf')
    });
    try {
        cjs_req_conn.onopen = function () {
            console.log(def + " connected");
            cjs_request_status = 'relax';
            cjs_try_make_request();
        };

        cjs_req_conn.onmessage = function got_message(msg) {
            cjs_request_cbk(msg.data);
        };
        cjs_req_conn.onclose = function () {
            var modal = document.getElementById('DisconnectModal');
            modal.style.display = "block";
            console.log(def + " connection closed");
            cjs_request_status = 'none';
        };

    } catch (exception) {
        alert('<p>Error' + exception);
    }
};var lu_plot = [];
var lu_dbuff = [];
var lu_cbuff = [];
var lu_color = [];
var lu_vname = [];
var lu_ref_time = [];
var lu_last_update_time = [];
//var lu_vlan_id = [];
var lu_vlan_d_id = [];
var lu_vlan_u_id = [];

var lu_bwg_prv_ts = [];
var lu_bwg_prv_csc_cnt = [];

var URL_WATCH_FLAG;

var lcju_make_auth_req = function (req_data) {
    var cmd_buffer = new ArrayBuffer(4 * 1 + req_data.gid.length);
    var req = new Uint32Array(cmd_buffer, 0, 1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, 0, 0);
    var bemail = new Uint8Array(cmd_buffer, 4, req_data.gid.length);
    for (var cit = 0; cit < req_data.gid.length; cit++) {
        bemail[cit] = req_data.gid.charCodeAt(cit);
    }
    return cmd_buffer;
};

//Live Bandwidth Updates

var labwu_make_request = function (req_data) {
    var req = new Uint32Array(3);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = pq_2_16_32(req_data.link, req_data.chanel);
    return req.buffer;
};

var labwu_graph_init = function (div, color, gid) {

    if (lu_dbuff[gid] == null) {
        var data = [];
        data.push([0, 0]);
        lu_dbuff[gid] = data;
        lu_ref_time[gid] = 0;
        var clr = [];
        clr.push([color]);
        lu_cbuff[gid] = clr;
        lu_vname[gid] = [];
        lu_color[gid] = [color];
        lu_last_update_time[gid] = 0;
    }

    var graph = new Dygraph(document.getElementById(div), lu_dbuff[gid], lu_cbuff[gid], 0, gid,
            {
                animatedZooms: true,
                drawGrid: false,
                showRoller: false,
                fillGraph: true,
                plotter: smoothPlotter,
                color: color,
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axisLabelFontSize: 10,
                axes: {
                    y: {
                        axisLabelWidth: 65,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            return x_axis_av_formatter(x);
                        }
                    }
                }
            });
    lu_plot[gid] = graph;
    return  gid;
};

labwu_update_start = function (id, data) {
    lu_plot[id].resize();
    lu_ref_time[id] = new Date(4294967296 * data[4] + data[3]);
//    console.log('lbwu - lvbwu time update: ' + lu_ref_time[id]);
    lu_dbuff[id] = [];
    lu_cbuff[id].length = 0;
    lu_bwg_prv_ts[id] = 0;
    lu_bwg_prv_csc_cnt[id] = 0;
    lu_last_update_time[id] = 0;
//    lu_vlan_id[id] = [];
//    lu_vlan_d_id = [];
//    lu_vlan_u_id = [];
};

labwu_update = function (id, data) {
    if (data.length % 2 === 0) {
        var time;
        for (var i = 0; i < data.length; i = i + 2) {
            var bw = uint32_float(data[i]); //(data[i] * 8 / (1000));
            //var bw_f = uint32_float(data[i]);
            var tstamp = data[i + 1];
//            console.log(tstamp)
            if (tstamp > 0 && bw < 60000) {
                //Add Data to Graph
                time = new Date(tstamp * 1000);

                if (lu_bwg_prv_ts[id] !== 0) {
                    if ((time - lu_bwg_prv_ts[id]) >= 30000) {
                        var time_p = new Date(lu_bwg_prv_ts[id] + 10000 / 2);
                        var time_n = new Date(time.getTime() - 10000 / 2);
                        lu_dbuff[id].push([time_p, 0]);
                        lu_dbuff[id].push([time_n, 0]);
                    }
                }
                if (time >= lu_bwg_prv_ts[id]) {
                    lu_bwg_prv_ts[id] = time;
                    lu_bwg_prv_csc_cnt[id] = 0;
                    lu_dbuff[id].push([time, bw]);

                    if (lu_cbuff[id].length <= 1400) {
                        lu_cbuff[id].push(lu_color[id]);
                    }
                    //Remove Old Points from Graph
                    if (lu_dbuff[id].length > 1400) {
                        lu_dbuff[id].shift();
                    }
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = lu_last_update_time[id];
                    lu_bwg_prv_csc_cnt[id]++;
                    if (lu_bwg_prv_csc_cnt[id] > 3) {
                        lu_dbuff[id].pop();
                        lu_bwg_prv_ts[id] = time;
                    }
                }
            }
        }
        //Render the Graph
        if (time - lu_last_update_time[id] >= 1000) {
            lu_last_update_time[id] = time;
            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

labwu_update_end = function (id) {
};


/// USer bw

var labwu_user_make_request = function (req_data) {
    var req = new Uint32Array(2);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
//    console.log("labwu_user_make_request "+req[1])
    return req.buffer;
};

var labwu_user_graph_init = function (div_s, div_r, color_s, color_r, gid) {

    if (lu_dbuff[gid] == null) {

        var data = [];
        var clr_s = [];
        var clr_r = [];
        data.push([0, 0]);
        clr_s.push([color_s]);
        clr_r.push([color_r]);
        lu_color[gid] = [color_s];
        lu_color[gid + 1] = [color_r];
        lu_dbuff[gid] = data;
        lu_dbuff[gid + 1] = data;
        lssd_ref_time[gid] = 0;
        lu_cbuff[gid] = clr_s;
        lu_cbuff[gid + 1] = clr_r;
        lu_last_update_time[gid] = 0;
        lu_last_update_time[gid + 1] = 0;

    }
    var av_graph_send = new Dygraph(document.getElementById(div_s), lu_dbuff[gid], lu_cbuff[gid], 0, gid,
            {
                //drawPoints: true,
                showRoller: false,
                fillGraph: true,
                plotter: smoothPlotter,
//                    colors: [color_s, color_r],
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axisLabelFontSize: 10,
                axes: {
                    x: {
                        valueFormatter: function (x) {
                            return x_axis_av_formatter(x);
                        }
                    },
                    y: {
                        axisLabelWidth: 60,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    }
                }
            });

    var av_graph_receive = new Dygraph(document.getElementById(div_r), lu_dbuff[gid + 1], lu_cbuff[gid + 1], 0, (gid + 1),
            {
                //drawPoints: true,
                showRoller: false,
                fillGraph: true,
                plotter: smoothPlotter,
//                    colors: [color_s, color_r],
                labels: ['Time', 'Bandwidth'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axisLabelFontSize: 10,
                axes: {
                    x: {
                        valueFormatter: function (x) {
                            return x_axis_av_formatter(x);
                        }
                    },
                    y: {
                        axisLabelWidth: 60,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        }
                    }
                }
            });

    lu_plot[gid] = av_graph_send;
    lu_plot[gid + 1] = av_graph_receive;

    return  gid;
};

labwu_user_update_start = function (id, data) {

    lu_plot[id].resize();
    lu_plot[id + 1].resize();
    lu_dbuff[id] = [];
    lu_cbuff[id].length = 0;
    lu_dbuff[id + 1] = [];
    lu_cbuff[id + 1].length = 0;
    lu_bwg_prv_ts[id] = 0;
    lu_bwg_prv_ts[id + 1] = 0;
    lu_bwg_prv_csc_cnt[id] = 0;
    lu_bwg_prv_csc_cnt[id + 1] = 0;
    lu_last_update_time[id] = 0;
    lu_last_update_time[id + 1] = 0;
};

labwu_user_update = function (id, data) {
//    console.log(id, data)
    var data_len;

    if (!(data.length % 3)) {
        data_len = data.length;
    } else {
        data_len = data.length - 1;
    }

    if (data_len % 3 === 0) {
        var time;
        for (var i = 0; i < data_len; i = i + 3) {
            var bw_s = uint32_float(data[i]);
            var bw_r = uint32_float(data[i + 1]);//(data[i] * 8 / (1000));
            //var bw_f = uint32_float(data[i]);
            var tstamp = data[i + 2];
//            console.log(tstamp, bw_s, bw_r)
            if (tstamp > 0) {
                //Add Data to Graph
                time = new Date(tstamp * 10 * 1000);

                if (lu_bwg_prv_ts[id] !== 0) {
                    if ((time - lu_bwg_prv_ts[id]) >= 30000) {
                        var time_p = new Date(lu_bwg_prv_ts[id] + 10000 / 2);
                        var time_n = new Date(time.getTime() - 10000 / 2);
                        lu_dbuff[id].push([time_p, 0]);
                        lu_dbuff[id].push([time_n, 0]);
                    }
                }

                if (lu_bwg_prv_ts[id + 1] !== 0) {
                    if ((time - lu_bwg_prv_ts[id + 1]) >= 30000) {
                        var time_p = new Date(lu_bwg_prv_ts[id + 1] + 10000 / 2);
                        var time_n = new Date(time.getTime() - 10000 / 2);
                        lu_dbuff[id + 1].push([time_p, 0]);
                        lu_dbuff[id + 1].push([time_n, 0]);
                    }
                }


                if (time >= lu_bwg_prv_ts[id]) {
                    lu_bwg_prv_ts[id] = time;
                    lu_bwg_prv_csc_cnt[id] = 0;
                    lu_dbuff[id].push([time, bw_s]);

                    if (lu_cbuff[id].length <= 1400) {
                        lu_cbuff[id].push(lu_color[id]);
                    }
                    //Remove Old Points from Graph
                    if (lu_dbuff[id].length > 1400) {
                        lu_dbuff[id].shift();
                    }
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = lu_last_update_time[id];
                    lu_bwg_prv_csc_cnt[id]++;
                    if (lu_bwg_prv_csc_cnt[id] > 3) {
                        lu_dbuff[id].pop();
                        lu_bwg_prv_ts[id] = time;
                    }
                }

                if (time >= lu_bwg_prv_ts[id + 1]) {
                    lu_bwg_prv_ts[id + 1] = time;
                    lu_bwg_prv_csc_cnt[id + 1] = 0;
                    lu_dbuff[id + 1].push([time, bw_r]);

                    if (lu_cbuff[id + 1].length <= 1400) {
                        lu_cbuff[id + 1].push(lu_color[id + 1]);
                    }
                    //Remove Old Points from Graph
                    if (lu_dbuff[id + 1].length > 1400) {
                        lu_dbuff[id + 1].shift();
                    }
                } else {
//                    console.log("tstamp_skip: " + time);
                    time = lu_last_update_time[id + 1];
                    lu_bwg_prv_csc_cnt[id + 1]++;
                    if (lu_bwg_prv_csc_cnt[id + 1] > 3) {
                        lu_dbuff[id + 1].pop();
                        lu_bwg_prv_ts[id + 1] = time;
                    }
                }
            }
        }
        //Render the Graph

        if (time - lu_last_update_time[id] >= 1000) {
            lu_last_update_time[id] = time;
            lu_plot[id].updateOptions({'file': lu_dbuff[id]});
        }

        if (time - lu_last_update_time[id + 1] >= 1000) {
            lu_last_update_time[id + 1] = time;
            lu_plot[id + 1].updateOptions({'file': lu_dbuff[id + 1]});
        }

    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

//Live SSD Updates
var lssd_plot = [];
var lssd_dbuff = [];
var lssd_cbuff = [];
var lssd_color = [];
var lssd_label = [];
var lssd_status_bar = [];
var lssd_tbw = [];
var lssd_pkt = [];
var lssd_ref_time = [];
var lssd_last_update_time = [];
var lssd_prev_tspan = 0;

var lssd_make_request = function (req_data) {

    var req = new Uint32Array(6);
    req[0] = pq_4_8_32(CJS_REQUEST_START, req_data.type, req_data.id, req_data.gid);
    req[1] = req_data.uid;
    req[2] = req_data.sip;
    req[3] = req_data.dip;
    req[4] = pq_2_16_32(req_data.sport, req_data.dport);
    req[5] = pq_1_16_2_8_32(req_data.vid, req_data.prot, req_data.app);
//    console.log(req)
    return req.buffer;
};

lssd_chart_plotter = function (e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    // This should really be based on the minimum gap
    var bar_width = 2;// 2 / 3 * (points[1].canvasx - points[0].canvasx);
    //ctx.fillStyle = e.color;

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
        ctx.fillStyle = e.dygraph.pqcolor[i][e.pqmcolor];
        ctx.fillRect(center_x - bar_width / 2, p.canvasy,
                bar_width, y_bottom - p.canvasy);
//        ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
//                bar_width, y_bottom - p.canvasy);
    }
};

var lssd_graph_init = function (type, div_s, div_r, color_s, color_r, lbl_s, lbl_r, pkt_s, pkt_r, status_bar, gid) {

    var data = [];
    var clr_s = [];
    var clr_r = [];
    if (type == LSES_UPDATE) {
        data.push([0, 0]);
        clr_s.push([color_s]);
        clr_r.push([color_r]);
        lssd_color[gid] = [color_s];
        lssd_color[gid + 1] = [color_r];
    } else {
        data.push([0, 0, 0]);
        clr_s.push([color_r, color_s]);
        clr_r.push([color_r, color_s]);
        lssd_color[gid] = [color_r, color_s];
//        lssd_color[gid + 1] = [color_s, color_r];
    }
    lssd_dbuff[gid] = data;
    lssd_dbuff[gid + 1] = data;
    lssd_ref_time[gid] = 0;
    lssd_cbuff[gid] = clr_s;
    lssd_cbuff[gid + 1] = clr_r;
    lssd_label[gid] = [$(lbl_s), $(pkt_s)];
    lssd_label[gid + 1] = [$(lbl_r), $(pkt_r)];
    lssd_status_bar[gid] = [$(status_bar)];
    lssd_status_bar[gid + 1] = [$(status_bar)];
    lssd_tbw[gid] = 0;
    lssd_tbw[gid + 1] = 0;
    lssd_last_update_time[gid] = 0;
    lssd_last_update_time[gid + 1] = 0;

    if (type == LSES_UPDATE) {

        var av_graph_send = new Dygraph(document.getElementById(div_s), lssd_dbuff[gid], lssd_cbuff[gid], 0, (gid),
                {
                    //drawPoints: true,
                    showRoller: false,
                    fillGraph: true,
                    plotter: smoothPlotter,
//                    colors: [color_s, color_r],
                    labels: ['Time', 'Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_av_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 60,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });

        var av_graph_receive = new Dygraph(document.getElementById(div_r), lssd_dbuff[gid + 1], lssd_cbuff[gid + 1], 0, (gid + 1),
                {
                    //drawPoints: true,
                    showRoller: false,
                    fillGraph: true,
                    plotter: smoothPlotter,
//                    colors: [color_s, color_r],
                    labels: ['Time', 'Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_av_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 60,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });
        lssd_plot[gid] = av_graph_send;
        lssd_plot[gid + 1] = av_graph_receive;

    } else {
        var graph_send_rec = new Dygraph(document.getElementById(div_s), lssd_dbuff[gid], lssd_cbuff[gid], 0, gid,
                {
                    //drawPoints: true,
                    showRoller: false,
                    fillGraph: true,
                    plotter: smoothPlotter,
                    colors: [color_s, color_r],
                    labels: ['Time', 'Uplink Bandwidth', 'Downlink Bandwidth'],
                    labelsDivStyles: pq_dygraph_tooltip(),
                    labelsSeparateLines: true,
                    axisLabelFontSize: 10,
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                return x_axis_av_formatter(x);
                            }
                        },
                        y: {
                            axisLabelWidth: 60,
                            valueFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            },
                            axisLabelFormatter: function (x) {
                                return y_axis_bw_val_formatter(x, 2);
                            }
                        }
                    }
                });
        lssd_plot[gid] = graph_send_rec;
    }
    return  gid;
};

lssd_update_start = function (type, id, data) {
//    console.log(type, id, data)
    lssd_dbuff[id] = [];
    lssd_cbuff[id].length = 0;
    lssd_dbuff[id + 1] = [];
    lssd_cbuff[id + 1].length = 0;
    lssd_tbw[id] = 0;
    lssd_tbw[id + 1] = 0;
    lssd_pkt[id] = 0;
    lssd_pkt[id + 1] = 0;
    lssd_label[id][0].text('Data Sent : 0 MB');
    lssd_label[id][1].text('Packets Sent : 0');
    lssd_label[id + 1][0].text('Data Received : 0 MB');
    lssd_label[id + 1][1].text('Packets Received : 0');
    lssd_status_bar[id][0].css('background-color', '#005d00');
};

lses_update = function (id, data) {
//    console.log(data)    
    if (!(data.length % 5)) {
        data_len = data.length;
    } else {
        data_len = data.length - 1;
    }

    if (data_len % 5 === 0) {
        for (var i = 0; i < data_len; i = i + 5) {
            var bw_s = data[i];
            var bw_r = data[i + 1];
            var pkt_s = data[i + 2];
            var pkt_r = data[i + 3];
            var tstamp = data[i + 4] * 10 * 1000;

            lssd_dbuff[id].push([(new Date(tstamp)), uint32_float(bw_s)]);
            lssd_dbuff[id + 1].push([(new Date(tstamp)), uint32_float(bw_r)]);

            lssd_tbw[id] += uint32_float(bw_s) * 1000 * 1000 * 10 / 8;
            lssd_tbw[id + 1] += uint32_float(bw_r) * 1000 * 1000 * 10 / 8;

            lssd_pkt[id] += pkt_s;
            lssd_pkt[id + 1] += pkt_r;

            if (lssd_cbuff[id].length < 100) {
                lssd_cbuff[id].push(lssd_color[id]);
                lssd_cbuff[id + 1].push(lssd_color[id + 1]);
            }

            if (lssd_dbuff[id].length > 100) {
                lssd_dbuff[id].shift();
            }
            if (lssd_dbuff[id + 1].length > 100) {
                lssd_dbuff[id + 1].shift();
            }
            if (tstamp - lssd_last_update_time[id] > 1000 || lssd_last_update_time[id] > tstamp) {
                lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                lssd_plot[id + 1].updateOptions({'file': lssd_dbuff[id + 1]});
                lssd_label[id][0].text('Data Sent : ' + pq_get_usage(lssd_tbw[id]));
                lssd_label[id][1].text('Packets Sent : ' + lssd_pkt[id]);
                lssd_label[id + 1][0].text('Data Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                lssd_label[id + 1][1].text('Packets Received : ' + lssd_pkt[id + 1]);

                lssd_last_update_time[id] = tstamp;
            }
        }
    } else {
        console.log('Invalid SSD Bandwidth Data');
    }
};

lssc_update = function (id, data) {
//    console.log(data.length)
    var data_len;

    if (!(data.length % 5)) {
        data_len = data.length;
    } else {
        data_len = data.length - 1;
    }

    if (data_len % 5 === 0) {
        for (var i = 0; i < data_len; i = i + 5) {
            var bw_s = data[i];
            var bw_r = data[i + 1];
            var pkt_s = data[i + 2];
            var pkt_r = data[i + 3];
            var tstamp = data[i + 4] * 10 * 1000;
//            console.log(bw_s, bw_r, pkt_s, pkt_r, tstamp)

            if (lssd_dbuff[id].length == 1) {
                lssd_dbuff[id].shift();
                lssd_dbuff[id].push([(new Date(tstamp - 1400 * 100)), 0, 0]);
                lssd_cbuff[id].push(lssd_color[id]);
                lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
            }
            if (lssd_prev_tspan !== 0) {
                if (tstamp - lssd_prev_tspan >= 20000) {
                    var time_next = new Date((tstamp - 1000));
                    var time_prev = new Date((lssd_prev_tspan + 1000));
                    lssd_dbuff[id].push([time_prev, 0, 0]);
                    lssd_dbuff[id].push([time_next, 0, 0]);
                }
            }
            lssd_prev_tspan = tstamp;

            //Add Data to Graph
            lssd_dbuff[id].push([(new Date(tstamp)), uint32_float(bw_s), uint32_float(bw_r)]);

            lssd_tbw[id] += uint32_float(bw_s) * 1000 * 1000 * 10 / 8;
            lssd_tbw[id + 1] += uint32_float(bw_r) * 1000 * 1000 * 10 / 8;
            lssd_pkt[id] += pkt_s;
            lssd_pkt[id + 1] += pkt_r;

            if (lssd_cbuff[id].length < 100) {
                lssd_cbuff[id].push(lssd_color[id]);
            }
            if (lssd_dbuff[id].length > 100) {
                lssd_dbuff[id].shift();
            }

            if (tstamp - lssd_last_update_time[id] > 1000) {
                lssd_plot[id].updateOptions({'file': lssd_dbuff[id]});
                lssd_label[id][0].text('Data Sent : ' + pq_get_usage(lssd_tbw[id]));
                lssd_label[id][1].text('Packets Sent : ' + lssd_pkt[id]);
                lssd_label[id + 1][0].text('Data Received : ' + pq_get_usage(lssd_tbw[id + 1]));
                lssd_label[id + 1][1].text('Packets Received : ' + lssd_pkt[id + 1]);
                lssd_last_update_time[id] = tstamp;
                //console.log("last: " + lssd_last_update_time[id]);
            }
        }
    } else {
        console.log('Invalid SSD Bandwidth Data');
    }
};

lssd_update_end = function (type, id) {
    $('#LiveWatchDisconnectModal').show();
    if (type === LSES_UPDATE) {
        lssd_status_bar[id][0].css('background-color', 'gray');
    } else if (type === LDES_UPDATE || type === LSRC_UPDATE || type === LAPP_UPDATE || type === LSVS_UPDATE) {
        lssd_status_bar[id][0].css('background-color', 'gray');
    } else {
        console.log("Unknown ssd end type");
    }
};

// Live bandwidth util plots

var lapp_bwutil_plot = [];
var lapp_bwutil_dbuff = [];
var lapp_bwutil_cbuff = [];
var lapp_bwutil_color = [];
var lapp_bwutil_graph = [];
var lapp_bwutil_last_update_time = [];

lapp_bwutil_update_start = function (id, data) {
    lapp_bwutil_plot[id].resize();
    lapp_bwutil_plot[id + 1].resize();
    lapp_bwutil_dbuff[id] = [];
    lapp_bwutil_dbuff[id + 1] = [];
    lapp_bwutil_cbuff[id] = [];
    lapp_dlink_buffer = [];
    lapp_ulink_buffer = [];
};

//Live URL Watch
var lurl_plot = [];
var lurl_dbuff = [];
var lurl_cbuff = [];
var lurl_color = [];
var lurl_prev_tspan = 0;
var lurl_remove_count = [];

var lurl_graph_init = function (div, color_ht, color_hs, color_ds, gid) {
    var data = [];
    var clr_s = [];
    data.push([0, 0, 0, 0]);
    clr_s.push([color_ht, color_hs, color_ds]);
    lurl_color[gid] = [color_ht, color_hs, color_ds];
    lurl_dbuff[gid] = data;
    lurl_cbuff[gid] = [color_ht, color_hs, color_ds];
    var graph_lurl = new Dygraph(document.getElementById(div), lurl_dbuff[gid], lurl_cbuff[gid], 0, gid,
            {
                drawPoints: true,
                animatedZooms: true,
                showRoller: false,
                axisLabelFontSize: 10,
                plotter: lssd_chart_plotter,
                colors: [color_ht, color_hs, color_ds],
                labels: ['Time', 'HTTP Requests', 'HTTPS Client Requests', 'DNS responses'],
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                axes: {                 
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });

    lurl_plot[gid] = graph_lurl;
    return gid;
};

lurlst_uend = function (id) {
    $('#pq_lurlw_status_ind').css('background-color', 'gray');
    $('#pq_lurlw_status_text').text('Status: Inactive');
};

lurldata_ustart = function (type, id) {
//    console.log("LURL DAT UP_" + type + "_" + id)
    sc_cd_type = CLIENT_DIAGRAM;
    lurl_dbuff[id] = [];
    lurl_cbuff[id].length = 0;
    lurl_remove_count[id] = 0;

    urlw_http_list.clear();
    urlw_https_list.clear();
    urlw_dns_list.clear();
};

lurldata_update = function (id, data, row_data) {
    if (CURRENT_WINDOW !== WINDOW_LIVE_URL_WATCH) {
        return;
    }
//    console.log('URL WATCH: ' + data + "_" + row_data + "_" + data.length)
    if (data.length % 14 === 0) {
        for (var urldc = 0; urldc < data.length; urldc += 14) {
            var tl = pq_32_2_16(data[urldc]);
            var type = tl.one;
            var length = tl.two;
            var ip = data[urldc + 1];
            var ip_o_p = data[urldc + 2];
            var url = String.fromCharCode.apply(null, new Uint8Array(row_data, (urldc + 3) * 4, length));

            if (URL_WATCH_FLAG) {
                if (type === 0) {
                    if (urlw_http_list.size() > 32) {
                        urlw_http_list.items.shift();
                    }
                    urlw_http_list.add({wurl: url, wuip: '' + num2dotR(ip), wuport: 'port: ' + ip_o_p});
                } else if (type === 1) {
                    if (urlw_https_list.size() > 32) {
                        urlw_https_list.items.shift();
                    }
                    urlw_https_list.add({wurl: url, wuip: '' + num2dotR(ip), wuport: 'port: ' + ip_o_p});
                } else if (type === 2) {
                    if (urlw_dns_list.size() > 32) {
                        urlw_dns_list.items.shift();
                    }
                    urlw_dns_list.add({wurl: url, wuip: '' + num2dotR(ip), wuport: '' + num2dotR(ip_o_p)});
                } else {
                    var time = new Date(data[urldc + 6] * 1000 * 10);
                    lurl_dbuff[id].push([time, data[urldc + 3], data[urldc + 4], data[urldc + 5]]);
                    if (lurl_cbuff[id].length < 512) {
                        lurl_cbuff[id].push(lurl_color[id]);
                        if (lurl_remove_count[id] < 3) {
                            lurl_dbuff[id].shift();
                            lurl_remove_count[id]++;
                        }
                    } else {
                        lurl_dbuff[id].shift();
                    }
                    if (lurl_dbuff[id].length > 0) {
                        lurl_plot[id].updateOptions({'file': lurl_dbuff[id]});
                    }
                }
            }
        }
    } else {
        console.log("Invalid url data");
    }
};

//Live Request Updater

var lcjs_req_conn = [];
var lcjs_request = [];
var lcjs_request_que = [];
var lcjs_request_status = [];

var lcjs_make_request = function (id, type, request) {
    if (lcjs_request_status[id] === 'relax') {
        if (type === LABW_UPDATE) {
            lcjs_req_conn[id].send(labwu_make_request(request));
        } else if (type === LMLTS_UBW_UPDATE || type === LMLTAPPU_UPDATE) {
            lcjs_req_conn[id].send(labwu_user_make_request(request));
        } else if (type === LSES_UPDATE || type === LSRC_UPDATE || type === LDES_UPDATE || type === LAPP_UPDATE || type === LSVS_UPDATE || type === LURLDATA_UPDATE) {
            lcjs_req_conn[id].send(lssd_make_request(request));
        } else if (type === 200) {
            lcjs_req_conn[id].send(lcju_make_auth_req(request));
        }
    } else {
        lcjs_request_que[id].push([type, request]);
    }
};

var lcjs_try_make_request = function (id) {
    if (lcjs_request_status[id] === 'relax') {
        if (lcjs_request_que[id].length > 0) {
            var req = lcjs_request_que[id].shift();
            if (req[0] === LABW_UPDATE) {
                lcjs_req_conn[id].send(labwu_make_request(req[1]));
            } else if (req[0] === LMLTS_UBW_UPDATE || req[0] === LMLTAPPU_UPDATE) {
                lcjs_req_conn[id].send(labwu_user_make_request(req[1]));
            } else if (req[0] === LSES_UPDATE || req[0] === LSRC_UPDATE || req[0] === LDES_UPDATE || req[0] === LAPP_UPDATE || req[0] === LSVS_UPDATE || req[0] === LURLDATA_UPDATE) {
                lcjs_req_conn[id].send(lssd_make_request(req[1]));
            } else if (req[0] === 200) {
                lcjs_req_conn[id].send(lcju_make_auth_req(req[1]));
            }
        }
    }
};

var lcjs_request_cbk = function (id, data) {
    var data_q = new Uint32Array(data);
//    console.log("LCJ_CBK " + data_q.length)
    if (data_q.length % 2 !== 0) { //request component
        var rep = pq_32_4_8(data_q[0]);
//        console.log(rep)
        if (rep.one === CJS_REQUEST_START) {
            if (rep.two === GRAPH_UPDATE) {
                lcjs_request[id] = rep;
                if (rep.three === LMLTAPPU_UPDATE) {
                    lapp_bwutil_update_start(rep.four, data_q);
                } else if (rep.three === LMLTS_UBW_UPDATE) {
                    labwu_user_update_start(rep.four, data_q);
                } else if (rep.three === LABW_UPDATE) {
                    labwu_update_start(rep.four, data_q);
                } else if (rep.three === LSES_UPDATE || rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE || rep.three == LSVS_UPDATE) {
                    lssd_update_start(rep.three, rep.four, data_q);
                } else if (rep.three === LURLDATA_UPDATE) {
                    lurldata_ustart(rep.three, rep.four);
                }
            } else {
                console.log("unknown live request start");
            }
        } else if (rep.one === CJS_REQUEST_END) {
            if (rep.two === GRAPH_UPDATE) {
                if (rep.three === LMLTAPPU_UPDATE) {
                    labwu_update_end(rep.four);
                } else if (rep.three === LMLTS_UBW_UPDATE) {
                    labwu_update_end(rep.four);
                } else if (rep.three === LSES_UPDATE || rep.three === LSRC_UPDATE || rep.three === LDES_UPDATE || rep.three == LAPP_UPDATE || rep.three == LSVS_UPDATE) {
                    lssd_update_end(rep.three, rep.four);
                } else if (rep.three === LURLDATA_UPDATE) {
                    lurlst_uend(rep.three, rep.four);
                }
            } else if (rep.two === 200) {
            } else {
                console.log("unknown live request end");
            }

            lcjs_request_status[id] = 'relax';
            lcjs_try_make_request(id);
        } else {
            console.log('undefined lcjs request');
        }
    } else {
//        console.log("Req " + id + " " + lcjs_request[id].two + " " + lcjs_request[id].three)
        if (lcjs_request[id].two === GRAPH_UPDATE) {
            if (lcjs_request[id].three === LABW_UPDATE) {
                var graph_id = lcjs_request[id].four;
                labwu_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LMLTAPPU_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lapp_bwutil_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LSES_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lses_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LSRC_UPDATE ||
                    lcjs_request[id].three === LDES_UPDATE ||
                    lcjs_request[id].three === LAPP_UPDATE ||
                    lcjs_request[id].three === LSVS_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lssc_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LMLTS_UBW_UPDATE) {
                var graph_id = lcjs_request[id].four;
                labwu_user_update(graph_id, data_q);
            } else if (lcjs_request[id].three === LURLDATA_UPDATE) {
                var graph_id = lcjs_request[id].four;
                lurldata_update(graph_id, data_q, data);
            } else {
                console.log("unknown lcjs m-update");
            }
        } else {
            console.log('undefined lcjs mass update');
        }
    }
    data_q = null;
};

var lcjs_init_request_connection = function (def) {

    if (typeof MozWebSocket !== "undefined") {
        lcjs_req_conn.push(new MozWebSocket(get_cjs_ws_url(), def));
    } else {
        lcjs_req_conn.push(new WebSocket(get_cjs_ws_url(), def));
    }
    var con_id = (lcjs_req_conn.length - 1);
    lcjs_req_conn[con_id].binaryType = 'arraybuffer';
    lcjs_request_status.push('none');
    lcjs_request_que.push([]);
    lcjs_make_request(con_id, 200, {
        type: 200,
        gid: $.cookie('pqsf')
    });
    try {
        lcjs_req_conn[con_id].onopen = function () {
            console.log(def + " connected");
            lcjs_request_status[con_id] = 'relax';
            lcjs_try_make_request(con_id);
        };
        lcjs_req_conn[con_id].onmessage = function got_message(msg) {
            lcjs_request_cbk(con_id, msg.data);
        };
        lcjs_req_conn[con_id].onclose = function () {
            var modal = document.getElementById('DisconnectModal');
            modal.style.display = "block";            
            console.log(def + " connection closed " + con_id);
            lcjs_request_status[con_id] = 'none';
        };
    } catch (exception) {
        alert('<p>Error' + exception);
    }
    return con_id;
};

x_axis_formatter = function (time) {
    var time_stamp = moment(time);
    return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss.SSS") + "</div>";
};

x_axis_av_formatter = function (time) {
    var time_stamp = moment(time);
    return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
};

vlan_x_axis_formatter = function (time, gid) {
    var time_stamp = moment(time);
    return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss.SSS") + "</div>" +
            "<div style ='color:#046277; display:inline-block; font-weight: bold; margin-left: 5px'>VLAN:</div> <div style ='color:#000; display:inline-block'>" + get_vlan_label_id(time, gid) + "</div>";
};


var tc_dgam_data = [];
var tc_dgam_colours = [];

pq_tc_diagram_refresh_clicked = function () {
    pq_restore_flow_bar('.pq_tc_diagram_filter_bar', tc_fs_id);
    refresh_trafic_dgm_now();
};

pq_tc_diagram_apply_clicked = function () {
    $('#diagram_tc_out,#diagram_tc_in').empty();
    var fdis = pq_get_flow_descriptor();
    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        uid: global_rule_user,
        gid: 0,
        sip: fdis.sip,
        sipr: fdis.sipr,
        dip: fdis.dip,
        dipr: fdis.dipr,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app
    };

    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
};

function refresh_trafic_dgm_now() {
    $('#diagram_tc_out,#diagram_tc_in').empty();
    var fdis = pq_get_flow_descriptor();

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        uid: global_rule_user,
        gid: 0,
        sip: fdis.sip,
        sipr: fdis.sipr,
        dip: fdis.dip,
        dipr: fdis.dipr,
        sport: fdis.sport,
        dport: fdis.dport,
        vid: fdis.vid,
        prot: fdis.prot,
        app: fdis.app
    };
    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
}

function draw_trafic_diagram() {

    var r_height = ((tc_dgam_data.length / 50) - 1) * 900 + 1000;
    var svg_out = d3.select("#diagram_tc_out").append("svg").attr("id", "trafic_dig_out").attr("width", (document.getElementById("diagram_tc_out").offsetWidth - 20)).attr("height", r_height);
    var svg_in = d3.select("#diagram_tc_in").append("svg").attr("id", "trafic_dig_in").attr("width", (document.getElementById("diagram_tc_in").offsetWidth - 20)).attr("height", r_height);
    $("#trafic_dig_out").addClass('pq_session_hcenter');
    $("#trafic_dig_in").addClass('pq_session_hcenter');

    var g_out = [svg_out.append("g").attr("transform", "translate(110,25)")];

    var g_in = [svg_in.append("g").attr("transform", "translate(110,25)")];

    var bp_out = [viz.bP()
                .data(tc_dgam_data)
                .min(12)
                .pad(1)
                .height(r_height - 200)
                .width(document.getElementById("diagram_tc_out").offsetWidth * 0.8 - 270)
                .barSize(35)
                .fill(function (d) {
                    return tc_dgam_colours[d.primary];
                })];
    var bp_in = [viz.bP()
                .data(tc_dgam_data)
                .value(function (d) {
                    return d[3];
                })
                .min(12)
                .pad(1)
                .height(r_height - 200)
                .width(document.getElementById("diagram_tc_in").offsetWidth * 0.8 - 270)
                .barSize(35)
                .fill(function (d) {
                    return tc_dgam_colours[d.primary];
                })
    ];

//Outbound Traffic Labels         

    g_out[0].call(bp_out[0]);

    g_out[0].append("line").attr("x1", -100).attr("x2", 0);
    g_out[0].append("line").attr("x1", 200).attr("x2", 300);

    g_out[0].selectAll(".mainBars")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", mouseClick);

    g_out[0].selectAll(".mainBars").append("text").attr("class", "label")
            .attr("x", function (d) {
                return  (d.part === "primary" ? -30 : 60);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d.key
            })
            .attr("text-anchor", function (d) {
                return (d.part === "primary" ? "end" : "start");
            });
    g_out[0].selectAll(".mainBars").append("text").attr("class", "perc")
            .attr("x", function (d) {
                return (d.part === "primary" ? -95 : 30);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d3.format("0.0%")(d.percent);
            })
            .attr("text-anchor", function (d) {
                return(d.part === "primary" ? "end" : "start");
            });

//Inbound Traffic Labels               

    g_in[0].call(bp_in[0]);

    g_in[0].append("line").attr("x1", -100).attr("x2", 0);
    g_in[0].append("line").attr("x1", 200).attr("x2", 300);

    g_in[0].selectAll(".mainBars")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", mouseClick);

    g_in[0].selectAll(".mainBars").append("text").attr("class", "label")
            .attr("x", function (d) {
                return  (d.part === "primary" ? -30 : 60);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d.key
            })
            .attr("text-anchor", function (d) {
                return (d.part === "primary" ? "end" : "start");
            });
    g_in[0].selectAll(".mainBars").append("text").attr("class", "perc")
            .attr("x", function (d) {
                return (d.part === "primary" ? -95 : 30);
            })
            .attr("y", function (d) {
                return +6
            })
            .text(function (d) {
                return d3.format("0.0%")(d.percent);
            })
            .attr("text-anchor", function (d) {
                return(d.part === "primary" ? "end" : "start");
            });

    function mouseover(d) {

        bp_out[0].mouseover(d);
        g_out[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });

        bp_in[0].mouseover(d);
        g_in[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });
    }

    function mouseout(d) {

        bp_out[0].mouseout(d);

        g_out[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });

        bp_in[0].mouseout(d);

        g_in[0].selectAll(".mainBars").select(".perc")
                .text(function (d) {
                    return d3.format("0.0%")(d.percent);
                });
    }

    function mouseClick(d) {
        if (d.part === 'primary') {
            navigate_below(d.key, "");
        } else {
            navigate_below("", d.key);
        }
    }
//    d3.select(self.frameElement).style("height", "800px");
}

function navigate_below(sip, dip) {
    $('#diagram_tc_out,#diagram_tc_in').empty();

    var ip_s = sip.indexOf("(");
    var ip_e = sip.indexOf(")");
    if (ip_e > -1 && ip_s > -1) {
        sip = sip.substring(ip_s + 1, ip_e);
    }

    ip_s = dip.indexOf("(");
    ip_e = dip.indexOf(")");
    if (ip_e > -1 && ip_s > -1) {
        dip = dip.substring(ip_s + 1, ip_e);
    }

    var diagram_req = {
        type: DIAGRAM_UPDATE,
        id: TRAFFIC_DIAGRAM,
        uid: global_rule_user,
        gid: 0,
        sip: dot2num(sip),
        sipr: dot2num(sip),
        dip: dot2num(dip),
        dipr: dot2num(dip),
        sport: 0,
        dport: 0,
        vid: 0,
        prot: 0,
        app: 0
    };

    cjs_make_request(TRAFFIC_DIAGRAM, diagram_req);
}var pq_flow_filter = [{valid: false, value: ''}, //S_IP
    {valid: false, value: ''}, //D_IP
    {valid: false, value: ''}, //S_PORT
    {valid: false, value: ''}, //D_PORT
    {valid: false, value: ''}, //PROT
    {valid: false, value: ''}, //VLAN
    //{valid: false, value: ''}, //Channel
    {valid: false, value: ''}];//App

var pq_flow_filter_clone = [];
pq_flow_filter_clone = pq_flow_filter.slice(0);
var original_pq_flow_dropdown;// = $("#pq_flow_dropdown").clone();
var original_pq_flow_bar = [];// = $(".pq_flow_filter_bar").clone();

var flow_dd_list = [{id: 0, dd_title: 'Source IP', disp_name: 'Src_IP', max_len: 31},
    {id: 1, dd_title: 'Destination IP', disp_name: 'Des_IP', max_len: 31},
    {id: 2, dd_title: 'Source Port', disp_name: 'Src_Port', max_len: 5},
    {id: 3, dd_title: 'Destination Port', disp_name: 'Des_Port', max_len: 5},
    {id: 4, dd_title: 'Protocol', disp_name: 'Prot', max_len: 3},
    {id: 5, dd_title: 'Applications', disp_name: 'Applications', max_len: 32}
];

var pq_create_flow_bar = function (div, apply_btn, refresh_button) {
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dropwb'>" +
            "<button class='pq_flow_fadd pq_flow_vcenter' style='font-size:12px' onclick='pq_flow_add_btn_click()'>Add Filter</button><br><br>" +
            "<div class='pq_flow_drop_down'>" +
            "<button class='pq_url_wbtn' style='float:right; display:inline-block; width: 26px; height: 22px; font-size: 11px; background: #c7c5ba url(../image/clear_1.png) 5px no-repeat; text-indent: 20px;' onclick='pq_hide_flow_filter()'></button><br>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",0, this)' disabled style='pointer-events:none; color:#bcbbbb' class='pq_flow_drop_down_text'>Source IP</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",1, this)' class='pq_flow_drop_down_text'>Destination IP</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",2, this)' class='pq_flow_drop_down_text'>Source Port</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",3, this)' class='pq_flow_drop_down_text'>Destination Port</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",4, this)' class='pq_flow_drop_down_text'>Protocol</a>" +
            "<a onclick='pq_fadd_menu_click(" + div_s + ",5, this)' class='pq_flow_drop_down_text'>Application</a>" +
            "</div>" +
            "</div>" +
            "<button class='pq_flow_apply' onclick='" + apply_btn + "()'>Apply Filter</button>" +
            "<button class='pq_flow_refresh' onclick='" + apply_btn + "()'>Refresh</button>" +
            "<button class='pq_flow_remove' onclick='" + refresh_button + "()'>Clear Filter</button>";
    $(div).append(item);

    original_pq_flow_dropdown = $(".pq_flow_drop_down").clone();
    original_pq_flow_bar.push($(div).clone());
    return (original_pq_flow_bar.length - 1);
};

var is_pq_input_item_visible = false;
var id_pq_input_item_visible = -1;

pq_show_input_item = function (div, id) {
    var item;
    if (id === 4) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<select id='protList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 100px' maxlength='" + flow_dd_list[id].max_len + "'>" +
                "<option value='TCP'>TCP</option>" +
                "<option value='UDP'>UDP</option>" +
                "</select>" +
                "</div>";
    } else if (id === 5) {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<select id='appList' class='pq_flow_input_field pq_flow_vcenter' style='font-size: 10px; height: 20px; width: 125px' maxlength='" + flow_dd_list[id].max_len + "'></select>" +
                "</div>";
    } else {
        item = "<div class='pq_flow_input_element pq_flow_vcenter'>" +
                "<a class='pq_flow_input_label pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].dd_title + ": </a>" +
                "<input class='pq_flow_input_field pq_flow_vcenter' type='text' maxlength='" + flow_dd_list[id].max_len + "'>" +
                "</div>";
    }
    is_pq_input_item_visible = true;
    id_pq_input_item_visible = id;
    $(div).append(item);

    if (id === 5) {
        $.each(application_list, function (key, app) {
            $('#appList')
                    .append($('<option>', {value: app})
                            .text(app));
        });
        $.each(pq_services_list, function (key, app) {
            if (app !== 'Other') {
                $('#appList')
                        .append($('<option>', {value: app})
                                .text(app));
            }
        });

        var my_options = $("#appList option");
        my_options.sort(function (a, b) {
            if (a.text.toLowerCase() > b.text.toLowerCase())
                return 1;
            if (a.text.toLowerCase() < b.text.toLowerCase())
                return -1;
            return 0;
        });
        $("#appList").empty().append(my_options);
    }

    $('.pq_flow_input_field').focus();

    $('.pq_flow_input_field').focusout(function () {
        pq_hide_input_item(div, id_pq_input_item_visible);
    });

    $(".pq_flow_input_field").keydown(function (event) {
        if (event.which === 13) {
            pq_hide_input_item(div, id_pq_input_item_visible);
        }
    });
};

pq_hide_input_item = function (div, id) {
    var value = $('.pq_flow_input_field').val();
    $('.pq_flow_input_element').remove();
    pq_add_fl_item(div, id, value);
};

pq_add_fl_item = function (div, id, value) {
//    console.log(value)
    var div_s = "\"" + div + "\"";
    var item = "<div class='pq_flow_dis_element pq_flow_vcenter'>" +
            "<div class='pq_flow_dis_element_image pq_flow_vcenter'  onclick='pq_remove_fl_item(" + div_s + ",this, " + id + ")'></div>" +
            "<a class='pq_flow_dis_element_title pq_flow_vcenter' style='text-decoration: none;'>" + flow_dd_list[id].disp_name + " :</a>" +
            "<a class='pq_flow_dis_element_value pq_flow_vcenter' style='text-decoration: none;'> " + value + "</a>";
    "</div>";
    $(div).append(item);
    pq_flow_filter[id].valid = true;
    pq_flow_filter[id].value = value;
};

pq_remove_fl_item = function (div, item, id) {
    item.parentElement.remove();
    pq_add_dd_item(div, id);
    pq_flow_filter[id].valid = false;
    pq_flow_filter[id].value = '';
};

pq_add_dd_item = function (div, id) {
    var div_s = "\"" + div + "\"";
    var item = "<a onclick='pq_fadd_menu_click(" + div_s + "," + id + ", this)' class='pq_flow_drop_down_text'>" + flow_dd_list[id].dd_title + "</a>";
    $('.pq_flow_drop_down').append(item);
};

window.onclick = function (event) {
    if (!event.target.matches('.pq_flow_fadd')) {
        if ($(".pq_flow_drop_down").is(':visible')) {
            pq_hide_flow_filter();
        }
    }
};


pq_flow_add_btn_click = function () {
    $(".pq_flow_drop_down").show();
};

pq_fadd_menu_click = function (div, id, element) {
    element.remove();
    pq_show_input_item(div, id);
};

pq_restore_flow_bar = function (div, it_id) {
    $(div).replaceWith(original_pq_flow_bar[it_id]);
    original_pq_flow_bar[it_id] = $(div).clone();
    for (var i = 0; i < 7; i++) {
        if (pq_flow_filter[i].value !== '') {
            pq_flow_filter[i].value = '';
        }
    }
};

pq_hide_flow_filter = function () {
    $('.pq_flow_drop_down').hide();
};

var pq_get_flow_descriptor = function () {

    var sip;
    var sipr;
    var dip;
    var dipr;
    var _sip_r = pq_flow_filter[0].value.split('-');
    var _dip_r = pq_flow_filter[1].value.split('-');
    var sport = var2num(pq_flow_filter[2].value);
    var dport = var2num(pq_flow_filter[3].value);
    var prot = pq_flow_filter[4].value;
    var app_name = pq_flow_filter[5].value;
    var app_id = application_list.indexOf(app_name);

    if (_sip_r.length === 2) {
        sip = dot2num(_sip_r[0]);
        if (isNaN(sip)) {
            sip = 0;
        }
        sipr = dot2num(_sip_r[1]);
        if (isNaN(sipr)) {
            sipr = 0;
        }
    } else {
        sip = dot2num(pq_flow_filter[0].value);
        if (isNaN(sip)) {
            sip = 0;
        }
        sipr = sip;
    }

    if (_dip_r.length === 2) {
        dip = dot2num(_dip_r[0]);
        if (isNaN(dip)) {
            dip = 0;
        }
        dipr = dot2num(_dip_r[1]);
        if (isNaN(dipr)) {
            dipr = 0;
        }
    } else {
        dip = dot2num(pq_flow_filter[1].value);
        if (isNaN(dip)) {
            dip = 0;
        }
        dipr = dip;
    }

    if (isNaN(sport)) {
        sport = 0;
    }

    if (isNaN(dport)) {
        dport = 0;
    }

    if (prot === 'UDP') {
        prot = 17;
    } else if (prot === 'TCP') {
        prot = 6;
    } else {
        prot = 0;
    }

    if (app_name === 'Other') { //other catogory
        app_id = 65535;
    }

    if (app_id >= 0) {
        app_id = app_id;
    } else {
        var svs_id = pq_services_list.indexOf(app_name);
        if (svs_id > 0) {
            app_id = svs_id + application_list.length - 1;
        } else {
            app_id = 0;
        }
    }

    var disc = {
        sip: sip,
        sipr: sipr,
        dip: dip,
        dipr: dipr,
        sport: sport,
        dport: dport,
        vid: 0,
        prot: prot,
        app: app_id
    };
//    console.log(disc)
    return disc;
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var main_window_data_updater;

function start_mw_cts_info_update() {
    if (main_window_data_updater) {
        return;
    }
    main_window_data_updater = setInterval(request_mw_ct_info, 6000);
}

function end_mw_cts_info_update() {
    clearInterval(main_window_data_updater);
    main_window_data_updater = null;
}

function request_mw_ct_info() {
    //make information update request
    var user;
    
    if(CURRENT_WINDOW === WINDOW_LINK_SUMMARY){
        user = 0;
    } else if(CURRENT_WINDOW === WINDOW_USER_SUMMARY){
        user = global_rule_user;
    }    
    
    var vup_req = {
        type: INFORMATION_UPDATE,
        id: INFO_MANW_CT_RQ,
        uid: user,
        lid: INFO_MANW_CT_RQ
    };
    cjs_make_request(INFO_MANW_CT_RQ, vup_req);   
}

function request_sw_info() {
    //make information update request
    var vup_req = {
        type: INFORMATION_UPDATE,
        id: INFO_SETW_RQ,
        lid: INFO_SETW_RQ
    };
    cjs_make_request(INFO_SETW_RQ, vup_req);
}
// Get data of selected row    
var profile_table;
var profile_data = [];
var user_profile_lookup_list = [];
//Initialise modal for creating a new profile

function CreateProfile() {

    var modal = document.getElementById('AddProfileModal');
    var span = document.getElementById('CloseAddProfile');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Retrieve user profile data from database and display on table   

function Update_Profile_Data(d_flag, user_flag) {
    profile_data = [];
    user_profile_lookup_list = [];
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, NW_GET_USER_LIST, 0);
    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        profile_data = data.split(";");
        for (var i = 0; i < profile_data.length - 1; i++) {
            var element = profile_data[i].split("&");
            if (get_profile_type(element[1]) !== 'Administrator' && get_profile_type(element[1]) !== 'Super-Administrator') {
                user_profile_lookup_list[element[0]] = element[2];
            }
        }
        if (d_flag) {
            Display_Prof_Table();
        }
        if (user_flag || Object.keys(user_profile_lookup_list).length === 1) {
            global_rule_user = get_first_rule_user_index();     
        }
        Clear();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Prof_Table() {
    profile_table.clear().draw();
    for (var i = 0; i < profile_data.length - 1; i++) {
        var element = profile_data[i].split("&");
        profile_table.row.add([element[0], get_profile_type(element[1]), element[2], get_prof_user_ip(element[1], num2dot(element[3]), element[4]), element[5], set_user_status(element[2], element[5], element[0])]).draw(false);
    }
    profile_table.draw(false);
    set_primary_device(profile_table, true);
}

// Set profile status in the table               
get_profile_type = function (id) {
    if (id === '12') {
        return 'Super-Administrator';
    } else if (id === '14') {
        return 'Administrator';
    } else if (id === '23') {
        return 'User';
    } else
        return 'Error';
};
get_prof_user_ip = function (type, ip, mask) {
    if (type === '12' || type === '14') {
        return '-';
    } else if (type === '23') {
        if (mask !== '32')
            return ip + '/' + mask;
        else
            return ip;
    } else
        return 'Error';
};
set_user_status = function (username, status, index) {
    if (username === 'admin') {
        return 'Active';
    } else {
        if (status === '1') {
            return "<select name='app_control' class='field_prop setPrimary' style='width:65px; margin-right:40px; background:transparent; border:none' id='profileStatus_" + index + "'>" +
                    "<option value='1'>Enable</option>" +
                    "<option value='0'>Disable</option>" +
                    " </select>";
        } else {
            return "<select name='app_control' class='field_prop setPrimary' style='width:65px; margin-right:40px; background:transparent; border:none' id='profileStatus_" + index + "'>" +
                    "<option value='0'>Disable</option>" +
                    "<option value='1'>Enable</option>" +
                    " </select>";
        }
    }
};
// Initialise modal for password reset              

function EditProfile() {

    var edit_user_prof_elements = profile_table.row('.selected').data();
    var modal = document.getElementById('EditProfileModal');
    var span = document.getElementById('CloseEditProfile');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    $("#ProfileEditCode option").filter(function () {
        return this.text === edit_user_prof_elements[1];
    }).prop('selected', true);
//    $("#ProfileEditCode").attr("disabled", true);

    $("#profile_edit_email").val(edit_user_prof_elements[2]);
    $("#profile_edit_IP").val(edit_user_prof_elements[3]);
    if ($("#ProfileEditCode option:selected").val() !== '23') {
        $("#profile_edit_IP").attr('disabled', true);
    } else
        $("#profile_edit_IP").attr('disabled', false);
}

function ResetProfilePwd() {

    var prof_table_data = profile_table.row('.selected').data();
    var modal = document.getElementById('ResetPwdModal');
    var span = document.getElementById('CloseResetPwd');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    if (prof_table_data[2] !== user_email_address) {
        $("#profile_edit_password_seg").hide();
        $('#ResetPwdModalContent').css({height: '245px'});
    } else {
        $("#profile_edit_password_seg").show();
        $('#ResetPwdModalContent').css({height: '290px'});
    }
}

function DeleteProfile() {
    delete_nw_user_account((profile_table.row('.selected').data())[0], (profile_table.row('.selected').data())[2]);
}

function show_rule_user_popup() {

    init_rule_user_list('#rule_user_modal_dropdown');
    var modal = document.getElementById('RuleUserModal');
    var span = document.getElementById('CloseRuleUserModal');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        $("#rule_user_search_input").val('');
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    $("#rule_user_modal_dropdown option").filter(function () {
        return this.text === user_profile_lookup_list[global_rule_user];
    }).prop('selected', true);
}

function set_primary_device(table, flag) {
    if (SET_PRIMARY) {
        $('.setPrimary').attr('disabled', false);
    } else {
        if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
            $('.setPrimary').hide();
            $('.setAppBwPrimary').attr('disabled', true).css('pointer-events', 'none');
        } else {
            if (flag) {
                table.select.style('api');
            }
            $('.setPrimary').attr('disabled', true);
        }
    }
}



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
}var app_link_util_table;
var prev_tstamp;
var prev_user_tstamp;
//var primary_user_ip;

var lapp_dlink_buffer = [];
var lapp_ulink_buffer = [];
var checked_link_util_app_list = [];
var app_bwm_prof_list = [];
var app_bwm_prof_list_data = [];
var app_bwm_prof_app_list = [];
var app_bwm_prof_app_list_data = [];

var link_util_flag = true;
var is_app_grap_init = false;
var is_app_grap_user_inited = false;
var is_bwm_app_req_init = false;
var is_stacked_dlink = true;
var is_stacked_ulink = true;

var BWM_APP_PROF_COUNT = 16;
var BWM_APP_PROF_APP_COUNT = 16;

var user_app_watch_prof_lookup = [];

init_app_bwm_table = function (index, type) {
    app_link_util_table = $('#App_Dlink_Util_table').DataTable({
        columnDefs: [
            {title: "ID", width: '5%', targets: 0, visible: false},
            {title: "", width: '10%', targets: 1},
            {title: "Application", width: '70%', targets: 2},
            {title: "", width: '10%', targets: 3},
            {title: "", width: '1%', targets: 4},
            {className: 'dt-center', targets: '_all'}
        ],
        paging: false,
        scrollY: set_app_bwm_table_scroll(index),
        ordering: false,
        searching: true,
        info: false
    });
};

set_app_bwm_table_scroll = function (index) {
    if (index > -1) {
        if (parseInt(app_bwm_prof_app_list[index].length) === 0) {
            return '40px';
        } else
            return '' + parseInt(app_bwm_prof_app_list[index].length * 28 + 15) + 'px';
    } else
        return ($('#pq_dlink_util_plot_System').height() - 150);
};

function init_link_utilization(type, id, upd_flag) {
//console.log("init_link_utilization")
    if (upd_flag) {
        Display_link_Util_Table(type, id);
    }
    if (!is_app_grap_init) {
        var dash_dl = lapp_bw_util_graph_init("AppBwm_Ntwrk_Dlink_Plot", "AppBwm_Ntwrk_Ulink_Plot", 0);
        is_app_grap_init = true;
    }
    if (!is_bwm_app_req_init) {
        var live_appbwm_id = lcjs_init_request_connection('lcjsreq');
        var lbw_req_dl = {
            type: GRAPH_UPDATE,
            id: LMLTAPPU_UPDATE,
            uid: global_rule_user,
            gid: dash_dl
        };
        lcjs_make_request(live_appbwm_id, LMLTAPPU_UPDATE, lbw_req_dl);
        is_bwm_app_req_init = true;
    }
    set_primary_device(app_link_util_table, false);
}

function load_app_bwm_prof_table() {
    app_link_util_table.search('').draw();
    uncheck_profile_apps();
    get_app_bwm_prof();
}

function load_app_bwm_all_table() {
    app_link_util_table.search('').draw();
    uncheck_profile_apps();

    $("#App_Dlink_Util_table_wrapper").remove();
    $("#app_util_dlink_all").append('<table  id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');

    init_app_bwm_table(-1, 2);
    Display_link_Util_Table(0, 0);

    checked_link_util_app_list = [0, 1, 2];
    check_profile_apps();
}

function init_app_bwm_profile_add() {
    $('#addProfileId').show();
    $('#addProfilebuttonId').hide();
}

function add_app_bwm_profile() {

    var app_bwm_prof_name = $("#profile_input").val();

    if (app_bwm_prof_name !== "") {
        $('#addProfileId').hide();
        $('#addProfilebuttonId').show();
        add_app_bwm_prof(app_bwm_prof_name);
    } else {
        $('#profile_input').css('border-color', 'red');
    }
    $('#profile_input').focus(function () {
        $('#profile_input').css('border', '2px solid black');
    });
}

function delete_profile(index) {
    delete_app_bwm_prof(parseInt(BWM_APP_PROF_COUNT - index));
}

function display_app_bwm_prof() {
    var undef_prof_flag = false;
    $("#sub_profile_button_grp").children().remove();
    for (var i = 0; i < app_bwm_prof_list.length; i++) {
        if (typeof (app_bwm_prof_list[i]) !== 'undefined') {
            $("#sub_profile_button_grp").append("<div id='" + i + "_bwm_app_prof_group' style='border:2px solid #d2dcdb'> <button id='" + i + "_bwm_app_prof_toggle' class='profile_button' style='font-family: Georgia' onclick=dropdown(" + i + ",'" + i + "_bwm_prof_content')>" + app_bwm_prof_list[i] + "</button>" +
                    "<div id='" + i + "_bwm_prof_content' class='default_content' hidden >" +
                    "</div></div>");
        } else
            undef_prof_flag = true;
    }
    if (app_bwm_prof_list.length >= 16 && !undef_prof_flag) {
        $("#addProfilebuttonId").attr('disabled', true);
    } else {
        $("#addProfilebuttonId").attr('disabled', false);
    }
    dropdown(0, '0_bwm_prof_content');
    $('#0_bwm_app_prof_toggle').addClass("active");

    $(".profile_button").click(function () {
        var bwm_prof = this.id.split("_");
        if (!($(this).hasClass('active'))) {
            $(this).addClass("active");
//            $('#'+bwm_prof[0]+'_bwm_app_prof_group').css('border', '2px solid #d2dcdb');
        } else {
            $(this).removeClass("active");
        }
    });
}

function dropdown(index, id) {

    if ($('#' + id).is(':hidden')) {

        uncheck_profile_apps();
        $(".default_content").css("display", "none");

        if ($('.profile_button').hasClass('active')) {
            $('.profile_button').removeClass("active");
        }

        $('#' + id).show();
        $("table").remove();
        $("#App_Dlink_Util_table_wrapper").remove();
        $("#app_list_ul").remove();
        $("#" + id).append('<table  id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
        $("#applist").append('<ul id="app_list_ul" style="list-style:none;margin-left: -40px; height: 275px;overflow-y: auto"></ul>');

        get_app_bwm_prof_item(parseInt(BWM_APP_PROF_COUNT - index), true);
    } else {
        $('#' + id).hide();
    }
}

function get_application_list_array(index) {
    $("#app_list_ul").children().remove();
    var app_flag = true;
    for (var app in application_list) {
        if (typeof (app_bwm_prof_app_list[index]) !== 'undefined') {
            for (var i = 0; i < app_bwm_prof_app_list[index].length; i++) {
                if (app == app_bwm_prof_app_list[index][i].appID) {
                    app_flag = false;
                }
            }
        }
        if (app_flag === true && app < application_list.length) {
            $("#app_list_ul").append("<li id='appId_" + app + "' style='text-align:left;height:30px; border-bottom: solid 0.6px lightgrey; margin-top: 5px'><a style='text-decoration:none; font-size: 13px;'>" + application_list[app] + "</a><img src='image/add.png' style='width:25px; height:25px; float:right; cursor:pointer;' onclick=add_app_bwm_prof_item(" + parseInt(BWM_APP_PROF_COUNT - index) + "," + app + ",'" + color_gen[app] + "')></li>");
        }
        app_flag = true;
    }
}

function init_add_app_bwm_prof(index) {
    get_application_list_array(index);
    $('#Add_App_BWM_Prof_Window').show();
    $('#app_search_input').val('');
    var span = document.getElementById('CloseAddApplication');
    $('#pq_dlink_util_plot').css('position', 'initial');

    span.onclick = function () {
        $('#Add_App_BWM_Prof_Window').hide();
        $('#pq_dlink_util_plot').css('position', 'absolute');
    };
    window.onclick = function (event) {
        if (event.target === $('#Add_App_BWM_Prof_Window')) {
            $('#Add_App_BWM_Prof_Window').hide();
            $('#pq_dlink_util_plot').css('position', 'absolute');
        }
    };
}

function cancelProfile() {
    $("#addProfileId").hide();
    $("#addProfilebuttonId").show();
}

var app_bwm_prof_init_flag = false;

function Display_link_Util_Table(status, index) {
//    uncheck_profile_apps();
    var dlink_status = 0;
    var app_dlink_temp = [];
    checked_link_util_app_list = [];
    if (status === 1) {
        if (app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index].length > 0) {
            for (var i = 0; i < app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index].length; i++) {
                app_dlink_temp.push({id: app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index][i].appID, label: application_list[app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index][i].appID]});
                checked_link_util_app_list.push(parseInt(app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index][i].appID));
            }
        }
    } else {
        for (var u_item in application_list) {
            app_dlink_temp.push({id: u_item, label: application_list[u_item]});
        }
    }
    var app_tot = app_dlink_temp.sort(function (a, b) {
        if (a.label.toLowerCase() < b.label.toLowerCase()) {
            return -1;
        }
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    app_link_util_table.clear();

    for (var i = 0; i < app_tot.length; i++) {
        if (app_tot[i].id !== 'undefined') {

            if (checked_link_util_app_list.indexOf(parseInt(app_tot[i].id)) > -1) {
                dlink_status = 1;
            } else
                dlink_status = 0;

            if (status === 1) {
                app_link_util_table.row.add([app_tot[i].id, set_checked(1, 'appBwmChecked_' + app_tot[i].id), app_tot[i].label, set_bwm_prof_app_colors(index, app_tot[i].id), set_delete_button(status, index, app_tot[i].id)]);
            } else {
                app_link_util_table.column(4).visible(false);
                app_link_util_table.row.add([app_tot[i].id, set_checked(dlink_status, 'appBwmChecked_' + app_tot[i].id), app_tot[i].label, set_bwm_all_app_colors(app_tot[i].id), '']);
            }
        }
    }
    app_link_util_table.draw(false);

    jscolor.installByClassName("jscolor");
    if (index === 16) {
        app_link_util_table.buttons(1).remove();
    }

    if (app_bwm_prof_init_flag && status === 1) {
        check_profile_apps();
    }
    app_bwm_prof_init_flag = true;
    
}

set_delete_button = function (status, index, id) {
    if (status === 1) {
        return " <a href='#'><img src='image/delete.png' id='" + id + "' style='width:16px;height:16px;margin-left:7px;' class='setAppBwPrimary' onClick=delete_app_bwm_prof_item(" + index + "," + id + ") style='margin-left: 2px'></a>";
    }
};

check_profile_apps = function () {
    var checked_list = checked_link_util_app_list.length;
    for (var i = 0; i < checked_list; i++) {
        $('#appBwmChecked_' + checked_link_util_app_list[i]).prop("checked", true).change();
    }
};

uncheck_profile_apps = function () {

    var app_buf_size = checked_link_util_app_list.length;

    for (var i = 0; i < app_buf_size; i++) {   //Hide plots of previously watched profile
        $('#appBwmChecked_' + checked_link_util_app_list[0]).prop("checked", false).change();
    }
};

set_checked = function (status, id) {
    if (status === 1) {
        return "<input type='checkbox' id='" + id + "' class='app_bw_util_all' checked onchange='change_visibility(this)' style='margin-left: 9px'>";
    } else {
        return "<input type='checkbox' id='" + id + "' class='app_bw_util_all' onchange='change_visibility(this)' style='margin-left: 9px'>";
    }
};

set_bwm_prof_app_colors = function (index, id) {

    var app_index = app_bwm_prof_app_list[BWM_APP_PROF_COUNT - index];

    if (app_index.length > 0) {
        for (var i = 0; i < app_index.length; i++) {
            prof_color_codes[app_index[i].appID] = app_index[i].color;
        }
    }
    return "<input type='button' class='jscolor setAppBwPrimary' id='app_bwm_col_pickr_" + id + "' style='width:40px; height:7px;border:none;font-size:0px;background-color: " + prof_color_codes[id] + " ' value=" + prof_color_codes[id] + " onchange='changeColor(this ," + index + "," + id + ")'>";
};

set_bwm_all_app_colors = function (id) {
    return "<button class='pq_session_wbtn' disabled style='width:40px; height:7px; background-color: " + color_gen[id] + "'></button>";
};

changeColor = function (picker, index, id) {

    var rgb_color = $('#app_bwm_col_pickr_' + id).css('background-color');
    var color;

    if (rgb_color.indexOf("#") > -1) {
        color = rgb_color;
    } else {
        color = rgbToHex(rgb_color);
    }
    update_app_bwm_prof_item(index, id, color);
    document.getElementById('app_bwm_col_pickr_' + id).jscolor.hide();
};

btn_link_util_bw_load_now = function (id) {
    if (id === 2) {
        $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", 100);
        $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", -10);
        $("#AppBwm_User_Dlink_Plot").css("z-index", -10);
        $("#AppBwm_User_Ulink_Plot").css("z-index", -10);
        $("#bwm_prof_plot_title").text('Uplink Utilization');
    } else {
        if (link_util_flag) {
            get_app_bwm_prof();
            link_util_flag = false;
        }
        $("#AppBwm_Ntwrk_Ulink_Plot").css("z-index", -10);
        $("#AppBwm_Ntwrk_Dlink_Plot").css("z-index", 100);
        $("#AppBwm_User_Dlink_Plot").css("z-index", -10);
        $("#AppBwm_User_Ulink_Plot").css("z-index", -10);
        $("#bwm_prof_plot_title").text('Downlink Utilization');
    }
};

var get_dlink_app_labels = function () {
    var app_dlink_list = ['Time'];
    for (var i = 0; i < application_list.length; i++) {
        app_dlink_list.push(application_list[i]);
    }
//    console.log("LABEL:"+app_dlink_list.length)
    return app_dlink_list;
};

var get_dlink_app_visibility = function () {

    var app_dlink_list = [];
    for (var i = 0; i < application_list.length; i++) {
        if (checked_link_util_app_list.indexOf(i) > -1) {
            app_dlink_list.push(true);
        } else
            app_dlink_list.push(false);
    }
    return app_dlink_list;
};

var gd_util;
var gu_util;

var lapp_bw_util_graph_init = function (dlinkDivID, ulinkDivID, gid) {

    var data = [new Date(0)];
    for (var i = 0; i < application_list.length; i++) {
        data.push(0);
    }
    var div_d = document.getElementById(dlinkDivID);
    var div_u = document.getElementById(ulinkDivID);

    if (lapp_bwutil_dbuff[gid] == null) {
        lapp_bwutil_dbuff[gid] = data;
        lapp_bwutil_dbuff[gid + 1] = data;
        lapp_bwutil_color[gid] = [color_gen];
        lapp_bwutil_color[gid + 1] = [color_gen];

        lapp_bwutil_cbuff[gid] = lapp_bwutil_color;
        lapp_bwutil_cbuff[gid + 1] = lapp_bwutil_color;

        lapp_bwutil_last_update_time[gid] = 0;
    }

    gd_util = new Dygraph(div_d, lapp_bwutil_dbuff[lapp_bwutil_dbuff.length - 2], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_labels(),
                stackedGraph: is_stacked_dlink,
                drawGrid: false,
                fillGraph: true,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(),
                highlightCircleSize: 2,
                axisLabelFontSize: 10,
                axes: {
                    y: {
                        axisLabelWidth: 55,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 1);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });

    gu_util = new Dygraph(div_u, lapp_bwutil_dbuff[lapp_bwutil_dbuff.length - 1], 0, 0, 0,
            {
                colors: color_gen,
                labels: get_dlink_app_labels(),
                stackedGraph: is_stacked_ulink,
                drawGrid: false,
                fillGraph: true,
                plotter: smoothPlotter,
                labelsDivStyles: pq_dygraph_tooltip(),
                labelsSeparateLines: true,
                fillAlpha: 0.6,
                visibility: get_dlink_app_visibility(),
                highlightCircleSize: 2,
                axisLabelFontSize: 10,
                axes: {
                    y: {
                        axisLabelWidth: 55,
                        valueFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 2);
                        },
                        axisLabelFormatter: function (x) {
                            return y_axis_bw_val_formatter(x, 1);
                        }
                    },
                    x: {
                        valueFormatter: function (x) {
                            var time_stamp = moment(x);
                            return "<div style ='color:#046277; display:inline-block; font-weight: bold'>Date:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("dddd, MMMM Do YYYY") + "</div><br>" +
                                    "<div style ='color:#046277; display:inline-block; font-weight: bold'>Time:</div> <div style ='color:#000; display:inline-block'>" + time_stamp.format("H:mm:ss") + "</div>";
                        }
                    }
                }
            });

    lapp_bwutil_plot[gid] = gd_util;
    lapp_bwutil_plot[gid + 1] = gu_util;

    return  (lapp_bwutil_plot.length - 2);
};

function change_visibility(e) {

    var chk_d_id = e.id.split("_");
    if (e.checked) {
        checked_link_util_app_list.push(parseInt(chk_d_id[1]));
    } else {
        var index = checked_link_util_app_list.indexOf(parseInt(chk_d_id[1]));
        checked_link_util_app_list.splice(index, 1);
    }
    gd_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
    gu_util.setVisibility(parseInt(chk_d_id[1]), e.checked);
}

lapp_bwutil_update = function (id, data) {

    if (data.length % 2 === 0) {

        for (var i = 0; i < data.length; i = i + 4) {
            var bw_u = uint32_float(data[i]);
            var bw_d = uint32_float(data[i + 1]);
            var app_id = data[i + 2];
            var tstamp = data[i + 3];

            if (tstamp > 0) {
//                if (tstamp > 0 && app_id == 2){
//                console.log(tstamp + '  ' + application_list[app_id] + '  ' + bw_d + '  ' + bw_u)
//                }
                if (tstamp === prev_tstamp) {
                    lapp_dlink_buffer[app_id + 1] = bw_d;
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                } else {
                    if (lapp_bwutil_last_update_time[id] !== 0) {
                        if ((tstamp - lapp_bwutil_last_update_time[id]) >= 110) {
                            var time_p = lapp_bwutil_last_update_time[id] + 0.5;
                            var time_n = tstamp - 0.5;

                            lapp_dlink_buffer.fill(null);
                            lapp_dlink_buffer[0] = new Date(time_p * 10000);
                            lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                            lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);


                            lapp_dlink_buffer[0] = new Date(time_n * 10000);
                            lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                            lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                        }
                    }

                    if (lapp_dlink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id].push(lapp_dlink_buffer);
                    }
                    if (lapp_ulink_buffer.length > 0) {
                        lapp_bwutil_dbuff[id + 1].push(lapp_ulink_buffer);
                    }

                    lapp_dlink_buffer = [];
                    lapp_dlink_buffer.length = application_list.length + 1;
                    prev_tstamp = tstamp;
                    lapp_dlink_buffer.fill(null);
                    lapp_dlink_buffer[0] = new Date(tstamp * 10000);
                    lapp_dlink_buffer[app_id + 1] = bw_d;

                    lapp_ulink_buffer = [];
                    lapp_ulink_buffer.length = application_list.length + 1;
                    lapp_ulink_buffer.fill(null);
                    lapp_ulink_buffer[0] = new Date(tstamp * 10000);
                    lapp_ulink_buffer[app_id + 1] = bw_u;
                }

                if (lapp_bwutil_dbuff[id].length > 512) {
                    lapp_bwutil_dbuff[id].shift();
                }

                if (lapp_bwutil_dbuff[id + 1].length > 512) {
                    lapp_bwutil_dbuff[id + 1].shift();
                }
            }
        }

        if ((tstamp - lapp_bwutil_last_update_time[id] >= 100) || data.length < 128) {
//            console.log("Time")
            lapp_bwutil_last_update_time[id] = tstamp;
            if (CURRENT_WINDOW === WINDOW_APP_LINK_UTIL) {
                lapp_bwutil_plot[id].updateOptions({'file': lapp_bwutil_dbuff[id]});
                lapp_bwutil_plot[id + 1].updateOptions({'file': lapp_bwutil_dbuff[id + 1]});
            }
        }
    } else {
        console.log('Invalid Live Bandwidth Data');
    }
};

var color_gen = [];
var prof_color_codes = [];

set_distributed_col_generator = function (r, g, b) {
    color_gen = [];
    var red_comp = 256 / r;
    var green_comp = 256 / g;
    var blue_comp = 256 / b;

    for (var red = red_comp; red < 256; red += red_comp) {
        for (var green = green_comp; green < 256; green += green_comp) {
            for (var blue = blue_comp; blue < 256; blue += blue_comp) {
                color_gen.push(['#' + red.toString(16) + green.toString(16) + blue.toString(16)]);
            }
        }
    }
    color_gen[0] = "#ffda7f";
    color_gen[1] = pieColorScheme[1];
    color_gen[2] = pieColorScheme[0];
    color_gen[38] = "#c77405";
    color_gen[135] = pieColorScheme[2];

    prof_color_codes = color_gen;
};

function appsearch() {
    var filter, ul, li, a, i;
    filter = $('#app_search_input').val().toUpperCase();
    ul = document.getElementById("app_list_ul");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//////////// Application Util bw Profile ACJS ///////////////////

add_app_bwm_prof = function (name) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_LIST_ADD, name, global_rule_user, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_app_bwm_prof();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_app_bwm_prof = function (key) {
    var cmd_buffer = update_acjs_elements(WO_AWPROF_LIST_DELETE, '', global_rule_user, user_app_watch_prof_lookup.indexOf(key), 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_app_bwm_prof();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

get_app_bwm_prof = function () {
//console.log("get_app_bwm_prof")
    app_bwm_prof_list = [];
    app_bwm_prof_list_data = [];
    user_app_watch_prof_lookup = [];

    var cmd_buffer = update_acjs_elements(WO_GET_AWPROF_LIST, '', global_rule_user, 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
//        console.log(data)
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_bwm_prof_list_data[i] = row[i];
            var element = row[i].split("&");
            user_app_watch_prof_lookup[element[0]] = parseInt(BWM_APP_PROF_COUNT - i);
            app_bwm_prof_list[parseInt(BWM_APP_PROF_COUNT - user_app_watch_prof_lookup[element[0]])] = element[1];
        }
        display_app_bwm_prof();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

// Add Apps to App profiles

add_app_bwm_prof_item = function (pkey, appId, color) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_ADD, color, global_rule_user, user_app_watch_prof_lookup.indexOf(pkey), appId, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        show_acjs_status_modal(data.charCodeAt(0));
        $("#appId_" + appId).addClass('removed');
        $(document).on('transitionend', '.removed', function () {
            $("#appId_" + appId).remove();
        });

        var id = '' + (BWM_APP_PROF_COUNT - pkey) + '_bwm_prof_content';
        $("table").remove();
        $("#App_Dlink_Util_table_wrapper").remove();
        $("#" + id).append('<table id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
        get_app_bwm_prof_item(pkey, true);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

update_app_bwm_prof_item = function (pkey, appId, color) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_UPDATE, color, global_rule_user, user_app_watch_prof_lookup.indexOf(pkey), appId, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        get_app_bwm_prof_item(pkey);
//        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

delete_app_bwm_prof_item = function (pkey, appId) {

    var cmd_buffer = update_acjs_elements(WO_AWPROF_ITEM_DELETE, '', global_rule_user, user_app_watch_prof_lookup.indexOf(pkey), appId, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        show_acjs_status_modal(data.charCodeAt(0));
        uncheck_profile_apps();
        var id = '' + (BWM_APP_PROF_COUNT - pkey) + '_bwm_prof_content';
        $("table").remove();
        $("#App_Dlink_Util_table_wrapper").remove();
        $("#" + id).append('<table id="App_Dlink_Util_table" class="display cell-border AppUserTablesFont " cellspacing="0" width="100%" ></table>');
        get_app_bwm_prof_item(pkey, true);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

get_app_bwm_prof_item = function (key, status) {
//    console.log("Key " + key + "Look " + user_app_watch_prof_lookup.indexOf(key))
    app_bwm_prof_app_list[parseInt(BWM_APP_PROF_COUNT - key)] = [];

    var cmd_buffer = update_acjs_elements(WO_GET_AWPROF_ITEM_LIST, '', pq_2_16_32(global_rule_user, user_app_watch_prof_lookup.indexOf(key)), 0, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        var row = data.split(";");
        for (var i = 0; i < row.length - 1; i++) {
            app_bwm_prof_app_list_data[i] = row[i];
            var element = row[i].split("&");
            app_bwm_prof_app_list[parseInt(BWM_APP_PROF_COUNT - user_app_watch_prof_lookup[element[0]])].push({appID: element[1], color: element[2]});
        }

        if (status) {
            var index = parseInt(BWM_APP_PROF_COUNT - key);
            init_app_bwm_table(index, 1);
            var app_dlink_util_table_button = new $.fn.dataTable.Buttons(app_link_util_table, {
                "buttons": [{text: 'Add Application',
                        className: 'add_app_prof_button setPrimary',
                        action: function (e, dt, node, config) {
                            init_add_app_bwm_prof(index);
                        }},
                    {text: 'Delete Profile',
                        className: 'del_app_prof_button setPrimary',
                        action: function (e, dt, node, config) {
                            delete_profile(index);
                        }}
                ]
            }).container().appendTo($('#App_Dlink_Util_table_wrapper'));
        }

        if (app_bwm_prof_app_list[BWM_APP_PROF_COUNT - key].length > (BWM_APP_PROF_APP_COUNT - 1)) {
            $('#Add_App_BWM_Prof_Window').hide();
            $('#pq_dlink_util_plot').css('position', 'absolute');
            app_link_util_table.buttons(0).disable();
        } else {
            app_link_util_table.buttons(0).enable();
        }
        init_link_utilization(1, key, true);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};var ha_device_table;
var ha_device_data = [];
var ha_current_device_states = [];

function haModalBroker(id) {
    switch (id) {
        case 1:
            CreateHaGenericModal('CreateHaDeviceModal', 'CloseNewHaDevice', 'cancelHaDeviceAdd');
            break;
        case 2:
            CreateHaGenericModal('ChangeHaDeviceIDModal', 'closeHaDeviceIDEdit', 'cancelHaDeviceIDEdit');
            break;
        case 3:
            set_ha_device_state(ha_current_device_states[0], 1);
            break;
        case 4:
            CreateHaGenericModal('ChangeHaDeviceVIPModal', 'closeHaDeviceVIPEdit', 'cancelHaDeviceVIPEdit');
            break;
    }
}

function CreateHaGenericModal(modalM, spanM, cancelM) {

    var modal = document.getElementById('' + modalM);
    var span = document.getElementById('' + spanM);
    var cancel = document.getElementById('' + cancelM);
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    cancel.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

add_nw_ha_device = function (add_ha_ip) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_ADD_RMT_DEV, '', add_ha_ip, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_ha_device_id = function (id) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_CHANGE_DEVID, '', id, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_ha_device_vip = function (ip, mask) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_CHANGE_VIP, '', ip, mask, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

set_ha_device_state = function (id, state) {

    var cmd_buffer = update_acjs_elements(PDEV_HASY_CHANGE_STATE, '', id, state, 0, 0, 0, 0);
    var cookie = $.cookie('pqsf');

    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
};

function DeleteHaDevice() {

    var key = parseInt((ha_device_table.row('.selected').data())[0]);

    var cmd_buffer = update_acjs_elements(PDEV_HASY_DEL_RMT_DEV, '', key, 0, 0, 0, 0, 0);

    var cookie = $.cookie('pqsf');
    $.ajax({
        data: cmd_buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'
    }).done(function (data, textStatus, jqXHR) {
        Update_Ha_Device_Data();
        Clear();
        show_acjs_status_modal(data.charCodeAt(0));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Update_Ha_Device_Data() {
    ha_device_data = [];
    ha_current_device_states = [];
//    user_profile_lookup_list = [];
    var cookie = $.cookie('pqsf');
    var req = new Uint32Array(1);
    req[0] = pq_4_8_32(CJS_REQUEST_START, INFORMATION_UPDATE, PDEV_GET_RMT_LIST, 0);

    $.ajax({
        data: req.buffer,
        processData: false,
        headers: {"PARAQUMTEC": cookie},
        timeout: 10000,
        type: 'POST',
        url: '/'

    }).done(function (data, textStatus, jqXHR) {
        ha_device_data = data.split(";");
        Display_Ha_Device_table();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Problems when posting...');
    });
}

function Display_Ha_Device_table() {
//    ha_device_data = ['3232235927&150&1&323223592&32&1', '1&3232235926&2&1', '1&3232235926&1&1'];
    ha_device_table.clear().draw();
    for (var i = 0; i < ha_device_data.length - 1; i++) {
        var element = ha_device_data[i].split("&");
        if (i === 0) {
            ha_current_device_states = [element[0], element[1], element[2], element[3], element[4], element[5], element[6]];
            $('#ha_devc_id').text('Device ID : ' + element[0]);
            $('#ha_devc_ip').text('Device IP : ' + num2dot(element[1]));
            $('#ha_devc_state').text('Device State : ' + set_ha_device_state_btn(parseInt(element[2])));
            $('#ha_devc_vip').text('Virtual IP : ' + num2dot(element[3]) + ' / ' + element[4]);
            if (!parseInt(element[5])) {
                $('#ha_device_reset').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            } else {
                $('#ha_device_reset').css({'background': '#208830'}).attr('disabled', false);
            }

        } else {
            ha_device_table.row.add([element[0], element[1], num2dotR(element[2]), set_primary_btn(parseInt(element[3])), set_ha_connction_status(parseInt(element[4]))]);
        }
    }
    ha_device_table.draw(false);
}

set_primary_btn = function (id) {
    switch (id) {
        case 0:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Initializing...</button>";
            break;
        case 1:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Primary</button>";
            break;
        case 2:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Secondary</button>";
            break;
        case 3:
        case 4:
            return "<button class='pq_session_wbtn' style='pointer-events:none' disabled>Intermediary</button>";
            break;
    }
};

set_ha_connction_status = function (state) {
    if (state >= parseInt(ha_current_device_states[6])){
        return "<a style='color:#1aca29; margin-right:5px; text-decoration: none; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Online</button>";
    } else
        return "<a style='color:#b3bbb4; margin-right:5px; text-decoration: none; font-size: 20px;'>&#9632</a><a style='text-decoration:none'>Offline</button>";
};

set_ha_device_state_btn = function (id) {
    switch (id) {
        case 0:
            $('#set_ha_devc_state_btn').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            return 'Initializing...';
            break;
        case 1:
            $('#set_ha_devc_state_btn').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            return 'Primary';
            break;

        case 2:
            $('#set_ha_devc_state_btn').css({'background': '#ffae00'}).attr('disabled', false);
            return 'Secondary';
            break;
        case 3:
        case 4:
            $('#set_ha_devc_state_btn').css({'pointer-events': 'none', 'background': '#dddddd'}).attr('disabled', true);
            return 'Intermediary';
            break;
    }
};
