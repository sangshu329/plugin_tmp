//var loginFlag = false;
//var loginHelper = null;

/*$("body,html").animate({
 scrollTop: ($("#lanrenzhijia_home .splash-container").offset().top)
 }, 10,function(){
 });*/


$(document).ready(function () {

    $('.carousel').carousel(
        {
            "pause": "false",
            "interval": 50000
        }
    );

    $('.carousel').on('slide.bs.carousel', function (event) {
        var tag = $(event.relatedTarget).attr("tag");
        var progress = $(event.relatedTarget).attr("progress");

        $('#img_home').attr("src", "images/home.png");
        $('#img_intro').attr("src", "images/intro.png");
        $('#img_gift').attr("src", "images/gift.png");
        $('#img_feedback').attr("src", "images/feedback.png");
        $('#img_related').attr("src", "images/related.png");

        $('#img_' + tag).attr("src", "images/" + tag + "_selected.png");

        $("#progress").animate({width: progress, left: (progress / 2) - 400}, 500);
        playAnimation(tag);
    });

    playAnimation("home");

});

function playAnimation(tag) {
    var ani1 = $("#lanrenzhijia_" + tag + " .ani_step_1");
    var ani2 = $("#lanrenzhijia_" + tag + " .ani_step_2");
    var ani3 = $("#lanrenzhijia_" + tag + " .ani_step_3");
    var pre_start = ((tag == "home") ? 0 : 300);
    if (ani1 != null) {
        ani1.css("opacity", 0);
        setTimeout(function () {
            ani1.animate({opacity: 1}, 1000);
        }, 10 + pre_start);
    }
    if (ani2 != null) {
        ani2.css("opacity", 0);
        setTimeout(function () {
            ani2.animate({opacity: 1}, 1000);
        }, 1500 + pre_start);
    }
    if (ani3 != null) {
        ani3.css("opacity", 0);
        setTimeout(function () {
            $("#lanrenzhijia_" + tag + " .ani_step_3").animate({opacity: 1}, 1000);
        }, 3000 + pre_start);
    }
}

function switchlanrenzhijia(lanrenzhijiaIndex) {
    $('.carousel').carousel(lanrenzhijiaIndex);
}