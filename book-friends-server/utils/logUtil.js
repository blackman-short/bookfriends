const log4j = require('log4js')
const logConfig = require('../config/logConfig')
log4j.configure(logConfig)
const logInfo = log4j.getLogger('logInfo')
const moment = require('moment')

/**
 * Logs error message.
 * @param {*String} errorMsg
 */
function logMessage (errorMsg) {
  const data = moment.now()
  let messageInfo = `[${data.toString()}]` + '\n'
  messageInfo += '***************INFO START***************'
  messageInfo += '/n'
  messageInfo += errorMsg
  messageInfo += '***************INFO END***************'
  messageInfo += '/n'
  logInfo.info(messageInfo)
}

exports.logMessage = logMessage
