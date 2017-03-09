var db = require("../db/nedb");
var add = function(req,res,next){
    db.gzh.insert(req.body, function (err, newDocs) {
    //[{ "name": "admin","pwd":"123456","age": 42  }, {"name": "super","pwd":"123456", "age": 11 }]
    //[{ "name": "扑克牌","pwd":"123456","age": 42,"role":"low"  }, {"name": "奶奶的","pwd":"123456", "age": 11,"role":"high"  }]
    // Two documents were inserted in the database
    // newDocs is an array with these documents, augmented with their _id
       res.json(newDocs.length);
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
    //body  - {"page":1,"pageSize":50,"name":"guest"}
    //res   -{"code":0,"data":[{"experience":"Less than 1 year",
    //"frequency":"2 to 5 SMS daily","id":6,"isNative":"no","phoneModel":"Nokia"}],
    //"message":"","success":true,"total":31461}
    var body = req.body;
    var page = body.page;
    var pageSize = body.pageSize;
    var skip = (page-1)*pageSize;
    
    //留下查询条件
    delete body.page;
    delete body.pageSize;
    var name = new RegExp(body.name); 
    
    db.gzh.find({ name:{$regex:name}}).sort({ _id: 1 }).skip(skip).limit(pageSize).exec(function (err, docs) {
    // docs is [doc3, doc1]
     if(err!="null"){
         res.json({"code":0,"data":docs,"message":"","success":true,"total":docs.length});
     }else{
         res.json({"code":10,"data":null,"message":"query data error","success":false,"total":null});
     }
    });
}
var update = function(req,res,next){
   
     console.log(req.body);
    db.gzh.update(req.body.key,{ $set: req.body.data }, { upsert: true }, function (err, numReplaced) {
        //{ "name": "admin","age": 42  }   { "name": {"$regex":/s/}
        console.log(err);
          res.json(numReplaced);
      });
}
var remove = function(req,res,next){
   
     console.log(req.body);
    db.gzh.remove(req.body,{}, function (err, numRemoved) {
        //{ "name": "admin","age": 42  }   { "name": {"$regex":/s/}
           
            if(err!="null"){
                res.json(numRemoved);
            }else{
                console.log(err);
            }
         
      });
}
module.exports = {
    add:add,
    find:find,
    update:update,
    remove:remove,
    findByPage:findByPage,
};