var pagerun;

(pagerun = function() {
    var leftdivlengh = $('#aaa').children("div").length
    var leftdiv = {}
    for (var i = 0; i < leftdivlengh; i++) {
        leftdiv[i] = parseInt(-1 * ((leftdivlengh - (i + 1))) * parseInt($("div.col-sm-3 div").css("height")))
    };


    $("#fullpage").fullpage({
        anchors: ['sectiona0', 'sectiona1', 'sectiona2', 'sectiona3'],
        menu: '#Scrollspy',
        afterLoad: function(index, nextindex, direction, aaaaaa) {
            //                var screenh = $(window).height();
            //                $("#section1").css("background-position", "0px " + screenh + "px");
            if ($('#aaa').css("marginTop") != leftdiv[nextindex - 1]) {
                $('#aaa').velocity("stop", true).velocity({
                    marginTop: leftdiv[nextindex - 1] + "px"
                }, 800)
            };
            //            $('#Standby1')[0].play();
        },
        //       afterSlideLoad: function(anchorLink, index, slideIndex, direction,bbbbbb) {
        //           $('#Standby1')[0].play();
        //      },
        //       afterRender: function(){
        //          $('#Standby1')[0].play();
        //       },
        //       afterResize: function() {
        //           $('#Standby1')[0].play();
        //       },
    });
});
