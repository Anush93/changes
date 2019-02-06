var pq_pie_update_que = [];
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


