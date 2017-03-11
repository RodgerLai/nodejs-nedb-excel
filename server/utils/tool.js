var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require("path");
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function jsonWrite(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
}

function getGzhHead(){
    return [ '序号',
  '公众号',
  'ID',
  '分类',
  '粉丝数/w',
  '头条/元',
  '二条/元',
  '三条/元',
  '四条/元',
  '备注',
  '是否开通评论功能',
  '阅读量',
  '是否认证',
  '媒体手机',
  '媒体QQ',
  '折扣',
  '下次更新时间',
  '商务对接' ];
}
function getGzhFindObj(body){
    var findObj ={};
    if(body.gid!=undefined){//id
           findObj['gid']={$regex:new RegExp(body.gid)};
    }
    if(body.name!=undefined){//name
        findObj['name']={$regex:new RegExp(body.name)};
    }
    if(body.type!=undefined){//name
        findObj['type']={$in:body.type};
    }

    if(body.h1Begin!=undefined&&body.h1End==undefined){
         findObj['h1']={$gte:body.h1Begin};
    }
    if(body.h1Begin==undefined&&body.h1End!=undefined){
         findObj['h1']={$lte:body.h1End};
    }
     if(body.h1Begin!=undefined&&body.h1End!=undefined){
         findObj['h1']={$gte:body.h1Begin,$lte:body.h1End};
    }
   
    if(body.h2Begin!=undefined&&body.h2End==undefined){
         findObj['h2']={$gte:body.h2Begin};
    }
    if(body.h2Begin==undefined&&body.h2End!=undefined){
         findObj['h2']={$lte:body.h2End};
    }
     if(body.h2Begin!=undefined&&body.h2End!=undefined){
         findObj['h2']={$gte:body.h2Begin,$lte:body.h2End};
    }
   
    if(body.h3Begin!=undefined&&body.h3End==undefined){
         findObj['h3']={$gte:body.h3Begin};
    }
    if(body.h3Begin==undefined&&body.h3End!=undefined){
         findObj['h3']={$lte:body.h3End};
    }
     if(body.h3Begin!=undefined&&body.h3End!=undefined){
         findObj['h3']={$gte:body.h3Begin,$lte:body.h3End};
    }

     if(body.h4Begin!=undefined&&body.h4End==undefined){
         findObj['h4']={$gte:body.h4Begin};
    }
    if(body.h4Begin==undefined&&body.h4End!=undefined){
         findObj['h4']={$lte:body.h4End};
    }
     if(body.h4Begin!=undefined&&body.h4End!=undefined){
         findObj['h4']={$gte:body.h4Begin,$lte:body.h4End};
    }
   
    if(body.fansBegin!=undefined&&body.fansEnd==undefined){
         findObj['fans']={$gte:body.fansBegin};
    }
    if(body.fansBegin==undefined&&body.fansEnd!=undefined){
         findObj['fans']={$lte:body.fansEnd};
    }
     if(body.fansBegin!=undefined&&body.fansEnd!=undefined){
         findObj['fans']={$gte:body.fansBegin,$lte:body.fansEnd};
    }

     if(body.discountBegin!=undefined&&body.discountEnd==undefined){
         findObj['discount']={$gte:body.discountBegin};
    }
    if(body.discountBegin==undefined&&body.discountEnd!=undefined){
         findObj['discount']={$lte:body.discountEnd};
    }
     if(body.discountBegin!=undefined&&body.discountEnd!=undefined){
         findObj['discount']={$gte:body.discountBegin,$lte:body.discountEnd};
    }
   
   
    if(body.commentfunc!=undefined){
        findObj['commentfunc']=body.commentfunc;
    }
    if(body.isauth!=undefined){
        findObj['isauth']=body.isauth;
    }

    if(body.businessdock!=undefined){//businessdock
        findObj['businessdock']={$regex:new RegExp(body.businessdock)};
    }
    return findObj;

}
function exportReducer(previousValue, currentValue){
    var arr = [];
    

       for(var p in currentValue){
           if(p!="_id"){
             arr.push(currentValue[p]); 
            }
        }
        previousValue.push(arr);
        return previousValue;     
}
function exportExcel(datas){
   
    var buffer = xlsx.build([{name: "Sheet1", data: datas.reduce(exportReducer,[getGzhHead()])}]);
    var downloadDir = path.resolve(__dirname, '../', 'public', 'downloadfile');
    var currentDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var dir = downloadDir+"/"+currentDate.replace(/:/g,"-") +'微信报价单.xlsx'
    fs.writeFileSync(dir, buffer, 'binary');
    return dir;
   
}

module.exports = {
    jsonWrite:jsonWrite,
    getGzhFindObj:getGzhFindObj,
    exportExcel:exportExcel,
}