const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = Sequelize.Op;

const Post = sequelize.define('images', {
    // 图片路径
    path: {
        type: Sequelize.STRING
    },
    smallPath: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: false
});

var post = Post.sync({ force: false });

// 发表新文章
exports.newPost = function(path, smallPath) {
    return post.then(function() {
        Post.create({
            path: path,
            smallPath:smallPath
        });
    });
};

// 查找所以文章
exports.findAllPosts = function() {
    return Post.findAll({
        'order': [
            ['id', 'DESC']
        ]
    });
};

// 通过 ID 查找文章
exports.findById = function(id) {
    return Post.findByPk(id);
};

exports.deleteById = function(id) {
    return Post.destroy({
        'where': {
            id: id
        }
    });
}

exports.findAllPostsByPages = function(offset, limit) {
    return Post.findAndCountAll({
        offset: offset,
        limit: limit,
        'order': [
            ['id', 'DESC']
        ]
    });
};
