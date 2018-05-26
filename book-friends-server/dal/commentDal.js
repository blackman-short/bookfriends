const tools = require('../utils/tools')
const CommentInfo = require('../models').CommentInfo
const UserDynamicInfo = require('../models').UserDynamicInfo
const PAGE_SIZE = require('../config/systemConfig').pageSize

/**
 * Adds comment of one dynamic.
 * @param {String} dynamicId
 * @param {JSON} comment
 */
async function addComment (dynamicId, comment) {
  let data = null

  if (dynamicId) {
    const find = await UserDynamicInfo.findOne({id: dynamicId, isActive: true})
    if (find) {
      comment.dynamicId = dynamicId
      let commentInfo = new CommentInfo(comment)
      const findId = await CommentInfo.findOne({id: commentInfo.id})
      if (findId) {
        commentInfo.id = findId.id + '1'
      }
      data = await commentInfo.save()
    }
  }

  return data
}

/**
 * Querys one dynamic's comments by dynamicId.
 * @param {String} dynamicId
 */
async function queryCommentsByDynamicId (dynamicId, pageIndex) {
  let data = null

  if (dynamicId && pageIndex > 0) {
    const skipCount = (pageIndex - 1) * PAGE_SIZE
    data = await CommentInfo.find({dynamicId: dynamicId, isActive: true}, '-_id -__v -updateTime -isActive -dynamicId').skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Querys comment's total count of one certain dynamic.
 * @param {String} dynamicId
 */
async function queryCommentCountByDynamicId (dynamicId) {
  let data = 0

  if (dynamicId) {
    data = await CommentInfo.find({dynamicId: dynamicId, isActive: true}).count()
  }

  return data
}

/**
 * Likes one comment.
 * @param {String} commentId
 */
async function likeComment (commentId) {
  let data = null

  if (commentId) {
    const comment = await queryCommentById(commentId)
    if (comment) {
      data = await CommentInfo.update({id: commentId}, {likeCount: comment.likeCount + 1, updateTime: tools.getCurrentTime()})
    }
  }

  return data
}

/**
 * Querys one comment info by ID.
 * @param {String} commentId
 */
async function queryCommentById (commentId) {
  let commentInfo = null

  if (commentId) {
    commentInfo = await CommentInfo.findOne({id: commentId, isActive: true})
  }

  return commentInfo
}

exports.addComment = addComment
exports.likeComment = likeComment
exports.queryCommentById = queryCommentById
exports.queryCommentCountByDynamicId = queryCommentCountByDynamicId
exports.queryCommentsByDynamicId = queryCommentsByDynamicId
