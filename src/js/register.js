$(function() {
    $("input").val("");
    var _name = null;
    var _pwd = null;
    var _mail = null;
    var _code = null;
    //判断用户名格式是否正确
    var regsetName = /^[a-z0-9_-]{3,16}$/;
    $(".usename").blur(function () {
        _name = judge(this, regsetName);
        var _value = $.cookie.getSub($(".usename").val(),"useName");
        if(_value == $(".usename").val()){
            alert("该用户名已被注册");
        }
    })

    //判断密码格式是否正确
    var regPwd = /^[a-zA-Z]\w{5,17}$/;
    $(".pwd").blur(function () {
        _pwd = judge(this, regPwd);
    })

    //确认密码
    $(".pwdSure").blur(function () {
        //console.log($(".pwd").val());
        if ($(".pwdSure").val() == $(".pwd").val() && $(".pwdSure").val() != "") {
            $(".pwdSure").next("span").html("密码一致").css("color", "green");
        } else {
            $(".pwdSure").next("span").html("两次密码不一致").css("color", "red");
        }
    })

    //判断邮箱格式
    var regMail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
    $(".email").blur(function () {
        _mail = judge(this, regMail);
    })

    //判断活动代码
    var regCode = /^[0-9]{6,9}$/;
    $(".activeCode").blur(function () {
        judgeCode(this, regCode);
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
    //输入验证码
    $(".authCode").blur(function () {
        _code = judgeAuthcode(this);
        //判断是否可以提交
        if (_name && _pwd && _mail && _code) {
            $(".btn").removeAttr("disabled").css("background-color", "#EA5A5D");
        }
    })

    $(".btn").click(function(){
        function _getDate(num){
            var d = new Date();
            var ms = 24 * 60 * 60 * 1000 * num + d.getTime();
            return new Date(ms);
        }
        $.cookie.setAll($(".usename").val(),{"useName":$(".usename").val(),"pwd":$(".pwd").val()},_getDate(7));
    })

    console.log($.cookie.getAll("zhangsan").pwd);
})

function judge(_this,obj){
    var val = $(_this).val();
    if(val == ""){
        $(_this).next("span").html("!内容不能为空").css("color","red");
        return false;
    }else if(!obj.test(val)){
        $(_this).next("span").html("请输入正确格式").css("color","red");
        return false;
    }else{
        $(_this).next("span").html("√").css("color","green");
        return true;
    }
}


//判断输入活动代码
function judgeCode(_this,obj){
    var val = $(_this).val();
    if(val == ""){
        $(_this).next("span").html("");
        return false;
    }else if(!obj.test(val)){
        $(_this).next("span").html("请输入正确格式").css("color","red");
        return false;
    }else{
        $(_this).next("span").html("√").css("color","green");
        return true;
    }
}

//判断输入验证码
function judgeAuthcode(_this){
    var val = $(_this).val();
    if(val == ""){
        $(_this).next("span").html("请输入验证码");
        return false;
    }else if(val != $(".code").html()){
        $(_this).next("span").html("验证码输入错误").css("color","red");
        return false;
    }else{
        $(_this).next("span").html("√").css("color","green");
        return true;
    }
}

