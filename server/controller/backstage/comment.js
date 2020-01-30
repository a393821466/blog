const commentService = require('../../service/backstage/comment')
const articleService = require('../../service/backstage/article')
const isDev = process.env.NODE_ENV === 'development'
let dbConfig
if (isDev) {
  dbConfig = require('../../config/dev.config')
} else {
  dbConfig = require('../../config/pro.config')
}
class commentController {
  // 回复评论
  static async backstageReply(ctx) {
    try {
      const query = ctx.request.body
      const data = {
        article_id: query.articleId,
        comment_name: 'maple',
        comment_qq: '-',
        comment_email: '85029642@qq.com',
        comment_text: query.commentText,
        reply_id: query.replyId * 1,
        device: '管理员',
        avatar: dbConfig.host + '/public/avatar/admin.jpg',
        status: 1,
        create_time: Date.now()
      }
      if (!data.article_id || !data.comment_text || !data.reply_id) {
        ctx.error(400, '参数不正确')
      }
      const getArticleId = await articleService.singleArticle(data.article_id)
      if (getArticleId.length == 0) {
        ctx.error(500, '找不到评论的文章')
      }
      if (data.reply_id != 0) {
        const idAndArticleIds = await commentService.idAndArticleId([
          data.reply_id,
          data.article_id
        ])
        if (idAndArticleIds.length <= 0) {
          ctx.error(500, '回复对象与文章不匹配')
        }
        if (idAndArticleIds[0].reply_id != 0) {
          ctx.error(500, '回复对象不正确')
        }
      }
      let sendComment = await commentService.sendComment([
        data.article_id,
        data.comment_name,
        data.comment_qq,
        data.comment_email,
        data.comment_text,
        data.reply_id,
        data.avatar,
        data.device,
        data.status,
        data.create_time
      ])
      if (!sendComment) {
        ctx.error(500, '系统繁忙,请稍后在试')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '回复成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 查询评论
  static async getCommentList(ctx) {
    try {
      const query = ctx.query
      const das = {
        acticleId: !query.id || query.id == 'all' ? '' : query.id,
        status: !query.status || query.status == 'all' ? '' : query.status,
        page: !query.page ? 1 : query.page * 1,
        pageSize: !query.pageSize ? 10 : query.pageSize * 1
      }
      const findReplyCount = await commentService.backStageCommentOne(
        das.acticleId,
        das.status,
        das.page,
        das.pageSize
      )
      const count = findReplyCount.total
      ctx.body = {
        code: 200,
        status: true,
        value: {
          data: findReplyCount.value,
          page: das.page * 1,
          pageSize: das.pageSize * 1,
          totalPage: Math.ceil(count / das.pageSize),
          totelSize: count
        }
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
      if (getComment[0].status == 1) {
        ctx.error(500, '该评论已通过')
      }
      const update = await commentService.updateComment(das.id, [das.status])
      if (das.status == 3) {
        await commentService.delComment(query.id)
        await commentService.delReplyComment(query.id)
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
      const query = ctx.query
      if (!query.id) {
        ctx.error(400, '缺少参数')
      }
      const getComment = await commentService.commentId(query.id)
      if (getComment.length == 0) {
        ctx.error(500, '该评论不存在')
      }
      const deleteComment = await commentService.delComment(query.id)
      if (getComment[0].reply_id == 0) {
        await commentService.delReplyComment(query.id)
      }
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
