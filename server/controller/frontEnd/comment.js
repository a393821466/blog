const commentService = require('../../service/frontEnd/comment')
const articleService = require('../../service/backstage/article')
const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
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
        device: query.device,
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
        !data.comment_text ||
        !data.device
      ) {
        ctx.error(400, '参数不正确')
      }
      const getArticleId = await articleService.singleArticle(data.article_id)
      if (getArticleId.length == 0) {
        ctx.error(500, '找不到评论的文章')
      }
      if (getArticleId[0].is_comment == 2) {
        ctx.error(500, '该文章评论已关闭')
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
      findReplyCount.value.forEach(item => {
        arrId.push(item.id)
      })
      const findComment = await commentService.findComment(das.acticleId)
      findComment.forEach(ele => {
        let parentId = ele.reply_id
        if (parentId !== 0 && ele.status == 1) {
          findComment.forEach(d => {
            if (d.id === parentId) {
              let childArray = d.children
              if (!childArray) {
                childArray = []
              }
              childArray.push(ele)
              d.children = childArray
              d.children.sort((a, b) => {
                if (a.create_time < b.create_time) {
                  return -1
                } else if (a.create_time > b.create_time) {
                  return 1
                } else {
                  return 0
                }
              })
            }
          })
        }
      })
      const f = findComment.filter(ele => ele.reply_id === 0 && ele.status == 1)
      let list = []
      f.forEach(items => {
        if (arrId.indexOf(items.id) > -1) {
          list.push(items)
        }
      })
      const count = findReplyCount.total
      ctx.body = {
        value: list,
        page: das.page * 1,
        pageSize: das.pageSize * 1,
        totalPage: Math.ceil(count / das.pageSize),
        totelSize: count
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 获取QQ信息
  static async getQQinfo(ctx) {
    try {
      let { qq } = ctx.request.body
      if (!qq) {
        ctx.error(400, '请输入QQ号')
      }
      let reg = /^[1-9][0-9]{4,9}$/gim
      if (!reg.test(qq)) {
        ctx.error(500, 'QQ号格式不正确')
      }
      let url = 'http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg'
      await request
        .get(url)
        .charset('gbk')
        .query('g_tk=1518561325&uins=' + qq)
        .then(rs => {
          let da = rs.text
          let num1 = da.indexOf('[')
          let num2 = da.indexOf(']')
          let resultData = JSON.parse(da.substring(num1, num2 + 1))
          ctx.body = {
            status: true,
            code: 200,
            value: {
              qqNumber: qq,
              qqIcon: 'http://q1.qlogo.cn/g?b=qq&nk=' + qq + '&s=100',
              qqName: resultData[resultData.length - 2],
              qqZone: 'http://user.qzone.qq.com/' + qq,
              qqEmail: qq + '@qq.com'
            }
          }
        })
        .catch(err => {
          ctx.error(err)
        })
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = commentController
