function destroyGauge(resourceUsageFlag) {

    if (resourceUsageFlag) {
        fillgauge1 = null;
        fillgauge1.destroy();
    }
}

function SystemResourceUsage(gaugeID) {

    var widthSystemPanel = document.getElementById('Pq_System').offsetWidth;
    document.getElementById('fillgauge1').style.width = widthSystemPanel * 0.5;
    document.getElementById('fillgauge1').style.height = widthSystemPanel * 0.5;

    var circleColor_1 = null;
    var textColor_1 = null;
    var waveTextColor_1 = null;
    var waveColor_1 = null;
    var scenario = false;
    var setCPUPlot = NewValue();

    if (setCPUPlot <= 100 && setCPUPlot > 75) {
        scenario = 3;
    } else if (setCPUPlot <= 75 && setCPUPlot > 50) {
        scenario = 2;
    } else if (setCPUPlot <= 50 && setCPUPlot >= 0) {
        scenario = 1;
    }

    switch (scenario) {

        case 1:
        {
            circleColor_1 = " #29a329";
            textColor_1 = "#145214";
            waveTextColor_1 = "#b3ffcc";
            waveColor_1 = "#29a329";
            break;
        }

        case 2:
        {
            circleColor_1 = "#178BCA";
            textColor_1 = "#045681";
            waveTextColor_1 = "#A4DBf8";
            waveColor_1 = "#178BCA";
            break;
        }

        case 3:
        {
            circleColor_1 = "#ff3333";
            textColor_1 = "#ff0000";
            waveTextColor_1 = "#ffb3b3";
            waveColor_1 = "#ff3333";
            break;
        }

        default:
            alert("Incorrect Scenario");
    }

    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = circleColor_1;
    config1.textColor = textColor_1;
    config1.waveTextColor = waveTextColor_1;
    config1.waveColor = waveColor_1;
    config1.circleThickness = 0.05;
    config1.textVertPosition = 0.5;
    config1.waveAnimateTime = 1000;
    config1.waveHeight = 0.1;

    loadLiquidFillGauge(gaugeID, setCPUPlot, config1);

    function NewValue() {
        return Math.floor(Math.random() * (4 - 2 + 1)) + 2;

//        if(Math.random() > .5){
//            return Math.round(Math.random()*100);
//        } else {
//            return (Math.random()*100).toFixed(1);
//        }
    }
}

