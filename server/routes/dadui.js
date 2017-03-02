var express = require('express');
var daduiDao = require('../dao/daduiDao');
var dadui = express.Router();
var log = require('log4js').getLogger("dadui");

//路由配置
//todo

//请求配置
dadui.post('/add',function(req,res,next){
    daduiDao.add(req,res,next);
});
dadui.post('/delete', function(req, res, next) {
    daduiDao.delete(req, res, next);
});
dadui.post('/update', function(req, res, next) {
    daduiDao.update(req, res, next);
});
dadui.get('/queryById', function(req, res, next) {
    daduiDao.queryById(req, res, next);
});
dadui.get('/queryAll', function(req, res, next) {
    daduiDao.queryAll(req, res, next);
});

module.exports = dadui;