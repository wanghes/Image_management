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
    <link href="/public/bootstrap/css/bootstrap.min.css" rel=stylesheet>    
    <style type="text/css">
    *{
        margin:0;
        padding: 0;
        list-style-type:none;
    }
    a,img{
        border:0;
    }
    body{
        font:12px/180% Arial, Helvetica, sans-serif, "微软雅黑";
        background: #f7f7f7;
    }
    /* container */
    #container{
        width:1260px; 
        margin:0 auto;
    }
    #container ul.col{ 
        width:100%;
        list-style:none;
    }
    #container ul.col li{
        background:#fff;
        width: 295px;
        float: left;
        margin-bottom:20px;
        box-sizing: border-box;
        padding: 20px;
        box-shadow: 0 3px 5px rgba(0,0,0,.2);
        text-align:center;
        margin-right: 20px;
    }
    #container ul.col li img {
        width:260px;
        height: 180px;
        border: 1px solid #eee;
        margin-bottom: 15px;
    }
    .kan{
        margin-right:5px;
    }
    .del{
        margin-right:5px;
    }
    .copy_btn{
        width:80px !important;
    }
    .pagerInfo a:hover{
        background: #006dcc !important;
        color: #fff !important;
    }
    .pagerInfo a.active{
        background:#006dcc;
        color: #fff;
    }
    .pagination ul>li>a, .pagination ul>li>span {
        padding: 6px 15px;
    }
    </style>
  </head>
  <body>
        <div class="pagination pagination-centered">
            <ul class="pagerInfo" id="pagerInfo">
            </ul>
        </div>
        <div id="container">
            <ul class="col"></ul>
        </div>
  </body>

  <script type="text/javascript" src="/public/js/jquery.js"></script>
  <script type="text/javascript">
  $(function(){
        function copyUrl() {
            $('body').on('click', '.copy_url_one', function () {
                var dom = $(this);
                var url = dom.parent().prev(); //根据实际情况更改,需要复制内容的载体
                url.select();
                document.execCommand("Copy");
            });
        }       

        function loadData(page) {
            var $arrUl = $("#container .col");
            $arrUl.html('');
            if (!page) {
                page = 1;
            }
            $.ajax({
                url: "/images",
                data:{
                    page: page
                },
                type: "post",
                dataType:"json",
                success:function(data) {
                    var rows = data.rows;
                    var countAll = data.count;

                    for(var i = 0; i < rows.length; i++){ // 每次加载时模拟随机加载图片
                        let val = rows[i];
                        let html = "";
                        html = [
                        '<li>',
                        '<img src = "' + val.smallPath + '">',
                        '<div>',
                        '<input style="width:95%" type="text" value="${host}' + val.path + '" />',
                        '<div>',
                        '<a class="btn btn-danger del" data-id="'+val['id']+'">删除</a>',
                        '<a href="'+val.path+'" class="btn btn-primary kan" target="_blank">查看原图</a>',
                        '<input type="button" class="btn copy_btn" value="复制" />',
                        '</div>',
                        '</div>',
                        '</li>'].join('');
                        $arrUl.append(html);
                    }

                    createPages(countAll, page);
                }
            });
        }

        function createPages(countAll, page) {
            var $pager = $('#pagerInfo');
            var perPage = 12;
            var html = "";
            var pages =  Math.ceil(countAll / perPage);
            if ((page-1) > 0) {
                html += '<li><a class="prev" href="javascript:;">«</a></li>'
            }

            for (var i = 0; i < pages; i++) {
                if (page == (i + 1)) {
                    html += '<li ><a class="active normal" href="javascript:;">'+(i+1)+'</a></li>';
                } else {
                    html += '<li><a class="normal"  href="javascript:;">'+(i+1)+'</a></li>';
                } 
            }
            if (page < pages) {
                html += '<li><a class="next" href="javascript:;">»</a></li>'
            }

            $pager.html(html);
        }


        function bindClick() {
            $('#pagerInfo').on('click', 'a.normal', function() {
                var page = parseInt($(this).text());
                loadData(page);
            }); 
            $('#pagerInfo').on('click', 'a.prev', function() {
                var cur = parseInt($('#pagerInfo a.active').text());
                var page = cur - 1;
                loadData(page);
            });
            $('#pagerInfo').on('click', 'a.next', function() {
                var cur = parseInt($('#pagerInfo a.active').text());
                var page = cur + 1;
                loadData(page);
            });

            $('body').on('click', 'a.del', function() {
                var id = parseInt($(this).data('id'));
                var mes = confirm("你确定要删除该项吗？删除无法恢复");
                if (mes == true){
                   $.ajax({
                        url: "/list/" + id,
                        type: "delete",
                        dataType:"json",
                        success:function(data) {
                            console.log(data);
                        }
                    });
                }
            });
        }

        copyUrl();
        loadData();
        bindClick();

    });

  </script>
  </html>
`;
};
