var svgrun;
var svgoff;
(svgrun = function() {
    $('#logo').load('images/logo.svg', null, function() {
        /*
                var svgpath0 = document.getElementById("svgline0");
                var svgpath1 = document.getElementById("svgline1");
                var svglength0 = svgpath0.getTotalLength();
                var svglength1 = svgpath1.getTotalLength();*/
        //    console.log(svglength0, svglength1)

        var grad_10 = [{
            'x1': 2
        }, {
            'x1': 1
        }];
        var grad_11 = [{

            'cx': 1,
            'cy': 0.9,
        }, {
            'cx': 0.5,
            'cy': 0.2,
        }, {
            'cx': 0,
            'cy': 0.9

        }];
var grad11=Snap("#grad_11");
var grad10=Snap("#grad_10");
        (function animateCircle(i) {
            grad11.animate(grad_11[i], 1000, function() {
                animateCircle(++i in grad_11 ? i : 0);
            });
        })(0);
        (function animateCircle(i) {
            grad10.animate(grad_10[i], 1000, function() {
                animateCircle(++i in grad_10 ? i : 0);
            });
        })(0);
    });




});
(svgoff = function() {
    Snap("#logo1").remove()
});
