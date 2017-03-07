var db = require("../db/nedb");
var gzh={
    model : function(){
        return {
                    no:"",//序号
                    name:"",//公众号
                    gid:"",//ID
                    type:"",//分类
                    fans:"",//粉丝数/w
                    h1:"",//头条/元
                    h2:"",//二条/元
                    h3:"",//三条/元
                    h4:"",//四条/元
                    remarks:"",//备注
                    commentfunc:"",//是否开通评论功能
                    readamount:"",//阅读量
                    isauth:"",//是否认证
                    mediacell:"",//媒体手机
                    mediaqq:"",//媒体QQ
                    discount:"",//折扣
                    nextupdate:"",//下次更新时间
                    businessdock:"",//商务对接	
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
            if(upsert==undefined){
               // console.log(upsert+"  -gid:");
                console.log(obj.gid);
            }
        }else{
             console.log(err);
        }
     });
             previousValue.push(currentValue);
             return previousValue;
        
  }

}

module.exports = gzh;
