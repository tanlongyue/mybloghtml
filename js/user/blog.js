let blogDetail = new Vue({
    el:"#blogDetail",
    data:{
        blog:{
            userInfo:{
                userNickName:'',
            },
            blogType:{
                name:'',
            },
            content:'',
        },
        blogId:$.query.get("blogId"),
        content:'',
        comment:{},
        userId:null,
    },
    methods:{
        getBlog(){
            $.post(serverIp+"pub/blogDetailInfo",{blogid:this.blogId,contentType:"application/json;charset=UTF-8",dataType:"json"},function (fes) {
                console.log(fes)
                if(fes.data != null){
                    blogDetail.blog = fes.data;
                    blogDetail.blog.views = localStorage.getItem("views");
                    blogDetail.blog.content = marked(fes.data.content);
                }else {
                    window.location.href="error.html";
                }
            });
        },
        addViews(){
            $.post(serverIp+"pub/addViews",{blogid:this.blogId,views:localStorage.getItem("views"),contentType:"application/json;charset=UTF-8",dataType:"json"},function (fes) {
                if(fes.code != 200){
                    window.location.href="error.html";
                }
            });
        },
        replay(comment){
            this.comment = comment;
            $("textarea").attr("placeholder","@"+comment.user.nickName);
            window.location.href="#comment-form";
        },
        addComment(){
            if(this.content == null || this.content == ''){
                $("#comment-form .field").addClass("error");
            }else if(blogDetail.comment != null){
                $.post(serverIp+"comment/addComment",
                    {
                        blogId:blogDetail.blogId,
                        userId:blogDetail.userId,
                        parentCommentId:blogDetail.comment.commentId,
                        content:blogDetail.content,
                        typeId:JSON.parse(getCookie("typeId"))
                    },
                    function (flag) {
                        if(flag){
                            //??????????????????
                            $.post(serverIp+"blog/addCommentCount",{blogId:blogDetail.blogId});
                            blogDetail.getBlog();
                            blogDetail.clearBtn();
                        }else {
                            window.location.href="error.html";
                        }
                    }
                );
            }
        },
        clearBtn(){
            this.content = '';
            this.comment = '';
            $("textarea").attr("placeholder","?????????????????????...");
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
                // ??????
                return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
            }
            return null;
        },
    },
    mounted(){
        if(getCookie("userId") != null && getCookie("userId") != ""){
            this.userId = JSON.parse(getCookie("userId"));
        }
        this.addViews();
        this.getBlog();

        setTimeout(function () {
            //??????
            tocbot.init({
                // Where to render the table of contents.
                tocSelector: '.js-toc', //?????????????????????
                // Where to grab the headings to build the table of contents.
                contentSelector: '.js-toc-content',//?????????????????????????????????
                // Which headings to grab inside of the contentSelector element.
                headingSelector: 'h1, h2, h3',//?????????????????????
            });
            //??????
            $('#payButton').popup({
                popup : $('.payQR'),
                on : 'click',
                position: 'bottom center'
            });
            window.document.title = blogDetail.blog.title;
            //????????????
            Prism.highlightAll();
            tocbot.refresh();
        },1000);

        $(document).on("input propertychange","textarea",function(){
            if(blogDetail.content == null || blogDetail.content == ''){
                $("#comment-form .field").attr("class","field error");
            }else {
                $("#comment-form .field").attr("class","field");
            }
        });

        $('.ui.dropdown').dropdown({
            on : 'hover'
        });

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
    },

});
