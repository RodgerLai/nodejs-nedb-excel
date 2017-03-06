var db = require("../db/nedb");
var gzh={
    model : function(){
        return {
                no:"",
                name:"",
                gid:"",
                type:"",
                fans:"",
                h1:"",
                h2:"",
                h3:"",
                h4:"",
                remarks:"",
                commentfunc:"",
                readamount:"",
                isauth:"",
                mediacell:"",
                mediaqq:"",
                discount:"",
                nextupdate:"",
                businessdock:""
        }
    },
    gzhReducer : function(previousValue, currentValue){
       var obj = new gzh.model();
        var index = 0;
       for(var p in obj){
           if(currentValue[index]!=undefined){
              obj[p] = currentValue[index];
            }
         index++;
       }
       db.gzh.update({ gid: obj["gid"] }, obj, { upsert: true }, function (err, numReplaced, upsert) {
        // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
        // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
        if(err!="null"){
           console.log(upsert);
        }else{
             console.log(err);
        }
     });
             previousValue.push(currentValue);
             return previousValue;
        
  }

}

module.exports = gzh;
