const utils = require('../utils')
// 生成token中间件
module.exports = async (ctx, next) => {
  let authToken = ctx.request.headers['authorization']
  let token = ctx.session.userToken.token
  if (authToken && token == authToken) {
    let payload = await utils.decryptToken(authToken)
    if (payload == null) {
      ctx.error(401, '令牌已过期')
    } else {
      await next()
    }
  } else {
    ctx.error(401, '请登陆后在进行操作')
  }
}
