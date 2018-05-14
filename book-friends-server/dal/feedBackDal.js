const FeedBackInfo = require('../models').FeedBackInfo

/**
 * Saves one feedback.
 * @param {*JSON} info
 */
async function save (userId, content) {
  let data = null

  if (userId && content) {
    let feedbackInfo = new FeedBackInfo({
      userId: userId,
      content: content
    })

    const findId = await FeedBackInfo.findOne({id: feedbackInfo.id})
    if (findId) {
      feedbackInfo.id = findId.id + '1'
    }

    data = await feedbackInfo.save()
  }

  return data
}

exports.save = save
