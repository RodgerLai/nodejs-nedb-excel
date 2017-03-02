/**
 * Created by ASUS on 2017/1/2.
 */
var poolPromise = require('../conf/pool');
var sql = require('./policeSqlMapping');
var tool = require('../util/tool');
module.exports = {
    add:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    //name,callnumber,peaktime,resttime,mealtime,responsiblearea,
                    //    patrolline,worktime,createtime,updatetime,isactive,remark,dadui_id,zhongdui_id
                    var param = req.body;
                    var insertParam = [param.name,param.gender,param.policenumber,param.tetra_id,param.lon,param.lat,
                        new Date(),new Date(),1, param.remark, param.dadui_id, param.zhongdui_id, param.post_id];
                   console.log(insertParam);
                    return conn.execute(sql.insert, insertParam)
                        .then(function(result) {
                            tool.jsonWrite(res,result.rowsAffected);

                            return conn.close();
                        })
                        .catch(function(err) {
                            console.log(err.message);
                            if(err.message.substr(0,9)=="ORA-00001"){//警号policenumber 唯一处理
                                tool.jsonWrite(res,"-1");
                            }else{
                            tool.jsonWrite(res,"0");}

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
                    tool.jsonWrite(res,"0");
                });
        });
    },
    delete:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    var idsArray = req.body;
                    return conn.execute(sql.delete+tool.getDeletesSql(idsArray))
                        .then(function(result) {
                            tool.jsonWrite(res,result.rowsAffected);

                            return conn.close();
                        })
                        .catch(function(err) {
                            console.log(err.message);
                            tool.jsonWrite(res,"0");

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
                    tool.jsonWrite(res,"0");
                });
        });
    },
    update:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    var param = req.body;
                    console.log(param);
                    if(!tool.notNull(param.id)) {
                        console.log(param.id);
                        tool.jsonWrite(res, 0);return;
                    }
                    var date = new Date();
                    var updateParam = [param.name,param.gender,param.policenumber,param.tetra_id,
                         new Date(),1,param.remark,param.dadui_id, param.zhongdui_id, param.post_id,param.id];
                    console.log(updateParam);
                    return conn.execute(sql.update,updateParam)
                        .then(function(result) {
                            tool.jsonWrite(res,result.rowsAffected);

                            return conn.close();
                        })
                        .catch(function(err) {
                            console.log(err.message);
                            tool.jsonWrite(res,"0");

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
                    tool.jsonWrite(res,"0");
                });
        });
    },
    queryById:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    var id = req.query.id;
                    return conn.execute(sql.queryById, [id])
                        .then(function(result) {
                            tool.jsonWrite(res,tool.result2array(sql,result));
                            return conn.close();
                        })
                        .catch(function(err) {
                            console.log(err.message);
                            tool.jsonWrite(res,"0");

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
                    tool.jsonWrite(res,"0");
                });
        });
    },
    queryAll:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    return conn.execute(sql.queryAll)
                        .then(function(result) {
                            tool.jsonWrite(res,tool.result2array(sql,result));
                            return conn.close();
                        })
                        .catch(function(err) {
                            console.log(err.message);
                            tool.jsonWrite(res,"0");

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
                    tool.jsonWrite(res,"0");
                });
        });
    },
    query:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    //name like % :name % and responsiblearea like % :responsiblearea % and dadui_id=?dadui_id
                    var query = req.query;
                    var queryStr ="";
                    if(tool.notNull(query.name)){
                        queryStr += "and t.name like '%"+query.name+"%'";
                    }
                    if(tool.notNull(query.policenumber)){
                        queryStr += "and t.policenumber like '%"+query.policenumber+"%'";
                    }
                    if(tool.notNull(query.dadui_id)){
                        queryStr += "and t.dadui_id="+query.dadui_id;
                    }
                    if(tool.notNull(query.zhongdui_id)){
                        queryStr += "and t.zhongdui_id="+query.zhongdui_id;
                    }
                    if(tool.notNull(query.post_id)){
                        queryStr += "and t.post_id="+query.post_id;
                    }
                    return conn.execute(sql.query+queryStr)
                        .then(function(result) {
                            tool.jsonWrite(res,tool.result2array(sql,result));
                            return conn.close();
                        })
                        .catch(function(err) {
                            console.log(err.message);
                            tool.jsonWrite(res,"0");

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
                    tool.jsonWrite(res,"0");
                });
        });
    },

}

