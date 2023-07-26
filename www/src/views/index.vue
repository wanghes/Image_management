<template>
    <div class="wrap">
        <div class="top_btns">
            <el-button type="primary" @click="showAddBox">添加图片</el-button>
        </div>
        <div class="pager_box">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber"
            :page-sizes="[20, 40, 60, 80, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
        <div v-if="tableData.length" class="img_container" id="grid">
            <el-card v-for="(item, index) in tableData" :key="item.id" class="carder">
                <el-image :src="getAssetsFile(item.smallPath)" class="image">
                    <div slot="placeholder">加载中<span class="dot">...</span>
                    </div>
                </el-image>
                <div class="bottom">
                    <time class="time">{{ item.createdAt | formatTime('{y}-{m}-{d} {h}:{i}:{s}') }}</time>
                    <div class="btns">
                        <el-button size="mini" type="primary" @click="copy($event,getAssetsFile(item.path))"
                            class="button">复制地址</el-button>
                        <el-button size="mini" type="success" @click="openWindow(getAssetsFile(item.path))"
                            class="button">查看原图</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <el-row v-else>
            <el-col :span="24" class="col_none_box">
                <el-image class="none_img" :src="noneImg"></el-image>
                <span class="none_text">暂时没有数据</span>
            </el-col>
        </el-row>

        

        <el-dialog title="添加图片" :visible.sync="dialogFormVisible">
            <form method="post">
                <input type="hidden" name="base64" id="dataFile" />
                <div class="btn_wrap">
                    <a href="javascript:;" class="btn_a"></a>
                    <input type="file" name="file" id="file" @change="changeImg" />
                </div>
            </form>
            <div class="box">
                <img class="photo photo-img" />
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="upFunc">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    fetchList,
    uploadfile
} from "@/api/img";
import { getAssetsFile } from "@/utils"
import noneImg from "@/assets/none.png"
import handleClipboard from "@/utils/clipboard"
import Masonry from "masonry-layout";

export default {
    name: "Home",
    data() {
        return {
            noneImg,
            showBox: false,
            tableData: [],
            pageSize: 60,
            pageNumber: 1,
            total: 0,
            file: null,
            dialogFormVisible: false,
            masonry: null
        };
    },
    mounted() {
        this.getList();
    },
    updated() {
        let grid = document.querySelector('#grid');
        setTimeout(() => {
            this.masonry = new Masonry(grid, {
            itemSelector: ".carder",
                columnWidth: 240,
                originTop: true, 
                resize: true,
                containerStyle: { position: 'relative' },  
                fitWidth: true,   
                horizontalOrder: true,
                percentPosition: true,   
                gutter: 20,                      
            }); 
        }, 200)
    },
    methods: {
        getAssetsFile,
        handleClipboard,
        async getList() {
            let {
                pageSize,
                pageNumber
            } = this;
            let query = {
                pageSize,
                pageNumber
            }
            let res = await fetchList(query);
            if (res) {
                this.total = res.count;
                this.tableData = res.rows;
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.getList();
        },
        showAddBox() {
            this.dialogFormVisible = true
        },
        changeImg() {
            var file = document.querySelector('#file').files[0];
            this.file = file;
            var fileType = file.type;
            var reader = new FileReader();
            reader.onload = function (e) {
                var imgFile = e.target.result;
                var image = new Image();
                image.src = imgFile;
                image.onload = function () {  //创建一个image对象，给canvas绘制使用
                    var cvs = document.createElement("canvas");
                    var scale = 1;
                    var tt = 200;

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
        },
        async upFunc() {
            this.dialogFormVisible = false;
            let base64 = document.querySelector('#dataFile').value;
            let formData = new FormData();
            formData.append('file', this.file)
            formData.append('base64', base64)
            let res = await uploadfile(formData);

            this.getList();
        },
        copy(event, text) {
            handleClipboard(text, event)
        },
        openWindow(url) {
            window.open(url)
        }
    }
};

</script>

<style>
.carder .el-card__body {
    padding: 0;
}
</style>
<style scoped>
h1,
h2 {
    font-weight: normal;
    margin: 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.wrap {
    padding: 5px;
}

.top_btns {
    margin-bottom: 20px;
}

.carder {
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 20px;
}

.carder .bottom {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carder .bottom .time {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
}

.carder .bottom .btns {
    display: flex;
    justify-content: space-between;
}

.image {
    width: 200px;
    height: auto;
}

.col_none_box{
    padding: 10px 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.none_text{
    font-size: 16px;
    color: #252525;
}

.none_img{
    width:400px;
}

.btn_wrap {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 50px auto 15px;
    border: 1px solid rgb(45, 111, 212);
    background-color: #fff;
    border-radius: 5px;
    transition: all .2s ease-out;
    cursor: pointer;
}

.btn_wrap .btn_a {
    cursor: pointer;
    position: absolute;
    display: block;
    width: 200px;
    height: 200px;
    top: 0;
    left: 0;
    z-index: 1;
    text-align: center;
    background: url("../assets/upload.png") no-repeat;
    background-size: 80px 80px;
    background-position: center 30px;
}

.btn_wrap .btn_a::after {
    content: "请上传图片文件";
    width: 100%;
    position: absolute;
    top: 135px;
    left: 0;
    text-align: center;
    font-size: 16px;
    color: rgb(45, 111, 212);
}

.btn_wrap:hover {
    border-radius: 5px;
    background-color: rgb(45, 111, 212);
}

.btn_wrap:hover .btn_a {
    background: url("../assets/upload_hover.png") no-repeat;
    background-size: 80px 80px;
    background-position: center 30px;
}

.btn_wrap:hover .btn_a::after {
    color: #fff;
}

#file {
    cursor: pointer;
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    z-index: 2;
}

input[type="submit"].btn {
    width: 200px;
}

.box {
    display: none;
    margin-top: 15px;
    border-radius: 5px;
    border: 1px solid #eee;
    padding: 10px;
    width: 422px;
    margin: 15px auto 0;
}

.photo-img {
    width: 400px;
}
.pager_box{
    text-align: right;
    padding: 0 0 30px;
}
</style>
