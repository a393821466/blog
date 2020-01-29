const commentModel = require('../../models/comment')

class commentService {
  // 后端查询文章评论
  static async backStageCommentOne(val1, val2, page, size) {
    const findComment = await commentModel.backstageComment(
      val1,
      val2,
      page,
      size
    )
    let num = await commentModel.backstageCommentCount(val1, val2)
    let das = {
      value: findComment,
      total: num[0].count
    }
    return das
  }
  // 根据文章ID查找评论
  static async commentId(id) {
    const commentId = await commentModel.commentId(id)
    return commentId
  }
  // 后端更新评论审核状态
  static async updateComment(id, value) {
    const arr = value.concat(id)
    const update = await commentModel.updateCommentStatus(arr)
    return update
  }
  // 后端删除评论
  static async delComment(id) {
    const del = await commentModel.delComment(id)
    return del
  }
  // 根据ID和文章ID获取评论
  static async idAndArticleId(value) {
    const findComment = await commentModel.idAndArticleId(value)
    return findComment
  }
  // 回复
  static async sendComment(value) {
    const addComment = await commentModel.sendComment(value)
    return addComment
  }
}

module.exports = commentService
