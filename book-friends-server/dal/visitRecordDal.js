const tool = require('../utils/tools')
const VisitRecordInfo = require('../models').VisitRecordInfo

/**
 * Updates the visit records.
 * @param {String} userId
 * @param {String} isbn
 */
async function updateVisitRecord (userId, isbn) {
  const currentDate = tool.getCurrentDate()
  const find = await VisitRecordInfo.findOne({visitAt: currentDate})

  if (!find) {
    const visitInfo = new VisitRecordInfo({
      userId: userId,
      isbn: isbn
    })

    await visitInfo.save()
  } else {
    await VisitRecordInfo.updateOne({id: find.id}, {visitCount: find.visitCount + 10})
  }
}

/**
 * Gets the vistiCount by date.
 * @param {String} date
 */
async function getVisitCountByDate (beginDate, currentDate) {
  // const currentDate = new Date(date)
  // const day = new Date(date).getDate()
  // let beginDate = new Date(currentDate.setDate(day - 7))
  // beginDate = beginDate.getFullYear() + '-' + (beginDate.getMonth + 1) + '-' + beginDate.getDate()
  const data = await VisitRecordInfo.aggregate([
    {$match: {'visitAt': {'$gte': beginDate, '$lte': currentDate}}},
    {$group: {'_id': {'vistiCount': '$visitCount', 'visitAt': '$visitAt'}}},
    {$project: {'_id': 0, 'vistiCount': '$_id.vistiCount', 'visitAt': '$_id.visitAt'}}
  ])

  return data
}

exports.updateVisitRecord = updateVisitRecord
exports.getVisitCountByDate = getVisitCountByDate
