'use strict';

exports.list = function(host) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='renderer' content='webkit'/>
    <meta name='keywords' content='demo'/>
    <meta name='description' content='demo'/>
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <style type="text/css">
    *{
        margin:0;
        padding: 0;
        list-style-type:none;
    }
    a,img{border:0;}
    body{font:12px/180% Arial, Helvetica, sans-serif, "新宋体";}
    /* container */
    #container{width:1260px; margin:0 auto;}
    #container ul{ width:300px;list-style:none;float:left;margin-right:20px;}
    #container ul li{
        margin-bottom:20px;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #efefef;
        box-shadow: 0 3px 3px rgba(0,0,0,.2);
        text-align:center;
    }
    .kan{
        display: inline-block;
        padding: 2px 5px;
        border: 1px solid #1b75fb;
        text-decoration: none;
        color: #333;
        border-radius: 3px;
        box-sizing:border-box;
        height: 28px;
        margin-right:5px;
        background: #1b75fb;
        color: #fff;
    }
    .copy_url_one{
        display: inline-block;
        padding: 2px 5px;
        border: 1px solid #ccc;
        text-decoration: none;
        color: #333;
        border-radius: 3px;
        height: 28px;
        box-sizing:border-box;
        vertical-align: bottom;
    }
    #container ul li img{width:288px;}
    </style>
  </head>
  <body>
        <div id="container">
            <ul class="col">
            <!--
              <li><img src="/public/img/1.jpg" alt=""/></li>
              <li><img src="/public/img/2.jpg" alt=""/></li>
              <li><img src="/public/img/3.jpg" alt=""/></li>
              -->
            </ul>
            <ul class="col"></ul>
            <ul class="col"></ul>
            <ul class="col" style="margin-right:0"></ul>
        </div>
  </body>

  <script type="text/javascript" src="/public/js/jquery.js"></script>
  <script type="text/javascript">
  $(function(){
        var page = 1;
        var countAll = 0;
        var sendStatus = true;

        function copyUrl() {
            $('body').on('click', '.copy_url_one', function () {
                var dom = $(this);
                var url = dom.parent().prev(); //根据实际情况更改,需要复制内容的载体
                url.select();
                document.execCommand("Copy");
                //alert("已复制至剪切板");
            })
        }

        copyUrl();

        function loadData() {
            $.ajax({
                url: "/images",
                data:{
                    page: page++
                },
                type: "post",
                dataType:"json",
                success:function(data) {
                    var rows = data.rows;
                    countAll += data.rows.length;
                    if (countAll === data.count) {
                        sendStatus = false;
                    }

                    for(var i=0;i<rows.length;i++){//每次加载时模拟随机加载图片
                        let val = rows[i];
                        let html = "";
                        html = '<li><img src = "' + val.smallPath + '"><div><input style="width:94%" type="text" value="${host}' + val.path + '" /><div><a href="'+val.path+'" class="kan" target="_blank">查看原图</a><input style="width:20%" type="button" class="copy_url_one" value="复制" /></div></div></li>';
                        $minUl = getMinUl();
                        $minUl.append(html);
                    }
                }
            });
        }

        loadData();
        $(window).on("scroll",function(){
            $minUl = getMinUl();
            if($minUl.height() <= $(window).scrollTop()+$(window).height()){
                //当最短的ul的高度比窗口滚出去的高度+浏览器高度大时加载新图片
                if (!sendStatus) return;
                loadData();
            }
        })
        function getMinUl(){ //每次获取最短的ul,将图片放到其后
            var $arrUl = $("#container .col");
            var $minUl =$arrUl.eq(0);
            $arrUl.each(function(index,elem){
                if($(elem).height()<$minUl.height()){
                    $minUl = $(elem);
                }
            });
            return $minUl;
        }
    });

  </script>
  </html>
`;
};
