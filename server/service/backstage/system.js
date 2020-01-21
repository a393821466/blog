const systemModel = require('../../models/system')

class systemService {
  // 添加系统设置信息
  static async add(value) {
    const system = await systemModel.addSystem(value)
    return system
  }
  // 获取系统信息
  static async getSystem(id) {
    const system = await systemModel.getSystem(id)
    return system
  }
  // 更新系统信息
  static async updateSystem(id, value) {
    const arr = value.concat(id)
    const updateSystem = await systemModel.updateSystem(arr)
    return updateSystem
  }
}

module.exports = systemService
