var express = require('express');
var router = express.Router();
var excelHelper = require('../util/excelHelper');
var multiparty = require('multiparty');
var util = require('util');
var xlsx = require('node-xlsx');
//var xlsx = require('xlsx');
var fs = require('fs');
var log = require('log4js').getLogger("index");
var postDao = require('../dao/postDao');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 // log.info(req);
});
router.get('/cal', function(req, res, next) {
  res.render('cal', { title: 'Express' });
 // log.info(req);
});
router.get('/road', function(req, res, next) {
  res.render('road', { title: 'Express' });
 // log.info(req);
});
router.get('/base-dd', function(req, res, next) {//大队
   res.render('base-dd');
});
router.get('/base-zd', function(req, res, next) {//中队
   res.render('base-zd');
});
router.get('/base-post', function(req, res, next) {//岗位
   res.render('base-post');
});
router.get('/base-police', function(req, res, next) {//警员
   res.render('base-police');
});



/* 上传页面 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 上传*/
router.post('/file/uploading', function(req, res, next){
  console.log("fuck");
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/file/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);

    if(err){
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.file_data[0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/file/' + inputFile.originalFilename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');

          //读取文件内容
          var obj = xlsx.parse(dstPath);
          //console.log(obj[0]);
          var daduis = [];
      for(var o in obj) {//一个个sheet数据遍历
        var sheet = obj[o];
        var excelObj=sheet.data;//一个sheet
        var data = [];
        for (var i in excelObj) {
          var arr = [];
          var value = excelObj[i];
          for (var j in value) {
            arr.push(excelHelper.initCell(value[j]));
          }
          data.push(arr);
        }
        //  console.log(data);

        //  dadui.push(excelObj.name);
        var zhongdui = [];
        var post = [];
        var dutydate;
        for (var i in data) {//按行遍历
          if (i == 0) {
            dutydate = excelHelper.excelHead2date(data[i][0]);
          }
          if (data[i].length == 1 && i > 0) {//中队头
            var a_zhongdui = excelHelper.getNameAndArea(data[i][0]);
            zhongdui.push({rowIndex: i, zhongdui_name: a_zhongdui[0], responsiblearea: a_zhongdui[1], posts: []});
          }
          //  console.log(data[i].length==1?data[i]:"");
        }


        if (zhongdui.length > 0) {//多个中队 岗位
          for (var z = 0, zlength = zhongdui.length; z < zlength; z++) {//遍历中队长度index
            console.log("z:" + z);
            var startIndex, endIndex;
            if (z == zlength - 1) {//遍历最后一个中队
              startIndex = parseInt(zhongdui[z].rowIndex) + 2;//两个中队头之间的第二行开始遍历（第一行为列名）
              endIndex = data.length;
            } else {
              startIndex = parseInt(zhongdui[z].rowIndex) + 2;//两个中队头之间的第二行开始遍历（第一行为列名）
              endIndex = zhongdui[z + 1].rowIndex;
            }
            //console.log("row:" + startIndex);
            //console.log("row+1:" + endIndex);
            for (var g = startIndex; g < endIndex; g++) {//遍历岗位
              //     [ '岗位名称','呼号','班次','高峰点','高峰时间','工歇时间','就餐时间','民警姓名','责任区范围','巡线','执勤时间' ]
              //name,type,callnumber,peaktime,resttime,mealtime,responsiblearea,patrolline,worktime,createtime,updatetime,isactive,remark,dadui_id,zhongdui_id
              // console.log("岗位："+data[g][0]);
              if (data[g].length > 3) {
                zhongdui[z].posts.push({
                  name: data[g][0], callnumber: data[g][1], worktime: data[g][2] + "=" + data[g][10],
                  peakpoint: data[g][3], peaktime: data[g][4], resttime: data[g][5], mealtime: data[g][6],
                  responsiblearea: data[g][8], patrolline: data[g][9],
                  dutys: [{
                    dutydate: dutydate, policenumber: excelHelper.getNumInStr(data[g][7]),
                    flight: data[g][2], post: "", zhongdui: "", dadui: ""
                  }]
                });
              } else {// [ '中', '李三刚058916' ] ==多个班次的情况
                var pre = zhongdui[z].posts[zhongdui[z].posts.length - 1];
                pre.worktime += "," + data[g][0] + "=" + data[g][2];
                pre.dutys.push({
                  dutydate: dutydate, policenumber: excelHelper.getNumInStr(data[g][1]),
                  flight: data[g][0], post: "", zhongdui: "", dadui: ""
                });
              }
            }
          }
        } else {
          console.log("请导入有值班内容的excel");
        }

        //every、some、forEach、filter、indexOf、lastIndexOf、isArray、map、reduce、reduceRight方法
        daduis.push({
          dadui_name: sheet.name,
          zhongduis: zhongdui
        });
      }//sheet遍历end
         // console.log(dutydate);
          console.log(daduis);
          for(var p in daduis[0].zhongduis[0].posts){
            console.log(daduis[0].zhongduis[0].posts[p]);
          }
          //将文件内容插入新的文件中
         /* var buffer = xlsx.build([
            {
              name:'sheet1',
              data:data
            }
          ]);
         fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});*/
          //读取文件内容 end


        }
      });
    }



    res.json(filesTmp);
    //res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
   // res.write('received upload:\n\n');
    //res.end(util.inspect({fields: fields, files: filesTmp}));
   // res.end(util.inspect({status:"200"}));
  // res.end("===");
  });
});


module.exports = router;
