let updateUser = new Vue({
    el:"#updateUser",
    data:{
        user:{
            nickName:'',
            userName:'',
            password:'',
            password2:'',
            email:'',
            newImage:'',
            userImage:getCookie("userImage"),
            file:"",
            sex:"",
        },
        error:'',
    },
    methods:{
        getUser(){
            let userId = $.query.get("userId");
            $.get(serverIp+"authc/selectUserByUserId",{id:userId,contentType:"application/json;charset=UTF-8",dataType:"json",token:getCookie("SESSION")},function (res) {
                if(res.code === 200){
                    if(res.data.userSex === "1"){
                        updateUser.user.sex = "1";
                        $("#l").css({"border":"1px solid #85B7D9"})
                    }else{
                        updateUser.user.sex = "0";
                        $("#n").css({"border":"1px solid #85B7D9"})
                    }
                    updateUser.user.nickName = res.data.userNickName;
                    updateUser.user.userName = res.data.userLoginName;
                    updateUser.user.email = res.data.userEmail;
                }else {
                    clear()
                    window.location.href="error.html";
                }
            });
        },
        updateUser(){
            let flag4 = updateUser.emailBlur();
            let flag3 = updateUser.password2Blur();
            let flag2 = updateUser.passwordBlur();
            let flag1 = updateUser.nickNameBlur();
            if(flag1  && flag4){

                let formData = new FormData();
                formData.append("file",$("#file")[0].files[0]);
                console.log($("#file")[0].files[0])
                console.log(updateUser.user.userImage)
                formData.append('userLoginName',updateUser.user.userName)
                formData.append('userHeadPortrait',updateUser.user.userImage)
                if(flag2 && flag3){
                    formData.append('userPassword',$("#password").val())
                }
                formData.append('userEmail',$("#email").val())
                formData.append('id',$.query.get("userId"))
                formData.append('userSex', updateUser.user.sex)
                $.ajax({
                    type: "POST",
                    processData: false,
                    contentType:false,
                    url: serverIp+"authc/updateUserSelect",
                    data: formData,
                    headers: {
                        "token":getCookie("SESSION"),
                    },
                    success: function(res) {
                        if(res.code === 200){
                            alert("????????????,??????????????????");
                            clear()
                        }else if(res.code === 999){
                            alert(res.msg);
                        }else{
                            clear()
                            window.location.href="error.html";
                        }
                    }
                });
            }else{
                updateUser.error = "?????????????????????????????????";
                return false;
            }
        },
        getPhoto(){
            $.get(serverIp+"authc/getPhoto",{contentType:"application/json;charset=UTF-8",dataType:"json",token:getCookie("SESSION")},function (res) {
                console.log(res);
                if(res.code === 200){
                    updateUser.user.userImage = "http://192.168.0.106:8080"+res.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        nickNameBlur(){
            if($("#nickName").val().length > 8){
                updateUser.user.error = "?????????????????????????????????8";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
        passwordBlur(){
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test($("#password").val())){
                updateUser.error = "?????????6-16???????????????????????????";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
        password2Blur(){
            if($("#password").val() != $("#password2").val()){
                updateUser.error = "?????????????????????";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
        emailBlur(){
            if(!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test($("#email").val())){
                updateUser.error = "??????????????????";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
    },
    mounted(){
        let userId = $.query.get("userId");
        if(userId == null || userId === ""){
            location.href="404.html";
        }
        this.getUser();
        // ???????????????
        var waypoint = new Waypoint({
            element: document.getElementById('waypoint'),
            handler: function(direction) {
                if (direction == 'down') {
                    $('#nav').show(500);
                } else {
                    $('#nav').hide(500);
                }
                console.log('Scrolled to waypoint!  ' + direction);
            }
        });
        //????????????
        $("#file").change(function () {
            //??????blob????????????????????????????????????????????????????????????
            var img = document.getElementById('imageshow');
            var reader = new FileReader();
            reader.onload = function (evt) {  img.src = evt.target.result; }
            reader.readAsDataURL(file.files[0]);
        });
    }
});