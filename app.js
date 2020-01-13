const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const fs = require("fs");
const path = require("path");
const static = require('koa-static');
const post = require('./models/post');
const layout = require('./form.js').layout;
const list = require('./list.js').list;
const message = require('./message.js').message;


const app = new Koa();

const router = new Router();

//设置静态资源的路径
const staticPath = './';


const sleep = async (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
};

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
    const base64Data = ctx.request.body.base64;

    const arrInfo = file.name.split('.');
    const ext = arrInfo[1];
    const name = Date.now();
    const fileName = name + '.' + ext;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/upload/') + fileName;
    let fileSmallPath = path.join(__dirname, 'public/supload/') + ('small_'+fileName);

    const resultFile = path.join('/public/upload/') + fileName;
    const smallPath = path.join('/public/supload/') + ('small_'+fileName);
    const addRes = await post.newPost(resultFile, smallPath);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const dataBuffer = Buffer.from(base64Data, 'base64');

    fs.writeFile(fileSmallPath, dataBuffer, function(err) {
        if (err) {
            ctx.body = message(err);
        }
    });
    return ctx.body = message("上传成功！\n文件路径" + resultFile);
    // await sleep(2000);
    // return ctx.redirect('/list');
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
router.delete('/list/:id', async (ctx, next) => {
    let id = ctx.params.id;
    const result = await post.deleteById(id);
    ctx.body= result;
});


router.get('/', (ctx, next) => {
    ctx.body = layout(ctx.request.origin+'/uploadfile');
});

router.get('/list', (ctx, next) => {
    ctx.body = list(ctx.request.origin);
});

router.post('/images', async (ctx, next) => {
    const page = parseInt(ctx.request.body.page, 10)|| 1;
    const limit = 12;
    const offset = limit * (page - 1);
    const result = await post.findAllPostsByPages(offset, limit);
    ctx.body= result;
})


router.get('/domain', (ctx, next) => {
    ctx.body = ctx.request.origin;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3003);
