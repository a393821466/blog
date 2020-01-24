const Koa = require('koa')
const consola = require('consola')
const koaBody = require('koa-body')
const session = require('koa-session')
const errorMiddleware = require('./middleware/err_msg')
const commonRouters = require('./routes/common.js')
const backstageRouter = require('./routes/backstage')
const frontEndRouter = require('./routes/frontEnd')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
// session
app.keys = ['crypto userinfo']
const CONFIG = {
  key: 'koa:blueMaple', // cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, // 是否可以overwrite    (默认default true)
  httpOnly: true, // cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, // 签名默认true
  rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false // (boolean) renew session when session is nearly expired,
}
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 使用session
  app.use(session(CONFIG, app))
  // 使用中间件与简单处理所有中间件信息
  app.use(
    koaBody({
      multipart: true,
      formidable: {
        keepExtensions: true,
        maxFileSize: 3 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
      }
    })
  )
  // 处理错误信息中间件
  app.use(errorMiddleware.errorMsg())

  // 路由处理
  app.use(commonRouters.routes()).use(commonRouters.allowedMethods())
  app.use(backstageRouter.routes()).use(backstageRouter.allowedMethods())
  app.use(frontEndRouter.routes()).use(frontEndRouter.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
