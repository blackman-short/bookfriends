const FeedBackInfo = require('../models').FeedBackInfo

/**
 * Saves one feedback.
 * @param {*JSON} info
 */
async function save (userId, content) {
  let data = null

  if (userId && content) {
    const feedbackInfo = new FeedBackInfo({
      userId: userId,
      content: content
    })
    data = await feedbackInfo.save()
  }

  return data
}

exports.save = save
