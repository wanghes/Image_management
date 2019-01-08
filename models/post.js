const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = Sequelize.Op;

const Post = sequelize.define('images', {
    // 图片路径
    path: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: false
});

var post = Post.sync({ force: false });

// 发表新文章
exports.newPost = function(path) {
    return post.then(function() {
        Post.create({
            path: path
        });
    });
};

// 查找所以文章
exports.findAllPosts = function() {
    return Post.findAll();
};

// 通过 ID 查找文章
exports.findById = function(id) {
    return Post.findByPk(id);
};

exports.findAllPostsByPages = function(offset, limit) {
    return Post.findAndCountAll({
        offset: offset,
        limit: limit
    });
};
