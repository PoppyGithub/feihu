$(function(){
    //点击ul进行登录切换
    $(".tab_nav li").click(function(){
        var _index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".login_con").eq(_index).show().siblings(".login_con").hide();
    })

    //
    $(".usename").val($.cookie.getAll("username").name);
    $(".pwd").val($.cookie.getAll("username").psw);

    //用户登录时
    $(".btnForm").click(function(){
        //获取cookie中的用户名  和   密码
        var _valueName = $.cookie.getSub($(".usename").val(),"useName");
        var _valuePwd = $.cookie.getSub($(".usename").val(),"pwd");
        //console.log(_valueName);
        //console.log(_valuePwd);
        if($(".usename").val() == _valueName){
            if($(".pwd").val() == _valuePwd){
                alert("恭喜您，登录成功！");
            }else{
                alert("用户名和密码不匹配，请重新输入密码！");
            }
        }else{
            alert("该用户尚未注册，无法登录，请立即注册！")
        }
        //判断记住用户名
        function _getDate(num){
            var d = new Date();
            var ms = 24 * 60 * 60 * 1000 * num + d.getTime();
            return new Date(ms);
        }

        if($(".checkbox")[0].checked == true){
            var name = $(".usename").val();
            var pwd = $(".pwd").val();
            $.cookie.setAll("username",{"name":name,"psw":pwd},_getDate(7));
        }


    })

    //随机产生验证码
    $(".code").html(randomCode());
    $(".code").click(function () {
        $(this).html("");
        $(this).html(randomCode());
    })
    function randomCode(){
        var arr = "";
        for (var i = 0; i < 4; i++) {
            var num = Math.random() * 76 + 48;
            if (num >= 48 && num <= 57) {
                arr += String.fromCharCode(num);
            } else if (num >= 65 && num <= 91) {
                arr += String.fromCharCode(num);
            } else if (num >= 97 && num <= 123) {
                arr += String.fromCharCode(num);
            } else {
                i--;
                continue;
            }
        }
        return arr;
    }

    //手机验证码登录时

    var phoneVar = false,phoneCode = false;
    //验证手机号码格式是否正确
    var regPhone = /^(\(\d{3,4}-)|(\d{3.4}-)?\d{7,8}$/;
    $(".phone").blur(function(){
        if($(this).val() == ""){
            $(".hint").html("!内容不能为空");
        }else if(!regPhone.test($(this).val())){
            $(".hint").html("请输入正确格式的手机号码");
        }else{
            $(".hint").html("");
            phoneVar = true;
        }
    })

    //判断验证码是否输入正确
    $(".checkCode").blur(function(){
        if($(this).val() != $(".code").html()){
            $(".hintT").html("!验证码输入错误");
        }else{
            $(".hintT").html("");
            phoneCode = true;
        }
    })

    $(".btnPhone").click(function(){
        if(phoneVar && phoneCode){
            alert("恭喜您，登录成功");
        }
    })
})