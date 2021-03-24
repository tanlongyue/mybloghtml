let userLogin = new Vue({
    el:"#userLogin",
    data:{
        userName:'',
        password:'',
        error:'',
        user:{
            nickName:'',
            userName:'',
            password:'',
            password2:'',
            email:'',
            error:'',
        },
    },
    methods:{
        login(){
            if(this.userName == null && this.userName === ''){
                userLogin.error = "用户名不能为空";
            }else if(this.password == null && this.password === ''){
                userLogin.error = "密码不能为空";
            }else {
                $.post(serverIp+"pub/userLogin",
                    {userLoginName:userLogin.userName,userPassword:userLogin.password,contentType:"application/json;charset=UTF-8",dataType:"json"},
                    function (res) {
                        console.log(res);
                        if(res.code === 500){
                            userLogin.error = res.msg;
                        }
                        if(res.code === 200){

                            userLogin.error = '';
                            setCookie("userId",res.data.userId);//用户Id
                            setCookie("SESSION",res.data.SESSION)
                            setCookie("userNickName",res.data.userNickName)
                            if(res.data.userImage === "" || res.data.userImage === null){
                                setCookie("userImage","https://www.zfsphp.com/uploads/images//avatar/202010/1603348401.jpg")
                            }else{
                                setCookie("userImage",res.data.userImage)
                            }
                            //setCookie("typeId",JSON.stringify(bto.data.typeId));
                            // if(bto.data.typeId != 3){
                            //     setCookie("admin","2501267970");
                            // }
                            // setCookie("user","1499618025");
                            window.location.href="index.html";

                        }else {
                            userLogin.error = res.msg;
                        }

                    });
            }
        },
        isLogin(){
            let userId = getCookie("userId");
            let user = getCookie("user");
            let typeId = getCookie("typeId");
            if(userId != null  && typeId!= null){
                window.location.href="index.html";
            }
        },
        addUser(){
            $('.ui.modal').modal('show');
            $("#addUser").on("click",function () {
                let flag5 = userLogin.emailBlur();
                let flag4 = userLogin.password2Blur();
                let flag3 = userLogin.passwordBlur();
                let flag2 = userLogin.userNameBlur();
                let flag1 = userLogin.nickNameBlur();
                if(!flag5){
                    alert("邮箱格式不对");
                    return;
                }
                if(!flag4){
                    alert("请确认两次密码是否一致");
                    return;
                }
                if(!flag3){
                    alert("密码由6-16位字母和字符串组成");
                    return;
                }
                if(!flag2){
                    alert("用户名由2-10位字符组成");
                    return;
                }
                if(!flag1){
                    alert("用户昵称的字数不能大于10");
                    return;
                }
                $.get(serverIp+"pub/userNickNameRegister",{userLoginName:userLogin.user.userName,contentType:"application/json;charset=UTF-8",dataType:"json"},function (flag) {
                    console.log(flag)
                    if(flag.code === 500){
                        userLogin.user.error = "用户名已存在";
                    }else {
                        userLogin.user.error = "";
                        $.post(serverIp+"pub/register",{
                                userNickName:userLogin.user.nickName,
                                userLoginName:userLogin.user.userName,
                                userPassword:userLogin.user.password,
                                userEmail:userLogin.user.email
                                ,contentType:"application/json;charset=UTF-8",dataType:"json"},
                            function (flag) {
                                if(flag.code === 200){
                                    $('.ui.modal').modal('hide');
                                    window.location.reload();
                                }else {
                                    userLogin.user.error = "注册失败，请联系管理员";
                                }
                            }
                        );
                    }
                });
            });
        },
        nickNameBlur(){
            console.log(this.user.nickName.length)
            if(this.user.nickName.length > 10 && this.user.nickName.length >= 1){
                userLogin.user.error = "用户昵称的字数不能大于10";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },
        userNameBlur(){
            if(this.user.userName.length == 0){
                userLogin.user.error = "请输入用户名";
                return false;
            }
            let ch_reg = /^[u4E00-u9FA5{u-z}]+$/;
            if(!ch_reg.test(this.user.userName)){
                userLogin.user.error = "不可输入汉字";
                return false;
            }
            if(this.user.userName.length > 10 && this.user.userName.length <= 2){
                userLogin.user.error = "用户名由2-10位英文字符组成";
                return false;
            }else {
                $.get(serverIp+"pub/userNickNameRegister",{userLoginName:userLogin.user.userName,contentType:"application/json;charset=UTF-8",dataType:"json"},function (flag) {
                    console.log(flag)
                    if(flag.code === 500){
                        userLogin.user.error = "用户名已存在";
                    }else {
                        userLogin.user.error = "";
                    }
                });
                return true;
            }
        },
        passwordBlur(){
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.user.password)){
                userLogin.user.error = "密码由6-16位字母和字符串组成";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },
        password2Blur(){
            if(this.user.password != this.user.password2){
                userLogin.user.error = "确认密码要一致";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },
        emailBlur(){
            if(!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(this.user.email)){
                userLogin.user.error = "邮箱格式不对";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },

    },
    mounted(){
        this.isLogin();
        $.get(serverIp+"user/sess");
    }
});
