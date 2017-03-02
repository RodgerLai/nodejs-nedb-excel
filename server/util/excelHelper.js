/**
 * Created by ASUS on 2017/1/12.
 */

/**
 * 去除括号
 * @param str
 */
function deleteBrackets(str){
   return str.replace(/\(/g,"").replace(/\)/g,"").replace(/\（/g,"").replace(/\）/g,"");
}
/**
 *  交警一大队每日岗位民警安排表                   2016年12月29日（周三）
 * 转成 2016-12-29
 * @param str
 */
function excelHead2date(head){
     head = head.trim().split(" ");
    var s = head[head.length-1].split("日")[0];
    return s.replace(/年/,"-").replace(/月/,"-");
}
/**
 *  一中队                                    （北蔡、六里、东明部分地区)
 * 转成 {name:"一中队",responsiblearea:"北蔡、六里、东明部分地区"}
 * @param str
 */
function getNameAndArea(head){
     head = head.trim().split(" ");
    return [head[0],deleteBrackets(head[head.length-1])] ;
}
/**
 * 从字符串中获取数字  "刘备23433"  ==>>   "23433"
 * @param text
 * @returns {string|void|XML|*}
 */
function getNumInStr(text){
    return text.replace(/[^0-9]/ig,"");
}
/**
 * 初始化单元格子里的每个值
 * @param value
 * @returns {string|*}
 */
function initCell(value){
    value = value.toString().trim()
    if(value==null||value=="undefined"||value=="无"){
        value = "";
    }
    return value;
}
/**
 * 输出  last  update
 * @type {{initCell: initCell, excelHead2date: excelHead2date, getNameAndArea: getNameAndArea, deleteBrackets: deleteBrackets, getNumInStr: getNumInStr}}
 */
module.exports={
    initCell:initCell,
    excelHead2date:excelHead2date,
    getNameAndArea:getNameAndArea,
    deleteBrackets:deleteBrackets,
    getNumInStr:getNumInStr,
}
