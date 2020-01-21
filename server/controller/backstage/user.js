const userService = require('../../service/backstage/user')

class commonController {
  // 根据用户ID获取用户
  static async getUserInfo(ctx) {
    try {
      const id = ctx.query.id
      if (!id) {
        ctx.error(400, '用户ID不能为空')
      }
      const getUsers = await userService.findUserInfo(id)
      ctx.body = {
        code: 200,
        status: true,
        value: getUsers[0]
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = commonController
