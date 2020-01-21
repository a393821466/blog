const menuModel = require('../../models/menu')

class menuService {
  // 添加菜单
  static async doAddMenu(value) {
    const addMenu = await menuModel.addMenu(value)
    return addMenu
  }
  // 修改菜单
  static async doUpdateMenu(id, value) {
    const arr = value.concat(id)
    console.log(arr)
    const updateMenu = await menuModel.updateMenu(arr)
    return updateMenu
  }
  // 根据条件查询菜单
  static async doFindOneMenu(n, value) {
    const findMenu = await menuModel.getMenu(n, value)
    return findMenu
  }
  // 删除菜单
  static async doDeleteMenu(id) {
    const delMenu = await menuModel.delMenu(id)
    return delMenu
  }
}

module.exports = menuService
