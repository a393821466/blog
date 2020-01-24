const commentService = require('../../service/frontEnd/comment')
const articleService = require('../../service/backstage/article')
class commentController {
  // 发表评论
  static async sendCommentController(ctx) {
    try {
      const query = ctx.request.body
      const data = {
        article_id: query.articleId,
        comment_name: query.commentName,
        comment_qq: !query.commentQq ? '' : query.commentQq,
        comment_email: query.commentEmail,
        comment_text: query.commentText,
        avatar: !query.avatar
          ? 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg'
          : query.avatar,
        status: 2,
        create_time: Date.now()
      }
      if (
        !data.article_id ||
        !data.comment_name ||
        !data.comment_email ||
        !data.comment_text
      ) {
        ctx.error(400, '参数不正确')
      }
      const getArticleId = await articleService.singleArticle(data.article_id)
      if (getArticleId.length == 0) {
        ctx.error(400, '找不到评论的文章')
      }
      let sendComment = await commentService.sendComment([
        data.article_id,
        data.comment_name,
        data.comment_qq,
        data.comment_email,
        data.comment_text,
        data.avatar,
        data.status,
        data.create_time
      ])
      if (!sendComment) {
        ctx.error(500, '系统繁忙,请稍后在试')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '评论成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 发表回复
  static async sendReplyController(ctx) {
    try {
      const query = ctx.request.body
      const data = {
        comment_id: query.commentId,
        reply_name: query.replyName,
        reply_qq: !query.replyQq ? '' : query.replyQq,
        reply_email: query.replyEmail,
        reply_text: query.replyText,
        avatar: !query.avatar
          ? 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg'
          : query.avatar,
        status: 2,
        create_time: Date.now()
      }
      if (
        !data.comment_id ||
        !data.reply_name ||
        !data.reply_email ||
        !data.reply_text
      ) {
        ctx.error(400, '参数不正确')
      }
      const findComment = await commentService.commentId(data.comment_id)
      if (findComment.length == 0) {
        ctx.error(400, '找不到回复对象')
      }
      let sendReply = await commentService.sendReply([
        data.comment_id,
        data.reply_name,
        data.reply_qq,
        data.reply_email,
        data.reply_text,
        data.avatar,
        data.status,
        data.create_time
      ])
      if (!sendReply) {
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
        acticleId: query.id,
        page: !query.page ? 1 : query.page,
        pageSize: !query.pageSize ? 10 : query.pageSize
      }
      if (!das.acticleId) {
        ctx.error(400, '参数错误')
      }
      // const findComment = await commentService.findComment(das.acticleId)
      const findReply = await commentService.findReply(das.acticleId)
      ctx.body = {
        value: findReply
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = commentController
