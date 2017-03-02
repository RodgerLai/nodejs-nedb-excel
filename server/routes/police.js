var express = require('express');
var policeDao = require('../dao/policeDao');
var police = express.Router();
var log = require('log4js').getLogger("police");

//路由配置
//todo

//请求配置
police.post('/add',function(req,res,next){
    policeDao.add(req,res,next);
});
police.post('/delete', function(req, res, next) {
    policeDao.delete(req, res, next);
});
police.post('/update', function(req, res, next) {
    policeDao.update(req, res, next);
});
police.get('/queryById', function(req, res, next) {
    policeDao.queryById(req, res, next);
});
police.get('/queryAll', function(req, res, next) {
    policeDao.queryAll(req, res, next);
});
police.get('/query', function(req, res, next) {
    policeDao.query(req, res, next);
});

module.exports = police;