$(function(){
    //默认排序滚动到一定程度停留在页面      回到顶部效果
    $(window).scroll(function(){
        if($(window).scrollTop() >= 300){
            $(".fth_toolbar").css({position:"fixed",top:"0"});
        }else{
            $(".fth_toolbar").css({position:"static",top:"0"});
        }

        if($(window).scrollTop() >= 300){
            $(".backTop").css("display","inline-block");
        }else{
            $(".backTop").css("display","none");
        }
    })

    //点击回到顶部
    $(".backTop").click(function(){
        $(window).scrollTop(0);
    })
    //点击改变颜色
    $(".fth_toolbar a").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
    })

    //获取json
    $.getJSON("../js/list.json",function(data){
        console.log(data);
        $.each(data,function(i){
            $(".priceAll ul").eq(i).children().eq(1).after(
                "<li class='discount'>"+data[i].discount+"</li>"
            );
            $(".priceAll ul").eq(i).children().eq(0).after(
                "<li>"+data[i].price+"</li>"
            );
            $(".priceAll ul").eq(i).children().eq(4).after(
                "<li>"+data[i].save+"</li>"
            );
            $(".txt a").eq(i).children().eq(0).after(
                "<em>"+data[i].name+"</em>"
            )
            $(".txt a").eq(i).children().eq(1).after(
                "<b>"+data[i].name1+"</b>"
            )
            $(".info").eq(i).append(
                "<img src="+data[i].src+">"
            )
            $(".purchased ul").eq(i).children().eq(0).after(
                "<li class='count'>"+data[i].num+"</li>"
            )
        })
    })
})