/**
 * Created by ASUS on 2017/1/2.
 */
var poolPromise = require('../conf/pool');
var sql = require('./roadSqlMapping');
var tool = require('../util/tool');
module.exports = {
    add:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
                .then(function(conn) {
                    // 获取前台页面传过来的参数
                    var param = req.body;
                    return conn.execute(sql.insert, [param.road, param.condition,param.type,new Date(),param.dadui_id])
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
                    if(param.id == null) {
                        tool.jsonWrite(res, undefined);
                        return;
                    }
                    return conn.execute(sql.update, [param.road, param.condition,param.type,new Date(),param.dadui_id,param.id])
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
                    if(tool.notNull(query.road)){
                        queryStr += " and t.road like '%"+query.road+"%'";
                    }
                    if(tool.notNull(query.daterange)){//日期范围格式“2017-01-05 到 2017-01-11”
                        var arr = query.daterange.split(" ");
                        console.log(arr);
                        var sdate = arr[0]+" 00:00:00";
                        var edate = arr[2]+" 23:59:59";
                        console.log(edate);
                        queryStr += " and t.uptime between to_date('"+sdate+"',"+"'yyyy-mm-dd hh24:mi:ss')" +
                            " and to_date('"+edate+"',"+"'yyyy-mm-dd hh24:mi:ss')";
                        //+" '24:00:00'"
                    }
                    if(tool.notNull(query.dadui_id)){
                        queryStr += " and t.dadui_id="+query.dadui_id;
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
    }

}

