const userModel = require('../../models/user')

class userService {
  // 取用户信息
  static async findUserInfo(id) {
    const user = await userModel.findUser('0', id)
    return user
  }
}

module.exports = userService
