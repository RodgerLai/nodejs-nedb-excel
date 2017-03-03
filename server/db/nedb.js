var Datastore = require('nedb'),path = require("path")
  , db = {};
  // Of course you can create multiple datastores if you need several
// collections. In this case it's usually a good idea to use autoload for all collections.
var usersdbFile = path.resolve(__dirname, './', 'data', 'usersdb');
var gzhdbFile = path.resolve(__dirname, './', 'data', 'gzhdb');

db.users = new Datastore({ filename: usersdbFile, autoload: true });
db.gzh = new Datastore({ filename: gzhdbFile, autoload: true });


module.exports=db;