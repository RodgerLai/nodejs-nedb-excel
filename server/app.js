var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var exphbs  = require('express-handlebars');
//var hbs  = require('handlebars');
var hbsHelper = require('./util/hbsHelper');
var log4js = require('log4js');

var index = require('./routes/index');
var users = require('./routes/users');
var dadui = require('./routes/dadui');
var zhongdui = require('./routes/zhongdui');
var post = require('./routes/post');
var police = require('./routes/police');
var road = require('./routes/road');

//var con = require('./dao/select1');

var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    console.log("-跨域访问");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//log4js
log4js.configure('log4js.json',{});
var logger = log4js.getLogger('nomel');
logger.setLevel('INFO');

/*// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');*/

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers:hbsHelper
}));
app.set('view engine', '.hbs');


//模板引擎会缓存已
//编译的模板（只有在模板发生改变的时候才会重新编译和重新缓存），这会改进模板视图的性能。默认情况下，视图缓存会在开发模式下禁用，在生产模式下启用。如果想显式地启用视图缓存，可以这样做：
//app.set('view cache',true);

// this is the line that generates the error
//hbs.registerPartial('header', 'header');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));

app.use(function(req, res, next) {
    console.log("filter....");
    // if (!res.locals.partials) res.locals.partials = {};
    // res.locals.locations =[ { name: 'Portland', forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html', iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif', weather: 'Overcast', temp: '54.1 F (12.3 C)', },
    //     { name: 'Bend', forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html', iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif', weather: 'Partly Cloudy', temp: '55.0 F (12.8 C)', },
    //     { name: 'Manzanita', forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html', iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif', weather: 'Light Rain', temp: '55.0 F (12.8 C)', }
    //     ];
    next();
});

//路由/请求配置
app.use('/', index);
app.use('/users', users);
app.use('/dadui', dadui);
app.use('/zhongdui', zhongdui);
app.use('/post', post);
app.use('/police', police);
app.use('/road', road);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("catch 404 and forward to error handler...");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log("error handler....");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
exports.logger=function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
};

module.exports = app;
