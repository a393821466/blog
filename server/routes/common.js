const Router = require('koa-router')
const common = require('../controller/common')
// const checkToken = require('../middleware/checkToken')
const commonRouter = new Router({
  prefix: '/api'
})
// 验证码
commonRouter.get('/captcha', common.getCode)
// 登陆
commonRouter.post('/login', common.login)
// 登出
commonRouter.delete('/logout', common.logout)

module.exports = commonRouter
