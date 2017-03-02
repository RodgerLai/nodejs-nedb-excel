/**
 * Created by ASUS on 2017/1/2.
 */
var poolPromise = require('../conf/pool');
var sql = require('./postSqlMapping');
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
                    var insertParam = [param.name,param.callnumber,param.peakpoint,param.peaktime,param.resttime,param.mealtime,param.responsiblearea,param.patrolline,
                        param.worktime,tool.currentTime(),tool.currentTime(),1, param.remark, param.dadui_id, param.zhongdui_id];
                    return conn.execute(sql.insert, insertParam)
                        .then(function(result) {
                            tool.jsonWrite(res,result.rowsAffected);

                            return conn.close();
                        })
                        .catch(function(err) {
                            tool.jsonWrite(res,"0");
                            console.log(err.message);

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    console.error(err.message);
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
                            tool.jsonWrite(res,"0");
                            console.log(err.message);

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    tool.jsonWrite(res,"0");
                    console.error(err.message);
                });
        });
    },
    update:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    var param = req.body;
                    if(tool.notNull(param.id)) {
                        tool.jsonWrite(res, 0);return;
                    }
                    var updateParam = [param.name,param.callnumber,param.peakpoint,param.peaktime,param.resttime,param.mealtime,param.responsiblearea,param.patrolline,
                        param.worktime,param.createTime,tool.currentTime(),1, param.remark, param.dadui_id, param.zhongdui_id,param.id];
                    return conn.execute(sql.update,updateParam)
                        .then(function(result) {
                            tool.jsonWrite(res,result.rowsAffected);

                            return conn.close();
                        })
                        .catch(function(err) {
                            tool.jsonWrite(res,"0");
                            console.log(err.message);

                            return conn.close();
                        });
                })
                .catch(function(err) {
                    tool.jsonWrite(res,"0");
                    console.error(err.message);
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
                    if(tool.notNull(query.responsiblearea)){
                        queryStr += "and t.responsiblearea like '%"+query.responsiblearea+"%'";
                    }
                    if(tool.notNull(query.dadui_id)){
                        queryStr += "and t.dadui_id="+query.dadui_id;
                    }
                    if(tool.notNull(query.zhongdui_id)){
                        queryStr += "and t.zhongdui_id="+query.zhongdui_id;
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
    queryByDadui:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    var id = req.query.id;
                    return conn.execute(sql.queryByDadui, [id])
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

