const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const fs = require("fs");
const path = require("path");
const static = require('koa-static');
const post = require('./models/post');
const layout = require('./form.js').layout;
const list = require('./list.js').list;


const app = new Koa();

const router = new Router();

//设置静态资源的路径
const staticPath = './'

app.use(static(
    path.join(__dirname,  staticPath)
));

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));
// app.use(ctx => {
//   ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
// });

// 上传单个文件
router.post('/uploadfile', async (ctx, next) => {
    const file = ctx.request.files.file; // 获取上传文件

    const arrInfo = file.name.split('.');
    const ext = arrInfo[1];
    const name = Date.now();
    const fileName = name + '.' + ext;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/upload/') + fileName;

    const resultFile = path.join('/public/upload/') + fileName;
    const addRes = await post.newPost(resultFile);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = list("上传成功！\n文件路径" + resultFile);
});

// 上传多个文件
router.post('/uploadfiles', async (ctx, next) => {
    const files = ctx.request.files.file; // 获取上传文件
    for (let file of files) {
        // 创建可读流

        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    return ctx.body = "上传成功！";
});

// router.post('/doAdd',async(ctx)=>{
//
//     console.log(addRes);
//     const result = await post.findById(1);
//     ctx.body= result;
// });



router.get('/', (ctx, next) => {
    ctx.body = layout();
});


router.get('/domain', (ctx, next) => {
    console.log(ctx.request.origin);
    ctx.body = ctx.request.origin;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
