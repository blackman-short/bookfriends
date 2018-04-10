/**
 * log4js 配置文件
 * 日志等级由低到高
 * ALL TRACE DEBUG INFO WARN ERROR FATAL OFF.
 * 关于log4js的appenders的配置说明 * https://github.com/nomiddlename/log4js-node/wiki/Appenders
*/
var path = require('path')
// 日志根目录
var baseLogPath = process.env.LOG_PATH || path.resolve(__dirname, '../logs')
// 错误日志目录
// var logPath = '/error'
// 错误日志文件名
var logFileName = 'book-friends-'
// 错误日志输出完整路径
var logPath = baseLogPath + '/' + logFileName
module.exports = {
  'appenders': {
    'logger': {
      'type': 'dateFile', // 日志类型
      'filename': logPath, // 日志输出位置
      'alwaysIncludePattern': true, // 是否总是有后缀名
      'pattern': 'yyyy-MM-dd.log', // 后缀
      'maxLogSize': 10 * 1000 * 1000,
      'encoding': 'utf-8'
    }
  },
  'levels': // 设置logger名称对应的的日志等级
    { },
  'categories': {
    'default': {
      'appenders': ['logger'],
      'level': process.env.LOG_LEVEL || 'ALL'
    }
  },
  'baseLogPath': baseLogPath // logs根目录
}
