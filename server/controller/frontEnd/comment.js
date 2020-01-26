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
        reply_id: !query.replyId ? 0 : query.replyId * 1,
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
        ctx.error(500, '找不到评论的文章')
      }
      if (data.reply_id != 0) {
        const getReply = await commentService.commentId(data.reply_id)
        if (getReply.length == 0) {
          ctx.error(500, '找不到回复对象')
        }
        if (getReply[0].reply_id != 0) {
          ctx.error(500, '回复对象错误')
        }
        if (getReply[0].article_id != getArticleId[0].article_id) {
          ctx.error(500, '文章或回复对象不匹配')
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
      let arrId = []
      const findReplyCount = await commentService.findCommentTwo(
        das.acticleId,
        0,
        das.page,
        das.pageSize
      )
      findReplyCount.forEach(item => {
        arrId.push(item.id)
      })
      const findComment = await commentService.findComment(das.acticleId)
      findComment.forEach(ele => {
        let parentId = ele.reply_id
        if (parentId !== 0) {
          findComment.forEach(d => {
            if (d.id === parentId) {
              let childArray = d.children
              if (!childArray) {
                childArray = []
              }
              childArray.push(ele)
              d.children = childArray
            }
          })
        }
      })
      const f = findComment.filter(ele => ele.reply_id === 0)
      let list = []
      f.forEach(items => {
        if (arrId.indexOf(items.id) > -1) {
          list.push(items)
        }
      })
      ctx.body = {
        value: list,
        page: das.page,
        pageSize: das.pageSize,
        totalPage: Math.ceil(list.length / das.pageSize),
        totelSize: list.length
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = commentController
