var express = require('express');
var zhongduiDao = require('../dao/zhongduiDao');
var zhongdui = express.Router();
var log = require('log4js').getLogger("zhongdui");

//路由配置
//todo

//请求配置
zhongdui.post('/add',function(req,res,next){
    zhongduiDao.add(req,res,next);
});
zhongdui.post('/delete', function(req, res, next) {
    zhongduiDao.delete(req, res, next);
});
zhongdui.post('/update', function(req, res, next) {
    zhongduiDao.update(req, res, next);
});
zhongdui.get('/queryById', function(req, res, next) {
    zhongduiDao.queryById(req, res, next);
});
zhongdui.get('/queryAll', function(req, res, next) {
    zhongduiDao.queryAll(req, res, next);
});
zhongdui.get('/query', function(req, res, next) {
    zhongduiDao.query(req, res, next);
});

module.exports = zhongdui;