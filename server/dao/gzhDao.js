var db = require("../db/nedb");
var tool = require("../utils/tool");
var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require("path");
var add = function(req,res,next){
    db.gzh.insert(req.body, function (err, newDocs) {
    //[{ "name": "admin","pwd":"123456","age": 42  }, {"name": "super","pwd":"123456", "age": 11 }]
    //[{ "name": "扑克牌","pwd":"123456","age": 42,"role":"low"  }, {"name": "奶奶的","pwd":"123456", "age": 11,"role":"high"  }]
    // Two documents were inserted in the database
    // newDocs is an array with these documents, augmented with their _id
        if(err!="null"){            
            res.json( {"code":0,"data":newDocs,"message":"","success":true,"total":null});
        }else{
            res.json({"code":10,"data":null,"message":"新增数据失败","success":false,"total":null});
        }
      });
}
var find = function(req,res,next){
     //req.body.name.$regex = new RegExp(req.body.name.$regex);
   //  console.log(req.body);
    db.gzh.find(req.body, function (err, docs) {
        //{ "name": "admin","age": 42  }   { "name": {"$regex":/s/}
        console.log(docs.length);
          res.json(docs);
      });
}

var findByPage = function(req,res,next){
    var body = req.body;
    var page = body.page;
    var pageSize = body.pageSize;
    var skip = (page-1)*pageSize;
    
    //留下查询条件
    delete body.page;
    delete body.pageSize;

   var findObj =  tool.getGzhFindObj(body);

    db.gzh.count(findObj, function (err, count) {
     db.gzh.find(findObj).sort({ _id: 1 }).skip(skip).limit(pageSize).exec(function (err, docs) {
         if(err!="null"){            
            res.json({"code":0,"data":docs,"message":"","success":true,"total":count});
        }else{
            res.json({"code":10,"data":null,"message":"query data error","success":false,"total":null});
        }
            });
    });
}


var exportByFind = function(req,res,next){
     var body = req.body;
   var findObj =  tool.getGzhFindObj(body);
          db.gzh.find(findObj, function (err, docs) {
              var dir = tool.exportExcel(docs);
            res.send("导出成功，共导出"+docs.length+"条数据，EXCEL保存在："+dir);
        });
   }
var update = function(req,res,next){
   
     console.log(req.body);
    db.gzh.update({ _id: req.query.keys },{ $set: req.body}, { upsert: true }, function (err, numReplaced) {
        //{ "name": "admin","age": 42  }   { "name": {"$regex":/s/}
        if(err!="null"){            
            res.json( {"code":0,"data":1,"message":"","success":true,"total":null});
        }else{
            res.json({"code":10,"data":null,"message":"更新数据失败","success":false,"total":null});
        }
      });
}
var remove = function(req,res,next){
   
     console.log(req.body);
    db.gzh.remove({ _id: req.query.keys },{}, function (err, numRemoved) {
       if(err!="null"){            
            res.json( {"code":0,"data":1,"message":"","success":true,"total":null});
        }else{
            res.json({"code":10,"data":null,"message":"删除数据失败","success":false,"total":null});
        }
         
      });
}
module.exports = {
    add:add,
    find:find,
    update:update,
    remove:remove,
    findByPage:findByPage,
    exportByFind:exportByFind,
};