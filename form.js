'use strict';

exports.layout = function(url) {
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
  </head>
  <body>
    <div id="root">
        <form action="${url}" method="post" enctype="multipart/form-data">
            <input type="hidden" value="" name="base64" id="dataFile" />
            <input type="file" name="file" id="file" value="" onchange="changeImg()" multiple="multiple" />
            <input type="submit" value="提交"/>
        </form>
        <div class="box" style="display:none;">
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

                var sendData = newImageData.replace("data:" + fileType + ";base64,", '');
                //当接收到上边的内容后，需要将data:image/png;base64,这段内容过滤掉

                document.querySelector('#dataFile').value = sendData;

            };


            var img = document.querySelector('.photo-img');
            img.setAttribute('src', imgFile);
            img.setAttribute('style', "width:400px;");
            document.querySelector('.box').setAttribute('style','display:block; margin-top:15px;');
        }
        reader.readAsDataURL(file)
    }
  </script>
  </html>
`;
};
