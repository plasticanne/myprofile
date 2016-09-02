(svgrun = function() {
    $('#logo').load('images/logo.svg', null, function() {
//	$("#logo").attr("src", "images/logo.svg", function() {

        var svgpath0 = document.getElementById("svgline0");
        var svgpath1 = document.getElementById("svgline1");
        var svglength0 = svgpath0.getTotalLength();
        var svglength1 = svgpath1.getTotalLength();
        console.log(svglength0, svglength1)
    });
});
