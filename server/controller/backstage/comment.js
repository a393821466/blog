const commentService = require('../../service/backstage/comment')
class commentController {
  // 查询评论
  static async getCommentList(ctx) {
    try {
      const query = ctx.query
      const das = {
        acticleId: !query.id ? '' : query.id,
        status: !query.status || query.status == 'all' ? '' : query.status,
        page: !query.page ? 1 : query.page,
        pageSize: !query.pageSize ? 10 : query.pageSize
      }
      const findReplyCount = await commentService.backStageCommentOne(
        das.acticleId,
        das.status,
        das.page,
        das.pageSize
      )
      const count = findReplyCount.total
      ctx.body = {
        value: findReplyCount.value,
        page: das.page * 1,
        pageSize: das.pageSize * 1,
        totalPage: Math.ceil(count / das.pageSize),
        totelSize: count
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 更新评论
  static async updateComment(ctx) {
    try {
      const query = ctx.request.body
      const das = {
        id: query.id,
        status: query.status * 1
      }
      if (das.status != 1 && das.status != 3) {
        ctx.error(500, '状态参数不正确')
      }
      const getComment = await commentService.commentId(das.id)
      if (getComment.length == 0) {
        ctx.error(500, '该评论不存在')
      }
      const update = await commentService.updateComment(das.id, [das.status])
      if (das.status == 3) {
        await commentService.delComment(query.id)
      }
      if (!update) {
        ctx.error(500, '更新失败')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '操作成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 删除评论
  static async delComment(ctx) {
    try {
      const query = ctx.request.body
      const getComment = await commentService.commentId(query.id)
      if (getComment.length == 0) {
        ctx.error(500, '该评论不存在')
      }
      const deleteComment = await commentService.delComment(query.id)
      if (!deleteComment) {
        ctx.error(500, '删除失败')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '删除成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = commentController
