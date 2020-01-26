const Router = require('koa-router')
const frontEnd = require('../controller/frontEnd/comment')
// const checkToken = require('../middleware/checkToken')
const frontEndRouter = new Router({
  prefix: '/v1'
})
// 发表评论
frontEndRouter.post('/sendComment', frontEnd.sendCommentController)
// 查询评论
frontEndRouter.get('/getComment', frontEnd.getCommentList)

module.exports = frontEndRouter
