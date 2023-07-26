'use strict';

exports.layout = function(url) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit"/>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="/public/bootstrap/css/bootstrap.min.css" rel=stylesheet /> 
    <style type="text/css">
    html.body{
        width: 100%;
        height: 100vh;
    }
    #root{
        width: 100%;

        text-align: center;
    }
    .btn_wrap{
        width: 200px;
        height:200px; 
        position:relative;
        margin: 50px auto 15px;
        border: 1px solid rgb(45, 111, 212);
        background-color: #fff;
        border-radius: 5px;
        transition: all .2s ease-out;
        cursor: pointer;
    }   
    .btn_wrap .btn_a{
        cursor: pointer;
        position:absolute;
        display: block;
        width: 200px;
        height: 200px;
        top: 0;
        left:0;
        z-index: 1;
        text-align: center;
        background: url("/public/img/upload.png") no-repeat;
        background-size: 80px 80px;
        background-position: center 30px;  
    } 
    .btn_wrap .btn_a::after{
        content:"请上传图片文件";
        width:100%;
        position:absolute;
        top: 135px;
        left: 0;
        text-align:center;
        font-size: 16px;
        color: rgb(45, 111, 212);
    }
    .btn_wrap:hover{
        border-radius: 5px;
        background-color:rgb(45, 111, 212);
    }
    .btn_wrap:hover .btn_a{
        background: url("/public/img/upload_hover.png") no-repeat;
        background-size: 80px 80px;
        background-position: center 30px;  
    }
    .btn_wrap:hover .btn_a::after{
        color: #fff;
    }
    #file{
        cursor: pointer;
        width: 200px;
        height:200px; 
        position:absolute;
        top: 0;
        left:0;
        opacity: 0;
        filter: alpha(opacity=0);
        z-index :2;
    }
    input[type="submit"].btn {
        width: 200px;
    }
    .box{
        display:none;
        margin-top:15px;
        border-radius: 5px;
        border: 1px solid #eee;
        padding: 10px;
        width:422px;
        margin: 15px auto 0;
    }
    .photo-img{
        width:400px;
    }
    </style>
  </head>
  <body>
    <div id="root">
        <form action="${url}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="base64" id="dataFile" />
            <div class="btn_wrap">
                <a href="javascript:;" class="btn_a"></a>
                <input type="file" name="file" id="file" onchange="changeImg()" />
            </div>
            <input type="submit" class="btn btn-large btn-primary" value="提交"/>
        </form>
        <div class="box">
            <img src="" class="photo photo-img" />
        </div>
    </div>
  </body>
  <script type="text/javascript">
    function changeImg() {
        // 在前端显示上传的图片
        var file = document.querySelector('#file').files[0];
        var fileType = file.type;
        var reader = new FileReader();
        reader.onload = function(e){
            var imgFile = e.target.result;
            var image = new Image();
            image.src = imgFile;
            image.onload = function () {  //创建一个image对象，给canvas绘制使用
                var cvs = document.createElement("canvas");
                var scale = 1;
                var tt = 288; //只是示例，可以根据具体的要求去设定 略缩图图片宽度

                scale = tt / this.width;

                if (this.width > tt) {
                    cvs.width = tt;
                    cvs.height = this.height * scale;
                } else {
                    cvs.width = this.width;
                    cvs.height = this.height;
                }

                var ctx = cvs.getContext('2d');
                ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
                var newImageData = cvs.toDataURL(fileType, 0.8);   //重新生成图片，fileType为用户选择的图片类型
                var sendData = "";
                if (fileType == "image/gif") {
                    sendData = newImageData.replace("data:image/png;base64,", '');
                } else {
                    sendData = newImageData.replace("data:" + fileType + ";base64,", '');
                }
                //当接收到上边的内容后，需要将data:image/png;base64,这段内容过滤掉
                document.querySelector('#dataFile').value = sendData;
            };

            var img = document.querySelector('.photo-img');
            img.setAttribute('src', imgFile);
            document.querySelector('.box').style.display = "block";
        }
        reader.readAsDataURL(file)
    }
  </script>
  </html>
`;
};
