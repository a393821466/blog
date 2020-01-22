const menuModel = require('../../models/menu')
const utils = require('../../utils')
class menuService {
  // 添加菜单
  static async doAddMenu(value) {
    const addMenu = await menuModel.addMenu(value)
    return addMenu
  }
  // 修改菜单
  static async doUpdateMenu(id, value) {
    const arr = value.concat(id)
    const updateMenu = await menuModel.updateMenu(arr)
    return updateMenu
  }
  // 根据条件查询菜单
  static async doFindOneMenu(n, value) {
    const findMenu = await menuModel.getMenu(n, value)
    return findMenu
  }
  // 模糊查询菜单
  static async doFindLikeMenu(val1, val2, val3) {
    const findLikeMenu = await menuModel.getLikeMenuUrl(val1, val2, val3)
    let getMenus
    if (!val1 && !val2 && !val3) {
      getMenus = utils.formartMenu(findLikeMenu)
    } else {
      getMenus = findLikeMenu
    }
    return getMenus
  }
  // 删除菜单
  static async doDeleteMenu(id) {
    const delMenu = await menuModel.delMenu(id)
    return delMenu
  }
}

module.exports = menuService
