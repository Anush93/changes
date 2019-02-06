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
