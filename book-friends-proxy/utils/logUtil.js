const log4j = require('log4js')
const logConfig = require('../config/logConfig')
log4j.configure(logConfig)
const logInfo = log4j.getLogger('logInfo')
const moment = require('moment')

/**
 * Logs error message.
 * @param {*String} errorMsg
 */
function logErrorMsg (functionName, errorMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************INFO START***************'
  messageInfo += '\n'
  messageInfo += `[${functionName}]` + errorMsg + '\n'
  messageInfo += '***************INFO END***************'
  messageInfo += '\n'
  logInfo.error(messageInfo)
}

/**
 * Logs warning message.
 * @param {*String} warningMsg
 */
function logWarningMsg (functionName, warningMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************WARNING START***************'
  messageInfo += '\n'
  messageInfo += `[${functionName}]` + warningMsg + '\n'
  messageInfo += '***************WARNING END***************'
  messageInfo += '\n'
  logInfo.warn(messageInfo)
}

/**
 * Logs debug message.
 * @param {*String} debugMsg
 */
function logDebugMsg (functionName, debugMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************DEBUG START***************'
  messageInfo += '\n'
  messageInfo += `[${functionName}]` + debugMsg + '\n'
  messageInfo += '***************DEBUG END***************'
  messageInfo += '\n'
  logInfo.debug(messageInfo)
}

/**
 * Logs info message.
 * @param {*String} functionName
 * @param {*String} infoMsg
 */
function logInfoMsg (functionName, infoMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************DEBUG START***************'
  messageInfo += '\n'
  messageInfo += `[${functionName}]` + infoMsg + '\n'
  messageInfo += '***************DEBUG END***************'
  messageInfo += '\n'
  logInfo.info(messageInfo)
}

exports.logInfoMsg = logInfoMsg
exports.logDebugMsg = logDebugMsg
exports.logErrorMsg = logErrorMsg
exports.logWarningMsg = logWarningMsg
