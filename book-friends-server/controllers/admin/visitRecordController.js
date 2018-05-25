const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const visitRecordManager = require('../../managers/admin/visitRecordManager')

async function getVisitCountByDate (req, res, next) {
  const functionName = 'server: controllers/admin/visitRecord/getVisitCountByDate'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.query))
  let responseResult = { errorCode: errorCode.SUCCESS }

  try {
    responseResult = await visitRecordManager.getVisitCountByDate()
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

exports.getVisitCountByDate = getVisitCountByDate
