var aa = 0;
function autoslider() {
    var e = $("#index_tpic_tab a").length,
    t = 0;
    aa < e - 1 ? (t = aa, aa++) : (t = 4, aa = 0),
    $("#index_tpic_tab").children("a").eq(aa).addClass("active").siblings().removeClass("active"),
    $("#index_tpic_big").children("a").eq(aa).fadeIn(),
    $("#index_tpic_big").children("a").eq(t).fadeOut(),
    
    $("#index_tpic_binfo>.index_tpic_info").eq(aa).show().siblings().hide()
}

$("#index_tpic_big a").eq(0).show(),
$(function() {
    $("#index_tpic_tab a").hover(function() {
        var e = $("#index_tpic_tab>a").index($(this));
        $(this).addClass("active").siblings().removeClass("active");
        $("#index_tpic_big>a").eq(e).show().siblings().hide();
        $("#index_tpic_binfo .index_tpic_info").eq(e).show().siblings().hide();
        aa = e
    })
});
$(function() {
    var e = null;
    $("#index_tpic").hover(function() {
        clearInterval(e)
    },
    function() {
        e = setInterval("autoslider()", 5e3)
    }).mouseout()
})
