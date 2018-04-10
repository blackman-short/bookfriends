const log4j = require('log4js')
const logConfig = require('../config/logConfig')
log4j.configure(logConfig)
const logInfo = log4j.getLogger('logInfo')
const moment = require('moment')

/**
 * Logs error message.
 * @param {*String} errorMsg
 */
function logErrorMsg (errorMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************INFO START***************'
  messageInfo += '\n'
  messageInfo += errorMsg + '\n'
  messageInfo += '***************INFO END***************'
  messageInfo += '\n'
  logInfo.info(messageInfo)
}

/**
 * Logs warning message.
 * @param {*String} warningMsg
 */
function logWarningMsg (warningMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************WARNING START***************'
  messageInfo += '\n'
  messageInfo += warningMsg + '\n'
  messageInfo += '***************WARNING END***************'
  messageInfo += '\n'
  logInfo.warn(messageInfo)
}

/**
 * Logs debug message.
 * @param {*String} debugMsg
 */
function logDebugMsg (debugMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************DEBUG START***************'
  messageInfo += '\n'
  messageInfo += debugMsg + '\n'
  messageInfo += '***************DEBUG END***************'
  messageInfo += '\n'
  logInfo.debug(messageInfo)
}

exports.logDebugMsg = logDebugMsg
exports.logErrorMsg = logErrorMsg
exports.logWarningMsg = logWarningMsg
