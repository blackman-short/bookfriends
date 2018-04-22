var fs = require('fs')
var path = require('path')
var router = require('./routers')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()
var logConfig = require('./config/logConfig')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

/**
 * 确定目录是否存在, 如果不存在则创建目录.
 * @param {*String} pathStr
 */
var confirmPath = function (pathStr) {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr)
  }
}

/**
 * 初始化log相关目录.
 */
var initLogPath = function () {
  // 创建log的根目录'logs'.
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath)
    // 根据不同的logType创建不同的文件目录.
    for (var i = 0, len = logConfig.appenders.length; i < len; i++) {
      if (logConfig.appenders[i].path) {
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
      }
    }
  }
}

initLogPath()
app.listen(3003, function () {
  console.log('server is listenning on 3003')
})

module.exports = app
