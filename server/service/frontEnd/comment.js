const commentModel = require('../../models/comment')

class commentService {
  // 发表评论
  static async sendComment(value) {
    const addComment = await commentModel.sendComment(value)
    return addComment
  }

  // 查询回复对象
  // static async commentId(id) {
  //   const commentId = await commentModel.commentId(id)
  //   return commentId
  // }

  // 根据文章ID查找评论
  static async findComment(value) {
    const findComment = await commentModel.findComment(value)
    return findComment
  }

  // 前端查询文章评论
  static async findCommentTwo(val1, val2, page, size) {
    const findComment = await commentModel.findCommentTwo(
      val1,
      val2,
      page,
      size
    )
    let num = await commentModel.commentCount(val1, val2)
    let das = {
      value: findComment,
      total: num[0].count
    }
    return das
  }
  // 根据ID和文章ID获取评论
  static async idAndArticleId(value) {
    const findComment = await commentModel.idAndArticleId(value)
    return findComment
  }
}

module.exports = commentService
