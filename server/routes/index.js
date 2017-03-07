var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getCurrentUser', function(req, res, next) {
  res.json({"code":0,"data":"admin","message":"","success":true,"total":null}
  );
});

module.exports = router;
