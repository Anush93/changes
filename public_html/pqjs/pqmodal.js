/* 
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
