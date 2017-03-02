/**
 * Created by ASUS on 2017/1/9.
 */
var express = require('express');
var postDao = require('../dao/postDao');
var post = express.Router();
var log = require('log4js').getLogger("post");

//路由配置
//todo

//请求配置
post.post('/add',function(req,res,next){
    postDao.add(req,res,next);
});
post.post('/delete', function(req, res, next) {
    postDao.delete(req, res, next);
});
post.post('/update', function(req, res, next) {
    postDao.update(req, res, next);
});
post.get('/queryById', function(req, res, next) {
    postDao.queryById(req, res, next);
});
post.get('/queryAll', function(req, res, next) {
    postDao.queryAll(req, res, next);
});
post.get('/query', function(req, res, next) {
    postDao.query(req, res, next);
});
post.get('/queryByDadui', function(req, res, next) {
    postDao.queryByDadui(req, res, next);
});

module.exports = post;