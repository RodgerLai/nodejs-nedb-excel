var db = require("../db/nedb");
var add = function(req,res,next){
    db.gzh.insert(req, function (err, newDocs) {
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
        console.log(err);
          res.json(docs);
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
};