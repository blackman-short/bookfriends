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
  const data = await VisitRecordInfo.aggregate([
    {$match: {'visitAt': {'$gte': beginDate, '$lte': currentDate}}},
    {$group: {'_id': {'visitAt': '$visitAt'}, 'visitCount': {$sum: '$visitCount'}}},
    {$project: {'_id': 0, 'visitCount': 1, 'visitAt': '$_id.visitAt'}},
    {$sort: { 'visitAt': 1 }}
  ])

  return data
}

exports.updateVisitRecord = updateVisitRecord
exports.getVisitCountByDate = getVisitCountByDate
