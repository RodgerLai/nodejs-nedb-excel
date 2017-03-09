var express = require('express');
var usersDao = require('../dao/usersDao');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//请求配置
router.post('/add',function(req,res,next){
    usersDao.add(req,res,next);
});
router.post('/find',function(req,res,next){
    usersDao.find(req,res,next);
});
router.post('/update',function(req,res,next){
    usersDao.update(req,res,next);
});
router.post('/delete',function(req,res,next){
    usersDao.remove(req,res,next);
});
router.get('/delete',function(req,res,next){
    usersDao.remove(req,res,next);
});
module.exports = router;
