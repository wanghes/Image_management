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
        var reader = new FileReader();
        reader.onload = function(e){
            var imgFile = e.target.result;
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
