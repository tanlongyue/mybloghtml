let userIndex = new Vue({
    el:"#userIndex",
    data:{
        recommendList:{},
        pageInfo:{},
        pageNum:1,
        searchStr:'',
    },
    methods:{
        getRecommend(){
            $.post(serverIp+"pub/selectRecommend",
                {contentType:"application/json;charset=UTF-8",dataType:"json"},
                function (res) {
                    console.log(res);
                    if(res.code === 500){
                        userLogin.error = res.msg;
                    }
                    if(res.code === 200){
                        userIndex.recommendList = res.data;

                    }
                });
        },
        getInfo(pageNum){
            $.get(serverIp+"pub/selectPublished", {pageNum:pageNum,pageSize:10,contentType:"application/json;charset=UTF-8",dataType:"json"}, function (bto) {
                console.log(bto)
                if (bto.data != null) {
                    userIndex.pageInfo = bto.data;
                    userIndex.pageNum = pageNum;
                } else {
                    // window.location.href = "error.html";
                }
            });
        },
        goType(id){
            window.location.href = "types.html?id="+id;
        },
        goPage(blogid,views){
            localStorage.setItem("views",views)
            location.href = "blog.html?blogId="+blogid+"";
        }

    },
    filters:{
        dateFormat(dateTime){
            if(dateTime != null){
                var date = new Date(dateTime);
                var year = date.getFullYear();
                var month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hour = date.getHours()<10 ? "0"+(date.getHours()) : date.getHours();
                var minutes = date.getMinutes()<10 ? "0"+(date.getMinutes()) : date.getMinutes();
                var seconds = date.getSeconds()<10 ? "0"+(date.getSeconds()) : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
            }
            return null;
        },
    },
    mounted(){
        this.getRecommend();
        this.getInfo(1);

        // 显示公众号
        $('.tencent').popup({
            popup : $('.tencent-qr'),
            position: 'bottom center'
        });
        // 显示微信
        $('.wechat').popup({
            popup : $('.wechat-qr'),
            position: 'bottom center'
        });
        // 显示QQ
        $('.qq').popup({
            popup : $('.qq-qr'),
            position: 'bottom center'
        });
        // 显示邮箱
        $('.email').popup();
        // 导航栏显示
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
        })
    }
});