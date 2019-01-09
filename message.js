'use strict';

exports.message = function(msg) {
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
    }
    .server_msg {
        margin: 10px;
        color: #ffffff;
        font-size: 12px;
        line-height: 32px;
        border: 1px solid #da6060;
        background: #e67e7e;
        padding: 5px 10px;
    }
    </style>
  </head>
  <body>
    <div id="root">
        <div class="server_msg">${msg}</div>
    </div>
  </body>
  <script type="text/javascript">
  setTimeout(function(){
      location.href="/list"
  }, 500);
  </script>
  </html>
`;
};
