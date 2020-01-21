let errorMsg = () => {
  return async (ctx, next) => {
    try {
      ctx.error = (statusCode, message) => {
        ctx.status = statusCode || 500
        ctx.throw(statusCode || 500, message || '服务器繁忙,请稍后在试')
      }
      await next()
    } catch (err) {
      let code = err.status || 500
      const msg = err.message
      const status = false
      ctx.response.body = { code, status, msg }
    }
  }
}
exports.errorMsg = errorMsg
