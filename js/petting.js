(pettingrun = function() {
    var initX;
    var initY;
    var finX;
    var finY;
    var _mouse = $("#_mouse");
    var Petting1 = $("#Petting1");
    var Standby1 = $("#Standby1");
    /*       _mouse.click(function() {
                       Petting1.css("display", "block");
                       Standby1.css("display", "none");
                       Petting1[0].currentTime = 0;
                       Petting1[0].play();
                       document.getElementById("Petting1").addEventListener('ended', myHandler, false);
                       function myHandler(e) {
                           Standby1.css("display", "block");
                           Petting1.css("display", "none");
                           Standby1[0].currentTime = 0;
                           Standby1[0].play();
                       };
                   });
    */

    _mouse.mousedown(function(e) {
        _mouse.css("cursor ", "url('images/02.png'),default ");
        initX = e.clientX;
        initY = e.clientY;
    });
    //  document.getElementById("_mouse").onmouseup=function(e) {
    _mouse.mouseup(function(e) {
        _mouse.css("cursor", "url('images/01.png'), default");
        finX = e.clientX;
        finY = e.clientY;
        var mousedistance = (Math.pow(finX - initX, 2) + Math.pow(finX - initX, 2));
        if (mousedistance >= 100) {
            Petting1.css("display", "block");
            Standby1.css("display", "none");
            Petting1[0].currentTime = 0;
            Petting1[0].play();
            document.getElementById("Petting1").addEventListener('ended', myHandler, false);

            function myHandler(e) {
                Standby1.css("display", "block");
                Petting1.css("display", "none");
                Standby1[0].currentTime = 0;
                Standby1[0].play();
            };
        };
    });
});
