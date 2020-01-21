const commonService = require('../../service/common')
const crypto = require('../../utils/crypto')
const createToken = require('../../middleware/createToken')

class commonController {
  // 获取验证码控制器
  static async getCode(ctx) {
    const getCaptcha = await commonService.getCaptcha(ctx)
    ctx.body = {
      code: 200,
      status: true,
      value: getCaptcha
    }
  }
  // 登录控制器
  static async login(ctx) {
    try {
      const query = ctx.request.body
      const dat = {
        username: query.username,
        password: query.password,
        code: query.code
      }
      if (!dat.username || !dat.password || !dat.code) {
        ctx.error(500, '用户名/密码/验证码不能为空')
        return
      }
      if (!ctx.session.code) {
        ctx.error(500, '验证码不正确')
        return
      }
      if (dat.code.toLowerCase() == ctx.session.code.toLowerCase()) {
        const pwd = crypto(crypto(dat.password) + 'blueMaple')
        const uService = await commonService.login(dat.username)
        if (!uService) {
          ctx.error(500, '用户名或密码不存在')
          return
        }
        if (uService[0].password != pwd) {
          ctx.error(500, '用户名或密码错误')
          return
        }
        const data = {
          userid: uService[0].id,
          username: uService[0].username,
          create_time: uService[0].create_time
        }
        let token = createToken(data)
        delete uService[0].password
        ctx.session.userToken = {
          token: token,
          create_time: Date.now()
        }
        ctx.body = {
          code: 200,
          status: true,
          value: uService[0],
          token: token
        }
      } else {
        ctx.error(500, '验证码错误')
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 登出
  static async logout(ctx) {
    try {
      ctx.session.userToken = {}
      ctx.body = {
        code: 200,
        status: true,
        value: '登出成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = commonController
