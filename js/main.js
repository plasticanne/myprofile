 import { supportTouch } from "./machine.js";
 import { pagerun, videoFormatCheck } from "./pagerun.js";
 import { gchart } from "./gchart.js";
 import { getFb, clickfbbutton } from "./fbapi.js";
 import { chatkey } from "./firebaseapi.js";
 import { svgrun,svgoff } from "./svgrun.js";
 import { animate } from "./canvasrun.js";
console.log(window.matchMedia('(max-width: 767px)').matches);
 function clickbtn(idname, divname, funname) {
     $(idname).click(function() {
         $("#s2view>div,#s2view>div iframe").css("visibility", "hidden");
         $("#s2view>" + divname + ",#s2view>" + divname + " iframe").css({
             "visibility": "visible",
             "z-index": "0"
         });
         if (funname) {
             funname();
         };
     });
 };


 $(document).ready(function() {
     //  $(window).load(function() {
     ////////main src="js/pagerun.js"

     pagerun();
     if (videoFormatCheck()["webm"] != true || (chrome == true && android == true)) {
         $("#section0,#section00").css({
             "background-color": "#000",
         });
         $("#section0").css({
             'background-image': 'url("images/Ageeba.jpg")'
         });
         // $("#videodiv,#video11,#video1").css('display', 'none');
         $("#videodiv,#video11,#video1").remove();
         $("#section0").append('<img class="A_img" src="images/Ageeba.jpg" />');
     }
 
     if (window.matchMedia('(max-width: 767px)').matches) {
         $(".nav-pills > li > a").click(function() {
             var aaadiv = $('#aaa>div');
             var thisdiv = aaadiv.eq(aaadiv.length - $(".nav-pills > li").index($(this).parent()) - 1);
             if (thisdiv.css("display") == "none") {
                 aaadiv.css("display", "none");
                 thisdiv.css("display", "block");
             } else {
                 aaadiv.css("display", "none");
             }
         });

     };



     ///////loading
     $(window).load(function() {
         $('#loading').delay(1800).animate({
             opacity: "0"
         }, 200);
     });
     ///////animation button

     $(".anibtn").click(function() {
         if ($(this).text() == "Load") {
             $(this).text("Close");
             $(this).nextAll(".animation").css("display", "inline");
             if ($(this).nextAll("#framepetting").css("display") == "inline") {
                 ////////Petting iframe
                 if ($(window).width() < 768) {
                     $("#framepetting").css({
                         "margin-left": "-40px"
                     });
                 } else {
                     $("#framepetting").css({
                         "margin-left": "0px",
                     });
                 };
                 $("#framepetting").html('<iframe src="petting.html" scrolling="no" allowtransparency="true"></iframe>');

             } else if ($(this).nextAll("#logoframe").css("display") == "inline") {
                 ////////SVG src="js/svgrun.js"

                 svgrun();
             } else if ($(this).nextAll("#maincanvas").css("display") == "inline") {
                 if ($(window).width() < 768) {
                     $("#maincanvas").css({
                         "margin-left": "55px"
                     });
                 } else {
                     $("#maincanvas").css({
                         "margin-left": "80px"
                     });
                 };
                 ////////canvas src="js/canvasrun.js"

                 document.getElementById("maincanvas").addEventListener('mouseover', function() {
                     animate();
                 }, false);

                 if (supportTouch) {
                     $("#fullpage").fullpage.setAllowScrolling(false);
                     animate();
                 }
             } else {}
         } else {
             $(this).text("Load");
             if ($(this).nextAll("#logoframe").css("display") == "inline") {
                 svgoff()
             };
             $(this).nextAll(".animation").css("display", "none");
             $("#fullpage").fullpage.setAllowScrolling(true);

         }
     });


     ////////google chart src="js/gchart.js

     clickbtn("#goldprice", "#dashboard_div", gchart);
     ////////FB api and GA src="js/fbapi.js"

     clickbtn("#fbapi", "#fbapi_div", getFb);
     clickfbbutton("#FBgen", {
         fields: "gender,birthday"
     }, "gender");
     clickfbbutton("#FBbir", {
         fields: "gender,birthday"
     }, "birthday");
     ////////Chat Room

     clickbtn("#chatroom", "#chatroom_div");
     $('#messageInput').keypress(chatkey);





 });
