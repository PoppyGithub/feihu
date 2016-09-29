$(function(){
    $(".internav").hover(
        function (){
            $(this).addClass("internavBor");
            //console.log($(this));
            $(this).children().show();
        },function(){
            $(this).removeClass("internavBor");
            $(this).children().not("a").hide();
        }
    )
    $(".zhen").hover(
        function(){
            $(this).css("background","url('images/index/menu_bg2.PNG') no-repeat")
        },function(){
            $(this).css("background","url('images/index/menu_bg.PNG') no-repeat")
        }
    )

    //轮播图
    var i = 0;
    var timer = null;
    function autoPlay(){
       timer = setInterval(function(){
            $("#banner img").eq(i).css("display","block").siblings().not("ul,div").hide();
            //对应的li切换
            $("#banner li").eq(i).addClass("active").siblings().removeClass("active");
            i++;
            if(i == 5){
                i=0;
            }
        },2000);
    }
    autoPlay();
    $("#banner").hover(
        function(){
            $(".prev,.next").animate({opacity:'show'},1000);
        },function(){
            $(".prev,.next").animate({opacity:'hide'},1000);
        }
    )
    $(".prev").click(function(){
       clearInterval(timer);
        if(i == 0){
            i = 5;
        }
        i--;
        $("#banner img").eq(i).css("display","block").siblings().not("ul,div").hide();
        //对应的li切换
        $("#banner li").eq(i).addClass("active").siblings().removeClass("active");
        autoPlay();
    })
    $(".next").click(function(){
        clearInterval(timer);
        if(i == 5){
            i = -1;
        }
        i++;
        $("#banner img").eq(i).css("display","block").siblings().not("ul,div").hide();
        //对应的li切换
        $("#banner li").eq(i).addClass("active").siblings().removeClass("active");
        autoPlay();
    })
    //点击相应的li显示相应的图片
    $("#banner li").bind("click",function(){
        clearInterval(timer);
        var _index = $(this).index();
        //console.log(_index);
        $("#banner img").eq(_index).css("display","block").siblings().not("ul,div").hide();
        //对应的li切换
        $("#banner li").eq(_index).addClass("active").siblings().removeClass("active");
        i = _index;
        autoPlay();
    })


    //左边菜单栏显示
    $(".allList li").hover(
        function(){
            $(this).find(".liveEle").css("cursor","default").show();
        },function(){
            $(this).find(".liveEle").hide();
        }
    )

    //今日上新  清仓专场  图片移上改变图片透明度
    $(".nPlink img,.clearWare img").hover(
        function(){
            $(this).addClass("nPlinkHover");
        },function(){
            $(this).removeClass("nPlinkHover");
        }
    )

    //商品团购鼠标移上  加边框  图片透明度改变
    $(".comm").children("img").hover(
        function(){
            $(this).addClass("nPlinkHover");
        },function(){
            $(this).removeClass("nPlinkHover");
        }
    )
    $(".comm").hover(
        function(){
            $(this).css("border","1px solid #f45f4b");
        },function(){
            $(this).css("border","1px solid #ccc");
        }
    )
})

