var poolPromise = require('../conf/pool');
var sql = require('./daduiSqlMapping');
var tool = require('../util/tool');
module.exports = {
    add:function(req,res,next){
        poolPromise.then(function(pool){
            pool.getConnection()
            .then(function(conn) {
                // 获取前台页面传过来的参数
                 var param = req.body;
                return conn.execute(sql.insert, [param.name, param.responsiblearea])
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
                            console.log(result);
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
                        jsonWrite(res, undefined);
                        return;
                    }
                    return conn.execute(sql.update, [param.name, param.responsiblearea,param.id])
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
    }

}
