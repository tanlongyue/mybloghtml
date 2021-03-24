$(document).ready(function () {
    // $.get(serverIp+"user/sess");
    //if(getCookie("userId") == null || getCookie("user") == null || getCookie("user") != "1499618025" || getCookie("typeId") == null){
    if(getCookie("userId") == null){
        $("#spanName").html("<a href='login.html'>登录</a>");
        $("#menu").remove();
        $("#ico").remove();
    }else{
        // let userId = JSON.parse(get  Cookie("userId"));
        // $.get(serverIp+"user/selectUserByUserId",{userId:userId},function (bto) {
        //     let user = bto.data;
        //     if(user != null){
        //         $("#userAvatar").attr("src","https://xiejiabin.online/images/avatar/"+user.avatar);
        //         $("#spanName").html(user.nickName);
        //         $("#goUpdate").on("click",function () {
        //             window.location.href="user.html?userId="+user.userId;
        //         })
        //     }else {
        //         window.location.href="error.html";
        //     }
        // });
        if(getCookie("userId") != null && getCookie("SESSION") != null && getCookie("userImage") != null && getCookie("userNickName") != null){
            $("#userAvatar").attr("src",getCookie("userImage"));
            $("#spanName").html(getCookie("userNickName") );
            $("#goUpdate").on("click",function () {
                window.location.href="user.html?userId="+getCookie("userId");
            })
        }else {
            window.location.href="error.html";
        }
    }

    //注销按钮
    $('.menu.toggle').click(function () {
        $('.m-item').toggleClass('m-mobile-hide');
    });
    $('.ui.dropdown').dropdown({
        on : 'hover'
    });

    $("#exit").on("click",function () {
        $.get(serverIp+"logout/out",
            {token:getCookie("SESSION")},
            function (result) {
                if(result.code == 200 || result.code == -3){
                    removeCookie("userId");
                    removeCookie("SESSION");
                    removeCookie("userImage");
                    removeCookie("userNickName");
                    removeCookie("typeId");
                    removeCookie("admin");
                    removeCookie("user");
                    window.location.href="index.html";
                }
            }
        );
        // window.location.href="login.html";
    });

    //悬浮搜索框
    $("#search").on("click",function () {
        let searchStr = $("#searchStr").val();
        if(searchStr != '' && searchStr != null){
            $("#search").attr("href","search.html?searchStr="+searchStr);
        }
    });
});