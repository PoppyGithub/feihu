$(function(){
    //网站导航
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

    //对应小图显示对应大图
    $(".content li").mouseenter(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var _index = $(this).index();
        $(".preview_big img").attr("src","../images/detail/"+(_index+1)+".jpg");
    })
    //图片切换
    $(".btn_left").click(function(){
        $(".content ul").animate({left:"280px"},300,function(){
            $(".content ul").animate({left:"0"},10);
        })
    })
    $(".btn_right").click(function(){
        $(".content ul").animate({left:"-280px"},300,function(){
            $(".content ul").animate({left:"0"},10);
        })
    })

    //倒计时
    var _time;
    setInterval(countDown,1000);
    function countDown(){
        //截止时间
        var endTime = new Date("2016/10/4 12:00");
        //起始时间
        var nowTime = new Date();
        //时间差
        var _time = endTime.getTime() - nowTime.getTime();
        var d = Math.floor(_time/1000/60/60/24);
        var h = Math.floor(_time/1000/60/60%24);
        var m = Math.floor(_time/1000/60%60);
        var s = Math.floor(_time/1000%60);
        _time = d+"天"+h+"时"+m+"分"+s+"秒";
        //console.log(_time);
        $(".time em").html(_time);
    }

    //选择运送地点
    $(".icon").click(function(){
        $(".stock_mc").toggle();
        $(".stock_mc span").click(function(){
            $(".stock_selected").html($(this).html());
        })

        $(".close").click(function(){
            $(".stock_mc").css("display","none");
        })
    })

    //改变数量
    var i = $(".choose_amount input").val();
    //console.log(i);
    $(".jian").click(function(){
        i--;
        if(i<1){
            i = 1;
        }
        $(".choose_amount input").val(i);
    })
    $(".jia").click(function(){
        i++;
        $(".choose_amount input").val(i);
    })

    //清空浏览过的商品
    $(".scanMain a").click(function(){
        $(".scanMain dl").html("");
    })

    //规格参数等tab切换
    $(".tab_triggers li").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        var _index = $(this).index();
        $(".arg").eq(_index).css("display","block").siblings().not("ul").hide();
    })

    //放大镜
    $(".preview_big").hover(function(){
        $(".glass").css("display","block");
        $(".bigImg").css("display","block");
        $(".preview_big").mousemove(function(e){
            e = e || event;
            var _left = e.pageX - $(".preview_big").offset().left-50;
            var _top = e.pageY - $(".preview_big").offset().top-50;
            if(_left < 10){
                _left = 10;
            }else if(_left > 208){
                _left = 208;
            }
            if(_top < 10){
                _top = 10;
            }else if(_top > 208){
                _top = 208;
            }
            $(".glass").css("left",_left);
            $(".glass").css("top",_top);
            var disX = $(".glass").offset().left - $(".preview_big").offset().left - 10;
            var disY = $(".glass").offset().top - $(".preview_big").offset().top - 10;

            $(".bigImg").children().css("left",disX*-2);
            $(".bigImg").children().css("top",disY*-2);
        })
    },function(){
        $(".glass").css("display","none");
        $(".bigImg").css("display","none");
    })

    //写入cookie
    $(".addCart").click(function(){
        $.cookie.setAll($(".summary_title p").html(),{
            "shopName":$(".summary_title p").html(),
            "price":$(".qianggou strong").html(),
            "num":$(".choose_amount input").val()
        });
    })
})