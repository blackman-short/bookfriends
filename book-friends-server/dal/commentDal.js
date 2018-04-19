const CommentInfo = require('../models').CommentInfo
const UserDynamicInfo = require('../models').UserDynamicInfo
/**
 * Adds comment of one dynamic.
 * @param {*String} dynamicId
 * @param {*JSON} comment
 */
async function addComment (dynamicId, comment) {
  let data = null

  if (dynamicId) {
    const find = await UserDynamicInfo.findOne({id: dynamicId, isActive: true})
    if (find) {
      comment.dynamicId = dynamicId
      const commentInfo = new CommentInfo(comment)
      data = await commentInfo.save()
    }
  }

  return data
}

/**
 * Querys one dynamic's comments by dynamicId.
 * @param {*String} dynamicId
 */
async function queryCommentsByDynamicId (dynamicId) {
  let data = null

  if (dynamicId) {
    data = await CommentInfo.find({dynamicId: dynamicId, isActive: true})
  }

  return data
}

/**
 * Querys comment's total count of one certain dynamic.
 * @param {*String} dynamicId
 */
async function queryCommentCountByDynamicId (dynamicId) {
  let data = 0

  if (dynamicId) {
    data = await CommentInfo.find({dynamicId: dynamicId, isActive: true}).count()
  }

  return data
}

exports.addComment = addComment
exports.queryCommentCountByDynamicId = queryCommentCountByDynamicId
exports.queryCommentsByDynamicId = queryCommentsByDynamicId
