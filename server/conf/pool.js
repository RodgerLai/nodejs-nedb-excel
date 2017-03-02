 var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
 oracledb.autoCommit = true;
 // force all CLOBs to be returned as Strings
 oracledb.fetchAsString = [ oracledb.CLOB ];
var pool;
function init() {
  oracledb.createPool(
    {
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
      // Default values shown below
      // externalAuth: false, // whether connections should be established using External Authentication
      // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
      // poolMin: 0, // start with no connections; let the pool shrink completely
      // poolIncrement: 1, // only grow the pool by one connection at a time
      // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
      // poolPingInterval: 60, // check aliveness of connection if in the pool for 60 seconds
      // queueRequests: true, // let Node.js queue new getConnection() requests if all pool connections are in use
      // queueTimeout: 60000, // terminate getConnection() calls in the queue longer than 60000 milliseconds
      // poolAlias: 'myalias' // could set an alias to allow access to the pool via a name
      // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
    },
    function(err, pool) {
      if (err) {
        console.error("createPool() error: " + err.message);
        return;
      }

      resolve(pool);

      console.log("Server running at http://localhost:");
    }
  );
}
 

/*var pro = new Promise(function(resolve, reject){
     oracledb.createPool(
    {
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
      // Default values shown below
      // externalAuth: false, // whether connections should be established using External Authentication
      // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
      // poolMin: 0, // start with no connections; let the pool shrink completely
      // poolIncrement: 1, // only grow the pool by one connection at a time
      // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
      // poolPingInterval: 60, // check aliveness of connection if in the pool for 60 seconds
      // queueRequests: true, // let Node.js queue new getConnection() requests if all pool connections are in use
      // queueTimeout: 60000, // terminate getConnection() calls in the queue longer than 60000 milliseconds
      // poolAlias: 'myalias' // could set an alias to allow access to the pool via a name
      // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
    },
    function(err, pool) {
      if (err) {
        console.error("createPool() error: " + err.message);
       reject(err);
      }
      resolve(pool);
      console.log("建立好了oracle连接池.....");
    }
  );
});
*/


  var poolPromise = oracledb.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString
    // Default values shown below
    // externalAuth: false, // whether connections should be established using External Authentication
    // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
    // poolMin: 0, // start with no connections; let the pool shrink completely
    // poolIncrement: 1, // only grow the pool by one connection at a time
    // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
    // poolPingInterval: 60, // check aliveness of connection if in the pool for 60 seconds
    // queueRequests: true, // let Node.js queue new getConnection() requests if all pool connections are in use
    // queueTimeout: 60000, // terminate getConnection() calls in the queue longer than 60000 milliseconds
    // poolAlias: 'myalias' // could set an alias to allow access to the pool via a name.
    // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
  })
console.log("init oracle pool.....");
 module.exports = poolPromise;