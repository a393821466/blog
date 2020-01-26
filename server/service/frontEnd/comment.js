const commentModel = require('../../models/comment')

class commentService {
  // 发表评论
  static async sendComment(value) {
    const addComment = await commentModel.sendComment(value)
    return addComment
  }

  // 查询回复对象
  static async commentId(id) {
    const commentId = await commentModel.commentId(id)
    return commentId
  }

  // 根据文章ID查找评论
  static async findComment(value) {
    const findComment = await commentModel.findComment(value)
    return findComment
  }
  // 查询文章评论
  static async findCommentTwo(val1, val2, page, size) {
    const findComment = await commentModel.findCommentTwo(
      val1,
      val2,
      page,
      size
    )
    return findComment
  }

  // 查询回复列表
  static async findReply(value) {
    const findReply = await commentModel.findReply(value)
    return findReply
  }
}

module.exports = commentService
