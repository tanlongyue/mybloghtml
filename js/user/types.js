let types = new Vue({
    el:"#types",
    data:{
        typeList:{},
        pageInfo:{},
        pageNum:1,
        id:$.query.get("id"),
    },
    methods:{
        getTypeList(){
            $.get(serverIp+"pub/selectBlogTypeToCount",{contentType:"application/json;charset=UTF-8",dataType:"json"},function (res) {
                console.log(res)
                if(res.data != null){
                    types.typeList = res.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        getInfo(pageNum){
            $.get(serverIp+"pub/classifiedClickQuery", {pageNum:pageNum,pageSize:10,typeId:this.id,contentType:"application/json;charset=UTF-8",dataType:"json"}, function (bto) {
                console.log(bto)
                if (bto.data != null) {
                    types.pageInfo = bto.data;
                    types.pageNum = pageNum;
                } else {
                    window.location.href = "error.html";
                }
            });
        },
        goTo(id){
            this.id = id;
            this.getInfo(1);
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
        this.getTypeList();
        this.getInfo(1);

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