var express = require('express');
var roadDao = require('../dao/roadDao');
var road = express.Router();
var log = require('log4js').getLogger("road");

//路由配置
//todo

//请求配置
road.post('/add',function(req,res,next){
    roadDao.add(req,res,next);
});
road.post('/delete', function(req, res, next) {
    roadDao.delete(req, res, next);
});
road.post('/update', function(req, res, next) {
    roadDao.update(req, res, next);
});
road.get('/queryById', function(req, res, next) {
    roadDao.queryById(req, res, next);
});
road.get('/queryAll', function(req, res, next) {
    roadDao.queryAll(req, res, next);
});
road.get('/query', function(req, res, next) {
    roadDao.query(req, res, next);
});

module.exports = road;