const commonService = require('../../service/common')
const systemService = require('../../service/backstage/system')
const utils = require('../../utils')
const isDev = process.env.NODE_ENV === 'development'
let config
if (isDev) {
  config = require('../../config/dev.config')
} else {
  config = require('../../config/pro.config')
}
class systemController {
  // 系统设置上传图片
  static async uploadLogo(ctx) {
    try {
      const { data, fields } = await commonService.uploadDirImg(ctx, 'logo')
      if (data == 'type' && fields == null) {
        ctx.error(500, '只支持JPG/JPEG/PNG格式')
        return
      }
      if (data == 'size' && fields == null) {
        ctx.error(500, '上传的图片要求小于500k')
        return
      }
      ctx.body = {
        code: 200,
        status: true,
        value: config.host + data
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 添加网站系统设置
  static async addSystem(ctx) {
    try {
      const query = ctx.request.body
      let token = ctx.request.headers['authorization']
      const data = {
        title: query.title,
        summary: query.summary,
        logo: query.logo,
        logoImg: query.logoImg,
        seo: query.seo
      }
      let payload = await utils.decryptToken(token)
      const getSystemInfo = await systemService.getSystem(payload.data.userid)
      let systemInfo
      if (getSystemInfo.length == 0) {
        systemInfo = await systemService.add([
          payload.data.userid,
          data.title,
          data.summary,
          data.logo,
          data.logoImg,
          data.seo
        ])
      } else {
        systemInfo = await systemService.updateSystem(payload.data.userid, [
          data.title,
          data.summary,
          data.logo,
          data.logoImg,
          data.seo
        ])
      }
      console.log(systemInfo)
      if (!systemInfo) {
        ctx.error(500, '系统繁忙,请稍后在试')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '添加成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 查询网站系统设置
  static async getSystem(ctx) {
    try {
      const id = ctx.query.id
      if (!id) {
        ctx.error(500, '用户ID不能为空')
      }
      const getSystemInfo = await systemService.getSystem(id)
      delete getSystemInfo[0].userId
      ctx.body = {
        code: 200,
        status: true,
        value: getSystemInfo[0]
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = systemController
