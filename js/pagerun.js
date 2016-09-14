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
        afterLoad: function(anchorLink, index) {
            //                var screenh = $(window).height();
            //                $("#section1").css("background-position", "0px " + screenh + "px");
            if ($('#aaa').css("marginTop") != leftdiv[index - 1]) {
                $('#aaa').velocity("stop", true).velocity({
                    marginTop: leftdiv[index - 1] + "px"
                }, 800)
            };
            if (anchorLink == 'sectiona0') {
                $('#video1')[0].play();
            };
        },
        //        afterSlideLoad: function(anchorLink, index, slideIndex, direction, bbbbbb) {
        //            $('#video1')[0].play();
        //        },
        //        afterRender: function() {
        //            $('#video1')[0].play();
        //        },
        //        afterResize: function() {
        //            $('#video1')[0].play();
        //        },
    });
});

function videoFormatCheck() {
    var testEl = document.createElement("video"),
        mpeg4, h264, ogg, webm;
    if (testEl.canPlayType) {
        // Check for MPEG-4 support
        mpeg4 = "" !== testEl.canPlayType('video/mp4; codecs="mp4v.20.8"');

        // Check for h264 support
        h264 = "" !== (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"') || testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));

        // Check for Ogg support
        ogg = "" !== testEl.canPlayType('video/ogg; codecs="theora"');

        // Check for Webm support
        webm = "" !== testEl.canPlayType('video/webm; codecs="vp8, vorbis"');
    }
    return {
        "mpeg4": mpeg4,
        "h264": h264,
        "ogg": ogg,
        "webm": webm
    }
};
