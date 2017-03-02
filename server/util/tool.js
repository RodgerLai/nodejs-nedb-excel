/**
 * Created by ASUS on 2016/12/30.
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
//调用： var time1 = new Date().Format("yyyy-MM-dd");var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
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
function result2array(sql,result){
    var jsonArray= [];
    var cols = result.metaData;
    var rows = result.rows;
    if(result.rows.length>0) {
        for(var r = 0; r < rows.length; r++) {
            var model = new sql.model();
            for (var x in model) {
                for (var i = 0; i < cols.length; i++) {
                    var data = rows[r][i];
                     if (cols[i].name.toLowerCase() == x) {
                         if(data instanceof Date){
                             model[x] = data.Format("yyyy-MM-dd hh:mm:ss");continue;
                         }
                        model[x] = data;
                    }
                }
            }
            jsonArray.push(model);
        }
    }
    return jsonArray;
}
function notNull(param){
    return (param !=null && param !='')?true:false;
}
function currentTime(){
    return new Date().Format("yyyy-MM-dd hh:mm:ss");
}
function getUpdateSql(param){
    var sql =" ";
    for (var x in param) {
        if(x!="id"&&this.isNull(param[x])){
            sql += ","+x+"="+param[x];
        }
    }
    return sql.substr(1,sql.length)+" where id="+param["id"];
}
function getDeletesSql(arr){//传入数组如[1,3,2]
    var ids ="";
    for(var id in arr){
        ids +=","+arr[id];
    }
    return " ("+ids.substr(1,ids.length)+")";
}
module.exports={
    jsonWrite : jsonWrite,// 向前台返回JSON方法的简单封装
    result2array : result2array,//从数据库读取的数据result转成对象数组格式
    notNull : notNull,//判空
    currentTime : currentTime, //获取当前时间,
    getUpdateSql : getUpdateSql,//拼接更新sql语句
    getDeletesSql : getDeletesSql,//批量删除sql语句
}