const tool = require('../../utils/tools')
const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const visitRecordDal = require('../../dal/visitRecordDal')

async function getVisitCountByDate () {
  const funcName = 'server: managers/visitRecord/getVisitCountByDate'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  const currentDateStr = tool.getCurrentDate()
  const currentDate = new Date(currentDateStr)
  const year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate() - 6
  if (day <= 0) {
    day = tool.getDaysOfMonth(year, month) - 6
    month = currentDate.getMonth()
  }

  let beginDate = year + '-' + month + '-' + day

  beginDate = beginDate.getFullYear() + '-' + (beginDate.getMonth + 1) + '-' + beginDate.getDate()

  try {
    const loadData = await visitRecordDal.getVisitCountByDate(beginDate, currentDateStr)
    if (loadData) {
      result = { errorCode: errorCode.SUCCESS, data: loadData }
    } else {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
    logUtil.logErrorMsg(funcName, result.errorMsg)
    return result
  }

  return result
}

exports.getVisitCountByDate = getVisitCountByDate
