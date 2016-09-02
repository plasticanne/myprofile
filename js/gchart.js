function dataArray(json) {
    var cars = new Array();
    for (var i = 0; i < json.length; i++) {
        cars[i] = [new Date(json[i][0]), json[i][1], json[0][1]];
    }
    return cars
};


function drawChart(json) {
    var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'X');
    data.addColumn('number', 'Price');
    data.addColumn('number', 'Last Price');
    data.addRows(json);
    // Create a range slider, passing some options
    var DateRangeSlider = new google.visualization.ControlWrapper({
        'controlType': 'ChartRangeFilter',
        'containerId': 'filter_div',
        'options': {
            'filterColumnIndex': 0
        }
    });
    var firstDate = new Date(2016, 1, 1);
    var lastDate = json[0][0];
    DateRangeSlider.setState({
        range: {
            start: firstDate,
            end: lastDate
        }
    });
    var chart = new google.visualization.ChartWrapper({
        'chartType': 'LineChart',
        'containerId': 'chart_div',
        'width': 1600,
        'height': 1600,
        'options': {
            title: 'World Gold Council Gold Prices (Daily) - Currency USD \n Api from https://www.quandl.com',
            hAxis: {
                title: 'Date'
            },
            vAxis: {
                title: 'Gold Price $USD / pre oz'
            },
            series: {
                1: { lineDashStyle: [2, 2] },
            },
        }
    });
    // Establish dependencies, declaring that 'filter' drives 'pieChart',
    // so that the pie chart will only display entries that are let through
    // given the chosen slider range.
    dashboard.bind(DateRangeSlider, chart);
    dashboard.draw(data);
};

(gchart = function() {
    google.charts.load('current', {
        packages: ['corechart', 'line', 'controls']
    });
    $.getJSON("https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?api_key=skFdTGUu6j3p_p7TsaLS&start_date=2010-01-01", function(json) {
        var rowData = json.dataset.data;
        google.charts.setOnLoadCallback(drawChart(dataArray(rowData)));
    });
});
